//@ts-check
import React, { Fragment, useEffect, useRef, useMemo, useCallback } from 'react'
import { useTranslation } from "react-i18next";
import Help from './Help';
import RowDivider from '@/js/react/components/RowDivider';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { fetchEventTemplates } from '@/js/store/features/product/TemplatesSlice';
import { URLS } from '@/js/react/vars';
import { slim as slimSelect } from '@js/utils/SlimSelect'
import { InputField } from '@/js/react/components/InputField';
import { DefaultButton } from '@/js/react/components/Buttons';


const CreateNewGuest = () => {
    const { t } = useTranslation();
    const templatesEl = useRef(null)
    const slimInstance = useRef(null);
    /**
     * @type { { ids: Array, entities: Object, loading: string, error: Object} }
     */
    // @ts-ignore
    const { ids, entities } = useSelector(s => s.eventTemplates)
    const dispach = useDispatch()
    /**
     * @returns { import('slim-select').default }
     */
    const getSlim = () => {
        if (slimInstance.current === null) {
            // @ts-ignore
            slimInstance.current = slimSelect(templatesEl.current, {
                showSearch: false,
            });
        }
        return slimInstance.current;
    }

    useEffect(() => {
        // @ts-ignore
        dispach(fetchEventTemplates(URLS.eventTemplates))
    }, [])

    useEffect(() => {
        if (!templatesEl.current) return
        const slim = getSlim()
        slim.setData(ids.map((id) => {
            const entity = entities[id]
            return {
                text: entity.name,
                value: entity.id,
                selected: false
            }
        }))
    }, [ids])

    return <div className="new-guest">
        <div className="mb-4">
            <b className="text-sm">
                {t('Enregistrer invité')}. ($4)
            </b>
        </div>
        <form method="post" autoComplete="off">
            <div className="row">
                <div className="col-lg-6">
                    <InputField type="text" placeholder={t("Nom de l'invité")} />
                </div>
                <div className="col-lg-6">
                    <InputField type="tel" placeholder={t("Numéro de téléphone") + ' (+243 97 33 243 243)'} />
                </div>
            </div>
            <select ref={templatesEl}>
                <option>{t('Choisir un modèle')}</option>
            </select>
            <div className="my-4 d-flex">
                <DefaultButton textColor="text-primary" color="secondary" label={t('Modifier le text')} />
                <DefaultButton textColor="text-primary" color="secondary" label={t('Voir le text')} />
            </div>
            <div className="text-xs text-muted mt-3 mb-2">
                {t('Selectonner les services qui seront utilisés à l\'envoi du message')}.
            </div>
            <div className="mt-4 d-md-flex justify-content-sm-between">
                <div className="custom-control custom-checkbox">
                    <input type="checkbox" defaultChecked className="custom-control-input" id="sms-accept" />
                    <label className="custom-control-label" htmlFor="sms-accept">{t('SMS')}</label>
                </div>
                <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="whatsapp-accept" />
                    <label className="custom-control-label" htmlFor="whatsapp-accept">{t('WhatsApp')}</label>
                </div>
                <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="qrcode-accept" />
                    <label className="custom-control-label" htmlFor="qrcode-accept">{t('Qr Code')}</label>
                </div>
            </div>

            <div className="mt-4">
                <DefaultButton label={t('Enregistrer')} />
            </div>
        </form>
    </div>
}

const Guests = () => {
    const { t } = useTranslation();

    return <div className="mb-9">
        <div className="row">
            <div className="col">
                <Help />
            </div>
        </div>
        <div className="row justify-content-start">
            <div className="col-lg-7">
                <RowDivider />
                <CreateNewGuest />
            </div>
            <div className="col-lg-5">
                <RowDivider />
                <DefaultButton textColor="text-primary" color="secondary" label={t('Tout envoyer')} />
            </div>
        </div>
    </div>
}

export default Guests