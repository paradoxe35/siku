import React from 'react'

export const FullLoader = ({ parent }) => {
    if (parent) parent.style.position = 'relative';
    return <div className="loading-ntf-abs">
        <div className='uil-ring-css-abs'>
            <spinning-dots style={{ width: "40px", color: "#5e72e4" }} />
        </div>
    </div>
}