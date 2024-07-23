import React from "react";
import useBoodschap from "../../hooks/useBoodschap";
import { useAuth0 } from "@auth0/auth0-react";
import useToggleBoodschapDone from "../../hooks/useToggleBoodschapDone";
import useBoodschappen from "../../hooks/useBoodschappen";

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

  const handleCheckboxChange = () => {
    if (boodschap) {
      toggleBoodschapDone({
        id: boodschap.id,
        done: !boodschap.done,
        userDone: user?.name || "unknown",
      });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
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
