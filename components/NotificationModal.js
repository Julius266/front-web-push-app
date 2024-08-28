import React, { useState } from "react";
import styles from "../styles/SubscriptionTable.module.css";

const NotificationModal = ({ onClose, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [url, setUrl] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = () => {
    if (title.trim() === "" || body.trim() === "") {
      alert("El título y la descripción son obligatorios.");
      return;
    }

    onSubmit({ title, body, url, image });
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className="text-2xl font-bold mb-4">Enviar Notificación</h2>
        <label className="block mb-2">
          Título <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
          required
        />
        <label className="block mb-2">
          Descripción <span className="text-red-500">*</span>
        </label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
          required
        />
        <label className="block mb-2">URL</label>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />
        <label className="block mb-2">URL de la Imagen</label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />
        <div className="flex justify-end">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded mr-2"
            onClick={handleSubmit}
          >
            Enviar
          </button>
          <button
            className="bg-gray-500 text-white py-2 px-4 rounded"
            onClick={onClose}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;
