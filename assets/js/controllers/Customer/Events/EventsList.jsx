//@ts-check
import React from 'react'
import { useSelector } from 'react-redux'
import { Empty } from '@/js/react/components/Empty';
import { useTranslation } from "react-i18next";
import { TurbolinksApp } from '@/js/modules/turbolinks';


export const EventsList = ({ events = [], started }) => {
    const { t } = useTranslation();
    // @ts-ignore
    const userAuth = useSelector(state => state.userAuth)
    const goToHome = function (event) {
        TurbolinksApp.visit(event.route)
    }
    const content = (
        <ul className="list-group mt-4">
            {events.map(e => {
                return (
                    <li className="list-group-item my-1 border border-darken-1 clickable-list border-0 p-2" onClick={() => goToHome(e)} key={e.id}>
                        <div className="d-flex justify-content-between align-items-center">
                            {e.name}
                            <span className={`badge ${e.active ? 'badge-success' : 'badge-warning'} badge-pill`}>
                                {e.active ? <i className="ni ni-check-bold"></i> : <i className="ni ni-settings-gear-65"></i>}
                            </span>
                        </div>
                        <small className="text-muted">
                            {t('Créé')}, {e.created_at}
                        </small>
                        <hr className="my-1" />
                    </li>
                )
            })}
        </ul>
    )
    const message = (
        <>
            <span>{t('Salut')} {userAuth ? userAuth.name : '' + "!, "}  {t("Vous avez aucun événement pour le moment")}.</span><br />
            <span>{t("Cliquez sur le bouton ci dessus pour en créer")}.</span>
        </>
    )
    return (
        <>
            {(!started && !events.length) && <Empty message={message} />}
            {!!events.length && content}
        </>
    )
}
