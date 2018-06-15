function createIntegrationInput(){
    var main=$("<div>",{class:"card white",id:"integrationInputMain"});
    var inputData=$("<div>",{class:"integrationInput"})
    var inputExample=$("<div>").text("`int_a^bf(x)dx`")
    var inputFunction=$("<div>",{id:"integrationInputFunctionView"})
        .append($("<div>"))
        .append(inputExample)
        .append("Podaj wzór funckji[f(x)]: ")
        .append($("<input>",{id:"integrationInputFunction",value:"x^3-2x+1"}))

    inputData
        .append($("<p>").append("Podaj zakres dolny[a]: "))
        .append($("<input>",{id:"integrationInputBottom",type:"number",value:0}))
        .append($("<p>").append("Podaj zakres górny[b]: "))
        .append($("<input>",{id:"integrationInputTop",type:"number",value:2}))



    var inputSize=$("<div>",{id:"integrationInputSizeView"}).append("Podaj rozmiar podstawy dolnej[dx]: ")
        .append($("<div>",{id:"integrationInputSizeValue"}).text(0.1))
            .append($("<p>",{class:"range-field"})
                .append($("<input>",{id:"integrationInputSize",type:"range",value:1,min:0,max:10,onclick:"changeInputSizeValue()"
                    ,onchange:"changeInputSizeValue()"}))
            )

    main.append(inputFunction)
        .append(inputData)
        .append(inputSize)
        .append($("<a>",{class:"waves-effect waves-light btn",onclick:"integrationCalculation()"}).text("Oblicz"))
    $(".main-grid-container").empty()
    $(".main-grid-container").append(createTitleCard("Całkowanie numeryczne"))
    $(".main-grid-container").append(main)
    MathJax.Hub.Typeset()


}
function createIntegrationOutput(func,down,top,size,data){
    var main=$("<div>",{class:"card",id:"integrationOutputView"})
    var title=$("<span>",{class:"card-title",id:"integrationTitle"}).text("Całkowanie numeryczne funkcji : `"+func+"` na przedziale `<"+down+","+top+">` z podziałem `"+size+"`")
    var rectView=$("<div>",{class:"interpolationOutputs"})
    var trapezeView=$("<div>",{class:"interpolationOutputs"})
    var simsonView=$("<div>",{class:"interpolationOutputs"})
    var rectEquation="`int _{"+down+"}^{"+top+"}f(x)dx approx sum_{i="+down+"}^{"+top+"} "+size+"*f(i+"+size+"/2)`"
    var trapEquation="`int _{"+down+"}^{"+top+"}f(x)dx approx "+size+"/2 sum _{i=1}^{"+top+"}(f(x_i)+f(x_{i+1}))`"
    var simsEquation="`int _{"+down+"}^{"+top+"}f(x)dx approx h/3 [f_{0}+4(f_{1}+f_{3}+...+f_{2n-1})+`</br>`2(f_{2}+f_{4}+...+f_{2n-2})+f_{2n}]`"

    /*METODA PROSTOKĄTOW*/
    rectView.append($("<div>")
        .append($("<h5>").text("Całkowanie metodą prostokątów"))
        .append($("<p>").text(rectEquation))

    )
        .append($("<p>").text("Prawdopodobnie najprostszym wzorem jest metoda punktu środkowego (midpoint rule)," +
            "Jeśli funkcja f(x) zmienia się w niewielkim stopniu na przedziale (x,x+dx), reguła taka da dobre przybliżenie całki."))
        .append("`int _{a}^{b}f(x)dx approx sum_{i=a}^{b} dx*f(i+dx/2)`")
        .append($("<p>").text("Wynik całkowania metodą prostokątów : "+data[0]))


    /*METODA TRAPEZÓW*/
    trapezeView.append($("<div>")
        .append($("<h5>").text("Całkowanie metodą trapezow"))
        .append($("<p>").text(trapEquation))

    )
        .append($("<p>").append( "Metoda trapezów polega na tym, że figurę ABCD zastępujemy figurą złożoną z trapezów wpisanych, " +
            "tzn. krzywą aproksymujemy linią łamaną w nią wpisaną. Przedział całkowania `(a,b)` dzielimy przy tym na" +
            " `n` równych części o długościach"))
        .append("`int _{a}^{b}f(x)dx =h/2 sum _{i=a}^{b}(f(x_i)+f(x_{i+1}))`")
        .append($("<p>").text("Wynik całkowania metodą trapezów : "+data[1]))


    /*METODA SIMSONA*/
    simsonView.append($("<div>")
        .append($("<h5>").text("Całkowanie metodą simsona"))
        .append($("<p>").append(simsEquation))

    )
        .append($("<p>").text( "Wymaga podzielenia przedziału całkowania na parzystą liczbę podprzedziałów" +
            "wykonując całkowanie wielomianu interpolacyjnego Lagrange'a z 3 kolejnych punktów otrzymujemy wzór Simpsona" +
            "`int _{x_{i}}^{x_{i+2}}f(x)dx approx h/3[f_{i}+4f_{i+1}+f_{i+2}]`" +
            "a dla całego przedziału otrzymujemy wzór podany niżej."
        ))
        .append("`int _{a}^{b}f(x)dx approx h/3 [f_{0}+4(f_{1}+f_{3}+...+f_{2n-1})`</br>`+2(f_{2}+f_{4}+...+f_{2n-2})+f_{2n}]`")
        .append($("<p>").text("Wynik całkowania metodą simsona : "+data[2]))




    main.append(title).append(rectView).append("<hr>").append(trapezeView).append("<hr>").append(simsonView)


    $(".main-grid-container").append(main)
    MathJax.Hub.Typeset()

}
/**MATERIAL DESIGN*/
