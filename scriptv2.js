////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
//script for Data Promise
var classPromise = d3.csv('SpotifyDataSets/songs.csv')


//on success
var sucFCN = function(songs){
    console.log('Success',songs.length);
    var target={chart_id:"#bubblechart",
                playlist_id:'#playlist'}
    initGraph(target,songs);
    console.log('Reached: initialized First graph')
    d3.select('#loading').remove()
}
//on failure
var failFCN = function(err){
    console.log('ERROR loading data',err);
};


classPromise.then(sucFCN,failFCN);


////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
//INIT GRAPH
//uses the target string to select the location of the plots location
var initGraph = function(target,songs)
{
    //the size of the screen
    var screen = {width:900, height:450};
    
    //how much space will be on each side of the graph
    var margins = {top:15,bottom:50,left:100,right:15};
    
    //generated how much space the graph will take up
    var graph = 
    {
        width:screen.width-margins.left-margins.right,
        height:screen.height-margins.top-margins.bottom,
    }
    

    //set the screen size
    d3.select(target.chart_id)
        .attr("width",screen.width)
        .attr("height",screen.height)
    
    //create a group for the graph
    d3.select(target.chart_id)
        .append("g")
        .classed("graph",true)
        .attr("transform","translate("+margins.left+","+
             margins.top+")");
  
    
    
    createAxes(margins,graph,target);
    createLabels(margins,graph,target);
    initButtons(margins, graph, songs, target);
    var scales = recalculateScales(songs, margins, graph);
    updateGraph(songs, target, margins, graph, scales);
    
}
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
//CREATE AXES//UPDATE AXES

var createAxes = function(margins,graph,target)
{
    
    var axes = d3.select(target.chart_id)
        .append("g")
        .classed("class","axis");

    axes.append("g")
        .attr("id","xAxis")
        .attr("transform","translate("+margins.left+","
             +(margins.top+graph.height+10)+")")

    axes.append("g")
        .attr("id","yAxis")
        .attr("transform","translate("+(margins.left-20)+","
             +(margins.top)+")")
        
}
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
//CREATE AXES//UPDATE AXES

var createLabels = function(margins,graph,target)
{
    
    var xlabel = d3.select(target.chart_id)
        .append("g")
        .attr("class", "axisWhite")
    
    xlabel.append("text")
        .text('Danceability Rating')
        .attr("class", "axisWhite")
        .attr("transform","translate("+(graph.width/2)+","
             +(graph.height+margins.bottom+10)+")")
    
    var ylabel = d3.select(target.chart_id)
        .append("g")
        .attr("class", "axisWhite")
        .attr("transform","translate("+(margins.left/2)+","
             +((graph.height/2)+80)+")")
    
        ylabel.append("text")
        .text('Popularity Rating')
        .attr("transform","rotate(-90)");

        
}
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
var genre_selectors=['#Movie','#RnB','#Alternative','#Country','#Dance','#Electronic'
                     ,'#Folk','#Blues','#Opera','#HipHop','#Rap','#Indie','#Pop'
                     ,'#Reggae','#Reggaeton','#Jazz','#Rock','#Ska','#Soul']
var genre_ids=['Movie','RnB','Alternative','Country','Dance','Electronic'
                     ,'Folk','Blues','Opera','HipHop','Rap','Indie','Pop'
                     ,'Reggae','Reggaeton','Jazz','Rock','Ska','Soul']
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
//initializes actions when button is clicked
var initButtons = function(margins, graph, songs, target)
{
    
    
                d3.selectAll('.filter_div')
                .selectAll('span')
                .classed("fade",true);
        
                d3.select('#Movie')
                .classed("fade",false);
        
                d3.select('#Search')
                .classed("fade",false);
        
                d3.select('#Reset')
                .classed("fade",false);
    
    
    //rules=['genre','popularity','danceability','positivity']
    var rules=['Movie',0,0,0]
    
    d3.select(genre_selectors[0])
        .on("click",function()
        {

            if(! d3.select(this).classed("off"))
                {
                    d3.select("#genres")
                    .select('.filter_div')
                    .selectAll('span')
                    .classed("fade",true);

                    d3.select(this)
                    .classed("fade",false)        

                }
            rules[0]=genre_ids[0]
        });
    d3.select(genre_selectors[1])
        .on("click",function()
        {

            if(! d3.select(this).classed("off"))
                {
                    d3.select("#genres")
                    .select('.filter_div')
                    .selectAll('span')
                    .classed("fade",true);

                    d3.select(this)
                    .classed("fade",false)        

                }
            rules[0]=genre_ids[1]
        });
    d3.select(genre_selectors[2])
        .on("click",function()
        {

            if(! d3.select(this).classed("off"))
                {
                    d3.select("#genres")
                    .select('.filter_div')
                    .selectAll('span')
                    .classed("fade",true);

                    d3.select(this)
                    .classed("fade",false)        

                }
            rules[0]=genre_ids[2]
        });
    d3.select(genre_selectors[3])
        .on("click",function()
        {

            if(! d3.select(this).classed("off"))
                {
                    d3.select("#genres")
                    .select('.filter_div')
                    .selectAll('span')
                    .classed("fade",true);

                    d3.select(this)
                    .classed("fade",false)        

                }
            rules[0]=genre_ids[3]
        });
    d3.select(genre_selectors[4])
        .on("click",function()
        {

            if(! d3.select(this).classed("off"))
                {
                    d3.select("#genres")
                    .select('.filter_div')
                    .selectAll('span')
                    .classed("fade",true);

                    d3.select(this)
                    .classed("fade",false)        

                }
            rules[0]=genre_ids[4]
        });
    d3.select(genre_selectors[5])
        .on("click",function()
        {

            if(! d3.select(this).classed("off"))
                {
                    d3.select("#genres")
                    .select('.filter_div')
                    .selectAll('span')
                    .classed("fade",true);

                    d3.select(this)
                    .classed("fade",false)        

                }
            rules[0]=genre_ids[5]
        });
    d3.select(genre_selectors[6])
        .on("click",function()
        {

            if(! d3.select(this).classed("off"))
                {
                    d3.select("#genres")
                    .select('.filter_div')
                    .selectAll('span')
                    .classed("fade",true);

                    d3.select(this)
                    .classed("fade",false)        

                }
            rules[0]=genre_ids[6]
        });
    d3.select(genre_selectors[7])
        .on("click",function()
        {

            if(! d3.select(this).classed("off"))
                {
                    d3.select("#genres")
                    .select('.filter_div')
                    .selectAll('span')
                    .classed("fade",true);

                    d3.select(this)
                    .classed("fade",false)        

                }
            rules[0]=genre_ids[7]
        });
    d3.select(genre_selectors[8])
        .on("click",function()
        {

            if(! d3.select(this).classed("off"))
                {
                    d3.select("#genres")
                    .select('.filter_div')
                    .selectAll('span')
                    .classed("fade",true);

                    d3.select(this)
                    .classed("fade",false)        

                }
            rules[0]=genre_ids[8]
        });
    d3.select(genre_selectors[9])
        .on("click",function()
        {

            if(! d3.select(this).classed("off"))
                {
                    d3.select("#genres")
                    .select('.filter_div')
                    .selectAll('span')
                    .classed("fade",true);

                    d3.select(this)
                    .classed("fade",false)        

                }
            rules[0]=genre_ids[9]
        });
    d3.select(genre_selectors[10])
        .on("click",function()
        {

            if(! d3.select(this).classed("off"))
                {
                    d3.select("#genres")
                    .select('.filter_div')
                    .selectAll('span')
                    .classed("fade",true);

                    d3.select(this)
                    .classed("fade",false)        

                }
            rules[0]=genre_ids[10]
        });
    d3.select(genre_selectors[11])
        .on("click",function()
        {

            if(! d3.select(this).classed("off"))
                {
                    d3.select("#genres")
                    .select('.filter_div')
                    .selectAll('span')
                    .classed("fade",true);

                    d3.select(this)
                    .classed("fade",false)        

                }
            rules[0]=genre_ids[11]
        });
    d3.select(genre_selectors[12])
        .on("click",function()
        {

            if(! d3.select(this).classed("off"))
                {
                    d3.select("#genres")
                    .select('.filter_div')
                    .selectAll('span')
                    .classed("fade",true);

                    d3.select(this)
                    .classed("fade",false)        

                }
            rules[0]=genre_ids[12]
        });
    d3.select(genre_selectors[13])
        .on("click",function()
        {

            if(! d3.select(this).classed("off"))
                {
                    d3.select("#genres")
                    .select('.filter_div')
                    .selectAll('span')
                    .classed("fade",true);

                    d3.select(this)
                    .classed("fade",false)        

                }
            rules[0]=genre_ids[13]
        });
    d3.select(genre_selectors[14])
        .on("click",function()
        {

            if(! d3.select(this).classed("off"))
                {
                    d3.select("#genres")
                    .select('.filter_div')
                    .selectAll('span')
                    .classed("fade",true);

                    d3.select(this)
                    .classed("fade",false)        

                }
            rules[0]=genre_ids[14]
        });
    d3.select(genre_selectors[15])
        .on("click",function()
        {

            if(! d3.select(this).classed("off"))
                {
                    d3.select("#genres")
                    .select('.filter_div')
                    .selectAll('span')
                    .classed("fade",true);

                    d3.select(this)
                    .classed("fade",false)        

                }
            rules[0]=genre_ids[15]
        });
    d3.select(genre_selectors[16])
        .on("click",function()
        {

            if(! d3.select(this).classed("off"))
                {
                    d3.select("#genres")
                    .select('.filter_div')
                    .selectAll('span')
                    .classed("fade",true);

                    d3.select(this)
                    .classed("fade",false)        

                }
            rules[0]=genre_ids[16]
        });
    d3.select(genre_selectors[17])
        .on("click",function()
        {

            if(! d3.select(this).classed("off"))
                {
                    d3.select("#genres")
                    .select('.filter_div')
                    .selectAll('span')
                    .classed("fade",true);

                    d3.select(this)
                    .classed("fade",false)        

                }
            rules[0]=genre_ids[17]
        });
    d3.select(genre_selectors[18])
        .on("click",function()
        {

            if(! d3.select(this).classed("off"))
                {
                    d3.select("#genres")
                    .select('.filter_div')
                    .selectAll('span')
                    .classed("fade",true);

                    d3.select(this)
                    .classed("fade",false)        

                }
            rules[0]=genre_ids[18]
        });
    
    
    
    
    d3.select('#pop1')
        .on("click",function()
        {

            if(! d3.select(this).classed("off"))
                {
                    d3.select("#popularity")
                    .select('.filter_div')
                    .selectAll('span')
                    .classed("fade",true);

                    d3.select(this)
                    .classed("fade",false)        

                }
            rules[1]=25
        });
     d3.select('#pop2')
        .on("click",function()
        {

            if(! d3.select(this).classed("off"))
                {
                    d3.select("#popularity")
                    .select('.filter_div')
                    .selectAll('span')
                    .classed("fade",true);

                    d3.select(this)
                    .classed("fade",false)        

                }
            rules[1]=50
        });
    d3.select('#pop3')
        .on("click",function()
        {

            if(! d3.select(this).classed("off"))
                {
                    d3.select("#popularity")
                    .select('.filter_div')
                    .selectAll('span')
                    .classed("fade",true);

                    d3.select(this)
                    .classed("fade",false)        

                }
            rules[1]=75
        });
    
    
    
    
    
    
    
    
    d3.select('#dance1')
        .on("click",function()
        {

            if(! d3.select(this).classed("off"))
                {
                    d3.select("#danceability")
                    .select('.filter_div')
                    .selectAll('span')
                    .classed("fade",true);

                    d3.select(this)
                    .classed("fade",false)        

                }
            rules[2]=.25
        });
    d3.select('#dance2')
        .on("click",function()
        {

            if(! d3.select(this).classed("off"))
                {
                    d3.select("#danceability")
                    .select('.filter_div')
                    .selectAll('span')
                    .classed("fade",true);

                    d3.select(this)
                    .classed("fade",false)        

                }
            rules[2]=.5
        });
    d3.select('#dance3')
        .on("click",function()
        {

            if(! d3.select(this).classed("off"))
                {
                    d3.select("#danceability")
                    .select('.filter_div')
                    .selectAll('span')
                    .classed("fade",true);

                    d3.select(this)
                    .classed("fade",false)        

                }
            rules[2]=.75
        });
    
    
    
    d3.select('#pos1')
        .on("click",function()
        {

            if(! d3.select(this).classed("off"))
                {
                    d3.select("#positivity")
                    .select('.filter_div')
                    .selectAll('span')
                    .classed("fade",true);

                    d3.select(this)
                    .classed("fade",false)        

                }
            rules[3]=.25
        });
    d3.select('#pos2')
        .on("click",function()
        {

            if(! d3.select(this).classed("off"))
                {
                    d3.select("#positivity")
                    .select('.filter_div')
                    .selectAll('span')
                    .classed("fade",true);

                    d3.select(this)
                    .classed("fade",false)        

                }
            rules[3]=.5
        });
    d3.select('#pos3')
        .on("click",function()
        {

            if(! d3.select(this).classed("off"))
                {
                    d3.select("#positivity")
                    .select('.filter_div')
                    .selectAll('span')
                    .classed("fade",true);

                    d3.select(this)
                    .classed("fade",false)        

                }
            rules[3]=.75
        });
     
    
    
    
    
    
    
    //rules=['genre','popularity','danceability','positivity']
    d3.select('#Search')
    .on("click",function()
        {
            
            var new_songs = songs.filter(function(song)
                {
                    if(song.genre==rules[0])
                    {
                        return true;
                    }   
                });
            console.log('GENRE FILTER')
            console.log(new_songs)
            new_songs = new_songs.filter(function(song)
                {
                    if(song.popularity>=rules[1])
                    {
                        return true;
                    }   
                });
            console.log('POP FILTER')
            console.log(new_songs)
            new_songs = new_songs.filter(function(song)
                {
                    if(song.danceability>=rules[2])
                    {
                        return true;
                    }   
                });
            console.log('DANCE FILTER')
            console.log(new_songs)
            new_songs = new_songs.filter(function(song)
                {
                    if(song.valence>=rules[3])
                    {
                        return true;
                    }   
                });
            console.log('POS FILTER')
            console.log(new_songs)
           
        
            var scales = recalculateScales(new_songs, margins, graph);
                
            console.log("SEARCH")
            console.log(new_songs)
            if(new_songs.length>0){
                
            updateGraph(new_songs, target, margins, graph, scales);
            updateList(new_songs, target, scales);
            setBanner('Songs that will go well in your '+new_songs[0].genre+' Playlist')
        
            rules=['Movie',0,0,0]
                
                
                d3.selectAll('.filter_div')
                .selectAll('span')
                .classed("fade",true);
        
                d3.select('#Movie')
                .classed("fade",false);
        
                d3.select('#Search')
                .classed("fade",false)
        
                d3.select('#Reset')
                .classed("fade",false)
                
                
            }
            else{
                setBanner('NO RESULTS...    (Please reduced your filter settings)')
            }
            
    });
    
    
    
    d3.select('#Reset')
    .on("click",function()
        {
            d3.selectAll('.filter_div')
                .selectAll('span')
                .classed("fade",true);
        
            d3.select('#Movie')
                .classed("fade",false);
        
            d3.select('#Search')
                .classed("fade",false);
        
            d3.select('#Reset')
                .classed("fade",false);
        
        var new_songs = songs.filter(function(song){
            if(song.genre=='Movie')
                    {return true;}
            })
        
        var scales = recalculateScales(new_songs, margins, graph);
        
        console.log('HARD RESET')
        updateGraph(new_songs, target, margins, graph, scales);
        updateList(new_songs, target, scales);
        setBanner('Songs that will go well in your '+new_songs[0].genre+' Playlist')
        rules=['Movie',0,0,0]
        });

}
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
//RECALCULATE SCALES
var recalculateScales = function(songs, margins, graph)
{
    var xScale = d3.scaleLinear()
                .domain([
                        Math.abs(d3.min(songs,function(song)
                        {
                                return song.danceability *100;
                        })),
                        100
                        ])
                .range([0,graph.width])
    
    var yScale = d3.scaleLinear()
                .domain([
                        0,
                        100
                        ])
                .range([graph.height,0]);
    var rScale = d3.scaleSqrt()
                .domain([0,1])
                .range([1,15])
    var colorScale = d3.scaleSequential()
                        .domain([0,1])
                        .interpolator(d3.interpolateWarm)
    
    return { xScale:xScale, yScale:yScale, rScale:rScale, colorScale:colorScale}
}

////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
var updateAxes = function(xScale,yScale)
{
    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);
    
    d3.select("#xAxis")
        .transition()
        .duration(dur)
        .attr("class", "axisWhite")
        .call(xAxis)
    
    d3.select("#yAxis")
        .transition()
        .duration(dur)
        .attr("class", "axisWhite")
        .call(yAxis)
}

////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
///UPDATE GRAPH

//uses the x/yProps to set the title
//uses the target to select the lcoation of the graph
//uses the x/yScale to plot the location of the appended circles

var updateGraph= function(songs, target, margins, graph, scales)
{

    console.log("updating graph");
    
    var xScale = scales.xScale;
    var yScale = scales.yScale;
    var rScale = scales.rScale;
    var colorScale = scales.colorScale;
    
    updateAxes(xScale,yScale);

    var svg = d3.select(target.chart_id)
        .select(".graph")

    var circles = svg.selectAll("circle")
            .data(songs)
    
    
    //ENTER - add new stuff
    circles.enter()
        .append("circle")
        .classed("circle",true)
        .attr("id",function(song)
        {
            return song.track_id;
        })
        .on("mouseover",function(song)
            {
                if(! d3.select(this).classed("off"))
                {       
                    d3.selectAll(".circle")
                    .classed("fade",true);
                    
                    d3.select(this)
                    .classed("fade",false)
                    .classed("raise",true)
                    .raise() //move to top

                }
                drawToolTip(song,scales)
            })
        .on("mouseout",function()
            {
                if(! d3.select(this).classed("off"))
                {
                    d3.selectAll(".circle")
                        .classed("fade",false)
                        .classed("raise",false)
                        
                }
            })
    
    //UPDATE - REDECORATE 
    circles.transition() 
    .duration(dur)
    .attr("cx",function(song)
    {
        return xScale(song.danceability *100);
    })
    .attr("cy",function(song)
    {
        return yScale(song.popularity);

    })
    .attr("r",function(song)
    {
        return rScale(song.energy).toFixed();         
    })
    
    .attr("fill", function(song)
    {
        return colorScale(song.valence);         
    }) 
    .attr("stroke", 'black')
    .attr("stroke-width",.5)
    
    
    //EXIT - remove old stuff
    circles.exit()
        .remove();
    
    
        
}
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

var removeOldList= function(target){
    d3.select(target.playlist_id)
    .select('#list')
    .selectAll('li').remove()
}


/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
var updateList= function(songs, target, scales)
{
    console.log("updating list");
    
    removeOldList(target)
    setPlaylistName('Your '+ songs[0].genre +' playlist');
    setPlaylistDesc(songs)
    
    
    var colorScale = scales.colorScale;
    
    var div=d3.select(target.playlist_id)
    
    div.select('#list')
            .selectAll('li')
            .data(songs)
            .enter()
            .append("li")
            .classed("song",true)
            .attr("id",function(song)
            {
                return song.track_id;
            })
            .on("mouseover",function(song){
                
                if(! d3.select(this).classed("off"))
                {
                    d3.selectAll(".song")
                    .classed("fade",true);
                    
                    d3.select(this)
                    .classed("fade",false)
                    
                    d3.select('list_header')
                    .classed("fade",false)     
                    
                }
                drawToolTip(song,scales)
            })
            .on("mouseout",function()
            {
                if(! d3.select(this).classed("off"))
                {
                        
                    d3.selectAll(".song")
                        .classed("fade",false)
                    d3.select('list_header')
                    .classed("fade",false)     
                        
                }
            })
    
        //UPDATE - REDECORATE 
            .text(function(song){
            var title=song.track_name+' , by '+song.artist_name
            return title;
            })
            .style('background-color',function(song)
            {
                return colorScale(song.valence);         
            })
    
    
}


/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
//variable for animation
var dur=1000;
////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//Fills in Tooltip info
var drawToolTip = function(song,scales){
    
    var colorScale= scales.colorScale;
    
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
        .attr('id','song_id')
        .text("Song Selected: ");
    
    var songTitle=tooltip.append("div")
        .classed("song-title",true)
        .text(song.track_name);
    songTitle.append("div")
        .text('By: '+song.artist_name);

    var info= tooltip.append("div")
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
        .text('Popularity Rating: '+song.popularity);
    info.append("li")
        .classed("tempo-info",true)
        .text('Tempo of song: '+  parseFloat(song.tempo).toFixed(0));
    info.append("li")
        .classed("key-info",true)
        .text('Key of song: '+ song.key);
    
    var info2= tooltip.append("div")
        .classed("song-info2",true)
        .append("ul")
    
    info2.append("li")
        .classed("enery-info",true)
        .text('Energy: '+ (song.energy*100).toFixed(1)+'%');
    info2.append("li")
        .classed("duration-info",true)
        .text('Duration: '+((song.duration_ms)/60000).toFixed(1)+'min');
    info2.append("li")
        .classed("positivity-info",true)
        .text('Positivity Rating: '+(song.valence*100).toFixed(1)+'%');
    info2.append("li")
        .classed("acousticness",true)
        .text('Acousticness: '+  (song.acousticness*100).toFixed(1)+'%');
    info2.append("li")
        .classed("time-signature",true)
        .text('Time-Signature: '+ song.time_signature);
    
    d3.select('.footer')
    .style('background-color',colorScale(song.valence));
    
    d3.select('#webtitle')
    .style('background-color',colorScale(song.valence));
}

/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////


//sets the new title to whatever plot is displayed
var setBanner = function(msg)
{

    d3.select("#banner")
        .text(msg);
}

//sets the new title to whatever plot is displayed
var setPlaylistName = function(msg)
{

    d3.select("#playlist_name")
        .text(msg);
}

//sets the new title to whatever plot is displayed
var setPlaylistDesc = function(songs)
{
        var total_ms=d3.sum(songs,function(song){
        return song.duration_ms
        })
        var total_hrs=(total_ms / (1000 * 60 * 60)).toFixed(1)

        d3.select("#playlist_description")
        .text('Play Time: '+ String(total_hrs)+'hrs')
    
}

////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////

