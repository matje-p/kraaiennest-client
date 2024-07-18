import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import useAddBoodschap from "../../hooks/useAddBoodschap";
import useBoodschappen from "../../hooks/useBoodschappen";
import BoodschappenHeader from "../boodschappenheader/BoodschappenHeader";
import BoodschapRow from "../boodschaprow/BoodschapRow";

const BoodschappenPage: React.FC = () => {
  const { user } = useAuth0();
  const { data: boodschappen, error, isLoading } = useBoodschappen();
  const addBoodschap = useAddBoodschap();

  const handleAdd = () => {
    addBoodschap.mutate({
      item: "Voer boodschap in", // Customize as needed
      userAdded: String(user?.name), // Customize as needed
      userDone: "", // Customize as needed
      dateAdded: new Date(), // Assuming randDate() generates a date
      dateDone: new Date(), // Assuming randDate() generates a date
      done: false,
      id: Math.random().toString(36).substr(2, 9),
    });
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <>
      <BoodschappenHeader
        handleAdd={handleAdd}
        // handleSort={() => console.log("Sort clicked")}
        // handleUndo={() => console.log("Undo clicked")}
      />
      <div className="container">
        <table className="table">
          <tbody>
            {boodschappen?.map((boodschap) => (
              <BoodschapRow key={boodschap.id} boodschap={boodschap} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default BoodschappenPage;
