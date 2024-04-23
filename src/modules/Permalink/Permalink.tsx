import getPermalink from "./fetch/queries/getWebPermalink";
import { fromPermalink } from "./factories/PageResolver";

export interface PermalinkProps {
    locale: string;
    rawPermalink: string;
    searchParams: any;
}

export async function Permalink({ locale, rawPermalink, searchParams }: PermalinkProps) {
    const permalink = await getPermalink(rawPermalink);

    if (!permalink) {
        return `Permalink not found: '${permalink}'`;
    }

    const page = await fromPermalink({locale, searchParams, permalink});

    if(page) {
        return page;
    }

    return <div>{locale} + {rawPermalink} + {permalink?.model || "EMPTY"}</div>;
}