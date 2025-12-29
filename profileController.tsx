import { Request, Response } from "express";
import prisma from "../../../packages/db";

export const getProfile = async (req: Request, res: Response) => {
  const { username } = req.params;

  const profile = await prisma.profile.findFirst({
    where: {
      user: { username }
    },
    include: {
      user: true,
      links: { orderBy: { order: "asc" } }
    }
  });

  if (!profile) {
    return res.status(404).json({ error: "Profile not found" });
  }

  // Enforce ban
  if (profile.user.banned) {
    return res.status(403).json({ error: "User is banned" });
  }

  // Increment views
  await prisma.profile.update({
    where: { id: profile.id },
    data: { views: { increment: 1 } }
  });

  res.json(profile);
};

export const updateProfile = async (req: Request, res: Response) => {
  const { username } = req.params;
  const data = req.body;

  const profile = await prisma.profile.findFirst({
    where: { user: { username } }
  });

  if (!profile) {
    return res.status(404).json({ error: "Profile not found" });
  }

  const updated = await prisma.profile.update({
    where: { id: profile.id },
    data
  });

  res.json(updated);
};
