'use client';

import { motion } from 'framer-motion';

export function ConductionVisualizer() {
	return (
		<div className="absolute inset-x-0 bottom-0 top-1/2 overflow-hidden opacity-50 z-0 bg-black/20 pointer-events-none">
			<div className="h-full w-full relative">
				{/* Heat Flow Particles (Standard) */}
				<div className="absolute inset-0 flex">
					<div className="flex-1 h-full border-r border-corporate-white/5 relative">
						<div className="absolute inset-0 bg-thermal-orange/5 animate-pulse" />
						{[...Array(8)].map((_, i) => (
							<motion.div
								key={i}
								animate={{ 
									y: [0, 150, 200, 300],
									opacity: [0, 0.4, 0.4, 0]
								}}
								transition={{ 
									duration: 3, 
									repeat: Infinity, 
									delay: i * 0.5,
									ease: "easeIn"
								}}
								className="absolute w-0.5 h-12 bg-thermal-orange/40 blur-[2px]"
								style={{ left: `${15 + i * 10}%` }}
							/>
						))}
					</div>

					{/* Barriers and Thermal Map Area */}
					<div className="w-1 bg-thermal-orange h-full shadow-[0_0_15px_rgba(255,87,34,0.6)] z-10" />

					<div className="flex-1 h-full bg-insulation-blue/5 overflow-hidden">
						{/* Cold Area */}
						{[...Array(6)].map((_, i) => (
							<motion.div
								key={i}
								animate={{ 
									opacity: [0.1, 0.3, 0.1]
								}}
								transition={{ 
									duration: 2, 
									repeat: Infinity, 
									delay: i * 0.3
								}}
								className="absolute w-full h-8 border-y border-insulation-blue/10 bg-insulation-blue/5"
								style={{ top: `${i * 18}%` }}
							/>
						))}
					</div>
				</div>

				{/* Floating Data Tags - Hidden on small screens to prevent overlap with text */}
				<div className="hidden sm:block absolute top-4 left-4 font-mono text-[9px] text-thermal-orange tracking-widest bg-black/60 px-2 py-1 border border-thermal-orange/20 rounded">
					HT_TRANSFER: BLOCKED
				</div>
				<div className="hidden sm:block absolute top-4 right-4 font-mono text-[9px] text-insulation-blue tracking-widest bg-black/60 px-2 py-1 border border-insulation-blue/20 rounded">
					U_VALUE: 0.04
				</div>
			</div>
		</div>
	);
}
