var testInput = "\nlight red bags contain 1 bright white bag, 2 muted yellow bags.\ndark orange bags contain 3 bright white bags, 4 muted yellow bags.\nbright white bags contain 1 shiny gold bag.\nmuted yellow bags contain 2 shiny gold bags, 9 faded blue bags.\nshiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.\ndark olive bags contain 3 faded blue bags, 4 dotted black bags.\nvibrant plum bags contain 5 faded blue bags, 6 dotted black bags.\nfaded blue bags contain no other bags.\ndotted black bags contain no other bags.\n".trim().split("\n");
var testInput2 = "\nshiny gold bags contain 2 dark red bags.\ndark red bags contain 2 dark orange bags.\ndark orange bags contain 2 dark yellow bags.\ndark yellow bags contain 2 dark green bags.\ndark green bags contain 2 dark blue bags.\ndark blue bags contain 2 dark violet bags.\ndark violet bags contain no other bags.\n".trim().split("\n");
var buildNodeTree = function (input) {
    var nodeTree = {};
    for (var i = 0; i < input.length; i++) {
        var _a = input[i].split(" bags contain "), name = _a[0], containsString = _a[1];
        var id = nameToId(name);
        nodeTree = addNodeAndContainedNodesToTree(name, id, containsString, nodeTree);
    }
    return nodeTree;
};
var addNodeAndContainedNodesToTree = function (name, id, containsString, nodeTree) {
    nodeTree = addNodeToTree(name, id, nodeTree);
    if (/no other bags/.test(containsString)) {
        return nodeTree;
    }
    containsString.split(",").forEach(function (containString) {
        var _a = containString.match(/(\d) ([\w\s]+) bag/), _ = _a[0], count = _a[1], containedName = _a[2];
        var containedId = nameToId(containedName);
        nodeTree = addNodeToTree(containedName, containedId, nodeTree);
        nodeTree[id].contains.push({
            id: containedId,
            count: Number(count)
        });
        nodeTree[containedId].containedBy.push(id);
    });
    return nodeTree;
};
var addNodeToTree = function (name, id, nodeTree) {
    nodeTree[id] = nodeTree[id] || { id: id, name: name, contains: [], containedBy: [] };
    return nodeTree;
};
var nameToId = function (name) { return name.replace(/\s/g, "-"); };
var buildTreeAndCountAllParentsOfNode = function (name, input) {
    var id = nameToId(name);
    var nodeTree = buildNodeTree(input);
    console.log("nodeTree", nodeTree);
    return getSetOfAllParents(id, nodeTree, new Set()).size - 1;
};
var getSetOfAllParents = function (id, nodeTree, bagSet) {
    bagSet.add(id);
    if (nodeTree[id].containedBy.length === 0) {
        return bagSet;
    }
    nodeTree[id].containedBy.forEach(function (parentId) {
        bagSet = getSetOfAllParents(parentId, nodeTree, bagSet);
    });
    return bagSet;
};
console.log(buildTreeAndCountAllParentsOfNode("shiny gold", testInput));
// console.log(buildTreeAndCountAllParentsOfNode("shiny gold", document.body.innerText.trim().split('\n')));
var buildTreeAndCountAllBagsContained = function (name, input) {
    var id = nameToId(name);
    var nodeTree = buildNodeTree(input);
    return getCountOfBagsInBag(id, nodeTree);
};
// const getCountOfBagsinBagIncludingBag = (id: string, nodeTree: NodeTree) => {
//     if (nodeTree[id].contains.length === 0){
//         return 1;
//     }
//     return nodeTree[id].contains.reduce((prevCount: number, containInfo:ContainRule) => {
//         return prevCount + (containInfo.count * getCountOfBagsinBagIncludingBag(containInfo.id, nodeTree))
//     }, 1);
// }
var getCountOfBagsInBag = function (id, nodeTree) {
    if (nodeTree[id].contains.length === 0) {
        return 0;
    }
    return nodeTree[id].contains.reduce(function (prevCount, containInfo) {
        return prevCount + containInfo.count + (containInfo.count * getCountOfBagsInBag(containInfo.id, nodeTree));
    }, 0);
};
console.log(buildTreeAndCountAllBagsContained("shiny gold", testInput));
console.log(buildTreeAndCountAllBagsContained("shiny gold", testInput2));
// console.log(buildTreeAndCountAllBagsContained("shiny gold", document.body.innerText.trim().split('\n')));
