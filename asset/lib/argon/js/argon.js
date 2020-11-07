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
    $(window).on('resize', function () {
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

const FormControl = function () {
    var e = $(".form-control");
    e.length && e.on("focus blur", function (e) {
        $(this).parents(".form-group").toggleClass("focused", "focus" === e.type)
    }).trigger("blur")
}

export const connect = () => {
    const o = { Layout, Tooltip, FormControl }
    for (const key in o) {
        o[key]()
    }
}