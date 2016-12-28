// var possibleTriangles = 0;

// var triangles = document.body.textContent.trim().split('\n');
// for (var i = 0; i < triangles.length; i++) {
//     var dimensions = triangles[i].trim().split('  ');
//     if (validTriangle(parseInt(dimensions[0]), parseInt(dimensions[1]), parseInt(dimensions[2]))){
//         console.log(dimensions);
//         possibleTriangles++;
//     }
// }
// console.log(possibleTriangles);

// function validTriangle(a, b, c){
//     return (a + b > c) && (b + c > a) && (a + c > b);
// }

var possibleTriangles = 0;

var rows = document.body.textContent.trim().split('\n');
for (var i = 0; i < rows.length; i+=3) {
// for (var i = 0; i < 10; i+=3) {
    var row1 = rows[i].trim().split(/\s+/);
    var row2 = rows[i + 1].trim().split(/\s+/);
    var row3 = rows[i + 2].trim().split(/\s+/);
    if (validTriangle(parseInt(row1[0]), parseInt(row2[0]), parseInt(row3[0]))){
        possibleTriangles ++;
    }
    if (validTriangle(parseInt(row1[1]), parseInt(row2[1]), parseInt(row3[1]))){
        possibleTriangles ++;
    }
    if (validTriangle(parseInt(row1[2]), parseInt(row2[2]), parseInt(row3[2]))){
        possibleTriangles ++;
    }
}
console.log(possibleTriangles);

function validTriangle(a, b, c){
    if (isNaN(a) || isNaN(b) || isNaN(c)){
        debugger;
    }
    // console.log(a, b, c);
    return (a + b > c) && (b + c > a) && (a + c > b);
}