import { Router } from "express";
import Stripe from "stripe";
import prisma from "../../../packages/db";

const stripe = new Stripe("sk_test_YOUR_KEY", { apiVersion: "2022-11-15" });
const router = Router();

router.post("/premium/:username", async (req, res) => {
  const { username } = req.params;
  const { priceId } = req.body;

  const session = await stripe.checkout.sessions.create({
    mode: "subscription", // or "payment" for one-time
    payment_method_types: ["card"],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: "http://localhost:3000/dashboard?success=true",
    cancel_url: "http://localhost:3000/dashboard?canceled=true",
    metadata: { username }
  });

  res.json({ url: session.url });
});

export default router;
