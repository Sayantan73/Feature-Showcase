import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

const features = [
  {
    id: 1,
    title: "Feature No.1",
    heading: "TEXT HEADING DISPLAY",
    body: [
      "Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod.",
      "Ut enim minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip.",
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque.",
      "Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit.",
    ],
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    title: "Feature No.2",
    heading: "POWERFUL UI KIT",
    body: [
      "Clean and modern UI components.",
      "Fully customizable with Tailwind.",
      "Responsive and mobile-first design.",
      "Lightweight and performance optimized.",
    ],
    image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=500&auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    title: "Feature No.3",
    heading: "SEAMLESS INTEGRATION",
    body: [
      "Easy integration with APIs.",
      "Supports multiple frameworks.",
      "Developer-friendly documentation.",
      "Optimized for production apps.",
    ],
    image: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=500&auto=format&fit=crop&q=80",
  },
  {
    id: 4,
    title: "Feature No.4",
    heading: "PERFORMANCE OPTIMIZED",
    body: [
      "Blazing fast rendering.",
      "Low bundle size.",
      "Pre-configured for caching.",
      "Seamless lazy loading.",
    ],
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=80",
  },
  {
    id: 5,
    title: "Feature No.5",
    heading: "CROSS PLATFORM",
    body: [
      "Works on all devices.",
      "Consistent design system.",
      "Touch friendly for mobile.",
      "Scales beautifully on desktop.",
    ],
    image: "https://images.unsplash.com/photo-1523473827534-86c9290b8f21?w=500&auto=format&fit=crop&q=80",
  },
];

export default function FeatureShowcase() {
  const [active, setActive] = useState(0);
  const showcaseRef = useRef(null);

  const nextFeature = () => {
    setActive((prev) => (prev + 1) % features.length);
  };

  const prevFeature = () => {
    setActive((prev) => (prev - 1 + features.length) % features.length);
  };

  // Auto advance when section in view
  useEffect(() => {
    let interval;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          interval = setInterval(() => {
            setActive((prev) => (prev + 1) % features.length);
          }, 4000);
        } else {
          clearInterval(interval);
        }
      },
      { threshold: 0.5 }
    );

    if (showcaseRef.current) observer.observe(showcaseRef.current);

    return () => {
      clearInterval(interval);
      if (showcaseRef.current) observer.unobserve(showcaseRef.current);
    };
  }, []);

  return (
    <section
      ref={showcaseRef}
      className="relative py-12 bg-white flex items-center justify-center min-h-screen"
    >
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10 items-center px-6">
        {/* Left side - text */}
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

          {/* Arrows */}
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

        {/* Middle - iPhone mockup */}
        <div className="flex justify-center order-1 lg:order-2">
          <div className="relative w-[220px] h-[440px] md:w-[280px] md:h-[560px] bg-black rounded-[2.5rem] shadow-2xl border-[6px] border-gray-900 overflow-hidden flex items-center justify-center">
            {/* Screen */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-6 bg-gray-800 rounded-full"></div>

            <AnimatePresence mode="wait">
              <motion.img
                key={features[active].id}
                src={features[active].image}
                alt={features[active].title}
                className="w-full h-full object-cover"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              />
            </AnimatePresence>
          </div>
        </div>

        {/* Right side - Feature list */}
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
