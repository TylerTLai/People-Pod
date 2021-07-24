import prisma from "../../config/prisma";

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      const { personId, userId } = req.query;

      // respond with a specific person
      if (personId) {
        try {
          const fetchedPerson = await prisma.person.findUnique({
            where: {
              personId,
            },
          });
          res.status(200).json(fetchedPerson);
        } catch (error) {
          console.error("error message: ", error.message);
          res.status(500).send("Server Error");
        }
      } else {
        // respond with all people for user
        try {
          const people = await prisma.person.findMany({
            where: {
              userId,
            },
          });
          res.status(200).json(people);
        } catch (error) {
          console.error("error message: ", error.message);
          res.status(500).send("Server Error");
        }
      }
      break;
    case "POST":
      try {
        const { firstName, lastName, quickNote, personId, favorite, userId, groupList } =
          req.body;

        const existingGroupIds = groupList
          .filter((group) => !group.isNew)
          .map((group) => {
            return { groupId: group.groupId };
          });

        const newGroups = groupList.filter((group) => group.isNew);

        // create a new person and connect them to existing groups
        let newPerson = await prisma.person.create({
          data: {
            firstName,
            lastName,
            quickNote,
            personId,
            favorite,
            user: {
              connect: { id: userId },
            },
            groups: {
              connect: existingGroupIds,
            },
          },
        });

        // update person to include new groups and create those new groups
        newPerson = await prisma.person.update({
          where: {
            personId,
          },
          data: {
            groups: {
              create: newGroups,
            },
          },
          include: {
            groups: true,
          },
        });

        res.status(200).json(newPerson);
      } catch (error) {
        console.error("error message: ", error.message);
        res.status(500).send("Server Error");
      }
      break;
    case "PUT":
      try {
        const { firstName, lastName, quickNote, personId, favorite } = req.body;

        const updatedPerson = await prisma.person.update({
          where: {
            personId,
          },
          data: { personId, firstName, lastName, quickNote, favorite },
        });

        const people = await prisma.person.findMany();

        res.status(200).json({ updatedPerson, people });
      } catch (error) {
        console.error("error message: ", error.message);
        res.status(500).send("Server Error");
      }
      break;
    case "DELETE":
      try {
        const { personId } = req.body;

        const deletedPerson = await prisma.person.delete({
          where: {
            personId,
          },
        });

        const people = await prisma.person.findMany();

        res.status(200).json({ deletedPerson, people });
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
