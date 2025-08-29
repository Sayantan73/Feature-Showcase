import { useState } from "react";
import { FeatureContext } from "./FeatureContext.jsx";


export default function FeatureProvider({ children }) {
    const [features, setFeatures] = useState(
        [
            {
                id: 1,
                title: "Feature No.1",
                heading: "MODERN UI COMPONENTS",
                body: [
                    "Clean and modern UI components.",
                    "Fully customizable with Tailwind.",
                    "Responsive and mobile-first design.",
                    "Lightweight and performance optimized.",
                ],
                image:
                    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&auto=format&fit=crop&q=80",
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
                image:
                    "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=500&auto=format&fit=crop&q=80",
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
                image:
                    "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&auto=format&fit=crop&q=80",
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
                image:
                    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=80",
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
                image:
                    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80",
            },
        ]
    );

    return (<FeatureContext.Provider value={{ features, setFeatures }}>
        {children}
    </FeatureContext.Provider>)
}