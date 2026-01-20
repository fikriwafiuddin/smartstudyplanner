import prisma from "../lib/db.js"

const create = async (data, userId) => {
  return await prisma.semester.create({
    data: {
      ...data,
      userId,
    },
  })
}

const findAll = async (userId) => {
  return await prisma.semester.findMany({
    where: {
      userId,
    },
    orderBy: {
      startDate: "desc",
    },
  })
}

const findById = async (id, userId) => {
  return await prisma.semester.findFirst({
    where: {
      id,
      userId,
    },
  })
}

const update = async (id, data, userId) => {
  return await prisma.semester.update({
    where: {
      id,
      userId,
    },
    data,
  })
}

const remove = async (id, userId) => {
  return await prisma.semester.delete({
    where: {
      id,
      userId,
    },
  })
}

const deactivateAll = async (userId) => {
  return await prisma.semester.updateMany({
    where: {
      userId,
      isActive: true,
    },
    data: {
      isActive: false,
    },
  })
}

const semesterRepository = {
  create,
  findAll,
  findById,
  update,
  remove,
  deactivateAll,
}

export default semesterRepository
