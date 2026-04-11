import { useNavigate } from 'react-router-dom';
import { domains } from '../data';
import type { Domain } from '../data';
import Icon from '../components/Icon';
import ContactForm from '../components/ContactForm';
import Carousel from '../components/Carousel';
import { globalShowcaseItems } from '../showcaseData';

import {
  Layers, ArrowRight, Shield, Zap, Globe2, CheckCircle2,
  Users, Star, ChevronDown
} from 'lucide-react';
import SquadSection from '../components/SquadSection';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="w-full page-fade-in">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative pt-44 pb-32 overflow-hidden">
        {/* Orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
          <div className="absolute top-[-5%] left-[-10%] w-[60%] h-[60%] bg-cyan-600/15 blur-[140px] rounded-full" />
          <div className="absolute bottom-[0%] right-[-5%] w-[40%] h-[40%] bg-fuchsia-700/12 blur-[120px] rounded-full" />
          <div className="absolute top-[30%] left-[50%] w-[30%] h-[30%] bg-purple-600/10 blur-[100px] rounded-full" />
        </div>

        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-400/25 text-cyan-300 text-sm font-semibold mb-10 backdrop-blur-md">
            <Layers className="w-4 h-4" />
            Enterprise Technology Solutions · Tunisia
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-black tracking-tight mb-8 leading-[0.95]">
            <span className="premium-gradient-text">The Platform</span>
            <br />
            <span className="text-white">Behind Your Innovation.</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-12">
            Production-ready microservices, AI inference pipelines, IoT infrastructure, DevOps tooling, and advanced analytics.
            <br className="hidden md:block" />
            License <strong className="text-white">exactly</strong> what your business needs — nothing more.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => document.getElementById('domains')?.scrollIntoView({ behavior: 'smooth' })}
              className="glow-button px-9 py-4 text-base font-black"
            >
              Explore Domains
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-9 py-4 rounded-2xl border-2 border-gray-700 text-gray-300 font-bold hover:border-gray-500 hover:text-white transition-all duration-300 text-base"
            >
              Request a Briefing
            </button>
          </div>

          {/* Scroll hint */}
          <div className="mt-16 flex justify-center">
            <button
              onClick={() => document.getElementById('domains')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-gray-600 hover:text-gray-400 transition-colors animate-bounce"
            >
              <ChevronDown className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ─────────────────────────────────────────────────────── */}
      <section className="border-t border-b border-white/5 py-10 bg-black/20 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '8',    label: 'Expert Domains' },
              { value: '25+',  label: 'Microservices' },
              { value: '100+', label: 'Capabilities' },
              { value: '100%', label: 'Source-Code Available' },
            ].map(stat => (
              <div key={stat.label}>
                <div className="text-3xl md:text-4xl font-black premium-gradient-text mb-1">{stat.value}</div>
                <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Domain Cards ─────────────────────────────────────────────────── */}
      <section id="domains" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-400 mb-4">Our Expertise</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-5">
              Choose Your Domain
            </h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              Six specialized technology domains, each unlocking a complete, battle-tested engineering capability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {domains.map((domain, idx) => (
              <DomainCard
                key={domain.id}
                domain={domain}
                index={idx}
                onClick={() => navigate(`/domain/${domain.id}`)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Implementation Showcase ───────────────────────────────────────── */}
      <section className="py-24 border-t border-white/5 bg-slate-950/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-400 mb-4">Real-World Execution</p>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight">
                Work Showcase
              </h2>
            </div>
            <p className="text-gray-400 text-lg max-w-md">
              A glimpse into production-grade implementations across our core technology domains.
            </p>
          </div>

          <Carousel 
            items={globalShowcaseItems}
          />
        </div>
      </section>

      {/* ── Why section ───────────────────────────────────────────────────── */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black mb-4">Why License With Us?</h2>
            <p className="text-gray-400 max-w-lg mx-auto">
              Every service is built to production standards. No prototypes. No shortcuts.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <Zap className="w-6 h-6" />,
                title: 'Zero Vendor Lock-In',
                desc: 'Open architecture. Deploy on any cloud, any container, any infrastructure you control. No recurring SaaS fees.',
              },
              {
                icon: <Shield className="w-6 h-6" />,
                title: 'Enterprise Security',
                desc: 'JWT, RBAC, mutual TLS, secret management, and GDPR-compliant data handling built in from day one — not bolted on later.',
              },
              {
                icon: <Globe2 className="w-6 h-6" />,
                title: 'Full Source Access',
                desc: 'Enterprise license tier includes complete Java / Python source code with unlimited internal modification rights. What you buy, you own.',
              },
            ].map(item => (
              <div key={item.title} className="glass-card rounded-3xl p-8 flex flex-col gap-5">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Feature checklist */}
          <div className="mt-10 glass-card rounded-3xl p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              'Spring Boot + React stack', 'Docker-ready containers', 'Horizontal scaling',
              'REST + WebSocket APIs', 'MongoDB + PostgreSQL', 'Full test coverage',
              'API Gateway included', 'Stripe payment integration', 'Complete documentation',
            ].map(feat => (
              <div key={feat} className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm font-medium">{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trusted / Social Proof ────────────────────────────────────────── */}
      <section className="py-16 border-t border-white/5 bg-black/20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-8">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <blockquote className="text-xl md:text-2xl text-gray-300 font-medium leading-relaxed italic mb-6">
            "The microservice stack cut our time-to-market by 60%. We licensed the auth + ecommerce combo
            and had a production storefront running in under two weeks."
          </blockquote>
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
              <Users className="w-5 h-5 text-cyan-400" />
            </div>
            <div className="text-left">
              <div className="font-bold text-white text-sm">Enterprise Client</div>
              <div className="text-gray-500 text-xs">SaaS Platform · Tunis</div>
            </div>
          </div>
        </div>
      </section>



      {/* ── Engineering Squads ────────────────────────────────────────────── */}
      <SquadSection />

      {/* ── Contact ───────────────────────────────────────────────────────── */}
      <section id="contact" className="py-24 border-t border-white/5">
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-400 mb-4">Get In Touch</p>
            <h2 className="text-4xl font-black mb-4">Ready to deploy?</h2>
            <p className="text-gray-400">
              Tell us your requirements. We'll match you with the right modules and prepare a technical briefing.
            </p>
          </div>
          <div className="glass-card rounded-3xl p-8 md:p-10">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}

// ── Domain Card ────────────────────────────────────────────────────────────────
function DomainCard({ domain, index, onClick }: { domain: Domain; index: number; onClick: () => void }) {
  const colors: string[] = [
    'from-indigo-600 to-blue-600',
    'from-emerald-500 to-teal-600',
    'from-pink-600 to-violet-700',
    'from-amber-500 to-orange-600',
    'from-violet-600 to-rose-600',
    'from-sky-500 to-cyan-600',
  ];

  return (
    <button
      onClick={onClick}
      className="group text-left rounded-[28px] transition-all duration-500 hover:-translate-y-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
      style={{
        animationDelay: `${index * 80}ms`,
        transform: 'translateY(0)',
      }}
    >
      <div
        className="relative h-full rounded-[28px] bg-gray-900/70 backdrop-blur-xl flex flex-col overflow-hidden"
        style={{ border: `1px solid ${domain.accentHex}30` }}
      >
        {/* Color bar */}
        <div className={`h-1 w-full bg-gradient-to-r ${colors[index % colors.length]}`} />

        {/* Hover glow */}
        <div
          className="absolute top-0 right-0 w-56 h-56 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl rounded-full pointer-events-none"
          style={{ background: domain.glowColor, top: '-30px', right: '-30px' }}
        />

        <div className="p-8 flex flex-col gap-6 relative z-10 flex-grow">
          {/* Icon */}
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
            style={{ background: `${domain.accentHex}18`, border: `1px solid ${domain.accentHex}35` }}
          >
            <Icon name={domain.iconName} size={26} color={domain.accentHex} />
          </div>

          {/* Text */}
          <div className="flex-grow">
            <h3 className="text-2xl font-black text-white mb-3 leading-tight">{domain.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">{domain.tagline}</p>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-2 border-t border-white/5">
            <span
              className="text-xs font-bold px-3 py-1.5 rounded-full"
              style={{ background: `${domain.accentHex}18`, color: domain.accentHex, border: `1px solid ${domain.accentHex}30` }}
            >
              {domain.badge}
            </span>
            <span
              className="text-sm font-bold flex items-center gap-1 group-hover:gap-2.5 transition-all duration-300"
              style={{ color: domain.accentHex }}
            >
              Explore <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}
