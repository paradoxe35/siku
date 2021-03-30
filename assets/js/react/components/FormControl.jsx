//@ts-check
import React, { Fragment, useEffect, useRef } from 'react'

/**
 * 
 * @param {React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>} props 
 */
export const FormControl = (props) => {
    const ref = useRef(null)
    useEffect(() => {
        const e = $(ref.current);
        e.length && e.on("focus blur", function (e) {
            $(this).parents(".form-group").toggleClass("focused", "focus" === e.type)
        }).trigger("blur")
    }, [])
    return <input ref={ref} className="form-control" {...props} />
}