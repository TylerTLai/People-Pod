import prisma from "../../config/prisma";

export default async (req, res) => {
  switch (req.method) {
    case "GET": {
      const { groupId, userEmail } = req.query;

      if (!userEmail) {
        // User is not logged in
        return res.status(400).send({
          message: "Not logged in.",
        });
      }

      if (userEmail) {
        // User is logged in, fetch all groups
        try {
          const groups = await prisma.group.findMany({
            where: {
              userEmail,
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
      } else if (groupId && userEmail) {
        // User is logged in, fetch a specific group
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
      }
      break;
    }
    case "POST":
      const groupList = req.body;

      // todo - refactor to use createMany() instead of looping
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
        const { groupId, name, value, isNew, userEmail } = group;
        try {
          const newGroup = await prisma.group.create({
            data: { name, groupId, value, isNew, userEmail },
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
        const { name, value, groupId } = req.body;

        const updatedGroup = await prisma.group.update({
          where: {
            groupId,
          },
          data: { name, value, groupId },
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
