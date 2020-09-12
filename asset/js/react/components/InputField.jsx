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
                    type={props.type || 'text'}
                    className={props.className || "form-control"} />
            </div>
        </div>
    })