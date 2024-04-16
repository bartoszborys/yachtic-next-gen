import { faBars, faHeart, faList, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import dynamic from "next/dynamic";
import { ReactElement } from "react";
import { getLanguages } from "./fetch/queries/getLanguages";
import { getCurrencies } from "./fetch/queries/getCurrencies";
import { cookies } from "next/headers";
import { CookiesKeys } from "@/enums/CookiesKeys";
import { Login } from "./components/Login/Login";
import { LoginTranslations } from "./components/Login/LoginTranslations";
import { t } from "i18next";
import { getTranslations } from "next-intl/server";

const LanguageChange = dynamic(() => import('./components/Language/LanguageChange'));
const CurrencyChange = dynamic(() => import('./components/Currency/CurrencyChange'));

const styles = {
    navbarCurrency: `text-gray-500 font-bold`,
    navbarLink: `text-sky-500 font-bold flex hover:underline cursor-pointer select-none`,
    navbarItem: `text-xs px-3 flex flex-col justify-center border-r border-gray-200`,
    navbarIcon: `w-2.5 mr-1`,
    navbarMobileIcon: `text-sky-500 cursor-pointer text-3xl font-bold m-auto mx-1`,
};

interface NavbarProps {
    locale: string;
}

export default async function Navbar({locale}: NavbarProps): Promise<ReactElement> {
    const [languages, currencies] = await Promise.all([
        getLanguages(),
        getCurrencies()
    ]);

    const t = await getTranslations();

    const currencyId = cookies().get(CookiesKeys.CURRENCY_ID)?.value || "2";
    const currency = currencies.find(item => item.id.toString() === currencyId) || (() => {throw new Error("Currency not found")})();
    const selectedLanguage = languages.find(item => item.name === locale) || (() => {throw new Error("SelectedLanguage is not set!")})();

    const loginTranslations = {
        CONTINUE_FACEBOOK: t("CONTINUE_FACEBOOK"),
        CONTINUE_GOOGLE: t("CONTINUE_GOOGLE"),
        CONTINUE_APPLE: t("CONTINUE_APPLE"),
        OR: t("OR"),
        LOGIN_HEADER_TEXT: t("LOGIN_HEADER_TEXT"),
        LOGIN_PLACEHOLDER: t("LOGIN_PLACEHOLDER"),
        PASSWORD_PLACEHOLDER: t("PASSWORD_PLACEHOLDER"),
        FORGOTTEN_PASSWORD: t("FORGOTTEN_PASSWORD"),
        LOG_IN: t("LOG_IN"),
        DONT_HAVE_ACCOUNT: t("DONT_HAVE_ACCOUNT"),
        SIGN_UP: t("SIGN_UP"),
        SIGNING_INFO: t("SIGNING_INFO"),
        GENERAL_CONDITIONS: t("GENERAL_CONDITIONS"),
    } as LoginTranslations;

    return (
        <nav className="bg-white flex justify-center w-full h-16 fixed z-50 px-3">
            <div className="content-container flex justify-between lg:justify-center w-full">
                <Image className="w-[185px] height-[48px] flex" alt="" src='/logo.svg' width={25} height={25} />
                <div className="flex lg:hidden">
                    <FontAwesomeIcon icon={faSearch} className={styles.navbarMobileIcon} />
                    <FontAwesomeIcon icon={faBars} className={styles.navbarMobileIcon} />
                </div>
                <div className="w-full container lg:flex hidden">
                    <div className="flex-1"></div>
                    <div className={styles.navbarItem}>
                        <LanguageChange selectedLanguage={selectedLanguage} languages={languages} />
                    </div>
                    <div className={styles.navbarItem}>
                        <CurrencyChange selected={currency} currencies={currencies} />
                    </div>
                    <div className={styles.navbarItem}>
                        <div className={styles.navbarLink}>
                            <FontAwesomeIcon icon={faHeart} className={styles.navbarIcon} />
                            <div>ULUBIONE (6)</div>
                        </div>
                    </div>
                    <div className={styles.navbarItem}>
                        <div className={styles.navbarLink}>
                            <FontAwesomeIcon icon={faList} className={styles.navbarIcon} />
                            <div>OSTATNIO OGLĄDANE (6)</div>
                        </div>
                    </div>
                    <div className={styles.navbarItem}>
                        <div className={styles.navbarLink}>
                            <FontAwesomeIcon icon={faUser} className={styles.navbarIcon} />
                            <div>ZAREJESTRUJ SIĘ</div>
                        </div>
                    </div>
                    <Login t={loginTranslations} />
                    <div className="text-xs px-4 flex flex-col justify-center">
                        <Image className="w-4" alt="" src='/contact-icon.png' width={25} height={25} />
                    </div>
                </div>
            </div>
        </nav>
    );
}