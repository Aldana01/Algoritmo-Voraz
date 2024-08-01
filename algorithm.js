let nodesAdjacent = [];
let nodeReference;
let nodeCurrent;
let positionsNodes = [];
let lastNode;
let cNodes;
let time;
let Ox;
let Oy;

const setNodeReference = () => {
    let positionNode = Math.floor(Math.random() * ((nodes.length - 1) + 1)) + 0;
    nodeReference = nodes[positionNode];
    nodeCurrent = nodeReference;

    nodesAdjacent = nodes.filter(node => node.name !== nodeCurrent.name);
    repaintNode(nodeReference, 'red');
}

const AlgTrip = () => {
    positionsNodes = nodesAdjacent.map( n => {
        return { 
            name : n.name, 
            x : n.x, 
            y : n.y, 
            h : Math.sqrt(Math.pow(Math.abs(nodeCurrent.x - n.x), 2) + Math.pow(Math.abs(nodeCurrent.y - n.y), 2))
        }
    });

    positionsNodes.sort((a, b) => a.h - b.h);
    let nodeCurrentOld = nodeCurrent;
    nodeCurrent = positionsNodes[0];
    positionsNodes.shift();
    
    traceLine(nodeCurrentOld, nodeCurrent);
    repaintNode(nodeCurrent, '#1ecbc6');
    nodesAdjacent = positionsNodes;
   
}

const startTrip = () => {
    if(validateParams()) {
        clearNodes();
        generateNodes(cNodes);
        setNodeReference();
        
        console.time("Tiempo de ejecución");
        let interval = setInterval(() => {
            if(nodesAdjacent.length > 0) {
                AlgTrip();
                if(nodesAdjacent.length === 0){
                    lastNode = nodeCurrent;
                } 
            } else {
                traceLine(lastNode, nodeReference);
                clearInterval(interval);
                console.timeEnd("Tiempo de ejecución");
            }
        }, time*1000);
    }
}

clearNodes = () => {
   clearCanvas();
   nodesAdjacent = [];
   positionsNodes = [];
   nodeReference = null;
   nodeCurrent = null;
   lastNode = null;
   nodes = [];
}

const validateParams = () => {
    cNodes = document.querySelector('#cnode').value;
    time = document.querySelector('#ctime').value;
    
    if(cNodes === '' || time === '') {
        alert('Los campos no pueden estar vacios');
        return false;
    }

    return true;
}