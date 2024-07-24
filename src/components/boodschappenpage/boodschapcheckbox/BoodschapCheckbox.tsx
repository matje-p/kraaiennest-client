import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import useBoodschappen from "../../../hooks/useBoodschappen";
import useToggleBoodschapDone from "../../../hooks/useToggleBoodschapDone";
import useChangeStore from "../../../store";
import Spinner from "../../spinner/Spinner";

interface BoodschapCheckboxProps {
  boodschapId: string;
}

const BoodschapCheckbox: React.FC<BoodschapCheckboxProps> = ({
  boodschapId,
}) => {
  const { data: boodschappen, error, isLoading } = useBoodschappen();
  const boodschap = boodschappen?.find((b) => b.id === boodschapId);
  const { mutate: toggleBoodschapDone } = useToggleBoodschapDone();
  const { user } = useAuth0();
  const { appendChangeLog } = useChangeStore();

  const handleCheckboxChange = () => {
    console.log("Checkbox clicked");
    if (boodschap) {
      appendChangeLog(boodschap);
      toggleBoodschapDone({
        id: boodschap.id,
        done: !boodschap.done,
        userDone: user?.name || "unknown",
      });
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <div>Error loading boodschap.</div>;
  }

  return (
    <div id="check" className="checkbox">
      <input
        type="checkbox"
        id="checkbox"
        onChange={handleCheckboxChange}
        checked={boodschap?.done}
      />
    </div>
  );
};

export default BoodschapCheckbox;
