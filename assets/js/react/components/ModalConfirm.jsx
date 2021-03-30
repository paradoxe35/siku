//@ts-check
import React, { forwardRef } from 'react'
import { useTranslation } from "react-i18next";
import { DefaultButton } from './Buttons';
import { createPortal } from 'react-dom';

const ModalConfirm = forwardRef(
    /**
     * @param {{  
     *  children?: Array, message?: any, onConfirm?: any, loading?: boolean, size?: string, footer?: boolean, 
     *  confirmText?: string, closeText?: string, disabledBtn?:boolean
     * }} props
     */
    (props, ref) => {
        const { t } = useTranslation()
        return createPortal((
            <div className="modal fade" ref={ref} tabIndex={-1} role="dialog" aria-hidden="true">
                <div className={`modal-dialog modal-dialog-scrollable modal-dialog-centered ${props.size || 'modal-sm'}`} role="document">
                    <div className="modal-content">
                        <div className="modal-body">{props.children} {props.message || t('Êtes-vous sûr ?')}</div>
                        {
                            props.footer || (
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary btn-sm"
                                        data-dismiss="modal">{props.closeText || t('Non')}</button>
                                    <DefaultButton
                                        label={props.confirmText || t('Ouais')}
                                        loading={props.loading}
                                        disabled={props.disabledBtn}
                                        onClick={props.onConfirm} />
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        ), document.body)
    })

export default ModalConfirm