import express from "express";
import cors from "cors";
import { initDb } from "./db";
import missionRoutes from "./routes/mission";

const app     = express();
const PORT    = process.env.PORT ?? 4000;
const origins = (process.env.CORS_ORIGIN ?? "http://localhost:3000").split(",");

app.use(cors({ origin: origins }));
app.use(express.json());
app.use("/api", missionRoutes);

async function main() {
  await initDb();
  app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
  });
}

main().catch((err) => {
  console.error("Failed to start:", err);
  process.exit(1);
});
