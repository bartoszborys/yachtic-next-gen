export async function ApiFetch<T>(resource: string): Promise<T> {
    return (await fetch(`${process.env.API_URL}/${resource}`, {})).json();
}