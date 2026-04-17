import { ImageResponse } from "next/og";

import { portfolio } from "../design-system/tokens/portfolio";

export const alt = "赵子瑞作品集分享封面";
export const contentType = "image/png";
export const size = {
  width: 1200,
  height: 630,
};

const portfolioColors = portfolio.colorThemes.light;

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "stretch",
          background: portfolioColors.canvas,
          color: portfolioColors.textTitle,
          display: "flex",
          fontFamily:
            '"Inter", "Satoshi", "Noto Sans SC", "Noto Sans JP", sans-serif',
          height: "100%",
          padding: "48px",
          position: "relative",
          width: "100%",
        }}
      >
        <div
          style={{
            background: portfolioColors.bgPure,
            border: `1px solid ${portfolioColors.borderLight}`,
            borderRadius: "40px",
            display: "flex",
            height: "100%",
            overflow: "hidden",
            position: "relative",
            width: "100%",
          }}
          >
          <div
            style={{
              background:
                `radial-gradient(circle at top left, ${portfolioColors.surfaceWarm} 0%, transparent 68%), ` +
                `linear-gradient(180deg, ${portfolioColors.bgPure} 0%, ${portfolioColors.bgSoft} 100%)`,
              bottom: "0",
              left: "0",
              position: "absolute",
              right: "0",
              top: "0",
            }}
          />
          <div
            style={{
              display: "flex",
              flex: 1,
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "52px 56px 48px",
              position: "relative",
            }}
          >
            <div
              style={{
                alignItems: "center",
                color: portfolioColors.accentBrand,
                display: "flex",
                fontSize: 24,
                fontWeight: 600,
                letterSpacing: "-0.02em",
                textTransform: "uppercase",
              }}
            >
              Zirui Zhao
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "18px",
                maxWidth: "650px",
              }}
            >
              <div
                style={{
                  color: portfolioColors.textMuted,
                  display: "flex",
                  fontSize: 24,
                  fontWeight: 500,
                  letterSpacing: "-0.02em",
                }}
              >
                Product Design Portfolio
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: 84,
                  fontWeight: 700,
                  letterSpacing: "-0.065em",
                  lineHeight: 0.98,
                }}
              >
                赵子瑞作品集
              </div>
              <div
                style={{
                  color: portfolioColors.textBody,
                  display: "flex",
                  fontSize: 28,
                  fontWeight: 500,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.42,
                  maxWidth: "600px",
                }}
              >
                为复杂业务流程、系统与界面设计真正能够落地的企业级产品
              </div>
            </div>

            <div
              style={{
                alignItems: "center",
                color: portfolioColors.textMuted,
                display: "flex",
                fontSize: 21,
                gap: "14px",
                letterSpacing: "-0.02em",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  alignItems: "center",
                  display: "flex",
                  gap: "10px",
                }}
              >
                {["Case Studies", "Design Systems"].map(
                  (label) => (
                    <div
                      key={label}
                      style={{
                        alignItems: "center",
                        background: portfolioColors.surface,
                        border: `1px solid ${portfolioColors.borderLight}`,
                        borderRadius: "999px",
                        color: portfolioColors.textBody,
                        display: "flex",
                        fontSize: 19,
                        fontWeight: 500,
                        padding: "10px 14px",
                      }}
                    >
                      {label}
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
