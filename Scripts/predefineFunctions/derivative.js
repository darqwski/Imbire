function giveDerivative(text)
{
    var express=separateByPlusMinus(text)
    var finalExpression=""
    for(var i=0;i<express.length;i++)
    {
        if(express[i].includes("/")) {
            finalExpression+=giveDivideDerivative(express[i])
            continue
        }
        if(getExpressionVariable(express[i])==0)continue
        if(i!=0&&getExpressionRatio(express[i])*getExpressionRank(express[i])>=0&&finalExpression.length!=0)finalExpression+="+"
        else if(i!=0&&express[i][0]!="-"&&express[i].includes("("))finalExpression+="+"
        if(getExpressionVariable(express[i])!="@"&&!express[i].includes("(")){
            finalExpression+=buildExpression(getExpressionRatio(express[i])*getExpressionRank(express[i]),[getExpressionVariable(express[i])],[getExpressionRank(express[i])-1])
        }
        if(getExpressionVariable(express[i])=="@")finalExpression+="0"
       else if(express[i].includes("^")&&getExpressionRank(express[i])=="x")
        {
            return "Error"
        }
        else if(express[i].includes("^")&&getExpressionRank(express[i])%1!=0)
        {
            return "Error"
        }
           if(express[i].includes("("))
        {
            finalExpression+=giveSpecialDerivative(express[i])
        }

    }
    return finalExpression
}
function giveSpecialDerivative(express)
{
    var minus;
    var shortFunction=express.split("(")[0]
    var innerFunction=express.slice(shortFunction.length+1,express.length-1)
    if(innerFunction.includes(","))innerFunction=innerFunction.split(",")
    if(shortFunction[0]=="~")
    {
        minus=true;
        shortFunction=shortFunction.slice(1,shortFunction.length);
    }
    switch(shortFunction)
    {
       // case "sqrt":
      //      return multipleExpressions(,giveDerivative(innerFunction[0]))
        case "sin":
            if(minus)return multipleExpressions("-cos("+innerFunction+")",giveDerivative(innerFunction));
            return multipleExpressions("cos("+innerFunction+")",giveDerivative(innerFunction));
        case "cos":
            if(minus)return multipleExpressions("sin("+innerFunction+")",giveDerivative(innerFunction))
            return multipleExpressions("-sin("+innerFunction+")",giveDerivative(innerFunction))
        case "tg":
          if(minus)  return multipleExpressions("(-1)/(cos("+innerFunction+"))^2",giveDerivative(innerFunction))
            return multipleExpressions("(1)/(cos("+innerFunction+"))^2",giveDerivative(innerFunction))
        case "ctg":
            if(minus)return multipleExpressions("(1)/sin("+innerFunction+")",giveDerivative(innerFunction))
            return multipleExpressions("(-1)/sin("+innerFunction+")",giveDerivative(innerFunction))
        case "ln":
            if(minus)return multipleExpressions("(-1)/("+innerFunction+")",giveDerivative(innerFunction))
            return multipleExpressions("(1)/("+innerFunction+")",giveDerivative(innerFunction))
        case "asin":
            if(minus) return multipleExpressions("(-1)/sqrt((2),(1-("+innerFunction+")^2)",giveDerivative(innerFunction))
                return multipleExpressions("(1)/sqrt((2),(1-("+innerFunction+")^2)",giveDerivative(innerFunction))
        case "acos":
            if(minus)return multipleExpressions("(1)/sqrt((2),(1-("+innerFunction+")^2)",giveDerivative(innerFunction))
            return multipleExpressions("(-1)/sqrt((2),(1-("+innerFunction+")^2)",giveDerivative(innerFunction))
        case "atg":
            if(minus)return multipleExpressions("(-1)/(1-("+innerFunction+")^2)",giveDerivative(innerFunction))
            return multipleExpressions("(1)/(1-("+innerFunction+")^2)",giveDerivative(innerFunction))
        case "actg":
            if(minus)return multipleExpressions("(1)/(1-("+innerFunction+")^2)",innerFunction)
            return multipleExpressions("(-1)/(1-("+innerFunction+")^2)",innerFunction)

    }

}
function giveDivideDerivative(express) {

    express=express.split("/")
            var L1=express[0].slice(1,express[0].length-1)
            var L2=giveDerivative(express[0].slice(1,express[0].length-1))
            var M1=express[1].slice(1,express[1].length-1)
            var M2=giveDerivative(express[1].slice(1,express[1].length-1))

    var D1=RPNtoExpression(reversePolishNotation("((-("+L1+")*("+M2+"))+("+L2+")*("+M1+"))/(("+M1+")*("+M1+"))"))
    return D1

}
//countNumberLenght
//check function