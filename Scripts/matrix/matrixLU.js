function LUMatrix(matrix){
    let workMatrix=[];
    for(let i=0;i<matrix[0].length-1;i++)
        workMatrix[i]=getMatrixColumn(matrix,i)
    workMatrix=transposeTable(workMatrix)
    var resultsCol=getMatrixColumn(matrix,matrix[0].length-1)
    var resolve=[]
    console.log(JSON.parse(JSON.stringify(workMatrix)))

    /**
     * LU CUTTING
     */
    var i,j,k,s;
    var steps=[]
    for(j = 0; j < workMatrix.length; j++){
        if(workMatrix[j][j] == 0)break
        for(i = 0; i <= j; i++) {
            s = 0;
            for(k = 0; k < i; k++) s +=  workMatrix[i][k] *workMatrix[k][j];
            workMatrix[i][j] -= s;
        }
        for(i = j + 1; i < workMatrix.length; i++) {
            s = 0;
            for(k = 0; k < j; k++) s += workMatrix[i][k] * workMatrix[k][j];
            workMatrix[i][j] = (workMatrix[i][j] - s) / workMatrix[j][j];
            workMatrix[i][j]= workMatrix[i][j].toFixed(5)
        }
        steps.push(JSON.parse(JSON.stringify(workMatrix)))
    }

    /*
    LU CALCULATIONS
     */
    resolve[0]=resultsCol[0];
    for(i = 1; i < workMatrix.length; i++) {
        resolve[i]=0
        s = 0;
        for(j = 0; j < i; j++) s += workMatrix[i][j] *  resolve[j];
        resolve[i] = resultsCol[i] - s;
    }

    //if(workMatrix[j][j] == 0)break
    resolve[workMatrix.length-1] /=workMatrix[workMatrix.length-1][workMatrix.length-1];
    for(i = workMatrix.length - 2; i >= 0; i--)
    {
        s = 0;
        for(j = i + 1; j < workMatrix.length; j++) s += workMatrix[i][j] * resolve[j];
        //if(workMatrix[j][j] == 0)break
        resolve[i] = (resolve[i] - s) / workMatrix[i][i];
        resolve[i]=resolve[i].toFixed(5)
    }

    /*
    Create view
     */
    createMatrixResultsLU(matrix,steps,resolve)

}


