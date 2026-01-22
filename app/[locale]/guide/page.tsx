import { useTranslations } from 'next-intl';

export default function Home() {

    const t = useTranslations("About");

    return (
        <div className="flex flex-1 flex-col items-center justify-start">

        <p>hokus pokus czary mary, placeholder to</p>

        <p>
            Lista placeholderowa:
            Certyfikaty:
            AWS:
            AWS Cloud foundations
            Introduction to cloud computing
            Getting started with AWS
            AWS Cloud concepts
            AWS storage and networking basics

            wsm powinienem chyba wrzucic tylko najwazniejsze
            generalnie z faktu ze jest to tymczasowy zapis to chcialbym serdecznie pozdrowic mame
            generalnie ale to musi fajnie w jednej lini wszystko wygladac
            no i cześć tato
            pozdrawiam też brata

            i siostrę
            oraz psa
            oraz kota
            oraz rybki
            oraz chomika
            oraz papugę
            oraz żółwia
            oraz świnkę morską

            Jakby co to AI mi samo proponuje kolejne pozdrowienia, szybko sie uczy, madra rzecz
        </p>
            </div>
    );
}