import "dotenv/config";
import bcrypt from "bcryptjs";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

async function run() {
  const argv = await yargs(hideBin(process.argv)).options({
    email: { type: "string", demandOption: true },
    password: { type: "string", demandOption: true },
    name: { type: "string", default: "Administrator" }
  }).argv;

  await connectDB();
  const passwordHash = await bcrypt.hash(argv.password, 10);
  await User.findOneAndUpdate(
    { email: argv.email },
    { name: argv.name, email: argv.email, passwordHash, role: "admin" },
    { upsert: true }
  );
  console.log(`Admin user ready at ${argv.email}`);
  await mongoose.connection.close();
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
