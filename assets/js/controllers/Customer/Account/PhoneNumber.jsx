//@ts-check
import React, { Fragment, useCallback } from 'react'
import { useTranslation } from "react-i18next";
import { InitReact } from '@/js/react/init';
import { URLS } from '@/js/react/vars';
import { useFetch, usePhoneInput } from '@/js/react/hooks';
import PhoneInput from '@/js/react/components/PhoneInput';
import { useSelector } from 'react-redux';
import { DefaultButton } from '@/js/react/components/Buttons';
import { isValidPhoneNumber, parsePhoneNumber } from 'react-phone-number-input';
import { ReduxDispatch } from '@/js/store';
import { connectUser } from '@/js/store/features/UserSlice';
import { savedChanges } from '@/js/functions/notifier';
import Cancel from '@/js/react/components/Cancel';


const Index = () => {
    const { t } = useTranslation()
    const { fetchAPi, fetchLoading: loading } = useFetch()
    // @ts-ignore
    const { country_code, phone: cphone } = useSelector(s => s.userAuth)

    const { phone, onPhoneValueChange } = usePhoneInput(cphone)

    const onChange = useCallback(() => {
        const dataPhone = parsePhoneNumber(phone)
        fetchAPi('patch', URLS.accountUpdatePhone, { phone: dataPhone.number }, true)
            .then(({ data }) => {
                ReduxDispatch(connectUser(data));
                savedChanges()
            })
    }, [phone])

    return <>
        <h4 className="display-4 text-sm">
            {t('Changer de numéro de téléphone')}
        </h4>
        <div className="row mt-3">
            <div className="col-lg-5">
                <div className="form-group">
                    <PhoneInput
                        value={phone}
                        defaultCountry={country_code}
                        className="form-control"
                        placeholder={t("Numéro de téléphone")}
                        onChange={onPhoneValueChange}
                    />
                </div>

                <DefaultButton
                    label={t('Enregistrer')}
                    disabled={!isValidPhoneNumber(phone)}
                    onClick={onChange}
                    loading={loading} type="submit" />
                <Cancel />
            </div>
        </div>
    </>
}

/**
 * @param { HTMLElement|Element } element 
 * @param { string } locale 
 * @param { Object } urls 
 */
export const init = (element, locale, urls = {}) =>
    InitReact(<Index />, element, locale, urls);
