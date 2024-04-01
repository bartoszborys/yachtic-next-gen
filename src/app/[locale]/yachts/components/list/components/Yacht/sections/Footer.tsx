import { faHeart, faList, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode } from "react";

export default function Footer(): ReactNode {
    return (
        <div className="flex text-sky-500 justify-evenly font-bold">
            <div className="hover:underline">
                <FontAwesomeIcon className="mr-1" icon={faHeart} />
                <span>Add to favourites</span>
            </div>
            <div className="hover:underline">
                <FontAwesomeIcon className="mr-1" icon={faPlus} />
                <span>Add to compare</span>
            </div>
            <div className="hover:underline">
                <FontAwesomeIcon className="mr-1" icon={faList} />
                <span>See details</span>
            </div>
        </div>
    );
}