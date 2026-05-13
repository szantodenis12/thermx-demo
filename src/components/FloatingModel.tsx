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

    let modelLoaded = false;

    loader.load(
      '/assets/x_3d_compressed.glb',
      (gltf) => {
        const root = gltf.scene;
        const isMobile = window.innerWidth < 768;
        const scaleMultiplier = isMobile ? 0.6 : 1.0;

        // Normalize size
        const box = new THREE.Box3().setFromObject(root);
        const size = new THREE.Vector3();
        box.getSize(size);
        const maxDim = Math.max(size.x, size.y, size.z);
        const targetSize = 2.2;
        const baseScale = targetSize / maxDim;
        // Start slightly smaller
        const initialScale = baseScale * 0.8;
        // Make it thinner on the Z axis (e.g., 0.5 for half thickness) directly from code!
        const thicknessMultiplier = 0.5;
        root.scale.set(initialScale, initialScale, initialScale * thicknessMultiplier);

        // Center
        const center = new THREE.Vector3();
        box.getCenter(center);
        root.position.set(-center.x * initialScale, -center.y * initialScale, -center.z * initialScale);

        // Optimize materials — keep original PBR, ensure env map works
        root.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.frustumCulled = true;

            const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
            materials.forEach((mat) => {
              if ((mat as THREE.MeshStandardMaterial).isMeshStandardMaterial) {
                const stdMat = mat as THREE.MeshStandardMaterial;
                stdMat.envMap = envMap;
                stdMat.envMapIntensity = 1.0;
                stdMat.needsUpdate = true;
              }
            });
          }
        });

        // Create an inner group for the continuous endless spin so it doesn't conflict with GSAP scrub
        const spinGroup = new THREE.Group();
        spinGroup.add(root);
        idleGroup.add(spinGroup);
        modelLoaded = true;

        // Start model slightly right of center, significantly elevated (top: ~20-25%)
        // Camera is at y: 0.5, z: 8. Center is y:0. Top: 20% is roughly y: 2.2
        // x: 0.8 keeps it tightly nested against the 'therm' text
        scrollGroup.position.set(isMobile ? 0 : 0.5, isMobile ? 2.5 : 2.35, 0);

        // Intro animation for 3D model (fade opacity)
        root.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
            materials.forEach((mat) => {
              mat.transparent = true;
              mat.opacity = 0;
              gsap.to(mat, { opacity: 1, duration: 1.6, ease: 'power2.out', delay: 0.1 });
            });
          }
        });

        // ── STRICT STATES ──
        const resetToLogoState = () => {
          if (!root) return;

          // Clear quaternions to ensure rotation applies cleanly
          root.quaternion.set(0, 0, 0, 1);
          idleGroup.quaternion.set(0, 0, 0, 1);
          spinGroup.quaternion.set(0, 0, 0, 1);

          // Exact frontal X rotation
          idleGroup.rotation.set(
            THREE.MathUtils.degToRad(0),   // rotation.x 
            THREE.MathUtils.degToRad(0),   // rotation.y 
            THREE.MathUtils.degToRad(0)     // rotation.z
          );

          // Modest scale for the central logo state
          const logoStateScale = baseScale * 0.48 * scaleMultiplier;
          root.scale.set(logoStateScale, logoStateScale, logoStateScale);
        };

        // Apply immediately at load
        resetToLogoState();

        // Expose to window for live debugging
        (window as any).resetToLogoState = resetToLogoState;

        // Ensure text is immediately visible without GSAP delay, just a subtle entrance
        if (thermTextRef.current) {
          gsap.fromTo(
            thermTextRef.current,
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' }
          );
        }

        // Setup scroll animation using separate triggers
        setupScrollAnimation(scrollGroup, baseScale, resetToLogoState, spinGroup, root);
      },
      undefined,
      (error) => {
        console.error('FloatingModel: Failed to load model', error);
      }
    );

    // Proxy object to control rotation speed via GSAP
    const speedProxy = { value: 0 };

    // ── Scroll animation phases ──
    function setupScrollAnimation(group: THREE.Group, baseScale: number, _resetToLogoState: () => void, spinGroup: THREE.Group, root: THREE.Group) {
      const thicknessMultiplier = 0.5;
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
          { x: heroStateScale, y: heroStateScale, z: heroStateScale * thicknessMultiplier, duration: 1, ease: 'power3.inOut' },
          0
        );

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

      // Step 1: Product Section
      tlGlobal3D.to(group.position, { x: isMobile ? 0 : 3.2, y: isMobile ? 0.5 : 0.2, z: isMobile ? -4 : -3.5, ease: 'power1.inOut' });
      tlGlobal3D.to(group.rotation, { x: -0.05, y: Math.PI * (isMobile ? 1.0 : 0.5), z: -0.02, ease: 'power1.inOut' }, "<");
      tlGlobal3D.to(root.scale, { x: baseScale * 1.7 * 1.2 * scaleMultiplier, y: baseScale * 1.7 * 1.2 * scaleMultiplier, z: baseScale * 1.7 * 1.2 * thicknessMultiplier * scaleMultiplier, ease: 'power1.inOut' }, "<");

      // Step 2: Science Section
      tlGlobal3D.to(group.position, { x: isMobile ? 0 : -2.5, y: isMobile ? 0.8 : 0.5, z: isMobile ? -5 : -5.5, ease: 'power2.inOut' });
      tlGlobal3D.to(group.rotation, { x: 0.2, y: Math.PI * (isMobile ? 2.0 : 1.5), z: 0.1, ease: 'power2.inOut' }, "<");
      tlGlobal3D.to(root.scale, { x: baseScale * 1.7 * 1.8 * scaleMultiplier, y: baseScale * 1.7 * 1.8 * scaleMultiplier, z: baseScale * 1.7 * 1.8 * thicknessMultiplier * scaleMultiplier, ease: 'power2.inOut' }, "<");

      // Step 3: Specs Section
      tlGlobal3D.to(group.position, { x: isMobile ? 0 : 2.5, y: isMobile ? -0.1 : -0.3, z: isMobile ? -5 : -5.5, ease: 'power1.inOut' });
      tlGlobal3D.to(group.rotation, { x: -0.1, y: Math.PI * (isMobile ? 3.0 : 2.5), z: 0.05, ease: 'power1.inOut' }, "<");
      tlGlobal3D.to(root.scale, { x: baseScale * 1.7 * 1.8 * scaleMultiplier, y: baseScale * 1.7 * 1.8 * scaleMultiplier, z: baseScale * 1.7 * 1.8 * thicknessMultiplier * scaleMultiplier, ease: 'power1.inOut' }, "<");

      // Step 4: Contact Section
      tlGlobal3D.to(group.position, { x: 0, y: isMobile ? 1.5 : 0.2, z: isMobile ? -5 : -5, ease: 'power2.inOut' });
      tlGlobal3D.to(group.rotation, { x: 0.05, y: Math.PI * (isMobile ? 4.0 : 4.0), z: 0, ease: 'power2.inOut' }, "<");
      tlGlobal3D.to(root.scale, {
        x: baseScale * 1.7 * 1.6 * scaleMultiplier * (isMobile ? 0.7 : 1.0),
        y: baseScale * 1.7 * 1.6 * scaleMultiplier * (isMobile ? 0.7 : 1.0),
        z: baseScale * 1.7 * 1.6 * thicknessMultiplier * scaleMultiplier * (isMobile ? 0.7 : 1.0),
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
          transform: 'translate(-100%, -50%)', // Right edge perfectly at center
          transformOrigin: 'left center', // Crucial for clean scale animation to the navbar
          fontSize: 'clamp(2rem, 5vw, 4.5rem)', // 60-75% of previous size, elegant and modest
          lineHeight: '1',
          willChange: 'top, left, transform',
        }}
      >
        therm
      </span>
    </>
  );
};
