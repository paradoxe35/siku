<div class="row">
    <div class="col-lg-6">
        <div class="card">
            <div class="card-header bg-transparent">
                <div class="row align-items-center">
                    <div class="col">
                        <h6 class="text-light text-uppercase ls-1 mb-1">{{ __('Aperçu') }}</h6>
                        <h5 class="h3 mb-0">{{ __('La valeur des ventes') }}</h5>
                    </div>
                    <div class="col">
                        <ul class="nav nav-pills justify-content-end">
                            <li class="nav-item mr-2 mr-md-0" data-target="Home--Home.chartData"
                                data-update-send="{{ $chartSendMonth }}" data-update='{{ $chartSalesMonth }}'>
                                <a href="#" class="nav-link py-2 px-3 active" data-toggle="tab">
                                    <span class="d-none d-md-block">{{ __('Mois') }}</span>
                                    <span class="d-md-none">M</span>
                                </a>
                            </li>
                            <li class="nav-item" data-target="Home--Home.chartData" data-update='{{ $chartSalesWeek }}'>
                                <a href="#" class="nav-link py-2 px-3" data-toggle="tab">
                                    <span class="d-none d-md-block">{{ __('Semaine') }}</span>
                                    <span class="d-md-none">W</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <div class="chart">
                    <div class="chartjs-size-monitor">
                        <div class="chartjs-size-monitor-expand">
                            <div class=""></div>
                        </div>
                        <div class="chartjs-size-monitor-shrink">
                            <div class=""></div>
                        </div>
                    </div>
                    <canvas data-target="Home--Home.overviewChart" class="chart-canvas chartjs-render-monitor"></canvas>
                </div>
            </div>
        </div>
    </div>
    <div class="col-lg-6">
        <div class="card">
            <div class="card-header bg-transparent">
                <div class="row align-items-center">
                    <div class="col">
                        <h6 class="text-uppercase text-muted ls-1 mb-1">{{ __('Consommation') }}</h6>
                        <h5 class="h3 mb-0">{{ __('Invitations envoyées') }}</h5>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <div class="chart">
                    <div class="chartjs-size-monitor">
                        <div class="chartjs-size-monitor-expand">
                            <div class=""></div>
                        </div>
                        <div class="chartjs-size-monitor-shrink">
                            <div class=""></div>
                        </div>
                    </div>
                    <canvas data-target="Home--Home.sendChart" class="chart-canvas chartjs-render-monitor"></canvas>
                </div>
            </div>
        </div>
    </div>
</div>