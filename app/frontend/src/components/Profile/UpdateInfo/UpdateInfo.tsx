import { useForm } from "react-hook-form";
import TextInput from "@/components/Inputs/TextInput/TextInput";
import React, { FC, useContext, useEffect } from "react";
import { UserContext } from "@/contexts/UserContext";
import { validateOrReject } from "class-validator";
import { UserUpdate } from "@/services/UserService.type";
import { UserService } from "@/services/UserService";

type Form = {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  picture: string;
};
const UpdateInfo: FC = () => {
  const userCtx = useContext(UserContext);
  const user = userCtx.user!;
  const {
    watch,
    setValue,
    formState: { errors },
    clearErrors,
    getValues,
  } = useForm<Form>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
  });

  const handleSubmit = () => {
    clearErrors();
    const body = new UserUpdate(
      getValues("email"),
      getValues("firstName"),
      getValues("lastName"),
      getValues("phone")
    );
    validateOrReject(body)
      .then(() => {
        console.log(body);
        UserService.update(user._id, body, (result) => {
          if (result.ok) {
            console.log(result.ok.body);
            userCtx.user = result.ok.body;
          }
        });
      })
      .catch((errors) => {
        console.log(errors);
      });
  };

  useEffect(() => {
    if (userCtx.user !== undefined) {
      setValue("firstName", user?.firstName);
      setValue("lastName", user?.lastName);
      setValue("email", user?.email);
      setValue("phone", user?.phone ?? '');
    }
  }, [
    userCtx.user,
  ]);

  return (
    <div className="form-control mt-1 gap-2">
      <div className="max-w-xs">
        <TextInput
          prefix={"profile-firstname"}
          label={"Prénom"}
          onTextChange={(e) => setValue("firstName", e)}
          value={watch("firstName")}
          error={errors.firstName !== undefined}
          errorText={errors.firstName?.message}
        />
      </div>
      <div className="max-w-xs">
        <TextInput
          prefix={"profile-lastName"}
          label={"Nom"}
          onTextChange={(e) => setValue("lastName", e)}
          value={watch("lastName")}
          error={errors.lastName !== undefined}
          errorText={errors.lastName?.message}
        />
      </div>
      <div className="max-w-xs">
        <TextInput
          prefix={"profile-email"}
          label={"Adresse email"}
          onTextChange={(e) => setValue("email", e)}
          value={watch("email")}
          error={errors.email !== undefined}
          errorText={errors.email?.message}
        />
      </div>
      <div className="max-w-xs">
        <TextInput
          prefix={"profile-phone"}
          label={"Numéro de téléphone"}
          onTextChange={(e) => setValue("phone", e)}
          value={watch("phone")}
          error={errors.phone !== undefined}
          errorText={errors.phone?.message}
        />
      </div>
      <button className="btn max-w-xs" onClick={handleSubmit}>
        Modifier
      </button>
    </div>
  );
};

export default UpdateInfo;
