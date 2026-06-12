'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

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

var _converter = require('./converter');

var _converter2 = _interopRequireDefault(_converter);

var _jszip = require('jszip');

var _jszip2 = _interopRequireDefault(_jszip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Helper to check if running in Node.js environment
var isNode = typeof process !== 'undefined' && process.versions != null && process.versions.node != null;

// Helper to check if value is a function
var isFunction = function isFunction(obj) {
	return typeof obj === 'function';
};

var createDocument, CSSStyleDeclaration;

var Document = function (_Converter) {
	(0, _inherits3.default)(Document, _Converter);

	function Document() {
		(0, _classCallCheck3.default)(this, Document);
		return (0, _possibleConstructorReturn3.default)(this, (Document.__proto__ || (0, _getPrototypeOf2.default)(Document)).apply(this, arguments));
	}

	(0, _createClass3.default)(Document, [{
		key: 'convert',
		value: function convert() {
			this.doc = this.constructor.create(this.options);
			this.content = this.doc;
			var contentStyle = this.content.style;
			contentStyle.backgroundColor = 'transparent';
			contentStyle.minHeight = '1000px';
			contentStyle.width = '100%';
			contentStyle.paddingTop = '20px';
			contentStyle.overflow = 'auto';

			var style = this.doc.createStyle('*');
			style.margin = '0';
			style.border = '0';
			style.padding = '0';
			style.boxSizing = 'border-box';

			style = this.doc.createStyle('table');
			style.width = '100%';
			style.borderCollapse = 'collapse';
			style.wordBreak = 'break-word';

			style = this.doc.createStyle('section');
			style.margin = 'auto';
			style.backgroundColor = 'white';
			style.color = 'black';
			style.position = 'relative';
			style.zIndex = 0;

			style = this.doc.createStyle('p:empty:before');
			style.content = '""';
			style.display = 'inline-block';

			style = this.doc.createStyle('ul');
			style.listStyle = "none";

			style = this.doc.createStyle('ul>li>p');
			style.position = 'relative';

			style = this.doc.createStyle('ul .marker');
			style.position = 'absolute';

			style = this.doc.createStyle('a');
			style.textDecoration = 'none';

			style = this.doc.createStyle('.unsupported');
			style.outline = "2px red solid";

			style = this.doc.createStyle('.warning');
			style.outline = "1px yellow solid";
			this.convertStyle();
		}
	}, {
		key: 'convertStyle',
		value: function convertStyle() {
			var bgStyle = this.wordModel.getBackgroundStyle();
			if (!bgStyle) return;

			var style = this.doc.createStyle('section');
			switch (typeof bgStyle === 'undefined' ? 'undefined' : (0, _typeof3.default)(bgStyle)) {
				case 'object':
					// fill
					console.warn('not support fill color on document background yet');
					break;
				default:
					style.backgroundColor = bgStyle;
					break;
			}
		}
		/**
  * opt: {
  * 	template: function(style, html, props){ return (html)},
  	extendScript: "http://a.com/a.js"
  	}
  */

	}, {
		key: 'toString',
		value: function toString(opt) {
			return this.doc.toString(opt, this.props);
		}
	}, {
		key: 'release',
		value: function release() {
			this.doc.release();
		}
	}, {
		key: 'asZip',
		value: function asZip(opt) {
			return this.doc.asZip(opt, this.props);
		}
	}, {
		key: 'download',
		value: function download(opt) {
			return this.doc.download(opt, this.props);
		}
		/**
  * opt=extend(toString.opt,{
  	saveImage: function(arrayBuffer, doc.props): promise(url) {},
  	saveHtml: function(){}
  })
  */

	}, {
		key: 'save',
		value: function save(opt) {
			return this.doc.save(opt, this.props);
		}
	}, {
		key: 'tag',
		get: function get() {
			return 'html';
		}
	}], [{
		key: 'create',
		value: function create(opt) {
			var selfConverter = this;
			return function (document) {
				var doc = function browserDoc() {
					var _uid = 0;
					var root = (0, _assign2.default)(document.createElement('div'), {
						id: "A",
						section: null,
						createElement: document.createElement.bind(document),
						createTextNode: document.createTextNode.bind(document),
						createStyleSheet: function createStyleSheet() {
							if (this.stylesheet) return this.stylesheet;
							var elStyle = this.createElement('style');
							this.body.appendChild(elStyle, null);
							return this.stylesheet = elStyle.sheet;
						},
						getStyleText: function getStyleText() {
							var styles = [];
							for (var i = 0, rules = this.stylesheet.cssRules, len = rules.length; i < len; i++) {
								styles.push(rules[i].cssText);
							}return styles.join('\r\n');
						},
						uid: function uid() {
							return this.id + _uid++;
						},
						toString: function toString(opt) {
							var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : selfConverter.props;

							if (opt && typeof opt.template != "undefined" && isFunction(opt.template)) return opt.template(this.getStyleText(), this._html(), props);
							var html = ['<!doctype html>\r\n<html><head><meta charset=utf-8><meta key="generator" value="docx2html"><title>' + (props.name || '') + '</title><style>'];
							html.push(this.getStyleText());
							html.push('</style></head><body>');
							html.push(this._html());
							opt && opt.extendScript && html.push('<script src="' + opt.extendScript + '"></script>');
							html.push('</body><html>');
							return html.join('\r\n');
						},
						_html: function _html() {
							var divs = this.querySelectorAll('p>div, span>div');
							if (divs.length == 0) return this.outerHTML;

							/**
       * illegal <p> <div/> </p>
       * DOM operation directly in onload
       */
							var divcontainer = doc.createElement('div'),
							    uid = 0;
							divcontainer.id = 'divcontainer';
							divcontainer.style.display = "none";
							this.appendChild(divcontainer);
							for (var i = divs.length - 1; i > -1; i--) {
								var div = divs[i],
								    parent = div.parentNode;

								if (!div.id) div.id = '_z' + ++uid;

								if (!parent.id) parent.id = '_y' + uid;

								div.setAttribute('data-parent', parent.id);
								div.setAttribute('data-index', indexOf(div, parent.childNodes));

								divcontainer.appendChild(divs[i]);
							}

							var html = this.outerHTML + '\n\r<script>(' + this._transformer.toString() + ')();</script>';
							this._transformer();
							return html;
						},
						_transformer: function _transformer() {
							var a = document.querySelector('#divcontainer');
							for (var divs = a.childNodes, i = divs.length - 1; i > -1; i--) {
								var div = divs[i],
								    parentId = div.getAttribute('data-parent'),
								    index = parseInt(div.getAttribute('data-index')),
								    parent = document.querySelector('#' + parentId);
								parent.insertBefore(div, parent.childNodes[index]);
							}
							a.parentNode.removeChild(a);
						}
					});

					function indexOf(el, els) {
						for (var i = els.length - 1; i > 0; i--) {
							if (el == els[i]) return i;
						}return 0;
					}

					(opt && opt.container || document.body).appendChild(root);
					root.body = root;
					return root;
				}();

				return function mixin(doc) {
					var stylesheet = doc.createStyleSheet();
					var relStyles = {},
					    styles = {};

					return (0, _assign2.default)(selfConverter[isNode ? 'nodefy' : 'browserify'](doc, stylesheet, opt), {
						createStyle: function createStyle(selector) {
							if (styles[selector]) return styles[selector];
							var rules = stylesheet.cssRules,
							    len = rules.length;
							stylesheet.insertRule(selector.split(',').map(function (a) {
								return a.trim()[0] == '#' ? a : '#' + this.id + ' ' + a;
							}.bind(this)).join(',') + '{}', len);
							return styles[selector] = stylesheet.cssRules[len].style;
						},
						stylePath: function stylePath(a, parent) {
							if (parent) return relStyles[a] = parent;
							var paths = [a],
							    parent = a;
							while (parent = relStyles[parent]) {
								paths.unshift(parent);
							}return paths.join(' ');
						},
						release: function release() {
							delete this.section;
							this._release();
						}
					});
				}(doc);
			}(isNode ? createDocument() : document);
		}
	}, {
		key: 'nodefy',
		value: function nodefy(doc, stylesheet, opt) {
			return (0, _assign2.default)(doc, {
				_release: function _release() {},
				asImageURL: function asImageURL(buffer) {
					if (opt && typeof opt.asImageURL != 'undefined') return opt.asImageURL(buffer);
					return "image://notsupport";
				},
				asZip: function asZip() {
					throw new Error('not support');
				},
				download: function download() {
					throw new Error('not support');
				},
				save: function save() {
					throw new Error('not support');
				}
			});
		}
	}, {
		key: 'browserify',
		value: function browserify(doc, stylesheet, opt) {
			var Proto_Blob = function (a) {
				a = URL.createObjectURL(new Blob()).split('/');
				a.pop();
				return a.join('/');
			}(),
			    Reg_Proto_Blob = new RegExp(Proto_Blob + "/([\\w\\d-]+)", "gi");

			return (0, _assign2.default)(doc, {
				asZip: function asZip(opt, props) {
					var zip = new _jszip2.default(),
					    hasImage = false;
					var f = zip.folder('images');
					(0, _keys2.default)(this.images).forEach(function (a) {
						hasImage = true;
						f.file(a.split('/').pop(), this[a]);
					}, this.images);
					zip.file('props.json', (0, _stringify2.default)(props));
					zip.file('main.html', hasImage ? this.toString(opt).replace(Proto_Blob, 'images') : this.toString());
					return zip;
				},
				download: function download(opt, props) {
					var a = document.createElement("a");
					document.body.appendChild(a);
					a.href = URL.createObjectURL(this.asZip(opt, props).generate({ type: 'blob' }));
					a.download = (props.name || "document") + '.zip';
					a.click();
					URL.revokeObjectURL(a.href);
					document.body.removeChild(a);
				},
				save: function save(opt, props) {
					var hasImage = false,
					    images = {},
					    me = this;
					return _promise2.default.all((this.images && (0, _keys2.default)(this.images) || []).map(function (a) {
						hasImage = true;
						return opt.saveImage(this[a], props).then(function (url) {
							return images[a] = url;
						});
					}, this.images)).then(function () {
						var html = me.toString(opt, props);
						if (hasImage) html = html.replace(Reg_Proto_Blob, function (a, id) {
							return images[a];
						});
						return opt.saveHtml(html, props);
					});
				},

				images: {},
				asImageURL: function asImageURL(arrayBuffer) {
					var url = URL.createObjectURL(new Blob([arrayBuffer], { type: "image/" + (typeof arrayBuffer == 'string' ? 'svg+xml' : '*') }));
					this.images[url] = arrayBuffer;
					return url;
				},
				_release: function _release() {
					(0, _keys2.default)(this.images).forEach(function (b) {
						URL.revokeObjectURL(b);
					});
					delete this.images;
				}
			});
		}
	}]);
	return Document;
}(_converter2.default);

exports.default = Document;


(function (isNodeEnv, m) {
	if (!isNodeEnv) return;

	createDocument = require(m).jsdom;
	var window = createDocument().defaultView;

	global.btoa = window.btoa;
	CSSStyleDeclaration = window.CSSStyleDeclaration;
})(isNode, "jsdom");
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvZG9jdW1lbnQuanMiXSwibmFtZXMiOlsiaXNOb2RlIiwicHJvY2VzcyIsInZlcnNpb25zIiwibm9kZSIsImlzRnVuY3Rpb24iLCJvYmoiLCJjcmVhdGVEb2N1bWVudCIsIkNTU1N0eWxlRGVjbGFyYXRpb24iLCJEb2N1bWVudCIsImRvYyIsImNvbnN0cnVjdG9yIiwiY3JlYXRlIiwib3B0aW9ucyIsImNvbnRlbnQiLCJjb250ZW50U3R5bGUiLCJzdHlsZSIsImJhY2tncm91bmRDb2xvciIsIm1pbkhlaWdodCIsIndpZHRoIiwicGFkZGluZ1RvcCIsIm92ZXJmbG93IiwiY3JlYXRlU3R5bGUiLCJtYXJnaW4iLCJib3JkZXIiLCJwYWRkaW5nIiwiYm94U2l6aW5nIiwiYm9yZGVyQ29sbGFwc2UiLCJ3b3JkQnJlYWsiLCJjb2xvciIsInBvc2l0aW9uIiwiekluZGV4IiwiZGlzcGxheSIsImxpc3RTdHlsZSIsInRleHREZWNvcmF0aW9uIiwib3V0bGluZSIsImNvbnZlcnRTdHlsZSIsImJnU3R5bGUiLCJ3b3JkTW9kZWwiLCJnZXRCYWNrZ3JvdW5kU3R5bGUiLCJjb25zb2xlIiwid2FybiIsIm9wdCIsInRvU3RyaW5nIiwicHJvcHMiLCJyZWxlYXNlIiwiYXNaaXAiLCJkb3dubG9hZCIsInNhdmUiLCJzZWxmQ29udmVydGVyIiwiZG9jdW1lbnQiLCJicm93c2VyRG9jIiwidWlkIiwicm9vdCIsImNyZWF0ZUVsZW1lbnQiLCJpZCIsInNlY3Rpb24iLCJiaW5kIiwiY3JlYXRlVGV4dE5vZGUiLCJjcmVhdGVTdHlsZVNoZWV0Iiwic3R5bGVzaGVldCIsImVsU3R5bGUiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJzaGVldCIsImdldFN0eWxlVGV4dCIsInN0eWxlcyIsImkiLCJydWxlcyIsImNzc1J1bGVzIiwibGVuIiwibGVuZ3RoIiwicHVzaCIsImNzc1RleHQiLCJqb2luIiwidGVtcGxhdGUiLCJfaHRtbCIsImh0bWwiLCJuYW1lIiwiZXh0ZW5kU2NyaXB0IiwiZGl2cyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJvdXRlckhUTUwiLCJkaXZjb250YWluZXIiLCJkaXYiLCJwYXJlbnQiLCJwYXJlbnROb2RlIiwic2V0QXR0cmlidXRlIiwiaW5kZXhPZiIsImNoaWxkTm9kZXMiLCJfdHJhbnNmb3JtZXIiLCJhIiwicXVlcnlTZWxlY3RvciIsInBhcmVudElkIiwiZ2V0QXR0cmlidXRlIiwiaW5kZXgiLCJwYXJzZUludCIsImluc2VydEJlZm9yZSIsInJlbW92ZUNoaWxkIiwiZWwiLCJlbHMiLCJjb250YWluZXIiLCJtaXhpbiIsInJlbFN0eWxlcyIsInNlbGVjdG9yIiwiaW5zZXJ0UnVsZSIsInNwbGl0IiwibWFwIiwidHJpbSIsInN0eWxlUGF0aCIsInBhdGhzIiwidW5zaGlmdCIsIl9yZWxlYXNlIiwiYXNJbWFnZVVSTCIsImJ1ZmZlciIsIkVycm9yIiwiUHJvdG9fQmxvYiIsIlVSTCIsImNyZWF0ZU9iamVjdFVSTCIsIkJsb2IiLCJwb3AiLCJSZWdfUHJvdG9fQmxvYiIsIlJlZ0V4cCIsInppcCIsIkpTWmlwIiwiaGFzSW1hZ2UiLCJmIiwiZm9sZGVyIiwiaW1hZ2VzIiwiZm9yRWFjaCIsImZpbGUiLCJyZXBsYWNlIiwiaHJlZiIsImdlbmVyYXRlIiwidHlwZSIsImNsaWNrIiwicmV2b2tlT2JqZWN0VVJMIiwibWUiLCJhbGwiLCJzYXZlSW1hZ2UiLCJ0aGVuIiwidXJsIiwic2F2ZUh0bWwiLCJhcnJheUJ1ZmZlciIsImIiLCJDb252ZXJ0ZXIiLCJpc05vZGVFbnYiLCJtIiwicmVxdWlyZSIsImpzZG9tIiwid2luZG93IiwiZGVmYXVsdFZpZXciLCJnbG9iYWwiLCJidG9hIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7O0FBRUE7QUFDQSxJQUFNQSxTQUFTLE9BQU9DLE9BQVAsS0FBbUIsV0FBbkIsSUFBa0NBLFFBQVFDLFFBQVIsSUFB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QSxDQVJELEVBUUdQLE1BUkgsRUFRVyxPQVJYIiwiZmlsZSI6ImRvY3VtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbnZlcnRlciBmcm9tICcuL2NvbnZlcnRlcidcclxuaW1wb3J0IEpTWmlwIGZyb20gJ2pzemlwJ1xyXG5cclxuLy8gSGVscGVyIHRvIGNoZWNrIGlmIHJ1bm5pbmcgaW4gTm9kZS5qcyBlbnZpcm9ubWVudFxyXG5jb25zdCBpc05vZGUgPSB0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYgcHJvY2Vzcy52ZXJzaW9ucyAhPSBudWxsICYmIHByb2Nlc3MudmVyc2lvbnMubm9kZSAhPSBudWxsXHJcblxyXG4vLyBIZWxwZXIgdG8gY2hlY2sgaWYgdmFsdWUgaXMgYSBmdW5jdGlvblxyXG5jb25zdCBpc0Z1bmN0aW9uID0gKG9iaikgPT4gdHlwZW9mIG9iaiA9PT0gJ2Z1bmN0aW9uJ1xyXG5cclxudmFyIGNyZWF0ZURvY3VtZW50LCBDU1NTdHlsZURlY2xhcmF0aW9uXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEb2N1bWVudCBleHRlbmRzIENvbnZlcnRlcntcclxuXHRnZXQgdGFnKCl7cmV0dXJuICdodG1sJ31cclxuXHJcblx0Y29udmVydCgpe1xyXG5cdFx0dGhpcy5kb2M9dGhpcy5jb25zdHJ1Y3Rvci5jcmVhdGUodGhpcy5vcHRpb25zKVxyXG5cdFx0dGhpcy5jb250ZW50PXRoaXMuZG9jXHJcblx0XHRsZXQgY29udGVudFN0eWxlPXRoaXMuY29udGVudC5zdHlsZVxyXG5cdFx0Y29udGVudFN0eWxlLmJhY2tncm91bmRDb2xvcj0ndHJhbnNwYXJlbnQnXHJcblx0XHRjb250ZW50U3R5bGUubWluSGVpZ2h0PScxMDAwcHgnXHJcblx0XHRjb250ZW50U3R5bGUud2lkdGg9JzEwMCUnXHJcblx0XHRjb250ZW50U3R5bGUucGFkZGluZ1RvcD0nMjBweCdcclxuXHRcdGNvbnRlbnRTdHlsZS5vdmVyZmxvdz0nYXV0bydcclxuXHJcblx0XHR2YXIgc3R5bGU9dGhpcy5kb2MuY3JlYXRlU3R5bGUoJyonKVxyXG5cdFx0c3R5bGUubWFyZ2luPScwJ1xyXG5cdFx0c3R5bGUuYm9yZGVyPScwJ1xyXG5cdFx0c3R5bGUucGFkZGluZz0nMCdcclxuXHRcdHN0eWxlLmJveFNpemluZz0nYm9yZGVyLWJveCdcclxuXHJcblx0XHRzdHlsZT10aGlzLmRvYy5jcmVhdGVTdHlsZSgndGFibGUnKVxyXG5cdFx0c3R5bGUud2lkdGg9JzEwMCUnXHJcblx0XHRzdHlsZS5ib3JkZXJDb2xsYXBzZT0nY29sbGFwc2UnXHJcblx0XHRzdHlsZS53b3JkQnJlYWs9J2JyZWFrLXdvcmQnXHJcblxyXG5cdFx0c3R5bGU9dGhpcy5kb2MuY3JlYXRlU3R5bGUoJ3NlY3Rpb24nKVxyXG5cdFx0c3R5bGUubWFyZ2luPSdhdXRvJ1xyXG5cdFx0c3R5bGUuYmFja2dyb3VuZENvbG9yPSd3aGl0ZSdcclxuXHRcdHN0eWxlLmNvbG9yPSdibGFjaydcclxuXHRcdHN0eWxlLnBvc2l0aW9uPSdyZWxhdGl2ZSdcclxuXHRcdHN0eWxlLnpJbmRleD0wXHJcblxyXG5cdFx0c3R5bGU9dGhpcy5kb2MuY3JlYXRlU3R5bGUoJ3A6ZW1wdHk6YmVmb3JlJylcclxuXHRcdHN0eWxlLmNvbnRlbnQ9J1wiXCInXHJcblx0XHRzdHlsZS5kaXNwbGF5PSdpbmxpbmUtYmxvY2snXHJcblxyXG5cdFx0c3R5bGU9dGhpcy5kb2MuY3JlYXRlU3R5bGUoJ3VsJylcclxuXHRcdHN0eWxlLmxpc3RTdHlsZT1cIm5vbmVcIlxyXG5cclxuXHRcdHN0eWxlPXRoaXMuZG9jLmNyZWF0ZVN0eWxlKCd1bD5saT5wJylcclxuXHRcdHN0eWxlLnBvc2l0aW9uPSdyZWxhdGl2ZSdcclxuXHJcblx0XHRzdHlsZT10aGlzLmRvYy5jcmVhdGVTdHlsZSgndWwgLm1hcmtlcicpXHJcblx0XHRzdHlsZS5wb3NpdGlvbj0nYWJzb2x1dGUnXHJcblxyXG5cdFx0c3R5bGU9dGhpcy5kb2MuY3JlYXRlU3R5bGUoJ2EnKVxyXG5cdFx0c3R5bGUudGV4dERlY29yYXRpb249J25vbmUnXHJcblxyXG5cdFx0c3R5bGU9dGhpcy5kb2MuY3JlYXRlU3R5bGUoJy51bnN1cHBvcnRlZCcpXHJcblx0XHRzdHlsZS5vdXRsaW5lPVwiMnB4IHJlZCBzb2xpZFwiXHJcblxyXG5cdFx0c3R5bGU9dGhpcy5kb2MuY3JlYXRlU3R5bGUoJy53YXJuaW5nJylcclxuXHRcdHN0eWxlLm91dGxpbmU9XCIxcHggeWVsbG93IHNvbGlkXCJcclxuXHRcdHRoaXMuY29udmVydFN0eWxlKClcclxuXHR9XHJcblx0XHJcblx0Y29udmVydFN0eWxlKCl7XHJcblx0XHR2YXIgYmdTdHlsZT10aGlzLndvcmRNb2RlbC5nZXRCYWNrZ3JvdW5kU3R5bGUoKVxyXG5cdFx0aWYoIWJnU3R5bGUpXHJcblx0XHRcdHJldHVyblxyXG5cdFx0XHJcblx0XHR2YXIgc3R5bGU9dGhpcy5kb2MuY3JlYXRlU3R5bGUoJ3NlY3Rpb24nKVxyXG5cdFx0c3dpdGNoKHR5cGVvZiBiZ1N0eWxlKXtcclxuXHRcdGNhc2UgJ29iamVjdCc6Ly8gZmlsbFxyXG5cdFx0XHRjb25zb2xlLndhcm4oJ25vdCBzdXBwb3J0IGZpbGwgY29sb3Igb24gZG9jdW1lbnQgYmFja2dyb3VuZCB5ZXQnKVxyXG5cdFx0YnJlYWtcclxuXHRcdGRlZmF1bHQ6XHJcblx0XHRcdHN0eWxlLmJhY2tncm91bmRDb2xvcj1iZ1N0eWxlXHJcblx0XHRicmVha1xyXG5cdFx0fVxyXG5cdH1cclxuXHQvKipcclxuXHQqIG9wdDoge1xyXG5cdCogXHR0ZW1wbGF0ZTogZnVuY3Rpb24oc3R5bGUsIGh0bWwsIHByb3BzKXsgcmV0dXJuIChodG1sKX0sXHJcblx0XHRleHRlbmRTY3JpcHQ6IFwiaHR0cDovL2EuY29tL2EuanNcIlxyXG5cdFx0fVxyXG5cdCovXHJcblx0dG9TdHJpbmcob3B0KXtcclxuXHRcdHJldHVybiB0aGlzLmRvYy50b1N0cmluZyhvcHQsdGhpcy5wcm9wcylcclxuXHR9XHJcblx0cmVsZWFzZSgpe1xyXG5cdFx0dGhpcy5kb2MucmVsZWFzZSgpXHJcblx0fVxyXG5cdGFzWmlwKG9wdCl7XHJcblx0XHRyZXR1cm4gdGhpcy5kb2MuYXNaaXAob3B0LHRoaXMucHJvcHMpXHJcblx0fVxyXG5cdGRvd25sb2FkKG9wdCl7XHJcblx0XHRyZXR1cm4gdGhpcy5kb2MuZG93bmxvYWQob3B0LCB0aGlzLnByb3BzKVxyXG5cdH1cclxuXHQvKipcclxuXHQqIG9wdD1leHRlbmQodG9TdHJpbmcub3B0LHtcclxuXHRcdHNhdmVJbWFnZTogZnVuY3Rpb24oYXJyYXlCdWZmZXIsIGRvYy5wcm9wcyk6IHByb21pc2UodXJsKSB7fSxcclxuXHRcdHNhdmVIdG1sOiBmdW5jdGlvbigpe31cclxuXHR9KVxyXG5cdCovXHJcblx0c2F2ZSAob3B0KXtcclxuXHRcdHJldHVybiB0aGlzLmRvYy5zYXZlKG9wdCwgdGhpcy5wcm9wcylcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBjcmVhdGUob3B0KXtcclxuXHRcdHZhciBzZWxmQ29udmVydGVyPXRoaXNcclxuXHRcdHJldHVybiAoZnVuY3Rpb24oZG9jdW1lbnQpe1xyXG5cdFx0XHR2YXIgZG9jPShmdW5jdGlvbiBicm93c2VyRG9jKCl7XHJcblx0XHRcdFx0dmFyIHVpZD0wO1xyXG5cdFx0XHRcdHZhciByb290PU9iamVjdC5hc3NpZ24oZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jykse1xyXG5cdFx0XHRcdFx0aWQgOiBcIkFcIixcclxuXHRcdFx0XHRcdHNlY3Rpb246IG51bGwsXHJcblx0XHRcdFx0XHRjcmVhdGVFbGVtZW50OiBkb2N1bWVudC5jcmVhdGVFbGVtZW50LmJpbmQoZG9jdW1lbnQpLFxyXG5cdFx0XHRcdFx0Y3JlYXRlVGV4dE5vZGU6IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlLmJpbmQoZG9jdW1lbnQpLFxyXG5cdFx0XHRcdFx0Y3JlYXRlU3R5bGVTaGVldCgpe1xyXG5cdFx0XHRcdFx0XHRpZih0aGlzLnN0eWxlc2hlZXQpXHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMuc3R5bGVzaGVldDtcclxuXHRcdFx0XHRcdFx0dmFyIGVsU3R5bGU9dGhpcy5jcmVhdGVFbGVtZW50KCdzdHlsZScpXHJcblx0XHRcdFx0XHRcdHRoaXMuYm9keS5hcHBlbmRDaGlsZChlbFN0eWxlLG51bGwpO1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5zdHlsZXNoZWV0PWVsU3R5bGUuc2hlZXRcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRnZXRTdHlsZVRleHQoKXtcclxuXHRcdFx0XHRcdFx0dmFyIHN0eWxlcz1bXVxyXG5cdFx0XHRcdFx0XHRmb3IodmFyIGk9MCwgcnVsZXM9dGhpcy5zdHlsZXNoZWV0LmNzc1J1bGVzLCBsZW49cnVsZXMubGVuZ3RoO2k8bGVuO2krKylcclxuXHRcdFx0XHRcdFx0XHRzdHlsZXMucHVzaChydWxlc1tpXS5jc3NUZXh0KVxyXG5cdFx0XHRcdFx0XHRyZXR1cm4gc3R5bGVzLmpvaW4oJ1xcclxcbicpXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0dWlkKCl7XHJcblx0XHRcdFx0XHRcdHJldHVybiB0aGlzLmlkKyh1aWQrKylcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHR0b1N0cmluZyhvcHQsIHByb3BzPXNlbGZDb252ZXJ0ZXIucHJvcHMpe1xyXG5cdFx0XHRcdFx0XHRpZihvcHQgJiYgdHlwZW9mIG9wdC50ZW1wbGF0ZSE9XCJ1bmRlZmluZWRcIiAmJiBpc0Z1bmN0aW9uKG9wdC50ZW1wbGF0ZSkpXHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIG9wdC50ZW1wbGF0ZSh0aGlzLmdldFN0eWxlVGV4dCgpLCB0aGlzLl9odG1sKCksIHByb3BzKVxyXG5cdFx0XHRcdFx0XHR2YXIgaHRtbD1bJzwhZG9jdHlwZSBodG1sPlxcclxcbjxodG1sPjxoZWFkPjxtZXRhIGNoYXJzZXQ9dXRmLTg+PG1ldGEga2V5PVwiZ2VuZXJhdG9yXCIgdmFsdWU9XCJkb2N4Mmh0bWxcIj48dGl0bGU+JysocHJvcHMubmFtZXx8JycpKyc8L3RpdGxlPjxzdHlsZT4nXVxyXG5cdFx0XHRcdFx0XHRodG1sLnB1c2godGhpcy5nZXRTdHlsZVRleHQoKSlcclxuXHRcdFx0XHRcdFx0aHRtbC5wdXNoKCc8L3N0eWxlPjwvaGVhZD48Ym9keT4nKVxyXG5cdFx0XHRcdFx0XHRodG1sLnB1c2godGhpcy5faHRtbCgpKVxyXG5cdFx0XHRcdFx0XHRvcHQgJiYgb3B0LmV4dGVuZFNjcmlwdCAmJiBodG1sLnB1c2goJzxzY3JpcHQgc3JjPVwiJytvcHQuZXh0ZW5kU2NyaXB0KydcIj48L3NjcmlwdD4nKVxyXG5cdFx0XHRcdFx0XHRodG1sLnB1c2goJzwvYm9keT48aHRtbD4nKVxyXG5cdFx0XHRcdFx0XHRyZXR1cm4gaHRtbC5qb2luKCdcXHJcXG4nKVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdF9odG1sKCl7XHJcblx0XHRcdFx0XHRcdHZhciBkaXZzPXRoaXMucXVlcnlTZWxlY3RvckFsbCgncD5kaXYsIHNwYW4+ZGl2JylcclxuXHRcdFx0XHRcdFx0aWYoZGl2cy5sZW5ndGg9PTApXHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMub3V0ZXJIVE1MXHJcblxyXG5cdFx0XHRcdFx0XHQvKipcclxuXHRcdFx0XHRcdFx0KiBpbGxlZ2FsIDxwPiA8ZGl2Lz4gPC9wPlxyXG5cdFx0XHRcdFx0XHQqIERPTSBvcGVyYXRpb24gZGlyZWN0bHkgaW4gb25sb2FkXHJcblx0XHRcdFx0XHRcdCovXHJcblx0XHRcdFx0XHRcdHZhciBkaXZjb250YWluZXI9ZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpLCB1aWQ9MFxyXG5cdFx0XHRcdFx0XHRkaXZjb250YWluZXIuaWQ9J2RpdmNvbnRhaW5lcidcclxuXHRcdFx0XHRcdFx0ZGl2Y29udGFpbmVyLnN0eWxlLmRpc3BsYXk9XCJub25lXCJcclxuXHRcdFx0XHRcdFx0dGhpcy5hcHBlbmRDaGlsZChkaXZjb250YWluZXIpXHJcblx0XHRcdFx0XHRcdGZvcih2YXIgaT1kaXZzLmxlbmd0aC0xO2k+LTE7aS0tKXtcclxuXHRcdFx0XHRcdFx0XHR2YXIgZGl2PWRpdnNbaV0sXHJcblx0XHRcdFx0XHRcdFx0XHRwYXJlbnQ9ZGl2LnBhcmVudE5vZGU7XHJcblxyXG5cdFx0XHRcdFx0XHRcdGlmKCFkaXYuaWQpXHJcblx0XHRcdFx0XHRcdFx0XHRkaXYuaWQ9J196JysoKyt1aWQpXHJcblxyXG5cdFx0XHRcdFx0XHRcdGlmKCFwYXJlbnQuaWQpXHJcblx0XHRcdFx0XHRcdFx0XHRwYXJlbnQuaWQ9J195Jyt1aWRcclxuXHJcblx0XHRcdFx0XHRcdFx0ZGl2LnNldEF0dHJpYnV0ZSgnZGF0YS1wYXJlbnQnLHBhcmVudC5pZClcclxuXHRcdFx0XHRcdFx0XHRkaXYuc2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JyxpbmRleE9mKGRpdixwYXJlbnQuY2hpbGROb2RlcykpXHJcblxyXG5cdFx0XHRcdFx0XHRcdGRpdmNvbnRhaW5lci5hcHBlbmRDaGlsZChkaXZzW2ldKVxyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHR2YXIgaHRtbD10aGlzLm91dGVySFRNTCsnXFxuXFxyPHNjcmlwdD4oJyt0aGlzLl90cmFuc2Zvcm1lci50b1N0cmluZygpKycpKCk7PC9zY3JpcHQ+J1xyXG5cdFx0XHRcdFx0XHR0aGlzLl90cmFuc2Zvcm1lcigpO1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gaHRtbFxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdF90cmFuc2Zvcm1lcigpe1xyXG5cdFx0XHRcdFx0XHR2YXIgYT1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGl2Y29udGFpbmVyJylcclxuXHRcdFx0XHRcdFx0Zm9yKHZhciBkaXZzPWEuY2hpbGROb2RlcywgaT1kaXZzLmxlbmd0aC0xO2k+LTE7aS0tKXtcclxuXHRcdFx0XHRcdFx0XHR2YXIgZGl2PWRpdnNbaV0sXHJcblx0XHRcdFx0XHRcdFx0XHRwYXJlbnRJZD1kaXYuZ2V0QXR0cmlidXRlKCdkYXRhLXBhcmVudCcpLFxyXG5cdFx0XHRcdFx0XHRcdFx0aW5kZXg9cGFyc2VJbnQoZGl2LmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpKSxcclxuXHRcdFx0XHRcdFx0XHRcdHBhcmVudD1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjJytwYXJlbnRJZCk7XHJcblx0XHRcdFx0XHRcdFx0cGFyZW50Lmluc2VydEJlZm9yZShkaXYscGFyZW50LmNoaWxkTm9kZXNbaW5kZXhdKVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdGEucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChhKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRmdW5jdGlvbiBpbmRleE9mKGVsLCBlbHMpe1xyXG5cdFx0XHRcdFx0Zm9yKHZhciBpPWVscy5sZW5ndGgtMTtpPjA7aS0tKVxyXG5cdFx0XHRcdFx0XHRpZihlbD09ZWxzW2ldKVxyXG5cdFx0XHRcdFx0XHRcdHJldHVybiBpXHJcblx0XHRcdFx0XHRyZXR1cm4gMFxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0KG9wdCAmJiBvcHQuY29udGFpbmVyIHx8IGRvY3VtZW50LmJvZHkpLmFwcGVuZENoaWxkKHJvb3QpO1xyXG5cdFx0XHRcdHJvb3QuYm9keT1yb290XHJcblx0XHRcdFx0cmV0dXJuIHJvb3RcclxuXHRcdFx0fSkoKTtcclxuXHJcblx0XHRcdHJldHVybiAoZnVuY3Rpb24gbWl4aW4oZG9jKXtcclxuXHRcdFx0XHR2YXIgc3R5bGVzaGVldD1kb2MuY3JlYXRlU3R5bGVTaGVldCgpXHJcblx0XHRcdFx0dmFyIHJlbFN0eWxlcz17fSwgc3R5bGVzPXt9XHJcblxyXG5cdFx0XHRcdHJldHVybiBPYmplY3QuYXNzaWduKHNlbGZDb252ZXJ0ZXJbaXNOb2RlID8gJ25vZGVmeScgOiAnYnJvd3NlcmlmeSddKGRvYyxzdHlsZXNoZWV0LCBvcHQpLHtcclxuXHRcdFx0XHRcdGNyZWF0ZVN0eWxlKHNlbGVjdG9yKXtcclxuXHRcdFx0XHRcdFx0aWYoc3R5bGVzW3NlbGVjdG9yXSlcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gc3R5bGVzW3NlbGVjdG9yXVxyXG5cdFx0XHRcdFx0XHR2YXIgcnVsZXM9c3R5bGVzaGVldC5jc3NSdWxlcyxsZW49cnVsZXMubGVuZ3RoXHJcblx0XHRcdFx0XHRcdHN0eWxlc2hlZXQuaW5zZXJ0UnVsZShzZWxlY3Rvci5zcGxpdCgnLCcpLm1hcChmdW5jdGlvbihhKXtcclxuXHRcdFx0XHRcdFx0XHRcdHJldHVybiBhLnRyaW0oKVswXT09JyMnID8gYSA6ICcjJyt0aGlzLmlkKycgJythXHJcblx0XHRcdFx0XHRcdFx0fS5iaW5kKHRoaXMpKS5qb2luKCcsJykrJ3t9JyxsZW4pXHJcblx0XHRcdFx0XHRcdHJldHVybiAgc3R5bGVzW3NlbGVjdG9yXT1zdHlsZXNoZWV0LmNzc1J1bGVzW2xlbl0uc3R5bGVcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRzdHlsZVBhdGgoYSwgcGFyZW50KXtcclxuXHRcdFx0XHRcdFx0aWYocGFyZW50KVxyXG5cdFx0XHRcdFx0XHRcdHJldHVybiByZWxTdHlsZXNbYV09cGFyZW50XHJcblx0XHRcdFx0XHRcdHZhciBwYXRocz1bYV0scGFyZW50PWFcclxuXHRcdFx0XHRcdFx0d2hpbGUocGFyZW50PXJlbFN0eWxlc1twYXJlbnRdKVxyXG5cdFx0XHRcdFx0XHRcdHBhdGhzLnVuc2hpZnQocGFyZW50KVxyXG5cdFx0XHRcdFx0XHRyZXR1cm4gcGF0aHMuam9pbignICcpXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0cmVsZWFzZSgpe1xyXG5cdFx0XHRcdFx0XHRkZWxldGUgdGhpcy5zZWN0aW9uXHJcblx0XHRcdFx0XHRcdHRoaXMuX3JlbGVhc2UoKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pKGRvYylcclxuXHRcdH0pKGlzTm9kZSA/IGNyZWF0ZURvY3VtZW50KCkgOiBkb2N1bWVudClcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBub2RlZnkoZG9jLCBzdHlsZXNoZWV0LCBvcHQpe1xyXG5cdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oZG9jLHtcclxuXHRcdFx0X3JlbGVhc2UoKXtcclxuXHJcblx0XHRcdH0sXHJcblx0XHRcdGFzSW1hZ2VVUkwoYnVmZmVyKXtcclxuXHRcdFx0XHRpZihvcHQgJiYgdHlwZW9mKG9wdC5hc0ltYWdlVVJMKSE9J3VuZGVmaW5lZCcpXHJcblx0XHRcdFx0XHRyZXR1cm4gb3B0LmFzSW1hZ2VVUkwoYnVmZmVyKVxyXG5cdFx0XHRcdHJldHVybiBcImltYWdlOi8vbm90c3VwcG9ydFwiXHJcblx0XHRcdH0sXHJcblx0XHRcdGFzWmlwKCl7XHJcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdub3Qgc3VwcG9ydCcpXHJcblx0XHRcdH0sXHJcblx0XHRcdGRvd25sb2FkKCl7XHJcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdub3Qgc3VwcG9ydCcpXHJcblx0XHRcdH0sXHJcblx0XHRcdHNhdmUoKXtcclxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ25vdCBzdXBwb3J0JylcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBicm93c2VyaWZ5KGRvYywgc3R5bGVzaGVldCwgb3B0KXtcclxuXHRcdHZhciBQcm90b19CbG9iPShmdW5jdGlvbihhKXtcclxuXHRcdFx0XHRhPVVSTC5jcmVhdGVPYmplY3RVUkwobmV3IEJsb2IoKSkuc3BsaXQoJy8nKTtcclxuXHRcdFx0XHRhLnBvcCgpO1xyXG5cdFx0XHRcdHJldHVybiBhLmpvaW4oJy8nKVxyXG5cdFx0XHR9KSgpLFxyXG5cdFx0XHRSZWdfUHJvdG9fQmxvYj1uZXcgUmVnRXhwKFByb3RvX0Jsb2IrXCIvKFtcXFxcd1xcXFxkLV0rKVwiLFwiZ2lcIik7XHJcblxyXG5cdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oZG9jLHtcclxuXHRcdFx0YXNaaXAob3B0LCBwcm9wcyl7XHJcblx0XHRcdFx0dmFyIHppcD1uZXcgSlNaaXAoKSxoYXNJbWFnZT1mYWxzZTtcclxuXHRcdFx0XHR2YXIgZj16aXAuZm9sZGVyKCdpbWFnZXMnKVxyXG5cdFx0XHRcdE9iamVjdC5rZXlzKHRoaXMuaW1hZ2VzKS5mb3JFYWNoKGZ1bmN0aW9uKGEpe1xyXG5cdFx0XHRcdFx0aGFzSW1hZ2U9dHJ1ZVxyXG5cdFx0XHRcdFx0Zi5maWxlKGEuc3BsaXQoJy8nKS5wb3AoKSx0aGlzW2FdKVxyXG5cdFx0XHRcdH0sdGhpcy5pbWFnZXMpXHJcblx0XHRcdFx0emlwLmZpbGUoJ3Byb3BzLmpzb24nLEpTT04uc3RyaW5naWZ5KHByb3BzKSk7XHJcblx0XHRcdFx0emlwLmZpbGUoJ21haW4uaHRtbCcsaGFzSW1hZ2UgPyB0aGlzLnRvU3RyaW5nKG9wdCkucmVwbGFjZShQcm90b19CbG9iLCdpbWFnZXMnKSA6IHRoaXMudG9TdHJpbmcoKSlcclxuXHRcdFx0XHRyZXR1cm4gemlwXHJcblx0XHRcdH0sXHJcblx0XHRcdGRvd25sb2FkKG9wdCwgcHJvcHMpe1xyXG5cdFx0XHRcdHZhciBhPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpXHJcblx0XHRcdFx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChhKVxyXG5cdFx0XHRcdGEuaHJlZj1VUkwuY3JlYXRlT2JqZWN0VVJMKHRoaXMuYXNaaXAob3B0LHByb3BzKS5nZW5lcmF0ZSh7dHlwZTonYmxvYid9KSlcclxuXHRcdFx0XHRhLmRvd25sb2FkPShwcm9wcy5uYW1lfHxcImRvY3VtZW50XCIpKycuemlwJ1xyXG5cdFx0XHRcdGEuY2xpY2soKVxyXG5cdFx0XHRcdFVSTC5yZXZva2VPYmplY3RVUkwoYS5ocmVmKVxyXG5cdFx0XHRcdGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoYSlcclxuXHRcdFx0fSxcclxuXHRcdFx0c2F2ZShvcHQsIHByb3BzKXtcclxuXHRcdFx0XHR2YXIgaGFzSW1hZ2U9ZmFsc2UsIGltYWdlcz17fSwgbWU9dGhpcztcclxuXHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5hbGwoKHRoaXMuaW1hZ2VzICYmIE9iamVjdC5rZXlzKHRoaXMuaW1hZ2VzKXx8W10pLm1hcChmdW5jdGlvbihhKXtcclxuXHRcdFx0XHRcdGhhc0ltYWdlPXRydWVcclxuXHRcdFx0XHRcdHJldHVybiBvcHQuc2F2ZUltYWdlKHRoaXNbYV0scHJvcHMpXHJcblx0XHRcdFx0XHRcdC50aGVuKGZ1bmN0aW9uKHVybCl7cmV0dXJuIGltYWdlc1thXT11cmx9KVxyXG5cdFx0XHRcdH0sdGhpcy5pbWFnZXMpKVxyXG5cdFx0XHRcdC50aGVuKGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHR2YXIgaHRtbD1tZS50b1N0cmluZyhvcHQsIHByb3BzKTtcclxuXHRcdFx0XHRcdGlmKGhhc0ltYWdlKVxyXG5cdFx0XHRcdFx0XHRodG1sPWh0bWwucmVwbGFjZShSZWdfUHJvdG9fQmxvYixmdW5jdGlvbihhLGlkKXtyZXR1cm4gaW1hZ2VzW2FdfSk7XHJcblx0XHRcdFx0XHRyZXR1cm4gb3B0LnNhdmVIdG1sKGh0bWwsIHByb3BzKVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0sXHJcblx0XHRcdGltYWdlczp7fSxcclxuXHRcdFx0YXNJbWFnZVVSTChhcnJheUJ1ZmZlcil7XHJcblx0XHRcdFx0dmFyIHVybD1VUkwuY3JlYXRlT2JqZWN0VVJMKG5ldyBCbG9iKFthcnJheUJ1ZmZlcl0sXHJcblx0XHRcdFx0XHR7dHlwZTpcImltYWdlL1wiKyh0eXBlb2YoYXJyYXlCdWZmZXIpPT0nc3RyaW5nJyA/ICdzdmcreG1sJyA6ICcqJyl9KSk7XHJcblx0XHRcdFx0dGhpcy5pbWFnZXNbdXJsXT1hcnJheUJ1ZmZlclxyXG5cdFx0XHRcdHJldHVybiB1cmxcclxuXHRcdFx0fSxcclxuXHRcdFx0X3JlbGVhc2UoKXtcclxuXHRcdFx0XHRPYmplY3Qua2V5cyh0aGlzLmltYWdlcykuZm9yRWFjaChmdW5jdGlvbihiKXtcclxuXHRcdFx0XHRcdFVSTC5yZXZva2VPYmplY3RVUkwoYilcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHRcdGRlbGV0ZSB0aGlzLmltYWdlc1xyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxufVxyXG5cclxuKGZ1bmN0aW9uKGlzTm9kZUVudiwgbSl7XHJcblx0aWYoIWlzTm9kZUVudilcdHJldHVybjtcclxuXHJcblx0Y3JlYXRlRG9jdW1lbnQ9cmVxdWlyZShtKS5qc2RvbVxyXG5cdGxldCB3aW5kb3c9Y3JlYXRlRG9jdW1lbnQoKS5kZWZhdWx0Vmlld1xyXG5cclxuXHRnbG9iYWwuYnRvYT13aW5kb3cuYnRvYVxyXG5cdENTU1N0eWxlRGVjbGFyYXRpb249d2luZG93LkNTU1N0eWxlRGVjbGFyYXRpb25cclxufSkoaXNOb2RlLCBcImpzZG9tXCIpXHJcbiJdfQ==