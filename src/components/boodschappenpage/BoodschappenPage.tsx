import React from "react";
import useBoodschappen from "../../hooks/useBoodschappen";
import BoodschappenHeader from "../boodschappenheader/BoodschappenHeader";
import BoodschapRow from "../boodschaprow/BoodschapRow";
import useBoodschap from "../../hooks/useBoodschap";

const BoodschappenPage: React.FC = () => {
  const { data: boodschappen, error, isLoading } = useBoodschappen();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <>
      <BoodschappenHeader
      // handleSort={() => console.log("Sort clicked")}
      // handleUndo={() => console.log("Undo clicked")}
      />
      <div className="container">
        <table className="table">
          <tbody>
            {boodschappen?.map((boodschap) => (
              <BoodschapRow key={boodschap.id} boodschapId={boodschap.id} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default BoodschappenPage;
