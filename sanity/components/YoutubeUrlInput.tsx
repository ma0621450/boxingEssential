"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Stack, Text, Spinner, Box } from "@sanity/ui";
import type { StringInputProps } from "sanity";
import { useClient, useFormValue } from "sanity";
import { getYoutubeId } from "@/lib/youtube";

type SyncStatus = "idle" | "loading" | "done" | "error";

export function YoutubeUrlInput(props: StringInputProps) {
  const { renderDefault, value } = props;
  const client = useClient({ apiVersion: "2024-01-01" });
  const documentId = useFormValue(["_id"]) as string | undefined;
  const title = useFormValue(["title"]) as string | undefined;

  const [status, setStatus] = useState<SyncStatus>("idle");
  const [message, setMessage] = useState("");
  const lastFetchedUrl = useRef("");

  const syncFromYoutube = useCallback(
    async (url: string) => {
      if (!url || url === lastFetchedUrl.current) return;
      if (!getYoutubeId(url)) return;

      if (!documentId) {
        setStatus("error");
        setMessage("Save the draft first, then paste the YouTube URL again.");
        return;
      }

      lastFetchedUrl.current = url;
      setStatus("loading");
      setMessage("");

      try {
        const res = await fetch("/api/youtube-sync", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url }),
        });
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to sync from YouTube");
        }

        const patch = client.patch(documentId);

        if (data.duration) {
          patch.set({ duration: data.duration });
        }

        if (data.assetId) {
          patch.set({
            thumbnail: {
              _type: "image",
              asset: { _type: "reference", _ref: data.assetId },
              alt: title?.trim() || "Video thumbnail",
            },
          });
        }

        await patch.commit();

        const parts: string[] = [];
        if (data.duration) parts.push(`duration ${data.duration}`);
        if (data.assetId) parts.push("thumbnail");

        setStatus("done");
        setMessage(
          parts.length
            ? `Updated from YouTube: ${parts.join(" and ")}.`
            : "Synced from YouTube."
        );
      } catch (err) {
        lastFetchedUrl.current = "";
        setStatus("error");
        setMessage(
          err instanceof Error ? err.message : "Could not sync from YouTube"
        );
      }
    },
    [client, documentId, title]
  );

  useEffect(() => {
    const url = typeof value === "string" ? value.trim() : "";
    if (!url || !getYoutubeId(url)) {
      setStatus("idle");
      lastFetchedUrl.current = "";
      return;
    }

    const timer = setTimeout(() => {
      syncFromYoutube(url);
    }, 700);

    return () => clearTimeout(timer);
  }, [value, syncFromYoutube]);

  return (
    <Stack space={3}>
      {renderDefault(props)}
      {status === "loading" && (
        <Box paddingY={1}>
          <Text size={1} muted>
            <Spinner muted /> Fetching duration and thumbnail from YouTube…
          </Text>
        </Box>
      )}
      {status === "done" && (
        <Text size={1} muted>
          {message}
        </Text>
      )}
      {status === "error" && (
        <Text
          size={1}
          style={{ color: "var(--card-badge-critical-fg-color, #c00)" }}
        >
          {message}
        </Text>
      )}
    </Stack>
  );
}
