import { ReactElement } from "react";
import { BlockTitle } from "./BlockTile";
import { faClock, faMapMarker } from "@fortawesome/free-solid-svg-icons";
import { YachtBlock } from "./YachtBlock";
import { HomepageTemplate } from "../../fetch/dto/blocks/HomepageTemplate";
import { MapItem } from "../../fetch/dto/blocks/MapItem";
import { getFirstLastMinute } from "../../fetch/queries/getFirstLastMinute";
import { FirstLastMinuteEnum } from "../../fetch/enums/FirstLastMinuteEnum";

export async function FirstRow({map, homepage}: {map: MapItem, homepage: HomepageTemplate}): Promise<ReactElement> {
    const firstLastMinute = await getFirstLastMinute();

    const firstMinute = firstLastMinute.models.filter(item => item.type === FirstLastMinuteEnum.FIRST_MINUTE);
    const lastMinute = firstLastMinute.models.filter(item => item.type === FirstLastMinuteEnum.LAST_MINUTE);

    const firstMinuteBlock = firstMinute.map(yacht => <YachtBlock key={yacht.id} yacht={yacht} />);
    const lastMinuteBlock = lastMinute.map(yacht => <YachtBlock key={yacht.id} yacht={yacht} />);

    return (
        <>
            <article className="flex flex-col cursor-default">
                <BlockTitle icon={faMapMarker} name={map.title.content} />
                <article className="flex flex-1 flex-col gap-4 bg-cover" style={{ backgroundImage: `url(${map.image.fileUrl})` }} />
            </article>
            <article className="flex flex-col cursor-default">
                <BlockTitle icon={faClock} name={homepage.firstMinuteTitle.content} />
                <div className="flex flex-col gap-3">{firstMinuteBlock}</div>
            </article>
            <article className="flex flex-col cursor-default">
                <BlockTitle icon={faClock} name={homepage.lastMinuteTitle.content} />
                <div className="flex flex-col gap-3">{lastMinuteBlock}</div>
            </article>
        </>
    );
}