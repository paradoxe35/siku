import { TurbolinksApp } from '@/js/modules/turbolinks'
import React, { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { DefaultButton } from './Buttons'

export default () => {
    const { t } = useTranslation()

    return <DefaultButton
        color="secondary"
        label={t('Annuler')}
        textColor="text-primary"
        onClick={() => TurbolinksApp.reload()} />
}