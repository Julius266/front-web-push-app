import React, { useEffect } from "react";
import SubscriptionTable from "../components/SubscriptionTable";
import { useRouter } from 'next/router'; // Importa el hook useRouter de Next.js

const Home = () => {
  const router = useRouter(); // Inicializa el hook useRouter

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Importa el archivo main.js si es necesario
      require("../public/main.js");
    }
  }, []);

  const navigateToHola = () => {
    router.push('/hola'); // Redirige a la página hola.js
  };

  return (
    <div>
      <SubscriptionTable />
      <button
        onClick={navigateToHola}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Ir a Hola Mundo
      </button>
    </div>
  );
};

export default Home;
