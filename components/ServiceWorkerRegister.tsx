"use client";
import { useEffect } from "react";

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      // デプロイのたびにキャッシュをバストするためバージョンをクエリに付与
      const version = process.env.NEXT_PUBLIC_BUILD_ID ?? Date.now().toString();
      navigator.serviceWorker
        .register(`/sw.js?v=${version}`)
        .catch((err) => console.error("SW registration failed:", err));
    }
  }, []);

  return null;
}
