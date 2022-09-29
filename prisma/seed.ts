import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

async function main() {
  [...Array.from(Array(200).keys())].forEach(async (item) => {
    await client.liveStream.create({
      data: {
        name: String(item),
        user: {
          connect: {
            id: 4,
          },
        },
      },
    });
    console.log(`${item}/100`);
  });
}

main()
  .catch((e) => console.log(e))
  .finally(() => client.$disconnect());
