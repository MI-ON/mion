import { ConnectionOptions } from "typeorm";
import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({ path: path.resolve(__dirname + "/src", ".env") });

const connectionOptions: ConnectionOptions = {
  type: "mysql",
  host: process.env.DB_HOST,
  port: 37331,
  username: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: false,

  entities: ["src/entity/**/*{.ts,.js}"],
  migrations: ["src/migration/**/*{.ts,.js}"],
  subscribers: ["src/subscriber/**/*{.ts,.js}"],
};

export default connectionOptions;
