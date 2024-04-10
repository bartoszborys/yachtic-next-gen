import { ReactNode } from "react";
import { BlockTitle } from "../blocks/BlockTile";
import { faAngleDoubleRight, faNewspaper, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { WhyUsItem } from "../../fetch/dto/blocks/WhyUsItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { HomepageTemplate } from "../../fetch/dto/blocks/HomepageTemplate";
import { HelpsItem } from "../../fetch/dto/blocks/HelpItem";

interface ThirdRowProps {
    helpsItems: HelpsItem[];
    whyUsItems: WhyUsItem[];
    homepage: HomepageTemplate;
}

export function ThirdRow({helpsItems, whyUsItems, homepage}: ThirdRowProps): ReactNode {
    const helpfulInformation = helpsItems.map(helpItem => {
        return (
            <a
                key={helpItem.order}
                href={helpItem.url.content}
                style={{ backgroundImage: `url(${helpItem.photo.fileUrl})` }}
                className="w-full flex flex-col text-white p-4 my-1 cursor-pointer h-[177px] bg-cover">
                <h3 className="text-2xl font-bold flex-1 text-shadow">{helpItem.header.content}</h3>
                <span className="text-end hover:underline">
                    <span className="text-shadow font-bold">More</span>
                    <FontAwesomeIcon className="text-xs mb-[1px]" icon={faAngleDoubleRight} />
                </span>
            </a>
        );
    })

    const whyUs = whyUsItems.sort((a, b) => a.order - b.order)
        .map(whyUsBlock => {
            const content = { __html: whyUsBlock.description.content };
            const header = { __html: whyUsBlock.header.content };
            const url = whyUsBlock.icon.fileUrl;

            return (
                <article key={whyUsBlock.order} className="flex">
                    <Image src={url} className="h-[86px] w-[86px]" width={86} height={86} alt={whyUsBlock.icon.type} />
                    <div className="flex flex-col mx-4 flex-1 text-justify">
                        <h3 className="text-lg mb-2 font-bold" dangerouslySetInnerHTML={header} />
                        <span className="text-xs text-gray-400" dangerouslySetInnerHTML={content} />
                    </div>
                </article>
            );
        });

    return (
        <>
            <article className="flex flex-col cursor-default">
                <BlockTitle icon={faQuestionCircle} name={homepage.whyUsTitle.content} />
                <article className="flex-1 md:grid md:grid-cols-2 md:grid-rows-3 md:gap-4">{whyUs}</article>
            </article>
            <article className="flex flex-col cursor-default">
                <BlockTitle icon={faNewspaper} name={homepage.helpsTitle.content} />
                {helpfulInformation}
            </article>
        </>
    )
}