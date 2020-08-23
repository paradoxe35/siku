import React, { useContext } from 'react'
import { useTranslation } from "react-i18next";


export const ConfirmAndCustomerStatus = ({ handleLoading, updateComponentIndex }) => {
    const { t } = useTranslation();
    const event = useContext(EventContext)

    useEffect(() => {
        if (!event.name) updateComponentIndex(I_EVENTS);
    }, [])

    return <>
        <div></div>
    </>
}
