window.onload = function() {

var isInIframe = (window.location != window.parent.location) ? true : false;
if(isInIframe) {
  $("#fullscreen").show();
} else {
  $("#fullscreen").hide();
}

$("#fullscreen").click(function() {
  window.open(location.href);
});

var ease;

var width = window.innerWidth,
   height = window.innerHeight,
   radius = Math.min(width, height) / 1.9,
   spacing = .09;

window.onresize = function() {
   width = window.innerWidth;
   height = window.innerHeight;
   radius = Math.min(width, height) / 2.5;
   spacing = .09;
}

var formatSecond = d3.time.format("%S"),
   formatMinute = d3.time.format("%M"),
   formatHour = d3.time.format("%H"),
   formatDay = d3.time.format("%a"),
   formatDate = d3.time.format("%d"),
   formatMonth = d3.time.format("%b");

var color = d3.scale.linear()
   .range(["hsl(-180,50%,50%)", "hsl(180,50%,50%)"])
   .interpolate(interpolateHsl);

var arc = d3.svg.arc()
   .startAngle(0)
   .endAngle(function(d) { return d.value * 2 * Math.PI; })
   .innerRadius(function(d) { return d.index * radius; })
   .outerRadius(function(d) { return (d.index + spacing) * radius; });

var svg = d3.select("#clock").append("svg")
   .attr("width", width)
   .attr("height", height)
 .append("g")
   .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var field = svg.selectAll("g")
   .data(fields)
 .enter().append("g");

field.append("path");

field.append("text");

d3.transition().duration(0).each(tick);

d3.select(self.frameElement).style("height", height + "px");

function tick() {
  field = field
      .each(function(d) { this._value = d.value; })
      .data(fields)
      .each(function(d) { d.previousValue = this._value; });

function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null
}

var easing = getURLParameter("easing");
if(easing !== "") {
  ease = easing;
}

var bg = getURLParameter("bg");
if(bg !== "") {
  $("body").css("background", "#" + bg);
}


  field.select("path")
    .transition()
      .ease(ease)
      .attrTween("d", arcTween)
      .style("fill", function(d) { return color(d.value); });

  field.select("text")
      .attr("dy", function(d) { return d.value < .5 ? "-.5em" : "1em"; })
      .text(function(d) { return d.text; })
    .transition()
    .ease(ease)
      .attr("transform", function(d) {
        return "rotate(" + 360 * d.value + ")"
            + "translate(0," + -(d.index + spacing / 2) * radius + ")"
            + "rotate(" + (d.value < .5 ? -90 : 90) + ")"
      });

  setTimeout(tick, 1000 - Date.now() % 1000);
}

function arcTween(d) {
 var i = d3.interpolateNumber(d.previousValue, d.value);
 return function(t) { d.value = i(t); return arc(d); };
}

function fields() {
 var now = new Date;
 return [
   {index: .7, text: formatSecond(now), value: now.getSeconds() / 60},
   {index: .6, text: formatMinute(now), value: now.getMinutes() / 60},
   {index: .5, text: formatHour(now),  value: now.getHours() / 24},
   {index: .3, text: formatDay(now),    value: now.getDay() / 7},
   {index: .2, text: formatDate(now),  value: (now.getDate() - 1) / (32 - new Date(now.getYear(), now.getMonth(), 32).getDate())},
   {index: .1, text: formatMonth(now),  value: now.getMonth() / 12}
 ];
}

// Avoid shortest-path interpolation.
function interpolateHsl(a, b) {
 var i = d3.interpolateString(a, b);
 return function(t) {
   return d3.hsl(i(t));
 };
}

}