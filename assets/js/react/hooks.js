//@ts-check
import { useState, useRef, useCallback, useEffect } from "react"
import { ApiRequest } from "../api/api"
import { slim as slimSelect } from '@js/utils/SlimSelect'
import { useDispatch, useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import { fetchEventTemplates } from "../store/features/product/TemplatesSlice"

export const useFetch = (_loading = false) => {
    const [loading, setLoading] = useState(_loading)
    const [error, setError] = useState(null)
    const [datas, setDatas] = useState(null)
    /**
     * @param {string} method 
     * @param {string} url 
     * @param { any? } datas 
     * @param { any?} mustNotifierErrors 
     * @param { any? } maintainLoading 
     * @returns { Promise<import('axios').AxiosResponse<any>> }
     */
    const fetchAPi = (method, url, datas = {}, mustNotifierErrors = false, maintainLoading = false) => {
        setError(null)
        setLoading(true)
        //@ts-ignore
        return ApiRequest(method, url, datas, mustNotifierErrors)
            .then((res) => {
                setDatas(res.data)
                return res
            })
            .catch((err) => {
                setError(err)
                maintainLoading && setLoading(false)
                return Promise.reject(err)
            })
            .finally(() => {
                !maintainLoading && setLoading(false)
            })

    }

    return { fetchLoading: loading, error, datas, fetchAPi, ApiRequest }
}


export const useFullLoading = () => {
    const parentElemt = useRef(null)
    const [loading, setLoading] = useState(false)

    return {
        parentElemt,
        fullLoading: loading,
        setFullLoading: setLoading
    }
}

export const useListDataPaginator = (datas, fn) => {
    const [listData, setListData] = useState(datas || {})

    useEffect(() => {
        setListData(datas || {})
    }, [datas])

    const onPageChange = useCallback(({ page }) => {
        if (!listData.meta || listData.meta.current_page == page) return
        fn && fn(page)
    }, [listData])

    return [listData, setListData, onPageChange]
}



export const usePhoneInput = (defaultPhone = '') => {
    const [phone, setPhone] = useState(defaultPhone)
    const onPhoneValueChange = useCallback((v) => {
        setPhone(v)
    }, [setPhone])

    return {
        phone,
        setPhone,
        onPhoneValueChange
    }
}

export const useItemDeletion = () => {
    const modalConfirm = useRef(null)
    const [deletionLoading, setDeletionLoading] = useState(false)
    const [deletionId, setDeletionId] = useState(null)

    // delete event template
    const handleDelete = useCallback(async (id) => {
        setDeletionId(id)
        if (modalConfirm.current)
            // @ts-ignore
            $(modalConfirm.current).modal('show');
    }, [modalConfirm.current, setDeletionId])


    const closeModal = () => {
        // @ts-ignore
        $(modalConfirm.current).modal('hide')
        setDeletionLoading(false)
        setDeletionId(null)
    }

    return {
        modalConfirm,
        deletionLoading,
        setDeletionLoading,
        deletionId,
        setDeletionId,
        handleDelete,
        closeModal
    }
}

export const useSlimSelect = () => {
    const templatesEl = useRef(null)
    const slimInstance = useRef(null);

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
    return {
        templatesEl,
        slimInstance,
        getSlim
    }
}

export const useTemplateSelect = (url) => {
    const { t } = useTranslation()
    /**
     * @type { { ids: Array, entities: Object<string, 
        *      { id: string, sms: string, name: string, text: { sms: string, mail: string } } 
        *  >, loading: string, error: Object} }
        */
    // @ts-ignore
    const { ids, entities } = useSelector(s => s.eventTemplates)
    const { getSlim, templatesEl } = useSlimSelect()
    const dispach = useDispatch()

    useEffect(() => {
        // @ts-ignore
        dispach(fetchEventTemplates(url))
        return () => {
            getSlim().destroy()
        }
    }, [])

    useEffect(() => {
        const slim = getSlim()
        const datas = ids.map((id) => {
            const entity = entities[id]
            return {
                text: entity.name,
                value: entity.id,
                selected: false
            }
        })
        slim.setData([{ text: t('Choisissez un modèle'), value: '#', selected: true }, ...datas])
    }, [ids])

    return {
        templatesEl,
        ids,
        entities,
        getSlim
    }
}


export const useServices = () => {
    const [services, setServices] = useState([])

    const onChangeServices = useCallback((v) => {
        setServices(v)
    }, [setServices])

    return {
        services,
        onChangeServices
    }
}
