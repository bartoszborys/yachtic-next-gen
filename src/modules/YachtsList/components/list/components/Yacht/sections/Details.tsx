import { YachtDetails } from "@/modules/YachtsList/types/YachtData";
import { ReactNode } from "react";

export default function Details({ details }: { details: YachtDetails }): ReactNode {
    return (
        <div className="flex-1 flex flex-col mx-2">
            <div className="flex text-center text-xs justify-between font-bold text-black">
                <div className="flex-[2] flex flex-col">
                    <div className=" flex flex-col m-1">
                        <span className="text-gray-400">Berths</span>
                        <span>{details.berths}</span>
                    </div>
                    <div className="flex flex-col m-1">
                        <span className="text-gray-400">Baths</span>
                        <span>{details.baths}</span>
                    </div>
                </div>
                <div className="flex-[2] flex flex-col">
                    <div className="flex flex-col m-1">
                        <span className="text-gray-400">Cabins</span>
                        <span>{details.cabins}</span>
                    </div>
                    <div className="flex flex-col m-1">
                        <span className="text-gray-400">Built</span>
                        <span>{details.built}</span>
                    </div>
                </div>
                <div className="flex-[2] sm:flex-[4] flex flex-col sm:text-left ml-5">
                    <div className="flex flex-col m-1">
                        <span className="text-gray-400">Length</span>
                        <span>{details.length} m</span>
                    </div>
                    <div className="flex flex-col m-1">
                        <span className="text-gray-400">Operator</span>
                        <a className="text-sky-500 hover:underline" href={`http://localhost:8083/${details.operatorUrl}`}>{details.operator}</a>
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap my-3 mx-1 justify-center sm:justify-start">
                {details.searches.map(item => (<img
                    key={item.id}
                    className={"cursor-pointer w-8 h-8 rounded bg-[#e6f2f9] m-[2px] p-1 border-2"}
                    alt=""
                    src={item.src}
                />))}
            </div>
        </div>
    );
}