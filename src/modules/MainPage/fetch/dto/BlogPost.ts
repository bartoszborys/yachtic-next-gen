export default interface BlogPostApi {
    title: {
        rendered: string,
    };
    excerpt: {
        rendered: string,
    };
    link: string;
    yoast_head_json: {
        og_image: [
            {
                url: string,
            }
        ],
    };
    imageUrl: string;
}
