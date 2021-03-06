// Generated by CoffeeScript 1.3.3
(function() {
  var eh;

  eh = exports.errorHandler = {
    generateParseError: function(view, e) {
      /*
          e: the error caught when compiling
      */

      var msg, res, search;
      msg = e.message;
      res = {
        src_line: 0,
        toffee_line_range: [0, 1],
        original_msg: msg,
        converted_msg: msg
      };
      search = msg.match(/on line ([0-9]+)/);
      if (!((search != null ? search.length : void 0) >= 2)) {
        return res;
      }
      res.src_line = parseInt(search[1]);
      res.toffee_line_range = [res.src_line, res.src_line];
      if (view.fileName) {
        res.converted_msg = "" + view.fileName + ": " + res.converted_msg;
      }
      return res;
    },
    generateRuntimeError: function(view, e) {
      /*
          e: the error caught when compiling
      */

      var after, after_matches, before, msg, new_msg, prev_matches, res, search, src, src_lines, stack, txt_lines;
      src = view.javaScript;
      msg = e.message;
      stack = e.stack;
      res = {
        src_line: 0,
        toffee_line_range: [0, 1],
        original_msg: msg,
        converted_msg: msg
      };
      search = stack.match(/pub\ \(undefined\:([0-9]+):[0-9]+/);
      if (!((search != null ? search.length : void 0) >= 2)) {
        return res;
      }
      res.src_line = search[1];
      src_lines = src.split('\n');
      txt_lines = view.txt.split('\n');
      before = src_lines.slice(0, res.src_line).join("\n");
      after = src_lines.slice(res.src_line).join("\n");
      prev_matches = before.match(/__toffee.lineno[ ]*=[ ]*([0-9]+)/g);
      after_matches = after.match(/__toffee.lineno[ ]*=[ ]*([0-9]+)/g);
      if (prev_matches != null ? prev_matches.length : void 0) {
        res.toffee_line_range[0] = parseInt(prev_matches[prev_matches.length - 1].match(/[0-9]+/)[0]);
      } else {
        res.toffee_line_range[0] = 1;
      }
      if (after_matches != null ? after_matches.length : void 0) {
        res.toffee_line_range[1] = parseInt(after_matches[0].match(/[0-9]+/)[0]);
      } else {
        res.toffee_line_range[1] = txt_lines.length;
      }
      res.offensive_lines = txt_lines.slice(res.toffee_line_range[0] - 1, res.toffee_line_range[1] - 1);
      if (res.toffee_line_range[0] === res.toffee_line_range[1]) {
        new_msg = "on line " + res.toffee_line_range[0];
      } else {
        new_msg = "between lines " + res.toffee_line_range[0] + " and " + res.toffee_line_range[1];
      }
      res.converted_msg = res.original_msg + " " + new_msg;
      if (view.fileName) {
        res.converted_msg = "" + view.fileName + ": " + res.converted_msg;
      }
      return res;
    },
    generateCompileToJsError: function(view, e) {
      /*
          e: the error caught when compiling
      */

      var after, after_matches, before, msg, new_msg, prev_matches, res, search, src, src_lines, txt_lines;
      src = view.coffeeScript;
      msg = e.message;
      res = {
        src_line: 0,
        toffee_line_range: [0, 1],
        original_msg: msg,
        converted_msg: msg
      };
      search = msg.match(/on line ([0-9]+)/);
      if (!((search != null ? search.length : void 0) >= 2)) {
        return res;
      }
      res.src_line = search[1];
      src_lines = src.split('\n');
      txt_lines = view.txt.split('\n');
      before = src_lines.slice(0, res.src_line).join("\n");
      after = src_lines.slice(res.src_line).join("\n");
      prev_matches = before.match(/__toffee.lineno[ ]*=[ ]*([0-9]+)/g);
      after_matches = after.match(/__toffee.lineno[ ]*=[ ]*([0-9]+)/g);
      if (prev_matches != null ? prev_matches.length : void 0) {
        res.toffee_line_range[0] = parseInt(prev_matches[prev_matches.length - 1].match(/[0-9]+/)[0]);
      } else {
        res.toffee_line_range[0] = 1;
      }
      if (after_matches != null ? after_matches.length : void 0) {
        res.toffee_line_range[1] = parseInt(after_matches[0].match(/[0-9]+/)[0]);
      } else {
        res.toffee_line_range[1] = txt_lines.length;
      }
      res.offensive_lines = txt_lines.slice(res.toffee_line_range[0] - 1, res.toffee_line_range[1] - 1);
      if (res.toffee_line_range[0] === res.toffee_line_range[1]) {
        new_msg = "on line " + res.toffee_line_range[0];
      } else {
        new_msg = "between lines " + res.toffee_line_range[0] + " and " + res.toffee_line_range[1];
      }
      res.converted_msg = res.original_msg.replace("on line " + res.src_line, new_msg);
      if (view.fileName) {
        res.converted_msg = "" + view.fileName + ": " + res.converted_msg;
      }
      return res;
    },
    prettyPrintError: function(view) {
      var i, line, lineno, padding, padding_len, res, txt_lines, _i, _ref, _ref1;
      if (!view.error) {
        return "";
      } else {
        res = "<div style=\"border:1px solid #999;margin:10px;padding:10px;background-color:#fff;position:fixed;top:0;left:0;width:960px;z-index:9999;\">";
        res += "<b>" + (eh._ppEscape(view.error.converted_msg)) + "</b>";
        res += "\n  <br />--------<br />";
        res += "\n<div style=\"font-family:courier new;font-size:10pt;color:#900;\">";
        txt_lines = view.txt.split('\n');
        for (i = _i = _ref = view.error.toffee_line_range[0] - 3, _ref1 = view.error.toffee_line_range[1] + 1; _ref <= _ref1 ? _i < _ref1 : _i > _ref1; i = _ref <= _ref1 ? ++_i : --_i) {
          if ((i < 0) || i > txt_lines.length - 1) {
            continue;
          }
          line = eh._ppEscape(txt_lines[i]);
          lineno = i + 1;
          padding_len = 5 - ("" + lineno).length;
          padding = ((function() {
            var _j, _results;
            _results = [];
            for (i = _j = 0; 0 <= padding_len ? _j < padding_len : _j > padding_len; i = 0 <= padding_len ? ++_j : --_j) {
              _results.push("&nbsp;");
            }
            return _results;
          })()).join("");
          res += "\n" + lineno + ": " + padding + " " + line + " <br />";
        }
        res += "\n</div>";
        res += "\n</div>";
        return res;
      }
    },
    _ppEscape: function(txt) {
      var i, m;
      txt = txt.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
      m = txt.match(/^[\t ]*/);
      return txt = txt.replace(m[0], ((function() {
        var _i, _ref, _results;
        _results = [];
        for (i = _i = 0, _ref = m[0].length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
          _results.push("&nbsp;");
        }
        return _results;
      })()).join(""));
    }
  };

}).call(this);
