import prisma from "../lib/prisma.js";

export async function findUserByEmail(email) {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
}

export async function findUserById(id) {
  return await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

export async function createUser(data) {
  return await prisma.user.create({
    data: {
      name: data.name || "",
      email: data.email,
      password: data.password,
      role: data.role || "user",
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

export async function updateUser(id, data) {
  return await prisma.user.update({
    where: {
      id,
    },
    data,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}