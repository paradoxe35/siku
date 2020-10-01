//@ts-check
import React, { Fragment, useEffect, useState } from 'react'
import { useTranslation } from "react-i18next";
import { SkeletonBox } from '@/js/react/components/SkeletonBox';
import { GuestList } from '../guests/Guests';
import { useFetch } from '@/js/react/hooks';
import { URLS } from '@/js/react/vars';




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
    const { fetchAPi, fetchLoading: loading } = useFetch(true)
    const [datas, setDatas] = useState({
        send: 0,
        fail: 0,
        wait: 0
    })

    useEffect(() => {
        fetchAPi('get', URLS.eventMenuProfile)
            .then(({ data }) => setDatas(data))
    }, [])

    return <>
        {loading && <Skeleton loading={loading} />}
        {!loading &&
            (
                <div className="btn-group btn-group-toggle" data-toggle="buttons">
                    <label className="btn btn-secondary">
                        <input type="radio" name="options" autoComplete="off" />
                        {t('Invitations Envoyés')} {datas.send}
                    </label>
                    <label className="btn btn-secondary">
                        <input type="radio" name="options" autoComplete="off" />
                        {t('Envois échoués')} {datas.fail}
                    </label>
                    <label className="btn btn-secondary">
                        <input type="radio" name="options" autoComplete="off" />
                        {t('Dans l\'attente')} {datas.wait}
                    </label>
                </div>
            )
        }
    </>
}

export default Profile