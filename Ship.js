export default function Ship(length, symbol) {
    let life = length;

    let orientation = 'vertical';

    const character = symbol;

    const adjSymbol = 'O'

    let headCoord = {};

    const shipBodyCoords = generateShipCoords(); // array of objects containing coords of all ship parts

    const adjacentCoords = generateAdjacentCoords(); // array of objects containing coords of all adjacent squares
    
    const hit = () => life--

    const isSunk = () => life === 0

    const changeOrientation = () => {
        return orientation === 'vertical' ? 'horizontal' : 'vertical';
    }

    // Function to generate all the co-ordinates of a ship
    function generateShipCoords() {
        let result = [];
        let i = 0;
        if (orientation === 'horizontal') {
            while (i < length) {
                result.push({x: headCoord.x, y: headCoord.y + i});
                i++;
            }
        } else {
            while (i < length) {
                result.push({x: headCoord.x + i, y: headCoord.y});
                i++;
            }
        }
        
        return result;
    }

    //Function to generate all the coordinates of adjacent squares
    function generateAdjacentCoords() {
        let result = [];
        const head = shipBodyCoords[0];
        const tail = shipBodyCoords[shipBodyCoords.length - 1];
        const body = shipBodyCoords.slice(1, shipBodyCoords.length - 1);

        if (orientation === 'horizontal') {
            result.push({x: head.x - 1, y: head.y}, {x: head.x + 1, y: head.y}, {x: head.x, y: head.y - 1}, {x: head.x - 1, y: head.y - 1}, {x: head.x + 1, y: head.y - 1});
            body.forEach(point => result.push({x: point.x + 1, y: point.y}, {x: point.x - 1, y: point.y}));
            result.push({x: tail.x + 1, y: tail.y}, {x: tail.x, y: tail.y - 1}, {x: tail.x - 1, y: tail.y}, {x: tail.x - 1, y: tail.y + 1}, {x: tail.x + 1, y: tail.y + 1});
        } else {
            result.push({x: head.x - 1, y: head.y}, {x: head.x , y: head.y - 1}, {x: head.x, y: head.y + 1}, {x: head.x - 1, y: head.y - 1}, {x: head.x - 1, y: head.y + 1});
            body.forEach(point => result.push({x: point.x, y: point.y - 1}, {x: point.x, y: point.y + 1}));
            result.push({x: tail.x + 1, y: tail.y}, {x: tail.x, y: tail.y - 1}, {x: tail.x, y: tail.y + 1}, {x: tail.x + 1, y: tail.y - 1}, {x: tail.x + 1, y: tail.y + 1});
        }
        
        return result;
    }


    //Checks whether a ship can be placed at that point
    function canBePlace() {
        return shipBodyCoords.every(point => 
            gameBoardArr[point.x][point.y] === ''); 	
    }

    // Function to set Head coordinate of ship
    function setHeadCoord(obj) {
        return headCoord = obj
    }


        


    return {hit, 
            isSunk, 
            changeOrientation, 
            shipBodyCoords, 
            canBePlace,
            setHeadCoord,
            character,
            adjacentCoords,
            adjSymbol};
}







