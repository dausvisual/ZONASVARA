import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.findFirst({
    where: { role: "SUPER_ADMIN" }
  });

  if (user) {
    const hashedPassword = await bcrypt.hash("zonasvara1712", 10);
    await prisma.user.update({
      where: { id: user.id },
      data: {
        email: "Masukkan Email atau Username",
        password: hashedPassword
      }
    });
    console.log("Admin account updated successfully!");
    console.log("Email: admin@zonasvaraspace");
    console.log("Password: zonasvara1712");
  } else {
    console.log("No Super Admin found.");
  }
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());
