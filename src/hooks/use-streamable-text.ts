import { StreamableValue, readStreamableValue } from "ai/rsc";
import { useEffect, useState } from "react";

export const useStreamableText = (content: string | StreamableValue<string>) => {
  const [rawContent, setRawContent] = useState(typeof content === "string" ? content : "");

  useEffect(() => {
    (async () => {
      if (typeof content === "object") {
        let value = "";
        for await (const delta of readStreamableValue(content)) {
          console.log(delta);
          if (typeof delta === "string") {
            setRawContent((value += delta));
          }
        }
      }
    })();
  }, [content]);

  return rawContent;
};
