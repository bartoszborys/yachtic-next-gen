import { ApiCommand } from "@/fetch/ApiCommand";

export async function executeLogout(): Promise<void> {
    return ApiCommand("clients/auth/logout", {method: "POST", credentials: "include"});
}