import App from "./App";
import "reflect-metadata";
import { createConnection } from "typeorm";

createConnection()
  .then(async () => {
    const app = new App().application;

    app.listen(3000, () => {
      console.log("Server listening on port 3000");
    });

    console.log("typeorm connect 🚀");
  })
  .catch((error) => console.log(error));
