"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = (function () {
	function App() {
		_classCallCheck(this, App);
	}

	App.prototype.init = function init() {
		var c = new Context();
		c.startup();
	};

	return App;
})();
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Context = (function () {
	function Context() {
		_classCallCheck(this, Context);
	}

	Context.prototype.startup = function startup() {
		//this._wire(Stock, EURChannel, StocksModel);
		this._wire(Stock, EURChannel, StocksModel);
	};

	Context.prototype._wire = function _wire(View, Channel, Model) {
		var ch = new Channel();
		var v = new View(ch.getChannel());
		var m = new Model(ch.getChannel());

		return { channel: ch.getChannel(), view: v, model: m };
	};

	return Context;
})();
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var channel = Symbol();

var BaseChannel = (function () {
	function BaseChannel(currency, buf) {
		var currValue = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];

		_classCallCheck(this, BaseChannel);

		var xform = transducers.compose(transducers.map(function (item) {
			return {
				id: item.id,
				currency: currency,
				value: "" + currency + item.value,
				inString: item.id + " " + currency + item.value
			};
		}));

		this[channel] = csp.chan(1, xform);
	}

	BaseChannel.prototype.getChannel = function getChannel() {
		return this[channel];
	};

	return BaseChannel;
})();
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EURChannel = (function (_BaseChannel) {
	_inherits(EURChannel, _BaseChannel);

	function EURChannel() {
		_classCallCheck(this, EURChannel);

		_BaseChannel.call(this, "€", 1, 0.88);
	}

	return EURChannel;
})(BaseChannel);
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GBPChannel = (function (_BaseChannel) {
	_inherits(GBPChannel, _BaseChannel);

	function GBPChannel() {
		_classCallCheck(this, GBPChannel);

		_BaseChannel.call(this, "£", 1, 0.65);
	}

	return GBPChannel;
})(BaseChannel);
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StocksModel = (function () {
	function StocksModel(ch) {
		_classCallCheck(this, StocksModel);

		this.channel = ch;
		this.stocks = [{ id: "AAPL", value: 111.04 }, { id: "GOOG", value: 662.20 }, { id: "AMZN", value: 570.76 }];

		this.generateRandomStockValue();
		setInterval(this.generateRandomStockValue.bind(this), 5000);
	}

	StocksModel.prototype.generateRandomStockValue = function generateRandomStockValue() {
		var tmpArr = this.stocks;

		this.stocks = tmpArr.map(function (stock) {
			var lowerValue = stock.value - (Math.random() + 2);
			var higherValue = stock.value + (Math.random() + 4);
			var tmpValue = ~ ~(Math.random() * (higherValue - lowerValue + 1)) + lowerValue;
			stock.value = tmpValue.toFixed(2);
			return stock;
		});

		csp.operations.onto(this.channel, this.stocks, true);
	};

	return StocksModel;
})();
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Stock = function Stock(ch) {
	_classCallCheck(this, Stock);

	var container = document.createElement("div");
	document.body.appendChild(container);

	csp.go(regeneratorRuntime.mark(function callee$1$0() {
		var value, c, str;
		return regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
			while (1) switch (context$2$0.prev = context$2$0.next) {
				case 0:
					context$2$0.next = 2;
					return ch;

				case 2:
					value = context$2$0.sent;
					c = 0;
					str = "";

				case 5:
					if (!(value !== csp.CLOSED)) {
						context$2$0.next = 13;
						break;
					}

					if (c === 3) {
						c = 0;
						container.innerHTML = str;
						str = value.inString + " &nbsp;";
					} else {
						str += value.inString + " &nbsp;";
					}
					c++;
					context$2$0.next = 10;
					return ch;

				case 10:
					value = context$2$0.sent;
					context$2$0.next = 5;
					break;

				case 13:
					console.log("Channel closed!");

				case 14:
				case "end":
					return context$2$0.stop();
			}
		}, callee$1$0, this);
	}));
};
