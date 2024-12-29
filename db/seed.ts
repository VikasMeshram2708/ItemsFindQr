import bcrypt from "bcryptjs";
import { prismaInstance } from ".";

async function main() {
  const hashedPassword = await bcrypt.hash("test1", 10);

  const sample = {
    name: "test1",
    email: "test1@gmail.com",
    password: hashedPassword,
    image: "https://is.gd/qKV37y",
    currentAddress: "Nagpur, Maharashtra, India",
    permanentAddress: "Gondia, Maharashtra, India",
    personalNo: "8999679318",
    guardiansNo: "8999679318,8999679318",
  };

  await prismaInstance.user.create({
    data: sample,
  });
}

main()
  .then(() => {
    console.log("DB Seeding Completed");
  })
  .catch((e) => {
    console.log(`DB Seeding Failed. Error : ${e}`);
  })
  .finally(() => process.exit(1));
