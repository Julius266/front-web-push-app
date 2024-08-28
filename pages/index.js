import React, { useEffect } from "react";
import SubscriptionTable from "../components/SubscriptionTable";

const Home = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Importa el archivo main.js si es necesario
      require("../public/main.js");
    }
  }, []);

  return (
    <div>
      <SubscriptionTable />
    </div>
  );
};

export default Home;
