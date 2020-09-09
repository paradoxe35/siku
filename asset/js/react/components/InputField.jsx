//@ts-check
import React, { forwardRef } from 'react'


export const InputField = forwardRef(
    /**
     * @param { React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> } props
     */
    (props, ref) => {
    return <div className="form-group">
        <div className="input-group input-group-merge">
            <input
                ref={ref}
                {...props}
                // @ts-ignore
                type={props.type || 'text'}
                className="form-control" />
        </div>
    </div>
})