//@ts-check
import React, { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import CustomCheckbox from "@/js/react/components/CustomCheckbox";
import { TEMPLATE_SECTION } from "@/js/react/vars";

const SERVICES = {
    ...TEMPLATE_SECTION,
}

export const ServiceUse = ({ onSelect }) => {
    const { t } = useTranslation();
    const [data, setData] = useState([SERVICES.sms])

    useEffect(() => {
        onSelect(data)
    }, [data])

    const onChange = useCallback(({ target }) => {
        setData(e => {
            const h = new Set([...e, target.value]);
            !target.checked && h.delete(target.value)
            return Array.from(h)
        })
    }, [setData])

    return <div className="mt-4 d-md-flex">
        <div className="mr-md-5">
            <CustomCheckbox
                onChange={onChange}
                defaultChecked
                value={SERVICES.sms}
                label={t('SMS')} />
        </div>
        <CustomCheckbox
            onChange={onChange}
            value={SERVICES.whatsapp}
            label={t('WhatsApp')} />
    </div>
}
