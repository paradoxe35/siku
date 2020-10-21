//@ts-check

import CustomCheckbox from "@/js/react/components/CustomCheckbox"
import ModalConfirm from "@/js/react/components/ModalConfirm"
import { useFetch, useServices, useTemplateSelect } from "@/js/react/hooks"
import { DispachGuestsDetail, TEMPLATE_SECTION, URLS } from "@/js/react/vars"
import { fetchCommonGuest } from "@/js/store/features/product/CommonGuestsSlice"
import { putEventStatus } from "@/js/store/features/product/EventStatusSlice"
import React, { useCallback, useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { ServicesField } from "./GuestField"


const SERVICES = {
    ...TEMPLATE_SECTION,
    qrcode: 'qrcode'
}

const INCLUDE_FORM = {
    template_id: 'template_id',
    can_send_sms: 'can_send_sms',
    can_send_whatsapp: 'can_send_whatsapp',
    guests_ids: 'guests_ids',
    can_include_qrcode: 'can_include_qrcode'
}

export const IncludeCommonGuests = ({ element }) => {
    const { t } = useTranslation()
    // @ts-ignore
    const { ids, entities } = useSelector(s => s.commonGuests)
    const [datas, setDatas] = useState([])

    const dispach = useDispatch()
    const [selectedAll, setSelectedAll] = useState(false)
    const [checkedIds, setCheckedIds] = useState([])

    const checkOnElement = (id, checked) => setDatas(v => v.map(f => {
        const j = { ...f }
        if (j.id == id) j.checked = checked
        return j
    }))
    const onCheck = useCallback(({ target: { checked, value } }) =>
        checkOnElement(value, checked), [setCheckedIds])

    const onSelectAll = useCallback(({ target: { checked } }) => {
        setDatas(f => f.map(g => {
            const j = { ...g }
            j.checked = checked
            return j
        }))
    }, [setDatas, setSelectedAll, datas])

    useEffect(() => {
        // @ts-ignore
        dispach(fetchCommonGuest(URLS.commonGuests))
    }, [])

    useEffect(() => {
        setCheckedIds(datas.filter(g => g.checked).map(d => d.id))
    }, [datas])

    useEffect(() => {
        if (checkedIds.length === datas.length) {
            setSelectedAll(true)
        } else {
            setSelectedAll(false)
        }
    }, [datas, checkedIds])

    useEffect(() => {
        setDatas(ids.map(k => entities[k]))
    }, [ids, entities])

    const [selectedTemplate, setSelectedTemplate] = useState(null)

    const { ids: templateIds, getSlim, templatesEl } = useTemplateSelect(URLS.eventTemplates)

    const { services, onChangeServices } = useServices()


    useEffect(() => {
        const slim = getSlim()
        slim.onChange = (info) => {
            const h = info.value && info.value != '#' && templateIds.includes(+info.value)
            !h && setSelectedTemplate(null)
            h && setSelectedTemplate(info.value);
        }
    }, [templateIds])

    const invalidField = !selectedTemplate || !services.length || !checkedIds.length

    const { fetchLoading, fetchAPi } = useFetch()

    const formRef = useRef(null)

    const onSave = () => {
        if (invalidField) return
        const guestsIds = checkedIds.join(',')
        const form = new FormData(formRef.current)

        const vsms = services.includes(SERVICES.sms)
        const vwhatsapp = services.includes(SERVICES.whatsapp)

        vsms && form.append(INCLUDE_FORM.can_send_sms, 'on')
        vwhatsapp && form.append(INCLUDE_FORM.can_send_whatsapp, 'on')
        form.append(INCLUDE_FORM.template_id, selectedTemplate);
        form.append(INCLUDE_FORM.guests_ids, guestsIds);

        fetchAPi('post', URLS.eventGuestsImportFromCommon, form, true)
            .then(({ data }) => {
                DispachGuestsDetail(data)
                dispach(putEventStatus({ saved_guests: data.meta.total }))
                // @ts-ignore
                $(element.current).modal('hide')
            })
    }

    return <>
        <ModalConfirm
            ref={element}
            loading={fetchLoading}
            disabledBtn={invalidField}
            message={true} size="modal-lg"
            confirmText={t('Inclure')}
            onConfirm={onSave}
            closeText={t('Fermer')}>
            <form method="post" ref={formRef}>
                <div className="mb-1"><b>{t('Invités communs')} ({datas.length})</b></div>
                <div className="mb-2">
                    <CustomCheckbox
                        checked={selectedAll}
                        label={t('Tout sélectionner')}
                        onChange={onSelectAll} />
                </div>
                <hr className="my-1" />
                <div style={{ overflowY: 'scroll', maxHeight: '200px', }}>
                    {datas.map(data => (
                        <div className="py-1" key={data.id}>
                            <CustomCheckbox
                                checked={!!data.checked}
                                value={data.id}
                                label={data.name}
                                onChange={onCheck} />
                        </div>
                    ))}
                </div>
                <div className="mt-2">
                    <div className="text-xs text-muted mb-2">
                        {t("Choisissez un de vos modèles enregistrés comme message d'envoi pour les invités")}.
                </div>
                    <select ref={templatesEl} />
                    <ServicesField form={INCLUDE_FORM} onChangeServices={onChangeServices} />
                </div>
            </form>
            <></>
        </ModalConfirm>
    </>
}