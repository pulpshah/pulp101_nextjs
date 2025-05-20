import { NextRequest } from "next/server";
import { updateSession } from "./src/lib/session";

export default async function name(request: NextRequest) {
    return await updateSession(request);
}