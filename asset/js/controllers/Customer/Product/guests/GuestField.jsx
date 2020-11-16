//@ts-check
import CustomCheckbox from "@/js/react/components/CustomCheckbox"
import { InputField } from "@/js/react/components/InputField"
import PhoneInput from "@/js/react/components/PhoneInput"
import React from "react"
import { useTranslation } from "react-i18next"
import { ServiceUse } from "./ServiceUse"
import { isValidPhoneNumber } from 'react-phone-number-input';
import { TEMPLATE_SECTION } from "@/js/react/vars"
import { isValidEmail } from "@/js/functions/email-validator"
import { Localize } from "@/js/functions/localize"
import { Notifier } from "@/js/functions/notifier"
import { HtmlAlert } from "@/js/functions/dom"

const SERVICES = { ...TEMPLATE_SECTION }

/**
 * @param {string} email 
 * @param {string} phone 
 * @param {?Array} services 
 * @param {?boolean} optional 
 */
export const validServiceFields = (email, phone, services = [], optional = false) => {
    let errors = []
    email = (email || '').trim();
    phone = (phone || '').trim();

    const emailErr = Localize({
        fr: `L'adresse email ${email.length < 1 ? 'est requis' : 'entrée est incorrect'}`,
        en: `The email address ${email.length < 1 ? 'is required' : 'entered is incorrect'}`,
    })
    const phoneErr = Localize({
        fr: `Le numéro de téléphone ${phone.length < 1 ? 'est requis' : 'entrée est incorrect'}`,
        en: `The phone number ${phone.length < 1 ? 'is required' : 'entered is incorrect'}`,
    })

    if (!optional) {
        if (services.includes(SERVICES.mail) && !isValidEmail(email)) errors.push(emailErr)
        if (services.includes(SERVICES.sms) && !isValidPhoneNumber(phone)) errors.push(phoneErr)
    } else {
        const notEmptyEmail = email.length > 0
        const notEmptyPhone = phone.length > 0

        if (notEmptyEmail && !isValidEmail(email)) errors.push(emailErr)
        if (notEmptyPhone && !isValidPhoneNumber(phone)) errors.push(phoneErr)

        if (!notEmptyPhone && !notEmptyEmail) errors.push(Localize({
            fr: "Votre formulaire est incorrect",
            en: "Your form is incorrect",
        }))
    }

    if (errors.length < 1) {
        return true
    }

    Notifier.error(HtmlAlert.message(errors), 7000)

    return false
}

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
                    <label className="form-control-label" />
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
            placeholder={t("Email de l'invité")} />
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

const ICalendar = ({ form }) => {
    const { t } = useTranslation();
    const NEW_GUEST_FORM = form

    return <div className="qr---case">
        <div className="text-xs text-muted mt-3 mb-2">
            {t("Cocher cette case si vous souhaitez attacher un calendrier de rappel")}.
        </div>
        <CustomCheckbox name={NEW_GUEST_FORM.icalendar || 'icalendar'} label={t('ICalendar')} />
    </div>
}

export const ServicesField = ({ onChangeServices, form = {} }) => {
    const { t } = useTranslation()

    return <>
        <div className="text-xs text-muted mt-3 mb-2">
            {t("Sélectionner les services qui seront utilisés à l'envoi du message")}.
        </div>
        <ServiceUse onSelect={onChangeServices} />
        <ICalendar form={form} />
        <QrcodeCase form={form} />
    </>
}