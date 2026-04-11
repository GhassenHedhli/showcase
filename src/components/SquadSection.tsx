import { Shield, BrainCircuit, Smartphone, LayoutGrid } from 'lucide-react';

const SQUADS = [
  {
    name: 'Fintech Squad',
    icon: <Shield className="w-8 h-8" />,
    color: 'from-cyan-500 to-blue-600',
    desc: 'Ledger integrity & Secure Payments'
  },
  {
    name: 'AI Lab',
    icon: <BrainCircuit className="w-8 h-8" />,
    color: 'from-purple-500 to-fuchsia-600',
    desc: 'LLM Orchestration & Neural Search'
  },
  {
    name: 'Cloud Infra',
    icon: <LayoutGrid className="w-8 h-8" />,
    color: 'from-blue-600 to-cyan-400',
    desc: 'K8s Scaling & Edge Resilience'
  },
  {
    name: 'Mobile UX',
    icon: <Smartphone className="w-8 h-8" />,
    color: 'from-fuchsia-500 to-rose-500',
    desc: 'Native Performance & Fluid UI'
  }
];

export default function SquadSection() {
  return (
    <section id="squads" className="py-24 bg-transparent relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4 premium-gradient-text">Elite Engineering Squads</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Our specialized units work across domains to deliver integrated enterprise solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SQUADS.map((squad) => (
            <div key={squad.name} className="group relative glass-card p-0.5 rounded-3xl transition-all duration-500 hover:scale-[1.02]">
              <div className="p-8 rounded-[22px] bg-[#0a0a14]/60 backdrop-blur-3xl h-full flex flex-col">
                {/* Abstract Icon Backdrop */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-tr ${squad.color} flex items-center justify-center mb-6 shadow-lg group-hover:rotate-6 transition-transform duration-300 relative`}>
                  <div className="text-white drop-shadow-md relative z-10">
                    {squad.icon}
                  </div>
                  {/* Subtle Glow */}
                  <div className={`absolute inset-0 bg-gradient-to-tr ${squad.color} blur-xl opacity-20 group-hover:opacity-40 transition-opacity`}></div>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{squad.name}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">{squad.desc}</p>

                {/* Status Indicator */}
                <div className="flex items-center gap-2 mt-auto">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500/80">Active Operations</span>
                </div>

                {/* Visual Accent Corner */}
                <div className={`absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl ${squad.color} opacity-[0.03] rounded-br-3xl pointer-events-none`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
