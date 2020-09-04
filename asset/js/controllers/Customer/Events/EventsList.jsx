//@ts-check
import React, { useContext } from 'react'
import { connect } from 'react-redux'
import { Empty } from '@/js/react/components/Empty';
import { useTranslation } from "react-i18next";
import { TurbolinksApp } from '@/js/modules/turbolinks';


const EventsListComponent = ({ events = [], started, userAuth }) => {
    const { t } = useTranslation();
    const goToHome = function (event) {
        TurbolinksApp.isc.visit(event.route)
    }
    const content = (
        <ul className="list-group mt-4">
            {events.map(e => {
                return (
                    <li className="list-group-item my-2 border border-darken-1 clickable-list" onClick={() => goToHome(e)} key={e.id}>
                        <div className="d-flex justify-content-between align-items-center">
                            {e.name}
                            <span className={`badge badge-info badge-pill`}>
                                ${e.balance || 0}
                            </span>
                        </div>
                        <small className="text-muted">
                            {t('Créé')}, {e.created_at}
                        </small>
                    </li>
                )
            })}
        </ul>
    )
    const message = (
        <>
            <span>{t('Salut')} {userAuth.name + "!, "}  {t("Vous avez aucun événement pour le moment")}.</span><br />
            <span>{t("Cliquez sur le bouton ci dessus pour en créer")}.</span>
        </>
    )
    return (
        <>
            {(!started && !events.length) && <Empty message={message} />}
            {/* @ts-ignore */}
            {started ? <skeleton-box height="40" lines="3" /> : content}
        </>
    )
}
const mapStateToProps = (state) => ({ userAuth: state.userAuth })
export const EventsList = connect(mapStateToProps)(EventsListComponent)
