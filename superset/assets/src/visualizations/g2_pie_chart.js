import G2 from '@antv/g2';
import { View } from '@antv/data-set';

function g2PieChartViz(slice , payload) {
    const div = d3.select(slice.selector);
    
    var html = '<div id="main"></div>';
    div.html(html);
	    
    // 此处开始完全拷贝官方示例代码
    // https://antv.alipay.com/zh-cn/g2/3.x/demo/pie/innerlabel.html
    const data = payload.data;
    const dv = new View();
    dv.source(data).transform({
        type: 'percent',
        field: 'count',
        dimension: 'item',
        as: 'percent'
    });
    const chart = new G2.Chart({
        container: 'main',
        forceFit: true,
        height: slice.height(),
    });
    chart.source(dv, {
        percent: {
            formatter: val => {
                val = (val * 100) + '%';
                return val;
            }
        }
    });
    chart.coord('theta');
    chart.tooltip({
        showTitle: false,
        itemTpl: '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
    });
    chart.intervalStack()
        .position('percent')
        .color('item')
        .label('percent', {
            offset: -40,
            // autoRotate: false,
            textStyle: {
                rotate: 0,
                textAlign: 'center',
                shadowBlur: 2,
                shadowColor: 'rgba(0, 0, 0, .45)'
            }
        })
        .tooltip('item*percent', (item, percent) => {
            percent = percent * 100 + '%';
            return {
                name: item,
                value: percent
            };
        })
        .style({
            lineWidth: 1,
            stroke: '#fff'
        });
    chart.render();
    // 此处结束拷贝官方示例代码
}

module.exports = g2PieChartViz;
