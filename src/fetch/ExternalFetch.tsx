export async function ExternalFetch<T>(resource: string): Promise<T> {
    return (await fetch(resource, {})).json();
}