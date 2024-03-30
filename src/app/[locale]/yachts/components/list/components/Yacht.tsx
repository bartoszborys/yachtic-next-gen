import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import YachtsData from "../../../types/YachtData";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { toExternalHref } from "@/navigation";

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
    "ease-in-out"
].join(" ");

export default function Yacht({ data }: { data: YachtsData }) {
    const redirect = () => {
        window.location.href = toExternalHref(data.url);
    }

    return (
        <div onClick={redirect} className={containerClass}>
            <img src={data.mainImage.src} />
            <div className="flex-1 flex flex-col text-sky-500 mx-2 my-1">
                <div className="flex flex-col">
                    <div className="flex flex-1 justify-between font-bold text-lg">
                        <div>
                            <span>{data.modelName}</span>
                            <span className="ml-1">{data.name}</span>
                            <span className="ml-1 text-sm font-normal text-gray-400">({data.id})</span>
                        </div>
                        <div>
                            <span>
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                            </span>
                            <span className="ml-1">{data.rating}</span>
                        </div>
                    </div>
                    <div className="flex flex-1 justify-between">
                        <div className="font-bold text-sm">
                            <span className="text-sm font-normal text-gray-400">{data.finalCountry.name},</span>
                            <a className="ml-1" href={data.url}>{data.finalLocation.name}</a>
                        </div>
                        <div className="text-xs text-gray-400 text-end">
                            <span>Reviews</span>
                            <span className="ml-1">{data.opinionsCount}</span>
                        </div>
                    </div>
                </div>
                <div className="flex-1 flex">
                    <div className="flex-1 flex flex-col">
                        <div className="flex text-center text-sm justify-between m-2 font-bold text-black">
                            <div className="flex flex-col">
                                <div className="flex flex-col m-1">
                                    <span className="text-gray-400">Berths</span>
                                    <span>{data.berths}</span>
                                </div>
                                <div className="flex flex-col m-1">
                                    <span className="text-gray-400">Baths</span>
                                    <span>{data.bathrooms}</span>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <div className="flex flex-col m-1">
                                    <span className="text-gray-400">Cabins</span>
                                    <span>{data.cabins}</span>
                                </div>
                                <div className="flex flex-col m-1">
                                    <span className="text-gray-400">Built</span>
                                    <span>{data.year}</span>
                                </div>
                            </div>
                            <div className="flex flex-col text-left">
                                <div className="flex flex-col m-1">
                                    <span className="text-gray-400">Length</span>
                                    <span>{data.length}</span>
                                </div>
                                <div className="flex flex-col m-1">
                                    <span className="text-gray-400">Operator</span>
                                    <a href={`http://localhost:8083/${data.company.url}`}>{data.company.name}</a>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap">
                            {data.searches.map(item => (<img
                                key={item.id}
                                className={"cursor-pointer w-8 h-8 rounded bg-[#e6f2f9] m-[2px] p-1 border-2"}
                                alt=""
                                src={item.image.src}
                            />))}
                        </div>
                    </div>
                    <div className="w-[280px] flex flex-col">
                        <div className="flex">
                            <div className="flex flex-1">
                                <div className="bg-gray-500">
                                    {data.price.date.toLocaleString()} ({data.price.days})
                                </div>
                                <div className="bg-gray-400">

                                </div>
                            </div>
                        </div>
                        <div>

                        </div>
                    </div>
                </div>
                <div>
                    <span>{data.url}</span>
                </div>
            </div>
        </div>
    );
}