import User from '../models/userModel.js';
import crypto from 'crypto';
import { tokenStore } from '../middleware/authMiddleware.js';

const authController = {
  register: (req, res) => {
    const { username, email, password, role } = req.body;
    if (!username || !email || !password || !role) {
      return res.status(400).json({ error: 'Username, email, password, and role are required' });
    }
    
    User.findByEmail(email, (err, existingUser) => {
      if (err) {
        console.error("Error in findByEmail:", err);
        return res.status(500).json({ error: 'Database error during user lookup' });
      }
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }
      
      const userData = { username, email, password, role };
      User.create(userData, (err, result) => {
        if (err) {
          console.error("Error in creating user:", err);
          return res.status(500).json({ error: 'Database error during user creation' });
        }
        
        const token = crypto
          .randomBytes(18)
          .toString('base64')
          .replace(/[+/=]/g, '')
          .substr(0, 36);
        tokenStore[token] = { id: result.insertId, role };
        return res.status(201).json({ message: 'User registered successfully', userId: result.insertId, accessToken: token });
      });
    });
  },

  customerLogin: (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: 'Email and password are required' });

    User.findByEmail(email, (err, user) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      if (!user || user.password !== password || user.role !== 'customer') {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      const token = crypto
        .randomBytes(18)
        .toString('base64')
        .replace(/[+/=]/g, '')
        .substr(0, 36);
      tokenStore[token] = { id: user.id, role: user.role };
      res.json({ accessToken: token, userId: user.id });
    });
  },

  bankerLogin: (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: 'Email and password are required' });

    User.findByEmail(email, (err, user) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      if (!user || user.password !== password || user.role !== 'banker') {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      const token = crypto
        .randomBytes(18)
        .toString('base64')
        .replace(/[+/=]/g, '')
        .substr(0, 36);
      tokenStore[token] = { id: user.id, role: user.role };
      res.json({ accessToken: token, userId: user.id });
    });
  }
};

export default authController;
