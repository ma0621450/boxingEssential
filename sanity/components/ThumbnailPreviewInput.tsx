"use client";

import { Stack, Text } from "@sanity/ui";
import type { ObjectInputProps } from "sanity";

export function ThumbnailPreviewInput(props: ObjectInputProps) {
  return (
    <Stack space={3}>
      {props.renderDefault({
        ...props,
        readOnly: true,
      })}
      <Text size={1} muted>
        Auto-filled from the YouTube URL. Paste or change the video link above to
        update.
      </Text>
    </Stack>
  );
}
