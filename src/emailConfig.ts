// ─── Production Backend for Email Relay ──────────────────────────────────────
// This URL points to your now-live Render backend:
// https://showcase-f885.onrender.com
// ─────────────────────────────────────────────────────────────────────────────

export const EMAIL_CONFIG = {
  // Relative path (preferred for Vercel) or fallback for development
  API_URL: import.meta.env.VITE_API_URL || '',

  // Recipient (main business contact)
  TO_EMAIL: 'marketbusinessofall@gmail.com',
};
