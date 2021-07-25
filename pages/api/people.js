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
      } else if (userId) {
        // respond with all people for user
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
      }
      break;
    case "POST": {
      const { firstName, lastName, quickNote, personId, favorite, userId, groupList } =
        req.body;

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
        const newPerson = await prisma.person.create({
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
      const {
        firstName,
        lastName,
        quickNote,
        groupList,
        groups,
        personId,
        favorite,
        userId,
      } = req.body;

      // old groups - groups that were previously created.
      const oldGroupIds = groupList
        .filter((group) => !group.isNew)
        .map((group) => {
          return { groupId: group.groupId };
        });

      // new groups - groups that are newly created.
      const newGroups = groupList.filter((group) => group.isNew);

      // current groups - groups that a person currently belongs to.
      const currentGroupIds = groups.map((group) => {
        return { groupId: group.groupId };
      });

      // 1. remove all current groups from person
      const removeCurrentGroups = prisma.person.update({
        where: {
          personId,
        },
        data: {
          groups: {
            disconnect: currentGroupIds,
          },
        },
        include: {
          groups: true,
        },
      });

      // 2. connect any old groups to person
      const connectOldGroups = prisma.person.update({
        where: {
          personId,
        },
        data: {
          user: {
            connect: { id: userId },
          },
          groups: {
            connect: oldGroupIds,
          },
        },
      });

      // 3. update person to with new data and new groups
      const addDataAndNewGroups = prisma.person.update({
        where: {
          personId,
        },
        data: {
          personId,
          firstName,
          lastName,
          quickNote,
          favorite,
          groups: {
            create: newGroups,
          },
        },
        include: {
          groups: true,
        },
      });

      try {
        const updatedPerson = await Promise.all([
          removeCurrentGroups,
          connectOldGroups,
          addDataAndNewGroups,
        ]);

        const people = await prisma.person.findMany();
        res.status(200).json({ updatedPerson, people });
        console.log("people ", people);
        console.log("updated person ", updatedPerson);
      } catch (error) {
        console.error("error message: ", error.message);
        res.status(500).send("Server Error");
      }
      break;
    }
    case "DELETE":
      try {
        const { personId } = req.body;

        const deconstedPerson = await prisma.person.deconste({
          where: {
            personId,
          },
        });

        const people = await prisma.person.findMany();

        res.status(200).json({ deconstedPerson, people });
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
