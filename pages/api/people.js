import prisma from "../../config/prisma";

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      try {
        const people = await prisma.person.findMany();
        res.status(200).json(people);
      } catch (error) {
        console.error(error);
        res.status(500).end();
      }
      break;
    case "POST":
      try {
        const { firstName, lastName, quickNote, personId, favorite } = req.body;

        const newPerson = await prisma.person.create({
          data: { personId, firstName, lastName, quickNote, favorite },
        });

        res.status(200).json(newPerson);
      } catch (error) {
        console.error(error);
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
        console.error(error);
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
        console.error(error);
      }
      break;
    default:
      res.status(405).json({ message: "Method not allowed." }).end(); //Method not allowed
      break;
  }
};
