import { ReactElement } from "react";
import { BlockTitle } from "./BlockTile";
import { faAnchor, faHeart, faPencil } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { HomepageTemplate } from "../../fetch/dto/blocks/HomepageTemplate";
import { PopularItem } from "../../fetch/dto/blocks/PopularItem";
import { SelectYachtItem } from "../../fetch/dto/blocks/SeletYachtItem";
import { getBlog } from "../../fetch/queries/getBlog";
import { Blog } from "./Blog";

interface SecondRowProps {
    homepage: HomepageTemplate;
    popularItems: PopularItem[];
    selectedBoatItems: SelectYachtItem[];
}

export async function SecondRow({homepage, popularItems, selectedBoatItems}: SecondRowProps): Promise<ReactElement> {

    const popular = popularItems.map(item => {
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

    const selectedBoat = selectedBoatItems.map(item => {
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

    return (
        <>
            <article className="flex flex-col cursor-default">
                <BlockTitle icon={faHeart} name={homepage.popularTitle.content} />
                <article className="flex flex-col gap-4">{popular}</article>
            </article>
            <article className="flex flex-col cursor-default">
                <BlockTitle icon={faPencil} name={"BLOG"} />
                <article className="flex flex-1 flex-col relative">
                    <Blog />
                </article>
            </article>
            <article className="flex flex-col cursor-default">
                <BlockTitle icon={faAnchor} name={homepage.selectYachtTitle.content} />
                <article className="flex flex-col gap-4">{selectedBoat}</article>
            </article>
        </>
    )
}