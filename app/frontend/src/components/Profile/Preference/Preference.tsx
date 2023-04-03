import { UserContext } from "@/contexts/UserContext";
import { useContext, useState } from "react";

export const Preference = () => {
  const { filterState } = useContext(UserContext);
  const [_filter, setFilter] = useState(filterState);

  return (
    <div>
      <label className="cursor-pointer label">
        <span className="label-text mr-1">Sauvegarder mes filtres</span>
        <input
          type="checkbox"
          className="toggle toggle-primary"
          onChange={(event) => {
            setFilter(event.target.checked);
            localStorage.setItem(
              "filterState",
              JSON.stringify(event.target.checked)
            );
          }}
        />
      </label>
    </div>
  );
};
