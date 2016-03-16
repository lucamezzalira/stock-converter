import csp from "csp";

class Stock{
	constructor(ch){
		
		let container = document.createElement("div");
		document.body.appendChild(container);
		
		csp.go(function*(){
			var value = yield ch;
			var c = 0;
			var str = "";
			while (value !== csp.CLOSED) {	
				if(c === 3){
					c = 0;
					container.innerHTML = str;
					str = `${value.inString} &nbsp;`;
				} else {
					str += `${value.inString} &nbsp;`;
				}
				c++;
				value = yield ch;
			}
			console.log("Channel closed!");
		});
	}
}

export default Stock;