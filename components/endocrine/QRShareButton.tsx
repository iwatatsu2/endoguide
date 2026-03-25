"use client";
import { useState } from "react";

const DM_URL = "https://iwatatsu2.github.io/dm-compass/";
const ENDO_URL = "https://endoguide.vercel.app/endocrine";

function qrSrc(url: string) {
  return `https://api.qrserver.com/v1/create-qr-code/?size=180x180&color=ffffff&bgcolor=030712&data=${encodeURIComponent(url)}`;
}

export default function QRShareButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 text-sm font-semibold text-white hover:text-green-400 border border-gray-700 rounded-lg px-4 py-2 transition-colors whitespace-nowrap"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="5" height="5" x="3" y="3" rx="1"/><rect width="5" height="5" x="16" y="3" rx="1"/><rect width="5" height="5" x="3" y="16" rx="1"/>
          <path d="M21 16h-3a2 2 0 0 0-2 2v3"/><path d="M21 21v.01"/><path d="M12 7v3a2 2 0 0 1-2 2H7"/><path d="M3 12h.01"/><path d="M12 3h.01"/><path d="M12 16v.01"/><path d="M16 12h1"/><path d="M21 12v.01"/><path d="M12 21v-1"/>
        </svg>
        <span>共有</span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-gray-900 border border-gray-700 rounded-2xl p-6 mx-4 w-full max-w-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-bold text-white">アプリを共有する</p>
              <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center gap-2">
                <img src={qrSrc(DM_URL)} alt="DM Compass QR" className="w-40 h-40 rounded-xl" />
                <div className="text-center">
                  <p className="text-sm font-bold text-green-400">DM Compass</p>
                  <p className="text-xs text-gray-500">糖尿病病棟OS</p>
                  <a
                    href={DM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mt-1 text-xs text-blue-400 underline break-all hover:text-blue-300"
                  >
                    {DM_URL}
                  </a>
                </div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <img src={qrSrc(ENDO_URL)} alt="Endo Compass QR" className="w-40 h-40 rounded-xl" />
                <div className="text-center">
                  <p className="text-sm font-bold text-blue-400">Endo Compass</p>
                  <p className="text-xs text-gray-500">内分泌負荷試験</p>
                  <a
                    href={ENDO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mt-1 text-xs text-blue-400 underline break-all hover:text-blue-300"
                  >
                    {ENDO_URL}
                  </a>
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-600 text-center mt-4">QRコードをスキャンしてアクセス</p>
          </div>
        </div>
      )}
    </>
  );
}
