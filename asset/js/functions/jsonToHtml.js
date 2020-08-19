export const jsonToHtml = {
    makeParagraph(obj) {
        return `<p class="blog_post_text">
                        ${obj.data.text}    
                    </p>`
    },
    makeImage(obj) {
        const caption = obj.data.caption ? `<div class="blog_caption">
                                <p>${obj.data.caption}</p>
                            </div>` : ''
        return `
            <article class="block-loop-item">
                <figure class="post-thumbnail" style="background-image: url(${obj.data.url});max-height: 550px;"></figure>
                <small><em>${caption}</em></small>
            </article>
        `
    },
    makeEmbed(obj) {
        const caption = obj.data.caption ? `<div class="list_item_btm_text">
                   <p class="nws3_text1"> ${obj.data.caption}</p>
               </div>` : ''
        return `<section class="nws3_sec4 my-2">
                    <div class="list_item_btm">
                        <div class="list_item_btm_img">
                        <iframe width="100%" height="415" src="${obj.data.embed}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </div>
                        <small><em>${caption}</em></small>
                    </div>
                </section>`
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
        return `<div class="ce-block">
            <div class="ce-block__content">
                <div class="ce-delimiter cdx-block my-3"><hr></div>
            </div>
            </div>\n`
    },
    makeLinkTool(obj) {
        const meta = obj.data.meta
        return `
            <div class="card my-4">
                <div class="card-body">
                    <h5 class="card-title">${meta.title}</h5>
                    <div class="row">
                        <div class="col-8">
                            <p class="card-text">${meta.description}</p>
                        </div>
                        <div class="col-4" style="height: 6rem;">
                            ${meta.image.url.constructor === String && meta.image.url.length ? (`
                                <img src="${meta.image.url}" class="img-cover-full" alt="${meta.title}" />
                            `) : ''}
                        </div>
                        <div class="mt-2">
                            <h6 class="card-subtitle mb-2 ml-2 text-muted">
                                <a href="${obj.data.link}" target="_blank" class="card-link">${(new URL(obj.data.link)).origin}</a>
                            </h6>
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
            default:
                return '';
        }
        return output_HTML;
    }).join('\n')
}