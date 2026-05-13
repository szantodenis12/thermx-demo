'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

export function ConvectionVisualizer() {
	const [hovered, setHovered] = useState(false);
	const count = useMotionValue(0);
	const rounded = useTransform(count, (latest) => Math.round(latest));

	useEffect(() => {
		const controls = animate(count, hovered ? 0 : 99, {
			duration: 2,
			ease: "circOut"
		});
		return () => controls.stop();
	}, [hovered, count]);

	return (
		<div 
			className="w-full md:w-1/3 aspect-square rounded-2xl border border-corporate-white/10 bg-black/40 flex items-center justify-center p-8 relative overflow-hidden backdrop-blur-xl group"
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
		>
			{/* HUD Scan Grid */}
			<div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40 group-hover:opacity-100 transition-opacity duration-700" />
			
			{/* Moving Laser Scan Line */}
			<motion.div
				animate={{ y: ["0%", "100%", "150%"] }}
				transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
				className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-corporate-white/20 to-transparent z-10 blur-[1px]"
			/>

			<div className="text-center relative z-20 w-full select-none">
				<div 
					className="text-7xl font-bold text-corporate-white mb-2 tracking-tighter font-display tabular-nums"
					style={{ fontVariantNumeric: 'tabular-nums' }}
				>
					<motion.span>{rounded}</motion.span>
				</div>
				<div className="text-corporate-white/50 text-[10px] uppercase tracking-[0.3em] font-bold font-display">
					{hovered ? "SEALING: 100%" : "AIR_LEAKS: DETECTED"}
				</div>
			</div>

			{/* Corner Tech Lines */}
			<div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-corporate-white/20" />
			<div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-corporate-white/20" />
			<div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-corporate-white/20" />
			<div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-corporate-white/20" />
		</div>
	);
}
