// ─── Production Backend for Email Relay ──────────────────────────────────────
// This URL points to your now-live Render backend:
// https://showcase-dajv.onrender.com
// ─────────────────────────────────────────────────────────────────────────────

export const EMAIL_CONFIG = {
  // Fallback to the live Render backend if no env var is provided
  API_URL: import.meta.env.VITE_API_URL || 'https://showcase-dajv.onrender.com',

  // Recipient (main business contact)
  TO_EMAIL: 'marketbusinessofall@gmail.com',
};
