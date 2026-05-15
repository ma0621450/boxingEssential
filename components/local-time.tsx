"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";

interface LocalTimeProps {
  isoString: string;
}

/**
 * A client-side only component to display dates in the user's local timezone.
 * Prevents hydration mismatches by rendering a placeholder on the server
 * and the actual local time only after mounting on the client.
 */
export function LocalTime({ isoString }: LocalTimeProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // On the server, we render a placeholder to avoid hydration mismatch
  if (!mounted) {
    return <span className="animate-pulse bg-white/10 rounded w-24 h-4 inline-block" />;
  }

  try {
    const date = new Date(isoString);
    return <span>{format(date, "MMM d, yyyy • h:mm aa")}</span>;
  } catch (error) {
    console.error("Invalid date passed to LocalTime:", isoString);
    return <span>TBD</span>;
  }
}
