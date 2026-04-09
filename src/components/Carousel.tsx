import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselProps {
  items: {
    title: string;
    description: string;
    image: string;
    tag?: string;
  }[];
  accentColor?: string;
}

export default function Carousel({ items, accentColor = '#6366f1' }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (!isHovered) {
      timeoutRef.current = window.setInterval(() => {
        nextSlide();
      }, 5000);
    }
    return () => {
      if (timeoutRef.current) clearInterval(timeoutRef.current);
    };
  }, [isHovered, currentIndex]);

  return (
    <div 
      className="relative group w-full overflow-hidden rounded-[32px] glass-card border border-white/10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Glow */}
      <div 
        className="absolute inset-0 opacity-20 blur-[100px] pointer-events-none transition-colors duration-1000"
        style={{ background: accentColor }}
      />

      <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden">
        {items.map((item, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-all duration-700 ease-in-out flex flex-col md:flex-row ${
              idx === currentIndex ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'
            }`}
          >
            {/* Image Section */}
            <div className="w-full md:w-2/3 h-full relative overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-[2000ms] hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent" />
            </div>

            {/* Content Section */}
            <div className="w-full md:w-1/3 bg-black/60 backdrop-blur-xl p-8 md:p-12 flex flex-col justify-center border-l border-white/5">
              {item.tag && (
                <span 
                  className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 border"
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
                 <div className="flex gap-1.5">
                    {items.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentIndex(i)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          i === currentIndex ? 'w-8' : 'w-2 bg-white/20'
                        }`}
                        style={{ backgroundColor: i === currentIndex ? accentColor : undefined }}
                      />
                    ))}
                 </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all hover:bg-white/10 active:scale-90"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-[calc(33.33%+24px)] hidden md:flex top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/5 border border-white/10 items-center justify-center text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all hover:bg-white/10 active:scale-90"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
      
      {/* Mobile Next Button */}
      <button
        onClick={nextSlide}
        className="absolute right-6 md:hidden top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all hover:bg-white/10"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
