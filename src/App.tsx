import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, Link, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DomainPage from './pages/DomainPage';
import ServiceDetails from './pages/ServiceDetails';
import { Menu, X, ExternalLink } from 'lucide-react';

// ── Nav items ──────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: 'Domains', action: 'scroll-domains' },
  { label: 'Microservices', href: '/domain/web-dev' },
  { label: 'IoT', href: '/domain/iot' },
  { label: 'AI / ML', href: '/domain/ml-ai' },
  { label: 'Contact', action: 'scroll-contact' },
];

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';

  const handleNavClick = (item: { label: string; href?: string; action?: string }) => {
    setMobileOpen(false);
    if (item.href) {
      navigate(item.href);
      return;
    }
    if (item.action === 'scroll-domains') {
      if (!isHome) { navigate('/'); setTimeout(() => document.getElementById('domains')?.scrollIntoView({ behavior: 'smooth' }), 200); }
      else document.getElementById('domains')?.scrollIntoView({ behavior: 'smooth' });
    }
    if (item.action === 'scroll-contact') {
      if (!isHome) { navigate('/'); setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 200); }
      else document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-[#05050a]/50 backdrop-blur-3xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-500 flex items-center justify-center shadow-[0_0_18px_rgba(6,182,212,0.5)] group-hover:scale-110 transition-transform duration-300">
            <span className="font-black text-xl text-white italic tracking-tighter">P</span>
          </div>
          <span className="font-black text-xl tracking-tight premium-gradient-text hidden sm:block">PlatformEx</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(item => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item)}
              className="px-4 py-2 rounded-lg text-sm font-semibold text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <a
            href="https://showcase-nu-orcin.vercel.app/"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white font-bold text-sm transition-all duration-200 backdrop-blur-md"
          >
            Portal Access <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
          </a>

          {/* Hamburger */}
          <button
            onClick={() => setMobileOpen(prev => !prev)}
            className="md:hidden p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#05050a]/95 backdrop-blur-3xl border-t border-white/5 px-6 py-4 flex flex-col gap-1">
          {NAV_LINKS.map(item => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item)}
              className="w-full text-left px-4 py-3 rounded-xl text-sm font-semibold text-gray-300 hover:text-white hover:bg-white/5 transition-all"
            >
              {item.label}
            </button>
          ))}
          <a
            href="https://showcase-nu-orcin.vercel.app/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-4 py-3 mt-2 rounded-xl border border-white/10 bg-white/5 text-white font-bold text-sm"
          >
            Portal Access <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
          </a>
        </div>
      )}
    </header>
  );
}

function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="border-t border-white/5 py-14 bg-black/30 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-cyan-600 flex items-center justify-center text-white font-black italic text-lg">P</div>
              <span className="font-black text-xl text-white">Platform Excellence</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Enterprise-grade microservices, AI tooling, IoT infrastructure, and DevOps solutions. License what you need. Own what you buy.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Domains</h4>
            <ul className="space-y-2">
              {[
                { label: 'Web Development', path: '/domain/web-dev' },
                { label: 'IoT Solutions', path: '/domain/iot' },
                { label: 'Mobile Dev', path: '/domain/mobile' },
                { label: 'Power BI & ETL', path: '/domain/bi-etl' },
                { label: 'ML / AI', path: '/domain/ml-ai' },
                { label: 'DevOps', path: '/domain/devops' },
              ].map(link => (
                <li key={link.path}>
                  <button
                    onClick={() => navigate(link.path)}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>Tunisia · Available Worldwide</li>
              <li>
                <button
                  onClick={() => { navigate('/'); setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 200); }}
                  className="text-cyan-400 hover:text-cyan-300 transition-colors font-semibold"
                >
                  Send a message →
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-600">
          <span>© 2026 Platform Excellence · All rights reserved.</span>
          <span>Microservice Licensing Infrastructure · Tunisia</span>
        </div>
      </div>
    </footer>
  );
}

// ─── Scroll To Top Helper ───────────────────────────────────────────────────────
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// ── App Root ───────────────────────────────────────────────────────────────────
function AppInner() {
  return (
    <div className="min-h-screen bg-[#05050a] text-gray-100 flex flex-col font-sans">
      <ScrollToTop />
      {/* Mesh BG */}
      <div className="mesh-bg fixed inset-0 pointer-events-none" />
      {/* Noise grain overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.025] z-[1]"
        style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/asfalt-light.png')" }} />

      <Header />

      <main className="flex-grow pt-20 relative z-10">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/domain/:domainId" element={<DomainPage />} />
          <Route path="/service/:serviceId" element={<ServiceDetails />} />
          {/* Redirect old route */}
          <Route path="*" element={
            <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 text-center px-6">
              <div className="text-8xl font-black text-gray-800">404</div>
              <h2 className="text-2xl font-bold">Page not found</h2>
              <Link to="/" className="text-cyan-400 hover:underline">← Back to home</Link>
            </div>
          } />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  );
}
