import { Router, type Request, type Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = await User.findOne({
    where: { username },
  });
  if (!user) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  const passwordIsValid = await bcrypt.compare(password, user.password);
  if (!passwordIsValid) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  const secretKey = process.env.JWT_SECRET_KEY || '';

  const token = jwt.sign({ id:user.id, username }, secretKey, { expiresIn: '1h' });
  return res.json({ token });
};

export const signUp = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try{
    // ! hash the password from 'req.body' and save to newUser
    // const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // create new user and add it to users table
    const newUser = await User.create({ username, email, password });

    res.status(201).json(newUser);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

// POST /login - create a new user
router.post('/signUp', signUp);

export default router;
