//@ts-check
import QrCodeWithLogo from "qrcode-with-logos";
const qr = document.getElementById('qrcode')
const width = qr.parentElement.getBoundingClientRect().width
qr.style.maxWidth = (width / 1.1) + 'px'
qr.style.maxHeight = (width / 1.1) + 'px'
// @ts-ignore
const qrcode = new QrCodeWithLogo({
    canvas: qr,
    content: qr.getAttribute('data-code'),
    width: 2000,
    logo: {
        src: qr.getAttribute('data-logo')
    }
});
qrcode.toCanvas()