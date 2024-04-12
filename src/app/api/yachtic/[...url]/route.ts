import { ApiQuery } from "@/fetch/ApiQuery";
import { NextRequest } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: { url: string[] } }
): Promise<Response> {
    return new Response(
        JSON.stringify(
            await ApiQuery(params.url.join("/"), request.nextUrl.searchParams)
        )
    );
}