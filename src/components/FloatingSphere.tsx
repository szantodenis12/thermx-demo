import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useScrollCtx } from '../App';
import { useScroll, useSpring, useMotionValue } from 'framer-motion';

export const FloatingSphere = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const { themeProgress } = useScrollCtx();
  const fallbackProgress = useMotionValue(0);
  const activeProgress = themeProgress || fallbackProgress;
  
  // Track global scroll
  const { scrollYProgress } = useScroll();
  const smoothScroll = useSpring(scrollYProgress, { stiffness: 50, damping: 20 }); // Smoother

  useEffect(() => {
    if (!mountRef.current) return;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    
    // Camera
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 4; // Closer

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // 2. Object (Faceted Crystal Sphere)
    // Lower segments (32) to make the flat shading facets look awesome
    const geometry = new THREE.SphereGeometry(1.2, 32, 32);
    
    // Flat shading makes it look like a high-tech crystal/nanostructure
    const material = new THREE.MeshStandardMaterial({
      color: 0xff4500, // Brand Orange
      metalness: 0.9,
      roughness: 0.1,
      flatShading: true, // Crucial for visibility of shape
    });

    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // 3. Lights (Strong contrast lights to highlight the facets)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
    scene.add(ambientLight);

    // Main light
    const mainLight = new THREE.DirectionalLight(0xffffff, 2);
    mainLight.position.set(5, 5, 5);
    scene.add(mainLight);

    // Counter light (Cyan for contrast)
    const fillLight = new THREE.DirectionalLight(0x00edff, 1.5);
    fillLight.position.set(-5, -5, 2);
    scene.add(fillLight);
    
    // Back light
    const backLight = new THREE.PointLight(0xff6b35, 2, 10);
    backLight.position.set(0, 0, -3);
    scene.add(backLight);

    // 4. Animation Loop
    let animationFrameId: number;
    const originalPositions = geometry.attributes.position.clone();
    
    const animate = (time: number) => {
      animationFrameId = requestAnimationFrame(animate);
      
      const scroll = smoothScroll.get();
      const theme = activeProgress.get();
      
      // Convert time to seconds for controlled speed
      const t = time * 0.001;

      // 1. CONSTANT DEFAULT ANIMATION (Never static)
      sphere.rotation.y = t * 0.2 + scroll * 2; // Auto + scroll
      sphere.rotation.x = t * 0.1 + scroll * 1;
      
      // Auto floating
      sphere.position.y = Math.sin(t * 1.5) * 0.15;
      sphere.position.x = 1.2 + Math.cos(t * 0.5) * 0.1 - scroll * 0.8; // Moves left on scroll

      // 2. SCROLL DRIVEN MORPHING (Vertex displacement)
      const positionAttribute = geometry.attributes.position;
      const vertex = new THREE.Vector3();

      for (let i = 0; i < positionAttribute.count; i++) {
        vertex.fromBufferAttribute(originalPositions, i);
        
        // Complex wave formula for organic morphing
        // Combines time and scroll
        const wave = Math.sin(vertex.x * 3 + t * 2) * 
                     Math.cos(vertex.y * 3 + t * 1.5) * 
                     Math.sin(vertex.z * 3 + scroll * 10);
                     
        // Displacement amplitude increases with scroll
        const amplitude = 0.2 + scroll * 0.3;
        
        vertex.addScaledVector(vertex.clone().normalize(), wave * amplitude);
        positionAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z);
      }
      
      positionAttribute.needsUpdate = true;
      geometry.computeVertexNormals(); // Needed for flat shading to update correctly
      
      // 3. COLOR ADAPTATION
      // Morphs from orange to a darker/lighter shade or shifts hue
      material.color.setHSL(0.03 + scroll * 0.05, 1, 0.5 - theme * 0.1);

      renderer.render(scene, camera);
    };

    animate(0);

    // 5. Handle Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      mountRef.current?.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="fixed inset-0 z-10 pointer-events-none"
      // Removed mixBlendMode to let the metallic shading pop
    />
  );
};
