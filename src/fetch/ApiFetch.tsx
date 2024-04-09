export async function ApiFetch<T>(resource: string): Promise<T> {
    console.log(`${process.env.API_URL}/${resource}`);

    return (await fetch(`${process.env.API_URL}/${resource}`, {})).json();
}