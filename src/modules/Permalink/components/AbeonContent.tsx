import { getContents } from "../../../fetch/queries/getContents";
import { PermalinkPageProps } from "../props/permalinkPageProps";

export async function AbeonContent({locale, permalink, searchParams}: PermalinkPageProps) {
    const data = await getContents(permalink.modelId);
    
    if(data.type === 1) {
        return (
            <section className="flex-1 w-full h-full flex flex-col">
                <article className="bg-white content-container m-auto w-full single-page my-10 p-20">
                    <div dangerouslySetInnerHTML={{__html: data.description}}/>
                </article>
            </section>
        );
    }

    const blocks = data.abeonBlocks?.map(item => (
        <article className="bg-white content-container m-auto w-full single-page">
          <div dangerouslySetInnerHTML={{__html: item.text.content}}/>
        </article>
    ))

    return (
        <section className="flex-1 w-full h-full flex flex-col">{blocks}</section>
    )
}