import { ConnectionOptions } from "typeorm";
import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({ path: path.resolve(__dirname + "/src", ".env") });

const connectionOptions: ConnectionOptions = {
  type: "mysql",
  host: process.env.HOST,
  port: 3306,
  username: process.env.NAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  synchronize: true,
  logging: false,

  entities: ["src/entity/**/*.ts"],
  migrations: ["src/migration/**/*.ts"],
  subscribers: ["src/subscriber/**/*.ts"],
};

export default connectionOptions;
