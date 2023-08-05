import React from "react";

interface Props {
  imageUrl: string;
}

const ProfileCard: React.FC<Props> = ({ imageUrl, children }) => {
  return (
    <div className="flex flex-row p-5">
      <div className="w-3/4">{children}</div>
      <div className="w-2/4 flex justify-center items-center">
        <img
          src={imageUrl}
          alt="Profile Picture"
          className="rounded-full h-64 w-64 object-cover"
        />
      </div>
    </div>
  );
};

export default ProfileCard;
