//@ts-check

import React, { Fragment, useEffect, useRef, useState, useMemo } from 'react'
import { useTranslation } from "react-i18next";
import QrCodeWithLogo from "qrcode-with-logos";
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import Help from './Help';
import RowDivider from '@/js/react/components/RowDivider';
import { debounce } from '@/js/functions/functions';
import { URLS } from '@/js/react/vars';
import { DefaultButton } from '@/js/react/components/Buttons';
import { ApiRequest } from '@/js/api/api';
import { Notifier } from '@/js/functions/notifier';
import { Localize } from '@/js/functions/localize';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setQrcodeLogoUrl } from '@/js/store/features/product/QrcodeLogoSlice';



const CropperImageView = ({ onDataImage, onSaveComponent }) => {
    const { t } = useTranslation()
    // @ts-ignore
    const url = useSelector(e => e.eventQrcodeLogoUrl)
    const [image, setImage] = useState(url || URLS.qrcodeImage);
    const croppy = useRef(null)

    const onCropper = debounce(() => {
        onDataImage(croppy.current.getCroppedCanvas().toDataURL())
    }, 250, null)

    const onChange = (e) => {
        e.preventDefault();
        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
            // @ts-ignore
            setImage(reader.result);
        };
        reader.readAsDataURL(files[0]);
    };
    return <>
        <div className="row">
            <div className="col">
                <button type="button" className="btn btn-sm btn-secondary text-primary btn-open-file mb-3">
                    <span>{t('Ajouter Image')}</span>
                    <input type="file" onChange={onChange} accept="image/x-png,image/gif,image/jpeg" />
                </button>
            </div>
            <div className="col-auto">
                {onSaveComponent}
            </div>
        </div>

        <Cropper
            src={image}
            viewMode={1}
            guides={true}
            minCropBoxHeight={10}
            minCropBoxWidth={10}
            background={false}
            responsive={true}
            autoCropArea={1}
            checkOrientation={false}
            style={{ height: 400, width: '100%' }}
            initialAspectRatio={1}
            checkCrossOrigin={false}
            crop={onCropper}
            onInitialized={(v) => {
                croppy.current = v
            }}
        />
    </>
}

const Qrcode = () => {
    const { t } = useTranslation();
    const canvas = useRef(null)
    const [src, setSrc] = useState('')
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const siteName = useMemo(() =>
        document.querySelector("meta[name=site-name]")
            .getAttribute('content'),
        [])

    useEffect(() => {
        /**
         * @type { HTMLCanvasElement }
         */
        const element = canvas.current
        const width = element.parentElement.getBoundingClientRect().width
        element.style.maxWidth = (width / 1.1) + 'px'
        element.style.maxHeight = (width / 1.1) + 'px'

        // @ts-ignore
        const qrcode = new QrCodeWithLogo({
            canvas: element,
            content: siteName,
            width: 2000,
            logo: {
                src: src
            }
        });
        qrcode.toCanvas()
    }, [src])

    const saveQrImage = () => {
        setLoading(true)
        ApiRequest('put', URLS.setQrlogo, { data_url: src }, true)
            .then(({ data: { logo_path } }) => {
                Notifier.sussess(Localize({
                    fr: 'Enregisté',
                    en: 'saved'
                }))
                dispatch(setQrcodeLogoUrl(logo_path))
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return <>
        <Help />
        <div className="row justify-content-start">
            <div className="col-lg-6">
                <RowDivider />
                <div className="row">
                    <div className="col text-center">
                        <b>{t('Resultat')}</b>
                    </div>
                </div>
                <canvas ref={canvas} />
            </div>
            <div className="col-lg-6">
                <RowDivider />
                <CropperImageView onSaveComponent={(
                    <DefaultButton loading={loading} onClick={saveQrImage} label={t('Enregistrer')} />
                )} onDataImage={(v) => setSrc(v)} />
            </div>
        </div>
    </>
}

export default Qrcode