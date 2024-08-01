const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
let nodes = [];

const createNode = (node) => {
    const { name, x, y, color } = node;
    ctx.fillStyle = 'white';
    ctx.font = '8px Arial';
    ctx.fillText(name, x-16, y-12);

    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2*Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
}

const generateNodes = (cNodes) => {
    for (let i = 1; i <= cNodes; i++) {
        let x = Math.random() * (980 - 20) + 20;
        let y = Math.random() * (480 - 20) + 20;
        let color = '#1ecbc6';
        let name = `Node ${i}`;
        let node = { name, x, y, color, visited : false };
        nodes.push(node);
        createNode(node);
    }
}

const repaintNode = (node, color) => {
    ctx.clearRect(node.x-10, node.y-10, 20, 20);
    createNode({ ...node, color : color});
}

const traceLine = (node1, node2) => {
    ctx.beginPath();
    ctx.moveTo(node1.x, node1.y);
    ctx.lineTo(node2.x, node2.y);
    ctx.strokeStyle = 'orange';
    ctx.stroke();
}

const clearCanvas = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}