var count = 0;
function parseAllObjects (object){
    if (typeof(object) === 'object' && !Array.isArray(object)){
        for (var j in object){
            if (object[j] === 'red'){
                return false;
            }
        }
    }

    for (var i in object){
        if (typeof(object[i]) === 'number'){
            count += object[i];
        }
        else if (typeof(object[i]) === 'object'){
            parseAllObjects(object[i]);
        }
    }
}

parseAllObjects(masterArray);