export const services = [
  {
    id: "home-cleaning",
    name: "Home Cleaning",
    category: "CLEANING",
    icon: "🧹",
    description: "Professional home cleaning for apartments and houses.",
    shortDescription: "Choose your home size and cleaning type.",

    priceRange: "₹699 – ₹2,999",

    options: [
      {
        id: "home-size",
        title: "Select Home Size",
        type: "single",
        choices: [
          { label: "1 BHK", minPrice: 699, maxPrice: 999 },
          { label: "2 BHK", minPrice: 999, maxPrice: 1499 },
          { label: "3 BHK", minPrice: 1399, maxPrice: 1999 },
          { label: "4 BHK", minPrice: 1799, maxPrice: 2499 },
          { label: "Villa / Large House", minPrice: 2499, maxPrice: 3999 },
        ],
      },
      {
        id: "cleaning-type",
        title: "Cleaning Type",
        type: "single",
        choices: [
          { label: "Basic Cleaning", minPrice: 699, maxPrice: 1499 },
          { label: "Deep Cleaning", minPrice: 1299, maxPrice: 2999 },
          { label: "Move In / Move Out", minPrice: 1499, maxPrice: 3499 },
        ],
      },
    ],
  },

  {
    id: "ac-service",
    name: "AC Service",
    category: "COOLING",
    icon: "❄️",
    description: "AC cleaning, servicing and maintenance.",
    shortDescription: "Select your AC type and service required.",

    priceRange: "₹399 – ₹1,999",

    options: [
      {
        id: "ac-type",
        title: "AC Type",
        type: "single",
        choices: [
          { label: "Split AC", minPrice: 499, maxPrice: 999 },
          { label: "Window AC", minPrice: 399, maxPrice: 799 },
          { label: "Cassette AC", minPrice: 999, maxPrice: 1999 },
        ],
      },
      {
        id: "ac-service-type",
        title: "Service Type",
        type: "single",
        choices: [
          { label: "Basic Service", minPrice: 399, maxPrice: 699 },
          { label: "Deep Cleaning", minPrice: 699, maxPrice: 1299 },
          { label: "Gas Check", minPrice: 299, maxPrice: 599 },
          { label: "Installation", minPrice: 999, maxPrice: 1999 },
        ],
      },
    ],
  },

  {
    id: "fan-repair",
    name: "Fan Repair & Installation",
    category: "ELECTRICAL",
    icon: "🌀",
    description: "Ceiling, exhaust, wall and table fan services.",
    shortDescription: "Choose repair, installation or replacement.",

    priceRange: "₹199 – ₹999",

    options: [
      {
        id: "fan-service",
        title: "Select Service",
        type: "single",
        choices: [
          { label: "Fan Installation", minPrice: 199, maxPrice: 499 },
          { label: "Fan Repair", minPrice: 249, maxPrice: 699 },
          { label: "Fan Replacement", minPrice: 299, maxPrice: 999 },
        ],
      },
      {
        id: "fan-extra",
        title: "Additional Work",
        type: "multiple",
        choices: [
          { label: "Capacitor Replacement", minPrice: 150, maxPrice: 300 },
          { label: "Bearing Replacement", minPrice: 250, maxPrice: 600 },
          { label: "Wiring Repair", minPrice: 150, maxPrice: 400 },
        ],
      },
    ],
  },

  {
    id: "air-cooler",
    name: "Air Cooler Service",
    category: "COOLING",
    icon: "💨",
    description: "Air cooler cleaning, repair and maintenance.",
    shortDescription: "Choose the cooler service you need.",

    priceRange: "₹299 – ₹1,499",

    options: [
      {
        id: "cooler-service",
        title: "Select Service",
        type: "single",
        choices: [
          { label: "Basic Service", minPrice: 299, maxPrice: 499 },
          { label: "Deep Cleaning", minPrice: 499, maxPrice: 899 },
          { label: "Repair", minPrice: 399, maxPrice: 999 },
          { label: "Installation", minPrice: 299, maxPrice: 699 },
        ],
      },
    ],
  },

  {
    id: "washing-machine",
    name: "Washing Machine Repair",
    category: "APPLIANCE",
    icon: "🧺",
    description: "Front-load and top-load washing machine repair.",
    shortDescription: "Select your machine type and problem.",

    priceRange: "₹249 – ₹1,999",

    options: [
      {
        id: "washing-machine-type",
        title: "Machine Type",
        type: "single",
        choices: [
          { label: "Top Load", minPrice: 299, maxPrice: 999 },
          { label: "Front Load", minPrice: 399, maxPrice: 1299 },
          { label: "Semi Automatic", minPrice: 249, maxPrice: 799 },
        ],
      },
      {
        id: "washing-machine-problem",
        title: "Problem",
        type: "single",
        choices: [
          { label: "Inspection", minPrice: 249, maxPrice: 399 },
          { label: "Water / Drainage Issue", minPrice: 399, maxPrice: 999 },
          { label: "Spin / Vibration Issue", minPrice: 399, maxPrice: 1199 },
          { label: "Installation", minPrice: 399, maxPrice: 799 },
        ],
      },
    ],
  },

  {
    id: "refrigerator",
    name: "Refrigerator Repair",
    category: "APPLIANCE",
    icon: "🧊",
    description: "Professional refrigerator inspection and repair.",
    shortDescription: "Select refrigerator type and required service.",

    priceRange: "₹299 – ₹2,499",

    options: [
      {
        id: "refrigerator-type",
        title: "Refrigerator Type",
        type: "single",
        choices: [
          { label: "Single Door", minPrice: 299, maxPrice: 999 },
          { label: "Double Door", minPrice: 399, maxPrice: 1499 },
          { label: "Side by Side", minPrice: 599, maxPrice: 2499 },
        ],
      },
      {
        id: "refrigerator-problem",
        title: "Service Required",
        type: "single",
        choices: [
          { label: "Inspection", minPrice: 299, maxPrice: 499 },
          { label: "Cooling Problem", minPrice: 499, maxPrice: 1499 },
          { label: "Gas / Refrigerant Check", minPrice: 500, maxPrice: 1999 },
          { label: "Thermostat Issue", minPrice: 350, maxPrice: 999 },
        ],
      },
    ],
  },

  {
    id: "carpentry",
    name: "Carpentry",
    category: "HOME REPAIR",
    icon: "🪚",
    description: "Furniture repair, installation and custom carpentry work.",
    shortDescription: "Choose the type of carpentry work.",

    priceRange: "₹299 – ₹3,999",

    options: [
      {
        id: "carpentry-service",
        title: "Select Service",
        type: "single",
        choices: [
          { label: "Furniture Repair", minPrice: 299, maxPrice: 999 },
          { label: "Door Repair", minPrice: 399, maxPrice: 1299 },
          { label: "Furniture Assembly", minPrice: 399, maxPrice: 999 },
          { label: "Shelf Installation", minPrice: 299, maxPrice: 799 },
          { label: "Custom Carpentry", minPrice: 999, maxPrice: 3999 },
        ],
      },
    ],
  },

  {
    id: "plumbing",
    name: "Plumbing",
    category: "PLUMBING",
    icon: "🔧",
    description: "Professional plumbing repair and installation services.",
    shortDescription: "Select the plumbing service you need.",

    priceRange: "₹199 – ₹1,999",

    options: [
      {
        id: "plumbing-service",
        title: "Select Service",
        type: "single",
        choices: [
          { label: "Tap Repair", minPrice: 199, maxPrice: 499 },
          { label: "Pipe Leakage", minPrice: 299, maxPrice: 999 },
          { label: "Sink Repair", minPrice: 299, maxPrice: 899 },
          { label: "Toilet Repair", minPrice: 299, maxPrice: 999 },
          { label: "New Installation", minPrice: 499, maxPrice: 1999 },
        ],
      },
    ],
  },

  {
    id: "electrical",
    name: "Electrical Services",
    category: "ELECTRICAL",
    icon: "⚡",
    description: "Electrical repair, installation and maintenance.",
    shortDescription: "Choose the electrical service you require.",

    priceRange: "₹199 – ₹2,499",

    options: [
      {
        id: "electrical-service",
        title: "Select Service",
        type: "single",
        choices: [
          { label: "Switch / Socket Repair", minPrice: 199, maxPrice: 499 },
          { label: "Light Installation", minPrice: 199, maxPrice: 599 },
          { label: "Fan Installation", minPrice: 199, maxPrice: 499 },
          { label: "Wiring Repair", minPrice: 399, maxPrice: 1499 },
          { label: "Electrical Inspection", minPrice: 299, maxPrice: 2499 },
        ],
      },
    ],
  },
];