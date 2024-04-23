import { CountryYachtList } from "../components/CountryYachtList";
import { PermalinkModel } from "../enums/PermalinkModel";
import { PermalinkPageProps } from "../props/permalinkPageProps";

export async function fromPermalink(props: PermalinkPageProps) {
    switch(props.permalink.model) {
        case PermalinkModel.COUNTRIES_YACHT_LIST:
            return <CountryYachtList {...props} />
        default:
            return null;
    }
}