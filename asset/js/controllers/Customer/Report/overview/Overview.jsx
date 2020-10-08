//@ts-check
import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';
import { useFetch } from '@/js/react/hooks';
import { URLS } from '@/js/react/vars';

export default ({ setLoading }) => {
    const { t } = useTranslation()
    const [datas, setDatas] = useState({
        labels: [],
        data: []
    })
    const { ApiRequest } = useFetch()

    useEffect(() => {
        setLoading(true)
        ApiRequest('get', URLS.eventReportOverview, {}, true)
            .finally(() => setLoading(false))
            .then(({ data }) => setDatas(data))
    }, [])

    const data = {
        labels: datas.labels,
        datasets: [
            {
                label: t('Invitations présentées'),
                backgroundColor: 'rgba(180, 99, 255,0.2)',
                borderColor: 'rgba(180, 99, 255,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(180, 99, 255,0.4)',
                hoverBorderColor: 'rgba(180, 99, 255,1)',
                data: datas.data
            }
        ]
    };

    return <>
        <div className="card">
            <div className="card-body px-lg-6">
                <Bar
                    data={data}
                    height={500}
                    options={{
                        maintainAspectRatio: false,
                        responsive: true
                    }}
                />
            </div>
        </div>
    </>
}
