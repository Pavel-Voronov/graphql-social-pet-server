import { prisma, AuthRole } from '../src/generated/prisma-client';

const categoriesData = [
  { title: 'games' },
  { title: 'movies' },
  { title: 'music' },
  { title: 'sport' }
];

const usersData = [
  {
    email: 'admin@gmail.com',
    firstName: 'Bob',
    lastName: 'Smith',
    password: '$2a$10$wPoVofrf9FD17VBFcmTaAOwLSq4h3Q9.kwLrC1l7obBl4tw6TM3w2',
    role: 'ADMIN' as AuthRole
  },
  {
    email: 'user@gmail.com',
    firstName: 'Vasya',
    lastName: 'Smith',
    password: '$2a$10$wPoVofrf9FD17VBFcmTaAOwLSq4h3Q9.kwLrC1l7obBl4tw6TM3w2',
    role: 'USER' as AuthRole
  },
  {
    email: 'user2@gmail.com',
    firstName: 'Cho',
    lastName: 'Smith',
    password: '$2a$10$wPoVofrf9FD17VBFcmTaAOwLSq4h3Q9.kwLrC1l7obBl4tw6TM3w2',
    role: 'USER' as AuthRole
  }
];

const roomsData = [
  { title: 'custom room with subs, free cookies :)' },
  { title: 'custom room without subs, no cookies :(' }
];

(async () => {
  const categories = await Promise.all(
    categoriesData.map(item => prisma.createCategory(item))
  );

  const users = await Promise.all(
    usersData.map(item => prisma.createUser(item))
  );

  const rooms = await Promise.all([
    prisma.createRoom({
      ...roomsData[0],
      users: {
        connect: users
          .filter((item, index) => index !== 0)
          .map(({ id }) => ({ id }))
      },
      category: { connect: { id: categories[0].id } }
    }),

    prisma.createRoom({
      ...roomsData[1],
      category: { connect: { id: categories[0].id } }
    })
  ]);

  await Promise.all([
    prisma.updateUser({
      where: { id: users[1].id },
      data: { friends: { connect: { id: users[2].id } } }
    }),
    prisma.updateUser({
      where: { id: users[2].id },
      data: { friends: { connect: { id: users[1].id } } }
    })
  ]);
})().catch(e => console.error(e));
