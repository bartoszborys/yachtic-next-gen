import YachtContentDetials from "@/modules/Yacht/api/dto/YachtContentDetails";
import { useTranslations } from "next-intl";

interface ContentProps {
    readonly data: YachtContentDetials;
}

export default function Content({ data }: ContentProps) {
    const t = useTranslations("Yacht.YachtContent")
    const toShow = [
        "year",
        "length",
        "waterTank",
        "berths",
        "bathrooms",
        "cabins",
        "maxPersons",
    ];

    return Object.entries(data)
        .filter(
            ([key,]) => toShow.includes(key)
        )
        .map(
            ([key, value]) => (
                <div className="flex justify-between text-sm" key={key}>
                    <span className="text-gray-400">{t(key)}</span>
                    <b>{value}</b>
                </div>
            )
        );
}