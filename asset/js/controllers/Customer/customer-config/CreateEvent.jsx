import React from 'react'
import { useTranslation } from "react-i18next";


export const CreateEvent = ({ handleLoading, updateComponentIndex, addEvent }) => {
    const { t } = useTranslation();

    return <>
        <form>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <div className="input-group input-group-merge">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fas fa-user"></i></span>
                            </div>
                            <input className="form-control" placeholder="Your name" type="text" />
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <div className="input-group input-group-merge">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fas fa-envelope"></i></span>
                            </div>
                            <input className="form-control" placeholder="Email address" type="email" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <div className="input-group input-group-merge">
                            <input className="form-control" placeholder="Location" type="text" />
                            <div className="input-group-append">
                                <span className="input-group-text"><i className="fas fa-map-marker"></i></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <div className="input-group input-group-merge">
                            <input className="form-control" placeholder="Password" type="password" />
                            <div className="input-group-append">
                                <span className="input-group-text"><i className="fas fa-eye"></i></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <div className="input-group input-group-merge">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fas fa-credit-card"></i></span>
                            </div>
                            <input className="form-control" placeholder="Payment method" type="text" />
                            <div className="input-group-append">
                                <span className="input-group-text"><small className="font-weight-bold">USD</small></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <div className="input-group input-group-merge">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fas fa-globe-americas"></i></span>
                            </div>
                            <input className="form-control" placeholder="Phone number" type="text" />
                            <div className="input-group-append">
                                <span className="input-group-text"><i className="fas fa-phone"></i></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </>
}