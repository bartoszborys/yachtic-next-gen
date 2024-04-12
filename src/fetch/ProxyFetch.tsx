export async function ProxyYachticFetch<T>(resource: string, params: URLSearchParams = new URLSearchParams()): Promise<T> {
    const url = `http://localhost:3000/api/yachtic/${resource}`;

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