var  mainExpression;
var graph=[]
document.getElementById("expressionEvalButton").onclick=function (ev) {

    $("canvas").show()
   switch(document.getElementById("expressionEvalButton").value)
   {

	   case "function":
	    mainExpression=document.getElementById("expressionInput").value;
           $("#functionList").html($("#functionList").html()+"<p class='functionTab'><input class='functionDotter' type='checkbox'>"+mainExpression+"</p>")

           graph.push(mainExpression)
	  drawGraph(graph,document.getElementsByTagName("canvas")[0])
		   createCalculationCard(mainExpression)
		   if(graph.length<2)addGraphHidder()
	   break;
	   
	   case "complex":
           mainExpression=document.getElementById("expressionInput").value;
           graph.push(mainExpression)
           createCalculationForComplex(mainExpression)
	   break;
   }
  
}
function addOperator(a) {

    var adder=a.innerHTML
if(adder=="π")  adder="PI"
    $("#expressionInput").val($("#expressionInput").val()+"+"+adder)
}
/*
document.getElementsByClassName("actionTypeButton")[0].onclick=function(ev)
		{
			document.getElementById("actionTypeDiv").innerHTML="f(x)="; 
			document.getElementById("expressionEvalButton").value="function"
			document.getElementById("leftSettingsDiv").innerHTML="Program przyjmuje niewiadome x,y,z </br> oraz obsługuje funkcje:<ul><li>+ , - , / , * ,^ ,(,)</li><li>sqrt(2,3)</li><li>sinus</li><li>cosinus</li><li>angens</li><li>cotangens</li><li>arcussinus</li><li>arcuscosinus</li><li>arcustangens</li><li>arcuscotangens</li><li>log(a,b)</li><li> ln(a)</li></ul>"
		}
	
document.getElementsByClassName("actionTypeButton")[1].onclick=function(ev)
		{
			document.getElementById("actionTypeDiv").innerHTML="lim(n->∞)";
			document.getElementById("expressionEvalButton").value="rowLimit"
			document.getElementById("leftSettingsDiv").innerHTML="Sposób zapisania: wystarczy podać wyraz ogólny ciągu w zależności od n"
		}
		document.getElementsByClassName("actionTypeButton")[2].onclick=function(ev)
		{
			document.getElementById("actionTypeDiv").innerHTML="Liczby zespolone";
			document.getElementById("expressionEvalButton").value="complex"
		}
	*/

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
