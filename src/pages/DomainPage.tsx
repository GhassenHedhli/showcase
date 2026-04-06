import { useParams, useNavigate, Link } from 'react-router-dom';
import { getDomainById, webDevServices } from '../data';
import Icon from '../components/Icon';
import ContactForm from '../components/ContactForm';
import { ChevronLeft, ChevronRight, ArrowRight, CheckCircle2, Home } from 'lucide-react';

export default function DomainPage() {
  const { domainId } = useParams<{ domainId: string }>();
  const navigate = useNavigate();
  const domain = getDomainById(domainId ?? '');

  if (!domain) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 text-center px-6">
        <div className="text-8xl font-black text-gray-800">404</div>
        <h2 className="text-2xl font-bold text-white">Domain Not Found</h2>
        <p className="text-gray-400">The technology domain you're looking for doesn't exist.</p>
        <button onClick={() => navigate('/')} className="glow-button px-6 py-3 text-sm">
          <Home className="w-4 h-4" /> Back to Home
        </button>
      </div>
    );
  }

  const isWebDev = domain.id === 'web-dev';
  const services = isWebDev ? webDevServices : [];
  const capabilities = !isWebDev ? (domain.capabilities ?? []) : [];

  return (
    <div className="w-full page-fade-in">

      {/* ── Gradient Hero ─────────────────────────────────────────────────── */}
      <section
        className="relative pt-36 pb-20 overflow-hidden"
        style={{ background: `radial-gradient(ellipse at 60% 0%, ${domain.accentHex}18 0%, transparent 65%)` }}
      >
        {/* Top gradient bar */}
        <div className={`absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r ${domain.gradient}`} />

        {/* Orbs */}
        <div className="absolute inset-0 pointer-events-none -z-10">
          <div
            className="absolute top-[-10%] right-[-5%] w-[50%] h-[60%] blur-[140px] rounded-full opacity-30"
            style={{ background: domain.accentHex }}
          />
          <div
            className="absolute bottom-[-5%] left-[-5%] w-[30%] h-[40%] blur-[120px] rounded-full opacity-20"
            style={{ background: domain.accentHex }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-12 flex-wrap">
            <Link to="/" className="hover:text-gray-300 transition-colors flex items-center gap-1">
              <Home className="w-3.5 h-3.5" /> Home
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-700" />
            <span className="font-medium" style={{ color: domain.accentHex }}>{domain.title}</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-end gap-12">
            {/* Left: Title */}
            <div className="flex-1">
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-6 backdrop-blur-md"
                style={{ background: `${domain.accentHex}18`, color: domain.accentHex, border: `1px solid ${domain.accentHex}40` }}
              >
                <Icon name={domain.iconName} size={16} color={domain.accentHex} />
                {domain.badge}
              </div>

              <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none mb-6">
                <span style={{
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundImage: `linear-gradient(135deg, #fff 40%, ${domain.accentHex})`,
                  backgroundClip: 'text',
                }}>
                  {domain.title}
                </span>
              </h1>

              <p className="text-lg text-gray-400 max-w-2xl leading-relaxed">{domain.description}</p>
            </div>

            {/* Right: CTA */}
            <div className="lg:w-60 lg:text-right">
              <button
                onClick={() => document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-white text-sm transition-all hover:brightness-110 active:scale-95"
                style={{
                  background: `linear-gradient(135deg, ${domain.accentHex}, ${domain.accentHex}99)`,
                  boxShadow: `0 0 30px -8px ${domain.accentHex}`,
                }}
              >
                Get a License <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6">
            {domain.stats.map(stat => (
              <div
                key={stat.label}
                className="rounded-2xl px-5 py-4 backdrop-blur-sm"
                style={{ background: `${domain.accentHex}10`, border: `1px solid ${domain.accentHex}25` }}
              >
                <div className="text-2xl font-black mb-1" style={{ color: domain.accentHex }}>{stat.value}</div>
                <div className="text-gray-400 text-xs font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Main Content ──────────────────────────────────────────────────── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">

          {/* Section header */}
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
              {isWebDev ? 'Available Microservices' : 'Core Capabilities'}
            </h2>
            <p className="text-gray-400">
              {isWebDev
                ? 'All 15 modules are independently deployable. License individually or combine them.'
                : 'Everything included in the domain license. Built for production from day one.'}
            </p>
          </div>

          {/* Web Dev → Service Cards */}
          {isWebDev && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {services.map(svc => (
                <button
                  key={svc.id}
                  onClick={() => navigate(`/service/${svc.id}`)}
                  className="group glass-card rounded-2xl p-6 text-left flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1"
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                    style={{ background: `${domain.accentHex}18`, border: `1px solid ${domain.accentHex}35` }}
                  >
                    <Icon name={svc.iconName} size={20} color={domain.accentHex} />
                  </div>

                  <div className="flex-grow">
                    <h3 className="font-bold text-white mb-2 text-lg leading-snug">{svc.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">{svc.shortDesc}</p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {svc.techStack.slice(0, 3).map(t => (
                      <span key={t} className="text-[10px] font-bold px-2 py-0.5 rounded bg-gray-800 text-gray-400 border border-gray-700">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-white/5">
                    <span className="text-sm font-black" style={{ color: domain.accentHex }}>
                      from {svc.basePrice.toLocaleString()} TND
                    </span>
                    <span
                      className="text-xs font-bold flex items-center gap-1 opacity-50 group-hover:opacity-100 group-hover:gap-2 transition-all"
                      style={{ color: domain.accentHex }}
                    >
                      View details <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Other domains → Capability Cards */}
          {!isWebDev && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {capabilities.map((cap, idx) => (
                <div
                  key={idx}
                  className="glass-card rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1"
                  style={{ borderColor: `${domain.accentHex}15` }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{ background: `${domain.accentHex}15`, border: `1px solid ${domain.accentHex}30` }}
                  >
                    <Icon name={cap.iconName} size={20} color={domain.accentHex} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-2 leading-snug">{cap.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{cap.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Tech Stack ────────────────────────────────────────────────────── */}
      <section className="py-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-2xl font-black text-white mb-8">Technology Stack</h3>
          <div className="flex flex-wrap gap-3">
            {domain.techStack.map(tech => (
              <span
                key={tech}
                className="px-5 py-2.5 rounded-xl font-bold text-sm backdrop-blur-md transition-all hover:brightness-125"
                style={{
                  background: `${domain.accentHex}12`,
                  color: domain.accentHex,
                  border: `1px solid ${domain.accentHex}35`,
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── What You Get ──────────────────────────────────────────────────── */}
      <section className="py-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="glass-card rounded-3xl p-10">
            <h3 className="text-2xl font-black text-white mb-8">What's Included in Every License</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                'Compiled production binary (JAR / Docker image)',
                'Full deployment documentation',
                'API endpoint reference & examples',
                'Environment configuration guide',
                '30-day integration support',
                'Security hardening checklist',
                isWebDev ? 'Postman collection included' : 'Architecture diagram & data flow',
                'Docker Compose setup file',
                'Enterprise: Full source code access',
              ].map(item => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: domain.accentHex }} />
                  <span className="text-gray-300 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact Section ───────────────────────────────────────────────── */}
      <section id="contact-section" className="py-20 border-t border-white/5">
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center mb-10">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-6"
              style={{ background: `${domain.accentHex}18`, color: domain.accentHex, border: `1px solid ${domain.accentHex}40` }}
            >
              <Icon name={domain.iconName} size={14} color={domain.accentHex} />
              Interested in {domain.title}?
            </div>
            <h2 className="text-4xl font-black text-white mb-4">Request a Technical Briefing</h2>
            <p className="text-gray-400">
              Fill out the form below and we'll prepare a full architecture overview and pricing proposal for your use case.
            </p>
          </div>

          <div
            className="rounded-3xl p-8 md:p-10"
            style={{
              background: 'rgba(10, 10, 20, 0.7)',
              border: `1px solid ${domain.accentHex}25`,
              backdropFilter: 'blur(20px)',
            }}
          >
            <ContactForm domainTitle={domain.title} accentHex={domain.accentHex} />
          </div>
        </div>
      </section>
    </div>
  );
}
