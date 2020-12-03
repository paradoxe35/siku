import QrCodeWithLogo from "qrcode-with-logos";

const qr = document.getElementById('qrcode')
const width = qr.parentElement.getBoundingClientRect().width

const hasFull = hasSearchUrl('full')

qr.style.maxWidth = (width / (hasFull ? 1 : 1.1)) + 'px'
qr.style.maxHeight = (width / (hasFull ? 1 : 1.1)) + 'px'

const code = qr.getAttribute('data-code');

window.downloadImage = () => qrcode.toImage()

// @ts-ignore
const qrcode = new QrCodeWithLogo({
    canvas: qr,
    content: code,
    width: 2000,
    download: true,
    downloadName: code + '.png',
    image: document.getElementById("image"),
    logo: {
        src: qr.getAttribute('data-logo')
    }
});

qrcode.toCanvas()
    .then(() => {
        if (hasSearchUrl('download')) window.downloadImage()
    })

function hasSearchUrl(name) {
    const search = new URLSearchParams(window.location.search);
    return search.has(name)
}




