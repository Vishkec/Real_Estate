const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { sendLeadSms } = require("../services/smsService");

router.post("/", async (req, res) => {
  console.log("DATA RECEIVED:", req.body);

  try {
    const { name, phone } = req.body;
    const trimmedName = name?.trim();
    const trimmedPhone = phone?.trim();

    if (!trimmedName || !trimmedPhone) {
      return res.status(400).json({ error: "Name and phone are required" });
    }

    const user = new User({ name: trimmedName, phone: trimmedPhone });
    await user.save();

    const sms = await sendLeadSms(trimmedName, trimmedPhone);

    console.log("DATA SAVED AND SMS SENT");

    res.status(201).json({
      message: "Saved successfully and SMS sent",
      smsSid: sms.sid,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

module.exports = router;
