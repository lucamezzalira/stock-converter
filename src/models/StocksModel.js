import csp from "csp";

class StocksModel{
	constructor(ch){
		this.channel = ch;
		this.stocks = [
			{id: "AAPL", value: 111.04},
			{id: "GOOG", value: 662.20},
			{id: "AMZN", value: 570.76}
		];
		
		this.generateRandomStockValue();
		setInterval(this.generateRandomStockValue.bind(this), 5000);
	}

	generateRandomStockValue(){
		let tmpArr = this.stocks;
		
		this.stocks = tmpArr.map((stock) => {
			let lowerValue = stock.value - (Math.random() + 2);
			let higherValue = stock.value + (Math.random() + 4);
			let tmpValue = ~~(Math.random() * (higherValue - lowerValue + 1)) + lowerValue;
			stock.value = tmpValue.toFixed(2);
			return stock;
		});
	
		csp.operations.onto(this.channel, this.stocks, true);
	}
}

export default StocksModel;