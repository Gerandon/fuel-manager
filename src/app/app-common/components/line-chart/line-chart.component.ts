import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild, ViewEncapsulation} from '@angular/core';
import {BaseChartDirective} from "ng2-charts";
import {
    ChartData, ChartDataset,
    ChartOptions,
} from 'chart.js';

@Component({
    selector: 'app-line-chart',
    templateUrl: './line-chart.component.html',
    styleUrls: ['./line-chart.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class LineChartComponent implements OnChanges {

    @Input() public dataSetList: {
        numbers: {month: number, day: number, value: number}[],
        label: string,
    }[] = [];
    @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

    /* example
    public lineChartData: ChartConfiguration['data'] = {
        datasets: [
            {
                data: [65, 59, 80, 81, 56, 55, 40],
                label: 'Series A',
                backgroundColor: 'rgba(148,159,177,0.2)',
                borderColor: 'rgba(148,159,177,1)',
                pointBackgroundColor: 'rgba(148,159,177,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(148,159,177,0.8)',
                fill: 'origin',
            },
            {
                data: [28, 48, 40, 19, 86, 27, 90],
                label: 'Series B',
                backgroundColor: 'rgba(77,83,96,0.2)',
                borderColor: 'rgba(77,83,96,1)',
                pointBackgroundColor: 'rgba(77,83,96,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(77,83,96,1)',
                fill: 'origin',
            },
            {
                data: [180, 480, 770, 90, 1000, 270, 400],
                label: 'Series C',
                yAxisID: 'y-axis-1',
                backgroundColor: 'rgba(255,0,0,0.3)',
                borderColor: 'red',
                pointBackgroundColor: 'rgba(148,159,177,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(148,159,177,0.8)',
                fill: 'origin',
            }
        ],
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July']
    };
     */

    public scatterChartData: ChartData<'scatter'> = {
        datasets: [],
    };
    private labels = ['Január', 'Február', 'Március', 'Április', 'Május', 'Június', 'Július', 'Augusztus', 'Szeptember', 'Október', 'November', 'December'];
    public chartOptions: ChartOptions<'scatter'> = {
        responsive: true,
        scales: {
            x: {
                ticks: {
                    stepSize: 1,
                    callback: (value: any) => {
                        return this.labels[+value.toString().split(',')[0]-1];
                    }
                },
            },
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label(tooltipItem: any): string | string[] {
                        const _labels = ['Január', 'Február', 'Március', 'Április', 'Május', 'Június', 'Július', 'Augusztus', 'Szeptember', 'Október', 'November', 'December'];
                        const _splitted = tooltipItem.raw.x.toString().split('.');
                        return [
                            `Rögzítve: ${_labels[_splitted[0]-1]} ${_splitted[1]}`,
                            `Érték: ${tooltipItem.formattedValue}`
                        ];
                    }
                }
            }
        }
    };

    constructor() {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.dataSetList) {
            const array = this.dataSetList.map((acc) => ({
                data: acc.numbers?.map(item => ({x: Number(`${item.month}.${item.day}`), y: item.value})),
                label: acc.label,
                pointRadius: 6,
                pointHoverRadius: 8,
                showLine: true,
                tension: 0.1,
                fill: false,
                borderColor: 'rgba(200, 0, 0, 1)'
            }));
            this.scatterChartData.datasets = [...array];
            this.chart?.update();
        }
    }
}
