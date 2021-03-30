
//@ts-check
import React from 'react'
import { URLS } from '@/js/react/vars'
import { ReportList } from '../ShowList'

export default ({ setLoading }) => {
    return <ReportList setLoading={setLoading} url={URLS.eventReportAbsent} />
}
