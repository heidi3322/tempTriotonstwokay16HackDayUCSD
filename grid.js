var coordinates = {};
var numcoords = 0;
var player = {xPos: 640, yPos: 220};
var playerLoc = new Location(640,220);
var enemies = [];
var hexagons = {};
var canKey = true;
var numenemies = 0;
var tolerance = 0.75;

function Location(x, y){
	this.x = round(x,2);
	this.y = round(y,2);
	
	this.equals = function(loc){
		return Math.abs(this.x - loc.x) < tolerance && Math.abs(this.y - loc.y) < tolerance;
	}
	this.move = function(newx, newy){
		this.x = newx;
		this.y = newy;
	}
}


function Hexagon(x,y){
	this.x = x;
	this.y = y;
	this.img  = document.createElement("img");
	this.loc = new Location(this.x, this.y);
	coordinates[[this.x, this.y]] = [this.x, this.y];
	
	this.draw = function(){
		$(this.img).attr("src", "Assets/Hexagon2.png");
		c = {"position":"absolute", "top":this.y + 10, "left":this.x}
		$(this.img).css(c);

		document.body.appendChild(this.img);
		
	}
	
	this.branch = function(num){
		spots = filter(getNeighbors(this.loc));
		if(spots.length > 0){
			spots = shuffle(spots);
		}
		for(i = 0; i < num && i < spots.length; i++){

			createHexagon(spots[i][0], spots[i][1])
		}
	}
	
	this.numNeighbors = function(){
		return 6-filter(getNeighbors(this.loc)).length;
	}
	
}

function inObject(obj, l){
	for(i = 0; i < Object.keys(obj).length; i++){
		if(obj[Object.keys(obj)[i]].loc.equals(l)){
			return true;
		}
	}
	return false;
}


function drawWalls() {
	keys = Object.keys(hexagons);
	keys.forEach(function(e){
			x = hexagons[e].x;
			y = hexagons[e].y;
			for(i = 0; i < 2; i++){
				img = document.createElement("img");
				$(img).attr("src", "Assets/WallFall.png");
				c = {"position":"absolute", "top":y + 10 + 28 + i*38, "left":x, "z-index":-1}
				$(img).css(c);
				document.body.appendChild(img);
			}
			
	});
}

function createHexagon(x, y){
	hex = new Hexagon(x, y);
	hex.draw();
	hexagons[numcoords++] = hex;
}

function canMove(x, y) {
	for(i = 0; i < numcoords; i++){
		loc = new Location(x,y);
			if(inObject(hexagons, loc)){
				return true
			}
		}
	return false;
}



function move_player(x, y) {
    latitude = round(x*47.67, 2);
    longitude = round(y*27.5, 2);
	xPos = round(parseFloat($("#player").css("left").replace("px", "")),2);
	yPos = round(parseFloat($("#player").css("top").replace("px", "")),2);
	
	
    if (canMove(round((xPos +latitude),2), round((yPos+longitude),2)) == false) {
		
        return;
    }
	
    xPos += round(x*47.67,2);
    yPos += round(y*27.5, 2);
	
	$("#player").css({"top": yPos, "left":xPos});
}


function filter(obj){
	keys = Object.keys(obj);
	valid = [];
	counter = 0;
	keys.forEach(function(e){
		x = obj[e][0]
		y = obj[e][1]
		if(x >= 64 && y >= 55 && x <= 1216 && y <= 495 && objValIndexOf(coordinates,[x,y]) == -1){
			valid[counter++] = obj[e]
		}
	});
	return valid;
}

function add_player(x,y){
	var img = document.createElement("img");
	$(img).attr("src","Assets/CatSlime.gif");
	img.src = "Assets/CatLoop.gif"+"?a="+Math.random();
	c = {"position":"absolute", "top":y, "left":x};
	$(img).css(c);
	playerLoc = new Location(x,y);
	$(img).attr("id", "player");
	coordinates[[x,y]] = [x,y];
	document.body.appendChild(img);
    player.xPos = x;
    player.yPos = y; 
}

function getNeighbors(loc){
	x = loc.x
	y = loc.y
	neighbors = {};
	neighbors[0] = [round(x-47.67,2), round(y+27.5,2)];
	neighbors[1] = [round(x+47.67,2), round(y+27.5,2)];
	neighbors[2] = [x, round(y + 55,2)];
	neighbors[3] = [x, round(y - 55,2)];
	neighbors[4] = [round(x-47.67,2), round(y-27.5,2)];
	neighbors[5] = [round(x+47.67,2), round(y-27.5,2)];
	return neighbors;
}

function objValIndexOf(obj, search){
	keys = Object.keys(obj);
	for(i = 0; i <keys.length;i++){
		if(round(obj[keys[i]][0], 1) == round(search[0],1) && round(obj[keys[i]][1],1) == round(search[1],1) ){
			return i;
		}
	}
	return -1;
}

function round(num, places){
	a = Math.pow(10, places);
	num*=a
	return Math.round(num)/a
	
}

function shuffle(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

function Enemy(x, y, name, id){
	this.x = x;
	this.y = y;
	this.loc = new Location(this.x, this.y);
	this.name = name;
	this.id = id;
	this.img = document.createElement("img");
	
	this.draw = function(){
		img = this.img;
		$(img).attr("src", name);
		$(img).attr("id" , name+id);
		c = {"position":"absolute", "top":y, "left":x}
		$(img).css(c);
		document.body.appendChild(img);
		
	}
	
	this.move = function(){
		img = this.img;
		spots = getNeighbors(this.loc);
		valid = [];
		Object.keys(spots).forEach(function(i){
			e = spots[i];
			k = Object.keys(hexagons)
			k.forEach(function(f){
				newLoc = new Location(e[0],e[1]);
				if(inObject(hexagons, newLoc) && !inObject(enemies, newLoc)){
					valid.push([newLoc.x, newLoc.y])
				}
			})
		});
		index = Math.floor(Math.random()*Object.keys(valid).length);
		this.x = valid[index][0];
		this.y = valid[index][1];
		this.loc = new Location(this.x, this.y);
		c = {"position":"absolute", "top": this.y , "left": this.x};
		$(img).css(c);
	}
}

function addEnemies(){
	names = ["Assets/EvilLoop.gif", "Assets/SkullLoop.gif", "Assets/SlimeLoop.gif", "Assets/ActualEvilLoop.gif"];
	for(i = 0; i < numenemies; i++){

		keys = Object.keys(hexagons);
		randindex = Math.floor(Math.random()*keys.length);
		while(hexagons[randindex].loc.equals(playerLoc)){
			randindex = Math.floor(Math.random()*keys.length);
		}
		x = hexagons[keys[randindex]].loc.x;
		y = hexagons[keys[randindex]].loc.y;
		enemies[i] = new Enemy(x,y, names[Math.floor(Math.random()*names.length)], i);
		enemies[i].draw();
	}
}

function createRandom(prob){
	hexagons[0].branch(6);
	for(i = 0; i < Object.keys(hexagons).length; i++){
		if(Math.random()*100 <= prob){
			index = Math.floor(Math.random()*Object.keys(hexagons).length);
			if(hexagons[index].numNeighbors() > 2){
				index = Math.floor(Math.random()*Object.keys(hexagons).length);
			}
			hexagons[index].branch(1);
			prob -= 1.2;
		}
	}
}

$(document).ready(function(){
	x = 640
	y = 220
	createHexagon(x, y);
	a = getNeighbors(x,y);
	createRandom(100);
	drawWalls(hexagons);

	add_player(640, 220);
	
	numenemies = Math.floor(numcoords/25) + 2;
	addEnemies();
	setInterval(function(){
		enemies.forEach(function(e){
			e.move()
		})
	}, 1000);
});
$(document).keydown(function (e) {
	if(canKey){
		canKey = false;
		if (e.keyCode == 81) { //q
			move_player(-1, -1);
		} 
		if (e.keyCode == 69) { //e
			move_player(1, -1); 
		}
		if (e.keyCode == 87) { //w
			move_player(0, -2); 
		}
		if (e.keyCode == 83) { //s
			move_player(0, 2); 
		}
		if (e.keyCode == 65) {  //a
			move_player(-1, 1);
		} 
		if (e.keyCode == 68) { //d 
			move_player(1, 1); 
		}
	}
});

$(document).keyup(function(){
	canKey = true;
})