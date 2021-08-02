import prisma from "../../config/prisma";

export default async (req, res) => {
  switch (req.method) {
    case "GET": {
      const { personId, userId } = req.query;

      if (!userId) {
        // User is not logged in
        return res.status(400).send({
          message: "Not logged in.",
        });
      }

      if (userId) {
        // User is logged in, fetch all people
        try {
          const people = await prisma.person.findMany({
            where: {
              userId,
            },
            include: {
              groups: true,
            },
          });
          res.status(200).json(people);
        } catch (error) {
          console.error("error message: ", error.message);
          res.status(500).send("Server Error");
        }
      } else if (personId && userId) {
        // User is logged in, fetch a specific person
        try {
          const fetchedPerson = await prisma.person.findUnique({
            where: {
              personId,
            },
            include: {
              groups: true,
            },
          });
          res.status(200).json(fetchedPerson);
        } catch (error) {
          console.error("error message: ", error.message);
          res.status(500).send("Server Error");
        }
      }
      break;
    }
    case "POST": {
      const { firstName, lastName, quickNote, personId, favorite, userId, groupList } =
        req.body;

      if (!userId) {
        // User is not logged in
        return res.status(400).send({
          message: "Not logged in.",
        });
      }

      // todo - refactor to use createOrConnect 
      // old groups - groups that were previously created.
      // new groups - groups that are newly created.
      // current groups - groups that a person currently belongs to.

      try {
        const oldGroupIds = groupList
          .filter((group) => !group.isNew)
          .map((group) => {
            return { groupId: group.groupId };
          });

        const newGroups = groupList.filter((group) => group.isNew);

        // create a new person and connect them to old groups
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
              connect: oldGroupIds,
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
    }
    case "PUT": {
      const { firstName, lastName, quickNote, personId, favorite, userId } = req.body;

      if (!userId) {
        // User is not logged in
        return res.status(400).send({
          message: "Not logged in.",
        });
      }

      //todo - add groups

      try {
        const updatedPerson = await prisma.person.update({
          where: {
            personId,
          },
          data: {
            personId,
            firstName,
            lastName,
            quickNote,
            favorite,
          },
        });

        res.status(200).json({ updatedPerson });
      } catch (error) {
        console.error("error message: ", error.message);
        res.status(500).send("Server Error");
      }
      break;
    }
    case "DELETE": {
      try {
        const { personId, userId } = req.body;
        
        if (!userId) {
          // User is not logged in
          return res.status(400).send({
            message: "Not logged in.",
          });
        }
        const deletedPerson = await prisma.person.delete({
          where: {
            personId,
          },
        });

        res.status(200).json(deletedPerson);
      } catch (error) {
        console.error("error message: ", error.message);
        res.status(500).send("Server Error");
      }
      break;
    }
    default: {
      res.status(405).json({ message: "Method not allowed." }); //Method not allowed
      break;
    }
  }
};
