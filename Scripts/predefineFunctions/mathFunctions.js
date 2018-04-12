mathFunctions=["abs","log","sign","sin","cos","tg","ctg","asin","acos","atg","actg","sqrt","ln","!"]
function betterEval(action,firstNumber,secondNumber)
	{
		firstNumber=parseFloat(firstNumber)
		secondNumber=parseFloat(secondNumber)
	switch(action)
			{
				case "+":
				return (firstNumber+secondNumber)
				break;
				case "-":
					if(secondNumber==undefined)secondNumber=0;
					if(!secondNumber&&secondNumber!=0)secondNumber=0;
					return (secondNumber-firstNumber)
				break;
				case "*":
				return (firstNumber*secondNumber)
				break;
				case "/":
				return (secondNumber/firstNumber)
				break;
				case "^":
				return (Math.pow(secondNumber,firstNumber))
				break;
				case "~":
					if(parseFloat(firstNumber)<0)return parseFloat(firstNumber*(-1))
					return parseFloat("-"+firstNumber)
					break;
				case "sin":
				return (Math.sin(firstNumber))
				break;
				case "cos":
				return (Math.cos(firstNumber))
				break;
				case "tg":
				return (Math.tan(firstNumber))
				break;
				case "ctg":
				return (1/Math.tan(firstNumber))
				break;
				case "asin":
				return (Math.asin(firstNumber))
				break;
				case "acos":
				return (Math.acos(firstNumber))
				break;
				case "atg":
				return (Math.atan(firstNumber))
				break;
				case "actg":
				return (Math.atan(1/Math.tan(Math.atan(firstNumber)))) //arcusCotangens
				break;
				case "log":
				return (Math.log(firstNumber)/Math.log(secondNumber))
				break;break;
				case "ln":
				return (Math.log(firstNumber))
				break;
				case "sqrt":
				return Math.pow(secondNumber,1/firstNumber)
				break;
				case "abs":
				return Math.abs(firstNumber)
				break;
				case "!":
				return factorial(parseInt(firstNumber))
				break;
				
			}
}
function factorial(n)
{
	var ret=1;
	for(var i=n-1;i>0;i--){
		ret=ret*(n-i)
    }

	return ret
}