// Stub for NextAuth options
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  providers: [], // Add your providers here
  session: { strategy: "jwt" as const },
};
