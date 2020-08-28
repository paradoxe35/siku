import React, { useContext, useEffect } from 'react'
import { useTranslation } from "react-i18next";
import { EventContext } from './utils/contexts';
import { DefaultButton } from '@/js/components/Buttons';
import { I_EVENTS } from './utils/vars';


export const ConfirmAndCustomerStatus = ({ handleLoading, updateComponentIndex }) => {
    const { t } = useTranslation();
    const event = useContext(EventContext)

    return <>
        <div className="card-deck">
            <div className="card">
                <div className="card-body">
                    <div className="mb-2">
                        <sup>{t("Total")} </sup> <span className="h2">${event.price || 0} </span>
                        <div className="text-muted mt-2 text-sm">
                            {t("Contactez nous pour un autre mode de paiement")}.
                        </div>
                        <div>
                            <span className="text-success text-sm font-weight-600">{event.center.phone || '+243'}</span>
                        </div>
                    </div>
                    <p>
                        <small className="text-muted">{t('Votre code Événement')}: {event.hash || '--'}</small>
                    </p>
                    <div className="form-group my-2">
                        <div className="input-group input-group-merge">
                            <input className="form-control  form-control-muted" placeholder={t('Code paiement')} type="text" />
                            <div className="input-group-append">
                                <span className="input-group-text btn-link"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title={t("Un code de validation de paiement vous sera envoyé, si vous avez choisi le mode alternatif")}>
                                    <i className="ni ni-active-40"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                    <DefaultButton label="Valider" />
                    <hr className="my-3" />
                    <button className="btn btn-sm btn-block  mt-3">
                        {t('Payer Avec')} PayPal
                    </button>
                </div>
            </div>
            <div className="card">
                <div className="card-body">
                    <div className="row justify-content-between align-items-center">
                        <div className="col">
                            <span> {event.name || '--'} </span>
                        </div>
                        <div className="col-auto">
                            <span className={`badge badge-lg ${event.active ? 'badge-success' : 'badge-danger'}`}>
                                {t(event.active ? 'actif' : 'inactif')}
                            </span>
                        </div>
                    </div>
                    <div className="my-4">
                        <span className="h6 surtitle text-muted">
                            {t("Utilisateur")}
                        </span>
                        <div className="h4">@{event.user.name || ' --'}</div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <span className="h6 surtitle text-muted">{t('Invités')}</span>
                            <span className="d-block h3 ">{event.guests || 0}</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <button type="button" className="btn btn-secondary btn-sm">
                                <i className="ni ni-fat-add"></i>
                            </button>
                            <button type="button" className="btn btn-secondary btn-sm">
                                <i className="ni ni-fat-delete"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}
