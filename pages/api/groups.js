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
            include: {
              people: true,
            },
          });
          res.status(200).json(fetchedGroup);
        } catch (error) {
          console.error("error message: ", error.message);
          res.status(500).send("Server Error");
        }
      } else {
        try {
          const groups = await prisma.group.findMany({
            where: {
              userId,
            },
            include: {
              people: true,
            },
          });
          res.status(200).json(groups);
        } catch (error) {
          console.error("error message: ", error.message);
          res.status(500).send("Server Error");
        }
      }
      break;
    case "POST":
      const groupList = req.body;
      // refactor to use createMany() instead of looping

      // try {
      //   const newGroups = await prisma.createMany({
      //     data: groupList,
      //     skipDuplicates: true,
      //   });
      //   res.status(200).json(newGroups);
      // } catch (error) {
      //   console.error("error message: ", error.message);
      //   res.status(500).send("Server Error");
      // }

      groupList.forEach(async (group) => {
        const { groupId, name, value, isNew, userId } = group;
        try {
          const newGroup = await prisma.group.create({
            data: { name, groupId, value, isNew, userId },
          });
          res.status(200).json(newGroup);
        } catch (error) {
          console.error("error message: ", error.message);
          res.status(500).send("Server Error");
        }
      });

      break;
    case "PUT":
      try {
        const { name, groupId } = req.body;

        const updatedGroup = await prisma.group.update({
          where: {
            groupId,
          },
          data: { name, groupId },
        });

        const groups = await prisma.group.findMany();

        res.status(200).json({ updatedGroup, groups });
      } catch (error) {
        console.error("error message: ", error.message);
        res.status(500).send("Server Error");
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
        console.error("error message: ", error.message);
        res.status(500).send("Server Error");
      }
      break;
    default:
      res.status(405).json({ message: "Method not allowed." }).end(); //Method not allowed
      break;
  }
};
