import React, { ComponentProps, FC } from "react";

type pictureProps = { img?: string };
const Picture: FC<pictureProps> = ({ img }) => {
  return (
    <div className="mr-1">
      <h2 className="text-2xl">Votre photo de profile</h2>
      <div className="flex flex-col md:flex-row justify-center my-3 gap-2 items-center">
        <img
          src={img}
          className="rounded-full bg-gray-500"
          style={{
            height: "190px",
            width: "190px",
          }}
        />
        <div className="flex flex-col gap-4 justify-evenly ml-6">
          <button className="btn max-w-xs">Changer de photo</button>
          <button className="btn max-w-xs btn-accent">Supprimer</button>
        </div>
      </div>
      <p>Ajoutez votre photo, La taille recommandée est 256x256px</p>
    </div>
  );
};

export default Picture;
