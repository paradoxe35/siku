//@ts-check
import React, { Fragment, useState } from 'react'
import { useTranslation } from "react-i18next";
import { HtmlAlert } from '@/js/functions/dom';
import parse from 'html-react-parser'
import { ShowHelp } from '@/js/react/components/HelpShow';


const Help = () => {
    const { t } = useTranslation();
    const message = `
        - ${t('Enregistrer vos modèles message et personnaliser les selon vos type invités')}. <br>
        - <b>{name}, {code}, {url}</b> : ${t("ces trois clés seront remplacés aux informations relatives à l'invité")}, <br>
        ${t("d'où le")} <b>{name}</b> ${t("sera traduit comme le nom de l'invité,")} <b>{code}</b>
        ${t("son code d'invitation pour l'événement,")} <b>{url}</b>
        ${t('un lien content son code au format qrcode mais celui-ci est optionnel')}.<br>
        - ${t("Cela dit, vous n'aurez pas à les modifier, ecrivez simplement vos modèles en y tenant compte")}. <br>
        - ${t('Un modèle message vous est proposé par défaut, vous pouvez commencer sur cette base.')} <br>
    `
    return <>
        <ShowHelp>
            {parse(HtmlAlert.show(null, message, true, 'bulb-61', 'primary'))}
        </ShowHelp>
    </>
}

export default Help