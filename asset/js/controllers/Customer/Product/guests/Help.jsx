//@ts-check
import React, { Fragment } from 'react'
import { useTranslation } from "react-i18next";
import { HtmlAlert } from '@/js/functions/dom';
import parse from 'html-react-parser'
import { ShowHelp } from '@/js/react/components/HelpShow';


const Help = () => {
    const { t } = useTranslation();
    const message = `
        - ${t('Enregistrez vos invités, vous pouvez enregistrer et envoyer l\'invitation en même temps')}. <br>
        - ${t('Il serait bon d\'enregistrer tous les invités, puis d\'envoyer toutes les invitations à la fois')}. <br>
        - ${t('Pour d\'autres informations, veuillez suivre les instructions ci-dessous ou contactez-nous')}. <br>
    `
    return <>
        <ShowHelp>
            {parse(HtmlAlert.show(null, message, true, 'bulb-61', 'primary'))}
        </ShowHelp>
    </>
}

export default Help