
function createInterpolationInput(){
    var main=$("<div>",{class:"card white"});
    var inputPoints=$("<div>",{class:"interpolationInputPoints valign-wrapper"})
    var pointsView=$("<div>",{class:"interpolationPointsView"})
    let pointsCanvas=$("<canvas>")
    inputPoints
        .append($("<p>").append("X: "))
        .append($("<input>",{class:"",id:"interpolationInputX",type:"number"}))
        .append($("<p>").append("Y: "))
        .append($("<input>",{id:"interpolationInputY",type:"number"}))
        .append($("<a>",{class:"waves-effect waves-light btn",onclick:"addInterpolationPoint()"}).text("Dodaj punkt"))
    var pointsList=$("<div>")
        .append($("<ul>",{id:"interpolationUlPoints"}))
        .append($("<a>",{class:"waves-effect waves-light btn ",onclick:"interpolationCalculations()"}).text("Oblicz"))

    pointsView.append(pointsList)
    main.append(inputPoints).append(pointsView)
    $(".main-grid-container").empty()
    $(".main-grid-container").append(createTitleCard("Interpolacja Lagrange'a i Newtona"))
    $(".main-grid-container").append(main)

}
function createLagrangeView(data) {

    var main=$("<div>",{class:"card-panel white",id:"lagrangeView"})
        .append($("<h4>",{class:"interpolationTitle"}).text("Wielomian interpolacyjny Lagrange'a"))
    var content=$("<div>",{class:"interpolationContent"})
    var divPoints=$("<div>")
    var divInformations=$("<div>").text("Interpolacja wielomianowa, nazywana też interpolacją Lagrange'a, " +
        "od nazwiska pioniera badań nad interpolacją Josepha Lagrange'a, lub po prostu interpolacją jest " +
        "metodą numeryczną przybliżania funkcji tzw. wielomianem Lagrange'a stopnia `n`" +
        " przyjmującym w`n+1` punktach, zwanych węzłami interpolacji, wartości takie same " +
        "jak przybliżana funkcja.Interpolacja jest często stosowana w naukach doświadczalnych, gdzie " +
        "dysponuje się zazwyczaj skończoną liczbą danych do określenia zależności między wielkościami.\n" +
        "Zgodnie z twierdzeniem Weierstrassa dowolną funkcję `y=f(x)`, ciągłą na " +
        "przedziale domkniętym, można dowolnie przybliżyć za pomocą wielomianu odpowiednio wysokiego stopnia.")
    var divEquations=$("<div>")
    var divAnaliticalEquation=$("<div>").append("`L_i(x_k)=prod_{j = 0 and j ne i}^n (x_k-x_j)/(x_i-x_j) =`</br>`((x_k-x_0)*(x_k-x_1)*" +
        "\cdots \cdot(x_k-x_{k-1 })cdot(x_k-x_{k+1 }) \cdots \cdot(x_k-x_n)) /{(x_i-x_0)\cdot (x_i-x_1)\cdot \cdots \cdot(x_i-x_{i-1 })" +
        "\cdot (x_i-x_{i+1 })\cdot \cdots \cdot(x_i-x_n) } `")
var xLine="",yLine=""
for(var i=0;i<pointsX.length;i++){
        xLine+="x"+i+" = "+pointsX[i]
        yLine+="y"+i+" = "+pointsY[i]
    if(i+1<pointsX.length){
            xLine+=",";
            yLine+=","
    }
}
    xLine="Dane punktów `X : "+xLine+"`"
    yLine="Dane punktów `Y : "+yLine+"`"
    divPoints.append($("<p>").text(xLine))
    divPoints.append($("<p>").text(yLine))

    divEquations.append($("<p>").text("Krok 1:  `W(x)="+data[0]+"`"))
    divEquations.append($("<p>").text("Krok 2:  `W(x)="+data[1]+"`"))
    divEquations.append($("<p>").text("Krok 3:  `W(x)="+data[2]+"`"))
    divEquations.append($("<p>").text("Krok 4:  `W(x)="+data[3]+"`"))
    divEquations.append($("<p>").text("Wielomian interpolujący Lagranga :  `"+data[3]+"`"))


    content.append(divPoints)
        .append(divInformations)
        .append(divEquations)
        .append(divAnaliticalEquation)



    $(".main-grid-container").append(main.append(content))
    return data[3]
}
function createNewtonView(data) {

    var main=$("<div>",{class:"card-panel white",id:"newtonView"})
        .append($("<h4>",{class:"interpolationTitle"}).text("Wielomian interpolacyjny Newtona"))
    var content=$("<div>",{class:"interpolationContent"})

    var divPoints=$("<div>")
    var divInformations=$("<div>").text("Interpolacja Newtona jest kolejną metodą interpolacji wielomianowej. Aby móc używać\n" +
        "metody Newtona konieczne jest zrozumienie czym jest iloraz różnicowy.\n" +
        "Zakładamy, że funkcja f(x) dana jest za pomocą tablicy wartości: x0, x1, ...,xn(węzłów\n" +
        "interpolacji) oraz wartości funkcji w tych punktach: f(x0), f(x1), ..., f(xn). Przyjmujemy także, iż węzły\n" +
        "nie są równoodległe. Ilorazami różnicowymi pierwszego rzędu nazywamy wyrażenia `f(x0;x1)=(f(x1)-f(x0))/(x1-x0)`\n")
    var divEquations=$("<div>")
    var divAnaliticalEquation=$("<div>").append("`W_n(x)= sum_{k=0}^{n} b_k(x-x_0)*(x*x_1)...(x-x_{k-2})`</br> " +
        "GDZIE :`p_0(x)=1, b_0=f(x_0)`</br>" +
        "`b_k=sum_{i=0}^{k}f(x_i)/(prod_{j=0 AND j ne i}^{k}(x_i-x_j))`")
    var xLine="",yLine=""
    for(var i=0;i<pointsX.length;i++){
        xLine+="x"+i+" = "+pointsX[i]
        yLine+="y"+i+" = "+pointsY[i]
        if(i+1<pointsX.length){
            xLine+=",";
            yLine+=","
        }
    }
    xLine="Dane punktów `X : "+xLine+"`"
    yLine="Dane punktów `Y : "+yLine+"`"
    divPoints.append($("<p>").text(xLine))
    divPoints.append($("<p>").text(yLine))

    divEquations.append( createNewtonTable(data[2]))
    divEquations.append($("<p>").text("Wielomian interpolujący Newtona :  `"+data[0]+"`"))
    divEquations.append($("<p>").text("Wielomian interpolujący Newtona :  `"+data[1]+"`"))


    content.append(divPoints)
        .append(divInformations)
        .append(divEquations)
        .append(divAnaliticalEquation)



    $(".main-grid-container").append(main.append(content))
    return data[1]
}
function createNewtonTable(table){
    console.log(table)
    var columnsNumber=table.length-1+1
                /**table.length - 2 emptys +1 y +1 x*/


   var grid=" display:grid;grid-template-columns:"
    for(var i=0;i<columnsNumber;i++)grid+=" auto";
   grid+=";"
   var tableView= $("<div>",{style:grid,class:"valign-wrapper"})
    var header=$("<div>",{style:grid})
    header.append($("<div>").text("x"))
    header.append($("<div>").text("y"))

    grid=" display:grid;grid-template-rows:"
    for(var i=0;i<pointsX.length;i++)grid+=" auto";
   grid+=";border-right:1px solid #AAA;"
    var xDiv=$("<div>",{style:grid,class:"valign-wrapper"})
    for(var i=0;i<pointsX.length;i++)xDiv.append($("<p>").text(pointsX[i]))
    var yDiv=$("<div>",{style:grid,class:"valign-wrapper"})
    for(var i=0;i<pointsY.length;i++)yDiv.append($("<p>").text(pointsY[i]))

    tableView.append(xDiv).append(yDiv)
    for(var i=2;i<columnsNumber;i++){
        header.append($("<div>").text("f"+(i-1)))

        grid=" display:grid;grid-template-rows:"
        for(var j=0;j<table[i];j++)grid+=" auto";
        grid+=";"
        if(i+1<columnsNumber)grid+="border-right:1px solid #AAA;"
            var tempDiv=$("<div>",{style:grid,class:"valign-wrapper"})
        for(var j=0;j<table[i].length;j++)tempDiv.append($("<p>").text(table[i][j]))
        tableView.append(tempDiv)

    }
    var main=$("<div>")
    return main.append(header).append(tableView)

}