var precisionForAproximation=0.000001
function giveRoots(expression) {
    if (expression == "undefined") return "Brak funkcji"
    if (expression == "Error") return "Brak funkcji"
	console.log(expression)
    var temp = separateByPlusMinus(expression)
    for (var i = 0; i < temp.length; i++)
    {
       // if(getExpressionRank(temp[i])%1!=0)return "Miejsca zerowe funkcji pierwsiatkowej są niedopracowane"
    }
for(var i=0;i<mathFunctions.length;i++)if(expression.includes(mathFunctions[i])){
        console.log(mathFunctions[i])
        return "Brak miejsc zerowych funkcji specjalnych"
}

    if(expression.includes("^x")||expression.includes("^("))return "Miejsca zerowe funkcji wymiernej są jeszce nie dopracowane"

    var saveExpression=commonDenominator(expression)
    expression=RPNtoExpression(reversePolishNotation(getCommonCounter(expression)))
    expression=separateByPlusMinus(expression)
    for(var i=0;i<expression.length;i++)if(checkFunction(expression[i]))return "Miejsca zerowe z funckajmi są jeszcze niedopracowane"

    var exprRank=getExpressionMaxRank(expression)

    console.log(saveExpression)
    console.log(exprRank)
    if(exprRank==0)
    {
        return "Brak miejsc zerowych"
    }
    if(exprRank==1)
    {
        var a,b=0;
        a=getExpressionRatio(expression[0])
        if(expression.length==2)b=getExpressionRatio(expression[1])
        return -b/a
    }
    if(exprRank==2) {
        var a = 0, b = 0, c = 0, d;
        for (var i = 0; i < expression.length; i++)
        {
            if(getExpressionRank(expression[i])==0)c=getExpressionRatio(expression[i])
            if(getExpressionRank(expression[i])==1)b=getExpressionRatio(expression[i])
            if(getExpressionRank(expression[i])==2)a=getExpressionRatio(expression[i])
        }
         d=(b*b-4*a*c)
        if(d<0)return "Delta jest ujemna"
        if(d==0) return -b/(2*a)
        return [(-Math.sqrt(d)-b)/(2*a),(Math.sqrt(d)-b)/(2*a)].sort()
    }
    else
    {

        var adder=precisionForAproximation
        saveExpression=saveExpression.split(")/(")[0]
        var RPN=reversePolishNotation(saveExpression)
        var domain=getDomain(saveExpression)
        var ret=[]
        var lip=false,lim=false,pip=false,pim=false;
        var extremas=[-1000];
        var tempExtremas=getExtremum(RPNtoExpression(reversePolishNotation(expresssionsToExpress(getCommonCounter(expression)))))
        if(tempExtremas=="Error")return "Error"
        extremas=extremas.concat(tempExtremas);

        extremas.push(1000)
        tempExtremas=[]
        if(domain!="R")while(extremas.length)
        {
            var temp=extremas.pop()
          while(temp<=domain[domain.length-1])
         {
             var domainer=domain.pop()
             tempExtremas.push(domainer+adder)
             tempExtremas.push(domainer-adder)
         }

           tempExtremas.push(temp)
        }
        if(domain!="R") extremas=tempExtremas.reverse()
        for(var i=0;i<extremas.length-1;i++)
        {


            var temp;
            var lip=false,lim=false,pip=false,pim=false;
            if(Math.abs(extremas[i]-extremas[i+1])<=adder*2.03)continue
            if(RPNtoNumber(RPN.join(),extremas[i])==Infinity)
            {
                extremas[i]+=adder
                lip=true;
            }
            if(RPNtoNumber(RPN.join(),extremas[i])==-Infinity)
            {
                extremas[i]+=adder
                lim=true
            }
            if(RPNtoNumber(RPN.join(),extremas[i+1])==Infinity)
            {
                extremas[i+1]-=adder
                pip=true;
            }
           if(RPNtoNumber(RPN.join(),extremas[i+1])==-Infinity)
            {
                extremas[i+1]-=adder
                pim=true;
            }

           if(RPNtoNumber(RPN.join(),extremas[i])*RPNtoNumber(RPN.join(),extremas[i+1])>0||(pip||pim)&&(lip||lim))
           {
               if(lip) extremas[i]-=adder
               if(lim) extremas[i]-=adder
               if(pip) extremas[i+1]+=adder
               if(pim) extremas[i+1]+=adder
               continue
           }
            var left=extremas[i];
            var right=extremas[i+1];
            do
            {
                var diff=Math.abs(left-right)/2
                temp=RPNtoNumber(RPN.join(),left+diff)
                if(temp*RPNtoNumber(RPN.join(),extremas[i+1])>0)right-=diff
                else left+=diff
                if(right-left<precisionForAproximation*precisionForAproximation)break
            }while(!(temp/10>-precisionForAproximation*precisionForAproximation&&temp/10<precisionForAproximation*precisionForAproximation))

            if(lip) extremas[i]-=adder
            if(lim) extremas[i]-=adder
            if(pip) extremas[i+1]+=adder
            if(pim) extremas[i+1]+=adder
            left=Math.round(left*(1/precisionForAproximation/precisionForAproximation))*(precisionForAproximation*precisionForAproximation)

               ret.push(left)
        }

       return ret
    }
}
function getExtremum(expression)
{
var ext=giveRoots(giveDerivative(expression))
    if(ext!="Delta jest ujemna")return ext
    return -1000
}
function getExpressionMaxRank(expression)
{

    var maxRank=0;
    for(var i=0;i<expression.length;i++)if(getExpressionRank(expression[i])>maxRank){maxRank=getExpressionRank(expression[i])}
    return maxRank
}
function getDomain(expression)
{
    if(commonDenominator(expression).includes(")/("))
    {
        var denominator=commonDenominator(expression).split(")/(")[1]
        denominator=denominator.slice(0,denominator.length-1)
       var domain=giveRoots(denominator)
        if(domain=="Delta jest ujemna")return "R"
        return domain
    }
    else return "R"
}
function findPoints()
{
    var lines=[]
    var tabs=document.getElementsByClassName("functionTab")
    for(var i=0;i<tabs.length;i++)
        if(document.getElementsByClassName("functionDotter")[i].checked)
            lines.push(tabs[i].outerText)
	 for(var i=0;i<lines.length;i++)if(lines[i].includes("for"))lines[i]=lines[i].split("for")[0].trim()
    var TheLine=lines[0]+"-("+lines[1]+")"
	console.log(TheLine)
	var roots= giveRoots(RPNtoExpression(reversePolishNotation(TheLine)))
	try{roots=roots.join().replace(/,/g,"</br>")}catch(e){roots="Brak punktów wspólnych"}
	var calculationCard=document.createElement("div")
    calculationCard.className="calculationCard"
	calculationCard.innerHTML="<h1>Miejsca wspólne:</h1><h3>"+lines[0]+" oraz "+lines[1]+"</h3></hr>"+roots
	$("#leftTop").prepend(calculationCard)


}