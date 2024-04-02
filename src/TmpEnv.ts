export const API_URL = "https://api.yachtic.com";

export async function noCorsFetch(input: URL | RequestInfo, init?: RequestInit | undefined): Promise<Response> {
    return await fetch(input, {...init, mode: "no-cors"});
}