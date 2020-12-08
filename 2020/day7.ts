const testInput = `
light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.
`.trim().split("\n");


const testInput2 = `
shiny gold bags contain 2 dark red bags.
dark red bags contain 2 dark orange bags.
dark orange bags contain 2 dark yellow bags.
dark yellow bags contain 2 dark green bags.
dark green bags contain 2 dark blue bags.
dark blue bags contain 2 dark violet bags.
dark violet bags contain no other bags.
`.trim().split("\n");

type BagNode = {
    name: string;
    id: string;
    contains: ContainRule[];
    containedBy: string[];
}

type ContainRule = {
    id: string;
    count: number;
}

type NodeTree = { 
    [x: string]: BagNode;
};


const buildNodeTree = (input: string[]) => {
    let nodeTree: NodeTree = {};

    for (let i = 0; i < input.length; i++) {
        let [name, containsString] = input[i].split(" bags contain ");
        const id = nameToId(name);
        nodeTree = addNodeAndContainedNodesToTree(name, id, containsString, nodeTree);        
    }

    return nodeTree;
}

const addNodeAndContainedNodesToTree = (name: string, id: string, containsString: string, nodeTree: NodeTree): NodeTree => {
    nodeTree = addNodeToTree(name, id, nodeTree);
    if (/no other bags/.test(containsString)){
        return nodeTree;
    }
    containsString.split(",").forEach((containString:string ) => {
        const [_, count, containedName] = containString.match(/(\d) ([\w\s]+) bag/);
        const containedId = nameToId(containedName);
        nodeTree = addNodeToTree(containedName, containedId, nodeTree);
        nodeTree[id].contains.push({
            id: containedId,
            count: Number(count)
        });
        nodeTree[containedId].containedBy.push(id);
    });

    return nodeTree;
}

const addNodeToTree = (name: string, id: string, nodeTree: NodeTree ) : NodeTree => {
    nodeTree[id] = nodeTree[id] || {id, name, contains: [], containedBy: []};
    return nodeTree;
}

const nameToId = (name: string) => name.replace(/\s/g, "-");



const buildTreeAndCountAllParentsOfNode = (name:string, input:string[]):number => {
    const id = nameToId(name);
    const nodeTree = buildNodeTree(input)
    console.log("nodeTree", nodeTree);
    return getSetOfAllParents(id, nodeTree, new Set()).size - 1;
}

const getSetOfAllParents = (id: string, nodeTree: NodeTree, bagSet:Set<string>): Set<string> => {
    bagSet.add(id);
    if (nodeTree[id].containedBy.length === 0) {
        return bagSet;
    }
    nodeTree[id].containedBy.forEach((parentId) => {
        bagSet = getSetOfAllParents(parentId, nodeTree, bagSet);
    });
    return bagSet;
}


console.log(buildTreeAndCountAllParentsOfNode("shiny gold", testInput));
// console.log(buildTreeAndCountAllParentsOfNode("shiny gold", document.body.innerText.trim().split('\n')));

const buildTreeAndCountAllBagsContained = (name:string, input:string[]):number => {
    const id = nameToId(name);
    const nodeTree = buildNodeTree(input)
    return getCountOfBagsInBag(id, nodeTree);
}


// const getCountOfBagsinBagIncludingBag = (id: string, nodeTree: NodeTree) => {
//     if (nodeTree[id].contains.length === 0){
//         return 1;
//     }
//     return nodeTree[id].contains.reduce((prevCount: number, containInfo:ContainRule) => {
//         return prevCount + (containInfo.count * getCountOfBagsinBagIncludingBag(containInfo.id, nodeTree))
//     }, 1);
// }


const getCountOfBagsInBag = (id: string, nodeTree: NodeTree) => {
    if (nodeTree[id].contains.length === 0){
        return 0;
    }

    return nodeTree[id].contains.reduce((prevCount: number, containInfo:ContainRule) => {
        return prevCount + containInfo.count + (containInfo.count * getCountOfBagsInBag(containInfo.id, nodeTree))
    }, 0);
}

console.log(buildTreeAndCountAllBagsContained("shiny gold", testInput));
console.log(buildTreeAndCountAllBagsContained("shiny gold", testInput2));


// console.log(buildTreeAndCountAllBagsContained("shiny gold", document.body.innerText.trim().split('\n')));
