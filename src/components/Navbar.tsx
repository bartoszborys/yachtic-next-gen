import { faHeart, faList, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import dynamic from "next/dynamic";

const LanguageChange = dynamic(
    () => import('./LanguageChange'),
    {
        loading: () => <p>Loading...</p>,
    }
);

const styles = {
    navbarCurrency: `text-gray-500 font-bold`,
    navbarLink: `text-sky-500 font-bold flex`,
    navbarItem: `text-xs px-3 flex flex-col justify-center border-r border-gray-200`,
    navbarIcon: `w-2.5 mr-1`,
};

export default function Navbar() {
    return (
        <nav className="bg-white w-full flex justify-center h-16 overflow-hidden sm:overflow-visible">
            <div className="w-full container flex">
                <Image className="w-[185px] height-[48px] flex" alt="" src='/logo.svg' width={25} height={25} />
                <div className="flex-1"></div>
                <div className={styles.navbarItem}>
                    <LanguageChange />
                </div>
                <div className={styles.navbarItem}>
                    <div className={styles.navbarCurrency}>EUR (€)</div>
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
                    <div className={styles.navbarLink}>
                        <div>ZALOGUJ SIĘ</div>
                    </div>
                </div>
                <div className="text-xs px-4 flex flex-col justify-center">
                    <div>
                        <Image className="w-4" alt="" src='/contact-icon.png' width={25} height={25} />
                    </div>
                </div>
            </div>
        </nav>
    );
}