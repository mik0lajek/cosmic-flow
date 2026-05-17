import { createClient } from "@libsql/client";
import path from "path";

const dbPath = path.join(__dirname, "../cosmic-flow.db").replace(/\\/g, "/");

export const db = createClient({ url: `file:${dbPath}` });

export async function initDb(): Promise<void> {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS donations (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      name       TEXT    NOT NULL,
      amount     INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS mission_config (
      key   TEXT PRIMARY KEY,
      value TEXT NOT NULL
    )
  `);

  const { rows: configRows } = await db.execute(
    "SELECT COUNT(*) as count FROM mission_config"
  );
  if (Number(configRows[0].count) === 0) {
    const entries: [string, string][] = [
      ["goal",               "500000000"],
      ["launchYear",         "2040"],
      ["colonists",          "1,000"],
      ["phase",              "Alpha"],
      ["duration",           "10 Years"],
      ["initial_raised",     "220159300"],
      ["initial_supporters", "482095"],
    ];
    for (const [key, value] of entries) {
      await db.execute({
        sql:  "INSERT INTO mission_config (key, value) VALUES (?, ?)",
        args: [key, value],
      });
    }
  }

  const { rows: donorRows } = await db.execute(
    "SELECT COUNT(*) as count FROM donations"
  );
  if (Number(donorRows[0].count) === 0) {
    const seeds: [string, number][] = [
      ["E. Musk",      25_000_000],
      ["SpaceX Corp.", 18_000_000],
      ["Anonymous",     9_500_000],
      ["NASA Found.",   7_250_000],
      ["C. Hadfield",   4_820_000],
    ];
    for (const [name, amount] of seeds) {
      await db.execute({
        sql:  "INSERT INTO donations (name, amount) VALUES (?, ?)",
        args: [name, amount],
      });
    }
  }
}
