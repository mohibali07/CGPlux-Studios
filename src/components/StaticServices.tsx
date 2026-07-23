"use client";

import React from "react";
import {
  Video,
  Box,
  MonitorPlay,
  Film,
  Sparkles,
  PencilRuler,
  Sofa,
  Home,
  Wand2,
  SlidersHorizontal,
  Layers
} from "lucide-react";

const staticServices = [
  {
    title: "3D Designing",
    description: "3D designing involves creating detailed and realistic digital models or visualizations using specialized software.",
    icon: Video,
  },
  {
    title: "Product Designing",
    description: "Producing realistic 3D product designs to convey concepts effectively.",
    icon: Box,
  },
  {
    title: "Product Animation",
    description: "Bringing products to life through stunning animations.",
    icon: MonitorPlay,
  },
  {
    title: "CGI Advertisment",
    description: "Crafting attention-grabbing advertisements based on your ideas.",
    icon: Film,
  },
  {
    title: "CG Animation",
    description: "CG animation creates moving images using 3D computer graphics to bring characters and environments to life with realistic movement and intricate details.",
    icon: Sparkles,
  },
  {
    title: "Architecture Design",
    description: "Offering comprehensive designs of innovative architectural structures.",
    icon: PencilRuler,
  },
  {
    title: "Interior Design",
    description: "Developing beautiful and functional interior designs.",
    icon: Sofa,
  },
  {
    title: "Exterior Design",
    description: "Designing: Crafting stunning exterior designs that amaze.",
    icon: Home,
  },
  {
    title: "Visual Effects",
    description: "Enhancing visuals with cutting-edge VFX.",
    icon: Wand2,
  },
  {
    title: "Post Production",
    description: "Perfecting projects with top-of-the-line post-production services.",
    icon: SlidersHorizontal,
  },
  {
    title: "Motion Graphics",
    description: "Motion graphics are digital animations combining text, shapes, and images to create dynamic visual content.",
    icon: Layers,
  }
];

export default function StaticServices({ hideHeader = false }: { hideHeader?: boolean }) {
  return (
    <section className="py-24 md:py-32 bg-[#0a0a0a] relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[500px] bg-brand-accent/5 blur-[120px] rounded-[100%] pointer-events-none" />
      
      <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Header */}
        {!hideHeader && (
          <div className="flex flex-col items-center justify-center text-center mb-16 md:mb-24">
            <div className="font-mono text-[11px] md:text-xs uppercase tracking-[0.25em] text-white/60 mb-6 flex items-center gap-4">
              OUR SERVICES
            </div>
            <h2 className="font-heading font-bold tracking-tight text-[48px] md:text-[64px] leading-[1.1] text-white">
              What we do
            </h2>
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-white/[0.06]">
          {staticServices.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div 
                key={idx} 
                className="group relative border-r border-b border-white/[0.06] p-10 md:p-14 flex flex-col items-start bg-[#0a0a0a] overflow-hidden transition-all duration-500"
              >
                {/* Hover Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                
                {/* Icon wrapper */}
                <div className="mb-8 relative flex items-center justify-center w-16 h-16 rounded-2xl bg-white/[0.02] border border-white/[0.05] group-hover:border-brand-accent/40 group-hover:bg-brand-accent/10 transition-all duration-500 z-10">
                  <div className="absolute inset-0 bg-brand-accent/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <Icon className="w-7 h-7 text-white/70 group-hover:text-brand-accent transition-all duration-500 relative z-10 group-hover:scale-110" strokeWidth={1.5} />
                </div>

                <div className="relative z-10 flex flex-col items-start transform transition-transform duration-500 group-hover:-translate-y-1">
                  <h3 className="font-heading text-2xl md:text-[26px] font-bold text-white mb-4">
                    {service.title}
                  </h3>
                  <p className="text-white/50 group-hover:text-white/70 text-base leading-[1.6] font-light transition-colors duration-500">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
}
