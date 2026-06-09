"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Stack, Text, Spinner, Box } from "@sanity/ui";
import type { StringInputProps } from "sanity";
import { useClient, useFormValue } from "sanity";
import { getYoutubeId } from "@/lib/youtube";

export function YoutubeUrlInput(props: StringInputProps) {
  const { renderDefault, value } = props;
  const client = useClient({ apiVersion: "2024-01-01" });
  const documentId = useFormValue(["_id"]) as string | undefined;

  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");
  const lastFetchedUrl = useRef("");

  const fetchAndSaveDuration = useCallback(
    async (url: string) => {
      if (!url || url === lastFetchedUrl.current) return;
      if (!getYoutubeId(url)) return;

      lastFetchedUrl.current = url;
      setStatus("loading");
      setMessage("");

      try {
        const res = await fetch(
          `/api/youtube-duration?url=${encodeURIComponent(url)}`
        );
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to fetch duration");
        }

        if (documentId && data.duration) {
          await client.patch(documentId).set({ duration: data.duration }).commit();
          setStatus("done");
          setMessage(`Duration updated: ${data.duration}`);
        }
      } catch (err) {
        lastFetchedUrl.current = "";
        setStatus("error");
        setMessage(
          err instanceof Error ? err.message : "Could not fetch duration"
        );
      }
    },
    [client, documentId]
  );

  useEffect(() => {
    const url = typeof value === "string" ? value.trim() : "";
    if (!url || !getYoutubeId(url)) {
      setStatus("idle");
      return;
    }

    const timer = setTimeout(() => {
      fetchAndSaveDuration(url);
    }, 700);

    return () => clearTimeout(timer);
  }, [value, fetchAndSaveDuration]);

  return (
    <Stack space={3}>
      {renderDefault(props)}
      {status === "loading" && (
        <Box paddingY={1}>
          <Text size={1} muted>
            <Spinner muted /> Fetching duration from YouTube…
          </Text>
        </Box>
      )}
      {status === "done" && (
        <Text size={1} muted>
          {message}
        </Text>
      )}
      {status === "error" && (
        <Text size={1} style={{ color: "var(--card-badge-critical-fg-color, #c00)" }}>
          {message}
        </Text>
      )}
    </Stack>
  );
}
