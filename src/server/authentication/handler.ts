import nextAuth from "next-auth";
import { authOptions } from "./auth";

export const handler = nextAuth(authOptions);

