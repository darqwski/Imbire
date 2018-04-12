function createCalculationCard(expression)
{
    if(expression.includes("^0."))return    //chodzi o pierwiastki, ominąć
    expression=commonDenominator(expression)
    var exprRPN=reversePolishNotation(expression)
    console.log("RPN")
    console.log(exprRPN)
    var shortedExpression=RPNtoExpression(reversePolishNotation(expression))
    console.log("Shorted")
    console.log(shortedExpression)
    var derivative=giveDerivative(RPNtoExpression(reversePolishNotation(expression)))
    console.log("Derivative")
    console.log(derivative)
    console.log("Ekstremum")
    var extremum=getExtremum(shortedExpression)
    console.log(extremum)
    console.log("Roots")
        var roots=giveRoots(shortedExpression)
    console.log(roots)
    var calculationCard=document.createElement("div")
    var limit=returnLimes(expression)
    calculationCard.className="calculationCard"
    var cardText="";
    cardText+="<h1> Wyrażenie:</br> "+expression+"</h1>"
    cardText+="</br><hr>"
    cardText+="<h2>Odwrotna notacja Polska :</br>    "+exprRPN+"</h2>"
    cardText+="</br></hr>"
    cardText+="<h2>Wyrażenie po skróceniu :</br> "+shortedExpression+"</h2>"
   cardText+="</br></hr>"
   cardText+="<h2>Pochodna po x:</br> "+derivative+"</h2>"
    cardText+="</br></hr>"
   //cardText+="<h2>Granica w nieskonczonosci :</br> "+limit+"</h2>"
   // cardText+="</br></hr>"
    cardText+="<h2>Miejsca zerowe funkcji:  "+roots+"</h2>"
    cardText+="</br></hr>"
    cardText+="<h2>Ekstrema funkcji:  "+extremum+"</h2>"
    calculationCard.innerHTML=cardText;
    $("#boardDiv").append(calculationCard);
}
function createCalculationForComplex(expression)
{

}
function compareRank(firstNumber, secondNumber)
{

    var firstRank,secondRank;
   firstRank=getExpressionRank(firstNumber)
   secondRank=getExpressionRank(secondNumber)
    if(firstRank==secondRank)return true
    return false
}
















