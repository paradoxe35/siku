//@ts-check
import React, { Fragment } from 'react'
import { useTranslation } from "react-i18next";
import parse from 'html-react-parser'
import { HtmlAlert } from '@/js/functions/dom';

const Guests = () => {
    const { t } = useTranslation();

    return <>
        <div className="row">
            <div className="col-lg-5">
                {parse(HtmlAlert.show(null,
                    t('Enregistrer vos invités, ceci vous permettra d\'envoyer '),
                    true, 'air-baloon', 'primary'))}
            </div>
        </div>
        <div className="row justify-content-start">
            <div className="col-lg-5">

            </div>
            <div className="col-lg-5">
                <form action="" method="post">

                </form>
            </div>
        </div>
    </>
}

export default Guests