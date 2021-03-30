//@ts-check
import { ShowListGuest } from '@/js/controllers/Customer/Product/guests/GuestList';
import { List } from '@/js/controllers/Customer/Product/template/Sections';
import { OverFlowStyle, URLS } from '@/js/react/vars';
import React, { Fragment } from 'react'
import { useTranslation } from "react-i18next";
import { ListDatasByFilter } from '@js/react/components/ListDatasByFilter';


export default () => {
    const { t } = useTranslation()

    return <ListDatasByFilter
        tabs={[{ key: 'private', name: t('Privés') }, { key: 'global', name: t('Global') }]}
        selectedTab="private"
        url={URLS.guests}>
        {(listData, f) => {
            return <div style={OverFlowStyle}>
                <List.Ul>
                    <List.Li data={listData.data || []}>
                        {v => f == 'global' ? (
                            <div className="row mb-1">
                                <div className="col">
                                    <h4 className="mb-1">{v.name}</h4>
                                    <h4 className="mb-1">
                                        <small>{v.phone}</small><br />
                                        <small>{v.email}</small>
                                    </h4>
                                </div>
                            </div>
                        ) : (
                                <>
                                    <ShowListGuest v={v} handleDelete={null} canSend={false} />
                                </>
                            )}
                    </List.Li>
                </List.Ul>
            </div>
        }}
    </ListDatasByFilter>
}
