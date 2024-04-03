import { getYachts } from "../../data/list";
import Yacht from "./components/Yacht/Yacht";
import { fromYachtData } from "../../factories/YachtDetailsFactory";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareAlt } from "@fortawesome/free-solid-svg-icons";
import { useTranslations } from "next-intl";
import { apiYachtsListFromFilter } from "../../factories/UrlParamsFactory";

export default async function List({searchParams}: {searchParams: {[key: string]: string}}) {
    const params = apiYachtsListFromFilter(searchParams);
    const t = useTranslations();
    const yachts = await getYachts(params);

    return (
        <>
            <div className="w-100 h-[86px] text-xs p-4 bg-white font-bold text-gray-500">FILTERS (REMOVE ALL FILTERS)</div>
            <div className="w-100 my-2 flex justify-end text-xs font-bold">
                <div>Translation: {t("I_NEED_A_SKIPPER")}</div>
                <div className="bg-white mr-4 p-2 flex transition-shadow duration-300 hover:shadow-xl cursor-pointer">
                    <FontAwesomeIcon className="font-normal text-lg mr-2 text-cyan-500" icon={faShareAlt} />
                    <span>SHARE WITH FRIENDS</span>
                </div>
                <div className="bg-white p-2 transition-shadow duration-300 hover:shadow-xl cursor-pointer">
                    <span className="font-normal text-gray-500">PRICE:</span>
                    <span>LOWEST FIRST</span>
                </div>
            </div>
            <div className="d-flex flex-col">
                {yachts.map((yacht, index) => <Yacht key={yacht.id + "-" + index} data={fromYachtData(yacht)} />)}
            </div>
        </>
    );
}