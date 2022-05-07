import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  await prisma.progress.deleteMany({ where: {} });
  await prisma.location.deleteMany({ where: {} });

  await prisma.progress.create({
    data: {
      title: "The Hunt",
      currentStep: 0,
    },
  });

  const locations = await prisma.location.createMany({
    data: [
      {
        name: "Shojo",
        order: 0,
        hasBeenGuessed: false,
        hasBeenVisited: false,
        clue: "Come visit my HOOD, my graffitied walls express my individuality, I stand out from my surroundings while paying homage to my Asian roots. I even make tofu delicious with the help of some fries and Brian Moy",
        boldWord: "HOOD",
      },
      {
        name: "Yvonnes",
        order: 1,
        hasBeenGuessed: false,
        hasBeenVisited: false,
        clue: "While I make CLAIMS of being a beauty salon, my not so secret door traps the scent of espresso and vodka in a dimly lit room home to prestigious generals and dazzling chandeliers",
        boldWord: "CLAIMS",
      },
      {
        name: "Contessa",
        order: 2,
        hasBeenGuessed: false,
        hasBeenVisited: false,
        clue: "I am a Countess not a COUNT, I speak only Italian, enjoy a nice view of a sunset, and  rubbing elbows with people headed to fancy balls.",
        boldWord: "COUNT",
      },
    ],
  });
  console.log("🚀 ~ file: seed.ts ~ line 45 ~ seed ~ locations", locations);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
