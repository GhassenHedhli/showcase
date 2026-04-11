// ─── Production Backend for Email Relay ──────────────────────────────────────
// This URL points to your now-live Render backend:
// https://showcase-f885.onrender.com
// ─────────────────────────────────────────────────────────────────────────────

export const EMAIL_CONFIG = {
  // Fallback to local server (3001) if no env var is provided
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:3001',

  // Recipient (main business contact)
  TO_EMAIL: 'marketbusinessofall@gmail.com',
};
