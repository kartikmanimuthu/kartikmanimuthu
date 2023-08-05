import React from "react";

interface BadgeProps {
  data?: string[];
}

const Badge: React.FC = ({ data }: BadgeProps) => {
  return (
    <div className="p-0">
      <ul className="space-y-1">
        {data?.map((literal, index) => (
          <li
            key={index}
            className="inline-block bg-gray-200 rounded px-2 py-1 text-base font-semibold text-gray-700 mr-2 mb-2"
          >
            {literal}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Badge;
