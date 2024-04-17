export async function ApiCommand<T>(resource: string, init: { method: "POST", body?: BodyInit } & RequestInit): Promise<T> {
    const url = `${process.env.API_URL}/${resource}`;
    const before = performance.now();
    const reuslt = (await fetch(url, {
        ...init,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }));
    const after = performance.now();
    const elapsedTime = after - before;

    console.log(`${init.method} - COMMAND - Elapsed time: ${elapsedTime} milliseconds for: "${url}"`);

    return reuslt.json();
}