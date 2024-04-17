'use client'

import { Button, CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { ReactElement, useEffect, useState, useTransition } from "react";
import { OAuthButton } from "./OAuthButton";
import { LoginTranslations } from "../../translations/LoginTranslations";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { executeLogin } from "../../fetch/commands/executeLogin";
import getLoggedUser from "../../fetch/queries/getLoggedUser";
import { useRouter } from "next/navigation";
import { PathParamsContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime";

interface LoginProps {
    t: LoginTranslations;
}

export function Login({t}: LoginProps): ReactElement {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [isPending, startTransition] = useTransition();

    const handleLogin = async () => {
        startTransition(async () => {
            await executeLogin({email: "szweda@cyberstudio.pl", password: "sledzik1"});
            router.refresh();
            handleClose();
        });
    }

    return (
        <>
            {
                isPending
                ? <CircularProgress color="inherit" className="mx-5 text-gray-500" variant="indeterminate" size={20} thickness={4} />
                : <div onClick={handleOpen} className="text-sky-500 font-bold flex hover:underline cursor-pointer select-none">{t.LOG_IN}</div>
            }
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
                        <form className="flex flex-col gap-1">
                            <input type="email" className="bg-[#e6f2f9] p-2 rounded text-xs" placeholder={t.LOGIN_PLACEHOLDER}/>
                            <input type="password" className="bg-[#e6f2f9] p-2 rounded text-xs" placeholder={t.PASSWORD_PLACEHOLDER}/>
                        </form>
                        <div className="flex justify-between">
                            <a className="text-xs font-semibold cursor-pointer text-[#0ba4e4] hover:underline">{t.FORGOTTEN_PASSWORD}</a>
                            <button onClick={handleLogin} className="bg-[#0ba4e4] font-semibold text-sm text-white px-4 py-2">{t.LOG_IN}</button>
                        </div>
                        <span className="text-xs">{t.DONT_HAVE_ACCOUNT} <a className="font-semibold cursor-pointer text-[#0ba4e4] hover:underline">{t.SIGN_UP}</a></span>
                        <span className="text-[11px] text-gray-500">{t.SIGNING_INFO} <a className="font-semibold cursor-pointer text-[#0ba4e4] hover:underline">{t.GENERAL_CONDITIONS}</a></span>
                    </div>
                </Box>
            </Modal>
        </>
    )
}