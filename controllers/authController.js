const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const { readData, writeData } = require("../services/dbService");

exports.register = async (req, res) => {
  const { name, email, password, type } = req.body;
  const data = readData();
  const existing = [...data.vendors, ...data.riders].find(
    (u) => u.email === email,
  );

  if (existing) return res.status(400).json({ error: "Email already exists." });

  const hashed = await bcrypt.hash(password, 10);
  const user = { id: uuidv4(), name, email, password: hashed };
  if (type === "vendor") data.vendors.push(user);
  else data.riders.push({ ...user, available: false, location: null });

  writeData(data);
  res.status(201).json({ message: "User registered successfully." });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const data = readData();
  const user = [...data.vendors, ...data.riders].find((u) => u.email === email);
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ error: "Invalid credentials." });

  res.status(200).json({
    message: "Login successful",
    user: {
      id: user.id,
      type: data.vendors.includes(user) ? "vendor" : "rider",
    },
  });
};
