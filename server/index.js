import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';
const PASSWORD_TO_HASH = process.env.PASSWORD_TO_HASH; // Plain password from env
const SALT_ROUNDS = 12;

let PASSWORD_HASH = null;

// Hash the password at server start
(async () => {
  if (!PASSWORD_TO_HASH) {
    throw new Error('Environment variable PASSWORD_TO_HASH is not set.');
  }
  PASSWORD_HASH = await bcrypt.hash(PASSWORD_TO_HASH, SALT_ROUNDS);
})();

app.use(cors());
app.use(express.json());

// Auth endpoint
app.post('/api/auth182', async (req, res) => {
  const { password } = req.body;
  if (!password) return res.status(400).json({ error: 'Password required' });
  if (!PASSWORD_HASH) return res.status(500).json({ error: 'Server not ready' });
  const match = await bcrypt.compare(password, PASSWORD_HASH);
  if (!match) return res.status(401).json({ error: 'Invalid password' });
  // Issue JWT valid for 7 days
  const token = jwt.sign({ access182: true }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ token });
});

// Middleware to check JWT
function auth182Middleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No token' });
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.access182) {
      req.user = decoded;
      return next();
    }
    return res.status(403).json({ error: 'Forbidden' });
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

// Example protected route
app.get('/api/secure182', auth182Middleware, (req, res) => {
  res.json({ message: 'Access granted to 182 page.' });
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
