import { Router } from "express";

const messageRouter = Router();

messageRouter.get("/", (req, res) => {
  res.send("test");
});

messageRouter.post("/send-text", (req, res) => {
  const { user, text } = req.body;

  if (!text) {
    return res.status(400);
  }

  res.status(201).json({
    success: true,
    message: "Message received.",
  });
});

export default messageRouter;
