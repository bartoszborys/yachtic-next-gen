import { faBars, faHeart, faList, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import dynamic from "next/dynamic";
import { ReactElement } from "react";
import { getLanguages } from "./fetch/queries/getLanguages";
import { getCurrencies } from "./fetch/queries/getCurrencies";
import { cookies } from "next/headers";
import { CookiesKeys } from "@/enums/CookiesKeys";

const LanguageChange = dynamic(() => import('./components/LanguageChange'));
const CurrencyChange = dynamic(() => import('./components/CurrencyChange'));

const styles = {
    navbarCurrency: `text-gray-500 font-bold`,
    navbarLink: `text-sky-500 font-bold flex`,
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

    const currencyId = cookies().get(CookiesKeys.CURRENCY_ID)?.value || (() => {throw new Error("CurrencyId cookie is not set!")})();
    const currency = currencies.find(item => item.id.toString() === currencyId) || (() => {throw new Error("Currency not found")})();

    return (
        <nav className="bg-white flex justify-center w-full h-16 fixed z-50 px-3">
            <div className="content-container flex justify-between sm:justify-center w-full">
                <Image className="w-[185px] height-[48px] flex" alt="" src='/logo.svg' width={25} height={25} />
                <div className="flex sm:hidden">
                    <FontAwesomeIcon icon={faSearch} className={styles.navbarMobileIcon} />
                    <FontAwesomeIcon icon={faBars} className={styles.navbarMobileIcon} />
                </div>
                <div className="w-full container sm:flex hidden">
                    <div className="flex-1"></div>
                    <div className={styles.navbarItem}>
                        <LanguageChange selectedLanguage={locale} languages={languages} />
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
                    <div className={styles.navbarItem}>
                        <div className={styles.navbarLink}>ZALOGUJ SIĘ</div>
                    </div>
                    <div className="text-xs px-4 flex flex-col justify-center">
                        <Image className="w-4" alt="" src='/contact-icon.png' width={25} height={25} />
                    </div>
                </div>
            </div>
        </nav>
    );
}