//GLOBAL VARS
var canvasScreen=document.createElement("canvas");
var canvasWidth=screen.width*0.97*0.69;
var canvasHeight=screen.width*0.97*0.69*1/2;
var numberOfVerticalLines=41;
var numberOfHorizontalLines=21;
var graphXScale=1;
var graphYScale=1;
var minXPoint=-20;
var maxYPoint=10;
var graphPrecision=64
var graphIsClicked=false;
var graphStartX;
var graphStartY;
var allExpressions;
var colors=[]
console.log(Math.random()*255)
var colorRatio=255/3;
colors.push("rgb("+(Math.round(Math.random()*255*colorRatio))%255+","+(Math.round(Math.random()*255*colorRatio))%255+","+(Math.round(Math.random()*255*colorRatio)%255)+")")
colors.push("rgb("+(Math.round(Math.random()*255*colorRatio))%255+","+(Math.round(Math.random()*255*colorRatio))%255+","+(Math.round(Math.random()*255*colorRatio)%255)+")")
colors.push("rgb("+(Math.round(Math.random()*255*colorRatio))%255+","+(Math.round(Math.random()*255*colorRatio))%255+","+(Math.round(Math.random()*255*colorRatio)%255)+")")
colors.push("rgb("+(Math.round(Math.random()*255*colorRatio))%255+","+(Math.round(Math.random()*255*colorRatio))%255+","+(Math.round(Math.random()*255*colorRatio)%255)+")")
colors.push("rgb("+(Math.round(Math.random()*255*colorRatio))%255+","+(Math.round(Math.random()*255*colorRatio))%255+","+(Math.round(Math.random()*255*colorRatio)%255)+")")
colors.push("rgb("+(Math.round(Math.random()*255*colorRatio))%255+","+(Math.round(Math.random()*255*colorRatio))%255+","+(Math.round(Math.random()*255*colorRatio)%255)+")")
colors.push("rgb("+(Math.round(Math.random()*255*colorRatio))%255+","+(Math.round(Math.random()*255*colorRatio))%255+","+(Math.round(Math.random()*255*colorRatio)%255)+")")
colors.push("rgb("+(Math.round(Math.random()*255*colorRatio))%255+","+(Math.round(Math.random()*255*colorRatio))%255+","+(Math.round(Math.random()*255*colorRatio)%255)+")")
colors.push("rgb("+(Math.round(Math.random()*255*colorRatio))%255+","+(Math.round(Math.random()*255*colorRatio))%255+","+(Math.round(Math.random()*255*colorRatio)%255)+")")
colors.push("rgb("+(Math.round(Math.random()*255*colorRatio))%255+","+(Math.round(Math.random()*255*colorRatio))%255+","+(Math.round(Math.random()*255*colorRatio)%255)+")")
colors.push("rgb("+(Math.round(Math.random()*255*colorRatio))%255+","+(Math.round(Math.random()*255*colorRatio))%255+","+(Math.round(Math.random()*255*colorRatio)%255)+")")
colors.push("rgb("+(Math.round(Math.random()*255*colorRatio))%255+","+(Math.round(Math.random()*255*colorRatio))%255+","+(Math.round(Math.random()*255*colorRatio)%255)+")")
colors.push("rgb("+(Math.round(Math.random()*255*colorRatio))%255+","+(Math.round(Math.random()*255*colorRatio))%255+","+(Math.round(Math.random()*255*colorRatio)%255)+")")
colors.push("rgb("+(Math.round(Math.random()*255*colorRatio))%255+","+(Math.round(Math.random()*255*colorRatio))%255+","+(Math.round(Math.random()*255*colorRatio)%255)+")")
colors.push("rgb("+(Math.round(Math.random()*255*colorRatio))%255+","+(Math.round(Math.random()*255*colorRatio))%255+","+(Math.round(Math.random()*255*colorRatio)%255)+")")
colors.push("rgb("+(Math.round(Math.random()*255*colorRatio))%255+","+(Math.round(Math.random()*255*colorRatio))%255+","+(Math.round(Math.random()*255*colorRatio)%255)+")")
colors.push("rgb("+(Math.round(Math.random()*255*colorRatio))%255+","+(Math.round(Math.random()*255*colorRatio))%255+","+(Math.round(Math.random()*255*colorRatio)%255)+")")
colors.push("rgb("+(Math.round(Math.random()*255*colorRatio))%255+","+(Math.round(Math.random()*255*colorRatio))%255+","+(Math.round(Math.random()*255*colorRatio)%255)+")")
colors.push("rgb("+(Math.round(Math.random()*255*colorRatio))%255+","+(Math.round(Math.random()*255*colorRatio))%255+","+(Math.round(Math.random()*255*colorRatio)%255)+")")
colors.push("rgb("+(Math.round(Math.random()*255*colorRatio))%255+","+(Math.round(Math.random()*255*colorRatio))%255+","+(Math.round(Math.random()*255*colorRatio)%255)+")")

function drawGraph(expr,canvasScreen)
{
    allExpressions=expr;
	clearCanvas(canvasScreen)
	drawNet(canvasScreen)
	drawLegend(canvasScreen)
    var c = canvasScreen.getContext('2d');


    for(var i2=0;i2<expr.length;i2++)
	{
        var expression=reversePolishNotation(expr[i2]).join(",")
        c.beginPath();
        var fx=RPNtoNumber(expression,(minXPoint));
        c.strokeStyle=colors[i2%colors.length]
        c.lineWidth=4
        c.moveTo(0,(canvasWidth/numberOfHorizontalLines)*(maxYPoint-fx))
        for(var i=1;i<(numberOfVerticalLines-1)*graphPrecision;i++)
        {
            fx=RPNtoNumber(expression,(minXPoint+(i*(graphXScale/graphPrecision))));
            if(!fx&&fx!=0)
            {
                var temp=RPNtoNumber(expression,(minXPoint+((i+1)*(graphXScale/graphPrecision))))
                if(!temp&&temp!=0)
                    c.moveTo((i+1) * (canvasWidth / numberOfVerticalLines) / graphPrecision,0)
                else
                    c.moveTo((i+1) * (canvasWidth / numberOfVerticalLines) / graphPrecision,(canvasHeight/numberOfHorizontalLines)*(maxYPoint-temp)*(1/graphYScale))

                continue
            }
            if(fx==Infinity||fx==-Infinity)
            {
                c.stroke()
                c.beginPath()
                c.strokeStyle="black"
                for(var i3=0;i3<40;i3+=2) {
                    c.moveTo(i * (canvasWidth / numberOfVerticalLines) / graphPrecision, i3*(canvasHeight/40));
                    c.lineTo(i * (canvasWidth / numberOfVerticalLines) / graphPrecision, (i3+1)*(canvasHeight/40));
                }
                c.stroke()
                c.beginPath()
                c.strokeStyle=colors[i2%colors.length]
                continue
            }
            c.lineTo((i*(canvasWidth/numberOfVerticalLines)/graphPrecision),(canvasHeight/numberOfHorizontalLines)*(maxYPoint-fx)*(1/graphYScale))

        }
        c.stroke();
        c.lineWidth=1;
        c.strokeStyle="#000000"
	}



}
function drawNet(canvasScreen)
{

	var c = canvasScreen.getContext('2d');
	c.beginPath();
	c.strokeStyle="#AAAAAA";
	for(var i=0;i<numberOfVerticalLines-1;i++)
	{
        if(minXPoint+i*graphXScale==0)
        {

            c.stroke();
            c.beginPath()
            c.lineWidth=3;
            c.strokeStyle="#000000"
        }
		c.moveTo(i*(canvasWidth/numberOfVerticalLines),0);
		c.lineTo(i*(canvasWidth/numberOfVerticalLines),canvasHeight)
        if(minXPoint+i*graphXScale==0)
        {
            c.stroke()
            c.beginPath()
            c.lineWidth=1;
            c.strokeStyle="#AAAAAA"
        }
	}
	for(var i=0;i<numberOfHorizontalLines;i++)
	{
		if(maxYPoint-i*graphYScale==0)
		{
            c.stroke();
			c.beginPath()
			c.lineWidth=3;
			c.strokeStyle="#000000"
        }
		c.moveTo(0,i*(canvasHeight/numberOfHorizontalLines));
		c.lineTo(canvasWidth,i*(canvasHeight/numberOfHorizontalLines))

        if(maxYPoint-i*graphYScale==0)
        {
        	c.stroke()
			c.beginPath()
            c.lineWidth=1;
            c.strokeStyle="#AAAAAA"
        }
	}
	c.stroke();
	c.strokeStyle="#000000";
	}
function drawLegend(canvasScreen)
{
    var c = canvasScreen.getContext('2d');
    var fontSize=(canvasWidth/100)
    c.font=fontSize+"px Verdana"
    c.fillStyle="black"
	for(var i=0;i<numberOfHorizontalLines;i++)
        c.fillText(maxYPoint-i*graphYScale,canvasWidth-3*fontSize,i*(canvasWidth/numberOfVerticalLines));
	for(var i=0;i<numberOfVerticalLines;i++)
        c.fillText(minXPoint+i*graphXScale,i*(canvasHeight/numberOfHorizontalLines),canvasHeight-2*fontSize+(i%3)*fontSize);
    c.fillStyle="black"
	
}
function clearCanvas(canvasScreen)
{
    var c = canvasScreen.getContext('2d');
    c.fillStyle="white"
    c.fillRect(0,0,canvasWidth,canvasHeight)
	c.fillStyle="black"
}

canvasScreen.width=(canvasWidth);
canvasScreen.height=(canvasHeight);
document.getElementById("boardDiv").appendChild(canvasScreen)
    canvasScreen.onmousedown=function (ev) {
    graphStartX=ev.x
    graphStartY=ev.y
        graphIsClicked=true;

    }
    canvasScreen.onmouseup=function (ev) {
        graphIsClicked=false;
        }
    canvasScreen.onmousemove=function (ev) {
    if(graphIsClicked)
    {
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

        drawGraph(allExpressions,canvasScreen)

    }
    }






























