// DB에 가상 카테고리 추가
// node scripts/seed.ts

const {PrismaClient} = require("@prisma/client");

const db = new PrismaClient();

async function main() {
    try {
        await db.category.createMany({
            data: [
                {name: "C"},
                {name: "Java"},
                {name: "SpringBoot"},
                {name: "MySql"},
                {name: "Prisma"},
                {name: "Node.js"},
                {name: "React"},
                {name: "TypeScript"},
                {name: "Next.js"},
            ]
        });

        await db.board.createMany({
            data: [
                {name: "공지"},
                {name: "자유"},
                {name: "질문"},
                {name: "코드"},
            ]
        });

        console.log("Success");
    } catch (error) {
        console.log("Error seeding the DB Categories / Board", error);
    } finally {
        await db.$disconnect();
    }
}

main();