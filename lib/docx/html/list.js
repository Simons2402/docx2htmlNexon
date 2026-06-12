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

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _p = require('./p');

var _p2 = _interopRequireDefault(_p);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var List = function (_Paragraph) {
	(0, _inherits3.default)(List, _Paragraph);

	function List() {
		(0, _classCallCheck3.default)(this, List);
		return (0, _possibleConstructorReturn3.default)(this, (List.__proto__ || (0, _getPrototypeOf2.default)(List)).apply(this, arguments));
	}

	(0, _createClass3.default)(List, [{
		key: 'convert',
		value: function convert() {
			var elParent = this.parent.content,
			    ul = elParent.lastElementChild;
			var listStyle = this.wordModel.getNumberingStyle() || {};
			var numId = listStyle.id,
			    level = this.wordModel.getLevel();

			var makeStructure = function (parent) {
				ul = this.doc.createElement('ul');
				ul.id = listStyle.id;
				ul.setAttribute('level', level);
				this.constructor.addClass(ul, listStyle.getParentStyle && listStyle.getParentStyle().id);
				parent.appendChild(ul);
			}.bind(this);

			if (!ul || ul.localName != 'ul' || ul.id != numId) {
				makeStructure(elParent);
			} else if (ul.getAttribute('level') != level) {
				var possibleParent = ul.querySelector('[level="' + level + '"]');
				if (!possibleParent) {
					makeStructure(ul.querySelector('[level="' + (parseInt(level) - 1) + '"]') || ul);
				} else ul = possibleParent;
			}
			var li = this.doc.createElement('li');
			ul.appendChild(li);
			li.appendChild(this.content = this.createElement());
			var marker = this.doc.createElement('span');
			this.constructor.addClass(marker, 'marker');
			this.content.appendChild(marker); //as marker
			this.convertStyle(this.content);
		}
	}]);
	return List;
}(_p2.default);

exports.default = List;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvbGlzdC5qcyJdLCJuYW1lcyI6WyJMaXN0IiwiZWxQYXJlbnQiLCJwYXJlbnQiLCJjb250ZW50IiwidWwiLCJsYXN0RWxlbWVudENoaWxkIiwibGlzdFN0eWxlIiwid29yZE1vZGVsIiwiZ2V0TnVtYmVyaW5nU3R5bGUiLCJudW1JZCIsImlkIiwibGV2ZWwiLCJnZXRMZXZlbCIsIm1ha2VTdHJ1Y3R1cmUiLCJkb2MiLCJjcmVhdGVFbGVtZW50Iiwic2V0QXR0cmlidXRlIiwiY29uc3RydWN0b3IiLCJhZGRDbGFzcyIsImdldFBhcmVudFN0eWxlIiwiYXBwZW5kQ2hpbGQiLCJiaW5kIiwibG9jYWxOYW1lIiwiZ2V0QXR0cmlidXRlIiwicG9zc2libGVQYXJlbnQiLCJxdWVyeVNlbGVjdG9yIiwicGFyc2VJbnQiLCJsaSIsIm1hcmtlciIsImNvbnZlcnRTdHlsZSIsIlBhcmFncmFwaCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7O0lBRXFCQSxJOzs7Ozs7Ozs7OzRCQUNYO0FBQ1IsT0FBSUMsV0FBUyxLQUFLQyxNQUFMLENBQVlDLE9BQXpCO0FBQUEsT0FBa0NDLEtBQUdILFNBQVNJLGdCQUE5QztBQUNBLE9BQUlDLFlBQVUsS0FBS0MsU0FBTCxDQUFlQyxpQkFBZixNQUFzQyxFQUFwRDtBQUNBLE9BQUlDLFFBQU1ILFVBQVVJLEVBQXBCO0FBQUEsT0FBd0JDLFFBQU0sS0FBS0osU0FBTCxDQUFlSyxRQUFmLEVBQTlCOztBQUVBLE9BQUlDLGdCQUFjLFVBQVNYLE1BQVQsRUFBZ0I7QUFDakNFLFNBQUcsS0FBS1UsR0FBTCxDQUFTQyxhQUFULENBQXVCLElBQXZCLENBQUg7QUFDQVgsT0FBR00sRUFBSCxHQUFNSixVQUFVSSxFQUFoQjtBQUNBTixPQUFHWSxZQUFILENBQWdCLE9BQWhCLEVBQXdCTCxLQUF4QjtBQUNBLFNBQUtNLFdBQUwsQ0FBaUJDLFFBQWpCLENBQ2FkLEVBRGIsRUFFYUUsVUFBVWEsY0FBVixJQUE0QmIsVUFBVWEsY0FBVixHQUEyQlQsRUFGcEU7QUFJQVIsV0FBT2tCLFdBQVAsQ0FBbUJoQixFQUFuQjtBQUNBLElBVGlCLENBU2hCaUIsSUFUZ0IsQ0FTWCxJQVRXLENBQWxCOztBQVdBLE9BQUcsQ0FBQ2pCLEVBQUQsSUFBT0EsR0FBR2tCLFNBQUgsSUFBYyxJQUFyQixJQUE2QmxCLEdBQUdNLEVBQUgsSUFBT0QsS0FBdkMsRUFBNkM7QUFDNUNJLGtCQUFjWixRQUFkO0FBQ0EsSUFGRCxNQUVNLElBQUdHLEdBQUdtQixZQUFILENBQWdCLE9BQWhCLEtBQTBCWixLQUE3QixFQUFtQztBQUN4QyxRQUFJYSxpQkFBZXBCLEdBQUdxQixhQUFILENBQWlCLGFBQVdkLEtBQVgsR0FBaUIsSUFBbEMsQ0FBbkI7QUFDQSxRQUFHLENBQUNhLGNBQUosRUFBbUI7QUFDbEJYLG1CQUFjVCxHQUFHcUIsYUFBSCxDQUFpQixjQUFZQyxTQUFTZixLQUFULElBQWdCLENBQTVCLElBQStCLElBQWhELEtBQXlEUCxFQUF2RTtBQUNBLEtBRkQsTUFHQ0EsS0FBR29CLGNBQUg7QUFDRDtBQUNELE9BQUlHLEtBQUcsS0FBS2IsR0FBTCxDQUFTQyxhQUFULENBQXVCLElBQXZCLENBQVA7QUFDQVgsTUFBR2dCLFdBQUgsQ0FBZU8sRUFBZjtBQUNBQSxNQUFHUCxXQUFILENBQWUsS0FBS2pCLE9BQUwsR0FBYSxLQUFLWSxhQUFMLEVBQTVCO0FBQ0EsT0FBSWEsU0FBTyxLQUFLZCxHQUFMLENBQVNDLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBWDtBQUNBLFFBQUtFLFdBQUwsQ0FBaUJDLFFBQWpCLENBQTBCVSxNQUExQixFQUFrQyxRQUFsQztBQUNBLFFBQUt6QixPQUFMLENBQWFpQixXQUFiLENBQXlCUSxNQUF6QixFQTlCUSxDQThCd0I7QUFDaEMsUUFBS0MsWUFBTCxDQUFrQixLQUFLMUIsT0FBdkI7QUFDQTs7O0VBakNnQzJCLFc7O2tCQUFiOUIsSSIsImZpbGUiOiJsaXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBhcmFncmFwaCBmcm9tICcuL3AnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMaXN0IGV4dGVuZHMgUGFyYWdyYXBoe1xyXG5cdGNvbnZlcnQoKXtcclxuXHRcdHZhciBlbFBhcmVudD10aGlzLnBhcmVudC5jb250ZW50LCB1bD1lbFBhcmVudC5sYXN0RWxlbWVudENoaWxkO1xyXG5cdFx0dmFyIGxpc3RTdHlsZT10aGlzLndvcmRNb2RlbC5nZXROdW1iZXJpbmdTdHlsZSgpIHx8IHt9XHJcblx0XHR2YXIgbnVtSWQ9bGlzdFN0eWxlLmlkLCBsZXZlbD10aGlzLndvcmRNb2RlbC5nZXRMZXZlbCgpXHJcblxyXG5cdFx0dmFyIG1ha2VTdHJ1Y3R1cmU9ZnVuY3Rpb24ocGFyZW50KXtcclxuXHRcdFx0dWw9dGhpcy5kb2MuY3JlYXRlRWxlbWVudCgndWwnKVxyXG5cdFx0XHR1bC5pZD1saXN0U3R5bGUuaWRcclxuXHRcdFx0dWwuc2V0QXR0cmlidXRlKCdsZXZlbCcsbGV2ZWwpXHJcblx0XHRcdHRoaXMuY29uc3RydWN0b3IuYWRkQ2xhc3MoXHJcbiAgICAgICAgICAgICAgICB1bCxcclxuICAgICAgICAgICAgICAgIGxpc3RTdHlsZS5nZXRQYXJlbnRTdHlsZSAmJiBsaXN0U3R5bGUuZ2V0UGFyZW50U3R5bGUoKS5pZFxyXG4gICAgICAgICAgICApXHJcblx0XHRcdHBhcmVudC5hcHBlbmRDaGlsZCh1bClcclxuXHRcdH0uYmluZCh0aGlzKVxyXG5cclxuXHRcdGlmKCF1bCB8fCB1bC5sb2NhbE5hbWUhPSd1bCcgfHwgdWwuaWQhPW51bUlkKXtcclxuXHRcdFx0bWFrZVN0cnVjdHVyZShlbFBhcmVudClcclxuXHRcdH1lbHNlIGlmKHVsLmdldEF0dHJpYnV0ZSgnbGV2ZWwnKSE9bGV2ZWwpe1xyXG5cdFx0XHR2YXIgcG9zc2libGVQYXJlbnQ9dWwucXVlcnlTZWxlY3RvcignW2xldmVsPVwiJytsZXZlbCsnXCJdJylcclxuXHRcdFx0aWYoIXBvc3NpYmxlUGFyZW50KXtcclxuXHRcdFx0XHRtYWtlU3RydWN0dXJlKHVsLnF1ZXJ5U2VsZWN0b3IoJ1tsZXZlbD1cIicrKHBhcnNlSW50KGxldmVsKS0xKSsnXCJdJykgfHwgdWwpXHJcblx0XHRcdH1lbHNlXHJcblx0XHRcdFx0dWw9cG9zc2libGVQYXJlbnRcclxuXHRcdH1cclxuXHRcdHZhciBsaT10aGlzLmRvYy5jcmVhdGVFbGVtZW50KCdsaScpXHJcblx0XHR1bC5hcHBlbmRDaGlsZChsaSlcclxuXHRcdGxpLmFwcGVuZENoaWxkKHRoaXMuY29udGVudD10aGlzLmNyZWF0ZUVsZW1lbnQoKSlcclxuXHRcdHZhciBtYXJrZXI9dGhpcy5kb2MuY3JlYXRlRWxlbWVudCgnc3BhbicpXHJcblx0XHR0aGlzLmNvbnN0cnVjdG9yLmFkZENsYXNzKG1hcmtlciwgJ21hcmtlcicpXHJcblx0XHR0aGlzLmNvbnRlbnQuYXBwZW5kQ2hpbGQobWFya2VyKS8vYXMgbWFya2VyXHJcblx0XHR0aGlzLmNvbnZlcnRTdHlsZSh0aGlzLmNvbnRlbnQpXHJcblx0fVxyXG59XHJcbiJdfQ==