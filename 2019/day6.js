// const input = ['COM)B',
// 'B)C',
// 'C)D',
// 'D)E',
// 'E)F',
// 'B)G',
// 'G)H',
// 'D)I',
// 'E)J',
// 'J)K',
// 'K)L',
// ];
const input = document.body.innerText.trim().split("\n");

const traverseAndSum = (node, depth = 0) => {
    let sum = depth;
    if (!node.children.length){
        return sum;
    } else {
        node.children.forEach(childNode => {
            sum += traverseAndSum(childNode, depth + 1);
        });
        return sum;
    }
    
};


const buildTree = (nodeList) => {
    const tree = {};
    nodeList.forEach((nodeString) => {
        [parentKey, childKey] = nodeString.split(')');
        createOrUpdateNode(parentKey, childKey, tree);
    });
    return tree;
};

var rootTracker = {};

const createOrUpdateNode = (parentKey, childKey, tree) => {
    if(!tree[parentKey]){
        tree[parentKey] = {
            key: parentKey,
            children: [],
        }
        rootTracker[parentKey] = true;
    }

    if (!tree[childKey]){
        tree[childKey] = {
            key: childKey,
            children: [],
        }
    }

    tree[childKey].parent = tree[parentKey];
    tree[parentKey].children.push(tree[childKey]);
    delete rootTracker[childKey];
};

const tree = buildTree(input);

// const sum = traverseAndSum(tree[Object.keys(rootTracker)[0]]);


const rootKey = "COM";
const targetKey1 = "SAN";
const targetKey2 = "YOU";

function markPath(currentKey, path = {}, step = 0, callback = () => {}){
    path[currentKey] = step;
    if (currentKey === "COM"){
        return path;
    } else if (callback(currentKey, step)){
        return;
    } else {
        const parentKey = tree[currentKey].parent.key
        return markPath(parentKey, path, step + 1, callback);
    }
}

const checkPath1 = (key, step) => {
    if (key === targetKey2){
        console.log("FOUND DIRECT PATH");
        console.log(key, step);
        return true;
    }
}
const path1 = markPath(targetKey1, {}, 0, checkPath1);

const checkPath2 = (key, step) => {
    if (path1[key]){
        console.log("FOUND CLOSEST SHARED PARENT");
        console.log(key, "NUM STEPS IN EACH PATH", step, path1[key]);
        console.log("ANSWER:", step + path1[key] -2);
        return true;
    }
}
const path2 = markPath(targetKey2, {}, 0, checkPath2);
