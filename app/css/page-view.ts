import type { CSSProperties } from "react";

export const statsBoxStyles: CSSProperties = {
  display: "flex",
  borderRadius: "6px",
  padding: "16px",
  background: "#f6f6f7",
  boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
  width: "100%",
  justifyContent: "space-between",
  color: "#000",
};

export const customToolTipContainerStyles: CSSProperties = {
  background: "white",
  border: "1px solid #E0E0E0",
  borderRadius: "6px",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.08)",
  padding: "8px 12px",
  fontSize: "13px",
  lineHeight: "16px",
  pointerEvents: "none",
  position: "relative",
}

export const customToolTipInnerContainerStyles: CSSProperties = {
  position: "absolute",
  bottom: -6,
  left: "50%",
  transform: "translateX(-50%)",
  width: 0,
  height: 0,
  borderLeft: "6px solid transparent",
  borderRight: "6px solid transparent",
  borderTop: "6px solid white",
}
