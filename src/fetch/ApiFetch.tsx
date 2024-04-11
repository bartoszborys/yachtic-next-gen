export async function ApiQuery<T>(resource: string, params: URLSearchParams = new URLSearchParams()): Promise<T> {
    const url = `${process.env.API_URL}/${resource}`;
    
    params.append("currencyId", "2");
    params.append("languageName", "en");
    params.append("languageId", "2");

    const paramsPart = params.toString();
    let urlWithParams = "";

    if(url.includes("?")) {
        urlWithParams = `${url}&${paramsPart}`
    }
    else {
        urlWithParams = `${url}?${paramsPart}`
    }
    
    return (await fetch(urlWithParams, {})).json();
}