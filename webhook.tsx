import { Router } from "express";
import prisma from "../../../packages/db";
import Stripe from "stripe";

const router = Router();
const stripe = new Stripe("sk_test_YOUR_KEY", { apiVersion: "2022-11-15" });

router.post("/stripe", express.raw({ type: "application/json" }), async (req, res) => {
  const sig = req.headers["stripe-signature"]!;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      "whsec_YOUR_WEBHOOK_SECRET"
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const username = session.metadata?.username;

    await prisma.profile.update({
      where: { userId: (await prisma.user.findUnique({ where: { username } }))!.id },
      data: { isPremium: true, premiumUntil: new Date(new Date().setMonth(new Date().getMonth() + 1)) }
    });
  }

  res.json({ received: true });
});

export default router;
