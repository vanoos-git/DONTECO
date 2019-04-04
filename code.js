$('#search').on('click', function(){
  var city= $("#info").val();
  var id = "e562e9a40d2793a5497a96952ef7e91b";
  var url = "https://api.openweathermap.org/data/2.5/forecast";
  $.ajax({
    url: url,
    dataType: "json",
    type: "GET",
    data: {
      q: city,
      appid: id,
      units: "metric",
      cnt: "4"
    },
    success: function(data) {
      var today = new Date();
      var tomorrow = new Date();
      var week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      var wf = "";
      $(".weather").html(wf);
      wf += "<h2>" + data.city.name + "</h2>";
      console.log(data);
      $.each(data.list, function(index, val) {
        tomorrow.setDate(today.getDate() + index);
        var date = week[tomorrow.getDay()];
        date += ' ' + tomorrow.getDate() + '/' + (tomorrow.getMonth() + 1) + '/' + tomorrow.getFullYear();
        if (index == 0) {
          wf += "<div class=\"bg-primary text-light \">";
          wf += "<div class=\"bg-dark bl\">"
          wf += "<h1>Today</h1>";
          wf += crtWeather(date, val);
          wf += "</div></div>";
        } else {
          wf += crtWeather(date, val);
        }
      });
      $(".weather").html(wf);
    }
  });
});

$('#info').keypress(function (e) {
  if (e.which == 13) {
    jQuery('#search').focus().click();
    return false;
  }
});

function crtWeather(date, val) {
  var html = "<p>"
  html += "<b>" + date + "</b> <br> " //
  html += "Temperature: " + val.main.temp + "&degC"
  html += "<span> | " + val.weather[0].description + "</span>";
  html += "<img src='https://openweathermap.org/img/w/" + val.weather[0].icon + ".png'>"
  html += "</p>"
  return html;
}
