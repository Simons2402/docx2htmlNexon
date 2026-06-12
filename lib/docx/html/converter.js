'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var divContainers = 'SECTION,DIV,TD'.split(',');

var Converter = function () {
	function Converter(wModel, parentConverter) {
		(0, _classCallCheck3.default)(this, Converter);

		this.wordModel = wModel;
		this.parent = parentConverter;
		this.doc = parentConverter && parentConverter.doc;
		this.content = null;
	}

	(0, _createClass3.default)(Converter, [{
		key: 'visit',

		/**interface API: happen when just word model identified, without children appended yet*/
		value: function visit() {
			if (!this.parent || this.parent.content) return this.convert.apply(this, arguments);
		}
	}, {
		key: 'convert',
		value: function convert() {
			this.content = this.createElement();
			if (this.content) {
				this.parent.content.appendChild(this.content);
			} else this.content = this.parent && this.parent.content || null;

			this.convertStyle(this.content);
		}
	}, {
		key: 'createElement',
		value: function createElement() {
			switch ((0, _typeof3.default)(this.tag)) {
				case 'string':
					return this.doc.createElement(this.tag);
				case 'function':
					var el = this.tag();
					return this.doc.createElement(el);
				default:
					return null;
			}
		}
	}, {
		key: 'convertStyle',
		value: function convertStyle(el, a) {
			this.wordModel.getStyleId && (a = this.wordModel.getStyleId()) && this.constructor.addClass(el, this.doc.stylePath(this.constructor.asCssID(a)));
		}
	}, {
		key: '_shouldIgnore',
		value: function _shouldIgnore() {
			return false;
		}
	}, {
		key: 'release',
		value: function release() {}
	}, {
		key: 'wordType',
		get: function get() {
			return null;
		}
	}, {
		key: 'tag',
		get: function get() {
			return null;
		}
	}], [{
		key: 'asCssID',
		value: function asCssID(a) {
			return a.replace(/\s+/g, '_').replace(/^\d/g, function (d) {
				return "_" + d;
			});
		}
	}, {
		key: 'addClass',
		value: function addClass(el, classes) {
			el.setAttribute('class', (el.getAttribute('class') || '') + ' ' + classes);
		}
	}]);
	return Converter;
}();

exports.default = Converter;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvY29udmVydGVyLmpzIl0sIm5hbWVzIjpbImRpdkNvbnRhaW5lcnMiLCJzcGxpdCIsIkNvbnZlcnRlciIsIndNb2RlbCIsInBhcmVudENvbnZlcnRlciIsIndvcmRNb2RlbCIsInBhcmVudCIsImRvYyIsImNvbnRlbnQiLCJjb252ZXJ0IiwiYXJndW1lbnRzIiwiY3JlYXRlRWxlbWVudCIsImFwcGVuZENoaWxkIiwiY29udmVydFN0eWxlIiwidGFnIiwiZWwiLCJhIiwiZ2V0U3R5bGVJZCIsImNvbnN0cnVjdG9yIiwiYWRkQ2xhc3MiLCJzdHlsZVBhdGgiLCJhc0Nzc0lEIiwicmVwbGFjZSIsImQiLCJjbGFzc2VzIiwic2V0QXR0cmlidXRlIiwiZ2V0QXR0cmlidXRlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLGdCQUFjLGlCQUFpQkMsS0FBakIsQ0FBdUIsR0FBdkIsQ0FBbEI7O0lBRXFCQyxTO0FBQ3BCLG9CQUFZQyxNQUFaLEVBQW9CQyxlQUFwQixFQUFvQztBQUFBOztBQUNuQyxPQUFLQyxTQUFMLEdBQWVGLE1BQWY7QUFDQSxPQUFLRyxNQUFMLEdBQVlGLGVBQVo7QUFDQSxPQUFLRyxHQUFMLEdBQVVILG1CQUFtQkEsZ0JBQWdCRyxHQUE3QztBQUNBLE9BQUtDLE9BQUwsR0FBYSxJQUFiO0FBQ0E7Ozs7O0FBR0Q7MEJBQ087QUFDTixPQUFHLENBQUMsS0FBS0YsTUFBTixJQUFnQixLQUFLQSxNQUFMLENBQVlFLE9BQS9CLEVBQ0MsT0FBTyxLQUFLQyxPQUFMLGFBQWdCQyxTQUFoQixDQUFQO0FBQ0Q7Ozs0QkFDUTtBQUNSLFFBQUtGLE9BQUwsR0FBYSxLQUFLRyxhQUFMLEVBQWI7QUFDQSxPQUFHLEtBQUtILE9BQVIsRUFBZ0I7QUFDZixTQUFLRixNQUFMLENBQVlFLE9BQVosQ0FBb0JJLFdBQXBCLENBQWdDLEtBQUtKLE9BQXJDO0FBQ0EsSUFGRCxNQUdDLEtBQUtBLE9BQUwsR0FBYSxLQUFLRixNQUFMLElBQWUsS0FBS0EsTUFBTCxDQUFZRSxPQUEzQixJQUFzQyxJQUFuRDs7QUFFRCxRQUFLSyxZQUFMLENBQWtCLEtBQUtMLE9BQXZCO0FBQ0E7OztrQ0FDYztBQUNkLGlDQUFjLEtBQUtNLEdBQW5CO0FBQ0EsU0FBSyxRQUFMO0FBQ0MsWUFBTyxLQUFLUCxHQUFMLENBQVNJLGFBQVQsQ0FBdUIsS0FBS0csR0FBNUIsQ0FBUDtBQUNELFNBQUssVUFBTDtBQUNDLFNBQUlDLEtBQUcsS0FBS0QsR0FBTCxFQUFQO0FBQ0EsWUFBTyxLQUFLUCxHQUFMLENBQVNJLGFBQVQsQ0FBdUJJLEVBQXZCLENBQVA7QUFDRDtBQUNDLFlBQU8sSUFBUDtBQVBEO0FBU0E7OzsrQkFDWUEsRSxFQUFJQyxDLEVBQUU7QUFDbEIsUUFBS1gsU0FBTCxDQUFlWSxVQUFmLEtBQ0tELElBQUUsS0FBS1gsU0FBTCxDQUFlWSxVQUFmLEVBRFAsS0FFSSxLQUFLQyxXQUFMLENBQWlCQyxRQUFqQixDQUEwQkosRUFBMUIsRUFBNkIsS0FBS1IsR0FBTCxDQUFTYSxTQUFULENBQW1CLEtBQUtGLFdBQUwsQ0FBaUJHLE9BQWpCLENBQXlCTCxDQUF6QixDQUFuQixDQUE3QixDQUZKO0FBR0E7OztrQ0FDYztBQUNkLFVBQU8sS0FBUDtBQUNBOzs7NEJBQ1EsQ0FBRTs7O3NCQW5DRztBQUFDLFVBQU8sSUFBUDtBQUFZOzs7c0JBQ2xCO0FBQUMsVUFBTyxJQUFQO0FBQVk7OzswQkFvQ1BBLEMsRUFBRTtBQUNoQixVQUFPQSxFQUFFTSxPQUFGLENBQVUsTUFBVixFQUFpQixHQUFqQixFQUFzQkEsT0FBdEIsQ0FBOEIsTUFBOUIsRUFBcUM7QUFBQSxXQUFHLE1BQUlDLENBQVA7QUFBQSxJQUFyQyxDQUFQO0FBQ0E7OzsyQkFDZVIsRSxFQUFJUyxPLEVBQVE7QUFDM0JULE1BQUdVLFlBQUgsQ0FBZ0IsT0FBaEIsRUFBeUIsQ0FBQ1YsR0FBR1csWUFBSCxDQUFnQixPQUFoQixLQUEwQixFQUEzQixJQUErQixHQUEvQixHQUFtQ0YsT0FBNUQ7QUFDQTs7Ozs7a0JBakRtQnRCLFMiLCJmaWxlIjoiY29udmVydGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGRpdkNvbnRhaW5lcnM9J1NFQ1RJT04sRElWLFREJy5zcGxpdCgnLCcpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udmVydGVye1xyXG5cdGNvbnN0cnVjdG9yKHdNb2RlbCwgcGFyZW50Q29udmVydGVyKXtcclxuXHRcdHRoaXMud29yZE1vZGVsPXdNb2RlbFxyXG5cdFx0dGhpcy5wYXJlbnQ9cGFyZW50Q29udmVydGVyXHJcblx0XHR0aGlzLmRvYz0gcGFyZW50Q29udmVydGVyICYmIHBhcmVudENvbnZlcnRlci5kb2NcclxuXHRcdHRoaXMuY29udGVudD1udWxsO1xyXG5cdH1cclxuXHRnZXQgd29yZFR5cGUoKXtyZXR1cm4gbnVsbH1cclxuXHRnZXQgdGFnKCl7cmV0dXJuIG51bGx9XHJcblx0LyoqaW50ZXJmYWNlIEFQSTogaGFwcGVuIHdoZW4ganVzdCB3b3JkIG1vZGVsIGlkZW50aWZpZWQsIHdpdGhvdXQgY2hpbGRyZW4gYXBwZW5kZWQgeWV0Ki9cclxuXHR2aXNpdCgpe1xyXG5cdFx0aWYoIXRoaXMucGFyZW50IHx8IHRoaXMucGFyZW50LmNvbnRlbnQpXHJcblx0XHRcdHJldHVybiB0aGlzLmNvbnZlcnQoLi4uYXJndW1lbnRzKVxyXG5cdH1cclxuXHRjb252ZXJ0KCl7XHJcblx0XHR0aGlzLmNvbnRlbnQ9dGhpcy5jcmVhdGVFbGVtZW50KClcclxuXHRcdGlmKHRoaXMuY29udGVudCl7XHJcblx0XHRcdHRoaXMucGFyZW50LmNvbnRlbnQuYXBwZW5kQ2hpbGQodGhpcy5jb250ZW50KVxyXG5cdFx0fWVsc2VcclxuXHRcdFx0dGhpcy5jb250ZW50PXRoaXMucGFyZW50ICYmIHRoaXMucGFyZW50LmNvbnRlbnQgfHwgbnVsbFxyXG5cdFx0XHRcclxuXHRcdHRoaXMuY29udmVydFN0eWxlKHRoaXMuY29udGVudClcclxuXHR9XHJcblx0Y3JlYXRlRWxlbWVudCgpe1xyXG5cdFx0c3dpdGNoKHR5cGVvZih0aGlzLnRhZykpe1xyXG5cdFx0Y2FzZSAnc3RyaW5nJzpcclxuXHRcdFx0cmV0dXJuIHRoaXMuZG9jLmNyZWF0ZUVsZW1lbnQodGhpcy50YWcpXHJcblx0XHRjYXNlICdmdW5jdGlvbic6XHJcblx0XHRcdHZhciBlbD10aGlzLnRhZygpXHJcblx0XHRcdHJldHVybiB0aGlzLmRvYy5jcmVhdGVFbGVtZW50KGVsKVxyXG5cdFx0ZGVmYXVsdDpcclxuXHRcdFx0cmV0dXJuIG51bGxcclxuXHRcdH1cclxuXHR9XHJcblx0Y29udmVydFN0eWxlKGVsLCBhKXtcclxuXHRcdHRoaXMud29yZE1vZGVsLmdldFN0eWxlSWQgXHJcblx0XHRcdCYmIChhPXRoaXMud29yZE1vZGVsLmdldFN0eWxlSWQoKSkgXHJcblx0XHRcdCYmIHRoaXMuY29uc3RydWN0b3IuYWRkQ2xhc3MoZWwsdGhpcy5kb2Muc3R5bGVQYXRoKHRoaXMuY29uc3RydWN0b3IuYXNDc3NJRChhKSkpO1xyXG5cdH1cclxuXHRfc2hvdWxkSWdub3JlKCl7XHJcblx0XHRyZXR1cm4gZmFsc2VcclxuXHR9XHJcblx0cmVsZWFzZSgpe31cclxuXHJcblx0c3RhdGljIGFzQ3NzSUQoYSl7XHJcblx0XHRyZXR1cm4gYS5yZXBsYWNlKC9cXHMrL2csJ18nKS5yZXBsYWNlKC9eXFxkL2csZD0+XCJfXCIrZClcclxuXHR9XHJcblx0c3RhdGljIGFkZENsYXNzKGVsLCBjbGFzc2VzKXtcclxuXHRcdGVsLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAoZWwuZ2V0QXR0cmlidXRlKCdjbGFzcycpfHwnJykrJyAnK2NsYXNzZXMpXHJcblx0fVxyXG59XHJcbiJdfQ==