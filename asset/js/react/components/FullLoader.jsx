import React from 'react'

/**
 * @param {{  parent:any, showLoader?:any, children?:any  }} param0 
 */
export const FullLoader = ({ parent, showLoader = true, children }) => {
    if (parent) parent.style.position = 'relative';
    return <div className="loading-ntf-abs">
        <div className='uil-ring-css-abs'>
            {showLoader && <spinning-dots style={{ width: "35px", strokeWidth: '5px', color: "#5e72e4" }} />}
            {!showLoader && children}
        </div>
    </div>
}