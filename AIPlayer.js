export default function AIPlayer() {
    function randomCoords() {
        function randomInt(max) {
            return Math.floor(Math.random() * (max + 1));
        }
    
        const x = randomInt(10);
        const y = randomInt(10); 
        
        return [x, y];
    }

    return {}
}
