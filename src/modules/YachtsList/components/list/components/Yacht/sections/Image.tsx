import { ImageData } from "@/modules/YachtsList/types/YachtData";
import Image from "next/image";
import { ReactNode } from "react";

export function YachtImage({ image }: { image: ImageData; }): ReactNode {
    return (
        <div className="flex flex-col justify-center relative min-w-[256px] min-h-[226px] w-auto h-auto">
            <div className="absolute text-sm flex flex-col top-2 text-white">
                {image.isRecommended ? <div className="bg-orange-600 px-2 py-1 mb-2">Recommended</div> : <></>}
                {image.isOpportunity ? <div className="bg-orange-600 px-2 py-1 mb-2">The best choice!</div> : <></>}
                {image.shouldShowFirstInstallmentPercentOfTotal ? <div className="bg-[#00a0e3] px-2 py-1 mb-2">First rate {image.firstInstallmentPercentOfTotal}%</div> : <></>}
            </div>
            <Image src={image.mainImageUrl} className="w-auto h-auto" alt="Yacht image" width={256} height={226}/>
        </div>
    );
}