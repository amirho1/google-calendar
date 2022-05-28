import { useEffect } from "react";

type CbT = (e: KeyboardEvent) => void;

export default function useKeyDown(cb: CbT) {
  useEffect(() => {
    document.addEventListener("keydown", cb);

    return () => document.removeEventListener("keydown", cb);
  }, [cb]);
}
