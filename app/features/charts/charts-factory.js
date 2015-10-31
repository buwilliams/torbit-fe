var app = angular.module('torbitFeApp');

app.factory('ChartsFactory', function($http, Config, $u) {
  var factory = {};

  factory.data = [];
  factory.rawData = {};

  factory.getData = function(numberOfDays) {
    var config = { params: {} };
    if(typeof(numberOfDays) !== 'undefined') {
      config.params.size = numberOfDays;
    }
    $http.get(Config.serverUrl + '/report', config)
      .then(function(httpResponse) {
        $u.overwrite(factory.rawData, httpResponse.data);
        $u.overwrite(factory.data, factory.formatData(httpResponse.data.data));
      },
      function(httpResponse) {
        console.error('Chart Factory Error', httpResponse);
      });
  };

  factory.options = {
    axes: {
      x: {
        key: "x",
        labelFunction: function (v) {
          return v;
        }
      }
    },
    series: [
      {
        y: "value",
        label: "Time",
        color: "#d62728"
      }
    ]
  };

  // Puts data from backend in the format n3-sharts is expecting
  factory.formatData = function(data) {
    var result = [];
    for(var i=0; i<data.length; i++) {
      result.push({ x: data[i][0], value: data[i][1]});
    }
    return result;
  };

  factory.sampleData = {
   "data":[
      [ 1429116162361554342, 238 ],
      [ 1429202562361554342, 4016 ],
      [ 1429288962361554342, 4791 ],
      [ 1429375362361554342, 2678 ],
      [ 1429461762361554342, 3687 ],
      [ 1429548162361554342, 631 ],
      [ 1429634562361554342, 4997 ],
      [ 1429720962361554342, 517 ],
      [ 1429807362361554342, 2809 ],
      [ 1429893762361554342, 58 ],
      [ 1429980162361554342, 3040 ],
      [ 1430066562361554342, 1689 ],
      [ 1430152962361554342, 2039 ],
      [ 1430239362361554342, 1284 ],
      [ 1430325762361554342, 2304 ],
      [ 1430412162361554342, 4307 ],
      [ 1430498562361554342, 915 ],
      [ 1430584962361554342, 2195 ],
      [ 1430671362361554342, 4880 ],
      [ 1430757762361554342, 4195 ],
      [ 1430844162361554342, 1766 ],
      [ 1430930562361554342, 1342 ],
      [ 1431016962361554342, 2935 ],
      [ 1431103362361554342, 675 ],
      [ 1431189762361554342, 4683 ],
      [ 1431276162361554342, 1537 ],
      [ 1431362562361554342, 278 ],
      [ 1431448962361554342, 4262 ],
      [ 1431535362361554342, 1684 ],
      [ 1431621762361554342, 3526 ]
    ],
    "created":"2015-05-15T09:42:42.361554262-07:00",
    "startdate":"2015-04-15T09:42:42.361554342-07:00",
    "enddate":"2015-05-15T09:42:42.361554342-07:00",
    "size":30
  };

  return factory;
});
