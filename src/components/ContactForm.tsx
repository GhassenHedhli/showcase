import { useState } from 'react';
import { Send, CheckCircle, AlertCircle, Loader2, ChevronDown } from 'lucide-react';
import { EMAIL_CONFIG } from '../emailConfig';

interface ContactFormProps {
  domainTitle?: string;
  serviceTitle?: string;
  accentHex?: string;
}

const COUNTRIES = [
  { code: '+216', flag: '🇹🇳', name: 'Tunisia' },
  { code: '+1',   flag: '🇺🇸', name: 'United States & Canada' },
  { code: '+44',  flag: '🇬🇧', name: 'United Kingdom' },
  { code: '+33',  flag: '🇫🇷', name: 'France' },
  { code: '+49',  flag: '🇩🇪', name: 'Germany' },
  { code: '+39',  flag: '🇮🇹', name: 'Italy' },
  { code: '+34',  flag: '🇪🇸', name: 'Spain' },
  { code: '+32',  flag: '🇧🇪', name: 'Belgium' },
  { code: '+41',  flag: '🇨🇭', name: 'Switzerland' },
  { code: '+31',  flag: '🇳🇱', name: 'Netherlands' },
  { code: '+971', flag: '🇦🇪', name: 'United Arab Emirates' },
  { code: '+966', flag: '🇸🇦', name: 'Saudi Arabia' },
  { code: '+212', flag: '🇲🇦', name: 'Morocco' },
  { code: '+213', flag: '🇩🇿', name: 'Algeria' },
  { code: '+20',  flag: '🇪🇬', name: 'Egypt' },
  { code: '+27',  flag: '🇿🇦', name: 'South Africa' },
  { code: '+81',  flag: '🇯🇵', name: 'Japan' },
  { code: '+86',  flag: '🇨🇳', name: 'China' },
  { code: '+91',  flag: '🇮🇳', name: 'India' },
  { code: '+61',  flag: '🇦🇺', name: 'Australia' },
  { code: '+55',  flag: '🇧🇷', name: 'Brazil' },
  { code: '+52',  flag: '🇲🇽', name: 'Mexico' },
];
export default function ContactForm({ domainTitle, serviceTitle, accentHex = '#06b6d4' }: ContactFormProps) {
  const [form, setForm] = useState({
    from_name: '',
    from_email: '',
    phone: '',
    countryCode: '+216',
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
    
    // Basic validation
    if (!form.from_name.trim() || !form.from_email.trim() || !form.phone.trim() || !form.message.trim()) {
      setErrorMsg('All fields marked with * are required.');
      return;
    }

    // Phone Verification (digits only for the local part)
    const localPhone = form.phone.replace(/\s+/g, '');
    if (!/^\d{4,15}$/.test(localPhone)) {
      setErrorMsg('Please enter a valid phone number.');
      return;
    }

    const fullPhone = `${form.countryCode}${localPhone}`;
    setStatus('loading');
    setErrorMsg('');

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); 

    try {
      const response = await fetch(`${EMAIL_CONFIG.API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, phone: fullPhone }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: response.statusText }));
        throw new Error(errorData.error || `Server returned ${response.status}`);
      }

      setStatus('success');
    } catch (err: any) {
      clearTimeout(timeoutId);
      console.error('[Backend Error]', err);
      setStatus('error');
      
      let msg = err.message || 'The email backend could not be reached.';
      if (err.name === 'AbortError') {
        msg = 'Connection timed out. The server is taking too long to respond.';
      }
      setErrorMsg(msg);
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
          onClick={() => { setStatus('idle'); setForm({ from_name: '', from_email: '', phone: '', countryCode: '+216', company: '', interest: domainTitle || serviceTitle || '', message: '' }); }}
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
            style={{ borderColor: form.from_name ? accentHex + '50' : '' }}
            className="w-full bg-black/40 border-2 border-gray-800 rounded-xl py-3.5 px-4 text-sm text-white focus:outline-none transition-all placeholder:text-gray-600 focus:ring-1"
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
            style={{ borderColor: form.from_email ? accentHex + '50' : '' }}
            className="w-full bg-black/40 border-2 border-gray-800 rounded-xl py-3.5 px-4 text-sm text-white focus:outline-none transition-all placeholder:text-gray-600 focus:ring-1"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest">Phone Number *</label>
        <div className="flex gap-2">
          {/* Country Selector */}
          <div className="relative">
            <select
              name="countryCode"
              value={form.countryCode}
              onChange={(e) => setForm(f => ({ ...f, countryCode: e.target.value }))}
              className="appearance-none bg-black/40 border-2 border-gray-800 rounded-xl py-3.5 pl-4 pr-10 text-sm text-white focus:outline-none transition-all focus:ring-1 cursor-pointer w-[140px]"
              style={{ borderColor: accentHex + '30' }}
            >
              {COUNTRIES.map(c => (
                <option key={c.name} value={c.code} className="bg-gray-900">
                  {c.flag} {c.code}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
              <ChevronDown size={14} />
            </div>
          </div>

          {/* Number Input */}
          <input
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="12 345 678"
            style={{ borderColor: form.phone ? accentHex + '50' : '' }}
            className="flex-1 bg-black/40 border-2 border-gray-800 rounded-xl py-3.5 px-4 text-sm text-white focus:outline-none transition-all placeholder:text-gray-600 focus:ring-1"
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
          style={{ borderColor: form.company ? accentHex + '50' : '' }}
          className="w-full bg-black/40 border-2 border-gray-800 rounded-xl py-3.5 px-4 text-sm text-white focus:outline-none transition-all placeholder:text-gray-600 focus:ring-1"
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
            style={{ borderColor: form.interest ? accentHex + '50' : '' }}
            className="w-full bg-black/40 border-2 border-gray-800 rounded-xl py-3.5 px-4 text-sm text-white focus:outline-none transition-all placeholder:text-gray-600 focus:ring-1"
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
          style={{ borderColor: form.message ? accentHex + '50' : '' }}
          className="w-full bg-black/40 border-2 border-gray-800 rounded-xl py-3.5 px-4 text-sm text-white focus:outline-none transition-all resize-none placeholder:text-gray-600 focus:ring-1"
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
