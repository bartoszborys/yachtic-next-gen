import YachtContentSearches from "@/modules/Yacht/api/dto/YachtContentSearches";
import { faCheck, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMemo } from "react";

interface HighlightProps {
    readonly searches: YachtContentSearches[];
}

export function Highligts({searches}: HighlightProps) {
    const listItems = useMemo(() => {
        return searches.map(search => (
            <li key={search.id} className="text-xs text-gray-500">
                <FontAwesomeIcon className="text-sky-500 text-xl" icon={faCheck} />
                <span className="mx-1">{search.name}</span>
                <FontAwesomeIcon icon={faInfoCircle} />
            </li>
        ));
    }, searches);

    return (
        <ul>{listItems}</ul>
    )
}