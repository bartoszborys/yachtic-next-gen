import { PriceData } from "@/modules/YachtsList/types/YachtData";
import { ReactNode } from "react";
import SubPriceBox from "./LesserPriceBox";
import MainPriceBox from "./MainPriceBox";

export default function Price({ details: { leftBottom, main, rightBottom } }: { details: PriceData }): ReactNode {
    return (
        <div className="sm:w-[300px] flex flex-col">
            <div className="flex mx-2">
                <div className="flex flex-col flex-1">
                    <div className="text-end text-[#656565] mb-3 ">
                        <MainPriceBox price={main} />
                    </div>
                    <div className="flex text-center">
                        <div className="flex-1 text-[#656565] mr-4">
                            <SubPriceBox price={leftBottom} currency={main.currency}/>
                        </div>
                        <div className="flex-1 text-[#656565]">
                            <SubPriceBox price={rightBottom} currency={main.currency}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}