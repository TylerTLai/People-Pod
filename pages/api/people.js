import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      res.status(200).json({ message: "get" });
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
      //code
      console.log("put request");
      break;
    case "DELETE":
      //code
      console.log("delete request");
      break;
    default:
      res.status(405).end(); //Method not allowed
      break;
  }
};
