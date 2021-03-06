import prisma from "../../config/prisma";

export default async (req, res) => {
  switch (req.method) {
    case "GET": {
      const { personId, userEmail } = req.query;

      // User is not logged in
      if (!userEmail) {
        return res.status(400).send({
          message: "Not logged in.",
        });
      }

      // User is logged in, fetch a specific person
      if (personId && userEmail) {
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
      } else if (userEmail) {
        // User is logged in, fetch all people
        try {
          const people = await prisma.person.findMany({
            where: {
              userEmail,
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
    }
    case "POST": {
      const {
        personId,
        firstName,
        lastName,
        birthday,
        email,
        location,
        address,
        phoneNumber,
        quickNote,
        favorite,
        userEmail,
        groupList,
        facebookId,
        twitterId,
        instagramId,
        linkedinId,
        website,
      } = req.body;

      // User is not logged in
      if (!userEmail) {
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
            birthday,
            email,
            location,
            address,
            phoneNumber,
            facebookId,
            twitterId,
            instagramId,
            linkedinId,
            website,
            user: {
              connect: { email: userEmail },
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
        personId,
        firstName,
        lastName,
        birthday,
        email,
        location,
        address,
        phoneNumber,
        quickNote,
        favorite,
        userEmail,
        groupList,
        facebookId,
        twitterId,
        instagramId,
        linkedinId,
        website,
      } = req.body;

      if (!userEmail) {
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
            firstName,
            lastName,
            quickNote,
            personId,
            favorite,
            birthday,
            email,
            location,
            address,
            phoneNumber,
            facebookId,
            twitterId,
            instagramId,
            linkedinId,
            website,
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
        const { personId, userEmail } = req.body;

        if (!userEmail) {
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
