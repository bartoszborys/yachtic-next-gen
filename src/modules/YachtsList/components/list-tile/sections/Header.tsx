import { StarRating } from "@/components/StarRating";
import { YachtHeaderDetails } from "@/modules/YachtsList/types/YachtData";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode } from "react";

export function Header({ details }: { details: YachtHeaderDetails }): ReactNode {
    return (
        <div className="flex flex-col">
            <div className="flex flex-1 justify-between font-bold text-lg">
                <div className="hover:underline">
                    <span>{details.modelName}</span>
                    <span className="ml-1">{details.yachtName}</span>
                    <span className="ml-1 text-sm font-normal text-gray-400">({details.id})</span>
                </div>
                {
                    details.showRating
                    ? <StarRating rating={details.rating} />
                    : <></>
                }
            </div>
            <div className="flex flex-1 justify-between">
                <div className="font-bold text-sm">
                    <span className="text-sm font-normal text-gray-400">{details.countryName},</span>
                    <a className="ml-1 hover:underline" href={details.locationUrl}>{details.locationName}</a>
                </div>
                {
                    details.showRating
                    ? <div className="text-xs text-gray-400 text-end">
                        <span>Reviews</span>
                        <span className="ml-1">{details.opinionsCount}</span>
                      </div>
                    : <></>
                }
            </div>
        </div>
    );
}