//GLOBAL VARS
var canvasScreen=document.createElement("canvas");
var canvasWidth;
var canvasHeight;


var numberOfVerticalLines=41;
var numberOfHorizontalLines=21;
var graphXScale=1;
var graphYScale=1;
var minXPoint=-20;
var maxYPoint=10;
var graphPrecision=16
var graphIsClicked=false;
var graphStartX;
var graphStartY;
var allExpressions;

if(!detectmob())
{
    canvasWidth=screen.width*0.97*0.69;
    canvasHeight=screen.width*0.97*0.69*1/2;
}
else
{
    minXPoint=-10;
    numberOfVerticalLines=21;

    canvasWidth=window.innerWidth
    canvasHeight=window.innerHeight*0.65
}
colors=[]
console.log(Math.random()*255)
var colorRatio=255/3;

/*COMUNNISM LIST

0.9x+7 for (-6.11,-3)			Młot góra
0.9x+4 for (-4.444,0)			Młot Doł
-0.1x+4 for (-3,0)				Młot trzon prawy
-0.9x-4 for (-6.11,-4.444)		młot trzon lewy  
-0.9x-1 for (-2.777,5)			rączka lewa
-0.9x+1 for (-1.666,6.11)				rączka prawa
0.9x-10	for (5,6.11)							rączka dół
((-x+10)/0.06)^0.5 for (0,10)sierp prawa gora
((-1.7x+10)/0.06)^0.5 for (0,10) sierp prawa dol
-(abs(-x+10)/0.06)^0.5 for (0,5.92)
	
*/

for(var i=0;i<20;i++)
{
    colors.push("rgb("+((Math.random()<0.5?1:0)*255)+","+((Math.random()<0.5?1:0)*255)+","+((Math.random()<0.5?1:0)*255)+")")
  //  console.log(colors[colors.length-1])
    if(colors[colors.length-1]=="rgb(255,255,255)"){
        colors.pop()
        i--
    }
}

function drawGraph(expr,canvasScreen) {
	//JEDNA LICZBA
	//(100,200>
	//x>0
	//Infinity ,inf
    allExpressions=expr;
	clearCanvas(canvasScreen)
	drawNet(canvasScreen)
	drawLegend(canvasScreen)
	var specialColor=0;
    var c = canvasScreen.getContext('2d');
	

    for(var i2=0;i2<expr.length;i2++)
	{
		var isDomain=false;
	var leftDomain,rightDomain;
	var tempExpr=expr[i2];
	var colorForExpression=colors[i2%colors.length]
	
		if(expr[i2].includes("for"))
		{
			isDomain=true;
			var domain
				domain=tempExpr.split("for");
				tempExpr=domain[0].trim()
				domain[1]=domain[1].trim();
				if(domain[1].includes("(")||domain[1].includes("<")){domain=domain[1].split(",")
				leftDomain=domain[0].slice(1,domain[0].length)
				rightDomain=domain[1].slice(0,domain[1].length-1)
				leftDomain=RPNtoNumber(reversePolishNotation(leftDomain).join(),1)
				rightDomain=RPNtoNumber(reversePolishNotation(rightDomain).join(),2)
                    domain[1]=[leftDomain,rightDomain]
				}
				else 
				{
				    var centerDomain=RPNtoNumber(reversePolishNotation(domain[1]).join(),1)
					if(minXPoint+(graphXScale/graphPrecision)<=centerDomain&&centerDomain <=(minXPoint+((numberOfVerticalLines-1)*graphPrecision*(graphXScale/graphPrecision))))
					{
						c.beginPath()
						c.fillStyle=colors[i2%colors.length]
						c.lineWidth=4
						var x=((centerDomain-minXPoint)*(canvasWidth/numberOfVerticalLines/graphXScale))
						var fx=RPNtoNumber(reversePolishNotation(tempExpr ).join(","),(centerDomain));
						c.arc(x,(canvasHeight/numberOfHorizontalLines)*(maxYPoint-fx)*(1/graphYScale),5,0,2*Math.PI);
						c.fill()
						continue
					}
					domain[1]=centerDomain
				}
		}
		if(expr[i2].includes("color"))
		{
			specialColor=expr[i2].split(" ")[1]
			continue
		}
		if(expr[i2].includes("end color"))
		{
			specialColor=0
			continue
		}
        var expression=reversePolishNotation(tempExpr).join(",")
        c.beginPath();
        var fx=RPNtoNumber(expression,(minXPoint));
		if(specialColor!=0)colorForExpression=specialColor
		c.strokeStyle=colorForExpression
		
		
		
        c.lineWidth=4
        if(!isDomain)c.moveTo(0,(canvasWidth/numberOfHorizontalLines)*(maxYPoint-fx))
		else {
			if((minXPoint+(graphXScale/graphPrecision))<=leftDomain&&leftDomain <=(minXPoint+((numberOfVerticalLines-1)*graphPrecision*(graphXScale/graphPrecision))))
				moveTo(leftDomain,RPNtoNumber(expression,(leftDomain)))
		}	
        for(var i=1;i<(numberOfVerticalLines-1)*graphPrecision;i++)
        {
			if(isDomain)
				if(!(leftDomain<=(minXPoint+(i*(graphXScale/graphPrecision)))&&(minXPoint+(i*(graphXScale/graphPrecision)))<=rightDomain))
					continue;
						
			
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
                c.strokeStyle="#000000"
                for(var i3=0;i3<40;i3+=2) {
                    c.moveTo(i * (canvasWidth / numberOfVerticalLines) / graphPrecision, i3*(canvasHeight/40));
                    c.lineTo(i * (canvasWidth / numberOfVerticalLines) / graphPrecision, (i3+1)*(canvasHeight/40));
                }
                c.stroke()
                c.beginPath()
                c.strokeStyle=colorForExpression
                continue
            }
            c.lineTo((i*(canvasWidth/numberOfVerticalLines)/graphPrecision),(canvasHeight/numberOfHorizontalLines)*(maxYPoint-fx)*(1/graphYScale))
        }
        c.stroke();
        c.lineWidth=1;
        c.strokeStyle="#FFFFFF"

	}
	if(isDomain)return domain[1]
	return null



}
function drawNet(canvasScreen)
{

	var c = canvasScreen.getContext('2d');
	c.beginPath();
	c.strokeStyle="#CCCCCC";
	for(var i=0;i<numberOfVerticalLines-1;i++)
	{
        if(minXPoint+i*graphXScale==0)
        {
            c.beginPath()
            c.lineWidth=3;
            c.strokeStyle="#000000"
            c.stroke();
        }
		c.moveTo(i*(canvasWidth/numberOfVerticalLines),0);
		c.lineTo(i*(canvasWidth/numberOfVerticalLines),canvasHeight)
        c.stroke();
        if(minXPoint+i*graphXScale==0)
        {

            c.beginPath()
            c.lineWidth=1;
            c.strokeStyle="#000000"
            c.stroke();
            c.strokeStyle="#CCCCCC"
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
            c.stroke();
            c.strokeStyle="#CCCCCC"
        }
		c.moveTo(0,i*(canvasHeight/numberOfHorizontalLines));
		c.lineTo(canvasWidth,i*(canvasHeight/numberOfHorizontalLines))
        c.stroke();
        if(maxYPoint-i*graphYScale==0)
        {
        	c.stroke()
			c.beginPath()
            c.lineWidth=1;
            c.strokeStyle="#CCCCCC"
            c.stroke();
        }
	}
	c.stroke();
	c.strokeStyle="#FFFFFF";
	}
function drawLegend(canvasScreen)
{
    var c = canvasScreen.getContext('2d');
    var fontSize=(canvasWidth/100)
    c.font=fontSize+"px Verdana"
    c.fillStyle="#000000"
	for(var i=0;i<numberOfHorizontalLines;i++)
        c.fillText(maxYPoint-i*graphYScale,canvasWidth-3*fontSize,i*(canvasHeight/numberOfHorizontalLines));
	for(var i=0;i<numberOfVerticalLines;i++)
        c.fillText(minXPoint+i*graphXScale,i*(canvasWidth/numberOfVerticalLines),canvasHeight-2*fontSize+(i%3)*fontSize);
    c.fillStyle="#FFFFFF"
	
}
function clearCanvas(canvasScreen)
{
    var c = canvasScreen.getContext('2d');
    c.fillStyle="#FFFFFF"
    c.fillRect(0,0,canvasWidth,canvasHeight)
	c.fillStyle="#FFFFFF"
}
    function refreshGraph()
    {
        drawGraph(graph,canvasScreen)
    }
function detectmob() {
    if( navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i)
    ){
        return true;
    }
    else {
        return false;
    }
}






























