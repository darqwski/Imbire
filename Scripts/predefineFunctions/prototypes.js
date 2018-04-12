function expression(text)
{
    this.startText=text
    this.RPN=reversePolishNotation(this.startText)
    this.shortText=RPNtoExpression(reversePolishNotation(commonDenominator(text)))
    this.words=separateByPlusMinus(this.shortText)
    for(var i=0;i<this.words.length;i++)
        this.words[i]=new word(this.words[i])

    console.log(this.words)
}
function word(text)
{
    //Getting ratio
    this.text=text;
    this.ratio="";
    var i;
    for(i=0;i<text.length;i++)
    {
        var temp=text[i]
        if(!isNumber(temp)&&temp!="-"&&temp!="~")break
        this.ratio+=temp
    }
    if(this.ratio=="")this.ratio="1";
    if(this.ratio=="-")this.ratio="-1"
    if(this.ratio[0]=="~")this.ratio=this.ratio*(-1)+""

    //Getting variable
    var counter=0;
    this.variable=""//If function, variable is function name, else x,y,z
    for(i;i<text.length;i++)
    {
        if(text[i]=="(")counter++
        else if(text[i]==")")counter--
        if(text[i]=="^"&&counter==0)break
        this.variable+=text[i]
    }
    if(this.variable=="")this.variable="none"


    //Getting rank
    this.rank=""
    i++
    for(i;i<text.length;i++) this.rank+=text[i]
    if(this.rank=="")this.rank="1"
    this.innerExpression="";
    if(this.variable.includes("("))
    //if variable is function, then innerExpression is expression inside function
    this.isFunction;
}

function getRatio(text)
{

    var ratio=""
    for(var i=0;i<text.length;i++)
    {
        var temp=text[i]
        if(!isNumber(temp)&&temp!="-"&&temp!="~")break
        ratio+=temp
    }
    if(ratio=="")ratio="1";
    if(ratio=="-")ratio="-1"
    if(ratio[0]=="~")ratio=ratio*(-1)+""
    return ratio
}
function getRank(text)
{
    var i;
    for(i=0;i<text.length;i++)
    {
        var temp=text[i]
        if(!isNumber(text[i])&&text[i]!="-"&&text[i]!="~")break
    }
}
function getVariable(text)
{


}
function isNumber(sign)
{
    for(i=0;i<10;i++)if(sign==i)return true
    return false
}
function reverse(text)
{
    for(var i=0;i<text.length/2;i++)
    {
        var a=text[text.length-1-i]
        text[text.length-1-i]=text[i]
        text[i]=a
    }
    return text
}