// seed.ts

import { PrismaClient } from '@prisma/client';
import { SampleQuestions } from './lib/quetions';

const prisma = new PrismaClient();

async function seed() {
  for (const questionData of SampleQuestions) {
    const { question, options, category } = questionData;

    const createdQuestion = await prisma.question.create({
      data: {
        question,
        options: {
          create: options,
        },
        category: category as string,
      },
    });
  }

  // Create users
  const user1 = await prisma.user.create({
    data: {
      name: 'John Doe',
      username: 'john',
      password: 'password',
      college: 'Collage Of CCI ',
      department: 'IT',
      role: 'ADMIN',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'Abebe kebede',
      username: 'abebe',
      password: 'abe123',
      college: 'collage of CCI',
      department: 'SWE',
      role: 'USER',
    },
  });

  console.log('Seed data created successfully');
}

seed()
  .catch((error) => {
    throw error;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
