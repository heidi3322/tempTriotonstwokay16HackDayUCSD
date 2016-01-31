var coordinates = {}
var numcoords = 0
var charCoords= {}


function createHexagon(x, y){
	img = document.createElement("img");
	$(img).attr("src", "Hexagon2.png");
	c = {"position":"absolute", "top":y, "left":x}
	$(img).css(c);
	coordinates[[x, y]] = [x, y];
	document.body.appendChild(img);
	
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

function add_player(x,y)
{
	var img = document.createElement("img");
	$(img).attr("src","CatSlime.gif");
	img.src = "CatSlime.gif"+"?a="+Math.random();
	c = {"position":"absolute", "top":y-10, "left":x};
	$(img).css(c);
<<<<<<< HEAD
	charCoords[[x,y]] = [x,y];
=======
	$(img).attr("id", "player");
	coordinates[[x,y]] = [x,y];
>>>>>>> refs/remotes/origin/master
	document.body.appendChild(img);
}

function getNeighbors(x, y){
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
		if(obj[keys[i]][0] == search[0] && obj[keys[i]][1] == search[1] ){
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

function randomBranch(x, y, prob){
	neighbors = filter(getNeighbors(x,y))
	keys = Object.keys(neighbors);
	if(keys.length > 0){
		counter = 0;
		fillarray = [];
		emptycounter = 0;
		emptyarray = [];
		keys.forEach(function(e){
			if(Math.random()*100 <= prob){
				x = neighbors[e][0];
				y = neighbors[e][1];
				createHexagon(x,y);
			}
		});
	}
	
}

function createRandom(x, y, prob){
	neighbors = filter(getNeighbors(x,y))
	keys = Object.keys(neighbors);
	if(keys.length > 0){
		counter = 0;
		fillarray = [];
		emptycounter = 0;
		emptyarray = [];
		keys.forEach(function(e){
			if(Math.random()*100 <= prob){
				x = neighbors[e][0];
				y = neighbors[e][1];
				createHexagon(x,y);
				if(Math.random()*100 <= prob -2){
					fillarray[counter++] = [x,y];
				}
			}
		});
		shuffle(fillarray);
		console.log("filled:" + fillarray);
		for(i = 0; i < fillarray.length; i++){
			createRandom(fillarray[i][0], fillarray[i][1], prob - 1);
		}	
	}
}

$(document).ready(function(){
	x = 640
	y = 220
	createHexagon(x, y);
	add_player(x,y);
	a = getNeighbors(x,y);
	createRandom(a[0][0], a[0][1], 100);
	createRandom(a[1][0], a[1][1], 100);
	createRandom(a[2][0], a[2][1], 100);
	createRandom(a[3][0], a[3][1], 100);
	createRandom(a[4][0], a[4][1], 100);
	createRandom(a[5][0], a[5][1], 100);

	
	
});