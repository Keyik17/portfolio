"use client";

import { useEffect } from "react";
import { startTracking } from "@/lib/track";

export function Analytics() {
  useEffect(startTracking, []);
  return null;
}
