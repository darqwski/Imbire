function createCalculatorView(){
    graph=[]
    var inputDiv=$("<div>",{id:"inputDiv"});
        var inputInput=$("<input>",{id:"expressionInput",placeholder:"x^3-2x^2+1 for (-1,2)",type:"search",class:"white"})
        var inputCalculate=$("<a>",{id:"expressionEvalButton",class:"waves-effect waves-light btn"}).text("Oblicz")
        var inputTable=createCalculatorInputTable()
        var inputFunctions=$("<div>",{id:"functionList"})
    inputDiv
        .append(inputInput)
        .append(inputCalculate)
        .append(inputTable)
        .append(inputFunctions)

    var boarderDiv=$("<div>",{id:"boarderDiv"})
    var boarderTitle=$("<h2>",{class:"header center-align"}).text("Wykres")
    var canv=$("<canvas>",{width:canvasWidth,height:canvasHeight})
    var boardDiv=$("<div>",{id:"boardDiv"})
    var navigatorTable=createCalculatorNavigatorTable()

    boarderDiv
        .append(boarderTitle)
        .append(canv)
        .append(boardDiv)
        .append(navigatorTable)

    var calculationDiv=$("<div>",{id:"calculations"})

    $(".main-grid-container").empty();
    $(".main-grid-container").append(createTitleCard("Kalkulator analityczny"))
    $(".main-grid-container").append(inputDiv).append(boarderDiv).append(calculationDiv)
}
function createCalculatorInputTable() {
    var inputTable=$("<table>",{id:"addOperotorsTable"})
    var inputTableValue=[1,2,3,'+',4,5,6,'-',7,8,9,'*',0,'x','sqrt','/','(',')','^','log','sin','cos','tg','ctg','asin','acos','atg','actg','ln','!','e','π']
    inputTable.append($("<tr>").append($("<th>",{colspan:"4",class:"center hide-on-med-and-down"}).text("Wprowadzenie funkcji")))
    var  row=$("<tr>")
    for(var i=0;i<inputTableValue.length;i++){
        if(i%4==0&&i!=0){
            inputTable.append(row)
            row=$("<tr>")
        }
        row.append($("<td>",{}).append($("<a>",{class:"waves-effect waves-light btn",onclick:"addOperator(this)"}).text(inputTableValue[i])))
    }
    inputTable.append(row)
    return inputTable
}
function createCalculatorNavigatorTable(){
    var values=["PRZYBLIŻ","GÓRA","ODDAL"," LEWO   ","WRÓC","PRAWO","CZYŚC","DÓŁ"]
    var  row=$("<tr>")
    var inputTable=$("<table>",{id:"graphNavigatorTable"})
    for(var i=0;i<values.length;i++){
        if(i%3==0&&i!=0){
            inputTable.append(row)
            row=$("<tr>")
        }
        row.append($("<td>").append($("<a>",{class:"waves-effect waves-light btn graphNavigator"}).text(values[i])))
    }
    inputTable.append(row)

    /* inputTable.append($("<tr>").append($("<td>",{colspan:"3"})
         .append($("<a>",{class:"waves-effect waves-light btn",onclick:findPoints()}).text("Szukaj miejsca wspólnego"))))*/
   return inputTable
}