require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const User = require("./models/User");
const PORT = process.env.PORT || 3001;

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.post("/users", async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

app.get("/users", async (req, res) => {
  res.json(await User.find());
});

app.put("/users/:id", async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: "Actualizado" });
});

app.delete("/users/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "Eliminado" });
});


app.listen(PORT, () => {
  console.log(`Servidor en http://0.0.0.0:${PORT}`);
});

app.get("/health", (req, res) => {
  res.json({ status: "ok", db: "connected" });
});
