var tip = d3.select(".slideshow-container").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0)


//Slideshow

let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
  tip.style("opacity", 0);
}

function openTab(evt, name) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(name).style.display = "block";
  evt.currentTarget.className += " active";
}


//Graph Function

function graphFunction(func) {
  pointNum = 500;

  const data = [];
  for (let x = -10; x <= pointNum; x+=.1 ) {
    y = func(x);
    data.push([x, y])
  }
  return data;
}

function graphFunctionSE(func,start,end,step) {
  pointNum = end;

  const data = [];
  for (let x = start; x <= pointNum; x+=step ) {
    y = func(x);
    data.push([x, y])
  }
  return data;
}

function drawline(graph, xScale, yScale, func, color, classname){
var line = d3.line()
  .x(d => xScale(d[0]))
  .y(d => yScale(d[1]))
graph.append("path")
  .datum(graphFunction(func))
  .attr("clip-path", "url(#chart-area)")
  .attr("fill", "none")
  .attr("stroke", color)
  .attr("stroke-width", 2)
  .attr("d", line)
  .attr("class", classname)
  .attr("id", func.name)
}

function renderPointBasic(graph, xScale, yScale, x, y, color, func, correct) {
  // funcname = "#p" + x+"-"+y;
  graph
  .append("circle")
  .attr("cx", xScale(x))
  .attr("cy", yScale(y))
  .attr("fill", color)
  .attr("r", 5)
  .attr("class", "pointbasic")
  .on("mouseover", function(d){
    target = d3.select("#"+func);
    target.style("background-color", "pink");
  })
  .on("mouseout", function(d){
    target = d3.select("#"+func);
    target.style("background-color", "white");
  })
  .on("click", function(d){
    var w = window.innerWidth;
    tip.style("opacity", 1);
    if(correct){
      tip
       .html("Yes, this is the solution!")
       .style("left", (d.pageX -100 - (w-1000)/2) + "px")
       .style("top", (d.pageY -45) + "px")
       .style("background-color", "lightgreen")
      $("#basic-p").delay(400).fadeIn(300);

    } else{
      tip
       .html("Not this one, try again.")
       .style("left", (d.pageX -100 - (w-1000)/2) + "px")
       .style("top", (d.pageY -45) + "px")
       .style("background-color", "pink")
    }
  });
} 

function renderPointTan(graph, xScale, yScale, x, y, color, func) {
  graph
  .append("circle")
  .attr("cx", xScale(x))
  .attr("cy", yScale(y))
  .attr("fill", color)
  .attr("r", 5)
  .attr("class", "pointtan")
  .on("click", function(){
    target = d3.select("#"+func);
    clicks += 1;
    // target.style("opacity", 1);
    if(target.style("opacity") == 0){
      target.style("opacity", 1);
    } else {
      target.style("opacity", 0);
    }
    if(clicks>4){
      $("#tangent-p").show();
    }
  })
} 




//Basic Graph

const margin = { top: 10, right: 50, bottom: 50, left: 50 },
  width = 450 - margin.left - margin.right,
  height = 300 - margin.top - margin.bottom;


const svg_basicgraph = d3.select("#basic-graph").attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


// Define chart area
svg_basicgraph
  .append("clipPath")
  .attr("id", "chart-area")
  .append("rect")
  .attr("x", 0)
  .attr("y", 0)
  .attr("width", width)
  .attr("height", height)

// Add Axes
const xMin = -4;
const yMin = -6;
const xMax = 4;
const yMax = 6;

let xScale = d3.scaleLinear([xMin, xMax], [0, width])
let yScale = d3.scaleLinear([yMin, yMax], [height, 0])


let xAxis = d3.axisBottom(xScale)
let yAxis = d3.axisLeft(yScale)
var xAxisg = svg_basicgraph.append("g")
  .attr("transform", 'translate(0,' + (yScale(0)) + ')')
  .call(xAxis)
var yAxisg = svg_basicgraph.append("g")
  .attr("transform", 'translate(' +(xScale(0))  + ',0)')
  .call(yAxis)

// Axes label
svg_basicgraph.append("text")
  .attr("class", "x label")
  .attr("text-anchor", "end")
  .attr("x", width / 2 + 5)
  .attr("y", height + 35)
  .text("x");

svg_basicgraph.append("text")
  .attr("class", "y label")
  .attr("text-anchor", "end")
  .attr("y", -35)
  .attr("x", -height / 2)
  .attr("transform", "rotate(-90)")
  .html("y")

function f(x) {
  return x + 1;
}

drawline(svg_basicgraph,xScale, yScale, f, "blue", "main");

renderPointBasic(svg_basicgraph, xScale, yScale, -2,-1, "#ff8c8c", "r1", false);
renderPointBasic(svg_basicgraph, xScale, yScale, -1,0, "#ea4b4b", "r2", true);
renderPointBasic(svg_basicgraph, xScale, yScale, 0,1, "#c32424", "r3", false);
renderPointBasic(svg_basicgraph, xScale, yScale, 1,2, "#a70f0f", "r4",false);
renderPointBasic(svg_basicgraph, xScale, yScale, 2,3, "#630000", "r5",false);



//------------------------------

//Graph of Equations

d3.selectAll(".increase")
  .on("click", function(){
    number = d3.select(this.parentNode).select("p")
    number.text(parseInt(number.text())+1)
    d3.select("#f1").remove()
    drawline(svg_eegraph,xScale1, yScale1, f1, "blue", "main");
  })

d3.selectAll(".decrease")
  .on("click", function(){
    number = d3.select(this.parentNode).select("p")
    number.text(parseInt(number.text())-1)
    d3.select("#f1").remove()
    drawline(svg_eegraph,xScale1, yScale1, f1, "blue", "main");
  })

const margin1 = { top: 10, right: 50, bottom: 50, left: 50 },
  width1 = 450 - margin1.left - margin1.right,
  height1 = 300 - margin1.top - margin1.bottom;

const svg_eegraph = d3.select("#example-equation-graph").attr("width", width1 + margin1.left + margin1.right)
  .attr("height", height1 + margin1.top + margin1.bottom)
  .append("g")
  .attr("transform", "translate(" + margin1.left + "," + margin1.top + ")");

// Define chart area
svg_eegraph
  .append("clipPath")
  .attr("id", "chart-area1")
  .append("rect")
  .attr("x", 0)
  .attr("y", 0)
  .attr("width", width1)
  .attr("height", height1)

// Add Axes
const xMin1 = -4;
const yMin1 = -6;
const xMax1 = 4;
const yMax1 = 6;

let xScale1 = d3.scaleLinear([xMin1, xMax1], [0, width1])
let yScale1 = d3.scaleLinear([yMin1, yMax1], [height1, 0])


let xAxis1 = d3.axisBottom(xScale1)
let yAxis1 = d3.axisLeft(yScale1)
var xAxisg1 = svg_eegraph.append("g")
  .attr("transform", 'translate(0,' + (yScale1(0)) + ')')
  .call(xAxis1)
var yAxisg1 = svg_eegraph.append("g")
  .attr("transform", 'translate(' +(xScale1(0))  + ',0)')
  .call(yAxis1)

// Axes label
svg_eegraph.append("text")
  .attr("class", "x label")
  .attr("text-anchor", "end")
  .attr("x", width1 / 2 + 5)
  .attr("y", height1 + 35)
  .text("x");

svg_eegraph.append("text")
  .attr("class", "y label")
  .attr("text-anchor", "end")
  .attr("y", -35)
  .attr("x", -height1 / 2)
  .attr("transform", "rotate(-90)")
  .html("y")

function f1(x) {
  a = parseInt(d3.select("#cube-coeff").text())
  b = parseInt(d3.select("#square-coeff").text())
  c = parseInt(d3.select("#coeff").text())
  d = parseInt(d3.select("#constant").text())
  return a*x*x*x + b*x*x + c*x + d;
}

drawline(svg_eegraph,xScale1, yScale1, f1, "blue", "main");
$("#pluggedin").hide();

d3.select("#btn-sln-guess").on("click", function(){
  d3.select("#cube-coeff1").text(d3.select("#cube-coeff").text());
  d3.select("#square-coeff1").text(d3.select("#square-coeff").text());
  d3.select("#coeff1").text(d3.select("#coeff").text())
  d3.select("#constant1").text(d3.select("#constant").text())

  guess = parseFloat(d3.select("#sln-guess").property("value"))
  answer = f1(guess);
  dist = Math.abs(answer)
  text="";
  
  if(dist == 0){
    text += "Good job! That's the correct answer!."
    $("#guess-feedback").css("color","green");
  }
  else if (dist < 0.5){
    text += "Good approximation! When we plug " + guess + " into the equation, we approach 0."
    $("#guess-feedback").css("color","green");
  } else {
    text += "Try again... when we plug " + guess + " into the equation, we are not yet approaching 0."
    $("#guess-feedback").css("color","red");
  }

  $(".pluggedinvar").html(guess)
  $("#guessanswer").html(Math.round(answer*100)/100)
  $("#guess-feedback").html(text)
  $("#guess-feedback-prompt").fadeIn(300);
  $("#pluggedin").delay(600).fadeIn(300);
  $("#guess-feedback").delay(600).fadeIn(300);

})

//--------------------------
//Tangent graph

var clicks = 0;

const margin2 = { top: 10, right: 50, bottom: 20, left: 50 },
  width2 = 650 - margin2.left - margin2.right,
  height2 = 350 - margin2.top - margin2.bottom;

const svg2 = d3.select("#graph-tangents").attr("width", width2 + margin2.left + margin2.right)
  .attr("height", height2 + margin2.top + margin2.bottom)
  .append("g")
  .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

// Define chart area
svg2
  .append("clipPath")
  .attr("id", "chart-area2")
  .append("rect")
  .attr("x", 0)
  .attr("y", 0)
  .attr("width", width2)
  .attr("height", height2)

// Add Axes
const xMin2 = -4;
const yMin2 = -6;
const xMax2 = 4;
const yMax2 = 6;

let xScale2 = d3.scaleLinear([xMin2, xMax2], [0, width2])
let yScale2 = d3.scaleLinear([yMin2, yMax2], [height2, 0])


let xAxis2 = d3.axisBottom(xScale2)
let yAxis2 = d3.axisLeft(yScale2)
var xAxisg2 = svg2.append("g")
  .attr("transform", 'translate(0,' + (yScale2(0)) + ')')
  .call(xAxis2)
var yAxisg2 = svg2.append("g")
  .attr("transform", 'translate(' +(xScale2(0))  + ',0)')
  .call(yAxis2)

// Axes label
svg2.append("text")
  .attr("class", "x label")
  .attr("text-anchor", "end")
  .attr("x", width2 / 2 + 5)
  .attr("y", height2 + 35)
  .text("x");

svg2.append("text")
  .attr("class", "y label")
  .attr("text-anchor", "end")
  .attr("y", -35)
  .attr("x", -height2 / 2)
  .attr("transform", "rotate(-90)")
  .html("y")

function f2(x) {
  return x * x * x - 3*x + 2;
}


function tan1(x) {
  return 3.75 * x + 8.75;
}

function tan2(x) {
  return 6.1875 * x + 12.7188;
}


function tan3(x) {
  return 9* x +18;
}

function tan4(x) {
  return 1.6875 * x + 5.90625;
}

function tan5(x) {
  return 12.1875 * x + 24.7813;
}

drawline(svg2, xScale2, yScale2, f2, "blue", "main");

drawline(svg2,xScale2, yScale2, tan1, "#ea4b4b","tangentline");
drawline(svg2,xScale2, yScale2, tan2, "#c32424","tangentline");
drawline(svg2,xScale2, yScale2, tan3, "#a70f0f","tangentline");
drawline(svg2,xScale2, yScale2, tan4, "#ff8c8c","tangentline");
drawline(svg2,xScale2, yScale2, tan5, "#630000","tangentline");

renderPointTan(svg2,  xScale2, yScale2, -1.5,3.125, "#ea4b4b" , "tan1");
renderPointTan(svg2,  xScale2, yScale2, -1.75,1.89, "#c32424" , "tan2");
renderPointTan(svg2,  xScale2, yScale2, -2,0, "#a70f0f", "tan3");
renderPointTan(svg2,  xScale2, yScale2, -1.25,3.797, "#ff8c8c", "tan4");
renderPointTan(svg2,  xScale2, yScale2, -2.25,-2.64, "#630000", "tan5");


d3.selectAll(".tangentline").style("opacity",0);


//------------------

//Newton's method

const width3 = 500; 
const height3 = 300;
const padding3 = {top: 10, bottom: 10, left: 40, right: 20};

const svg_newton = d3.select("#newton-graph")
  .attr("width", width3 + padding3.right + padding3.left)
  .attr("height", height3 + padding3.top + padding3.bottom)
  
const plotArea3 = svg_newton.append("g").attr("transform","translate("+[padding3.left,padding3.top]+")")  

const clippingRect3 = plotArea3
  .append("clipPath")
  .attr("id", "clippy")
  .append("rect")
  .attr("width",width3)
  .attr("height",height3)
  .attr("fill","none")

const x3 = d3.scaleLinear().range([0,width3]).domain([0.5,2.5]);
let x3copy = x3.copy();
const y3 = d3.scaleLinear().range([height3,0]).domain([-2,3]);
let y3copy = y3.copy()

const xAxis3 = d3.axisBottom(x3copy);
const xAxisG3 = plotArea3.append("g")
  .attr("transform","translate("+[0,y3(0)]+")")
  .call(xAxis3);
  
const yAxis3 = d3.axisLeft(y3copy);
const yAxisG3 = plotArea3.append("g")
  .call(yAxis3)

function f3(x) {
  return x * x - 2;
}


var data3 = graphFunction(f3);

const line3 = d3.line()
    .x(d => x3copy(d[0]))
    .y(d => y3copy(d[1]));
    
const path3 = plotArea3.append("path")
  .datum(data3)
  .attr("d", line3)
  .attr("class", "mainline")
  .attr("clip-path","url(#clippy)")

function graphFunction2(x) {
  pointNum = 500;

  const data = [];
  for (let y = -10; y <= pointNum; y+=.1 ) {
    data.push([x, y])
  }
  return data;
}

function f3a(x) {
  return 4 * x - 6;
}

var data3a = graphFunction(f3a);

const line3a = d3.line()
    .x(d => x3copy(d[0]))
    .y(d => y3copy(d[1]));
    
const path3a = plotArea3.append("path")
  .datum(data3a)
  .attr("d", line3a)
  .attr("class", "tangentline1")


function f3b(x) {
  return 3 * x - 4.25;
}

var data3b = graphFunction(f3b);

const line3b = d3.line()
    .x(d => x3copy(d[0]))
    .y(d => y3copy(d[1]));
    
const path3b = plotArea3.append("path")
  .datum(data3b)
  .attr("d", line3b)
  .attr("class", "tangentline1")


function f3c(x) {
  return 2.833 * x - 4.00695;
}

var data3c = graphFunction(f3c);

const line3c = d3.line()
    .x(d => x3copy(d[0]))
    .y(d => y3copy(d[1]));
    
const path3c = plotArea3.append("path")
  .datum(data3c)
  .attr("d", line3c)
  .attr("class", "tangentline1")
  

var data3p1 = graphFunction2(2);

const line3p1 = d3.line()
    .x(d => x3copy(d[0]))
    .y(d => y3(d[1]));
    
const path3p1 = plotArea3.append("path")
  .datum(data3p1)
  .attr("d", line3p1)
  .attr("class", "verticalline")


var data3p2 = graphFunction2(1.5);

const line3p2 = d3.line()
    .x(d => x3copy(d[0]))
    .y(d => y3(d[1]));
    
const path3p2 = plotArea3.append("path")
  .datum(data3p2)
  .attr("d", line3p2)
  .attr("class", "verticalline")


var data3p3 = graphFunction2(1.41667);

const line3p3 = d3.line()
    .x(d => x3copy(d[0]))
    .y(d => y3copy(d[1]));
    
const path3p3 = plotArea3.append("path")
  .datum(data3p3)
  .attr("d", line3p3)
  .attr("class", "verticalline")



function renderPointN(plotArea,x,y,color,func,xs,ys){
  point = plotArea
    .append("circle")
    .attr("cx", xs(x))
    .attr("cy", ys(y))
    .attr("fill", color)
    .attr("r", 5)
    .attr("class", "point")
    .on("click",func)
  return point
}

p1 = renderPointN(plotArea3,2,2,"red",step2,x3,y3)
p2 = renderPointN(plotArea3,1.5, 0.25, "red", step4,x3,y3)
p3 = renderPointN(plotArea3,1.41667, 0.00695, "red",step6,x3,y3)

px1 = renderPointN(plotArea3,2,0, "green",step1,x3,y3)
px2 = renderPointN(plotArea3,1.5,0, "green",step3,x3,y3)
px3 = renderPointN(plotArea3,1.41667,0, "green",step5,x3,y3)
px4 = renderPointN(plotArea3,1.414, 0, "green","",x3,y3)
 
const zoom3 = d3.zoom()
  .scaleExtent([1, 20])
  .translateExtent([[0, 0], [width3, height3]])
  .on("zoom", function(event) {    

    var transform = event.transform;
    var updatedxScale = transform.rescaleX(x3);
    var updatedyScale = transform.rescaleY(y3);
    path3.attr("transform", transform)
    path3a.attr("transform", transform)
    path3b.attr("transform", transform)
    path3c.attr("transform", transform)
    path3p1.attr("transform", transform)
    path3p2.attr("transform", transform)
    path3p3.attr("transform", transform)

    p1.attr("cx", updatedxScale(2))
    p2.attr("cx", updatedxScale(1.5))
    p3.attr("cx", updatedxScale(1.41667))
    px1.attr("cx", updatedxScale(2))
    px2.attr("cx", updatedxScale(1.5))
    px3.attr("cx", updatedxScale(1.41667))
    px4.attr("cx", updatedxScale(1.414))

    p1.attr("cy", updatedyScale(2))
    p2.attr("cy", updatedyScale(0.25))
    p3.attr("cy", updatedyScale(0.007))
    px1.attr("cy", updatedyScale(0))
    px2.attr("cy", updatedyScale(0))
    px3.attr("cy", updatedyScale(0))
    px4.attr("cy", updatedyScale(0))

    yAxisG3.call(yAxis3.scale(updatedyScale))
    xAxisG3.call(xAxis3.scale(updatedxScale))
    .attr("transform","translate("+[0,updatedyScale(0)]+")")
  })

svg_newton.call(zoom3); 
var circlepulse = px1;

d3.selectAll(".tangentline1").style("opacity",0);
d3.selectAll(".verticalline").style("opacity",0);
d3.selectAll(".point").style("opacity",0);
px1.style("opacity",1)
pulse()
  // .classed("animate-point",true);
// px4.style("opacity",1);
$("#procedure td").hide()
$("#tbl-procedure .p1-1").show()
$("#tbl-procedure .p1-2").show()


function step1(){
  px1.style("opacity",0);
  p1.style("opacity", 1);
  circlepulse = p1;
  path3p1.style("opacity",1);
  $("#tbl-procedure .p2-1").show()
  $("#tbl-procedure .p2-2").show()
  $("#tbl-procedure .p1-1").css("opacity",0.5)
  $("#tbl-procedure .p1-2").css("opacity",0.5)
}

function step2(){
  // animate = false;
  path3a.style("opacity",1);
  px2.style("opacity",1);
  circlepulse = false;
  $("#tbl-procedure .p2-1").css("opacity",0.5)
  $("#tbl-procedure .p2-2").css("opacity",0.5)
  $("#tbl-procedure .p3-1").show()
  $("#tbl-procedure .p3-2").show()
}

function step3(){
  if (circlepulse == px2){
    px2.style("opacity",0);
    p2.style("opacity", 1);
    circlepulse = p2;
    path3p2.style("opacity",1);
    $("#tbl-procedure .p4-1").css("opacity",0.5)
    $("#tbl-procedure .p4-2").css("opacity",0.5)
    $("#tbl-procedure .p1-3").css("opacity",0.5)
    $("#tbl-procedure .p2-2").attr("colspan",2)
    $("#tbl-procedure .p2-2").css("opacity",1)
  }
}

function step4(){
  px3.style("opacity",1);
  circlepulse = false;
  path3b.style("opacity",1);
  $("#tbl-procedure .p2-2").css("opacity",0.5)
  $("#tbl-procedure .p3-3").show()
}

function step5(){
  if(circlepulse==px3){
    px3.style("opacity",0);
    p3.style("opacity", 1);
    circlepulse = p3;
    path3p3.style("opacity",1);
    $("#tbl-procedure .p4-3").css("opacity",0.5)
    $("#tbl-procedure .p1-4").css("opacity",0.5)
    $("#tbl-procedure .p2-2").attr("colspan",3)
    $("#tbl-procedure .p2-2").css("opacity",1)
  }
}

function step6(){
  px4.style("opacity",1);
  circlepulse = false;
  path3c.style("opacity",1);
  $("#tbl-procedure .p2-2").css("opacity",0.5)
  $("#tbl-procedure .p3-4").show()
}

$("#tbl-procedure .btn3-2").click(function(){
  $(this).hide()
  $("#tbl-procedure .p3-1").css("opacity",0.5)
  $("#tbl-procedure .p3-2").css("opacity",0.5)
  $("#tbl-procedure .p4-1").show()
  $("#tbl-procedure .p1-3").show()
  $("#tbl-procedure .p4-2").show()
  circlepulse = px2;
  pulse()
})

$("#tbl-procedure .btn3-3").click(function(){
  $(this).hide()
  $("#tbl-procedure .p1-4").show()
  $("#tbl-procedure .p3-3").css("opacity",0.5)
  $("#tbl-procedure .p4-3").show()
  circlepulse = px3;
  pulse()
})

$("#tbl-procedure .btn3-4").click(function(){
  $(this).hide()
  $("#tbl-procedure .p3-4").html("x=1.414 <span style='color: green'>&#10003;</span>")
  $("#tbl-procedure .p4-4").show()
  $("#procedure-msg").fadeIn()
})

$("#newtontable td").hide()

function pulse() {
  if(circlepulse){
    circlepulse
      .transition()
      .duration(500)
      .attr("r", 8)
      .transition()
      .duration(500)
      .attr("r", 5)
      .on("end", function(){return pulse(circlepulse);});
  }
}

//-------------------------
//Examples

//first example
const width4 = 500; 
const height4 = 200;
const padding4 = {top: 10, bottom: 10, left: 40, right: 20};

const svg_example1 = d3.select("#example1")
  .attr("width", width4 + padding4.right + padding4.left)
  .attr("height", height4 + padding4.top + padding4.bottom)
  
const plotArea4 = svg_example1.append("g").attr("transform","translate("+[padding4.left,padding4.top]+")")  

const clippingRect4 = plotArea4
  .append("clipPath")
  .attr("id", "clippy")
  .append("rect")
  .attr("width",width4)
  .attr("height",height4)
  .attr("fill","none")

const x4 = d3.scaleLinear().range([0,width4]).domain([0,15]);
// let x4copy = x4.copy();
const y4 = d3.scaleLinear().range([height4,0]).domain([-2,2]);
// let y4copy = y4.copy()

const xAxis4 = d3.axisBottom(x4);
const xAxisG4 = plotArea4.append("g")
  .attr("transform","translate("+[0,y4(0)]+")")
  .call(xAxis4);
  
const yAxis4 = d3.axisLeft(y4);
const yAxisG4 = plotArea4.append("g")
  .call(yAxis4)

function f4(x) {
  return 4* Math.log(x) - x;
}

var data4 = graphFunctionSE(f4,0.1,20,0.1);

const line4 = d3.line()
    .x(d => x4(d[0]))
    .y(d => y4(d[1]));
     
const path4 = plotArea4.append("path")
  .datum(data4)
  .attr("d", line4)
  .attr("class", "mainline")
  .attr("clip-path","url(#clippy)")

function f4a(x) {
  return y = -x/3 - 4 + 4 * Math.log(6);
}

var data4a = graphFunction(f4a);

const line4a = d3.line()
    .x(d => x4(d[0]))
    .y(d => y4(d[1]));
    
const path4a = plotArea4.append("path")
  .datum(data4a)
  .attr("d", line4a)
  .attr("class", "tangentline1")

function f4b(x) {
  return y = 5.00559 - 0.578992 * x;
}

var data4b = graphFunction(f4b);

const line4b = d3.line()
    .x(d => x4(d[0]))
    .y(d => y4(d[1]));
    
const path4b = plotArea4.append("path")
  .datum(data4b)
  .attr("d", line4b)
  .attr("class", "tangentline1")

function f4c(x) {
  return y = 4.62792 - 0.537305 * x;
}

var data4c = graphFunction(f4c);

const line4c = d3.line()
    .x(d => x4(d[0]))
    .y(d => y4(d[1]));
    
const path4c = plotArea4.append("path")
  .datum(data4c)
  .attr("d", line4c)
  .attr("class", "tangentline1")


var data4p1 = graphFunction2(6);

const line4p1 = d3.line()
    .x(d => x4(d[0]))
    .y(d => y4(d[1]));
    
const path4p1 = plotArea4.append("path")
  .datum(data4p1)
  .attr("d", line4p1)
  .attr("class", "verticalline")

var data4p2 = graphFunction2(9.5);

const line4p2 = d3.line()
    .x(d => x4(d[0]))
    .y(d => y4(d[1]));
    
const path4p2 = plotArea4.append("path")
  .datum(data4p2)
  .attr("d", line4p2)
  .attr("class", "verticalline")

var data4p3 = graphFunction2(8.6454);

const line4p3 = d3.line()
    .x(d => x4(d[0]))
    .y(d => y4(d[1]));
    
const path4p3 = plotArea4.append("path")
  .datum(data4p3)
  .attr("d", line4p3)
  .attr("class", "verticalline")

p41 = renderPointN(plotArea4, 6,1.167,"red",step2e1,x4,y4)
p42 = renderPointN(plotArea4, 9.5, -0.4955, "red", step4e1,x4,y4)
p43 = renderPointN(plotArea4, 8.6454, -0.01727, "red",step6e1,x4,y4)

px41 = renderPointN(plotArea4, 6,0, "green",step1e1,x4,y4)
px42 = renderPointN(plotArea4, 9.5,0, "green",step3e1,x4,y4)
px43 = renderPointN(plotArea4, 8.6454,0, "green",step5e1,x4,y4)
px44 = renderPointN(plotArea4, 8.613, 0, "green","",x4,y4)


d3.selectAll(".tangentline1").style("opacity",0);
d3.selectAll(".verticalline").style("opacity",0);
d3.selectAll(".point").style("opacity",0);

$("#example1").hide();

const zoom4 = d3.zoom()
  .scaleExtent([1, 20])
  .translateExtent([[0, 0], [width4, height4]])
  .on("zoom", function(event) {
    

    var transform = event.transform;
    var updatedxScale = transform.rescaleX(x4);
    var updatedyScale = transform.rescaleY(y4);
    path4.attr("transform", transform)
    path4a.attr("transform", transform)
    path4b.attr("transform", transform)
    path4c.attr("transform", transform)

    path4p1.attr("transform", transform)
    path4p2.attr("transform", transform)
    path4p3.attr("transform", transform)

    p41.attr("cx", updatedxScale(6))
    p42.attr("cx", updatedxScale(9.5))
    p43.attr("cx", updatedxScale(8.6454))
    px41.attr("cx", updatedxScale(6))
    px42.attr("cx", updatedxScale(9.5))
    px43.attr("cx", updatedxScale(8.6454))
    px44.attr("cx", updatedxScale(8.613))

    p41.attr("cy", updatedyScale(1.167))
    p42.attr("cy", updatedyScale(-0.4955))
    p43.attr("cy", updatedyScale(-0.01727))
    px41.attr("cy", updatedyScale(0))
    px42.attr("cy", updatedyScale(0))
    px43.attr("cy", updatedyScale(0))
    px44.attr("cy", updatedyScale(0))


    yAxisG4.call(yAxis4.scale(updatedyScale))
    xAxisG4.call(xAxis4.scale(updatedxScale))
    .attr("transform","translate("+[0,updatedyScale(0)]+")")
  })

svg_example1.call(zoom4); 


$("#example1-eq").click(function(){
  $("#example-equations div").removeClass("active");
  $(this).addClass("active");
  $("#other-examples svg").hide();
  $("#example1").show();
  px41.style("opacity",1);
  circlepulse = px41;
  pulse()
  $("#other-examples td").hide()
  $("#tbl-example1 .p1-1").show()
  $("#tbl-example1 .p1-2").show()
})

$("#tbl-example1 td").hide()

function step1e1(){
  px41.style("opacity",0);
  p41.style("opacity", 1);
  circlepulse = p41;
  path4p1.style("opacity",1);
  $("#tbl-example1 .p2-1").show()
  $("#tbl-example1 .p2-2").show()
  $("#tbl-example1 .p1-1").css("opacity",0.5)
  $("#tbl-example1 .p1-2").css("opacity",0.5)
}

function step2e1(){
  // animate = false;
  path4a.style("opacity",1);
  px42.style("opacity",1);
  circlepulse = false;
  $("#tbl-example1 .p2-1").css("opacity",0.5)
  $("#tbl-example1 .p2-2").css("opacity",0.5)
  $("#tbl-example1 .p3-1").show()
  $("#tbl-example1 .p3-2").show()
}

function step3e1(){
  if (circlepulse == px42){
    px42.style("opacity",0);
    p42.style("opacity", 1);
    circlepulse = p42;
    path4p2.style("opacity",1);
    $("#tbl-example1 .p4-1").css("opacity",0.5)
    $("#tbl-example1 .p4-2").css("opacity",0.5)
    $("#tbl-example1 .p1-3").css("opacity",0.5)
    $("#tbl-example1 .p2-2").attr("colspan",2)
    $("#tbl-example1 .p2-2").css("opacity",1)
  }

}

function step4e1(){
  px43.style("opacity",1);
  circlepulse = false;
  path4b.style("opacity",1);
  $("#tbl-example1 .p2-2").css("opacity",0.5)
  $("#tbl-example1 .p3-3").show()
}

function step5e1(){
  if (circlepulse == px43){
    px43.style("opacity",0);
    p43.style("opacity", 1);
    circlepulse = p43;
    path4p3.style("opacity",1);
    $("#tbl-example1 .p4-3").css("opacity",0.5)
    $("#tbl-example1 .p1-4").css("opacity",0.5)
    $("#tbl-example1 .p2-2").attr("colspan",3)
    $("#tbl-example1 .p2-2").css("opacity",1)
  }

}

function step6e1(){
  px44.style("opacity",1);
  circlepulse = false;
  path4c.style("opacity",1);
  $("#tbl-example1 .p2-2").css("opacity",0.5)
  $("#tbl-example1 .p3-4").show()
}

$("#tbl-example1 .btn3-2").click(function(){
  $(this).hide()
  $("#tbl-example1 .p3-1").css("opacity",0.5)
  $("#tbl-example1 .p3-2").css("opacity",0.5)
  $("#tbl-example1 .p4-1").show()
  $("#tbl-example1 .p1-3").show()
  $("#tbl-example1 .p4-2").show()
  circlepulse = px42;
  pulse()
})

$("#tbl-example1 .btn3-3").click(function(){
  $(this).hide()
  $("#tbl-example1 .p1-4").show()
  $("#tbl-example1 .p3-3").css("opacity",0.5)
  $("#tbl-example1 .p4-3").show()
  circlepulse = px43;
  pulse()
})

$("#tbl-example1 .btn3-4").click(function(){
  $(this).hide()
  $("#tbl-example1 .p3-4").html("x=8.613 <span style='color: green'>&#10003;</span>")
  $("#tbl-example1 .p4-4").show()
})


//second example

const width5 = 500; 
const height5 = 200;
const padding5 = {top: 10, bottom: 10, left: 40, right: 20};

const svg_example2 = d3.select("#example2")
  .attr("width", width5 + padding5.right + padding5.left)
  .attr("height", height5 + padding5.top + padding5.bottom)
  
const plotArea5 = svg_example2.append("g").attr("transform","translate("+[padding5.left,padding5.top]+")")  

const clippingRect5 = plotArea5
  .append("clipPath")
  .attr("id", "clippy")
  .append("rect")
  .attr("width",width5)
  .attr("height",height5)
  .attr("fill","none")

const x5 = d3.scaleLinear().range([0,width5]).domain([0,2]);
const y5 = d3.scaleLinear().range([height5,0]).domain([-1,1]);

const xAxis5 = d3.axisBottom(x5);
const xAxisG5 = plotArea5.append("g")
  .attr("transform","translate("+[0,y5(0)]+")")
  .call(xAxis5);
  
const yAxis5 = d3.axisLeft(y5);
const yAxisG5 = plotArea5.append("g")
  .attr("transform","translate("+[x5(0),0]+")")
  .call(yAxis5)

function f5(x) {
  return Math.sin(x) - x * x;
}

var data5 = graphFunctionSE(f5,-1,5,0.05);

const line5 = d3.line()
    .x(d => x5(d[0]))
    .y(d => y5(d[1]));
     
const path5 = plotArea5.append("path")
  .datum(data5)
  .attr("d", line5)
  .attr("class", "mainline")
  .attr("clip-path","url(#clippy)")

function f5a(x) {
  return y = x * (Math.cos(1) - 2) + 1 + Math.sin(1) - Math.cos(1);
}

var data5a = graphFunction(f5a);

const line5a = d3.line()
    .x(d => x5(d[0]))
    .y(d => y5(d[1]));
    
const path5a = plotArea5.append("path")
  .datum(data5a)
  .attr("d", line5a)
  .attr("class", "tangentline1")

function f5b(x) {
  return y = 1.01246 - 1.15448 * x;
}

var data5b = graphFunction(f5b);

const line5b = d3.line()
    .x(d => x5(d[0]))
    .y(d => y5(d[1]));
    
const path5b = plotArea5.append("path")
  .datum(data5b)
  .attr("d", line5b)
  .attr("class", "tangentline1")

var data5p1 = graphFunction2(1);

const line5p1 = d3.line()
    .x(d => x5(d[0]))
    .y(d => y5(d[1]));
    
const path5p1 = plotArea5.append("path")
  .datum(data5p1)
  .attr("d", line5p1)
  .attr("class", "verticalline")

var data5p2 = graphFunction2(0.891);

const line5p2 = d3.line()
    .x(d => x5(d[0]))
    .y(d => y5(d[1]));
    
const path5p2 = plotArea5.append("path")
  .datum(data5p2)
  .attr("d", line5p2)
  .attr("class", "verticalline")


p51 = renderPointN(plotArea5, 1,-0.1585,"red",step2e2,x5,y5)
p52 = renderPointN(plotArea5, 0.891, -0.0166, "red", step4e2,x5,y5)

px51 = renderPointN(plotArea5, 1,0, "green",step1e2,x5,y5)
px52 = renderPointN(plotArea5, 0.891,0, "green",step3e2,x5,y5)
px53 = renderPointN(plotArea5, 0.877,0, "green","",x5,y5)


d3.selectAll(".tangentline1").style("opacity",0);
d3.selectAll(".verticalline").style("opacity",0);
d3.selectAll(".point").style("opacity",0);

$("#example2").hide();

const zoom5 = d3.zoom()
  .scaleExtent([1, 20])
  .translateExtent([[0, 0], [width5, height5]])
  .on("zoom", function(event) {
    

    var transform = event.transform;
    var updatedxScale = transform.rescaleX(x5);
    var updatedyScale = transform.rescaleY(y5);
    path5.attr("transform", transform)
    path5a.attr("transform", transform)
    path5b.attr("transform", transform)
    // path5c.attr("transform", transform)

    path5p1.attr("transform", transform)
    path5p2.attr("transform", transform)
    // path5p3.attr("transform", transform)

    p51.attr("cx", updatedxScale(1))
    p52.attr("cx", updatedxScale(0.891))
    // p53.attr("cx", updatedxScale(8.))
    px51.attr("cx", updatedxScale(1))
    px52.attr("cx", updatedxScale(0.891))
    px53.attr("cx", updatedxScale(0.877))
    // px54.attr("cx", updatedxScale(8.613))

    p51.attr("cy", updatedyScale(-0.1585))
    p52.attr("cy", updatedyScale(-0.0166))
    // p53.attr("cy", updatedyScale(-0.01727))
    px51.attr("cy", updatedyScale(0))
    px52.attr("cy", updatedyScale(0))
    px53.attr("cy", updatedyScale(0))
    // px54.attr("cy", updatedyScale(0))


    yAxisG5.call(yAxis5.scale(updatedyScale))
    // .attr("transform","translate("+[updatedxScale(0),0]+")")
    xAxisG5.call(xAxis5.scale(updatedxScale))
    .attr("transform","translate("+[0,updatedyScale(0)]+")")

  })

svg_example2.call(zoom5); 

$("#example2-eq").click(function(){
  $("#example-equations div").removeClass("active");
  $(this).addClass("active");
  $("#other-examples svg").hide();
  $("#example2").show();
  px51.style("opacity",1);
  circlepulse = px51;
  pulse()
  $("#other-examples td").hide()
  $("#tbl-example2 .p1-1").show()
  $("#tbl-example2 .p1-2").show()
})

$("#tbl-example2 td").hide()

function step1e2(){
  px51.style("opacity",0);
  p51.style("opacity", 1);
  circlepulse = p51;
  path5p1.style("opacity",1);
  $("#tbl-example2 .p2-1").show()
  $("#tbl-example2 .p2-2").show()
  $("#tbl-example2 .p1-1").css("opacity",0.5)
  $("#tbl-example2 .p1-2").css("opacity",0.5)
}

function step2e2(){
  // animate = false;
  path5a.style("opacity",1);
  px52.style("opacity",1);
  circlepulse = false;
  $("#tbl-example2 .p2-1").css("opacity",0.5)
  $("#tbl-example2 .p2-2").css("opacity",0.5)
  $("#tbl-example2 .p3-1").show()
  $("#tbl-example2 .p3-2").show()
}

function step3e2(){
  if (circlepulse == px52){
    px52.style("opacity",0);
    p52.style("opacity", 1);
    circlepulse = p52;
    path5p2.style("opacity",1);
    $("#tbl-example2 .p4-1").css("opacity",0.5)
    $("#tbl-example2 .p4-2").css("opacity",0.5)
    $("#tbl-example2 .p1-3").css("opacity",0.5)
    $("#tbl-example2 .p2-2").attr("colspan",2)
    $("#tbl-example2 .p2-2").css("opacity",1)
  } 
}

function step4e2(){
  px53.style("opacity",1);
  circlepulse = false;
  path5b.style("opacity",1);
  $("#tbl-example2 .p2-2").css("opacity",0.5)
  $("#tbl-example2 .p3-3").show()
}

$("#tbl-example2 .btn3-2").click(function(){
  $(this).hide()
  $("#tbl-example2 .p3-1").css("opacity",0.5)
  $("#tbl-example2 .p3-2").css("opacity",0.5)
  $("#tbl-example2 .p4-1").show()
  $("#tbl-example2 .p1-3").show()
  $("#tbl-example2 .p4-2").show()
  circlepulse = px52;
  pulse()
})

$("#tbl-example2 .btn3-3").click(function(){
  $(this).hide()
  // $("#tbl-example2 .p1-4").show()
  $("#tbl-example2 .p3-3").html("x=0.877 <span style='color: green'>&#10003;</span>")
  $("#tbl-example2 .p4-3").show()
})


//third example--------------
const width6 = 500; 
const height6 = 200;
const padding6 = {top: 10, bottom: 10, left: 40, right: 20};

const svg_example3 = d3.select("#example3")
  .attr("width", width6 + padding6.right + padding6.left)
  .attr("height", height6 + padding6.top + padding6.bottom)
  
const plotArea6 = svg_example3.append("g").attr("transform","translate("+[padding6.left,padding6.top]+")")  

const clippingRect6 = plotArea6
  .append("clipPath")
  .attr("id", "clippy")
  .append("rect")
  .attr("width",width6)
  .attr("height",height6)
  .attr("fill","none")

const x6 = d3.scaleLinear().range([0,width6]).domain([-10,10]);
const y6 = d3.scaleLinear().range([height6,0]).domain([-3,3]);

const xAxis6 = d3.axisBottom(x6);
const xAxisG6 = plotArea6.append("g")
  .attr("transform","translate("+[0,y6(0)]+")")
  .call(xAxis6);
  
const yAxis6 = d3.axisLeft(y6);
const yAxisG6 = plotArea6.append("g")
  .attr("transform","translate("+[x6(0),0]+")")
  .call(yAxis6)

function f6(x) {
  return Math.cbrt(x);
}

var data6 = graphFunctionSE(f6,-15,15,0.1);

const line6 = d3.line()
    .x(d => x6(d[0]))
    .y(d => y6(d[1]));
     
const path6 = plotArea6.append("path")
  .datum(data6)
  .attr("d", line6)
  .attr("class", "mainline")
  .attr("clip-path","url(#clippy)")

function f6a(x) {
  return y = x/3 + 2/3;
}

var data6a = graphFunction(f6a);

const line6a = d3.line()
    .x(d => x6(d[0]))
    .y(d => y6(d[1]));
    
const path6a = plotArea6.append("path")
  .datum(data6a)
  .attr("d", line6a)
  .attr("class", "tangentline1")

function f6b(x) {
  return y = 0.20999 * x - 0.83995;
}

var data6b = graphFunction(f6b);

const line6b = d3.line()
    .x(d => x6(d[0]))
    .y(d => y6(d[1]));
    
const path6b = plotArea6.append("path")
  .datum(data6b)
  .attr("d", line6b)
  .attr("class", "tangentline1")

function f6c(x) {
  return y = 0.13228 * x + 1.0583;
}

var data6c = graphFunction(f6c);

const line6c = d3.line()
    .x(d => x6(d[0]))
    .y(d => y6(d[1]));
    
const path6c = plotArea6.append("path")
  .datum(data6c)
  .attr("d", line6c)
  .attr("class", "tangentline1")


var data6p1 = graphFunction2(1);

const line6p1 = d3.line()
    .x(d => x6(d[0]))
    .y(d => y6(d[1]));
    
const path6p1 = plotArea6.append("path")
  .datum(data6p1)
  .attr("d", line6p1)
  .attr("class", "verticalline")

var data6p2 = graphFunction2(-2);

const line6p2 = d3.line()
    .x(d => x6(d[0]))
    .y(d => y6(d[1]));
    
const path6p2 = plotArea6.append("path")
  .datum(data6p2)
  .attr("d", line6p2)
  .attr("class", "verticalline")

var data6p3 = graphFunction2(4);

const line6p3 = d3.line()
    .x(d => x6(d[0]))
    .y(d => y6(d[1]));
    
const path6p3 = plotArea6.append("path")
  .datum(data6p3)
  .attr("d", line6p3)
  .attr("class", "verticalline")

p61 = renderPointN(plotArea6, 1,1,"red",step2e3,x6,y6)
p62 = renderPointN(plotArea6, -2, -1.26, "red", step4e3,x6,y6)
p63 = renderPointN(plotArea6, 4, 1.5874, "red",step6e3,x6,y6)

px61 = renderPointN(plotArea6, 1,0, "green",step1e3,x6,y6)
px62 = renderPointN(plotArea6, -2,0, "green",step3e3,x6,y6)
px63 = renderPointN(plotArea6, 4,0, "green",step5e3,x6,y6)
px64 = renderPointN(plotArea6, -8, 0, "green","",x6,y6)


d3.selectAll(".tangentline1").style("opacity",0);
d3.selectAll(".verticalline").style("opacity",0);
d3.selectAll(".point").style("opacity",0);

$("#example3").hide();

const zoom6 = d3.zoom()
  .scaleExtent([1, 20])
  .translateExtent([[0, 0], [width6, height6]])
  .on("zoom", function(event) {
    

    var transform = event.transform;
    var updatedxScale = transform.rescaleX(x6);
    var updatedyScale = transform.rescaleY(y6);
    path6.attr("transform", transform)
    path6a.attr("transform", transform)
    path6b.attr("transform", transform)
    path6c.attr("transform", transform)

    path6p1.attr("transform", transform)
    path6p2.attr("transform", transform)
    path6p3.attr("transform", transform)

    p61.attr("cx", updatedxScale(1))
    p62.attr("cx", updatedxScale(-2))
    p63.attr("cx", updatedxScale(4))
    px61.attr("cx", updatedxScale(1))
    px62.attr("cx", updatedxScale(-2))
    px63.attr("cx", updatedxScale(4))
    px64.attr("cx", updatedxScale(-8))

    p61.attr("cy", updatedyScale(1))
    p62.attr("cy", updatedyScale(-1.26))
    p63.attr("cy", updatedyScale(1.5874))
    px61.attr("cy", updatedyScale(0))
    px62.attr("cy", updatedyScale(0))
    px63.attr("cy", updatedyScale(0))
    px64.attr("cy", updatedyScale(0))


    yAxisG6.call(yAxis6.scale(updatedyScale))
    .attr("transform","translate("+[updatedxScale(0),0]+")")
    xAxisG6.call(xAxis6.scale(updatedxScale))
    .attr("transform","translate("+[0,updatedyScale(0)]+")")
  })

svg_example3.call(zoom6); 


$("#example3-eq").click(function(){
  $("#example-equations div").removeClass("active");
  $(this).addClass("active");
  $("#other-examples svg").hide();
  $("#example3").show();
  px61.style("opacity",1);
  circlepulse = px61;
  pulse()
  $("#other-examples td").hide()
  $("#tbl-example3 .p1-1").show()
  $("#tbl-example3 .p1-2").show()
})


$("#tbl-example3 td").hide()

function step1e3(){
  px61.style("opacity",0);
  p61.style("opacity", 1);
  circlepulse = p61;
  path6p1.style("opacity",1);
  $("#tbl-example3 .p2-1").show()
  $("#tbl-example3 .p2-2").show()
  $("#tbl-example3 .p1-1").css("opacity",0.5)
  $("#tbl-example3 .p1-2").css("opacity",0.5)
}

function step2e3(){
  // animate = false;
  path6a.style("opacity",1);
  px62.style("opacity",1);
  circlepulse = false;
  $("#tbl-example3 .p2-1").css("opacity",0.5)
  $("#tbl-example3 .p2-2").css("opacity",0.5)
  $("#tbl-example3 .p3-1").show()
  $("#tbl-example3 .p3-2").show()
}

function step3e3(){
  if (circlepulse == px62){
    px62.style("opacity",0);
    p62.style("opacity", 1);
    circlepulse = p62;
    path6p2.style("opacity",1);
    $("#tbl-example3 .p4-1").css("opacity",0.5)
    $("#tbl-example3 .p4-2").css("opacity",0.5)
    $("#tbl-example3 .p1-3").css("opacity",0.5)
    $("#tbl-example3 .p2-2").attr("colspan",2)
    $("#tbl-example3 .p2-2").css("opacity",1)
  }
}

function step4e3(){
  px63.style("opacity",1);
  circlepulse = false;
  path6b.style("opacity",1);
  $("#tbl-example3 .p2-2").css("opacity",0.5)
  $("#tbl-example3 .p3-3").show()
}

function step5e3(){
  if(circlepulse==px63){
    px63.style("opacity",0);
    p63.style("opacity", 1);
    circlepulse = p63;
    path6p3.style("opacity",1);
    $("#tbl-example3 .p4-3").css("opacity",0.5)
    $("#tbl-example3 .p1-4").css("opacity",0.5)
    $("#tbl-example3 .p2-2").attr("colspan",3)
    $("#tbl-example3 .p2-2").css("opacity",1)
  }
}

function step6e3(){
  px64.style("opacity",1);
  circlepulse = false;
  path6c.style("opacity",1);
  $("#tbl-example3 .p2-2").css("opacity",0.5)
  $("#tbl-example3 .p3-4").show()
}

$("#tbl-example3 .btn3-2").click(function(){
  $(this).hide()
  $("#tbl-example3 .p3-1").css("opacity",0.5)
  $("#tbl-example3 .p3-2").css("opacity",0.5)
  $("#tbl-example3 .p4-1").show()
  $("#tbl-example3 .p1-3").show()
  $("#tbl-example3 .p4-2").show()
  circlepulse = px62;
  pulse()
})

$("#tbl-example3 .btn3-3").click(function(){
  $(this).hide()
  $("#tbl-example3 .p1-4").show()
  $("#tbl-example3 .p3-3").css("opacity",0.5)
  $("#tbl-example3 .p4-3").show()
  circlepulse = px63;
  pulse()
})

$("#tbl-example3 .btn3-4").click(function(){
  $(this).hide()
  $("#tbl-example3 .p4-4").show()
  $("#ex3-exp").fadeIn();
})

px1.style("opacity",1)

//-------------------------
//Digging deeper

$("#dig-yes").hide();
$("#dig-no").hide();

$("#dig-yes-btn").click(function(){
  $("#dig-p").hide();
  $("#dig").hide()
  $("#dig-yes").fadeIn();
})

$("#dig-no-btn").click(function(){
  $("#dig-p").hide();
  $("#dig").hide()
  $("#dig-no").fadeIn();
})

$("#dig-solve").click(function(){
  $("#dig-sln").fadeIn();
})