import type { Knex } from "knex";
const config: Knex.Config<any> = {
    client: "mysql2",
    connection: {
      host: "127.0.0.1",
      port: 3306,
      user: "root",
      password: "password",
      database: "database-viraoliv"
    },
    migrations: {
      tableName: "knex_migrations"
    }
};

export default config