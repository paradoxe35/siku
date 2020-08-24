import React, { Fragment } from 'react'
import { useTranslation } from "react-i18next";

export const DefaultButton = ({ loading = false, label = '', type = "button", onClick }) => {
    const { t } = useTranslation()
    return <button type={type} onClick={onClick} className="btn btn-default btn-sm d-flex align-content-center" disabled={loading}>
        <span>{t(label)}</span>
        {loading && (
            <>
                <span className="mx-1"></span>
                <spinning-dots style={{ width: "20px" }} />
            </>
        )}
    </button>
}