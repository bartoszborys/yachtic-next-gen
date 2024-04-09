import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faAnchor, faAngleDoubleRight, faClock, faHeart, faMapMarker, faNewspaper, faPencil, faQuestion, faQuestionCircle, faSign, faStar, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { ReactElement, ReactNode } from "react";
import { getBlocks } from "../fetch/queries/getBlocks";
import { ApiFetch } from "@/fetch/ApiFetch";
import { Button } from "@mui/material";

function BlockTitle({ name, icon }: { name: string, icon: IconProp }): ReactNode {
    return (
        <div className="flex gap-2 mb-4">
            <FontAwesomeIcon className="text-sky-500 text-lg my-auto" icon={icon} />
            <h2 className="font-bold text-xl my-auto">{name}</h2>
        </div>
    )
}

function YachtBlock({yacht}: {yacht: Yacht}): ReactNode {
    return (
        <div className="flex min-h-[181px] bg-white flex-1">
            <div className="flex flex-col flex-[2] bg-cover justify-between" style={{backgroundImage: `url(${yacht.image.src})`}}>
                <div className="flex w-full mt-4 justify-between">
                    <div className="bg-[#00a27d] text-white text-xs font-bold px-3 py-2 ">-{yacht.discount}%</div>
                    <div className="bg-white text-cyan-500 px-3 py-2 flex text-xs font-bold">
                        <FontAwesomeIcon icon={faStar} />
                        <span>{yacht.rating}</span>
                    </div>
                </div>
            </div>
            <div className="flex-[3] flex flex-col">
                <div className="font-bold text-[#00a0e3] flex flex-col p-2 overflow-hidden">
                    <h2 className="text-nowrap">{yacht.name} {yacht.modelName}</h2>
                    <span className="text-nowrap">{yacht.locationName}</span>
                </div>
                <div className="flex-1 grid grid-cols-2 p-2">
                    <span className="text-gray-400">Built</span>
                    <b>{yacht.year}</b>
                    <span className="text-gray-400">Length</span>
                    <b>{yacht.length} m</b>
                    <span className="text-gray-400">Persons</span>
                    <b>{yacht.berths}</b>
                </div>
                <div className="bg-[#00a27d] p-2 text-white font-bold text-center">
                    from {yacht.price.finalAmount} {yacht.price.finalCurrencySymbol}
                </div>
            </div>
        </div>
    );
}

export async function Blocks(): Promise<ReactElement> {
    const blocks = await getBlocks();
    const result = (await (await fetch("https://blog.yachtic.com/wp-json/wp/v2/posts/?per_page=1&order=desc&lang=en")).json())[0];
    const firstLastMinute = await ApiFetch<{models: Yacht[]}>("yachts/first-last-minute?currencyId=2");

    const firstMinute = firstLastMinute.models.filter(item => item.type === 1);
    const lastMinute = firstLastMinute.models.filter(item => item.type === 2);

    const firstMinuteBlock = firstMinute.map(yacht => <YachtBlock key={yacht.id} yacht={yacht} />);
    const lastMinuteBlock = lastMinute.map(yacht => <YachtBlock key={yacht.id} yacht={yacht} />);

    const charteItemsHtml = { __html: blocks["easy-charter-items"][0].text.content };
    const blogHTML = { __html: result.excerpt.rendered };
    const homepage = blocks.homepage_template.pop() || (() => { throw new Error("Unknown state") })();
    const map = blocks.maps.pop() || (() => { throw new Error("Unknown state") })();

    const popular = blocks["popular-items"].map(item => {
        return (
            <a
                key={item.order}
                href={item.url.content}
                className="bg-cover h-[100px] flex flex-col gap-4"
                style={{ backgroundImage: `url(${item.photo.fileUrl})` }}>
                <span className="text-shadow m-auto text-center hover:underline text-white cursor-pointer font-bold text-xl">{item.header.content}</span>
            </a>
        )
    })

    const selectedBoat = blocks["select-yacht-items"].map(item => {
        return (
            <a
                key={item.order}
                href={item.url.content}
                className="bg-cover h-[100px] flex"
                style={{ backgroundImage: `url(${item.photo.fileUrl})` }}>
                <span className="text-shadow m-auto text-center hover:underline text-white cursor-pointer font-bold text-xl">{item.header.content}</span>
            </a>
        )
    })

    const helpfulInformation = blocks["helps-items"].map(helpItem => {
        return (
            <a
                key={helpItem.order}
                href={helpItem.url.content}
                style={{ backgroundImage: `url(${helpItem.photo.fileUrl})` }}
                className="w-full flex flex-col text-white p-4 my-1 cursor-pointer h-[177px] bg-cover">
                <h3 className="text-2xl font-bold flex-1 text-shadow">{helpItem.header.content}</h3>
                <span className="text-end hover:underline">
                    <span className="text-shadow">More</span>
                    <FontAwesomeIcon className="text-xs mb-[1px]" icon={faAngleDoubleRight} />
                </span>
            </a>
        );
    })

    const whyUs = blocks["why-us-items"]
        .sort((a, b) => a.order - b.order)
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
        <div className="flex flex-col">
            <section className="md:grid md:grid-cols-[1fr,1fr,1fr] md:gap-6 mb-8">
                <article className="flex flex-col cursor-default">
                    <BlockTitle icon={faMapMarker} name={map.title.content} />
                    <article className="flex flex-1 flex-col gap-4 bg-cover" style={{ backgroundImage: `url(${map.image.fileUrl})` }} />
                </article>
                <article className="flex flex-col cursor-default">
                    <BlockTitle icon={faClock} name={homepage.firstMinuteTitle.content} />
                    <div className="flex flex-col gap-3">
                        {firstMinuteBlock}
                    </div>
                </article>
                <article className="flex flex-col cursor-default">
                    <BlockTitle icon={faClock} name={homepage.lastMinuteTitle.content} />
                    <div className="flex flex-col gap-3">
                        {lastMinuteBlock}
                    </div>
                </article>
            </section>
            <section className="md:grid md:grid-cols-[1fr,1fr,1fr] md:gap-6 mb-8">
                <article className="flex flex-col cursor-default">
                    <BlockTitle icon={faHeart} name={homepage.popularTitle.content} />
                    <article className="flex flex-col gap-4">{popular}</article>
                </article>
                <article className="flex flex-col cursor-default">
                    <BlockTitle icon={faPencil} name={"BLOG"} />
                    <article className="flex flex-1 flex-col relative">
                        <Image src={result.yoast_head_json.og_image[0].url} className="w-full min-h-[220px]" width={400} height={220} alt="blog-img" />
                        <div className="bg-white p-4 text-lg font-bold text-sky-500">{result.title.rendered}</div>
                        <div className="bg-white p-4 flex-1 text-xs text-gray-400" dangerouslySetInnerHTML={blogHTML} />
                        <a href={result.yoast_head_json.og_url} className="bg-sky-500 p-2 font-bold text-white text-center cursor-pointer">READ MORE...</a>
                    </article>
                </article>
                <article className="flex flex-col cursor-default">
                    <BlockTitle icon={faAnchor} name={homepage.selectYachtTitle.content} />
                    <article className="flex flex-col gap-4">{selectedBoat}</article>
                </article>
            </section>

            <section className="md:grid md:grid-cols-[2fr,1fr] md:gap-12 mb-8">
                <article className="flex flex-col cursor-default">
                    <BlockTitle icon={faQuestionCircle} name={homepage.whyUsTitle.content} />
                    <article className="flex-1 md:grid md:grid-cols-2 md:grid-rows-3 md:gap-4">{whyUs}</article>
                </article>
                <article className="flex flex-col cursor-default">
                    <BlockTitle icon={faNewspaper} name={homepage.helpsTitle.content} />
                    {helpfulInformation}
                </article>
            </section>
 
            <section className="flex flex-col mb-8">
                <BlockTitle icon={faThumbsUp} name={homepage.easyCharterTitle.content} />
                <article className="charter-items mt-4" dangerouslySetInnerHTML={charteItemsHtml} />
            </section>
        </div>
    );
}