export interface ApiQueryData {
    params?: URLSearchParams;
    init?: RequestInit;
}

export async function ApiQuery<T>(resource: string, {params = new URLSearchParams, init = {}}: ApiQueryData = {}): Promise<T> {
    const url = `${process.env.API_URL}/${resource}`;
    const isServer = typeof window === "undefined";
    const finalInit = {
        ...init,
        method: "GET",
    };

    if(isServer) {
        const {cookies} = await import("next/headers");

        // Static generation has not access to cookies, we must pass language and currency data in another way
        params.append("currencyId", cookies().get("currencyId")?.value || "2");
        params.append("languageName", cookies().get("languageName")?.value || "en");
        params.append("languageId", cookies().get("languageId")?.value || "2");
        
        const Cookie = [...cookies().getAll()].map(item => `${item.name}=${item.value}`).join(";")

        finalInit.headers = {Cookie}
    }
    else {
        const cookies = (await import("js-cookie")).default;
        params.append("currencyId", cookies.get("currencyId") || "2");
        params.append("languageName", cookies.get("languageName") || "en");
        params.append("languageId", cookies.get("languageId") || "2");
    }

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
    const result = await fetch(urlWithParams, finalInit);
    
    const after = performance.now();
    const elapsedTime = after - before;
    
    console.log(`Elapsed time: ${elapsedTime} milliseconds for: "${urlWithParams}"`);

    if(!result.status.toString().startsWith("2")) {
        throw new Error(`Not 2XX response for URL ${urlWithParams}`);
    }

    return result.json();
}