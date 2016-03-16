import csp from "csp";
import transducers from "transducers.js";

let channel = Symbol();

class BaseChannel{
	constructor(currency, buf, currValue = 1){
		let xform = transducers.compose(
          transducers.map(item => {return {
			  id: item.id,
			  currency: currency,
			  value: `${currency}${item.value}`,
			  inString: `${item.id} ${currency}${item.value}`
		  }})
    	);
		
		this[channel] = csp.chan(1, xform);
	}
	
	getChannel(){
		return this[channel];
	}
}

export default BaseChannel;