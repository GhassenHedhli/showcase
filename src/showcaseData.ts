import dashboardImg from './assets/showcase/dashboard.png';
import iotImg from './assets/showcase/iot.png';

// New images
import adminConsoleImg from './assets/showcase/admin-console.png';
import filesImg from './assets/showcase/files.png';
import iot1Img from './assets/showcase/iot1.png';
import messagesImg from './assets/showcase/messages.png';
import mlImg from './assets/showcase/ml.png';
import ml1Img from './assets/showcase/ml1.png';
import ml2Img from './assets/showcase/ml2.png';
import ml3Img from './assets/showcase/ml3.png';
import ml4Img from './assets/showcase/ml4.png';
import paymentImg from './assets/showcase/payment.png';
import preferencesImg from './assets/showcase/prefrences.png';
import privacyImg from './assets/showcase/privacy.png';
import profileImg from './assets/showcase/profile.png';
import securityImg from './assets/showcase/security.png';
import tasksImg from './assets/showcase/tasks.png';
import tasks2Img from './assets/showcase/tasks2.png';

// ── Showcase Items ──────────────────────────────────────────────────────────
// Add your images to src/assets/showcase/ then import and add them below.
// ─────────────────────────────────────────────────────────────────────────────

export interface ShowcaseItem {
  domainId?: string; // Optional: bind to a specific domain
  title: string;
  description: string;
  image?: string;
  video?: string;
  tag?: string;
}

export const globalShowcaseItems: ShowcaseItem[] = [
  {
    title: "Scalable Architecture",
    description: "Built for million-user scale with distributed caching, service discovery, and automated horizontal scaling.",
    image: adminConsoleImg,
    tag: "Performance"
  },
];

export const domainShowcaseItems: Record<string, ShowcaseItem[]> = {
  'web-dev': [
    {
      title: "Platform Live Demo",
      description: "Watch the complete microservices ecosystem in action — from authentication and real-time chat to ecommerce, payments, and the admin control center.",
      image: dashboardImg,
      tag: "Live Demo"
    },
    {
      title: "Authentication & Identity",
      description: "Secure JWT-based authentication system with RBAC, social login, and MFA capabilities.",
      image: securityImg,
      tag: "Security"
    },
    {
      title: "Billing & Subscription",
      description: "Full Stripe integration for managing plan tiers, metered billing, and automated invoicing.",
      image: paymentImg,
      tag: "Fintech"
    },
    {
      title: "User Management & Privacy",
      description: "Comprehensive profiles with granular privacy controls, preferences, and activity tracking.",
      image: privacyImg,
      tag: "Identity"
    },
    {
      title: "File Storage & CDN",
      description: "Scalable object storage integration with local/S3 support and automated image optimization.",
      image: filesImg,
      tag: "Infrastructure"
    }
  ],
  'iot': [
    {
      title: "Device Fleet Management",
      description: "Centralized control for millions of connected devices with real-time health monitoring.",
      image: iotImg,
      tag: "Control"
    },
    {
      title: "Protocol Gateway",
      description: "Multi-protocol ingestion handling MQTT, HTTP, and CoAP with sub-10ms latency.",
      image: iot1Img,
      tag: "Connectivity"
    },
    {
      title: "Digital Twin Ops",
      description: "Synchronized virtual replicas of physical hardware for testing and predictive modeling.",
      image: iotImg,
      tag: "Simulation"
    }
  ],
  'mobile': [
    {
      title: "Offline Sync Engine",
      description: "Delta-sync logic that keeps mobile apps functional in zero-connectivity environments.",
      image: profileImg,
      tag: "Native"
    },
    {
      title: "Push Notification Hub",
      description: "Unified FCM/APNs gateway for transactional and marketing notifications.",
      image: messagesImg,
      tag: "Engagement"
    }
  ],
  'bi-etl': [
    {
      title: "Data Orchestration",
      description: "Airflow-based DAGs for managing complex ETL workflows across siloed data sources.",
      image: tasks2Img,
      tag: "Pipelines"
    },
    {
      title: "Power BI Connectors",
      description: "Direct-push datasets that keep your executive dashboards updated in real-time.",
      image: adminConsoleImg,
      tag: "Insights"
    }
  ],
  'ml-ai': [
    {
      title: "RAG Knowledge Base",
      description: "Retrieval-Augmented Generation pipeline using vector databases for grounded AI answers.",
      image: mlImg,
      tag: "GenAI"
    },
    {
      title: "Recommendation Engine",
      description: "Collaborative filtering models serving personalized content in under 50ms.",
      image: ml2Img,
      tag: "ML Ops"
    },
    {
      title: "Predictive Analytics",
      description: "Time-series forecasting models identifying trends and predicting user churn.",
      image: ml4Img,
      tag: "Analytics"
    }
  ],
  'devops': [
    {
      title: "Kubernetes Orchestration",
      description: "Automated scaling and self-healing for distributed containerized workloads.",
      image: adminConsoleImg,
      tag: "Platform"
    },
    {
      title: "CI/CD Automation",
      description: "Zero-downtime deployment pipelines with integrated security scanning.",
      image: tasksImg,
      tag: "Automation"
    }
  ],
  'virtual-ar-3d': [
    {
      title: "XR Interactive Scene",
      description: "Immersive VR/AR environments for industrial training and product visualization.",
      image: ml3Img,
      tag: "XR"
    },
    {
      title: "WebXR Discovery",
      description: "High-performance 3D visualization running directly in modern web browsers.",
      image: ml1Img,
      tag: "Web 3D"
    }
  ],
  'ui-ux': [
    {
      title: "Atomic Design System",
      description: "Standardized component library built for scale and interface consistency.",
      image: preferencesImg,
      tag: "Design"
    },
    {
      title: "Interactive Prototypes",
      description: "Clickable high-fidelity mocks used for user testing and stakeholder alignment.",
      image: dashboardImg,
      tag: "UX"
    }
  ],
  // Add more domain-specific items here...
};

/**
 * Returns the showcase items for a specific domain, merging global items.
 */
export function getShowcaseItems(domainId: string): ShowcaseItem[] {
  const specificItems = domainShowcaseItems[domainId] || [];

  // Custom logic: if no specific items, show a general one
  if (specificItems.length === 0) {
    return [
      {
        title: "Platform Dashboard",
        description: "High-fidelity management interface for enterprise-grade microservices.",
        image: dashboardImg,
        tag: "Interface"
      },
      ...globalShowcaseItems
    ];
  }

  return [...specificItems, ...globalShowcaseItems];
}
