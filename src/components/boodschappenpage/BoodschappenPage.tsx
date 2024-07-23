import React from "react";
import useBoodschappen from "../../hooks/useBoodschappen";
import BoodschapRow from "../boodschaprow/BoodschapRow";
import Header from "../header/Header";
import { Boodschap } from "../../types/Props";

const BoodschappenPage: React.FC = () => {
  console.log("BoodschappenPage rendered");
  const { data: boodschappen, error, isLoading } = useBoodschappen();
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  const sortedBoodschappen = sort(boodschappen);

  return (
    <>
      <Header
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
