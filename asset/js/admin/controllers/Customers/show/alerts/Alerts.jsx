//@ts-check
import { AlertLowBalance } from '@/js/controllers/Customer/Payments/Alerts/Alerts';
import React, { Fragment } from 'react'
import { useTranslation } from "react-i18next";


export default () => {
    const { t } = useTranslation()

    return <>
        {/* @ts-ignore */}
        <AlertLowBalance user={window.customer} />
    </>
}
