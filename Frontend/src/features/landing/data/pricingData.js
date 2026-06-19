export const pricingPlans = [
    {
        id: "free",
        title: "Free",
        subtitle: "The essentials to get started.",
        price: "$0",
        period: "/forever",
        features: [
            { text: "Basic resume tools", included: true },
            { text: "5 mock questions", included: true },
            { text: "Full skill analysis", included: false }
        ],
        buttonText: "Start Free",
        isPopular: false,
        buttonVariant: "outline"
    },
    {
        id: "pro",
        title: "Pro",
        subtitle: "Accelerate your hireability.",
        price: "$09",
        period: "/mo",
        aiHighlight: "Advanced neural feedback loop for every answer.",
        features: [
            { text: "Unlimited mock interviews", included: true },
            { text: "Full skill analysis dashboard", included: true },
            { text: "PDF resume export", included: true },
            { text: "Priority community access", included: true }
        ],
        buttonText: "Go Pro Now",
        isPopular: true,
        buttonVariant: "primary"
    },
    {
        id: "elite",
        title: "Elite",
        subtitle: "The ultimate career unfair advantage.",
        price: "$19",
        period: "/mo",
        features: [
            { text: "Personal Coaching AI", included: true },
            { text: "Priority 24/7 support", included: true },
            { text: "Direct feedback from recruiters", included: true },
            { text: "Mock salary negotiation", included: true }
        ],
        buttonText: "Get Elite Access",
        isPopular: false,
        buttonVariant: "outline"
    }
];
