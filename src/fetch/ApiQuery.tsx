'use server'

import { cookies } from "next/headers";

export async function ApiQuery<T>(resource: string, params: URLSearchParams = new URLSearchParams()): Promise<T> {
    const url = `${process.env.API_URL}/${resource}`;
    
    params.append("currencyId", cookies().get("currencyId")?.value || "2");
    params.append("languageName", cookies().get("languageName")?.value || "en");
    params.append("languageId", cookies().get("languageId")?.value || "2");

    const paramsPart = params.toString();
    let urlWithParams = "";

    if(paramsPart !== "") {
        if(url.includes("?")) {
            urlWithParams = `${url}&${paramsPart}`
        }
        else {
            urlWithParams = `${url}?${paramsPart}`
        }
    }
    
    return (await fetch(urlWithParams)).json();
}