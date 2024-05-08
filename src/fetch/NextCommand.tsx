export async function NextCommand<T>(resource: string, body: object): Promise<T> {
    const url = `http://localhost:3000/api/${resource}`;    
    return (await fetch(url, {method: "post", body: JSON.stringify(body)})).json();
}