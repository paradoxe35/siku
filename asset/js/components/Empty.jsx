import React from 'react'
import { useTranslation } from "react-i18next";


export const Empty = ({ message = '' }) => {
    const { t } = useTranslation();

    return <div className="row justify-content-center my-3">
        <div className="col-md-4 col-12">
            <img src="/img/svg/empty_x.svg" />
            <div className="text-center">
                <span className="text-muted">
                    <small>{t(message)}</small>
                </span>
            </div>
        </div>
    </div>
}