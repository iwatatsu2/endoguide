import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#000000",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* 青い円 */}
        <div
          style={{
            width: "138px",
            height: "138px",
            borderRadius: "50%",
            background: "#3B82F6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              color: "white",
              fontSize: "52px",
              fontWeight: "900",
              letterSpacing: "-2px",
              fontFamily: "sans-serif",
            }}
          >
            EC
          </span>
        </div>
      </div>
    ),
    { width: 180, height: 180 }
  );
}
