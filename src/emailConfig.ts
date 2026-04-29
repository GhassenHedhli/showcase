// ─── Email Backend URL Configuration ─────────────────────────────────────────
//
// HOW THIS WORKS:
//
//  🟢 Vercel deployment (recommended):
//     Leave VITE_API_URL unset in Vercel dashboard.
//     The empty default means fetch('/api/contact') → Vercel routes to api/contact.js
//     No cold start, no cross-origin issues.
//
//  🟡 Render deployment:
//     Set VITE_API_URL=https://showcase-dajv.onrender.com in Render dashboard.
//     The server.cjs Express backend handles /api/contact.
//
//  🔵 Local development:
//     Set VITE_API_URL=http://localhost:3001 in .env, then run: node server.cjs
//
// ─────────────────────────────────────────────────────────────────────────────

export const EMAIL_CONFIG = {
  // Fix #3: Empty default → relative /api/contact path → Vercel Function is used.
  // Override with VITE_API_URL env var only when targeting an external backend.
  API_URL: import.meta.env.VITE_API_URL || '',

  // Recipient (main business contact)
  TO_EMAIL: 'marketbusinessofall@gmail.com',
};
