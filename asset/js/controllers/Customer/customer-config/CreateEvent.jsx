import React, { useEffect } from 'react'
import { useTranslation } from "react-i18next";
import { DefaultButton } from '@/js/components/Buttons';
import { I_PROFILE_STATUS } from './utils/vars';


export const CreateEvent = ({ handleLoading, updateComponentIndex, addEvent }) => {
    const { t } = useTranslation();
    return <>
        <form>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <div className="input-group input-group-merge">
                            <input className="form-control  form-control-muted" autoFocus={true} placeholder="Your name" type="text" />
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <div className="input-group input-group-merge">
                            <input className="form-control  form-control-muted" placeholder="Email address" type="email" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <div className="input-group input-group-merge">
                            <input className="form-control  form-control-muted" placeholder="Location" type="text" />
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <div className="input-group input-group-merge">
                            <input className="form-control  form-control-muted" placeholder="Password" type="password" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <div className="input-group input-group-merge">
                            <input className="form-control  form-control-muted" placeholder="Payment method" type="text" />
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <div className="input-group input-group-merge">
                            <input className="form-control  form-control-muted" placeholder="Phone number" type="text" />
                        </div>
                    </div>
                </div>
            </div>
            <DefaultButton onClick={() => updateComponentIndex(I_PROFILE_STATUS)} label="Enregistrer" />
        </form>
    </>
}