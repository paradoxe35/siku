//@ts-check
import React, { Fragment, useEffect, useState } from 'react'
import { useTranslation } from "react-i18next";
import Help from './Help';

const Common = () => {
    const { t } = useTranslation();

    return <div className="mb-9">
    <div className="row">
        <div className="col">
            <Help />
        </div>
    </div>
</div>
}

export default Common