//@ts-check
import React, { Fragment } from 'react'

export const BtnDownload = ({ width = "25px", height = "15px", onClick, alt }) => {
    return <button type="button" onClick={onClick} className="btn btn-secondary btn-sm">
        <img style={{ width, height }} src="/img/svg/down-arrow.svg" alt={alt} />
    </button>
}