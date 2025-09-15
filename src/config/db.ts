import { DataSource } from "typeorm";
import Country from "../entities/Country";

const dataSource = new DataSource({
  type: "sqlite",
  database: "db.sqlite",
  entities: [Country],
  synchronize: true,
  logging: ["error", "query"],
});

export default dataSource;