class Ship {
    constructor (length, symbol) {
        this.length = length;
        this.life = length;
        this.character = symbol;
        this.orientation = 'horizontal';
        this.headCoord = {};
        this.shipBodyCoords = []; 
        this.adjacentCoords = []; 
    }

     
    //Hit functions 
    hit = () => this.life--
    isSunk = () => this.life === 0

    // Function to set Head coordinate of ship
    setHeadCoord = (coord) => {
        this.headCoord = coord;
        this.generateShipCoords();
        this.generateAdjacentCoords();
        
    }

    setOrietation = (orientation) => {
        this.orientation = orientation;
    }

    changeOrientation = () => {
        return this.orientation === 'vertical' ? this.orientation = 'horizontal' : this.orientation = 'vertical';
    }

    // Function to generate the full body co-ordinates of a ship
    generateShipCoords = () => {
        let result = [];
        let i = 0;
        if (this.orientation === 'horizontal') {
            while (i < this.length) {
                result.push({x: Number(this.headCoord.x) + i, y: Number(this.headCoord.y)});
                i++;
            }
        } else {
            while (i < this.length) {
                result.push({x: Number(this.headCoord.x) , y: Number(this.headCoord.y) + i});
                i++;
            }
        }
    
        return this.shipBodyCoords = result;
    }
    

    //Function to generate all the coordinates of adjacent squares to a ship
    generateAdjacentCoords() {
        let result = [];
        const head = this.shipBodyCoords[0];
        const tail = this.shipBodyCoords[this.shipBodyCoords.length - 1];
        const body = this.shipBodyCoords.slice(1, this.shipBodyCoords.length - 1);

        if (this.orientation === 'vertical') {
            result.push({x: head.x - 1, y: head.y}, {x: head.x + 1, y: head.y}, {x: head.x, y: head.y - 1}, {x: head.x - 1, y: head.y - 1}, {x: head.x + 1, y: head.y - 1});
            body.forEach(point => result.push({x: point.x + 1, y: point.y}, {x: point.x - 1, y: point.y}));
            result.push({x: tail.x + 1, y: tail.y}, {x: tail.x, y: tail.y + 1}, {x: tail.x - 1, y: tail.y}, {x: tail.x - 1, y: tail.y + 1}, {x: tail.x + 1, y: tail.y + 1});
        } else {
            result.push({x: head.x - 1, y: head.y}, {x: head.x , y: head.y - 1}, {x: head.x, y: head.y + 1}, {x: head.x - 1, y: head.y - 1}, {x: head.x - 1, y: head.y + 1});
            body.forEach(point => result.push({x: point.x, y: point.y - 1}, {x: point.x, y: point.y + 1}));
            result.push({x: tail.x + 1, y: tail.y}, {x: tail.x, y: tail.y - 1}, {x: tail.x, y: tail.y + 1}, {x: tail.x + 1, y: tail.y - 1}, {x: tail.x + 1, y: tail.y + 1});
        }
        const filteredAdj = result.filter(point => point.x <= 9 && point.y <= 9 && point.x >= 0 && point.y >= 0 )
        return this.adjacentCoords = filteredAdj;
    }

    randomOrientation() {
        const integer = Math.round(Math.random()); 
        return integer < 1 ? this.orientation = 'horizontal' : this.orientation = 'vertical';
    }
      
}

export default Ship;









