import React, { Fragment } from 'react'

export const DefaultButton = 
    ({ loading = false, label = '', type = "button", onClick = null, color="default", textColor = '' }) => {
    return <button type={type} onClick={onClick} className={`btn btn-${color} ${textColor} btn-sm d-flex align-content-center`} disabled={loading}>
        <span>{label}</span>
        {loading && (
            <>
                <span className="mx-1"></span>
                <spinning-dots style={{ width: "20px" }} />
            </>
        )}
    </button>
}