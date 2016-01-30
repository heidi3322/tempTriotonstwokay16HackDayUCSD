var coordinates = {}
var numcoords = 0


function createHexagon(x, y){
	img = document.createElement("img");
	$(img).attr("src", "hexagon.png");
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
		if(x >= 64 && y >= 55 && x <= 832 && y <= 495 && objValIndexOf(coordinates,[x,y]) == -1){
			valid[counter++] = obj[e]
		}
	});
	return valid;
}

function add_player(x,y)
{
	var img = document.createElement("img");
	img.attr = ("src","player.png");
	c = {"position":"absolute", "top":y, "left":x};
	img.css = c;
	coordinates[[x,y]] = [x,y];
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

function createRandom(x, y, prob){
	neighbors = filter(getNeighbors(x,y))
	console.log(neighbors);
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
				if(Math.random()*100 <= prob -20){
					fillarray[counter++] = [x,y];
				}
				/*newList = filter(getNeighbors(x,y));
				newKey = Object.keys(newList);
				probtwo =  80;
				newKey.forEach(function(f){
					if(Math.random()*100 <= probtwo){
						createHexagon(newList[f][0],newList[f][1]);
						probtwo -=25;
					}
				});*/
			}
		});
		for(i = 0; i < fillarray.length; i++){
			createRandom(fillarray[i][0], fillarray[i][1], prob - 20);
		}
	}
}

$(document).ready(function(){
	x = 384
	y = 220
	createHexagon(384, 220);
	createRandom(x, y, 120);
	
	
	
});