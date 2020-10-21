//@ts-check
import CustomCheckbox from "@/js/react/components/CustomCheckbox"
import { InputField } from "@/js/react/components/InputField"
import PhoneInput from "@/js/react/components/PhoneInput"
import React from "react"
import { useTranslation } from "react-i18next"
import { ServiceUse } from "./ServiceUse"


export const GuestField = ({ onChangeField, fields, phone, onPhoneValueChange, form }) => {
    const { t } = useTranslation()
    const NEW_GUEST_FORM = form
    return <>
        <div className="row">
            <div className="col-lg-6">
                <InputField
                    type="text"
                    onChange={onChangeField}
                    value={fields[NEW_GUEST_FORM.name]}
                    name={NEW_GUEST_FORM.name}
                    placeholder={t("Nom de l'invité")} />
            </div>
            <div className="col-lg-6">
                <div className="form-group">
                    <div className="input-group input-group-merge">
                        <PhoneInput
                            value={phone}
                            className="form-control"
                            placeholder={t("Numéro de téléphone de l'invité")}
                            onChange={onPhoneValueChange}
                        />
                    </div>
                </div>
            </div>
        </div>
        <InputField
            type="email"
            className="form-control form-control-sm"
            value={fields[NEW_GUEST_FORM.email]}
            name={NEW_GUEST_FORM.email}
            placeholder={t("Email de l'invité") + t("(Optionnel)")} />
    </>
}

const QrcodeCase = ({ form }) => {
    const { t } = useTranslation();
    const NEW_GUEST_FORM = form

    return <div className="qr---case">
        <div className="text-xs text-muted mt-3 mb-2">
            {t("Cocher cette case si vous souhaitez que le code d'invitation en image Qr code soit inclus dans le message")}.
        </div>
        <CustomCheckbox name={NEW_GUEST_FORM.can_include_qrcode} label={t('QR code Image')} />
    </div>
}

export const ServicesField = ({ onChangeServices, form }) => {
    const { t } = useTranslation()

    return <>
        <div className="text-xs text-muted mt-3 mb-2">
            {t("Sélectionner les services qui seront utilisés à l'envoi du message")}.
        </div>
        <ServiceUse onSelect={onChangeServices} />
        <QrcodeCase form={form} />
    </>
}