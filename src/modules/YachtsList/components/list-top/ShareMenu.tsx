'use client'

import { faShareAlt } from "@fortawesome/free-solid-svg-icons/faShareAlt";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode } from "react";
import ActionMenu from "./ActionMenu";

export default function ShareMenu(): ReactNode {
  const texts = [
    "SHARE ON FACEBOOK",
    "SEND",
    "COPY LINK",
  ]
  const button = (
    <div className="bg-white px-2 flex transition-shadow duration-300 hover:shadow-xl pointer-events-none">
      <FontAwesomeIcon className="my-auto font-normal text-lg mr-2 text-cyan-500 pointer-events-none" icon={faShareAlt} />
      <span className="my-auto pointer-events-none">SHARE WITH FRIENDS</span>
    </div>
  )

  const options = (
    <>
      {texts.map(text => <div key={text} className="min-w-64 text-cyan-500 hover:underline text-xs font-bold p-3 cursor-pointer">{text}</div>)}
    </>
  );

  return (
    <>
      <ActionMenu button={button} className="flex">
        {options}  
      </ActionMenu>
    </>
  );
}