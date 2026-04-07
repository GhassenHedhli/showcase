// ─── Core Data Models ─────────────────────────────────────────────────────────

export interface Capability {
  iconName: string;
  title: string;
  description: string;
}

export interface Service {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  features: string[];
  basePrice: number;
  techStack: string[];
}

export interface Domain {
  id: string;
  title: string;
  tagline: string;
  description: string;
  iconName: string;
  gradient: string;       // Tailwind gradient classes for card
  glowColor: string;      // CSS rgba for box-shadow glow
  accentHex: string;      // Hex for inline styles
  badge: string;          // e.g. "15 Microservices"
  stats: { value: string; label: string }[];
  techStack: string[];
  capabilities?: Capability[];
  serviceIds?: string[];  // only for web-dev
}

// ─── Web Dev Microservices ────────────────────────────────────────────────────

export const webDevServices: Service[] = [
  {
    id: 'auth',
    title: 'Authentication & Authorization',
    shortDesc: 'Enterprise-grade JWT, OAuth2, 2FA, RBAC, and session management.',
    fullDesc: 'A battle-tested authentication backbone built with Spring Security. Supports JWT with refresh-token rotation, OAuth2 social login, multi-device session tracking, TOTP-based 2FA, and granular role-based access control. Integrates seamlessly with every other service in the stack.',
    iconName: 'ShieldCheck',
    features: ['JWT & Refresh-token rotation', 'OAuth2 / Google login', 'TOTP Two-Factor Auth', 'RBAC with custom roles', 'Device & session registry', 'Brute-force protection', 'Password strength API'],
    basePrice: 350,
    techStack: ['Spring Security', 'JWT', 'Redis', 'PostgreSQL'],
  },
  {
    id: 'user-profile',
    title: 'User & Profile Service',
    shortDesc: 'Complete user lifecycle: profiles, preferences, privacy, and data exports.',
    fullDesc: 'Manages the full user object beyond authentication. Covers editable profiles with avatar upload, granular privacy settings, locale/timezone preferences, GDPR-compliant data export, and account deletion pipelines. Exposes public profile APIs for inter-service use.',
    iconName: 'UserCircle',
    features: ['Editable public profiles', 'Privacy controls', 'Locale & timezone settings', 'GDPR data export', 'Account deletion pipeline', 'Public profile API', 'Preference management'],
    basePrice: 200,
    techStack: ['Spring Boot', 'MongoDB', 'AWS S3'],
  },
  {
    id: 'ecommerce',
    title: 'Ecommerce Engine',
    shortDesc: 'Full product catalog, shopping cart, order orchestration, and inventory.',
    fullDesc: 'A production-ready ecommerce backbone with horizontally-scalable product catalogues, real-time stock validation, CDN-ready image delivery, and a complete cart → order → fulfillment pipeline. Supports categories, SKUs, tags, and paginated search.',
    iconName: 'ShoppingCart',
    features: ['Product catalog & SKUs', 'Real-time stock validation', 'Cart state management', 'Order orchestration pipeline', 'CDN image integration', 'Category & tag search', 'Admin product CRUD'],
    basePrice: 450,
    techStack: ['Spring Boot', 'MongoDB', 'Redis', 'Stripe'],
  },
  {
    id: 'chat',
    title: 'Real-Time Chat',
    shortDesc: 'WebSocket / STOMP messaging with rooms, typing indicators, and history.',
    fullDesc: 'Inject enterprise-grade real-time messaging into any application. Uses STOMP over WebSocket for sub-millisecond delivery. Supports public/private rooms, direct messages, presence tracking (online/typing), and persistent message history.',
    iconName: 'MessageSquare',
    features: ['STOMP / WebSocket transport', 'Public & private rooms', 'Direct messaging', 'Typing & presence indicators', 'Message history', 'Room management API', 'Admin moderation tools'],
    basePrice: 300,
    techStack: ['Spring WebSocket', 'STOMP', 'MongoDB', 'Redis Pub/Sub'],
  },
  {
    id: 'payments',
    title: 'Payment Orchestrator',
    shortDesc: 'Stripe-native billing, PCI-compliant webhooks, subscriptions & refunds.',
    fullDesc: 'A fully Stripe-integrated payment engine that removes all PCI-compliance burden. Manages payment intents, secure webhook signature verification, subscription tiers, automated receipts, and admin-level refund operations—entirely via REST.',
    iconName: 'CreditCard',
    features: ['Stripe native integration', 'Webhook signature verification', 'Subscription & billing tiers', 'Automated receipts', 'Admin refund API', 'Analytics & revenue reporting', 'Multi-currency support'],
    basePrice: 500,
    techStack: ['Spring Boot', 'Stripe SDK', 'MongoDB', 'Webhooks'],
  },
  {
    id: 'ai-wrapper',
    title: 'AI/ML Inference Wrapper',
    shortDesc: 'Rate-limited LLM proxy with caching, RAG pipelines, and recommendation engine.',
    fullDesc: 'A secure, production-grade proxy for LLM models. Features inference caching, rate limiting, prompt injection protection, pre-built RAG pipelines, and a recommendation engine. Plug in your API keys and instantly unlock AI capabilities in your app.',
    iconName: 'BrainCircuit',
    features: ['Multi-LLM proxy (GPT, Gemini)', 'Inference response caching', 'Prompt injection protection', 'Pre-built RAG pipeline', 'Recommendation engine', 'Text summarization API', 'Rate limiting per user'],
    basePrice: 650,
    techStack: ['Python FastAPI', 'LangChain', 'OpenAI SDK', 'Redis'],
  },
  {
    id: 'tasks',
    title: 'Task Management Engine',
    shortDesc: 'Kanban boards, subtasks, sprint tracking, and collaborative assignments.',
    fullDesc: 'An enterprise-grade project management backend. Supports full Kanban workflows with configurable statuses, subtask hierarchies, attachments, comments, tag-based filtering, assignee management, and deadline notifications. Ideal for SaaS project tracking.',
    iconName: 'LayoutList',
    features: ['Kanban board & states', 'Subtask hierarchies', 'Collaborative assignments', 'Deadline notifications', 'Comments & attachments', 'Tag-based filtering', 'Sprint audit history'],
    basePrice: 250,
    techStack: ['Spring Boot', 'MongoDB', 'WebSocket', 'MinIO'],
  },
  {
    id: 'portfolio',
    title: 'Portfolio & Projects',
    shortDesc: 'User project portfolios with rich metadata, skills, and public sharing.',
    fullDesc: 'Allows users to build and publish rich project portfolios. Each project supports descriptions, tech stack tags, image galleries, live links, and completion status. Exposes public APIs for embedding portfolios in external sites.',
    iconName: 'FolderKanban',
    features: ['Project CRUD API', 'Tech stack tagging', 'Image gallery support', 'Public portfolio URLs', 'Skills & competency tracking', 'Social sharing metadata', 'Project search & filtering'],
    basePrice: 180,
    techStack: ['Spring Boot', 'MongoDB', 'AWS S3'],
  },
  {
    id: 'file-upload',
    title: 'File Storage Service',
    shortDesc: 'Chunked upload, CDN delivery, public share links, and storage quotas.',
    fullDesc: 'A full-featured file service with chunked upload support, thumbnail generation for images, CDN-ready delivery URLs, per-user storage quota enforcement, time-limited public share link generation, and file metadata search.',
    iconName: 'FolderOpen',
    features: ['Chunked & resumable upload', 'Thumbnail generation', 'CDN delivery URLs', 'Per-user quota management', 'Public share links (TTL)', 'MIME-type validation', 'Admin file registry'],
    basePrice: 220,
    techStack: ['Spring Boot', 'MinIO / AWS S3', 'ImageMagick'],
  },
  {
    id: 'admin',
    title: 'Admin Control Center',
    shortDesc: 'Real-time KPI dashboard, user moderation, broadcast messaging, and audit.',
    fullDesc: 'A WebSocket-powered admin service aggregating cross-platform metrics in real time. Manage users, moderate chats, update order statuses, issue refunds, and broadcast platform-wide notifications — all from a single secured admin API.',
    iconName: 'LayoutDashboard',
    features: ['Real-time KPI aggregation', 'User management & moderation', 'Chat room admin controls', 'Order & payment management', 'Global broadcast via WebSocket', 'Service health monitoring', 'Multi-service data aggregation'],
    basePrice: 300,
    techStack: ['Spring Boot', 'WebSocket', 'Redis', 'Feign Client'],
  },
  {
    id: 'api-gateway',
    title: 'API Gateway',
    shortDesc: 'Centralized routing, JWT validation, CORS, rate limiting, and SSL termination.',
    fullDesc: 'The single entry point for all platform traffic. Handles dynamic routing to microservices, JWT authentication validation, CORS policy enforcement, global rate limiting, SSL termination, and request/response logging — with zero-downtime configuration updates.',
    iconName: 'Network',
    features: ['Dynamic microservice routing', 'JWT validation layer', 'Global CORS enforcement', 'Rate limiting per client', 'SSL termination', 'Request logging & tracing', 'Circuit breaker integration'],
    basePrice: 400,
    techStack: ['Spring Cloud Gateway', 'Redis', 'SSL/TLS'],
  },
  {
    id: 'discovery',
    title: 'Service Discovery',
    shortDesc: 'Eureka-based service registry with health checks and auto-deregistration.',
    fullDesc: 'A Netflix Eureka-powered service registry that allows all microservices to dynamically locate each other without hardcoded URLs. Features automatic health checks, deregistration of failed instances, and a dashboard UI for monitoring registered services.',
    iconName: 'Radar',
    features: ['Dynamic service registration', 'Eureka dashboard UI', 'Automatic health checks', 'Failed-instance deregistration', 'Load balancing support', 'Multi-zone awareness', 'Client-side discovery'],
    basePrice: 150,
    techStack: ['Spring Cloud Eureka', 'Spring Boot', 'Docker'],
  },
  {
    id: 'email-notif',
    title: 'Email & Notifications',
    shortDesc: 'Transactional email delivery with templates, queuing, and delivery tracking.',
    fullDesc: 'A dedicated notification service that handles all outbound communication. Sends transactional emails (verification, reset, receipts) using HTML templates, queues messages for async delivery, and tracks open/delivery rates. Extensible to SMS and push notifications.',
    iconName: 'Mail',
    features: ['HTML email templates', 'Async delivery queuing', 'Email verification flow', 'Password reset emails', 'Order & receipt confirmations', 'Delivery status tracking', 'SMTP provider abstraction'],
    basePrice: 180,
    techStack: ['Spring Mail', 'RabbitMQ', 'SMTP', 'Thymeleaf'],
  },
  {
    id: 'iot-hub-ui',
    title: 'IoT Hub Interface',
    shortDesc: 'Virtual device management, telemetry SSE streaming, and real-time visualization.',
    fullDesc: 'A web-based IoT control plane that manages virtual device registries, streams real-time telemetry via Server-Sent Events, and visualizes live sensor data. Supports configurable device behaviors (sine-wave, random-walk) and JSON-based device configuration uploads.',
    iconName: 'Cpu',
    features: ['Virtual device registry', 'Real-time SSE telemetry', 'Live telemetry visualization', 'JSON device config upload', 'Configurable sensor behaviors', 'Fleet dashboard view', 'Historical data export'],
    basePrice: 350,
    techStack: ['Spring Boot', 'SSE', 'MongoDB', 'React'],
  },
  {
    id: 'analytics',
    title: 'Analytics & Reporting',
    shortDesc: 'Aggregated business KPIs, revenue charts, user growth, and export APIs.',
    fullDesc: 'A cross-service analytics aggregator that pulls metrics from every service and exposes clean KPI endpoints. Powers admin dashboards with user growth, revenue trends, order funnels, and chat activity. Supports scheduled report generation and CSV export.',
    iconName: 'BarChart2',
    features: ['Cross-service KPI aggregation', 'User growth analytics', 'Revenue & payment trends', 'Order funnel visualization', 'Chat activity metrics', 'Scheduled report generation', 'CSV export API'],
    basePrice: 280,
    techStack: ['Spring Boot', 'MongoDB Aggregation', 'Redis', 'Feign'],
  },
];

// ─── Domain Definitions ───────────────────────────────────────────────────────

export const domains: Domain[] = [
  {
    id: 'web-dev',
    title: 'Web Development',
    tagline: 'Plug-and-play microservices for your web platform',
    description: 'A complete ecosystem of 15 production-ready microservices covering auth, billing, messaging, AI, file storage, and more. Buy exactly the modules your application needs.',
    iconName: 'Globe',
    gradient: 'from-indigo-600 via-blue-600 to-indigo-800',
    glowColor: 'rgba(99,102,241,0.35)',
    accentHex: '#6366f1',
    badge: '15 Microservices',
    stats: [
      { value: '15', label: 'Microservices' },
      { value: '250–650', label: 'TND / Module' },
      { value: '100%', label: 'REST API Coverage' },
      { value: 'Zero', label: 'Vendor Lock-in' },
    ],
    techStack: ['Spring Boot', 'React', 'MongoDB', 'Redis', 'Docker', 'JWT', 'Stripe', 'Spring Cloud'],
    serviceIds: webDevServices.map(s => s.id),
  },

  {
    id: 'iot',
    title: 'IoT Solutions',
    tagline: 'Connect, monitor, and control your physical world',
    description: 'End-to-end IoT infrastructure that handles millions of device events in real time. From edge device management through MQTT ingestion to live telemetry dashboards and predictive alerting.',
    iconName: 'Cpu',
    gradient: 'from-emerald-600 via-teal-600 to-emerald-800',
    glowColor: 'rgba(16,185,129,0.35)',
    accentHex: '#10b981',
    badge: '12 Capabilities',
    stats: [
      { value: '1M+', label: 'Events / Day' },
      { value: '<10ms', label: 'Telemetry Latency' },
      { value: '3', label: 'Protocols Supported' },
      { value: '99.9%', label: 'Uptime SLA' },
    ],
    techStack: ['MQTT', 'Spring Boot', 'InfluxDB', 'Grafana', 'Docker', 'Kafka', 'WebSocket', 'Node-RED'],
    capabilities: [
      { iconName: 'Server',         title: 'Device Registry & Management',    description: 'Centralized registry for all connected hardware. Register, configure, deactivate, and monitor entire fleets of devices through a unified API.' },
      { iconName: 'Activity',       title: 'Real-Time Telemetry Streaming',   description: 'SSE and WebSocket-based data pipes that stream sensor readings directly to dashboards with millisecond latency.' },
      { iconName: 'Radio',          title: 'MQTT / HTTP / CoAP Gateway',      description: 'Protocol translation gateway that speaks MQTT, HTTP, CoAP, and AMQP, normalizing all traffic into a unified internal event format.' },
      { iconName: 'Zap',            title: 'Alert & Threshold Engine',        description: 'Rule-based alerting that fires email, SMS, or webhook notifications when sensor values cross configurable thresholds.' },
      { iconName: 'Globe',          title: 'Digital Twin Simulation',         description: 'Virtual replicas of physical devices for pre-deployment testing, what-if simulation, and shadow mode validation without touching real hardware.' },
      { iconName: 'BarChart2',      title: 'Live Telemetry Dashboards',       description: 'Pre-built Grafana-compatible visualization panels showing real-time charts, gauges, and heatmaps for all registered devices.' },
      { iconName: 'CloudUpload',    title: 'Firmware OTA Updates',            description: 'Over-The-Air firmware deployment pipeline with version rollback, batch device targeting, and update scheduling.' },
      { iconName: 'MapPin',         title: 'Geo-Location Tracking',           description: 'GPS coordinate ingestion, geofencing rule evaluation, and live asset map visualization for mobile or vehicle IoT deployments.' },
      { iconName: 'Database',       title: 'Time-Series Data Storage',        description: 'Purpose-built InfluxDB time-series backend with automatic data retention policies, aggregation, and long-term archival.' },
      { iconName: 'Shield',         title: 'Device Authentication',           description: 'X.509 certificate provisioning and mutual TLS for each device, ensuring only authorized hardware can publish data to the platform.' },
      { iconName: 'Layers',         title: 'Fleet Batch Operations',          description: 'Execute commands, push configurations, or trigger reboots across thousands of devices simultaneously with progress tracking.' },
      { iconName: 'TrendingUp',     title: 'Anomaly Detection',               description: 'ML-powered outlier detection on streaming telemetry that flags anomalous sensor behavior before equipment failures occur.' },
    ],
  },

  {
    id: 'mobile',
    title: 'Mobile Development',
    tagline: 'Backend infrastructure built for iOS & Android',
    description: 'Mobile-first APIs designed for the latency, battery, and offline constraints of native apps. From push notifications and biometric auth to real-time sync and media pipelines.',
    iconName: 'Smartphone',
    gradient: 'from-pink-600 via-purple-600 to-violet-700',
    glowColor: 'rgba(219,39,119,0.35)',
    accentHex: '#db2777',
    badge: '12 Capabilities',
    stats: [
      { value: '2', label: 'Platforms (iOS & Android)' },
      { value: '<100ms', label: 'API Response Time' },
      { value: 'Offline', label: 'First Architecture' },
      { value: 'OAuth2', label: 'Secure Auth Layer' },
    ],
    techStack: ['REST APIs', 'FCM', 'APNs', 'OAuth2', 'WebSocket', 'React Native', 'Swift SDK', 'Kotlin SDK'],
    capabilities: [
      { iconName: 'Zap',            title: 'Mobile-Optimized REST APIs',       description: 'Endpoints designed to minimize payload size and round-trips. Supports field selection, cursor pagination, and ETag-based caching out of the box.' },
      { iconName: 'Bell',           title: 'Push Notifications (FCM & APNs)', description: 'Unified push notification service that abstracts Firebase Cloud Messaging and Apple Push Notification Service behind a single API call, with delivery receipts.' },
      { iconName: 'Fingerprint',    title: 'Biometric & OAuth2 Auth',         description: 'Tokenized auth flows optimized for mobile: device fingerprinting, silent token refresh, biometric-unlock support, and social login (Google, Apple).' },
      { iconName: 'WifiOff',        title: 'Offline-First Data Sync',         description: 'Delta sync APIs that let mobile apps operate fully offline and sync only changed records on reconnection, minimizing data usage.' },
      { iconName: 'Upload',         title: 'Media Upload with Compression',   description: 'Client-side compression hints and server-side transcoding pipeline for photos and videos. CDN delivery URLs returned immediately after upload.' },
      { iconName: 'ShoppingBag',    title: 'In-App Purchase Integration',     description: 'Validates Apple App Store and Google Play receipts server-side, manages entitlements, and tracks subscription lifecycle events.' },
      { iconName: 'Link',           title: 'Deep Link & QR Code Support',     description: 'Dynamic link generation, Universal Link and App Link domain setup, and QR code scan-to-action APIs that work across both platforms.' },
      { iconName: 'BarChart3',      title: 'Mobile Analytics Events',         description: 'Lightweight SDK integration for tracking user funnels, feature adoption, crash events, and session durations without heavy analytics vendors.' },
      { iconName: 'MessageCircle',  title: 'In-App Chat SDK',                 description: 'Drop-in WebSocket chat client library (React Native / Kotlin / Swift) that connects to the messaging microservice with zero configuration.' },
      { iconName: 'MapPin',         title: 'Location Services API',           description: 'Reverse geocoding, proximity search, geofence evaluation, and location history storage — all without embedding third-party SDKs.' },
      { iconName: 'RefreshCw',      title: 'Background Sync & Tasks',         description: 'API support for scheduling periodic background tasks (refresh, prefetch, cleanup) coordinated between server and mobile client.' },
      { iconName: 'ShieldCheck',    title: 'Certificate Pinning Support',     description: 'Server-side certificate and public-key pinning configuration endpoint, enabling mobile clients to validate TLS certificates against a known set.' },
    ],
  },

  {
    id: 'bi-etl',
    title: 'Power BI & ETL',
    tagline: 'From raw data to boardroom-ready insights',
    description: 'Enterprise data pipelines that extract, transform, and load data from every service into structured warehouses, with direct connectors to Power BI, Tableau, and custom BI dashboards.',
    iconName: 'BarChart3',
    gradient: 'from-amber-500 via-orange-600 to-red-600',
    glowColor: 'rgba(245,158,11,0.35)',
    accentHex: '#f59e0b',
    badge: '12 Capabilities',
    stats: [
      { value: '10+', label: 'Data Source Connectors' },
      { value: 'Real-Time', label: 'Streaming Pipelines' },
      { value: 'Power BI', label: 'Native Connector' },
      { value: 'GDPR', label: 'Compliant Data Ops' },
    ],
    techStack: ['Apache Kafka', 'Apache Spark', 'Power BI REST API', 'PostgreSQL', 'dbt', 'Python', 'Airflow', 'Parquet'],
    capabilities: [
      { iconName: 'GitBranch',      title: 'ETL Pipeline Orchestration',      description: 'Visual DAG-based pipeline builder for defining extract, transform, and load workflows with scheduling, retries, and dependency management via Apache Airflow.' },
      { iconName: 'Database',       title: 'Data Warehouse APIs',              description: 'REST endpoints that expose your analytical data warehouse (OLAP) to consuming systems, with column-level ACLs, partitioned queries, and caching.' },
      { iconName: 'BarChart3',      title: 'Power BI Direct Connector',       description: 'Push datasets directly into Power BI workspaces via the Power BI REST API. Auto-refresh schedules and row-level security configuration included.' },
      { iconName: 'Layers',         title: 'Multi-Source Data Fusion',        description: 'Ingestion layer that federates data from relational databases, REST, event streams (Kafka), and file uploads into a unified analytical model.' },
      { iconName: 'Zap',            title: 'Real-Time Streaming Analytics',   description: 'Kafka-powered streaming pipelines that compute rolling aggregations (revenue, DAU, funnel conversion) in sub-second latency using window functions.' },
      { iconName: 'TrendingUp',     title: 'KPI Metric Aggregation Engine',   description: 'Pre-built KPI calculators (MRR, churn rate, ARPU, LTV) that query multiple services and expose clean metric endpoints for embedding in any dashboard.' },
      { iconName: 'FileText',       title: 'Report Generation API',           description: 'Scheduled and on-demand report generation in PDF, Excel, and CSV formats — with custom logo branding and auto-email delivery to stakeholders.' },
      { iconName: 'CheckCircle2',   title: 'Data Quality Validation',         description: 'Schema validation, null/duplicate detection, and referential integrity checks running as a pre-load pass, with bad-record quarantine and alerting.' },
      { iconName: 'Clock',          title: 'Scheduled Job Execution',         description: 'Cron-style scheduler that triggers pipeline stages, report exports, and data syncs reliably with failure alerting and run-history auditing.' },
      { iconName: 'RefreshCw',      title: 'Incremental Sync Engine',         description: 'Change-data-capture (CDC) using database transaction logs to sync only new or modified rows into the warehouse — no full table scans.' },
      { iconName: 'Download',       title: 'CSV / Excel Export Endpoints',    description: 'Streaming download endpoints for large datasets that chunk results into segmented files, compatible with Power BI import mode and Excel data connectors.' },
      { iconName: 'Shield',         title: 'GDPR Data Ops Compliance',        description: 'Data lineage tracking, PII masking/tokenization, automated retention policy enforcement, and audit trails for all pipeline runs.' },
    ],
  },

  {
    id: 'ml-ai',
    title: 'ML, DL & Artificial Intelligence',
    tagline: 'Production AI that learns, infers, and improves',
    description: 'A full-stack AI engineering platform covering LLM integration, computer vision, recommendation systems, NLP pipelines, anomaly detection, and model lifecycle management — all production-battle-tested.',
    iconName: 'BrainCircuit',
    gradient: 'from-violet-600 via-purple-700 to-rose-600',
    glowColor: 'rgba(124,58,237,0.35)',
    accentHex: '#7c3aed',
    badge: '14 AI Capabilities',
    stats: [
      { value: '5+', label: 'LLM Providers' },
      { value: 'RAG', label: 'Built-in Pipeline' },
      { value: 'Real-Time', label: 'Inference APIs' },
      { value: 'ONNX', label: 'Model Format Support' },
    ],
    techStack: ['Python', 'FastAPI', 'LangChain', 'HuggingFace', 'PyTorch', 'TensorFlow', 'OpenAI SDK', 'Qdrant / Pinecone', 'Celery', 'ONNX Runtime'],
    capabilities: [
      { iconName: 'MessageSquare',  title: 'LLM Integration (GPT, Gemini, Claude)', description: 'A secure, rate-limited proxy that routes requests to any LLM provider. Supports streaming responses, function calling, and provider failover under one unified API.' },
      { iconName: 'BookOpen',       title: 'RAG Pipeline (Retrieval-Augmented Gen)', description: 'End-to-end RAG system with document ingestion, vector embedding (Qdrant/Pinecone), semantic retrieval, and grounded answer generation — no hallucinations.' },
      { iconName: 'Tag',            title: 'Text Classification & NER',       description: 'Fine-tuned BERT-based models for multi-class text categorization and named entity recognition — deployable as a REST endpoint or embedded in pipelines.' },
      { iconName: 'Star',           title: 'Sentiment Analysis',              description: 'Real-time sentiment scoring (positive / negative / neutral) on reviews, support tickets, and chat messages, with aspect-level granularity.' },
      { iconName: 'Eye',            title: 'Computer Vision API',             description: 'Image classification, object detection (YOLO), OCR, and face recognition APIs backed by ONNX Runtime for CPU/GPU deployment without vendor lock-in.' },
      { iconName: 'Sparkles',       title: 'Recommendation Engine',           description: 'Collaborative-filtering and content-based recommendation models that serve personalized product, content, and user suggestions in under 50ms.' },
      { iconName: 'TrendingUp',     title: 'Time-Series Forecasting',         description: 'LSTM and Prophet-based forecasting models for demand prediction, anomaly detection, and KPI projection — retrained automatically on new data.' },
      { iconName: 'AlertTriangle',  title: 'Anomaly Detection (Unsupervised)','description': 'Isolation Forest and Autoencoder models that identify outliers in metric streams, log events, or transactional data without labeled training data.' },
      { iconName: 'Shuffle',        title: 'A/B Testing Framework',          description: 'Experiment management layer that splits traffic, collects outcome metrics, runs statistical significance tests, and auto-promotes winning variants.' },
      { iconName: 'Layers',         title: 'Model Registry & Versioning',    description: 'MLflow-compatible model registry that tracks every trained version, metadata, metrics, and lineage across the full ML lifecycle.' },
      { iconName: 'Code2',          title: 'NLP Processing Pipeline',        description: 'Pre-built tokenization, POS tagging, coreference resolution, and dependency parsing pipeline using spaCy and HuggingFace Transformers.' },
      { iconName: 'Unlock',         title: 'Prompt Engineering Framework',   description: 'A prompt management system that versions, tests, and optimizes prompts in production with automatic rollback on quality regression.' },
      { iconName: 'Search',         title: 'Semantic Search Engine',         description: 'Dense vector search over your documents and products using embedding models, returning semantically relevant results beyond keyword matching.' },
      { iconName: 'Bot',            title: 'Conversational AI Chatbot',      description: 'End-to-end chatbot framework with intent recognition, slot filling, multi-turn context, and seamless handoff to human agents when confidence drops.' },
    ],
  },

  {
    id: 'devops',
    title: 'DevOps & Infrastructure',
    tagline: 'Ship faster, recover instantly, scale infinitely',
    description: 'A complete DevOps engineering stack that transforms how you build, test, deploy, and monitor software. From containerization and CI/CD automation to zero-downtime releases and real-time observability.',
    iconName: 'GitBranch',
    gradient: 'from-sky-500 via-cyan-600 to-teal-600',
    glowColor: 'rgba(14,165,233,0.35)',
    accentHex: '#0ea5e9',
    badge: '12 Capabilities',
    stats: [
      { value: 'Zero', label: 'Downtime Deployments' },
      { value: 'K8s', label: 'Native Orchestration' },
      { value: '<5min', label: 'Full Pipeline Run' },
      { value: '99.99%', label: 'Target Availability' },
    ],
    techStack: ['Docker', 'Kubernetes', 'Jenkins', 'GitHub Actions', 'Prometheus', 'Grafana', 'ELK Stack', 'Terraform', 'ArgoCD', 'Helm'],
    capabilities: [
      { iconName: 'GitBranch',      title: 'CI/CD Pipeline Automation',       description: 'End-to-end GitHub Actions / Jenkins pipelines with build, lint, unit test, integration test, and progressive deployment stages — fully parameterized.' },
      { iconName: 'Box',            title: 'Docker & Kubernetes Deployments', description: 'Container orchestration via Helm charts and ArgoCD with namespace isolation, resource quotas, HPA auto-scaling, and multi-region rollout support.' },
      { iconName: 'Network',        title: 'API Gateway Management',          description: 'Centralized Spring Cloud Gateway management with dynamic route configuration, circuit breakers (Resilience4j), and canary traffic splitting.' },
      { iconName: 'Activity',       title: 'Observability & Monitoring',      description: 'Prometheus metrics collection + Grafana dashboards + distributed tracing (Jaeger/Zipkin) giving full request-level visibility across all services.' },
      { iconName: 'FileText',       title: 'Log Aggregation & Search',        description: 'ELK Stack (Elasticsearch, Logstash, Kibana) integration that centralizes structured logs from every service with real-time full-text search and alerting.' },
      { iconName: 'Lock',           title: 'Secret & Config Management',      description: 'HashiCorp Vault integration for dynamic secret injection, certificate rotation, and environment-specific configuration without hardcoded credentials.' },
      { iconName: 'TrendingUp',     title: 'Auto-Scaling Policies',          description: 'Kubernetes HPA and VPA rules that respond to CPU, memory, and custom business metrics, scaling pods up and down automatically under load.' },
      { iconName: 'RefreshCw',      title: 'Blue/Green & Rolling Releases',  description: 'Zero-downtime deployment strategies (blue/green, canary, rolling) with automated smoke tests and instant rollback triggers on failure.' },
      { iconName: 'Server',         title: 'Infrastructure as Code (IaC)',   description: 'Terraform modules for provisioning cloud infrastructure (AWS/GCP/Azure) idempotently, with drift detection and cost estimation in CI.' },
      { iconName: 'Shield',         title: 'Security Scanning & Hardening',  description: 'Static code analysis (SonarQube), container vulnerability scanning (Trivy), dependency audit (OWASP), and network policy enforcement in Kubernetes.' },
      { iconName: 'Zap',            title: 'Performance Load Testing',       description: 'Automated k6 / Gatling load-test suites that run on every release, assert SLA thresholds, and publish flame graphs to CI dashboards.' },
      { iconName: 'Database',       title: 'Backup & Disaster Recovery',     description: 'Automated database snapshots, cross-region replication, and tested DR runbooks that guarantee RPO < 1hr and RTO < 30min across all services.' },
    ],
  },
  {
    id: 'virtual-ar-3d',
    title: 'XR, 3D Modeling & Animation',
    tagline: 'Immersive VR/AR and high-fidelity 3D assets',
    description: 'Cutting-edge 3D solutions including high-fidelity modeling, VR/AR applications, and custom 2D/3D animations designed to captivate and engage users across all platforms.',
    iconName: 'Box',
    gradient: 'from-cyan-600 via-blue-500 to-indigo-700',
    glowColor: 'rgba(6,182,212,0.35)',
    accentHex: '#06b6d4',
    badge: '10 Capabilities',
    stats: [
      { value: 'Unity/UE5', label: 'Engine Support' },
      { value: '4K', label: 'Texture Quality' },
      { value: 'WebXR', label: 'Browser Ready' },
      { value: '60fps', label: 'Perf Target' },
    ],
    techStack: ['Unity', 'Unreal Engine', 'Blender', 'Three.js', 'WebXR', 'Maya', 'After Effects', 'Spline'],
    capabilities: [
      { iconName: 'Box',            title: '3D High-Poly Modeling',           description: 'Creation of complex 3D assets with high polygon counts, optimized for cinematic rendering or real-time performance through retopology.' },
      { iconName: 'Layers',         title: 'Augmented Reality (AR) Ops',      description: 'ARKit and ARCore based applications that overlay digital information onto the physical world with precise plane detection and lighting estimation.' },
      { iconName: 'Globe',          title: 'Virtual Reality (VR) Hub',        description: 'Fully immersive VR environments for Meta Quest, HTC Vive, and Apple Vision Pro, featuring interactive physics and spatial audio.' },
      { iconName: 'Video',          title: '2D & 3D Motion Graphics',         description: 'Dynamic character and environment animations, ranging from smooth 2D vector motion to complex 3D skeletal and vertex animations.' },
      { iconName: 'Zap',            title: 'Real-Time Web 3D (Three.js)',     description: 'Interactive 3D experiences directly in the browser using Three.js and React Three Fiber, optimized for mobile and desktop web.' },
      { iconName: 'Camera',         title: 'Photogrammetry & Scanning',      description: 'Converting real-world objects and environments into high-quality 3D models using advanced image-based reconstruction techniques.' },
      { iconName: 'Sparkles',       title: 'Visual Effects (VFX)',            description: 'Particle systems, fluid simulations, and custom shaders that add life and realism to digital scenes and interactive apps.' },
      { iconName: 'Smartphone',      title: 'Mobile AR Visualization',         description: 'Lightweight AR viewers for product showcasing, allowing users to place and interact with virtual products in their own space.' },
      { iconName: 'Cpu',            title: 'Metaverse Infrastructure',         description: 'Building persistent, multi-user virtual worlds with scalable backend support for social interaction and digital assets.' },
      { iconName: 'Music',          title: 'Spatial Audio Integration',       description: 'Implementation of HRTF-based 3D audio that changes dynamically as users move through virtual or augmented spaces.' },
    ],
  },
  {
    id: 'ui-ux',
    title: 'UX/UI Design',
    tagline: 'Designing interfaces that users love to navigate',
    description: 'Strategic user experience design paired with stunning visual interfaces. We bridge the gap between complex functionality and intuitive, beautiful design systems.',
    iconName: 'Palette',
    gradient: 'from-rose-500 via-pink-600 to-purple-700',
    glowColor: 'rgba(244,63,94,0.35)',
    accentHex: '#f43f5e',
    badge: '10 Capabilities',
    stats: [
      { value: 'Figma', label: 'Primary Tool' },
      { value: 'Atomic', label: 'Design System' },
      { value: 'WCAG', label: 'Accessibility' },
      { value: 'Hi-Fi', label: 'Prototyping' },
    ],
    techStack: ['Figma', 'Adobe XD', 'Sketch', 'Framer', 'Principle', 'Maze', 'Lottie', 'Storybook'],
    capabilities: [
      { iconName: 'Search',         title: 'User Research & Synthesis',       description: 'Deep-dive user interviews, persona creation, and empathy mapping to understand core user needs before a single pixel is drawn.' },
      { iconName: 'Layout',         title: 'Wireframing & Information Arch',  description: 'Structural blueprints of your application focusing on hierarchy, flow, and usability without being distracted by visual styling.' },
      { iconName: 'Palette',        title: 'High-Fidelity UI Design',         description: 'Pixel-perfect visual designs that incorporate brand identity, modern typography, and curated color palettes into a cohesive aesthetic.' },
      { iconName: 'Zap',            title: 'Interactive Prototyping',         description: 'Clickable, high-fidelity prototypes that simulate real application behavior for stakeholder reviews and user testing.' },
      { iconName: 'Layers',         title: 'Scalable Design Systems',         description: 'Creating "Atomic Design" based component libraries that ensure consistency across large-scale platforms and speed up development.' },
      { iconName: 'Activity',       title: 'Usability Testing & Audit',       description: 'Running moderated and unmoderated user tests to identify points of friction and auditing existing apps for UX improvements.' },
      { iconName: 'Smartphone',      title: 'Responsive & Mobile-First',       description: 'Designing fluid experiences that transition seamlessly from desktop ultrawides to mobile screens with touch-first interactions.' },
      { iconName: 'Accessibility',  title: 'WCAG Accessibility Design',       description: 'Ensuring your digital products are inclusive and usable by everyone by following strict accessibility standards (WCAG 2.1).' },
      { iconName: 'MousePointer2',  title: 'Micro-Interactions',              description: 'Adding subtle, delightful animations and feedback loops that make the interface feel alive and responsive to user input.' },
      { iconName: 'Repeat',         title: 'Iterative Design Cycles',         description: 'A constant loop of feedback, measurement, and refinement based on real-world data and user heatmaps.' },
    ],
  },
];

// ─── Helper ───────────────────────────────────────────────────────────────────

export const getDomainById = (id: string) => domains.find(d => d.id === id);
export const getServiceById = (id: string) => webDevServices.find(s => s.id === id);
