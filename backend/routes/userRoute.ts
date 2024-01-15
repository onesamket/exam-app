import { Request, Response, Router } from 'express';
import { prisma } from '../prisma/lib/prisma';
import jwt from 'jsonwebtoken';
import authentication from '../middleware/authentication';

const SessionSecret = process.env.SESSION_SECRET!;
const userRouter = Router();

// Signup route
userRouter.post('/signup', async (req: Request, res: Response) => {
  const { name, uid } = req.body;

  // Check for existing user
  const user = prisma.user.findFirst({
    where: {
      name,
    },
  });
  // Generate JWT
  const token = jwt.sign({ name, uid }, SessionSecret);

  res.json({ token });
});

// Login route
userRouter.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await prisma.user.findFirst({
    where: {
      username,
    },
  });
  if (user) {
    // Generate JWT
    const token = jwt.sign({ username, password }, SessionSecret);
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Profile route to fetch user data based on the token
userRouter.get('/profile', authentication, async (req: any, res: Response) => {
  try {
    // Extract user information from the request object
    const { username } = req.user as { username: string };

    // Fetch user profile data from the database using Prisma
    const userProfile = await prisma.user.findFirst({
      where: {
        username,
      },
    });

    if (!userProfile) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(userProfile);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default userRouter;
