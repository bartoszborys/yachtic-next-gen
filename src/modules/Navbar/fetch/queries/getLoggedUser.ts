import { ApiQuery } from "@/fetch/ApiQuery";
import LoggedUser from "../dto/loggedUser";

export default async function getLoggedUserEmail(): Promise<string | null> {
    try {
        return (await ApiQuery<LoggedUser>("clients/auth", {init: {cache: "no-cache", credentials: "include"}})).email;
    }
    catch(e) {
        return null;
    }
}