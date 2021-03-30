import 'quill/dist/quill.snow.css'
import './style.scss'
import Quill from 'quill'
import { Localize } from '@/js/functions/localize';
import BlotFormatter from "quill-blot-formatter";

Quill.register("modules/blotFormatter", BlotFormatter);

export const defaultOption = {
    modules: {
        toolbar: {
            container: [
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                ['link', 'blockquote'],
                [{ 'script': 'sub' }, { 'script': 'super' }],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                ['clean'],
                ['image']
            ],
            handlers: {
                image: imageHandler
            }
        },
        blotFormatter: {},
    },
    theme: 'snow',
}

function imageHandler() {
    const range = this.quill.getSelection();
    const value = prompt(Localize({ en: 'Enter the image link', fr: "Entrez le lien de l'image" }));
    if (value) {
        this.quill.insertEmbed(range.index, 'image', value, Quill.sources.USER);
    }
}

export default Quill