import BaseChannel from "./BaseChannel";

class EURChannel extends BaseChannel{
	constructor(){
		super("€", 1, 0.88);
	}
}

export default EURChannel;