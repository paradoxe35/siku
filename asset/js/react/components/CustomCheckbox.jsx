//@ts-check
import React, { memo } from "react"

const CustomCheckbox = memo(/**  @param { { value?:any, name?: any, label?:any, onChange?:any, defaultChecked?:any, checked?:boolean } } props */
    (props) => {
        // @ts-ignore
        const { value, name = null, label = '', onChange = null, defaultChecked, checked } = props
        const random = parseInt((Math.random() * Date.now()).toString(), 10)
        return <div className="custom-control custom-checkbox">
            <input type="checkbox"
                defaultChecked={defaultChecked}
                checked={checked}
                className="custom-control-input" name={name} onChange={onChange} id={name + random} value={value} />
            <label className="custom-control-label" htmlFor={name + random}>{label}</label>
        </div>
    })

export default CustomCheckbox