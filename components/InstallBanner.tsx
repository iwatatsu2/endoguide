"use client";

import { useState, useEffect, useRef } from "react";

const STORAGE_KEY = "install-banner-dismissed";
const DISMISS_DAYS = 7;

export default function InstallBanner() {
  const [show, setShow] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const deferredPrompt = useRef<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    // Already in standalone/PWA mode
    if (window.matchMedia("(display-mode: standalone)").matches) return;
    if ((navigator as Navigator & { standalone?: boolean }).standalone) return;

    // Dismissed recently
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (dismissed) {
      const diff = Date.now() - Number(dismissed);
      if (diff < DISMISS_DAYS * 24 * 60 * 60 * 1000) return;
    }

    const ua = navigator.userAgent;
    const ios = /iPad|iPhone|iPod/.test(ua) && !(window as unknown as { MSStream?: unknown }).MSStream;
    setIsIOS(ios);

    if (ios) {
      setShow(true);
      return;
    }

    const handler = (e: Event) => {
      e.preventDefault();
      deferredPrompt.current = e as BeforeInstallPromptEvent;
      setShow(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  function dismiss() {
    localStorage.setItem(STORAGE_KEY, String(Date.now()));
    setShow(false);
  }

  async function handleInstall() {
    if (isIOS) {
      setShowIOSGuide(true);
      return;
    }
    const prompt = deferredPrompt.current;
    if (!prompt) return;
    prompt.prompt();
    const result = await prompt.userChoice;
    if (result.outcome === "accepted") dismiss();
    deferredPrompt.current = null;
  }

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-md">
      {showIOSGuide && (
        <div className="mb-2 rounded-xl border border-gray-700 bg-[#1a1a1a] p-4 text-sm text-gray-300 shadow-lg">
          <p className="mb-1 font-semibold text-white">Add to Home Screen</p>
          <ol className="list-inside list-decimal space-y-1">
            <li>
              Tap the <span className="font-semibold text-blue-400">Share</span> button
              <span className="ml-1 inline-block text-base">&#x2191;&#xFE0E;</span> in Safari
            </li>
            <li>
              Scroll down and tap{" "}
              <span className="font-semibold text-white">Add to Home Screen</span>
            </li>
          </ol>
          <button
            onClick={() => setShowIOSGuide(false)}
            className="mt-3 w-full rounded-lg bg-gray-700 py-1.5 text-xs text-white"
          >
            Close
          </button>
        </div>
      )}
      <div className="flex items-center gap-3 rounded-xl border border-gray-700 bg-[#1a1a1a] px-4 py-3 shadow-lg">
        <div className="flex-1">
          <p className="text-sm font-semibold text-white">Endo Compass</p>
          <p className="text-xs text-gray-400">
            Install for quick offline access
          </p>
        </div>
        <button
          onClick={handleInstall}
          className="rounded-lg bg-white px-4 py-1.5 text-xs font-bold text-black"
        >
          Install
        </button>
        <button
          onClick={dismiss}
          className="text-lg text-gray-500"
          aria-label="Close"
        >
          &times;
        </button>
      </div>
    </div>
  );
}

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}
