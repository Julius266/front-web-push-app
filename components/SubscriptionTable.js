import React, { useEffect, useState } from "react";
import styles from "../styles/SubscriptionTable.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import NotificationModal from "./NotificationModal";

const SubscriptionTable = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentEndpoint, setCurrentEndpoint] = useState(null);
  const [loading, setLoading] = useState(false); // Estado de carga
  const [showSuccess, setShowSuccess] = useState(false); // Estado de éxito

  useEffect(() => {
    const loadSubscriptions = async () => {
      try {
        const response = await fetch(
          "https://b13whgwt-5000.use2.devtunnels.ms/api/notifications/subscriptions"
        );
        const data = await response.json();
        setSubscriptions(data);
      } catch (error) {
        console.error("Error al cargar suscripciones:", error);
      }
    };

    loadSubscriptions();
  }, []);

  const handleSendNotification = async ({ title, body, url, image }) => {
    setLoading(true); // Inicia la carga

    // Establece la imagen predeterminada si no se proporciona una
    const finalImage = image || "/genesisbanner.jpg";

    try {
      await fetch(
        "https://b13whgwt-5000.use2.devtunnels.ms/api/notifications/send",
        {
          method: "POST",
          body: JSON.stringify({
            endpoint: currentEndpoint,
            title,
            body,
            url,
            image: finalImage, // Usa la imagen seleccionada o la predeterminada
          }),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      setLoading(false); // Termina la carga
      setShowSuccess(true); // Muestra notificación de éxito

      // Desvanece la notificación después de 3 segundos
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);

      console.log("Notificación enviada con éxito.");
    } catch (error) {
      setLoading(false); // Termina la carga si hay un error
      console.error("Error al enviar notificación:", error);
    }
  };

  return (
    <div className="p-6 mx-auto w-full">
      <h1 className="text-center text-2xl font-bold mb-4">
        Bienvenido a la Web Push App
      </h1>
      {loading && (
        <div className={styles.loader}>
          <div className={styles.spinner}></div>{" "}
          {/* Loader mientras se procesa la solicitud */}
        </div>
      )}
      {showSuccess && (
        <div className={styles.successMessage}>
          ¡Notificación enviada con éxito!
        </div>
      )}
      <div className={styles.tableContainer}>
        <table className={styles.subscriptionTable}>
          <thead>
            <tr>
              <th>Endpoint</th>
              <th>Domain</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>User Agent</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.map((sub, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? styles.evenRow : styles.oddRow}
              >
                <td>{sub.endpoint}</td>
                <td>{sub.domain}</td>
                <td>{sub.location?.latitude || "N/A"}</td>
                <td>{sub.location?.longitude || "N/A"}</td>
                <td>{sub.userAgent || "N/A"}</td>
                <td>
                  <button
                    className={styles.notifyButton}
                    onClick={() => {
                      setCurrentEndpoint(sub.endpoint);
                      setShowModal(true);
                    }}
                    aria-label="Enviar Notificación"
                  >
                    <FontAwesomeIcon icon={faBell} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && (
        <NotificationModal
          onClose={() => setShowModal(false)}
          onSubmit={handleSendNotification}
        />
      )}
    </div>
  );
};

export default SubscriptionTable;
