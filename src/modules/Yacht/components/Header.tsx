import { StarRating } from "@/components/StarRating";
import { HeaderData } from "../interfaces/YachtData";

interface HeaderProps {
    readonly data: HeaderData;
}

export default function Header({data}: HeaderProps) {
    return (
        <>
            <header>
                <h1 className="text-2xl text-gray-500">
                    <b>{data.modelName} <i>{data.yachtName}</i></b>
                    <small className="ml-2 text-xs font-semibold text-gray-400">({data.yachtId})</small>
                </h1>
                <small>{data.countryName}, <b className="text-sky-500 cursor-pointer hover:underline">{data.locationName}</b></small>
            </header>
            <div className="flex flex-col justify-end">
                {
                    data.showRating
                        ? <a href="#customer-reviews" className="cursor-pointer">
                            <StarRating rating={data.rating} />
                          </a>
                        : <></>
                }
            </div>
        </>
    )
}