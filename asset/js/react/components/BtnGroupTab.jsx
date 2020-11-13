//@ts-check
import React, { Fragment, useState } from 'react'
import { useEffect } from 'react'


export const BtnGroupTab = ({ tabs = [], defaultv = null, selected = null }) => {
    const [filter, setFilter] = useState(defaultv)

    useEffect(() => {
        selected && selected(filter)
    }, [filter])

    return <>
        <div className="btn-group btn-group-toggle" data-toggle="buttons">
            {tabs.map((t, i) => {
                return <label
                    key={i}
                    className={`btn btn-secondary ${defaultv == t.key ? 'active' : ''}`}
                    onClick={() => setFilter(t.key)}>
                    <input type="radio" name="options" autoComplete="off" defaultChecked={defaultv == t.key} />
                    {t.name}
                </label>
            })}
        </div>
    </>
}