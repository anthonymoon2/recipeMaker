import { User } from '../models/index.js';

export const seedUsers = async () => {
  await User.bulkCreate(
    [
      { username: 'anthonymoon', email: 'anthonymoon2@gmail.com', password: 'password' },
      {
        username: 'massiel',
        email: 'massiel@gmail.com',
        password: 'password',
      },
      {
        username: 'balsher',
        email: 'balsher@gmail.com',
        password: 'password',
      },
      {
        username: 'yohana',
        email: 'yohana@gmail.com',
        password: 'password',
      },
    ],
    { individualHooks: true }
  );
};
