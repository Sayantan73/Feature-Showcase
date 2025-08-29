import React, { useState, useEffect, useRef, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { FeatureContext } from "../context/FeatureContext.js";


export default function FeatureShowcase() {
  const {features} = useContext(FeatureContext);
  const [active, setActive] = useState(0);
  const showcaseRef = useRef(null);
  const intervalRef = useRef(null);
  const isScrollingRef = useRef(false);

  const nextFeature = () => {
    setActive((prev) => (prev + 1) % features.length);
  };

  const prevFeature = () => {
    setActive((prev) => (prev - 1 + features.length) % features.length);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          intervalRef.current = setInterval(() => {
            setActive((prev) => (prev + 1) % features.length);
          }, 4000);
        } else {
          if (intervalRef.current) clearInterval(intervalRef.current);
        }
      },
      { threshold: 0.5 }
    );

    if (showcaseRef.current) observer.observe(showcaseRef.current);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (showcaseRef.current) observer.unobserve(showcaseRef.current);
    };
  }, []);

  useEffect(() => {
    const handleWheel = (e) => {
      if (isScrollingRef.current) return;
      isScrollingRef.current = true;

      if (e.deltaY > 0) {
        nextFeature();
      } else if (e.deltaY < 0) {
        prevFeature();
      }

      setTimeout(() => {
        isScrollingRef.current = false;
      }, 800); 
    };

    const handleTouch = (() => {
      let startY = 0;
      return {
        start: (e) => {
          startY = e.touches[0].clientY;
        },
        end: (e) => {
          const endY = e.changedTouches[0].clientY;
          const diffY = startY - endY;
          if (Math.abs(diffY) > 50 && !isScrollingRef.current) {
            isScrollingRef.current = true;
            if (diffY > 0) nextFeature();
            else prevFeature();
            setTimeout(() => {
              isScrollingRef.current = false;
            }, 800);
          }
        },
      };
    })();

    const container = showcaseRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: true });
      container.addEventListener("touchstart", handleTouch.start, {
        passive: true,
      });
      container.addEventListener("touchend", handleTouch.end, {
        passive: true,
      });
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
        container.removeEventListener("touchstart", handleTouch.start);
        container.removeEventListener("touchend", handleTouch.end);
      }
    };
  }, []);

  return (
    <section
      ref={showcaseRef}
      className="relative py-12 bg-white flex items-center justify-center min-h-screen overflow-hidden"
    >
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10 items-center px-6">

        <div className="flex flex-col gap-4 text-center lg:text-left order-2 lg:order-1">
          <h3 className="text-blue-600 font-semibold">{features[active].title}</h3>
          <h2 className="text-2xl md:text-3xl font-bold">
            {features[active].heading}
          </h2>
          <ul className="list-disc pl-5 text-gray-600 text-sm space-y-2">
            {features[active].body.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>


          <div className="flex items-center justify-center lg:justify-start gap-4 mt-4">
            <button
              onClick={prevFeature}
              className="p-2 border rounded-full hover:bg-gray-100"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              onClick={nextFeature}
              className="p-2 border rounded-full hover:bg-gray-100"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

     
        <div className="flex justify-center order-1 lg:order-2">
          <div className="relative w-[220px] h-[440px] md:w-[280px] md:h-[560px] bg-black rounded-[2.5rem] shadow-2xl border-[6px] border-gray-900 overflow-hidden flex items-center justify-center">
  
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-2xl z-20"></div>


            <div className="absolute inset-0 z-10">
              <AnimatePresence mode="wait">
                <motion.img
                  key={features[active].id}
                  src={features[active].image}
                  alt={features[active].title}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                />
              </AnimatePresence>
            </div>
          </div>
        </div>

 
        <div className="flex flex-col gap-3 order-3">
          <h3 className="font-semibold text-center lg:text-left">Feature Showcase</h3>
          {features.map((f, index) => (
            <button
              key={f.id}
              onClick={() => setActive(index)}
              className={`text-left px-2 py-1 border-l-4 transition-all duration-300 text-sm md:text-base ${
                active === index
                  ? "border-blue-500 font-semibold text-gray-800"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {f.title} : {f.heading}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}