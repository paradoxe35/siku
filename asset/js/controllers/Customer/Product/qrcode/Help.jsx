//@ts-check
import React, { Fragment } from 'react'
import { useTranslation } from "react-i18next";
import { HtmlAlert } from '@/js/functions/dom';
import parse from 'html-react-parser'
import { ShowHelp } from '@/js/react/components/HelpShow';


const Help = () => {
    const { t } = useTranslation();
    const message = `
        - ${t("Personnaliser l'apparence de vos images QR code, qui contiendront les codes d'invitations d'invités")}. <br>
        - ${t("L'image QR Code contiendra le code d'invité encodé et le contenu du code peut être décodé rapidement après avoir été lu par un lecteur de code-barres, un téléphone mobile, un smartphone, ou encore une webcam")}. <br>
        - ${t("Nous fournissons une application mobile en connexe pour le décodage et la validation de codes ou image QR Code de vos invités, et qui servira à authentifier leurs invitations")}. <br>
        - ${t("Si vous n'êtes pas intéressé, sachez que c'est facultatif")}. <br>
        - ${t("Après avoir effectué vos modifications, n'oubliez pas de cliquer sur le bouton Enregistrer")}. <br>
    `
    return <>
        <ShowHelp>
            {parse(HtmlAlert.show(null, message, true, 'bulb-61', 'primary'))}
        </ShowHelp>
    </>
}

export default Help