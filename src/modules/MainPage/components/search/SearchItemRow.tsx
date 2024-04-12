import { ReactNode, useCallback } from "react";
import { SearchItem } from "../../searchItem/SearchItem";

interface SearchItemRowProps {
    item: SearchItem;
    select: (item: SearchItem) => void;
}

export function SearchItemRow({item, select: selectSearch}: SearchItemRowProps): ReactNode {
    const handleClick = useCallback(() => selectSearch(item), []);

    return (
        <div onClick={handleClick} className="cursor-pointer flex gap-3 p-1 px-2 bg-white hover:bg-[#00a27d] text-[#00a0e3] hover:text-white duration-[250ms] transition-colors">
            <span>{item.data.name}</span>
            <span className="text-xs my-auto italic" style={{color: item.getCssColor()}}>{item.data.elementType}</span>
        </div>
    );
}