//@ts-check
import React, { useEffect } from 'react'
import { useFullLoading } from '../hooks'
import { FullLoader } from './FullLoader'

export const Loader = ({ loading = false, children }) => {
    const { fullLoading, setFullLoading: setLoading } = useFullLoading()

    useEffect(() => {
        setLoading(loading)
    }, [loading])

    return <div style={{ position: "relative" }}>
        {fullLoading && <FullLoader />}
        {children}
    </div>
}