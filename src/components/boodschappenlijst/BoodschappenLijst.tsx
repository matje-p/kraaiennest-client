import BoodschapRow from "../boodschaprow/BoodschapRow";
import { BoodschapProps } from "../../types/Props";

interface BoodschappenLijstProps {
  boodschappen: BoodschapProps[];
  setBoodschappen: (boodschappen: BoodschapProps[]) => void;
  changeLog: BoodschapProps[];
  setChangeLog: (changeLog: BoodschapProps[]) => void;
}

const BoodschappenLijst = ({
  boodschappen,
  setBoodschappen,
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
              setBoodschappen={setBoodschappen}
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
