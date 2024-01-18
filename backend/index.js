import app from "./app.js";
import { checkConnection } from "./config/db.js";

import pkg from "pg";

const { Pool } = pkg;

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Сервер розпочав роботу на порту ${port}.`);
});

checkConnection();

/* ------------------------------------- */

// const sourceDBConfig = {
//   user: "postgres",
//   host: "localhost",
//   database: "db_chnap",
//   password: "12345",
//   port: "5432",
// };

// const targetDBConfig = {
//   user: "postgres",
//   host: "localhost",
//   database: "db_tsnap",
//   password: "12345",
//   port: "5432",
// };

// const sourceDB = new Pool(sourceDBConfig);
// const targetDB = new Pool(targetDBConfig);

// const transferData = async () => {
//   try {
//     await sourceDB.connect();

//     const result = await sourceDB.query("SELECT * FROM faq"); //  ORDER BY id
//     const dataToTransfer = result.rows;

//     await targetDB.connect();

//     for (const record of dataToTransfer) {
//       const { question, answer } = record;

//       console.log(record);
//       // await targetDB.query(
//       //   "INSERT INTO faq(question, answer) VALUES($1, $2)",
//       //   [question, answer]
//       // );
//     }

//     console.log("Данные успешно перенесены.");
//   } catch (error) {
//     console.error("Произошла ошибка при переносе данных:", error);
//   } finally {
//     await sourceDB.end();
//     await targetDB.end();
//   }
// };

// transferData();
