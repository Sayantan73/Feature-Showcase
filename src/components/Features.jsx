import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

const features = [
  { id: 1, title: "Feature No.1", heading: "TEXT HEADING DISPLAY", body: ["Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod.", "Ut enim minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip.", "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque.", "Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit."], image: "https://via.placeholder.com/300x600/ff0000/ffffff?text=Feature+1" },
  { id: 2, title: "Feature No.2", heading: "POWERFUL UI KIT", body: ["Clean and modern UI components.", "Fully customizable with Tailwind.", "Responsive and mobile-first design.", "Lightweight and performance optimized."], image: "https://via.placeholder.com/300x600/00ff00/ffffff?text=Feature+2" },
  { id: 3, title: "Feature No.3", heading: "SEAMLESS INTEGRATION", body: ["Easy integration with APIs.", "Supports multiple frameworks.", "Developer-friendly documentation.", "Optimized for production apps."], image: "https://via.placeholder.com/300x600/0000ff/ffffff?text=Feature+3" },
  { id: 4, title: "Feature No.4", heading: "PERFORMANCE OPTIMIZED", body: ["Blazing fast rendering.", "Low bundle size.", "Pre-configured for caching.", "Seamless lazy loading."], image: "https://via.placeholder.com/300x600/ff00ff/ffffff?text=Feature+4" },
  { id: 5, title: "Feature No.5", heading: "CROSS PLATFORM", body: ["Works on all devices.", "Consistent design system.", "Touch friendly for mobile.", "Scales beautifully on desktop."], image: "https://via.placeholder.com/300x600/00ffff/000000?text=Feature+5" }
];

export default function FeatureShowcase() {
  const [active, setActive] = useState(0);
  const showcaseRef = useRef(null);
  const intervalRef = useRef(null);

  const nextFeature = () => {
    setActive((prev) => (prev + 1) % features.length);
  };

  const prevFeature = () => {
    setActive((prev) => (prev - 1 + features.length) % features.length);
  };

  // Auto-advance in correct order (looping)
  useEffect(() => {
    const startAuto = () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setActive((prev) => (prev + 1) % features.length);
      }, 4000);
    };

    startAuto();
    return () => clearInterval(intervalRef.current);
  }, []);

  // Smooth scroll feature change with mouse wheel
  useEffect(() => {
    const node = showcaseRef.current;
    if (!node) return;

    let isScrolling = false;

    const handleWheel = (e) => {
      if (isScrolling) return;
      isScrolling = true;

      if (e.deltaY > 0) {
        setActive((prev) => (prev + 1) % features.length);
      } else if (e.deltaY < 0) {
        setActive((prev) => (prev - 1 + features.length) % features.length);
      }

      setTimeout(() => {
        isScrolling = false;
      }, 600);
    };

    node.addEventListener("wheel", handleWheel, { passive: false });
    return () => node.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <section ref={showcaseRef} className="relative py-10 bg-white">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        {/* Left side - text */}
        <div className="flex flex-col gap-4">
          <h3 className="text-blue-600 font-semibold">{features[active].title}</h3>
          <h2 className="text-xl font-bold">{features[active].heading}</h2>
          <ul className="list-disc pl-5 text-gray-600 text-sm space-y-2">
            {features[active].body.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>

          {/* Arrows */}
          <div className="flex items-center gap-4 mt-4">
            <button onClick={prevFeature} className="p-2 border rounded-full hover:bg-gray-100">
              <ArrowLeft size={18} />
            </button>
            <button onClick={nextFeature} className="p-2 border rounded-full hover:bg-gray-100">
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Middle - iPhone image */}
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center"
        >
          <img
            src={features[active].image}
            alt={features[active].title}
            className="max-h-[500px] rounded-2xl shadow-lg"
          />
        </motion.div>

        {/* Right side - Feature list */}
        <div className="flex flex-col gap-4">
          <h3 className="font-semibold">Feature Showcase</h3>
          {features.map((f, index) => (
            <button
              key={f.id}
              onClick={() => setActive(index)}
              className={`text-left px-2 py-1 border-l-4 transition-all duration-300 ${
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
