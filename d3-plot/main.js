
var dataUrl = "https://raw.githubusercontent.com/IsaKiko/D3-visualising-data/gh-pages/code/nations.json";

d3.json(dataUrl, function(nations){

var filtered_nations = nations.map(function(nation_element){
        return nation_element;
});
var year_idx = parseInt(document.getElementById("year_slider").value)-1950;


var chart_area = d3.select('#chart_area');

var frame = chart_area.append("svg");

var canvas = frame.append("g");

// Set margins, width, and height.
var margin = {top: 19.5, right: 19.5, bottom: 19.5, left: 39.5};
var frame_width = 960;
var frame_height = 450;
var canvas_width = frame_width - margin.left - margin.right;
var canvas_height = frame_height - margin.top - margin.bottom;

frame.attr("width", frame_width);
frame.attr("height", frame_height);

canvas.attr("transform", "translate(" + margin.left + "," + margin.top + ")");


var xScale = d3.scale.log();
xScale.domain([250, 1e5]);
xScale.range([0, canvas_width]);
var xAxis_generator_function = d3.svg.axis().orient("bottom").scale(xScale);

canvas.append("g").call(xAxis_generator_function)
                .attr("transform", "translate(0," + canvas_height + ")")
                .attr("class","x axis");

var yScale = d3.scale.linear();
yScale.domain([0, 85]);
yScale.range([canvas_height,0]);
var yAxis_generator_function = d3.svg.axis().orient("left").scale(yScale);

canvas.append("g").call(yAxis_generator_function).attr("class","y axis");

var rScale = d3.scale.sqrt();
rScale.domain([0, 5e8]);
rScale.range([0, 60]);


canvas.append("g").call(yAxis_generator_function).attr("class","y axis");



var data_canvas = canvas.append("g").attr("class", "data_canvas");

var mycolors = d3.scale.category20();

// slider
	d3.select("#year_slider").on("input", function () {
		year_idx = parseInt(this.value) - 1950;
		console.log(year_idx);
		document.getElementById("year").innerHTML = this.value;

		update();
	});

d3.selectAll(".region_cb").on("change", function(){
        // things are happening if checkbox is checked or unchecked
        // console.log(this);
        var regiontype = this.value;
        // console.log(this.value);
        
//        console.log(this.checked);

        if (this.checked) {
                var new_nations = nations.filter(function(nations_element){
                        return nations_element.region == regiontype;
                })
                filtered_nations = filtered_nations.concat(new_nations);
        }

        else {
                filtered_nations = filtered_nations.filter(function(nations_element){
                        return nations_element.region != regiontype;
                })
        }

//console.log(filtered_nations.length);
        update();

})

update();

var tooltip = d3.select("body")
		.append("div")
		.style("position", "absolute") 
		.style("visibility", "hidden");

function update(){
        var magicald3linkingthing =  data_canvas.selectAll(".dot")
                .data(filtered_nations, function(d){
                                return d.name;
                                })

        magicald3linkingthing.enter().append("circle").attr("class","dot")
             
                .style("fill", function(d){ return mycolors(d.region[0])})
                .on("mouseover", function(d){return tooltip.style("visibility", "visible").text(d.name);})
				.on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
				.on("mouseout", function(){return tooltip.style("visibility", "hidden");});


        magicald3linkingthing.exit().remove();
        
        magicald3linkingthing.transition().ease("linear").duration(200)
						.attr("cx", function(d) { return xScale(d.income[year_idx]); }) // this is how attr knows to work with the data
						.attr("cy", function(d) { return yScale(d.lifeExpectancy[year_idx]); })
						.attr("r", function(d) { return rScale(d.population[year_idx]); });

}
})
        
    // https://public.etherpad-mozilla.org/p/resbaz-d3    
