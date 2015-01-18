var app = app || {};

app.HandleView = Backbone.View.extend({
  tag: 'div',
  parsedData: {},
  initialize: function() {
    this.collection = new app.Trusts({id: this.id});
    this.collection.fetch({reset: true});
    //this.model.fetch({reset: true});
    this.listenTo(this.collection, 'reset', this.render);
    console.log('init handleView');
  },
  parseData: function() {
    var data;
    var trust = this.collection.models[0].toJSON();
  },
  render: function() {
    // get a model from the collection
    // render some stuff to the view
    console.log('render');
    this.parseData();
    var gaugeOptions = {

      chart: {
        type: 'solidgauge'
      },

      title: null,

      pane: {
        center: ['50%', '85%'],
        size: '140%',
        startAngle: -90,
        endAngle: 90,
        background: {
          backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
          innerRadius: '60%',
          outerRadius: '100%',
          shape: 'arc'
        }
      },

      tooltip: {
        enabled: false
      },

      // the value axis
      yAxis: {
        stops: [
          [0.1, '#55BF3B'], // green
          [0.5, '#DDDF0D'], // yellow
          [0.9, '#DF5353'] // red
        ],
        lineWidth: 0,
        minorTickInterval: null,
        tickPixelInterval: 400,
        tickWidth: 0,
        title: {
          y: -70
        },
        labels: {
          y: 16
        }
      },

      plotOptions: {
        solidgauge: {
          dataLabels: {
            y: 5,
            borderWidth: 0,
            useHTML: true
          }
        }
      }
    };

    // The trust gauge
    var $trust = this.$el.append('#container-trust');
    this.$el.highcharts(Highcharts.merge(gaugeOptions, {
        yAxis: {
            min: 0,
            max: 200,
            title: {
                text: 'Trust'
            }
        },

        credits: {
            enabled: false
        },

        series: [{
            name: 'Trust',
            data: [80],
            dataLabels: {
                format: '<div style="text-align:center"><span style="font-size:25px;color:' +
                    ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y}</span><br/>' +
                       '<span style="font-size:12px;color:silver"> trustiness</span></div>'
            },
            tooltip: {
                valueSuffix: ' trustiness'
            }
        }]

    }));

    // The troll gauge
    this.$el.append.highcharts(Highcharts.merge(gaugeOptions, {
        yAxis: {
            min: 0,
            max: 50,
            title: {
                text: 'troll'
            }
        },

        series: [{
            name: 'troll',
            data: [5],
            dataLabels: {
                format: '<div style="text-align:center"><span style="font-size:25px;color:' +
                    ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y:.1f}</span><br/>' +
                       '<span style="font-size:12px;color:silver">* 1000 / min</span></div>'
            },
            tooltip: {
                valueSuffix: ' revolutions/min'
            }
        }]

    }));
    return this;
  }
});
