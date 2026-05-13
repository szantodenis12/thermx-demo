import { motion } from 'framer-motion';

export function RadiationVisualizer() {
	return (
		<div className="absolute inset-0 z-0 overflow-hidden opacity-40 pointer-events-none">
			{/* Radar Circles */}
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center">
				{[1, 2, 3].map((i) => (
					<motion.div
						key={i}
						initial={{ scale: 0.5, opacity: 0 }}
						animate={{ 
							scale: 2, 
							opacity: [0, 0.2, 0] 
						}}
						transition={{ 
							duration: 3, 
							repeat: Infinity, 
							delay: i * 1,
							ease: "easeOut"
						}}
						className="absolute border border-insulation-blue rounded-full w-64 h-64"
					/>
				))}
			</div>

			{/* Scanning Line */}
			<motion.div
				animate={{ 
					rotate: 360 
				}}
				transition={{ 
					duration: 10, 
					repeat: Infinity, 
					ease: "linear" 
				}}
				className="absolute top-1/2 left-1/2 w-full h-0.5 bg-gradient-to-r from-insulation-blue/40 to-transparent -translate-y-1/2 origin-left"
			/>

			{/* Wave Reflection Particles */}
			<div className="absolute inset-0">
				{[...Array(12)].map((_, i) => (
					<motion.div
						key={i}
						initial={{ x: "0%", y: "40%", opacity: 0 }}
						animate={{ 
							x: ["0%", "50%", "-100%"],
							opacity: [0, 1, 1, 0],
						}}
						transition={{ 
							duration: 4, 
							repeat: Infinity, 
							delay: i * 0.4,
							times: [0, 0.4, 1],
							ease: "easeInOut"
						}}
						className="absolute w-12 h-0.5 bg-gradient-to-r from-thermal-orange to-transparent blur-[1px]"
						style={{ 
							top: `${20 + i * 5}%`,
							transform: `rotate(${Math.random() * 20 - 10}deg)`
						}}
					/>
				))}
			</div>

			{/* HUD Stats - Hidden on mobile to prevent overlap with title/description */}
			<div className="hidden sm:flex absolute bottom-6 right-6 font-mono text-[8px] text-insulation-blue/40 flex-col gap-1 tracking-widest text-right">
				<div>DETECTION: INFRARED_TYPE_B</div>
				<div>REFLECTION: 0.85</div>
				<div>UNIT: THERMX_1MM</div>
			</div>
		</div>
	);
}
