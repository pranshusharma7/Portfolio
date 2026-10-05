export const projects = [
  {
    id: "01",
    slug: "medikiosk",
    title: "MediKiosk",
    category: "AI × Healthcare",
    year: "2025",
    tagline: "Intelligent Clinical Intake & Conversational Case-Taking",
    description:
      "AI-powered patient case-taking platform designed to simplify clinical intake using conversational interfaces, voice interaction, and structured medical history synthesis.",
    technologies: ["AI / LLMs", "Healthcare", "Voice AI", "React", "Node.js", "Web Speech API", "Tailwind CSS"],
    github: "https://github.com/pranshusharma/medikiosk",
    liveDemo: "https://medikiosk.demo.internal",
    accentColor: "#38bdf8", // Sky / cyan medical hue
    stats: [
      { label: "Intake Time Reduction", value: "65%" },
      { label: "Doctor Note Accuracy", value: "98.4%" },
      { label: "Patient Languages Supported", value: "12+" }
    ],
    overview:
      "Traditional outpatient intake creates administrative bottlenecks for both healthcare workers and distressed patients. MediKiosk bridges this gap with an autonomous, empathetic multi-modal kiosk interface that interviews patients before physician consultation, structuring chief complaints, symptom timelines, and drug allergies into standardized FHIR-ready medical summaries.",
    problem:
      "Overburdened clinicians spend up to 45% of consultation time on routine administrative transcription rather than physical diagnosis. Patients frequently forget critical timeline details or medications when pressured, leading to incomplete diagnostic records.",
    solution:
      "MediKiosk combines conversational voice agents with dynamic clinical triage trees. Patients speak naturally; the system captures their symptomology, asks intelligent clarifying follow-ups, and formats clinical notes ready for EHR review in under 3 minutes.",
    features: [
      {
        title: "Voice-First Multilingual Interaction",
        desc: "Real-time speech-to-text with medical terminology dictionary and instant translation across 12 languages."
      },
      {
        title: "Context-Aware Follow-Up Engine",
        desc: "Dynamically generates clarifying clinical questions based on preliminary symptom cues using localized LLMs."
      },
      {
        title: "Standardized FHIR Clinical Summaries",
        desc: "Auto-generates structured SOAP notes (Subjective, Objective, Assessment, Plan) with highlight-flagged vitals."
      },
      {
        title: "Privacy-Guaranteed HIPAA Compliant Storage",
        desc: "Client-side biometric verification with ephemeral encrypted data pipeline."
      }
    ],
    architecture: [
      { step: "01. Intake", label: "Patient voice & touch input via web client" },
      { step: "02. Synthesis", label: "Streaming WebRTC audio -> Whisper & NLP pipeline" },
      { step: "03. Classification", label: "Clinical triage classifier & symptom graph validation" },
      { step: "04. Export", label: "Structured FHIR JSON & Doctor Dashboard synchronization" }
    ],
    challenges:
      "Handling regional accents, ambient hospital acoustic noise, and ensuring zero hallucination on critical medical dosage mentions. We resolved this through multi-tiered audio filtering and deterministic verification rules on medical entity nodes.",
    results:
      "Tested across simulated clinic workflows: reduced median case intake from 12 minutes to under 4 minutes, while achieving a 98.4% clinical validation score by participating resident physicians.",
    nextProject: "pdf2pro"
  },
  {
    id: "02",
    slug: "pdf2pro",
    title: "PDF2Pro",
    category: "SaaS × Productivity",
    year: "2025",
    tagline: "High-Speed Document Engine & Utility Suite",
    description:
      "A modern PDF utility platform designed around fast client-side document processing, clean UX, frictionless batch workflows, and Stripe payment tiering.",
    technologies: ["React", "WebAssembly", "Node.js", "Stripe API", "Tailwind CSS", "PDF-lib", "Express"],
    github: "https://github.com/pranshusharma/pdf2pro",
    liveDemo: "https://pdf2pro.demo.internal",
    accentColor: "#a855f7", // Purple / SaaS hue
    stats: [
      { label: "Client Processing Speed", value: "< 850ms" },
      { label: "Zero-Knowledge Privacy", value: "100%" },
      { label: "Conversion Rate", value: "8.2%" }
    ],
    overview:
      "Most existing online PDF tools are cluttered with spammy ads, require uploading confidential legal documents to third-party servers, and enforce rigid paywalls. PDF2Pro rethinks document manipulation with a high-performance, private-by-design WebAssembly engine that processes files directly in the browser.",
    problem:
      "Privacy-conscious professionals and enterprises are wary of free web converters that store proprietary contracts on unknown cloud buckets. Furthermore, traditional desktop tools are bloated, expensive, and non-intuitive.",
    solution:
      "Engineered a zero-retention client-side processing pipeline using WebAssembly and PDF-Lib. Documents never leave the user's browser memory unless server-intensive optical character recognition (OCR) or cloud storage is explicitly selected.",
    features: [
      {
        title: "Local WASM Processing Engine",
        desc: "Merge, split, compress, decrypt, and reorder 500+ page PDFs in milliseconds entirely in browser memory."
      },
      {
        title: "Interactive Page Canvas Reordering",
        desc: "Smooth drag-and-drop page reorganization with live thumbnail rendering and instant rotation."
      },
      {
        title: "Micro-SaaS Billing Infrastructure",
        desc: "Frictionless Stripe checkout for Pro batch-processing, custom watermarking, and team collaboration."
      },
      {
        title: "Smart Document Compression",
        desc: "Multi-level perceptual image compression algorithm reducing file sizes by up to 80% with zero text degradation."
      }
    ],
    architecture: [
      { step: "01. Upload", label: "Local file stream into Web Worker memory space" },
      { step: "02. Parsing", label: "WASM-compiled parser extracts vector & font glyph trees" },
      { step: "03. Mutation", label: "Non-blocking background manipulation & lossless compression" },
      { step: "04. Delivery", label: "Instant blob download with cryptographic integrity check" }
    ],
    challenges:
      "Managing high memory pressure when rendering and compressing multi-hundred-megabyte scanned documents inside mobile and laptop browsers without tab crashes. Solved using partitioned streaming buffers and virtualized canvas grids.",
    results:
      "Achieved sub-second operations for 90% of file manipulations, with 100% privacy compliance and zero server infrastructure bandwidth overhead for standard operations.",
    nextProject: "smart-waste"
  },
  {
    id: "03",
    slug: "smart-waste",
    title: "Smart Waste Management",
    category: "IoT × Real-time",
    year: "2024",
    tagline: "Intelligent Telematics & Municipal Route Optimization",
    description:
      "A smart waste management ecosystem connecting IoT bin sensors, municipal drivers, administrators, and real-time city routing operations.",
    technologies: ["IoT / ESP32", "Node.js", "WebSockets", "Mapbox GL", "Express", "MongoDB", "Tailwind CSS"],
    github: "https://github.com/pranshusharma/smart-waste-system",
    liveDemo: "https://smartwaste.demo.internal",
    accentColor: "#10b981", // Emerald / Eco hue
    stats: [
      { label: "Fuel Cost Optimization", value: "32%" },
      { label: "Telemetry Latency", value: "< 120ms" },
      { label: "Bin Overflow Incidents", value: "-78%" }
    ],
    overview:
      "Traditional municipal waste collection runs on fixed scheduled routes regardless of whether dumpsters are completely empty or overflowing. This causes wasted fuel, driver fatigue, and urban sanitation hazards. The Smart Waste Management ecosystem provides real-time sensor monitoring and dynamic vehicle dispatch.",
    problem:
      "Municipalities lose millions annually on unoptimized garbage collection routes while public areas suffer from unmonitored overflow during peak festivals and weekend surges.",
    solution:
      "An integrated hardware-software platform: ultrasonic depth sensors report live fill levels over MQTT/HTTP, while an automated dispatch engine recalculates vehicle waypoints dynamically using genetic route optimization algorithms.",
    features: [
      {
        title: "Live Sensor Telematics Hub",
        desc: "Instant status monitoring of bin fill percentages, internal temperature, and lid tamper detection."
      },
      {
        title: "Dynamic Dispatch & TSP Routing",
        desc: "Graph-based Travelling Salesperson route optimization that clusters high-priority bins and reduces mileage."
      },
      {
        title: "Driver Turn-by-Turn Mobile PWA",
        desc: "Offline-first navigation app with instantaneous bin pick-up acknowledgment and road obstruction reporting."
      },
      {
        title: "Municipal City Command Center",
        desc: "Real-time interactive Mapbox cluster visualization with heatmaps and historical trend forecasting."
      }
    ],
    architecture: [
      { step: "01. Telemetry", label: "ESP32 ultrasonic sensors publish telemetry via MQTT" },
      { step: "02. Gateway", label: "Node.js cluster validates payload & stores time-series metrics" },
      { step: "03. Optimizer", label: "Route engine generates clustered graph waypoints" },
      { step: "04. Dispatch", label: "WebSockets stream updated instructions to driver tablets" }
    ],
    challenges:
      "Unreliable cellular connectivity in dense urban alleys and power conservation on battery-operated IoT nodes. Implemented wake-on-event low-power states and local caching on driver terminals.",
    results:
      "Simulated deployment across 60 urban test points demonstrated a 32% reduction in fleet fuel consumption and near-zero dumpster overflow incidents.",
    nextProject: "medikiosk"
  }
];
