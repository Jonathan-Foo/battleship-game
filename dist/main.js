(()=>{"use strict";const r=class{constructor(r,t){this.length=r,this.life=r,this.character=t,this.orientation="horizontal",this.headCoord={},this.shipBodyCoords=[],this.adjacentCoords=[]}hit=()=>this.life--;isSunk=()=>0===this.life;setHeadCoord=r=>{this.headCoord=r,this.generateShipCoords(),this.generateAdjacentCoords()};setOrietation=r=>{this.orientation=r};changeOrientation=()=>"vertical"===this.orientation?this.orientation="horizontal":this.orientation="vertical";generateShipCoords=()=>{let r=[],t=0;if("horizontal"===this.orientation)for(;t<this.length;)r.push({x:this.headCoord.x+t,y:this.headCoord.y}),t++;else for(;t<this.length;)r.push({x:this.headCoord.x,y:this.headCoord.y+t}),t++;return this.shipBodyCoords=r};generateAdjacentCoords(){let r=[];const t=this.shipBodyCoords[0],o=this.shipBodyCoords[this.shipBodyCoords.length-1],a=this.shipBodyCoords.slice(1,this.shipBodyCoords.length-1);"vertical"===this.orientation?(r.push({x:t.x-1,y:t.y},{x:t.x+1,y:t.y},{x:t.x,y:t.y-1},{x:t.x-1,y:t.y-1},{x:t.x+1,y:t.y-1}),a.forEach((t=>r.push({x:t.x+1,y:t.y},{x:t.x-1,y:t.y}))),r.push({x:o.x+1,y:o.y},{x:o.x,y:o.y+1},{x:o.x-1,y:o.y},{x:o.x-1,y:o.y+1},{x:o.x+1,y:o.y+1})):(r.push({x:t.x-1,y:t.y},{x:t.x,y:t.y-1},{x:t.x,y:t.y+1},{x:t.x-1,y:t.y-1},{x:t.x-1,y:t.y+1}),a.forEach((t=>r.push({x:t.x,y:t.y-1},{x:t.x,y:t.y+1}))),r.push({x:o.x+1,y:o.y},{x:o.x,y:o.y-1},{x:o.x,y:o.y+1},{x:o.x+1,y:o.y-1},{x:o.x+1,y:o.y+1}));const s=r.filter((r=>r.x<=9&&r.y<=9&&r.x>=0&&r.y>=0));return this.adjacentCoords=s}randomOrientation(){const r=Math.round(Math.random());return this.orientation=r<1?"horizontal":"vertical"}},t=class{constructor(t){this.name=t,this.gameBoard=new class{constructor(){this.gameboardArr=[["","","","","","","","","",""],["","","","","","","","","",""],["","","","","","","","","",""],["","","","","","","","","",""],["","","","","","","","","",""],["","","","","","","","","",""],["","","","","","","","","",""],["","","","","","","","","",""],["","","","","","","","","",""],["","","","","","","","","",""]],this.shipsArr=[new r(5,"A"),new r(4,"B"),new r(3,"C"),new r(3,"D"),new r(2,"E")]}receiveAttack=r=>{"M"!==this.gameboardArr[r.y][r.x]&&"X"!==this.gameboardArr[r.y][r.x]&&(""===this.gameboardArr[r.y][r.x]||"O"===this.gameboardArr[r.y][r.x]?this.gameboardArr[r.y][r.x]="M":this.successfulHit(r))};sunken(r){r.adjacentCoords.forEach((r=>this.gameboardArr[r.y][r.x]="M"))}successfulHit(r){const t=this.gameboardArr[r.y][r.x],o=this.shipsArr.find((r=>r.character===t));this.gameboardArr[r.y][r.x]="X",o.hit(),o.isSunk()&&this.sunken(o)}allShipSunkCheck=()=>this.shipsArr.every((r=>r.isSunk()));randomCoords(r,t){let o=s(),a=s();function s(){return Math.floor(10*Math.random())}return"horizontal"===t&&o+r<=9||"vertical"===t&&a+r<=9?{x:o,y:a}:this.randomCoords(r,t)}placeShipsRandomly=r=>{r.randomOrientation();const t=r.length,o=r.orientation;if(r.setHeadCoord(this.randomCoords(t,o)),!this.canBePlace(r))return this.placeShipsRandomly(r);this.insertCharactersToGBArr(r)};insertCharactersToGBArr=r=>{r.shipBodyCoords.forEach((t=>this.gameboardArr[t.y][t.x]=r.character)),r.adjacentCoords.forEach((r=>{this.gameboardArr[r.y][r.x]="O"}))};canBePlace=r=>r.shipBodyCoords.every((r=>""===this.gameboardArr[r.y][r.x]));placeShips=()=>{this.gameboardArr.every((r=>r.every((r=>""===r))))&&this.shipsArr.forEach((r=>this.placeShipsRandomly(r)))}}}placeShipsRandomly(){this.gameBoard.placeShips()}attack(r){const t=this.createRandomCoord();"M"!==r.gameBoard.gameboardArr[t.y][t.x]||"X"!==r.gameBoard.gameboardArr[t.y][t.x]?r.gameBoard.receiveAttack(t):this.attack(r)}createRandomCoord(){function r(){return Math.floor(10*Math.random())}return{x:r(),y:r()}}};!function(){const r=new t("player");r.placeShipsRandomly(),r.gameBoard.gameboardArr.forEach(((r,t)=>{r.forEach(((r,o)=>{""!==r&&"O"!==r&&document.querySelector(`.player > [data-coords="{x: ${o}, y: ${t}}"]`).classList.add("occupied")}))}));new t("computer").placeShipsRandomly()}()})();