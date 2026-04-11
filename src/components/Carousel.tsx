import { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface CarouselItem {
  title: string;
  description: string;
  image: string;
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
            className={`absolute inset-0 transition-all duration-700 ease-in-out flex flex-col md:flex-row ${
              idx === currentIndex ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12 pointer-events-none'
            }`}
          >
            {/* Image Section */}
            <div className="w-full md:w-2/3 h-full relative overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-[3000ms] hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/20 to-transparent" />
            </div>

            {/* Content Section */}
            <div className="w-full md:w-1/3 bg-black/60 backdrop-blur-xl p-8 md:p-12 flex flex-col justify-center border-l border-white/5 relative z-10">
              {item.tag && (
                <span 
                  className="inline-block self-start px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 border"
                  style={{ color: accentColor, borderColor: `${accentColor}40`, backgroundColor: `${accentColor}10` }}
                >
                  {item.tag}
                </span>
              )}
              <h3 className="text-2xl md:text-3xl font-black text-white mb-4 leading-tight">
                {item.title}
              </h3>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-8">
                {item.description}
              </p>
              
              <div className="mt-auto flex items-center gap-4">
                 <div className="flex gap-2">
                    {items.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => goToSlide(i)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
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
        
        {/* The "Next" button layout differs slightly for Desktop vs Mobile to avoid overlapping content */}
        <div className="flex items-center gap-4 pointer-events-none">
          <button
            onClick={nextSlide}
            className="pointer-events-auto hidden md:flex mr-[33.33%] w-12 h-12 rounded-full bg-black/20 border border-white/10 items-center justify-center text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all hover:bg-white/10 active:scale-90"
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

