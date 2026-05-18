import { Router, Request, Response } from "express";
import { z } from "zod";
import { db } from "../db";

const router = Router();

async function cfg(key: string): Promise<string> {
  const { rows } = await db.execute({
    sql:  "SELECT value FROM mission_config WHERE key = ?",
    args: [key],
  });
  return String(rows[0]?.value ?? "");
}

router.get("/mission", async (_req: Request, res: Response) => {
  try {
    const [initialRaised, initialSupporters, goal, launchYear, colonists, phase, duration] =
      await Promise.all([
        cfg("initial_raised"),
        cfg("initial_supporters"),
        cfg("goal"),
        cfg("launchYear"),
        cfg("colonists"),
        cfg("phase"),
        cfg("duration"),
      ]);

    const { rows: [agg] } = await db.execute(
      "SELECT COALESCE(SUM(amount), 0) as sum, COUNT(*) as count FROM donations"
    );

    const { rows: donorRows } = await db.execute(
      `SELECT name, SUM(amount) as total
       FROM donations
       GROUP BY name
       ORDER BY total DESC
       LIMIT 5`
    );

    const topDonors = donorRows.map((d, i) => ({
      rank:   i + 1,
      name:   String(d.name),
      amount: Number(d.total),
    }));

    res.json({
      funding: {
        raised:     parseInt(initialRaised, 10) + Number(agg.sum),
        goal:       parseInt(goal,           10),
        supporters: parseInt(initialSupporters, 10) + Number(agg.count),
      },
      topDonors,
      launchYear,
      colonists,
      phase,
      duration,
    });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

const SupportSchema = z.object({
  name:   z.string().min(1).max(120),
  amount: z.number().int().min(1).max(1_000_000_000),
});

router.post("/support", async (req: Request, res: Response) => {
  const parsed = SupportSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }
  try {
    const { name, amount } = parsed.data;
    await db.execute({
      sql:  "INSERT INTO donations (name, amount) VALUES (?, ?)",
      args: [name, amount],
    });
    res.status(201).json({ ok: true });
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
