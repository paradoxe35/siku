import Ejs, { EditorConfig } from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Embed from '@editorjs/embed'
import SimpleImage from '@editorjs/simple-image'
import Marker from '@editorjs/marker'
import LinkTool from '@editorjs/link'
import List from '@editorjs/list';
import Delimiter from '@editorjs/delimiter'
import CodeTool from '@editorjs/code';
import Underline from '@editorjs/underline';
import './style.scss'

/**
 * @param { EditorConfig } configuration 
 * @param { string } linkToolEndPoint 
 */
export const EditorJS = (configuration = {}, linkToolEndPoint) => new Ejs({
    ...configuration,
    holder: 'editorjs',
    tools: {
        header: {
            class: Header,
            inlineToolbar: true,
        },
        delimiter: Delimiter,
        list: {
            class: List,
            inlineToolbar: true,
        },
        embed: {
            class: Embed,
            config: {
                services: {
                    youtube: true,
                    coub: true
                }
            },
        },
        underline: Underline,
        code: CodeTool,
        image: SimpleImage,
        linkTool: {
            class: LinkTool,
            config: {
                endpoint: linkToolEndPoint, // Your backend endpoint for url data fetching
            }
        },
        Marker: {
            class: Marker,
            shortcut: 'CMD+SHIFT+M',
        }
    }
})