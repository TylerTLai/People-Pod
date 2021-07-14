import prisma from "../../config/prisma";

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      const { groupId, userId } = req.query;
      if (groupId) {
        try {
          const fetchedGroup = await prisma.group.findUnique({
            where: {
              groupId,
            },
          });
          res.status(200).json(fetchedGroup);
        } catch (error) {
          console.error(error);
          res.status(500).end();
        }
      } else if (userId) {
        try {
          const groups = await prisma.group.findMany({
            where: {
              userId,
            },
          });
          res.status(200).json(groups);
        } catch (error) {
          console.error(error);
          res.status(500).end();
        }
      }

      break;
    case "POST":
      try {
        const { groupName, groupId } = req.body;

        const newGroup = await prisma.group.create({
          data: { groupName, groupId },
        });
        res.status(200).json(newGroup);
      } catch (error) {
        console.error(error);
      }
      break;
    case "PUT":
      try {
        const { groupName, groupId } = req.body;

        const updatedGroup = await prisma.group.update({
          where: {
            groupId,
          },
          data: { groupName, groupId },
        });

        const groups = await prisma.group.findMany();

        res.status(200).json({ updatedGroup, groups });
      } catch (error) {
        console.error(error);
      }
      break;
    case "DELETE":
      try {
        const { groupId } = req.body;

        const deletedGroup = await prisma.group.delete({
          where: {
            groupId,
          },
        });

        const groups = await prisma.group.findMany();

        res.status(200).json({ deletedGroup, groups });
      } catch (error) {
        console.error(error);
      }
      break;
    default:
      res.status(405).json({ message: "Method not allowed." }).end(); //Method not allowed
      break;
  }
};