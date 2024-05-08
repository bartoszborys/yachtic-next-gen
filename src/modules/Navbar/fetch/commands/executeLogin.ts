import { ApiCommand } from "@/fetch/ApiCommand";
import LoggedUser from "../dto/loggedUser";

export interface LoginParams {
    email: string;
    password: string;
}

export async function executeLogin(params: LoginParams): Promise<LoggedUser> {
    const body = JSON.stringify(params);
    return ApiCommand("clients/auth/auth", {method: "POST", body, credentials: "include"});
}