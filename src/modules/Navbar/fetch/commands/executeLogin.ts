import { ApiCommand } from "@/fetch/ApiCommand";

export interface LoginParams {
    email: string;
    password: string;
}

export async function executeLogin(params: any): Promise<void> {
    const body = JSON.stringify(params);
    return ApiCommand("clients/auth/auth", {method: "POST", body, credentials: "include"});
}