
import React, { Fragment, useState } from 'react'
import { useTranslation } from "react-i18next";

export const ShowHelp = ({ children }) => {
    const { t } = useTranslation()
    const [show, setShow] = useState(false)

    return <>
        <div>
            <div className="mb-3">
                <b className="mr-3">{t("Besoin d'aide ?")}: </b>
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => setShow(e => !e)}>
                    {t(show ? 'Cacher' : 'Afficher')}
                </button>
            </div>
            {!show || children}
        </div>
    </>
}