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
        const { firstName, lastName, quickNote } = req.body;

        const newPerson = await prisma.person.create({
          data: { firstName, lastName, quickNote },
        });

        res.status(200).json(newPerson);
      } catch (error) {
        console.error(error);
      }
      break;
    case "PUT":
      console.log("put request");
      break;
    case "DELETE":
      console.log("delete request");
      break;
    default:
      res.status(405).json({ message: "Method not allowed." }).end(); //Method not allowed
      break;
  }
};
