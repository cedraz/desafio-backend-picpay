import axios from "axios";

async function sendNotification(user: any, message: string) {
  const body = {
    message,
    email: user.email,
  };

  const requestMocky = await axios
    .post("https://run.mocky.io/v3/7e098-4286-4a97-a354-8f28d267961d", body)
    .catch((error) => {
      console.log("Notification service if offline");
      return false;
    });

  if (requestMocky) {
    console.log("notification sent");
  }
}

sendNotification({ email: "a" }, "teste");
