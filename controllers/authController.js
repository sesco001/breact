import User from "../models/User.js";
import jwt from "jsonwebtoken";

const genToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const exist = await User.findOne({ where: { email } });
    if (exist) return res.status(400).json({ message: "Email already exists" });

    const user = await User.create({ name, email, password });
    res.json({
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
      token: genToken(user.id),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    res.json({
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
      token: genToken(user.id),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
