import csp from "csp";
import StocksModel from "models/StocksModel";
import Stock from "views/Stock";
import GBPChannel from "channels/GBPChannel";
import EURChannel from "channels/EURChannel";

class Context{
	constructor(){}
	
	startup(){
		//this._wire(Stock, EURChannel, StocksModel);
		this._wire(Stock, GBPChannel, StocksModel);
	}
	
	_wire(View, Channel, Model){
		let ch = new Channel();
		let v = new View(ch.getChannel());
		let m = new Model(ch.getChannel());
		
		return {channel: ch.getChannel(), view: v, model: m};
	}
}

export default Context;