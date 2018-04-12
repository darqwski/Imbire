function getExpressionRank(express) {
    var ret=[]
    var depth=0
    for(var i=0;i<express.length;i++)
    {
        var sign=express[i]

        if(sign=="0"||sign=="1"||sign=="2"||sign=="3"||sign=="4"||sign=="5"||sign=="6"||sign=="7"||sign=="8"||sign=="9"||sign=="."||sign=="~"||sign=="-")continue
        else {

            nextsign=express[i+2]
            if(express[i+1]!="^")ret[ret.length]=1;

            else if( nextsign=="0"|| nextsign=="1"|| nextsign=="2"|| nextsign=="3"|| nextsign=="4"|| nextsign=="5"|| nextsign=="6"|| nextsign=="7"|| nextsign=="8"|| nextsign=="9"|| nextsign=="."|| nextsign=="~"|| nextsign=="-"){
                var temp=""
                for(i=i+2;i<express.length;i++)
                {

                    var  nextsign=express[i]
                    if( nextsign=="0"|| nextsign=="1"|| nextsign=="2"|| nextsign=="3"|| nextsign=="4"|| nextsign=="5"|| nextsign=="6"|| nextsign=="7"|| nextsign=="8"|| nextsign=="9"|| nextsign=="."|| nextsign=="~"|| nextsign=="-")temp+=nextsign
                    else
                    {
                        i--
                        break;
                    }
                }

                ret[ret.length]=parseFloat(temp)
            }
            else
            {
               express=express.split("^")
                return express[1]
            }
        }
    }
    if(ret.length==0)ret.push("0")
    return ret

}
function getExpressionRatio(firstExpression)
{
    var number=""
    firstExpression+=""

    for(var i=0;i<firstExpression.length;i++)
    {
        var sign=firstExpression[i]
        if(sign=="0"||sign=="1"||sign=="2"||sign=="3"||sign=="4"||sign=="5"||sign=="6"||sign=="7"||sign=="8"||sign=="9"||sign=="."||sign=="~"||sign=="-")
        {

            if(sign=="~")sign="-"
            number+=sign

        }
        else break
    }
    if(number!=""&&number!="-")return parseFloat(number)
    else if(number=="-")return -1
    else return 1
}
function getExpressionVariable(firstExpression) {
    var ret=[]
    var depth=0
    var shortFunction=""
    for(var i=0;i<firstExpression.length;i++)
    {

        var sign=firstExpression[i]
        if(sign=="("&&depth==0&&i!=0)
        {
            depth++
            var i2=1;
            while(!checkFunction(shortFunction))
            {
                var temp=ret.pop()
                if(!checkFunction(temp))shortFunction=temp+shortFunction
                else break
            }

            var escape=true
            do{
                var temp=ret.pop()
                if(checkFunction(temp+shortFunction))shortFunction=temp+shortFunction
                else if(temp!=undefined)
                {
                    ret.push(temp)
                    escape=false;
                }
                else escape=false;
            }while(checkFunction(shortFunction)&&escape)

           sign=shortFunction+sign

        }
        if(sign=="0"||sign=="1"||sign=="2"||sign=="3"||sign=="4"||sign=="5"||sign=="6"||sign=="7"||sign=="8"||sign=="9"||sign=="."||sign=="~"||sign=="-"||sign=="^")
            if(depth==0)continue

        if(depth==0)ret[ret.length]=sign
        else {
            if(ret.length!=0)ret[ret.length-1]+=sign
            else ret[0]=sign

        }
        if(sign==")")
        {
            depth--
        }
    }
    if(ret.length==0)ret[0]="@"
    return ret
}
function buildExpression(ratio,variable,rank)
{
    var ret=""
    if(ratio[0]=="~")ratio[0]="-"
    if(ratio=="1"){if(variable[0]!="@"&&rank[0]==0)ret=ratio;}
    else if(ratio=="-1"&&variable!=""&&variable!="@")ret+="-"
    else ret+=ratio
    if(variable[0]==variable[1])rank[0]+=rank[1]
    if(variable[1]==variable[2])rank[1]+=rank[2]
    if(variable[2]==variable[3])rank[2]+=rank[3]
    if(variable[0]==variable[2])rank[0]+=rank[2]
    if(variable[0]==variable[3])rank[0]+=rank[3]
    if(variable[1]==variable[3])rank[1]+=rank[3]
    for(var i=0;i<variable.length;i++)if(variable[i]!="@")
    {


        if(i==1)if(variable[0]==variable[1])continue;
        if(i==2)if(variable[1]==variable[2])continue;
        if(i==3)if(variable[2]==variable[3])continue;
        if(i==2)if(variable[0]==variable[2])continue;
        if(i==3)if(variable[0]==variable[3])continue;
        if(i==3)if(variable[1]==variable[3])continue;
        if(rank[i]==0)continue
        ret+=variable[i]
        if(rank[i]==1)continue
        ret+="^"
        ret+=rank[i]
    }
    if(variable[0]=="@"&&variable.length==1)return ratio.toString()
    if(variable[0]=="@"&&variable[1]=="@")return ratio
    if(variable[0]=="x"&&rank[0]==0)return ratio
    return ret
}
function separateByPlusMinus(separatingExpression)
{
    separatingExpression+=""
    var functionTemp=[]
    var temp=""
    var depth=0;
    for(var i=0;i<separatingExpression.length;i++)
    {
        var sign=separatingExpression[i]
        if(sign=="+"&&depth==0)
        {
            functionTemp.push(temp)
            temp=""
            continue
        }
        if((sign=="-"&&depth==0)||(sign=="~"&&depth==0))
        {
            functionTemp.push(temp)
            temp="~"
            continue
        }
        if(sign=="(")depth++
        if(sign==")")depth--
        temp+=sign;
    }
    functionTemp.push(temp)
    return functionTemp


}

function separateByMultiDivide(separatingExpression)
{
    separatingExpression+=""
    var functionTemp=[]
    var temp=""
    var depth=0;
    for(var i=0;i<separatingExpression.length;i++)
    {
        var sign=separatingExpression[i]
        if(sign=="*"&&depth==0)
        {
            functionTemp.push(temp)
            temp=""
            continue
        }
        if((sign=="/"&&depth==0))
        {
            functionTemp.push(temp)
            temp="/"
            continue
        }
        if(sign=="(")depth++
        if(sign==")")depth--
        temp+=sign;
    }
    functionTemp.push(temp)
    return functionTemp


}

function reductionSimilarExpressions(text)
{
    var expressions=separateByPlusMinus(text)
    for(var i=0;i<expressions.length;i++)
    {
        if(expressions[i]==""||expressions[i]=="undefined")continue
        for(var i2=i+1;i2<expressions.length;i2++)
        {
            if(expressions[i2]==""||expressions[i2]=="undefined")continue
            if(getExpressionRank(expressions[i]).join()==getExpressionRank(expressions[i2]).join())
                if(getExpressionVariable(expressions[i]).join()==getExpressionVariable(expressions[i2]).join()){
                    expressions[i]=buildExpression(getExpressionRatio(expressions[i])+getExpressionRatio(expressions[i2]),getExpressionVariable(expressions[i]),getExpressionRank(expressions[i]))
                    expressions[i2]=""

                }
        }

    }
    expressions=sortWholeExpression(expressions)
    finalExpression=expresssionsToExpress(expressions)
    return finalExpression


}
function expresssionsToExpress(expressions) {
    var finalExpression=""
    for(var i=0;i<expressions.length;i++){
        if(expressions[i]=="")continue
        if(getExpressionRatio(expressions[i])==0)continue
        var temp=expressions[i]
        temp+=""
        temp=temp.replace("~","-")
        if(finalExpression!=""&&getExpressionRatio(temp)>=0)finalExpression+="+"
        finalExpression+=temp
    }
    return finalExpression

}
function sortSingleExpression(express)
{
    if(express.includes("("))return express //FUNCTION IS NOT EXPRESS!
    var newExpress=""
    var varStack,rankStack;
    var newvarStack=[],newrankStack=[];
    varStack=getExpressionVariable(express)
    rankStack=getExpressionRank(express)
    for(var i=0;i<varStack.length;i++)
    {
        var counter=0
        for(var i2=0;i2<varStack.length;i2++) {
            if (varStack[i] > varStack[i2]) counter++
            else if (varStack[i] == varStack[i2])
            {
                if(rankStack[i]>rankStack[i2])counter++
            }

        }
        newvarStack[counter]=varStack[i]
        newrankStack[counter]=rankStack[i]

    }

    return buildExpression(getExpressionRatio(express),newvarStack,newrankStack)

}
function sortWholeExpression(expression)
{
    var express=expression
    var sorted=[]
    var countMovePoint=0;
    for(var i=0;i<express.length;i++)if(!express[i])countMovePoint++
    for(var i=0;i<express.length;i++)if(checkFunction(express[i])||checkFunction(express[i].slice(1,express[i].length)))countMovePoint++
    for(var i=0;i<express.length;i++)
    {
        if(express[i]=="")continue
        if(express[i].includes("("))continue
        var counter=0
        for(var i2=0;i2<express.length;i2++)
        {

            if(i2==i)continue
            if(express[i2]=="")continue
            if(express[i2].includes("("))continue
            if(getExpressionRank(express[i])>getExpressionRank(express[i2]))counter++
            else if(getExpressionRank(express[i])==getExpressionRank(express[i2]))
                if(getExpressionVariable(express[i])>getExpressionVariable(express[i2]))counter++
        }
        sorted[express.length-1-counter-countMovePoint]=express[i]
    }

    for(var i=0;i<express.length;i++) if(express[i].includes("("))sorted.push(express[i])
    return sorted;
}
function multipleExpressions(firstExpress,secondExpress)
{

    var finalExpression=""
    var tempFirst,tempSecond;
    if(firstExpress.includes("/"))tempFirst=(firstExpress.split("/")[0]).slice(1,(firstExpress.split("/")[0]).length-1)
    else tempFirst=firstExpress
    if(secondExpress.includes("/"))tempSecond=(secondExpress.split("/")[0]).slice(1,(secondExpress.split("/")[0]).length-1)
    else tempSecond=secondExpress
    var firstExpressUp=separateByPlusMinus(tempFirst)
    var secondExpressUp=separateByPlusMinus(tempSecond)
  for(var i=0;i<firstExpressUp.length;i++)
        for(var i2=0;i2<secondExpressUp.length;i2++)
        {
            var temp;
            if(firstExpressUp[i]==""||secondExpressUp[i2]=="")continue
            if(firstExpressUp[i][0]=="("||secondExpressUp[i2][0]=="(")
            {

                if(firstExpressUp[i][0]=="(")
                {
                    firstExpressUp[i]=firstExpressUp[i].slice(1,firstExpressUp[i].length-1)
                    temp=multipleExpressions(firstExpressUp[i],secondExpressUp[i2])
                }
                if(secondExpressUp[i2][0]=="(")
                {
                    secondExpressUp[i2]=secondExpressUp[i2].slice(1,secondExpressUp[i2].length-1)
                    temp=multipleExpressions(firstExpressUp[i],secondExpressUp[i2])
                }
            }
            else
            {
                //if(firstExpressUp[i].length!=1)firstExpressUp[i]=expresssionsToExpress(firstExpressUp[i])
                //if(secondExpressUp[i2].length!=1)secondExpressUp[i2]=expresssionsToExpress(secondExpressUp[i2])
                temp=multipleSingleExpressions(firstExpressUp[i],secondExpressUp[i2])
            }

            if((i!=0||i2!=0)&&getExpressionRatio(temp)>=0)finalExpression+="+"
            finalExpression+=temp


        }
    if(firstExpress.includes("/")&&secondExpress.includes("/"))
    {

        tempFirst=firstExpress.split("/")[1]
        tempSecond=secondExpress.split("/")[1]
        var secondFinalExpress=""
        for(var i=0;i<tempFirst.length;i++)
            for(var i2=0;i2<tempSecond.length;i2++)
            {
                if(tempFirst[i]==""||tempSecond[i2]=="")continue
                var temp=multipleSingleExpressions(tempFirst[i],tempSecond[i2])

                if((i!=0||i2!=0)&&getExpressionRatio(temp)>=0)secondFinalExpress+="+"
                secondFinalExpress+=temp


            }
        return "("+reductionSimilarExpressions(finalExpression)+")/("+reductionSimilarExpressions(secondFinalExpress)+")"

    }
    if(firstExpress.includes("/")&&!secondExpress.includes("/"))
    {

        return "("+reductionSimilarExpressions(finalExpression)+")/("+reductionSimilarExpressions(firstExpress.split("/")[1])+")"
    }
    if(!firstExpress.includes("/")&&secondExpress.includes("/"))
    {

        return "("+reductionSimilarExpressions(finalExpression)+")/("+reductionSimilarExpressions(secondExpress.split("/")[1])+")"
    }
    return reductionSimilarExpressions(finalExpression)
    // else
    //for(var i=0;)

}

function multipleSingleExpressions(firstExpress,secondExpress)
{
    return buildExpression(parseFloat(getExpressionRatio(firstExpress))*parseFloat(getExpressionRatio(secondExpress)),getExpressionVariable(firstExpress).concat(getExpressionVariable(secondExpress)),getExpressionRank(firstExpress).concat(getExpressionRank(secondExpress)))
}
function RPNtoExpression(expr)
{
    var RPN=expr
    var Final=[];
    var FinalImagine=[]
    var Stack=[];
    var tempWord;
    var saveWord;
    var saveStack=RPN;
    RPN.reverse();
    RPN.push("=")
    tempWord=RPN.pop()
    while(tempWord=RPN.pop()) {

        saveWord = tempWord
        if (!isNaN(tempWord)) {
            Stack.push(tempWord)

            continue;
        }
        else if (tempWord == "x") {
            Stack.push("x")
            continue;
        }
        else if (tempWord == "y") {
            Stack.push("y")
            continue;
        }
        else if (tempWord == "z") {
            Stack.push("z")
            continue;
        }
        else if (tempWord == "PI") {
            Stack.push(Math.PI+"")
            continue
        }
        else if (tempWord == "e") {
            Stack.push(Math.E+"")
            continue
        }
        else if (tempWord == "=") break
        else {
            firstNumber = Stack.pop();
            secondNumber = Stack.pop();
            if (tempWord != "+" && tempWord != "-"&& tempWord != "~" && tempWord != "*" && tempWord != "/" && tempWord != "^" && tempWord != "log" && tempWord != "sqrt")//two arguments operation
                Stack.push(secondNumber)

            console.log((tempWord, firstNumber, secondNumber))
            saveWord = evalForExpression(tempWord, firstNumber, secondNumber)
            Stack.push(saveWord)
            console.log(Stack)
        }
    }
    if(saveWord===undefined)saveWord=firstNumber
    return reductionSimilarExpressions(saveWord)
}
function evalForExpression(tempworde,firstExpress,secondExpress)
{
    var ret="";
    switch(tempworde)
    {
        case "+":
            return firstExpress+"+"+secondExpress
        case "-":

            var temp=multipleExpressions(firstExpress,"-1")
            if(secondExpress!=undefined) {
                if (temp[0] == "-") return secondExpress + temp
                return secondExpress + "+" + temp
            }
            else return temp
        case "~":
            var temp=multipleExpressions(firstExpress,"-1")
            if(secondExpress!=undefined) {
                if (temp[0] == "-") return secondExpress + temp
                return secondExpress + "+" + temp
            }
            else return temp
        case "*" :
            return multipleExpressions(firstExpress,secondExpress)
        case "/" :return divideExpressions(reductionSimilarExpressions(secondExpress),reductionSimilarExpressions(firstExpress))
        case "^" :
            if(firstExpress>0||firstExpress<0||firstExpress===0) return powerOfExpression(secondExpress,firstExpress)

            return "("+secondExpress+")^"+firstExpress
        default :
            return (tempworde+"("+(RPNtoExpression(reversePolishNotation(firstExpress)))+")")

    }
}
function powerOfExpression(expression,power)
{
    if(power%1!=0)return expression+"^"+power
    if(power==1)return expression;
    return multipleExpressions(powerOfExpression(expression,power-1),expression)

}
function divideExpressions(firstExpress,secondExpress)
{
    var firstParts=separateByMultiDivide(firstExpress)
    var secondParts=separateByMultiDivide(secondExpress)
    var counter="1",denominator="1";
    for(var i=0;i<firstParts.length;i++)if(firstParts.length!=1)
    {

        if(firstParts[i][0]!="/"){
            if(firstParts[i][0]=="(")
                counter=multipleExpressions(counter,firstParts[i].slice(1,firstParts[i].length-1))
            else
                counter=multipleExpressions(counter,firstParts[i])
        }
        else {
           if(firstParts[i][1]=="(")
               denominator=multipleExpressions(denominator,firstParts[i].slice(2,firstParts[i].length-1))
            else
                denominator=multipleExpressions(denominator,firstParts[i])
        }

    }
    if(firstParts.length==1)counter=multipleExpressions(counter,firstParts[0])
    for(var i=0;i<secondParts.length;i++)if(secondParts.length!=1)
    {
        if(secondParts[i][0]=="/"){
            if(secondParts[i][1]=="(")
                counter=multipleExpressions(counter,secondParts[i].slice(2,secondParts[i].length-1))
            else
                counter=multipleExpressions(counter,secondParts[i])
        }
        else {
            if(secondParts[i][0]=="(")denominator=multipleExpressions(denominator,secondParts[i].slice(1,secondParts[i].length-1))
            else denominator=multipleExpressions(denominator,secondParts[i])
        }
    }
    if(secondParts.length==1)
        denominator=multipleExpressions(denominator,secondParts[0])
    return "("+counter+")/("+denominator+")"
}
function commonDenominator(expression)
{

    var top=[]
    var bottom=[]
    var final=[]
    var finalBottom="1"
    var save=expression
    expression=separateByPlusMinus(expression)
        if(expression.length==1)return save
    for(var i=0;i<expression.length;i++)
    {
        if(expression[i].includes("/"))
        {
            top.push(expression[i].split("/")[0])
            bottom.push(expression[i].split("/")[1])
        }
        else {
            top.push(expression[i])
            bottom.push("1")
        }
    }
    for(var i=0;i<bottom.length;i++)finalBottom=multipleExpressions(finalBottom,RPNtoExpression(reversePolishNotation(bottom[i])))
    if(finalBottom==1)return save
    for(var i=0;i<bottom.length;i++)
    {
        var temp=top[i]//RPNtoExpression(reversePolishNotation(top[i]))
        for(var i2=0;i2<bottom.length;i2++)
        {
            if(i2!=i)temp=multipleExpressions(temp,RPNtoExpression(reversePolishNotation(bottom[i2])))
        }
        final.push(temp)
    }


    return "("+expresssionsToExpress(final)+")/("+finalBottom+")"
}

function getCommonCounter(expression)
{

    var top=[]
    var bottom=[]
    var final=[]
    var finalBottom="1"
    var save=expression
    expression=separateByPlusMinus(expression)
    for(var i=0;i<expression.length;i++)
    {
        if(expression[i].includes("/"))
        {
            top.push(expression[i].split("/")[0])
            bottom.push(expression[i].split("/")[1])
        }
        else {
            top.push(expression[i])
            bottom.push("1")
        }
    }
    for(var i=0;i<bottom.length;i++)
    {
        finalBottom=multipleExpressions(finalBottom,bottom[i])
        var temp=top[i];
        for(var i2=0;i2<bottom.length;i2++)
            if(i2!=i)temp=multipleExpressions(temp,bottom[i2])
        final.push(temp)
    }
    if(finalBottom==1)return save
    return expresssionsToExpress(final)
}


























