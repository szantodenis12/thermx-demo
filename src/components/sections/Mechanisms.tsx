'use client';

import { motion, useSpring, useTransform, useScroll } from "framer-motion";
import React from "react";
import { RadiationVisualizer } from "../mechanisms/RadiationVisualizer";
import { ConductionVisualizer } from "../mechanisms/ConductionVisualizer";
import { ConvectionVisualizer } from "../mechanisms/ConvectionVisualizer";

export function Mechanisms() {
	const sectionRef = React.useRef<HTMLElement>(null);
	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start end", "end start"]
	});

	const smoothProgress = useSpring(scrollYProgress, {
		stiffness: 60,
		damping: 25,
		mass: 0.8
	});

	const headOpacity = useTransform(smoothProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0]);

	return (
		<section ref={sectionRef} className="relative min-h-screen bg-transparent py-32 md:py-64 px-6 md:px-24 z-20 overflow-hidden">
			<div className="max-w-[1400px] mx-auto">
				
				<motion.div style={{ opacity: headOpacity }} className="mb-24 flex flex-col items-start gap-4">
						<div className="flex items-center gap-4">
							<div className="w-12 h-[1px] bg-thermal-orange" />
							<span className="text-[10px] font-black uppercase tracking-[0.6em] text-thermal-orange">Tehnologie Nano</span>
						</div>
						<h2 className="text-display text-5xl md:text-8xl leading-[0.85] tracking-[-0.05em] max-w-4xl">
							Blochează toate <br />
							<span className="text-white/20">3 mecanisme.</span>
						</h2>
						<p className="text-sm md:text-lg text-white/40 max-w-xl font-medium leading-relaxed mt-4">
							Transferul termic nu înseamnă doar conducție. Înglobează trei forțe fizice, iar thermX le anihilează pe toate.
						</p>
				</motion.div>

				<div className="bento-grid gap-4 md:gap-6 lg:h-[800px]">
					
					{/* Card 1: Radiație */}
					<div className="bento-item col-span-12 lg:col-span-8 p-12 flex flex-col justify-between group h-[500px] lg:h-auto">
						<div className="absolute top-0 right-0 w-full h-full opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700 pointer-events-none">
							<RadiationVisualizer />
						</div>
						
						<div className="relative z-10 flex flex-col items-start gap-2">
							<span className="text-[10px] font-black uppercase tracking-[0.4em] text-insulation-blue mb-4">Mechanism_01</span>
							<h3 className="text-display text-4xl md:text-6xl text-white">Radiație <br />Infraroșie</h3>
						</div>
						
						<div className="relative z-10 max-w-sm">
							<p className="text-white/50 text-sm leading-relaxed mb-6">
								Respinge radiația termică, păstrând temperatura constantă indiferent de condițiile externe.
							</p>
							<div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-[9px] font-black uppercase tracking-widest text-insulation-blue">
								Eficiență: 85%
							</div>
						</div>
					</div>

					{/* Card 2: Conducție */}
					<div className="bento-item col-span-12 lg:col-span-4 p-12 flex flex-col justify-between group h-[500px] lg:h-auto overflow-hidden">
						<div className="absolute inset-0 bg-gradient-to-br from-thermal-orange/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
						
						<div className="relative z-10">
							<span className="text-[10px] font-black uppercase tracking-[0.4em] text-thermal-orange mb-4 block">Mechanism_02</span>
							<h3 className="text-display text-4xl text-white">Conducție</h3>
						</div>

						<div className="h-48 w-full mt-4 scale-125">
							<ConductionVisualizer />
						</div>

						<div className="relative z-10">
							<p className="text-white/50 text-sm leading-relaxed">
								Structura moleculară elimină punțile termice, oferind o barieră solidă.
							</p>
						</div>
					</div>

					{/* Card 3: Convecție */}
					<div className="bento-item col-span-12 p-12 flex flex-col lg:flex-row items-center justify-between group min-h-[400px]">
						<div className="flex flex-col items-start gap-4 lg:w-1/2 relative z-10">
							<span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 mb-2">Mechanism_03</span>
							<h3 className="text-display text-4xl md:text-7xl text-white mb-6">Convecție</h3>
							<p className="text-white/50 text-sm md:text-lg leading-relaxed max-w-md">
								Sigilează etanș orice suprafață, eliminând pierderile cauzate de curenții de aer.
							</p>
						</div>
						
						<div className="lg:w-1/2 h-[300px] mt-12 lg:mt-0 flex items-center justify-center pointer-events-none filter blur-[1px] group-hover:blur-none transition-all duration-700">
							<ConvectionVisualizer />
						</div>
					</div>

				</div>
			</div>
		</section>
	);
}

