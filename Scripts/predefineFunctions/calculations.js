function createCalculationCard(expression,domain)
{
	
    if(expression.includes("^0."))return    //chodzi o pierwiastki, ominąć
	if(expression.includes("for"))
	{
		expression=expression.split("for")[0].trim();
	console.log(expression)
	}
    expression=commonDenominator(expression)
    var exprRPN=reversePolishNotation(expression)
    var shortedExpression=RPNtoExpression(reversePolishNotation(expression))
    var derivative=giveDerivative(shortedExpression)
    var extremum=getExtremum(shortedExpression)

 	try{if(extremum.toString()!=extremum)extremum=extremum.join()}
        catch(e){extremum="Brak punktów ekstremalnych"}
 	var roots=giveRoots(shortedExpression)
    try{roots=roots.join()}catch(e){roots="Brak miejsc zerowych"}
    var calculationCard=$("<div>",{class:"calculationCard card "})
        calculationCard.append($("<h2>",{class:"header center-align"}).text(" Wyrażenie: $"+expression+"$")).append($("<hr>"))
        calculationCard.append($("<div>",{class:"calculationCardSection"}).text("Odwrotna notacja Polska :    "+exprRPN))
        calculationCard.append($("<div>",{class:"calculationCardSection"}).text("Wyrażenie po skróceniu : $"+shortedExpression+"$"))
        calculationCard.append($("<div>",{class:"calculationCardSection"}).text("Pochodna po x:`"+derivative+"`"))
        calculationCard.append($("<div>",{class:"calculationCardSection"}).text("Ekstrema funkcji: "+extremum))
        calculationCard.append($("<div>",{class:"calculationCardSection"}).text("Miejsca zerowe funkcji: "+roots))

    /*
    if(domain!=null) {
		var tempX,tempY;
		if(domain.includes(",")) {
		}
		else {
			tempX=domain;
			tempY=RPNtoNumber(exprRPN.join(),domain)
		}
		cardText+="Dla wartosci "+tempX+" = "+tempY+" "
	}*/


    $("#calculations").prepend(calculationCard);
    MathJax.Hub.Typeset()
}
function createCalculationForComplex(expression) {

}
function compareRank(firstNumber, secondNumber) {

    var firstRank,secondRank;
   firstRank=getExpressionRank(firstNumber)
   secondRank=getExpressionRank(secondNumber)
    if(firstRank==secondRank)return true
    return false
}

function refreshMathJax() {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src  = "https://example.com/MathJax.js?config=TeX-AMS-MML_HTMLorMML";
    document.getElementsByTagName("head")[0].appendChild(script);
};














