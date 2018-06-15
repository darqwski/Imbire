function interpolationCalculations(){



    $("#lagrangeView").remove()
    $("#newtonView").remove()
    var finalLagrange= createLagrangeView(interpolationLagrange())
    var finalNewton=  createNewtonView(interpolationNewton())

    $("canvas").remove();
    $(".main-grid-container").append($("<div>",{id:"boarderDiv"}).append($("<canvas>",{width:canvasWidth,height:canvasHeight})))
    var data=[]
    colors=[]
    colors.push("#FF0000")
    colors.push("#0000FF")
    data.push(finalNewton)
    data.push(finalLagrange)
    for(var i=0;i<pointsX.length;i++){
        data.push(pointsY[i]+" for "+pointsX[i])
        colors.push("#000000")

    }
    graph=data;

    addGraphEvents(document.getElementsByTagName("canvas")[0])
    drawGraph(data,document.getElementsByTagName("canvas")[0])
    MathJax.Hub.Typeset()

}
function interpolationLast(){}
function interpolationLagrange(){

    var equationA=""
    var equationB =""
    var equationC=""
    var bottomC=""
    for(var i=0;i<pointsY.length;i++){
        var topA=""
        var topB=""
        var topC=""
        for(var j=0;j<pointsX.length;j++)if(i!=j){
            topC+="(x";
            topB+="(x";
            topA+="(x"+i+"-x"+j+")"
            if(pointsX[j]<0){
                topC+="+";
                topC+=Math.abs(pointsX[j])

                topB+="+";
                topB+=Math.abs(pointsX[j])

            }
            else if(pointsX[j]>0){
                topB+="-"
                topB+=pointsX[j]
                topC+="-"
                topC+=pointsX[j]
            }
            topB+=")"
            topC+=")"
            if(j+1<pointsX.length&&i+1<pointsY.length){
                topA+="*";
                topB+="*";
                topC+="*";
            }
            else if(j+1<pointsX.length&&j+2<pointsX.length){
                topA+="*";
                topB+="*";
                topC+="*";
            }
        }
        var bottomA="(x"+i+"-x"+j+")";
        var bottomB="";
        var bottomC=1;
        for(var j=0;j<pointsX.length;j++)if(i!=j){
            bottomC*=(pointsX[i]-pointsX[j])
            bottomB+="("+pointsX[i]+((pointsX[j]<0)?"+":"-")+Math.abs(pointsX[j])+")"
            if(j+1<pointsX.length&&i+1<pointsY.length){
                bottomA+="*";
                bottomB+="*";
            }
            else if(j+1<pointsX.length&&j+2<pointsX.length){
                bottomA+="*";
                bottomB+="*";
            }
        }
        bottomC=pointsY[i]/bottomC;

        equationC+=bottomC+"*("+topC+")"
        equationB+="("+topB+")/("+bottomB+")";
        equationA+="("+topA+")/("+bottomA+")";
        if(i+1<pointsY.length){
            if(bottomC<0)equationC+="+"
            equationB+="+"
            equationA+="+"
        }
    }
    console.log("DOSZLO")
    var shorted;
    if(pointsX.length>7)shorted=equationC
    else RPNtoExpression(reversePolishNotation(equationC))
    return [equationA,equationB,equationC,RPNtoExpression(reversePolishNotation(equationC))]


}
newtonInterpolations=[]
function newtonInterpolationTable(x,y){
    if(y.length==2){
        newtonInterpolations[2].push((y[1]-y[0])/(x[1]-x[0]))
        return (y[1]-y[0])/(x[1]-x[0])
    }

    else{
        var yleft=[]
        var xleft=[]
        var xright=[]
        var yright=[]
        for(var i=0;i<x.length-1;i++){
            xleft.push(x[i])
            yleft.push(y[i])
        }

        for(var i=1;i<x.length;i++){
            xright.push(x[i])
            yright.push(y[i])
        }
        var result=(newtonInterpolationTable(xright,yright)-newtonInterpolationTable(xleft,yleft))/(x[x.length-1]-x[0])
        newtonInterpolations[x.length].push(result)
        return result
    }
}
function interpolationNewton() {
    newtonInterpolations=[]
    var x=pointsX
    var y=pointsY
    for(var i=0;i<=x.length;i++)newtonInterpolations[i]=[]
    newtonInterpolationTable(x,y)
    var table=newtonInterpolations;
    var line=y[0]

        if(table[2][table[2].length-1]>=0)
            line+="+"
    else line+=""

    for(var i=2;i<table.length;i++){
     line+=(table[i][table[i].length-1])
        for(var j=0;j<i-1;j++){
         line+="*(x"
            if(x[j]<0)line+="+"+Math.abs(x[j])
            else line+="-"+Math.abs(x[j])
            line+=")"
        }
        if(i+1<table.length){
            if(table[i+1][table[i+1].length-1]>=0)
                line+="+"
        }
    }
    var shorted;
    if(pointsX.length>7)shorted=line
    else shorted=RPNtoExpression(reversePolishNotation(line))
    return [line,shorted,table]

}
//interpolationNewton([0,2,3,5,6],[0,8,27,125,216])
//console.log(newtonInterpolations)//z tego powyciągać wartości 0,1,1+2,1+2+4,..niew eim czemu sie tak pokuładały






