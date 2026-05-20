import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const FloatingModel = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const thermTextRef = useRef<HTMLSpanElement>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Cleanup previous instance (HMR safety)
    if (cleanupRef.current) {
      cleanupRef.current();
      cleanupRef.current = null;
    }

    // Clear any leftover canvases from HMR
    while (containerRef.current.firstChild) {
      containerRef.current.removeChild(containerRef.current.firstChild);
    }

    // ── Scene ──
    const scene = new THREE.Scene();

    // ── Camera ──
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0.5, 8);

    // ── Renderer — performance optimized ──
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: window.devicePixelRatio < 2,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.8;
    renderer.localClippingEnabled = true; // Enable clipping
    containerRef.current.appendChild(renderer.domElement);

    // ── Create environment map for PBR materials ──
    // Metallic/glossy PBR materials REQUIRE an environment map to look correct
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();

    // Create a simple gradient environment
    const envScene = new THREE.Scene();
    const envGeo = new THREE.SphereGeometry(10, 32, 32);
    const envMat = new THREE.ShaderMaterial({
      side: THREE.BackSide,
      uniforms: {
        topColor: { value: new THREE.Color(0x333340) },
        bottomColor: { value: new THREE.Color(0x0a0a0a) },
        accentColor: { value: new THREE.Color(0xff4500) },
      },
      vertexShader: `
        varying vec3 vWorldPosition;
        void main() {
          vec4 worldPos = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPos.xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 topColor;
        uniform vec3 bottomColor;
        uniform vec3 accentColor;
        varying vec3 vWorldPosition;
        void main() {
          float h = normalize(vWorldPosition).y;
          vec3 color = mix(bottomColor, topColor, max(h, 0.0));
          // Add subtle warm accent at equator
          float accent = exp(-8.0 * h * h);
          color = mix(color, accentColor * 0.15, accent * 0.3);
          gl_FragColor = vec4(color, 1.0);
        }
      `,
    });
    envScene.add(new THREE.Mesh(envGeo, envMat));
    const envMap = pmremGenerator.fromScene(envScene, 0.04).texture;
    scene.environment = envMap;
    envScene.clear();
    envGeo.dispose();
    envMat.dispose();
    pmremGenerator.dispose();

    // ── Lighting ──
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    // Key light — warm, upper right
    const keyLight = new THREE.DirectionalLight(0xfff5e0, 4.0);
    keyLight.position.set(4, 6, 5);
    scene.add(keyLight);

    // Fill light — cool blue, left side
    const fillLight = new THREE.DirectionalLight(0xd0e0ff, 2.0);
    fillLight.position.set(-5, 2, -3);
    scene.add(fillLight);

    // Rim light — orange accent from behind for product drama
    const rimLight = new THREE.DirectionalLight(0xff4500, 2.5);
    rimLight.position.set(0, -3, -6);
    scene.add(rimLight);

    // Top accent
    const topLight = new THREE.DirectionalLight(0xffffff, 1.5);
    topLight.position.set(0, 8, 0);
    scene.add(topLight);

    // Hemisphere for soft ambient fill
    const hemiLight = new THREE.HemisphereLight(0x444466, 0x111111, 0.8);
    scene.add(hemiLight);

    // ── Load model ──
    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
    loader.setDRACOLoader(dracoLoader);

    // Pivot group for scroll animation
    const scrollGroup = new THREE.Group();
    scene.add(scrollGroup);

    // Inner group for idle spin
    const idleGroup = new THREE.Group();
    scrollGroup.add(idleGroup);

    const spinGroup = new THREE.Group();
    idleGroup.add(spinGroup);

    let modelLoaded = false;
    let model1: THREE.Group | null = null;
    let model2: THREE.Group | null = null;
    let baseScale = 1;

    let sphereMesh: THREE.Mesh | null = null;

    const onModelsLoaded = () => {
      if (!model1 || !model2) return;

      const isMobile = window.innerWidth < 768;
      const scaleMultiplier = isMobile ? 0.6 : 1.0;

      // Normalize size using model1 (sphere_white_opaque) as reference
      const box = new THREE.Box3().setFromObject(model1);
      const size = new THREE.Vector3();
      box.getSize(size);
      const maxDim = Math.max(size.x, size.y, size.z);
      const targetSize = 2.2;
      baseScale = targetSize / maxDim;
      const initialScale = baseScale * 0.8;

      // Apply initial scale to both
      model1.scale.set(initialScale, initialScale, initialScale);
      model2.scale.set(initialScale, initialScale, initialScale);

      // Center them (using model1 center)
      const center = new THREE.Vector3();
      box.getCenter(center);
      model1.position.set(-center.x * initialScale, -center.y * initialScale, -center.z * initialScale);
      model2.position.set(-center.x * initialScale, -center.y * initialScale, -center.z * initialScale);

      // Setup materials for model2 (Volcano Coat)
      const meshesToRemove: THREE.Mesh[] = [];
      model2.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          mesh.frustumCulled = true;

          console.log('Mesh found in Model2:', mesh.name);

          // Force smooth shading by computing vertex normals
          mesh.geometry.computeVertexNormals();

          // Identify meshes
          if (mesh.name === 'Spehere') {
            sphereMesh = mesh;
            mesh.visible = true;
          } else {
            mesh.visible = false; // Hide everything else
            if (mesh.name.includes('Coat')) {
              meshesToRemove.push(mesh);
            }
          }

          const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
          materials.forEach((mat) => {
            mat.transparent = true;
            if ((mat as THREE.MeshStandardMaterial).isMeshStandardMaterial) {
              const stdMat = mat as THREE.MeshStandardMaterial;
              stdMat.envMap = envMap;
              stdMat.envMapIntensity = 1.0;
              stdMat.flatShading = false; // Ensure smooth shading
              stdMat.needsUpdate = true;

              // Add emission to sphereMesh
              if (mesh.name === 'Spehere') {
                stdMat.emissive = new THREE.Color(0xff4500); // Orange/Red fire color
                stdMat.emissiveIntensity = 2.0;
              }
            }
          });
        }
      });
      meshesToRemove.forEach((mesh) => {
        mesh.parent?.remove(mesh);
        console.log('Removed mesh:', mesh.name);
      });

      // Setup materials for model1
      model1.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          mesh.frustumCulled = true;
          const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
          materials.forEach((mat) => {
            mat.transparent = true;
            if ((mat as THREE.MeshStandardMaterial).isMeshStandardMaterial) {
              const stdMat = mat as THREE.MeshStandardMaterial;
              stdMat.envMap = envMap;
              stdMat.envMapIntensity = 1.0;
              stdMat.needsUpdate = true;
            }
          });
        }
      });

      const modelContainer = new THREE.Group();
      modelContainer.add(model1);
      modelContainer.add(model2);
      spinGroup.add(modelContainer);

      modelLoaded = true;

      // Start model at the position of the dot in the hero title
      const dot = document.getElementById('hero-dot');
      if (dot) {
        const rect = dot.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const vector = new THREE.Vector3();
        vector.x = (centerX / window.innerWidth) * 2 - 1;
        vector.y = -(centerY / window.innerHeight) * 2 + 1;
        vector.z = 0.5;

        vector.unproject(camera);

        const dir = vector.sub(camera.position).normalize();
        const distance = -camera.position.z / dir.z; // Intersection with z=0 plane
        const pos = camera.position.clone().add(dir.multiplyScalar(distance));

        scrollGroup.position.copy(pos);

        // Offset to match the user's red circle (below and slightly right)
        scrollGroup.position.x += isMobile ? 0.1 : -0.1;
        scrollGroup.position.y -= isMobile ? 0.3 : 0.08;
      } else {
        // Fallback position if dot not found
        scrollGroup.position.set(isMobile ? 0 : 0.5, isMobile ? 2.5 : 2.35, 0);
      }

      // Intro animation for 3D model (fade opacity for model1 only initially)
      model1.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
          materials.forEach((mat) => {
            mat.opacity = 0;
            gsap.to(mat, { opacity: 1, duration: 1.6, ease: 'power2.out', delay: 0.1 });
          });
        }
      });

      // Model 2 starts invisible
      model2.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
          materials.forEach((mat) => {
            mat.opacity = 0;
          });
        }
      });

      // ── STRICT STATES ──
      const resetToLogoState = () => {
        if (!modelContainer || !model1 || !model2) return;

        modelContainer.quaternion.set(0, 0, 0, 1);
        idleGroup.quaternion.set(0, 0, 0, 1);
        spinGroup.quaternion.set(0, 0, 0, 1);

        idleGroup.rotation.set(0, 0, 0);

        modelContainer.scale.set(0.2, 0.2, 0.2); // Size of the red circle

        const logoStateScale = baseScale * 0.48 * scaleMultiplier;
        model1.scale.set(logoStateScale, logoStateScale, logoStateScale);
        model2.scale.set(logoStateScale, logoStateScale, logoStateScale);
      };

      resetToLogoState();

      (window as any).resetToLogoState = resetToLogoState;

      if (thermTextRef.current) {
        gsap.fromTo(
          thermTextRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' }
        );
      }

      setupScrollAnimation(scrollGroup, baseScale, resetToLogoState, spinGroup, modelContainer, model1, sphereMesh);
    };

    loader.load('/assets/sphere_white_opaque.glb', (gltf) => {
      model1 = gltf.scene;
      onModelsLoaded();
    }, undefined, (error) => console.error('Failed to load sphere 1', error));

    loader.load('/assets/sphere_volcano_coat_2.glb', (gltf) => {
      model2 = gltf.scene;
      onModelsLoaded();
    }, undefined, (error) => console.error('Failed to load sphere 2', error));

    // Proxy object to control rotation speed via GSAP
    const speedProxy = { value: 0 };

    // ── Scroll animation phases ──
    function setupScrollAnimation(group: THREE.Group, baseScale: number, _resetToLogoState: () => void, spinGroup: THREE.Group, root: THREE.Group, m1: THREE.Group, sMesh: THREE.Mesh | null) {
      const isMobile = window.innerWidth < 768;
      const scaleMultiplier = isMobile ? 0.6 : 1.0;

      // 1. TIMELINE DOM: Triggers exactly on the #hero section bounds
      const tlDOM = gsap.timeline({
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
          onLeave: () => {
            if (thermTextRef.current) {
              gsap.to(thermTextRef.current, {
                autoAlpha: 0,
                duration: 0.2,
                pointerEvents: 'none',
                overwrite: 'auto'
              });
            }
          },
          onEnterBack: () => {
            if (thermTextRef.current) {
              gsap.to(thermTextRef.current, {
                autoAlpha: 1,
                duration: 0.2,
                overwrite: 'auto'
              });
            }
          }
        },
      });

      // 2. TIMELINE 3D HERO: Matches the DOM timeline exactly
      const tlHero3D = gsap.timeline({
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
          onUpdate: (self) => {
            if (self.progress === 0) {
              gsap.to(spinGroup.rotation, {
                x: 0, y: 0, z: 0,
                duration: 0.5,
                ease: 'power2.out',
                overwrite: 'auto'
              });
            }
          }
        },
      });

      // 3. TIMELINE 3D GLOBAL PARALLAX: For the rest of the site


      const navTherm = document.getElementById('nav-text-therm');
      const navX = document.getElementById('nav-text-x');
      const sourceTherm = thermTextRef.current;

      const navLeftPos = isMobile ? '24px' : '48px';

      // PHASE 1: Hero Detachment
      if (sourceTherm && navTherm && navX) {

        const targetRect = navTherm.getBoundingClientRect();
        const sourceRect = sourceTherm.getBoundingClientRect();
        let targetScale = 0.4;
        if (sourceRect.height > 0 && targetRect.height > 0) {
          targetScale = targetRect.height / sourceRect.height;
        }

        const navTopPosCalc = targetRect.top + targetRect.height / 2;

        // The transition takes the entire Hero scroll (duration: 1)
        tlDOM.to(
          sourceTherm,
          {
            top: navTopPosCalc,
            left: navLeftPos,
            x: '0%',
            y: '-50%',
            scale: targetScale,
            duration: 1,
            ease: 'power3.inOut',
          },
          0
        );

        // Handoff to Navbar at the very end of the Hero scroll
        tlDOM.to(sourceTherm, { autoAlpha: 0, duration: 0.01 }, 1);
        tlDOM.to(navTherm, { opacity: 1, duration: 0.01 }, 1);
        tlDOM.to(navX, { opacity: 1, duration: 0.05 }, 1);

        // --- 3D Hero Transition ---
        tlHero3D.to(
          group.position,
          { x: isMobile ? 0 : 3.5, y: isMobile ? 0.8 : 0.5, z: isMobile ? -2 : -2, duration: 1, ease: 'power3.inOut' },
          0
        );

        tlHero3D.to(
          idleGroup.rotation,
          {
            x: THREE.MathUtils.degToRad(isMobile ? 5 : 15),
            y: THREE.MathUtils.degToRad(isMobile ? -10 : -25),
            z: 0,
            duration: 1,
            ease: 'power3.inOut'
          },
          0
        );

        const heroStateScale = baseScale * 1.7 * scaleMultiplier;
        tlHero3D.to(
          root.scale,
          { x: heroStateScale, y: heroStateScale, z: heroStateScale, duration: 1, ease: 'power3.inOut' },
          0
        );

        // Sfera 1 (m1) devine transparentă
        m1.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
            materials.forEach((mat) => {
              tlHero3D.to(mat, { opacity: 0, duration: 0.5 }, 0);
            });
          }
        });

        // Sfera 2 (sMesh) devine opacă
        if (sMesh) {
          const materials = Array.isArray(sMesh.material) ? sMesh.material : [sMesh.material];
          materials.forEach((mat) => {
            tlHero3D.to(mat, { opacity: 1, duration: 0.5 }, 0);
          });
        }

        tlHero3D.to(speedProxy, { value: 0.15, duration: 1, ease: 'power2.inOut' }, 0);
      }

      // ── UNIFIED TIMELINE FOR THE REST OF THE SITE ──
      // To prevent jumping, we use a single timeline that plays sequentially!
      const tlGlobal3D = gsap.timeline({
        scrollTrigger: {
          trigger: '#produs',
          start: 'top top',
          endTrigger: '#contact',
          end: 'bottom bottom',
          scrub: 1.5,
        }
      });

      // Step 1: Product Section (Stays Volcano)
      tlGlobal3D.to(group.position, { x: isMobile ? 0 : 3.2, y: isMobile ? 0.5 : 0.2, z: isMobile ? -4 : -3.5, ease: 'power1.inOut' });
      tlGlobal3D.to(group.rotation, { x: -0.05, y: Math.PI * (isMobile ? 1.0 : 0.5), z: -0.02, ease: 'power1.inOut' }, "<");
      tlGlobal3D.to(root.scale, { x: baseScale * 1.7 * 1.2 * scaleMultiplier, y: baseScale * 1.7 * 1.2 * scaleMultiplier, z: baseScale * 1.7 * 1.2 * scaleMultiplier, ease: 'power1.inOut' }, "<");

      // Step 2: Science Section (Transition back to White)
      tlGlobal3D.to(group.position, { x: isMobile ? 0 : -2.5, y: isMobile ? 0.8 : 0.5, z: isMobile ? -5 : -5.5, ease: 'power2.inOut' });
      tlGlobal3D.to(group.rotation, { x: 0.2, y: Math.PI * (isMobile ? 2.0 : 1.5), z: 0.1, ease: 'power2.inOut' }, "<");
      tlGlobal3D.to(root.scale, { x: baseScale * 1.7 * 1.8 * scaleMultiplier, y: baseScale * 1.7 * 1.8 * scaleMultiplier, z: baseScale * 1.7 * 1.8 * scaleMultiplier, ease: 'power2.inOut' }, "<");

      m1.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
          materials.forEach((mat) => {
            tlGlobal3D.to(mat, { opacity: 1, duration: 0.5 }, "<");
          });
        }
      });
      if (sMesh) {
        const materials = Array.isArray(sMesh.material) ? sMesh.material : [sMesh.material];
        materials.forEach((mat) => {
          tlGlobal3D.to(mat, { opacity: 0, duration: 0.5 }, "<");
        });
      }

      // Step 3: Specs Section (Transition back to Volcano)
      tlGlobal3D.to(group.position, { x: isMobile ? 0 : 2.5, y: isMobile ? -0.1 : -0.3, z: isMobile ? -5 : -5.5, ease: 'power1.inOut' });
      tlGlobal3D.to(group.rotation, { x: -0.1, y: Math.PI * (isMobile ? 3.0 : 2.5), z: 0.05, ease: 'power1.inOut' }, "<");
      tlGlobal3D.to(root.scale, { x: baseScale * 1.7 * 1.8 * scaleMultiplier, y: baseScale * 1.7 * 1.8 * scaleMultiplier, z: baseScale * 1.7 * 1.8 * scaleMultiplier, ease: 'power1.inOut' }, "<");

      m1.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
          materials.forEach((mat) => {
            tlGlobal3D.to(mat, { opacity: 0, duration: 0.5 }, "<");
          });
        }
      });
      if (sMesh) {
        const materials = Array.isArray(sMesh.material) ? sMesh.material : [sMesh.material];
        materials.forEach((mat) => {
          tlGlobal3D.to(mat, { opacity: 1, duration: 0.5 }, "<");
        });
      }

      // Step 4: Contact Section (Stays Volcano)
      tlGlobal3D.to(group.position, { x: 0, y: isMobile ? 1.5 : 0.2, z: isMobile ? -5 : -5, ease: 'power2.inOut' });
      tlGlobal3D.to(group.rotation, { x: 0.05, y: Math.PI * (isMobile ? 4.0 : 4.0), z: 0, ease: 'power2.inOut' }, "<");
      tlGlobal3D.to(root.scale, {
        x: baseScale * 1.7 * 1.6 * scaleMultiplier * (isMobile ? 0.7 : 1.0),
        y: baseScale * 1.7 * 1.6 * scaleMultiplier * (isMobile ? 0.7 : 1.0),
        z: baseScale * 1.7 * 1.6 * scaleMultiplier * (isMobile ? 0.7 : 1.0),
        ease: 'power2.inOut'
      }, "<");
    }

    // ── Resize handler (debounced) ──
    let resizeTimeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }, 100);
    };
    window.addEventListener('resize', handleResize);

    // ── Render loop ──
    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const now = performance.now();
      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      // Only apply continuous spin to the isolated spinGroup. 
      // If speedProxy is 0 (at top of page), this loop does nothing.
      if (modelLoaded && speedProxy.value > 0) {
        // Find the inner spinGroup (it's the only child of idleGroup)
        if (idleGroup.children.length > 0) {
          const spinGrp = idleGroup.children[0];
          spinGrp.rotation.y += speedProxy.value * delta;
        }
      }

      // Continuous float up and down (idle animation) at the top of the page
      if (modelLoaded) {
        const initialX = window.innerWidth < 768 ? 0 : 0.5;
        const atTop = Math.abs(scrollGroup.position.x - initialX) < 0.05;
        if (atTop) {
          idleGroup.position.y = Math.sin(now * 0.0015) * 0.06; // More subtle movement
        } else {
          // Smoothly return to 0 when scrolling
          idleGroup.position.y = THREE.MathUtils.lerp(idleGroup.position.y, 0, 0.1);
        }
      }

      renderer.render(scene, camera);
    };
    animate();

    // ── Cleanup function ──
    const cleanup = () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', handleResize);

      ScrollTrigger.getAll().forEach((t) => {
        const trigger = t.vars.trigger;
        if (trigger === document.documentElement || trigger === 'body') {
          t.kill();
        }
      });

      scene.traverse((obj) => {
        if ((obj as THREE.Mesh).isMesh) {
          const mesh = obj as THREE.Mesh;
          mesh.geometry?.dispose();
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((m) => m.dispose());
          } else {
            mesh.material?.dispose();
          }
        }
      });

      envMap.dispose();

      if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      dracoLoader.dispose();
    };

    cleanupRef.current = cleanup;

    return cleanup;
  }, []);

  return (
    <>
      <div
        ref={containerRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none"
        style={{ zIndex: 1 }}
      />
      {/* 
        This is the flying 'therm' text. It starts centered (offset left slightly) 
        so the 3D model can be the 'X' next to it. 
        It animates to the top-left Navbar position on scroll.
      */}
      <span
        ref={thermTextRef}
        className="fixed pointer-events-none z-[60] text-white font-display font-black tracking-tight"
        style={{
          top: '20%',
          left: '50%',
          transform: 'translate(-50%, -50%)', // Centered
          transformOrigin: 'left center', // Crucial for clean scale animation to the navbar
          fontSize: 'clamp(2rem, 5vw, 4.5rem)', // 60-75% of previous size, elegant and modest
          lineHeight: '1',
          willChange: 'top, left, transform',
        }}
      >
        therm<span className="text-[#FF4500] text-[1.2em]">X.</span>
      </span>
    </>
  );
};
