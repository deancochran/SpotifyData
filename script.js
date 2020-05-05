////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
//variable for list of all possible genres
var genres = ['Movie',
 'RnB',
 'A Capella',
 'Alternative',
 'Country',
 'Dance',
 'Electronic',
 'Anime',
 'Folk',
 'Blues',
 'Opera',
 'Hip-Hop',
 'Rap',
 'Indie',
 'Classical',
 'Pop',
 'Reggae',
 'Reggaeton',
 'Jazz',
 'Rock',
 'Ska',
 'Soul',
 'Soundtrack',
 'World']
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
//variable for animation
var dur=1000;
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
//script for drop down button
/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}
// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    //Uses for loop to reduce code for each of the 26 genres
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////



//Fills in Tooltip info
var drawToolTip = function(song){
    
    d3.select("#tooltip div")
        .remove();

    
    var xPosition = d3.event.pageX;
    var yPosition = d3.event.pageY;

    var tooltip = d3.select("#tooltip")
        .classed("hidden",false)
        .style("top",yPosition+"px")
        .style("left",xPosition+"px")
        .append("div")
    
    tooltip.append("div")
        .attr('id','thermo')
        .text("Song Selected: ");
    
    var summary = tooltip.append("div")
        .classed("song-title",true)
        .text(song.track_name+', by '+song.artist_name);

    console.log('hey')
    var info= summary.append("div")
        .classed("song-info",true)
        .append("ul")

    info.append("li")
        .classed("genre-info",true)
        .text('Genre: '+ song.genre);
    info.append("li")
        .classed("danceability-info",true)
        .text('Danceability: '+(song.danceability*100).toFixed(1)+'%');
    info.append("li")
        .classed("popularity-info",true)
        .text('Popularity Rating: '+song.popularity+' out of 100.');
    info.append("li")
        .classed("tempo-info",true)
        .text('Tempo of song: '+ (song.tempo).toFixed(1));
    info.append("li")
        .classed("key-info",true)
        .text('Key of song: '+ song.key);


              
}

/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

///UPDATE GRAPH

//uses the x/yProps to set the title
//uses the target to select the lcoation of the graph
//uses the x/yScale to plot the location of the appended circles

var updateGraph= function(songs, target, margins, graph)
{
    
    console.log("updating graph");
    
    var scales = recalculateScales(songs, margins, graph);
    var xScale = scales.xScale;
    var yScale = scales.yScale;
    var rScale = scales.rScale;
    var colorScale = scales.colorScale;
    
    updateAxes(target,xScale,yScale);
    
    var circles = d3.select(target)
    .select(".graph")
    .selectAll("circle")
    .data(songs)
    
    
    //ENTER - add new stuff
    circles.enter()
        .append("circle")
        .classed("circle",true)
        .on("mouseover",function(song)
            {
                drawToolTip(song)
            })
        .on("mouseout",function(song)
            {
                d3.select("#tooltip")
                        .classed("hidden",true);  
            })
    
    //EXIT - remove old stuff
    circles.exit()
        .remove();
    
    
    //UPDATE - REDECORATE 
    circles.transition() 
    .duration(dur)
    .attr("cx",function(song)
    {
        return xScale(song.tempo);
    })
    .attr("cy",function(song)
    {
        return yScale(song.danceability *100);

    })
    .attr("r",function(song)
    {
        return rScale(song.popularity);         
    })
    
    .attr("fill",function(song)
    {
        return colorScale(song.valence);
    })
    
    
    
        
}
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
//RECALCULATE SCALES
var recalculateScales = function(songs, margins, graph)
{
    var xScale = d3.scaleLinear()
                .domain([20,240])
                .range([0,graph.width])
    
    var yScale = d3.scaleLinear()
                .domain([
                        d3.min(songs,function(song)
                        {
                                return song.danceability *100;
                        }),
                        d3.max(songs,function(song)
                        {
                                return song.danceability *100;
                        })
                        ])
                .range([graph.height,0]);
    var rScale = d3.scaleSqrt()
                .domain([
                        0,
                        d3.max(songs,function(song)
                        {
                                return song.popularity;
                        })])
    rScale.range([2,10])
    var colorScale = d3.scaleSequential()
                        .domain([
                        d3.min(songs,function(song)
                        {
                                return song.valence;
                        }),
                        d3.max(songs,function(song)
                        {
                                return song.valence;
                        })
                        ])
                        .interpolator(d3.interpolateWarm);
    
    return { xScale:xScale, yScale:yScale, rScale:rScale, colorScale:colorScale}
}

////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
//initializes actions when button is clicked
var initButtons = function(margins, graph, songs,target)
{

    d3.select('#Movie')
    .on("click",function()
        {
        var new_songs = songs.filter(function(song){
            if(song.genre=='Movie')
                    {return true;}
            })
        setBanner('Songs that will go well in your '+ new_songs[0].genre +' playlist');
        updateGraph(new_songs, target, margins, graph);
        });
    d3.select('#RnB')
    .on("click",function()
        {
        var new_songs = songs.filter(function(song){
            if(song.genre=='R&B')
                    {return true;}
            })
        setBanner('Songs that will go well in your '+ new_songs[0].genre +' playlist');
        updateGraph(new_songs, target, margins, graph);
        });
    d3.select('#ACapella')
    .on("click",function()
        {
        var new_songs = songs.filter(function(song){
            if(song.genre=='A Capella')
                    {return true;}
            })
        setBanner('Songs that will go well in your '+ new_songs[0].genre +' playlist');
        updateGraph(new_songs, target, margins, graph);
        });
    d3.select('#Alternative')
    .on("click",function()
        {
        var new_songs = songs.filter(function(song){
            if(song.genre=='Alternative')
                    {return true;}
            })
        setBanner('Songs that will go well in your '+ new_songs[0].genre +' playlist');
        updateGraph(new_songs, target, margins, graph);
        });
    d3.select('#Country')
    .on("click",function()
        {
        var new_songs = songs.filter(function(song){
            if(song.genre=='Country')
                    {return true;}
            })
        setBanner('Songs that will go well in your '+ new_songs[0].genre +' playlist');
        updateGraph(new_songs, target, margins, graph);
        });
    d3.select('#Dance')
    .on("click",function()
        {
        var new_songs = songs.filter(function(song){
            if(song.genre=='Dance')
                    {return true;}
            })
        setBanner('Songs that will go well in your '+ new_songs[0].genre +' playlist');
        updateGraph(new_songs, target, margins, graph);
        });
    d3.select('#Electronic')
    .on("click",function()
        {
        var new_songs = songs.filter(function(song){
            if(song.genre=='Electronic')
                    {return true;}
            })
        setBanner('Songs that will go well in your '+ new_songs[0].genre +' playlist');
        updateGraph(new_songs, target, margins, graph);
        });
    d3.select('#Anime')
    .on("click",function()
        {
        var new_songs = songs.filter(function(song){
            if(song.genre=='Anime')
                    {return true;}
            })
        setBanner('Songs that will go well in your '+ new_songs[0].genre +' playlist');
        updateGraph(new_songs, target, margins, graph);
        });
    d3.select('#Folk')
    .on("click",function()
        {
        var new_songs = songs.filter(function(song){
            if(song.genre=='Folk')
                    {return true;}
            })
        setBanner('Songs that will go well in your '+ new_songs[0].genre +' playlist');
        updateGraph(new_songs, target, margins, graph);
        });
    d3.select('#Blues')
    .on("click",function()
        {
        var new_songs = songs.filter(function(song){
            if(song.genre=='Blues')
                    {return true;}
            })
        setBanner('Songs that will go well in your '+ new_songs[0].genre +' playlist');
        updateGraph(new_songs, target, margins, graph);
        });
    d3.select('#Opera')
    .on("click",function()
        {
        var new_songs = songs.filter(function(song){
            if(song.genre=='Opera')
                    {return true;}
            })
        setBanner('Songs that will go well in your '+ new_songs[0].genre +' playlist');
        updateGraph(new_songs, target, margins, graph);
        });
    d3.select('#HipHop')
    .on("click",function()
        {
        var new_songs = songs.filter(function(song){
            if(song.genre=='Hip-Hop')
                    {return true;}
            })
        setBanner('Songs that will go well in your Hip-Hop playlist');
        updateGraph(new_songs, target, margins, graph);
        });
    d3.select('#Rap')
    .on("click",function()
        {
        var new_songs = songs.filter(function(song){
            if(song.genre=='Rap')
                    {return true;}
            })
        setBanner('Songs that will go well in your '+ new_songs[0].genre +' playlist');
        updateGraph(new_songs, target, margins, graph);
        });
    d3.select('#Indie')
    .on("click",function()
        {
        var new_songs = songs.filter(function(song){
            if(song.genre=='Indie')
                    {return true;}
            })
        setBanner('Songs that will go well in your '+ new_songs[0].genre +' playlist');
        updateGraph(new_songs, target, margins, graph);
        });
    d3.select('#Classical')
    .on("click",function()
        {
        var new_songs = songs.filter(function(song){
            if(song.genre=='Classical')
                    {return true;}
            })
        setBanner('Songs that will go well in your '+ new_songs[0].genre +' playlist');
        updateGraph(new_songs, target, margins, graph);
        });
    d3.select('#Pop')
    .on("click",function()
        {
        var new_songs = songs.filter(function(song){
            if(song.genre=='Pop')
                    {return true;}
            })
        setBanner('Songs that will go well in your '+ new_songs[0].genre +' playlist');
        updateGraph(new_songs, target, margins, graph);
        });
    d3.select('#Reggae')
    .on("click",function()
        {
        var new_songs = songs.filter(function(song){
            if(song.genre=='Reggae')
                    {return true;}
            })
        setBanner('Songs that will go well in your '+ new_songs[0].genre +' playlist');
        updateGraph(new_songs, target, margins, graph);
        });
    d3.select('#Reggaeton')
    .on("click",function()
        {
        var new_songs = songs.filter(function(song){
            if(song.genre=='Reggaeton')
                    {return true;}
            })
        setBanner('Songs that will go well in your '+ new_songs[0].genre +' playlist');
        updateGraph(new_songs, target, margins, graph);
        });
    d3.select('#Jazz')
    .on("click",function()
        {
        var new_songs = songs.filter(function(song){
            if(song.genre=='Jazz')
                    {return true;}
            })
        setBanner('Songs that will go well in your '+ new_songs[0].genre +' playlist');
        updateGraph(new_songs, target, margins, graph);
        });
    d3.select('#Rock')
    .on("click",function()
        {
        var new_songs = songs.filter(function(song){
            if(song.genre=='Rock')
                    {return true;}
            })
        setBanner('Songs that will go well in your '+ new_songs[0].genre +' playlist');
        updateGraph(new_songs, target, margins, graph);
        });
    d3.select('#Ska')
    .on("click",function()
        {
        var new_songs = songs.filter(function(song){
            if(song.genre=='Ska')
                    {return true;}
            })
        setBanner('Songs that will go well in your '+ new_songs[0].genre +' playlist');
        updateGraph(new_songs, target, margins, graph);
        });
    d3.select('#Soul')
    .on("click",function()
        {
        var new_songs = songs.filter(function(song){
            if(song.genre=='Soul')
                    {return true;}
            })
        setBanner('Songs that will go well in your '+ new_songs[0].genre +' playlist');
        updateGraph(new_songs, target, margins, graph);
        });
    d3.select('#Soundtrack')
    .on("click",function()
        {
        var new_songs = songs.filter(function(song){
            if(song.genre=='Soundtrack')
                    {return true;}
            })
        setBanner('Songs that will go well in your '+ new_songs[0].genre +' playlist');
        updateGraph(new_songs, target, margins, graph);
        });
    d3.select('#World')
    .on("click",function()
        {
        var new_songs = songs.filter(function(song){
            if(song.genre=='World')
                    {return true;}
            })
        setBanner('Songs that will go well in your '+ new_songs[0].genre +' playlist');
        updateGraph(new_songs, target, margins, graph);
        });




}
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
//INIT GRAPH
//uses the target string to select the location of the plots location
var initGraph = function(target,songs)
{
    //the size of the screen
    var screen = {width:800, height:600};
    
    //how much space will be on each side of the graph
    var margins = {top:15,bottom:40,left:70,right:15};
    
    //generated how much space the graph will take up
    var graph = 
    {
        width:screen.width-margins.left-margins.right,
        height:screen.height-margins.top-margins.bottom,
    }
    

    //set the screen size
    d3.select(target)
        .attr("width",screen.width)
        .attr("height",screen.height)
    
    //create a group for the graph
    d3.select(target)
        .append("g")
        .classed("graph",true)
        .attr("transform","translate("+margins.left+","+
             margins.top+")");
  
    
    
    createAxes(margins,graph,target);
    
    initButtons(margins, graph, songs, target);
    
    updateGraph(songs, target, margins, graph);
    
}
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
//CREATE AXES//UPDATE AXES

//uses the xScale and yScale arguments to create axes, 
//uses the target argument to select the location of where the axes need to be appended
//uses the graph and margins to transform the location of the axes
var createAxes = function(margins,graph,target)
{
    
    var axes = d3.select(target)
        .append("g")
        .classed("class","axis");
    
    
    axes.append("g")
        .attr("id","xAxis")
        .attr("transform","translate("+margins.left+","
             +(margins.top+graph.height)+")")
        
    
    
    axes.append("g")
        .attr("id","yAxis")
        .attr("transform","translate("+margins.left+","
             +(margins.top)+")")
        
}

var updateAxes = function(target,xScale,yScale)
{
    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);
    
    d3.select("#xAxis")
        .transition()
        .duration(dur)
        .call(xAxis)
    
    d3.select("#yAxis")
        .transition()
        .duration(dur)
        .call(yAxis)
}

////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
//sets the new title to whatever plot is displayed
var setBanner = function(msg)
{

    d3.select("#banner")
        .text(msg);
}

////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////



//script for Data Promise
var classPromise = d3.csv('SpotifyDataSets/songs.csv')


//on success
var sucFCN = function(songs){
    console.log('Success');
    
    initGraph("#bubblechart",songs);
    console.log('Reached: initialized First graph')
}
//on failure
var failFCN = function(err){
    console.log('ERROR loading data',err);
};


classPromise.then(sucFCN,failFCN);

////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
