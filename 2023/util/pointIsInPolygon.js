"use strict";
exports.__esModule = true;
exports.pointIsInPolygon = void 0;
var assertInputDefined_1 = require("./assertInputDefined");
var areCoordsEqual = function (coordA, coordB) {
    return coordA[0] === coordB[0] && coordA[1] === coordB[1];
};
function pointIsInPolygon(coord, polygon) {
    var row = coord[0], col = coord[1];
    // j is previous point index
    var j = polygon.length - 1;
    var insidePolygon = false;
    for (var i = 0; i < polygon.length; i++) {
        var polygonPoint = polygon[i];
        var previousPolygonPoint = polygon[j];
        assertInputDefined_1.assertInputDefined(polygonPoint);
        assertInputDefined_1.assertInputDefined(previousPolygonPoint);
        if (areCoordsEqual(polygonPoint, coord)) {
            return false;
        }
        if (polygonPoint[1] > col !== previousPolygonPoint[1] > col) {
            var slope = (row - polygonPoint[0]) *
                (previousPolygonPoint[1] - polygonPoint[1]) -
                (previousPolygonPoint[0] - polygonPoint[0]) *
                    (col - polygonPoint[1]);
            if (slope === 0) {
                // point is on boundary
                return false;
            }
            if (slope < 0 !== previousPolygonPoint[1] < polygonPoint[1]) {
                insidePolygon = !insidePolygon;
            }
        }
        j = i;
    }
    return insidePolygon;
}
exports.pointIsInPolygon = pointIsInPolygon;
