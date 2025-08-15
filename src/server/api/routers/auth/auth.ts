import { createTRPCRouter } from "../../trpc";
import { getSession } from "./get-session";

export const authRouter = createTRPCRouter({
	getSession,
});
