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
      username: 'john_doe',
      password: 'secure_password',
      collage: 'Example College',
      department: 'CS',
      role: 'ADMIN',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'Jane Doe',
      username: 'jane_doe',
      password: 'another_secure_password',
      collage: 'Sample University',
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
