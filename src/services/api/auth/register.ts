import type { NextApiRequest, NextApiResponse } from 'next';
import { IUser } from '../../../../types/entities/user';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { id, name, email, password }: IUser= req.body;

  if (!id || !name || !email || !password) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const result = await registerUser({ id, name, email, password });
   
    return res.status(200).json({ message: 'User registered successfully', user: result });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred while registering the user' });
  }
}

async function registerUser(user: IUser) {
  return Promise.resolve(user); 
}
