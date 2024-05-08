import { Title } from "./Title";

export interface HomepageTemplate {
    type: string;
    order: number;
    whyUsTitle: Title;
    firstMinuteTitle: Title;
    lastMinuteTitle: Title;
    teamTitle: Title;
    helpsTitle: Title;
    popularTitle: Title;
    selectYachtTitle: Title;
    easyCharterTitle: Title;
    opinionsTitle: Title;
}