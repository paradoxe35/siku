//@ts-check
import React, { memo, useEffect, useRef } from "react"

const CustomCheckbox = memo(/**  @param { { disabled?:boolean, value?:any, name?: any, label?:any, onChange?:any, defaultChecked?:any, checked?:boolean } } props */
    (props) => {
        // @ts-ignore
        const { name = null, label = '', onChange = null, defaultChecked, checked, disabled = null } = props
        const random = Math.random()
        const ref = useRef(null)

        useEffect(() => {
            if (ref.current) {
                ref.current.checked = !!checked
            }
        }, [checked])

        useEffect(() => {
            if (ref.current) {
                ref.current.checked = !!defaultChecked
            }
        }, [])
        return <div className="custom-control custom-checkbox">
            <input type="checkbox"
                {...props}
                defaultChecked={defaultChecked}
                ref={ref}
                disabled={disabled}
                className="custom-control-input"
                name={name}
                onChange={onChange}
                id={name + random} />
            <label className="custom-control-label" htmlFor={name + random}>{label}</label>
        </div>
    })

export default CustomCheckbox