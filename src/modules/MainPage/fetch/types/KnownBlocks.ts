import { HomepageTemplate } from "../dto/blocks/HomepageTemplate";
import { MapItem } from "../dto/blocks/MapItem";
import { OpinionItem } from "../dto/blocks/OpinionItem";
import { PopularItem } from "../dto/blocks/PopularItem";
import { SelectYachtItem } from "../dto/blocks/SeletYachtItem";
import { WhyUsItem } from "../dto/blocks/WhyUsItem";
import { HelpsItem } from "../dto/blocks/HelpItem";
import { EasyCharterItem } from "../dto/blocks/EasyCharter";

export type KnownBlocks = {
    "easy-charter-items": EasyCharterItem[];
    "helps-items": HelpsItem[];
    "homepage_template": HomepageTemplate[];
    "maps": MapItem[];
    "opinions-items": OpinionItem[];
    "popular-items": PopularItem[];
    "select-yacht-items": SelectYachtItem[];
    "why-us-items": WhyUsItem[];
};