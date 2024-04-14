'use client'

import { Popper } from "@mui/material";
import { ReactNode, useCallback, useRef, useState } from "react";

interface ActionMenuProps {
  children: ReactNode;
  button: ReactNode;
  className?: string;
  zIndex?: number;
  trigger?: "click" | "mouseover";
}

export default function ActionMenu({ children, zIndex = 0, button, className = "", trigger = "mouseover" }: ActionMenuProps): ReactNode {
  const container = useRef<HTMLDivElement>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = useCallback(() => {
    if (!container.current) {
      return;
    }
    setAnchorEl(container.current);
  }, []);

  const handleMouseEnter = useCallback(() => {
    if(trigger === "mouseover") {
      handleClick();
    }
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const open = Boolean(anchorEl);
  const id = open ? 'action-menu-pooper' : undefined;

  return (
    <>
      <div
        className={className}
        ref={container}
        aria-describedby={id}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleClose}>
        {button}
      </div>
      <Popper
        id={id}
        style={{zIndex}}
        open={open}
        anchorEl={anchorEl}
        placement="bottom-end"
        onClick={handleClose}
        onMouseLeave={handleClose}
        onMouseEnter={handleClick}>
          <div className="bg-white shadow-inner flex flex-col">
            {children}
          </div>
      </Popper>
    </>
  );
}