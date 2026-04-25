import { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';

export interface CarouselItem {
  title: string;
  description: string;
  image?: string;        // static screenshot (optional when video is provided)
  video?: string;        // path/URL to mp4 video (takes priority over image)
  tag?: string;
  link?: string;
}

interface CarouselProps {
  items: CarouselItem[];
  accentColor?: string;
  autoPlayInterval?: number;
  className?: string;
}

export default function Carousel({ 
  items, 
  accentColor = '#6366f1', 
  autoPlayInterval = 5000,
  className = ""
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<number | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  }, [items.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  }, [items.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // ── Auto-play Logic ────────────────────────────────────────────────────────
  useEffect(() => {
    if (items.length <= 1) return;

    if (!isHovered) {
      timerRef.current = window.setInterval(nextSlide, autoPlayInterval);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isHovered, nextSlide, autoPlayInterval, items.length]);

  if (!items || items.length === 0) return null;

  return (
    <div 
      className={`relative group w-full overflow-hidden rounded-[32px] glass-card border border-white/10 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Ambient Glow */}
      <div 
        className="absolute inset-0 opacity-20 blur-[100px] pointer-events-none transition-colors duration-1000"
        style={{ background: accentColor }}
      />

      <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden">
        {items.map((item, idx) => (
          <div
            key={`${item.title}-${idx}`}
            className={`absolute inset-0 transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] ${
              idx === currentIndex 
                ? 'opacity-100 scale-100 translate-x-0' 
                : 'opacity-0 scale-95 translate-x-12 blur-sm pointer-events-none'
            } ${item.video ? 'flex flex-col' : 'flex flex-col md:flex-row'}`}
          >
            {item.video ? (
              /* ── VIDEO SLIDE: Optimized to only render/play when active ── */
              <div className="relative w-full h-full bg-black">
                {idx === currentIndex && (
                  <video
                    src={item.video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    controls
                    className="w-full h-full object-contain"
                    style={{ display: 'block' }}
                  />
                )}

                {/* Live Demo badge */}
                <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 z-20">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                  </span>
                  <Play className="w-3 h-3 text-white" />
                  <span className="text-[10px] font-bold text-white uppercase tracking-widest">Live Demo</span>
                </div>

                {/* Bottom gradient scrim + text overlay — adjusted padding for controls */}
                <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)' }}
                >
                  <div className="pt-20 pb-12 px-6 md:px-10 pointer-events-auto">
                    {item.tag && (
                      <span
                        className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-3 border"
                        style={{ color: accentColor, borderColor: `${accentColor}40`, backgroundColor: `${accentColor}15` }}
                      >
                        {item.tag}
                      </span>
                    )}
                    <h3 className="text-xl md:text-3xl font-black text-white mb-1 leading-tight drop-shadow-lg">
                      {item.title}
                    </h3>
                    <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-2xl opacity-90">
                      {item.description}
                    </p>

                    {/* Dot indicators */}
                    <div className="flex gap-2 mt-6">
                      {items.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => goToSlide(i)}
                          className={`h-1.5 rounded-full transition-all duration-500 ${
                            i === currentIndex ? 'w-10' : 'w-2 bg-white/20'
                          }`}
                          style={{ backgroundColor: i === currentIndex ? accentColor : undefined }}
                          aria-label={`Go to slide ${i + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* ── IMAGE SLIDE: Original side-by-side layout ── */
              <>
                <div className="w-full md:w-2/3 h-full relative overflow-hidden bg-black">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-[4000ms] ease-out hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/30 to-transparent" />
                </div>

                {/* Content sidebar */}
                <div className="w-full md:w-1/3 bg-[#05050a]/80 backdrop-blur-3xl p-8 md:p-12 flex flex-col justify-center border-l border-white/5 relative z-10">
                  {item.tag && (
                    <span
                      className="inline-block self-start px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 border"
                      style={{ color: accentColor, borderColor: `${accentColor}40`, backgroundColor: `${accentColor}10` }}
                    >
                      {item.tag}
                    </span>
                  )}
                  <h3 className="text-2xl md:text-4xl font-black text-white mb-6 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-sm md:text-lg leading-relaxed mb-10">
                    {item.description}
                  </p>

                  <div className="mt-auto flex items-center gap-4">
                    <div className="flex gap-2">
                      {items.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => goToSlide(i)}
                          className={`h-1.5 rounded-full transition-all duration-500 ${
                            i === currentIndex ? 'w-10' : 'w-2 bg-white/20'
                          }`}
                          style={{ backgroundColor: i === currentIndex ? accentColor : undefined }}
                          aria-label={`Go to slide ${i + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>


      {/* Navigation Controls */}
      <div className="absolute inset-0 flex items-center justify-between p-6 pointer-events-none">
        <button
          onClick={prevSlide}
          className="pointer-events-auto w-12 h-12 rounded-full bg-black/20 border border-white/10 flex items-center justify-center text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all hover:bg-white/10 active:scale-90"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        
        {/* The "Next" button position adjusts based on layout (Video=Full, Image=2/3 split) */}
        <div className="flex items-center gap-4 pointer-events-none w-full justify-end">
          <button
            onClick={nextSlide}
            className={`pointer-events-auto hidden md:flex w-12 h-12 rounded-full bg-black/20 border border-white/10 items-center justify-center text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all hover:bg-white/10 active:scale-90 ${
              items[currentIndex]?.video ? 'mr-0' : 'mr-[33.33%]'
            }`}
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          
          <button
            onClick={nextSlide}
            className="pointer-events-auto md:hidden w-10 h-10 rounded-full bg-black/20 border border-white/10 flex items-center justify-center text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all hover:bg-white/10"
            aria-label="Next slide mobile"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

