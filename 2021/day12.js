var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var testInputDay122021 = "\ndc-end\nHN-start\nstart-kj\ndc-start\ndc-HN\nLN-dc\nHN-end\nkj-sa\nkj-HN\nkj-dc\n";
var documentTextDay122021 = typeof document === "undefined"
    ? testInputDay122021
    : document.body.innerText;
var createNode = function (nodeKey) { return ({
    name: nodeKey,
    connections: new Set(),
    isSmall: !/[A-Z]/.test(nodeKey)
}); };
var buildNodeMap = function (edges) {
    var nodeMap = {};
    edges.forEach(function (edge) {
        var _a, _b;
        var _c = edge.split("-"), nodeAKey = _c[0], nodeBKey = _c[1];
        if (!nodeAKey || !nodeBKey) {
            throw new Error("invalid edge");
        }
        var nodeA = (_a = nodeMap[nodeAKey]) !== null && _a !== void 0 ? _a : createNode(nodeAKey);
        var nodeB = (_b = nodeMap[nodeBKey]) !== null && _b !== void 0 ? _b : createNode(nodeBKey);
        nodeA.connections.add(nodeB);
        nodeB.connections.add(nodeA);
        nodeMap[nodeAKey] = nodeA;
        nodeMap[nodeBKey] = nodeB;
    });
    return nodeMap;
};
var findAllPaths = function (nodeMap, currentNodeKey, visitedNodes, allPaths, specialNodeKey) {
    var newVisitedNodes = __spreadArrays(visitedNodes, [currentNodeKey]);
    if (currentNodeKey === "end") {
        allPaths.push(newVisitedNodes);
        return allPaths;
    }
    var currentNode = nodeMap[currentNodeKey];
    if (!currentNode) {
        throw new Error("Invalid node");
    }
    var newAllPaths = allPaths;
    currentNode.connections.forEach(function (node) {
        var canVisitNode = !node.isSmall ||
            !newVisitedNodes.includes(node.name) ||
            (node.name === specialNodeKey &&
                newVisitedNodes.reduce(function (sum, el) { return (el === node.name ? sum + 1 : sum); }, 0)) === 1;
        if (canVisitNode) {
            newAllPaths = __spreadArrays(findAllPaths(nodeMap, node.name, newVisitedNodes, newAllPaths, specialNodeKey));
        }
    });
    return newAllPaths;
};
var solveDay122021P1 = function (input) {
    var edges = input.trim().split("\n");
    var nodeMap = buildNodeMap(edges);
    // console.log("nodeMap", nodeMap);
    var paths = findAllPaths(nodeMap, "start", [], []);
    console.log("paths\n", paths.join("\n"));
    console.log("answer", paths.length);
};
solveDay122021P1(documentTextDay122021);
var getUniquePathSize = function (paths) {
    var uniquePathStrings = new Set(paths.map(function (path) { return path.join("-"); }));
    console.log(uniquePathStrings);
    return uniquePathStrings.size;
};
var solveDay122021P2 = function (input) {
    var edges = input.trim().split("\n");
    var nodeMap = buildNodeMap(edges);
    // console.log("nodeMap", nodeMap);
    var paths = [];
    Object.keys(nodeMap)
        .filter(function (key) { return !["start", "end"].includes(key) && !/[A-Z]/.test(key); })
        .forEach(function (specialKey) {
        console.log("special key", specialKey);
        var morePaths = findAllPaths(nodeMap, "start", [], [], specialKey);
        paths = __spreadArrays(paths, morePaths);
    });
    var answer = getUniquePathSize(paths);
    console.log("answer", answer);
};
solveDay122021P2(documentTextDay122021);
