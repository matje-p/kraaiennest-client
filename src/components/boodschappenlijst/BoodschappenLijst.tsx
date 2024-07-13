import BoodschapRow from "../boodschaprow/BoodschapRow";
import { BoodschapProps } from "../../types/Props";

interface BoodschappenLijstProps {
  boodschappen: BoodschapProps[];
  updateBoodschappen: (newBoodschappen: BoodschapProps[]) => void;
  changeLog: BoodschapProps[];
  setChangeLog: (changeLog: BoodschapProps[]) => void;
}

const BoodschappenLijst = ({
  boodschappen,
  updateBoodschappen,
  changeLog,
  setChangeLog,
}: BoodschappenLijstProps) => {
  console.log("Rendering BoodschappenLijst");
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
              changeLog={changeLog}
              setChangeLog={setChangeLog}
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
