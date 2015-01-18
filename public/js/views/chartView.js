var app = app || {};

app.ChartView = Backbone.View.extend({
  tag: 'div',
  parsedData: {},
  initialize: function() {
    this.collection = new app.Measurements({id: this.id});
    this.collection.fetch({reset: true});
    //this.model.fetch({reset: true});
    this.listenTo(this.collection, 'reset', this.render);
    console.log('init chartView');
  },
  parseData: function() {
    // store simple data
    var data = [];
    // parse data so highcharts can use it
    this.collection.each(function(measurement, index){
      data.push([Date.parse(measurement.get('time')), measurement.get('value')]);
    }, this);
    // we need to separate into different times of day
    var filter = _.groupBy(data, function(measurement){
      var time = moment(measurement[0]);
      if (time.hour() < 9){
        // breakfast 
        return 'breakfast';
      } else if (time.hour() < 16){
        // lunch
        return 'lunch';
      } else if (time.hour() < 24){
        // dinner
        return 'dinner';
      } else {
        console.error("We shouldn't be here");
        return 'unknown';
      }
    }, this);
    // assign the sorted data to the appropriate place in the parsed data
    // if there is no data for that cat, make it blank at the very least
    this.parsedData.breakfast = filter.breakfast || [];
    this.parsedData.lunch = filter.lunch || [];
    this.parsedData.dinner = filter.dinner || [];
    // now we need to sort data according to time, highcharts requires it
    // TODO make into one function
    // sort breakfast
    this.parsedData.breakfast.sort(function(a, b){
      return a[0] - b[0];
    });
    // sort lunch
    this.parsedData.lunch.sort(function(a, b){
      return a[0] - b[0];
    });
    // sort dinner
    this.parsedData.dinner.sort(function(a, b){
      return a[0] - b[0];
    });
    //this.parsedData = [[Date.parse("2013-01-06T17:30:00.000Z"), 100], [Date.parse("2013-01-07T17:30:00.000Z"), 250]];
  },
  render: function() {
    // get a model from the collection
    // render some stuff to the view
    console.log('render');
    this.parseData();
    this.$el.highcharts({
      chart: {
        zoomType: 'x',
        type: 'spline'
      },
      title: {
        text: 'Patient Blood Glucose Levels'
      },
      subtitle: {
        text: 'Measurements of past 15 days'
      },
      xAxis: {
        type: 'datetime',
        labels: {
          overflow: 'justify'
        }
      },
      yAxis: {
        title: {
          text: 'Glucose Level mg/dl'
        },
        min: 0,
        minorGridLineWidth: 0,
        gridLineWidth: 0,
        alternateGridColor: null,
        plotBands: [{ // Severe Hypoglycemia
          from: 0.0,
          to: 70,
          color: 'rgba(56, 110, 165, 0.4)',
          label: {
            text: 'Severe Hypoglycemia',
            style: {
              color: '#606060'
            }
          }
        }, { // Hypoglycemia
          from: 70,
          to: 80,
          color: 'rgba(56, 110, 165, 0.2)',
          label: {
            text: 'Hypoglycemia',
            style: {
              color: '#606060'
            }
          }
        }, { // Normal
          from: 80,
          to: 140,
          color: 'rgba(68, 170, 213, 0.0)',
          label: {
            text: 'Normal',
            style: {
              color: '#606060'
            }
          }
        }, { // Hyperglycemia
          from: 140,
          to: 160,
          color: 'rgba(56, 110, 165, 0.2)',
          label: {
            text: 'Hyperglycemia',
            style: {
              color: '#606060'
            }
          }
        }, { // Sever Hyperglycemia
          from: 160,
          to: 200,
          //color: 'rgba(173, 122, 124, 0.8)',
          color: 'rgba(56, 110, 165, 0.4)',
          label: {
            text: 'Severe Hyperglycemia',
            style: {
              color: '#606060'
            }
          }
        }, { // Deadish
          from: 200,
          to: 400,
          color: 'rgba(56, 110, 165, 0.9)',
          label: {
            text: 'Deadish',
            style: {
              color: '#000000'
            }
          }
        }]
      },
      tooltip: {
        valueSuffix: ' mg/dl'
      },
      plotOptions: {
        spline: {
          lineWidth: 3,
          states: {
            hover: {
              lineWidth: 6
            }
          },
          marker: {
            enabled: false
          }
        }
      },
      series: [{
        name: 'Breakfast',
        data: this.parsedData.breakfast,
        color: '#FFCF94'
        //data: [["2013-01-06T17:30:00.000Z", 100], ["2013-01-07T17:30:00.000Z", 250]]
      },{
        name: 'Lunch',
        data: this.parsedData.lunch,
        color: '#FFB9A1'
      },{
        name: 'Dinner',
        data: this.parsedData.dinner,
        color: '#FF94A0'
      }],
      navigation: {
        menuItemStyle: {
          fontSize: '10px'
        }
      }
    });
    return this;
  }
});
