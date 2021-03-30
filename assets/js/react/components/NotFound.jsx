//@ts-check
import React from 'react'
import { useTranslation } from "react-i18next";

const NotFound = ({ message = null }) => {
    const { t } = useTranslation()

    return <div className="row justify-content-center my-3">
        <div className="col-md-4 col-12">
            <img src="/img/svg/page_not_found.svg" />
        </div>
        <div className="col-12">
            <div className="text-center">
                <span className="text-muted">
                    <small>{message || t('Page non trouvée')}</small>
                </span>
            </div>
        </div>
    </div>
}

export default NotFound