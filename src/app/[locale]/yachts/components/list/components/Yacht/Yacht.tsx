import { toExternalHref } from "@/navigation";
import { Header } from "./sections/Header";
import Details from "./sections/Details";
import Price from "./sections/Price";
import { YachtData } from "@/app/[locale]/yachts/types/YachtData";
import Footer from "./sections/Footer";
import { YachtImage } from "./sections/Image";

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
    "md:flex-row",
    "flex-col",
    "relative",
].join(" ");

export default function Yacht({ data }: { data: YachtData }) {
    return (
        <div className={containerClass}>
            <a className="absolute w-full h-full" href={toExternalHref(data.header.locationUrl)}/>
            <YachtImage image={data.image}/>
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