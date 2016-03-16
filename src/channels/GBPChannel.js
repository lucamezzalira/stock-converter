import BaseChannel from "./BaseChannel";

class GBPChannel extends BaseChannel{
	constructor(){
		super("£", 1, 0.65);
	}
}

export default GBPChannel;