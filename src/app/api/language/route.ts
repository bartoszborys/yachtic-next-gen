import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest): Promise<Response> {
    const res: {languageName: string, languageId: string} = await request.json()
    Object.entries(res).forEach(([key, value]) => {
        cookies().set(key, value);
    })
    return Response.json({});
}