 var matrixPanelClass="card-panel white";
function createMatrixView(){

    var main=$("<div>",{class:""});
    var inputDiv=createMatrixSize();
    var resultsDiv= $("<div>",{class:""});
    main.append(inputDiv).append(resultsDiv);
    $(".main-grid-container").text("");
    $(".main-grid-container").append(createTitleCard("Macierze i układy równań"))
    $(".main-grid-container").append(main)
 }
 function createMatrixInput(size){
    var sizes=size.split("x");
    var table=$("<table>");

     /*
     INPUTS
      */
    for(var i=0;i<sizes[0];i++){
        var tr=$("<tr>",{class:"matrix-tr"});
        for(var j=0;j<sizes[1];j++)
            tr.append($("<td>").append($("<input>",{class:"matrix-input",type:"number",val:Math.floor(Math.random()*11)})))
        table.append(tr)
    }
    /*
    OBLICZ BUTTON
     */
     var tr=$("<tr>");
     tr.append($("<td>",{colspan:sizes[1]}).append($("<a>",{class:"waves-effect waves-light "+firstColor+" btn matrix-size",onclick:"matrixCalculate()"}).text("Oblicz")));
     table.append(tr);
     var div=$("<div>",{class:matrixPanelClass}).append(table);
    var panel=$(".card-panel")
     for(var i=1;i<panel.length;i++)panel[i].remove();
     div.insertAfter($("#matrixSize"))



 }
 function createMatrixSize(){
    var div=$("<div>",{id:"matrixSize",class:matrixPanelClass});
        div
            .append($("<a>",{class:"waves-effect waves-light "+firstColor+" btn matrix-size"}).text("2x2"))
            .append($("<a>",{class:"waves-effect waves-light "+firstColor+" btn matrix-size"}).text("2x3"))
            .append($("<a>",{class:"waves-effect waves-light "+firstColor+" btn matrix-size"}).text("3x3"))
            .append($("<a>",{class:"waves-effect waves-light "+firstColor+" btn matrix-size"}).text("3x4"))
            .append($("<a>",{class:"waves-effect waves-light "+firstColor+" btn matrix-size"}).text("4x4"))
            .append($("<a>",{class:"waves-effect waves-light "+firstColor+" btn matrix-size"}).text("4x5"))

            .append($("<a>",{class:"waves-effect waves-light "+firstColor+" btn matrix-size"}).text("5x5"))
            .append($("<a>",{class:"waves-effect waves-light "+firstColor+" btn matrix-size"}).text("5x6"))
            .append($("<a>",{class:"waves-effect waves-light "+firstColor+" btn matrix-size"}).text("6x6"))
            .append($("<a>",{class:"waves-effect waves-light "+firstColor+" btn matrix-size"}).text("6x7"))
            .append($("<a>",{class:"waves-effect waves-light "+firstColor+" btn matrix-size"}).text("7x7"))
            .append($("<a>",{class:"waves-effect waves-light "+firstColor+" btn matrix-size"}).text("7x8"))

            .append($("<a>",{class:"waves-effect waves-light "+firstColor+" btn matrix-size"}).text("8x8"))
            .append($("<a>",{class:"waves-effect waves-light "+firstColor+" btn matrix-size"}).text("8x9"))
            .append($("<a>",{class:"waves-effect waves-light "+firstColor+" btn matrix-size"}).text("9x9"))
            .append($("<a>",{class:"waves-effect waves-light "+firstColor+" btn matrix-size"}).text("9x10"))
            .append($("<a>",{class:"waves-effect waves-light "+firstColor+" btn matrix-size"}).text("10x10"))
            .append($("<a>",{class:"waves-effect waves-light "+firstColor+" btn matrix-size"}).text("10x11"));





     return div;
 }
 function createTableFromArray(array,headers,className){
     var table=$("<table>",{class:className});
     var header=$("<tr>");
     for(var i=0;i<headers.length;i++)header.append($("<th>").text(headers[i]))
     var tbody=$("<tbody>");
     for(var i=0;i<array.length;i++){
         var tr=$("<tr>",{class:"matrix-tr"});
         for(var j=0;j<array[0].length;j++)
             tr.append($("<td>").text(array[i][j]))
         tbody.append(tr)
     }
     table.append(header,tbody);
     return table;
 }
 function createTableFromArrayColorColumn(array,headers,colorMain,colorSpecial,number){
     var table=$("<table>");
     var thead=$("<thead>");
     var header=$("<tr>");
     var tbody=$("<tbody>");
     for(var i=0;i<headers.length;i++)header.append($("<th>").text(headers[i]))
     thead.append(header);

     for(var i=0;i<array.length;i++){
         var tr=$("<tr>",{class:"matrix-tr"});
         for(var j=0;j<array[0].length;j++){
           if(j!=number)  tr.append($("<td>",{class:colorMain}).text(array[i][j]));
           else  tr.append($("<td>",{class:colorSpecial}).text(array[i][j]))
         }

         tbody.append(tr)
     }
     table.append(thead,tbody);
     return table;
 }

 function createMatrixResultsCramer(matrix,work,res,matrixes,mainDet,dets){
    try{
        var CramerDescription="Za pomocą metody Cramera możliwe jest obliczanie niewiadomych w równaniach, które tworzą macierz \n" +
            "kwadratową. Obliczamy główny wyznacznik macierzy oraz poszczególne wyznaczniki niewiadomych, \n" +
            "podstawiając pod kolumnę wartości niewiadomej kolumnę wyrazów wolnych. Aby obliczyć poszczególne \n" +
            "niewiadome należy podzielić wyznacznik niewiadomej przez główny wyznacznik macierzy.<a href='https://pl.wikipedia.org/wiki/Wzory_Cramera'>Metoda Cramera - Wikipedia</a>";
        var mainDiv=$("<div>",{class:matrixPanelClass});
        var firsRow=$("<div>",{class:"first-row"});
        var descrtiptionDiv=$("<div>").append(CramerDescription);
        var row=$("<div>",{class:"double-row"});
        var lastRow=$("<div>",{class:"last-row"});
        var headerCramer,headerMatrixes,headerResults;

            //<span class="card-title">Card Title</span>
        headerCramer=$("<h4>",{class:"card-title"}).text("Metoda Cramera");
        headerMatrixes=$("<h4>",{class:"card-title"}).text("Poszczególne Macierze");
        headerResults=$("<h4>",{class:"card-title"}).text("Wyniki");
        /*
        First row is Matrix and description,
         */
        mainDiv.append(headerCramer);
        firsRow.append(createTableFromArray(matrix, getMatrixThead(matrix[0].length,matrix[0].length-1))).append(descrtiptionDiv);
        mainDiv.append(firsRow);
        if(mainDet==0){

            mainDiv.append($("<p>").text("Wyznacznik główny macierzy wynosi 0,`det(X)=0` niemożliwe jest wyliczenie macierzy"));
            $(".main-grid-container").append(mainDiv);
            MathJax.Hub.Typeset();
            return mainDiv
        }


        /*
               NExt rows containes matrixes and their determinants
        */

        mainDiv.append(headerMatrixes);
        for(var i=0;i<matrixes.length;i++){
            console.log("TABLE "+i);
            var table=createTableFromArrayColorColumn(matrixes[i],getMatrixThead(matrixes[0].length,i-1),'grey lighten-2','grey darken-2',i-1);
            row.append(table);
            if(i!=0)row.append($("<div>",{class:"valign-wrapper"}).text("`det(x"+i+")="+dets[i-1]+"`"));
            else row.append($("<div>",{class:"valign-wrapper"}).text("`det(X)="+mainDet+"`"));
            if(i%2==1){
                mainDiv.append(row);
                row=$("<div>",{class:"double-row"})
            }
        }
        if(matrixes.length%2==1)mainDiv.append(row);
        /*
               Last row containst results
         */
        mainDiv.append(headerResults);

        for(var i=0;i<dets.length;i++){
            var smallDiv=$("<div>").text("`x"+(i+1)+"=det(x"+(i+1)+")/det(X)"+"="+dets[i]+"/"+mainDet+"="+(dets[i]/mainDet).toFixed(3)+"`");
            lastRow.append(smallDiv)

        }
        mainDiv.append(lastRow);


        $(".main-grid-container").append(mainDiv);
        MathJax.Hub.Typeset()

    }catch (e) {

    }

 }
 function createMatrixResultsLU(matrix,steps,results){

    var LUDescription="Metoda LU (ang. lower - dolny, upper górny) – metoda rozwiązywania układu równań liniowych. Nazwa pochodzi od użytych w tej " +
        "metodzie macierzy trójkątnych tj. dolnotrójkątnej (dolnej) i górnotrójkątnej (górnej). Metoda pozwala także na szybkie wyliczenie wyznacznika " +
        "macierzy układu.Podstawowym problemem numerycznym w tej metodzie jest dokonanie rozkładu LU macierzy współczynników. Żeby ten rozkład macierzy " +
        "był jednoznaczny zakłada się, że elementy na głównej przekątnej jednej z macierzy, " +
        "`mathbf {L}` albo `mathbf {U}`, są równe 1. Rozkład LU jest wyznaczany za pomocą metody Doolittle’a .\n";
       var mainDiv=$("<div>",{class:matrixPanelClass});
     var firsRow=$("<div>",{class:"first-row"});
     var descrtiptionDiv=$("<div>").append(LUDescription);
     var row=$("<div>",{class:"double-row"});
     var lastRow=$("<div>",{class:"last-row"});
     var headerLU,headerMatrixes,headerResults;

     headerLU=$("<h4>",{class:"card-title"}).text("Metoda LU");
     headerMatrixes=$("<h4>",{class:"card-title"}).text("Etapy wyliczania macierzy LU");
     headerResults=$("<h4>",{class:"card-title"}).text("Wyniki");

     mainDiv.append(headerLU);
     firsRow.append(createTableFromArray(matrix, getMatrixThead(matrix[0].length,matrix[0].length-1))).append(descrtiptionDiv);
     mainDiv.append(firsRow);

     mainDiv.append(headerMatrixes);
     for(var i=0;i<steps.length;i++){
         var table=createTableFromArrayColorColumn(steps[i],getMatrixThead(steps[0].length,steps[0].length),'grey lighten-2','grey lighten-2',i-1);
         row.append(table);
         if(i+1<steps.length)row.append($("<div>",{class:"valign-wrapper"}).text("`===>`"));

         if(i%2==1){
             mainDiv.append(row);
             row=$("<div>",{class:"double-row"})
         }
     }
     if(steps.length%2==1)mainDiv.append(row);

     mainDiv.append(headerResults);
     for(var i=0;i<results.length;i++){
         var smallDiv=$("<div>").text("`x"+i+"="+results[i]+"`");
         lastRow.append(smallDiv)

     }
     mainDiv.append(lastRow);
     $(".main-grid-container").append(mainDiv);
     MathJax.Hub.Typeset()



 }
 function createMatrixResultsSquare(matrix,transp,det,complement,inverse){
     var mainDiv=$("<div>",{class:matrixPanelClass});
     var row=$("<div>",{class:"first-row"});
     var determinantDesc,transposeDesc,complexDesc,reverseDesc;
     determinantDesc="Wyznaczniki możemy obliczać dla macierzy kwadratowych dowolnego wymiaru. Mamy daną taką macierz:\n" +
         "Wyznacznik ten macierzy, metodą Laplace'a obliczamy za pomocą wzoru rekurencyjnego. Sprowadza się to do obliczania " +
         "wyznaczników coraz niższych rzędów.\n"

     transposeDesc="Macierz transponowana (przestawiona) macierzy `A`  to macierz`A^{T}` ," +
         " która powstaje z danej poprzez zamianę jej wierszy na kolumny i kolumn na wiersze." +
         " Operację tworzenia macierzy transponowanej nazywamy transpozycją (przestawianiem).\n" +
            "Dla macierzy displaystyle `A=(a_{ij})`:\n" +
            "`A^{T}=(a_{ij})^{T}=(a_{ji})`." +
            "Albo ściślej. Oznaczamy przez `A_{ij` element macierzy `A` znajdujący się na przecięciu `i`-tego wiersza i `j`-tej kolumny."

     complexDesc="Dopełnienie algebraiczne – dopełnienie algebraiczne elementu `a_{{ij}` danej macierzy kwadratowej `A stopnia` `n` " +
         "jest to iloczyn `(-1)^{i+j}` oraz minora `M_{ij}` czyli" +
         " wyznacznika podmacierzy stopnia `n-1` powstałego z usunięcia `i`-tego wiersza oraz `j`-ej kolumny macierzy `A`.\n" +
        "Dopełnienie algebraiczne elementu `a_{{ij}` macierzy `A` oznacza się często symbolem `A_{ij}`."

     reverseDesc="Niech `A` będzie macierzą kwadratową ustalonego stopnia. Macierz `A` jest odwracalna," +
         " jeśli istnieje taka macierz`B`, że zachodzi `AB=BA=I`,gdzie `I` jest macierzą jednostkową. " +
         "Macierz `B` nazywa się wówczas macierzą odwrotną do macierzy `A` i oznacza się przez `A^{-1}`." +
         "Jeżeli taka macierz `B` nie istnieje, to macierz `A` nazywamy nieodwracalną,\n" +
         "Macierze kwadratowe ustalonego stopnia tworzą pierścień (łączny, nieprzemienny z jedynką), powyższe definicje określają" +
         " więc element odwracalny oraz odwrotny do danego w tym pierścieniu. Należy pamiętać, że jeżeli w pierścieniu łącznym " +
         "element odwrotny do danego istnieje, to jest wyznaczony jednoznacznie." +
         "Macierz odwrotną do nieosobliwej macierzy`A` obliczamy następująco:\n" +
         "`A^{-1}=A^{D^{T}}/detA`"

     row.append(createTableFromArray(matrix,getMatrixThead(matrix.length,matrix.length,"striped highlight")));
     row.append($("<div>").text(determinantDesc));
        mainDiv.append($( "<h4>",{class:"center"}).text("Obliczanie wyznacznika macierzy"))
     mainDiv.append(row);
        mainDiv.append($("<hr>"))

     row=$("<div>",{class:"first-row"});
     row.append(createTableFromArray(transp,getMatrixThead(matrix.length,matrix.length,"striped highlight")));
     row.append($("<div>").text(transposeDesc));
     mainDiv.append($( "<h4>",{class:"center"}).text("Obliczanie macierzy transponowanej"))
     mainDiv.append(row);
     mainDiv.append($("<hr>"))

     row=$("<div>",{class:"first-row"});
     row.append(createTableFromArray(complement,getMatrixThead(matrix.length,matrix.length,"striped highlight")));
     row.append($("<div>").text(complexDesc));
     mainDiv.append($( "<h4>",{class:"center"}).text("Obliczanie macierzy dopełnień"))
     mainDiv.append(row);
     mainDiv.append($("<hr>"))

     row=$("<div>",{class:"first-row"});
     row.append(createTableFromArray(inverse,getMatrixThead(matrix.length,matrix.length,"striped highlight")));
     row.append($("<div>").text(reverseDesc));
     mainDiv.append($( "<h4>",{class:"center"}).text("Obliczanie macierzy odwrotnej"))
     mainDiv.append(row);


     $(".main-grid-container").append(mainDiv);
     MathJax.Hub.Typeset()



 }

 function getMatrixThead(length,number){
    var ret=[];
    for(var i=0;i<length;i++){
        if(i!=number)ret.push("x"+(i+1));
        else ret.push("y")
    }
    console.log(ret);
    return ret
 }




















