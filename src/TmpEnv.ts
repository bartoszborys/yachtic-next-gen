// export const API_URL = "http://localhost:8080";
export const API_URL = "https://api.yachtic.com";

export async function noCorsFetch(input: URL | RequestInfo, init?: RequestInit | undefined): Promise<Response> {
    return await fetch(input, {...init, next: {revalidate: 3600}});
}