import { Router } from "express";
import { getProfile, updateProfile } from "../controllers/profileController";

const router = Router();

router.get("/:username", getProfile);
router.post("/:username", updateProfile);

export default router;

router.post("/:username", (req, res) => {
  const { username } = req.params;
  const data = req.body;

  if (!profiles[username]) {
    return res.status(404).json({ error: "Profile not found" });
  }

  profiles[username] = {
    ...profiles[username],
    ...data
  };

  res.json(profiles[username]);
});


const router = Router();

router.get("/:username", getProfile);

export default router;
