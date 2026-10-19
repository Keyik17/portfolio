import posthog from "posthog-js";

// Visitor analytics (PostHog). Only runs on the live site, never in local dev.
const key = "phc_CiS8CyRdXuYTsfni5MuBx6EVBG7MQkjGSYoG3vauHc4B";
let started = false;

export function startTracking() {
  if (started || process.env.NODE_ENV !== "production" || typeof window === "undefined") return;
  if (location.hostname !== "keyik.dev") return;
  started = true;
  posthog.init(key, {
    // Sent through keyik.dev/ingest so ad blockers don't drop most visits.
    api_host: "/ingest",
    ui_host: "https://us.posthog.com",
    defaults: "2025-05-24",
    person_profiles: "identified_only",
  });
}

export function track(event: string, props?: Record<string, unknown>) {
  if (started) posthog.capture(event, props);
}
