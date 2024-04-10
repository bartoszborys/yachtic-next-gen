import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode } from "react";

export function YachtBlock({yacht}: {yacht: Yacht}): ReactNode {
    return (
        <div className="flex min-h-[181px] bg-white flex-1 relative">
            <a className="absolute w-full h-full cursor-pointer" href={yacht.permalink}/>
            <div className="flex flex-col flex-[2] bg-cover justify-between" style={{backgroundImage: `url(${yacht.image.src})`}}>
                <div className="flex w-full mt-4 justify-between">
                    <div className="bg-[#00a27d] text-white text-xs font-bold px-3 py-2 ">-{yacht.discount}%</div>
                    <div className="bg-white text-cyan-500 px-3 py-2 flex text-xs font-bold">
                        <FontAwesomeIcon icon={faStar} />
                        <span>{yacht.rating}</span>
                    </div>
                </div>
            </div>
            <div className="flex-[3] flex flex-col">
                <div className="font-bold text-[#00a0e3] flex flex-col p-2 overflow-hidden">
                    <h2 className="text-nowrap">{yacht.name} {yacht.modelName}</h2>
                    <span className="text-nowrap">{yacht.locationName}</span>
                </div>
                <div className="flex-1 grid grid-cols-2 p-2">
                    <span className="text-gray-400">Built</span>
                    <b>{yacht.year}</b>
                    <span className="text-gray-400">Length</span>
                    <b>{yacht.length} m</b>
                    <span className="text-gray-400">Persons</span>
                    <b>{yacht.berths}</b>
                </div>
                <div className="bg-[#00a27d] p-2 text-white font-bold text-center">
                    from {yacht.price.finalAmount} {yacht.price.finalCurrencySymbol}
                </div>
            </div>
        </div>
    );
}