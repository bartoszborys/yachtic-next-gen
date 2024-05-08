'use client'

import { options } from "@/modules/YachtsList/constants/urlQuery";
import { Order } from "@/modules/YachtsList/enums/order";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { parseAsString, useQueryState } from "nuqs";
import { ReactNode, useCallback, useMemo, useRef, useState } from "react";
import ActionMenu from "./ActionMenu";

export default function SortOrderMenu({ filterName }: { filterName: string }): ReactNode {
  const container = useRef<HTMLDivElement>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [value, setValue] = useQueryState(
    filterName,
    parseAsString
      .withDefault(Order.priceAsc)
      .withOptions(options)
  );
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  const itemSelected = useCallback((item: string) => {
    setValue(item);
  }, [setValue]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (!container.current) {
      return;
    }
    setAnchorEl(container.current);
  };

  const handleClose = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(null);
  };

  const orderOptions = useMemo(() => {
    return Object
      .values(Order)
      .map(item => <div className="p-2 bg-white hover:bg-gray-200 cursor-pointer" key={item} onClick={() => itemSelected(item)}>{item}</div>);
  }, [])

  const button = (
    <div
      ref={container}
      aria-describedby={id}
      className="bg-white text-xs p-2 flex transition-shadow duration-300 hover:shadow-xl"
      onMouseEnter={handleClick}
      onMouseLeave={handleClose}>
      <span className="font-normal flex flex-col justify-center text-center text-gray-500 pointer-events-none">PRICE:</span>
      <span className="flex flex-col justify-center mx-2 pointer-events-none">{value}</span>
      <span className="flex flex-col pointer-events-none">
        <FontAwesomeIcon icon={faCaretUp} />
        <FontAwesomeIcon icon={faCaretDown} />
      </span>
    </div>

  )

  return (
    <div> 
      <ActionMenu button={button} className="ml-3">
        {orderOptions}
      </ActionMenu>
    </div>
  );
}