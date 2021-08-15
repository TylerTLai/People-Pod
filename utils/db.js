import prisma from "../config/prisma";

const createUser = async (email) => {
  const user = await prisma.user.create({
    data: { email },
  });
  await prisma.$disconnect();
  return user;
};

const getUserByEmail = async (email) => {
  const prisma = new PrismaClient();
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    include: {
      courses: true,
    },
  });
  await prisma.$disconnect();
  return user;
};

export { createUser, getUserByEmail };
