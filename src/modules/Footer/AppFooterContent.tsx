import LocalizedLink from "@/components/LocalizedLink";
import { LanguageKey } from "@/types/LanguageKey";
import { ReactElement } from "react";
import getPermalinks from "./fetch/queries/getPermalinks";
import { getTranslations } from "next-intl/server";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faYoutube } from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface NavbarProps {
    locale: LanguageKey;
}

export default async function AppFooterContent({ locale }: NavbarProps): Promise<ReactElement> {
    const t = await getTranslations();
    const data = await getPermalinks();

    const links = data.map(link =>
        link.newTab
            ? <a
                key={link.id}
                className="text-[#00a0e3] hover:underline"
                href={link.url}>
                <>{link.label}</>
            </a>
            : <LocalizedLink
                key={link.id}
                className="text-[#00a0e3] hover:underline"
                href={"/" + link.url}
                locale={locale}>
                <>{link.label}</>
            </LocalizedLink>
    );

    return (
        <div className="content-container mx-auto my-4">
            <nav className="border-2 border-white border-b-gray-200 pb-4 flex justify-center text-xs gap-10">{links}</nav>
            <section className="flex justify-around my-4">
                <article>
                    <h5 className="uppercase text-gray-400 text-sm text-center mb-4">{t("PAYMENT_TITLE")}</h5>
                    <Image src="/payment.png" alt="" width={250} height={100} />
                </article>
                <article>
                    <h5 className="uppercase text-gray-400 text-sm mb-4">{t("SOCIAL_MEDIA_TITLE")}</h5>
                    <div className="flex justify-between">
                        <a href="https://www.facebook.com/profile.php?id=61554495613642">
                            <FontAwesomeIcon className="text-[#00a0e3] text-3xl" icon={faFacebook as IconProp} />
                        </a>
                        <a href="https://www.instagram.com/yachtic/">
                            <FontAwesomeIcon className="text-[#00a0e3] text-3xl" icon={faInstagram as IconProp} />
                        </a>
                        <a href="https://www.youtube.com/channel/UCQVLUGdQZOQm4kgBD_KnCRg/videos">
                            <FontAwesomeIcon className="text-[#00a0e3] text-3xl" icon={faYoutube as IconProp} />
                        </a>
                    </div>
                </article>
            </section>
        </div>
    );
}