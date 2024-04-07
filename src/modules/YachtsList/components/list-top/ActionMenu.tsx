'use client'

import { Popper } from "@mui/material";
import { ReactNode, useCallback, useRef, useState } from "react";

interface ActionMenuProps {
  children: ReactNode,
  button: ReactNode,
  className?: string
}

export default function ActionMenu({ children, button, className = "" }: ActionMenuProps): ReactNode {
  const container = useRef<HTMLDivElement>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = useCallback(() => {
    if (!container.current) {
      return;
    }
    setAnchorEl(container.current);
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
        onMouseEnter={handleClick}
        onMouseLeave={handleClose}>
        {button}
      </div>
      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        placement="bottom-end"
        onMouseLeave={handleClose}
        onMouseEnter={handleClick}>
          <div className="bg-white shadow-inner flex flex-col">
            {children}
          </div>
      </Popper>
    </>
  );
}