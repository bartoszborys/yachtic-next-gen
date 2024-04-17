import { ApiQuery } from "@/fetch/ApiQuery";
import LoggedUser from "../dto/loggedUser";

export default async function getLoggedUser(): Promise<LoggedUser|null> {
    try {
        return await ApiQuery("clients/auth", {init: {cache: "no-cache", credentials: "include"}});
    }
    catch(e) {
        return null;
    }
}