
MAP_SIZE = 50;
CSIZE = 900;

/* Based on the formulae:
 * xS = (xW-zW)cos(a)s
 * yS = ((xW+zW)sin(a)-yW)s 
 */
var get_coords = function(x, y, z, s){
	return [(x-z) * 0.8944 *s, ((x+z) * 0.4472 - y)*s]
}

var drawHeightField = function(canv, plotf, heightf){
	var midx = CSIZE/2;
	var midy = CSIZE/4;

	var inset = (canv.width - CSIZE)/2; //Allows border round edge
	var top = canv.height - CSIZE/2 - inset; //border on top

	var ctx = canv.getContext('2d');
	ctx.fillStyle = "#222";
	var tile_size = Math.sqrt(0.375) * CSIZE;
	
	for (var i = 0; i<MAP_SIZE; i++){
		for(var j = 0; j<MAP_SIZE; j++){
			var c = get_coords(i, heightf(i,j), j, tile_size/MAP_SIZE);
			plotf(i, j, [inset + midx + c[0], top + c[1]],  Math.sqrt(5) * ( tile_size/MAP_SIZE));
		}
	}

}	




var generateMap = function(){
	map = new Array(MAP_SIZE*MAP_SIZE);
	for (var i = 0; i<map.length; i++){
		var x = Math.random() > 0.95 ?
			'tree' : Math.random() > 0.95 ?
				Math.random() >0.5 ? 'rock' 
				: 'tree2' 
			: 'grass';
		map[i] = {
			height:0,
			terrain:x,
			open:true,
		}
	}


	return map;
}




$(function(){
	
	var canv = $("#isocanv")[0];
	var ctx = canv.getContext('2d');
	ctx.fillStyle = "#eee";
	ctx.fillRect (0, 0, screen.width, screen.height);

	var MAP = generateMap();
		
	var point = function(x, y, c, s){
		var x = $('#' + MAP[parseInt(x + y*MAP_SIZE)]['terrain'])[0];		
		ctx.drawImage(
			x,
			c[0]-s/2, c[1] - s* x.height/x.width,
			s, s * x.height/x.width
			);
		//ctx.fillRect(c[0], c[1], 1, 1);	
	}

	var heightf = function(x, y){return MAP[parseInt(x + y*MAP_SIZE)]['height'];}	
	
	drawHeightField(canv, point, heightf);
});



