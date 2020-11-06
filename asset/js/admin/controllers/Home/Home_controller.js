//@ts-check
import { Controller } from "stimulus"

/**
 * @param {*} Chart 
 */
const Charts = function (Chart) {
    const i = {
        gray: {
            100: "#f6f9fc",
            200: "#e9ecef",
            300: "#dee2e6",
            400: "#ced4da",
            500: "#adb5bd",
            600: "#8898aa",
            700: "#525f7f",
            800: "#32325d",
            900: "#212529"
        },
        theme: {
            default: "#172b4d",
            primary: "#5e72e4",
            secondary: "#f4f5f7",
            info: "#11cdef",
            success: "#2dce89",
            danger: "#f5365c",
            warning: "#fb6340"
        },
        black: "#12263F",
        white: "#FFFFFF",
        transparent: "transparent"
    };

    const g = Object.assign({}, Chart.defaults.global)

    Chart.defaults.global = {
        ...g,
        responsive: true,
        maintainAspectRatio: false,
        defaultColor: i.gray[600],
        defaultFontColor: i.gray[600],
        defaultFontSize: 13,
        layout: {
            padding: 0
        },
        legend: {
            display: false,
            position: "bottom",
            labels: {
                usePointStyle: true,
                padding: 16
            }
        }
    }

    Chart.scaleService.updateScaleDefaults("linear", {
        gridLines: {
            borderDash: [2],
            borderDashOffset: 2,
            color: i.gray[300],
            drawBorder: !1,
            drawTicks: !1,
            drawOnChartArea: !0,
            zeroLineWidth: 0,
            zeroLineColor: "rgba(0,0,0,0)",
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: 2
        },
        ticks: {
            beginAtZero: !0,
            padding: 10
        }
    })
    Chart.scaleService.updateScaleDefaults("category", {
        gridLines: {
            drawBorder: !1,
            drawOnChartArea: !1,
            drawTicks: !1
        },
        ticks: {
            padding: 20
        },
        maxBarThickness: 10
    })

    return i
}


export default class extends Controller {

    /**
     * @param { string } data 
     * @returns { { labels: Array,  data: Array } }
     */
    datas(data) {
        let r = { labels: [], data: [] }
        try {
            r = JSON.parse(data)
        } catch (error) {
            console.error(error)
        }
        return r
    }

    initialize() {
        this.chartDataEls = this.targets.findAll('chartData')
        this.defaultDataSales = this.datas(this.chartDataEls[0].getAttribute('data-update'))
        this.defaultDataSend = this.datas(this.chartDataEls[0].getAttribute('data-update-send'))
        this.chartjsInit()
    }

    async chartjsInit() {
        this.chartjs = (await import('chart.js'))
        const Chart = this.chartjs.default

        const i = Charts(Chart)

        this.line = this.lineChart(Chart, i)
        this.bar = this.barChart(Chart, i)

        this.chartDataEls.forEach(el => el.addEventListener('click', this.updateChartSales.bind(this, el)))
    }

    /**
     * @param { * } el 
     */
    updateChartSales(el) {
        if (el.querySelector('.active')) {
            return
        }
        const d = this.datas(el.getAttribute('data-update'))
        this.line.data.labels = d.labels
        this.line.data.datasets = [{
            data: d.data
        }]
        this.line.update({
            duration: 500,
            easing: 'linear'
        })
    }

    disconnect() {
        this.chartDataEls.forEach(el => el.removeEventListener('click', this.updateChartSales))
    }

    /**
     * @returns { Chart } i 
     */
    barChart(Chart, i) {
        return new Chart(this.targets.find('sendChart'), {
            type: "bar",
            data: {
                labels: this.defaultDataSend.labels,
                datasets: [{
                    data: this.defaultDataSend.data
                }]
            }
        })
    }

    /**
    * @returns { Chart } i 
    */
    lineChart(Chart, i) {
        return new Chart(this.targets.find('overviewChart'), {
            type: "line",
            options: {
                scales: {
                    yAxes: [{
                        gridLines: {
                            color: i.gray[200],
                            zeroLineColor: i.gray[200]
                        },
                        ticks: {}
                    }]
                }
            },
            data: {
                labels: this.defaultDataSales.labels,
                datasets: [{
                    data: this.defaultDataSales.data
                }]
            }
        })
    }

}
