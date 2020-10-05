//@ts-check
import React, { Fragment } from 'react'
import { useTranslation } from "react-i18next";
import { useFetch } from '@/js/react/hooks';


export default () => {
    const { t } = useTranslation()
    const { fetchAPi, fetchLoading: loading } = useFetch()

    return <>
    </>
}
