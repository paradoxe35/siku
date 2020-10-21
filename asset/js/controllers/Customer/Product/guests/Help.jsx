//@ts-check
import React, { Fragment } from 'react'
import { useTranslation } from "react-i18next";
import { HtmlAlert } from '@/js/functions/dom';
import parse from 'html-react-parser'
import { ShowHelp } from '@/js/react/components/HelpShow';


const Help = () => {
    const { t } = useTranslation();
    const message = `
        - ${t("Enregistrez vos invités, vous pouvez enregistrer et envoyer l'invitation en même temps")}. <br>
        - ${t("Pour d'autres informations, veuillez suivre les instructions ci-dessous ou contactez-nous")}. <br>
        - ${t("Avant d'enregistrer, veuillez estimer le prix qui sera consommé pour votre invité, pour la bonne gestion de votre fonds")}. <br>
    `
    return <>
        <ShowHelp>
            {parse(HtmlAlert.show(null, message, true, 'bulb-61', 'primary'))}
        </ShowHelp>
    </>
}

export default Help