//@ts-check
import { useState, useRef, useCallback, useEffect } from "react"
import { ApiRequest } from "../api/api"

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
    const [listData, setListData] = useState(datas)

    useEffect(() => {
        setListData(datas)
    }, [datas])

    const onPageChange = useCallback(({ page }) => {
        if (!listData.meta || listData.meta.current_page == page) return
        fn && fn(page)
    }, [listData])

    return [listData, setListData, onPageChange]
}



export const usePhoneInput = () => {
    const [phone, setPhone] = useState('')
    const onPhoneValueChange = useCallback((v) => {
        setPhone(v)
    }, [setPhone])

    return {
        phone,
        setPhone,
        onPhoneValueChange
    }
}