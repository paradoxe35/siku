//@ts-check
import React, { Fragment, lazy, Suspense, useMemo, useRef, useState } from 'react'
import { useTranslation } from "react-i18next";
import { InitReact } from '@/js/react/init';
import { FullLoader } from '@/js/react/components/FullLoader';
import { URLS } from '@/js/react/vars';
import { BtnDownload } from '@/js/react/components/BtnDownload';


const Absent = lazy(() => import('./absent/Absent'))
const Attended = lazy(() => import('./attended/Attended'))
const Overview = lazy(() => import('./overview/Overview'))

const CustomerReport = () => {
    const { t } = useTranslation()
    const [tab, setTab] = useState('Overview')
    const parentElemt = useRef(null)
    const [loading, setLoading] = useState(false)

    const Tabs = useMemo(() => ({
        // @ts-ignore
        Absent: <Absent setLoading={setLoading} />,
        // @ts-ignore
        Attended: <Attended setLoading={setLoading} />,
        // @ts-ignore
        Overview: <Overview setLoading={setLoading} />
    }), [setLoading])

    const download = () => {
        window.location.href = URLS.eventReportDownload
    }

    return <>
        <div className="d-flex justify-content-between">
            <ul className="nav nav-pills mt-3">
                <li className="nav-item mr-2 mr-md-0">
                    <a className="nav-link clickable-a py-1 px-2 active" onClick={() => setTab('Overview')} data-toggle="tab">
                        <span>{t('Aperçu')}</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link clickable-a py-1 px-2" onClick={() => setTab('Attended')} data-toggle="tab">
                        <span>{t('Present')}</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link clickable-a py-1 px-2" onClick={() => setTab('Absent')} data-toggle="tab">
                        <span>{t('Absent')}</span>
                    </a>
                </li>
            </ul>
            <div>
                <BtnDownload onClick={download}  alt={t('Télécharger Rapport')}/>
            </div>
        </div>

        <div className="mt-3">
            <div ref={parentElemt}>
                <Suspense fallback={<FullLoader parent={parentElemt.current} />}>
                    {Tabs[tab]}
                </Suspense>
                {loading && <FullLoader parent={parentElemt.current} />}
            </div>
        </div>
    </>
}

/**
 * @param { HTMLElement|Element } element 
 * @param { string } locale 
 * @param { Object } urls 
 */
export const init = (element, locale, urls = {}) =>
    InitReact(<CustomerReport />, element, locale, urls);
