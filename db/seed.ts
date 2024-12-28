import { db } from ".";
import { users } from "./schema";
import bcrypt from "bcryptjs";

async function main() {
  const hashedPassword = await bcrypt.hash("test1", 10);

  const sample = {
    name: "test1",
    email: "test1@gmail.com",
    password: hashedPassword,
    image: "https://is.gd/qKV37y",
    currentLocation: "Nagpur, Maharashtra, India",
    permanentLocation: "Gondia, Maharashtra, India",
    personalNo: "8999679318",
    guardiansNo: "8999679318,8999679318",
  };

  await db.insert(users).values({ ...sample });
}

main()
  .then(() => {
    console.log("DB Seeding Completed");
  })
  .catch((e) => {
    console.log(`DB Seeding Failed. Error : ${e}`);
  })
  .finally(() => process.exit(1));
