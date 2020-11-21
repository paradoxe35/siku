//@ts-check
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
        telegramPost: TelegramPost,
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

class TelegramPost {

    constructor({ data, api }) {
        this.data = data;
    }

    static get toolbox() {
        return {
            title: 'telegram-post',
            icon: '<svg enable-background="new 0 0 24 24" height="17" viewBox="0 0 24 24" width="17" xmlns="http://www.w3.org/2000/svg"><path d="m9.417 15.181-.397 5.584c.568 0 .814-.244 1.109-.537l2.663-2.545 5.518 4.041c1.012.564 1.725.267 1.998-.931l3.622-16.972.001-.001c.321-1.496-.541-2.081-1.527-1.714l-21.29 8.151c-1.453.564-1.431 1.374-.247 1.741l5.443 1.693 12.643-7.911c.595-.394 1.136-.176.691.218z" fill="#039be5"/></svg>'
        };
    }

    parseUrl(input, value, parent) {
        const script = document.createElement('script')

        if (value.trim().length) {
            const url = value.trim();
            try {
                const URI = new URL(url)
                if (URI.host !== 't.me') {
                    if (!parent.contains('error-link')) {
                        parent.add('error-link')
                    }
                } else {
                    const path = URI.pathname.slice(1)
                    input && (input.style.display = 'none');

                    script.async = true;
                    script.src = 'https://telegram.org/js/telegram-widget.js?14';
                    script.setAttribute('data-telegram-post', path);
                    script.setAttribute('data-width', '100%');
                    script.setAttribute('data-color', '5E72E4');

                    parent.classList.remove('error-link')

                    parent.appendChild(script)

                    return true
                }

            } catch (_) {
                if (!parent.classList.contains('error-link')) {
                    parent.classList.add('error-link')
                }
            }
        } else {
            if (!parent.classList.contains('error-link')) {
                parent.classList.add('error-link')
            }
        }
        return false
    }


    render() {
        const wrapper = document.createElement('div')
        wrapper.classList.add('telegram-post')

        const input = document.createElement('input');

        input.type = "text"

        input.classList.add('input-link-post');

        input.placeholder = 'Paste an image URL...';

        input.onpaste = () => {
            window.setTimeout(() => {
                const url = input.value.trim();
                this.parseUrl(input, url, wrapper)
            }, 500)
        }

        // @ts-ignore
        const value = this.data && this.data.url ? this.data.url : '';

        input.value = value

        wrapper.appendChild(input);

        this.parseUrl(input, value, wrapper)

        return wrapper;
    }

    save(blockContent) {
        const input = blockContent.querySelector('input');
        return {
            url: input.value
        }
    }

    validate(savedData) {
        if (!savedData.url.trim()) {
            return false;
        }

        return true;
    }
}