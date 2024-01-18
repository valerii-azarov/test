import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

async function checkConnection() {
  try {
    const client = await pool.connect();
    console.log("З'єднання з базою даних успішне.");
    client.release();
    return true;
  } catch (error) {
    console.error("Помилка з'єднання з базою даних:", error);
    return false;
  }
}

export {
  pool, 
  checkConnection,
};
