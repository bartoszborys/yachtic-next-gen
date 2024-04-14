'use server'

import { cookies } from "next/headers";

export interface ApiQueryData {
    params?: URLSearchParams;
    init?: RequestInit;
}

export async function ApiQuery<T>(resource: string, {params = new URLSearchParams, init = {}}: ApiQueryData = {}): Promise<T> {
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

    
    const before = performance.now();

    const reuslt = (await fetch(urlWithParams, init)).json();
    
    const after = performance.now();
    const elapsedTime = after - before;
    
    console.log(`Elapsed time: ${elapsedTime} milliseconds for: "${urlWithParams}"`);

    return reuslt;
}