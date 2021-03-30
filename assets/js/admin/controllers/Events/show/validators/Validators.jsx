//@ts-check
import { List } from '@/js/controllers/Customer/Product/template/Sections';
import { OverFlowStyle, URLS } from '@/js/react/vars';
import React, { Fragment } from 'react'
import { ListDatasByFilter } from '@js/react/components/ListDatasByFilter';
import { useTranslation } from 'react-i18next';


export default () => {
    const { t } = useTranslation()
    return <ListDatasByFilter
        tabs={[{ key: 'active', name: t('Actifs') }]}
        selectedTab="active"
        url={URLS.validators}>
        {listData => {
            return <div style={OverFlowStyle}>
                <List.Ul>
                    <List.Li data={listData.data || []}>
                        {v => <>
                            <div className="row mb-1">
                                <div className="col">
                                    <h4 className="mb-1">{v.username}</h4>
                                    <h4 className="mb-1">
                                        <small>{v.name}</small><br />
                                        <small>{v.phone}</small>
                                    </h4>
                                </div>

                            </div>
                        </>}
                    </List.Li>
                </List.Ul>
            </div>
        }}
    </ListDatasByFilter>
}
