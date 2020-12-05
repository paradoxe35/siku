//@ts-check
import React, { forwardRef } from 'react'


export const InputField = forwardRef(
    /**
     * @param { React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> } props
     */
    (props, ref) => {
        const inputProps = { ...props }
        delete inputProps.children
        return <div className="form-group">
            <label className="form-control-label text-xs">{props.children}</label>
            <div className="input-group input-group-merge">
                <input
                    ref={ref}
                    {...inputProps}
                    type={props.type || 'text'}
                    className={props.className || "form-control"} />
            </div>
        </div>
    })