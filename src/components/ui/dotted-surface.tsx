import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { cn } from '@/lib/utils';

type DottedSurfaceProps = Omit<React.ComponentProps<'div'>, 'ref'>;

/**
 * DottedSurface - GPU-Powered Animated Background
 * 
 * IMPORTANT: DO NOT MODIFY THIS FILE.
 * This component uses a ShaderMaterial for GPU-accelerated particle animation.
 * It is designed to be resilient to React StrictMode double-mounting.
 * Any changes to other components should NOT touch this file.
 */
export function DottedSurface({ className, ...props }: DottedSurfaceProps) {
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!containerRef.current) return;
		const container = containerRef.current;

		// Prevent duplicate canvases from StrictMode double-mount
		const existingCanvas = container.querySelector('canvas');
		if (existingCanvas) {
			return; // Already initialized, don't create another
		}

		// --- CONFIG ---
		const SEPARATION = 90;
		const AMOUNTX = 50;
		const AMOUNTY = 50;
		const CAMERA_Z = 1200;

		// --- SCENE ---
		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
		camera.position.set(0, 400, CAMERA_Z);
		camera.lookAt(new THREE.Vector3(0, -200, 0));

		// --- GEOMETRY ---
		const numParticles = AMOUNTX * AMOUNTY;
		const positions = new Float32Array(numParticles * 3);
		
		let i = 0;
		for (let ix = 0; ix < AMOUNTX; ix++) {
			for (let iy = 0; iy < AMOUNTY; iy++) {
				positions[i] = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;     // x
				positions[i + 1] = 0;                                           // y (initial)
				positions[i + 2] = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2; // z
				i += 3;
			}
		}

		const geometry = new THREE.BufferGeometry();
		geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

		// --- SHADERS ---
		const vertexShader = `
			uniform float uTime;
			varying float vAlpha;

			void main() {
				vec3 pos = position;
				
				// Complex wave displacement on GPU
				float wave1 = sin(pos.x * 0.005 + uTime * 0.6) * 120.0;
				float wave2 = sin(pos.z * 0.008 + uTime * 0.5) * 120.0;
				float wave3 = sin((pos.x + pos.z) * 0.003 + uTime * 0.3) * 60.0;
				
				pos.y += wave1 + wave2 + wave3;

				vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
				
				// Size attenuation based on distance
				gl_PointSize = (12.0 * (1000.0 / length(mvPosition.xyz)));
				gl_Position = projectionMatrix * mvPosition;

				// Distance-based alpha
				float dist = length(mvPosition.xyz);
				vAlpha = clamp(1.0 - (dist / 2500.0), 0.0, 1.0);
			}
		`;

		const fragmentShader = `
			varying float vAlpha;
			
			void main() {
				// Circular point shape
				float r = distance(gl_PointCoord, vec2(0.5));
				if (r > 0.5) discard;
				
				// Thermal Orange Color (#d4772d)
				// Soft glow effect
				float glow = exp(-r * 4.0);
				vec3 color = vec3(0.83, 0.47, 0.18);
				
				gl_FragColor = vec4(color, vAlpha * glow * 0.8);
			}
		`;

		const material = new THREE.ShaderMaterial({
			uniforms: {
				uTime: { value: 0 },
			},
			vertexShader,
			fragmentShader,
			transparent: true,
			blending: THREE.AdditiveBlending,
			depthWrite: false,
		});

		const points = new THREE.Points(geometry, material);
		scene.add(points);

		// --- RENDERER ---
		const renderer = new THREE.WebGLRenderer({ 
			alpha: true, 
			antialias: true,
			powerPreference: 'high-performance'
		});
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		renderer.setSize(window.innerWidth, window.innerHeight);
		container.appendChild(renderer.domElement);

		// --- ANIMATION ---
		const clock = new THREE.Clock();
		let rafId = 0;
		let disposed = false;

		const animate = () => {
			if (disposed) return;
			rafId = requestAnimationFrame(animate);

			material.uniforms.uTime.value = clock.getElapsedTime();
			renderer.render(scene, camera);
		};

		// --- EVENTS ---
		const handleResize = () => {
			if (disposed) return;
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(window.innerWidth, window.innerHeight);
		};

		window.addEventListener('resize', handleResize);
		animate();

		// --- CLEANUP ---
		return () => {
			disposed = true;
			window.removeEventListener('resize', handleResize);
			cancelAnimationFrame(rafId);
			
			// Only remove the canvas if it's still our child
			if (container.contains(renderer.domElement)) {
				container.removeChild(renderer.domElement);
			}
			
			geometry.dispose();
			material.dispose();
			renderer.dispose();
		};
	}, []);

	return (
		<div
			ref={containerRef}
			className={cn('pointer-events-none fixed inset-0 z-[-1]', className)}
			{...props}
		/>
	);
}
