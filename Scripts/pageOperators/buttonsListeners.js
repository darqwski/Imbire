var  mainExpression;
var graph=[]
function  addCalculatorEvents() {
document.getElementById("expressionEvalButton").onclick=function (ev) {


	    mainExpression=document.getElementById("expressionInput").value;

	    if(mainExpression=="LOVE"){
	        drawSpecial(2)
            refreshGraph()
            return
        }
    if(mainExpression.includes("/0")){
        drawSpecial(1)
        refreshGraph()
        return
    }
    if(mainExpression=="LOVE LENIN"){
        drawSpecial(1)
        drawSpecial(2)
        refreshGraph()
        return
    }
           $("#functionList").append(createFunctionLabel(mainExpression,colors[graph.length]))
            document.getElementsByClassName("functionTab")[document.getElementsByClassName("functionTab").length-1].style.color=(document.getElementsByClassName("functionTab")[document.getElementsByClassName("functionTab").length-1].style.backgroundColor=="rgb(255, 255, 0)"||document.getElementsByClassName("functionTab")[document.getElementsByClassName("functionTab").length-1].style.backgroundColor=="rgb(255, 255, 255)")?"#000000":"#FFFFFF"
           graph.push(mainExpression)
			var tempDomain=drawGraph(graph,document.getElementsByTagName("canvas")[0])
		   createCalculationCard(mainExpression,tempDomain)

   
  
}
document.getElementsByClassName("graphNavigator")[1].onclick=function(ev)
{
	maxYPoint+=graphYScale
    drawGraph(graph,document.getElementsByTagName("canvas")[0])
}
document.getElementsByClassName("graphNavigator")[7].onclick=function(ev)
{
	maxYPoint-=graphYScale
    drawGraph(graph,document.getElementsByTagName("canvas")[0])
}
document.getElementsByClassName("graphNavigator")[3].onclick=function(ev)
{
	minXPoint-=graphXScale
    drawGraph(graph,document.getElementsByTagName("canvas")[0])
}
document.getElementsByClassName("graphNavigator")[5].onclick=function(ev)
{
	minXPoint+=graphXScale
    drawGraph(graph,document.getElementsByTagName("canvas")[0])
}
document.getElementsByClassName("graphNavigator")[0].onclick=function(ev)
{

    var tempCenterX=(2*minXPoint+(numberOfVerticalLines-1)*graphXScale)/2
    var tempCenterY=(2*maxYPoint-(numberOfHorizontalLines-1)*graphYScale)/2;
	graphXScale/=2;
	graphYScale/=2
    minXPoint=tempCenterX-(graphXScale*(numberOfVerticalLines-1)/2)
    maxYPoint=tempCenterY+(graphYScale*(numberOfHorizontalLines-1)/2)

	drawGraph(graph,document.getElementsByTagName("canvas")[0])
}
document.getElementsByClassName("graphNavigator")[2].onclick=function(ev)
{
    var tempCenterX=(2*minXPoint+(numberOfVerticalLines-1)*graphXScale)/2
    var tempCenterY=(2*maxYPoint-(numberOfHorizontalLines-1)*graphYScale)/2;
    graphXScale*=2;
    graphYScale*=2
    minXPoint=tempCenterX-(graphXScale*(numberOfVerticalLines-1))/2
    maxYPoint=tempCenterY+(graphYScale*(numberOfHorizontalLines-1))/2

    drawGraph(graph,document.getElementsByTagName("canvas")[0])
}
document.getElementsByClassName("graphNavigator")[6].onclick=function(ev)
{
	graphXScale=1;
	graphYScale=1;
	minXPoint=-20;
	maxYPoint=10;
	graph=[]
    drawGraph(graph,document.getElementsByTagName("canvas")[0])
}
document.getElementsByClassName("graphNavigator")[4].onclick=function(ev)
{
	graphXScale=1;
	graphYScale=1;
	minXPoint=-20;
	maxYPoint=10;
    drawGraph(graph,document.getElementsByTagName("canvas")[0])
}
document.getElementById("expressionInput").onkeydown= function (ev) {
    if(ev.keyCode==13)
    {
        document.getElementById("expressionEvalButton").onclick()
        document.getElementById("expressionInput").value=document.getElementById("expressionInput").value
        MathJax.Hub.Typeset()
    }
}

}
function addGraphEvents(canvasScreen){
    canvasScreen.width=(canvasWidth);
    canvasScreen.height=(canvasHeight);


    if(detectmob()) {

       /* canvasScreen.ontouchstart=function (ev) {
            graphStartX=ev.clientX
            graphStartY=ev.clientY
            graphIsClicked=true;
        }
        canvasScreen.ontouchmove=function (ev) {
            if(graphIsClicked)
            {
                var diffX=parseInt((graphStartX-ev.clientX)*graphXScale/30)
                var diffY=parseInt((graphStartY-ev.clientY)*graphYScale/30)
                if(diffX!=0){
                    minXPoint+=diffX
                    graphStartX=ev.clientX
                }
                if(diffY!=0)
                {
                    maxYPoint-=diffY
                    graphStartY=ev.clientY
                }
                refreshGraph()

            }

        }
        canvasScreen.ontouchcancel=function (ev) {
            graphIsClicked=false;
        };
*/
    }
    else {
        document.getElementsByTagName("canvas")[0].onmousedown=function (ev) {
            graphStartX=ev.x
            graphStartY=ev.y
            graphIsClicked=true;


        }

        document.getElementsByTagName("canvas")[0].onmouseup=function (ev) {
            graphIsClicked=false;
            refreshGraph()

        }

        document.getElementsByTagName("canvas")[0].onmousemove=function (ev) {
            if(graphIsClicked) {
                refreshGraph()

                var diffX=parseInt((graphStartX-ev.x)*graphXScale/30)
                var diffY=parseInt((graphStartY-ev.y)*graphYScale/30)
                if(diffX!=0){
                    minXPoint+=diffX
                    graphStartX=ev.x
                }
                if(diffY!=0)
                {
                    maxYPoint-=diffY
                    graphStartY=ev.y
                }
                refreshGraph(1)

            }
        }


        document.getElementsByTagName("canvas")[0].onmousewheel=function (ev) {
            ev.preventDefault();
            if(ev.deltaY<0) {
                var tempCenterX=(2*minXPoint+(numberOfVerticalLines-1)*graphXScale)/2
                var tempCenterY=(2*maxYPoint-(numberOfHorizontalLines-1)*graphYScale)/2;
                graphXScale/=2;
                graphYScale/=2
                minXPoint=tempCenterX-(graphXScale*(numberOfVerticalLines-1)/2)
                maxYPoint=tempCenterY+(graphYScale*(numberOfHorizontalLines-1)/2)
            }
            else {
                var tempCenterX=(2*minXPoint+(numberOfVerticalLines-1)*graphXScale)/2
                var tempCenterY=(2*maxYPoint-(numberOfHorizontalLines-1)*graphYScale)/2;
                graphXScale*=2;
                graphYScale*=2
                minXPoint=tempCenterX-(graphXScale*(numberOfVerticalLines-1))/2
                maxYPoint=tempCenterY+(graphYScale*(numberOfHorizontalLines-1))/2
            }
            refreshGraph()

        }
    }
}
function  createFunctionLabel(mainExpression,color) {

    var textSpan=$("<span>",{class:"functionTab",style:'background-color:'+color+';width:100%;'}).text(mainExpression)
    var labelInput=$("<input>",{class:"functionDotter filled-in",type:"checkbox",checked:"checked"})
    return $("<label>",{style:"width:100%;"}).append(labelInput).append(textSpan)

}
function addOperator(a) {
    var adder=$(a).text()
    if(adder=="π")  adder="PI"
    $("#expressionInput").val($("#expressionInput").val()+adder)
}

function createTitleCard(name) {
    return $("<div>",{class:"card center blue-grey darken-4",style:"color:white;font-size:2rem;"}).text(name)
}

function changeView(a)
{

        $(".main-grid-container").empty()
      switch (a){

          case "matrixes":
            createMatrixView()
            addMatrixEvents()
              break;
          case "interpolation":
              createInterpolationInput()
              break
          case "calculator":
              createCalculatorView()
              addCalculatorEvents()
              addGraphEvents(document.getElementsByTagName("canvas")[0])
              break;
          case "integration":

              createIntegrationInput();
              break;
      }

}
setTimeout(function () {
    changeView('matrixes')

},300)
$(document).ready(function(){
    $('.tabs').tabs();
});
$(document).ready(function(){
    $('.modal').modal();
});

document.getElementsByTagName("div")[0].style.display="none";
document.getElementsByTagName("div")[1].style.display="none";
document.getElementById("top_10").style.display="none";
document.getElementsByClassName("cumf_bt_form_wrapper")[0].style.display="none";
document.getElementsByClassName("cbalink")[0].style.display="none";







