//@ts-check
import React, { Fragment, useState, Component, useRef, useEffect, useCallback } from 'react'
import { useTranslation } from "react-i18next";
import { useFetch, useFullLoading, useListDataPaginator } from '@/js/react/hooks';
import Picker from 'react-month-picker'
import 'react-month-picker/css/month-picker.css'
import { BtnDownload } from '@/js/react/components/BtnDownload';
import { FullLoader } from '@/js/react/components/FullLoader';
import { URLS } from '@/js/react/vars';
import { LaravelPagination } from '@/js/react/components/Pagination';
import { SYMBOL } from '@/js/functions/functions';

const SECTIONS = {
    payments: 'payments',
    consumptions: 'consumptions'
}

const PaymentsView = ({ listData }) => {
    const { t } = useTranslation()

    return <table className="table table-responsive">
        <thead>
            <tr>
                <th scope="col">{t('Id Paiement')} </th>
                <th scope="col">{t('Date')} </th>
                <th scope="col">{t('Méthode de paiement')} </th>
                <th scope="col">{t('Montant')}</th>
                <th scope="col">{t('Code de devise')}</th>
            </tr>
        </thead>
        <tbody>
            {listData.data && listData.data.map((d, i) => (
                <tr key={d.id || i}>
                    <td>{d.id}</td>
                    <td>{d.created_at}</td>
                    <td>{d.meta.service}</td>
                    <td>{SYMBOL + d.amount}</td>
                    <td>{d.meta.currency_code}</td>
                </tr>
            ))}
        </tbody>
    </table>
}

const ConsumptionsView = ({ listData }) => {
    const { t } = useTranslation()

    return <table className="table table-responsive">
        <thead>
            <tr>
                <th scope="col">{t('Date')} </th>
                <th scope="col">{t('Montant consommé')}</th>
                <th scope="col">{t('Code de devise')}</th>
                <th scope="col">{t('Événement')}</th>
            </tr>
        </thead>
        <tbody>
            {listData.data && listData.data.map((d, i) => (
                <tr key={d.date || i}>
                    <td>{d.date}</td>
                    <td>{SYMBOL + d.amount}</td>
                    <td>{d.currency_code}</td>
                    <td>{d.event}</td>
                </tr>
            ))}
        </tbody>
    </table>
}

const BodyList = ({ section, state, url }) => {
    const { t } = useTranslation()

    const { fetchAPi, fetchLoading: loading } = useFetch(true)
    const { parentElemt } = useFullLoading()

    const defaultData = useRef({})

    const [listData, setListData] = useListDataPaginator(defaultData.current)

    useEffect(() => {
        fetchAPi('get', url, {}, true)
            .then(({ data }) => setListData(data))
    }, [section, state])

    const getDataPaginator = useCallback(({ page }) => {
        if (!listData.meta || listData.meta.current_page == page) return
        fetchAPi('get', url + '&page=' + page)
            .then(({ data }) => setListData(data))
    }, [listData, url, setListData])

    return <div className="mt-5" ref={parentElemt}>
        {loading && <FullLoader parent={parentElemt.current} />}
        <LaravelPagination listData={listData} getDataPaginator={getDataPaginator} />
        {section === SECTIONS.payments && <PaymentsView listData={listData} />}
        {section === SECTIONS.consumptions && <ConsumptionsView listData={listData} />}
        {listData.meta && !loading && listData.meta.total < 1 && (
            <h4 className="text-center mt-5">{t('Historique vide')} !</h4>
        )}
    </div>
}


class MonthBox extends Component {

    constructor(props, context) {
        super(props, context)

        this.state = {
            value: this.props.value || 'N/A',
        }
    }

    static getDerivedStateFromProps(props, state) {
        return {
            value: props.value || 'N/A',
        }
    }

    render() {
        return (
            <div className="box" onClick={this._handleClick}>
                <input
                    type="text"
                    autoFocus
                    value={this.state.value}
                    readOnly
                    className="form-control form-control-sm"
                    placeholder={this.props.placeholder} />
            </div>
        )
    }

    _handleClick = (e) => {
        this.props.onClick && this.props.onClick(e)
    }
}

const pickerLang = {
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    from: 'From', to: 'To',
}

export default () => {
    const { t } = useTranslation()
    const pickAMonth = useRef(null)

    const { current: date } = useRef(new Date())

    const [section, setSection] = useState(SECTIONS.payments)

    const [state, setState] = useState({
        year: date.getFullYear(),
        month: date.getMonth() + 1
    })

    useEffect(() => {
        pickerLang.months = pickerLang.months.map(v => t(v))
        pickerLang.from = t(pickerLang.from)
        pickerLang.to = t(pickerLang.to)
    }, [])

    const makeText = m => {
        if (m && m.year && m.month) return (pickerLang.months[m.month - 1] + '. ' + m.year)
        return '?'
    }

    const handleClickMonthBox = useCallback((e) => {
        pickAMonth.current.show()
    }, [pickAMonth.current])


    const handleAMonthDissmis = useCallback((value) => {
        setState(r => {
            const y = Object.values(r)
            const isSame = Object.values(value).every(c => y.includes(c))
            return isSame ? r : value
        })
    }, [setState])

    const url = `${URLS.historyIndex}?filter=${section}&month=${state.month}&year=${state.year}`;

    const downLoad = useCallback(() => {
        const locale = document.querySelector('html').lang
        window.location.href = url + '&download=true&locale=' + locale
    }, [url])

    return <>
        <div className="edit d-lg-flex justify-content-lg-between">
            <div className="row">
                <div className="col-lg-4 mb-2">
                    <Picker
                        ref={pickAMonth}
                        years={{ min: 2020, max: 2090 }}
                        value={state}
                        lang={pickerLang.months}
                        theme='dark'
                        onDismiss={handleAMonthDissmis}>
                        <MonthBox
                            placeholder={t('Sélectionnez un mois')}
                            value={makeText(state)}
                            onClick={handleClickMonthBox} />
                    </Picker>
                </div>
                <div className="col-lg-6 mb-2">
                    <select
                        className="form-control form-control-sm"
                        value={section}
                        onChange={({ target: { value } }) => setSection(value)}>
                        <option value={SECTIONS.payments}>{t('Historique de paiement')}</option>
                        <option value={SECTIONS.consumptions}>{t("Historique d'utilisation")}</option>
                    </select>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-6 mb-2">
                    <BtnDownload onClick={downLoad} alt={t('Télécharger Rapport')} />
                </div>
            </div>
        </div>
        <BodyList state={state} section={section} url={url} />
    </>
}
