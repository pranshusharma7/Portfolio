export const achievementsData = [
  {
    id: "ach-1",
    category: "Hackathon",
    title: "Finalist & Best Healthcare Innovation",
    issuer: "National HealthTech Hackathon",
    year: "2025",
    description: "Built MediKiosk in 36 hours; recognized for highest clinical intake accuracy and novel voice interaction triage UX.",
    badge: "Top 3 Team"
  },
  {
    id: "ach-2",
    category: "Competitive Coding",
    title: "Consistent Problem Solver",
    issuer: "LeetCode & Codeforces",
    year: "2024 - Present",
    description: "Active practice on algorithmic paradigms: dynamic programming, graphs, binary trees, and sliding window techniques.",
    badge: "DSA Core"
  },
  {
    id: "ach-3",
    category: "Open Source",
    title: "Open Source Contributor & Tooling",
    issuer: "GitHub Ecosystem",
    year: "2024 - 2025",
    description: "Contributed documentation fixes, bug patches, and developer utility enhancements across open-source web tooling repositories.",
    badge: "OSS Builder"
  },
  {
    id: "ach-4",
    category: "Certification",
    title: "Deep Learning & Neural Networks",
    issuer: "Coursera / DeepLearning.AI",
    year: "2024",
    description: "In-depth study of backpropagation, tensor operations, convolutional neural networks, and sequence models.",
    badge: "Verified Specialization"
  },
  {
    id: "ach-5",
    category: "Academic",
    title: "Computer Science Specialization Honors",
    issuer: "B.Tech Department of CSE",
    year: "2024 - 2026",
    description: "High academic standing in foundational computer science, computational mathematics, and operating system design.",
    badge: "Honor Standing"
  }
];

export const codingProfilesData = {
  github: {
    username: "pranshusharma",
    url: "https://github.com/pranshusharma",
    activeRepos: 18,
    primaryLanguages: ["JavaScript", "TypeScript", "Python", "C++"],
    recentRepos: [
      {
        name: "medikiosk-core",
        desc: "Autonomous clinical voice intake with structured FHIR summaries.",
        stars: 42,
        forks: 9,
        lang: "TypeScript",
        langColor: "#3178c6"
      },
      {
        name: "pdf2pro-engine",
        desc: "Client-side WebAssembly PDF processing pipeline and encryption engine.",
        stars: 76,
        forks: 14,
        lang: "JavaScript",
        langColor: "#f7df1e"
      },
      {
        name: "smart-waste-telematics",
        desc: "IoT ultrasonic telemetry ingestion gateway & dynamic TSP route clustering.",
        stars: 38,
        forks: 6,
        lang: "Python",
        langColor: "#3572A5"
      },
      {
        name: "motion-web-creative",
        desc: "Collection of curated WebGL shaders, kinetic typography, and physics interactions.",
        stars: 124,
        forks: 23,
        lang: "GLSL / React",
        langColor: "#61dafb"
      }
    ]
  },
  leetcode: {
    username: "pranshusharma",
    url: "https://leetcode.com/pranshusharma",
    rankTier: "Top Percentile Solver",
    categoryBreakdown: [
      { category: "Easy", solved: 140, total: 800, color: "#10b981" },
      { category: "Medium", solved: 215, total: 1700, color: "#f59e0b" },
      { category: "Hard", solved: 45, total: 750, color: "#ef4444" }
    ],
    skills: ["Dynamic Programming", "Graph Theory", "Tree Traversal", "Heap / Priority Queues", "Binary Search"]
  }
};
