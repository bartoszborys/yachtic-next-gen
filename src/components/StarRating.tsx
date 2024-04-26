import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function StarRating({rating, className = ""}: {rating: number, className?: string}) {
    return (
        <div className={`${className} text-sky-500 font-bold text-lg`}>
            <span>
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
            </span>
            <span className="ml-1">{rating}</span>
        </div>
    )
}