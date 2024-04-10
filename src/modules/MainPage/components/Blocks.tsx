import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { ReactElement } from "react";
import { getBlocks } from "../fetch/queries/getBlocks";
import { BlockTitle } from "./blocks/BlockTile";
import { ThirdRow } from "./blocks-rows/ThirdRow";
import { FirstRow } from "./blocks-rows/FirstRow";
import { SecondRow } from "./blocks-rows/SecondRow";

export async function Blocks(): Promise<ReactElement> {
    const blocks = await getBlocks();

    const charteItemsHtml = { __html: blocks["easy-charter-items"][0].text.content };
    const homepage = blocks.homepage_template.pop() || (() => { throw new Error("Unknown state") })();
    const map = blocks.maps.pop() || (() => { throw new Error("Unknown state") })();

    return (
        <div className="flex flex-col">
            <section className="md:grid md:grid-cols-[1fr,1fr,1fr] md:gap-6 mb-8">
                <FirstRow homepage={homepage} map={map} />
            </section>

            <section className="md:grid md:grid-cols-[1fr,1fr,1fr] md:gap-6 mb-8">
                <SecondRow homepage={homepage} selectedBoatItems={blocks["select-yacht-items"]} popularItems={blocks["popular-items"]} />
            </section>

            <section className="md:grid md:grid-cols-[2fr,1fr] md:gap-12 mb-8">
                <ThirdRow homepage={homepage} helpsItems={blocks["helps-items"]} whyUsItems={blocks["why-us-items"]} />
            </section>
 
            <section className="flex flex-col mb-8">
                <BlockTitle icon={faThumbsUp} name={homepage.easyCharterTitle.content} />
                <article className="charter-items mt-4" dangerouslySetInnerHTML={charteItemsHtml} />
            </section>
        </div>
    );
}