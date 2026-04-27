// ─── Production Backend for Email Relay ──────────────────────────────────────
// This URL points to your now-live Render backend:
// https://showcase-dajv.onrender.com
// ─────────────────────────────────────────────────────────────────────────────

export const EMAIL_CONFIG = {
  // Use a relative path in production since the frontend is served by the backend
  // In development, fallback to the live Render backend
  API_URL: import.meta.env.VITE_API_URL || 'https://showcase-dajv.onrender.com',

  // Recipient (main business contact)
  TO_EMAIL: 'marketbusinessofall@gmail.com',
};
