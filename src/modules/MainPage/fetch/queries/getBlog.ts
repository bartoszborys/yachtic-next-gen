import { ExternalFetch } from "@/fetch/ExternalFetch";
import BlogPostApi from "../dto/BlogPost";

export async function getBlog(): Promise<BlogPostApi> {
    const blog = (await ExternalFetch<BlogPostApi[]>("https://blog.yachtic.com/wp-json/wp/v2/posts/?per_page=1&order=desc&lang=en")).pop();

    if(blog === undefined) {
        throw new Error("Blog is undefined");
    }

    return blog;
}