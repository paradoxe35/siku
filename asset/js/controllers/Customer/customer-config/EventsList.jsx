import React, { useEffect } from 'react'
import { Empty } from '@/js/components/Empty';
import { useTranslation } from "react-i18next";


export const EventsList = ({ events = [], started }) => {
    const { t } = useTranslation();
    const content = (
        <ul className="list-group">
            {events.map(e => {
                return (
                    <li className="list-group-item">
                        <div className="d-flex justify-content-between align-items-center">
                            {e.name}
                            <span className={`badge ${e.confirmed ? 'badge-success' : 'badge-warning'} badge-pill`}>
                                {e.confirmed ? <i className="ni ni-check-bold"></i> : <i className="ni ni-settings-gear-65"></i>}
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
    return (
        <>
            {(!started && !events.length) && <Empty message="Aucun événement trouvé" />}
            {started ? <skeleton-box height="40" lines="3" /> : content}
        </>
    )
}