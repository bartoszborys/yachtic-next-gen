import WebPermalink from "../fetch/dto/webPermalink";

export interface PermalinkPageProps {
    permalink: WebPermalink,
    locale: string,
    searchParams: {[key: string]: string}
}