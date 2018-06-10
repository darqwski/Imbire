function RPNtoNumber(tableRPN,valueX,valueY,valueZ)
{
	var Stack=[];
	var tempWord;
	var saveWord;
	var firstNumber,secondNumber;
	tableRPN=tableRPN.split(",")
    tableRPN.reverse();
	while(tempWord=tableRPN.pop())
    {

		if(!isNaN(tempWord))
		{
			Stack.push(tempWord)
			saveWord=tempWord
			continue;
		}
        else if(tempWord=="x")
		{
			Stack.push(valueX)
            saveWord=valueX
			continue;
		}
        else if(tempWord=="y")
		{
			Stack.push(valueY)
            saveWord=valueY
			continue;
		}
        else if(tempWord=="z")
		{
			Stack.push(valueZ)
            saveWord=valueZ
			continue;
		}
        else if(tempWord=="PI")
		{
			Stack.push(Math.PI)
            saveWord=Math.PI
			continue
		}
        else if(tempWord=="e")
		{
			Stack.push(Math.E)
            saveWord=Math.E
			continue
		}
        else if(tempWord=="=")break
		else
		{
			firstNumber=Stack.pop();
			secondNumber=Stack.pop();
			if(tempWord!="+"&&tempWord!="-"&&tempWord!="*"&&tempWord!="/"&&tempWord!="^"&&tempWord!="log"&&tempWord!="sqrt")//two arguments operation
				if(secondNumber!=undefined)Stack.push(secondNumber);
				saveWord=betterEval(tempWord,firstNumber,secondNumber)
				Stack.push(saveWord)
				
		}
	
	}
    if(saveWord===undefined)saveWord=firstNumber
    return saveWord
	
	
}
function reversePolishNotation(text)
{
var shortWords=[] ;
var finalExpression=[];
var Stack=[];
       shortWords=separateExpressions(text);
        shortWords.reverse();
var tempWord;
var tempStack;
        while(tempWord=shortWords.pop())
        {
		if(!isNaN(tempWord))
        {
		
            finalExpression.push(tempWord);
			continue;

        }
		if(tempWord=="i"||tempWord=="PI"||tempWord=="e")
		{
			finalExpression.push(tempWord);
			continue;
		}
		if(tempWord=="x"||tempWord=="y"||tempWord=="z")
		{
			finalExpression.push(tempWord);
			continue;
		}
	
        if(tempWord=="(")
        {
            Stack.push(tempWord);
            continue;
        }
        if(tempWord==")")
        {
			tempStack=Stack.pop();
            while(tempStack!="(")
            {
                finalExpression.push(tempStack);
				tempStack=Stack.pop();
            }
            continue;
        }
            if(tempWord.length==1&&tempWord!="+"&&tempWord!="-"&&tempWord!="/"&&tempWord!="*"&&tempWord!="^")
            {
                Stack.push(tempWord);
                continue;
            }
        while(stackPriority(tempWord)<=stackPriority(tempStack=Stack.pop()))
        {
			if(tempStack==undefined)break;
            finalExpression.push(tempStack)
        }

        if(tempStack!=undefined)Stack.push(tempStack);
		Stack.push(tempWord);

    }
    while(tempWord=Stack.pop())
    {
        finalExpression.push(tempWord)
    }

    return finalExpression;
}



function stackPriority(sign)
{

    if(sign=="^")return 3
    if(sign=="*")return 2
    if(sign=="/")return 2
    if(sign=="+")return 1
    if(sign=="-")return 1
    if(sign=="~")return 1
    if(sign=="(")return 0
    else return 4//Only functions fit here
}




function separateExpressions(text)//Dzieli wyrazenie na znaki,liczby i niewiadome
{
    var shortWords=[];
    for(var i=0;i<text.length;i++)
    {
            
        sign=text[i];
		if(sign==",")
        {

            continue;
            }
        if(sign=="+"||sign=="/"||sign=="*"||sign=="^")
            {
                shortWords.push(sign)
                continue;
            }
            if(sign=="-")
            {
                var tempWord=shortWords.pop()
                if(tempWord!=undefined)shortWords.push(tempWord)
                if(!(tempWord!=NaN)||tempWord==undefined)
                {
                    shortWords.push("~")
                    continue
                }

                shortWords.push(sign)
                continue;
            }


        if(sign=="(")
        {
            var isFunction=shortWords.pop();
            if(isFunction!=undefined)
            {
                var temp=shortWords.pop()
                if(temp!=undefined)shortWords.push(temp)
                if((temp>=0||temp<0||temp=="~"||temp=="-")&&temp!=undefined)
                {
                    if(temp=="~"||temp=="-")
                    {
                        shortWords.push("1")

                    shortWords.push("*")
                        }
                    }

                shortWords.push(isFunction)
            }
              shortWords.push(sign)
            continue;

                
            }
        if(sign==")")
            {
              shortWords.push(sign)
                        continue;
            }
        

        else if(sign=="0"||sign=="1"||sign=="2"||sign=="3"||sign=="4"||sign=="5"||sign=="6"||sign=="7"||sign=="8"||sign=="9"||sign==".")
        {

            var pointerMove=countNumberLength(text.substr(i,text.length-i))
            shortWords.push(text.substr(i,pointerMove))
            i+=pointerMove-1;

        }
        else if(sign=="x"||sign=="y"||sign=="z"||sign=="n"||sign=="i"||sign=="e"||sign=="P"||sign=="m")
		{
			if(!isNaN(text[i-1]))shortWords.push("*")
			if(sign!="P"&&sign!="m")shortWords.push(sign);
			else if(sign=="P")
			{
				shortWords.push("PI")
				i++;
			}
			else if(sign=="m")
            {
                console.log(text[i],text[i+1],text[i+2],text[i+3],text[i+4],text[i+5])
                if(text[i+1]=="i"&&text[i+2]=="l"&&text[i+3]=="i"&&(text[i+4]=="o"||text[i+4]=="u")&&text[i+5]=="n") {
                    shortWords.push(1000000)
                    i += 5;
                    }
            }
		}
   /*     else if(sign=="a"||sign=="b"||sign=="k"||sign=="s"||sign=="t"||sign=="u"||sign=="w"||sign=="p"||sign=="q"||sign=="r")
        {
            shortWords.push(sign);
        }*/
		else 
        {
            var func=checkFunction(text.substr(i,text.length-i))
            shortWords.push(func);
            i+=func.length-1
        }





    }
    return shortWords;
}

function countNumberLength(expression)      //Return number length
{

    sign=expression[1];
    if(sign=="0"||sign=="1"||sign=="2"||sign=="3"||sign=="4"||sign=="5"||sign=="6"||sign=="7"||sign=="8"||sign=="9"||sign==".") {
        return countNumberLength(expression.substr(1,expression.length))+1
    }
    else {

        return 1;
    }
}
function checkFunction(expression)
{
        for(var i=0;i<mathFunctions.length;i++)
        {
            var bool=true;
            for(var i2=0;i2<mathFunctions[i].length;i2++)
            {
                if(expression[i2]!=mathFunctions[i][i2])
                {
                    bool=false;
                    break
                }
            }

            if(bool)return mathFunctions[i];

        }
        return "";
}







