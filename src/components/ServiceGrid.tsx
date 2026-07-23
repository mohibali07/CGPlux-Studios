"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity";
import { gsap } from "@/lib/gsap";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface Service {
  _id: string;
  title: string;
  description?: string;
  tags?: string[];
  image?: any;
  slug?: { current: string };
}

interface ServiceGridProps {
  services: Service[];
}

export default function ServiceGrid({ services }: ServiceGridProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const fallback = [
    { title: "Software Development", slug: { current: "software-development" }, tags: ["Custom Apps", "Enterprise", "APIs"], image: "/images/services/software_development.png" },
    { title: "Graphic Design", slug: { current: "graphic-design" }, tags: ["Branding", "UI/UX", "Visual Identity"], image: "/images/services/graphic_design.png" },
    { title: "SEO", slug: { current: "seo" }, tags: ["Ranking", "Optimization", "Content"], image: "/images/services/seo.png" },
    { title: "Web Development", slug: { current: "web-development" }, tags: ["React", "Next.js", "E-commerce"], image: "/images/services/web_development.png" },
    { title: "Digital Marketing", slug: { current: "digital-marketing" }, tags: ["Campaigns", "Social Media", "Growth"], image: "/images/services/digital_marketing.png" },
    { title: "3D Animation", slug: { current: "3d-animation" }, tags: ["3D Visualization", "Architectural", "CGI"], image: "/images/services/3d.png" },
  ];

  const items: Service[] =
    services.length > 0
      ? services
      : fallback.map((f, i) => ({ _id: String(i), ...f }));

  // Animation on activeIdx change
  useEffect(() => {
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { scale: 1.15, opacity: 0, filter: "blur(20px)", rotationY: -10 },
        { scale: 1, opacity: 1, filter: "blur(0px)", rotationY: 0, duration: 1.2, ease: "power3.out" }
      );
    }
  }, [activeIdx]);

  // Initial Stagger Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".service-item",
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!imageRef.current) return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    
    gsap.to(imageRef.current, {
      x: x * 40,
      y: y * 40,
      rotationY: x * 15,
      rotationX: -y * 15,
      ease: "power2.out",
      duration: 0.6
    });
  };

  const handleMouseLeave = () => {
    if (!imageRef.current) return;
    gsap.to(imageRef.current, {
      x: 0,
      y: 0,
      rotationY: 0,
      rotationX: 0,
      ease: "elastic.out(1, 0.5)",
      duration: 1.5
    });
  };

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-brand-dark overflow-hidden">
      <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row gap-16 lg:gap-24 relative z-10">
        
        {/* Left Typography List */}
        <div className="lg:w-1/2 flex flex-col justify-center">
          <div className="mb-16 md:mb-24">
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-white/40 mb-6 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-brand-accent"></span>
              Our Services
            </div>
            <h2 className="font-heading font-medium tracking-tight text-[48px] md:text-[64px] leading-[1.1] text-white">
              What We Do Best.
            </h2>
          </div>

          <div className="flex flex-col gap-4 md:gap-6">
            {items.map((service, idx) => {
              const isActive = idx === activeIdx;
              return (
                <div key={service._id} className="service-item flex flex-col border-b border-white/[0.05] pb-4 md:pb-6 last:border-0 opacity-0">
                  <button
                    onMouseEnter={() => setActiveIdx(idx)}
                    onClick={() => setActiveIdx(idx)}
                    className="group flex items-center gap-6 md:gap-8 text-left cursor-pointer w-full"
                  >
                    <span
                      className={`font-mono text-sm tracking-[0.2em] transition-colors duration-500 ${
                        isActive ? "text-brand-accent" : "text-white/20 group-hover:text-white/40"
                      }`}
                    >
                      0{idx + 1}
                    </span>
                    <h3
                      className={`font-heading text-3xl md:text-[48px] font-bold tracking-tight transition-all duration-[0.8s] ease-[cubic-bezier(0.25,1,0.5,1)] ${
                        isActive ? "text-white translate-x-2 md:translate-x-6 scale-105 origin-left" : "text-white/20 group-hover:text-white/50"
                      }`}
                    >
                      {service.title}
                    </h3>
                  </button>
                  
                  {/* Expanded Content (Tags & CTA) */}
                  <div
                    className={`pl-14 md:pl-[6.5rem] overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                      isActive ? "max-h-[200px] mt-6 md:mt-8 opacity-100" : "max-h-0 mt-0 opacity-0"
                    }`}
                  >
                    {service.tags && (
                      <div className="flex flex-wrap gap-3 mb-6 md:mb-8">
                        {service.tags.map((tag) => (
                          <span key={tag} className="px-4 py-1.5 border border-white/10 rounded-full text-[10px] md:text-[11px] font-mono tracking-[0.15em] uppercase text-white/60 bg-white/[0.02]">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <Link
                      href={service.slug ? `/services/${service.slug.current}` : '#'}
                      className="group/btn inline-flex items-center gap-4 text-xs md:text-sm font-mono uppercase tracking-[0.2em] text-white/80 hover:text-brand-accent transition-colors duration-300"
                    >
                      Explore Service 
                      <span className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-brand-accent transition-all duration-500 group-hover/btn:bg-brand-accent group-hover/btn:text-brand-dark group-hover/btn:border-brand-accent group-hover/btn:translate-x-2">
                        &rarr;
                      </span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Visual Panel with 3D Parallax */}
        <div 
          className="lg:w-1/2 flex items-center justify-center min-h-[500px] lg:min-h-[700px] perspective-[1000px]"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div className="relative w-full aspect-[4/5] lg:aspect-[3/4] lg:h-[90%] overflow-hidden bg-black border border-white/[0.08] rounded-2xl group shadow-2xl">
            {items[activeIdx].image ? (
              <div ref={imageRef} className="absolute inset-0 w-full h-full transform-style-3d">
                <Image
                  src={
                    typeof items[activeIdx].image === "string"
                      ? items[activeIdx].image
                      : urlFor(items[activeIdx].image).width(1200).height(1600).url()
                  }
                  alt={items[activeIdx].title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                  priority
                />
              </div>
            ) : (
              <div ref={imageRef} className="absolute inset-0 w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-900/50 to-black transform-style-3d">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(56,199,192,0.15),transparent_50%)] opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
                <span className="relative z-10 font-mono text-xs text-white/40 uppercase tracking-[0.2em]">{items[activeIdx].title}</span>
              </div>
            )}
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(56,199,192,0.03)] group-hover:shadow-[inset_0_0_100px_rgba(56,199,192,0.15)] transition-shadow duration-700 pointer-events-none" />
            
            {/* Minimal Decorative Corner Accents */}
            <div className="absolute top-8 left-8 w-6 h-6 border-t border-l border-white/20 transition-all duration-700 group-hover:border-brand-accent/50 group-hover:-translate-x-2 group-hover:-translate-y-2 z-10 pointer-events-none"></div>
            <div className="absolute top-8 right-8 w-6 h-6 border-t border-r border-white/20 transition-all duration-700 group-hover:border-brand-accent/50 group-hover:translate-x-2 group-hover:-translate-y-2 z-10 pointer-events-none"></div>
            <div className="absolute bottom-8 left-8 w-6 h-6 border-b border-l border-white/20 transition-all duration-700 group-hover:border-brand-accent/50 group-hover:-translate-x-2 group-hover:translate-y-2 z-10 pointer-events-none"></div>
            <div className="absolute bottom-8 right-8 w-6 h-6 border-b border-r border-white/20 transition-all duration-700 group-hover:border-brand-accent/50 group-hover:translate-x-2 group-hover:translate-y-2 z-10 pointer-events-none"></div>
          </div>
        </div>
        
      </div>
    </section>
  );
}
