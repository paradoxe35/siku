import 'quill/dist/quill.snow.css'
import './style.scss'
import Quill from 'quill'
import BlotFormatter from "quill-blot-formatter";
import ImageCompress from 'quill-image-compress';


Quill.register("modules/blotFormatter", BlotFormatter);
Quill.register('modules/imageCompress', ImageCompress);

export const defaultOption = {
    modules: {
        toolbar: {
            container: [
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                ['link', 'blockquote', 'image'],
                [{ 'script': 'sub' }, { 'script': 'super' }],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                ['clean']
            ],
        },
        blotFormatter: {},
        imageCompress: {
            quality: 0.5,
            maxWidth: 1000,
            maxHeight: 1000,
            imageType: 'image/jpeg',
            debug: false,
        },
    },
    theme: 'snow',
}

export default Quill