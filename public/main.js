const PUBLIC_VAPID_KEY =
  "BFLfCZksWepY2HqTzcJsTms28KFeSPjakRE-zOwc6Oy61T8Re-O9l_GzWsKloXClTyVJ_GEjaWgy4TAs99Qw2MM";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then((registration) => {
      console.log("Service Worker registrado con éxito:", registration);
      return navigator.serviceWorker.ready;
    })
    .then(() => requestPermissions())
    .catch((error) => {
      console.error("Error al registrar el Service Worker:", error);
    });
} else {
  console.warn("Service Workers no están soportados en este navegador.");
}

async function requestPermissions() {
  try {
    const notificationPermission = await Notification.requestPermission();
    if (notificationPermission !== "granted") {
      throw new Error("Permiso de notificación no concedido");
    }
    requestLocationPermission();
  } catch (error) {
    console.error("Error solicitando permisos:", error);
  }
}

function requestLocationPermission() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("Ubicación obtenida:", position);
        subscribeUserWithLocation(position);
      },
      (error) => {
        console.error("Error al obtener la ubicación:", error);
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  } else {
    console.warn("La geolocalización no está soportada en este navegador.");
  }
}

async function subscribeUserWithLocation(position) {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready.then(async (registration) => {
      const existingSubscription =
        await registration.pushManager.getSubscription();

      if (!existingSubscription) {
        try {
          const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY),
          });

          const locationData = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };

          const dataToSend = {
            endpoint: subscription.endpoint,
            keys: {
              p256dh: btoa(
                String.fromCharCode.apply(
                  null,
                  new Uint8Array(subscription.getKey("p256dh"))
                )
              ),
              auth: btoa(
                String.fromCharCode.apply(
                  null,
                  new Uint8Array(subscription.getKey("auth"))
                )
              ),
            },
            location: locationData,
          };

          await fetch(
            "https://ktwqzgnc-5000.use2.devtunnels.ms/api/notifications/subscribe",
            {
              method: "POST",
              body: JSON.stringify(dataToSend),
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
            }
          );

          console.log("Usuario suscrito con éxito con ubicación.");
        } catch (error) {
          console.error("Error al suscribir el usuario:", error);
        }
      } else {
        console.log("El usuario ya está suscrito.");
      }
    });
  } else {
    console.warn("Service Workers no están soportados en este navegador.");
  }
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
