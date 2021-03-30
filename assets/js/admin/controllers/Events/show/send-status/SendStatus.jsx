//@ts-check
import Profile from '@/js/controllers/Customer/Product/profile/Profile';
import React, { Fragment } from 'react'

export default () => {

    return <>
        <Profile canDelete={false} canSend={false} />
    </>
}
