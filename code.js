$(document).ready(function() {
  var id = "e562e9a40d2793a5497a96952ef7e91b";
  var city = "Rostov-on-don"; // My test case was "London"
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
      var today=new Date();
      var tomorrow=new Date();
      var week=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
      console.log('Received data:', data) // For testing
      var wf = "";
      wf += "<h2>" + data.city.name + "</h2>"; // City (displays once)
      $.each(data.list, function(index, val) {

        tomorrow.setDate(today.getDate()+index);
        var date = week[tomorrow.getDay()];
        date += ' '+tomorrow.getDate()+'/'+(tomorrow.getMonth()+1)+'/'+tomorrow.getFullYear();

        wf += "<p>" // Opening paragraph tag
        wf += "<b>Day: " + date + "</b> <br> " //
        wf += "Temperature: "+val.main.temp + "&degC" // Temperature
        wf += "<span> | " + val.weather[0].description + "</span>"; // Description
        wf += "<img src='https://openweathermap.org/img/w/" + val.weather[0].icon + ".png'>" // Icon
        wf += "</p>" // Closing paragraph tag
      });
      $(".weather").html(wf);
    }
  });
});
