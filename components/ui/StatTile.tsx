import React from "react";

interface StatTileProps {
  value: string;
  label: string;
}

const StatTile: React.FC<StatTileProps> = ({ value, label }) => (
  <div className="stat-tile">
    <div className="stat-tile-value mono">{value}</div>
    <div className="stat-tile-label">{label}</div>
  </div>
);

export default StatTile;
