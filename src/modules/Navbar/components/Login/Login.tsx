'use client'

import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { ReactElement, useState } from "react";
import { OAuthButton } from "./components/OAuthButton";
import { LoginTranslations } from "./LoginTranslations";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

interface LoginProps {
    t: LoginTranslations;
}

export function Login({t}: LoginProps): ReactElement {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <div onClick={handleOpen} className="text-xs px-3 flex flex-col justify-center border-r border-gray-200">
                <div className="text-sky-500 font-bold flex hover:underline cursor-pointer select-none">{t.LOG_IN}</div>
            </div>
            <Modal
                disableScrollLock={true}
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 450,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    outline: "none",
                }}>
                    <div className="flex flex-col gap-4 text-center">
                        <div className="flex justify-between">
                            <b>{t.LOG_IN}</b>
                            <FontAwesomeIcon onClick={handleClose} icon={faXmark} className="transition-all hover:rotate-180 duration-500 text-[#0ba4e4] hover:text-red-600 cursor-pointer" />
                        </div>
                        <OAuthButton text={t.CONTINUE_FACEBOOK} />
                        <OAuthButton text={t.CONTINUE_GOOGLE} />
                        <OAuthButton text={t.CONTINUE_APPLE} />
                        <div className="flex my-2">
                            <hr className="flex-1 my-auto" />
                            <span className="text-gray-400 mx-2">{t.OR}</span>
                            <hr className="flex-1 my-auto" />
                        </div>
                        <h4 className="font-semibold">{t.LOGIN_HEADER_TEXT}</h4>
                        <div className="flex flex-col gap-1">
                            <input type="email" className="bg-[#e6f2f9] p-2 rounded text-xs" placeholder={t.LOGIN_PLACEHOLDER}/>
                            <input type="password" className="bg-[#e6f2f9] p-2 rounded text-xs" placeholder={t.PASSWORD_PLACEHOLDER}/>
                        </div>
                        <div className="flex justify-between">
                            <a className="text-xs font-semibold cursor-pointer text-[#0ba4e4] hover:underline">{t.FORGOTTEN_PASSWORD}</a>
                            <button className="bg-[#0ba4e4] font-semibold text-sm text-white px-4 py-2">{t.LOG_IN}</button>
                        </div>
                        <span className="text-xs">{t.DONT_HAVE_ACCOUNT} <a className="font-semibold cursor-pointer text-[#0ba4e4] hover:underline">{t.SIGN_UP}</a></span>
                        <span className="text-[11px] text-gray-500">{t.SIGNING_INFO} <a className="font-semibold cursor-pointer text-[#0ba4e4] hover:underline">{t.GENERAL_CONDITIONS}</a></span>
                    </div>
                </Box>
            </Modal>
        </>
    )
}