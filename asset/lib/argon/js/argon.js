const Layout = function () {
    function e() {
        $('.sidenav-toggler').data('action', 'sidenav-unpin')
        $('body').removeClass('g-sidenav-hidden').addClass('g-sidenav-show g-sidenav-pinned')
        $('body').append('<div class="backdrop d-xl-none" data-action="sidenav-unpin" data-target=' + $('#sidenav-main').data('target') + ' />')
    }
    function a() {
        $('.sidenav-toggler').data('action', 'sidenav-pin')
        $('body').removeClass('g-sidenav-pinned').addClass('g-sidenav-hidden')
        $('body').find('.backdrop').remove()
    }
    $(window).width() >= 768 && e();
    if ($(window).width() >= 768 && $('body').hasClass('g-sidenav-pinned')) {
        $('body').find('.backdrop').remove()
    }
    $(window).resize(function () {
        if ($(window).width() >= 768 && $('body').hasClass('g-sidenav-pinned') && $('body').find('.backdrop').length) {
            $('body').find('.backdrop').remove()
        }
        if ($(window).width() >= 768 && !$('body').hasClass('g-sidenav-pinned')) {
            e(), $('body').find('.backdrop').remove()
        }
        if ($(window).width() < 768 && $('body').hasClass('g-sidenav-pinned') && !$('body').find('.backdrop').length) {
            a()
        }
    })
    $('body').on('click', '[data-action]', function (t) {
        t.preventDefault();
        const n = $(this),
            i = n.data('action');
        n.data('target');
        switch (i) {
            case 'sidenav-pin':
                e();
                break;
            case 'sidenav-unpin':
                a();
                break;
        }
    })
}
const Tooltip = function () {
    const e = $('[data-toggle="tooltip"]');
    e.length && e.tooltip()
}
const Dropzones = function () {
    var e = $('[data-toggle="dropzone"]'),
        a = $('.dz-preview');
    e.length && (Dropzone.autoDiscover = !1, e.each(function () {
        var e,
            t,
            n,
            i,
            o;
        e = $(this),
            t = void 0 !== e.data('dropzone-multiple'),
            n = e.find(a),
            i = void 0,
            o = {
                url: e.data('dropzone-url'),
                thumbnailWidth: null,
                thumbnailHeight: null,
                previewsContainer: n.get(0),
                previewTemplate: n.html(),
                maxFiles: t ? null : 1,
                acceptedFiles: t ? null : 'image/*',
                init: function () {
                    this.on('addedfile', function (e) {
                        !t && i && this.removeFile(i),
                            i = e
                    })
                }
            },
            n.html(''),
            e.dropzone(o)
    }))
}

export const connect = () => {
    const o = { Layout, Tooltip, Dropzones }
    for (const key in o) {
        o[key]()
    }
}