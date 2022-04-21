export default function Ship(length, symbol) {
    const life = length
    const character = symbol; 
    let orientation = 'vertical'
    const headCoord = [2, 1]
    const shipFullCoord = generateShipCoords(headCoord, orientation, length);
    

    const hit = () => {
        return life--;
    }

    const isSunk = () => {
       return life === 0;
    }

    const changeOrient = () => {
        return orientation === 'vertical' ? 'horizontal' : 'vertical';
    }

    return {hit, isSunk, changeOrient};
}

function generateShipCoords(headCoord, orientation, length) {
    let result = []
    if (orientation === 'horizontal') {
        while (i < length) {
            result.push([headCoord[0], [headCoord[1 + i]]]);
            i++;
        }
    } else {
        while (i < length) {
            result.push([headCoord[0 + i], [headCoord[1]]]);
            i++;
        }
    }
    return result
}


