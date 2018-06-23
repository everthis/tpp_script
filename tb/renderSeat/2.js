'use strict'
function n(e, t) {
  for (var n = Object.getOwnPropertyNames(t), r = 0; r < n.length; r++) {
    var o = n[r],
      i = Object.getOwnPropertyDescriptor(t, o)
    i && i.configurable && void 0 === e[o] && Object.defineProperty(e, o, i)
  }
  return e
}

var r = function u() {
    var e = [].slice.call(arguments)
    return (
      e.push(u.options),
      e[0].match(/^\s*#([\w:\-\.]+)\s*$/gim) &&
        e[0].replace(/^\s*#([\w:\-\.]+)\s*$/gim, function(t, n) {
          var r = document,
            o = r && r.getElementById(n)
          e[0] = o ? o.value || o.innerHTML : t
        }),
      u.documentHTML &&
        (u.compile.call(u, u.documentHTML), (u.documentHTML = '')),
      1 == arguments.length
        ? u.compile.apply(u, e)
        : arguments.length >= 2
          ? u.to_html.apply(u, e)
          : void 0
    )
  },
  o = {
    escapehash: {
      '<': '&lt;',
      '>': '&gt;',
      '&': '&amp;',
      '"': '&quot;',
      "'": '&#x27;',
      '/': '&#x2f;'
    },
    escapereplace: function(e) {
      return o.escapehash[e]
    },
    escaping: function(e) {
      return 'string' != typeof e
        ? e
        : e.replace(/[&<>"']/gim, this.escapereplace)
    },
    detection: function(e) {
      return 'undefined' == typeof e ? '' : e
    }
  },
  i = function(e) {
    if ('undefined' != typeof console) {
      if (console.warn) return void console.warn(e)
      if (console.log) return void console.log(e)
    }
    throw e
  },
  a = function(e, t) {
    if (((e = e !== Object(e) ? {} : e), e.__proto__)) return n(e, t), e
    var r = function() {},
      o = Object.create ? Object.create(t) : new ((r.prototype = t), r)()
    for (var i in e) e.hasOwnProperty(i) && (o[i] = e[i])
    return o
  },
  s = function(e) {
    var t,
      n,
      r,
      o = /^function\s*[^\(]*\(\s*([^\)]*)\)/m,
      i = /,/,
      a = /^\s*(_?)(\S+?)\1\s*$/,
      s = /^function[^{]+{([\s\S]*)}/m,
      u = []
    'function' == typeof e
      ? e.length && (t = e.toString())
      : 'string' == typeof e && (t = e),
      (t = t.trim()),
      (r = t.match(o)),
      (n = t.match(s)[1].trim())
    for (var c = 0; c < r[1].split(i).length; c++) {
      var l = r[1].split(i)[c]
      l.replace(a, function(e, t, n) {
        u.push(n)
      })
    }
    return [u, n]
  }
;(r.__cache = {}),
  (r.version = '0.6.15'),
  (r.settings = {}),
  (r.documentHTML = ''),
  (r.tags = {
    operationOpen: '{@',
    operationClose: '}',
    interpolateOpen: '\\${',
    interpolateClose: '}',
    noneencodeOpen: '\\$\\${',
    noneencodeClose: '}',
    commentOpen: '\\{#',
    commentClose: '\\}'
  }),
  (r.options = {
    cache: !0,
    strip: !0,
    errorhandling: !0,
    detection: !0,
    _method: a(
      {
        __escapehtml: o,
        __throw: i,
        __juicer: r
      },
      {}
    )
  }),
  (r.tagInit = function() {
    var e =
        r.tags.operationOpen +
        'each\\s*([^}]*?)\\s*as\\s*(\\w*?)\\s*(,\\s*\\w*?)?' +
        r.tags.operationClose,
      t = r.tags.operationOpen + '\\/each' + r.tags.operationClose,
      n = r.tags.operationOpen + 'if\\s*([^}]*?)' + r.tags.operationClose,
      o = r.tags.operationOpen + '\\/if' + r.tags.operationClose,
      i = r.tags.operationOpen + 'else' + r.tags.operationClose,
      a = r.tags.operationOpen + 'else if\\s*([^}]*?)' + r.tags.operationClose,
      s = r.tags.interpolateOpen + '([\\s\\S]+?)' + r.tags.interpolateClose,
      u = r.tags.noneencodeOpen + '([\\s\\S]+?)' + r.tags.noneencodeClose,
      c = r.tags.commentOpen + '[^}]*?' + r.tags.commentClose,
      l =
        r.tags.operationOpen +
        'each\\s*(\\w*?)\\s*in\\s*range\\(([^}]+?)\\s*,\\s*([^}]+?)\\)' +
        r.tags.operationClose,
      f =
        r.tags.operationOpen +
        'include\\s*([^}]*?)\\s*,\\s*([^}]*?)' +
        r.tags.operationClose,
      d =
        r.tags.operationOpen + 'helper\\s*([^}]*?)\\s*' + r.tags.operationClose,
      p = '([\\s\\S]*?)',
      h = r.tags.operationOpen + '\\/helper' + r.tags.operationClose
    ;(r.settings.forstart = new RegExp(e, 'igm')),
      (r.settings.forend = new RegExp(t, 'igm')),
      (r.settings.ifstart = new RegExp(n, 'igm')),
      (r.settings.ifend = new RegExp(o, 'igm')),
      (r.settings.elsestart = new RegExp(i, 'igm')),
      (r.settings.elseifstart = new RegExp(a, 'igm')),
      (r.settings.interpolate = new RegExp(s, 'igm')),
      (r.settings.noneencode = new RegExp(u, 'igm')),
      (r.settings.inlinecomment = new RegExp(c, 'igm')),
      (r.settings.rangestart = new RegExp(l, 'igm')),
      (r.settings.include = new RegExp(f, 'igm')),
      (r.settings.helperRegister = new RegExp(d + p + h, 'igm'))
  }),
  r.tagInit(),
  (r.set = function(e, t) {
    var n = this,
      r = function(e) {
        return e.replace(/[\$\(\)\[\]\+\^\{\}\?\*\|\.]/gim, function(e) {
          return '\\' + e
        })
      },
      o = function(e, t) {
        var o = e.match(/^tag::(.*)$/i)
        return o
          ? ((n.tags[o[1]] = r(t)), void n.tagInit())
          : void (n.options[e] = t)
      }
    if (2 === arguments.length) return void o(e, t)
    if (e === Object(e)) for (var i in e) e.hasOwnProperty(i) && o(i, e[i])
  }),
  (r.register = function(e, t) {
    var n = this.options._method
    return !n.hasOwnProperty(e) && (n[e] = t)
  }),
  (r.unregister = function(e) {
    var t = this.options._method
    if (t.hasOwnProperty(e)) return delete t[e]
  }),
  (r.template = function(e) {
    var n = this
    ;(this.options = e),
      (this.__interpolate = function(e, t, n) {
        var r,
          o = e.split('|'),
          i = o[0] || ''
        return (
          o.length > 1 &&
            ((e = o.shift()),
            (r = o.shift().split(',')),
            (i =
              '_method.' + r.shift() + '.call(this, ' + [e].concat(r) + ')')),
          '<%= ' +
            (t ? '_method.__escapehtml.escaping' : '') +
            '(' +
            (n && n.detection === !1 ? '' : '_method.__escapehtml.detection') +
            '(' +
            i +
            ')) %>'
        )
      }),
      (this.__removeShell = function(e, t) {
        var o = 0
        return (
          (e = e
            .replace(r.settings.helperRegister, function(e, t, n) {
              var o = s(n),
                i = o[0],
                a = o[1],
                u = new Function(i.join(','), a)
              return r.register(t, u), e
            })
            .replace(r.settings.forstart, function(e, t, n, r) {
              var n = n || 'value',
                r = r && r.substr(1),
                i = 'i' + o++
              return (
                '<% ~function() {for(var ' +
                i +
                ' in ' +
                t +
                ') {if(' +
                t +
                '.hasOwnProperty(' +
                i +
                ')) {var ' +
                n +
                '=' +
                t +
                '[' +
                i +
                '];' +
                (r ? 'var ' + r + '=' + i + ';' : '') +
                ' %>'
              )
            })
            .replace(r.settings.forend, '<% }}}(); %>')
            .replace(r.settings.ifstart, function(e, t) {
              return '<% if(' + t + ') { %>'
            })
            .replace(r.settings.ifend, '<% } %>')
            .replace(r.settings.elsestart, function(e) {
              return '<% } else { %>'
            })
            .replace(r.settings.elseifstart, function(e, t) {
              return '<% } else if(' + t + ') { %>'
            })
            .replace(r.settings.noneencode, function(e, r) {
              return n.__interpolate(r, !1, t)
            })
            .replace(r.settings.interpolate, function(e, r) {
              return n.__interpolate(r, !0, t)
            })
            .replace(r.settings.inlinecomment, '')
            .replace(r.settings.rangestart, function(e, t, n, r) {
              var i = 'j' + o++
              return (
                '<% ~function() {for(var ' +
                i +
                '=' +
                n +
                ';' +
                i +
                '<' +
                r +
                ';' +
                i +
                '++) {{var ' +
                t +
                '=' +
                i +
                '; %>'
              )
            })
            .replace(r.settings.include, function(e, t, n) {
              return t.match(/^file\:\/\//gim)
                ? e
                : '<%= _method.__juicer(' + t + ', ' + n + '); %>'
            })),
          (t && t.errorhandling === !1) ||
            ((e = '<% try { %>' + e),
            (e +=
              '<% } catch(e) {_method.__throw("Juicer Render Exception: "+e.message);} %>')),
          e
        )
      }),
      (this.__toNative = function(e, t) {
        return this.__convert(e, !t || t.strip)
      }),
      (this.__lexicalAnalyze = function(e) {
        var n = [],
          o = [],
          i = '',
          a = [
            'if',
            'each',
            '_',
            '_method',
            'console',
            'break',
            'case',
            'catch',
            'continue',
            'debugger',
            'default',
            'delete',
            'do',
            'finally',
            'for',
            'function',
            'in',
            'instanceof',
            'new',
            'return',
            'switch',
            'this',
            'throw',
            'try',
            'typeof',
            'var',
            'void',
            'while',
            'with',
            'null',
            'typeof',
            'class',
            'enum',
            'export',
            'extends',
            'import',
            'super',
            'implements',
            'interface',
            'let',
            'package',
            'private',
            'protected',
            'public',
            'static',
            'yield',
            'const',
            'arguments',
            'true',
            'false',
            'undefined',
            'NaN'
          ],
          s = function(e, t) {
            if (
              Array.prototype.indexOf &&
              e.indexOf === Array.prototype.indexOf
            )
              return e.indexOf(t)
            for (var n = 0; n < e.length; n++) if (e[n] === t) return n
            return -1
          },
          u = function(e, i) {
            if (
              ((i = i.match(/\w+/gim)[0]),
              s(n, i) === -1 && s(a, i) === -1 && s(o, i) === -1)
            ) {
              if (
                'undefined' != typeof window &&
                'function' == typeof window[i] &&
                window[i]
                  .toString()
                  .match(
                    /^\s*?function \w+\(\) \{\s*?\[native code\]\s*?\}\s*?$/i
                  )
              )
                return e
              if (
                'undefined' != typeof t &&
                'function' == typeof t[i] &&
                t[i]
                  .toString()
                  .match(
                    /^\s*?function \w+\(\) \{\s*?\[native code\]\s*?\}\s*?$/i
                  )
              )
                return e
              if (
                'function' == typeof r.options._method[i] ||
                r.options._method.hasOwnProperty(i)
              )
                return o.push(i), e
              if (i.match(/^\d+/gim)) return e
              n.push(i)
            }
            return e
          }
        e.replace(r.settings.forstart, u)
          .replace(r.settings.interpolate, u)
          .replace(r.settings.ifstart, u)
          .replace(r.settings.elseifstart, u)
          .replace(r.settings.include, u)
          .replace(/[\+\-\*\/%!\?\|\^&~<>=,\(\)\[\]]\s*([A-Za-z_0-9]+)/gim, u)
        for (var c = 0; c < n.length; c++)
          i += 'var ' + n[c] + '=_.' + n[c] + ';'
        for (var c = 0; c < o.length; c++)
          i += 'var ' + o[c] + '=_method.' + o[c] + ';'
        return '<% ' + i + ' %>'
      }),
      (this.__convert = function(e, t) {
        var n = [].join('')
        return (
          (n += "'use strict';"),
          (n += 'var _=_||{};'),
          (n += "var _out='';_out+='"),
          (n +=
            t !== !1
              ? e
                  .replace(/\\/g, '\\\\')
                  .replace(/[\r\t\n]/g, ' ')
                  .replace(/'(?=[^%]*%>)/g, '\t')
                  .split("'")
                  .join("\\'")
                  .split('\t')
                  .join("'")
                  .replace(/<%=(.+?)%>/g, "';_out+=$1;_out+='")
                  .split('<%')
                  .join("';")
                  .split('%>')
                  .join("_out+='") + "';return _out;"
              : e
                  .replace(/\\/g, '\\\\')
                  .replace(/[\r]/g, '\\r')
                  .replace(/[\t]/g, '\\t')
                  .replace(/[\n]/g, '\\n')
                  .replace(/'(?=[^%]*%>)/g, '\t')
                  .split("'")
                  .join("\\'")
                  .split('\t')
                  .join("'")
                  .replace(/<%=(.+?)%>/g, "';_out+=$1;_out+='")
                  .split('<%')
                  .join("';")
                  .split('%>')
                  .join("_out+='") +
                "';return _out.replace(/[\\r\\n]\\s+[\\r\\n]/g, '\\r\\n');")
        )
      }),
      (this.parse = function(e, t) {
        var r = this
        return (
          (t && t.loose === !1) || (e = this.__lexicalAnalyze(e) + e),
          (e = this.__removeShell(e, t)),
          (e = this.__toNative(e, t)),
          (this._render = new Function('_, _method', e)),
          (this.render = function(e, t) {
            return (
              (t && t === n.options._method) || (t = a(t, n.options._method)),
              r._render.call(this, e, t)
            )
          }),
          this
        )
      })
  }),
  (r.compile = function(e, t) {
    ;(t && t === this.options) || (t = a(t, this.options))
    var n = this,
      r = {
        get: function(e) {
          return t.cachestore ? t.cachestore.get(e) : n.__cache[e]
        },
        set: function(e, r) {
          return t.cachestore ? t.cachestore.set(e, r) : (n.__cache[e] = r)
        }
      }
    try {
      var o = r.get(e) ? r.get(e) : new this.template(this.options).parse(e, t)
      return (t && t.cache === !1) || r.set(e, o), o
    } catch (s) {
      return (
        i('Juicer Compile Exception: ' + s.message),
        {
          render: function() {}
        }
      )
    }
  }),
  (r.to_html = function(e, t, n) {
    return (
      (n && n === this.options) || (n = a(n, this.options)),
      this.compile(e, n).render(t, n._method)
    )
  }),
  'undefined' != typeof t && 'undefined' == typeof window && r.set('cache', !1),
  'undefined' != typeof document &&
    document.body &&
    (r.documentHTML = document.body.innerHTML)
//   'undefined' != typeof e && e.exports ? (e.exports = r) : (this.juicer = r)
module.exports = r
