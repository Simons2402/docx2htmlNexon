'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _converter = require('./converter');

var _converter2 = _interopRequireDefault(_converter);

var _converter3 = require('./style/converter');

var _converter4 = _interopRequireDefault(_converter3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Helper to check if value is a function
var isFunction = function isFunction(obj) {
	return typeof obj === 'function';
};

var AZ = /[A-Z]/g,
    r = function r(a) {
	return '-' + a.toLowerCase();
},
    clozed = /Z$/gi;

function asStyle(x) {
	var a = [];
	for (var i in x) {
		!isFunction(x[i]) && a.push(i.replace(AZ, r) + ':' + x[i]);
	}return a.join(';');
}

var Shape = function (_Converter) {
	(0, _inherits3.default)(Shape, _Converter);

	function Shape() {
		(0, _classCallCheck3.default)(this, Shape);
		return (0, _possibleConstructorReturn3.default)(this, (Shape.__proto__ || (0, _getPrototypeOf2.default)(Shape)).apply(this, arguments));
	}

	(0, _createClass3.default)(Shape, [{
		key: 'convertStyle',
		value: function convertStyle(el) {
			el.style.position = 'absolute';
			el.style.overflow = 'hidden';

			var pathStyle = { stroke: 'black', strokeWidth: 2, fillOpacity: 0 },
			    bgStyle = this.makeBackgroundStyle();
			(0, _get3.default)(Shape.prototype.__proto__ || (0, _getPrototypeOf2.default)(Shape.prototype), 'convertStyle', this).apply(this, arguments);
			var style = this.wordModel.getDirectStyle(),
			    propConverter = new this.constructor.Properties(el.style, this, pathStyle, bgStyle);
			style && style.parse([propConverter]);
			if (this.path) {
				if (el.style.background) pathStyle.fillOpacity = 0;
				var bgImage = el.style.background,
				    grad = pathStyle.grad;
				delete pathStyle.grad;

				var svg = '<svg xmlns="http://www.w3.org/2000/svg">' + (grad ? '<defs>' + grad + '</defs>' : '') + this.path + ' style="' + asStyle(pathStyle) + '" /></svg>';
				var svgImage = 'url(' + this.doc.asImageURL(svg) + ')';
				bgStyle.backgroundImage = svgImage;
				bgStyle.backgroundSize = '100% 100%';
			}
		}
	}, {
		key: 'makeBackgroundStyle',
		value: function makeBackgroundStyle() {
			//make background el to hold svg background
			var id = 'shape' + this.doc.uid();
			this.content.setAttribute('id', id);
			var style = this.doc.createStyle('#' + id + '::before');
			style.content = '""';
			style.zIndex = -1;
			style.position = 'absolute';
			style.width = '100%';
			style.height = '100%';
			style.left = 0;
			style.top = 0;
			return style;
		}
	}, {
		key: 'tag',
		get: function get() {
			return 'div';
		}
	}]);
	return Shape;
}(_converter2.default);

exports.default = Shape;


Shape.Properties = function (_Style$Properties) {
	(0, _inherits3.default)(Properties, _Style$Properties);

	function Properties(style, parent, pathStyle, bgStyle) {
		(0, _classCallCheck3.default)(this, Properties);

		var _this2 = (0, _possibleConstructorReturn3.default)(this, (Properties.__proto__ || (0, _getPrototypeOf2.default)(Properties)).apply(this, arguments));

		_this2.pathStyle = pathStyle;
		_this2.bgStyle = bgStyle;
		return _this2;
	}

	(0, _createClass3.default)(Properties, [{
		key: 'xfrm',
		value: function xfrm(x) {
			this.style.width = x.width + 'px';
			this.style.height = x.height + 'px';
			x.x && (this.style.left = x.x + 'px');
			x.y && (this.style.top = x.y + 'px');

			x.rotation && this.styless('transform', 'rotate(' + x.rotation + 'deg)');

			this.world = x;
		}
	}, {
		key: 'ln',
		value: function ln(x) {
			x.color && (this.pathStyle.stroke = x.color);
			x.width != undefined && (this.pathStyle.strokeWidth = x.width + 'px');

			switch (x.cap) {
				case 'rnd':
					this.pathStyle.strokeLinecap = 'round';
					break;
				default:

			}

			if (x.dash) {
				switch (this.lineStyle(x.dash)) {
					case 'dotted':
						this.pathStyle.strokeDasharray = "5,5";
						break;
						break;
					case 'dashed':
						this.pathStyle.strokeDasharray = "10,10";
						break;
				}
			}
		}
	}, {
		key: 'solidFill',
		value: function solidFill(x) {
			this.pathStyle.fill = x;
			this.pathStyle.fillOpacity = 1;
		}
	}, {
		key: 'gradFill',
		value: function gradFill(x) {
			if (this.style.backgroundImage) return;

			var grad = [];
			switch (x.path) {
				case 'linear':
					grad.push('<linearGradient id="grad"');
					switch (x.angel) {
						case 0:
							grad.push('x1="0%" y1="0%" x2="100%" y2="0%">');
							break;
						case 90:
							grad.push('x1="0%" y1="0%" x2="0%" y2="100%">');
							break;
						case 180:
							grad.push('x1="100%" y1="0%" x2="0%" y2="0%">');
							break;
						case 270:
							grad.push('x1="0%" y1="100%" x2="0%" y2="0%">');
							break;
					}
					grad.push('</linearGradient>');
					break;
				case 'circle':
					grad.push('<radialGradient  id="grad"');
					grad.push('cx="50%" cy="50%" r="50%" fx="50%" fy="50%">');
					grad.push('</radialGradient>');
					break;
			}
			var end = grad.pop();
			for (var i = 0, len = x.stops.length, a; i < len; i++) {
				grad.push('<stop offset="' + (a = x.stops[i]).position + '%" style="stop-opacity:1;stop-color:' + a.color + '"/>');
			}grad.push(end);

			this.pathStyle.grad = grad.join(' ');
			this.pathStyle.fill = 'url(#grad)';
			this.pathStyle.fillOpacity = 1;
		}
	}, {
		key: 'blipFill',
		value: function blipFill(x) {
			this.style.background = 'url(' + this.doc.asImageURL(x) + ')';
			this.style.backgroundSize = '100% 100%';
			this.noFill();
		}
	}, {
		key: 'noFill',
		value: function noFill(x) {
			this.pathStyle.fillOpacity = 0;
		}
	}, {
		key: 'lnRef',
		value: function lnRef(x) {
			this.ln(x);
		}
	}, {
		key: 'fillRef',
		value: function fillRef(x) {
			if (this.style.backgroundImage) return;

			if (typeof x.path != 'undefined') return this.gradFill(x);

			if (typeof x == 'string') this.pathStyle.fill = x;else if (typeof x.color != 'undefined') this.pathStyle.fill = x.color;else return;
			this.pathStyle.fillOpacity = 1;
		}
	}, {
		key: 'fontRef',
		value: function fontRef(x) {
			x.color && (this.style.color = x.color);
			x.family && (this.style.fontFamily = x.family);
		}
	}, {
		key: 'path',
		value: function path(x, t) {
			switch (x.shape) {
				case 'line':
					this.parent.path = '<line x1="0" y1="0" x2="' + this.world.width + 'pt" y2="' + this.world.height + 'pt"';
					break;
				case 'rect':
					this.parent.path = '<rect width="' + this.world.width + 'pt" height="' + this.world.height + 'pt"';
					break;
				case 'roundRect':
					this.parent.path = '<rect rx="' + (t = Math.min(this.world.width, this.world.height) / 12) + 'pt" ry="' + t + 'pt" width="' + this.world.width + 'pt" height="' + this.world.height + 'pt"';
					break;
				case 'ellipse':
					this.parent.path = '<ellipse cx="' + this.world.width / 2 + 'pt" cy="' + this.world.height / 2 + 'pt" rx="' + this.world.width / 2 + 'pt" ry="' + this.world.height / 2 + 'pt"';
					break;
				case 'path':
					this.parent.path = '<path d="' + x.path + '"';
					if (!clozed.test(x.path)) this.noFill();
					break;
			}
		}
	}, {
		key: 'spAutoFit',
		value: function spAutoFit() {
			this.style.height = 'auto';
		}
	}, {
		key: 'lIns',
		value: function lIns(x) {
			this.style.paddingLeft = x + 'px';
		}
	}, {
		key: 'tIns',
		value: function tIns(x) {
			this.style.paddingTop = x + 'px';
		}
	}, {
		key: 'rIns',
		value: function rIns(x) {
			this.style.paddingRight = x + 'px';
		}
	}, {
		key: 'bIns',
		value: function bIns(x) {
			this.style.paddingBottom = x + 'px';
		}
	}, {
		key: 'anchor',
		value: function anchor(x) {
			this.style.display = 'table-cell';
			this.style.verticalAlign = x;
		}
	}, {
		key: 'vert',
		value: function vert(x) {
			this.style.height = this.world.width + 'px';
			this.style.width = this.world.height + 'px';
			var delta = (this.world.width - this.world.height) / 2;

			this.bgStyle.height = this.world.height + 'px';
			this.bgStyle.width = this.world.width + 'px';
			this.styless('transform', 'translate(-' + delta + 'pt,' + delta + 'pt) rotate(-' + x + 'deg) ', this.bgStyle);

			this.styless('transform', 'translate(' + delta + 'pt,-' + delta + 'pt) rotate(' + (x + this.world.rotation || 0) + 'deg)');
		}
	}]);
	return Properties;
}(_converter4.default.Properties);
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvc2hhcGUuanMiXSwibmFtZXMiOlsiaXNGdW5jdGlvbiIsIm9iaiIsIkFaIiwiciIsImEiLCJ0b0xvd2VyQ2FzZSIsImNsb3plZCIsImFzU3R5bGUiLCJ4IiwiaSIsInB1c2giLCJyZXBsYWNlIiwiam9pbiIsIlNoYXBlIiwiZWwiLCJzdHlsZSIsInBvc2l0aW9uIiwib3ZlcmZsb3ciLCJwYXRoU3R5bGUiLCJzdHJva2UiLCJzdHJva2VXaWR0aCIsImZpbGxPcGFjaXR5IiwiYmdTdHlsZSIsIm1ha2VCYWNrZ3JvdW5kU3R5bGUiLCJhcmd1bWVudHMiLCJ3b3JkTW9kZWwiLCJnZXREaXJlY3RTdHlsZSIsInByb3BDb252ZXJ0ZXIiLCJjb25zdHJ1Y3RvciIsIlByb3BlcnRpZXMiLCJwYXJzZSIsInBhdGgiLCJiYWNrZ3JvdW5kIiwiYmdJbWFnZSIsImdyYWQiLCJzdmciLCJzdmdJbWFnZSIsImRvYyIsImFzSW1hZ2VVUkwiLCJiYWNrZ3JvdW5kSW1hZ2UiLCJiYWNrZ3JvdW5kU2l6ZSIsImlkIiwidWlkIiwiY29udGVudCIsInNldEF0dHJpYnV0ZSIsImNyZWF0ZVN0eWxlIiwiekluZGV4Iiwid2lkdGgiLCJoZWlnaHQiLCJsZWZ0IiwidG9wIiwiQ29udmVydGVyIiwicGFyZW50IiwieSIsInJvdGF0aW9uIiwic3R5bGVzcyIsIndvcmxkIiwiY29sb3IiLCJ1bmRlZmluZWQiLCJjYXAiLCJzdHJva2VMaW5lY2FwIiwiZGFzaCIsImxpbmVTdHlsZSIsInN0cm9rZURhc2hhcnJheSIsImZpbGwiLCJhbmdlbCIsImVuZCIsInBvcCIsImxlbiIsInN0b3BzIiwibGVuZ3RoIiwibm9GaWxsIiwibG4iLCJncmFkRmlsbCIsImZhbWlseSIsImZvbnRGYW1pbHkiLCJ0Iiwic2hhcGUiLCJNYXRoIiwibWluIiwidGVzdCIsInBhZGRpbmdMZWZ0IiwicGFkZGluZ1RvcCIsInBhZGRpbmdSaWdodCIsInBhZGRpbmdCb3R0b20iLCJk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aUQsT0FBMUUsRUFBbUYsS0FBS2MsT0FBeEY7O0FBRUEsUUFBS2lDLE9BQUwsQ0FBYSxXQUFiLEVBQXlCLGVBQWFnQyxLQUFiLEdBQW1CLE1BQW5CLEdBQTBCQSxLQUExQixHQUFnQyxhQUFoQyxJQUErQy9FLElBQUUsS0FBS2dELEtBQUwsQ0FBV0YsUUFBYixJQUF1QixDQUF0RSxJQUF5RSxNQUFsRztBQUNBO0FBcEtGO0FBQUE7QUFBQSxFQUEwQ2tDLG9CQUFNM0QsVUFBaEQiLCJmaWxlIjoic2hhcGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29udmVydGVyIGZyb20gJy4vY29udmVydGVyJ1xyXG5pbXBvcnQgU3R5bGUgZnJvbSAnLi9zdHlsZS9jb252ZXJ0ZXInXHJcblxyXG4vLyBIZWxwZXIgdG8gY2hlY2sgaWYgdmFsdWUgaXMgYSBmdW5jdGlvblxyXG5jb25zdCBpc0Z1bmN0aW9uID0gKG9iaikgPT4gdHlwZW9mIG9iaiA9PT0gJ2Z1bmN0aW9uJ1xyXG5cclxudmFyIEFaPS9bQS1aXS9nLCBcclxuXHRyPWZ1bmN0aW9uKGEpe3JldHVybiAnLScrYS50b0xvd2VyQ2FzZSgpfSxcclxuXHRjbG96ZWQ9L1okL2dpO1xyXG5cdFxyXG5mdW5jdGlvbiBhc1N0eWxlKHgpe1xyXG5cdHZhciBhPVtdXHJcblx0Zm9yKHZhciBpIGluIHgpXHJcblx0XHQhaXNGdW5jdGlvbih4W2ldKSAmJiBhLnB1c2goaS5yZXBsYWNlKEFaLHIpKyc6Jyt4W2ldKVxyXG5cdHJldHVybiBhLmpvaW4oJzsnKVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaGFwZSBleHRlbmRzIENvbnZlcnRlcntcclxuXHRnZXQgdGFnKCl7cmV0dXJuICdkaXYnfVxyXG5cdFxyXG5cdGNvbnZlcnRTdHlsZShlbCl7XHJcblx0XHRlbC5zdHlsZS5wb3NpdGlvbj0nYWJzb2x1dGUnXHJcblx0XHRlbC5zdHlsZS5vdmVyZmxvdz0naGlkZGVuJ1xyXG5cclxuXHRcdHZhciBwYXRoU3R5bGU9e3N0cm9rZTonYmxhY2snLCBzdHJva2VXaWR0aDoyLCBmaWxsT3BhY2l0eTowfSxcclxuXHRcdFx0YmdTdHlsZT10aGlzLm1ha2VCYWNrZ3JvdW5kU3R5bGUoKTtcclxuXHRcdHN1cGVyLmNvbnZlcnRTdHlsZSguLi5hcmd1bWVudHMpXHJcblx0XHR2YXIgc3R5bGU9dGhpcy53b3JkTW9kZWwuZ2V0RGlyZWN0U3R5bGUoKSxcclxuXHRcdFx0cHJvcENvbnZlcnRlcj1uZXcgdGhpcy5jb25zdHJ1Y3Rvci5Qcm9wZXJ0aWVzKGVsLnN0eWxlLHRoaXMsIHBhdGhTdHlsZSwgYmdTdHlsZSk7XHJcblx0XHRzdHlsZSAmJiBzdHlsZS5wYXJzZShbcHJvcENvbnZlcnRlcl0pXHJcblx0XHRpZih0aGlzLnBhdGgpe1xyXG5cdFx0XHRpZihlbC5zdHlsZS5iYWNrZ3JvdW5kKVxyXG5cdFx0XHRcdHBhdGhTdHlsZS5maWxsT3BhY2l0eT0wXHJcblx0XHRcdHZhciBiZ0ltYWdlPWVsLnN0eWxlLmJhY2tncm91bmQsXHJcblx0XHRcdFx0Z3JhZD1wYXRoU3R5bGUuZ3JhZDtcclxuXHRcdFx0ZGVsZXRlIHBhdGhTdHlsZS5ncmFkO1x0XHRcdFx0XHJcblx0XHRcdFxyXG5cdFx0XHR2YXIgc3ZnPSc8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj4nXHJcblx0XHRcdFx0XHQrKGdyYWQgPyAnPGRlZnM+JytncmFkKyc8L2RlZnM+JyA6ICcnKVxyXG5cdFx0XHRcdFx0K3RoaXMucGF0aCsnIHN0eWxlPVwiJythc1N0eWxlKHBhdGhTdHlsZSkrJ1wiIC8+PC9zdmc+JztcclxuXHRcdFx0dmFyIHN2Z0ltYWdlPSd1cmwoJyt0aGlzLmRvYy5hc0ltYWdlVVJMKHN2ZykrJyknO1xyXG5cdFx0XHRiZ1N0eWxlLmJhY2tncm91bmRJbWFnZT1zdmdJbWFnZVxyXG5cdFx0XHRiZ1N0eWxlLmJhY2tncm91bmRTaXplPScxMDAlIDEwMCUnXHJcblx0XHR9XHJcblx0fVxyXG5cdG1ha2VCYWNrZ3JvdW5kU3R5bGUoKXtcclxuXHRcdC8vbWFrZSBiYWNrZ3JvdW5kIGVsIHRvIGhvbGQgc3ZnIGJhY2tncm91bmRcclxuXHRcdHZhciBpZD0nc2hhcGUnK3RoaXMuZG9jLnVpZCgpXHJcblx0XHR0aGlzLmNvbnRlbnQuc2V0QXR0cmlidXRlKCdpZCcsaWQpXHJcblx0XHR2YXIgc3R5bGU9dGhpcy5kb2MuY3JlYXRlU3R5bGUoJyMnK2lkKyc6OmJlZm9yZScpXHJcblx0XHRzdHlsZS5jb250ZW50PSdcIlwiJ1xyXG5cdFx0c3R5bGUuekluZGV4PS0xXHJcblx0XHRzdHlsZS5wb3NpdGlvbj0nYWJzb2x1dGUnXHJcblx0XHRzdHlsZS53aWR0aD0nMTAwJSdcclxuXHRcdHN0eWxlLmhlaWdodD0nMTAwJSdcclxuXHRcdHN0eWxlLmxlZnQ9MFxyXG5cdFx0c3R5bGUudG9wPTBcclxuXHRcdHJldHVybiBzdHlsZVxyXG5cdH1cclxufVxyXG5cclxuU2hhcGUuUHJvcGVydGllcz1jbGFzcyBQcm9wZXJ0aWVzIGV4dGVuZHMgU3R5bGUuUHJvcGVydGllc3tcclxuXHRjb25zdHJ1Y3RvcihzdHlsZSxwYXJlbnQsIHBhdGhTdHlsZSwgYmdTdHlsZSl7XHJcblx0XHRzdXBlciguLi5hcmd1bWVudHMpXHJcblx0XHR0aGlzLnBhdGhTdHlsZT1wYXRoU3R5bGVcclxuXHRcdHRoaXMuYmdTdHlsZT1iZ1N0eWxlXHJcblx0fVxyXG5cclxuXHR4ZnJtKHgpe1xyXG5cdFx0dGhpcy5zdHlsZS53aWR0aD14LndpZHRoKydweCdcclxuXHRcdHRoaXMuc3R5bGUuaGVpZ2h0PXguaGVpZ2h0KydweCdcclxuXHRcdHgueCAmJiAodGhpcy5zdHlsZS5sZWZ0PXgueCsncHgnKVxyXG5cdFx0eC55ICYmICh0aGlzLnN0eWxlLnRvcD14LnkrJ3B4JylcclxuXHRcdFxyXG5cdFx0eC5yb3RhdGlvbiAmJiB0aGlzLnN0eWxlc3MoJ3RyYW5zZm9ybScsJ3JvdGF0ZSgnK3gucm90YXRpb24rJ2RlZyknKVxyXG5cdFx0XHJcblx0XHR0aGlzLndvcmxkPXhcclxuXHR9XHJcblx0bG4oeCl7XHJcblx0XHR4LmNvbG9yICYmICh0aGlzLnBhdGhTdHlsZS5zdHJva2U9eC5jb2xvcik7XHJcblx0XHR4LndpZHRoIT11bmRlZmluZWQgJiYgKHRoaXMucGF0aFN0eWxlLnN0cm9rZVdpZHRoPXgud2lkdGgrJ3B4Jyk7XHJcblx0XHRcclxuXHRcdHN3aXRjaCh4LmNhcCl7XHJcblx0XHRjYXNlICdybmQnOlxyXG5cdFx0XHR0aGlzLnBhdGhTdHlsZS5zdHJva2VMaW5lY2FwPSdyb3VuZCdcclxuXHRcdFx0YnJlYWtcclxuXHRcdGRlZmF1bHQ6XHJcblx0XHRcdFxyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRpZih4LmRhc2gpe1xyXG5cdFx0XHRzd2l0Y2godGhpcy5saW5lU3R5bGUoeC5kYXNoKSl7XHJcblx0XHRcdGNhc2UgJ2RvdHRlZCc6XHJcblx0XHRcdFx0dGhpcy5wYXRoU3R5bGUuc3Ryb2tlRGFzaGFycmF5PVwiNSw1XCJcclxuXHRcdFx0XHRicmVha1xyXG5cdFx0XHRicmVha1xyXG5cdFx0XHRjYXNlICdkYXNoZWQnOlxyXG5cdFx0XHRcdHRoaXMucGF0aFN0eWxlLnN0cm9rZURhc2hhcnJheT1cIjEwLDEwXCJcclxuXHRcdFx0YnJlYWtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHRzb2xpZEZpbGwoeCl7XHJcblx0XHR0aGlzLnBhdGhTdHlsZS5maWxsPXhcclxuXHRcdHRoaXMucGF0aFN0eWxlLmZpbGxPcGFjaXR5PTFcclxuXHR9XHJcblx0Z3JhZEZpbGwoeCl7XHJcblx0XHRpZih0aGlzLnN0eWxlLmJhY2tncm91bmRJbWFnZSlcclxuXHRcdFx0cmV0dXJuXHJcblx0XHRcdFxyXG5cdFx0dmFyIGdyYWQ9W11cclxuXHRcdHN3aXRjaCh4LnBhdGgpe1xyXG5cdFx0Y2FzZSAnbGluZWFyJzpcclxuXHRcdFx0Z3JhZC5wdXNoKCc8bGluZWFyR3JhZGllbnQgaWQ9XCJncmFkXCInKVxyXG5cdFx0XHRzd2l0Y2goeC5hbmdlbCl7XHJcblx0XHRcdGNhc2UgMDpcclxuXHRcdFx0XHRncmFkLnB1c2goJ3gxPVwiMCVcIiB5MT1cIjAlXCIgeDI9XCIxMDAlXCIgeTI9XCIwJVwiPicpXHJcblx0XHRcdFx0YnJlYWtcclxuXHRcdFx0Y2FzZSA5MDpcclxuXHRcdFx0XHRncmFkLnB1c2goJ3gxPVwiMCVcIiB5MT1cIjAlXCIgeDI9XCIwJVwiIHkyPVwiMTAwJVwiPicpXHJcblx0XHRcdFx0YnJlYWtcclxuXHRcdFx0Y2FzZSAxODA6XHJcblx0XHRcdFx0Z3JhZC5wdXNoKCd4MT1cIjEwMCVcIiB5MT1cIjAlXCIgeDI9XCIwJVwiIHkyPVwiMCVcIj4nKVxyXG5cdFx0XHRcdGJyZWFrXHJcblx0XHRcdGNhc2UgMjcwOlxyXG5cdFx0XHRcdGdyYWQucHVzaCgneDE9XCIwJVwiIHkxPVwiMTAwJVwiIHgyPVwiMCVcIiB5Mj1cIjAlXCI+JylcclxuXHRcdFx0XHRicmVha1xyXG5cdFx0XHR9XHJcblx0XHRcdGdyYWQucHVzaCgnPC9saW5lYXJHcmFkaWVudD4nKVxyXG5cdFx0XHRicmVha1xyXG5cdFx0Y2FzZSAnY2lyY2xlJzpcclxuXHRcdFx0Z3JhZC5wdXNoKCc8cmFkaWFsR3JhZGllbnQgIGlkPVwiZ3JhZFwiJylcclxuXHRcdFx0Z3JhZC5wdXNoKCdjeD1cIjUwJVwiIGN5PVwiNTAlXCIgcj1cIjUwJVwiIGZ4PVwiNTAlXCIgZnk9XCI1MCVcIj4nKVxyXG5cdFx0XHRncmFkLnB1c2goJzwvcmFkaWFsR3JhZGllbnQ+JylcclxuXHRcdFx0YnJlYWtcclxuXHRcdH1cclxuXHRcdHZhciBlbmQ9Z3JhZC5wb3AoKVxyXG5cdFx0Zm9yKHZhciBpPTAsbGVuPXguc3RvcHMubGVuZ3RoLGE7aTxsZW47aSsrKVxyXG5cdFx0XHRncmFkLnB1c2goJzxzdG9wIG9mZnNldD1cIicrKGE9eC5zdG9wc1tpXSkucG9zaXRpb24rJyVcIiBzdHlsZT1cInN0b3Atb3BhY2l0eToxO3N0b3AtY29sb3I6JythLmNvbG9yKydcIi8+JylcclxuXHRcdGdyYWQucHVzaChlbmQpXHJcblx0XHRcclxuXHRcdHRoaXMucGF0aFN0eWxlLmdyYWQ9Z3JhZC5qb2luKCcgJylcclxuXHRcdHRoaXMucGF0aFN0eWxlLmZpbGw9J3VybCgjZ3JhZCknXHJcblx0XHR0aGlzLnBhdGhTdHlsZS5maWxsT3BhY2l0eT0xXHJcblx0fVxyXG5cdGJsaXBGaWxsKHgpe1xyXG5cdFx0dGhpcy5zdHlsZS5iYWNrZ3JvdW5kPSd1cmwoJyt0aGlzLmRvYy5hc0ltYWdlVVJMKHgpKycpJ1xyXG5cdFx0dGhpcy5zdHlsZS5iYWNrZ3JvdW5kU2l6ZT0nMTAwJSAxMDAlJ1xyXG5cdFx0dGhpcy5ub0ZpbGwoKVxyXG5cdH1cclxuXHRub0ZpbGwoeCl7XHJcblx0XHR0aGlzLnBhdGhTdHlsZS5maWxsT3BhY2l0eT0wXHJcblx0fVxyXG5cdGxuUmVmKHgpe1xyXG5cdFx0dGhpcy5sbih4KVxyXG5cdH1cclxuXHRmaWxsUmVmKHgpe1xyXG5cdFx0aWYodGhpcy5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UpXHJcblx0XHRcdHJldHVyblxyXG5cdFx0XHJcblx0XHRpZih0eXBlb2YoeC5wYXRoKSE9J3VuZGVmaW5lZCcpXHJcblx0XHRcdHJldHVybiB0aGlzLmdyYWRGaWxsKHgpO1xyXG5cdFx0XHRcclxuXHRcdGlmKHR5cGVvZih4KT09J3N0cmluZycpXHJcblx0XHRcdHRoaXMucGF0aFN0eWxlLmZpbGw9eFxyXG5cdFx0ZWxzZSBpZih0eXBlb2YoeC5jb2xvcikhPSd1bmRlZmluZWQnKVxyXG5cdFx0XHR0aGlzLnBhdGhTdHlsZS5maWxsPXguY29sb3JcclxuXHRcdGVsc2VcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0dGhpcy5wYXRoU3R5bGUuZmlsbE9wYWNpdHk9MVxyXG5cdH1cclxuXHRmb250UmVmKHgpe1xyXG5cdFx0eC5jb2xvciAmJiAodGhpcy5zdHlsZS5jb2xvcj14LmNvbG9yKTtcclxuXHRcdHguZmFtaWx5ICYmICh0aGlzLnN0eWxlLmZvbnRGYW1pbHk9eC5mYW1pbHkpO1xyXG5cdH1cclxuXHRwYXRoKHgsIHQpe1xyXG5cdFx0c3dpdGNoKHguc2hhcGUpe1xyXG5cdFx0Y2FzZSAnbGluZSc6XHJcblx0XHRcdHRoaXMucGFyZW50LnBhdGg9JzxsaW5lIHgxPVwiMFwiIHkxPVwiMFwiIHgyPVwiJyt0aGlzLndvcmxkLndpZHRoKydwdFwiIHkyPVwiJyt0aGlzLndvcmxkLmhlaWdodCsncHRcIidcclxuXHRcdFx0YnJlYWtcclxuXHRcdGNhc2UgJ3JlY3QnOlxyXG5cdFx0XHR0aGlzLnBhcmVudC5wYXRoPSc8cmVjdCB3aWR0aD1cIicrdGhpcy53b3JsZC53aWR0aCsncHRcIiBoZWlnaHQ9XCInK3RoaXMud29ybGQuaGVpZ2h0KydwdFwiJ1xyXG5cdFx0XHRicmVhaztcdFxyXG5cdFx0Y2FzZSAncm91bmRSZWN0JzpcclxuXHRcdFx0dGhpcy5wYXJlbnQucGF0aD0nPHJlY3Qgcng9XCInKyh0PU1hdGgubWluKHRoaXMud29ybGQud2lkdGgsIHRoaXMud29ybGQuaGVpZ2h0KS8xMikrJ3B0XCIgcnk9XCInK3QrJ3B0XCIgd2lkdGg9XCInK3RoaXMud29ybGQud2lkdGgrJ3B0XCIgaGVpZ2h0PVwiJyt0aGlzLndvcmxkLmhlaWdodCsncHRcIidcclxuXHRcdFx0YnJlYWs7XHJcblx0XHRjYXNlICdlbGxpcHNlJzpcclxuXHRcdFx0dGhpcy5wYXJlbnQucGF0aD0nPGVsbGlwc2UgY3g9XCInK3RoaXMud29ybGQud2lkdGgvMisncHRcIiBjeT1cIicrdGhpcy53b3JsZC5oZWlnaHQvMisncHRcIiByeD1cIicrdGhpcy53b3JsZC53aWR0aC8yKydwdFwiIHJ5PVwiJyt0aGlzLndvcmxkLmhlaWdodC8yKydwdFwiJ1xyXG5cdFx0XHRicmVha1xyXG5cdFx0Y2FzZSAncGF0aCc6XHJcblx0XHRcdHRoaXMucGFyZW50LnBhdGg9JzxwYXRoIGQ9XCInK3gucGF0aCsnXCInXHJcblx0XHRcdGlmKCFjbG96ZWQudGVzdCh4LnBhdGgpKVxyXG5cdFx0XHRcdHRoaXMubm9GaWxsKClcclxuXHRcdFx0YnJlYWtcclxuXHRcdH1cclxuXHR9XHJcblx0c3BBdXRvRml0KCl7XHJcblx0XHR0aGlzLnN0eWxlLmhlaWdodD0nYXV0bydcclxuXHR9XHJcblx0bElucyh4KXtcclxuXHRcdHRoaXMuc3R5bGUucGFkZGluZ0xlZnQ9eCsncHgnXHJcblx0fVxyXG5cdHRJbnMoeCl7XHJcblx0XHR0aGlzLnN0eWxlLnBhZGRpbmdUb3A9eCsncHgnXHJcblx0fVxyXG5cdHJJbnMoeCl7XHJcblx0XHR0aGlzLnN0eWxlLnBhZGRpbmdSaWdodD14KydweCdcclxuXHR9XHJcblx0Yklucyh4KXtcclxuXHRcdHRoaXMuc3R5bGUucGFkZGluZ0JvdHRvbT14KydweCdcclxuXHR9XHJcblx0YW5jaG9yKHgpe1xyXG5cdFx0dGhpcy5zdHlsZS5kaXNwbGF5PSd0YWJsZS1jZWxsJ1xyXG5cdFx0dGhpcy5zdHlsZS52ZXJ0aWNhbEFsaWduPXhcclxuXHR9XHJcblx0dmVydCh4KXtcclxuXHRcdHRoaXMuc3R5bGUuaGVpZ2h0PXRoaXMud29ybGQud2lkdGgrJ3B4J1xyXG5cdFx0dGhpcy5zdHlsZS53aWR0aD10aGlzLndvcmxkLmhlaWdodCsncHgnXHJcblx0XHR2YXIgZGVsdGE9KHRoaXMud29ybGQud2lkdGgtdGhpcy53b3JsZC5oZWlnaHQpLzJcclxuXHRcdFx0XHRcdFx0XHJcblx0XHR0aGlzLmJnU3R5bGUuaGVpZ2h0PXRoaXMud29ybGQuaGVpZ2h0KydweCdcclxuXHRcdHRoaXMuYmdTdHlsZS53aWR0aD10aGlzLndvcmxkLndpZHRoKydweCdcclxuXHRcdHRoaXMuc3R5bGVzcygndHJhbnNmb3JtJywndHJhbnNsYXRlKC0nK2RlbHRhKydwdCwnK2RlbHRhKydwdCkgcm90YXRlKC0nK3grJ2RlZykgJywgdGhpcy5iZ1N0eWxlKVxyXG5cclxuXHRcdHRoaXMuc3R5bGVzcygndHJhbnNmb3JtJywndHJhbnNsYXRlKCcrZGVsdGErJ3B0LC0nK2RlbHRhKydwdCkgcm90YXRlKCcrKHgrdGhpcy53b3JsZC5yb3RhdGlvbnx8MCkrJ2RlZyknKVxyXG5cdH1cclxufSJdfQ==