'use server'

import { cookies } from "next/headers";

export async function ApiQuery<T>(resource: string, params: URLSearchParams = new URLSearchParams()): Promise<T> {
    const url = `${process.env.API_URL}/${resource}`;
    
    params.append("currencyId", cookies().get("currencyId")!.value);
    params.append("languageName", cookies().get("languageName")!.value);
    params.append("languageId", cookies().get("languageId")!.value);

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