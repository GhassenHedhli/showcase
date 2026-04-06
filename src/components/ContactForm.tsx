import { useState } from 'react';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

interface ContactFormProps {
  domainTitle?: string;
  serviceTitle?: string;
  accentHex?: string;
}

export default function ContactForm({ domainTitle, serviceTitle, accentHex = '#6366f1' }: ContactFormProps) {
  const [form, setForm] = useState({
    from_name: '',
    from_email: '',
    company: '',
    interest: domainTitle || serviceTitle || '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.from_name.trim() || !form.from_email.trim() || !form.message.trim()) {
      setErrorMsg('Please fill in name, email, and message before sending.');
      return;
    }
    setStatus('loading');
    setErrorMsg('');

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      // Call the relay backend
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send email via backend.');
      }

      setStatus('success');
    } catch (err: any) {
      console.error('[Backend Error]', err);
      setStatus('error');
      setErrorMsg(err.message || 'The email backend could not be reached. Ensure server.js is running on port 3001.');
    }
  };

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-14 gap-5 text-center">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center"
          style={{ background: `${accentHex}20`, border: `1px solid ${accentHex}50` }}
        >
          <CheckCircle className="w-10 h-10" style={{ color: accentHex }} />
        </div>
        <div>
          <h3 className="text-2xl font-black text-white mb-2">Message Delivered!</h3>
          <p className="text-gray-400 text-sm max-w-xs">
            Our technical team will contact you within 24 hours.
          </p>
        </div>
        <button
          onClick={() => { setStatus('idle'); setForm({ from_name: '', from_email: '', company: '', interest: domainTitle || serviceTitle || '', message: '' }); }}
          className="text-sm font-semibold underline underline-offset-4 transition-opacity hover:opacity-70"
          style={{ color: accentHex }}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest">Full Name *</label>
          <input
            name="from_name"
            type="text"
            value={form.from_name}
            onChange={handleChange}
            placeholder="John Doe"
            className="w-full bg-black/40 border-2 border-gray-800 rounded-xl py-3.5 px-4 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all placeholder:text-gray-600"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest">Email *</label>
          <input
            name="from_email"
            type="email"
            value={form.from_email}
            onChange={handleChange}
            placeholder="john@example.com"
            className="w-full bg-black/40 border-2 border-gray-800 rounded-xl py-3.5 px-4 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all placeholder:text-gray-600"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest">Company (optional)</label>
        <input
          name="company"
          type="text"
          value={form.company}
          onChange={handleChange}
          placeholder="Acme Corp"
          className="w-full bg-black/40 border-2 border-gray-800 rounded-xl py-3.5 px-4 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all placeholder:text-gray-600"
        />
      </div>

      {!domainTitle && !serviceTitle && (
        <div>
          <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest">Area of Interest</label>
          <input
            name="interest"
            type="text"
            value={form.interest}
            onChange={handleChange}
            placeholder="e.g. Web Dev, IoT, AI/ML..."
            className="w-full bg-black/40 border-2 border-gray-800 rounded-xl py-3.5 px-4 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all placeholder:text-gray-600"
          />
        </div>
      )}

      {(domainTitle || serviceTitle) && (
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">Interest:</span>
          <span
            className="text-xs font-bold px-3 py-1 rounded-full"
            style={{ background: `${accentHex}20`, color: accentHex, border: `1px solid ${accentHex}40` }}
          >
            {domainTitle || serviceTitle}
          </span>
        </div>
      )}

      <div>
        <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest">Message *</label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          rows={4}
          placeholder="Describe your requirements..."
          className="w-full bg-black/40 border-2 border-gray-800 rounded-xl py-3.5 px-4 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all resize-none placeholder:text-gray-600"
        />
      </div>

      {(errorMsg || status === 'error') && (
        <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {errorMsg || 'Failed to send email. Ensure the backend is running.'}
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full py-4 rounded-2xl font-extrabold text-white text-base transition-all flex items-center justify-center gap-3 disabled:opacity-60 shadow-lg hover:brightness-110 active:scale-[0.98]"
        style={{
          background: `linear-gradient(135deg, ${accentHex}, ${accentHex}bb)`,
          boxShadow: `0 0 40px -10px ${accentHex}`,
        }}
      >
        {status === 'loading' ? (
          <><Loader2 className="w-5 h-5 animate-spin" /> Informing Server…</>
        ) : (
          <><Send className="w-5 h-5" /> Request Technical Briefing</>
        )}
      </button>
    </form>
  );
}
