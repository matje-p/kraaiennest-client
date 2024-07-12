import BoodschapRow from "../boodschaprow/BoodschapRow";
import { BoodschapProps } from "../../types/Props";

interface BoodschappenLijstProps {
  boodschappen: BoodschapProps[];
  updateBoodschappen: (newBoodschappen: BoodschapProps[]) => void;
}

const BoodschappenLijst = ({
  boodschappen,
  updateBoodschappen,
}: BoodschappenLijstProps) => {
  if (!boodschappen) {
    console.log("No boodschappen available");
    return <div>No boodschappen available</div>;
  }

  return (
    <div className="container">
      <table className={`table`}>
        <tbody>
          {boodschappen.map((boodschap) => (
            <BoodschapRow
              boodschappen={boodschappen}
              updateBoodschappen={updateBoodschappen}
              id={boodschap.id}
              key={boodschap.id}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BoodschappenLijst;
