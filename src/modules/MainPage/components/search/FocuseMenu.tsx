'use client'

import { ReactElement, useCallback, useRef, useState } from "react";
import Popper from "@mui/material/Popper";

interface Props {
    children: ReactElement;
    className?: string;
    popper: ReactElement;
}

export function FocusMenu({children, className, popper}: Props): ReactElement {
    const container = useRef<HTMLDivElement>(null);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const id = open ? 'location-picker-pooper' : undefined;

    const handleFocus = useCallback(() => {
        if (!container.current) {
          return;
        }
        setAnchorEl(container.current);
      }, []);
    
      const handleBlur = useCallback(() => {
        setTimeout(() => setAnchorEl(null), 200);
      }, []);

    return (
        <>
            <div
                className={className}
                ref={container}
                aria-describedby={id}
                onClick={handleFocus}
                onFocus={handleFocus}
                onBlur={handleBlur}>
                {children}
            </div>
            <Popper
                id={id}
                open={open}
                anchorEl={anchorEl}
                placement="bottom-start">
                {popper}
            </Popper>
        </>
    )
}