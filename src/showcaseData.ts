import dashboardImg from './assets/showcase/dashboard.png';
import ecommerceImg from './assets/showcase/ecommerce.png';
import iotImg from './assets/showcase/iot.png';

// ── Showcase Items ──────────────────────────────────────────────────────────
// Add your images to src/assets/showcase/ then import and add them below.
// ─────────────────────────────────────────────────────────────────────────────

export interface ShowcaseItem {
  domainId?: string; // Optional: bind to a specific domain
  title: string;
  description: string;
  image: string;
  tag?: string;
}

export const globalShowcaseItems: ShowcaseItem[] = [
  {
    title: "Scalable Architecture",
    description: "Built for million-user scale with distributed caching, service discovery, and automated horizontal scaling.",
    image: dashboardImg,
    tag: "Performance"
  },
];

export const domainShowcaseItems: Record<string, ShowcaseItem[]> = {
  'web-dev': [
    {
      title: "Authentication & Identity",
      description: "Secure JWT-based authentication system with RBAC, social login, and MFA capabilities.",
      image: dashboardImg,
      tag: "Security"
    },
    {
      title: "Billing & Subscription",
      description: "Full Stripe integration for managing plan tiers, metered billing, and automated invoicing.",
      image: ecommerceImg,
      tag: "Fintech"
    },
    {
      title: "Smart Search Engine",
      description: "Elasticsearch-powered full-text search with fuzzy matching and real-time indexing.",
      image: dashboardImg,
      tag: "Discovery"
    },
    {
      title: "File Storage & CDN",
      description: "Scalable object storage integration with local/S3 support and automated image optimization.",
      image: dashboardImg,
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
      image: iotImg,
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
      image: ecommerceImg,
      tag: "Native"
    },
    {
      title: "Push Notification Hub",
      description: "Unified FCM/APNs gateway for transactional and marketing notifications.",
      image: ecommerceImg,
      tag: "Engagement"
    }
  ],
  'bi-etl': [
    {
      title: "Data Orchestration",
      description: "Airflow-based DAGs for managing complex ETL workflows across siloed data sources.",
      image: dashboardImg,
      tag: "Pipelines"
    },
    {
      title: "Power BI Connectors",
      description: "Direct-push datasets that keep your executive dashboards updated in real-time.",
      image: dashboardImg,
      tag: "Insights"
    }
  ],
  'ml-ai': [
    {
      title: "RAG Knowledge Base",
      description: "Retrieval-Augmented Generation pipeline using vector databases for grounded AI answers.",
      image: dashboardImg,
      tag: "GenAI"
    },
    {
      title: "Recommendation Engine",
      description: "Collaborative filtering models serving personalized content in under 50ms.",
      image: dashboardImg,
      tag: "ML Ops"
    }
  ],
  'devops': [
    {
      title: "Kubernetes Orchestration",
      description: "Automated scaling and self-healing for distributed containerized workloads.",
      image: dashboardImg,
      tag: "Platform"
    },
    {
      title: "CI/CD Automation",
      description: "Zero-downtime deployment pipelines with integrated security scanning.",
      image: dashboardImg,
      tag: "Automation"
    }
  ],
  'virtual-ar-3d': [
    {
      title: "XR Interactive Scene",
      description: "Immersive VR/AR environments for industrial training and product visualization.",
      image: iotImg,
      tag: "XR"
    },
    {
      title: "WebXR Discovery",
      description: "High-performance 3D visualization running directly in modern web browsers.",
      image: iotImg,
      tag: "Web 3D"
    }
  ],
  'ui-ux': [
    {
      title: "Atomic Design System",
      description: "Standardized component library built for scale and interface consistency.",
      image: dashboardImg,
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
