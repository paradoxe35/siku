import React, { Fragment } from 'react'

export const Card = ({ children, header = null }) => <div className="card shadow-sm">
    {header && <div className="card-header">{header}</div>}
    <div className="card-body">{children}</div>
</div>