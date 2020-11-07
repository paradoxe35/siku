<style>
    .breadcrumb-item+.breadcrumb-item {
        padding-top: 6px;
    }
</style>
<div class="row align-items-center">
    <div class="col-lg-6 col-7">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb breadcrumb-links breadcrumb-dark">
                <li class="breadcrumb-item">
                    <span class="h2 text-lg">{{ __($page) }}</span>
                </li>
                @yield('breadcrumb-items')
            </ol>
        </nav>
    </div>
</div>