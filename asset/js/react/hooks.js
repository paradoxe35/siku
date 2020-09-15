//@ts-check

import { useState, useEffect, useRef } from "react"
import { ApiRequest } from "../api/api"

/**
 * @param { number } mustRefreshValue
 */
export const useFetch = (mustRefreshValue = 0) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [datas, setDatas] = useState(null)
    const [request, setRequest] = useState({
        url: null,
        method: 'get',
        datas: null
    })
    useEffect(() => {
        if (!request.url || !request.method || !request.datas) return;
        setError(null)
        setLoading(true)
        const { method, url, datas } = request
        ApiRequest(method, url, datas)
            .then(res => {
                setDatas(res.data)
            })
            .catch((err) => {
                setError(err)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [mustRefreshValue]);

    return { fetchLoading: loading, error, setRequest, datas }
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