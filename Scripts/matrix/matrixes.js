function matrixCalculate() {
    /*
    DET A
    Macierz odwrotna
    */
    var matrix=getMatrix();

    if(matrix.length==matrix[0].length){
        squareMatrix(matrix)
    }
    else{

        cramerMatrix(matrix)
        LUMatrix(matrix)

    }

    /*
    if wynikowa, then rozwiazanie

     */

}

function getMatrix() {

    var inputs=document.getElementsByClassName("matrix-input")
    var tr=$(".matrix-tr")
    var matrix=[]

    for(var i=0;i<tr.length;i++){
        matrix[i]=[]
        for(var j=0;j<inputs.length/tr.length;j++){
            matrix[i].push(inputs[(inputs.length/tr.length)*i+j].value)
        }
    }
    return matrix;
}
function determineMatrix(matrix){
if(matrix.length==1)return matrix[0][0]
if(matrix.length==2)return matrix[0][0]*matrix[1][1]-matrix[1][0]*matrix[0][1]
    if(matrix.length==3){
    var left=matrix[0][0]*matrix[1][1]*matrix[2][2]+matrix[1][0]*matrix[2][1]*matrix[0][2]+matrix[2][0]*matrix[0][1]*matrix[1][2];

    var right=matrix[0][2]*matrix[1][1]*matrix[2][0]+matrix[1][2]*matrix[2][1]*matrix[0][0]+matrix[2][2]*matrix[0][1]*matrix[1][0];
    return left-right
    }

    /*
    For 4 and more
     cut second row
     */
    var determin=0;
    for(var i=0;i<matrix.length;i++){
       if((2+i)%2==0) determin+=determineMatrix(getComplement(matrix,2,i))*matrix[2][i]
        else determin-=determineMatrix(getComplement(matrix,2,i))*matrix[2][i]
    }
    return determin

}
function getComplement(matrix, row,col) {
        var newMatrix=[]
    var minusRow=false;
    for(var i=0;i<matrix.length;i++){
            if(i==row){
                minusRow=true
                continue
            }
            newMatrix[i-minusRow]=[]
        var minusCol=false;
        for(var j=0;j<matrix[0].length;j++){
            if(j==col){
                minusCol=true
                continue
            }
            newMatrix[i-minusRow][j-minusCol]=matrix[i][j]

        }
    }
    return newMatrix
}
function inverseMatrix(matrix){
    var determine=determineMatrix(matrix)
    if(determine==0)
        return "Wyznacznik macierzy jest równy 0, macierzy nie można odwrócic";

    var mD=matrixOfComplements(matrix)
    console.log("Macierze dopełnień",mD)
    var mDT=transposeTable(mD)
    console.log("Macierze Transpose",mDT)
    var AmDT=multipleMatrix(mDT,1/determine)
    console.log("Macierz odwrotna",AmDT)
    return AmDT

}
function matrixOfComplements(matrix) {
    var matrixComplements=[]
    for(var i=0;i<matrix.length;i++) {
        matrixComplements[i] = []
        for (var j = 0; j < matrix[0].length; j++)
            matrixComplements[i][j] = determineMatrix(getComplement(matrix, i, j));
    }
    return matrixComplements
}
function transposeTable(table){
    var transposeTable=[];
    for(var i=0;i<table.length;i++) {
        transposeTable[i] = []
        for (var j = 0; j < table[0].length; j++)
            transposeTable[i][j] = table[j][i];
    }
    return transposeTable;
}
function multipleMatrix(matrix,multipler){
    for(var i=0;i<matrix.length;i++)
        for (var j = 0; j < matrix[0].length; j++)
            matrix[i][j] = (matrix[i][j]*multipler).toFixed(5)
    return matrix

}
function getMatrixColumn(matrix, col){
var column=[];
for(var i=0;i<matrix.length;i++)
    column.push(matrix[i][col])
    return column
}
function getMatrixRow(matrix, row){

    return matrix[row];

}
function changeColumn(matrix, column,number){
    for(var i=0;i<matrix.length;i++){
        matrix[i][number]=column[i]
    }
    return matrix;
}
function cramerMatrix(matrix){
    let workMatrix=[];
    /*
    CUTTING MATRIXES
     */
    for(let i=0;i<matrix[0].length-1;i++)
        workMatrix[i]=getMatrixColumn(matrix,i)
    workMatrix=transposeTable(workMatrix)
    var resultsCol=getMatrixColumn(matrix,matrix[0].length-1)

    /*
    GET DETERMINANTS
     */
    var mainDet=determineMatrix(workMatrix);
    var dets=[]
    var matrixes=[];
    matrixes.push(JSON.parse(JSON.stringify(workMatrix)))
    for(var i=0;i<workMatrix.length;i++){
        var tempMatrix=JSON.parse(JSON.stringify(workMatrix));
        tempMatrix= changeColumn(tempMatrix,resultsCol,i);
        matrixes.push(JSON.parse(JSON.stringify(tempMatrix)))
        dets.push(determineMatrix(tempMatrix));

    }



    /*
    CREATING CALCULATION CARD in matrixView.js
     */
    createMatrixResultsCramer(matrix,workMatrix,resultsCol,matrixes,mainDet,dets);
}
function squareMatrix(matrix) {
    createMatrixResultsSquare(matrix,transposeTable(matrix),determineMatrix(matrix),getComplement(matrix),inverseMatrix(matrix))


}



























