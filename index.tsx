import express from "express";
import cors from "cors";
import profileRoutes from "./routes/profile";
import authRoutes from "./routes/auth";
import adminRoutes from "./routes/admin";
import paymentRoutes from "./routes/payment";
app.use("/api/payment", paymentRoutes);


app.use("/api/admin", adminRoutes);


app.use("/api/auth", authRoutes);


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/profile", profileRoutes);

app.listen(4000, () => {
  console.log("API running on http://localhost:4000");
});
