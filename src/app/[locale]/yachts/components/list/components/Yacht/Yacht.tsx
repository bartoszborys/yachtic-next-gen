import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import YachtsData from "../../../../types/ApiYachtData";
import { faHeart, faList, faPlus, faStar } from "@fortawesome/free-solid-svg-icons";
import { toExternalHref } from "@/navigation";
import { Header } from "./sections/Header";
import Details from "./sections/Details";
import Price from "./sections/Price";
import { YachtData } from "@/app/[locale]/yachts/types/YachtData";
import Footer from "./sections/Footer";

const containerClass = [
    "cursor-pointer",
    "flex",
    "my-4",
    "bg-white",
    "border",
    "border-transparent",
    "hover:border-gray-400",
    "hover:bg-gray-100",
    "transition",
    "duration-300",
    "ease-in-out",
    "sm:flex-row",
    "flex-col"
].join(" ");

export default function Yacht({ data }: { data: YachtData }) {
    const redicrect =  () => window.location.href = toExternalHref(data.header.locationUrl);

    return (
        <div onClick={redicrect} className={containerClass}>
            <div className="flex flex-col justify-center relative">
                <div className="absolute text-sm flex flex-col top-2 text-white">
                    {data.image.isRecommended ? <div className="bg-orange-600 px-2 py-1 mb-2">Recommended</div> : <></>}
                    {data.image.isOpportunity ? <div className="bg-orange-600 px-2 py-1 mb-2">The best choice!</div> : <></>}
                    {data.image.shouldShowFirstInstallmentPercentOfTotal ? <div className="bg-[#00a0e3] px-2 py-1 mb-2">First rate {data.image.firstInstallmentPercentOfTotal}%</div> : <></>}
                </div>
                <img src={data.image.mainImageUrl} />
            </div>
            <div className="flex flex-1 flex-col px-1">
                <div className="flex-1 flex flex-col text-sky-500 px-2 pb-1">
                    <Header details={data.header} />
                </div>
                <div className="flex-1 flex flex-col sm:flex-row">
                    <Details details={data.details} />
                    <Price details={data.price} />
                </div>
                <div className="mb-1">
                    <Footer/>
                </div>
            </div>
        </div>
    );
}