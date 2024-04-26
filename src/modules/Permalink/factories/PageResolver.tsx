import { Yacht } from "@/modules/Yacht/Yacht";
import { AbeonContent } from "../components/AbeonContent";
import { CountryYachtList } from "../components/CountryYachtList";
import { PermalinkModel } from "../enums/PermalinkModel";
import { PermalinkPageProps } from "../props/permalinkPageProps";

export async function fromPermalink(props: PermalinkPageProps) {
    switch(props.permalink.model) {
        case PermalinkModel.COUNTRIES_YACHT_LIST:
            return <CountryYachtList {...props} />
        case PermalinkModel.ABEON_CONTENT:
            return <AbeonContent {...props} />
        case PermalinkModel.YACHT:
            return <Yacht {...props} />
        default:
            return null;
    }
}