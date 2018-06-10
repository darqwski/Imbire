function integrationCalculation() {

    var func=$("#integrationInputFunction").val()
    var down=parseFloat($("#integrationInputBottom").val())
    var top=parseFloat($("#integrationInputTop").val())
    var size=parseFloat($("#integrationInputSizeValue").text())
    var data=[]
    data.push(integrationRectangle(func,down,top,size))
    data.push(integrationTrapeze(func,down,top,size))
    data.push(integrationSimson(func,down,top,size))
    createIntegrationOutput(func,down,top,size,data)

}
function integrationRectangle(func,down,top,size){

    var value=0;
    var RPN=reversePolishNotation(func).join()
    for(var i=down;i<top;i+=size)
        value+=Math.abs(size*RPNtoNumber(RPN,i))
    return value;
}
function integrationTrapeze(func,down,top,size){

    var value=0;
    var RPN=reversePolishNotation(func).join()
    var before=RPNtoNumber(RPN,down)
    for(var i=down+size;i<top+size;i+=size){
        var next=(RPNtoNumber(RPN,i))
        value+=Math.abs(size*((before+next)/2))
        before=next;
    }
    return value;
}
function integrationSimson(func,down,top,size) {

        var s,st;
    var RPN=reversePolishNotation(func).join()
    s  = 0; st = 0;
    for(var i = down; i < top; i+=size) {
        st += RPNtoNumber(RPN,i - size / 2);
        s += (RPNtoNumber(RPN,i))
    }
return Math.abs(size/6*(RPNtoNumber(RPN,down)+RPNtoNumber(RPN,top)+2*s+4*st))
}