import { Request, Response, NextFunction } from "express";
import prisma from "../../../packages/db";

export async function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const username = req.headers["x-admin-user"] as string;

  if (!username) {
    return res.status(401).json({ error: "Admin required" });
  }

  const user = await prisma.user.findUnique({ where: { username } });

  if (!user || user.role !== "admin") {
    return res.status(403).json({ error: "Forbidden" });
  }

  next();
}
