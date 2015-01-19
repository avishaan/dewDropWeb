var app = app || {};

app.HandleView = Backbone.View.extend({
  tag: 'div',
  parsedData: {},
  user: {},
  initialize: function() {
    this.collection = new app.Trusts({id: this.id});
    this.collection.fetch({reset: true});
    //this.model.fetch({reset: true});
    this.listenTo(this.collection, 'reset', this.render);
    console.log('init handleView');
  },
  parseData: function() {
    this.user = this.collection.models[0].toJSON();
    this.user.troll = parseInt(this.user.totals.TROLL);
    this.user.trust = parseInt(this.user.totals.TRUST);
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
    var $trust = $('<div></div>').addClass('trustiness');
    this.$el.append($trust);
    $trust.highcharts(Highcharts.merge(gaugeOptions, {
        yAxis: {
          stops: [
            [0.1, '#DF5353'], // red
            [0.5, '#DDDF0D'], // yellow
            [0.9, '#55BF3B'] // green
          ],
            min: 0,
            max: this.user.trust + this.user.troll,
            title: {
                text: 'Trust'
            }
        },

        credits: {
            enabled: false
        },

        series: [{
            name: 'Trust',
            data: [this.user.trust],
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
    var $troll = $('<div></div>').addClass('trolliness');
    this.$el.append($troll);
    $troll.highcharts(Highcharts.merge(gaugeOptions, {
        yAxis: {
            min: 0,
            max: this.user.trust + this.user.troll,
            title: {
                text: 'troll'
            }
        },

        series: [{
            name: 'troll',
            data: [this.user.troll],
            dataLabels: {
                format: '<div style="text-align:center"><span style="font-size:25px;color:' +
                    ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y:.1f}</span><br/>' +
                       '<span style="font-size:12px;color:silver"> trolliness</span></div>'
            },
            tooltip: {
                valueSuffix: ' trolliness'
            }
        }]

    }));
    return this;
  }
});
