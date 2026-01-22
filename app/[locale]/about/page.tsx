import { useTranslations } from 'next-intl';

export default function Home() {

    const t = useTranslations("About");

    return (
        <div className="flex flex-1 flex-col items-center justify-start">
            <h1 className="text-5xl font-bold text-white text-center mt-10 mb-15 max-w-4xl">
                Koło Naukowe Nowych Technologii Programistycznych
            </h1>
            <div className="w-4xl mb-16">
                <div className="max-w-3xl">
                    <h2 className="text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
                        {t("title")}
                    </h2>
                    <p className="mt-4 text-xl text-primary">
                        {t("titledesc")}
                    </p>
                </div>
            </div>

            <p>[Placeholder dla filmu, btw na stronie wsizu jest literówka na trzecim wyrazie opisu koła]</p>

            <div className="max-w-4xl grid gap-8 items-start justify-center mt-10">
                <div>
                    <h3 className="text-center text-2xl font-bold text-primary mb-3">
                        {t("about")}
                    </h3>
                    <p className="text-base text-primary leading-relaxed">
                        {t("aboutdesc")}
                    </p>
                </div>
            </div>
        </div>

    );
}