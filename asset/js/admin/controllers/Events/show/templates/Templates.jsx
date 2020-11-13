//@ts-check
import { List, ListDescriptionText } from '@/js/controllers/Customer/Product/template/Sections';
import { OverFlowStyle, URLS } from '@/js/react/vars';
import React, { Fragment } from 'react'
import { useTranslation } from "react-i18next";
import { ListDatasByFilter } from '@js/react/components/ListDatasByFilter';


export default () => {
    const { t } = useTranslation()

    return <ListDatasByFilter
        tabs={[{ key: 'private', name: t('Privés') }, { key: 'global', name: t('Global') }]}
        selectedTab="private"
        url={URLS.templates}>
        {listData => {
            return <div style={OverFlowStyle}>
                <List.Ul>
                    <List.Li data={listData.data || []}>
                        {v => <>
                            <div className="d-flex w-100 justify-content-between" >
                                <h4 className="mb-1">{v.name}</h4>
                                <small>
                                    {v.global && <span>({t('Global')}) </span>}
                                    {t('SMS')} {v.sms}
                                </small>
                            </div>
                            <ListDescriptionText item={v} onDelete={null} />
                        </>}
                    </List.Li>
                </List.Ul>
            </div>
        }}
    </ListDatasByFilter>
}
