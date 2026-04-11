import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getServiceById, getDomainById } from '../data';
import Icon from '../components/Icon';
import ContactForm from '../components/ContactForm';
import Carousel from '../components/Carousel';
import { ChevronLeft, ChevronRight, CheckCircle2, Home } from 'lucide-react';

import dashboardImg from '../assets/showcase/dashboard.png';
import ecommerceImg from '../assets/showcase/ecommerce.png';
import iotImg from '../assets/showcase/iot.png';

const WEB_DEV_ACCENT = '#06b6d4';

const tiers = [
  {
    name: 'Standard Server License',
    multiplier: 1,
    desc: 'Compiled JAR binary + Docker image, suitable for standard production deployments.',
    included: ['Production JAR / Docker image', 'Deployment documentation', 'API reference guide', 'Environment config guide', '30-day integration support'],
  },
  {
    name: 'Enterprise Source Code',
    multiplier: 3.5,
    desc: 'Full Java/Python source code with unlimited internal modification and redistribution rights.',
    included: ['Everything in Standard', 'Complete source code', 'Unlimited modification rights', 'Architecture diagrams', 'Priority 90-day support'],
  },
];

export default function ServiceDetails() {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();
  const service = getServiceById(serviceId ?? '');
  const domain = getDomainById('web-dev');

  const [selectedTier, setSelectedTier] = useState(0);

  if (!service || !domain) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 text-center px-6">
        <div className="text-8xl font-black text-gray-800">404</div>
        <h2 className="text-2xl font-bold text-white">Service Not Found</h2>
        <p className="text-gray-400">That microservice doesn't exist in the catalog.</p>
        <button onClick={() => navigate('/domain/web-dev')} className="glow-button px-6 py-3 text-sm">
          Back to Web Dev
        </button>
      </div>
    );
  }

  const price = Math.round(service.basePrice * tiers[selectedTier].multiplier);

  return (
    <div className="w-full page-fade-in">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        className="relative pt-36 pb-16 overflow-hidden"
        style={{ background: `radial-gradient(ellipse at 70% 0%, ${WEB_DEV_ACCENT}15 0%, transparent 60%)` }}
      >
        <div className={`absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r ${domain.gradient}`} />

        {/* Orb */}
        <div
          className="absolute top-[-10%] right-[-5%] w-[45%] h-[55%] blur-[140px] rounded-full opacity-20 pointer-events-none"
          style={{ background: WEB_DEV_ACCENT }}
        />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-12 flex-wrap">
            <Link to="/" className="hover:text-gray-300 transition-colors flex items-center gap-1">
              <Home className="w-3.5 h-3.5" /> Home
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-700" />
            <Link to="/domain/web-dev" className="hover:text-gray-300 transition-colors">Web Development</Link>
            <ChevronRight className="w-4 h-4 text-gray-700" />
            <span style={{ color: WEB_DEV_ACCENT }} className="font-medium">{service.title}</span>
          </nav>

          {/* Heading */}
          <div className="flex items-start gap-5 mb-6">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ background: `${WEB_DEV_ACCENT}18`, border: `1px solid ${WEB_DEV_ACCENT}40` }}
            >
              <Icon name={service.iconName} size={28} color={WEB_DEV_ACCENT} />
            </div>
            <div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-none mb-3">
                <span style={{
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundImage: `linear-gradient(135deg, #fff 50%, ${WEB_DEV_ACCENT})`,
                  backgroundClip: 'text',
                }}>
                  {service.title}
                </span>
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl">{service.shortDesc}</p>
            </div>
          </div>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-2 mt-6">
            {service.techStack.map(t => (
              <span key={t} className="text-xs font-bold px-3 py-1.5 rounded-lg bg-gray-800 text-gray-300 border border-gray-700">
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Implementation Preview ────────────────────────────────────────── */}
      <section className="py-12 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-10">
            <h2 className="text-2xl font-black text-white mb-2">Implementation Preview</h2>
            <p className="text-gray-400">Visualizing the service in a production environment.</p>
          </div>
          
          <Carousel 
            items={[
              {
                title: `${service.title} UI`,
                description: `A production implementation of the ${service.title} module, featuring a responsive interface and real-time data integration.`,
                image: (service.id === 'ecommerce' || service.id === 'payments') ? ecommerceImg : (service.id === 'iot-hub-ui') ? iotImg : dashboardImg,
                tag: "Showcase"
              },
              {
                title: "Dark Mode Optimization",
                description: "All services are built with a premium dark-mode-first aesthetic, ensuring high contrast and optimal user experience.",
                image: dashboardImg,
                tag: "Aesthetics"
              }
            ]}
            accentColor={WEB_DEV_ACCENT}
          />
        </div>
      </section>

      {/* ── Body: 2 columns ───────────────────────────────────────────────── */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">

          {/* Left: Description + Features */}
          <div className="lg:col-span-3 space-y-10">
            {/* Full description */}
            <div>
              <h2 className="text-2xl font-black text-white mb-4">About This Service</h2>
              <p className="text-gray-300 leading-relaxed text-lg">{service.fullDesc}</p>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-xl font-black text-white mb-5">Included Features</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-4 rounded-xl transition-all hover:bg-gray-800/40"
                    style={{ border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)' }}
                  >
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: WEB_DEV_ACCENT }} />
                    <span className="text-gray-300 text-sm leading-snug font-medium">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* What's included in license */}
            <div className="glass-card rounded-2xl p-7">
              <h3 className="text-xl font-black text-white mb-5">
                What's Included: {tiers[selectedTier].name}
              </h3>
              <div className="flex flex-col gap-3">
                {tiers[selectedTier].included.map(item => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: WEB_DEV_ACCENT }} />
                    <span className="text-gray-300 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Back link */}
            <button
              onClick={() => navigate('/domain/web-dev')}
              className="flex items-center gap-2 text-gray-500 hover:text-gray-300 transition-all hover:gap-3 font-medium text-sm"
            >
              <ChevronLeft className="w-4 h-4" /> Back to all Web Dev services
            </button>
          </div>

          {/* Right: Pricing + Contact */}
          <div className="lg:col-span-2 lg:sticky lg:top-28 space-y-6">

            {/* Pricing Card */}
            <div
              className="rounded-3xl overflow-hidden"
              style={{ border: `1px solid ${WEB_DEV_ACCENT}30`, background: 'rgba(10,10,22,0.8)', backdropFilter: 'blur(20px)' }}
            >
              <div className={`px-8 pt-7 pb-5 bg-gradient-to-br ${domain.gradient} bg-opacity-10`}>
                <h2 className="text-xl font-black text-white mb-1">License Configuration</h2>
                <p className="text-gray-400 text-sm">Select the license tier that fits your needs.</p>
              </div>

              <div className="px-6 py-5 space-y-4">
                {tiers.map((tier, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedTier(idx)}
                    className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-300 ${
                      selectedTier === idx
                        ? 'bg-indigo-500/10 border-indigo-500 ring-2 ring-indigo-500/20'
                        : 'bg-black/20 border-gray-800 hover:border-gray-600'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-gray-100">{tier.name}</span>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedTier === idx ? 'border-indigo-400' : 'border-gray-600'}`}>
                        {selectedTier === idx && <div className="w-2.5 h-2.5 rounded-full bg-indigo-400" />}
                      </div>
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed">{tier.desc}</p>
                  </button>
                ))}
              </div>

              {/* Price */}
              <div className="mx-6 mb-6 p-5 bg-black/30 rounded-2xl border border-gray-800/50">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-2">License Investment</span>
                <div className="flex items-baseline gap-2">
                  <span
                    className="text-5xl font-black"
                    style={{
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundImage: `linear-gradient(135deg, #fff, ${WEB_DEV_ACCENT})`,
                      backgroundClip: 'text',
                    }}
                  >
                    {price.toLocaleString()}
                  </span>
                  <span className="text-xl font-bold text-gray-400">TND</span>
                </div>
              </div>
            </div>

            {/* Contact Card */}
            <div
              className="rounded-3xl p-7"
              style={{ border: `1px solid ${WEB_DEV_ACCENT}25`, background: 'rgba(10,10,22,0.7)', backdropFilter: 'blur(20px)' }}
            >
              <h3 className="text-lg font-black text-white mb-1">Inquire About This Module</h3>
              <p className="text-gray-500 text-sm mb-6">
                Tell us your use case and we'll prepare a deployment proposal.
              </p>
              <ContactForm
                serviceTitle={`${service.title} (${tiers[selectedTier].name} — ${price.toLocaleString()} TND)`}
                accentHex={WEB_DEV_ACCENT}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
