import BoodschappenPage from "../boodschappenpage/BoodschappenPage";

const BoodschappenPageOverall = () => {
  console.log("Rendering BoodschappenPageOverall");
  console.log("VITE_API_URL", import.meta.env.VITE_API_URL);
  return <BoodschappenPage />;
};

export default BoodschappenPageOverall;
