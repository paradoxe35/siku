//@ts-check
import React, { forwardRef } from 'react'
import { useTranslation } from "react-i18next";
import { DefaultButton } from './Buttons';
import { createPortal } from 'react-dom';

const ModalConfirm = forwardRef(
    /**
     * @param {{  chrildren?: Array, message?: any, onConfirm?: any, loading?: boolean  }} props
     */
    (props, ref) => {
        const { t } = useTranslation()

        return createPortal((
            <div className="modal fade" ref={ref} tabIndex={-1} role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-sm" role="document">
                    <div className="modal-content">
                        <div className="modal-body">{props.message || t('Êtes-vous sûr ?')}</div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary btn-sm" data-dismiss="modal">{t('Non')}</button>
                            <DefaultButton label={t('Ouais')} loading={props.loading} onClick={props.onConfirm} />
                        </div>
                    </div>
                </div>
            </div>
        ), document.body)
    })

export default ModalConfirm