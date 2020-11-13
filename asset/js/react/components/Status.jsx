//@ts-check
import React from 'react'

export default ({ value = true, active = '', inactive = '' }) => {
    return <>
        <span className="badge badge-dot mr-4">
            {value ? <i className="bg-success"></i> : <i className="bg-danger"></i>}
            <span className="status">{value ? active : inactive}</span>
        </span>
    </>
}