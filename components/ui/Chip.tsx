import React from "react";

type Pillar = "cloud" | "ai" | "data";

interface ChipProps {
  pillar?: Pillar;
  children: React.ReactNode;
}

const Chip: React.FC<ChipProps> = ({ pillar, children }) => (
  <span className={`chip mono${pillar ? ` chip--${pillar}` : ""}`}>{children}</span>
);

export default Chip;
