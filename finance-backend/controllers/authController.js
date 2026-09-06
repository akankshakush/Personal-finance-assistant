const db = require('../config/database');  // your sequelize instance

// Signup
const signupUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Query with replacements and QueryTypes.SELECT
    const rows = await db.query(
      'SELECT * FROM users WHERE email = ?',
      {
        replacements: [email],
        type: db.QueryTypes.SELECT
      }
    );

    if (rows.length > 0) {
      return res.status(409).json({ message: 'User already exists' });
    }

    await db.query(
      'INSERT INTO users (name, email, password, createdAt, updatedAt) VALUES (?, ?, ?, NOW(), NOW())',
      {
        replacements: [name, email, password],
        type: db.QueryTypes.INSERT
      }
    );

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Login
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide email and password' });
  }

  try {
    const users = await db.query(
      'SELECT * FROM users WHERE email = ?',
      {
        replacements: [email],
        type: db.QueryTypes.SELECT
      }
    );

    const user = users.length > 0 ? users[0] : null;

    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // ✅ Generate JWT token
    const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: '1d' });

    return res.status(200).json({
      message: 'Login successful',
      token, // ✅ Include token
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  signupUser,
  loginUser
};
