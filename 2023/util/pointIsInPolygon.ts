import { assertInputDefined } from "./assertInputDefined";
const areCoordsEqual = (coordA: Coord, coordB: Coord) =>
    coordA[0] === coordB[0] && coordA[1] === coordB[1];

type Coord = [number, number];

export function pointIsInPolygon(coord: Coord, polygon: Coord[]): boolean {
    const [row, col] = coord;
    // j is previous point index
    let j = polygon.length - 1;
    let insidePolygon = false;
    for (let i = 0; i < polygon.length; i++) {
        const polygonPoint = polygon[i];
        const previousPolygonPoint = polygon[j];
        assertInputDefined(polygonPoint);
        assertInputDefined(previousPolygonPoint);
        if (areCoordsEqual(polygonPoint, coord)) {
            return false;
        }
        if (polygonPoint[1] > col !== previousPolygonPoint[1] > col) {
            const slope =
                (row - polygonPoint[0]) *
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
