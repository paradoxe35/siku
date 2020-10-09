//@ts-check
import React, { Fragment, useEffect, useState } from 'react'
import { useTranslation } from "react-i18next";
import { SkeletonBox } from '@/js/react/components/SkeletonBox';
import { useFetch, useFullLoading } from '@/js/react/hooks';
import { URLS } from '@/js/react/vars';
import { Empty } from '@/js/react/components/Empty';
import { FullLoader } from '@/js/react/components/FullLoader';
import { GuestList } from '../guests/GuestList';


const Skeleton = ({ loading }) => {
    const skeleton = (_, k) => {
        return <div key={k} className="d-inline-block mr-1">
            <SkeletonBox width={k === 1 ? "120" : "90"} height="41" />
        </div>
    }
    return <>
        {loading ? (new Array(3)).fill(null).map(skeleton) : []}
    </>
}

const Profile = () => {
    const { t } = useTranslation();
    const { fetchAPi, fetchLoading: loading, ApiRequest } = useFetch(true)
    const [menuDatas, setMenuDatas] = useState({
        send: 0,
        fail: 0,
        wait: 0
    })

    const [filter, setFilter] = useState(null)
    const { fullLoading, parentElemt, setFullLoading } = useFullLoading()
    const [datas, setDatas] = useState({})


    useEffect(() => {
        fetchAPi('get', URLS.eventMenuProfile)
            .then(({ data }) => setMenuDatas(data))
    }, [])

    useEffect(() => {
        if (!filter) return
        setFullLoading(true)
        ApiRequest('get', URLS.eventProfileItems + '?filter=' + filter)
            .finally(() => setFullLoading(false))
            .then(({ data }) => setDatas(data))
    }, [filter])

    return <>
        {loading && <Skeleton loading={loading} />}
        {!loading &&
            (
                <div className="btn-group btn-group-toggle" data-toggle="buttons">
                    <label className="btn btn-secondary" onClick={() => setFilter('send')}>
                        <input type="radio" name="options" autoComplete="off" />
                        {t('Invitations Envoyés')} {menuDatas.send}
                    </label>
                    <label className="btn btn-secondary" onClick={() => setFilter('fail')}>
                        <input type="radio" name="options" autoComplete="off" />
                        {t('Envois échoués')} {menuDatas.fail}
                    </label>
                    <label className="btn btn-secondary" onClick={() => setFilter('wait')}>
                        <input type="radio" name="options" autoComplete="off" />
                        {t('Dans l\'attente')} {menuDatas.wait}
                    </label>
                </div>
            )
        }

        {filter && (
            <div className="mt-5" ref={parentElemt}>
                {fullLoading && <FullLoader parent={parentElemt.current} />}
                <div className="my-3" />
                <GuestList url={URLS.eventProfileItems} filter={'filter=' + filter} datas={datas} setFullLoading={setFullLoading} />
                {/*  @ts-ignore */}
                {datas.meta && !datas.meta.total ? (
                    <div className="mt-5"><Empty message="" /></div>
                ) : ''}
            </div>
        )}
    </>
}

export default Profile