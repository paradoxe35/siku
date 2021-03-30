//@ts-check
import React from 'react'

export const Empty = ({ message }) => {
    return <div className="row justify-content-center my-3">
        <div className="col-md-4 col-12">
            <img src="/img/svg/empty_x.svg" />
        </div>
        <div className="col-12">
            <div className="text-center">
                <span className="text-muted">
                    <small>{message}</small>
                </span>
            </div>
        </div>
    </div>
}
