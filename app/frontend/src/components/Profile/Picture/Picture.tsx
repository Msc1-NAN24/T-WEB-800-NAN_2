import React, { FC, useContext, useEffect, useState } from "react";
import { UserService } from "@/services/UserService";
import { UserContext } from "@/contexts/UserContext";
import Image from "next/image";

type pictureProps = { img?: string };
const defaultImage =
  "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png";
const Picture: FC<pictureProps> = ({ img }) => {
  const [image, setImage] = useState<string>(defaultImage);
  const [editImage, setEditImage] = useState<boolean>(false);
  const userCtx = useContext(UserContext);

  useEffect(() => {
    setImage(img || defaultImage);
  }, [img]);

  const cancelImageChange = () => {
    setEditImage(false);
    setImage(img || defaultImage);
    UserService.setPicture(user!._id, image, (result) => {
      if (result.ok) {
        userCtx.updateUser(result.ok.body);
      }
    });
  };

  const handleSubmitPicture = () => {
    setEditImage(false);
    UserService.setPicture(user!._id, image, (result) => {
      if (result.ok) {
        userCtx.updateUser(result.ok.body);
      }
    });
  };

  const { user } = useContext(UserContext);
  const deletePicture = () => {
    setImage(defaultImage);
    UserService.setPicture(user!._id, defaultImage, (result) => {
      if (result.ok) {
        userCtx.updateUser(result.ok.body);
      }
    });
  };

  return (
    <div className="mr-1">
      <h2 className="text-2xl">Votre photo de profile</h2>
      <div className="flex flex-col md:flex-row justify-center my-3 gap-2 items-center">
        <Image
          src={image}
          className="rounded-full bg-gray-500"
          height={190}
          width={190}
          alt={"profile picture"}
        />
        <div className="flex flex-col gap-4 justify-evenly ml-6">
          {editImage ? (
            <>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setImage(e.target.value)}
              />
              <button className="btn max-w-xs" onClick={handleSubmitPicture}>
                Valider
              </button>
              <button className={"btn max-w-xs"} onClick={cancelImageChange}>
                Annuler
              </button>
            </>
          ) : (
            <>
              <button
                className="btn max-w-xs"
                onClick={() => setEditImage(true)}
              >
                Changer de photo
              </button>
              <button
                className="btn max-w-xs btn-accent"
                onClick={deletePicture}
              >
                Supprimer
              </button>
            </>
          )}
        </div>
      </div>
      <p>Ajoutez votre photo, La taille recommandée est 256x256px</p>
    </div>
  );
};

export default Picture;
