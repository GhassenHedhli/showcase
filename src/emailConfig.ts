// ─── Production Backend for Email Relay ──────────────────────────────────────
// This URL points to your now-live Render backend:
// https://showcase-f885.onrender.com
// ─────────────────────────────────────────────────────────────────────────────

export const EMAIL_CONFIG = {
  // Production URL (with localhost fallback for development)
  API_URL: import.meta.env.VITE_API_URL || 'https://showcase-f885.onrender.com',

  // Recipient (to keep it organized)
  TO_EMAIL: 'marketbusinessofall@gmail.com',
};
