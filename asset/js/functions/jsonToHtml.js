//@ts-check
import { loadScript, loadStylesheet } from "./functions"

export const jsonToHtml = {
    makeParagraph(obj) {
        return `<p class="blog_post_text">
                        ${obj.data.text}    
                    </p>`
    },
    makeCode(data) {
        const id = `code-${Math.random()}`
        loadStylesheet('https://unpkg.com/@highlightjs/cdn-assets@10.4.0/styles/atom-one-dark.min.css')
        loadScript('https://unpkg.com/@highlightjs/cdn-assets@10.4.0/highlight.min.js', () => {
            // @ts-ignore
            const hljs = window.hljs
            window.setTimeout(() => {
                const el = document.getElementById(id)
                el && hljs.highlightBlock(el);
            }, 500)
        })
        return `<div style="overflow: auto;max-height: 1000px">
                <pre id=${id} class="prettyprint"><code>${data.code}</code></pre>
            </div>`
    },
    makeImage(obj) {
        const caption = obj.data.caption ? `<div class="blog_caption">
                                <p class="text-sm">${obj.data.caption}</p>
                            </div>` : ''
        return obj.data.withBackground ? `
            <div class="cdx-simple-image__picture cdx-simple-image__picture--with-background">
                <img src="${obj.data.url}" class="img-cover-full" alt="${obj.data.caption}" />
            </div>
            <small><em>${caption}</em></small>
        `: `
            <div class="d-flex justify-content-center">
                <article style="max-height: 550px;max-width:80%">
                    <img src="${obj.data.url}" class="img-cover-full" alt="${obj.data.caption}" />
                    <small><em>${caption}</em></small>
                </article>
            </div>
        `
    },
    makeEmbed(obj) {
        const caption = obj.data.caption ? `<div class="blog_caption">
                <p class="text-sm">${obj.data.caption}</p>
            </div>` : ''
        return `<div class="mt-5 justify-content-center d-flex" style="max-height: 550px;">
                <div style="width:90%">
                    <iframe width="100%" height="450" src="${obj.data.embed}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    <small><em>${caption}</em></small>
                </div>
            </div>`
    },
    makeHeader(obj) {
        return `<h${obj.data.level} class="blog_post_h${obj.data.level}">${obj.data.text}</h${obj.data.level}>`
    },
    makeList(obj) {
        if (obj.data.style === 'unordered') {
            const list = obj.data.items.map(item => {
                return `<li>${item}</li>`;
            });
            return `<ul class="blog_post_ul my-2">
                            ${list.join('')}
                        </ul>`;

        } else {
            const list = obj.data.items.map(item => {
                return `<li>${item}</li>`;
            });
            return `<ul class="blog_post_ul my-2">
                            ${list.join('')}
                        </ul>`
        }
    },
    makeDelimeter(obj) {
        return `<div class="ce-delimiter cdx-block my-3"></div>\n`
    },
    makeLinkTool(obj) {
        const meta = obj.data.meta
        return `
            <div class="card my-4 shadow-none border border-darken-1">
                <div class="card-body">
                    <div class="d-flex justify-content-between mb-3">
                        <div>
                            <h5 class="card-title">${meta.title}</h5>
                            <div class="card-text">${meta.description}</div>
                        </div>
                        ${meta.image.url.constructor === String && meta.image.url.length ? (`
                            <div style="height: 65px;width: 65px;">
                                <img src="${meta.image.url}" class="img-cover-full" alt="${meta.title}" />
                            </div>
                        `) : ''}
                    </div>
                    <div class="mt-2 mb-2">
                        <div class="card-subtitle">
                            <a href="${obj.data.link}" target="_blank" class="card-link text-sm text-muted">
                                ${(new URL(obj.data.link)).origin}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `
    }
}

/**
 * @param { Array } blocks 
 */
export const convertToHtml = (blocks) => {
    const jh = jsonToHtml
    return blocks.map((o) => {
        let output_HTML = ''
        switch (o.type) {
            case 'delimiter':
                output_HTML += jh.makeDelimeter(o)
                break;
            case 'image':
                output_HTML += jh.makeImage(o)
                break;
            case 'list':
                output_HTML += jh.makeList(o)
                break;
            case 'header':
                output_HTML += jh.makeHeader(o);
                break;
            case 'paragraph':
                output_HTML += jh.makeParagraph(o);
                break;
            case 'embed':
                output_HTML += jh.makeEmbed(o);
                break;
            case 'linkTool':
                output_HTML += jh.makeLinkTool(o);
                break;
            case 'code':
                output_HTML += jh.makeCode(o.data);
                break;
            default:
                return '';
        }
        return output_HTML;
    }).join('\n')
}