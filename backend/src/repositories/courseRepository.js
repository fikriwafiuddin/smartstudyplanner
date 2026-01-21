import prisma from "../lib/db.js"

const create = async (data, userId) => {
  return await prisma.course.create({
    data: {
      ...data,
      userId,
    },
  })
}

const findAll = async (userId, semesterId) => {
  const where = { userId }
  if (semesterId) {
    where.semesterId = parseInt(semesterId)
  }
  return await prisma.course.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      semester: {
        select: {
          name: true,
        },
      },
    },
  })
}

const findById = async (id, userId) => {
  return await prisma.course.findFirst({
    where: { id, userId },
  })
}

const update = async (id, data, userId) => {
  return await prisma.course.update({
    where: { id, userId },
    data,
  })
}

const remove = async (id, userId) => {
  return await prisma.course.delete({
    where: { id, userId },
  })
}

const courseRepository = {
  create,
  findAll,
  findById,
  update,
  remove,
}

export default courseRepository
