//(x-1)*((x+2)*(x-2)+((x-2)*(x+2)+4-((x-1)*(x+1)+1)))
//sin(x+x)+x^2-cos((x-2)*(x+2))
//sin(x+x)+x^2+cos(sin(x))
/*
var temp=RPNtoExpression(reversePolishNotation("(x-1)*((x+2)*(x-2)+((x-2)*(x+2)+4-((x-1)*(x+1)+1)))+1"))
if(temp!="x^3-x^2-4x+5")
{
    console.log("ERROR : ")
    console.log("(x-1)*((x+2)*(x-2)+((x-2)*(x+2)+4-((x-1)*(x+1)+1)))+1")
    console.log(temp)
    console.log("x^3-x^2-4x+5")
}
temp=RPNtoExpression(reversePolishNotation("sin(x+x)+x^2+cos(sin(x))"))
if(temp!="x^2+cos(sin(x))+sin(2x)")
{
    console.log("ERROR : ")
    console.log("(x-1)*((x+2)*(x-2)+((x-2)*(x+2)+4-((x-1)*(x+1)+1)))+1")
    console.log(temp)
    console.log("x^2+cos(sin(x))+sin(2x)")
} temp=RPNtoExpression(reversePolishNotation("sin(x+x)+x^2-cos((x-2)*(x+2))-2x^2"))
if(temp!="-x^2+sin(2x)-cos(x^2-4)")
{
    console.log("ERROR : ")
    console.log("sin(x+x)+x^2-cos((x-2)*(x+2))-2x^2")
    console.log(temp)
    console.log("-x^2+sin(2x)-cos(x^2-4)")
}
temp=RPNtoExpression(reversePolishNotation("e"))
if(temp!="e")
{
    console.log("ERROR : ")
    console.log("e")
    console.log(temp)
    console.log("e")
}
temp=RPNtoExpression(reversePolishNotation("((x+1)/(x-1)/(x-1)/(x+1)*(x+1))/((x+1)/(x-1))"))
    if(temp!="(x^3+x^2-x-1)/(x^4-2x^2+1)")
    {
        console.log("ERROR :")

        console.log("((x+1)/(x-1)/(x-1)/(x+1)*(x+1))/((x+1)/(x-1))")
        console.log(temp)
        console.log("(x^3+x^2-x-1)/(x^4-2x^2+1)")
    }


*/
