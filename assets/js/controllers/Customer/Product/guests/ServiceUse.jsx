//@ts-check
import React, { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import CustomCheckbox from "@/js/react/components/CustomCheckbox";
import { TEMPLATE_SECTION } from "@/js/react/vars";

const SERVICES = {
    ...TEMPLATE_SECTION,
}

export const ServiceUse = ({ onSelect, allService = false }) => {
    const { t } = useTranslation();
    const [data, setData] = useState(allService ? Object.values(SERVICES) : [SERVICES.sms])

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
                onChange={allService ? null : onChange}
                defaultChecked
                disabled={allService}
                value={SERVICES.sms}
                label={t('SMS')} />
        </div>
        <CustomCheckbox
            onChange={onChange}
            value={SERVICES.mail}
            disabled={allService}
            defaultChecked={allService ? true : false}
            label={t('Mail')} />
    </div>
}
