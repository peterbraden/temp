
MAP_SIZE = 50;
CSIZE = 900;

/* Based on the formulae:
 * xS = (xW-zW)cos(a)s
 * yS = ((xW+zW)sin(a)-yW)s 
 */
var get_coords = function(x, y, z, s){
	return [(x-z) * 0.8944 *s, ((x+z) * 0.4472 - y)*s]
}

var drawHeightField = function(canv,plotf){
	var midx = CSIZE/2;
	var midy = CSIZE/4;

	var inset = (canv.width - CSIZE)/2;
	var top = canv.height - CSIZE/2 - inset;
	//Draw grid
	var ctx = canv.getContext('2d');
	ctx.fillStyle = "#222";
	tile_size = Math.sqrt(0.375) * CSIZE;
/*
	ctx.beginPath();  
	ctx.moveTo(midx, top + midy*2);  
	ctx.lineTo(CSIZE, top +midy);  
	ctx.lineTo(midx, top);
	ctx.lineTo(0, top + midy)
	ctx.closePath();  
	ctx.stroke();
*/
	for (var i = 0; i<MAP_SIZE; i++){
		for(var j = 0; j<MAP_SIZE; j++){
			var c = get_coords(i, 0, j, tile_size/MAP_SIZE);
			plotf([inset + midx + c[0], top + c[1]],  Math.sqrt(5) * ( tile_size/MAP_SIZE));
		}
	}

}	






$(function(){
	
	var canv = $("#isocanv")[0];
	var ctx = canv.getContext('2d');
	ctx.fillStyle = "#eee";
	ctx.fillRect (0, 0, screen.width, screen.height);

	var point = function(c, s){
		var g = $('#grass')[0];
		var t = $('#tree')[0];
		var t2 = $('#tree2')[0];
		var r = $('#rock')[0];
			
		var x = Math.random() > 0.95 ? t : Math.random() > 0.95 ? Math.random() >0.5 ? r : t2 : g;
		ctx.drawImage(x, c[0]-s/2, c[1] - s* x.height/x.width , s,s * x.height/x.width);
		ctx.fillRect(c[0], c[1], 1, 1);	
	}

	drawHeightField(canv, point);
});



