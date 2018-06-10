pointsX=[];
pointsY=[];
function addInterpolationPoint(){
    var newX=$("#interpolationInputX").val();
    var newY=$("#interpolationInputY").val();

    if(!validInterpolationPoints(newX,newY)){
    }
    else{
        pointsX.push($("#interpolationInputX").val());
        pointsY.push($("#interpolationInputY").val());
    }


   interpolationRefreshPoints()


}
function interpolationRefreshPoints(){
    sortPointsXY();

    $("#interpolationUlPoints").empty();
    for(var j=0;j<pointsX.length;j++){
        $("#interpolationUlPoints").append($("<li>")
            .append("`x_"+j+"=["+pointsX[j]+","+pointsY[j]+"]`")
            .append($("<i>",{class:"material-icons",onclick:"interpolationDeletePoint(this.parentNode)"}).text("close"))

        )
    }
    $("#interpolationInputY").val("")
    $("#interpolationInputX").val("")
    MathJax.Hub.Typeset()
}
function interpolationDeletePoint(li) {
   for(var i=0;i<$("#interpolationUlPoints")[0].childNodes.length;i++)
        if($("#interpolationUlPoints")[0].childNodes[i]===li){
            $("#interpolationUlPoints").empty();
            var deleted=0;
        for(var j=0;j<pointsY.length;j++){
            if(j!=i){
                $("#interpolationUlPoints").append($("<li>")
                    .append("`x_"+j+"=["+pointsX[j+deleted]+","+pointsY[j+deleted]+"]`")
                    .append($("<i>",{class:"material-icons",onclick:"interpolationDeletePoint(this.parentNode)"}).text("close"))

                )
            }
            else deleted=1;
        }
            pointsY[i]="";
            pointsX[i]="";
            pointsY=pointsY.join('').split('');
            pointsX=pointsX.join('').split('');

        }
    MathJax.Hub.Typeset()

}

function sortPointsXY(){
    var list = [];
    for (var j = 0; j < pointsX.length; j++)
        list.push({'X': pointsX[j], 'Y': pointsY[j]});

//2) sort:
    list.sort(function(a, b) {
        return ((a.X < b.X) ? -1 : ((a.X == b.X) ? 0 : 1));
    });

//3) separate them back out:
    for (var k = 0; k < list.length; k++) {
        pointsX[k] = list[k].X;
        pointsY[k] = list[k].Y;
    }
}
function validInterpolationPoints(newXpoint,newYpoint){

console.log(newYpoint)
if(newXpoint==""||newYpoint==""){
    var instance = M.Modal.getInstance($("#modalWrongPoints"));
    instance.open();
    return false;
}
    for(var i=0;i<pointsX.length;i++)if(newXpoint==pointsX[i]){
        $("#modalRepeatPointsError").html("Próbujesz ponownie podać dla punktu ["+pointsX[i]+","+pointsY[i]+"]</br>" +
            "Czy chcesz ustanowić nową wartość?")
        $("#modalNewPointI").val(i)
        $("#modalNewPointY").val(newYpoint)
        var instance = M.Modal.getInstance($("#modalRepeatPoints"));
        instance.open();

        return false;
    }
        return true
}
function modalChangePointY() {
    var i=$("#modalNewPointI").val()
    var y=$("#modalNewPointY").val()
    pointsY[i]=y
    interpolationRefreshPoints()
}