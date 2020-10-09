<style>
    h1, h2, h3, h4, h5 {
        color: #3c465e;
    }
    .table {
        width: 100%;
        color: #3c465e;
        background-color: transparent;
    }

    .table td,
    .table th {
        vertical-align: top;
        border-top: 1px solid #e9ecef;
    }

     .table tbody th {
        margin-left: 32px;
    }

    .table thead th {
        vertical-align: bottom;
        border-bottom: 2px solid #e9ecef
    }

    .table tbody+tbody {
        border-top: 2px solid #e9ecef
    }

    .table-sm td,
    .table-sm th {
        padding: .5rem
    }

    .table-bordered {
        border: 1px solid #e9ecef
    }

    .table-bordered td,
    .table-bordered th {
        border: 1px solid #e9ecef
    }

    .table-bordered thead td,
    .table-bordered thead th {
        border-bottom-width: 2px
    }

    .table-borderless tbody+tbody,
    .table-borderless td,
    .table-borderless th,
    .table-borderless thead th {
        border: 0
    }

    .table-striped tbody tr:nth-of-type(odd) {
        background-color: rgba(246, 249, 252, .3)
    }

    .table-hover tbody tr:hover {
        color: #525f7f;
        background-color: #f6f9fc
    }

    .table-primary,
    .table-primary>td,
    .table-primary>th {
        background-color: #d2d8f7
    }

    .table-primary tbody+tbody,
    .table-primary td,
    .table-primary th,
    .table-primary thead th {
        border-color: #abb6f1
    }

    .table-hover .table-primary:hover {
        background-color: #bcc5f3
    }

    .table-hover .table-primary:hover>td,
    .table-hover .table-primary:hover>th {
        background-color: #bcc5f3
    }

    .table-secondary,
    .table-secondary>td,
    .table-secondary>th {
        background-color: #fdfefe
    }

    .table-secondary tbody+tbody,
    .table-secondary td,
    .table-secondary th,
    .table-secondary thead th {
        border-color: #fbfcfd
    }

    .table-hover .table-secondary:hover {
        background-color: #ecf6f6
    }

    .table-hover .table-secondary:hover>td,
    .table-hover .table-secondary:hover>th {
        background-color: #ecf6f6
    }

    .table-success,
    .table-success>td,
    .table-success>th {
        background-color: #c4f1de
    }

    .table-success tbody+tbody,
    .table-success td,
    .table-success th,
    .table-success thead th {
        border-color: #92e6c2
    }

    .table-hover .table-success:hover {
        background-color: #afecd2
    }

    .table-hover .table-success:hover>td,
    .table-hover .table-success:hover>th {
        background-color: #afecd2
    }

    .table-info,
    .table-info>td,
    .table-info>th {
        background-color: #bcf1fb
    }

    .table-info tbody+tbody,
    .table-info td,
    .table-info th,
    .table-info thead th {
        border-color: #83e5f7
    }

    .table-hover .table-info:hover {
        background-color: #a4ecfa
    }

    .table-hover .table-info:hover>td,
    .table-hover .table-info:hover>th {
        background-color: #a4ecfa
    }

    .table-warning,
    .table-warning>td,
    .table-warning>th {
        background-color: #fed3ca
    }

    .table-warning tbody+tbody,
    .table-warning td,
    .table-warning th,
    .table-warning thead th {
        border-color: #fdae9c
    }

    .table-hover .table-warning:hover {
        background-color: #febeb1
    }

    .table-hover .table-warning:hover>td,
    .table-hover .table-warning:hover>th {
        background-color: #febeb1
    }

    .table-danger,
    .table-danger>td,
    .table-danger>th {
        background-color: #fcc7d1
    }

    .table-danger tbody+tbody,
    .table-danger td,
    .table-danger th,
    .table-danger thead th {
        border-color: #fa96aa
    }

    .table-hover .table-danger:hover {
        background-color: #fbafbd
    }

    .table-hover .table-danger:hover>td,
    .table-hover .table-danger:hover>th {
        background-color: #fbafbd
    }

    .table-light,
    .table-light>td,
    .table-light>th {
        background-color: #e8eaed
    }

    .table-light tbody+tbody,
    .table-light td,
    .table-light th,
    .table-light thead th {
        border-color: #d4d9dd
    }

    .table-hover .table-light:hover {
        background-color: #dadde2
    }

    .table-hover .table-light:hover>td,
    .table-hover .table-light:hover>th {
        background-color: #dadde2
    }

    .table-dark,
    .table-dark>td,
    .table-dark>th {
        background-color: #c1c2c3
    }

    .table-dark tbody+tbody,
    .table-dark td,
    .table-dark th,
    .table-dark thead th {
        border-color: #8c8e90
    }

    .table-hover .table-dark:hover {
        background-color: #b4b5b6
    }

    .table-hover .table-dark:hover>td,
    .table-hover .table-dark:hover>th {
        background-color: #b4b5b6
    }

    .table-default,
    .table-default>td,
    .table-default>th {
        background-color: #bec4cd
    }

    .table-default tbody+tbody,
    .table-default td,
    .table-default th,
    .table-default thead th {
        border-color: #8691a2
    }

    .table-hover .table-default:hover {
        background-color: #b0b7c2
    }

    .table-hover .table-default:hover>td,
    .table-hover .table-default:hover>th {
        background-color: #b0b7c2
    }

    .table-white,
    .table-white>td,
    .table-white>th {
        background-color: #fff
    }

    .table-white tbody+tbody,
    .table-white td,
    .table-white th,
    .table-white thead th {
        border-color: #fff
    }

    .table-hover .table-white:hover {
        background-color: #f2f2f2
    }

    .table-hover .table-white:hover>td,
    .table-hover .table-white:hover>th {
        background-color: #f2f2f2
    }

    .table-neutral,
    .table-neutral>td,
    .table-neutral>th {
        background-color: #fff
    }

    .table-neutral tbody+tbody,
    .table-neutral td,
    .table-neutral th,
    .table-neutral thead th {
        border-color: #fff
    }

    .table-hover .table-neutral:hover {
        background-color: #f2f2f2
    }

    .table-hover .table-neutral:hover>td,
    .table-hover .table-neutral:hover>th {
        background-color: #f2f2f2
    }

    .table-darker,
    .table-darker>td,
    .table-darker>th {
        background-color: #b8b8b8
    }

    .table-darker tbody+tbody,
    .table-darker td,
    .table-darker th,
    .table-darker thead th {
        border-color: #7a7a7a
    }

    .table-hover .table-darker:hover {
        background-color: #ababab
    }

    .table-hover .table-darker:hover>td,
    .table-hover .table-darker:hover>th {
        background-color: #ababab
    }

    .table-active,
    .table-active>td,
    .table-active>th {
        background-color: #f6f9fc
    }

    .table-hover .table-active:hover {
        background-color: #e3ecf6
    }

    .table-hover .table-active:hover>td,
    .table-hover .table-active:hover>th {
        background-color: #e3ecf6
    }

    .table .thead-dark th {
        color: #f8f9fe;
        border-color: #1f3a68;
        background-color: #172b4d
    }

    .table .thead-light th {
        color: #8898aa;
        border-color: #e9ecef;
        background-color: #f6f9fc
    }

    .table-dark {
        color: #f8f9fe;
        background-color: #172b4d
    }

    .table-dark td,
    .table-dark th,
    .table-dark thead th {
        border-color: #1f3a68
    }

    .table-dark.table-bordered {
        border: 0
    }

    .table-dark.table-striped tbody tr:nth-of-type(odd) {
        background-color: rgba(255, 255, 255, .05)
    }

    .table-dark.table-hover tbody tr:hover {
        color: #f8f9fe;
        background-color: rgba(255, 255, 255, .075)
    }


    .table-responsive {
        display: block;
        /* overflow-x: auto; */
        width: 100%;
        /* -webkit-overflow-scrolling: touch */
    }

    .table-responsive>.table-bordered {
        border: 0
    }
</style>