import App from "./App";
import "reflect-metadata";
import { createConnection } from "typeorm";
import * as dotenv from "dotenv";
import connectionOptions from "../ormConfig";
import * as path from "path";

dotenv.config({ path: path.resolve(__dirname, ".env") });

createConnection(connectionOptions)
  .then(async () => {
    const app = new App().application;

    app.listen(3000, () => {
      console.log("Server listening on port 3000");
    });

    console.log("connect 🚀");
  })
  .catch((error) => console.log(error));
