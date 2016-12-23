var containers = [33,14,18,20,45,35,16,35,1,13,18,13,50,44,48,6,24,41,30,42];
var combos = [];
var minLength = containers.length;
var combosByLength = [];
function fillJug(sum, head, tail){
    if (sum === 150){
        console.log(sum);
        console.log(head);
        console.log(tail);
        combos.push(head);
        if (head.length <=minLength){
            minLength = head.length;
            combosByLength[head.length] =  combosByLength[head.length] || 0;
            combosByLength[head.length] += 1;
        }
        return;
    }else if(sum > 150 || tail.length === 0){
        return;
    }
    else if (sum == NaN ){
        debugger;

    } else{
        var newSum = sum + tail[0];
        var newHead = head.concat(tail[0]);
        var newTail = tail.slice(1);
        fillJug(newSum, newHead, newTail);
        fillJug(sum, head, newTail);
    }
}

fillJug (0, [], containers);


