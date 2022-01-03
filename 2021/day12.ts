const testInputDay122021 = `
dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc
`;

const documentTextDay122021 =
    typeof document === "undefined"
        ? testInputDay122021
        : document.body.innerText;

interface CaveNode {
    name: string;
    connections: Set<CaveNode>;
    isSmall: boolean;
}

type NodeMap = Record<string, CaveNode>;

const createNode = (nodeKey: string): CaveNode => ({
    name: nodeKey,
    connections: new Set(),
    isSmall: !/[A-Z]/.test(nodeKey),
});

const buildNodeMap = (edges: string[]) => {
    const nodeMap: NodeMap = {};
    edges.forEach((edge) => {
        const [nodeAKey, nodeBKey] = edge.split("-");
        if (!nodeAKey || !nodeBKey) {
            throw new Error("invalid edge");
        }
        const nodeA = nodeMap[nodeAKey] ?? createNode(nodeAKey);

        const nodeB = nodeMap[nodeBKey] ?? createNode(nodeBKey);

        nodeA.connections.add(nodeB);
        nodeB.connections.add(nodeA);

        nodeMap[nodeAKey] = nodeA;
        nodeMap[nodeBKey] = nodeB;
    });
    return nodeMap;
};

const findAllPaths = (
    nodeMap: NodeMap,
    currentNodeKey: string,
    visitedNodes: string[],
    allPaths: string[][],
    specialNodeKey?: string
): string[][] => {
    const newVisitedNodes = [...visitedNodes, currentNodeKey];
    if (currentNodeKey === "end") {
        allPaths.push(newVisitedNodes);
        return allPaths;
    }
    const currentNode = nodeMap[currentNodeKey];
    if (!currentNode) {
        throw new Error("Invalid node");
    }
    let newAllPaths = allPaths;

    currentNode.connections.forEach((node) => {
        const canVisitNode =
            !node.isSmall ||
            !newVisitedNodes.includes(node.name) ||
            (node.name === specialNodeKey &&
                newVisitedNodes.reduce(
                    (sum, el) => (el === node.name ? sum + 1 : sum),
                    0
                )) === 1;
        if (canVisitNode) {
            newAllPaths = [
                ...findAllPaths(
                    nodeMap,
                    node.name,
                    newVisitedNodes,
                    newAllPaths,
                    specialNodeKey
                ),
            ];
        }
    });
    return newAllPaths;
};

const solveDay122021P1 = (input: string) => {
    const edges = input.trim().split("\n");
    const nodeMap = buildNodeMap(edges);
    // console.log("nodeMap", nodeMap);

    const paths = findAllPaths(nodeMap, "start", [], []);
    console.log("paths\n", paths.join("\n"));
    console.log("answer", paths.length);
};

solveDay122021P1(documentTextDay122021);

const getUniquePathSize = (paths: string[][]) => {
    const uniquePathStrings = new Set(paths.map((path) => path.join("-")));
    console.log(uniquePathStrings);
    return uniquePathStrings.size;
};

const solveDay122021P2 = (input: string) => {
    const edges = input.trim().split("\n");
    const nodeMap = buildNodeMap(edges);
    // console.log("nodeMap", nodeMap);
    let paths: string[][] = [];
    Object.keys(nodeMap)
        .filter((key) => !["start", "end"].includes(key) && !/[A-Z]/.test(key))
        .forEach((specialKey) => {
            console.log("special key", specialKey);
            const morePaths = findAllPaths(
                nodeMap,
                "start",
                [],
                [],
                specialKey
            );
            paths = [...paths, ...morePaths];
        });
    const answer = getUniquePathSize(paths);
    console.log("answer", answer);
};

solveDay122021P2(documentTextDay122021);
