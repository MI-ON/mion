import { ConnectionOptions } from "typeorm";
import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({ path: path.resolve(__dirname + "/src", ".env") });

const connectionOptions: ConnectionOptions = {
  type: "mysql",
  host: process.env.DB_HOST,
  port: 37331,
  username: process.env.DB_NAME,
  password: process.env.DB_ASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: false,

  entities: ["@/entity/**/*{.ts,.js}"],
  migrations: ["@/migration/**/*{.ts,.js}"],
  subscribers: ["@/subscriber/**/*{.ts,.js}"],
};

export default connectionOptions;
