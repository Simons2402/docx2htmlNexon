"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _create = require("babel-runtime/core-js/object/create");

var _create2 = _interopRequireDefault(_create);

exports.default = docx2html;

var _docx4js = require("docx4js");

var _docx4js2 = _interopRequireDefault(_docx4js);

var _factory = require("./docx/html/factory");

var _factory2 = _interopRequireDefault(_factory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 
 * @param {*} file 
 * @param {*} options {
 * 	container: optional, default is document.body, a HTMLElement to contain converted html
 * 	asImageURL: only nodejs required, a function to convert image data to url
 * }
 * @returns 
 */
function docx2html(file, opt) {
	return _docx4js2.default.load(file).then(function (docx) {
		var html = docx.parse(_docx4js2.default.createVisitorFactory(_factory2.default, opt));
		return (0, _create2.default)({
			content: html.content,
			toString: function toString() {
				return html.toString.apply(html, arguments);
			},
			asZip: function asZip() {
				return html.asZip.apply(html, arguments);
			},
			download: function download() {
				return html.download.apply(html, arguments);
			},
			save: function save() {
				return html.save.apply(html, arguments);
			},
			release: function release() {
				html.release();
			}
		});
	});
}
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJkb2N4Mmh0bWwiLCJmaWxlIiwib3B0IiwiZG9jeDRqcyIsImxvYWQiLCJ0aGVuIiwiaHRtbCIsImRvY3giLCJwYXJzZSIsImNyZWF0ZVZpc2l0b3JGYWN0b3J5IiwiY29udmVydGVycyIsImNvbnRlbnQiLCJ0b1N0cmluZyIsImFyZ3VtZW50cyIsImFzWmlwIiwiZG93bmxvYWQiLCJzYXZlIiwicmVsZWFzZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztrQkFZd0JBLFM7O0FBWnhCOzs7O0FBQ0E7Ozs7OztBQUVBOzs7Ozs7Ozs7QUFTZSxTQUFTQSxTQUFULENBQW1CQyxJQUFuQixFQUF5QkMsR0FBekIsRUFBNkI7QUFDM0MsUUFBT0Msa0JBQVFDLElBQVIsQ0FBYUgsSUFBYixFQUNMSSxJQURLLENBQ0EsZ0JBQU07QUFDWCxNQUFNQyxPQUFLQyxLQUFLQyxLQUFMLENBQVdMLGtCQUFRTSxvQkFBUixDQUE2QkMsaUJBQTdCLEVBQXdDUixHQUF4QyxDQUFYLENBQVg7QUFDQSxTQUFPLHNCQUFjO0FBQ3BCUyxZQUFTTCxLQUFLSyxPQURNO0FBRXBCQyxXQUZvQixzQkFFVjtBQUNULFdBQU9OLEtBQUtNLFFBQUwsYUFBaUJDLFNBQWpCLENBQVA7QUFDQSxJQUptQjtBQUtwQkMsUUFMb0IsbUJBS2I7QUFDTixXQUFPUixLQUFLUSxLQUFMLGFBQWNELFNBQWQsQ0FBUDtBQUNBLElBUG1CO0FBUXBCRSxXQVJvQixzQkFRVjtBQUNULFdBQU9ULEtBQUtTLFFBQUwsYUFBaUJGLFNBQWpCLENBQVA7QUFDQSxJQVZtQjtBQVdwQkcsT0FYb0Isa0JBV2Q7QUFDTCxXQUFPVixLQUFLVSxJQUFMLGFBQWFILFNBQWIsQ0FBUDtBQUNBLElBYm1CO0FBY3BCSSxVQWRvQixxQkFjWDtBQUNSWCxTQUFLVyxPQUFMO0FBQ0E7QUFoQm1CLEdBQWQsQ0FBUDtBQWtCQSxFQXJCSyxDQUFQO0FBc0JBIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGRvY3g0anMgZnJvbSBcImRvY3g0anNcIlxyXG5pbXBvcnQgY29udmVydGVycyBmcm9tIFwiLi9kb2N4L2h0bWwvZmFjdG9yeVwiXHJcblxyXG4vKipcclxuICogXHJcbiAqIEBwYXJhbSB7Kn0gZmlsZSBcclxuICogQHBhcmFtIHsqfSBvcHRpb25zIHtcclxuICogXHRjb250YWluZXI6IG9wdGlvbmFsLCBkZWZhdWx0IGlzIGRvY3VtZW50LmJvZHksIGEgSFRNTEVsZW1lbnQgdG8gY29udGFpbiBjb252ZXJ0ZWQgaHRtbFxyXG4gKiBcdGFzSW1hZ2VVUkw6IG9ubHkgbm9kZWpzIHJlcXVpcmVkLCBhIGZ1bmN0aW9uIHRvIGNvbnZlcnQgaW1hZ2UgZGF0YSB0byB1cmxcclxuICogfVxyXG4gKiBAcmV0dXJucyBcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRvY3gyaHRtbChmaWxlLCBvcHQpe1xyXG5cdHJldHVybiBkb2N4NGpzLmxvYWQoZmlsZSlcclxuXHRcdC50aGVuKGRvY3g9PntcclxuXHRcdFx0Y29uc3QgaHRtbD1kb2N4LnBhcnNlKGRvY3g0anMuY3JlYXRlVmlzaXRvckZhY3RvcnkoY29udmVydGVycyxvcHQpKVxyXG5cdFx0XHRyZXR1cm4gT2JqZWN0LmNyZWF0ZSh7XHJcblx0XHRcdFx0Y29udGVudDogaHRtbC5jb250ZW50LCBcclxuXHRcdFx0XHR0b1N0cmluZygpe1xyXG5cdFx0XHRcdFx0cmV0dXJuIGh0bWwudG9TdHJpbmcoLi4uYXJndW1lbnRzKVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0YXNaaXAoKXtcclxuXHRcdFx0XHRcdHJldHVybiBodG1sLmFzWmlwKC4uLmFyZ3VtZW50cylcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGRvd25sb2FkKCl7XHJcblx0XHRcdFx0XHRyZXR1cm4gaHRtbC5kb3dubG9hZCguLi5hcmd1bWVudHMpXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRzYXZlKCl7XHJcblx0XHRcdFx0XHRyZXR1cm4gaHRtbC5zYXZlKC4uLmFyZ3VtZW50cylcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHJlbGVhc2UoKXtcclxuXHRcdFx0XHRcdGh0bWwucmVsZWFzZSgpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KVxyXG5cdFx0fSlcclxufSJdfQ==