self.addEventListener("push", (e) => {
  const data = e.data.json();
  self.registration.showNotification(data.title, {
    body: data.body,
    image: data.image || "/genesisbanner.jpg", // Banner o imagen grande
    icon: "", // Establece el icono como una cadena vacía o una imagen transparente si es necesario
    badge: "", // Puedes también dejar la insignia vacía
    data: {
      url: data.url || "https://sistemasgenesis.com.ec/",
    },
    actions: [
      {
        action: "aceptar",
        title: "Aceptar",
        icon: "", // También puedes dejar esto vacío o con una imagen transparente
      },
    ],
  });
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: "window" }).then((windowClients) => {
      for (let i = 0; i < windowClients.length; i++) {
        const client = windowClients[i];
        if (client.url === event.notification.data.url && "focus" in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(event.notification.data.url);
      }
    })
  );
});
