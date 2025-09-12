import { auth } from "@clerk/nextjs/server";

const { userId, sessionClaims } = auth();

export const role = (sessionClaims?.metaData as { role?: string })?.role;

export const currentUserId = userId;
 