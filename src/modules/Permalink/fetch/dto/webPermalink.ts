export default interface WebPermalink {
    model: string;
    modelId: number;
    params: unknown[];
    seo: {
        autoCanonical: string;
        autoTitle: string;
        description: string;
        noFollow: boolean;
        noIndex: boolean;
    }
}