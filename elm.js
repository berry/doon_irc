var Elm = Elm || { Native: {} };
Elm.Array = Elm.Array || {};
Elm.Array.make = function (_elm) {
   "use strict";
   _elm.Array = _elm.Array || {};
   if (_elm.Array.values)
   return _elm.Array.values;
   var _op = {},
   _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   $moduleName = "Array",
   $Basics = Elm.Basics.make(_elm),
   $List = Elm.List.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Native$Array = Elm.Native.Array.make(_elm);
   var append = $Native$Array.append;
   var length = $Native$Array.length;
   var isEmpty = function (array) {
      return _U.eq(length(array),
      0);
   };
   var slice = $Native$Array.slice;
   var set = $Native$Array.set;
   var get = F2(function (i,
   array) {
      return _U.cmp(0,
      i) < 1 && _U.cmp(i,
      $Native$Array.length(array)) < 0 ? $Maybe.Just(A2($Native$Array.get,
      i,
      array)) : $Maybe.Nothing;
   });
   var push = $Native$Array.push;
   var empty = $Native$Array.empty;
   var filter = F2(function (isOkay,
   arr) {
      return function () {
         var update = F2(function (x,
         xs) {
            return isOkay(x) ? A2($Native$Array.push,
            x,
            xs) : xs;
         });
         return A3($Native$Array.foldl,
         update,
         $Native$Array.empty,
         arr);
      }();
   });
   var foldr = $Native$Array.foldr;
   var foldl = $Native$Array.foldl;
   var indexedMap = $Native$Array.indexedMap;
   var map = $Native$Array.map;
   var toIndexedList = function (array) {
      return A3($List.map2,
      F2(function (v0,v1) {
         return {ctor: "_Tuple2"
                ,_0: v0
                ,_1: v1};
      }),
      _L.range(0,
      $Native$Array.length(array) - 1),
      $Native$Array.toList(array));
   };
   var toList = $Native$Array.toList;
   var fromList = $Native$Array.fromList;
   var initialize = $Native$Array.initialize;
   var repeat = F2(function (n,e) {
      return A2(initialize,
      n,
      $Basics.always(e));
   });
   var Array = {ctor: "Array"};
   _elm.Array.values = {_op: _op
                       ,empty: empty
                       ,repeat: repeat
                       ,initialize: initialize
                       ,fromList: fromList
                       ,isEmpty: isEmpty
                       ,length: length
                       ,push: push
                       ,append: append
                       ,get: get
                       ,set: set
                       ,slice: slice
                       ,toList: toList
                       ,toIndexedList: toIndexedList
                       ,map: map
                       ,indexedMap: indexedMap
                       ,filter: filter
                       ,foldl: foldl
                       ,foldr: foldr};
   return _elm.Array.values;
};
Elm.Basics = Elm.Basics || {};
Elm.Basics.make = function (_elm) {
   "use strict";
   _elm.Basics = _elm.Basics || {};
   if (_elm.Basics.values)
   return _elm.Basics.values;
   var _op = {},
   _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   $moduleName = "Basics",
   $Native$Basics = Elm.Native.Basics.make(_elm),
   $Native$Show = Elm.Native.Show.make(_elm),
   $Native$Utils = Elm.Native.Utils.make(_elm);
   var uncurry = F2(function (f,
   _v0) {
      return function () {
         switch (_v0.ctor)
         {case "_Tuple2": return A2(f,
              _v0._0,
              _v0._1);}
         _U.badCase($moduleName,
         "on line 595, column 3 to 8");
      }();
   });
   var curry = F3(function (f,
   a,
   b) {
      return f({ctor: "_Tuple2"
               ,_0: a
               ,_1: b});
   });
   var flip = F3(function (f,b,a) {
      return A2(f,a,b);
   });
   var snd = function (_v4) {
      return function () {
         switch (_v4.ctor)
         {case "_Tuple2": return _v4._1;}
         _U.badCase($moduleName,
         "on line 573, column 3 to 4");
      }();
   };
   var fst = function (_v8) {
      return function () {
         switch (_v8.ctor)
         {case "_Tuple2": return _v8._0;}
         _U.badCase($moduleName,
         "on line 567, column 3 to 4");
      }();
   };
   var always = F2(function (a,
   _v12) {
      return function () {
         return a;
      }();
   });
   var identity = function (x) {
      return x;
   };
   _op["<|"] = F2(function (f,x) {
      return f(x);
   });
   _op["|>"] = F2(function (x,f) {
      return f(x);
   });
   _op[">>"] = F3(function (f,
   g,
   x) {
      return g(f(x));
   });
   _op["<<"] = F3(function (g,
   f,
   x) {
      return g(f(x));
   });
   _op["++"] = $Native$Utils.append;
   var toString = $Native$Show.toString;
   var isInfinite = $Native$Basics.isInfinite;
   var isNaN = $Native$Basics.isNaN;
   var toFloat = $Native$Basics.toFloat;
   var ceiling = $Native$Basics.ceiling;
   var floor = $Native$Basics.floor;
   var truncate = $Native$Basics.truncate;
   var round = $Native$Basics.round;
   var otherwise = true;
   var not = $Native$Basics.not;
   var xor = $Native$Basics.xor;
   _op["||"] = $Native$Basics.or;
   _op["&&"] = $Native$Basics.and;
   var max = $Native$Basics.max;
   var min = $Native$Basics.min;
   var GT = {ctor: "GT"};
   var EQ = {ctor: "EQ"};
   var LT = {ctor: "LT"};
   var compare = $Native$Basics.compare;
   _op[">="] = $Native$Basics.ge;
   _op["<="] = $Native$Basics.le;
   _op[">"] = $Native$Basics.gt;
   _op["<"] = $Native$Basics.lt;
   _op["/="] = $Native$Basics.neq;
   _op["=="] = $Native$Basics.eq;
   var e = $Native$Basics.e;
   var pi = $Native$Basics.pi;
   var clamp = $Native$Basics.clamp;
   var logBase = $Native$Basics.logBase;
   var abs = $Native$Basics.abs;
   var negate = $Native$Basics.negate;
   var sqrt = $Native$Basics.sqrt;
   var atan2 = $Native$Basics.atan2;
   var atan = $Native$Basics.atan;
   var asin = $Native$Basics.asin;
   var acos = $Native$Basics.acos;
   var tan = $Native$Basics.tan;
   var sin = $Native$Basics.sin;
   var cos = $Native$Basics.cos;
   _op["^"] = $Native$Basics.exp;
   _op["%"] = $Native$Basics.mod;
   var rem = $Native$Basics.rem;
   _op["//"] = $Native$Basics.div;
   _op["/"] = $Native$Basics.floatDiv;
   _op["*"] = $Native$Basics.mul;
   _op["-"] = $Native$Basics.sub;
   _op["+"] = $Native$Basics.add;
   var toPolar = $Native$Basics.toPolar;
   var fromPolar = $Native$Basics.fromPolar;
   var turns = $Native$Basics.turns;
   var degrees = $Native$Basics.degrees;
   var radians = function (t) {
      return t;
   };
   _elm.Basics.values = {_op: _op
                        ,max: max
                        ,min: min
                        ,compare: compare
                        ,not: not
                        ,xor: xor
                        ,otherwise: otherwise
                        ,rem: rem
                        ,negate: negate
                        ,abs: abs
                        ,sqrt: sqrt
                        ,clamp: clamp
                        ,logBase: logBase
                        ,e: e
                        ,pi: pi
                        ,cos: cos
                        ,sin: sin
                        ,tan: tan
                        ,acos: acos
                        ,asin: asin
                        ,atan: atan
                        ,atan2: atan2
                        ,round: round
                        ,floor: floor
                        ,ceiling: ceiling
                        ,truncate: truncate
                        ,toFloat: toFloat
                        ,degrees: degrees
                        ,radians: radians
                        ,turns: turns
                        ,toPolar: toPolar
                        ,fromPolar: fromPolar
                        ,isNaN: isNaN
                        ,isInfinite: isInfinite
                        ,toString: toString
                        ,fst: fst
                        ,snd: snd
                        ,identity: identity
                        ,always: always
                        ,flip: flip
                        ,curry: curry
                        ,uncurry: uncurry
                        ,LT: LT
                        ,EQ: EQ
                        ,GT: GT};
   return _elm.Basics.values;
};
Elm.Char = Elm.Char || {};
Elm.Char.make = function (_elm) {
   "use strict";
   _elm.Char = _elm.Char || {};
   if (_elm.Char.values)
   return _elm.Char.values;
   var _op = {},
   _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   $moduleName = "Char",
   $Basics = Elm.Basics.make(_elm),
   $Native$Char = Elm.Native.Char.make(_elm);
   var fromCode = $Native$Char.fromCode;
   var toCode = $Native$Char.toCode;
   var toLocaleLower = $Native$Char.toLocaleLower;
   var toLocaleUpper = $Native$Char.toLocaleUpper;
   var toLower = $Native$Char.toLower;
   var toUpper = $Native$Char.toUpper;
   var isBetween = F3(function (low,
   high,
   $char) {
      return function () {
         var code = toCode($char);
         return _U.cmp(code,
         toCode(low)) > -1 && _U.cmp(code,
         toCode(high)) < 1;
      }();
   });
   var isUpper = A2(isBetween,
   _U.chr("A"),
   _U.chr("Z"));
   var isLower = A2(isBetween,
   _U.chr("a"),
   _U.chr("z"));
   var isDigit = A2(isBetween,
   _U.chr("0"),
   _U.chr("9"));
   var isOctDigit = A2(isBetween,
   _U.chr("0"),
   _U.chr("7"));
   var isHexDigit = function ($char) {
      return isDigit($char) || (A3(isBetween,
      _U.chr("a"),
      _U.chr("f"),
      $char) || A3(isBetween,
      _U.chr("A"),
      _U.chr("F"),
      $char));
   };
   _elm.Char.values = {_op: _op
                      ,isUpper: isUpper
                      ,isLower: isLower
                      ,isDigit: isDigit
                      ,isOctDigit: isOctDigit
                      ,isHexDigit: isHexDigit
                      ,toUpper: toUpper
                      ,toLower: toLower
                      ,toLocaleUpper: toLocaleUpper
                      ,toLocaleLower: toLocaleLower
                      ,toCode: toCode
                      ,fromCode: fromCode};
   return _elm.Char.values;
};
Elm.Color = Elm.Color || {};
Elm.Color.make = function (_elm) {
   "use strict";
   _elm.Color = _elm.Color || {};
   if (_elm.Color.values)
   return _elm.Color.values;
   var _op = {},
   _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   $moduleName = "Color",
   $Basics = Elm.Basics.make(_elm);
   var Radial = F5(function (a,
   b,
   c,
   d,
   e) {
      return {ctor: "Radial"
             ,_0: a
             ,_1: b
             ,_2: c
             ,_3: d
             ,_4: e};
   });
   var radial = Radial;
   var Linear = F3(function (a,
   b,
   c) {
      return {ctor: "Linear"
             ,_0: a
             ,_1: b
             ,_2: c};
   });
   var linear = Linear;
   var fmod = F2(function (f,n) {
      return function () {
         var integer = $Basics.floor(f);
         return $Basics.toFloat(A2($Basics._op["%"],
         integer,
         n)) + f - $Basics.toFloat(integer);
      }();
   });
   var rgbToHsl = F3(function (red,
   green,
   blue) {
      return function () {
         var b = $Basics.toFloat(blue) / 255;
         var g = $Basics.toFloat(green) / 255;
         var r = $Basics.toFloat(red) / 255;
         var cMax = A2($Basics.max,
         A2($Basics.max,r,g),
         b);
         var cMin = A2($Basics.min,
         A2($Basics.min,r,g),
         b);
         var c = cMax - cMin;
         var lightness = (cMax + cMin) / 2;
         var saturation = _U.eq(lightness,
         0) ? 0 : c / (1 - $Basics.abs(2 * lightness - 1));
         var hue = $Basics.degrees(60) * (_U.eq(cMax,
         r) ? A2(fmod,
         (g - b) / c,
         6) : _U.eq(cMax,
         g) ? (b - r) / c + 2 : _U.eq(cMax,
         b) ? (r - g) / c + 4 : _U.badIf($moduleName,
         "between lines 150 and 152"));
         return {ctor: "_Tuple3"
                ,_0: hue
                ,_1: saturation
                ,_2: lightness};
      }();
   });
   var hslToRgb = F3(function (hue,
   saturation,
   lightness) {
      return function () {
         var hue$ = hue / $Basics.degrees(60);
         var chroma = (1 - $Basics.abs(2 * lightness - 1)) * saturation;
         var x = chroma * (1 - $Basics.abs(A2(fmod,
         hue$,
         2) - 1));
         var $ = _U.cmp(hue$,
         0) < 0 ? {ctor: "_Tuple3"
                  ,_0: 0
                  ,_1: 0
                  ,_2: 0} : _U.cmp(hue$,
         1) < 0 ? {ctor: "_Tuple3"
                  ,_0: chroma
                  ,_1: x
                  ,_2: 0} : _U.cmp(hue$,
         2) < 0 ? {ctor: "_Tuple3"
                  ,_0: x
                  ,_1: chroma
                  ,_2: 0} : _U.cmp(hue$,
         3) < 0 ? {ctor: "_Tuple3"
                  ,_0: 0
                  ,_1: chroma
                  ,_2: x} : _U.cmp(hue$,
         4) < 0 ? {ctor: "_Tuple3"
                  ,_0: 0
                  ,_1: x
                  ,_2: chroma} : _U.cmp(hue$,
         5) < 0 ? {ctor: "_Tuple3"
                  ,_0: x
                  ,_1: 0
                  ,_2: chroma} : _U.cmp(hue$,
         6) < 0 ? {ctor: "_Tuple3"
                  ,_0: chroma
                  ,_1: 0
                  ,_2: x} : {ctor: "_Tuple3"
                            ,_0: 0
                            ,_1: 0
                            ,_2: 0},
         r = $._0,
         g = $._1,
         b = $._2;
         var m = lightness - chroma / 2;
         return {ctor: "_Tuple3"
                ,_0: r + m
                ,_1: g + m
                ,_2: b + m};
      }();
   });
   var toRgb = function (color) {
      return function () {
         switch (color.ctor)
         {case "HSLA":
            return function () {
                 var $ = A3(hslToRgb,
                 color._0,
                 color._1,
                 color._2),
                 r = $._0,
                 g = $._1,
                 b = $._2;
                 return {_: {}
                        ,alpha: color._3
                        ,blue: $Basics.round(255 * b)
                        ,green: $Basics.round(255 * g)
                        ,red: $Basics.round(255 * r)};
              }();
            case "RGBA": return {_: {}
                                ,alpha: color._3
                                ,blue: color._2
                                ,green: color._1
                                ,red: color._0};}
         _U.badCase($moduleName,
         "between lines 124 and 132");
      }();
   };
   var toHsl = function (color) {
      return function () {
         switch (color.ctor)
         {case "HSLA": return {_: {}
                              ,alpha: color._3
                              ,hue: color._0
                              ,lightness: color._2
                              ,saturation: color._1};
            case "RGBA":
            return function () {
                 var $ = A3(rgbToHsl,
                 color._0,
                 color._1,
                 color._2),
                 h = $._0,
                 s = $._1,
                 l = $._2;
                 return {_: {}
                        ,alpha: color._3
                        ,hue: h
                        ,lightness: l
                        ,saturation: s};
              }();}
         _U.badCase($moduleName,
         "between lines 114 and 118");
      }();
   };
   var HSLA = F4(function (a,
   b,
   c,
   d) {
      return {ctor: "HSLA"
             ,_0: a
             ,_1: b
             ,_2: c
             ,_3: d};
   });
   var hsla = F4(function (hue,
   saturation,
   lightness,
   alpha) {
      return A4(HSLA,
      hue - $Basics.turns($Basics.toFloat($Basics.floor(hue / (2 * $Basics.pi)))),
      saturation,
      lightness,
      alpha);
   });
   var hsl = F3(function (hue,
   saturation,
   lightness) {
      return A4(hsla,
      hue,
      saturation,
      lightness,
      1);
   });
   var complement = function (color) {
      return function () {
         switch (color.ctor)
         {case "HSLA": return A4(hsla,
              color._0 + $Basics.degrees(180),
              color._1,
              color._2,
              color._3);
            case "RGBA":
            return function () {
                 var $ = A3(rgbToHsl,
                 color._0,
                 color._1,
                 color._2),
                 h = $._0,
                 s = $._1,
                 l = $._2;
                 return A4(hsla,
                 h + $Basics.degrees(180),
                 s,
                 l,
                 color._3);
              }();}
         _U.badCase($moduleName,
         "between lines 105 and 108");
      }();
   };
   var grayscale = function (p) {
      return A4(HSLA,0,0,1 - p,1);
   };
   var greyscale = function (p) {
      return A4(HSLA,0,0,1 - p,1);
   };
   var RGBA = F4(function (a,
   b,
   c,
   d) {
      return {ctor: "RGBA"
             ,_0: a
             ,_1: b
             ,_2: c
             ,_3: d};
   });
   var rgba = RGBA;
   var rgb = F3(function (r,g,b) {
      return A4(RGBA,r,g,b,1);
   });
   var lightRed = A4(RGBA,
   239,
   41,
   41,
   1);
   var red = A4(RGBA,204,0,0,1);
   var darkRed = A4(RGBA,
   164,
   0,
   0,
   1);
   var lightOrange = A4(RGBA,
   252,
   175,
   62,
   1);
   var orange = A4(RGBA,
   245,
   121,
   0,
   1);
   var darkOrange = A4(RGBA,
   206,
   92,
   0,
   1);
   var lightYellow = A4(RGBA,
   255,
   233,
   79,
   1);
   var yellow = A4(RGBA,
   237,
   212,
   0,
   1);
   var darkYellow = A4(RGBA,
   196,
   160,
   0,
   1);
   var lightGreen = A4(RGBA,
   138,
   226,
   52,
   1);
   var green = A4(RGBA,
   115,
   210,
   22,
   1);
   var darkGreen = A4(RGBA,
   78,
   154,
   6,
   1);
   var lightBlue = A4(RGBA,
   114,
   159,
   207,
   1);
   var blue = A4(RGBA,
   52,
   101,
   164,
   1);
   var darkBlue = A4(RGBA,
   32,
   74,
   135,
   1);
   var lightPurple = A4(RGBA,
   173,
   127,
   168,
   1);
   var purple = A4(RGBA,
   117,
   80,
   123,
   1);
   var darkPurple = A4(RGBA,
   92,
   53,
   102,
   1);
   var lightBrown = A4(RGBA,
   233,
   185,
   110,
   1);
   var brown = A4(RGBA,
   193,
   125,
   17,
   1);
   var darkBrown = A4(RGBA,
   143,
   89,
   2,
   1);
   var black = A4(RGBA,0,0,0,1);
   var white = A4(RGBA,
   255,
   255,
   255,
   1);
   var lightGrey = A4(RGBA,
   238,
   238,
   236,
   1);
   var grey = A4(RGBA,
   211,
   215,
   207,
   1);
   var darkGrey = A4(RGBA,
   186,
   189,
   182,
   1);
   var lightGray = A4(RGBA,
   238,
   238,
   236,
   1);
   var gray = A4(RGBA,
   211,
   215,
   207,
   1);
   var darkGray = A4(RGBA,
   186,
   189,
   182,
   1);
   var lightCharcoal = A4(RGBA,
   136,
   138,
   133,
   1);
   var charcoal = A4(RGBA,
   85,
   87,
   83,
   1);
   var darkCharcoal = A4(RGBA,
   46,
   52,
   54,
   1);
   _elm.Color.values = {_op: _op
                       ,rgb: rgb
                       ,rgba: rgba
                       ,hsl: hsl
                       ,hsla: hsla
                       ,greyscale: greyscale
                       ,grayscale: grayscale
                       ,complement: complement
                       ,linear: linear
                       ,radial: radial
                       ,toRgb: toRgb
                       ,toHsl: toHsl
                       ,red: red
                       ,orange: orange
                       ,yellow: yellow
                       ,green: green
                       ,blue: blue
                       ,purple: purple
                       ,brown: brown
                       ,lightRed: lightRed
                       ,lightOrange: lightOrange
                       ,lightYellow: lightYellow
                       ,lightGreen: lightGreen
                       ,lightBlue: lightBlue
                       ,lightPurple: lightPurple
                       ,lightBrown: lightBrown
                       ,darkRed: darkRed
                       ,darkOrange: darkOrange
                       ,darkYellow: darkYellow
                       ,darkGreen: darkGreen
                       ,darkBlue: darkBlue
                       ,darkPurple: darkPurple
                       ,darkBrown: darkBrown
                       ,white: white
                       ,lightGrey: lightGrey
                       ,grey: grey
                       ,darkGrey: darkGrey
                       ,lightCharcoal: lightCharcoal
                       ,charcoal: charcoal
                       ,darkCharcoal: darkCharcoal
                       ,black: black
                       ,lightGray: lightGray
                       ,gray: gray
                       ,darkGray: darkGray};
   return _elm.Color.values;
};
Elm.Debug = Elm.Debug || {};
Elm.Debug.make = function (_elm) {
   "use strict";
   _elm.Debug = _elm.Debug || {};
   if (_elm.Debug.values)
   return _elm.Debug.values;
   var _op = {},
   _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   $moduleName = "Debug",
   $Graphics$Collage = Elm.Graphics.Collage.make(_elm),
   $Native$Debug = Elm.Native.Debug.make(_elm);
   var trace = $Native$Debug.tracePath;
   var watchSummary = $Native$Debug.watchSummary;
   var watch = $Native$Debug.watch;
   var crash = $Native$Debug.crash;
   var log = $Native$Debug.log;
   _elm.Debug.values = {_op: _op
                       ,log: log
                       ,crash: crash
                       ,watch: watch
                       ,watchSummary: watchSummary
                       ,trace: trace};
   return _elm.Debug.values;
};
Elm.Dict = Elm.Dict || {};
Elm.Dict.make = function (_elm) {
   "use strict";
   _elm.Dict = _elm.Dict || {};
   if (_elm.Dict.values)
   return _elm.Dict.values;
   var _op = {},
   _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   $moduleName = "Dict",
   $Basics = Elm.Basics.make(_elm),
   $List = Elm.List.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Native$Debug = Elm.Native.Debug.make(_elm),
   $String = Elm.String.make(_elm);
   var foldr = F3(function (f,
   acc,
   t) {
      return function () {
         switch (t.ctor)
         {case "RBEmpty":
            switch (t._0.ctor)
              {case "LBlack": return acc;}
              break;
            case "RBNode": return A3(foldr,
              f,
              A3(f,
              t._1,
              t._2,
              A3(foldr,f,acc,t._4)),
              t._3);}
         _U.badCase($moduleName,
         "between lines 417 and 421");
      }();
   });
   var keys = function (dict) {
      return A3(foldr,
      F3(function (key,
      value,
      keyList) {
         return A2($List._op["::"],
         key,
         keyList);
      }),
      _L.fromArray([]),
      dict);
   };
   var values = function (dict) {
      return A3(foldr,
      F3(function (key,
      value,
      valueList) {
         return A2($List._op["::"],
         value,
         valueList);
      }),
      _L.fromArray([]),
      dict);
   };
   var toList = function (dict) {
      return A3(foldr,
      F3(function (key,value,list) {
         return A2($List._op["::"],
         {ctor: "_Tuple2"
         ,_0: key
         ,_1: value},
         list);
      }),
      _L.fromArray([]),
      dict);
   };
   var foldl = F3(function (f,
   acc,
   dict) {
      return function () {
         switch (dict.ctor)
         {case "RBEmpty":
            switch (dict._0.ctor)
              {case "LBlack": return acc;}
              break;
            case "RBNode": return A3(foldl,
              f,
              A3(f,
              dict._1,
              dict._2,
              A3(foldl,f,acc,dict._3)),
              dict._4);}
         _U.badCase($moduleName,
         "between lines 406 and 410");
      }();
   });
   var isBBlack = function (dict) {
      return function () {
         switch (dict.ctor)
         {case "RBEmpty":
            switch (dict._0.ctor)
              {case "LBBlack": return true;}
              break;
            case "RBNode":
            switch (dict._0.ctor)
              {case "BBlack": return true;}
              break;}
         return false;
      }();
   };
   var showFlag = function (f) {
      return function () {
         switch (f.ctor)
         {case "Insert": return "Insert";
            case "Remove": return "Remove";
            case "Same": return "Same";}
         _U.badCase($moduleName,
         "between lines 182 and 185");
      }();
   };
   var Same = {ctor: "Same"};
   var Remove = {ctor: "Remove"};
   var Insert = {ctor: "Insert"};
   var get = F2(function (targetKey,
   dict) {
      return function () {
         switch (dict.ctor)
         {case "RBEmpty":
            switch (dict._0.ctor)
              {case "LBlack":
                 return $Maybe.Nothing;}
              break;
            case "RBNode":
            return function () {
                 var _v29 = A2($Basics.compare,
                 targetKey,
                 dict._1);
                 switch (_v29.ctor)
                 {case "EQ":
                    return $Maybe.Just(dict._2);
                    case "GT": return A2(get,
                      targetKey,
                      dict._4);
                    case "LT": return A2(get,
                      targetKey,
                      dict._3);}
                 _U.badCase($moduleName,
                 "between lines 129 and 132");
              }();}
         _U.badCase($moduleName,
         "between lines 124 and 132");
      }();
   });
   var member = F2(function (key,
   dict) {
      return function () {
         var _v30 = A2(get,key,dict);
         switch (_v30.ctor)
         {case "Just": return true;
            case "Nothing": return false;}
         _U.badCase($moduleName,
         "between lines 138 and 140");
      }();
   });
   var max = function (dict) {
      return function () {
         switch (dict.ctor)
         {case "RBEmpty":
            return $Native$Debug.crash("(max Empty) is not defined");
            case "RBNode":
            switch (dict._4.ctor)
              {case "RBEmpty":
                 return {ctor: "_Tuple2"
                        ,_0: dict._1
                        ,_1: dict._2};}
              return max(dict._4);}
         _U.badCase($moduleName,
         "between lines 100 and 108");
      }();
   };
   var min = function (dict) {
      return function () {
         switch (dict.ctor)
         {case "RBEmpty":
            switch (dict._0.ctor)
              {case "LBlack":
                 return $Native$Debug.crash("(min Empty) is not defined");}
              break;
            case "RBNode":
            switch (dict._3.ctor)
              {case "RBEmpty":
                 switch (dict._3._0.ctor)
                   {case "LBlack":
                      return {ctor: "_Tuple2"
                             ,_0: dict._1
                             ,_1: dict._2};}
                   break;}
              return min(dict._3);}
         _U.badCase($moduleName,
         "between lines 87 and 95");
      }();
   };
   var RBEmpty = function (a) {
      return {ctor: "RBEmpty"
             ,_0: a};
   };
   var RBNode = F5(function (a,
   b,
   c,
   d,
   e) {
      return {ctor: "RBNode"
             ,_0: a
             ,_1: b
             ,_2: c
             ,_3: d
             ,_4: e};
   });
   var showLColor = function (color) {
      return function () {
         switch (color.ctor)
         {case "LBBlack":
            return "LBBlack";
            case "LBlack": return "LBlack";}
         _U.badCase($moduleName,
         "between lines 70 and 72");
      }();
   };
   var LBBlack = {ctor: "LBBlack"};
   var LBlack = {ctor: "LBlack"};
   var empty = RBEmpty(LBlack);
   var isEmpty = function (dict) {
      return _U.eq(dict,empty);
   };
   var map = F2(function (f,dict) {
      return function () {
         switch (dict.ctor)
         {case "RBEmpty":
            switch (dict._0.ctor)
              {case "LBlack":
                 return RBEmpty(LBlack);}
              break;
            case "RBNode": return A5(RBNode,
              dict._0,
              dict._1,
              A2(f,dict._1,dict._2),
              A2(map,f,dict._3),
              A2(map,f,dict._4));}
         _U.badCase($moduleName,
         "between lines 394 and 399");
      }();
   });
   var showNColor = function (c) {
      return function () {
         switch (c.ctor)
         {case "BBlack": return "BBlack";
            case "Black": return "Black";
            case "NBlack": return "NBlack";
            case "Red": return "Red";}
         _U.badCase($moduleName,
         "between lines 56 and 60");
      }();
   };
   var reportRemBug = F4(function (msg,
   c,
   lgot,
   rgot) {
      return $Native$Debug.crash($String.concat(_L.fromArray(["Internal red-black tree invariant violated, expected "
                                                             ,msg
                                                             ," and got "
                                                             ,showNColor(c)
                                                             ,"/"
                                                             ,lgot
                                                             ,"/"
                                                             ,rgot
                                                             ,"\nPlease report this bug to <https://github.com/elm-lang/Elm/issues>"])));
   });
   var NBlack = {ctor: "NBlack"};
   var BBlack = {ctor: "BBlack"};
   var Black = {ctor: "Black"};
   var ensureBlackRoot = function (dict) {
      return function () {
         switch (dict.ctor)
         {case "RBEmpty":
            switch (dict._0.ctor)
              {case "LBlack": return dict;}
              break;
            case "RBNode":
            switch (dict._0.ctor)
              {case "Black": return dict;
                 case "Red": return A5(RBNode,
                   Black,
                   dict._1,
                   dict._2,
                   dict._3,
                   dict._4);}
              break;}
         _U.badCase($moduleName,
         "between lines 154 and 162");
      }();
   };
   var blackish = function (t) {
      return function () {
         switch (t.ctor)
         {case "RBEmpty": return true;
            case "RBNode":
            return _U.eq(t._0,
              Black) || _U.eq(t._0,BBlack);}
         _U.badCase($moduleName,
         "between lines 339 and 341");
      }();
   };
   var blacken = function (t) {
      return function () {
         switch (t.ctor)
         {case "RBEmpty":
            return RBEmpty(LBlack);
            case "RBNode": return A5(RBNode,
              Black,
              t._1,
              t._2,
              t._3,
              t._4);}
         _U.badCase($moduleName,
         "between lines 378 and 380");
      }();
   };
   var Red = {ctor: "Red"};
   var moreBlack = function (color) {
      return function () {
         switch (color.ctor)
         {case "BBlack":
            return $Native$Debug.crash("Can\'t make a double black node more black!");
            case "Black": return BBlack;
            case "NBlack": return Red;
            case "Red": return Black;}
         _U.badCase($moduleName,
         "between lines 244 and 248");
      }();
   };
   var lessBlack = function (color) {
      return function () {
         switch (color.ctor)
         {case "BBlack": return Black;
            case "Black": return Red;
            case "NBlack":
            return $Native$Debug.crash("Can\'t make a negative black node less black!");
            case "Red": return NBlack;}
         _U.badCase($moduleName,
         "between lines 253 and 257");
      }();
   };
   var lessBlackTree = function (dict) {
      return function () {
         switch (dict.ctor)
         {case "RBEmpty":
            switch (dict._0.ctor)
              {case "LBBlack":
                 return RBEmpty(LBlack);}
              break;
            case "RBNode": return A5(RBNode,
              lessBlack(dict._0),
              dict._1,
              dict._2,
              dict._3,
              dict._4);}
         _U.badCase($moduleName,
         "between lines 262 and 264");
      }();
   };
   var redden = function (t) {
      return function () {
         switch (t.ctor)
         {case "RBEmpty":
            return $Native$Debug.crash("can\'t make a Leaf red");
            case "RBNode": return A5(RBNode,
              Red,
              t._1,
              t._2,
              t._3,
              t._4);}
         _U.badCase($moduleName,
         "between lines 386 and 388");
      }();
   };
   var balance_node = function (t) {
      return function () {
         var assemble = function (col) {
            return function (xk) {
               return function (xv) {
                  return function (yk) {
                     return function (yv) {
                        return function (zk) {
                           return function (zv) {
                              return function (a) {
                                 return function (b) {
                                    return function (c) {
                                       return function (d) {
                                          return A5(RBNode,
                                          lessBlack(col),
                                          yk,
                                          yv,
                                          A5(RBNode,Black,xk,xv,a,b),
                                          A5(RBNode,Black,zk,zv,c,d));
                                       };
                                    };
                                 };
                              };
                           };
                        };
                     };
                  };
               };
            };
         };
         return blackish(t) ? function () {
            switch (t.ctor)
            {case "RBNode":
               switch (t._3.ctor)
                 {case "RBNode":
                    switch (t._3._0.ctor)
                      {case "Red":
                         switch (t._3._3.ctor)
                           {case "RBNode":
                              switch (t._3._3._0.ctor)
                                {case "Red":
                                   return assemble(t._0)(t._3._3._1)(t._3._3._2)(t._3._1)(t._3._2)(t._1)(t._2)(t._3._3._3)(t._3._3._4)(t._3._4)(t._4);}
                                break;}
                           switch (t._3._4.ctor)
                           {case "RBNode":
                              switch (t._3._4._0.ctor)
                                {case "Red":
                                   return assemble(t._0)(t._3._1)(t._3._2)(t._3._4._1)(t._3._4._2)(t._1)(t._2)(t._3._3)(t._3._4._3)(t._3._4._4)(t._4);}
                                break;}
                           break;}
                      break;}
                 switch (t._4.ctor)
                 {case "RBNode":
                    switch (t._4._0.ctor)
                      {case "Red":
                         switch (t._4._3.ctor)
                           {case "RBNode":
                              switch (t._4._3._0.ctor)
                                {case "Red":
                                   return assemble(t._0)(t._1)(t._2)(t._4._3._1)(t._4._3._2)(t._4._1)(t._4._2)(t._3)(t._4._3._3)(t._4._3._4)(t._4._4);}
                                break;}
                           switch (t._4._4.ctor)
                           {case "RBNode":
                              switch (t._4._4._0.ctor)
                                {case "Red":
                                   return assemble(t._0)(t._1)(t._2)(t._4._1)(t._4._2)(t._4._4._1)(t._4._4._2)(t._3)(t._4._3)(t._4._4._3)(t._4._4._4);}
                                break;}
                           break;}
                      break;}
                 switch (t._0.ctor)
                 {case "BBlack":
                    switch (t._4.ctor)
                      {case "RBNode":
                         switch (t._4._0.ctor)
                           {case "NBlack":
                              switch (t._4._3.ctor)
                                {case "RBNode":
                                   switch (t._4._3._0.ctor)
                                     {case "Black":
                                        return function () {
                                             switch (t._4._4.ctor)
                                             {case "RBNode":
                                                switch (t._4._4._0.ctor)
                                                  {case "Black":
                                                     return A5(RBNode,
                                                       Black,
                                                       t._4._3._1,
                                                       t._4._3._2,
                                                       A5(RBNode,
                                                       Black,
                                                       t._1,
                                                       t._2,
                                                       t._3,
                                                       t._4._3._3),
                                                       A5(balance,
                                                       Black,
                                                       t._4._1,
                                                       t._4._2,
                                                       t._4._3._4,
                                                       redden(t._4._4)));}
                                                  break;}
                                             return t;
                                          }();}
                                     break;}
                                break;}
                           break;}
                      switch (t._3.ctor)
                      {case "RBNode":
                         switch (t._3._0.ctor)
                           {case "NBlack":
                              switch (t._3._4.ctor)
                                {case "RBNode":
                                   switch (t._3._4._0.ctor)
                                     {case "Black":
                                        return function () {
                                             switch (t._3._3.ctor)
                                             {case "RBNode":
                                                switch (t._3._3._0.ctor)
                                                  {case "Black":
                                                     return A5(RBNode,
                                                       Black,
                                                       t._3._4._1,
                                                       t._3._4._2,
                                                       A5(balance,
                                                       Black,
                                                       t._3._1,
                                                       t._3._2,
                                                       redden(t._3._3),
                                                       t._3._4._3),
                                                       A5(RBNode,
                                                       Black,
                                                       t._1,
                                                       t._2,
                                                       t._3._4._4,
                                                       t._4));}
                                                  break;}
                                             return t;
                                          }();}
                                     break;}
                                break;}
                           break;}
                      break;}
                 break;}
            return t;
         }() : t;
      }();
   };
   var balance = F5(function (c,
   k,
   v,
   l,
   r) {
      return balance_node(A5(RBNode,
      c,
      k,
      v,
      l,
      r));
   });
   var bubble = F5(function (c,
   k,
   v,
   l,
   r) {
      return isBBlack(l) || isBBlack(r) ? A5(balance,
      moreBlack(c),
      k,
      v,
      lessBlackTree(l),
      lessBlackTree(r)) : A5(RBNode,
      c,
      k,
      v,
      l,
      r);
   });
   var remove_max = F5(function (c,
   k,
   v,
   l,
   r) {
      return function () {
         switch (r.ctor)
         {case "RBEmpty": return A3(rem,
              c,
              l,
              r);
            case "RBNode": return A5(bubble,
              c,
              k,
              v,
              l,
              A5(remove_max,
              r._0,
              r._1,
              r._2,
              r._3,
              r._4));}
         _U.badCase($moduleName,
         "between lines 323 and 328");
      }();
   });
   var rem = F3(function (c,l,r) {
      return function () {
         var _v169 = {ctor: "_Tuple2"
                     ,_0: l
                     ,_1: r};
         switch (_v169.ctor)
         {case "_Tuple2":
            switch (_v169._0.ctor)
              {case "RBEmpty":
                 switch (_v169._1.ctor)
                   {case "RBEmpty":
                      return function () {
                           switch (c.ctor)
                           {case "Black":
                              return RBEmpty(LBBlack);
                              case "Red":
                              return RBEmpty(LBlack);}
                           _U.badCase($moduleName,
                           "between lines 282 and 286");
                        }();
                      case "RBNode":
                      return function () {
                           var _v191 = {ctor: "_Tuple3"
                                       ,_0: c
                                       ,_1: _v169._0._0
                                       ,_2: _v169._1._0};
                           switch (_v191.ctor)
                           {case "_Tuple3":
                              switch (_v191._0.ctor)
                                {case "Black":
                                   switch (_v191._1.ctor)
                                     {case "LBlack":
                                        switch (_v191._2.ctor)
                                          {case "Red": return A5(RBNode,
                                               Black,
                                               _v169._1._1,
                                               _v169._1._2,
                                               _v169._1._3,
                                               _v169._1._4);}
                                          break;}
                                     break;}
                                break;}
                           return A4(reportRemBug,
                           "Black/LBlack/Red",
                           c,
                           showLColor(_v169._0._0),
                           showNColor(_v169._1._0));
                        }();}
                   break;
                 case "RBNode":
                 switch (_v169._1.ctor)
                   {case "RBEmpty":
                      return function () {
                           var _v195 = {ctor: "_Tuple3"
                                       ,_0: c
                                       ,_1: _v169._0._0
                                       ,_2: _v169._1._0};
                           switch (_v195.ctor)
                           {case "_Tuple3":
                              switch (_v195._0.ctor)
                                {case "Black":
                                   switch (_v195._1.ctor)
                                     {case "Red":
                                        switch (_v195._2.ctor)
                                          {case "LBlack":
                                             return A5(RBNode,
                                               Black,
                                               _v169._0._1,
                                               _v169._0._2,
                                               _v169._0._3,
                                               _v169._0._4);}
                                          break;}
                                     break;}
                                break;}
                           return A4(reportRemBug,
                           "Black/Red/LBlack",
                           c,
                           showNColor(_v169._0._0),
                           showLColor(_v169._1._0));
                        }();
                      case "RBNode":
                      return function () {
                           var l$ = A5(remove_max,
                           _v169._0._0,
                           _v169._0._1,
                           _v169._0._2,
                           _v169._0._3,
                           _v169._0._4);
                           var r = A5(RBNode,
                           _v169._1._0,
                           _v169._1._1,
                           _v169._1._2,
                           _v169._1._3,
                           _v169._1._4);
                           var l = A5(RBNode,
                           _v169._0._0,
                           _v169._0._1,
                           _v169._0._2,
                           _v169._0._3,
                           _v169._0._4);
                           var $ = max(l),
                           k = $._0,
                           v = $._1;
                           return A5(bubble,c,k,v,l$,r);
                        }();}
                   break;}
              break;}
         _U.badCase($moduleName,
         "between lines 280 and 309");
      }();
   });
   var update = F3(function (k,
   alter,
   dict) {
      return function () {
         var up = function (dict) {
            return function () {
               switch (dict.ctor)
               {case "RBEmpty":
                  switch (dict._0.ctor)
                    {case "LBlack":
                       return function () {
                            var _v206 = alter($Maybe.Nothing);
                            switch (_v206.ctor)
                            {case "Just":
                               return {ctor: "_Tuple2"
                                      ,_0: Insert
                                      ,_1: A5(RBNode,
                                      Red,
                                      k,
                                      _v206._0,
                                      empty,
                                      empty)};
                               case "Nothing":
                               return {ctor: "_Tuple2"
                                      ,_0: Same
                                      ,_1: empty};}
                            _U.badCase($moduleName,
                            "between lines 194 and 198");
                         }();}
                    break;
                  case "RBNode":
                  return function () {
                       var _v208 = A2($Basics.compare,
                       k,
                       dict._1);
                       switch (_v208.ctor)
                       {case "EQ": return function () {
                               var _v209 = alter($Maybe.Just(dict._2));
                               switch (_v209.ctor)
                               {case "Just":
                                  return {ctor: "_Tuple2"
                                         ,_0: Same
                                         ,_1: A5(RBNode,
                                         dict._0,
                                         dict._1,
                                         _v209._0,
                                         dict._3,
                                         dict._4)};
                                  case "Nothing":
                                  return {ctor: "_Tuple2"
                                         ,_0: Remove
                                         ,_1: A3(rem,
                                         dict._0,
                                         dict._3,
                                         dict._4)};}
                               _U.badCase($moduleName,
                               "between lines 201 and 206");
                            }();
                          case "GT": return function () {
                               var $ = up(dict._4),
                               flag = $._0,
                               newRight = $._1;
                               return function () {
                                  switch (flag.ctor)
                                  {case "Insert":
                                     return {ctor: "_Tuple2"
                                            ,_0: Insert
                                            ,_1: A5(balance,
                                            dict._0,
                                            dict._1,
                                            dict._2,
                                            dict._3,
                                            newRight)};
                                     case "Remove":
                                     return {ctor: "_Tuple2"
                                            ,_0: Remove
                                            ,_1: A5(bubble,
                                            dict._0,
                                            dict._1,
                                            dict._2,
                                            dict._3,
                                            newRight)};
                                     case "Same":
                                     return {ctor: "_Tuple2"
                                            ,_0: Same
                                            ,_1: A5(RBNode,
                                            dict._0,
                                            dict._1,
                                            dict._2,
                                            dict._3,
                                            newRight)};}
                                  _U.badCase($moduleName,
                                  "between lines 215 and 220");
                               }();
                            }();
                          case "LT": return function () {
                               var $ = up(dict._3),
                               flag = $._0,
                               newLeft = $._1;
                               return function () {
                                  switch (flag.ctor)
                                  {case "Insert":
                                     return {ctor: "_Tuple2"
                                            ,_0: Insert
                                            ,_1: A5(balance,
                                            dict._0,
                                            dict._1,
                                            dict._2,
                                            newLeft,
                                            dict._4)};
                                     case "Remove":
                                     return {ctor: "_Tuple2"
                                            ,_0: Remove
                                            ,_1: A5(bubble,
                                            dict._0,
                                            dict._1,
                                            dict._2,
                                            newLeft,
                                            dict._4)};
                                     case "Same":
                                     return {ctor: "_Tuple2"
                                            ,_0: Same
                                            ,_1: A5(RBNode,
                                            dict._0,
                                            dict._1,
                                            dict._2,
                                            newLeft,
                                            dict._4)};}
                                  _U.badCase($moduleName,
                                  "between lines 208 and 213");
                               }();
                            }();}
                       _U.badCase($moduleName,
                       "between lines 199 and 220");
                    }();}
               _U.badCase($moduleName,
               "between lines 192 and 220");
            }();
         };
         var $ = up(dict),
         flag = $._0,
         updatedDict = $._1;
         return function () {
            switch (flag.ctor)
            {case "Insert":
               return ensureBlackRoot(updatedDict);
               case "Remove":
               return blacken(updatedDict);
               case "Same":
               return updatedDict;}
            _U.badCase($moduleName,
            "between lines 222 and 225");
         }();
      }();
   });
   var insert = F3(function (key,
   value,
   dict) {
      return A3(update,
      key,
      $Basics.always($Maybe.Just(value)),
      dict);
   });
   var singleton = F2(function (key,
   value) {
      return A3(insert,
      key,
      value,
      empty);
   });
   var union = F2(function (t1,
   t2) {
      return A3(foldl,
      insert,
      t2,
      t1);
   });
   var fromList = function (assocs) {
      return A3($List.foldl,
      F2(function (_v214,dict) {
         return function () {
            switch (_v214.ctor)
            {case "_Tuple2":
               return A3(insert,
                 _v214._0,
                 _v214._1,
                 dict);}
            _U.badCase($moduleName,
            "on line 466, column 38 to 59");
         }();
      }),
      empty,
      assocs);
   };
   var filter = F2(function (predicate,
   dictionary) {
      return function () {
         var add = F3(function (key,
         value,
         dict) {
            return A2(predicate,
            key,
            value) ? A3(insert,
            key,
            value,
            dict) : dict;
         });
         return A3(foldl,
         add,
         empty,
         dictionary);
      }();
   });
   var intersect = F2(function (t1,
   t2) {
      return A2(filter,
      F2(function (k,_v218) {
         return function () {
            return A2(member,k,t2);
         }();
      }),
      t1);
   });
   var partition = F2(function (predicate,
   dict) {
      return function () {
         var add = F3(function (key,
         value,
         _v220) {
            return function () {
               switch (_v220.ctor)
               {case "_Tuple2":
                  return A2(predicate,
                    key,
                    value) ? {ctor: "_Tuple2"
                             ,_0: A3(insert,
                             key,
                             value,
                             _v220._0)
                             ,_1: _v220._1} : {ctor: "_Tuple2"
                                              ,_0: _v220._0
                                              ,_1: A3(insert,
                                              key,
                                              value,
                                              _v220._1)};}
               _U.badCase($moduleName,
               "between lines 487 and 489");
            }();
         });
         return A3(foldl,
         add,
         {ctor: "_Tuple2"
         ,_0: empty
         ,_1: empty},
         dict);
      }();
   });
   var remove = F2(function (key,
   dict) {
      return A3(update,
      key,
      $Basics.always($Maybe.Nothing),
      dict);
   });
   var diff = F2(function (t1,t2) {
      return A3(foldl,
      F3(function (k,v,t) {
         return A2(remove,k,t);
      }),
      t1,
      t2);
   });
   _elm.Dict.values = {_op: _op
                      ,empty: empty
                      ,singleton: singleton
                      ,insert: insert
                      ,update: update
                      ,isEmpty: isEmpty
                      ,get: get
                      ,remove: remove
                      ,member: member
                      ,filter: filter
                      ,partition: partition
                      ,foldl: foldl
                      ,foldr: foldr
                      ,map: map
                      ,union: union
                      ,intersect: intersect
                      ,diff: diff
                      ,keys: keys
                      ,values: values
                      ,toList: toList
                      ,fromList: fromList};
   return _elm.Dict.values;
};
Elm.ElmFire = Elm.ElmFire || {};
Elm.ElmFire.make = function (_elm) {
   "use strict";
   _elm.ElmFire = _elm.ElmFire || {};
   if (_elm.ElmFire.values)
   return _elm.ElmFire.values;
   var _op = {},
   _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   $moduleName = "ElmFire",
   $Basics = Elm.Basics.make(_elm),
   $Json$Decode = Elm.Json.Decode.make(_elm),
   $Json$Encode = Elm.Json.Encode.make(_elm),
   $List = Elm.List.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Native$ElmFire = Elm.Native.ElmFire.make(_elm),
   $Result = Elm.Result.make(_elm),
   $Signal = Elm.Signal.make(_elm),
   $Task = Elm.Task.make(_elm),
   $Time = Elm.Time.make(_elm);
   var serverTimeStamp = $Native$ElmFire.serverTimeStamp;
   var goOnline = $Native$ElmFire.setOffline(false);
   var goOffline = $Native$ElmFire.setOffline(true);
   var exportValue = $Native$ElmFire.exportValue;
   var toPairList = $Native$ElmFire.toPairList;
   var toKeyList = $Native$ElmFire.toKeyList;
   var toValueList = $Native$ElmFire.toValueList;
   var toSnapshotList = $Native$ElmFire.toSnapshotList;
   var limitToLast = F2(function (num,
   query) {
      return _U.insert("limitToLast",
      num,
      _U.remove("noLimit",query));
   });
   var limitToFirst = F2(function (num,
   query) {
      return _U.insert("limitToFirst",
      num,
      _U.remove("noLimit",query));
   });
   var endAtPriority = F3(function (priority,
   key,
   query) {
      return _U.insert("endAtPriority",
      {ctor: "_Tuple2"
      ,_0: priority
      ,_1: key},
      _U.remove("noEnd",query));
   });
   var startAtPriority = F3(function (priority,
   key,
   query) {
      return _U.insert("startAtPriority",
      {ctor: "_Tuple2"
      ,_0: priority
      ,_1: key},
      _U.remove("noStart",query));
   });
   var endAtKey = F2(function (key,
   query) {
      return _U.insert("endAtKey",
      key,
      _U.remove("noEnd",query));
   });
   var startAtKey = F2(function (key,
   query) {
      return _U.insert("startAtKey",
      key,
      _U.remove("noStart",query));
   });
   var endAtValue = F2(function (value,
   query) {
      return _U.insert("endAtValue",
      value,
      _U.remove("noEnd",query));
   });
   var startAtValue = F2(function (value,
   query) {
      return _U.insert("startAtValue",
      value,
      _U.remove("noStart",query));
   });
   var orderByPriority = function (query) {
      return _U.insert("orderByPriority",
      true,
      _U.remove("noOrder",query));
   };
   var orderByKey = function (query) {
      return _U.insert("orderByKey",
      true,
      _U.remove("noOrder",query));
   };
   var orderByValue = function (query) {
      return _U.insert("orderByChildOrValue",
      $Maybe.Nothing,
      _U.remove("noOrder",query));
   };
   var orderByChild = F2(function (key,
   query) {
      return _U.insert("orderByChildOrValue",
      $Maybe.Just(key),
      _U.remove("noOrder",query));
   });
   var ChildMoved = {ctor: "ChildMoved"};
   var ChildRemoved = {ctor: "ChildRemoved"};
   var ChildChanged = {ctor: "ChildChanged"};
   var ChildAdded = {ctor: "ChildAdded"};
   var ValueChanged = {ctor: "ValueChanged"};
   var QueryOptions = {ctor: "QueryOptions"};
   var emptyOptions = {_: {}
                      ,noEnd: true
                      ,noLimit: true
                      ,noOrder: true
                      ,noStart: true
                      ,tag: QueryOptions};
   var valueChanged = _U.insert("queryEvent",
   ValueChanged,
   emptyOptions);
   var childAdded = _U.insert("queryEvent",
   ChildAdded,
   emptyOptions);
   var childChanged = _U.insert("queryEvent",
   ChildChanged,
   emptyOptions);
   var childRemoved = _U.insert("queryEvent",
   ChildRemoved,
   emptyOptions);
   var childMoved = _U.insert("queryEvent",
   ChildMoved,
   emptyOptions);
   var Query = F2(function (a,b) {
      return _U.insert("tag",a,b);
   });
   var once = $Native$ElmFire.once;
   var unsubscribe = $Native$ElmFire.unsubscribe;
   var subscribeConditional = $Native$ElmFire.subscribeConditional;
   var subscribe = function (createResponseTask) {
      return subscribeConditional(function ($) {
         return $Maybe.Just(createResponseTask($));
      });
   };
   var onDisconnectCancel = $Native$ElmFire.onDisconnectCancel;
   var onDisconnectRemove = $Native$ElmFire.remove(true);
   var onDisconnectUpdate = $Native$ElmFire.update(true);
   var onDisconnectSetWithPriority = $Native$ElmFire.setWithPriority(true);
   var onDisconnectSet = $Native$ElmFire.set(true);
   var transaction = $Native$ElmFire.transaction;
   var remove = $Native$ElmFire.remove(false);
   var update = $Native$ElmFire.update(false);
   var setPriority = $Native$ElmFire.setPriority;
   var setWithPriority = $Native$ElmFire.setWithPriority(false);
   var set = $Native$ElmFire.set(false);
   var open = $Native$ElmFire.open;
   var key = $Native$ElmFire.key;
   var toUrl = $Native$ElmFire.toUrl;
   var Set = function (a) {
      return {ctor: "Set",_0: a};
   };
   var Remove = {ctor: "Remove"};
   var Abort = {ctor: "Abort"};
   var SnapshotFB = {ctor: "SnapshotFB"};
   var Snapshot = F8(function (a,
   b,
   c,
   d,
   e,
   f,
   g,
   h) {
      return {_: {}
             ,existing: d
             ,intern_: h
             ,key: b
             ,prevKey: f
             ,priority: g
             ,reference: c
             ,subscription: a
             ,value: e};
   });
   var QueryError = F2(function (a,
   b) {
      return {ctor: "QueryError"
             ,_0: a
             ,_1: b};
   });
   var Unsubscribed = function (a) {
      return {ctor: "Unsubscribed"
             ,_0: a};
   };
   var Subscription = {ctor: "Subscription"};
   var StringPriority = function (a) {
      return {ctor: "StringPriority"
             ,_0: a};
   };
   var NumberPriority = function (a) {
      return {ctor: "NumberPriority"
             ,_0: a};
   };
   var NoPriority = {ctor: "NoPriority"};
   var Reference = {ctor: "Reference"};
   var RefLocation = function (a) {
      return {ctor: "RefLocation"
             ,_0: a};
   };
   var location = RefLocation;
   var PushLocation = function (a) {
      return {ctor: "PushLocation"
             ,_0: a};
   };
   var push = PushLocation;
   var RootLocation = function (a) {
      return {ctor: "RootLocation"
             ,_0: a};
   };
   var root = RootLocation;
   var ParentLocation = function (a) {
      return {ctor: "ParentLocation"
             ,_0: a};
   };
   var parent = ParentLocation;
   var SubLocation = F2(function (a,
   b) {
      return {ctor: "SubLocation"
             ,_0: a
             ,_1: b};
   });
   var sub = SubLocation;
   var subscribeConnected = F2(function (createResponseTask,
   location) {
      return A4(subscribeConditional,
      function (snapshot) {
         return function () {
            var _v0 = A2($Json$Decode.decodeValue,
            $Json$Decode.bool,
            snapshot.value);
            switch (_v0.ctor)
            {case "Err":
               return $Maybe.Nothing;
               case "Ok":
               return $Maybe.Just(createResponseTask(_v0._0));}
            _U.badCase($moduleName,
            "between lines 590 and 593");
         }();
      },
      $Basics.always($Task.succeed({ctor: "_Tuple0"})),
      valueChanged,
      sub(".info/connected")(root(location)));
   });
   var subscribeServerTimeOffset = F2(function (createResponseTask,
   location) {
      return A4(subscribeConditional,
      function (snapshot) {
         return function () {
            var _v3 = A2($Json$Decode.decodeValue,
            $Json$Decode.$float,
            snapshot.value);
            switch (_v3.ctor)
            {case "Err":
               return $Maybe.Nothing;
               case "Ok":
               return $Maybe.Just(createResponseTask(_v3._0 * $Time.millisecond));}
            _U.badCase($moduleName,
            "between lines 604 and 607");
         }();
      },
      $Basics.always($Task.succeed({ctor: "_Tuple0"})),
      valueChanged,
      sub(".info/serverTimeOffset")(root(location)));
   });
   var UrlLocation = function (a) {
      return {ctor: "UrlLocation"
             ,_0: a};
   };
   var fromUrl = UrlLocation;
   var OtherAuthenticationError = {ctor: "OtherAuthenticationError"};
   var UserDenied = {ctor: "UserDenied"};
   var UserCancelled = {ctor: "UserCancelled"};
   var UnknownError = {ctor: "UnknownError"};
   var TransportUnavailable = {ctor: "TransportUnavailable"};
   var ProviderError = {ctor: "ProviderError"};
   var NetworkError = {ctor: "NetworkError"};
   var InvalidUser = {ctor: "InvalidUser"};
   var InvalidToken = {ctor: "InvalidToken"};
   var InvalidProvider = {ctor: "InvalidProvider"};
   var InvalidPassword = {ctor: "InvalidPassword"};
   var InvalidOrigin = {ctor: "InvalidOrigin"};
   var InvalidEmail = {ctor: "InvalidEmail"};
   var InvalidCredentials = {ctor: "InvalidCredentials"};
   var InvalidConfiguration = {ctor: "InvalidConfiguration"};
   var InvalidArguments = {ctor: "InvalidArguments"};
   var EmailTaken = {ctor: "EmailTaken"};
   var AuthenticationDisabled = {ctor: "AuthenticationDisabled"};
   var UnknownSubscription = {ctor: "UnknownSubscription"};
   var AuthError = function (a) {
      return {ctor: "AuthError"
             ,_0: a};
   };
   var OtherFirebaseError = {ctor: "OtherFirebaseError"};
   var TooBigError = {ctor: "TooBigError"};
   var UnavailableError = {ctor: "UnavailableError"};
   var PermissionError = {ctor: "PermissionError"};
   var LocationError = {ctor: "LocationError"};
   var Error = F2(function (a,b) {
      return {_: {}
             ,description: b
             ,tag: a};
   });
   _elm.ElmFire.values = {_op: _op
                         ,fromUrl: fromUrl
                         ,sub: sub
                         ,parent: parent
                         ,root: root
                         ,push: push
                         ,open: open
                         ,key: key
                         ,toUrl: toUrl
                         ,location: location
                         ,set: set
                         ,setWithPriority: setWithPriority
                         ,setPriority: setPriority
                         ,update: update
                         ,remove: remove
                         ,onDisconnectSet: onDisconnectSet
                         ,onDisconnectSetWithPriority: onDisconnectSetWithPriority
                         ,onDisconnectUpdate: onDisconnectUpdate
                         ,onDisconnectRemove: onDisconnectRemove
                         ,onDisconnectCancel: onDisconnectCancel
                         ,transaction: transaction
                         ,subscribe: subscribe
                         ,unsubscribe: unsubscribe
                         ,once: once
                         ,valueChanged: valueChanged
                         ,childAdded: childAdded
                         ,childChanged: childChanged
                         ,childRemoved: childRemoved
                         ,childMoved: childMoved
                         ,orderByChild: orderByChild
                         ,orderByValue: orderByValue
                         ,orderByKey: orderByKey
                         ,orderByPriority: orderByPriority
                         ,startAtValue: startAtValue
                         ,startAtKey: startAtKey
                         ,startAtPriority: startAtPriority
                         ,endAtValue: endAtValue
                         ,endAtKey: endAtKey
                         ,endAtPriority: endAtPriority
                         ,limitToFirst: limitToFirst
                         ,limitToLast: limitToLast
                         ,toSnapshotList: toSnapshotList
                         ,toValueList: toValueList
                         ,toKeyList: toKeyList
                         ,toPairList: toPairList
                         ,exportValue: exportValue
                         ,goOffline: goOffline
                         ,goOnline: goOnline
                         ,subscribeConnected: subscribeConnected
                         ,subscribeServerTimeOffset: subscribeServerTimeOffset
                         ,serverTimeStamp: serverTimeStamp
                         ,Error: Error
                         ,Snapshot: Snapshot
                         ,Query: Query
                         ,LocationError: LocationError
                         ,PermissionError: PermissionError
                         ,UnavailableError: UnavailableError
                         ,TooBigError: TooBigError
                         ,OtherFirebaseError: OtherFirebaseError
                         ,AuthError: AuthError
                         ,UnknownSubscription: UnknownSubscription
                         ,AuthenticationDisabled: AuthenticationDisabled
                         ,EmailTaken: EmailTaken
                         ,InvalidArguments: InvalidArguments
                         ,InvalidConfiguration: InvalidConfiguration
                         ,InvalidCredentials: InvalidCredentials
                         ,InvalidEmail: InvalidEmail
                         ,InvalidOrigin: InvalidOrigin
                         ,InvalidPassword: InvalidPassword
                         ,InvalidProvider: InvalidProvider
                         ,InvalidToken: InvalidToken
                         ,InvalidUser: InvalidUser
                         ,NetworkError: NetworkError
                         ,ProviderError: ProviderError
                         ,TransportUnavailable: TransportUnavailable
                         ,UnknownError: UnknownError
                         ,UserCancelled: UserCancelled
                         ,UserDenied: UserDenied
                         ,OtherAuthenticationError: OtherAuthenticationError
                         ,NoPriority: NoPriority
                         ,NumberPriority: NumberPriority
                         ,StringPriority: StringPriority
                         ,Abort: Abort
                         ,Remove: Remove
                         ,Set: Set
                         ,Unsubscribed: Unsubscribed
                         ,QueryError: QueryError};
   return _elm.ElmFire.values;
};
Elm.Graphics = Elm.Graphics || {};
Elm.Graphics.Collage = Elm.Graphics.Collage || {};
Elm.Graphics.Collage.make = function (_elm) {
   "use strict";
   _elm.Graphics = _elm.Graphics || {};
   _elm.Graphics.Collage = _elm.Graphics.Collage || {};
   if (_elm.Graphics.Collage.values)
   return _elm.Graphics.Collage.values;
   var _op = {},
   _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   $moduleName = "Graphics.Collage",
   $Basics = Elm.Basics.make(_elm),
   $Color = Elm.Color.make(_elm),
   $Graphics$Element = Elm.Graphics.Element.make(_elm),
   $List = Elm.List.make(_elm),
   $Native$Graphics$Collage = Elm.Native.Graphics.Collage.make(_elm),
   $Text = Elm.Text.make(_elm),
   $Transform2D = Elm.Transform2D.make(_elm);
   var ngon = F2(function (n,r) {
      return function () {
         var m = $Basics.toFloat(n);
         var t = 2 * $Basics.pi / m;
         var f = function (i) {
            return {ctor: "_Tuple2"
                   ,_0: r * $Basics.cos(t * i)
                   ,_1: r * $Basics.sin(t * i)};
         };
         return A2($List.map,
         f,
         _L.range(0,m - 1));
      }();
   });
   var oval = F2(function (w,h) {
      return function () {
         var hh = h / 2;
         var hw = w / 2;
         var n = 50;
         var t = 2 * $Basics.pi / n;
         var f = function (i) {
            return {ctor: "_Tuple2"
                   ,_0: hw * $Basics.cos(t * i)
                   ,_1: hh * $Basics.sin(t * i)};
         };
         return A2($List.map,
         f,
         _L.range(0,n - 1));
      }();
   });
   var circle = function (r) {
      return A2(oval,2 * r,2 * r);
   };
   var rect = F2(function (w,h) {
      return function () {
         var hh = h / 2;
         var hw = w / 2;
         return _L.fromArray([{ctor: "_Tuple2"
                              ,_0: 0 - hw
                              ,_1: 0 - hh}
                             ,{ctor: "_Tuple2"
                              ,_0: 0 - hw
                              ,_1: hh}
                             ,{ctor: "_Tuple2",_0: hw,_1: hh}
                             ,{ctor: "_Tuple2"
                              ,_0: hw
                              ,_1: 0 - hh}]);
      }();
   });
   var square = function (n) {
      return A2(rect,n,n);
   };
   var polygon = function (points) {
      return points;
   };
   var segment = F2(function (p1,
   p2) {
      return _L.fromArray([p1,p2]);
   });
   var path = function (ps) {
      return ps;
   };
   var collage = $Native$Graphics$Collage.collage;
   var alpha = F2(function (a,f) {
      return _U.replace([["alpha"
                         ,a]],
      f);
   });
   var rotate = F2(function (t,f) {
      return _U.replace([["theta"
                         ,f.theta + t]],
      f);
   });
   var scale = F2(function (s,f) {
      return _U.replace([["scale"
                         ,f.scale * s]],
      f);
   });
   var moveY = F2(function (y,f) {
      return _U.replace([["y"
                         ,f.y + y]],
      f);
   });
   var moveX = F2(function (x,f) {
      return _U.replace([["x"
                         ,f.x + x]],
      f);
   });
   var move = F2(function (_v0,f) {
      return function () {
         switch (_v0.ctor)
         {case "_Tuple2":
            return _U.replace([["x"
                               ,f.x + _v0._0]
                              ,["y",f.y + _v0._1]],
              f);}
         _U.badCase($moduleName,
         "on line 226, column 3 to 37");
      }();
   });
   var form = function (f) {
      return {_: {}
             ,alpha: 1
             ,form: f
             ,scale: 1
             ,theta: 0
             ,x: 0
             ,y: 0};
   };
   var Fill = function (a) {
      return {ctor: "Fill",_0: a};
   };
   var Line = function (a) {
      return {ctor: "Line",_0: a};
   };
   var FGroup = F2(function (a,b) {
      return {ctor: "FGroup"
             ,_0: a
             ,_1: b};
   });
   var group = function (fs) {
      return form(A2(FGroup,
      $Transform2D.identity,
      fs));
   };
   var groupTransform = F2(function (matrix,
   fs) {
      return form(A2(FGroup,
      matrix,
      fs));
   });
   var FElement = function (a) {
      return {ctor: "FElement"
             ,_0: a};
   };
   var toForm = function (e) {
      return form(FElement(e));
   };
   var FImage = F4(function (a,
   b,
   c,
   d) {
      return {ctor: "FImage"
             ,_0: a
             ,_1: b
             ,_2: c
             ,_3: d};
   });
   var sprite = F4(function (w,
   h,
   pos,
   src) {
      return form(A4(FImage,
      w,
      h,
      pos,
      src));
   });
   var FText = function (a) {
      return {ctor: "FText",_0: a};
   };
   var text = function (t) {
      return form(FText(t));
   };
   var FOutlinedText = F2(function (a,
   b) {
      return {ctor: "FOutlinedText"
             ,_0: a
             ,_1: b};
   });
   var outlinedText = F2(function (ls,
   t) {
      return form(A2(FOutlinedText,
      ls,
      t));
   });
   var FShape = F2(function (a,b) {
      return {ctor: "FShape"
             ,_0: a
             ,_1: b};
   });
   var fill = F2(function (style,
   shape) {
      return form(A2(FShape,
      Fill(style),
      shape));
   });
   var outlined = F2(function (style,
   shape) {
      return form(A2(FShape,
      Line(style),
      shape));
   });
   var FPath = F2(function (a,b) {
      return {ctor: "FPath"
             ,_0: a
             ,_1: b};
   });
   var traced = F2(function (style,
   path) {
      return form(A2(FPath,
      style,
      path));
   });
   var LineStyle = F6(function (a,
   b,
   c,
   d,
   e,
   f) {
      return {_: {}
             ,cap: c
             ,color: a
             ,dashOffset: f
             ,dashing: e
             ,join: d
             ,width: b};
   });
   var Clipped = {ctor: "Clipped"};
   var Sharp = function (a) {
      return {ctor: "Sharp",_0: a};
   };
   var Smooth = {ctor: "Smooth"};
   var Padded = {ctor: "Padded"};
   var Round = {ctor: "Round"};
   var Flat = {ctor: "Flat"};
   var defaultLine = {_: {}
                     ,cap: Flat
                     ,color: $Color.black
                     ,dashOffset: 0
                     ,dashing: _L.fromArray([])
                     ,join: Sharp(10)
                     ,width: 1};
   var solid = function (clr) {
      return _U.replace([["color"
                         ,clr]],
      defaultLine);
   };
   var dashed = function (clr) {
      return _U.replace([["color"
                         ,clr]
                        ,["dashing"
                         ,_L.fromArray([8,4])]],
      defaultLine);
   };
   var dotted = function (clr) {
      return _U.replace([["color"
                         ,clr]
                        ,["dashing"
                         ,_L.fromArray([3,3])]],
      defaultLine);
   };
   var Grad = function (a) {
      return {ctor: "Grad",_0: a};
   };
   var gradient = F2(function (grad,
   shape) {
      return A2(fill,
      Grad(grad),
      shape);
   });
   var Texture = function (a) {
      return {ctor: "Texture"
             ,_0: a};
   };
   var textured = F2(function (src,
   shape) {
      return A2(fill,
      Texture(src),
      shape);
   });
   var Solid = function (a) {
      return {ctor: "Solid",_0: a};
   };
   var filled = F2(function (color,
   shape) {
      return A2(fill,
      Solid(color),
      shape);
   });
   var Form = F6(function (a,
   b,
   c,
   d,
   e,
   f) {
      return {_: {}
             ,alpha: e
             ,form: f
             ,scale: b
             ,theta: a
             ,x: c
             ,y: d};
   });
   _elm.Graphics.Collage.values = {_op: _op
                                  ,collage: collage
                                  ,toForm: toForm
                                  ,filled: filled
                                  ,textured: textured
                                  ,gradient: gradient
                                  ,outlined: outlined
                                  ,traced: traced
                                  ,text: text
                                  ,outlinedText: outlinedText
                                  ,move: move
                                  ,moveX: moveX
                                  ,moveY: moveY
                                  ,scale: scale
                                  ,rotate: rotate
                                  ,alpha: alpha
                                  ,group: group
                                  ,groupTransform: groupTransform
                                  ,rect: rect
                                  ,oval: oval
                                  ,square: square
                                  ,circle: circle
                                  ,ngon: ngon
                                  ,polygon: polygon
                                  ,segment: segment
                                  ,path: path
                                  ,solid: solid
                                  ,dashed: dashed
                                  ,dotted: dotted
                                  ,defaultLine: defaultLine
                                  ,Form: Form
                                  ,LineStyle: LineStyle
                                  ,Flat: Flat
                                  ,Round: Round
                                  ,Padded: Padded
                                  ,Smooth: Smooth
                                  ,Sharp: Sharp
                                  ,Clipped: Clipped};
   return _elm.Graphics.Collage.values;
};
Elm.Graphics = Elm.Graphics || {};
Elm.Graphics.Element = Elm.Graphics.Element || {};
Elm.Graphics.Element.make = function (_elm) {
   "use strict";
   _elm.Graphics = _elm.Graphics || {};
   _elm.Graphics.Element = _elm.Graphics.Element || {};
   if (_elm.Graphics.Element.values)
   return _elm.Graphics.Element.values;
   var _op = {},
   _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   $moduleName = "Graphics.Element",
   $Basics = Elm.Basics.make(_elm),
   $Color = Elm.Color.make(_elm),
   $List = Elm.List.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Native$Graphics$Element = Elm.Native.Graphics.Element.make(_elm),
   $Text = Elm.Text.make(_elm);
   var DOut = {ctor: "DOut"};
   var outward = DOut;
   var DIn = {ctor: "DIn"};
   var inward = DIn;
   var DRight = {ctor: "DRight"};
   var right = DRight;
   var DLeft = {ctor: "DLeft"};
   var left = DLeft;
   var DDown = {ctor: "DDown"};
   var down = DDown;
   var DUp = {ctor: "DUp"};
   var up = DUp;
   var Position = F4(function (a,
   b,
   c,
   d) {
      return {_: {}
             ,horizontal: a
             ,vertical: b
             ,x: c
             ,y: d};
   });
   var Relative = function (a) {
      return {ctor: "Relative"
             ,_0: a};
   };
   var relative = Relative;
   var Absolute = function (a) {
      return {ctor: "Absolute"
             ,_0: a};
   };
   var absolute = Absolute;
   var N = {ctor: "N"};
   var bottomLeftAt = F2(function (x,
   y) {
      return {_: {}
             ,horizontal: N
             ,vertical: N
             ,x: x
             ,y: y};
   });
   var Z = {ctor: "Z"};
   var middle = {_: {}
                ,horizontal: Z
                ,vertical: Z
                ,x: Relative(0.5)
                ,y: Relative(0.5)};
   var midLeft = _U.replace([["horizontal"
                             ,N]
                            ,["x",Absolute(0)]],
   middle);
   var middleAt = F2(function (x,
   y) {
      return {_: {}
             ,horizontal: Z
             ,vertical: Z
             ,x: x
             ,y: y};
   });
   var midLeftAt = F2(function (x,
   y) {
      return {_: {}
             ,horizontal: N
             ,vertical: Z
             ,x: x
             ,y: y};
   });
   var midBottomAt = F2(function (x,
   y) {
      return {_: {}
             ,horizontal: Z
             ,vertical: N
             ,x: x
             ,y: y};
   });
   var P = {ctor: "P"};
   var topLeft = {_: {}
                 ,horizontal: N
                 ,vertical: P
                 ,x: Absolute(0)
                 ,y: Absolute(0)};
   var bottomLeft = _U.replace([["vertical"
                                ,N]],
   topLeft);
   var topRight = _U.replace([["horizontal"
                              ,P]],
   topLeft);
   var bottomRight = _U.replace([["horizontal"
                                 ,P]],
   bottomLeft);
   var midRight = _U.replace([["horizontal"
                              ,P]],
   midLeft);
   var midTop = _U.replace([["vertical"
                            ,P]
                           ,["y",Absolute(0)]],
   middle);
   var midBottom = _U.replace([["vertical"
                               ,N]],
   midTop);
   var topLeftAt = F2(function (x,
   y) {
      return {_: {}
             ,horizontal: N
             ,vertical: P
             ,x: x
             ,y: y};
   });
   var topRightAt = F2(function (x,
   y) {
      return {_: {}
             ,horizontal: P
             ,vertical: P
             ,x: x
             ,y: y};
   });
   var bottomRightAt = F2(function (x,
   y) {
      return {_: {}
             ,horizontal: P
             ,vertical: N
             ,x: x
             ,y: y};
   });
   var midRightAt = F2(function (x,
   y) {
      return {_: {}
             ,horizontal: P
             ,vertical: Z
             ,x: x
             ,y: y};
   });
   var midTopAt = F2(function (x,
   y) {
      return {_: {}
             ,horizontal: Z
             ,vertical: P
             ,x: x
             ,y: y};
   });
   var justified = $Native$Graphics$Element.block("justify");
   var centered = $Native$Graphics$Element.block("center");
   var rightAligned = $Native$Graphics$Element.block("right");
   var leftAligned = $Native$Graphics$Element.block("left");
   var show = function (value) {
      return leftAligned($Text.monospace($Text.fromString($Basics.toString(value))));
   };
   var Tiled = {ctor: "Tiled"};
   var Cropped = function (a) {
      return {ctor: "Cropped"
             ,_0: a};
   };
   var Fitted = {ctor: "Fitted"};
   var Plain = {ctor: "Plain"};
   var Custom = {ctor: "Custom"};
   var RawHtml = {ctor: "RawHtml"};
   var Spacer = {ctor: "Spacer"};
   var Flow = F2(function (a,b) {
      return {ctor: "Flow"
             ,_0: a
             ,_1: b};
   });
   var Container = F2(function (a,
   b) {
      return {ctor: "Container"
             ,_0: a
             ,_1: b};
   });
   var Image = F4(function (a,
   b,
   c,
   d) {
      return {ctor: "Image"
             ,_0: a
             ,_1: b
             ,_2: c
             ,_3: d};
   });
   var newElement = $Native$Graphics$Element.newElement;
   var image = F3(function (w,
   h,
   src) {
      return A3(newElement,
      w,
      h,
      A4(Image,Plain,w,h,src));
   });
   var fittedImage = F3(function (w,
   h,
   src) {
      return A3(newElement,
      w,
      h,
      A4(Image,Fitted,w,h,src));
   });
   var croppedImage = F4(function (pos,
   w,
   h,
   src) {
      return A3(newElement,
      w,
      h,
      A4(Image,Cropped(pos),w,h,src));
   });
   var tiledImage = F3(function (w,
   h,
   src) {
      return A3(newElement,
      w,
      h,
      A4(Image,Tiled,w,h,src));
   });
   var container = F4(function (w,
   h,
   pos,
   e) {
      return A3(newElement,
      w,
      h,
      A2(Container,pos,e));
   });
   var spacer = F2(function (w,h) {
      return A3(newElement,
      w,
      h,
      Spacer);
   });
   var link = F2(function (href,
   e) {
      return function () {
         var p = e.props;
         return {_: {}
                ,element: e.element
                ,props: _U.replace([["href"
                                    ,href]],
                p)};
      }();
   });
   var tag = F2(function (name,e) {
      return function () {
         var p = e.props;
         return {_: {}
                ,element: e.element
                ,props: _U.replace([["tag"
                                    ,name]],
                p)};
      }();
   });
   var color = F2(function (c,e) {
      return function () {
         var p = e.props;
         return {_: {}
                ,element: e.element
                ,props: _U.replace([["color"
                                    ,$Maybe.Just(c)]],
                p)};
      }();
   });
   var opacity = F2(function (o,
   e) {
      return function () {
         var p = e.props;
         return {_: {}
                ,element: e.element
                ,props: _U.replace([["opacity"
                                    ,o]],
                p)};
      }();
   });
   var height = F2(function (nh,
   e) {
      return function () {
         var p = e.props;
         var props = function () {
            var _v0 = e.element;
            switch (_v0.ctor)
            {case "Image":
               return _U.replace([["width"
                                  ,$Basics.round($Basics.toFloat(_v0._1) / $Basics.toFloat(_v0._2) * $Basics.toFloat(nh))]],
                 p);}
            return p;
         }();
         return {_: {}
                ,element: e.element
                ,props: _U.replace([["height"
                                    ,nh]],
                p)};
      }();
   });
   var width = F2(function (nw,e) {
      return function () {
         var p = e.props;
         var props = function () {
            var _v5 = e.element;
            switch (_v5.ctor)
            {case "Image":
               return _U.replace([["height"
                                  ,$Basics.round($Basics.toFloat(_v5._2) / $Basics.toFloat(_v5._1) * $Basics.toFloat(nw))]],
                 p);
               case "RawHtml":
               return _U.replace([["height"
                                  ,$Basics.snd(A2($Native$Graphics$Element.htmlHeight,
                                  nw,
                                  e.element))]],
                 p);}
            return p;
         }();
         return {_: {}
                ,element: e.element
                ,props: _U.replace([["width"
                                    ,nw]],
                props)};
      }();
   });
   var size = F3(function (w,h,e) {
      return A2(height,
      h,
      A2(width,w,e));
   });
   var sizeOf = function (e) {
      return {ctor: "_Tuple2"
             ,_0: e.props.width
             ,_1: e.props.height};
   };
   var heightOf = function (e) {
      return e.props.height;
   };
   var widthOf = function (e) {
      return e.props.width;
   };
   var above = F2(function (hi,
   lo) {
      return A3(newElement,
      A2($Basics.max,
      widthOf(hi),
      widthOf(lo)),
      heightOf(hi) + heightOf(lo),
      A2(Flow,
      DDown,
      _L.fromArray([hi,lo])));
   });
   var below = F2(function (lo,
   hi) {
      return A3(newElement,
      A2($Basics.max,
      widthOf(hi),
      widthOf(lo)),
      heightOf(hi) + heightOf(lo),
      A2(Flow,
      DDown,
      _L.fromArray([hi,lo])));
   });
   var beside = F2(function (lft,
   rht) {
      return A3(newElement,
      widthOf(lft) + widthOf(rht),
      A2($Basics.max,
      heightOf(lft),
      heightOf(rht)),
      A2(Flow,
      right,
      _L.fromArray([lft,rht])));
   });
   var layers = function (es) {
      return function () {
         var hs = A2($List.map,
         heightOf,
         es);
         var ws = A2($List.map,
         widthOf,
         es);
         return A3(newElement,
         A2($Maybe.withDefault,
         0,
         $List.maximum(ws)),
         A2($Maybe.withDefault,
         0,
         $List.maximum(hs)),
         A2(Flow,DOut,es));
      }();
   };
   var empty = A2(spacer,0,0);
   var flow = F2(function (dir,
   es) {
      return function () {
         var newFlow = F2(function (w,
         h) {
            return A3(newElement,
            w,
            h,
            A2(Flow,dir,es));
         });
         var maxOrZero = function (list) {
            return A2($Maybe.withDefault,
            0,
            $List.maximum(list));
         };
         var hs = A2($List.map,
         heightOf,
         es);
         var ws = A2($List.map,
         widthOf,
         es);
         return _U.eq(es,
         _L.fromArray([])) ? empty : function () {
            switch (dir.ctor)
            {case "DDown":
               return A2(newFlow,
                 maxOrZero(ws),
                 $List.sum(hs));
               case "DIn": return A2(newFlow,
                 maxOrZero(ws),
                 maxOrZero(hs));
               case "DLeft": return A2(newFlow,
                 $List.sum(ws),
                 maxOrZero(hs));
               case "DOut": return A2(newFlow,
                 maxOrZero(ws),
                 maxOrZero(hs));
               case "DRight":
               return A2(newFlow,
                 $List.sum(ws),
                 maxOrZero(hs));
               case "DUp": return A2(newFlow,
                 maxOrZero(ws),
                 $List.sum(hs));}
            _U.badCase($moduleName,
            "between lines 362 and 368");
         }();
      }();
   });
   var Properties = F9(function (a,
   b,
   c,
   d,
   e,
   f,
   g,
   h,
   i) {
      return {_: {}
             ,click: i
             ,color: e
             ,height: c
             ,hover: h
             ,href: f
             ,id: a
             ,opacity: d
             ,tag: g
             ,width: b};
   });
   var Element = F2(function (a,
   b) {
      return {_: {}
             ,element: b
             ,props: a};
   });
   _elm.Graphics.Element.values = {_op: _op
                                  ,image: image
                                  ,fittedImage: fittedImage
                                  ,croppedImage: croppedImage
                                  ,tiledImage: tiledImage
                                  ,leftAligned: leftAligned
                                  ,rightAligned: rightAligned
                                  ,centered: centered
                                  ,justified: justified
                                  ,show: show
                                  ,width: width
                                  ,height: height
                                  ,size: size
                                  ,color: color
                                  ,opacity: opacity
                                  ,link: link
                                  ,tag: tag
                                  ,widthOf: widthOf
                                  ,heightOf: heightOf
                                  ,sizeOf: sizeOf
                                  ,flow: flow
                                  ,up: up
                                  ,down: down
                                  ,left: left
                                  ,right: right
                                  ,inward: inward
                                  ,outward: outward
                                  ,layers: layers
                                  ,above: above
                                  ,below: below
                                  ,beside: beside
                                  ,empty: empty
                                  ,spacer: spacer
                                  ,container: container
                                  ,middle: middle
                                  ,midTop: midTop
                                  ,midBottom: midBottom
                                  ,midLeft: midLeft
                                  ,midRight: midRight
                                  ,topLeft: topLeft
                                  ,topRight: topRight
                                  ,bottomLeft: bottomLeft
                                  ,bottomRight: bottomRight
                                  ,absolute: absolute
                                  ,relative: relative
                                  ,middleAt: middleAt
                                  ,midTopAt: midTopAt
                                  ,midBottomAt: midBottomAt
                                  ,midLeftAt: midLeftAt
                                  ,midRightAt: midRightAt
                                  ,topLeftAt: topLeftAt
                                  ,topRightAt: topRightAt
                                  ,bottomLeftAt: bottomLeftAt
                                  ,bottomRightAt: bottomRightAt
                                  ,Element: Element
                                  ,Position: Position};
   return _elm.Graphics.Element.values;
};
Elm.Html = Elm.Html || {};
Elm.Html.make = function (_elm) {
   "use strict";
   _elm.Html = _elm.Html || {};
   if (_elm.Html.values)
   return _elm.Html.values;
   var _op = {},
   _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   $moduleName = "Html",
   $Basics = Elm.Basics.make(_elm),
   $Graphics$Element = Elm.Graphics.Element.make(_elm),
   $List = Elm.List.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Result = Elm.Result.make(_elm),
   $Signal = Elm.Signal.make(_elm),
   $VirtualDom = Elm.VirtualDom.make(_elm);
   var fromElement = $VirtualDom.fromElement;
   var toElement = $VirtualDom.toElement;
   var text = $VirtualDom.text;
   var node = $VirtualDom.node;
   var body = node("body");
   var section = node("section");
   var nav = node("nav");
   var article = node("article");
   var aside = node("aside");
   var h1 = node("h1");
   var h2 = node("h2");
   var h3 = node("h3");
   var h4 = node("h4");
   var h5 = node("h5");
   var h6 = node("h6");
   var header = node("header");
   var footer = node("footer");
   var address = node("address");
   var main$ = node("main");
   var p = node("p");
   var hr = node("hr");
   var pre = node("pre");
   var blockquote = node("blockquote");
   var ol = node("ol");
   var ul = node("ul");
   var li = node("li");
   var dl = node("dl");
   var dt = node("dt");
   var dd = node("dd");
   var figure = node("figure");
   var figcaption = node("figcaption");
   var div = node("div");
   var a = node("a");
   var em = node("em");
   var strong = node("strong");
   var small = node("small");
   var s = node("s");
   var cite = node("cite");
   var q = node("q");
   var dfn = node("dfn");
   var abbr = node("abbr");
   var time = node("time");
   var code = node("code");
   var $var = node("var");
   var samp = node("samp");
   var kbd = node("kbd");
   var sub = node("sub");
   var sup = node("sup");
   var i = node("i");
   var b = node("b");
   var u = node("u");
   var mark = node("mark");
   var ruby = node("ruby");
   var rt = node("rt");
   var rp = node("rp");
   var bdi = node("bdi");
   var bdo = node("bdo");
   var span = node("span");
   var br = node("br");
   var wbr = node("wbr");
   var ins = node("ins");
   var del = node("del");
   var img = node("img");
   var iframe = node("iframe");
   var embed = node("embed");
   var object = node("object");
   var param = node("param");
   var video = node("video");
   var audio = node("audio");
   var source = node("source");
   var track = node("track");
   var canvas = node("canvas");
   var svg = node("svg");
   var math = node("math");
   var table = node("table");
   var caption = node("caption");
   var colgroup = node("colgroup");
   var col = node("col");
   var tbody = node("tbody");
   var thead = node("thead");
   var tfoot = node("tfoot");
   var tr = node("tr");
   var td = node("td");
   var th = node("th");
   var form = node("form");
   var fieldset = node("fieldset");
   var legend = node("legend");
   var label = node("label");
   var input = node("input");
   var button = node("button");
   var select = node("select");
   var datalist = node("datalist");
   var optgroup = node("optgroup");
   var option = node("option");
   var textarea = node("textarea");
   var keygen = node("keygen");
   var output = node("output");
   var progress = node("progress");
   var meter = node("meter");
   var details = node("details");
   var summary = node("summary");
   var menuitem = node("menuitem");
   var menu = node("menu");
   _elm.Html.values = {_op: _op
                      ,node: node
                      ,text: text
                      ,toElement: toElement
                      ,fromElement: fromElement
                      ,body: body
                      ,section: section
                      ,nav: nav
                      ,article: article
                      ,aside: aside
                      ,h1: h1
                      ,h2: h2
                      ,h3: h3
                      ,h4: h4
                      ,h5: h5
                      ,h6: h6
                      ,header: header
                      ,footer: footer
                      ,address: address
                      ,main$: main$
                      ,p: p
                      ,hr: hr
                      ,pre: pre
                      ,blockquote: blockquote
                      ,ol: ol
                      ,ul: ul
                      ,li: li
                      ,dl: dl
                      ,dt: dt
                      ,dd: dd
                      ,figure: figure
                      ,figcaption: figcaption
                      ,div: div
                      ,a: a
                      ,em: em
                      ,strong: strong
                      ,small: small
                      ,s: s
                      ,cite: cite
                      ,q: q
                      ,dfn: dfn
                      ,abbr: abbr
                      ,time: time
                      ,code: code
                      ,$var: $var
                      ,samp: samp
                      ,kbd: kbd
                      ,sub: sub
                      ,sup: sup
                      ,i: i
                      ,b: b
                      ,u: u
                      ,mark: mark
                      ,ruby: ruby
                      ,rt: rt
                      ,rp: rp
                      ,bdi: bdi
                      ,bdo: bdo
                      ,span: span
                      ,br: br
                      ,wbr: wbr
                      ,ins: ins
                      ,del: del
                      ,img: img
                      ,iframe: iframe
                      ,embed: embed
                      ,object: object
                      ,param: param
                      ,video: video
                      ,audio: audio
                      ,source: source
                      ,track: track
                      ,canvas: canvas
                      ,svg: svg
                      ,math: math
                      ,table: table
                      ,caption: caption
                      ,colgroup: colgroup
                      ,col: col
                      ,tbody: tbody
                      ,thead: thead
                      ,tfoot: tfoot
                      ,tr: tr
                      ,td: td
                      ,th: th
                      ,form: form
                      ,fieldset: fieldset
                      ,legend: legend
                      ,label: label
                      ,input: input
                      ,button: button
                      ,select: select
                      ,datalist: datalist
                      ,optgroup: optgroup
                      ,option: option
                      ,textarea: textarea
                      ,keygen: keygen
                      ,output: output
                      ,progress: progress
                      ,meter: meter
                      ,details: details
                      ,summary: summary
                      ,menuitem: menuitem
                      ,menu: menu};
   return _elm.Html.values;
};
Elm.Html = Elm.Html || {};
Elm.Html.Attributes = Elm.Html.Attributes || {};
Elm.Html.Attributes.make = function (_elm) {
   "use strict";
   _elm.Html = _elm.Html || {};
   _elm.Html.Attributes = _elm.Html.Attributes || {};
   if (_elm.Html.Attributes.values)
   return _elm.Html.Attributes.values;
   var _op = {},
   _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   $moduleName = "Html.Attributes",
   $Basics = Elm.Basics.make(_elm),
   $Html = Elm.Html.make(_elm),
   $Json$Encode = Elm.Json.Encode.make(_elm),
   $List = Elm.List.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Result = Elm.Result.make(_elm),
   $Signal = Elm.Signal.make(_elm),
   $String = Elm.String.make(_elm),
   $VirtualDom = Elm.VirtualDom.make(_elm);
   var attribute = $VirtualDom.attribute;
   var property = $VirtualDom.property;
   var stringProperty = F2(function (name,
   string) {
      return A2(property,
      name,
      $Json$Encode.string(string));
   });
   var $class = function (name) {
      return A2(stringProperty,
      "className",
      name);
   };
   var id = function (name) {
      return A2(stringProperty,
      "id",
      name);
   };
   var title = function (name) {
      return A2(stringProperty,
      "title",
      name);
   };
   var accesskey = function ($char) {
      return A2(stringProperty,
      "accesskey",
      $String.fromList(_L.fromArray([$char])));
   };
   var contextmenu = function (value) {
      return A2(stringProperty,
      "contextmenu",
      value);
   };
   var dir = function (value) {
      return A2(stringProperty,
      "dir",
      value);
   };
   var draggable = function (value) {
      return A2(stringProperty,
      "draggable",
      value);
   };
   var dropzone = function (value) {
      return A2(stringProperty,
      "dropzone",
      value);
   };
   var itemprop = function (value) {
      return A2(stringProperty,
      "itemprop",
      value);
   };
   var lang = function (value) {
      return A2(stringProperty,
      "lang",
      value);
   };
   var tabindex = function (n) {
      return A2(stringProperty,
      "tabIndex",
      $Basics.toString(n));
   };
   var charset = function (value) {
      return A2(stringProperty,
      "charset",
      value);
   };
   var content = function (value) {
      return A2(stringProperty,
      "content",
      value);
   };
   var httpEquiv = function (value) {
      return A2(stringProperty,
      "httpEquiv",
      value);
   };
   var language = function (value) {
      return A2(stringProperty,
      "language",
      value);
   };
   var src = function (value) {
      return A2(stringProperty,
      "src",
      value);
   };
   var height = function (value) {
      return A2(stringProperty,
      "height",
      $Basics.toString(value));
   };
   var width = function (value) {
      return A2(stringProperty,
      "width",
      $Basics.toString(value));
   };
   var alt = function (value) {
      return A2(stringProperty,
      "alt",
      value);
   };
   var preload = function (value) {
      return A2(stringProperty,
      "preload",
      value);
   };
   var poster = function (value) {
      return A2(stringProperty,
      "poster",
      value);
   };
   var kind = function (value) {
      return A2(stringProperty,
      "kind",
      value);
   };
   var srclang = function (value) {
      return A2(stringProperty,
      "srclang",
      value);
   };
   var sandbox = function (value) {
      return A2(stringProperty,
      "sandbox",
      value);
   };
   var srcdoc = function (value) {
      return A2(stringProperty,
      "srcdoc",
      value);
   };
   var type$ = function (value) {
      return A2(stringProperty,
      "type",
      value);
   };
   var value = function (value) {
      return A2(stringProperty,
      "value",
      value);
   };
   var placeholder = function (value) {
      return A2(stringProperty,
      "placeholder",
      value);
   };
   var accept = function (value) {
      return A2(stringProperty,
      "accept",
      value);
   };
   var acceptCharset = function (value) {
      return A2(stringProperty,
      "acceptCharset",
      value);
   };
   var action = function (value) {
      return A2(stringProperty,
      "action",
      value);
   };
   var autocomplete = function (bool) {
      return A2(stringProperty,
      "autocomplete",
      bool ? "on" : "off");
   };
   var autosave = function (value) {
      return A2(stringProperty,
      "autosave",
      value);
   };
   var enctype = function (value) {
      return A2(stringProperty,
      "enctype",
      value);
   };
   var formaction = function (value) {
      return A2(stringProperty,
      "formaction",
      value);
   };
   var list = function (value) {
      return A2(stringProperty,
      "list",
      value);
   };
   var minlength = function (n) {
      return A2(stringProperty,
      "minLength",
      $Basics.toString(n));
   };
   var maxlength = function (n) {
      return A2(stringProperty,
      "maxLength",
      $Basics.toString(n));
   };
   var method = function (value) {
      return A2(stringProperty,
      "method",
      value);
   };
   var name = function (value) {
      return A2(stringProperty,
      "name",
      value);
   };
   var pattern = function (value) {
      return A2(stringProperty,
      "pattern",
      value);
   };
   var size = function (n) {
      return A2(stringProperty,
      "size",
      $Basics.toString(n));
   };
   var $for = function (value) {
      return A2(stringProperty,
      "htmlFor",
      value);
   };
   var form = function (value) {
      return A2(stringProperty,
      "form",
      value);
   };
   var max = function (value) {
      return A2(stringProperty,
      "max",
      value);
   };
   var min = function (value) {
      return A2(stringProperty,
      "min",
      value);
   };
   var step = function (n) {
      return A2(stringProperty,
      "step",
      n);
   };
   var cols = function (n) {
      return A2(stringProperty,
      "cols",
      $Basics.toString(n));
   };
   var rows = function (n) {
      return A2(stringProperty,
      "rows",
      $Basics.toString(n));
   };
   var wrap = function (value) {
      return A2(stringProperty,
      "wrap",
      value);
   };
   var usemap = function (value) {
      return A2(stringProperty,
      "useMap",
      value);
   };
   var shape = function (value) {
      return A2(stringProperty,
      "shape",
      value);
   };
   var coords = function (value) {
      return A2(stringProperty,
      "coords",
      value);
   };
   var challenge = function (value) {
      return A2(stringProperty,
      "challenge",
      value);
   };
   var keytype = function (value) {
      return A2(stringProperty,
      "keytype",
      value);
   };
   var align = function (value) {
      return A2(stringProperty,
      "align",
      value);
   };
   var cite = function (value) {
      return A2(stringProperty,
      "cite",
      value);
   };
   var href = function (value) {
      return A2(stringProperty,
      "href",
      value);
   };
   var target = function (value) {
      return A2(stringProperty,
      "target",
      value);
   };
   var downloadAs = function (value) {
      return A2(stringProperty,
      "download",
      value);
   };
   var hreflang = function (value) {
      return A2(stringProperty,
      "hreflang",
      value);
   };
   var media = function (value) {
      return A2(stringProperty,
      "media",
      value);
   };
   var ping = function (value) {
      return A2(stringProperty,
      "ping",
      value);
   };
   var rel = function (value) {
      return A2(stringProperty,
      "rel",
      value);
   };
   var datetime = function (value) {
      return A2(stringProperty,
      "datetime",
      value);
   };
   var pubdate = function (value) {
      return A2(stringProperty,
      "pubdate",
      value);
   };
   var start = function (n) {
      return A2(stringProperty,
      "start",
      $Basics.toString(n));
   };
   var colspan = function (n) {
      return A2(stringProperty,
      "colSpan",
      $Basics.toString(n));
   };
   var headers = function (value) {
      return A2(stringProperty,
      "headers",
      value);
   };
   var rowspan = function (n) {
      return A2(stringProperty,
      "rowSpan",
      $Basics.toString(n));
   };
   var scope = function (value) {
      return A2(stringProperty,
      "scope",
      value);
   };
   var manifest = function (value) {
      return A2(stringProperty,
      "manifest",
      value);
   };
   var boolProperty = F2(function (name,
   bool) {
      return A2(property,
      name,
      $Json$Encode.bool(bool));
   });
   var hidden = function (bool) {
      return A2(boolProperty,
      "hidden",
      bool);
   };
   var contenteditable = function (bool) {
      return A2(boolProperty,
      "contentEditable",
      bool);
   };
   var spellcheck = function (bool) {
      return A2(boolProperty,
      "spellcheck",
      bool);
   };
   var async = function (bool) {
      return A2(boolProperty,
      "async",
      bool);
   };
   var defer = function (bool) {
      return A2(boolProperty,
      "defer",
      bool);
   };
   var scoped = function (bool) {
      return A2(boolProperty,
      "scoped",
      bool);
   };
   var autoplay = function (bool) {
      return A2(boolProperty,
      "autoplay",
      bool);
   };
   var controls = function (bool) {
      return A2(boolProperty,
      "controls",
      bool);
   };
   var loop = function (bool) {
      return A2(boolProperty,
      "loop",
      bool);
   };
   var $default = function (bool) {
      return A2(boolProperty,
      "default",
      bool);
   };
   var seamless = function (bool) {
      return A2(boolProperty,
      "seamless",
      bool);
   };
   var checked = function (bool) {
      return A2(boolProperty,
      "checked",
      bool);
   };
   var selected = function (bool) {
      return A2(boolProperty,
      "selected",
      bool);
   };
   var autofocus = function (bool) {
      return A2(boolProperty,
      "autofocus",
      bool);
   };
   var disabled = function (bool) {
      return A2(boolProperty,
      "disabled",
      bool);
   };
   var multiple = function (bool) {
      return A2(boolProperty,
      "multiple",
      bool);
   };
   var novalidate = function (bool) {
      return A2(boolProperty,
      "noValidate",
      bool);
   };
   var readonly = function (bool) {
      return A2(boolProperty,
      "readOnly",
      bool);
   };
   var required = function (bool) {
      return A2(boolProperty,
      "required",
      bool);
   };
   var ismap = function (value) {
      return A2(boolProperty,
      "isMap",
      value);
   };
   var download = function (bool) {
      return A2(boolProperty,
      "download",
      bool);
   };
   var reversed = function (bool) {
      return A2(boolProperty,
      "reversed",
      bool);
   };
   var classList = function (list) {
      return $class($String.join(" ")($List.map($Basics.fst)($List.filter($Basics.snd)(list))));
   };
   var style = function (props) {
      return property("style")($Json$Encode.object($List.map(function (_v0) {
         return function () {
            switch (_v0.ctor)
            {case "_Tuple2":
               return {ctor: "_Tuple2"
                      ,_0: _v0._0
                      ,_1: $Json$Encode.string(_v0._1)};}
            _U.badCase($moduleName,
            "on line 133, column 35 to 57");
         }();
      })(props)));
   };
   var key = function (k) {
      return A2(stringProperty,
      "key",
      k);
   };
   _elm.Html.Attributes.values = {_op: _op
                                 ,key: key
                                 ,style: style
                                 ,classList: classList
                                 ,property: property
                                 ,stringProperty: stringProperty
                                 ,boolProperty: boolProperty
                                 ,attribute: attribute
                                 ,$class: $class
                                 ,hidden: hidden
                                 ,id: id
                                 ,title: title
                                 ,accesskey: accesskey
                                 ,contenteditable: contenteditable
                                 ,contextmenu: contextmenu
                                 ,dir: dir
                                 ,draggable: draggable
                                 ,dropzone: dropzone
                                 ,itemprop: itemprop
                                 ,lang: lang
                                 ,spellcheck: spellcheck
                                 ,tabindex: tabindex
                                 ,async: async
                                 ,charset: charset
                                 ,content: content
                                 ,defer: defer
                                 ,httpEquiv: httpEquiv
                                 ,language: language
                                 ,scoped: scoped
                                 ,src: src
                                 ,height: height
                                 ,width: width
                                 ,alt: alt
                                 ,autoplay: autoplay
                                 ,controls: controls
                                 ,loop: loop
                                 ,preload: preload
                                 ,poster: poster
                                 ,$default: $default
                                 ,kind: kind
                                 ,srclang: srclang
                                 ,sandbox: sandbox
                                 ,seamless: seamless
                                 ,srcdoc: srcdoc
                                 ,type$: type$
                                 ,value: value
                                 ,checked: checked
                                 ,placeholder: placeholder
                                 ,selected: selected
                                 ,accept: accept
                                 ,acceptCharset: acceptCharset
                                 ,action: action
                                 ,autocomplete: autocomplete
                                 ,autofocus: autofocus
                                 ,autosave: autosave
                                 ,disabled: disabled
                                 ,enctype: enctype
                                 ,formaction: formaction
                                 ,list: list
                                 ,minlength: minlength
                                 ,maxlength: maxlength
                                 ,method: method
                                 ,multiple: multiple
                                 ,name: name
                                 ,novalidate: novalidate
                                 ,pattern: pattern
                                 ,readonly: readonly
                                 ,required: required
                                 ,size: size
                                 ,$for: $for
                                 ,form: form
                                 ,max: max
                                 ,min: min
                                 ,step: step
                                 ,cols: cols
                                 ,rows: rows
                                 ,wrap: wrap
                                 ,ismap: ismap
                                 ,usemap: usemap
                                 ,shape: shape
                                 ,coords: coords
                                 ,challenge: challenge
                                 ,keytype: keytype
                                 ,align: align
                                 ,cite: cite
                                 ,href: href
                                 ,target: target
                                 ,download: download
                                 ,downloadAs: downloadAs
                                 ,hreflang: hreflang
                                 ,media: media
                                 ,ping: ping
                                 ,rel: rel
                                 ,datetime: datetime
                                 ,pubdate: pubdate
                                 ,reversed: reversed
                                 ,start: start
                                 ,colspan: colspan
                                 ,headers: headers
                                 ,rowspan: rowspan
                                 ,scope: scope
                                 ,manifest: manifest};
   return _elm.Html.Attributes.values;
};
Elm.Html = Elm.Html || {};
Elm.Html.Events = Elm.Html.Events || {};
Elm.Html.Events.make = function (_elm) {
   "use strict";
   _elm.Html = _elm.Html || {};
   _elm.Html.Events = _elm.Html.Events || {};
   if (_elm.Html.Events.values)
   return _elm.Html.Events.values;
   var _op = {},
   _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   $moduleName = "Html.Events",
   $Basics = Elm.Basics.make(_elm),
   $Html = Elm.Html.make(_elm),
   $Json$Decode = Elm.Json.Decode.make(_elm),
   $List = Elm.List.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Result = Elm.Result.make(_elm),
   $Signal = Elm.Signal.make(_elm),
   $VirtualDom = Elm.VirtualDom.make(_elm);
   var keyCode = A2($Json$Decode._op[":="],
   "keyCode",
   $Json$Decode.$int);
   var targetChecked = A2($Json$Decode.at,
   _L.fromArray(["target"
                ,"checked"]),
   $Json$Decode.bool);
   var targetValue = A2($Json$Decode.at,
   _L.fromArray(["target"
                ,"value"]),
   $Json$Decode.string);
   var on = $VirtualDom.on;
   var messageOn = F3(function (name,
   addr,
   msg) {
      return A3(on,
      name,
      $Json$Decode.value,
      function (_v0) {
         return function () {
            return A2($Signal.message,
            addr,
            msg);
         }();
      });
   });
   var onClick = messageOn("click");
   var onDoubleClick = messageOn("dblclick");
   var onMouseMove = messageOn("mousemove");
   var onMouseDown = messageOn("mousedown");
   var onMouseUp = messageOn("mouseup");
   var onMouseEnter = messageOn("mouseenter");
   var onMouseLeave = messageOn("mouseleave");
   var onMouseOver = messageOn("mouseover");
   var onMouseOut = messageOn("mouseout");
   var onBlur = messageOn("blur");
   var onFocus = messageOn("focus");
   var onSubmit = messageOn("submit");
   var onKey = F3(function (name,
   addr,
   handler) {
      return A3(on,
      name,
      keyCode,
      function (code) {
         return A2($Signal.message,
         addr,
         handler(code));
      });
   });
   var onKeyUp = onKey("keyup");
   var onKeyDown = onKey("keydown");
   var onKeyPress = onKey("keypress");
   _elm.Html.Events.values = {_op: _op
                             ,onBlur: onBlur
                             ,onFocus: onFocus
                             ,onSubmit: onSubmit
                             ,onKeyUp: onKeyUp
                             ,onKeyDown: onKeyDown
                             ,onKeyPress: onKeyPress
                             ,onClick: onClick
                             ,onDoubleClick: onDoubleClick
                             ,onMouseMove: onMouseMove
                             ,onMouseDown: onMouseDown
                             ,onMouseUp: onMouseUp
                             ,onMouseEnter: onMouseEnter
                             ,onMouseLeave: onMouseLeave
                             ,onMouseOver: onMouseOver
                             ,onMouseOut: onMouseOut
                             ,on: on
                             ,targetValue: targetValue
                             ,targetChecked: targetChecked
                             ,keyCode: keyCode};
   return _elm.Html.Events.values;
};
Elm.InnoCheck = Elm.InnoCheck || {};
Elm.InnoCheck.make = function (_elm) {
   "use strict";
   _elm.InnoCheck = _elm.InnoCheck || {};
   if (_elm.InnoCheck.values)
   return _elm.InnoCheck.values;
   var _op = {},
   _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   $moduleName = "InnoCheck",
   $Basics = Elm.Basics.make(_elm),
   $ElmFire = Elm.ElmFire.make(_elm),
   $Html = Elm.Html.make(_elm),
   $InnoCheckBackend = Elm.InnoCheckBackend.make(_elm),
   $InnoCheckModel = Elm.InnoCheckModel.make(_elm),
   $InnoCheckUpdate = Elm.InnoCheckUpdate.make(_elm),
   $InnoCheckView = Elm.InnoCheckView.make(_elm),
   $List = Elm.List.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Result = Elm.Result.make(_elm),
   $Signal = Elm.Signal.make(_elm),
   $StartApp = Elm.StartApp.make(_elm),
   $Task = Elm.Task.make(_elm);
   var runStore = Elm.Native.Task.make(_elm).performSignal("runStore",
   $InnoCheckBackend.storeMailbox.signal);
   var main = $StartApp.start({_: {}
                              ,model: $InnoCheckModel.initialModel0
                              ,update: $InnoCheckUpdate.update
                              ,view: $InnoCheckView.view});
   _elm.InnoCheck.values = {_op: _op
                           ,main: main};
   return _elm.InnoCheck.values;
};
Elm.InnoCheckBackend = Elm.InnoCheckBackend || {};
Elm.InnoCheckBackend.make = function (_elm) {
   "use strict";
   _elm.InnoCheckBackend = _elm.InnoCheckBackend || {};
   if (_elm.InnoCheckBackend.values)
   return _elm.InnoCheckBackend.values;
   var _op = {},
   _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   $moduleName = "InnoCheckBackend",
   $Basics = Elm.Basics.make(_elm),
   $Dict = Elm.Dict.make(_elm),
   $ElmFire = Elm.ElmFire.make(_elm),
   $InnoCheckModel = Elm.InnoCheckModel.make(_elm),
   $InnoCheckUtil = Elm.InnoCheckUtil.make(_elm),
   $Json$Encode = Elm.Json.Encode.make(_elm),
   $List = Elm.List.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Result = Elm.Result.make(_elm),
   $Signal = Elm.Signal.make(_elm),
   $Task = Elm.Task.make(_elm);
   var encodePerson = function (person) {
      return $Json$Encode.object(_L.fromArray([{ctor: "_Tuple2"
                                               ,_0: "email"
                                               ,_1: $Json$Encode.string(person.email)}
                                              ,{ctor: "_Tuple2"
                                               ,_0: "firstname"
                                               ,_1: $Json$Encode.string(person.firstname)}
                                              ,{ctor: "_Tuple2"
                                               ,_0: "lastname"
                                               ,_1: $Json$Encode.string(person.lastname)}
                                              ,{ctor: "_Tuple2"
                                               ,_0: "companyname"
                                               ,_1: $Json$Encode.string(person.companyname)}]));
   };
   var encodeQuestionAnwsers = function (questionAnswers) {
      return function () {
         var encodeQuestionAnswer = function (_v0) {
            return function () {
               switch (_v0.ctor)
               {case "_Tuple2":
                  return {ctor: "_Tuple2"
                         ,_0: $Basics.toString(_v0._0)
                         ,_1: $Json$Encode.string($InnoCheckUtil.getAnswerText(_v0._1))};}
               _U.badCase($moduleName,
               "on line 36, column 14 to 53");
            }();
         };
         return $Json$Encode.object(A2($List.map,
         encodeQuestionAnswer,
         $Dict.toList(questionAnswers)));
      }();
   };
   var encodeQuestions = function (questions) {
      return function () {
         var encodeQuestion = function (q) {
            return $Json$Encode.object(_L.fromArray([{ctor: "_Tuple2"
                                                     ,_0: "key"
                                                     ,_1: $Json$Encode.$int(q.key)}
                                                    ,{ctor: "_Tuple2"
                                                     ,_0: "aspect"
                                                     ,_1: $Json$Encode.string($InnoCheckUtil.getAspectText(q.aspect))}
                                                    ,{ctor: "_Tuple2"
                                                     ,_0: "text"
                                                     ,_1: $Json$Encode.string(q.text)}]));
         };
         return $Json$Encode.list(A2($List.map,
         encodeQuestion,
         questions));
      }();
   };
   var ircObject = function (model) {
      return $Json$Encode.object(_L.fromArray([{ctor: "_Tuple2"
                                               ,_0: "person"
                                               ,_1: encodePerson(model.person)}
                                              ,{ctor: "_Tuple2"
                                               ,_0: "questions"
                                               ,_1: encodeQuestions(model.questions)}
                                              ,{ctor: "_Tuple2"
                                               ,_0: "questionAnswers"
                                               ,_1: encodeQuestionAnwsers(model.questionAnswers)}]));
   };
   var storeIrcObject = function (model) {
      return A2($ElmFire.set,
      ircObject(model),
      $ElmFire.push($ElmFire.fromUrl($InnoCheckModel.postUrl)));
   };
   var storeMailbox = $Signal.mailbox($Task.succeed({ctor: "_Tuple0"}));
   _elm.InnoCheckBackend.values = {_op: _op
                                  ,storeMailbox: storeMailbox
                                  ,encodeQuestions: encodeQuestions
                                  ,encodeQuestionAnwsers: encodeQuestionAnwsers
                                  ,encodePerson: encodePerson
                                  ,ircObject: ircObject
                                  ,storeIrcObject: storeIrcObject};
   return _elm.InnoCheckBackend.values;
};
Elm.InnoCheckModel = Elm.InnoCheckModel || {};
Elm.InnoCheckModel.make = function (_elm) {
   "use strict";
   _elm.InnoCheckModel = _elm.InnoCheckModel || {};
   if (_elm.InnoCheckModel.values)
   return _elm.InnoCheckModel.values;
   var _op = {},
   _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   $moduleName = "InnoCheckModel",
   $Basics = Elm.Basics.make(_elm),
   $Dict = Elm.Dict.make(_elm),
   $List = Elm.List.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Result = Elm.Result.make(_elm),
   $SelectionList = Elm.SelectionList.make(_elm),
   $Signal = Elm.Signal.make(_elm);
   var postUrl = "https://doon-irc.firebaseio.com/irc-quickscan/";
   var answerColorEmpty = "#CCCCCC";
   var answerColorRed = "#C40233";
   var answerColorOrange = "orange";
   var answerColorGreen = "#009F6B";
   var answerColorList = $Dict.fromList(_L.fromArray([{ctor: "_Tuple2"
                                                      ,_0: "Yes"
                                                      ,_1: answerColorGreen}
                                                     ,{ctor: "_Tuple2"
                                                      ,_0: "Partly"
                                                      ,_1: answerColorOrange}
                                                     ,{ctor: "_Tuple2"
                                                      ,_0: "No"
                                                      ,_1: answerColorRed}]));
   var questionAnswersEmpty = $Dict.empty;
   var person0 = {_: {}
                 ,companyname: ""
                 ,email: ""
                 ,firstname: ""
                 ,lastname: ""};
   var Person = F4(function (a,
   b,
   c,
   d) {
      return {_: {}
             ,companyname: d
             ,email: a
             ,firstname: b
             ,lastname: c};
   });
   var Recommendation = F4(function (a,
   b,
   c,
   d) {
      return {_: {}
             ,aspect: a
             ,scoreMax: c
             ,scoreMin: b
             ,text: d};
   });
   var Question = F3(function (a,
   b,
   c) {
      return {_: {}
             ,aspect: b
             ,key: a
             ,text: c};
   });
   var No = {ctor: "No"};
   var Partly = {ctor: "Partly"};
   var Yes = {ctor: "Yes"};
   var questionAnswers0 = $Dict.fromList(_L.fromArray([{ctor: "_Tuple2"
                                                       ,_0: 1
                                                       ,_1: Yes}
                                                      ,{ctor: "_Tuple2"
                                                       ,_0: 2
                                                       ,_1: Yes}
                                                      ,{ctor: "_Tuple2"
                                                       ,_0: 3
                                                       ,_1: No}
                                                      ,{ctor: "_Tuple2"
                                                       ,_0: 4
                                                       ,_1: Partly}
                                                      ,{ctor: "_Tuple2"
                                                       ,_0: 5
                                                       ,_1: No}
                                                      ,{ctor: "_Tuple2"
                                                       ,_0: 6
                                                       ,_1: Yes}
                                                      ,{ctor: "_Tuple2"
                                                       ,_0: 7
                                                       ,_1: Yes}
                                                      ,{ctor: "_Tuple2"
                                                       ,_0: 8
                                                       ,_1: No}
                                                      ,{ctor: "_Tuple2"
                                                       ,_0: 9
                                                       ,_1: Partly}
                                                      ,{ctor: "_Tuple2"
                                                       ,_0: 10
                                                       ,_1: Yes}
                                                      ,{ctor: "_Tuple2"
                                                       ,_0: 11
                                                       ,_1: Partly}
                                                      ,{ctor: "_Tuple2"
                                                       ,_0: 12
                                                       ,_1: Yes}]));
   var answerTextList = _L.fromArray([{ctor: "_Tuple2"
                                      ,_0: Yes
                                      ,_1: "Ja"}
                                     ,{ctor: "_Tuple2"
                                      ,_0: Partly
                                      ,_1: "Deels"}
                                     ,{ctor: "_Tuple2"
                                      ,_0: No
                                      ,_1: "Nee"}]);
   var answerScoreList = _L.fromArray([{ctor: "_Tuple2"
                                       ,_0: Yes
                                       ,_1: 3}
                                      ,{ctor: "_Tuple2"
                                       ,_0: Partly
                                       ,_1: 1}
                                      ,{ctor: "_Tuple2"
                                       ,_0: No
                                       ,_1: 0}]);
   var Improve = {ctor: "Improve"};
   var MeasureAndMonitor = {ctor: "MeasureAndMonitor"};
   var Processes = {ctor: "Processes"};
   var Resources = {ctor: "Resources"};
   var Culture = {ctor: "Culture"};
   var Leadership = {ctor: "Leadership"};
   var questions = _L.fromArray([{_: {}
                                 ,aspect: Leadership
                                 ,key: 1
                                 ,text: "Begrijpt, ondersteunt en is het management actief betrokken bij de activiteiten op het gebied van innovatie?"}
                                ,{_: {}
                                 ,aspect: Leadership
                                 ,key: 2
                                 ,text: "Heeft het management meetbare innovatiedoelen gesteld en communiceert zij deze ook?"}
                                ,{_: {}
                                 ,aspect: Culture
                                 ,key: 3
                                 ,text: "Wordt innovatie door de organisatie bewaakt en beoordeeld?"}
                                ,{_: {}
                                 ,aspect: Culture
                                 ,key: 4
                                 ,text: "Worden inspanningen tot creativiteit en innovativiteit blijvend gestimuleerd?"}
                                ,{_: {}
                                 ,aspect: Processes
                                 ,key: 5
                                 ,text: "Heeft de organisatie al haar processen zo beschreven, ontwikkeld en geïmplementeerd dat er innovatie kan plaats vinden?"}
                                ,{_: {}
                                 ,aspect: Processes
                                 ,key: 6
                                 ,text: "Omvatten de processen het begin, midden en einde van de innovatiecyclus en bevatten ze de zes aspecten van dit canvas?"}
                                ,{_: {}
                                 ,aspect: Resources
                                 ,key: 7
                                 ,text: "Zijn er voldoende middelen (mensen, geld, infrastructuur, informatie) beschikbaar om innovatieve activiteiten uit te voeren?"}
                                ,{_: {}
                                 ,aspect: Resources
                                 ,key: 8
                                 ,text: "Worden individuen en teams erkend voor hun deelname in innovatieve activiteiten?"}
                                ,{_: {}
                                 ,aspect: MeasureAndMonitor
                                 ,key: 9
                                 ,text: "Meet en bewaakt de organisatie systematisch de innovatiecapaciteit van de organisatie?"}
                                ,{_: {}
                                 ,aspect: MeasureAndMonitor
                                 ,key: 10
                                 ,text: "Worden er meetwaarden gebruikt om de innovatieve activiteiten te meten en bewaken?"}
                                ,{_: {}
                                 ,aspect: Improve
                                 ,key: 11
                                 ,text: "Analyseert de organisatie de resultaten van het innovatieproces en voert zij verbeteringen door op het innovatieproces?"}
                                ,{_: {}
                                 ,aspect: Improve
                                 ,key: 12
                                 ,text: "Is er een proces om maatregelen te nemen als verbeteringen van het innovatieproces niet succesvol zijn?"}]);
   var recommendations = _L.fromArray([{_: {}
                                       ,aspect: Leadership
                                       ,scoreMax: 0.3
                                       ,scoreMin: 0.0
                                       ,text: "Leg 1 of 2 concrete innovatiedoelen vast in het bedrijfsplan voor dit jaar."}
                                      ,{_: {}
                                       ,aspect: Leadership
                                       ,scoreMax: 1.0
                                       ,scoreMin: 0.3
                                       ,text: "Goed bezig. Focus eerst op het verbeteren van de andere aspecten."}]);
   var aspectList = _L.fromArray([{ctor: "_Tuple2"
                                  ,_0: Leadership
                                  ,_1: "Leiderschap"}
                                 ,{ctor: "_Tuple2"
                                  ,_0: Culture
                                  ,_1: "Cultuur"}
                                 ,{ctor: "_Tuple2"
                                  ,_0: Processes
                                  ,_1: "Processen"}
                                 ,{ctor: "_Tuple2"
                                  ,_0: Resources
                                  ,_1: "Middelen"}
                                 ,{ctor: "_Tuple2"
                                  ,_0: MeasureAndMonitor
                                  ,_1: "Meten en monitoren"}
                                 ,{ctor: "_Tuple2"
                                  ,_0: Improve
                                  ,_1: "Verbeteren"}]);
   var aspectTips = $Dict.fromList(_L.fromArray([{ctor: "_Tuple2"
                                                 ,_0: $Basics.toString(Leadership)
                                                 ,_1: "\n#### Tips voor het aspect leiderschap\n\nLeiderschap is een belangrijk aspect bij innovaties. Om ondernemend gedrag \nin je organisatie aan te wakkeren, dient het management ondernemende \nmedewerkers te faciliteren in hun ambitie om oplossingen \nte zoeken voor problemen en uitdagingen.\n\n**Onze tips**\n\n* Ontdek innovaties in jouw organisatie en neem ze op in de business planning\n* Verzeker je ervan dat het management innovatie activiteiten erkent, ondersteunt en promoot\n* Stel organisatiedoelen op waar de innovatiedoelen in zijn opgenomen\n* Gebruik de feedback van jouw stakeholders bij het vaststellen van jouw innovatiedoelen\n* Maak jouw innovatiedoelen meetbaar met doelen, mijlpijlen, tijdlijnen en een strategie om de doelen te halen\n* Communiceer de innovatiedoelen binnen alle lagen van jouw organisatie\n* Hou jouw stakeholders op de hoogte van de voortgang van jouw innovatieactiviteiten\n* Maak managers persoonlijk verantwoordelijk en toerekenbaar, niet alleen voor het \nbehalen van de innovatiedoelen, maar specifiek voor het eigenaarschap en de voortgang van het \ninnovatieproces, de -tools en -methoden, gezamenlijk het innovatiemanagementsysteem genoemd.\n       "}
                                                ,{ctor: "_Tuple2"
                                                 ,_0: $Basics.toString(Culture)
                                                 ,_1: "\n#### Tips voor het aspect cultuur\n\nOndernemend gedrag heeft een goede voedingsbodem nodig. Een cultuur waarin ondernemen \nkan en mag.\n\n**Onze tips**\n\n* Stel een innovatiemanager aan, iemand die verantwoordelijk is voor de innovatieactiveiten in de organisatie\n* Stel een innovatieteam samen om de innovatieactiviteiten te organiseren\n* Weet wie je stakeholders zijn en leer hun (veranderende) behoefte en verwachtingen kennen\n* Stel een visie- en een missiestatement op\n    "}
                                                ,{ctor: "_Tuple2"
                                                 ,_0: $Basics.toString(Processes)
                                                 ,_1: "\n#### Tips voor het aspect processen\n\nEen innovatieproces is tevens een creatief proces. En een creatief proces kent geen vaste \nstappen die met zekerheid leiden naar succes. Een creatief proces is een ontdekkingstocht. \nMaar, de ontwikkeling van een product of dienst, het innovatieproces, kent wel degelijk \nterugkerende ingrediënten en een fasering. Het innovatieproces heeft een aanpak nodig. \nEen innovatiemanagementsysteem.\n\n**Onze tips**\n\n* Documenteer het innovatieproces voldoende en voor zover nodig en zorg voor een *audit trail* om de effectiviteit van het innovatieproces te kunnen meten\n* Organiseer een proces om innovatieprojecten te initiëren, te plannen, te selecteren en te beheersen terwijl deze door de ontdekkings-, ontwikkelings- en uitrolfase heen gaan\n* Verzorg de planning van ieder innovatieproject en biedt een innovatiemethode aan\n* Onderken risico\'s en ga consequent met risico\'s om\n    "}
                                                ,{ctor: "_Tuple2"
                                                 ,_0: $Basics.toString(Resources)
                                                 ,_1: "\n#### Tips voor het aspect middelen\n\nEen innovatieproces heeft voeding nodig in de vorm van mensen en middelen. Je wilt op \neen gecontroleerde wijze het proces op het juiste moment de juiste voeding geven.\n\n**Onze tips**\n\n* Als je het nog niet hebt, zet een budgetteringsproces op waarin je regelmatig bepaald \nwat de benodigde financiële resources zijn om de innovatieprocessen te ondersteunen.\n* Bewaak het innovatieproces en de projectuitgaven regelmatig\n* Stel een innovatiemanager aan die het centrum is van alle innovatieactiviteiten en die \nhet mandaat heeft om een innovatiemanagemensysteem te implementeren.\n* Organiseer een proces waarin medewerkers participeren in de innovatieactiviteiten. Het \nmedewerkerparticipatieprogramma groeit later uit tot een continue leerproces voor medewerkers.\n* Zorg voor een goede informatieverzameling ten behoeve van de ondersteuning van de innovatieactiviteiten \n\n    "}
                                                ,{ctor: "_Tuple2"
                                                 ,_0: $Basics.toString(MeasureAndMonitor)
                                                 ,_1: "\n#### Tips voor het aspect meten en monitoren\n\nMeten is weten. Dat geldt ook voor innovatieprocessen. Meten hoe je innovatieprojecten er \nvoor staan, stelt je in staat om op het juiste moment de juiste ondersteuning te bieden.\n\n**Onze tips**\n\n* Zet een proces in werking om regelmatig de innovatieactiviteiten in je organisatie \nte monitoren en meten gedurende de gehele levenscyclus van het innovatieproces.\n* Meet en bewaak individuele projecten én het gehele innovatie systeem\n* Meet zoveel als nodig is om in de gaten te houden of de innovatieactiviteiten de innovatiedoelstellingen halen\n* Communiceer en review de informatie die je meet\n* Review regelmatig de innovatieactiviteiten\n    "}
                                                ,{ctor: "_Tuple2"
                                                 ,_0: $Basics.toString(Improve)
                                                 ,_1: "\n#### Tips voor het aspect verbeteren\n\nLeren en verbeteren is een belangrijk kenmerk van innoveren en dat geldt ook voor het \ninnovatieproces zelf. Sta ervoor open dat je bezig ben met iets nieuws en dat er nog \nveel te leren valt.\n\n**Onze tips**\n\n* Zorg voor verbeteracties na een managementreview en implementeer, indien nodig, preventieve acties \n* Zorg dat verbeteringen bijdragen aan de organisatiecultuur, de innovatieactiviteiten en processen\n* Analyseer en gebruik de informatieverzameling om continue verbeteringen door te voeren\n* Documenteer en maak inzichtelijk waarom een innovatiemanagementsysteem, -tools en -methoden nodig zijn \nop alle niveau\'s in de organisatie.\n    "}]));
   var aspectSelectionList0 = A2($SelectionList.fromList,
   Leadership,
   _L.fromArray([Culture
                ,Processes
                ,Resources
                ,MeasureAndMonitor
                ,Improve]));
   var initialModel0 = {_: {}
                       ,aspectSelectionList: aspectSelectionList0
                       ,isDirty: true
                       ,person: person0
                       ,questionAnswers: questionAnswersEmpty
                       ,questions: questions
                       ,sendAttempted: false
                       ,sendErrorMessage: ""
                       ,sendSuccess: false
                       ,splashScreenRead: false};
   var Model = F9(function (a,
   b,
   c,
   d,
   e,
   f,
   g,
   h,
   i) {
      return {_: {}
             ,aspectSelectionList: h
             ,isDirty: g
             ,person: c
             ,questionAnswers: b
             ,questions: a
             ,sendAttempted: f
             ,sendErrorMessage: e
             ,sendSuccess: d
             ,splashScreenRead: i};
   });
   _elm.InnoCheckModel.values = {_op: _op
                                ,Model: Model
                                ,Leadership: Leadership
                                ,Culture: Culture
                                ,Resources: Resources
                                ,Processes: Processes
                                ,MeasureAndMonitor: MeasureAndMonitor
                                ,Improve: Improve
                                ,Yes: Yes
                                ,Partly: Partly
                                ,No: No
                                ,Question: Question
                                ,Recommendation: Recommendation
                                ,Person: Person
                                ,initialModel0: initialModel0
                                ,person0: person0
                                ,questions: questions
                                ,recommendations: recommendations
                                ,aspectList: aspectList
                                ,aspectTips: aspectTips
                                ,aspectSelectionList0: aspectSelectionList0
                                ,questionAnswersEmpty: questionAnswersEmpty
                                ,questionAnswers0: questionAnswers0
                                ,answerTextList: answerTextList
                                ,answerScoreList: answerScoreList
                                ,answerColorGreen: answerColorGreen
                                ,answerColorOrange: answerColorOrange
                                ,answerColorRed: answerColorRed
                                ,answerColorList: answerColorList
                                ,answerColorEmpty: answerColorEmpty
                                ,postUrl: postUrl};
   return _elm.InnoCheckModel.values;
};
Elm.InnoCheckUpdate = Elm.InnoCheckUpdate || {};
Elm.InnoCheckUpdate.make = function (_elm) {
   "use strict";
   _elm.InnoCheckUpdate = _elm.InnoCheckUpdate || {};
   if (_elm.InnoCheckUpdate.values)
   return _elm.InnoCheckUpdate.values;
   var _op = {},
   _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   $moduleName = "InnoCheckUpdate",
   $Basics = Elm.Basics.make(_elm),
   $Dict = Elm.Dict.make(_elm),
   $ElmFire = Elm.ElmFire.make(_elm),
   $InnoCheckModel = Elm.InnoCheckModel.make(_elm),
   $List = Elm.List.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Result = Elm.Result.make(_elm),
   $SelectionList = Elm.SelectionList.make(_elm),
   $Signal = Elm.Signal.make(_elm);
   var update = F2(function (action,
   model) {
      return function () {
         switch (action.ctor)
         {case "EditCompanyName":
            return function () {
                 var prs = model.person;
                 return _U.replace([["person"
                                    ,_U.replace([["companyname"
                                                 ,action._0]],
                                    prs)]
                                   ,["isDirty",true]],
                 model);
              }();
            case "EditEmailAddress":
            return function () {
                 var prs = model.person;
                 return _U.replace([["person"
                                    ,_U.replace([["email"
                                                 ,action._0]],
                                    prs)]
                                   ,["isDirty",true]],
                 model);
              }();
            case "EditFirstName":
            return function () {
                 var prs = model.person;
                 return _U.replace([["person"
                                    ,_U.replace([["firstname"
                                                 ,action._0]],
                                    prs)]
                                   ,["isDirty",true]],
                 model);
              }();
            case "EditLastName":
            return function () {
                 var prs = model.person;
                 return _U.replace([["person"
                                    ,_U.replace([["lastname"
                                                 ,action._0]],
                                    prs)]
                                   ,["isDirty",true]],
                 model);
              }();
            case "HandleBackendResponse":
            return function () {
                 switch (action._0.ctor)
                 {case "Err":
                    return _U.replace([["sendAttempted"
                                       ,true]
                                      ,["sendSuccess",false]
                                      ,["sendErrorMessage"
                                       ,$Basics.toString(action._0._0)]],
                      model);
                    case "Ok":
                    return _U.replace([["sendAttempted"
                                       ,true]
                                      ,["sendSuccess",true]
                                      ,["isDirty",false]],
                      model);}
                 _U.badCase($moduleName,
                 "between lines 67 and 81");
              }();
            case "NextAspect":
            return _U.replace([["aspectSelectionList"
                               ,$SelectionList.next(model.aspectSelectionList)]],
              model);
            case "Noop": return model;
            case "PrevAspect":
            return _U.replace([["aspectSelectionList"
                               ,$SelectionList.previous(model.aspectSelectionList)]],
              model);
            case "SelectAnswer":
            return _U.replace([["questionAnswers"
                               ,A3($Dict.insert,
                               action._0,
                               action._1,
                               model.questionAnswers)]
                              ,["isDirty",true]],
              model);
            case "SelectAspect":
            return _U.replace([["aspectSelectionList"
                               ,function () {
                                  var index = $Maybe.withDefault(0)($Dict.get($Basics.toString(action._0))($Dict.fromList($SelectionList.toList(A2($SelectionList.indexedMap,
                                  F2(function (i,a) {
                                     return {ctor: "_Tuple2"
                                            ,_0: $Basics.toString(a)
                                            ,_1: i};
                                  }),
                                  model.aspectSelectionList)))));
                                  return A2($SelectionList.$goto,
                                  index,
                                  model.aspectSelectionList);
                               }()]],
              model);
            case "SendButtonClicked":
            return _U.replace([["sendErrorMessage"
                               ,""]
                              ,["sendSuccess",false]
                              ,["sendAttempted",false]],
              model);
            case "SplashRead":
            return _U.replace([["splashScreenRead"
                               ,true]],
              model);}
         _U.badCase($moduleName,
         "between lines 28 and 119");
      }();
   });
   var SendButtonClicked = {ctor: "SendButtonClicked"};
   var EditCompanyName = function (a) {
      return {ctor: "EditCompanyName"
             ,_0: a};
   };
   var EditLastName = function (a) {
      return {ctor: "EditLastName"
             ,_0: a};
   };
   var EditFirstName = function (a) {
      return {ctor: "EditFirstName"
             ,_0: a};
   };
   var EditEmailAddress = function (a) {
      return {ctor: "EditEmailAddress"
             ,_0: a};
   };
   var HandleBackendResponse = function (a) {
      return {ctor: "HandleBackendResponse"
             ,_0: a};
   };
   var SelectAnswer = F2(function (a,
   b) {
      return {ctor: "SelectAnswer"
             ,_0: a
             ,_1: b};
   });
   var PrevAspect = {ctor: "PrevAspect"};
   var NextAspect = {ctor: "NextAspect"};
   var SelectAspect = function (a) {
      return {ctor: "SelectAspect"
             ,_0: a};
   };
   var SplashRead = {ctor: "SplashRead"};
   var Noop = {ctor: "Noop"};
   var actionMailbox = $Signal.mailbox(Noop);
   _elm.InnoCheckUpdate.values = {_op: _op
                                 ,Noop: Noop
                                 ,SplashRead: SplashRead
                                 ,SelectAspect: SelectAspect
                                 ,NextAspect: NextAspect
                                 ,PrevAspect: PrevAspect
                                 ,SelectAnswer: SelectAnswer
                                 ,HandleBackendResponse: HandleBackendResponse
                                 ,EditEmailAddress: EditEmailAddress
                                 ,EditFirstName: EditFirstName
                                 ,EditLastName: EditLastName
                                 ,EditCompanyName: EditCompanyName
                                 ,SendButtonClicked: SendButtonClicked
                                 ,update: update
                                 ,actionMailbox: actionMailbox};
   return _elm.InnoCheckUpdate.values;
};
Elm.InnoCheckUtil = Elm.InnoCheckUtil || {};
Elm.InnoCheckUtil.make = function (_elm) {
   "use strict";
   _elm.InnoCheckUtil = _elm.InnoCheckUtil || {};
   if (_elm.InnoCheckUtil.values)
   return _elm.InnoCheckUtil.values;
   var _op = {},
   _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   $moduleName = "InnoCheckUtil",
   $Basics = Elm.Basics.make(_elm),
   $Dict = Elm.Dict.make(_elm),
   $InnoCheckModel = Elm.InnoCheckModel.make(_elm),
   $List = Elm.List.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Result = Elm.Result.make(_elm),
   $SelectionList = Elm.SelectionList.make(_elm),
   $Signal = Elm.Signal.make(_elm);
   var getValue = F2(function (dict,
   key) {
      return A2($Dict.get,
      $Basics.toString(key),
      dict);
   });
   var unionToDict = function (list) {
      return $Dict.fromList(A2($List.map,
      function (_v0) {
         return function () {
            switch (_v0.ctor)
            {case "_Tuple2":
               return {ctor: "_Tuple2"
                      ,_0: $Basics.toString(_v0._0)
                      ,_1: _v0._1};}
            _U.badCase($moduleName,
            "on line 187, column 26 to 41");
         }();
      },
      list));
   };
   var getAspectText = function (aspect) {
      return $Maybe.withDefault("")(A2(getValue,
      unionToDict($InnoCheckModel.aspectList),
      aspect));
   };
   var getAnswerText = function (answer) {
      return $Maybe.withDefault("")(A2(getValue,
      unionToDict($InnoCheckModel.answerTextList),
      answer));
   };
   var numberOfQuestionsAnswered = F2(function (questions,
   qanswers) {
      return function () {
         var qkeys = A2($List.map,
         function (q) {
            return q.key;
         },
         questions);
         var filter = function (key) {
            return A2($Dict.member,
            key,
            qanswers) ? $Maybe.Just(key) : $Maybe.Nothing;
         };
         return $List.length(A2($List.filterMap,
         filter,
         qkeys));
      }();
   });
   var allQuestionsAnswered = F2(function (questions,
   qanswers) {
      return _U.eq(A2(numberOfQuestionsAnswered,
      questions,
      qanswers),
      $List.length(questions));
   });
   var meanScoreColor = F2(function (aqa,
   score) {
      return _U.cmp(score,
      0) > -1 && _U.cmp(score,
      30) < 1 && aqa ? $InnoCheckModel.answerColorRed : _U.cmp(score,
      30) > 0 && _U.cmp(score,
      60) < 0 && aqa ? $InnoCheckModel.answerColorOrange : _U.cmp(score,
      60) > -1 && _U.cmp(score,
      100) < 1 && aqa ? $InnoCheckModel.answerColorGreen : $InnoCheckModel.answerColorEmpty;
   });
   var sumOfScores = function (kscores) {
      return $List.sum($Dict.values(unionToDict(kscores)));
   };
   var meanScore = function (kscores) {
      return function () {
         var topScore = $Maybe.withDefault(0)(A2($Dict.get,
         $Basics.toString($InnoCheckModel.Yes),
         unionToDict($InnoCheckModel.answerScoreList)));
         var totalNumberOfScores = $List.length(kscores);
         return $Basics.round($Basics.toFloat(sumOfScores(kscores)) / $Basics.toFloat(totalNumberOfScores * topScore) * 100);
      }();
   };
   var listQuestionAspectAnswerScore = F2(function (questions,
   kscores) {
      return function () {
         var getAnswerScore = function (q) {
            return {ctor: "_Tuple2"
                   ,_0: q.aspect
                   ,_1: $Maybe.withDefault(0)(A2($Dict.get,
                   q.key,
                   kscores))};
         };
         return A2($List.map,
         getAnswerScore,
         questions);
      }();
   });
   var listQuestionKeyAnswerScore = F2(function (questions,
   kscores) {
      return function () {
         var getAnswerScore = function (q) {
            return {ctor: "_Tuple2"
                   ,_0: q.key
                   ,_1: $Maybe.withDefault(0)(A2($Dict.get,
                   q.key,
                   kscores))};
         };
         return A2($List.map,
         getAnswerScore,
         questions);
      }();
   });
   var listAnswerScore = function (qas) {
      return function () {
         var getAnswerScore = F2(function (key,
         answer) {
            return $Maybe.withDefault(0)(A2($Dict.get,
            $Basics.toString(answer),
            unionToDict($InnoCheckModel.answerScoreList)));
         });
         return A2($Dict.map,
         getAnswerScore,
         qas);
      }();
   };
   var listQuestionKeyAnswerColor = F2(function (questions,
   acolors) {
      return function () {
         var getAnswerColor = function (q) {
            return {ctor: "_Tuple2"
                   ,_0: q.key
                   ,_1: $Maybe.withDefault($InnoCheckModel.answerColorEmpty)(A2($Dict.get,
                   q.key,
                   acolors))};
         };
         return A2($List.map,
         getAnswerColor,
         questions);
      }();
   });
   var listAnswerColor = function (qas) {
      return function () {
         var getAnswerColor = F2(function (key,
         answer) {
            return $Maybe.withDefault($InnoCheckModel.answerColorEmpty)(A2($Dict.get,
            $Basics.toString(answer),
            $InnoCheckModel.answerColorList));
         });
         return A2($Dict.map,
         getAnswerColor,
         qas);
      }();
   };
   var aspectQuestions = F2(function (questions,
   aspect) {
      return A2($List.filter,
      function (q) {
         return _U.eq(q.aspect,
         aspect);
      },
      questions);
   });
   var meanScorePerAspect = function (model) {
      return function () {
         var aspectList = $SelectionList.toList($InnoCheckModel.aspectSelectionList0);
         var answerScores = function (aspect) {
            return A2(listQuestionKeyAnswerScore,
            A2(aspectQuestions,
            model.questions,
            aspect),
            listAnswerScore(model.questionAnswers));
         };
         var meanOfAnswers = function (aspect) {
            return meanScore(answerScores(aspect));
         };
         return A2($List.map,
         function (aspect) {
            return {ctor: "_Tuple2"
                   ,_0: aspect
                   ,_1: meanOfAnswers(aspect)};
         },
         aspectList);
      }();
   };
   var aspectForTip = function (model) {
      return function () {
         var aspectScores = meanScorePerAspect(model);
         var scoreOrange = A2($List.filter,
         function (_v4) {
            return function () {
               switch (_v4.ctor)
               {case "_Tuple2":
                  return _U.cmp(_v4._1,
                    30) > 0 && _U.cmp(_v4._1,
                    60) < 0;}
               _U.badCase($moduleName,
               "on line 167, column 30 to 54");
            }();
         },
         aspectScores);
         var scoreRed = A2($List.filter,
         function (_v8) {
            return function () {
               switch (_v8.ctor)
               {case "_Tuple2":
                  return _U.cmp(_v8._1,
                    0) > -1 && _U.cmp(_v8._1,
                    30) < 1;}
               _U.badCase($moduleName,
               "on line 173, column 30 to 55");
            }();
         },
         aspectScores);
         return _U.cmp($List.length(scoreRed),
         0) > 0 ? $List.head(scoreRed) : _U.cmp($List.length(scoreOrange),
         0) > 0 ? $List.head(scoreOrange) : $Maybe.Nothing;
      }();
   };
   _elm.InnoCheckUtil.values = {_op: _op
                               ,aspectQuestions: aspectQuestions
                               ,listAnswerColor: listAnswerColor
                               ,listQuestionKeyAnswerColor: listQuestionKeyAnswerColor
                               ,listAnswerScore: listAnswerScore
                               ,listQuestionKeyAnswerScore: listQuestionKeyAnswerScore
                               ,listQuestionAspectAnswerScore: listQuestionAspectAnswerScore
                               ,sumOfScores: sumOfScores
                               ,meanScore: meanScore
                               ,meanScoreColor: meanScoreColor
                               ,numberOfQuestionsAnswered: numberOfQuestionsAnswered
                               ,allQuestionsAnswered: allQuestionsAnswered
                               ,meanScorePerAspect: meanScorePerAspect
                               ,aspectForTip: aspectForTip
                               ,unionToDict: unionToDict
                               ,getValue: getValue
                               ,getAspectText: getAspectText
                               ,getAnswerText: getAnswerText};
   return _elm.InnoCheckUtil.values;
};
Elm.InnoCheckView = Elm.InnoCheckView || {};
Elm.InnoCheckView.make = function (_elm) {
   "use strict";
   _elm.InnoCheckView = _elm.InnoCheckView || {};
   if (_elm.InnoCheckView.values)
   return _elm.InnoCheckView.values;
   var _op = {},
   _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   $moduleName = "InnoCheckView",
   $Basics = Elm.Basics.make(_elm),
   $Dict = Elm.Dict.make(_elm),
   $ElmFire = Elm.ElmFire.make(_elm),
   $Html = Elm.Html.make(_elm),
   $Html$Attributes = Elm.Html.Attributes.make(_elm),
   $Html$Events = Elm.Html.Events.make(_elm),
   $InnoCheckBackend = Elm.InnoCheckBackend.make(_elm),
   $InnoCheckModel = Elm.InnoCheckModel.make(_elm),
   $InnoCheckUpdate = Elm.InnoCheckUpdate.make(_elm),
   $InnoCheckUtil = Elm.InnoCheckUtil.make(_elm),
   $InnoCheckViewSvg = Elm.InnoCheckViewSvg.make(_elm),
   $List = Elm.List.make(_elm),
   $Markdown = Elm.Markdown.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Result = Elm.Result.make(_elm),
   $Signal = Elm.Signal.make(_elm),
   $String = Elm.String.make(_elm),
   $Task = Elm.Task.make(_elm);
   var storeIrcData = F2(function (address,
   model) {
      return A2($Task.andThen,
      A2($Task.andThen,
      A2($Signal.send,
      address,
      $InnoCheckUpdate.SendButtonClicked),
      function (_v0) {
         return function () {
            return $Task.toResult($InnoCheckBackend.storeIrcObject(model));
         }();
      }),
      function ($) {
         return $Signal.send(address)($InnoCheckUpdate.HandleBackendResponse($));
      });
   });
   var buttonComp = F3(function (address,
   action,
   buttonText) {
      return A2($Html.button,
      _L.fromArray([$Html$Attributes.type$("button")
                   ,$Html$Attributes.$class("btn btn-primary")
                   ,A2($Html$Events.onClick,
                   address,
                   action)
                   ,$Html$Attributes.disabled(false)]),
      _L.fromArray([$Html.text(buttonText)]));
   });
   var portMessageComp = function (model) {
      return function () {
         var msgComp = function (msg) {
            return A2($Html.div,
            _L.fromArray([$Html$Attributes.$class("portmessage")]),
            _L.fromArray([A2($Html.p,
            _L.fromArray([]),
            _L.fromArray([$Html.text(msg)]))]));
         };
         return $Basics.not(model.isDirty) && (model.sendAttempted && model.sendSuccess) ? msgComp("De gegevens van jouw quickscan zijn opgeslagen. We sturen de praktische template zo snel mogelijk naar je toe. Dank je wel!") : model.sendAttempted && $Basics.not(model.sendSuccess) ? msgComp(A2($Basics._op["++"],
         "Oh, oh... er is iets mis gegaan. Je data is niet opgeslagen. Dit is de technische foutmelding: ",
         model.sendErrorMessage)) : $Html.text("");
      }();
   };
   var aspectTipComp = function (model) {
      return function () {
         var aspect = $Basics.fst($Maybe.withDefault({ctor: "_Tuple2"
                                                     ,_0: $InnoCheckModel.Leadership
                                                     ,_1: 0})($InnoCheckUtil.aspectForTip(model)));
         var msg = $Maybe.withDefault("")(A2($Dict.get,
         $Basics.toString(aspect),
         $InnoCheckModel.aspectTips));
         return A2($Html.div,
         _L.fromArray([$Html$Attributes.$class("well")]),
         _L.fromArray([$Markdown.toHtml(msg)]));
      }();
   };
   var showContactForm = F2(function (address,
   model) {
      return A2($Html.div,
      _L.fromArray([]),
      _L.fromArray([A2($Html.form,
      _L.fromArray([]),
      _L.fromArray([A2($Html.div,
                   _L.fromArray([$Html$Attributes.$class("group-input")]),
                   _L.fromArray([A2($Html.label,
                                _L.fromArray([$Html$Attributes.$for("companyname")]),
                                _L.fromArray([$Html.text("Naam bedrijf")]))
                                ,A2($Html.div,
                                _L.fromArray([]),
                                _L.fromArray([A2($Html.input,
                                _L.fromArray([$Html$Attributes.value(model.person.companyname)
                                             ,$Html$Attributes.type$("text")
                                             ,A3($Html$Events.on,
                                             "input",
                                             $Html$Events.targetValue,
                                             function ($) {
                                                return $Signal.message(address)($InnoCheckUpdate.EditCompanyName($));
                                             })
                                             ,$Html$Attributes.placeholder("Naam bedrijf")
                                             ,$Html$Attributes.id("companyname")]),
                                _L.fromArray([]))]))]))
                   ,A2($Html.div,
                   _L.fromArray([$Html$Attributes.$class("name-input")]),
                   _L.fromArray([A2($Html.label,
                                _L.fromArray([$Html$Attributes.$for("firstname")]),
                                _L.fromArray([$Html.text("Jouw naam")]))
                                ,A2($Html.div,
                                _L.fromArray([]),
                                _L.fromArray([A2($Html.input,
                                _L.fromArray([$Html$Attributes.value(model.person.firstname)
                                             ,$Html$Attributes.type$("text")
                                             ,A3($Html$Events.on,
                                             "input",
                                             $Html$Events.targetValue,
                                             function ($) {
                                                return $Signal.message(address)($InnoCheckUpdate.EditFirstName($));
                                             })
                                             ,$Html$Attributes.placeholder("Voornaam")
                                             ,$Html$Attributes.id("firstname")]),
                                _L.fromArray([]))]))
                                ,A2($Html.label,
                                _L.fromArray([$Html$Attributes.$for("lastname")
                                             ,$Html$Attributes.$class("sr-only")]),
                                _L.fromArray([$Html.text("Achternaam")]))
                                ,A2($Html.div,
                                _L.fromArray([]),
                                _L.fromArray([A2($Html.input,
                                _L.fromArray([$Html$Attributes.value(model.person.lastname)
                                             ,$Html$Attributes.type$("text")
                                             ,A3($Html$Events.on,
                                             "input",
                                             $Html$Events.targetValue,
                                             function ($) {
                                                return $Signal.message(address)($InnoCheckUpdate.EditLastName($));
                                             })
                                             ,$Html$Attributes.placeholder("Achternaam")
                                             ,$Html$Attributes.id("lastname")]),
                                _L.fromArray([]))]))]))
                   ,A2($Html.div,
                   _L.fromArray([$Html$Attributes.$class("group-input")]),
                   _L.fromArray([A2($Html.label,
                                _L.fromArray([$Html$Attributes.$for("emailaddress")]),
                                _L.fromArray([$Html.text("E-mailadres")]))
                                ,A2($Html.div,
                                _L.fromArray([]),
                                _L.fromArray([A2($Html.input,
                                _L.fromArray([$Html$Attributes.value(model.person.email)
                                             ,$Html$Attributes.type$("email")
                                             ,A3($Html$Events.on,
                                             "input",
                                             $Html$Events.targetValue,
                                             function ($) {
                                                return $Signal.message(address)($InnoCheckUpdate.EditEmailAddress($));
                                             })
                                             ,$Html$Attributes.placeholder("E-mailadres")
                                             ,$Html$Attributes.id("emailaddress")]),
                                _L.fromArray([]))]))]))
                   ,A2($Html.div,
                   _L.fromArray([$Html$Attributes.$class("group-button")]),
                   _L.fromArray([A2($Html.label,
                                _L.fromArray([]),
                                _L.fromArray([]))
                                ,A2($Html.div,
                                _L.fromArray([]),
                                _L.fromArray([A2($Html.button,
                                _L.fromArray([$Html$Attributes.type$("button")
                                             ,$Html$Attributes.disabled($Basics.not(model.isDirty))
                                             ,A2($Html$Events.onClick,
                                             $InnoCheckBackend.storeMailbox.address,
                                             A2(storeIrcData,
                                             address,
                                             model))]),
                                _L.fromArray([$Html.text("Stuur template toe")]))]))]))
                   ,portMessageComp(model)]))]));
   });
   var moreInfoTopParagraph = $Markdown.toHtml("\n### Direct aan de slag\n\nGeef je gegevens op en we sturen je een praktische template waarmee je \ndirect aan de slag kan in jouw organisatie. En natuurlijk gaan we netjes \nom met jouw gegevens.\n");
   var recommendationsTopParagraph = $Markdown.toHtml("\n### Advies\n\nOp basis van je antwoorden adviseren we je om aan de volgende \npunten te werken binnen je organisatie.\n");
   var showRecommendations = F2(function (address,
   model) {
      return A2($InnoCheckUtil.allQuestionsAnswered,
      model.questions,
      model.questionAnswers) ? _L.fromArray([A2($Html.section,
                                            _L.fromArray([$Html$Attributes.$class("recommendations")]),
                                            _L.fromArray([recommendationsTopParagraph
                                                         ,aspectTipComp(model)]))
                                            ,A2($Html.section,
                                            _L.fromArray([$Html$Attributes.$class("contact")]),
                                            _L.fromArray([A2($Html.div,
                                            _L.fromArray([$Html$Attributes.$class("row")]),
                                            _L.fromArray([A2($Html.div,
                                                         _L.fromArray([$Html$Attributes.$class("col-sm-8")]),
                                                         _L.fromArray([moreInfoTopParagraph
                                                                      ,A2(showContactForm,
                                                                      address,
                                                                      model)]))
                                                         ,A2($Html.div,
                                                         _L.fromArray([$Html$Attributes.$class("col-sm-4")]),
                                                         _L.fromArray([A2($Html.img,
                                                         _L.fromArray([$Html$Attributes.src("images/template.png")
                                                                      ,$Html$Attributes.width(300)]),
                                                         _L.fromArray([]))]))]))]))]) : _L.fromArray([]);
   });
   var showInputRadios = F4(function (address,
   storedAnswer,
   key,
   answerTextlist) {
      return function () {
         var checkAnswer = F2(function (answer,
         storedAnswer) {
            return function () {
               switch (storedAnswer.ctor)
               {case "Just":
                  return _U.eq(answer,
                    storedAnswer._0);
                  case "Nothing": return false;}
               _U.badCase($moduleName,
               "between lines 156 and 160");
            }();
         });
         var radios = function (_v4) {
            return function () {
               switch (_v4.ctor)
               {case "_Tuple2":
                  return A2($Html.label,
                    _L.fromArray([]),
                    _L.fromArray([A2($Html.input,
                                 _L.fromArray([$Html$Attributes.type$("checkbox")
                                              ,$Html$Attributes.name(A2($Basics._op["++"],
                                              "qa_",
                                              $Basics.toString(key)))
                                              ,$Html$Attributes.value(_v4._1)
                                              ,A3($Html$Events.on,
                                              "change",
                                              $Html$Events.targetChecked,
                                              function (_v8) {
                                                 return function () {
                                                    return A2($Signal.message,
                                                    address,
                                                    A2($InnoCheckUpdate.SelectAnswer,
                                                    key,
                                                    _v4._0));
                                                 }();
                                              })
                                              ,$Html$Attributes.checked(A2(checkAnswer,
                                              _v4._0,
                                              storedAnswer))]),
                                 _L.fromArray([]))
                                 ,$Html.text(_v4._1)]));}
               _U.badCase($moduleName,
               "between lines 162 and 171");
            }();
         };
         return A2($List.map,
         radios,
         answerTextlist);
      }();
   });
   var showQuestions = F4(function (address,
   model,
   questions,
   answerTextlist) {
      return function () {
         var liList = function (q) {
            return A2($Html.li,
            _L.fromArray([]),
            _L.fromArray([A2($Html.p,
                         _L.fromArray([]),
                         _L.fromArray([$Html.text(q.text)]))
                         ,A2($Html.form,
                         _L.fromArray([$Html$Attributes.$class("inputradios")]),
                         _L.fromArray([A2($Html.div,
                         _L.fromArray([]),
                         A4(showInputRadios,
                         address,
                         A2($Dict.get,
                         q.key,
                         model.questionAnswers),
                         q.key,
                         answerTextlist))]))]));
         };
         return A2($List.map,
         liList,
         questions);
      }();
   });
   var showAspectButtons = F2(function (address,
   model) {
      return A2($Html.div,
      _L.fromArray([$Html$Attributes.$class("aspect-questions-buttons")]),
      _L.fromArray([A2($Html.button,
                   _L.fromArray([$Html$Attributes.type$("button")
                                ,$Html$Attributes.$class("btn btn-primary")
                                ,$Html$Attributes.disabled(_U.eq($List.length(model.aspectSelectionList.previous),
                                0))
                                ,A2($Html$Events.onClick,
                                address,
                                $InnoCheckUpdate.PrevAspect)]),
                   _L.fromArray([$Html.text("« Vorige aspect")]))
                   ,$Html.text(" ")
                   ,A2($Html.button,
                   _L.fromArray([$Html$Attributes.type$("button")
                                ,$Html$Attributes.$class("btn btn-primary")
                                ,$Html$Attributes.disabled(_U.eq($List.length(model.aspectSelectionList.next),
                                0) || $Basics.not(A2($InnoCheckUtil.allQuestionsAnswered,
                                A2($InnoCheckUtil.aspectQuestions,
                                model.questions,
                                model.aspectSelectionList.selected),
                                model.questionAnswers)))
                                ,A2($Html$Events.onClick,
                                address,
                                $InnoCheckUpdate.NextAspect)]),
                   _L.fromArray([$Html.text("Volgende aspect »")]))]));
   });
   var questionBlockTopParagraph = $Markdown.toHtml("\n# Innovation Readiness Quickscan\n\nBeantwoord voor elk van de zes aspecten de vragen.\n");
   var showQuestionBlock = F2(function (address,
   model) {
      return A2($Html.section,
      _L.fromArray([]),
      _L.fromArray([questionBlockTopParagraph
                   ,A2($Html.div,
                   _L.fromArray([$Html$Attributes.$class("aspect-questions-block")]),
                   _L.fromArray([A2($Html.h3,
                                _L.fromArray([]),
                                _L.fromArray([$Html.text($InnoCheckUtil.getAspectText(model.aspectSelectionList.selected))]))
                                ,A2($Html.img,
                                _L.fromArray([$Html$Attributes.src(A2($Basics._op["++"],
                                             "images/icon_",
                                             A2($Basics._op["++"],
                                             $String.toLower($Basics.toString(model.aspectSelectionList.selected)),
                                             ".png")))
                                             ,$Html$Attributes.width(40)
                                             ,$Html$Attributes.height(40)]),
                                _L.fromArray([]))]))
                   ,A2($Html.div,
                   _L.fromArray([$Html$Attributes.$class("row aspect-questions-block")]),
                   _L.fromArray([A2($Html.div,
                                _L.fromArray([$Html$Attributes.$class("questions col-sm-6")]),
                                _L.fromArray([A2($Html.ul,
                                             _L.fromArray([]),
                                             A4(showQuestions,
                                             address,
                                             model,
                                             A2($InnoCheckUtil.aspectQuestions,
                                             model.questions,
                                             model.aspectSelectionList.selected),
                                             $InnoCheckModel.answerTextList))
                                             ,A2(showAspectButtons,
                                             address,
                                             model)]))
                                ,A2($Html.div,
                                _L.fromArray([$Html$Attributes.$class("canvas col-sm-6")]),
                                _L.fromArray([A2($InnoCheckViewSvg.showCanvas,
                                address,
                                model)]))]))
                   ,A2($Html.div,
                   _L.fromArray([]),
                   A2(showRecommendations,
                   address,
                   model))]));
   });
   var splashParagraph = $Markdown.toHtml("\n# Innovation Readiness Quickscan\n\n### Inzicht in randvoorwaarden voor innovatie\n\nDe Innovation Readiness Quickscan geeft inzicht in welke cruciale randvoorwaarden \ner ingevuld moeten worden om succesvol nieuwe producten en diensten te kunnen \nontwerpen en lanceren. De randvoorwaarden om te innoveren wordt gescoord op 6 \naspecten:\n\n1. leiderschap\n2. cultuur\n3. processen\n4. resources/middelen\n5. meten\n6. verbeteren\n\nAan de hand van het beantwoorden van vragen wordt de score van de organisatie op elk \nvan deze aspecten bepaald. Je krijgt inzicht op welke aspecten je als organisatie kan \nverbeteren. En na het invullen van de vragen geven we je praktische tips over hoe je \nals organisatie kan verbeteren. \n\n### Achtergrond\n\nDe Innovation Readiness Quickscan is ontwikkeld door [DOON](http://www.doon.nu/home/) in samenwerking met de PDMA/TIM Foundation \nen is gebaseerd op de Innovation Management Standard.\n\nDe Innovation Readiness Quickscan is gebaseerd op het Innovation Readiness Canvas van DOON. \nIn de Quickscan is het aantal vragen sterk teruggebracht. De resultaten geven een \neerste indruk van de innovatiecapaciteit van de organisatie.\n");
   var showSplashScreen = F2(function (address,
   model) {
      return _U.eq(model.splashScreenRead,
      false) ? A2($Html.div,
      _L.fromArray([$Html$Attributes.$class("row splash")]),
      _L.fromArray([A2($Html.section,
                   _L.fromArray([$Html$Attributes.$class("col-sm-6 splashtext")]),
                   _L.fromArray([splashParagraph
                                ,A3(buttonComp,
                                address,
                                $InnoCheckUpdate.SplashRead,
                                "Start de Quickscan »")]))
                   ,A2($Html.div,
                   _L.fromArray([$Html$Attributes.$class("col-sm-6 splashimage")]),
                   _L.fromArray([A2($Html.img,
                   _L.fromArray([$Html$Attributes.src("images/card_irc.png")
                                ,$Html$Attributes.width(400)]),
                   _L.fromArray([]))]))])) : A2(showQuestionBlock,
      address,
      model);
   });
   var view = F2(function (address,
   model) {
      return A2($Html.div,
      _L.fromArray([$Html$Attributes.$class("container")]),
      _L.fromArray([A2(showSplashScreen,
      address,
      model)]));
   });
   _elm.InnoCheckView.values = {_op: _op
                               ,view: view
                               ,showSplashScreen: showSplashScreen
                               ,splashParagraph: splashParagraph
                               ,questionBlockTopParagraph: questionBlockTopParagraph
                               ,showQuestionBlock: showQuestionBlock
                               ,showAspectButtons: showAspectButtons
                               ,showInputRadios: showInputRadios
                               ,showQuestions: showQuestions
                               ,recommendationsTopParagraph: recommendationsTopParagraph
                               ,moreInfoTopParagraph: moreInfoTopParagraph
                               ,showContactForm: showContactForm
                               ,showRecommendations: showRecommendations
                               ,aspectTipComp: aspectTipComp
                               ,portMessageComp: portMessageComp
                               ,buttonComp: buttonComp
                               ,storeIrcData: storeIrcData};
   return _elm.InnoCheckView.values;
};
Elm.InnoCheckViewSvg = Elm.InnoCheckViewSvg || {};
Elm.InnoCheckViewSvg.make = function (_elm) {
   "use strict";
   _elm.InnoCheckViewSvg = _elm.InnoCheckViewSvg || {};
   if (_elm.InnoCheckViewSvg.values)
   return _elm.InnoCheckViewSvg.values;
   var _op = {},
   _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   $moduleName = "InnoCheckViewSvg",
   $Basics = Elm.Basics.make(_elm),
   $Html = Elm.Html.make(_elm),
   $Html$Events = Elm.Html.Events.make(_elm),
   $InnoCheckModel = Elm.InnoCheckModel.make(_elm),
   $InnoCheckUpdate = Elm.InnoCheckUpdate.make(_elm),
   $InnoCheckUtil = Elm.InnoCheckUtil.make(_elm),
   $InnoCheckViewUtil = Elm.InnoCheckViewUtil.make(_elm),
   $List = Elm.List.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Result = Elm.Result.make(_elm),
   $Signal = Elm.Signal.make(_elm),
   $String = Elm.String.make(_elm),
   $Svg = Elm.Svg.make(_elm),
   $Svg$Attributes = Elm.Svg.Attributes.make(_elm);
   var showIcon = F2(function (aspect,
   _v0) {
      return function () {
         switch (_v0.ctor)
         {case "_Tuple2":
            return A2($Svg.image,
              _L.fromArray([$Svg$Attributes.x($Basics.toString(_v0._0))
                           ,$Svg$Attributes.y($Basics.toString(_v0._1))
                           ,$Svg$Attributes.width("80px")
                           ,$Svg$Attributes.height("80px")
                           ,$Svg$Attributes.xlinkHref(A2($Basics._op["++"],
                           "images/icon_",
                           A2($Basics._op["++"],
                           $String.toLower($Basics.toString(aspect)),
                           ".png")))]),
              _L.fromArray([]));}
         _U.badCase($moduleName,
         "between lines 75 and 82");
      }();
   });
   var showColorBlock = F5(function (address,
   model,
   aspect,
   _v4,
   _v5) {
      return function () {
         switch (_v5.ctor)
         {case "_Tuple2":
            return function () {
                 switch (_v4.ctor)
                 {case "_Tuple4":
                    return function () {
                         var aqa = A2($InnoCheckUtil.allQuestionsAnswered,
                         A2($InnoCheckUtil.aspectQuestions,
                         model.questions,
                         aspect),
                         model.questionAnswers);
                         var answerScores = A2($InnoCheckUtil.listQuestionKeyAnswerScore,
                         A2($InnoCheckUtil.aspectQuestions,
                         model.questions,
                         aspect),
                         $InnoCheckUtil.listAnswerScore(model.questionAnswers));
                         var meanOfAnswers = $InnoCheckUtil.meanScore(answerScores);
                         var aspectScoreColor = A2($InnoCheckUtil.meanScoreColor,
                         aqa,
                         meanOfAnswers);
                         return A2($Svg.svg,
                         _L.fromArray([$InnoCheckViewUtil.clickable
                                      ,A2($Html$Events.onClick,
                                      address,
                                      $InnoCheckUpdate.SelectAspect(aspect))]),
                         _L.fromArray([A2($Svg.rect,
                                      _L.fromArray([$Svg$Attributes.fill(aspectScoreColor)
                                                   ,$Svg$Attributes.x($Basics.toString(_v4._0))
                                                   ,$Svg$Attributes.y($Basics.toString(_v4._1))
                                                   ,$Svg$Attributes.width($Basics.toString(_v4._2))
                                                   ,$Svg$Attributes.height($Basics.toString(_v4._3))]),
                                      _L.fromArray([]))
                                      ,A2(showIcon,
                                      aspect,
                                      {ctor: "_Tuple2"
                                      ,_0: _v5._0
                                      ,_1: _v5._1})]));
                      }();}
                 _U.badCase($moduleName,
                 "between lines 46 and 70");
              }();}
         _U.badCase($moduleName,
         "between lines 46 and 70");
      }();
   });
   var showCanvas = F2(function (address,
   model) {
      return function () {
         var canvasScalingFactor = 1;
         var cWidth = $Basics.toString(canvasScalingFactor * 400);
         var cHeight = $Basics.toString(canvasScalingFactor * 282);
         return A2($Svg.svg,
         _L.fromArray([$Svg$Attributes.version("1.1")
                      ,$Svg$Attributes.x("0")
                      ,$Svg$Attributes.y("0")
                      ,$Svg$Attributes.width(cWidth)
                      ,$Svg$Attributes.height(cHeight)
                      ,$Svg$Attributes.viewBox("0 0 400 282")]),
         _L.fromArray([A2($Svg.rect,
                      _L.fromArray([$Svg$Attributes.fill("#DDDDDD")
                                   ,$Svg$Attributes.x("0")
                                   ,$Svg$Attributes.y("0")
                                   ,$Svg$Attributes.width("400")
                                   ,$Svg$Attributes.height("282")]),
                      _L.fromArray([]))
                      ,A5(showColorBlock,
                      address,
                      model,
                      $InnoCheckModel.Leadership,
                      {ctor: "_Tuple4"
                      ,_0: 10
                      ,_1: 10
                      ,_2: 90
                      ,_3: 126},
                      {ctor: "_Tuple2",_0: 15,_1: 30})
                      ,A5(showColorBlock,
                      address,
                      model,
                      $InnoCheckModel.Processes,
                      {ctor: "_Tuple4"
                      ,_0: 110
                      ,_1: 10
                      ,_2: 180
                      ,_3: 126},
                      {ctor: "_Tuple2"
                      ,_0: 160
                      ,_1: 30})
                      ,A5(showColorBlock,
                      address,
                      model,
                      $InnoCheckModel.MeasureAndMonitor,
                      {ctor: "_Tuple4"
                      ,_0: 300
                      ,_1: 10
                      ,_2: 90
                      ,_3: 126},
                      {ctor: "_Tuple2"
                      ,_0: 305
                      ,_1: 30})
                      ,A5(showColorBlock,
                      address,
                      model,
                      $InnoCheckModel.Culture,
                      {ctor: "_Tuple4"
                      ,_0: 10
                      ,_1: 146
                      ,_2: 90
                      ,_3: 126},
                      {ctor: "_Tuple2"
                      ,_0: 15
                      ,_1: 166})
                      ,A5(showColorBlock,
                      address,
                      model,
                      $InnoCheckModel.Resources,
                      {ctor: "_Tuple4"
                      ,_0: 110
                      ,_1: 146
                      ,_2: 180
                      ,_3: 126},
                      {ctor: "_Tuple2"
                      ,_0: 160
                      ,_1: 166})
                      ,A5(showColorBlock,
                      address,
                      model,
                      $InnoCheckModel.Improve,
                      {ctor: "_Tuple4"
                      ,_0: 300
                      ,_1: 146
                      ,_2: 90
                      ,_3: 126},
                      {ctor: "_Tuple2"
                      ,_0: 305
                      ,_1: 166})]));
      }();
   });
   _elm.InnoCheckViewSvg.values = {_op: _op
                                  ,showCanvas: showCanvas
                                  ,showColorBlock: showColorBlock
                                  ,showIcon: showIcon};
   return _elm.InnoCheckViewSvg.values;
};
Elm.InnoCheckViewUtil = Elm.InnoCheckViewUtil || {};
Elm.InnoCheckViewUtil.make = function (_elm) {
   "use strict";
   _elm.InnoCheckViewUtil = _elm.InnoCheckViewUtil || {};
   if (_elm.InnoCheckViewUtil.values)
   return _elm.InnoCheckViewUtil.values;
   var _op = {},
   _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   $moduleName = "InnoCheckViewUtil",
   $Basics = Elm.Basics.make(_elm),
   $Html = Elm.Html.make(_elm),
   $Html$Attributes = Elm.Html.Attributes.make(_elm),
   $List = Elm.List.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Result = Elm.Result.make(_elm),
   $Signal = Elm.Signal.make(_elm);
   var clickable = $Html$Attributes.style(_L.fromArray([{ctor: "_Tuple2"
                                                        ,_0: "cursor"
                                                        ,_1: "pointer"}]));
   _elm.InnoCheckViewUtil.values = {_op: _op
                                   ,clickable: clickable};
   return _elm.InnoCheckViewUtil.values;
};
Elm.Json = Elm.Json || {};
Elm.Json.Decode = Elm.Json.Decode || {};
Elm.Json.Decode.make = function (_elm) {
   "use strict";
   _elm.Json = _elm.Json || {};
   _elm.Json.Decode = _elm.Json.Decode || {};
   if (_elm.Json.Decode.values)
   return _elm.Json.Decode.values;
   var _op = {},
   _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   $moduleName = "Json.Decode",
   $Array = Elm.Array.make(_elm),
   $Dict = Elm.Dict.make(_elm),
   $Json$Encode = Elm.Json.Encode.make(_elm),
   $List = Elm.List.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Native$Json = Elm.Native.Json.make(_elm),
   $Result = Elm.Result.make(_elm);
   var tuple8 = $Native$Json.decodeTuple8;
   var tuple7 = $Native$Json.decodeTuple7;
   var tuple6 = $Native$Json.decodeTuple6;
   var tuple5 = $Native$Json.decodeTuple5;
   var tuple4 = $Native$Json.decodeTuple4;
   var tuple3 = $Native$Json.decodeTuple3;
   var tuple2 = $Native$Json.decodeTuple2;
   var tuple1 = $Native$Json.decodeTuple1;
   var succeed = $Native$Json.succeed;
   var fail = $Native$Json.fail;
   var andThen = $Native$Json.andThen;
   var customDecoder = $Native$Json.customDecoder;
   var decodeValue = $Native$Json.runDecoderValue;
   var value = $Native$Json.decodeValue;
   var maybe = $Native$Json.decodeMaybe;
   var $null = $Native$Json.decodeNull;
   var array = $Native$Json.decodeArray;
   var list = $Native$Json.decodeList;
   var bool = $Native$Json.decodeBool;
   var $int = $Native$Json.decodeInt;
   var $float = $Native$Json.decodeFloat;
   var string = $Native$Json.decodeString;
   var oneOf = $Native$Json.oneOf;
   var keyValuePairs = $Native$Json.decodeKeyValuePairs;
   var object8 = $Native$Json.decodeObject8;
   var object7 = $Native$Json.decodeObject7;
   var object6 = $Native$Json.decodeObject6;
   var object5 = $Native$Json.decodeObject5;
   var object4 = $Native$Json.decodeObject4;
   var object3 = $Native$Json.decodeObject3;
   var object2 = $Native$Json.decodeObject2;
   var object1 = $Native$Json.decodeObject1;
   _op[":="] = $Native$Json.decodeField;
   var at = F2(function (fields,
   decoder) {
      return A3($List.foldr,
      F2(function (x,y) {
         return A2(_op[":="],x,y);
      }),
      decoder,
      fields);
   });
   var decodeString = $Native$Json.runDecoderString;
   var map = $Native$Json.decodeObject1;
   var dict = function (decoder) {
      return A2(map,
      $Dict.fromList,
      keyValuePairs(decoder));
   };
   var Decoder = {ctor: "Decoder"};
   _elm.Json.Decode.values = {_op: _op
                             ,decodeString: decodeString
                             ,decodeValue: decodeValue
                             ,string: string
                             ,$int: $int
                             ,$float: $float
                             ,bool: bool
                             ,$null: $null
                             ,list: list
                             ,array: array
                             ,tuple1: tuple1
                             ,tuple2: tuple2
                             ,tuple3: tuple3
                             ,tuple4: tuple4
                             ,tuple5: tuple5
                             ,tuple6: tuple6
                             ,tuple7: tuple7
                             ,tuple8: tuple8
                             ,at: at
                             ,object1: object1
                             ,object2: object2
                             ,object3: object3
                             ,object4: object4
                             ,object5: object5
                             ,object6: object6
                             ,object7: object7
                             ,object8: object8
                             ,keyValuePairs: keyValuePairs
                             ,dict: dict
                             ,maybe: maybe
                             ,oneOf: oneOf
                             ,map: map
                             ,fail: fail
                             ,succeed: succeed
                             ,andThen: andThen
                             ,value: value
                             ,customDecoder: customDecoder
                             ,Decoder: Decoder};
   return _elm.Json.Decode.values;
};
Elm.Json = Elm.Json || {};
Elm.Json.Encode = Elm.Json.Encode || {};
Elm.Json.Encode.make = function (_elm) {
   "use strict";
   _elm.Json = _elm.Json || {};
   _elm.Json.Encode = _elm.Json.Encode || {};
   if (_elm.Json.Encode.values)
   return _elm.Json.Encode.values;
   var _op = {},
   _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   $moduleName = "Json.Encode",
   $Array = Elm.Array.make(_elm),
   $Native$Json = Elm.Native.Json.make(_elm);
   var list = $Native$Json.encodeList;
   var array = $Native$Json.encodeArray;
   var object = $Native$Json.encodeObject;
   var $null = $Native$Json.encodeNull;
   var bool = $Native$Json.identity;
   var $float = $Native$Json.identity;
   var $int = $Native$Json.identity;
   var string = $Native$Json.identity;
   var encode = $Native$Json.encode;
   var Value = {ctor: "Value"};
   _elm.Json.Encode.values = {_op: _op
                             ,encode: encode
                             ,string: string
                             ,$int: $int
                             ,$float: $float
                             ,bool: bool
                             ,$null: $null
                             ,list: list
                             ,array: array
                             ,object: object
                             ,Value: Value};
   return _elm.Json.Encode.values;
};
Elm.List = Elm.List || {};
Elm.List.make = function (_elm) {
   "use strict";
   _elm.List = _elm.List || {};
   if (_elm.List.values)
   return _elm.List.values;
   var _op = {},
   _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   $moduleName = "List",
   $Basics = Elm.Basics.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Native$List = Elm.Native.List.make(_elm);
   var sortWith = $Native$List.sortWith;
   var sortBy = $Native$List.sortBy;
   var sort = function (xs) {
      return A2(sortBy,
      $Basics.identity,
      xs);
   };
   var repeat = $Native$List.repeat;
   var drop = $Native$List.drop;
   var take = $Native$List.take;
   var map5 = $Native$List.map5;
   var map4 = $Native$List.map4;
   var map3 = $Native$List.map3;
   var map2 = $Native$List.map2;
   var any = $Native$List.any;
   var all = F2(function (pred,
   xs) {
      return $Basics.not(A2(any,
      function ($) {
         return $Basics.not(pred($));
      },
      xs));
   });
   var foldr = $Native$List.foldr;
   var foldl = $Native$List.foldl;
   var length = function (xs) {
      return A3(foldl,
      F2(function (_v0,i) {
         return function () {
            return i + 1;
         }();
      }),
      0,
      xs);
   };
   var sum = function (numbers) {
      return A3(foldl,
      F2(function (x,y) {
         return x + y;
      }),
      0,
      numbers);
   };
   var product = function (numbers) {
      return A3(foldl,
      F2(function (x,y) {
         return x * y;
      }),
      1,
      numbers);
   };
   var maximum = function (list) {
      return function () {
         switch (list.ctor)
         {case "::":
            return $Maybe.Just(A3(foldl,
              $Basics.max,
              list._0,
              list._1));}
         return $Maybe.Nothing;
      }();
   };
   var minimum = function (list) {
      return function () {
         switch (list.ctor)
         {case "::":
            return $Maybe.Just(A3(foldl,
              $Basics.min,
              list._0,
              list._1));}
         return $Maybe.Nothing;
      }();
   };
   var indexedMap = F2(function (f,
   xs) {
      return A3(map2,
      f,
      _L.range(0,length(xs) - 1),
      xs);
   });
   var member = F2(function (x,
   xs) {
      return A2(any,
      function (a) {
         return _U.eq(a,x);
      },
      xs);
   });
   var isEmpty = function (xs) {
      return function () {
         switch (xs.ctor)
         {case "[]": return true;}
         return false;
      }();
   };
   var tail = function (list) {
      return function () {
         switch (list.ctor)
         {case "::":
            return $Maybe.Just(list._1);
            case "[]":
            return $Maybe.Nothing;}
         _U.badCase($moduleName,
         "between lines 87 and 89");
      }();
   };
   var head = function (list) {
      return function () {
         switch (list.ctor)
         {case "::":
            return $Maybe.Just(list._0);
            case "[]":
            return $Maybe.Nothing;}
         _U.badCase($moduleName,
         "between lines 75 and 77");
      }();
   };
   _op["::"] = $Native$List.cons;
   var map = F2(function (f,xs) {
      return A3(foldr,
      F2(function (x,acc) {
         return A2(_op["::"],
         f(x),
         acc);
      }),
      _L.fromArray([]),
      xs);
   });
   var filter = F2(function (pred,
   xs) {
      return function () {
         var conditionalCons = F2(function (x,
         xs$) {
            return pred(x) ? A2(_op["::"],
            x,
            xs$) : xs$;
         });
         return A3(foldr,
         conditionalCons,
         _L.fromArray([]),
         xs);
      }();
   });
   var maybeCons = F3(function (f,
   mx,
   xs) {
      return function () {
         var _v15 = f(mx);
         switch (_v15.ctor)
         {case "Just":
            return A2(_op["::"],_v15._0,xs);
            case "Nothing": return xs;}
         _U.badCase($moduleName,
         "between lines 179 and 181");
      }();
   });
   var filterMap = F2(function (f,
   xs) {
      return A3(foldr,
      maybeCons(f),
      _L.fromArray([]),
      xs);
   });
   var reverse = function (list) {
      return A3(foldl,
      F2(function (x,y) {
         return A2(_op["::"],x,y);
      }),
      _L.fromArray([]),
      list);
   };
   var scanl = F3(function (f,
   b,
   xs) {
      return function () {
         var scan1 = F2(function (x,
         accAcc) {
            return function () {
               switch (accAcc.ctor)
               {case "::": return A2(_op["::"],
                    A2(f,x,accAcc._0),
                    accAcc);
                  case "[]":
                  return _L.fromArray([]);}
               _U.badCase($moduleName,
               "between lines 148 and 151");
            }();
         });
         return reverse(A3(foldl,
         scan1,
         _L.fromArray([b]),
         xs));
      }();
   });
   var append = F2(function (xs,
   ys) {
      return function () {
         switch (ys.ctor)
         {case "[]": return xs;}
         return A3(foldr,
         F2(function (x,y) {
            return A2(_op["::"],x,y);
         }),
         ys,
         xs);
      }();
   });
   var concat = function (lists) {
      return A3(foldr,
      append,
      _L.fromArray([]),
      lists);
   };
   var concatMap = F2(function (f,
   list) {
      return concat(A2(map,
      f,
      list));
   });
   var partition = F2(function (pred,
   list) {
      return function () {
         var step = F2(function (x,
         _v21) {
            return function () {
               switch (_v21.ctor)
               {case "_Tuple2":
                  return pred(x) ? {ctor: "_Tuple2"
                                   ,_0: A2(_op["::"],x,_v21._0)
                                   ,_1: _v21._1} : {ctor: "_Tuple2"
                                                   ,_0: _v21._0
                                                   ,_1: A2(_op["::"],
                                                   x,
                                                   _v21._1)};}
               _U.badCase($moduleName,
               "between lines 301 and 303");
            }();
         });
         return A3(foldr,
         step,
         {ctor: "_Tuple2"
         ,_0: _L.fromArray([])
         ,_1: _L.fromArray([])},
         list);
      }();
   });
   var unzip = function (pairs) {
      return function () {
         var step = F2(function (_v25,
         _v26) {
            return function () {
               switch (_v26.ctor)
               {case "_Tuple2":
                  return function () {
                       switch (_v25.ctor)
                       {case "_Tuple2":
                          return {ctor: "_Tuple2"
                                 ,_0: A2(_op["::"],
                                 _v25._0,
                                 _v26._0)
                                 ,_1: A2(_op["::"],
                                 _v25._1,
                                 _v26._1)};}
                       _U.badCase($moduleName,
                       "on line 339, column 12 to 28");
                    }();}
               _U.badCase($moduleName,
               "on line 339, column 12 to 28");
            }();
         });
         return A3(foldr,
         step,
         {ctor: "_Tuple2"
         ,_0: _L.fromArray([])
         ,_1: _L.fromArray([])},
         pairs);
      }();
   };
   var intersperse = F2(function (sep,
   xs) {
      return function () {
         switch (xs.ctor)
         {case "::": return function () {
                 var step = F2(function (x,
                 rest) {
                    return A2(_op["::"],
                    sep,
                    A2(_op["::"],x,rest));
                 });
                 var spersed = A3(foldr,
                 step,
                 _L.fromArray([]),
                 xs._1);
                 return A2(_op["::"],
                 xs._0,
                 spersed);
              }();
            case "[]":
            return _L.fromArray([]);}
         _U.badCase($moduleName,
         "between lines 350 and 356");
      }();
   });
   _elm.List.values = {_op: _op
                      ,isEmpty: isEmpty
                      ,length: length
                      ,reverse: reverse
                      ,member: member
                      ,head: head
                      ,tail: tail
                      ,filter: filter
                      ,take: take
                      ,drop: drop
                      ,repeat: repeat
                      ,append: append
                      ,concat: concat
                      ,intersperse: intersperse
                      ,partition: partition
                      ,unzip: unzip
                      ,map: map
                      ,map2: map2
                      ,map3: map3
                      ,map4: map4
                      ,map5: map5
                      ,filterMap: filterMap
                      ,concatMap: concatMap
                      ,indexedMap: indexedMap
                      ,foldr: foldr
                      ,foldl: foldl
                      ,sum: sum
                      ,product: product
                      ,maximum: maximum
                      ,minimum: minimum
                      ,all: all
                      ,any: any
                      ,scanl: scanl
                      ,sort: sort
                      ,sortBy: sortBy
                      ,sortWith: sortWith};
   return _elm.List.values;
};
Elm.Markdown = Elm.Markdown || {};
Elm.Markdown.make = function (_elm) {
   "use strict";
   _elm.Markdown = _elm.Markdown || {};
   if (_elm.Markdown.values)
   return _elm.Markdown.values;
   var _op = {},
   _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   $moduleName = "Markdown",
   $Basics = Elm.Basics.make(_elm),
   $Graphics$Element = Elm.Graphics.Element.make(_elm),
   $Html = Elm.Html.make(_elm),
   $List = Elm.List.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Native$Markdown = Elm.Native.Markdown.make(_elm),
   $Result = Elm.Result.make(_elm),
   $Signal = Elm.Signal.make(_elm);
   var toElementWith = $Native$Markdown.toElementWith;
   var toHtmlWith = $Native$Markdown.toHtmlWith;
   var defaultOptions = {_: {}
                        ,githubFlavored: $Maybe.Just({_: {}
                                                     ,breaks: false
                                                     ,tables: false})
                        ,sanitize: false
                        ,smartypants: false};
   var Options = F3(function (a,
   b,
   c) {
      return {_: {}
             ,githubFlavored: a
             ,sanitize: b
             ,smartypants: c};
   });
   var toElement = function (string) {
      return A2($Native$Markdown.toElementWith,
      defaultOptions,
      string);
   };
   var toHtml = function (string) {
      return A2($Native$Markdown.toHtmlWith,
      defaultOptions,
      string);
   };
   _elm.Markdown.values = {_op: _op
                          ,toHtml: toHtml
                          ,toElement: toElement
                          ,Options: Options
                          ,defaultOptions: defaultOptions
                          ,toHtmlWith: toHtmlWith
                          ,toElementWith: toElementWith};
   return _elm.Markdown.values;
};
Elm.Maybe = Elm.Maybe || {};
Elm.Maybe.make = function (_elm) {
   "use strict";
   _elm.Maybe = _elm.Maybe || {};
   if (_elm.Maybe.values)
   return _elm.Maybe.values;
   var _op = {},
   _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   $moduleName = "Maybe";
   var withDefault = F2(function ($default,
   maybe) {
      return function () {
         switch (maybe.ctor)
         {case "Just": return maybe._0;
            case "Nothing":
            return $default;}
         _U.badCase($moduleName,
         "between lines 45 and 47");
      }();
   });
   var Nothing = {ctor: "Nothing"};
   var oneOf = function (maybes) {
      return function () {
         switch (maybes.ctor)
         {case "::": return function () {
                 switch (maybes._0.ctor)
                 {case "Just": return maybes._0;
                    case "Nothing":
                    return oneOf(maybes._1);}
                 _U.badCase($moduleName,
                 "between lines 64 and 66");
              }();
            case "[]": return Nothing;}
         _U.badCase($moduleName,
         "between lines 59 and 66");
      }();
   };
   var andThen = F2(function (maybeValue,
   callback) {
      return function () {
         switch (maybeValue.ctor)
         {case "Just":
            return callback(maybeValue._0);
            case "Nothing": return Nothing;}
         _U.badCase($moduleName,
         "between lines 110 and 112");
      }();
   });
   var Just = function (a) {
      return {ctor: "Just",_0: a};
   };
   var map = F2(function (f,
   maybe) {
      return function () {
         switch (maybe.ctor)
         {case "Just":
            return Just(f(maybe._0));
            case "Nothing": return Nothing;}
         _U.badCase($moduleName,
         "between lines 76 and 78");
      }();
   });
   _elm.Maybe.values = {_op: _op
                       ,andThen: andThen
                       ,map: map
                       ,withDefault: withDefault
                       ,oneOf: oneOf
                       ,Just: Just
                       ,Nothing: Nothing};
   return _elm.Maybe.values;
};
Elm.Native.Array = {};
Elm.Native.Array.make = function(localRuntime) {

	localRuntime.Native = localRuntime.Native || {};
	localRuntime.Native.Array = localRuntime.Native.Array || {};
	if (localRuntime.Native.Array.values)
	{
		return localRuntime.Native.Array.values;
	}
	if ('values' in Elm.Native.Array)
	{
		return localRuntime.Native.Array.values = Elm.Native.Array.values;
	}

	var List = Elm.Native.List.make(localRuntime);

	// A RRB-Tree has two distinct data types.
	// Leaf -> "height"  is always 0
	//         "table"   is an array of elements
	// Node -> "height"  is always greater than 0
	//         "table"   is an array of child nodes
	//         "lengths" is an array of accumulated lengths of the child nodes

	// M is the maximal table size. 32 seems fast. E is the allowed increase
	// of search steps when concatting to find an index. Lower values will
	// decrease balancing, but will increase search steps.
	var M = 32;
	var E = 2;

	// An empty array.
	var empty = {
		ctor: "_Array",
		height: 0,
		table: new Array()
	};


	function get(i, array)
	{
		if (i < 0 || i >= length(array))
		{
			throw new Error(
				"Index " + i + " is out of range. Check the length of " +
				"your array first or use getMaybe or getWithDefault.");
		}
		return unsafeGet(i, array);
	}


	function unsafeGet(i, array)
	{
		for (var x = array.height; x > 0; x--)
		{
			var slot = i >> (x * 5);
			while (array.lengths[slot] <= i)
			{
				slot++;
			}
			if (slot > 0)
			{
				i -= array.lengths[slot - 1];
			}
			array = array.table[slot];
		}
		return array.table[i];
	}


	// Sets the value at the index i. Only the nodes leading to i will get
	// copied and updated.
	function set(i, item, array)
	{
		if (i < 0 || length(array) <= i)
		{
			return array;
		}
		return unsafeSet(i, item, array);
	}


	function unsafeSet(i, item, array)
	{
		array = nodeCopy(array);

		if (array.height == 0)
		{
			array.table[i] = item;
		}
		else
		{
			var slot = getSlot(i, array);
			if (slot > 0)
			{
				i -= array.lengths[slot - 1];
			}
			array.table[slot] = unsafeSet(i, item, array.table[slot]);
		}
		return array;
	}


	function initialize(len, f)
	{
		if (len == 0)
		{
			return empty;
		}
		var h = Math.floor( Math.log(len) / Math.log(M) );
		return initialize_(f, h, 0, len);
	}

	function initialize_(f, h, from, to)
	{
		if (h == 0)
		{
			var table = new Array((to - from) % (M + 1));
			for (var i = 0; i < table.length; i++)
			{
			  table[i] = f(from + i);
			}
			return {
				ctor: "_Array",
				height: 0,
				table: table
			};
		}

		var step = Math.pow(M, h);
		var table = new Array(Math.ceil((to - from) / step));
		var lengths = new Array(table.length);
		for (var i = 0; i < table.length; i++)
		{
			table[i] = initialize_(f, h - 1, from + (i * step), Math.min(from + ((i + 1) * step), to));
			lengths[i] = length(table[i]) + (i > 0 ? lengths[i-1] : 0);
		}
		return {
			ctor: "_Array",
			height: h,
			table: table,
			lengths: lengths
		};
	}

	function fromList(list)
	{
		if (list == List.Nil)
		{
			return empty;
		}

		// Allocate M sized blocks (table) and write list elements to it.
		var table = new Array(M);
		var nodes = new Array();
		var i = 0;

		while (list.ctor !== '[]')
		{
			table[i] = list._0;
			list = list._1;
			i++;

			// table is full, so we can push a leaf containing it into the
			// next node.
			if (i == M)
			{
				var leaf = {
					ctor: "_Array",
					height: 0,
					table: table
				};
				fromListPush(leaf, nodes);
				table = new Array(M);
				i = 0;
			}
		}

		// Maybe there is something left on the table.
		if (i > 0)
		{
			var leaf = {
				ctor: "_Array",
				height: 0,
				table: table.splice(0,i)
			};
			fromListPush(leaf, nodes);
		}

		// Go through all of the nodes and eventually push them into higher nodes.
		for (var h = 0; h < nodes.length - 1; h++)
		{
			if (nodes[h].table.length > 0)
			{
				fromListPush(nodes[h], nodes);
			}
		}

		var head = nodes[nodes.length - 1];
		if (head.height > 0 && head.table.length == 1)
		{
			return head.table[0];
		}
		else
		{
			return head;
		}
	}

	// Push a node into a higher node as a child.
	function fromListPush(toPush, nodes)
	{
		var h = toPush.height;

		// Maybe the node on this height does not exist.
		if (nodes.length == h)
		{
			var node = {
				ctor: "_Array",
				height: h + 1,
				table: new Array(),
				lengths: new Array()
			};
			nodes.push(node);
		}

		nodes[h].table.push(toPush);
		var len = length(toPush);
		if (nodes[h].lengths.length > 0)
		{
			len += nodes[h].lengths[nodes[h].lengths.length - 1];
		}
		nodes[h].lengths.push(len);

		if (nodes[h].table.length == M)
		{
			fromListPush(nodes[h], nodes);
			nodes[h] = {
				ctor: "_Array",
				height: h + 1,
				table: new Array(),
				lengths: new Array()
			};
		}
	}

	// Pushes an item via push_ to the bottom right of a tree.
	function push(item, a)
	{
		var pushed = push_(item, a);
		if (pushed !== null)
		{
			return pushed;
		}

		var newTree = create(item, a.height);
		return siblise(a, newTree);
	}

	// Recursively tries to push an item to the bottom-right most
	// tree possible. If there is no space left for the item,
	// null will be returned.
	function push_(item, a)
	{
		// Handle resursion stop at leaf level.
		if (a.height == 0)
		{
			if (a.table.length < M)
			{
				var newA = {
					ctor: "_Array",
					height: 0,
					table: a.table.slice()
				};
				newA.table.push(item);
				return newA;
			}
			else
			{
			  return null;
			}
		}

		// Recursively push
		var pushed = push_(item, botRight(a));

		// There was space in the bottom right tree, so the slot will
		// be updated.
		if (pushed != null)
		{
			var newA = nodeCopy(a);
			newA.table[newA.table.length - 1] = pushed;
			newA.lengths[newA.lengths.length - 1]++;
			return newA;
		}

		// When there was no space left, check if there is space left
		// for a new slot with a tree which contains only the item
		// at the bottom.
		if (a.table.length < M)
		{
			var newSlot = create(item, a.height - 1);
			var newA = nodeCopy(a);
			newA.table.push(newSlot);
			newA.lengths.push(newA.lengths[newA.lengths.length - 1] + length(newSlot));
			return newA;
		}
		else
		{
			return null;
		}
	}

	// Converts an array into a list of elements.
	function toList(a)
	{
		return toList_(List.Nil, a);
	}

	function toList_(list, a)
	{
		for (var i = a.table.length - 1; i >= 0; i--)
		{
			list =
				a.height == 0
					? List.Cons(a.table[i], list)
					: toList_(list, a.table[i]);
		}
		return list;
	}

	// Maps a function over the elements of an array.
	function map(f, a)
	{
		var newA = {
			ctor: "_Array",
			height: a.height,
			table: new Array(a.table.length)
		};
		if (a.height > 0)
		{
			newA.lengths = a.lengths;
		}
		for (var i = 0; i < a.table.length; i++)
		{
			newA.table[i] =
				a.height == 0
					? f(a.table[i])
					: map(f, a.table[i]);
		}
		return newA;
	}

	// Maps a function over the elements with their index as first argument.
	function indexedMap(f, a)
	{
		return indexedMap_(f, a, 0);
	}

	function indexedMap_(f, a, from)
	{
		var newA = {
			ctor: "_Array",
			height: a.height,
			table: new Array(a.table.length)
		};
		if (a.height > 0)
		{
			newA.lengths = a.lengths;
		}
		for (var i = 0; i < a.table.length; i++)
		{
			newA.table[i] =
				a.height == 0
					? A2(f, from + i, a.table[i])
					: indexedMap_(f, a.table[i], i == 0 ? 0 : a.lengths[i - 1]);
		}
		return newA;
	}

	function foldl(f, b, a)
	{
		if (a.height == 0)
		{
			for (var i = 0; i < a.table.length; i++)
			{
				b = A2(f, a.table[i], b);
			}
		}
		else
		{
			for (var i = 0; i < a.table.length; i++)
			{
				b = foldl(f, b, a.table[i]);
			}
		}
		return b;
	}

	function foldr(f, b, a)
	{
		if (a.height == 0)
		{
			for (var i = a.table.length; i--; )
			{
				b = A2(f, a.table[i], b);
			}
		}
		else
		{
			for (var i = a.table.length; i--; )
			{
				b = foldr(f, b, a.table[i]);
			}
		}
		return b;
	}

	// TODO: currently, it slices the right, then the left. This can be
	// optimized.
	function slice(from, to, a)
	{
		if (from < 0)
		{
			from += length(a);
		}
		if (to < 0)
		{
			to += length(a);
		}
		return sliceLeft(from, sliceRight(to, a));
	}

	function sliceRight(to, a)
	{
		if (to == length(a))
		{
			return a;
		}

		// Handle leaf level.
		if (a.height == 0)
		{
			var newA = { ctor:"_Array", height:0 };
			newA.table = a.table.slice(0, to);
			return newA;
		}

		// Slice the right recursively.
		var right = getSlot(to, a);
		var sliced = sliceRight(to - (right > 0 ? a.lengths[right - 1] : 0), a.table[right]);

		// Maybe the a node is not even needed, as sliced contains the whole slice.
		if (right == 0)
		{
			return sliced;
		}

		// Create new node.
		var newA = {
			ctor: "_Array",
			height: a.height,
			table: a.table.slice(0, right),
			lengths: a.lengths.slice(0, right)
		};
		if (sliced.table.length > 0)
		{
			newA.table[right] = sliced;
			newA.lengths[right] = length(sliced) + (right > 0 ? newA.lengths[right - 1] : 0);
		}
		return newA;
	}

	function sliceLeft(from, a)
	{
		if (from == 0)
		{
			return a;
		}

		// Handle leaf level.
		if (a.height == 0)
		{
			var newA = { ctor:"_Array", height:0 };
			newA.table = a.table.slice(from, a.table.length + 1);
			return newA;
		}

		// Slice the left recursively.
		var left = getSlot(from, a);
		var sliced = sliceLeft(from - (left > 0 ? a.lengths[left - 1] : 0), a.table[left]);

		// Maybe the a node is not even needed, as sliced contains the whole slice.
		if (left == a.table.length - 1)
		{
			return sliced;
		}

		// Create new node.
		var newA = {
			ctor: "_Array",
			height: a.height,
			table: a.table.slice(left, a.table.length + 1),
			lengths: new Array(a.table.length - left)
		};
		newA.table[0] = sliced;
		var len = 0;
		for (var i = 0; i < newA.table.length; i++)
		{
			len += length(newA.table[i]);
			newA.lengths[i] = len;
		}

		return newA;
	}

	// Appends two trees.
	function append(a,b)
	{
		if (a.table.length === 0)
		{
			return b;
		}
		if (b.table.length === 0)
		{
			return a;
		}

		var c = append_(a, b);

		// Check if both nodes can be crunshed together.
		if (c[0].table.length + c[1].table.length <= M)
		{
			if (c[0].table.length === 0)
			{
				return c[1];
			}
			if (c[1].table.length === 0)
			{
				return c[0];
			}

			// Adjust .table and .lengths
			c[0].table = c[0].table.concat(c[1].table);
			if (c[0].height > 0)
			{
				var len = length(c[0]);
				for (var i = 0; i < c[1].lengths.length; i++)
				{
					c[1].lengths[i] += len;
				}
				c[0].lengths = c[0].lengths.concat(c[1].lengths);
			}

			return c[0];
		}

		if (c[0].height > 0)
		{
			var toRemove = calcToRemove(a, b);
			if (toRemove > E)
			{
				c = shuffle(c[0], c[1], toRemove);
			}
		}

		return siblise(c[0], c[1]);
	}

	// Returns an array of two nodes; right and left. One node _may_ be empty.
	function append_(a, b)
	{
		if (a.height === 0 && b.height === 0)
		{
			return [a, b];
		}

		if (a.height !== 1 || b.height !== 1)
		{
			if (a.height === b.height)
			{
				a = nodeCopy(a);
				b = nodeCopy(b);
				var appended = append_(botRight(a), botLeft(b));

				insertRight(a, appended[1]);
				insertLeft(b, appended[0]);
			}
			else if (a.height > b.height)
			{
				a = nodeCopy(a);
				var appended = append_(botRight(a), b);

				insertRight(a, appended[0]);
				b = parentise(appended[1], appended[1].height + 1);
			}
			else
			{
				b = nodeCopy(b);
				var appended = append_(a, botLeft(b));

				var left = appended[0].table.length === 0 ? 0 : 1;
				var right = left === 0 ? 1 : 0;
				insertLeft(b, appended[left]);
				a = parentise(appended[right], appended[right].height + 1);
			}
		}

		// Check if balancing is needed and return based on that.
		if (a.table.length === 0 || b.table.length === 0)
		{
			return [a,b];
		}

		var toRemove = calcToRemove(a, b);
		if (toRemove <= E)
		{
			return [a,b];
		}
		return shuffle(a, b, toRemove);
	}

	// Helperfunctions for append_. Replaces a child node at the side of the parent.
	function insertRight(parent, node)
	{
		var index = parent.table.length - 1;
		parent.table[index] = node;
		parent.lengths[index] = length(node)
		parent.lengths[index] += index > 0 ? parent.lengths[index - 1] : 0;
	}

	function insertLeft(parent, node)
	{
		if (node.table.length > 0)
		{
			parent.table[0] = node;
			parent.lengths[0] = length(node);

			var len = length(parent.table[0]);
			for (var i = 1; i < parent.lengths.length; i++)
			{
				len += length(parent.table[i]);
				parent.lengths[i] = len;
			}
		}
		else
		{
			parent.table.shift();
			for (var i = 1; i < parent.lengths.length; i++)
			{
				parent.lengths[i] = parent.lengths[i] - parent.lengths[0];
			}
			parent.lengths.shift();
		}
	}

	// Returns the extra search steps for E. Refer to the paper.
	function calcToRemove(a, b)
	{
		var subLengths = 0;
		for (var i = 0; i < a.table.length; i++)
		{
			subLengths += a.table[i].table.length;
		}
		for (var i = 0; i < b.table.length; i++)
		{
			subLengths += b.table[i].table.length;
		}

		var toRemove = a.table.length + b.table.length
		return toRemove - (Math.floor((subLengths - 1) / M) + 1);
	}

	// get2, set2 and saveSlot are helpers for accessing elements over two arrays.
	function get2(a, b, index)
	{
		return index < a.length
			? a[index]
			: b[index - a.length];
	}

	function set2(a, b, index, value)
	{
		if (index < a.length)
		{
			a[index] = value;
		}
		else
		{
			b[index - a.length] = value;
		}
	}

	function saveSlot(a, b, index, slot)
	{
		set2(a.table, b.table, index, slot);

		var l = (index == 0 || index == a.lengths.length)
			? 0
			: get2(a.lengths, a.lengths, index - 1);

		set2(a.lengths, b.lengths, index, l + length(slot));
	}

	// Creates a node or leaf with a given length at their arrays for perfomance.
	// Is only used by shuffle.
	function createNode(h, length)
	{
		if (length < 0)
		{
			length = 0;
		}
		var a = {
			ctor: "_Array",
			height: h,
			table: new Array(length)
		};
		if (h > 0)
		{
			a.lengths = new Array(length);
		}
		return a;
	}

	// Returns an array of two balanced nodes.
	function shuffle(a, b, toRemove)
	{
		var newA = createNode(a.height, Math.min(M, a.table.length + b.table.length - toRemove));
		var newB = createNode(a.height, newA.table.length - (a.table.length + b.table.length - toRemove));

		// Skip the slots with size M. More precise: copy the slot references
		// to the new node
		var read = 0;
		while (get2(a.table, b.table, read).table.length % M == 0)
		{
			set2(newA.table, newB.table, read, get2(a.table, b.table, read));
			set2(newA.lengths, newB.lengths, read, get2(a.lengths, b.lengths, read));
			read++;
		}

		// Pulling items from left to right, caching in a slot before writing
		// it into the new nodes.
		var write = read;
		var slot = new createNode(a.height - 1, 0);
		var from = 0;

		// If the current slot is still containing data, then there will be at
		// least one more write, so we do not break this loop yet.
		while (read - write - (slot.table.length > 0 ? 1 : 0) < toRemove)
		{
			// Find out the max possible items for copying.
			var source = get2(a.table, b.table, read);
			var to = Math.min(M - slot.table.length, source.table.length)

			// Copy and adjust size table.
			slot.table = slot.table.concat(source.table.slice(from, to));
			if (slot.height > 0)
			{
				var len = slot.lengths.length;
				for (var i = len; i < len + to - from; i++)
				{
					slot.lengths[i] = length(slot.table[i]);
					slot.lengths[i] += (i > 0 ? slot.lengths[i - 1] : 0);
				}
			}

			from += to;

			// Only proceed to next slots[i] if the current one was
			// fully copied.
			if (source.table.length <= to)
			{
				read++; from = 0;
			}

			// Only create a new slot if the current one is filled up.
			if (slot.table.length == M)
			{
				saveSlot(newA, newB, write, slot);
				slot = createNode(a.height - 1,0);
				write++;
			}
		}

		// Cleanup after the loop. Copy the last slot into the new nodes.
		if (slot.table.length > 0)
		{
			saveSlot(newA, newB, write, slot);
			write++;
		}

		// Shift the untouched slots to the left
		while (read < a.table.length + b.table.length )
		{
			saveSlot(newA, newB, write, get2(a.table, b.table, read));
			read++;
			write++;
		}

		return [newA, newB];
	}

	// Navigation functions
	function botRight(a)
	{
		return a.table[a.table.length - 1];
	}
	function botLeft(a)
	{
		return a.table[0];
	}

	// Copies a node for updating. Note that you should not use this if
	// only updating only one of "table" or "lengths" for performance reasons.
	function nodeCopy(a)
	{
		var newA = {
			ctor: "_Array",
			height: a.height,
			table: a.table.slice()
		};
		if (a.height > 0)
		{
			newA.lengths = a.lengths.slice();
		}
		return newA;
	}

	// Returns how many items are in the tree.
	function length(array)
	{
		if (array.height == 0)
		{
			return array.table.length;
		}
		else
		{
			return array.lengths[array.lengths.length - 1];
		}
	}

	// Calculates in which slot of "table" the item probably is, then
	// find the exact slot via forward searching in  "lengths". Returns the index.
	function getSlot(i, a)
	{
		var slot = i >> (5 * a.height);
		while (a.lengths[slot] <= i)
		{
			slot++;
		}
		return slot;
	}

	// Recursively creates a tree with a given height containing
	// only the given item.
	function create(item, h)
	{
		if (h == 0)
		{
			return {
				ctor: "_Array",
				height: 0,
				table: [item]
			};
		}
		return {
			ctor: "_Array",
			height: h,
			table: [create(item, h - 1)],
			lengths: [1]
		};
	}

	// Recursively creates a tree that contains the given tree.
	function parentise(tree, h)
	{
		if (h == tree.height)
		{
			return tree;
		}

		return {
			ctor: "_Array",
			height: h,
			table: [parentise(tree, h - 1)],
			lengths: [length(tree)]
		};
	}

	// Emphasizes blood brotherhood beneath two trees.
	function siblise(a, b)
	{
		return {
			ctor: "_Array",
			height: a.height + 1,
			table: [a, b],
			lengths: [length(a), length(a) + length(b)]
		};
	}

	function toJSArray(a)
	{
		var jsArray = new Array(length(a));
		toJSArray_(jsArray, 0, a);
		return jsArray;
	}

	function toJSArray_(jsArray, i, a)
	{
		for (var t = 0; t < a.table.length; t++)
		{
			if (a.height == 0)
			{
				jsArray[i + t] = a.table[t];
			}
			else
			{
				var inc = t == 0 ? 0 : a.lengths[t - 1];
				toJSArray_(jsArray, i + inc, a.table[t]);
			}
		}
	}

	function fromJSArray(jsArray)
	{
		if (jsArray.length == 0)
		{
			return empty;
		}
		var h = Math.floor(Math.log(jsArray.length) / Math.log(M));
		return fromJSArray_(jsArray, h, 0, jsArray.length);
	}

	function fromJSArray_(jsArray, h, from, to)
	{
		if (h == 0)
		{
			return {
				ctor: "_Array",
				height: 0,
				table: jsArray.slice(from, to)
			};
		}

		var step = Math.pow(M, h);
		var table = new Array(Math.ceil((to - from) / step));
		var lengths = new Array(table.length);
		for (var i = 0; i < table.length; i++)
		{
			table[i] = fromJSArray_(jsArray, h - 1, from + (i * step), Math.min(from + ((i + 1) * step), to));
			lengths[i] = length(table[i]) + (i > 0 ? lengths[i-1] : 0);
		}
		return {
			ctor: "_Array",
			height: h,
			table: table,
			lengths: lengths
		};
	}

	Elm.Native.Array.values = {
		empty: empty,
		fromList: fromList,
		toList: toList,
		initialize: F2(initialize),
		append: F2(append),
		push: F2(push),
		slice: F3(slice),
		get: F2(get),
		set: F3(set),
		map: F2(map),
		indexedMap: F2(indexedMap),
		foldl: F3(foldl),
		foldr: F3(foldr),
		length: length,

		toJSArray:toJSArray,
		fromJSArray:fromJSArray
	};

	return localRuntime.Native.Array.values = Elm.Native.Array.values;

}

Elm.Native.Basics = {};
Elm.Native.Basics.make = function(localRuntime) {

	localRuntime.Native = localRuntime.Native || {};
	localRuntime.Native.Basics = localRuntime.Native.Basics || {};
	if (localRuntime.Native.Basics.values)
	{
		return localRuntime.Native.Basics.values;
	}

	var Utils = Elm.Native.Utils.make(localRuntime);

	function div(a, b)
	{
		return (a/b)|0;
	}
	function rem(a, b)
	{
		return a % b;
	}
	function mod(a, b)
	{
		if (b === 0)
		{
			throw new Error("Cannot perform mod 0. Division by zero error.");
		}
		var r = a % b;
		var m = a === 0 ? 0 : (b > 0 ? (a >= 0 ? r : r+b) : -mod(-a,-b));

		return m === b ? 0 : m;
	}
	function logBase(base, n)
	{
		return Math.log(n) / Math.log(base);
	}
	function negate(n)
	{
		return -n;
	}
	function abs(n)
	{
		return n < 0 ? -n : n;
	}

	function min(a, b)
	{
		return Utils.cmp(a,b) < 0 ? a : b;
	}
	function max(a, b)
	{
		return Utils.cmp(a,b) > 0 ? a : b;
	}
	function clamp(lo, hi, n)
	{
		return Utils.cmp(n,lo) < 0 ? lo : Utils.cmp(n,hi) > 0 ? hi : n;
	}

	function xor(a, b)
	{
		return a !== b;
	}
	function not(b)
	{
		return !b;
	}
	function isInfinite(n)
	{
		return n === Infinity || n === -Infinity
	}

	function truncate(n)
	{
		return n|0;
	}

	function degrees(d)
	{
		return d * Math.PI / 180;
	}
	function turns(t)
	{
		return 2 * Math.PI * t;
	}
	function fromPolar(point)
	{
		var r = point._0;
		var t = point._1;
		return Utils.Tuple2(r * Math.cos(t), r * Math.sin(t));
	}
	function toPolar(point)
	{
		var x = point._0;
		var y = point._1;
		return Utils.Tuple2(Math.sqrt(x * x + y * y), Math.atan2(y,x));
	}

	return localRuntime.Native.Basics.values = {
		div: F2(div),
		rem: F2(rem),
		mod: F2(mod),

		pi: Math.PI,
		e: Math.E,
		cos: Math.cos,
		sin: Math.sin,
		tan: Math.tan,
		acos: Math.acos,
		asin: Math.asin,
		atan: Math.atan,
		atan2: F2(Math.atan2),

		degrees:  degrees,
		turns:  turns,
		fromPolar:  fromPolar,
		toPolar:  toPolar,

		sqrt: Math.sqrt,
		logBase: F2(logBase),
		negate: negate,
		abs: abs,
		min: F2(min),
		max: F2(max),
		clamp: F3(clamp),
		compare: Utils.compare,

		xor: F2(xor),
		not: not,

		truncate: truncate,
		ceiling: Math.ceil,
		floor: Math.floor,
		round: Math.round,
		toFloat: function(x) { return x; },
		isNaN: isNaN,
		isInfinite: isInfinite
	};
};

Elm.Native.Char = {};
Elm.Native.Char.make = function(localRuntime) {
	localRuntime.Native = localRuntime.Native || {};
	localRuntime.Native.Char = localRuntime.Native.Char || {};
	if (localRuntime.Native.Char.values)
	{
		return localRuntime.Native.Char.values;
	}

	var Utils = Elm.Native.Utils.make(localRuntime);

	return localRuntime.Native.Char.values = {
		fromCode : function(c) { return Utils.chr(String.fromCharCode(c)); },
		toCode   : function(c) { return c.charCodeAt(0); },
		toUpper  : function(c) { return Utils.chr(c.toUpperCase()); },
		toLower  : function(c) { return Utils.chr(c.toLowerCase()); },
		toLocaleUpper : function(c) { return Utils.chr(c.toLocaleUpperCase()); },
		toLocaleLower : function(c) { return Utils.chr(c.toLocaleLowerCase()); },
	};
};

Elm.Native.Color = {};
Elm.Native.Color.make = function(localRuntime) {
	localRuntime.Native = localRuntime.Native || {};
	localRuntime.Native.Color = localRuntime.Native.Color || {};
	if (localRuntime.Native.Color.values)
	{
		return localRuntime.Native.Color.values;
	}

	function toCss(c)
	{
		var format = '';
		var colors = '';
		if (c.ctor === 'RGBA')
		{
			format = 'rgb';
			colors = c._0 + ', ' + c._1 + ', ' + c._2;
		}
		else
		{
			format = 'hsl';
			colors = (c._0 * 180 / Math.PI) + ', ' +
					 (c._1 * 100) + '%, ' +
					 (c._2 * 100) + '%';
		}
		if (c._3 === 1)
		{
			return format + '(' + colors + ')';
		}
		else
		{
			return format + 'a(' + colors + ', ' + c._3 + ')';
		}
	}

	return localRuntime.Native.Color.values = {
		toCss: toCss
	};

};

Elm.Native.Debug = {};
Elm.Native.Debug.make = function(localRuntime) {
	localRuntime.Native = localRuntime.Native || {};
	localRuntime.Native.Debug = localRuntime.Native.Debug || {};
	if (localRuntime.Native.Debug.values)
	{
		return localRuntime.Native.Debug.values;
	}

	var toString = Elm.Native.Show.make(localRuntime).toString;

	function log(tag, value)
	{
		var msg = tag + ': ' + toString(value);
		var process = process || {};
		if (process.stdout)
		{
			process.stdout.write(msg);
		}
		else
		{
			console.log(msg);
		}
		return value;
	}

	function crash(message)
	{
		throw new Error(message);
	}

	function tracePath(tag, form)
	{
		if (localRuntime.debug)
		{
			return localRuntime.debug.trace(tag, form);
		}
		return form;
	}

	function watch(tag, value)
	{
		if (localRuntime.debug)
		{
			localRuntime.debug.watch(tag, value);
		}
		return value;
	}

	function watchSummary(tag, summarize, value)
	{
		if (localRuntime.debug)
		{
			localRuntime.debug.watch(tag, summarize(value));
		}
		return value;
	}

	return localRuntime.Native.Debug.values = {
		crash: crash,
		tracePath: F2(tracePath),
		log: F2(log),
		watch: F2(watch),
		watchSummary:F3(watchSummary),
	};
};

/* @flow */
/* global Elm, Firebase, F2, F3, F4 */

Elm.Native.ElmFire = {};
Elm.Native.ElmFire.make = function (localRuntime) {
  "use strict";

  localRuntime.Native = localRuntime.Native || {};
  localRuntime.Native.ElmFire = localRuntime.Native.ElmFire || {};
  if (localRuntime.Native.ElmFire.values) {
    return localRuntime.Native.ElmFire.values;
  }

  var Utils = Elm.Native.Utils.make (localRuntime);
  var Task = Elm.Native.Task.make (localRuntime);
  var List = Elm.Native.List.make (localRuntime);

  var pleaseReportThis = ' Should not happen, please report this as a bug in ElmFire!';

  function asMaybe (value) {
    if (typeof value === 'undefined' || value === null) {
      return { ctor: 'Nothing' };
    } else {
      return { ctor: 'Just', _0: value };
    }
  }

  function fromMaybe (maybe) {
    return maybe.ctor === 'Nothing' ? null : maybe._0;
  }

  function priority2fb (elmPriority) {
    return elmPriority.ctor === 'NoPriority' ? null : elmPriority._0;
  }

  function priority2elm (fbPriority) {
    switch (Object.prototype.toString.call (fbPriority)) {
      case '[object Number]':
        return {ctor: 'NumberPriority', _0: fbPriority};
      case '[object String]':
        return {ctor: 'StringPriority', _0: fbPriority};
      default:
        return {ctor: 'NoPriority'};
    }
  }

  function error2elm (tag, description) {
    return {
      _: {},
      tag: { ctor: tag },
      description: description
    };
  }

  var fbErrorMap = {
    PERMISSION_DENIED: 'PermissionError',
    UNAVAILABLE: 'UnavailableError',
    TOO_BIG: 'TooBigError'
  };

  function fbTaskError (fbError) {
    var tag = fbErrorMap [fbError.code];
    if (! tag) {
      tag = 'OtherFirebaseError';
    }
    return error2elm (tag, fbError.toString ());
  }

  function fbTaskFail (fbError) {
    return Task.fail (fbTaskError (fbError));
  }

  function exTaskError (exception) {
    return error2elm ('OtherFirebaseError', exception.toString ());
  }

  function exTaskFail (exception) {
    return Task.fail (exTaskError (exception));
  }

  function onCompleteCallbackRef (callback, res) {
    return function (err) {
      if (err) {
        callback (fbTaskFail (err));
      } else {
        callback (Task.succeed (res));
      }
    };
  }

  function getRefStep (location) {
    var ref;
    switch (location.ctor) {
      case 'UrlLocation':
        ref = new Firebase (location._0);
        break;
      case 'SubLocation':
        ref = getRefStep (location._1) .child (location._0);
        break;
      case 'ParentLocation':
        ref = getRefStep (location._0) .parent ();
        if (! ref) { throw ('Error: Root has no parent'); }
        break;
      case 'RootLocation':
        ref = getRefStep (location._0) .root ();
        break;
      case 'PushLocation':
        ref = getRefStep (location._0) .push ();
        break;
      case 'RefLocation':
        ref = location._0;
        break;
    }
    if (! ref) {
     throw ('Bad Firebase reference.' + pleaseReportThis);
    }
    return ref;
  }

  function getRef (location, failureCallback) {
    var ref;
    try {
      ref = getRefStep (location);
    }
    catch (exception) {
      failureCallback (Task.fail (error2elm ('LocationError', exception.toString ())));
    }
    return ref;
  }

  function toUrl (reference) {
    return reference .toString ();
  }

  function key (reference) {
    var res = reference .key ();
    if (res === null) {
      res = '';
    }
    return res;
  }

  function open (location) {
    return Task .asyncFunction (function (callback) {
      var ref = getRef (location, callback);
      if (ref) {
        callback (Task.succeed (ref));
      }
    });
  }

  function set (onDisconnect, value, location) {
    return Task .asyncFunction (function (callback) {
      var ref = getRef (location, callback);
      if (ref) {
        var onComplete;
        if (onDisconnect) {
          ref = ref.onDisconnect ();
          onComplete = onCompleteCallbackRef (callback, Utils.Tuple0);
        } else {
          onComplete = onCompleteCallbackRef (callback, ref)
        }
        try { ref.set (value, onComplete); }
        catch (exception) { callback (exTaskFail (exception)); }
      }
    });
  }

  function setWithPriority (onDisconnect, value, priority, location) {
    return Task .asyncFunction (function (callback) {
      var ref = getRef (location, callback);
      if (ref) {
        var onComplete;
        if (onDisconnect) {
          ref = ref.onDisconnect ();
          onComplete = onCompleteCallbackRef (callback, Utils.Tuple0);
        } else {
          onComplete = onCompleteCallbackRef (callback, ref)
        }
        try { ref.setWithPriority (value, priority2fb (priority), onComplete); }
        catch (exception) { callback (exTaskFail (exception)); }
      }
    });
  }

  function setPriority (priority, location) {
    return Task .asyncFunction (function (callback) {
      var ref = getRef (location, callback);
      if (ref) {
        try {
          ref.setPriority
                (priority2fb (priority), onCompleteCallbackRef (callback, ref));
        }
        catch (exception) { callback (exTaskFail (exception)); }
      }
    });
  }

  function update (onDisconnect, value, location) {
    return Task .asyncFunction (function (callback) {
      var ref = getRef (location, callback);
      if (ref) {
        var onComplete;
        if (onDisconnect) {
          ref = ref.onDisconnect ();
          onComplete = onCompleteCallbackRef (callback, Utils.Tuple0);
        } else {
          onComplete = onCompleteCallbackRef (callback, ref)
        }
        try { ref.update (value, onComplete); }
        catch (exception) { callback (exTaskFail (exception)); }
      }
    });
  }

  function remove (onDisconnect, location) {
   return Task .asyncFunction (function (callback) {
     var ref = getRef (location, callback);
     if (ref) {
      var onComplete;
      if (onDisconnect) {
        ref = ref.onDisconnect ();
        onComplete = onCompleteCallbackRef (callback, Utils.Tuple0);
      } else {
        onComplete = onCompleteCallbackRef (callback, ref)
      }
       try { ref.remove (onComplete); }
       catch (exception) { callback (exTaskFail (exception)); }
     }
   });
 }

  function onDisconnectCancel (location) {
   return Task .asyncFunction (function (callback) {
     var ref = getRef (location, callback);
     if (ref) {
       try { ref.onDisconnect().cancel (onCompleteCallbackRef (callback, Utils.Tuple0)); }
       catch (exception) { callback (exTaskFail (exception)); }
     }
   });
 }

  function transaction (updateFunc, location, applyLocally) {
    return Task .asyncFunction (function (callback) {
      var ref = getRef (location, callback);
      if (ref) {
        var fbUpdateFunc = function (prevVal) {
          var action = updateFunc (asMaybe (prevVal));
          switch (action.ctor) {
            case 'Abort':  return;
            case 'Remove': return null;
            case 'Set':    return action._0;
            default: 	throw ('Bad action.' + pleaseReportThis);
          }
        };
        var onComplete = function (err, committed, fbSnapshot) {
          if (err) {
            callback (fbTaskFail (err));
          } else {
            var snapshot = snapshot2elm ('_transaction_', fbSnapshot, null);
            var res = Utils.Tuple2 (committed, snapshot);
            callback (Task.succeed (res));
          }
        };
        try { ref.transaction (fbUpdateFunc, onComplete, applyLocally); }
        catch (exception) {
          callback (exTaskFail (exception));
        }
      }
    });
  }

  // Store for current query subscriptions
  var sNum = 0;
  var subscriptions = {};

  function nextSubscriptionId () {
    return 'q' + (++sNum);
  }

  function queryEventType (query) {
    var eventType = 'Bad query type.' + pleaseReportThis;
    if (query.queryEvent) {
      switch (query.queryEvent.ctor) {
        case 'ValueChanged': eventType = 'value'; break;
        case 'ChildAdded':   eventType = 'child_added'; break;
        case 'ChildChanged': eventType = 'child_changed'; break;
        case 'ChildRemoved': eventType = 'child_removed'; break;
        case 'ChildMoved':   eventType = 'child_moved'; break;
      }
    }
    return eventType;
  }

  function queryOrderAndFilter (query, ref) {
    if (query.orderByChildOrValue) {
      if (query.orderByChildOrValue.ctor === 'Just') {
        ref = ref.orderByChild (query.orderByChildOrValue._0);
      } else {
        ref = ref.orderByValue ();
      }
    }
    if (query.orderByKey) {
      ref = ref.orderByKey ();
    }
    if (query.orderByPriority) {
      ref = ref.orderByPriority ();
    }

    if (query.startAtValue) {
      ref = ref.startAt  (query.startAtValue);
    }
    if (query.endAtValue) {
      ref = ref.endAt  (query.endAtValue);
    }
    if (query.startAtKey) {
      ref = ref.startAt  (query.startAtKey);
    }
    if (query.endAtKey) {
      ref = ref.endAt  (query.endAtKey);
    }
    var prio, key;
    if (query.startAtPriority) {
      prio = priority2fb (query.startAtPriority._0);
      key  = fromMaybe (query.startAtPriority._1);
      if (key === null) {
        ref = ref.startAt (prio);
      } else {
        ref = ref.startAt (prio, key);
      }
    }
    if (query.endAtPriority) {
      prio = priority2fb (query.endAtPriority._0);
      key  = fromMaybe (query.endAtPriority._1);
      if (key === null) {
        ref = ref.endAt (prio);
      } else {
        ref = ref.endAt (prio, key);
      }
    }

    if (query.limitToFirst) {
      ref = ref.limitToFirst (query.limitToFirst);
    }
    if (query.limitToLast) {
      ref = ref.limitToLast (query.limitToLast);
    }

    return ref;
  }

  function snapshot2elm (subscription, fbSnapshot, prevKey) {
    var key = fbSnapshot .key ();
    if (key === null) {
      key = '';
    }
    var value = fbSnapshot .val ();
    return {
      _: {},
      subscription: subscription,
      key: key,
      reference: fbSnapshot .ref (),
      existing: value !== null,
      value: value,
      prevKey: asMaybe (prevKey),
      priority: priority2elm (fbSnapshot .getPriority ()),
      intern_: fbSnapshot
    };
  }

  function subscribeConditional (createResponseTask, createCancellationTask, query, location) {
    return Task .asyncFunction (function (callback) {
      var ref = getRef (location, callback);
      if (ref) {
        var subscription = nextSubscriptionId ();
        var onResponse = function (fbSnapshot, prevKey) {
          var snapshot = snapshot2elm (subscription, fbSnapshot, prevKey);
          var responseTask = fromMaybe (createResponseTask (snapshot));
          if (responseTask !== null) {
            Task .perform (responseTask);
          }
        };
        var onCancel = function (err) {
          var cancellation = {
            ctor: 'QueryError',
            _0: subscription,
            _1: fbTaskError (err)
          };
          Task .perform (createCancellationTask (cancellation));
        };
        var eventType = queryEventType (query);
        subscriptions [subscription] = {
          ref: ref,
          eventType: eventType,
          callback: onResponse,
          createCancellationTask: createCancellationTask
        };
        try { queryOrderAndFilter (query, ref)
              .on (eventType, onResponse, onCancel); }
        catch (exception) {
          callback (exTaskFail (exception));
          return;
        }
        callback (Task.succeed (subscription));
      }
    });
  }

  function unsubscribe (subscription) {
    return Task .asyncFunction (function (callback) {
      if (subscriptions.hasOwnProperty (subscription)) {
        var query = subscriptions [subscription];
        delete subscriptions [subscription];
        try { query.ref.off (query.eventType, query.callback); }
        catch (exception) {
          callback (exTaskFail (exception));
          return;
        }
        Task.perform (query.createCancellationTask ({
          ctor: 'Unsubscribed', _0: subscription
        }));
        callback (Task.succeed (Utils.Tuple0));
      } else {
        callback (Task.fail ({ ctor: 'UnknownSubscription' }));
      }
    });
  }

  function once (query, location) {
    return Task .asyncFunction (function (callback) {
      var ref = getRef (location, callback);
      if (ref) {
        var onResponse = function (fbSnapshot, prevKey) {
          var snapshot = snapshot2elm ('_once_', fbSnapshot, prevKey);
          callback (Task.succeed (snapshot));
        };
        var onCancel = function (err) {
          var error = fbTaskFail (err);
          callback (error);
        };
        var eventType = queryEventType (query);
        try { queryOrderAndFilter (query, ref)
              .once (eventType, onResponse, onCancel); }
        catch (exception) {
          callback (exTaskFail (exception));
        }
      }
    });
  }

  function toSnapshotList (snapshot) {
    var arr = [], prevKey = '';
    snapshot .intern_ .forEach (function (fbChildSnapshot) {
      var childSnapshot = snapshot2elm ('_child_', fbChildSnapshot, null);
      childSnapshot .prevKey = prevKey;
      prevKey = childSnapshot .key;
      arr .push (childSnapshot);
    });
    return List.fromArray (arr);
  }

  function toListGeneric (snapshot, mapSnapshot) {
   var arr = [];
   snapshot .intern_ .forEach (function (fbChildSnapshot) {
     arr .push (mapSnapshot (fbChildSnapshot));
   });
   return List.fromArray (arr);
 }

  function toValueList (snapshot) {
    return toListGeneric (snapshot, function (fbChildSnapshot) {
      return fbChildSnapshot .val ();
    });
  }

  function toKeyList (snapshot) {
    return toListGeneric (snapshot, function (fbChildSnapshot) {
      return fbChildSnapshot .key ();
    });
  }

  function toPairList (snapshot) {
    return toListGeneric (snapshot, function (fbChildSnapshot) {
      return Utils.Tuple2 (fbChildSnapshot .key (), fbChildSnapshot .val ());
    });
  }

  function exportValue (snapshot) {
    return snapshot .intern_ .exportVal ();
  }

  function setOffline (off) {
    return Task .asyncFunction (function (callback) {
      if (off) {
        Firebase.goOffline ();
      } else {
        Firebase.goOnline ();
      }
      callback (Task.succeed (Utils.Tuple0));
    });
  }

  var serverTimeStamp = Firebase.ServerValue.TIMESTAMP;

  return localRuntime.Native.ElmFire.values =
  {
    // Values exported to Elm
      toUrl: toUrl
    , key: key
    , open: open
    ,	set: F3 (set)
    ,	setWithPriority: F4 (setWithPriority)
    ,	setPriority: F2 (setPriority)
    ,	update: F3 (update)
    ,	remove: F2 (remove)
    , onDisconnectCancel: onDisconnectCancel
    ,	transaction: F3 (transaction)
    ,	subscribeConditional: F4 (subscribeConditional)
    ,	unsubscribe: unsubscribe
    ,	once: F2 (once)
    , toSnapshotList: toSnapshotList
    ,	toValueList: toValueList
    ,	toKeyList: toKeyList
    ,	toPairList: toPairList
    , exportValue: exportValue
    , setOffline: setOffline
    , serverTimeStamp: serverTimeStamp

    // Utilities for sub-modules
    , asMaybe: asMaybe
    , getRef: getRef
    , pleaseReportThis: pleaseReportThis
  };
};

/*! @license Firebase v2.2.6
    License: https://www.firebase.com/terms/terms-of-service.html */
(function() {var h,aa=this;function n(a){return void 0!==a}function ba(){}function ca(a){a.ub=function(){return a.tf?a.tf:a.tf=new a}}
function da(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
else if("function"==b&&"undefined"==typeof a.call)return"object";return b}function ea(a){return"array"==da(a)}function fa(a){var b=da(a);return"array"==b||"object"==b&&"number"==typeof a.length}function p(a){return"string"==typeof a}function ga(a){return"number"==typeof a}function ha(a){return"function"==da(a)}function ia(a){var b=typeof a;return"object"==b&&null!=a||"function"==b}function ja(a,b,c){return a.call.apply(a.bind,arguments)}
function ka(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}}function q(a,b,c){q=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?ja:ka;return q.apply(null,arguments)}var la=Date.now||function(){return+new Date};
function ma(a,b){function c(){}c.prototype=b.prototype;a.Zg=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.Vg=function(a,c,f){for(var g=Array(arguments.length-2),k=2;k<arguments.length;k++)g[k-2]=arguments[k];return b.prototype[c].apply(a,g)}};function r(a,b){for(var c in a)b.call(void 0,a[c],c,a)}function na(a,b){var c={},d;for(d in a)c[d]=b.call(void 0,a[d],d,a);return c}function oa(a,b){for(var c in a)if(!b.call(void 0,a[c],c,a))return!1;return!0}function pa(a){var b=0,c;for(c in a)b++;return b}function qa(a){for(var b in a)return b}function ra(a){var b=[],c=0,d;for(d in a)b[c++]=a[d];return b}function sa(a){var b=[],c=0,d;for(d in a)b[c++]=d;return b}function ta(a,b){for(var c in a)if(a[c]==b)return!0;return!1}
function ua(a,b,c){for(var d in a)if(b.call(c,a[d],d,a))return d}function va(a,b){var c=ua(a,b,void 0);return c&&a[c]}function wa(a){for(var b in a)return!1;return!0}function xa(a){var b={},c;for(c in a)b[c]=a[c];return b}var ya="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
function za(a,b){for(var c,d,e=1;e<arguments.length;e++){d=arguments[e];for(c in d)a[c]=d[c];for(var f=0;f<ya.length;f++)c=ya[f],Object.prototype.hasOwnProperty.call(d,c)&&(a[c]=d[c])}};function Aa(a){a=String(a);if(/^\s*$/.test(a)?0:/^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g,"@").replace(/"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g,"")))try{return eval("("+a+")")}catch(b){}throw Error("Invalid JSON string: "+a);}function Ba(){this.Pd=void 0}
function Ca(a,b,c){switch(typeof b){case "string":Da(b,c);break;case "number":c.push(isFinite(b)&&!isNaN(b)?b:"null");break;case "boolean":c.push(b);break;case "undefined":c.push("null");break;case "object":if(null==b){c.push("null");break}if(ea(b)){var d=b.length;c.push("[");for(var e="",f=0;f<d;f++)c.push(e),e=b[f],Ca(a,a.Pd?a.Pd.call(b,String(f),e):e,c),e=",";c.push("]");break}c.push("{");d="";for(f in b)Object.prototype.hasOwnProperty.call(b,f)&&(e=b[f],"function"!=typeof e&&(c.push(d),Da(f,c),
c.push(":"),Ca(a,a.Pd?a.Pd.call(b,f,e):e,c),d=","));c.push("}");break;case "function":break;default:throw Error("Unknown type: "+typeof b);}}var Ea={'"':'\\"',"\\":"\\\\","/":"\\/","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\x0B":"\\u000b"},Fa=/\uffff/.test("\uffff")?/[\\\"\x00-\x1f\x7f-\uffff]/g:/[\\\"\x00-\x1f\x7f-\xff]/g;
function Da(a,b){b.push('"',a.replace(Fa,function(a){if(a in Ea)return Ea[a];var b=a.charCodeAt(0),e="\\u";16>b?e+="000":256>b?e+="00":4096>b&&(e+="0");return Ea[a]=e+b.toString(16)}),'"')};function Ga(){return Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^la()).toString(36)};var Ha;a:{var Ia=aa.navigator;if(Ia){var Ja=Ia.userAgent;if(Ja){Ha=Ja;break a}}Ha=""};function Ka(){this.Wa=-1};function La(){this.Wa=-1;this.Wa=64;this.R=[];this.le=[];this.Tf=[];this.Id=[];this.Id[0]=128;for(var a=1;a<this.Wa;++a)this.Id[a]=0;this.be=this.$b=0;this.reset()}ma(La,Ka);La.prototype.reset=function(){this.R[0]=1732584193;this.R[1]=4023233417;this.R[2]=2562383102;this.R[3]=271733878;this.R[4]=3285377520;this.be=this.$b=0};
function Ma(a,b,c){c||(c=0);var d=a.Tf;if(p(b))for(var e=0;16>e;e++)d[e]=b.charCodeAt(c)<<24|b.charCodeAt(c+1)<<16|b.charCodeAt(c+2)<<8|b.charCodeAt(c+3),c+=4;else for(e=0;16>e;e++)d[e]=b[c]<<24|b[c+1]<<16|b[c+2]<<8|b[c+3],c+=4;for(e=16;80>e;e++){var f=d[e-3]^d[e-8]^d[e-14]^d[e-16];d[e]=(f<<1|f>>>31)&4294967295}b=a.R[0];c=a.R[1];for(var g=a.R[2],k=a.R[3],l=a.R[4],m,e=0;80>e;e++)40>e?20>e?(f=k^c&(g^k),m=1518500249):(f=c^g^k,m=1859775393):60>e?(f=c&g|k&(c|g),m=2400959708):(f=c^g^k,m=3395469782),f=(b<<
5|b>>>27)+f+l+m+d[e]&4294967295,l=k,k=g,g=(c<<30|c>>>2)&4294967295,c=b,b=f;a.R[0]=a.R[0]+b&4294967295;a.R[1]=a.R[1]+c&4294967295;a.R[2]=a.R[2]+g&4294967295;a.R[3]=a.R[3]+k&4294967295;a.R[4]=a.R[4]+l&4294967295}
La.prototype.update=function(a,b){if(null!=a){n(b)||(b=a.length);for(var c=b-this.Wa,d=0,e=this.le,f=this.$b;d<b;){if(0==f)for(;d<=c;)Ma(this,a,d),d+=this.Wa;if(p(a))for(;d<b;){if(e[f]=a.charCodeAt(d),++f,++d,f==this.Wa){Ma(this,e);f=0;break}}else for(;d<b;)if(e[f]=a[d],++f,++d,f==this.Wa){Ma(this,e);f=0;break}}this.$b=f;this.be+=b}};var t=Array.prototype,Na=t.indexOf?function(a,b,c){return t.indexOf.call(a,b,c)}:function(a,b,c){c=null==c?0:0>c?Math.max(0,a.length+c):c;if(p(a))return p(b)&&1==b.length?a.indexOf(b,c):-1;for(;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1},Oa=t.forEach?function(a,b,c){t.forEach.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=p(a)?a.split(""):a,f=0;f<d;f++)f in e&&b.call(c,e[f],f,a)},Pa=t.filter?function(a,b,c){return t.filter.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=[],f=0,g=p(a)?
a.split(""):a,k=0;k<d;k++)if(k in g){var l=g[k];b.call(c,l,k,a)&&(e[f++]=l)}return e},Qa=t.map?function(a,b,c){return t.map.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=Array(d),f=p(a)?a.split(""):a,g=0;g<d;g++)g in f&&(e[g]=b.call(c,f[g],g,a));return e},Ra=t.reduce?function(a,b,c,d){for(var e=[],f=1,g=arguments.length;f<g;f++)e.push(arguments[f]);d&&(e[0]=q(b,d));return t.reduce.apply(a,e)}:function(a,b,c,d){var e=c;Oa(a,function(c,g){e=b.call(d,e,c,g,a)});return e},Sa=t.every?function(a,b,
c){return t.every.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=p(a)?a.split(""):a,f=0;f<d;f++)if(f in e&&!b.call(c,e[f],f,a))return!1;return!0};function Ta(a,b){var c=Ua(a,b,void 0);return 0>c?null:p(a)?a.charAt(c):a[c]}function Ua(a,b,c){for(var d=a.length,e=p(a)?a.split(""):a,f=0;f<d;f++)if(f in e&&b.call(c,e[f],f,a))return f;return-1}function Va(a,b){var c=Na(a,b);0<=c&&t.splice.call(a,c,1)}function Wa(a,b,c){return 2>=arguments.length?t.slice.call(a,b):t.slice.call(a,b,c)}
function Xa(a,b){a.sort(b||Ya)}function Ya(a,b){return a>b?1:a<b?-1:0};var Za=-1!=Ha.indexOf("Opera")||-1!=Ha.indexOf("OPR"),$a=-1!=Ha.indexOf("Trident")||-1!=Ha.indexOf("MSIE"),ab=-1!=Ha.indexOf("Gecko")&&-1==Ha.toLowerCase().indexOf("webkit")&&!(-1!=Ha.indexOf("Trident")||-1!=Ha.indexOf("MSIE")),bb=-1!=Ha.toLowerCase().indexOf("webkit");
(function(){var a="",b;if(Za&&aa.opera)return a=aa.opera.version,ha(a)?a():a;ab?b=/rv\:([^\);]+)(\)|;)/:$a?b=/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/:bb&&(b=/WebKit\/(\S+)/);b&&(a=(a=b.exec(Ha))?a[1]:"");return $a&&(b=(b=aa.document)?b.documentMode:void 0,b>parseFloat(a))?String(b):a})();var cb=null,db=null,eb=null;function fb(a,b){if(!fa(a))throw Error("encodeByteArray takes an array as a parameter");gb();for(var c=b?db:cb,d=[],e=0;e<a.length;e+=3){var f=a[e],g=e+1<a.length,k=g?a[e+1]:0,l=e+2<a.length,m=l?a[e+2]:0,v=f>>2,f=(f&3)<<4|k>>4,k=(k&15)<<2|m>>6,m=m&63;l||(m=64,g||(k=64));d.push(c[v],c[f],c[k],c[m])}return d.join("")}
function gb(){if(!cb){cb={};db={};eb={};for(var a=0;65>a;a++)cb[a]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(a),db[a]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.".charAt(a),eb[db[a]]=a,62<=a&&(eb["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(a)]=a)}};function u(a,b){return Object.prototype.hasOwnProperty.call(a,b)}function w(a,b){if(Object.prototype.hasOwnProperty.call(a,b))return a[b]}function hb(a,b){for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&b(c,a[c])}function ib(a){var b={};hb(a,function(a,d){b[a]=d});return b};function jb(a){var b=[];hb(a,function(a,d){ea(d)?Oa(d,function(d){b.push(encodeURIComponent(a)+"="+encodeURIComponent(d))}):b.push(encodeURIComponent(a)+"="+encodeURIComponent(d))});return b.length?"&"+b.join("&"):""}function kb(a){var b={};a=a.replace(/^\?/,"").split("&");Oa(a,function(a){a&&(a=a.split("="),b[a[0]]=a[1])});return b};function x(a,b,c,d){var e;d<b?e="at least "+b:d>c&&(e=0===c?"none":"no more than "+c);if(e)throw Error(a+" failed: Was called with "+d+(1===d?" argument.":" arguments.")+" Expects "+e+".");}function z(a,b,c){var d="";switch(b){case 1:d=c?"first":"First";break;case 2:d=c?"second":"Second";break;case 3:d=c?"third":"Third";break;case 4:d=c?"fourth":"Fourth";break;default:throw Error("errorPrefix called with argumentNumber > 4.  Need to update it?");}return a=a+" failed: "+(d+" argument ")}
function A(a,b,c,d){if((!d||n(c))&&!ha(c))throw Error(z(a,b,d)+"must be a valid function.");}function lb(a,b,c){if(n(c)&&(!ia(c)||null===c))throw Error(z(a,b,!0)+"must be a valid context object.");};function mb(a){return"undefined"!==typeof JSON&&n(JSON.parse)?JSON.parse(a):Aa(a)}function B(a){if("undefined"!==typeof JSON&&n(JSON.stringify))a=JSON.stringify(a);else{var b=[];Ca(new Ba,a,b);a=b.join("")}return a};function nb(){this.Sd=C}nb.prototype.j=function(a){return this.Sd.oa(a)};nb.prototype.toString=function(){return this.Sd.toString()};function ob(){}ob.prototype.pf=function(){return null};ob.prototype.xe=function(){return null};var pb=new ob;function qb(a,b,c){this.Qf=a;this.Ka=b;this.Hd=c}qb.prototype.pf=function(a){var b=this.Ka.D;if(rb(b,a))return b.j().M(a);b=null!=this.Hd?new sb(this.Hd,!0,!1):this.Ka.u();return this.Qf.Xa(a,b)};qb.prototype.xe=function(a,b,c){var d=null!=this.Hd?this.Hd:tb(this.Ka);a=this.Qf.me(d,b,1,c,a);return 0===a.length?null:a[0]};function ub(){this.tb=[]}function vb(a,b){for(var c=null,d=0;d<b.length;d++){var e=b[d],f=e.Yb();null===c||f.Z(c.Yb())||(a.tb.push(c),c=null);null===c&&(c=new wb(f));c.add(e)}c&&a.tb.push(c)}function xb(a,b,c){vb(a,c);yb(a,function(a){return a.Z(b)})}function zb(a,b,c){vb(a,c);yb(a,function(a){return a.contains(b)||b.contains(a)})}
function yb(a,b){for(var c=!0,d=0;d<a.tb.length;d++){var e=a.tb[d];if(e)if(e=e.Yb(),b(e)){for(var e=a.tb[d],f=0;f<e.sd.length;f++){var g=e.sd[f];if(null!==g){e.sd[f]=null;var k=g.Ub();Ab&&Bb("event: "+g.toString());Cb(k)}}a.tb[d]=null}else c=!1}c&&(a.tb=[])}function wb(a){this.qa=a;this.sd=[]}wb.prototype.add=function(a){this.sd.push(a)};wb.prototype.Yb=function(){return this.qa};function D(a,b,c,d){this.type=a;this.Ja=b;this.Ya=c;this.Je=d;this.Nd=void 0}function Db(a){return new D(Eb,a)}var Eb="value";function Fb(a,b,c,d){this.te=b;this.Wd=c;this.Nd=d;this.rd=a}Fb.prototype.Yb=function(){var a=this.Wd.lc();return"value"===this.rd?a.path:a.parent().path};Fb.prototype.ye=function(){return this.rd};Fb.prototype.Ub=function(){return this.te.Ub(this)};Fb.prototype.toString=function(){return this.Yb().toString()+":"+this.rd+":"+B(this.Wd.lf())};function Gb(a,b,c){this.te=a;this.error=b;this.path=c}Gb.prototype.Yb=function(){return this.path};Gb.prototype.ye=function(){return"cancel"};
Gb.prototype.Ub=function(){return this.te.Ub(this)};Gb.prototype.toString=function(){return this.path.toString()+":cancel"};function sb(a,b,c){this.B=a;this.$=b;this.Tb=c}function Hb(a){return a.$}function rb(a,b){return a.$&&!a.Tb||a.B.Ha(b)}sb.prototype.j=function(){return this.B};function Ib(a){this.dg=a;this.Ad=null}Ib.prototype.get=function(){var a=this.dg.get(),b=xa(a);if(this.Ad)for(var c in this.Ad)b[c]-=this.Ad[c];this.Ad=a;return b};function Jb(a,b){this.Mf={};this.Yd=new Ib(a);this.ca=b;var c=1E4+2E4*Math.random();setTimeout(q(this.Hf,this),Math.floor(c))}Jb.prototype.Hf=function(){var a=this.Yd.get(),b={},c=!1,d;for(d in a)0<a[d]&&u(this.Mf,d)&&(b[d]=a[d],c=!0);c&&this.ca.Te(b);setTimeout(q(this.Hf,this),Math.floor(6E5*Math.random()))};function Kb(){this.Dc={}}function Lb(a,b,c){n(c)||(c=1);u(a.Dc,b)||(a.Dc[b]=0);a.Dc[b]+=c}Kb.prototype.get=function(){return xa(this.Dc)};var Mb={},Nb={};function Ob(a){a=a.toString();Mb[a]||(Mb[a]=new Kb);return Mb[a]}function Pb(a,b){var c=a.toString();Nb[c]||(Nb[c]=b());return Nb[c]};function E(a,b){this.name=a;this.S=b}function Qb(a,b){return new E(a,b)};function Rb(a,b){return Sb(a.name,b.name)}function Tb(a,b){return Sb(a,b)};function Ub(a,b,c){this.type=Vb;this.source=a;this.path=b;this.Ia=c}Ub.prototype.Wc=function(a){return this.path.e()?new Ub(this.source,F,this.Ia.M(a)):new Ub(this.source,G(this.path),this.Ia)};Ub.prototype.toString=function(){return"Operation("+this.path+": "+this.source.toString()+" overwrite: "+this.Ia.toString()+")"};function Wb(a,b){this.type=Xb;this.source=Yb;this.path=a;this.Ve=b}Wb.prototype.Wc=function(){return this.path.e()?this:new Wb(G(this.path),this.Ve)};Wb.prototype.toString=function(){return"Operation("+this.path+": "+this.source.toString()+" ack write revert="+this.Ve+")"};function Zb(a,b){this.type=$b;this.source=a;this.path=b}Zb.prototype.Wc=function(){return this.path.e()?new Zb(this.source,F):new Zb(this.source,G(this.path))};Zb.prototype.toString=function(){return"Operation("+this.path+": "+this.source.toString()+" listen_complete)"};function ac(a,b){this.La=a;this.xa=b?b:bc}h=ac.prototype;h.Na=function(a,b){return new ac(this.La,this.xa.Na(a,b,this.La).X(null,null,!1,null,null))};h.remove=function(a){return new ac(this.La,this.xa.remove(a,this.La).X(null,null,!1,null,null))};h.get=function(a){for(var b,c=this.xa;!c.e();){b=this.La(a,c.key);if(0===b)return c.value;0>b?c=c.left:0<b&&(c=c.right)}return null};
function cc(a,b){for(var c,d=a.xa,e=null;!d.e();){c=a.La(b,d.key);if(0===c){if(d.left.e())return e?e.key:null;for(d=d.left;!d.right.e();)d=d.right;return d.key}0>c?d=d.left:0<c&&(e=d,d=d.right)}throw Error("Attempted to find predecessor key for a nonexistent key.  What gives?");}h.e=function(){return this.xa.e()};h.count=function(){return this.xa.count()};h.Rc=function(){return this.xa.Rc()};h.ec=function(){return this.xa.ec()};h.ha=function(a){return this.xa.ha(a)};
h.Wb=function(a){return new dc(this.xa,null,this.La,!1,a)};h.Xb=function(a,b){return new dc(this.xa,a,this.La,!1,b)};h.Zb=function(a,b){return new dc(this.xa,a,this.La,!0,b)};h.rf=function(a){return new dc(this.xa,null,this.La,!0,a)};function dc(a,b,c,d,e){this.Rd=e||null;this.Ee=d;this.Pa=[];for(e=1;!a.e();)if(e=b?c(a.key,b):1,d&&(e*=-1),0>e)a=this.Ee?a.left:a.right;else if(0===e){this.Pa.push(a);break}else this.Pa.push(a),a=this.Ee?a.right:a.left}
function H(a){if(0===a.Pa.length)return null;var b=a.Pa.pop(),c;c=a.Rd?a.Rd(b.key,b.value):{key:b.key,value:b.value};if(a.Ee)for(b=b.left;!b.e();)a.Pa.push(b),b=b.right;else for(b=b.right;!b.e();)a.Pa.push(b),b=b.left;return c}function ec(a){if(0===a.Pa.length)return null;var b;b=a.Pa;b=b[b.length-1];return a.Rd?a.Rd(b.key,b.value):{key:b.key,value:b.value}}function fc(a,b,c,d,e){this.key=a;this.value=b;this.color=null!=c?c:!0;this.left=null!=d?d:bc;this.right=null!=e?e:bc}h=fc.prototype;
h.X=function(a,b,c,d,e){return new fc(null!=a?a:this.key,null!=b?b:this.value,null!=c?c:this.color,null!=d?d:this.left,null!=e?e:this.right)};h.count=function(){return this.left.count()+1+this.right.count()};h.e=function(){return!1};h.ha=function(a){return this.left.ha(a)||a(this.key,this.value)||this.right.ha(a)};function gc(a){return a.left.e()?a:gc(a.left)}h.Rc=function(){return gc(this).key};h.ec=function(){return this.right.e()?this.key:this.right.ec()};
h.Na=function(a,b,c){var d,e;e=this;d=c(a,e.key);e=0>d?e.X(null,null,null,e.left.Na(a,b,c),null):0===d?e.X(null,b,null,null,null):e.X(null,null,null,null,e.right.Na(a,b,c));return hc(e)};function ic(a){if(a.left.e())return bc;a.left.fa()||a.left.left.fa()||(a=jc(a));a=a.X(null,null,null,ic(a.left),null);return hc(a)}
h.remove=function(a,b){var c,d;c=this;if(0>b(a,c.key))c.left.e()||c.left.fa()||c.left.left.fa()||(c=jc(c)),c=c.X(null,null,null,c.left.remove(a,b),null);else{c.left.fa()&&(c=kc(c));c.right.e()||c.right.fa()||c.right.left.fa()||(c=lc(c),c.left.left.fa()&&(c=kc(c),c=lc(c)));if(0===b(a,c.key)){if(c.right.e())return bc;d=gc(c.right);c=c.X(d.key,d.value,null,null,ic(c.right))}c=c.X(null,null,null,null,c.right.remove(a,b))}return hc(c)};h.fa=function(){return this.color};
function hc(a){a.right.fa()&&!a.left.fa()&&(a=mc(a));a.left.fa()&&a.left.left.fa()&&(a=kc(a));a.left.fa()&&a.right.fa()&&(a=lc(a));return a}function jc(a){a=lc(a);a.right.left.fa()&&(a=a.X(null,null,null,null,kc(a.right)),a=mc(a),a=lc(a));return a}function mc(a){return a.right.X(null,null,a.color,a.X(null,null,!0,null,a.right.left),null)}function kc(a){return a.left.X(null,null,a.color,null,a.X(null,null,!0,a.left.right,null))}
function lc(a){return a.X(null,null,!a.color,a.left.X(null,null,!a.left.color,null,null),a.right.X(null,null,!a.right.color,null,null))}function nc(){}h=nc.prototype;h.X=function(){return this};h.Na=function(a,b){return new fc(a,b,null)};h.remove=function(){return this};h.count=function(){return 0};h.e=function(){return!0};h.ha=function(){return!1};h.Rc=function(){return null};h.ec=function(){return null};h.fa=function(){return!1};var bc=new nc;function oc(a,b){return a&&"object"===typeof a?(J(".sv"in a,"Unexpected leaf node or priority contents"),b[a[".sv"]]):a}function pc(a,b){var c=new qc;rc(a,new K(""),function(a,e){c.mc(a,sc(e,b))});return c}function sc(a,b){var c=a.A().K(),c=oc(c,b),d;if(a.N()){var e=oc(a.Ba(),b);return e!==a.Ba()||c!==a.A().K()?new tc(e,L(c)):a}d=a;c!==a.A().K()&&(d=d.da(new tc(c)));a.U(M,function(a,c){var e=sc(c,b);e!==c&&(d=d.Q(a,e))});return d};function K(a,b){if(1==arguments.length){this.n=a.split("/");for(var c=0,d=0;d<this.n.length;d++)0<this.n[d].length&&(this.n[c]=this.n[d],c++);this.n.length=c;this.Y=0}else this.n=a,this.Y=b}function N(a,b){var c=O(a);if(null===c)return b;if(c===O(b))return N(G(a),G(b));throw Error("INTERNAL ERROR: innerPath ("+b+") is not within outerPath ("+a+")");}function O(a){return a.Y>=a.n.length?null:a.n[a.Y]}function uc(a){return a.n.length-a.Y}
function G(a){var b=a.Y;b<a.n.length&&b++;return new K(a.n,b)}function vc(a){return a.Y<a.n.length?a.n[a.n.length-1]:null}h=K.prototype;h.toString=function(){for(var a="",b=this.Y;b<this.n.length;b++)""!==this.n[b]&&(a+="/"+this.n[b]);return a||"/"};h.slice=function(a){return this.n.slice(this.Y+(a||0))};h.parent=function(){if(this.Y>=this.n.length)return null;for(var a=[],b=this.Y;b<this.n.length-1;b++)a.push(this.n[b]);return new K(a,0)};
h.w=function(a){for(var b=[],c=this.Y;c<this.n.length;c++)b.push(this.n[c]);if(a instanceof K)for(c=a.Y;c<a.n.length;c++)b.push(a.n[c]);else for(a=a.split("/"),c=0;c<a.length;c++)0<a[c].length&&b.push(a[c]);return new K(b,0)};h.e=function(){return this.Y>=this.n.length};h.Z=function(a){if(uc(this)!==uc(a))return!1;for(var b=this.Y,c=a.Y;b<=this.n.length;b++,c++)if(this.n[b]!==a.n[c])return!1;return!0};
h.contains=function(a){var b=this.Y,c=a.Y;if(uc(this)>uc(a))return!1;for(;b<this.n.length;){if(this.n[b]!==a.n[c])return!1;++b;++c}return!0};var F=new K("");function wc(a,b){this.Qa=a.slice();this.Ea=Math.max(1,this.Qa.length);this.kf=b;for(var c=0;c<this.Qa.length;c++)this.Ea+=xc(this.Qa[c]);yc(this)}wc.prototype.push=function(a){0<this.Qa.length&&(this.Ea+=1);this.Qa.push(a);this.Ea+=xc(a);yc(this)};wc.prototype.pop=function(){var a=this.Qa.pop();this.Ea-=xc(a);0<this.Qa.length&&--this.Ea};
function yc(a){if(768<a.Ea)throw Error(a.kf+"has a key path longer than 768 bytes ("+a.Ea+").");if(32<a.Qa.length)throw Error(a.kf+"path specified exceeds the maximum depth that can be written (32) or object contains a cycle "+zc(a));}function zc(a){return 0==a.Qa.length?"":"in property '"+a.Qa.join(".")+"'"};function Ac(){this.wc={}}Ac.prototype.set=function(a,b){null==b?delete this.wc[a]:this.wc[a]=b};Ac.prototype.get=function(a){return u(this.wc,a)?this.wc[a]:null};Ac.prototype.remove=function(a){delete this.wc[a]};Ac.prototype.uf=!0;function Bc(a){this.Ec=a;this.Md="firebase:"}h=Bc.prototype;h.set=function(a,b){null==b?this.Ec.removeItem(this.Md+a):this.Ec.setItem(this.Md+a,B(b))};h.get=function(a){a=this.Ec.getItem(this.Md+a);return null==a?null:mb(a)};h.remove=function(a){this.Ec.removeItem(this.Md+a)};h.uf=!1;h.toString=function(){return this.Ec.toString()};function Cc(a){try{if("undefined"!==typeof window&&"undefined"!==typeof window[a]){var b=window[a];b.setItem("firebase:sentinel","cache");b.removeItem("firebase:sentinel");return new Bc(b)}}catch(c){}return new Ac}var Dc=Cc("localStorage"),P=Cc("sessionStorage");function Ec(a,b,c,d,e){this.host=a.toLowerCase();this.domain=this.host.substr(this.host.indexOf(".")+1);this.lb=b;this.Cb=c;this.Tg=d;this.Ld=e||"";this.Oa=Dc.get("host:"+a)||this.host}function Fc(a,b){b!==a.Oa&&(a.Oa=b,"s-"===a.Oa.substr(0,2)&&Dc.set("host:"+a.host,a.Oa))}Ec.prototype.toString=function(){var a=(this.lb?"https://":"http://")+this.host;this.Ld&&(a+="<"+this.Ld+">");return a};var Gc=function(){var a=1;return function(){return a++}}();function J(a,b){if(!a)throw Hc(b);}function Hc(a){return Error("Firebase (2.2.6) INTERNAL ASSERT FAILED: "+a)}
function Ic(a){try{var b;if("undefined"!==typeof atob)b=atob(a);else{gb();for(var c=eb,d=[],e=0;e<a.length;){var f=c[a.charAt(e++)],g=e<a.length?c[a.charAt(e)]:0;++e;var k=e<a.length?c[a.charAt(e)]:64;++e;var l=e<a.length?c[a.charAt(e)]:64;++e;if(null==f||null==g||null==k||null==l)throw Error();d.push(f<<2|g>>4);64!=k&&(d.push(g<<4&240|k>>2),64!=l&&d.push(k<<6&192|l))}if(8192>d.length)b=String.fromCharCode.apply(null,d);else{a="";for(c=0;c<d.length;c+=8192)a+=String.fromCharCode.apply(null,Wa(d,c,
c+8192));b=a}}return b}catch(m){Bb("base64Decode failed: ",m)}return null}function Jc(a){var b=Kc(a);a=new La;a.update(b);var b=[],c=8*a.be;56>a.$b?a.update(a.Id,56-a.$b):a.update(a.Id,a.Wa-(a.$b-56));for(var d=a.Wa-1;56<=d;d--)a.le[d]=c&255,c/=256;Ma(a,a.le);for(d=c=0;5>d;d++)for(var e=24;0<=e;e-=8)b[c]=a.R[d]>>e&255,++c;return fb(b)}
function Lc(a){for(var b="",c=0;c<arguments.length;c++)b=fa(arguments[c])?b+Lc.apply(null,arguments[c]):"object"===typeof arguments[c]?b+B(arguments[c]):b+arguments[c],b+=" ";return b}var Ab=null,Mc=!0;function Bb(a){!0===Mc&&(Mc=!1,null===Ab&&!0===P.get("logging_enabled")&&Nc(!0));if(Ab){var b=Lc.apply(null,arguments);Ab(b)}}function Oc(a){return function(){Bb(a,arguments)}}
function Pc(a){if("undefined"!==typeof console){var b="FIREBASE INTERNAL ERROR: "+Lc.apply(null,arguments);"undefined"!==typeof console.error?console.error(b):console.log(b)}}function Qc(a){var b=Lc.apply(null,arguments);throw Error("FIREBASE FATAL ERROR: "+b);}function Q(a){if("undefined"!==typeof console){var b="FIREBASE WARNING: "+Lc.apply(null,arguments);"undefined"!==typeof console.warn?console.warn(b):console.log(b)}}
function Rc(a){var b="",c="",d="",e="",f=!0,g="https",k=443;if(p(a)){var l=a.indexOf("//");0<=l&&(g=a.substring(0,l-1),a=a.substring(l+2));l=a.indexOf("/");-1===l&&(l=a.length);b=a.substring(0,l);e="";a=a.substring(l).split("/");for(l=0;l<a.length;l++)if(0<a[l].length){var m=a[l];try{m=decodeURIComponent(m.replace(/\+/g," "))}catch(v){}e+="/"+m}a=b.split(".");3===a.length?(c=a[1],d=a[0].toLowerCase()):2===a.length&&(c=a[0]);l=b.indexOf(":");0<=l&&(f="https"===g||"wss"===g,k=b.substring(l+1),isFinite(k)&&
(k=String(k)),k=p(k)?/^\s*-?0x/i.test(k)?parseInt(k,16):parseInt(k,10):NaN)}return{host:b,port:k,domain:c,Qg:d,lb:f,scheme:g,Zc:e}}function Sc(a){return ga(a)&&(a!=a||a==Number.POSITIVE_INFINITY||a==Number.NEGATIVE_INFINITY)}
function Tc(a){if("complete"===document.readyState)a();else{var b=!1,c=function(){document.body?b||(b=!0,a()):setTimeout(c,Math.floor(10))};document.addEventListener?(document.addEventListener("DOMContentLoaded",c,!1),window.addEventListener("load",c,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",function(){"complete"===document.readyState&&c()}),window.attachEvent("onload",c))}}
function Sb(a,b){if(a===b)return 0;if("[MIN_NAME]"===a||"[MAX_NAME]"===b)return-1;if("[MIN_NAME]"===b||"[MAX_NAME]"===a)return 1;var c=Uc(a),d=Uc(b);return null!==c?null!==d?0==c-d?a.length-b.length:c-d:-1:null!==d?1:a<b?-1:1}function Vc(a,b){if(b&&a in b)return b[a];throw Error("Missing required key ("+a+") in object: "+B(b));}
function Wc(a){if("object"!==typeof a||null===a)return B(a);var b=[],c;for(c in a)b.push(c);b.sort();c="{";for(var d=0;d<b.length;d++)0!==d&&(c+=","),c+=B(b[d]),c+=":",c+=Wc(a[b[d]]);return c+"}"}function Xc(a,b){if(a.length<=b)return[a];for(var c=[],d=0;d<a.length;d+=b)d+b>a?c.push(a.substring(d,a.length)):c.push(a.substring(d,d+b));return c}function Yc(a,b){if(ea(a))for(var c=0;c<a.length;++c)b(c,a[c]);else r(a,b)}
function Zc(a){J(!Sc(a),"Invalid JSON number");var b,c,d,e;0===a?(d=c=0,b=-Infinity===1/a?1:0):(b=0>a,a=Math.abs(a),a>=Math.pow(2,-1022)?(d=Math.min(Math.floor(Math.log(a)/Math.LN2),1023),c=d+1023,d=Math.round(a*Math.pow(2,52-d)-Math.pow(2,52))):(c=0,d=Math.round(a/Math.pow(2,-1074))));e=[];for(a=52;a;--a)e.push(d%2?1:0),d=Math.floor(d/2);for(a=11;a;--a)e.push(c%2?1:0),c=Math.floor(c/2);e.push(b?1:0);e.reverse();b=e.join("");c="";for(a=0;64>a;a+=8)d=parseInt(b.substr(a,8),2).toString(16),1===d.length&&
(d="0"+d),c+=d;return c.toLowerCase()}var $c=/^-?\d{1,10}$/;function Uc(a){return $c.test(a)&&(a=Number(a),-2147483648<=a&&2147483647>=a)?a:null}function Cb(a){try{a()}catch(b){setTimeout(function(){Q("Exception was thrown by user callback.",b.stack||"");throw b;},Math.floor(0))}}function R(a,b){if(ha(a)){var c=Array.prototype.slice.call(arguments,1).slice();Cb(function(){a.apply(null,c)})}};function Kc(a){for(var b=[],c=0,d=0;d<a.length;d++){var e=a.charCodeAt(d);55296<=e&&56319>=e&&(e-=55296,d++,J(d<a.length,"Surrogate pair missing trail surrogate."),e=65536+(e<<10)+(a.charCodeAt(d)-56320));128>e?b[c++]=e:(2048>e?b[c++]=e>>6|192:(65536>e?b[c++]=e>>12|224:(b[c++]=e>>18|240,b[c++]=e>>12&63|128),b[c++]=e>>6&63|128),b[c++]=e&63|128)}return b}function xc(a){for(var b=0,c=0;c<a.length;c++){var d=a.charCodeAt(c);128>d?b++:2048>d?b+=2:55296<=d&&56319>=d?(b+=4,c++):b+=3}return b};function ad(a){var b={},c={},d={},e="";try{var f=a.split("."),b=mb(Ic(f[0])||""),c=mb(Ic(f[1])||""),e=f[2],d=c.d||{};delete c.d}catch(g){}return{Wg:b,Ac:c,data:d,Ng:e}}function bd(a){a=ad(a).Ac;return"object"===typeof a&&a.hasOwnProperty("iat")?w(a,"iat"):null}function cd(a){a=ad(a);var b=a.Ac;return!!a.Ng&&!!b&&"object"===typeof b&&b.hasOwnProperty("iat")};function dd(a){this.V=a;this.g=a.o.g}function ed(a,b,c,d){var e=[],f=[];Oa(b,function(b){"child_changed"===b.type&&a.g.xd(b.Je,b.Ja)&&f.push(new D("child_moved",b.Ja,b.Ya))});fd(a,e,"child_removed",b,d,c);fd(a,e,"child_added",b,d,c);fd(a,e,"child_moved",f,d,c);fd(a,e,"child_changed",b,d,c);fd(a,e,Eb,b,d,c);return e}function fd(a,b,c,d,e,f){d=Pa(d,function(a){return a.type===c});Xa(d,q(a.eg,a));Oa(d,function(c){var d=gd(a,c,f);Oa(e,function(e){e.Jf(c.type)&&b.push(e.createEvent(d,a.V))})})}
function gd(a,b,c){"value"!==b.type&&"child_removed"!==b.type&&(b.Nd=c.qf(b.Ya,b.Ja,a.g));return b}dd.prototype.eg=function(a,b){if(null==a.Ya||null==b.Ya)throw Hc("Should only compare child_ events.");return this.g.compare(new E(a.Ya,a.Ja),new E(b.Ya,b.Ja))};function hd(){this.eb={}}
function id(a,b){var c=b.type,d=b.Ya;J("child_added"==c||"child_changed"==c||"child_removed"==c,"Only child changes supported for tracking");J(".priority"!==d,"Only non-priority child changes can be tracked.");var e=w(a.eb,d);if(e){var f=e.type;if("child_added"==c&&"child_removed"==f)a.eb[d]=new D("child_changed",b.Ja,d,e.Ja);else if("child_removed"==c&&"child_added"==f)delete a.eb[d];else if("child_removed"==c&&"child_changed"==f)a.eb[d]=new D("child_removed",e.Je,d);else if("child_changed"==c&&
"child_added"==f)a.eb[d]=new D("child_added",b.Ja,d);else if("child_changed"==c&&"child_changed"==f)a.eb[d]=new D("child_changed",b.Ja,d,e.Je);else throw Hc("Illegal combination of changes: "+b+" occurred after "+e);}else a.eb[d]=b};function jd(a,b,c){this.Pb=a;this.qb=b;this.sb=c||null}h=jd.prototype;h.Jf=function(a){return"value"===a};h.createEvent=function(a,b){var c=b.o.g;return new Fb("value",this,new S(a.Ja,b.lc(),c))};h.Ub=function(a){var b=this.sb;if("cancel"===a.ye()){J(this.qb,"Raising a cancel event on a listener with no cancel callback");var c=this.qb;return function(){c.call(b,a.error)}}var d=this.Pb;return function(){d.call(b,a.Wd)}};h.ff=function(a,b){return this.qb?new Gb(this,a,b):null};
h.matches=function(a){return a instanceof jd?a.Pb&&this.Pb?a.Pb===this.Pb&&a.sb===this.sb:!0:!1};h.sf=function(){return null!==this.Pb};function kd(a,b,c){this.ga=a;this.qb=b;this.sb=c}h=kd.prototype;h.Jf=function(a){a="children_added"===a?"child_added":a;return("children_removed"===a?"child_removed":a)in this.ga};h.ff=function(a,b){return this.qb?new Gb(this,a,b):null};
h.createEvent=function(a,b){J(null!=a.Ya,"Child events should have a childName.");var c=b.lc().w(a.Ya);return new Fb(a.type,this,new S(a.Ja,c,b.o.g),a.Nd)};h.Ub=function(a){var b=this.sb;if("cancel"===a.ye()){J(this.qb,"Raising a cancel event on a listener with no cancel callback");var c=this.qb;return function(){c.call(b,a.error)}}var d=this.ga[a.rd];return function(){d.call(b,a.Wd,a.Nd)}};
h.matches=function(a){if(a instanceof kd){if(!this.ga||!a.ga)return!0;if(this.sb===a.sb){var b=pa(a.ga);if(b===pa(this.ga)){if(1===b){var b=qa(a.ga),c=qa(this.ga);return c===b&&(!a.ga[b]||!this.ga[c]||a.ga[b]===this.ga[c])}return oa(this.ga,function(b,c){return a.ga[c]===b})}}}return!1};h.sf=function(){return null!==this.ga};function ld(a){this.g=a}h=ld.prototype;h.G=function(a,b,c,d,e){J(a.Ic(this.g),"A node must be indexed if only a child is updated");d=a.M(b);if(d.Z(c))return a;null!=e&&(c.e()?a.Ha(b)?id(e,new D("child_removed",d,b)):J(a.N(),"A child remove without an old child only makes sense on a leaf node"):d.e()?id(e,new D("child_added",c,b)):id(e,new D("child_changed",c,b,d)));return a.N()&&c.e()?a:a.Q(b,c).mb(this.g)};
h.ta=function(a,b,c){null!=c&&(a.N()||a.U(M,function(a,e){b.Ha(a)||id(c,new D("child_removed",e,a))}),b.N()||b.U(M,function(b,e){if(a.Ha(b)){var f=a.M(b);f.Z(e)||id(c,new D("child_changed",e,b,f))}else id(c,new D("child_added",e,b))}));return b.mb(this.g)};h.da=function(a,b){return a.e()?C:a.da(b)};h.Ga=function(){return!1};h.Vb=function(){return this};function md(a){this.Ae=new ld(a.g);this.g=a.g;var b;a.la?(b=nd(a),b=a.g.Oc(od(a),b)):b=a.g.Sc();this.dd=b;a.na?(b=pd(a),a=a.g.Oc(qd(a),b)):a=a.g.Pc();this.Fc=a}h=md.prototype;h.matches=function(a){return 0>=this.g.compare(this.dd,a)&&0>=this.g.compare(a,this.Fc)};h.G=function(a,b,c,d,e){this.matches(new E(b,c))||(c=C);return this.Ae.G(a,b,c,d,e)};h.ta=function(a,b,c){b.N()&&(b=C);var d=b.mb(this.g),d=d.da(C),e=this;b.U(M,function(a,b){e.matches(new E(a,b))||(d=d.Q(a,C))});return this.Ae.ta(a,d,c)};
h.da=function(a){return a};h.Ga=function(){return!0};h.Vb=function(){return this.Ae};function rd(a){this.ra=new md(a);this.g=a.g;J(a.ia,"Only valid if limit has been set");this.ja=a.ja;this.Jb=!sd(a)}h=rd.prototype;h.G=function(a,b,c,d,e){this.ra.matches(new E(b,c))||(c=C);return a.M(b).Z(c)?a:a.Db()<this.ja?this.ra.Vb().G(a,b,c,d,e):td(this,a,b,c,d,e)};
h.ta=function(a,b,c){var d;if(b.N()||b.e())d=C.mb(this.g);else if(2*this.ja<b.Db()&&b.Ic(this.g)){d=C.mb(this.g);b=this.Jb?b.Zb(this.ra.Fc,this.g):b.Xb(this.ra.dd,this.g);for(var e=0;0<b.Pa.length&&e<this.ja;){var f=H(b),g;if(g=this.Jb?0>=this.g.compare(this.ra.dd,f):0>=this.g.compare(f,this.ra.Fc))d=d.Q(f.name,f.S),e++;else break}}else{d=b.mb(this.g);d=d.da(C);var k,l,m;if(this.Jb){b=d.rf(this.g);k=this.ra.Fc;l=this.ra.dd;var v=ud(this.g);m=function(a,b){return v(b,a)}}else b=d.Wb(this.g),k=this.ra.dd,
l=this.ra.Fc,m=ud(this.g);for(var e=0,y=!1;0<b.Pa.length;)f=H(b),!y&&0>=m(k,f)&&(y=!0),(g=y&&e<this.ja&&0>=m(f,l))?e++:d=d.Q(f.name,C)}return this.ra.Vb().ta(a,d,c)};h.da=function(a){return a};h.Ga=function(){return!0};h.Vb=function(){return this.ra.Vb()};
function td(a,b,c,d,e,f){var g;if(a.Jb){var k=ud(a.g);g=function(a,b){return k(b,a)}}else g=ud(a.g);J(b.Db()==a.ja,"");var l=new E(c,d),m=a.Jb?wd(b,a.g):xd(b,a.g),v=a.ra.matches(l);if(b.Ha(c)){var y=b.M(c),m=e.xe(a.g,m,a.Jb);null!=m&&m.name==c&&(m=e.xe(a.g,m,a.Jb));e=null==m?1:g(m,l);if(v&&!d.e()&&0<=e)return null!=f&&id(f,new D("child_changed",d,c,y)),b.Q(c,d);null!=f&&id(f,new D("child_removed",y,c));b=b.Q(c,C);return null!=m&&a.ra.matches(m)?(null!=f&&id(f,new D("child_added",m.S,m.name)),b.Q(m.name,
m.S)):b}return d.e()?b:v&&0<=g(m,l)?(null!=f&&(id(f,new D("child_removed",m.S,m.name)),id(f,new D("child_added",d,c))),b.Q(c,d).Q(m.name,C)):b};function yd(a,b){this.he=a;this.cg=b}function zd(a){this.I=a}
zd.prototype.bb=function(a,b,c,d){var e=new hd,f;if(b.type===Vb)b.source.ve?c=Ad(this,a,b.path,b.Ia,c,d,e):(J(b.source.of,"Unknown source."),f=b.source.af,c=Bd(this,a,b.path,b.Ia,c,d,f,e));else if(b.type===Cd)b.source.ve?c=Dd(this,a,b.path,b.children,c,d,e):(J(b.source.of,"Unknown source."),f=b.source.af,c=Ed(this,a,b.path,b.children,c,d,f,e));else if(b.type===Xb)if(b.Ve)if(f=b.path,null!=c.sc(f))c=a;else{b=new qb(c,a,d);d=a.D.j();if(f.e()||".priority"===O(f))Hb(a.u())?b=c.ua(tb(a)):(b=a.u().j(),
J(b instanceof T,"serverChildren would be complete if leaf node"),b=c.xc(b)),b=this.I.ta(d,b,e);else{f=O(f);var g=c.Xa(f,a.u());null==g&&rb(a.u(),f)&&(g=d.M(f));b=null!=g?this.I.G(d,f,g,b,e):a.D.j().Ha(f)?this.I.G(d,f,C,b,e):d;b.e()&&Hb(a.u())&&(d=c.ua(tb(a)),d.N()&&(b=this.I.ta(b,d,e)))}d=Hb(a.u())||null!=c.sc(F);c=Fd(a,b,d,this.I.Ga())}else c=Gd(this,a,b.path,c,d,e);else if(b.type===$b)d=b.path,b=a.u(),f=b.j(),g=b.$||d.e(),c=Hd(this,new Id(a.D,new sb(f,g,b.Tb)),d,c,pb,e);else throw Hc("Unknown operation type: "+
b.type);e=ra(e.eb);d=c;b=d.D;b.$&&(f=b.j().N()||b.j().e(),g=Jd(a),(0<e.length||!a.D.$||f&&!b.j().Z(g)||!b.j().A().Z(g.A()))&&e.push(Db(Jd(d))));return new yd(c,e)};
function Hd(a,b,c,d,e,f){var g=b.D;if(null!=d.sc(c))return b;var k;if(c.e())J(Hb(b.u()),"If change path is empty, we must have complete server data"),b.u().Tb?(e=tb(b),d=d.xc(e instanceof T?e:C)):d=d.ua(tb(b)),f=a.I.ta(b.D.j(),d,f);else{var l=O(c);if(".priority"==l)J(1==uc(c),"Can't have a priority with additional path components"),f=g.j(),k=b.u().j(),d=d.hd(c,f,k),f=null!=d?a.I.da(f,d):g.j();else{var m=G(c);rb(g,l)?(k=b.u().j(),d=d.hd(c,g.j(),k),d=null!=d?g.j().M(l).G(m,d):g.j().M(l)):d=d.Xa(l,b.u());
f=null!=d?a.I.G(g.j(),l,d,e,f):g.j()}}return Fd(b,f,g.$||c.e(),a.I.Ga())}function Bd(a,b,c,d,e,f,g,k){var l=b.u();g=g?a.I:a.I.Vb();if(c.e())d=g.ta(l.j(),d,null);else if(g.Ga()&&!l.Tb)d=l.j().G(c,d),d=g.ta(l.j(),d,null);else{var m=O(c);if((c.e()?!l.$||l.Tb:!rb(l,O(c)))&&1<uc(c))return b;d=l.j().M(m).G(G(c),d);d=".priority"==m?g.da(l.j(),d):g.G(l.j(),m,d,pb,null)}l=l.$||c.e();b=new Id(b.D,new sb(d,l,g.Ga()));return Hd(a,b,c,e,new qb(e,b,f),k)}
function Ad(a,b,c,d,e,f,g){var k=b.D;e=new qb(e,b,f);if(c.e())g=a.I.ta(b.D.j(),d,g),a=Fd(b,g,!0,a.I.Ga());else if(f=O(c),".priority"===f)g=a.I.da(b.D.j(),d),a=Fd(b,g,k.$,k.Tb);else{var l=G(c);c=k.j().M(f);if(!l.e()){var m=e.pf(f);d=null!=m?".priority"===vc(l)&&m.oa(l.parent()).e()?m:m.G(l,d):C}c.Z(d)?a=b:(g=a.I.G(k.j(),f,d,e,g),a=Fd(b,g,k.$,a.I.Ga()))}return a}
function Dd(a,b,c,d,e,f,g){var k=b;Kd(d,function(d,m){var v=c.w(d);rb(b.D,O(v))&&(k=Ad(a,k,v,m,e,f,g))});Kd(d,function(d,m){var v=c.w(d);rb(b.D,O(v))||(k=Ad(a,k,v,m,e,f,g))});return k}function Ld(a,b){Kd(b,function(b,d){a=a.G(b,d)});return a}
function Ed(a,b,c,d,e,f,g,k){if(b.u().j().e()&&!Hb(b.u()))return b;var l=b;c=c.e()?d:Md(Nd,c,d);var m=b.u().j();c.children.ha(function(c,d){if(m.Ha(c)){var I=b.u().j().M(c),I=Ld(I,d);l=Bd(a,l,new K(c),I,e,f,g,k)}});c.children.ha(function(c,d){var I=!Hb(b.u())&&null==d.value;m.Ha(c)||I||(I=b.u().j().M(c),I=Ld(I,d),l=Bd(a,l,new K(c),I,e,f,g,k))});return l}
function Gd(a,b,c,d,e,f){if(null!=d.sc(c))return b;var g=new qb(d,b,e),k=e=b.D.j();if(Hb(b.u())){if(c.e())e=d.ua(tb(b)),k=a.I.ta(b.D.j(),e,f);else if(".priority"===O(c)){var l=d.Xa(O(c),b.u());null==l||e.e()||e.A().Z(l)||(k=a.I.da(e,l))}else l=O(c),e=d.Xa(l,b.u()),null!=e&&(k=a.I.G(b.D.j(),l,e,g,f));e=!0}else if(b.D.$||c.e())k=e,e=b.D.j(),e.N()||e.U(M,function(c){var e=d.Xa(c,b.u());null!=e&&(k=a.I.G(k,c,e,g,f))}),e=b.D.$;else{l=O(c);if(1==uc(c)||rb(b.D,l))c=d.Xa(l,b.u()),null!=c&&(k=a.I.G(e,l,c,
g,f));e=!1}return Fd(b,k,e,a.I.Ga())};function Od(){}var Pd={};function ud(a){return q(a.compare,a)}Od.prototype.xd=function(a,b){return 0!==this.compare(new E("[MIN_NAME]",a),new E("[MIN_NAME]",b))};Od.prototype.Sc=function(){return Qd};function Rd(a){this.bc=a}ma(Rd,Od);h=Rd.prototype;h.Hc=function(a){return!a.M(this.bc).e()};h.compare=function(a,b){var c=a.S.M(this.bc),d=b.S.M(this.bc),c=c.Cc(d);return 0===c?Sb(a.name,b.name):c};h.Oc=function(a,b){var c=L(a),c=C.Q(this.bc,c);return new E(b,c)};
h.Pc=function(){var a=C.Q(this.bc,Sd);return new E("[MAX_NAME]",a)};h.toString=function(){return this.bc};function Td(){}ma(Td,Od);h=Td.prototype;h.compare=function(a,b){var c=a.S.A(),d=b.S.A(),c=c.Cc(d);return 0===c?Sb(a.name,b.name):c};h.Hc=function(a){return!a.A().e()};h.xd=function(a,b){return!a.A().Z(b.A())};h.Sc=function(){return Qd};h.Pc=function(){return new E("[MAX_NAME]",new tc("[PRIORITY-POST]",Sd))};h.Oc=function(a,b){var c=L(a);return new E(b,new tc("[PRIORITY-POST]",c))};
h.toString=function(){return".priority"};var M=new Td;function Ud(){}ma(Ud,Od);h=Ud.prototype;h.compare=function(a,b){return Sb(a.name,b.name)};h.Hc=function(){throw Hc("KeyIndex.isDefinedOn not expected to be called.");};h.xd=function(){return!1};h.Sc=function(){return Qd};h.Pc=function(){return new E("[MAX_NAME]",C)};h.Oc=function(a){J(p(a),"KeyIndex indexValue must always be a string.");return new E(a,C)};h.toString=function(){return".key"};var Vd=new Ud;function Wd(){}ma(Wd,Od);h=Wd.prototype;
h.compare=function(a,b){var c=a.S.Cc(b.S);return 0===c?Sb(a.name,b.name):c};h.Hc=function(){return!0};h.xd=function(a,b){return!a.Z(b)};h.Sc=function(){return Qd};h.Pc=function(){return Xd};h.Oc=function(a,b){var c=L(a);return new E(b,c)};h.toString=function(){return".value"};var Yd=new Wd;function Zd(){this.Rb=this.na=this.Lb=this.la=this.ia=!1;this.ja=0;this.Nb="";this.dc=null;this.xb="";this.ac=null;this.vb="";this.g=M}var $d=new Zd;function sd(a){return""===a.Nb?a.la:"l"===a.Nb}function od(a){J(a.la,"Only valid if start has been set");return a.dc}function nd(a){J(a.la,"Only valid if start has been set");return a.Lb?a.xb:"[MIN_NAME]"}function qd(a){J(a.na,"Only valid if end has been set");return a.ac}
function pd(a){J(a.na,"Only valid if end has been set");return a.Rb?a.vb:"[MAX_NAME]"}function ae(a){var b=new Zd;b.ia=a.ia;b.ja=a.ja;b.la=a.la;b.dc=a.dc;b.Lb=a.Lb;b.xb=a.xb;b.na=a.na;b.ac=a.ac;b.Rb=a.Rb;b.vb=a.vb;b.g=a.g;return b}h=Zd.prototype;h.Ge=function(a){var b=ae(this);b.ia=!0;b.ja=a;b.Nb="";return b};h.He=function(a){var b=ae(this);b.ia=!0;b.ja=a;b.Nb="l";return b};h.Ie=function(a){var b=ae(this);b.ia=!0;b.ja=a;b.Nb="r";return b};
h.Xd=function(a,b){var c=ae(this);c.la=!0;n(a)||(a=null);c.dc=a;null!=b?(c.Lb=!0,c.xb=b):(c.Lb=!1,c.xb="");return c};h.qd=function(a,b){var c=ae(this);c.na=!0;n(a)||(a=null);c.ac=a;n(b)?(c.Rb=!0,c.vb=b):(c.Yg=!1,c.vb="");return c};function be(a,b){var c=ae(a);c.g=b;return c}function ce(a){var b={};a.la&&(b.sp=a.dc,a.Lb&&(b.sn=a.xb));a.na&&(b.ep=a.ac,a.Rb&&(b.en=a.vb));if(a.ia){b.l=a.ja;var c=a.Nb;""===c&&(c=sd(a)?"l":"r");b.vf=c}a.g!==M&&(b.i=a.g.toString());return b}
function de(a){return!(a.la||a.na||a.ia)}function ee(a){var b={};if(de(a)&&a.g==M)return b;var c;a.g===M?c="$priority":a.g===Yd?c="$value":a.g===Vd?c="$key":(J(a.g instanceof Rd,"Unrecognized index type!"),c=a.g.toString());b.orderBy=B(c);a.la&&(b.startAt=B(a.dc),a.Lb&&(b.startAt+=","+B(a.xb)));a.na&&(b.endAt=B(a.ac),a.Rb&&(b.endAt+=","+B(a.vb)));a.ia&&(sd(a)?b.limitToFirst=a.ja:b.limitToLast=a.ja);return b}h.toString=function(){return B(ce(this))};function fe(a,b){this.yd=a;this.cc=b}fe.prototype.get=function(a){var b=w(this.yd,a);if(!b)throw Error("No index defined for "+a);return b===Pd?null:b};function ge(a,b,c){var d=na(a.yd,function(d,f){var g=w(a.cc,f);J(g,"Missing index implementation for "+f);if(d===Pd){if(g.Hc(b.S)){for(var k=[],l=c.Wb(Qb),m=H(l);m;)m.name!=b.name&&k.push(m),m=H(l);k.push(b);return he(k,ud(g))}return Pd}g=c.get(b.name);k=d;g&&(k=k.remove(new E(b.name,g)));return k.Na(b,b.S)});return new fe(d,a.cc)}
function ie(a,b,c){var d=na(a.yd,function(a){if(a===Pd)return a;var d=c.get(b.name);return d?a.remove(new E(b.name,d)):a});return new fe(d,a.cc)}var je=new fe({".priority":Pd},{".priority":M});function tc(a,b){this.C=a;J(n(this.C)&&null!==this.C,"LeafNode shouldn't be created with null/undefined value.");this.ba=b||C;ke(this.ba);this.Bb=null}h=tc.prototype;h.N=function(){return!0};h.A=function(){return this.ba};h.da=function(a){return new tc(this.C,a)};h.M=function(a){return".priority"===a?this.ba:C};h.oa=function(a){return a.e()?this:".priority"===O(a)?this.ba:C};h.Ha=function(){return!1};h.qf=function(){return null};
h.Q=function(a,b){return".priority"===a?this.da(b):b.e()&&".priority"!==a?this:C.Q(a,b).da(this.ba)};h.G=function(a,b){var c=O(a);if(null===c)return b;if(b.e()&&".priority"!==c)return this;J(".priority"!==c||1===uc(a),".priority must be the last token in a path");return this.Q(c,C.G(G(a),b))};h.e=function(){return!1};h.Db=function(){return 0};h.K=function(a){return a&&!this.A().e()?{".value":this.Ba(),".priority":this.A().K()}:this.Ba()};
h.hash=function(){if(null===this.Bb){var a="";this.ba.e()||(a+="priority:"+le(this.ba.K())+":");var b=typeof this.C,a=a+(b+":"),a="number"===b?a+Zc(this.C):a+this.C;this.Bb=Jc(a)}return this.Bb};h.Ba=function(){return this.C};h.Cc=function(a){if(a===C)return 1;if(a instanceof T)return-1;J(a.N(),"Unknown node type");var b=typeof a.C,c=typeof this.C,d=Na(me,b),e=Na(me,c);J(0<=d,"Unknown leaf type: "+b);J(0<=e,"Unknown leaf type: "+c);return d===e?"object"===c?0:this.C<a.C?-1:this.C===a.C?0:1:e-d};
var me=["object","boolean","number","string"];tc.prototype.mb=function(){return this};tc.prototype.Ic=function(){return!0};tc.prototype.Z=function(a){return a===this?!0:a.N()?this.C===a.C&&this.ba.Z(a.ba):!1};tc.prototype.toString=function(){return B(this.K(!0))};function T(a,b,c){this.m=a;(this.ba=b)&&ke(this.ba);a.e()&&J(!this.ba||this.ba.e(),"An empty node cannot have a priority");this.wb=c;this.Bb=null}h=T.prototype;h.N=function(){return!1};h.A=function(){return this.ba||C};h.da=function(a){return this.m.e()?this:new T(this.m,a,this.wb)};h.M=function(a){if(".priority"===a)return this.A();a=this.m.get(a);return null===a?C:a};h.oa=function(a){var b=O(a);return null===b?this:this.M(b).oa(G(a))};h.Ha=function(a){return null!==this.m.get(a)};
h.Q=function(a,b){J(b,"We should always be passing snapshot nodes");if(".priority"===a)return this.da(b);var c=new E(a,b),d,e;b.e()?(d=this.m.remove(a),c=ie(this.wb,c,this.m)):(d=this.m.Na(a,b),c=ge(this.wb,c,this.m));e=d.e()?C:this.ba;return new T(d,e,c)};h.G=function(a,b){var c=O(a);if(null===c)return b;J(".priority"!==O(a)||1===uc(a),".priority must be the last token in a path");var d=this.M(c).G(G(a),b);return this.Q(c,d)};h.e=function(){return this.m.e()};h.Db=function(){return this.m.count()};
var ne=/^(0|[1-9]\d*)$/;h=T.prototype;h.K=function(a){if(this.e())return null;var b={},c=0,d=0,e=!0;this.U(M,function(f,g){b[f]=g.K(a);c++;e&&ne.test(f)?d=Math.max(d,Number(f)):e=!1});if(!a&&e&&d<2*c){var f=[],g;for(g in b)f[g]=b[g];return f}a&&!this.A().e()&&(b[".priority"]=this.A().K());return b};h.hash=function(){if(null===this.Bb){var a="";this.A().e()||(a+="priority:"+le(this.A().K())+":");this.U(M,function(b,c){var d=c.hash();""!==d&&(a+=":"+b+":"+d)});this.Bb=""===a?"":Jc(a)}return this.Bb};
h.qf=function(a,b,c){return(c=oe(this,c))?(a=cc(c,new E(a,b)))?a.name:null:cc(this.m,a)};function wd(a,b){var c;c=(c=oe(a,b))?(c=c.Rc())&&c.name:a.m.Rc();return c?new E(c,a.m.get(c)):null}function xd(a,b){var c;c=(c=oe(a,b))?(c=c.ec())&&c.name:a.m.ec();return c?new E(c,a.m.get(c)):null}h.U=function(a,b){var c=oe(this,a);return c?c.ha(function(a){return b(a.name,a.S)}):this.m.ha(b)};h.Wb=function(a){return this.Xb(a.Sc(),a)};
h.Xb=function(a,b){var c=oe(this,b);if(c)return c.Xb(a,function(a){return a});for(var c=this.m.Xb(a.name,Qb),d=ec(c);null!=d&&0>b.compare(d,a);)H(c),d=ec(c);return c};h.rf=function(a){return this.Zb(a.Pc(),a)};h.Zb=function(a,b){var c=oe(this,b);if(c)return c.Zb(a,function(a){return a});for(var c=this.m.Zb(a.name,Qb),d=ec(c);null!=d&&0<b.compare(d,a);)H(c),d=ec(c);return c};h.Cc=function(a){return this.e()?a.e()?0:-1:a.N()||a.e()?1:a===Sd?-1:0};
h.mb=function(a){if(a===Vd||ta(this.wb.cc,a.toString()))return this;var b=this.wb,c=this.m;J(a!==Vd,"KeyIndex always exists and isn't meant to be added to the IndexMap.");for(var d=[],e=!1,c=c.Wb(Qb),f=H(c);f;)e=e||a.Hc(f.S),d.push(f),f=H(c);d=e?he(d,ud(a)):Pd;e=a.toString();c=xa(b.cc);c[e]=a;a=xa(b.yd);a[e]=d;return new T(this.m,this.ba,new fe(a,c))};h.Ic=function(a){return a===Vd||ta(this.wb.cc,a.toString())};
h.Z=function(a){if(a===this)return!0;if(a.N())return!1;if(this.A().Z(a.A())&&this.m.count()===a.m.count()){var b=this.Wb(M);a=a.Wb(M);for(var c=H(b),d=H(a);c&&d;){if(c.name!==d.name||!c.S.Z(d.S))return!1;c=H(b);d=H(a)}return null===c&&null===d}return!1};function oe(a,b){return b===Vd?null:a.wb.get(b.toString())}h.toString=function(){return B(this.K(!0))};function L(a,b){if(null===a)return C;var c=null;"object"===typeof a&&".priority"in a?c=a[".priority"]:"undefined"!==typeof b&&(c=b);J(null===c||"string"===typeof c||"number"===typeof c||"object"===typeof c&&".sv"in c,"Invalid priority type found: "+typeof c);"object"===typeof a&&".value"in a&&null!==a[".value"]&&(a=a[".value"]);if("object"!==typeof a||".sv"in a)return new tc(a,L(c));if(a instanceof Array){var d=C,e=a;r(e,function(a,b){if(u(e,b)&&"."!==b.substring(0,1)){var c=L(a);if(c.N()||!c.e())d=
d.Q(b,c)}});return d.da(L(c))}var f=[],g=!1,k=a;hb(k,function(a){if("string"!==typeof a||"."!==a.substring(0,1)){var b=L(k[a]);b.e()||(g=g||!b.A().e(),f.push(new E(a,b)))}});if(0==f.length)return C;var l=he(f,Rb,function(a){return a.name},Tb);if(g){var m=he(f,ud(M));return new T(l,L(c),new fe({".priority":m},{".priority":M}))}return new T(l,L(c),je)}var pe=Math.log(2);
function qe(a){this.count=parseInt(Math.log(a+1)/pe,10);this.hf=this.count-1;this.bg=a+1&parseInt(Array(this.count+1).join("1"),2)}function re(a){var b=!(a.bg&1<<a.hf);a.hf--;return b}
function he(a,b,c,d){function e(b,d){var f=d-b;if(0==f)return null;if(1==f){var m=a[b],v=c?c(m):m;return new fc(v,m.S,!1,null,null)}var m=parseInt(f/2,10)+b,f=e(b,m),y=e(m+1,d),m=a[m],v=c?c(m):m;return new fc(v,m.S,!1,f,y)}a.sort(b);var f=function(b){function d(b,g){var k=v-b,y=v;v-=b;var y=e(k+1,y),k=a[k],I=c?c(k):k,y=new fc(I,k.S,g,null,y);f?f.left=y:m=y;f=y}for(var f=null,m=null,v=a.length,y=0;y<b.count;++y){var I=re(b),vd=Math.pow(2,b.count-(y+1));I?d(vd,!1):(d(vd,!1),d(vd,!0))}return m}(new qe(a.length));
return null!==f?new ac(d||b,f):new ac(d||b)}function le(a){return"number"===typeof a?"number:"+Zc(a):"string:"+a}function ke(a){if(a.N()){var b=a.K();J("string"===typeof b||"number"===typeof b||"object"===typeof b&&u(b,".sv"),"Priority must be a string or number.")}else J(a===Sd||a.e(),"priority of unexpected type.");J(a===Sd||a.A().e(),"Priority nodes can't have a priority of their own.")}var C=new T(new ac(Tb),null,je);function se(){T.call(this,new ac(Tb),C,je)}ma(se,T);h=se.prototype;
h.Cc=function(a){return a===this?0:1};h.Z=function(a){return a===this};h.A=function(){return this};h.M=function(){return C};h.e=function(){return!1};var Sd=new se,Qd=new E("[MIN_NAME]",C),Xd=new E("[MAX_NAME]",Sd);function Id(a,b){this.D=a;this.Ud=b}function Fd(a,b,c,d){return new Id(new sb(b,c,d),a.Ud)}function Jd(a){return a.D.$?a.D.j():null}Id.prototype.u=function(){return this.Ud};function tb(a){return a.Ud.$?a.Ud.j():null};function te(a,b){this.V=a;var c=a.o,d=new ld(c.g),c=de(c)?new ld(c.g):c.ia?new rd(c):new md(c);this.Gf=new zd(c);var e=b.u(),f=b.D,g=d.ta(C,e.j(),null),k=c.ta(C,f.j(),null);this.Ka=new Id(new sb(k,f.$,c.Ga()),new sb(g,e.$,d.Ga()));this.Za=[];this.ig=new dd(a)}function ue(a){return a.V}h=te.prototype;h.u=function(){return this.Ka.u().j()};h.hb=function(a){var b=tb(this.Ka);return b&&(de(this.V.o)||!a.e()&&!b.M(O(a)).e())?b.oa(a):null};h.e=function(){return 0===this.Za.length};h.Ob=function(a){this.Za.push(a)};
h.kb=function(a,b){var c=[];if(b){J(null==a,"A cancel should cancel all event registrations.");var d=this.V.path;Oa(this.Za,function(a){(a=a.ff(b,d))&&c.push(a)})}if(a){for(var e=[],f=0;f<this.Za.length;++f){var g=this.Za[f];if(!g.matches(a))e.push(g);else if(a.sf()){e=e.concat(this.Za.slice(f+1));break}}this.Za=e}else this.Za=[];return c};
h.bb=function(a,b,c){a.type===Cd&&null!==a.source.Ib&&(J(tb(this.Ka),"We should always have a full cache before handling merges"),J(Jd(this.Ka),"Missing event cache, even though we have a server cache"));var d=this.Ka;a=this.Gf.bb(d,a,b,c);b=this.Gf;c=a.he;J(c.D.j().Ic(b.I.g),"Event snap not indexed");J(c.u().j().Ic(b.I.g),"Server snap not indexed");J(Hb(a.he.u())||!Hb(d.u()),"Once a server snap is complete, it should never go back");this.Ka=a.he;return ve(this,a.cg,a.he.D.j(),null)};
function we(a,b){var c=a.Ka.D,d=[];c.j().N()||c.j().U(M,function(a,b){d.push(new D("child_added",b,a))});c.$&&d.push(Db(c.j()));return ve(a,d,c.j(),b)}function ve(a,b,c,d){return ed(a.ig,b,c,d?[d]:a.Za)};function xe(a,b,c){this.type=Cd;this.source=a;this.path=b;this.children=c}xe.prototype.Wc=function(a){if(this.path.e())return a=this.children.subtree(new K(a)),a.e()?null:a.value?new Ub(this.source,F,a.value):new xe(this.source,F,a);J(O(this.path)===a,"Can't get a merge for a child not on the path of the operation");return new xe(this.source,G(this.path),this.children)};xe.prototype.toString=function(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"};var Vb=0,Cd=1,Xb=2,$b=3;function ye(a,b,c,d){this.ve=a;this.of=b;this.Ib=c;this.af=d;J(!d||b,"Tagged queries must be from server.")}var Yb=new ye(!0,!1,null,!1),ze=new ye(!1,!0,null,!1);ye.prototype.toString=function(){return this.ve?"user":this.af?"server(queryID="+this.Ib+")":"server"};function Ae(a,b){this.f=Oc("p:rest:");this.H=a;this.Gb=b;this.Fa=null;this.aa={}}function Be(a,b){if(n(b))return"tag$"+b;var c=a.o;J(de(c)&&c.g==M,"should have a tag if it's not a default query.");return a.path.toString()}h=Ae.prototype;
h.xf=function(a,b,c,d){var e=a.path.toString();this.f("Listen called for "+e+" "+a.wa());var f=Be(a,c),g={};this.aa[f]=g;a=ee(a.o);var k=this;Ce(this,e+".json",a,function(a,b){var v=b;404===a&&(a=v=null);null===a&&k.Gb(e,v,!1,c);w(k.aa,f)===g&&d(a?401==a?"permission_denied":"rest_error:"+a:"ok",null)})};h.Of=function(a,b){var c=Be(a,b);delete this.aa[c]};h.P=function(a,b){this.Fa=a;var c=ad(a),d=c.data,c=c.Ac&&c.Ac.exp;b&&b("ok",{auth:d,expires:c})};h.ee=function(a){this.Fa=null;a("ok",null)};
h.Le=function(){};h.Bf=function(){};h.Gd=function(){};h.put=function(){};h.yf=function(){};h.Te=function(){};
function Ce(a,b,c,d){c=c||{};c.format="export";a.Fa&&(c.auth=a.Fa);var e=(a.H.lb?"https://":"http://")+a.H.host+b+"?"+jb(c);a.f("Sending REST request for "+e);var f=new XMLHttpRequest;f.onreadystatechange=function(){if(d&&4===f.readyState){a.f("REST Response for "+e+" received. status:",f.status,"response:",f.responseText);var b=null;if(200<=f.status&&300>f.status){try{b=mb(f.responseText)}catch(c){Q("Failed to parse JSON response for "+e+": "+f.responseText)}d(null,b)}else 401!==f.status&&404!==
f.status&&Q("Got unsuccessful REST response for "+e+" Status: "+f.status),d(f.status);d=null}};f.open("GET",e,!0);f.send()};function De(a,b){this.value=a;this.children=b||Ee}var Ee=new ac(function(a,b){return a===b?0:a<b?-1:1});function Fe(a){var b=Nd;r(a,function(a,d){b=b.set(new K(d),a)});return b}h=De.prototype;h.e=function(){return null===this.value&&this.children.e()};function Ge(a,b,c){if(null!=a.value&&c(a.value))return{path:F,value:a.value};if(b.e())return null;var d=O(b);a=a.children.get(d);return null!==a?(b=Ge(a,G(b),c),null!=b?{path:(new K(d)).w(b.path),value:b.value}:null):null}
function He(a,b){return Ge(a,b,function(){return!0})}h.subtree=function(a){if(a.e())return this;var b=this.children.get(O(a));return null!==b?b.subtree(G(a)):Nd};h.set=function(a,b){if(a.e())return new De(b,this.children);var c=O(a),d=(this.children.get(c)||Nd).set(G(a),b),c=this.children.Na(c,d);return new De(this.value,c)};
h.remove=function(a){if(a.e())return this.children.e()?Nd:new De(null,this.children);var b=O(a),c=this.children.get(b);return c?(a=c.remove(G(a)),b=a.e()?this.children.remove(b):this.children.Na(b,a),null===this.value&&b.e()?Nd:new De(this.value,b)):this};h.get=function(a){if(a.e())return this.value;var b=this.children.get(O(a));return b?b.get(G(a)):null};
function Md(a,b,c){if(b.e())return c;var d=O(b);b=Md(a.children.get(d)||Nd,G(b),c);d=b.e()?a.children.remove(d):a.children.Na(d,b);return new De(a.value,d)}function Ie(a,b){return Je(a,F,b)}function Je(a,b,c){var d={};a.children.ha(function(a,f){d[a]=Je(f,b.w(a),c)});return c(b,a.value,d)}function Ke(a,b,c){return Le(a,b,F,c)}function Le(a,b,c,d){var e=a.value?d(c,a.value):!1;if(e)return e;if(b.e())return null;e=O(b);return(a=a.children.get(e))?Le(a,G(b),c.w(e),d):null}
function Me(a,b,c){var d=F;if(!b.e()){var e=!0;a.value&&(e=c(d,a.value));!0===e&&(e=O(b),(a=a.children.get(e))&&Ne(a,G(b),d.w(e),c))}}function Ne(a,b,c,d){if(b.e())return a;a.value&&d(c,a.value);var e=O(b);return(a=a.children.get(e))?Ne(a,G(b),c.w(e),d):Nd}function Kd(a,b){Oe(a,F,b)}function Oe(a,b,c){a.children.ha(function(a,e){Oe(e,b.w(a),c)});a.value&&c(b,a.value)}function Pe(a,b){a.children.ha(function(a,d){d.value&&b(a,d.value)})}var Nd=new De(null);
De.prototype.toString=function(){var a={};Kd(this,function(b,c){a[b.toString()]=c.toString()});return B(a)};function Qe(a){this.W=a}var Re=new Qe(new De(null));function Se(a,b,c){if(b.e())return new Qe(new De(c));var d=He(a.W,b);if(null!=d){var e=d.path,d=d.value;b=N(e,b);d=d.G(b,c);return new Qe(a.W.set(e,d))}a=Md(a.W,b,new De(c));return new Qe(a)}function Te(a,b,c){var d=a;hb(c,function(a,c){d=Se(d,b.w(a),c)});return d}Qe.prototype.Od=function(a){if(a.e())return Re;a=Md(this.W,a,Nd);return new Qe(a)};function Ue(a,b){var c=He(a.W,b);return null!=c?a.W.get(c.path).oa(N(c.path,b)):null}
function Ve(a){var b=[],c=a.W.value;null!=c?c.N()||c.U(M,function(a,c){b.push(new E(a,c))}):a.W.children.ha(function(a,c){null!=c.value&&b.push(new E(a,c.value))});return b}function We(a,b){if(b.e())return a;var c=Ue(a,b);return null!=c?new Qe(new De(c)):new Qe(a.W.subtree(b))}Qe.prototype.e=function(){return this.W.e()};Qe.prototype.apply=function(a){return Xe(F,this.W,a)};
function Xe(a,b,c){if(null!=b.value)return c.G(a,b.value);var d=null;b.children.ha(function(b,f){".priority"===b?(J(null!==f.value,"Priority writes must always be leaf nodes"),d=f.value):c=Xe(a.w(b),f,c)});c.oa(a).e()||null===d||(c=c.G(a.w(".priority"),d));return c};function Ye(){this.T=Re;this.za=[];this.Lc=-1}h=Ye.prototype;
h.Od=function(a){var b=Ua(this.za,function(b){return b.ie===a});J(0<=b,"removeWrite called with nonexistent writeId.");var c=this.za[b];this.za.splice(b,1);for(var d=c.visible,e=!1,f=this.za.length-1;d&&0<=f;){var g=this.za[f];g.visible&&(f>=b&&Ze(g,c.path)?d=!1:c.path.contains(g.path)&&(e=!0));f--}if(d){if(e)this.T=$e(this.za,af,F),this.Lc=0<this.za.length?this.za[this.za.length-1].ie:-1;else if(c.Ia)this.T=this.T.Od(c.path);else{var k=this;r(c.children,function(a,b){k.T=k.T.Od(c.path.w(b))})}return c.path}return null};
h.ua=function(a,b,c,d){if(c||d){var e=We(this.T,a);return!d&&e.e()?b:d||null!=b||null!=Ue(e,F)?(e=$e(this.za,function(b){return(b.visible||d)&&(!c||!(0<=Na(c,b.ie)))&&(b.path.contains(a)||a.contains(b.path))},a),b=b||C,e.apply(b)):null}e=Ue(this.T,a);if(null!=e)return e;e=We(this.T,a);return e.e()?b:null!=b||null!=Ue(e,F)?(b=b||C,e.apply(b)):null};
h.xc=function(a,b){var c=C,d=Ue(this.T,a);if(d)d.N()||d.U(M,function(a,b){c=c.Q(a,b)});else if(b){var e=We(this.T,a);b.U(M,function(a,b){var d=We(e,new K(a)).apply(b);c=c.Q(a,d)});Oa(Ve(e),function(a){c=c.Q(a.name,a.S)})}else e=We(this.T,a),Oa(Ve(e),function(a){c=c.Q(a.name,a.S)});return c};h.hd=function(a,b,c,d){J(c||d,"Either existingEventSnap or existingServerSnap must exist");a=a.w(b);if(null!=Ue(this.T,a))return null;a=We(this.T,a);return a.e()?d.oa(b):a.apply(d.oa(b))};
h.Xa=function(a,b,c){a=a.w(b);var d=Ue(this.T,a);return null!=d?d:rb(c,b)?We(this.T,a).apply(c.j().M(b)):null};h.sc=function(a){return Ue(this.T,a)};h.me=function(a,b,c,d,e,f){var g;a=We(this.T,a);g=Ue(a,F);if(null==g)if(null!=b)g=a.apply(b);else return[];g=g.mb(f);if(g.e()||g.N())return[];b=[];a=ud(f);e=e?g.Zb(c,f):g.Xb(c,f);for(f=H(e);f&&b.length<d;)0!==a(f,c)&&b.push(f),f=H(e);return b};
function Ze(a,b){return a.Ia?a.path.contains(b):!!ua(a.children,function(c,d){return a.path.w(d).contains(b)})}function af(a){return a.visible}
function $e(a,b,c){for(var d=Re,e=0;e<a.length;++e){var f=a[e];if(b(f)){var g=f.path;if(f.Ia)c.contains(g)?(g=N(c,g),d=Se(d,g,f.Ia)):g.contains(c)&&(g=N(g,c),d=Se(d,F,f.Ia.oa(g)));else if(f.children)if(c.contains(g))g=N(c,g),d=Te(d,g,f.children);else{if(g.contains(c))if(g=N(g,c),g.e())d=Te(d,F,f.children);else if(f=w(f.children,O(g)))f=f.oa(G(g)),d=Se(d,F,f)}else throw Hc("WriteRecord should have .snap or .children");}}return d}function bf(a,b){this.Mb=a;this.W=b}h=bf.prototype;
h.ua=function(a,b,c){return this.W.ua(this.Mb,a,b,c)};h.xc=function(a){return this.W.xc(this.Mb,a)};h.hd=function(a,b,c){return this.W.hd(this.Mb,a,b,c)};h.sc=function(a){return this.W.sc(this.Mb.w(a))};h.me=function(a,b,c,d,e){return this.W.me(this.Mb,a,b,c,d,e)};h.Xa=function(a,b){return this.W.Xa(this.Mb,a,b)};h.w=function(a){return new bf(this.Mb.w(a),this.W)};function cf(){this.ya={}}h=cf.prototype;h.e=function(){return wa(this.ya)};h.bb=function(a,b,c){var d=a.source.Ib;if(null!==d)return d=w(this.ya,d),J(null!=d,"SyncTree gave us an op for an invalid query."),d.bb(a,b,c);var e=[];r(this.ya,function(d){e=e.concat(d.bb(a,b,c))});return e};h.Ob=function(a,b,c,d,e){var f=a.wa(),g=w(this.ya,f);if(!g){var g=c.ua(e?d:null),k=!1;g?k=!0:(g=d instanceof T?c.xc(d):C,k=!1);g=new te(a,new Id(new sb(g,k,!1),new sb(d,e,!1)));this.ya[f]=g}g.Ob(b);return we(g,b)};
h.kb=function(a,b,c){var d=a.wa(),e=[],f=[],g=null!=df(this);if("default"===d){var k=this;r(this.ya,function(a,d){f=f.concat(a.kb(b,c));a.e()&&(delete k.ya[d],de(a.V.o)||e.push(a.V))})}else{var l=w(this.ya,d);l&&(f=f.concat(l.kb(b,c)),l.e()&&(delete this.ya[d],de(l.V.o)||e.push(l.V)))}g&&null==df(this)&&e.push(new U(a.k,a.path));return{Hg:e,jg:f}};function ef(a){return Pa(ra(a.ya),function(a){return!de(a.V.o)})}h.hb=function(a){var b=null;r(this.ya,function(c){b=b||c.hb(a)});return b};
function ff(a,b){if(de(b.o))return df(a);var c=b.wa();return w(a.ya,c)}function df(a){return va(a.ya,function(a){return de(a.V.o)})||null};function gf(a){this.sa=Nd;this.Hb=new Ye;this.$e={};this.kc={};this.Mc=a}function hf(a,b,c,d,e){var f=a.Hb,g=e;J(d>f.Lc,"Stacking an older write on top of newer ones");n(g)||(g=!0);f.za.push({path:b,Ia:c,ie:d,visible:g});g&&(f.T=Se(f.T,b,c));f.Lc=d;return e?jf(a,new Ub(Yb,b,c)):[]}function kf(a,b,c,d){var e=a.Hb;J(d>e.Lc,"Stacking an older merge on top of newer ones");e.za.push({path:b,children:c,ie:d,visible:!0});e.T=Te(e.T,b,c);e.Lc=d;c=Fe(c);return jf(a,new xe(Yb,b,c))}
function lf(a,b,c){c=c||!1;b=a.Hb.Od(b);return null==b?[]:jf(a,new Wb(b,c))}function mf(a,b,c){c=Fe(c);return jf(a,new xe(ze,b,c))}function nf(a,b,c,d){d=of(a,d);if(null!=d){var e=pf(d);d=e.path;e=e.Ib;b=N(d,b);c=new Ub(new ye(!1,!0,e,!0),b,c);return qf(a,d,c)}return[]}function rf(a,b,c,d){if(d=of(a,d)){var e=pf(d);d=e.path;e=e.Ib;b=N(d,b);c=Fe(c);c=new xe(new ye(!1,!0,e,!0),b,c);return qf(a,d,c)}return[]}
gf.prototype.Ob=function(a,b){var c=a.path,d=null,e=!1;Me(this.sa,c,function(a,b){var f=N(a,c);d=b.hb(f);e=e||null!=df(b);return!d});var f=this.sa.get(c);f?(e=e||null!=df(f),d=d||f.hb(F)):(f=new cf,this.sa=this.sa.set(c,f));var g;null!=d?g=!0:(g=!1,d=C,Pe(this.sa.subtree(c),function(a,b){var c=b.hb(F);c&&(d=d.Q(a,c))}));var k=null!=ff(f,a);if(!k&&!de(a.o)){var l=sf(a);J(!(l in this.kc),"View does not exist, but we have a tag");var m=tf++;this.kc[l]=m;this.$e["_"+m]=l}g=f.Ob(a,b,new bf(c,this.Hb),
d,g);k||e||(f=ff(f,a),g=g.concat(uf(this,a,f)));return g};
gf.prototype.kb=function(a,b,c){var d=a.path,e=this.sa.get(d),f=[];if(e&&("default"===a.wa()||null!=ff(e,a))){f=e.kb(a,b,c);e.e()&&(this.sa=this.sa.remove(d));e=f.Hg;f=f.jg;b=-1!==Ua(e,function(a){return de(a.o)});var g=Ke(this.sa,d,function(a,b){return null!=df(b)});if(b&&!g&&(d=this.sa.subtree(d),!d.e()))for(var d=vf(d),k=0;k<d.length;++k){var l=d[k],m=l.V,l=wf(this,l);this.Mc.Xe(m,xf(this,m),l.ud,l.J)}if(!g&&0<e.length&&!c)if(b)this.Mc.Zd(a,null);else{var v=this;Oa(e,function(a){a.wa();var b=v.kc[sf(a)];
v.Mc.Zd(a,b)})}yf(this,e)}return f};gf.prototype.ua=function(a,b){var c=this.Hb,d=Ke(this.sa,a,function(b,c){var d=N(b,a);if(d=c.hb(d))return d});return c.ua(a,d,b,!0)};function vf(a){return Ie(a,function(a,c,d){if(c&&null!=df(c))return[df(c)];var e=[];c&&(e=ef(c));r(d,function(a){e=e.concat(a)});return e})}function yf(a,b){for(var c=0;c<b.length;++c){var d=b[c];if(!de(d.o)){var d=sf(d),e=a.kc[d];delete a.kc[d];delete a.$e["_"+e]}}}
function uf(a,b,c){var d=b.path,e=xf(a,b);c=wf(a,c);b=a.Mc.Xe(b,e,c.ud,c.J);d=a.sa.subtree(d);if(e)J(null==df(d.value),"If we're adding a query, it shouldn't be shadowed");else for(e=Ie(d,function(a,b,c){if(!a.e()&&b&&null!=df(b))return[ue(df(b))];var d=[];b&&(d=d.concat(Qa(ef(b),function(a){return a.V})));r(c,function(a){d=d.concat(a)});return d}),d=0;d<e.length;++d)c=e[d],a.Mc.Zd(c,xf(a,c));return b}
function wf(a,b){var c=b.V,d=xf(a,c);return{ud:function(){return(b.u()||C).hash()},J:function(b){if("ok"===b){if(d){var f=c.path;if(b=of(a,d)){var g=pf(b);b=g.path;g=g.Ib;f=N(b,f);f=new Zb(new ye(!1,!0,g,!0),f);b=qf(a,b,f)}else b=[]}else b=jf(a,new Zb(ze,c.path));return b}f="Unknown Error";"too_big"===b?f="The data requested exceeds the maximum size that can be accessed with a single request.":"permission_denied"==b?f="Client doesn't have permission to access the desired data.":"unavailable"==b&&
(f="The service is unavailable");f=Error(b+": "+f);f.code=b.toUpperCase();return a.kb(c,null,f)}}}function sf(a){return a.path.toString()+"$"+a.wa()}function pf(a){var b=a.indexOf("$");J(-1!==b&&b<a.length-1,"Bad queryKey.");return{Ib:a.substr(b+1),path:new K(a.substr(0,b))}}function of(a,b){var c=a.$e,d="_"+b;return d in c?c[d]:void 0}function xf(a,b){var c=sf(b);return w(a.kc,c)}var tf=1;
function qf(a,b,c){var d=a.sa.get(b);J(d,"Missing sync point for query tag that we're tracking");return d.bb(c,new bf(b,a.Hb),null)}function jf(a,b){return zf(a,b,a.sa,null,new bf(F,a.Hb))}function zf(a,b,c,d,e){if(b.path.e())return Af(a,b,c,d,e);var f=c.get(F);null==d&&null!=f&&(d=f.hb(F));var g=[],k=O(b.path),l=b.Wc(k);if((c=c.children.get(k))&&l)var m=d?d.M(k):null,k=e.w(k),g=g.concat(zf(a,l,c,m,k));f&&(g=g.concat(f.bb(b,e,d)));return g}
function Af(a,b,c,d,e){var f=c.get(F);null==d&&null!=f&&(d=f.hb(F));var g=[];c.children.ha(function(c,f){var m=d?d.M(c):null,v=e.w(c),y=b.Wc(c);y&&(g=g.concat(Af(a,y,f,m,v)))});f&&(g=g.concat(f.bb(b,e,d)));return g};function Bf(){this.children={};this.kd=0;this.value=null}function Cf(a,b,c){this.Dd=a?a:"";this.Yc=b?b:null;this.B=c?c:new Bf}function Df(a,b){for(var c=b instanceof K?b:new K(b),d=a,e;null!==(e=O(c));)d=new Cf(e,d,w(d.B.children,e)||new Bf),c=G(c);return d}h=Cf.prototype;h.Ba=function(){return this.B.value};function Ef(a,b){J("undefined"!==typeof b,"Cannot set value to undefined");a.B.value=b;Ff(a)}h.clear=function(){this.B.value=null;this.B.children={};this.B.kd=0;Ff(this)};
h.td=function(){return 0<this.B.kd};h.e=function(){return null===this.Ba()&&!this.td()};h.U=function(a){var b=this;r(this.B.children,function(c,d){a(new Cf(d,b,c))})};function Gf(a,b,c,d){c&&!d&&b(a);a.U(function(a){Gf(a,b,!0,d)});c&&d&&b(a)}function Hf(a,b){for(var c=a.parent();null!==c&&!b(c);)c=c.parent()}h.path=function(){return new K(null===this.Yc?this.Dd:this.Yc.path()+"/"+this.Dd)};h.name=function(){return this.Dd};h.parent=function(){return this.Yc};
function Ff(a){if(null!==a.Yc){var b=a.Yc,c=a.Dd,d=a.e(),e=u(b.B.children,c);d&&e?(delete b.B.children[c],b.B.kd--,Ff(b)):d||e||(b.B.children[c]=a.B,b.B.kd++,Ff(b))}};function If(a){J(ea(a)&&0<a.length,"Requires a non-empty array");this.Uf=a;this.Nc={}}If.prototype.de=function(a,b){for(var c=this.Nc[a]||[],d=0;d<c.length;d++)c[d].yc.apply(c[d].Ma,Array.prototype.slice.call(arguments,1))};If.prototype.Eb=function(a,b,c){Jf(this,a);this.Nc[a]=this.Nc[a]||[];this.Nc[a].push({yc:b,Ma:c});(a=this.ze(a))&&b.apply(c,a)};If.prototype.gc=function(a,b,c){Jf(this,a);a=this.Nc[a]||[];for(var d=0;d<a.length;d++)if(a[d].yc===b&&(!c||c===a[d].Ma)){a.splice(d,1);break}};
function Jf(a,b){J(Ta(a.Uf,function(a){return a===b}),"Unknown event: "+b)};var Kf=function(){var a=0,b=[];return function(c){var d=c===a;a=c;for(var e=Array(8),f=7;0<=f;f--)e[f]="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz".charAt(c%64),c=Math.floor(c/64);J(0===c,"Cannot push at time == 0");c=e.join("");if(d){for(f=11;0<=f&&63===b[f];f--)b[f]=0;b[f]++}else for(f=0;12>f;f++)b[f]=Math.floor(64*Math.random());for(f=0;12>f;f++)c+="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz".charAt(b[f]);J(20===c.length,"nextPushId: Length should be 20.");
return c}}();function Lf(){If.call(this,["online"]);this.ic=!0;if("undefined"!==typeof window&&"undefined"!==typeof window.addEventListener){var a=this;window.addEventListener("online",function(){a.ic||(a.ic=!0,a.de("online",!0))},!1);window.addEventListener("offline",function(){a.ic&&(a.ic=!1,a.de("online",!1))},!1)}}ma(Lf,If);Lf.prototype.ze=function(a){J("online"===a,"Unknown event type: "+a);return[this.ic]};ca(Lf);function Mf(){If.call(this,["visible"]);var a,b;"undefined"!==typeof document&&"undefined"!==typeof document.addEventListener&&("undefined"!==typeof document.hidden?(b="visibilitychange",a="hidden"):"undefined"!==typeof document.mozHidden?(b="mozvisibilitychange",a="mozHidden"):"undefined"!==typeof document.msHidden?(b="msvisibilitychange",a="msHidden"):"undefined"!==typeof document.webkitHidden&&(b="webkitvisibilitychange",a="webkitHidden"));this.uc=!0;if(b){var c=this;document.addEventListener(b,
function(){var b=!document[a];b!==c.uc&&(c.uc=b,c.de("visible",b))},!1)}}ma(Mf,If);Mf.prototype.ze=function(a){J("visible"===a,"Unknown event type: "+a);return[this.uc]};ca(Mf);var Nf=/[\[\].#$\/\u0000-\u001F\u007F]/,Of=/[\[\].#$\u0000-\u001F\u007F]/;function Pf(a){return p(a)&&0!==a.length&&!Nf.test(a)}function Qf(a){return null===a||p(a)||ga(a)&&!Sc(a)||ia(a)&&u(a,".sv")}function Rf(a,b,c,d){d&&!n(b)||Sf(z(a,1,d),b,c)}
function Sf(a,b,c){c instanceof K&&(c=new wc(c,a));if(!n(b))throw Error(a+"contains undefined "+zc(c));if(ha(b))throw Error(a+"contains a function "+zc(c)+" with contents: "+b.toString());if(Sc(b))throw Error(a+"contains "+b.toString()+" "+zc(c));if(p(b)&&b.length>10485760/3&&10485760<xc(b))throw Error(a+"contains a string greater than 10485760 utf8 bytes "+zc(c)+" ('"+b.substring(0,50)+"...')");if(ia(b)){var d=!1,e=!1;hb(b,function(b,g){if(".value"===b)d=!0;else if(".priority"!==b&&".sv"!==b&&(e=
!0,!Pf(b)))throw Error(a+" contains an invalid key ("+b+") "+zc(c)+'.  Keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]"');c.push(b);Sf(a,g,c);c.pop()});if(d&&e)throw Error(a+' contains ".value" child '+zc(c)+" in addition to actual children.");}}
function Tf(a,b,c){if(!ia(b)||ea(b))throw Error(z(a,1,!1)+" must be an Object containing the children to replace.");if(u(b,".value"))throw Error(z(a,1,!1)+' must not contain ".value".  To overwrite with a leaf value, just use .set() instead.');Rf(a,b,c,!1)}
function Uf(a,b,c){if(Sc(c))throw Error(z(a,b,!1)+"is "+c.toString()+", but must be a valid Firebase priority (a string, finite number, server value, or null).");if(!Qf(c))throw Error(z(a,b,!1)+"must be a valid Firebase priority (a string, finite number, server value, or null).");}
function Vf(a,b,c){if(!c||n(b))switch(b){case "value":case "child_added":case "child_removed":case "child_changed":case "child_moved":break;default:throw Error(z(a,1,c)+'must be a valid event type: "value", "child_added", "child_removed", "child_changed", or "child_moved".');}}function Wf(a,b,c,d){if((!d||n(c))&&!Pf(c))throw Error(z(a,b,d)+'was an invalid key: "'+c+'".  Firebase keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]").');}
function Xf(a,b){if(!p(b)||0===b.length||Of.test(b))throw Error(z(a,1,!1)+'was an invalid path: "'+b+'". Paths must be non-empty strings and can\'t contain ".", "#", "$", "[", or "]"');}function Yf(a,b){if(".info"===O(b))throw Error(a+" failed: Can't modify data under /.info/");}function Zf(a,b){if(!p(b))throw Error(z(a,1,!1)+"must be a valid credential (a string).");}function $f(a,b,c){if(!p(c))throw Error(z(a,b,!1)+"must be a valid string.");}
function ag(a,b,c,d){if(!d||n(c))if(!ia(c)||null===c)throw Error(z(a,b,d)+"must be a valid object.");}function bg(a,b,c){if(!ia(b)||null===b||!u(b,c))throw Error(z(a,1,!1)+'must contain the key "'+c+'"');if(!p(w(b,c)))throw Error(z(a,1,!1)+'must contain the key "'+c+'" with type "string"');};function cg(){this.set={}}h=cg.prototype;h.add=function(a,b){this.set[a]=null!==b?b:!0};h.contains=function(a){return u(this.set,a)};h.get=function(a){return this.contains(a)?this.set[a]:void 0};h.remove=function(a){delete this.set[a]};h.clear=function(){this.set={}};h.e=function(){return wa(this.set)};h.count=function(){return pa(this.set)};function dg(a,b){r(a.set,function(a,d){b(d,a)})}h.keys=function(){var a=[];r(this.set,function(b,c){a.push(c)});return a};function qc(){this.m=this.C=null}qc.prototype.find=function(a){if(null!=this.C)return this.C.oa(a);if(a.e()||null==this.m)return null;var b=O(a);a=G(a);return this.m.contains(b)?this.m.get(b).find(a):null};qc.prototype.mc=function(a,b){if(a.e())this.C=b,this.m=null;else if(null!==this.C)this.C=this.C.G(a,b);else{null==this.m&&(this.m=new cg);var c=O(a);this.m.contains(c)||this.m.add(c,new qc);c=this.m.get(c);a=G(a);c.mc(a,b)}};
function eg(a,b){if(b.e())return a.C=null,a.m=null,!0;if(null!==a.C){if(a.C.N())return!1;var c=a.C;a.C=null;c.U(M,function(b,c){a.mc(new K(b),c)});return eg(a,b)}return null!==a.m?(c=O(b),b=G(b),a.m.contains(c)&&eg(a.m.get(c),b)&&a.m.remove(c),a.m.e()?(a.m=null,!0):!1):!0}function rc(a,b,c){null!==a.C?c(b,a.C):a.U(function(a,e){var f=new K(b.toString()+"/"+a);rc(e,f,c)})}qc.prototype.U=function(a){null!==this.m&&dg(this.m,function(b,c){a(b,c)})};var fg="auth.firebase.com";function gg(a,b,c){this.ld=a||{};this.ce=b||{};this.ab=c||{};this.ld.remember||(this.ld.remember="default")}var hg=["remember","redirectTo"];function ig(a){var b={},c={};hb(a||{},function(a,e){0<=Na(hg,a)?b[a]=e:c[a]=e});return new gg(b,{},c)};function jg(a,b){this.Pe=["session",a.Ld,a.Cb].join(":");this.$d=b}jg.prototype.set=function(a,b){if(!b)if(this.$d.length)b=this.$d[0];else throw Error("fb.login.SessionManager : No storage options available!");b.set(this.Pe,a)};jg.prototype.get=function(){var a=Qa(this.$d,q(this.ng,this)),a=Pa(a,function(a){return null!==a});Xa(a,function(a,c){return bd(c.token)-bd(a.token)});return 0<a.length?a.shift():null};jg.prototype.ng=function(a){try{var b=a.get(this.Pe);if(b&&b.token)return b}catch(c){}return null};
jg.prototype.clear=function(){var a=this;Oa(this.$d,function(b){b.remove(a.Pe)})};function kg(){return"undefined"!==typeof window&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(navigator.userAgent)}function lg(){return"undefined"!==typeof location&&/^file:\//.test(location.href)}
function mg(){if("undefined"===typeof navigator)return!1;var a=navigator.userAgent;if("Microsoft Internet Explorer"===navigator.appName){if((a=a.match(/MSIE ([0-9]{1,}[\.0-9]{0,})/))&&1<a.length)return 8<=parseFloat(a[1])}else if(-1<a.indexOf("Trident")&&(a=a.match(/rv:([0-9]{2,2}[\.0-9]{0,})/))&&1<a.length)return 8<=parseFloat(a[1]);return!1};function ng(){var a=window.opener.frames,b;for(b=a.length-1;0<=b;b--)try{if(a[b].location.protocol===window.location.protocol&&a[b].location.host===window.location.host&&"__winchan_relay_frame"===a[b].name)return a[b]}catch(c){}return null}function og(a,b,c){a.attachEvent?a.attachEvent("on"+b,c):a.addEventListener&&a.addEventListener(b,c,!1)}function pg(a,b,c){a.detachEvent?a.detachEvent("on"+b,c):a.removeEventListener&&a.removeEventListener(b,c,!1)}
function qg(a){/^https?:\/\//.test(a)||(a=window.location.href);var b=/^(https?:\/\/[\-_a-zA-Z\.0-9:]+)/.exec(a);return b?b[1]:a}function rg(a){var b="";try{a=a.replace("#","");var c=kb(a);c&&u(c,"__firebase_request_key")&&(b=w(c,"__firebase_request_key"))}catch(d){}return b}function sg(){var a=Rc(fg);return a.scheme+"://"+a.host+"/v2"}function tg(a){return sg()+"/"+a+"/auth/channel"};function ug(a){var b=this;this.zc=a;this.ae="*";mg()?this.Qc=this.wd=ng():(this.Qc=window.opener,this.wd=window);if(!b.Qc)throw"Unable to find relay frame";og(this.wd,"message",q(this.hc,this));og(this.wd,"message",q(this.Af,this));try{vg(this,{a:"ready"})}catch(c){og(this.Qc,"load",function(){vg(b,{a:"ready"})})}og(window,"unload",q(this.yg,this))}function vg(a,b){b=B(b);mg()?a.Qc.doPost(b,a.ae):a.Qc.postMessage(b,a.ae)}
ug.prototype.hc=function(a){var b=this,c;try{c=mb(a.data)}catch(d){}c&&"request"===c.a&&(pg(window,"message",this.hc),this.ae=a.origin,this.zc&&setTimeout(function(){b.zc(b.ae,c.d,function(a,c){b.ag=!c;b.zc=void 0;vg(b,{a:"response",d:a,forceKeepWindowOpen:c})})},0))};ug.prototype.yg=function(){try{pg(this.wd,"message",this.Af)}catch(a){}this.zc&&(vg(this,{a:"error",d:"unknown closed window"}),this.zc=void 0);try{window.close()}catch(b){}};ug.prototype.Af=function(a){if(this.ag&&"die"===a.data)try{window.close()}catch(b){}};function wg(a){this.oc=Ga()+Ga()+Ga();this.Df=a}wg.prototype.open=function(a,b){P.set("redirect_request_id",this.oc);P.set("redirect_request_id",this.oc);b.requestId=this.oc;b.redirectTo=b.redirectTo||window.location.href;a+=(/\?/.test(a)?"":"?")+jb(b);window.location=a};wg.isAvailable=function(){return!lg()&&!kg()};wg.prototype.Bc=function(){return"redirect"};var xg={NETWORK_ERROR:"Unable to contact the Firebase server.",SERVER_ERROR:"An unknown server error occurred.",TRANSPORT_UNAVAILABLE:"There are no login transports available for the requested method.",REQUEST_INTERRUPTED:"The browser redirected the page before the login request could complete.",USER_CANCELLED:"The user cancelled authentication."};function yg(a){var b=Error(w(xg,a),a);b.code=a;return b};function zg(a){if(!a.window_features||"undefined"!==typeof navigator&&(-1!==navigator.userAgent.indexOf("Fennec/")||-1!==navigator.userAgent.indexOf("Firefox/")&&-1!==navigator.userAgent.indexOf("Android")))a.window_features=void 0;a.window_name||(a.window_name="_blank");this.options=a}
zg.prototype.open=function(a,b,c){function d(a){g&&(document.body.removeChild(g),g=void 0);v&&(v=clearInterval(v));pg(window,"message",e);pg(window,"unload",d);if(m&&!a)try{m.close()}catch(b){k.postMessage("die",l)}m=k=void 0}function e(a){if(a.origin===l)try{var b=mb(a.data);"ready"===b.a?k.postMessage(y,l):"error"===b.a?(d(!1),c&&(c(b.d),c=null)):"response"===b.a&&(d(b.forceKeepWindowOpen),c&&(c(null,b.d),c=null))}catch(e){}}var f=mg(),g,k;if(!this.options.relay_url)return c(Error("invalid arguments: origin of url and relay_url must match"));
var l=qg(a);if(l!==qg(this.options.relay_url))c&&setTimeout(function(){c(Error("invalid arguments: origin of url and relay_url must match"))},0);else{f&&(g=document.createElement("iframe"),g.setAttribute("src",this.options.relay_url),g.style.display="none",g.setAttribute("name","__winchan_relay_frame"),document.body.appendChild(g),k=g.contentWindow);a+=(/\?/.test(a)?"":"?")+jb(b);var m=window.open(a,this.options.window_name,this.options.window_features);k||(k=m);var v=setInterval(function(){m&&m.closed&&
(d(!1),c&&(c(yg("USER_CANCELLED")),c=null))},500),y=B({a:"request",d:b});og(window,"unload",d);og(window,"message",e)}};
zg.isAvailable=function(){return"postMessage"in window&&!lg()&&!(kg()||"undefined"!==typeof navigator&&(navigator.userAgent.match(/Windows Phone/)||window.Windows&&/^ms-appx:/.test(location.href))||"undefined"!==typeof navigator&&"undefined"!==typeof window&&(navigator.userAgent.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i)||navigator.userAgent.match(/CriOS/)||navigator.userAgent.match(/Twitter for iPhone/)||navigator.userAgent.match(/FBAN\/FBIOS/)||window.navigator.standalone))&&!("undefined"!==
typeof navigator&&navigator.userAgent.match(/PhantomJS/))};zg.prototype.Bc=function(){return"popup"};function Ag(a){a.method||(a.method="GET");a.headers||(a.headers={});a.headers.content_type||(a.headers.content_type="application/json");a.headers.content_type=a.headers.content_type.toLowerCase();this.options=a}
Ag.prototype.open=function(a,b,c){function d(){c&&(c(yg("REQUEST_INTERRUPTED")),c=null)}var e=new XMLHttpRequest,f=this.options.method.toUpperCase(),g;og(window,"beforeunload",d);e.onreadystatechange=function(){if(c&&4===e.readyState){var a;if(200<=e.status&&300>e.status){try{a=mb(e.responseText)}catch(b){}c(null,a)}else 500<=e.status&&600>e.status?c(yg("SERVER_ERROR")):c(yg("NETWORK_ERROR"));c=null;pg(window,"beforeunload",d)}};if("GET"===f)a+=(/\?/.test(a)?"":"?")+jb(b),g=null;else{var k=this.options.headers.content_type;
"application/json"===k&&(g=B(b));"application/x-www-form-urlencoded"===k&&(g=jb(b))}e.open(f,a,!0);a={"X-Requested-With":"XMLHttpRequest",Accept:"application/json;text/plain"};za(a,this.options.headers);for(var l in a)e.setRequestHeader(l,a[l]);e.send(g)};Ag.isAvailable=function(){return!!window.XMLHttpRequest&&(!("undefined"!==typeof navigator&&(navigator.userAgent.match(/MSIE/)||navigator.userAgent.match(/Trident/)))||mg())};Ag.prototype.Bc=function(){return"json"};function Bg(a){this.oc=Ga()+Ga()+Ga();this.Df=a}
Bg.prototype.open=function(a,b,c){function d(){c&&(c(yg("USER_CANCELLED")),c=null)}var e=this,f=Rc(fg),g;b.requestId=this.oc;b.redirectTo=f.scheme+"://"+f.host+"/blank/page.html";a+=/\?/.test(a)?"":"?";a+=jb(b);(g=window.open(a,"_blank","location=no"))&&ha(g.addEventListener)?(g.addEventListener("loadstart",function(a){var b;if(b=a&&a.url)a:{try{var m=document.createElement("a");m.href=a.url;b=m.host===f.host&&"/blank/page.html"===m.pathname;break a}catch(v){}b=!1}b&&(a=rg(a.url),g.removeEventListener("exit",
d),g.close(),a=new gg(null,null,{requestId:e.oc,requestKey:a}),e.Df.requestWithCredential("/auth/session",a,c),c=null)}),g.addEventListener("exit",d)):c(yg("TRANSPORT_UNAVAILABLE"))};Bg.isAvailable=function(){return kg()};Bg.prototype.Bc=function(){return"redirect"};function Cg(a){a.callback_parameter||(a.callback_parameter="callback");this.options=a;window.__firebase_auth_jsonp=window.__firebase_auth_jsonp||{}}
Cg.prototype.open=function(a,b,c){function d(){c&&(c(yg("REQUEST_INTERRUPTED")),c=null)}function e(){setTimeout(function(){window.__firebase_auth_jsonp[f]=void 0;wa(window.__firebase_auth_jsonp)&&(window.__firebase_auth_jsonp=void 0);try{var a=document.getElementById(f);a&&a.parentNode.removeChild(a)}catch(b){}},1);pg(window,"beforeunload",d)}var f="fn"+(new Date).getTime()+Math.floor(99999*Math.random());b[this.options.callback_parameter]="__firebase_auth_jsonp."+f;a+=(/\?/.test(a)?"":"?")+jb(b);
og(window,"beforeunload",d);window.__firebase_auth_jsonp[f]=function(a){c&&(c(null,a),c=null);e()};Dg(f,a,c)};
function Dg(a,b,c){setTimeout(function(){try{var d=document.createElement("script");d.type="text/javascript";d.id=a;d.async=!0;d.src=b;d.onerror=function(){var b=document.getElementById(a);null!==b&&b.parentNode.removeChild(b);c&&c(yg("NETWORK_ERROR"))};var e=document.getElementsByTagName("head");(e&&0!=e.length?e[0]:document.documentElement).appendChild(d)}catch(f){c&&c(yg("NETWORK_ERROR"))}},0)}Cg.isAvailable=function(){return!0};Cg.prototype.Bc=function(){return"json"};function Eg(a,b,c,d){If.call(this,["auth_status"]);this.H=a;this.df=b;this.Sg=c;this.Ke=d;this.rc=new jg(a,[Dc,P]);this.nb=null;this.Re=!1;Fg(this)}ma(Eg,If);h=Eg.prototype;h.we=function(){return this.nb||null};function Fg(a){P.get("redirect_request_id")&&Gg(a);var b=a.rc.get();b&&b.token?(Hg(a,b),a.df(b.token,function(c,d){Ig(a,c,d,!1,b.token,b)},function(b,d){Jg(a,"resumeSession()",b,d)})):Hg(a,null)}
function Kg(a,b,c,d,e,f){"firebaseio-demo.com"===a.H.domain&&Q("Firebase authentication is not supported on demo Firebases (*.firebaseio-demo.com). To secure your Firebase, create a production Firebase at https://www.firebase.com.");a.df(b,function(f,k){Ig(a,f,k,!0,b,c,d||{},e)},function(b,c){Jg(a,"auth()",b,c,f)})}function Lg(a,b){a.rc.clear();Hg(a,null);a.Sg(function(a,d){if("ok"===a)R(b,null);else{var e=(a||"error").toUpperCase(),f=e;d&&(f+=": "+d);f=Error(f);f.code=e;R(b,f)}})}
function Ig(a,b,c,d,e,f,g,k){"ok"===b?(d&&(b=c.auth,f.auth=b,f.expires=c.expires,f.token=cd(e)?e:"",c=null,b&&u(b,"uid")?c=w(b,"uid"):u(f,"uid")&&(c=w(f,"uid")),f.uid=c,c="custom",b&&u(b,"provider")?c=w(b,"provider"):u(f,"provider")&&(c=w(f,"provider")),f.provider=c,a.rc.clear(),cd(e)&&(g=g||{},c=Dc,"sessionOnly"===g.remember&&(c=P),"none"!==g.remember&&a.rc.set(f,c)),Hg(a,f)),R(k,null,f)):(a.rc.clear(),Hg(a,null),f=a=(b||"error").toUpperCase(),c&&(f+=": "+c),f=Error(f),f.code=a,R(k,f))}
function Jg(a,b,c,d,e){Q(b+" was canceled: "+d);a.rc.clear();Hg(a,null);a=Error(d);a.code=c.toUpperCase();R(e,a)}function Mg(a,b,c,d,e){Ng(a);c=new gg(d||{},{},c||{});Og(a,[Ag,Cg],"/auth/"+b,c,e)}
function Pg(a,b,c,d){Ng(a);var e=[zg,Bg];c=ig(c);"anonymous"===b||"password"===b?setTimeout(function(){R(d,yg("TRANSPORT_UNAVAILABLE"))},0):(c.ce.window_features="menubar=yes,modal=yes,alwaysRaised=yeslocation=yes,resizable=yes,scrollbars=yes,status=yes,height=625,width=625,top="+("object"===typeof screen?.5*(screen.height-625):0)+",left="+("object"===typeof screen?.5*(screen.width-625):0),c.ce.relay_url=tg(a.H.Cb),c.ce.requestWithCredential=q(a.pc,a),Og(a,e,"/auth/"+b,c,d))}
function Gg(a){var b=P.get("redirect_request_id");if(b){var c=P.get("redirect_client_options");P.remove("redirect_request_id");P.remove("redirect_client_options");var d=[Ag,Cg],b={requestId:b,requestKey:rg(document.location.hash)},c=new gg(c,{},b);a.Re=!0;try{document.location.hash=document.location.hash.replace(/&__firebase_request_key=([a-zA-z0-9]*)/,"")}catch(e){}Og(a,d,"/auth/session",c,function(){this.Re=!1}.bind(a))}}
h.re=function(a,b){Ng(this);var c=ig(a);c.ab._method="POST";this.pc("/users",c,function(a,c){a?R(b,a):R(b,a,c)})};h.Se=function(a,b){var c=this;Ng(this);var d="/users/"+encodeURIComponent(a.email),e=ig(a);e.ab._method="DELETE";this.pc(d,e,function(a,d){!a&&d&&d.uid&&c.nb&&c.nb.uid&&c.nb.uid===d.uid&&Lg(c);R(b,a)})};h.oe=function(a,b){Ng(this);var c="/users/"+encodeURIComponent(a.email)+"/password",d=ig(a);d.ab._method="PUT";d.ab.password=a.newPassword;this.pc(c,d,function(a){R(b,a)})};
h.ne=function(a,b){Ng(this);var c="/users/"+encodeURIComponent(a.oldEmail)+"/email",d=ig(a);d.ab._method="PUT";d.ab.email=a.newEmail;d.ab.password=a.password;this.pc(c,d,function(a){R(b,a)})};h.Ue=function(a,b){Ng(this);var c="/users/"+encodeURIComponent(a.email)+"/password",d=ig(a);d.ab._method="POST";this.pc(c,d,function(a){R(b,a)})};h.pc=function(a,b,c){Qg(this,[Ag,Cg],a,b,c)};
function Og(a,b,c,d,e){Qg(a,b,c,d,function(b,c){!b&&c&&c.token&&c.uid?Kg(a,c.token,c,d.ld,function(a,b){a?R(e,a):R(e,null,b)}):R(e,b||yg("UNKNOWN_ERROR"))})}
function Qg(a,b,c,d,e){b=Pa(b,function(a){return"function"===typeof a.isAvailable&&a.isAvailable()});0===b.length?setTimeout(function(){R(e,yg("TRANSPORT_UNAVAILABLE"))},0):(b=new (b.shift())(d.ce),d=ib(d.ab),d.v="js-2.2.6",d.transport=b.Bc(),d.suppress_status_codes=!0,a=sg()+"/"+a.H.Cb+c,b.open(a,d,function(a,b){if(a)R(e,a);else if(b&&b.error){var c=Error(b.error.message);c.code=b.error.code;c.details=b.error.details;R(e,c)}else R(e,null,b)}))}
function Hg(a,b){var c=null!==a.nb||null!==b;a.nb=b;c&&a.de("auth_status",b);a.Ke(null!==b)}h.ze=function(a){J("auth_status"===a,'initial event must be of type "auth_status"');return this.Re?null:[this.nb]};function Ng(a){var b=a.H;if("firebaseio.com"!==b.domain&&"firebaseio-demo.com"!==b.domain&&"auth.firebase.com"===fg)throw Error("This custom Firebase server ('"+a.H.domain+"') does not support delegated login.");};function Rg(a){this.hc=a;this.Kd=[];this.Qb=0;this.pe=-1;this.Fb=null}function Sg(a,b,c){a.pe=b;a.Fb=c;a.pe<a.Qb&&(a.Fb(),a.Fb=null)}function Tg(a,b,c){for(a.Kd[b]=c;a.Kd[a.Qb];){var d=a.Kd[a.Qb];delete a.Kd[a.Qb];for(var e=0;e<d.length;++e)if(d[e]){var f=a;Cb(function(){f.hc(d[e])})}if(a.Qb===a.pe){a.Fb&&(clearTimeout(a.Fb),a.Fb(),a.Fb=null);break}a.Qb++}};function Ug(a,b,c){this.qe=a;this.f=Oc(a);this.ob=this.pb=0;this.Va=Ob(b);this.Vd=c;this.Gc=!1;this.gd=function(a){b.host!==b.Oa&&(a.ns=b.Cb);var c=[],f;for(f in a)a.hasOwnProperty(f)&&c.push(f+"="+a[f]);return(b.lb?"https://":"http://")+b.Oa+"/.lp?"+c.join("&")}}var Vg,Wg;
Ug.prototype.open=function(a,b){this.gf=0;this.ka=b;this.zf=new Rg(a);this.zb=!1;var c=this;this.rb=setTimeout(function(){c.f("Timed out trying to connect.");c.ib();c.rb=null},Math.floor(3E4));Tc(function(){if(!c.zb){c.Ta=new Xg(function(a,b,d,k,l){Yg(c,arguments);if(c.Ta)if(c.rb&&(clearTimeout(c.rb),c.rb=null),c.Gc=!0,"start"==a)c.id=b,c.Ff=d;else if("close"===a)b?(c.Ta.Td=!1,Sg(c.zf,b,function(){c.ib()})):c.ib();else throw Error("Unrecognized command received: "+a);},function(a,b){Yg(c,arguments);
Tg(c.zf,a,b)},function(){c.ib()},c.gd);var a={start:"t"};a.ser=Math.floor(1E8*Math.random());c.Ta.fe&&(a.cb=c.Ta.fe);a.v="5";c.Vd&&(a.s=c.Vd);"undefined"!==typeof location&&location.href&&-1!==location.href.indexOf("firebaseio.com")&&(a.r="f");a=c.gd(a);c.f("Connecting via long-poll to "+a);Zg(c.Ta,a,function(){})}})};
Ug.prototype.start=function(){var a=this.Ta,b=this.Ff;a.rg=this.id;a.sg=b;for(a.ke=!0;$g(a););a=this.id;b=this.Ff;this.fc=document.createElement("iframe");var c={dframe:"t"};c.id=a;c.pw=b;this.fc.src=this.gd(c);this.fc.style.display="none";document.body.appendChild(this.fc)};Ug.isAvailable=function(){return Vg||!Wg&&"undefined"!==typeof document&&!("object"===typeof window&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))&&!("object"===typeof Windows&&"object"===typeof Windows.Ug)};
h=Ug.prototype;h.Bd=function(){};h.cd=function(){this.zb=!0;this.Ta&&(this.Ta.close(),this.Ta=null);this.fc&&(document.body.removeChild(this.fc),this.fc=null);this.rb&&(clearTimeout(this.rb),this.rb=null)};h.ib=function(){this.zb||(this.f("Longpoll is closing itself"),this.cd(),this.ka&&(this.ka(this.Gc),this.ka=null))};h.close=function(){this.zb||(this.f("Longpoll is being closed."),this.cd())};
h.send=function(a){a=B(a);this.pb+=a.length;Lb(this.Va,"bytes_sent",a.length);a=Kc(a);a=fb(a,!0);a=Xc(a,1840);for(var b=0;b<a.length;b++){var c=this.Ta;c.$c.push({Jg:this.gf,Rg:a.length,jf:a[b]});c.ke&&$g(c);this.gf++}};function Yg(a,b){var c=B(b).length;a.ob+=c;Lb(a.Va,"bytes_received",c)}
function Xg(a,b,c,d){this.gd=d;this.jb=c;this.Oe=new cg;this.$c=[];this.se=Math.floor(1E8*Math.random());this.Td=!0;this.fe=Gc();window["pLPCommand"+this.fe]=a;window["pRTLPCB"+this.fe]=b;a=document.createElement("iframe");a.style.display="none";if(document.body){document.body.appendChild(a);try{a.contentWindow.document||Bb("No IE domain setting required")}catch(e){a.src="javascript:void((function(){document.open();document.domain='"+document.domain+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";
a.contentDocument?a.gb=a.contentDocument:a.contentWindow?a.gb=a.contentWindow.document:a.document&&(a.gb=a.document);this.Ca=a;a="";this.Ca.src&&"javascript:"===this.Ca.src.substr(0,11)&&(a='<script>document.domain="'+document.domain+'";\x3c/script>');a="<html><body>"+a+"</body></html>";try{this.Ca.gb.open(),this.Ca.gb.write(a),this.Ca.gb.close()}catch(f){Bb("frame writing exception"),f.stack&&Bb(f.stack),Bb(f)}}
Xg.prototype.close=function(){this.ke=!1;if(this.Ca){this.Ca.gb.body.innerHTML="";var a=this;setTimeout(function(){null!==a.Ca&&(document.body.removeChild(a.Ca),a.Ca=null)},Math.floor(0))}var b=this.jb;b&&(this.jb=null,b())};
function $g(a){if(a.ke&&a.Td&&a.Oe.count()<(0<a.$c.length?2:1)){a.se++;var b={};b.id=a.rg;b.pw=a.sg;b.ser=a.se;for(var b=a.gd(b),c="",d=0;0<a.$c.length;)if(1870>=a.$c[0].jf.length+30+c.length){var e=a.$c.shift(),c=c+"&seg"+d+"="+e.Jg+"&ts"+d+"="+e.Rg+"&d"+d+"="+e.jf;d++}else break;ah(a,b+c,a.se);return!0}return!1}function ah(a,b,c){function d(){a.Oe.remove(c);$g(a)}a.Oe.add(c,1);var e=setTimeout(d,Math.floor(25E3));Zg(a,b,function(){clearTimeout(e);d()})}
function Zg(a,b,c){setTimeout(function(){try{if(a.Td){var d=a.Ca.gb.createElement("script");d.type="text/javascript";d.async=!0;d.src=b;d.onload=d.onreadystatechange=function(){var a=d.readyState;a&&"loaded"!==a&&"complete"!==a||(d.onload=d.onreadystatechange=null,d.parentNode&&d.parentNode.removeChild(d),c())};d.onerror=function(){Bb("Long-poll script failed to load: "+b);a.Td=!1;a.close()};a.Ca.gb.body.appendChild(d)}}catch(e){}},Math.floor(1))};var bh=null;"undefined"!==typeof MozWebSocket?bh=MozWebSocket:"undefined"!==typeof WebSocket&&(bh=WebSocket);function ch(a,b,c){this.qe=a;this.f=Oc(this.qe);this.frames=this.Jc=null;this.ob=this.pb=this.bf=0;this.Va=Ob(b);this.fb=(b.lb?"wss://":"ws://")+b.Oa+"/.ws?v=5";"undefined"!==typeof location&&location.href&&-1!==location.href.indexOf("firebaseio.com")&&(this.fb+="&r=f");b.host!==b.Oa&&(this.fb=this.fb+"&ns="+b.Cb);c&&(this.fb=this.fb+"&s="+c)}var dh;
ch.prototype.open=function(a,b){this.jb=b;this.wg=a;this.f("Websocket connecting to "+this.fb);this.Gc=!1;Dc.set("previous_websocket_failure",!0);try{this.va=new bh(this.fb)}catch(c){this.f("Error instantiating WebSocket.");var d=c.message||c.data;d&&this.f(d);this.ib();return}var e=this;this.va.onopen=function(){e.f("Websocket connected.");e.Gc=!0};this.va.onclose=function(){e.f("Websocket connection was disconnected.");e.va=null;e.ib()};this.va.onmessage=function(a){if(null!==e.va)if(a=a.data,e.ob+=
a.length,Lb(e.Va,"bytes_received",a.length),eh(e),null!==e.frames)fh(e,a);else{a:{J(null===e.frames,"We already have a frame buffer");if(6>=a.length){var b=Number(a);if(!isNaN(b)){e.bf=b;e.frames=[];a=null;break a}}e.bf=1;e.frames=[]}null!==a&&fh(e,a)}};this.va.onerror=function(a){e.f("WebSocket error.  Closing connection.");(a=a.message||a.data)&&e.f(a);e.ib()}};ch.prototype.start=function(){};
ch.isAvailable=function(){var a=!1;if("undefined"!==typeof navigator&&navigator.userAgent){var b=navigator.userAgent.match(/Android ([0-9]{0,}\.[0-9]{0,})/);b&&1<b.length&&4.4>parseFloat(b[1])&&(a=!0)}return!a&&null!==bh&&!dh};ch.responsesRequiredToBeHealthy=2;ch.healthyTimeout=3E4;h=ch.prototype;h.Bd=function(){Dc.remove("previous_websocket_failure")};function fh(a,b){a.frames.push(b);if(a.frames.length==a.bf){var c=a.frames.join("");a.frames=null;c=mb(c);a.wg(c)}}
h.send=function(a){eh(this);a=B(a);this.pb+=a.length;Lb(this.Va,"bytes_sent",a.length);a=Xc(a,16384);1<a.length&&this.va.send(String(a.length));for(var b=0;b<a.length;b++)this.va.send(a[b])};h.cd=function(){this.zb=!0;this.Jc&&(clearInterval(this.Jc),this.Jc=null);this.va&&(this.va.close(),this.va=null)};h.ib=function(){this.zb||(this.f("WebSocket is closing itself"),this.cd(),this.jb&&(this.jb(this.Gc),this.jb=null))};h.close=function(){this.zb||(this.f("WebSocket is being closed"),this.cd())};
function eh(a){clearInterval(a.Jc);a.Jc=setInterval(function(){a.va&&a.va.send("0");eh(a)},Math.floor(45E3))};function gh(a){hh(this,a)}var ih=[Ug,ch];function hh(a,b){var c=ch&&ch.isAvailable(),d=c&&!(Dc.uf||!0===Dc.get("previous_websocket_failure"));b.Tg&&(c||Q("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),d=!0);if(d)a.ed=[ch];else{var e=a.ed=[];Yc(ih,function(a,b){b&&b.isAvailable()&&e.push(b)})}}function jh(a){if(0<a.ed.length)return a.ed[0];throw Error("No transports available");};function kh(a,b,c,d,e,f){this.id=a;this.f=Oc("c:"+this.id+":");this.hc=c;this.Vc=d;this.ka=e;this.Me=f;this.H=b;this.Jd=[];this.ef=0;this.Nf=new gh(b);this.Ua=0;this.f("Connection created");lh(this)}
function lh(a){var b=jh(a.Nf);a.L=new b("c:"+a.id+":"+a.ef++,a.H);a.Qe=b.responsesRequiredToBeHealthy||0;var c=mh(a,a.L),d=nh(a,a.L);a.fd=a.L;a.bd=a.L;a.F=null;a.Ab=!1;setTimeout(function(){a.L&&a.L.open(c,d)},Math.floor(0));b=b.healthyTimeout||0;0<b&&(a.vd=setTimeout(function(){a.vd=null;a.Ab||(a.L&&102400<a.L.ob?(a.f("Connection exceeded healthy timeout but has received "+a.L.ob+" bytes.  Marking connection healthy."),a.Ab=!0,a.L.Bd()):a.L&&10240<a.L.pb?a.f("Connection exceeded healthy timeout but has sent "+
a.L.pb+" bytes.  Leaving connection alive."):(a.f("Closing unhealthy connection after timeout."),a.close()))},Math.floor(b)))}function nh(a,b){return function(c){b===a.L?(a.L=null,c||0!==a.Ua?1===a.Ua&&a.f("Realtime connection lost."):(a.f("Realtime connection failed."),"s-"===a.H.Oa.substr(0,2)&&(Dc.remove("host:"+a.H.host),a.H.Oa=a.H.host)),a.close()):b===a.F?(a.f("Secondary connection lost."),c=a.F,a.F=null,a.fd!==c&&a.bd!==c||a.close()):a.f("closing an old connection")}}
function mh(a,b){return function(c){if(2!=a.Ua)if(b===a.bd){var d=Vc("t",c);c=Vc("d",c);if("c"==d){if(d=Vc("t",c),"d"in c)if(c=c.d,"h"===d){var d=c.ts,e=c.v,f=c.h;a.Vd=c.s;Fc(a.H,f);0==a.Ua&&(a.L.start(),oh(a,a.L,d),"5"!==e&&Q("Protocol version mismatch detected"),c=a.Nf,(c=1<c.ed.length?c.ed[1]:null)&&ph(a,c))}else if("n"===d){a.f("recvd end transmission on primary");a.bd=a.F;for(c=0;c<a.Jd.length;++c)a.Fd(a.Jd[c]);a.Jd=[];qh(a)}else"s"===d?(a.f("Connection shutdown command received. Shutting down..."),
a.Me&&(a.Me(c),a.Me=null),a.ka=null,a.close()):"r"===d?(a.f("Reset packet received.  New host: "+c),Fc(a.H,c),1===a.Ua?a.close():(rh(a),lh(a))):"e"===d?Pc("Server Error: "+c):"o"===d?(a.f("got pong on primary."),sh(a),th(a)):Pc("Unknown control packet command: "+d)}else"d"==d&&a.Fd(c)}else if(b===a.F)if(d=Vc("t",c),c=Vc("d",c),"c"==d)"t"in c&&(c=c.t,"a"===c?uh(a):"r"===c?(a.f("Got a reset on secondary, closing it"),a.F.close(),a.fd!==a.F&&a.bd!==a.F||a.close()):"o"===c&&(a.f("got pong on secondary."),
a.Lf--,uh(a)));else if("d"==d)a.Jd.push(c);else throw Error("Unknown protocol layer: "+d);else a.f("message on old connection")}}kh.prototype.Da=function(a){vh(this,{t:"d",d:a})};function qh(a){a.fd===a.F&&a.bd===a.F&&(a.f("cleaning up and promoting a connection: "+a.F.qe),a.L=a.F,a.F=null)}
function uh(a){0>=a.Lf?(a.f("Secondary connection is healthy."),a.Ab=!0,a.F.Bd(),a.F.start(),a.f("sending client ack on secondary"),a.F.send({t:"c",d:{t:"a",d:{}}}),a.f("Ending transmission on primary"),a.L.send({t:"c",d:{t:"n",d:{}}}),a.fd=a.F,qh(a)):(a.f("sending ping on secondary."),a.F.send({t:"c",d:{t:"p",d:{}}}))}kh.prototype.Fd=function(a){sh(this);this.hc(a)};function sh(a){a.Ab||(a.Qe--,0>=a.Qe&&(a.f("Primary connection is healthy."),a.Ab=!0,a.L.Bd()))}
function ph(a,b){a.F=new b("c:"+a.id+":"+a.ef++,a.H,a.Vd);a.Lf=b.responsesRequiredToBeHealthy||0;a.F.open(mh(a,a.F),nh(a,a.F));setTimeout(function(){a.F&&(a.f("Timed out trying to upgrade."),a.F.close())},Math.floor(6E4))}function oh(a,b,c){a.f("Realtime connection established.");a.L=b;a.Ua=1;a.Vc&&(a.Vc(c),a.Vc=null);0===a.Qe?(a.f("Primary connection is healthy."),a.Ab=!0):setTimeout(function(){th(a)},Math.floor(5E3))}
function th(a){a.Ab||1!==a.Ua||(a.f("sending ping on primary."),vh(a,{t:"c",d:{t:"p",d:{}}}))}function vh(a,b){if(1!==a.Ua)throw"Connection is not connected";a.fd.send(b)}kh.prototype.close=function(){2!==this.Ua&&(this.f("Closing realtime connection."),this.Ua=2,rh(this),this.ka&&(this.ka(),this.ka=null))};function rh(a){a.f("Shutting down all connections");a.L&&(a.L.close(),a.L=null);a.F&&(a.F.close(),a.F=null);a.vd&&(clearTimeout(a.vd),a.vd=null)};function wh(a,b,c,d){this.id=xh++;this.f=Oc("p:"+this.id+":");this.wf=this.De=!1;this.aa={};this.pa=[];this.Xc=0;this.Uc=[];this.ma=!1;this.$a=1E3;this.Cd=3E5;this.Gb=b;this.Tc=c;this.Ne=d;this.H=a;this.We=null;this.Qd={};this.Ig=0;this.mf=!0;this.Kc=this.Fe=null;yh(this,0);Mf.ub().Eb("visible",this.zg,this);-1===a.host.indexOf("fblocal")&&Lf.ub().Eb("online",this.xg,this)}var xh=0,zh=0;h=wh.prototype;
h.Da=function(a,b,c){var d=++this.Ig;a={r:d,a:a,b:b};this.f(B(a));J(this.ma,"sendRequest call when we're not connected not allowed.");this.Sa.Da(a);c&&(this.Qd[d]=c)};h.xf=function(a,b,c,d){var e=a.wa(),f=a.path.toString();this.f("Listen called for "+f+" "+e);this.aa[f]=this.aa[f]||{};J(!this.aa[f][e],"listen() called twice for same path/queryId.");a={J:d,ud:b,Fg:a,tag:c};this.aa[f][e]=a;this.ma&&Ah(this,a)};
function Ah(a,b){var c=b.Fg,d=c.path.toString(),e=c.wa();a.f("Listen on "+d+" for "+e);var f={p:d};b.tag&&(f.q=ce(c.o),f.t=b.tag);f.h=b.ud();a.Da("q",f,function(f){var k=f.d,l=f.s;if(k&&"object"===typeof k&&u(k,"w")){var m=w(k,"w");ea(m)&&0<=Na(m,"no_index")&&Q("Using an unspecified index. Consider adding "+('".indexOn": "'+c.o.g.toString()+'"')+" at "+c.path.toString()+" to your security rules for better performance")}(a.aa[d]&&a.aa[d][e])===b&&(a.f("listen response",f),"ok"!==l&&Bh(a,d,e),b.J&&
b.J(l,k))})}h.P=function(a,b,c){this.Fa={fg:a,nf:!1,yc:b,jd:c};this.f("Authenticating using credential: "+a);Ch(this);(b=40==a.length)||(a=ad(a).Ac,b="object"===typeof a&&!0===w(a,"admin"));b&&(this.f("Admin auth credential detected.  Reducing max reconnect time."),this.Cd=3E4)};h.ee=function(a){delete this.Fa;this.ma&&this.Da("unauth",{},function(b){a(b.s,b.d)})};
function Ch(a){var b=a.Fa;a.ma&&b&&a.Da("auth",{cred:b.fg},function(c){var d=c.s;c=c.d||"error";"ok"!==d&&a.Fa===b&&delete a.Fa;b.nf?"ok"!==d&&b.jd&&b.jd(d,c):(b.nf=!0,b.yc&&b.yc(d,c))})}h.Of=function(a,b){var c=a.path.toString(),d=a.wa();this.f("Unlisten called for "+c+" "+d);if(Bh(this,c,d)&&this.ma){var e=ce(a.o);this.f("Unlisten on "+c+" for "+d);c={p:c};b&&(c.q=e,c.t=b);this.Da("n",c)}};h.Le=function(a,b,c){this.ma?Dh(this,"o",a,b,c):this.Uc.push({Zc:a,action:"o",data:b,J:c})};
h.Bf=function(a,b,c){this.ma?Dh(this,"om",a,b,c):this.Uc.push({Zc:a,action:"om",data:b,J:c})};h.Gd=function(a,b){this.ma?Dh(this,"oc",a,null,b):this.Uc.push({Zc:a,action:"oc",data:null,J:b})};function Dh(a,b,c,d,e){c={p:c,d:d};a.f("onDisconnect "+b,c);a.Da(b,c,function(a){e&&setTimeout(function(){e(a.s,a.d)},Math.floor(0))})}h.put=function(a,b,c,d){Eh(this,"p",a,b,c,d)};h.yf=function(a,b,c,d){Eh(this,"m",a,b,c,d)};
function Eh(a,b,c,d,e,f){d={p:c,d:d};n(f)&&(d.h=f);a.pa.push({action:b,If:d,J:e});a.Xc++;b=a.pa.length-1;a.ma?Fh(a,b):a.f("Buffering put: "+c)}function Fh(a,b){var c=a.pa[b].action,d=a.pa[b].If,e=a.pa[b].J;a.pa[b].Gg=a.ma;a.Da(c,d,function(d){a.f(c+" response",d);delete a.pa[b];a.Xc--;0===a.Xc&&(a.pa=[]);e&&e(d.s,d.d)})}h.Te=function(a){this.ma&&(a={c:a},this.f("reportStats",a),this.Da("s",a,function(a){"ok"!==a.s&&this.f("reportStats","Error sending stats: "+a.d)}))};
h.Fd=function(a){if("r"in a){this.f("from server: "+B(a));var b=a.r,c=this.Qd[b];c&&(delete this.Qd[b],c(a.b))}else{if("error"in a)throw"A server-side error has occurred: "+a.error;"a"in a&&(b=a.a,c=a.b,this.f("handleServerMessage",b,c),"d"===b?this.Gb(c.p,c.d,!1,c.t):"m"===b?this.Gb(c.p,c.d,!0,c.t):"c"===b?Gh(this,c.p,c.q):"ac"===b?(a=c.s,b=c.d,c=this.Fa,delete this.Fa,c&&c.jd&&c.jd(a,b)):"sd"===b?this.We?this.We(c):"msg"in c&&"undefined"!==typeof console&&console.log("FIREBASE: "+c.msg.replace("\n",
"\nFIREBASE: ")):Pc("Unrecognized action received from server: "+B(b)+"\nAre you using the latest client?"))}};h.Vc=function(a){this.f("connection ready");this.ma=!0;this.Kc=(new Date).getTime();this.Ne({serverTimeOffset:a-(new Date).getTime()});this.mf&&(a={},a["sdk.js."+"2.2.6".replace(/\./g,"-")]=1,kg()&&(a["framework.cordova"]=1),this.Te(a));Hh(this);this.mf=!1;this.Tc(!0)};
function yh(a,b){J(!a.Sa,"Scheduling a connect when we're already connected/ing?");a.Sb&&clearTimeout(a.Sb);a.Sb=setTimeout(function(){a.Sb=null;Ih(a)},Math.floor(b))}h.zg=function(a){a&&!this.uc&&this.$a===this.Cd&&(this.f("Window became visible.  Reducing delay."),this.$a=1E3,this.Sa||yh(this,0));this.uc=a};h.xg=function(a){a?(this.f("Browser went online."),this.$a=1E3,this.Sa||yh(this,0)):(this.f("Browser went offline.  Killing connection."),this.Sa&&this.Sa.close())};
h.Cf=function(){this.f("data client disconnected");this.ma=!1;this.Sa=null;for(var a=0;a<this.pa.length;a++){var b=this.pa[a];b&&"h"in b.If&&b.Gg&&(b.J&&b.J("disconnect"),delete this.pa[a],this.Xc--)}0===this.Xc&&(this.pa=[]);this.Qd={};Jh(this)&&(this.uc?this.Kc&&(3E4<(new Date).getTime()-this.Kc&&(this.$a=1E3),this.Kc=null):(this.f("Window isn't visible.  Delaying reconnect."),this.$a=this.Cd,this.Fe=(new Date).getTime()),a=Math.max(0,this.$a-((new Date).getTime()-this.Fe)),a*=Math.random(),this.f("Trying to reconnect in "+
a+"ms"),yh(this,a),this.$a=Math.min(this.Cd,1.3*this.$a));this.Tc(!1)};function Ih(a){if(Jh(a)){a.f("Making a connection attempt");a.Fe=(new Date).getTime();a.Kc=null;var b=q(a.Fd,a),c=q(a.Vc,a),d=q(a.Cf,a),e=a.id+":"+zh++;a.Sa=new kh(e,a.H,b,c,d,function(b){Q(b+" ("+a.H.toString()+")");a.wf=!0})}}h.yb=function(){this.De=!0;this.Sa?this.Sa.close():(this.Sb&&(clearTimeout(this.Sb),this.Sb=null),this.ma&&this.Cf())};h.qc=function(){this.De=!1;this.$a=1E3;this.Sa||yh(this,0)};
function Gh(a,b,c){c=c?Qa(c,function(a){return Wc(a)}).join("$"):"default";(a=Bh(a,b,c))&&a.J&&a.J("permission_denied")}function Bh(a,b,c){b=(new K(b)).toString();var d;n(a.aa[b])?(d=a.aa[b][c],delete a.aa[b][c],0===pa(a.aa[b])&&delete a.aa[b]):d=void 0;return d}function Hh(a){Ch(a);r(a.aa,function(b){r(b,function(b){Ah(a,b)})});for(var b=0;b<a.pa.length;b++)a.pa[b]&&Fh(a,b);for(;a.Uc.length;)b=a.Uc.shift(),Dh(a,b.action,b.Zc,b.data,b.J)}function Jh(a){var b;b=Lf.ub().ic;return!a.wf&&!a.De&&b};var V={lg:function(){Vg=dh=!0}};V.forceLongPolling=V.lg;V.mg=function(){Wg=!0};V.forceWebSockets=V.mg;V.Mg=function(a,b){a.k.Ra.We=b};V.setSecurityDebugCallback=V.Mg;V.Ye=function(a,b){a.k.Ye(b)};V.stats=V.Ye;V.Ze=function(a,b){a.k.Ze(b)};V.statsIncrementCounter=V.Ze;V.pd=function(a){return a.k.pd};V.dataUpdateCount=V.pd;V.pg=function(a,b){a.k.Ce=b};V.interceptServerData=V.pg;V.vg=function(a){new ug(a)};V.onPopupOpen=V.vg;V.Kg=function(a){fg=a};V.setAuthenticationServer=V.Kg;function S(a,b,c){this.B=a;this.V=b;this.g=c}S.prototype.K=function(){x("Firebase.DataSnapshot.val",0,0,arguments.length);return this.B.K()};S.prototype.val=S.prototype.K;S.prototype.lf=function(){x("Firebase.DataSnapshot.exportVal",0,0,arguments.length);return this.B.K(!0)};S.prototype.exportVal=S.prototype.lf;S.prototype.kg=function(){x("Firebase.DataSnapshot.exists",0,0,arguments.length);return!this.B.e()};S.prototype.exists=S.prototype.kg;
S.prototype.w=function(a){x("Firebase.DataSnapshot.child",0,1,arguments.length);ga(a)&&(a=String(a));Xf("Firebase.DataSnapshot.child",a);var b=new K(a),c=this.V.w(b);return new S(this.B.oa(b),c,M)};S.prototype.child=S.prototype.w;S.prototype.Ha=function(a){x("Firebase.DataSnapshot.hasChild",1,1,arguments.length);Xf("Firebase.DataSnapshot.hasChild",a);var b=new K(a);return!this.B.oa(b).e()};S.prototype.hasChild=S.prototype.Ha;
S.prototype.A=function(){x("Firebase.DataSnapshot.getPriority",0,0,arguments.length);return this.B.A().K()};S.prototype.getPriority=S.prototype.A;S.prototype.forEach=function(a){x("Firebase.DataSnapshot.forEach",1,1,arguments.length);A("Firebase.DataSnapshot.forEach",1,a,!1);if(this.B.N())return!1;var b=this;return!!this.B.U(this.g,function(c,d){return a(new S(d,b.V.w(c),M))})};S.prototype.forEach=S.prototype.forEach;
S.prototype.td=function(){x("Firebase.DataSnapshot.hasChildren",0,0,arguments.length);return this.B.N()?!1:!this.B.e()};S.prototype.hasChildren=S.prototype.td;S.prototype.name=function(){Q("Firebase.DataSnapshot.name() being deprecated. Please use Firebase.DataSnapshot.key() instead.");x("Firebase.DataSnapshot.name",0,0,arguments.length);return this.key()};S.prototype.name=S.prototype.name;S.prototype.key=function(){x("Firebase.DataSnapshot.key",0,0,arguments.length);return this.V.key()};
S.prototype.key=S.prototype.key;S.prototype.Db=function(){x("Firebase.DataSnapshot.numChildren",0,0,arguments.length);return this.B.Db()};S.prototype.numChildren=S.prototype.Db;S.prototype.lc=function(){x("Firebase.DataSnapshot.ref",0,0,arguments.length);return this.V};S.prototype.ref=S.prototype.lc;function Kh(a,b){this.H=a;this.Va=Ob(a);this.ea=new ub;this.Ed=1;this.Ra=null;b||0<=("object"===typeof window&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)?(this.ca=new Ae(this.H,q(this.Gb,this)),setTimeout(q(this.Tc,this,!0),0)):this.ca=this.Ra=new wh(this.H,q(this.Gb,this),q(this.Tc,this),q(this.Ne,this));this.Pg=Pb(a,q(function(){return new Jb(this.Va,this.ca)},this));this.tc=new Cf;this.Be=
new nb;var c=this;this.zd=new gf({Xe:function(a,b,f,g){b=[];f=c.Be.j(a.path);f.e()||(b=jf(c.zd,new Ub(ze,a.path,f)),setTimeout(function(){g("ok")},0));return b},Zd:ba});Lh(this,"connected",!1);this.ka=new qc;this.P=new Eg(a,q(this.ca.P,this.ca),q(this.ca.ee,this.ca),q(this.Ke,this));this.pd=0;this.Ce=null;this.O=new gf({Xe:function(a,b,f,g){c.ca.xf(a,f,b,function(b,e){var f=g(b,e);zb(c.ea,a.path,f)});return[]},Zd:function(a,b){c.ca.Of(a,b)}})}h=Kh.prototype;
h.toString=function(){return(this.H.lb?"https://":"http://")+this.H.host};h.name=function(){return this.H.Cb};function Mh(a){a=a.Be.j(new K(".info/serverTimeOffset")).K()||0;return(new Date).getTime()+a}function Nh(a){a=a={timestamp:Mh(a)};a.timestamp=a.timestamp||(new Date).getTime();return a}
h.Gb=function(a,b,c,d){this.pd++;var e=new K(a);b=this.Ce?this.Ce(a,b):b;a=[];d?c?(b=na(b,function(a){return L(a)}),a=rf(this.O,e,b,d)):(b=L(b),a=nf(this.O,e,b,d)):c?(d=na(b,function(a){return L(a)}),a=mf(this.O,e,d)):(d=L(b),a=jf(this.O,new Ub(ze,e,d)));d=e;0<a.length&&(d=Oh(this,e));zb(this.ea,d,a)};h.Tc=function(a){Lh(this,"connected",a);!1===a&&Ph(this)};h.Ne=function(a){var b=this;Yc(a,function(a,d){Lh(b,d,a)})};h.Ke=function(a){Lh(this,"authenticated",a)};
function Lh(a,b,c){b=new K("/.info/"+b);c=L(c);var d=a.Be;d.Sd=d.Sd.G(b,c);c=jf(a.zd,new Ub(ze,b,c));zb(a.ea,b,c)}h.Kb=function(a,b,c,d){this.f("set",{path:a.toString(),value:b,Xg:c});var e=Nh(this);b=L(b,c);var e=sc(b,e),f=this.Ed++,e=hf(this.O,a,e,f,!0);vb(this.ea,e);var g=this;this.ca.put(a.toString(),b.K(!0),function(b,c){var e="ok"===b;e||Q("set at "+a+" failed: "+b);e=lf(g.O,f,!e);zb(g.ea,a,e);Qh(d,b,c)});e=Rh(this,a);Oh(this,e);zb(this.ea,e,[])};
h.update=function(a,b,c){this.f("update",{path:a.toString(),value:b});var d=!0,e=Nh(this),f={};r(b,function(a,b){d=!1;var c=L(a);f[b]=sc(c,e)});if(d)Bb("update() called with empty data.  Don't do anything."),Qh(c,"ok");else{var g=this.Ed++,k=kf(this.O,a,f,g);vb(this.ea,k);var l=this;this.ca.yf(a.toString(),b,function(b,d){var e="ok"===b;e||Q("update at "+a+" failed: "+b);var e=lf(l.O,g,!e),f=a;0<e.length&&(f=Oh(l,a));zb(l.ea,f,e);Qh(c,b,d)});b=Rh(this,a);Oh(this,b);zb(this.ea,a,[])}};
function Ph(a){a.f("onDisconnectEvents");var b=Nh(a),c=[];rc(pc(a.ka,b),F,function(b,e){c=c.concat(jf(a.O,new Ub(ze,b,e)));var f=Rh(a,b);Oh(a,f)});a.ka=new qc;zb(a.ea,F,c)}h.Gd=function(a,b){var c=this;this.ca.Gd(a.toString(),function(d,e){"ok"===d&&eg(c.ka,a);Qh(b,d,e)})};function Sh(a,b,c,d){var e=L(c);a.ca.Le(b.toString(),e.K(!0),function(c,g){"ok"===c&&a.ka.mc(b,e);Qh(d,c,g)})}function Th(a,b,c,d,e){var f=L(c,d);a.ca.Le(b.toString(),f.K(!0),function(c,d){"ok"===c&&a.ka.mc(b,f);Qh(e,c,d)})}
function Uh(a,b,c,d){var e=!0,f;for(f in c)e=!1;e?(Bb("onDisconnect().update() called with empty data.  Don't do anything."),Qh(d,"ok")):a.ca.Bf(b.toString(),c,function(e,f){if("ok"===e)for(var l in c){var m=L(c[l]);a.ka.mc(b.w(l),m)}Qh(d,e,f)})}function Vh(a,b,c){c=".info"===O(b.path)?a.zd.Ob(b,c):a.O.Ob(b,c);xb(a.ea,b.path,c)}h.yb=function(){this.Ra&&this.Ra.yb()};h.qc=function(){this.Ra&&this.Ra.qc()};
h.Ye=function(a){if("undefined"!==typeof console){a?(this.Yd||(this.Yd=new Ib(this.Va)),a=this.Yd.get()):a=this.Va.get();var b=Ra(sa(a),function(a,b){return Math.max(b.length,a)},0),c;for(c in a){for(var d=a[c],e=c.length;e<b+2;e++)c+=" ";console.log(c+d)}}};h.Ze=function(a){Lb(this.Va,a);this.Pg.Mf[a]=!0};h.f=function(a){var b="";this.Ra&&(b=this.Ra.id+":");Bb(b,arguments)};
function Qh(a,b,c){a&&Cb(function(){if("ok"==b)a(null);else{var d=(b||"error").toUpperCase(),e=d;c&&(e+=": "+c);e=Error(e);e.code=d;a(e)}})};function Wh(a,b,c,d,e){function f(){}a.f("transaction on "+b);var g=new U(a,b);g.Eb("value",f);c={path:b,update:c,J:d,status:null,Ef:Gc(),cf:e,Kf:0,ge:function(){g.gc("value",f)},je:null,Aa:null,md:null,nd:null,od:null};d=a.O.ua(b,void 0)||C;c.md=d;d=c.update(d.K());if(n(d)){Sf("transaction failed: Data returned ",d,c.path);c.status=1;e=Df(a.tc,b);var k=e.Ba()||[];k.push(c);Ef(e,k);"object"===typeof d&&null!==d&&u(d,".priority")?(k=w(d,".priority"),J(Qf(k),"Invalid priority returned by transaction. Priority must be a valid string, finite number, server value, or null.")):
k=(a.O.ua(b)||C).A().K();e=Nh(a);d=L(d,k);e=sc(d,e);c.nd=d;c.od=e;c.Aa=a.Ed++;c=hf(a.O,b,e,c.Aa,c.cf);zb(a.ea,b,c);Xh(a)}else c.ge(),c.nd=null,c.od=null,c.J&&(a=new S(c.md,new U(a,c.path),M),c.J(null,!1,a))}function Xh(a,b){var c=b||a.tc;b||Yh(a,c);if(null!==c.Ba()){var d=Zh(a,c);J(0<d.length,"Sending zero length transaction queue");Sa(d,function(a){return 1===a.status})&&$h(a,c.path(),d)}else c.td()&&c.U(function(b){Xh(a,b)})}
function $h(a,b,c){for(var d=Qa(c,function(a){return a.Aa}),e=a.O.ua(b,d)||C,d=e,e=e.hash(),f=0;f<c.length;f++){var g=c[f];J(1===g.status,"tryToSendTransactionQueue_: items in queue should all be run.");g.status=2;g.Kf++;var k=N(b,g.path),d=d.G(k,g.nd)}d=d.K(!0);a.ca.put(b.toString(),d,function(d){a.f("transaction put response",{path:b.toString(),status:d});var e=[];if("ok"===d){d=[];for(f=0;f<c.length;f++){c[f].status=3;e=e.concat(lf(a.O,c[f].Aa));if(c[f].J){var g=c[f].od,k=new U(a,c[f].path);d.push(q(c[f].J,
null,null,!0,new S(g,k,M)))}c[f].ge()}Yh(a,Df(a.tc,b));Xh(a);zb(a.ea,b,e);for(f=0;f<d.length;f++)Cb(d[f])}else{if("datastale"===d)for(f=0;f<c.length;f++)c[f].status=4===c[f].status?5:1;else for(Q("transaction at "+b.toString()+" failed: "+d),f=0;f<c.length;f++)c[f].status=5,c[f].je=d;Oh(a,b)}},e)}function Oh(a,b){var c=ai(a,b),d=c.path(),c=Zh(a,c);bi(a,c,d);return d}
function bi(a,b,c){if(0!==b.length){for(var d=[],e=[],f=Qa(b,function(a){return a.Aa}),g=0;g<b.length;g++){var k=b[g],l=N(c,k.path),m=!1,v;J(null!==l,"rerunTransactionsUnderNode_: relativePath should not be null.");if(5===k.status)m=!0,v=k.je,e=e.concat(lf(a.O,k.Aa,!0));else if(1===k.status)if(25<=k.Kf)m=!0,v="maxretry",e=e.concat(lf(a.O,k.Aa,!0));else{var y=a.O.ua(k.path,f)||C;k.md=y;var I=b[g].update(y.K());n(I)?(Sf("transaction failed: Data returned ",I,k.path),l=L(I),"object"===typeof I&&null!=
I&&u(I,".priority")||(l=l.da(y.A())),y=k.Aa,I=Nh(a),I=sc(l,I),k.nd=l,k.od=I,k.Aa=a.Ed++,Va(f,y),e=e.concat(hf(a.O,k.path,I,k.Aa,k.cf)),e=e.concat(lf(a.O,y,!0))):(m=!0,v="nodata",e=e.concat(lf(a.O,k.Aa,!0)))}zb(a.ea,c,e);e=[];m&&(b[g].status=3,setTimeout(b[g].ge,Math.floor(0)),b[g].J&&("nodata"===v?(k=new U(a,b[g].path),d.push(q(b[g].J,null,null,!1,new S(b[g].md,k,M)))):d.push(q(b[g].J,null,Error(v),!1,null))))}Yh(a,a.tc);for(g=0;g<d.length;g++)Cb(d[g]);Xh(a)}}
function ai(a,b){for(var c,d=a.tc;null!==(c=O(b))&&null===d.Ba();)d=Df(d,c),b=G(b);return d}function Zh(a,b){var c=[];ci(a,b,c);c.sort(function(a,b){return a.Ef-b.Ef});return c}function ci(a,b,c){var d=b.Ba();if(null!==d)for(var e=0;e<d.length;e++)c.push(d[e]);b.U(function(b){ci(a,b,c)})}function Yh(a,b){var c=b.Ba();if(c){for(var d=0,e=0;e<c.length;e++)3!==c[e].status&&(c[d]=c[e],d++);c.length=d;Ef(b,0<c.length?c:null)}b.U(function(b){Yh(a,b)})}
function Rh(a,b){var c=ai(a,b).path(),d=Df(a.tc,b);Hf(d,function(b){di(a,b)});di(a,d);Gf(d,function(b){di(a,b)});return c}
function di(a,b){var c=b.Ba();if(null!==c){for(var d=[],e=[],f=-1,g=0;g<c.length;g++)4!==c[g].status&&(2===c[g].status?(J(f===g-1,"All SENT items should be at beginning of queue."),f=g,c[g].status=4,c[g].je="set"):(J(1===c[g].status,"Unexpected transaction status in abort"),c[g].ge(),e=e.concat(lf(a.O,c[g].Aa,!0)),c[g].J&&d.push(q(c[g].J,null,Error("set"),!1,null))));-1===f?Ef(b,null):c.length=f+1;zb(a.ea,b.path(),e);for(g=0;g<d.length;g++)Cb(d[g])}};function W(){this.nc={};this.Pf=!1}ca(W);W.prototype.yb=function(){for(var a in this.nc)this.nc[a].yb()};W.prototype.interrupt=W.prototype.yb;W.prototype.qc=function(){for(var a in this.nc)this.nc[a].qc()};W.prototype.resume=W.prototype.qc;W.prototype.ue=function(){this.Pf=!0};function X(a,b){this.ad=a;this.qa=b}X.prototype.cancel=function(a){x("Firebase.onDisconnect().cancel",0,1,arguments.length);A("Firebase.onDisconnect().cancel",1,a,!0);this.ad.Gd(this.qa,a||null)};X.prototype.cancel=X.prototype.cancel;X.prototype.remove=function(a){x("Firebase.onDisconnect().remove",0,1,arguments.length);Yf("Firebase.onDisconnect().remove",this.qa);A("Firebase.onDisconnect().remove",1,a,!0);Sh(this.ad,this.qa,null,a)};X.prototype.remove=X.prototype.remove;
X.prototype.set=function(a,b){x("Firebase.onDisconnect().set",1,2,arguments.length);Yf("Firebase.onDisconnect().set",this.qa);Rf("Firebase.onDisconnect().set",a,this.qa,!1);A("Firebase.onDisconnect().set",2,b,!0);Sh(this.ad,this.qa,a,b)};X.prototype.set=X.prototype.set;
X.prototype.Kb=function(a,b,c){x("Firebase.onDisconnect().setWithPriority",2,3,arguments.length);Yf("Firebase.onDisconnect().setWithPriority",this.qa);Rf("Firebase.onDisconnect().setWithPriority",a,this.qa,!1);Uf("Firebase.onDisconnect().setWithPriority",2,b);A("Firebase.onDisconnect().setWithPriority",3,c,!0);Th(this.ad,this.qa,a,b,c)};X.prototype.setWithPriority=X.prototype.Kb;
X.prototype.update=function(a,b){x("Firebase.onDisconnect().update",1,2,arguments.length);Yf("Firebase.onDisconnect().update",this.qa);if(ea(a)){for(var c={},d=0;d<a.length;++d)c[""+d]=a[d];a=c;Q("Passing an Array to Firebase.onDisconnect().update() is deprecated. Use set() if you want to overwrite the existing data, or an Object with integer keys if you really do want to only update some of the children.")}Tf("Firebase.onDisconnect().update",a,this.qa);A("Firebase.onDisconnect().update",2,b,!0);
Uh(this.ad,this.qa,a,b)};X.prototype.update=X.prototype.update;function Y(a,b,c,d){this.k=a;this.path=b;this.o=c;this.jc=d}
function ei(a){var b=null,c=null;a.la&&(b=od(a));a.na&&(c=qd(a));if(a.g===Vd){if(a.la){if("[MIN_NAME]"!=nd(a))throw Error("Query: When ordering by key, you may only pass one argument to startAt(), endAt(), or equalTo().");if("string"!==typeof b)throw Error("Query: When ordering by key, the argument passed to startAt(), endAt(),or equalTo() must be a string.");}if(a.na){if("[MAX_NAME]"!=pd(a))throw Error("Query: When ordering by key, you may only pass one argument to startAt(), endAt(), or equalTo().");if("string"!==
typeof c)throw Error("Query: When ordering by key, the argument passed to startAt(), endAt(),or equalTo() must be a string.");}}else if(a.g===M){if(null!=b&&!Qf(b)||null!=c&&!Qf(c))throw Error("Query: When ordering by priority, the first argument passed to startAt(), endAt(), or equalTo() must be a valid priority value (null, a number, or a string).");}else if(J(a.g instanceof Rd||a.g===Yd,"unknown index type."),null!=b&&"object"===typeof b||null!=c&&"object"===typeof c)throw Error("Query: First argument passed to startAt(), endAt(), or equalTo() cannot be an object.");
}function fi(a){if(a.la&&a.na&&a.ia&&(!a.ia||""===a.Nb))throw Error("Query: Can't combine startAt(), endAt(), and limit(). Use limitToFirst() or limitToLast() instead.");}function gi(a,b){if(!0===a.jc)throw Error(b+": You can't combine multiple orderBy calls.");}Y.prototype.lc=function(){x("Query.ref",0,0,arguments.length);return new U(this.k,this.path)};Y.prototype.ref=Y.prototype.lc;
Y.prototype.Eb=function(a,b,c,d){x("Query.on",2,4,arguments.length);Vf("Query.on",a,!1);A("Query.on",2,b,!1);var e=hi("Query.on",c,d);if("value"===a)Vh(this.k,this,new jd(b,e.cancel||null,e.Ma||null));else{var f={};f[a]=b;Vh(this.k,this,new kd(f,e.cancel,e.Ma))}return b};Y.prototype.on=Y.prototype.Eb;
Y.prototype.gc=function(a,b,c){x("Query.off",0,3,arguments.length);Vf("Query.off",a,!0);A("Query.off",2,b,!0);lb("Query.off",3,c);var d=null,e=null;"value"===a?d=new jd(b||null,null,c||null):a&&(b&&(e={},e[a]=b),d=new kd(e,null,c||null));e=this.k;d=".info"===O(this.path)?e.zd.kb(this,d):e.O.kb(this,d);xb(e.ea,this.path,d)};Y.prototype.off=Y.prototype.gc;
Y.prototype.Ag=function(a,b){function c(g){f&&(f=!1,e.gc(a,c),b.call(d.Ma,g))}x("Query.once",2,4,arguments.length);Vf("Query.once",a,!1);A("Query.once",2,b,!1);var d=hi("Query.once",arguments[2],arguments[3]),e=this,f=!0;this.Eb(a,c,function(b){e.gc(a,c);d.cancel&&d.cancel.call(d.Ma,b)})};Y.prototype.once=Y.prototype.Ag;
Y.prototype.Ge=function(a){Q("Query.limit() being deprecated. Please use Query.limitToFirst() or Query.limitToLast() instead.");x("Query.limit",1,1,arguments.length);if(!ga(a)||Math.floor(a)!==a||0>=a)throw Error("Query.limit: First argument must be a positive integer.");if(this.o.ia)throw Error("Query.limit: Limit was already set (by another call to limit, limitToFirst, orlimitToLast.");var b=this.o.Ge(a);fi(b);return new Y(this.k,this.path,b,this.jc)};Y.prototype.limit=Y.prototype.Ge;
Y.prototype.He=function(a){x("Query.limitToFirst",1,1,arguments.length);if(!ga(a)||Math.floor(a)!==a||0>=a)throw Error("Query.limitToFirst: First argument must be a positive integer.");if(this.o.ia)throw Error("Query.limitToFirst: Limit was already set (by another call to limit, limitToFirst, or limitToLast).");return new Y(this.k,this.path,this.o.He(a),this.jc)};Y.prototype.limitToFirst=Y.prototype.He;
Y.prototype.Ie=function(a){x("Query.limitToLast",1,1,arguments.length);if(!ga(a)||Math.floor(a)!==a||0>=a)throw Error("Query.limitToLast: First argument must be a positive integer.");if(this.o.ia)throw Error("Query.limitToLast: Limit was already set (by another call to limit, limitToFirst, or limitToLast).");return new Y(this.k,this.path,this.o.Ie(a),this.jc)};Y.prototype.limitToLast=Y.prototype.Ie;
Y.prototype.Bg=function(a){x("Query.orderByChild",1,1,arguments.length);if("$key"===a)throw Error('Query.orderByChild: "$key" is invalid.  Use Query.orderByKey() instead.');if("$priority"===a)throw Error('Query.orderByChild: "$priority" is invalid.  Use Query.orderByPriority() instead.');if("$value"===a)throw Error('Query.orderByChild: "$value" is invalid.  Use Query.orderByValue() instead.');Wf("Query.orderByChild",1,a,!1);gi(this,"Query.orderByChild");var b=be(this.o,new Rd(a));ei(b);return new Y(this.k,
this.path,b,!0)};Y.prototype.orderByChild=Y.prototype.Bg;Y.prototype.Cg=function(){x("Query.orderByKey",0,0,arguments.length);gi(this,"Query.orderByKey");var a=be(this.o,Vd);ei(a);return new Y(this.k,this.path,a,!0)};Y.prototype.orderByKey=Y.prototype.Cg;Y.prototype.Dg=function(){x("Query.orderByPriority",0,0,arguments.length);gi(this,"Query.orderByPriority");var a=be(this.o,M);ei(a);return new Y(this.k,this.path,a,!0)};Y.prototype.orderByPriority=Y.prototype.Dg;
Y.prototype.Eg=function(){x("Query.orderByValue",0,0,arguments.length);gi(this,"Query.orderByValue");var a=be(this.o,Yd);ei(a);return new Y(this.k,this.path,a,!0)};Y.prototype.orderByValue=Y.prototype.Eg;
Y.prototype.Xd=function(a,b){x("Query.startAt",0,2,arguments.length);Rf("Query.startAt",a,this.path,!0);Wf("Query.startAt",2,b,!0);var c=this.o.Xd(a,b);fi(c);ei(c);if(this.o.la)throw Error("Query.startAt: Starting point was already set (by another call to startAt or equalTo).");n(a)||(b=a=null);return new Y(this.k,this.path,c,this.jc)};Y.prototype.startAt=Y.prototype.Xd;
Y.prototype.qd=function(a,b){x("Query.endAt",0,2,arguments.length);Rf("Query.endAt",a,this.path,!0);Wf("Query.endAt",2,b,!0);var c=this.o.qd(a,b);fi(c);ei(c);if(this.o.na)throw Error("Query.endAt: Ending point was already set (by another call to endAt or equalTo).");return new Y(this.k,this.path,c,this.jc)};Y.prototype.endAt=Y.prototype.qd;
Y.prototype.hg=function(a,b){x("Query.equalTo",1,2,arguments.length);Rf("Query.equalTo",a,this.path,!1);Wf("Query.equalTo",2,b,!0);if(this.o.la)throw Error("Query.equalTo: Starting point was already set (by another call to endAt or equalTo).");if(this.o.na)throw Error("Query.equalTo: Ending point was already set (by another call to endAt or equalTo).");return this.Xd(a,b).qd(a,b)};Y.prototype.equalTo=Y.prototype.hg;
Y.prototype.toString=function(){x("Query.toString",0,0,arguments.length);for(var a=this.path,b="",c=a.Y;c<a.n.length;c++)""!==a.n[c]&&(b+="/"+encodeURIComponent(String(a.n[c])));return this.k.toString()+(b||"/")};Y.prototype.toString=Y.prototype.toString;Y.prototype.wa=function(){var a=Wc(ce(this.o));return"{}"===a?"default":a};
function hi(a,b,c){var d={cancel:null,Ma:null};if(b&&c)d.cancel=b,A(a,3,d.cancel,!0),d.Ma=c,lb(a,4,d.Ma);else if(b)if("object"===typeof b&&null!==b)d.Ma=b;else if("function"===typeof b)d.cancel=b;else throw Error(z(a,3,!0)+" must either be a cancel callback or a context object.");return d};var Z={};Z.vc=wh;Z.DataConnection=Z.vc;wh.prototype.Og=function(a,b){this.Da("q",{p:a},b)};Z.vc.prototype.simpleListen=Z.vc.prototype.Og;wh.prototype.gg=function(a,b){this.Da("echo",{d:a},b)};Z.vc.prototype.echo=Z.vc.prototype.gg;wh.prototype.interrupt=wh.prototype.yb;Z.Sf=kh;Z.RealTimeConnection=Z.Sf;kh.prototype.sendRequest=kh.prototype.Da;kh.prototype.close=kh.prototype.close;
Z.og=function(a){var b=wh.prototype.put;wh.prototype.put=function(c,d,e,f){n(f)&&(f=a());b.call(this,c,d,e,f)};return function(){wh.prototype.put=b}};Z.hijackHash=Z.og;Z.Rf=Ec;Z.ConnectionTarget=Z.Rf;Z.wa=function(a){return a.wa()};Z.queryIdentifier=Z.wa;Z.qg=function(a){return a.k.Ra.aa};Z.listens=Z.qg;Z.ue=function(a){a.ue()};Z.forceRestClient=Z.ue;function U(a,b){var c,d,e;if(a instanceof Kh)c=a,d=b;else{x("new Firebase",1,2,arguments.length);d=Rc(arguments[0]);c=d.Qg;"firebase"===d.domain&&Qc(d.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead");c||Qc("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com");d.lb||"undefined"!==typeof window&&window.location&&window.location.protocol&&-1!==window.location.protocol.indexOf("https:")&&Q("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().");
c=new Ec(d.host,d.lb,c,"ws"===d.scheme||"wss"===d.scheme);d=new K(d.Zc);e=d.toString();var f;!(f=!p(c.host)||0===c.host.length||!Pf(c.Cb))&&(f=0!==e.length)&&(e&&(e=e.replace(/^\/*\.info(\/|$)/,"/")),f=!(p(e)&&0!==e.length&&!Of.test(e)));if(f)throw Error(z("new Firebase",1,!1)+'must be a valid firebase URL and the path can\'t contain ".", "#", "$", "[", or "]".');if(b)if(b instanceof W)e=b;else if(p(b))e=W.ub(),c.Ld=b;else throw Error("Expected a valid Firebase.Context for second argument to new Firebase()");
else e=W.ub();f=c.toString();var g=w(e.nc,f);g||(g=new Kh(c,e.Pf),e.nc[f]=g);c=g}Y.call(this,c,d,$d,!1)}ma(U,Y);var ii=U,ji=["Firebase"],ki=aa;ji[0]in ki||!ki.execScript||ki.execScript("var "+ji[0]);for(var li;ji.length&&(li=ji.shift());)!ji.length&&n(ii)?ki[li]=ii:ki=ki[li]?ki[li]:ki[li]={};U.prototype.name=function(){Q("Firebase.name() being deprecated. Please use Firebase.key() instead.");x("Firebase.name",0,0,arguments.length);return this.key()};U.prototype.name=U.prototype.name;
U.prototype.key=function(){x("Firebase.key",0,0,arguments.length);return this.path.e()?null:vc(this.path)};U.prototype.key=U.prototype.key;U.prototype.w=function(a){x("Firebase.child",1,1,arguments.length);if(ga(a))a=String(a);else if(!(a instanceof K))if(null===O(this.path)){var b=a;b&&(b=b.replace(/^\/*\.info(\/|$)/,"/"));Xf("Firebase.child",b)}else Xf("Firebase.child",a);return new U(this.k,this.path.w(a))};U.prototype.child=U.prototype.w;
U.prototype.parent=function(){x("Firebase.parent",0,0,arguments.length);var a=this.path.parent();return null===a?null:new U(this.k,a)};U.prototype.parent=U.prototype.parent;U.prototype.root=function(){x("Firebase.ref",0,0,arguments.length);for(var a=this;null!==a.parent();)a=a.parent();return a};U.prototype.root=U.prototype.root;
U.prototype.set=function(a,b){x("Firebase.set",1,2,arguments.length);Yf("Firebase.set",this.path);Rf("Firebase.set",a,this.path,!1);A("Firebase.set",2,b,!0);this.k.Kb(this.path,a,null,b||null)};U.prototype.set=U.prototype.set;
U.prototype.update=function(a,b){x("Firebase.update",1,2,arguments.length);Yf("Firebase.update",this.path);if(ea(a)){for(var c={},d=0;d<a.length;++d)c[""+d]=a[d];a=c;Q("Passing an Array to Firebase.update() is deprecated. Use set() if you want to overwrite the existing data, or an Object with integer keys if you really do want to only update some of the children.")}Tf("Firebase.update",a,this.path);A("Firebase.update",2,b,!0);this.k.update(this.path,a,b||null)};U.prototype.update=U.prototype.update;
U.prototype.Kb=function(a,b,c){x("Firebase.setWithPriority",2,3,arguments.length);Yf("Firebase.setWithPriority",this.path);Rf("Firebase.setWithPriority",a,this.path,!1);Uf("Firebase.setWithPriority",2,b);A("Firebase.setWithPriority",3,c,!0);if(".length"===this.key()||".keys"===this.key())throw"Firebase.setWithPriority failed: "+this.key()+" is a read-only object.";this.k.Kb(this.path,a,b,c||null)};U.prototype.setWithPriority=U.prototype.Kb;
U.prototype.remove=function(a){x("Firebase.remove",0,1,arguments.length);Yf("Firebase.remove",this.path);A("Firebase.remove",1,a,!0);this.set(null,a)};U.prototype.remove=U.prototype.remove;
U.prototype.transaction=function(a,b,c){x("Firebase.transaction",1,3,arguments.length);Yf("Firebase.transaction",this.path);A("Firebase.transaction",1,a,!1);A("Firebase.transaction",2,b,!0);if(n(c)&&"boolean"!=typeof c)throw Error(z("Firebase.transaction",3,!0)+"must be a boolean.");if(".length"===this.key()||".keys"===this.key())throw"Firebase.transaction failed: "+this.key()+" is a read-only object.";"undefined"===typeof c&&(c=!0);Wh(this.k,this.path,a,b||null,c)};U.prototype.transaction=U.prototype.transaction;
U.prototype.Lg=function(a,b){x("Firebase.setPriority",1,2,arguments.length);Yf("Firebase.setPriority",this.path);Uf("Firebase.setPriority",1,a);A("Firebase.setPriority",2,b,!0);this.k.Kb(this.path.w(".priority"),a,null,b)};U.prototype.setPriority=U.prototype.Lg;
U.prototype.push=function(a,b){x("Firebase.push",0,2,arguments.length);Yf("Firebase.push",this.path);Rf("Firebase.push",a,this.path,!0);A("Firebase.push",2,b,!0);var c=Mh(this.k),c=Kf(c),c=this.w(c);"undefined"!==typeof a&&null!==a&&c.set(a,b);return c};U.prototype.push=U.prototype.push;U.prototype.jb=function(){Yf("Firebase.onDisconnect",this.path);return new X(this.k,this.path)};U.prototype.onDisconnect=U.prototype.jb;
U.prototype.P=function(a,b,c){Q("FirebaseRef.auth() being deprecated. Please use FirebaseRef.authWithCustomToken() instead.");x("Firebase.auth",1,3,arguments.length);Zf("Firebase.auth",a);A("Firebase.auth",2,b,!0);A("Firebase.auth",3,b,!0);Kg(this.k.P,a,{},{remember:"none"},b,c)};U.prototype.auth=U.prototype.P;U.prototype.ee=function(a){x("Firebase.unauth",0,1,arguments.length);A("Firebase.unauth",1,a,!0);Lg(this.k.P,a)};U.prototype.unauth=U.prototype.ee;
U.prototype.we=function(){x("Firebase.getAuth",0,0,arguments.length);return this.k.P.we()};U.prototype.getAuth=U.prototype.we;U.prototype.ug=function(a,b){x("Firebase.onAuth",1,2,arguments.length);A("Firebase.onAuth",1,a,!1);lb("Firebase.onAuth",2,b);this.k.P.Eb("auth_status",a,b)};U.prototype.onAuth=U.prototype.ug;U.prototype.tg=function(a,b){x("Firebase.offAuth",1,2,arguments.length);A("Firebase.offAuth",1,a,!1);lb("Firebase.offAuth",2,b);this.k.P.gc("auth_status",a,b)};U.prototype.offAuth=U.prototype.tg;
U.prototype.Wf=function(a,b,c){x("Firebase.authWithCustomToken",2,3,arguments.length);Zf("Firebase.authWithCustomToken",a);A("Firebase.authWithCustomToken",2,b,!1);ag("Firebase.authWithCustomToken",3,c,!0);Kg(this.k.P,a,{},c||{},b)};U.prototype.authWithCustomToken=U.prototype.Wf;U.prototype.Xf=function(a,b,c){x("Firebase.authWithOAuthPopup",2,3,arguments.length);$f("Firebase.authWithOAuthPopup",1,a);A("Firebase.authWithOAuthPopup",2,b,!1);ag("Firebase.authWithOAuthPopup",3,c,!0);Pg(this.k.P,a,c,b)};
U.prototype.authWithOAuthPopup=U.prototype.Xf;U.prototype.Yf=function(a,b,c){x("Firebase.authWithOAuthRedirect",2,3,arguments.length);$f("Firebase.authWithOAuthRedirect",1,a);A("Firebase.authWithOAuthRedirect",2,b,!1);ag("Firebase.authWithOAuthRedirect",3,c,!0);var d=this.k.P;Ng(d);var e=[wg],f=ig(c);"anonymous"===a||"firebase"===a?R(b,yg("TRANSPORT_UNAVAILABLE")):(P.set("redirect_client_options",f.ld),Og(d,e,"/auth/"+a,f,b))};U.prototype.authWithOAuthRedirect=U.prototype.Yf;
U.prototype.Zf=function(a,b,c,d){x("Firebase.authWithOAuthToken",3,4,arguments.length);$f("Firebase.authWithOAuthToken",1,a);A("Firebase.authWithOAuthToken",3,c,!1);ag("Firebase.authWithOAuthToken",4,d,!0);p(b)?($f("Firebase.authWithOAuthToken",2,b),Mg(this.k.P,a+"/token",{access_token:b},d,c)):(ag("Firebase.authWithOAuthToken",2,b,!1),Mg(this.k.P,a+"/token",b,d,c))};U.prototype.authWithOAuthToken=U.prototype.Zf;
U.prototype.Vf=function(a,b){x("Firebase.authAnonymously",1,2,arguments.length);A("Firebase.authAnonymously",1,a,!1);ag("Firebase.authAnonymously",2,b,!0);Mg(this.k.P,"anonymous",{},b,a)};U.prototype.authAnonymously=U.prototype.Vf;
U.prototype.$f=function(a,b,c){x("Firebase.authWithPassword",2,3,arguments.length);ag("Firebase.authWithPassword",1,a,!1);bg("Firebase.authWithPassword",a,"email");bg("Firebase.authWithPassword",a,"password");A("Firebase.authAnonymously",2,b,!1);ag("Firebase.authAnonymously",3,c,!0);Mg(this.k.P,"password",a,c,b)};U.prototype.authWithPassword=U.prototype.$f;
U.prototype.re=function(a,b){x("Firebase.createUser",2,2,arguments.length);ag("Firebase.createUser",1,a,!1);bg("Firebase.createUser",a,"email");bg("Firebase.createUser",a,"password");A("Firebase.createUser",2,b,!1);this.k.P.re(a,b)};U.prototype.createUser=U.prototype.re;U.prototype.Se=function(a,b){x("Firebase.removeUser",2,2,arguments.length);ag("Firebase.removeUser",1,a,!1);bg("Firebase.removeUser",a,"email");bg("Firebase.removeUser",a,"password");A("Firebase.removeUser",2,b,!1);this.k.P.Se(a,b)};
U.prototype.removeUser=U.prototype.Se;U.prototype.oe=function(a,b){x("Firebase.changePassword",2,2,arguments.length);ag("Firebase.changePassword",1,a,!1);bg("Firebase.changePassword",a,"email");bg("Firebase.changePassword",a,"oldPassword");bg("Firebase.changePassword",a,"newPassword");A("Firebase.changePassword",2,b,!1);this.k.P.oe(a,b)};U.prototype.changePassword=U.prototype.oe;
U.prototype.ne=function(a,b){x("Firebase.changeEmail",2,2,arguments.length);ag("Firebase.changeEmail",1,a,!1);bg("Firebase.changeEmail",a,"oldEmail");bg("Firebase.changeEmail",a,"newEmail");bg("Firebase.changeEmail",a,"password");A("Firebase.changeEmail",2,b,!1);this.k.P.ne(a,b)};U.prototype.changeEmail=U.prototype.ne;
U.prototype.Ue=function(a,b){x("Firebase.resetPassword",2,2,arguments.length);ag("Firebase.resetPassword",1,a,!1);bg("Firebase.resetPassword",a,"email");A("Firebase.resetPassword",2,b,!1);this.k.P.Ue(a,b)};U.prototype.resetPassword=U.prototype.Ue;U.goOffline=function(){x("Firebase.goOffline",0,0,arguments.length);W.ub().yb()};U.goOnline=function(){x("Firebase.goOnline",0,0,arguments.length);W.ub().qc()};
function Nc(a,b){J(!b||!0===a||!1===a,"Can't turn on custom loggers persistently.");!0===a?("undefined"!==typeof console&&("function"===typeof console.log?Ab=q(console.log,console):"object"===typeof console.log&&(Ab=function(a){console.log(a)})),b&&P.set("logging_enabled",!0)):a?Ab=a:(Ab=null,P.remove("logging_enabled"))}U.enableLogging=Nc;U.ServerValue={TIMESTAMP:{".sv":"timestamp"}};U.SDK_VERSION="2.2.6";U.INTERNAL=V;U.Context=W;U.TEST_ACCESS=Z;})();



// setup
Elm.Native = Elm.Native || {};
Elm.Native.Graphics = Elm.Native.Graphics || {};
Elm.Native.Graphics.Collage = Elm.Native.Graphics.Collage || {};

// definition
Elm.Native.Graphics.Collage.make = function(localRuntime) {
	'use strict';

	// attempt to short-circuit
	localRuntime.Native = localRuntime.Native || {};
	localRuntime.Native.Graphics = localRuntime.Native.Graphics || {};
	localRuntime.Native.Graphics.Collage = localRuntime.Native.Graphics.Collage || {};
	if ('values' in localRuntime.Native.Graphics.Collage)
	{
		return localRuntime.Native.Graphics.Collage.values;
	}

	// okay, we cannot short-ciruit, so now we define everything
	var Color = Elm.Native.Color.make(localRuntime);
	var List = Elm.Native.List.make(localRuntime);
	var NativeElement = Elm.Native.Graphics.Element.make(localRuntime);
	var Transform = Elm.Transform2D.make(localRuntime);
	var Utils = Elm.Native.Utils.make(localRuntime);

	function setStrokeStyle(ctx, style)
	{
		ctx.lineWidth = style.width;

		var cap = style.cap.ctor;
		ctx.lineCap = cap === 'Flat'
			? 'butt'
			: cap === 'Round'
				? 'round'
				: 'square';

		var join = style.join.ctor;
		ctx.lineJoin = join === 'Smooth'
			? 'round'
			: join === 'Sharp'
				? 'miter'
				: 'bevel';

		ctx.miterLimit = style.join._0 || 10;
		ctx.strokeStyle = Color.toCss(style.color);
	}

	function setFillStyle(ctx, style)
	{
		var sty = style.ctor;
		ctx.fillStyle = sty === 'Solid'
			? Color.toCss(style._0)
			: sty === 'Texture'
				? texture(redo, ctx, style._0)
				: gradient(ctx, style._0);
	}

	function trace(ctx, path)
	{
		var points = List.toArray(path);
		var i = points.length - 1;
		if (i <= 0)
		{
			return;
		}
		ctx.moveTo(points[i]._0, points[i]._1);
		while (i--)
		{
			ctx.lineTo(points[i]._0, points[i]._1);
		}
		if (path.closed)
		{
			i = points.length - 1;
			ctx.lineTo(points[i]._0, points[i]._1);
		}
	}

	function line(ctx,style,path)
	{
		(style.dashing.ctor === '[]')
			? trace(ctx, path)
			: customLineHelp(ctx, style, path);
		ctx.scale(1,-1);
		ctx.stroke();
	}

	function customLineHelp(ctx, style, path)
	{
		var points = List.toArray(path);
		if (path.closed)
		{
			points.push(points[0]);
		}
		var pattern = List.toArray(style.dashing);
		var i = points.length - 1;
		if (i <= 0)
		{
			return;
		}
		var x0 = points[i]._0, y0 = points[i]._1;
		var x1=0, y1=0, dx=0, dy=0, remaining=0, nx=0, ny=0;
		var pindex = 0, plen = pattern.length;
		var draw = true, segmentLength = pattern[0];
		ctx.moveTo(x0,y0);
		while (i--)
		{
			x1 = points[i]._0;
			y1 = points[i]._1;
			dx = x1 - x0;
			dy = y1 - y0;
			remaining = Math.sqrt(dx * dx + dy * dy);
			while (segmentLength <= remaining)
			{
				x0 += dx * segmentLength / remaining;
				y0 += dy * segmentLength / remaining;
				ctx[draw ? 'lineTo' : 'moveTo'](x0, y0);
				// update starting position
				dx = x1 - x0;
				dy = y1 - y0;
				remaining = Math.sqrt(dx * dx + dy * dy);
				// update pattern
				draw = !draw;
				pindex = (pindex + 1) % plen;
				segmentLength = pattern[pindex];
			}
			if (remaining > 0)
			{
				ctx[draw ? 'lineTo' : 'moveTo'](x1, y1);
				segmentLength -= remaining;
			}
			x0 = x1;
			y0 = y1;
		}
	}

	function drawLine(ctx, style, path)
	{
		setStrokeStyle(ctx, style);
		return line(ctx, style, path);
	}

	function texture(redo, ctx, src)
	{
		var img = new Image();
		img.src = src;
		img.onload = redo;
		return ctx.createPattern(img, 'repeat');
	}

	function gradient(ctx, grad)
	{
		var g;
		var stops = [];
		if (grad.ctor === 'Linear')
		{
			var p0 = grad._0, p1 = grad._1;
			g = ctx.createLinearGradient(p0._0, -p0._1, p1._0, -p1._1);
			stops = List.toArray(grad._2);
		}
		else
		{
			var p0 = grad._0, p2 = grad._2;
			g = ctx.createRadialGradient(p0._0, -p0._1, grad._1, p2._0, -p2._1, grad._3);
			stops = List.toArray(grad._4);
		}
		var len = stops.length;
		for (var i = 0; i < len; ++i)
		{
			var stop = stops[i];
			g.addColorStop(stop._0, Color.toCss(stop._1));
		}
		return g;
	}

	function drawShape(redo, ctx, style, path)
	{
		trace(ctx, path);
		setFillStyle(ctx, style);
		ctx.scale(1,-1);
		ctx.fill();
	}


	// TEXT RENDERING

	function fillText(redo, ctx, text)
	{
		drawText(ctx, text, ctx.fillText);
	}

	function strokeText(redo, ctx, style, text)
	{
		setStrokeStyle(ctx, style);
		// Use native canvas API for dashes only for text for now
		// Degrades to non-dashed on IE 9 + 10
		if (style.dashing.ctor !== '[]' && ctx.setLineDash)
		{
			var pattern = List.toArray(style.dashing);
			ctx.setLineDash(pattern);
		}
		drawText(ctx, text, ctx.strokeText);
	}

	function drawText(ctx, text, canvasDrawFn)
	{
		var textChunks = chunkText(defaultContext, text);

		var totalWidth = 0;
		var maxHeight = 0;
		var numChunks = textChunks.length;

		ctx.scale(1,-1);

		for (var i = numChunks; i--; )
		{
			var chunk = textChunks[i];
			ctx.font = chunk.font;
			var metrics = ctx.measureText(chunk.text);
			chunk.width = metrics.width;
			totalWidth += chunk.width;
			if (chunk.height > maxHeight)
			{
				maxHeight = chunk.height;
			}
		}

		var x = -totalWidth / 2.0;
		for (var i = 0; i < numChunks; ++i)
		{
			var chunk = textChunks[i];
			ctx.font = chunk.font;
			ctx.fillStyle = chunk.color;
			canvasDrawFn.call(ctx, chunk.text, x, maxHeight / 2);
			x += chunk.width;
		}
	}

	function toFont(props)
	{
		return [
			props['font-style'],
			props['font-variant'],
			props['font-weight'],
			props['font-size'],
			props['font-family']
		].join(' ');
	}


	// Convert the object returned by the text module
	// into something we can use for styling canvas text
	function chunkText(context, text)
	{
		var tag = text.ctor;
		if (tag === 'Text:Append')
		{
			var leftChunks = chunkText(context, text._0);
			var rightChunks = chunkText(context, text._1);
			return leftChunks.concat(rightChunks);
		}
		if (tag === 'Text:Text')
		{
			return [{
				text: text._0,
				color: context.color,
				height: context['font-size'].slice(0,-2) | 0,
				font: toFont(context)
			}];
		}
		if (tag === 'Text:Meta')
		{
			var newContext = freshContext(text._0, context);
			return chunkText(newContext, text._1);
		}
	}

	function freshContext(props, ctx)
	{
		return {
			'font-style': props['font-style'] || ctx['font-style'],
			'font-variant': props['font-variant'] || ctx['font-variant'],
			'font-weight': props['font-weight'] || ctx['font-weight'],
			'font-size': props['font-size'] || ctx['font-size'],
			'font-family': props['font-family'] || ctx['font-family'],
			'color': props['color'] || ctx['color']
		};
	}

	var defaultContext = {
		'font-style': 'normal',
		'font-variant': 'normal',
		'font-weight': 'normal',
		'font-size': '12px',
		'font-family': 'sans-serif',
		'color': 'black'
	};


	// IMAGES

	function drawImage(redo, ctx, form)
	{
		var img = new Image();
		img.onload = redo;
		img.src = form._3;
		var w = form._0,
			h = form._1,
			pos = form._2,
			srcX = pos._0,
			srcY = pos._1,
			srcW = w,
			srcH = h,
			destX = -w/2,
			destY = -h/2,
			destW = w,
			destH = h;

		ctx.scale(1,-1);
		ctx.drawImage(img, srcX, srcY, srcW, srcH, destX, destY, destW, destH);
	}

	function renderForm(redo, ctx, form)
	{
		ctx.save();

		var x = form.x,
			y = form.y,
			theta = form.theta,
			scale = form.scale;

		if (x !== 0 || y !== 0)
		{
			ctx.translate(x, y);
		}
		if (theta !== 0)
		{
			ctx.rotate(theta);
		}
		if (scale !== 1)
		{
			ctx.scale(scale,scale);
		}
		if (form.alpha !== 1)
		{
			ctx.globalAlpha = ctx.globalAlpha * form.alpha;
		}

		ctx.beginPath();
		var f = form.form;
		switch (f.ctor)
		{
			case 'FPath':
				drawLine(ctx, f._0, f._1);
				break;

			case 'FImage':
				drawImage(redo, ctx, f);
				break;

			case 'FShape':
				if (f._0.ctor === 'Line')
				{
					f._1.closed = true;
					drawLine(ctx, f._0._0, f._1);
				}
				else
				{
					drawShape(redo, ctx, f._0._0, f._1);
				}
				break;

			case 'FText':
				fillText(redo, ctx, f._0);
				break;

			case 'FOutlinedText':
				strokeText(redo, ctx, f._0, f._1);
				break;
		}
		ctx.restore();
	}

	function formToMatrix(form)
	{
	   var scale = form.scale;
	   var matrix = A6( Transform.matrix, scale, 0, 0, scale, form.x, form.y );

	   var theta = form.theta
	   if (theta !== 0)
	   {
		   matrix = A2( Transform.multiply, matrix, Transform.rotation(theta) );
	   }

	   return matrix;
	}

	function str(n)
	{
		if (n < 0.00001 && n > -0.00001)
		{
			return 0;
		}
		return n;
	}

	function makeTransform(w, h, form, matrices)
	{
		var props = form.form._0.props;
		var m = A6( Transform.matrix, 1, 0, 0, -1,
					(w - props.width ) / 2,
					(h - props.height) / 2 );
		var len = matrices.length;
		for (var i = 0; i < len; ++i)
		{
			m = A2( Transform.multiply, m, matrices[i] );
		}
		m = A2( Transform.multiply, m, formToMatrix(form) );

		return 'matrix(' +
			str( m[0]) + ', ' + str( m[3]) + ', ' +
			str(-m[1]) + ', ' + str(-m[4]) + ', ' +
			str( m[2]) + ', ' + str( m[5]) + ')';
	}

	function stepperHelp(list)
	{
		var arr = List.toArray(list);
		var i = 0;
		function peekNext()
		{
			return i < arr.length ? arr[i].form.ctor : '';
		}
		// assumes that there is a next element
		function next()
		{
			var out = arr[i];
			++i;
			return out;
		}
		return {
			peekNext: peekNext,
			next: next
		};
	}

	function formStepper(forms)
	{
		var ps = [stepperHelp(forms)];
		var matrices = [];
		var alphas = [];
		function peekNext()
		{
			var len = ps.length;
			var formType = '';
			for (var i = 0; i < len; ++i )
			{
				if (formType = ps[i].peekNext()) return formType;
			}
			return '';
		}
		// assumes that there is a next element
		function next(ctx)
		{
			while (!ps[0].peekNext())
			{
				ps.shift();
				matrices.pop();
				alphas.shift();
				if (ctx)
				{
					ctx.restore();
				}
			}
			var out = ps[0].next();
			var f = out.form;
			if (f.ctor === 'FGroup')
			{
				ps.unshift(stepperHelp(f._1));
				var m = A2(Transform.multiply, f._0, formToMatrix(out));
				ctx.save();
				ctx.transform(m[0], m[3], m[1], m[4], m[2], m[5]);
				matrices.push(m);

				var alpha = (alphas[0] || 1) * out.alpha;
				alphas.unshift(alpha);
				ctx.globalAlpha = alpha;
			}
			return out;
		}
		function transforms()
		{
			return matrices;
		}
		function alpha()
		{
			return alphas[0] || 1;
		}
		return {
			peekNext: peekNext,
			next: next,
			transforms: transforms,
			alpha: alpha
		};
	}

	function makeCanvas(w,h)
	{
		var canvas = NativeElement.createNode('canvas');
		canvas.style.width  = w + 'px';
		canvas.style.height = h + 'px';
		canvas.style.display = "block";
		canvas.style.position = "absolute";
		var ratio = window.devicePixelRatio || 1;
		canvas.width  = w * ratio;
		canvas.height = h * ratio;
		return canvas;
	}

	function render(model)
	{
		var div = NativeElement.createNode('div');
		div.style.overflow = 'hidden';
		div.style.position = 'relative';
		update(div, model, model);
		return div;
	}

	function nodeStepper(w,h,div)
	{
		var kids = div.childNodes;
		var i = 0;
		var ratio = window.devicePixelRatio || 1;

		function transform(transforms, ctx)
		{
			ctx.translate( w / 2 * ratio, h / 2 * ratio );
			ctx.scale( ratio, -ratio );
			var len = transforms.length;
			for (var i = 0; i < len; ++i)
			{
				var m = transforms[i];
				ctx.save();
				ctx.transform(m[0], m[3], m[1], m[4], m[2], m[5]);
			}
			return ctx;
		}
		function nextContext(transforms)
		{
			while (i < kids.length)
			{
				var node = kids[i];
				if (node.getContext)
				{
					node.width = w * ratio;
					node.height = h * ratio;
					node.style.width = w + 'px';
					node.style.height = h + 'px';
					++i;
					return transform(transforms, node.getContext('2d'));
				}
				div.removeChild(node);
			}
			var canvas = makeCanvas(w,h);
			div.appendChild(canvas);
			// we have added a new node, so we must step our position
			++i;
			return transform(transforms, canvas.getContext('2d'));
		}
		function addElement(matrices, alpha, form)
		{
			var kid = kids[i];
			var elem = form.form._0;

			var node = (!kid || kid.getContext)
				? NativeElement.render(elem)
				: NativeElement.update(kid, kid.oldElement, elem);

			node.style.position = 'absolute';
			node.style.opacity = alpha * form.alpha * elem.props.opacity;
			NativeElement.addTransform(node.style, makeTransform(w, h, form, matrices));
			node.oldElement = elem;
			++i;
			if (!kid)
			{
				div.appendChild(node);
			}
			else
			{
				div.insertBefore(node, kid);
			}
		}
		function clearRest()
		{
			while (i < kids.length)
			{
				div.removeChild(kids[i]);
			}
		}
		return {
			nextContext: nextContext,
			addElement: addElement,
			clearRest: clearRest
		};
	}


	function update(div, _, model)
	{
		var w = model.w;
		var h = model.h;

		var forms = formStepper(model.forms);
		var nodes = nodeStepper(w,h,div);
		var ctx = null;
		var formType = '';

		while (formType = forms.peekNext())
		{
			// make sure we have context if we need it
			if (ctx === null && formType !== 'FElement')
			{
				ctx = nodes.nextContext(forms.transforms());
				ctx.globalAlpha = forms.alpha();
			}

			var form = forms.next(ctx);
			// if it is FGroup, all updates are made within formStepper when next is called.
			if (formType === 'FElement')
			{
				// update or insert an element, get a new context
				nodes.addElement(forms.transforms(), forms.alpha(), form);
				ctx = null;
			}
			else if (formType !== 'FGroup')
			{
				renderForm(function() { update(div, model, model); }, ctx, form);
			}
		}
		nodes.clearRest();
		return div;
	}


	function collage(w,h,forms)
	{
		return A3(NativeElement.newElement, w, h, {
			ctor: 'Custom',
			type: 'Collage',
			render: render,
			update: update,
			model: {w:w, h:h, forms:forms}
		});
	}

	return localRuntime.Native.Graphics.Collage.values = {
		collage: F3(collage)
	};

};


// setup
Elm.Native = Elm.Native || {};
Elm.Native.Graphics = Elm.Native.Graphics || {};
Elm.Native.Graphics.Element = Elm.Native.Graphics.Element || {};

// definition
Elm.Native.Graphics.Element.make = function(localRuntime) {
	'use strict';

	// attempt to short-circuit
	localRuntime.Native = localRuntime.Native || {};
	localRuntime.Native.Graphics = localRuntime.Native.Graphics || {};
	localRuntime.Native.Graphics.Element = localRuntime.Native.Graphics.Element || {};
	if ('values' in localRuntime.Native.Graphics.Element)
	{
		return localRuntime.Native.Graphics.Element.values;
	}

	var Color = Elm.Native.Color.make(localRuntime);
	var List = Elm.Native.List.make(localRuntime);
	var Maybe = Elm.Maybe.make(localRuntime);
	var Text = Elm.Native.Text.make(localRuntime);
	var Utils = Elm.Native.Utils.make(localRuntime);


	// CREATION

	function createNode(elementType)
	{
		var node = document.createElement(elementType);
		node.style.padding = "0";
		node.style.margin = "0";
		return node;
	}


	function newElement(width, height, elementPrim)
	{
		return {
			_: {},
			element: elementPrim,
			props: {
				_: {},
				id: Utils.guid(),
				width: width,
				height: height,
				opacity: 1,
				color: Maybe.Nothing,
				href: "",
				tag: "",
				hover: Utils.Tuple0,
				click: Utils.Tuple0
			}
		};
	}


	// PROPERTIES

	function setProps(elem, node)
	{
		var props = elem.props;

		var element = elem.element;
		var width = props.width - (element.adjustWidth || 0);
		var height = props.height - (element.adjustHeight || 0);
		node.style.width  = (width |0) + 'px';
		node.style.height = (height|0) + 'px';

		if (props.opacity !== 1)
		{
			node.style.opacity = props.opacity;
		}

		if (props.color.ctor === 'Just')
		{
			node.style.backgroundColor = Color.toCss(props.color._0);
		}

		if (props.tag !== '')
		{
			node.id = props.tag;
		}

		if (props.hover.ctor !== '_Tuple0')
		{
			addHover(node, props.hover);
		}

		if (props.click.ctor !== '_Tuple0')
		{
			addClick(node, props.click);
		}

		if (props.href !== '')
		{
			var anchor = createNode('a');
			anchor.href = props.href;
			anchor.style.display = 'block';
			anchor.style.pointerEvents = 'auto';
			anchor.appendChild(node);
			node = anchor;
		}

		return node;
	}

	function addClick(e, handler)
	{
		e.style.pointerEvents = 'auto';
		e.elm_click_handler = handler;
		function trigger(ev)
		{
			e.elm_click_handler(Utils.Tuple0);
			ev.stopPropagation();
		}
		e.elm_click_trigger = trigger;
		e.addEventListener('click', trigger);
	}

	function removeClick(e, handler)
	{
		if (e.elm_click_trigger)
		{
			e.removeEventListener('click', e.elm_click_trigger);
			e.elm_click_trigger = null;
			e.elm_click_handler = null;
		}
	}

	function addHover(e, handler)
	{
		e.style.pointerEvents = 'auto';
		e.elm_hover_handler = handler;
		e.elm_hover_count = 0;

		function over(evt)
		{
			if (e.elm_hover_count++ > 0) return;
			e.elm_hover_handler(true);
			evt.stopPropagation();
		}
		function out(evt)
		{
			if (e.contains(evt.toElement || evt.relatedTarget)) return;
			e.elm_hover_count = 0;
			e.elm_hover_handler(false);
			evt.stopPropagation();
		}
		e.elm_hover_over = over;
		e.elm_hover_out = out;
		e.addEventListener('mouseover', over);
		e.addEventListener('mouseout', out);
	}

	function removeHover(e)
	{
		e.elm_hover_handler = null;
		if (e.elm_hover_over)
		{
			e.removeEventListener('mouseover', e.elm_hover_over);
			e.elm_hover_over = null;
		}
		if (e.elm_hover_out)
		{
			e.removeEventListener('mouseout', e.elm_hover_out);
			e.elm_hover_out = null;
		}
	}


	// IMAGES

	function image(props, img)
	{
		switch (img._0.ctor)
		{
			case 'Plain':
				return plainImage(img._3);

			case 'Fitted':
				return fittedImage(props.width, props.height, img._3);

			case 'Cropped':
				return croppedImage(img,props.width,props.height,img._3);

			case 'Tiled':
				return tiledImage(img._3);
		}
	}

	function plainImage(src)
	{
		var img = createNode('img');
		img.src = src;
		img.name = src;
		img.style.display = "block";
		return img;
	}

	function tiledImage(src)
	{
		var div = createNode('div');
		div.style.backgroundImage = 'url(' + src + ')';
		return div;
	}

	function fittedImage(w, h, src)
	{
		var div = createNode('div');
		div.style.background = 'url(' + src + ') no-repeat center';
		div.style.webkitBackgroundSize = 'cover';
		div.style.MozBackgroundSize = 'cover';
		div.style.OBackgroundSize = 'cover';
		div.style.backgroundSize = 'cover';
		return div;
	}

	function croppedImage(elem, w, h, src)
	{
		var pos = elem._0._0;
		var e = createNode('div');
		e.style.overflow = "hidden";

		var img = createNode('img');
		img.onload = function() {
			var sw = w / elem._1, sh = h / elem._2;
			img.style.width = ((this.width * sw)|0) + 'px';
			img.style.height = ((this.height * sh)|0) + 'px';
			img.style.marginLeft = ((- pos._0 * sw)|0) + 'px';
			img.style.marginTop = ((- pos._1 * sh)|0) + 'px';
		};
		img.src = src;
		img.name = src;
		e.appendChild(img);
		return e;
	}


	// FLOW

	function goOut(node)
	{
		node.style.position = 'absolute';
		return node;
	}
	function goDown(node)
	{
		return node;
	}
	function goRight(node)
	{
		node.style.styleFloat = 'left';
		node.style.cssFloat = 'left';
		return node;
	}

	var directionTable = {
		DUp    : goDown,
		DDown  : goDown,
		DLeft  : goRight,
		DRight : goRight,
		DIn    : goOut,
		DOut   : goOut
	};
	function needsReversal(dir)
	{
		return dir == 'DUp' || dir == 'DLeft' || dir == 'DIn';
	}

	function flow(dir,elist)
	{
		var array = List.toArray(elist);
		var container = createNode('div');
		var goDir = directionTable[dir];
		if (goDir == goOut)
		{
			container.style.pointerEvents = 'none';
		}
		if (needsReversal(dir))
		{
			array.reverse();
		}
		var len = array.length;
		for (var i = 0; i < len; ++i)
		{
			container.appendChild(goDir(render(array[i])));
		}
		return container;
	}


	// CONTAINER

	function toPos(pos)
	{
		return pos.ctor === "Absolute"
			? pos._0 + "px"
			: (pos._0 * 100) + "%";
	}

	// must clear right, left, top, bottom, and transform
	// before calling this function
	function setPos(pos,elem,e)
	{
		var element = elem.element;
		var props = elem.props;
		var w = props.width + (element.adjustWidth ? element.adjustWidth : 0);
		var h = props.height + (element.adjustHeight ? element.adjustHeight : 0);

		e.style.position = 'absolute';
		e.style.margin = 'auto';
		var transform = '';

		switch (pos.horizontal.ctor)
		{
			case 'P':
				e.style.right = toPos(pos.x);
				e.style.removeProperty('left');
				break;

			case 'Z':
				transform = 'translateX(' + ((-w/2)|0) + 'px) ';

			case 'N':
				e.style.left = toPos(pos.x);
				e.style.removeProperty('right');
				break;
		}
		switch (pos.vertical.ctor)
		{
			case 'N':
				e.style.bottom = toPos(pos.y);
				e.style.removeProperty('top');
				break;

			case 'Z':
				transform += 'translateY(' + ((-h/2)|0) + 'px)';

			case 'P':
				e.style.top = toPos(pos.y);
				e.style.removeProperty('bottom');
				break;
		}
		if (transform !== '')
		{
			addTransform(e.style, transform);
		}
		return e;
	}

	function addTransform(style, transform)
	{
		style.transform       = transform;
		style.msTransform     = transform;
		style.MozTransform    = transform;
		style.webkitTransform = transform;
		style.OTransform      = transform;
	}

	function container(pos,elem)
	{
		var e = render(elem);
		setPos(pos, elem, e);
		var div = createNode('div');
		div.style.position = 'relative';
		div.style.overflow = 'hidden';
		div.appendChild(e);
		return div;
	}


	function rawHtml(elem)
	{
		var html = elem.html;
		var guid = elem.guid;
		var align = elem.align;

		var div = createNode('div');
		div.innerHTML = html;
		div.style.visibility = "hidden";
		if (align)
		{
			div.style.textAlign = align;
		}
		div.style.visibility = 'visible';
		div.style.pointerEvents = 'auto';
		return div;
	}


	// RENDER

	function render(elem)
	{
		return setProps(elem, makeElement(elem));
	}
	function makeElement(e)
	{
		var elem = e.element;
		switch(elem.ctor)
		{
			case 'Image':
				return image(e.props, elem);

			case 'Flow':
				return flow(elem._0.ctor, elem._1);

			case 'Container':
				return container(elem._0, elem._1);

			case 'Spacer':
				return createNode('div');

			case 'RawHtml':
				return rawHtml(elem);

			case 'Custom':
				return elem.render(elem.model);
		}
	}

	function updateAndReplace(node, curr, next)
	{
		var newNode = update(node, curr, next);
		if (newNode !== node)
		{
			node.parentNode.replaceChild(newNode, node);
		}
		return newNode;
	}


	// UPDATE

	function update(node, curr, next)
	{
		var rootNode = node;
		if (node.tagName === 'A')
		{
			node = node.firstChild;
		}
		if (curr.props.id === next.props.id)
		{
			updateProps(node, curr, next);
			return rootNode;
		}
		if (curr.element.ctor !== next.element.ctor)
		{
			return render(next);
		}
		var nextE = next.element;
		var currE = curr.element;
		switch(nextE.ctor)
		{
			case "Spacer":
				updateProps(node, curr, next);
				return rootNode;

			case "RawHtml":
				if(currE.html.valueOf() !== nextE.html.valueOf())
				{
					node.innerHTML = nextE.html;
				}
				updateProps(node, curr, next);
				return rootNode;

			case "Image":
				if (nextE._0.ctor === 'Plain')
				{
					if (nextE._3 !== currE._3)
					{
						node.src = nextE._3;
					}
				}
				else if (!Utils.eq(nextE,currE)
					|| next.props.width !== curr.props.width
					|| next.props.height !== curr.props.height)
				{
					return render(next);
				}
				updateProps(node, curr, next);
				return rootNode;

			case "Flow":
				var arr = List.toArray(nextE._1);
				for (var i = arr.length; i--; )
				{
					arr[i] = arr[i].element.ctor;
				}
				if (nextE._0.ctor !== currE._0.ctor)
				{
					return render(next);
				}
				var nexts = List.toArray(nextE._1);
				var kids = node.childNodes;
				if (nexts.length !== kids.length)
				{
					return render(next);
				}
				var currs = List.toArray(currE._1);
				var dir = nextE._0.ctor;
				var goDir = directionTable[dir];
				var toReverse = needsReversal(dir);
				var len = kids.length;
				for (var i = len; i-- ;)
				{
					var subNode = kids[toReverse ? len - i - 1 : i];
					goDir(updateAndReplace(subNode, currs[i], nexts[i]));
				}
				updateProps(node, curr, next);
				return rootNode;

			case "Container":
				var subNode = node.firstChild;
				var newSubNode = updateAndReplace(subNode, currE._1, nextE._1);
				setPos(nextE._0, nextE._1, newSubNode);
				updateProps(node, curr, next);
				return rootNode;

			case "Custom":
				if (currE.type === nextE.type)
				{
					var updatedNode = nextE.update(node, currE.model, nextE.model);
					updateProps(updatedNode, curr, next);
					return updatedNode;
				}
				return render(next);
		}
	}

	function updateProps(node, curr, next)
	{
		var nextProps = next.props;
		var currProps = curr.props;

		var element = next.element;
		var width = nextProps.width - (element.adjustWidth || 0);
		var height = nextProps.height - (element.adjustHeight || 0);
		if (width !== currProps.width)
		{
			node.style.width = (width|0) + 'px';
		}
		if (height !== currProps.height)
		{
			node.style.height = (height|0) + 'px';
		}

		if (nextProps.opacity !== currProps.opacity)
		{
			node.style.opacity = nextProps.opacity;
		}

		var nextColor = nextProps.color.ctor === 'Just'
			? Color.toCss(nextProps.color._0)
			: '';
		if (node.style.backgroundColor !== nextColor)
		{
			node.style.backgroundColor = nextColor;
		}

		if (nextProps.tag !== currProps.tag)
		{
			node.id = nextProps.tag;
		}

		if (nextProps.href !== currProps.href)
		{
			if (currProps.href === '')
			{
				// add a surrounding href
				var anchor = createNode('a');
				anchor.href = nextProps.href;
				anchor.style.display = 'block';
				anchor.style.pointerEvents = 'auto';

				node.parentNode.replaceChild(anchor, node);
				anchor.appendChild(node);
			}
			else if (nextProps.href === '')
			{
				// remove the surrounding href
				var anchor = node.parentNode;
				anchor.parentNode.replaceChild(node, anchor);
			}
			else
			{
				// just update the link
				node.parentNode.href = nextProps.href;
			}
		}

		// update click and hover handlers
		var removed = false;

		// update hover handlers
		if (currProps.hover.ctor === '_Tuple0')
		{
			if (nextProps.hover.ctor !== '_Tuple0')
			{
				addHover(node, nextProps.hover);
			}
		}
		else
		{
			if (nextProps.hover.ctor === '_Tuple0')
			{
				removed = true;
				removeHover(node);
			}
			else
			{
				node.elm_hover_handler = nextProps.hover;
			}
		}

		// update click handlers
		if (currProps.click.ctor === '_Tuple0')
		{
			if (nextProps.click.ctor !== '_Tuple0')
			{
				addClick(node, nextProps.click);
			}
		}
		else
		{
			if (nextProps.click.ctor === '_Tuple0')
			{
				removed = true;
				removeClick(node);
			}
			else
			{
				node.elm_click_handler = nextProps.click;
			}
		}

		// stop capturing clicks if
		if (removed
			&& nextProps.hover.ctor === '_Tuple0'
			&& nextProps.click.ctor === '_Tuple0')
		{
			node.style.pointerEvents = 'none';
		}
	}


	// TEXT

	function block(align)
	{
		return function(text)
		{
			var raw = {
				ctor :'RawHtml',
				html : Text.renderHtml(text),
				align: align
			};
			var pos = htmlHeight(0, raw);
			return newElement(pos._0, pos._1, raw);
		}
	}

	function markdown(text)
	{
		var raw = {
			ctor:'RawHtml',
			html: text,
			align: null
		};
		var pos = htmlHeight(0, raw);
		return newElement(pos._0, pos._1, raw);
	}

	function htmlHeight(width, rawHtml)
	{
		// create dummy node
		var temp = document.createElement('div');
		temp.innerHTML = rawHtml.html;
		if (width > 0)
		{
			temp.style.width = width + "px";
		}
		temp.style.visibility = "hidden";
		temp.style.styleFloat = "left";
		temp.style.cssFloat   = "left";

		document.body.appendChild(temp);

		// get dimensions
		var style = window.getComputedStyle(temp, null);
		var w = Math.ceil(style.getPropertyValue("width").slice(0,-2) - 0);
		var h = Math.ceil(style.getPropertyValue("height").slice(0,-2) - 0);
		document.body.removeChild(temp);
		return Utils.Tuple2(w,h);
	}


	return localRuntime.Native.Graphics.Element.values = {
		render: render,
		update: update,
		updateAndReplace: updateAndReplace,

		createNode: createNode,
		newElement: F3(newElement),
		addTransform: addTransform,
		htmlHeight: F2(htmlHeight),
		guid: Utils.guid,

		block: block,
		markdown: markdown
	};

};

Elm.Native.Json = {};
Elm.Native.Json.make = function(localRuntime) {

	localRuntime.Native = localRuntime.Native || {};
	localRuntime.Native.Json = localRuntime.Native.Json || {};
	if (localRuntime.Native.Json.values) {
		return localRuntime.Native.Json.values;
	}

	var ElmArray = Elm.Native.Array.make(localRuntime);
	var List = Elm.Native.List.make(localRuntime);
	var Maybe = Elm.Maybe.make(localRuntime);
	var Result = Elm.Result.make(localRuntime);
	var Utils = Elm.Native.Utils.make(localRuntime);


	function crash(expected, actual) {
		throw new Error(
			'expecting ' + expected + ' but got ' + JSON.stringify(actual)
		);
	}


	// PRIMITIVE VALUES

	function decodeNull(successValue) {
		return function(value) {
			if (value === null) {
				return successValue;
			}
			crash('null', value);
		};
	}


	function decodeString(value) {
		if (typeof value === 'string' || value instanceof String) {
			return value;
		}
		crash('a String', value);
	}


	function decodeFloat(value) {
		if (typeof value === 'number') {
			return value;
		}
		crash('a Float', value);
	}


	function decodeInt(value) {
		if (typeof value === 'number' && (value|0) === value) {
			return value;
		}
		crash('an Int', value);
	}


	function decodeBool(value) {
		if (typeof value === 'boolean') {
			return value;
		}
		crash('a Bool', value);
	}


	// ARRAY

	function decodeArray(decoder) {
		return function(value) {
			if (value instanceof Array) {
				var len = value.length;
				var array = new Array(len);
				for (var i = len; i-- ; ) {
					array[i] = decoder(value[i]);
				}
				return ElmArray.fromJSArray(array);
			}
			crash('an Array', value);
		};
	}


	// LIST

	function decodeList(decoder) {
		return function(value) {
			if (value instanceof Array) {
				var len = value.length;
				var list = List.Nil;
				for (var i = len; i-- ; ) {
					list = List.Cons( decoder(value[i]), list );
				}
				return list;
			}
			crash('a List', value);
		};
	}


	// MAYBE

	function decodeMaybe(decoder) {
		return function(value) {
			try {
				return Maybe.Just(decoder(value));
			} catch(e) {
				return Maybe.Nothing;
			}
		};
	}


	// FIELDS

	function decodeField(field, decoder) {
		return function(value) {
			var subValue = value[field];
			if (subValue !== undefined) {
				return decoder(subValue);
			}
			crash("an object with field '" + field + "'", value);
		};
	}


	// OBJECTS

	function decodeKeyValuePairs(decoder) {
		return function(value) {
			var isObject =
				typeof value === 'object'
					&& value !== null
					&& !(value instanceof Array);

			if (isObject) {
				var keyValuePairs = List.Nil;
				for (var key in value) {
					var elmValue = decoder(value[key]);
					var pair = Utils.Tuple2(key, elmValue);
					keyValuePairs = List.Cons(pair, keyValuePairs);
				}
				return keyValuePairs;
			}

			crash("an object", value);
		};
	}

	function decodeObject1(f, d1) {
		return function(value) {
			return f(d1(value));
		};
	}

	function decodeObject2(f, d1, d2) {
		return function(value) {
			return A2( f, d1(value), d2(value) );
		};
	}

	function decodeObject3(f, d1, d2, d3) {
		return function(value) {
			return A3( f, d1(value), d2(value), d3(value) );
		};
	}

	function decodeObject4(f, d1, d2, d3, d4) {
		return function(value) {
			return A4( f, d1(value), d2(value), d3(value), d4(value) );
		};
	}

	function decodeObject5(f, d1, d2, d3, d4, d5) {
		return function(value) {
			return A5( f, d1(value), d2(value), d3(value), d4(value), d5(value) );
		};
	}

	function decodeObject6(f, d1, d2, d3, d4, d5, d6) {
		return function(value) {
			return A6( f,
				d1(value),
				d2(value),
				d3(value),
				d4(value),
				d5(value),
				d6(value)
			);
		};
	}

	function decodeObject7(f, d1, d2, d3, d4, d5, d6, d7) {
		return function(value) {
			return A7( f,
				d1(value),
				d2(value),
				d3(value),
				d4(value),
				d5(value),
				d6(value),
				d7(value)
			);
		};
	}

	function decodeObject8(f, d1, d2, d3, d4, d5, d6, d7, d8) {
		return function(value) {
			return A8( f,
				d1(value),
				d2(value),
				d3(value),
				d4(value),
				d5(value),
				d6(value),
				d7(value),
				d8(value)
			);
		};
	}


	// TUPLES

	function decodeTuple1(f, d1) {
		return function(value) {
			if ( !(value instanceof Array) || value.length !== 1 ) {
				crash('a Tuple of length 1', value);
			}
			return f( d1(value[0]) );
		};
	}

	function decodeTuple2(f, d1, d2) {
		return function(value) {
			if ( !(value instanceof Array) || value.length !== 2 ) {
				crash('a Tuple of length 2', value);
			}
			return A2( f, d1(value[0]), d2(value[1]) );
		};
	}

	function decodeTuple3(f, d1, d2, d3) {
		return function(value) {
			if ( !(value instanceof Array) || value.length !== 3 ) {
				crash('a Tuple of length 3', value);
			}
			return A3( f, d1(value[0]), d2(value[1]), d3(value[2]) );
		};
	}


	function decodeTuple4(f, d1, d2, d3, d4) {
		return function(value) {
			if ( !(value instanceof Array) || value.length !== 4 ) {
				crash('a Tuple of length 4', value);
			}
			return A4( f, d1(value[0]), d2(value[1]), d3(value[2]), d4(value[3]) );
		};
	}


	function decodeTuple5(f, d1, d2, d3, d4, d5) {
		return function(value) {
			if ( !(value instanceof Array) || value.length !== 5 ) {
				crash('a Tuple of length 5', value);
			}
			return A5( f,
				d1(value[0]),
				d2(value[1]),
				d3(value[2]),
				d4(value[3]),
				d5(value[4])
			);
		};
	}


	function decodeTuple6(f, d1, d2, d3, d4, d5, d6) {
		return function(value) {
			if ( !(value instanceof Array) || value.length !== 6 ) {
				crash('a Tuple of length 6', value);
			}
			return A6( f,
				d1(value[0]),
				d2(value[1]),
				d3(value[2]),
				d4(value[3]),
				d5(value[4]),
				d6(value[5])
			);
		};
	}

	function decodeTuple7(f, d1, d2, d3, d4, d5, d6, d7) {
		return function(value) {
			if ( !(value instanceof Array) || value.length !== 7 ) {
				crash('a Tuple of length 7', value);
			}
			return A7( f,
				d1(value[0]),
				d2(value[1]),
				d3(value[2]),
				d4(value[3]),
				d5(value[4]),
				d6(value[5]),
				d7(value[6])
			);
		};
	}


	function decodeTuple8(f, d1, d2, d3, d4, d5, d6, d7, d8) {
		return function(value) {
			if ( !(value instanceof Array) || value.length !== 8 ) {
				crash('a Tuple of length 8', value);
			}
			return A8( f,
				d1(value[0]),
				d2(value[1]),
				d3(value[2]),
				d4(value[3]),
				d5(value[4]),
				d6(value[5]),
				d7(value[6]),
				d8(value[7])
			);
		};
	}


	// CUSTOM DECODERS

	function decodeValue(value) {
		return value;
	}

	function runDecoderValue(decoder, value) {
		try {
			return Result.Ok(decoder(value));
		} catch(e) {
			return Result.Err(e.message);
		}
	}

	function customDecoder(decoder, callback) {
		return function(value) {
			var result = callback(decoder(value));
			if (result.ctor === 'Err') {
				throw new Error('custom decoder failed: ' + result._0);
			}
			return result._0;
		}
	}

	function andThen(decode, callback) {
		return function(value) {
			var result = decode(value);
			return callback(result)(value);
		}
	}

	function fail(msg) {
		return function(value) {
			throw new Error(msg);
		}
	}

	function succeed(successValue) {
		return function(value) {
			return successValue;
		}
	}


	// ONE OF MANY

	function oneOf(decoders) {
		return function(value) {
			var errors = [];
			var temp = decoders;
			while (temp.ctor !== '[]') {
				try {
					return temp._0(value);
				} catch(e) {
					errors.push(e.message);
				}
				temp = temp._1;
			}
			throw new Error('expecting one of the following:\n    ' + errors.join('\n    '));
		}
	}

	function get(decoder, value) {
		try {
			return Result.Ok(decoder(value));
		} catch(e) {
			return Result.Err(e.message);
		}
	}


	// ENCODE / DECODE

	function runDecoderString(decoder, string) {
		try {
			return Result.Ok(decoder(JSON.parse(string)));
		} catch(e) {
			return Result.Err(e.message);
		}
	}

	function encode(indentLevel, value) {
		return JSON.stringify(value, null, indentLevel);
	}

	function identity(value) {
		return value;
	}

	function encodeObject(keyValuePairs) {
		var obj = {};
		while (keyValuePairs.ctor !== '[]') {
			var pair = keyValuePairs._0;
			obj[pair._0] = pair._1;
			keyValuePairs = keyValuePairs._1;
		}
		return obj;
	}

	return localRuntime.Native.Json.values = {
		encode: F2(encode),
		runDecoderString: F2(runDecoderString),
		runDecoderValue: F2(runDecoderValue),

		get: F2(get),
		oneOf: oneOf,

		decodeNull: decodeNull,
		decodeInt: decodeInt,
		decodeFloat: decodeFloat,
		decodeString: decodeString,
		decodeBool: decodeBool,

		decodeMaybe: decodeMaybe,

		decodeList: decodeList,
		decodeArray: decodeArray,

		decodeField: F2(decodeField),

		decodeObject1: F2(decodeObject1),
		decodeObject2: F3(decodeObject2),
		decodeObject3: F4(decodeObject3),
		decodeObject4: F5(decodeObject4),
		decodeObject5: F6(decodeObject5),
		decodeObject6: F7(decodeObject6),
		decodeObject7: F8(decodeObject7),
		decodeObject8: F9(decodeObject8),
		decodeKeyValuePairs: decodeKeyValuePairs,

		decodeTuple1: F2(decodeTuple1),
		decodeTuple2: F3(decodeTuple2),
		decodeTuple3: F4(decodeTuple3),
		decodeTuple4: F5(decodeTuple4),
		decodeTuple5: F6(decodeTuple5),
		decodeTuple6: F7(decodeTuple6),
		decodeTuple7: F8(decodeTuple7),
		decodeTuple8: F9(decodeTuple8),

		andThen: F2(andThen),
		decodeValue: decodeValue,
		customDecoder: F2(customDecoder),
		fail: fail,
		succeed: succeed,

		identity: identity,
		encodeNull: null,
		encodeArray: ElmArray.toJSArray,
		encodeList: List.toArray,
		encodeObject: encodeObject

	};

};

Elm.Native.List = {};
Elm.Native.List.make = function(localRuntime) {
	localRuntime.Native = localRuntime.Native || {};
	localRuntime.Native.List = localRuntime.Native.List || {};
	if (localRuntime.Native.List.values)
	{
		return localRuntime.Native.List.values;
	}
	if ('values' in Elm.Native.List)
	{
		return localRuntime.Native.List.values = Elm.Native.List.values;
	}

	var Utils = Elm.Native.Utils.make(localRuntime);

	var Nil = Utils.Nil;
	var Cons = Utils.Cons;

	function toArray(xs)
	{
		var out = [];
		while (xs.ctor !== '[]')
		{
			out.push(xs._0);
			xs = xs._1;
		}
		return out;
	}

	function fromArray(arr)
	{
		var out = Nil;
		for (var i = arr.length; i--; )
		{
			out = Cons(arr[i], out);
		}
		return out;
	}

	function range(lo,hi)
	{
		var lst = Nil;
		if (lo <= hi)
		{
			do { lst = Cons(hi,lst) } while (hi-->lo);
		}
		return lst
	}

	// f defined similarly for both foldl and foldr (NB: different from Haskell)
	// ie, foldl : (a -> b -> b) -> b -> [a] -> b
	function foldl(f, b, xs)
	{
		var acc = b;
		while (xs.ctor !== '[]')
		{
			acc = A2(f, xs._0, acc);
			xs = xs._1;
		}
		return acc;
	}

	function foldr(f, b, xs)
	{
		var arr = toArray(xs);
		var acc = b;
		for (var i = arr.length; i--; )
		{
			acc = A2(f, arr[i], acc);
		}
		return acc;
	}

	function any(pred, xs)
	{
		while (xs.ctor !== '[]')
		{
			if (pred(xs._0))
			{
				return true;
			}
			xs = xs._1;
		}
		return false;
	}

	function map2(f, xs, ys)
	{
		var arr = [];
		while (xs.ctor !== '[]' && ys.ctor !== '[]')
		{
			arr.push(A2(f, xs._0, ys._0));
			xs = xs._1;
			ys = ys._1;
		}
		return fromArray(arr);
	}

	function map3(f, xs, ys, zs)
	{
		var arr = [];
		while (xs.ctor !== '[]' && ys.ctor !== '[]' && zs.ctor !== '[]')
		{
			arr.push(A3(f, xs._0, ys._0, zs._0));
			xs = xs._1;
			ys = ys._1;
			zs = zs._1;
		}
		return fromArray(arr);
	}

	function map4(f, ws, xs, ys, zs)
	{
		var arr = [];
		while (   ws.ctor !== '[]'
			   && xs.ctor !== '[]'
			   && ys.ctor !== '[]'
			   && zs.ctor !== '[]')
		{
			arr.push(A4(f, ws._0, xs._0, ys._0, zs._0));
			ws = ws._1;
			xs = xs._1;
			ys = ys._1;
			zs = zs._1;
		}
		return fromArray(arr);
	}

	function map5(f, vs, ws, xs, ys, zs)
	{
		var arr = [];
		while (   vs.ctor !== '[]'
			   && ws.ctor !== '[]'
			   && xs.ctor !== '[]'
			   && ys.ctor !== '[]'
			   && zs.ctor !== '[]')
		{
			arr.push(A5(f, vs._0, ws._0, xs._0, ys._0, zs._0));
			vs = vs._1;
			ws = ws._1;
			xs = xs._1;
			ys = ys._1;
			zs = zs._1;
		}
		return fromArray(arr);
	}

	function sortBy(f, xs)
	{
		return fromArray(toArray(xs).sort(function(a,b){
			return Utils.cmp(f(a), f(b));
		}));
	}

	function sortWith(f, xs)
	{
		return fromArray(toArray(xs).sort(function(a,b){
			var ord = f(a)(b).ctor;
			return ord === 'EQ' ? 0 : ord === 'LT' ? -1 : 1;
		}));
	}

	function take(n, xs)
	{
		var arr = [];
		while (xs.ctor !== '[]' && n > 0)
		{
			arr.push(xs._0);
			xs = xs._1;
			--n;
		}
		return fromArray(arr);
	}

	function drop(n, xs)
	{
		while (xs.ctor !== '[]' && n > 0)
		{
			xs = xs._1;
			--n;
		}
		return xs;
	}

	function repeat(n, x)
	{
		var arr = [];
		var pattern = [x];
		while (n > 0)
		{
			if (n & 1)
			{
				arr = arr.concat(pattern);
			}
			n >>= 1, pattern = pattern.concat(pattern);
		}
		return fromArray(arr);
	}


	Elm.Native.List.values = {
		Nil:Nil,
		Cons:Cons,
		cons:F2(Cons),
		toArray:toArray,
		fromArray:fromArray,
		range:range,

		foldl:F3(foldl),
		foldr:F3(foldr),

		any:F2(any),
		map2:F3(map2),
		map3:F4(map3),
		map4:F5(map4),
		map5:F6(map5),
		sortBy:F2(sortBy),
		sortWith:F2(sortWith),
		take:F2(take),
		drop:F2(drop),
		repeat:F2(repeat)
	};
	return localRuntime.Native.List.values = Elm.Native.List.values;

};


// setup
Elm.Native = Elm.Native || {};
Elm.Native.Markdown = Elm.Native.Markdown || {};

// definition
Elm.Native.Markdown.make = function(localRuntime) {
	'use strict';

	// attempt to short-circuit
	if ('values' in Elm.Native.Markdown)
	{
		return Elm.Native.Markdown.values;
	}

	var Element = Elm.Native.Graphics.Element.make(localRuntime);

	/**
	 * marked - a markdown parser
	 * Copyright (c) 2011-2014, Christopher Jeffrey. (MIT Licensed)
	 * https://github.com/chjj/marked
	 */
	(function(){var block={newline:/^\n+/,code:/^( {4}[^\n]+\n*)+/,fences:noop,hr:/^( *[-*_]){3,} *(?:\n+|$)/,heading:/^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,nptable:noop,lheading:/^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,blockquote:/^( *>[^\n]+(\n(?!def)[^\n]+)*\n*)+/,list:/^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,html:/^ *(?:comment|closed|closing) *(?:\n{2,}|\s*$)/,def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,table:noop,paragraph:/^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,text:/^[^\n]+/};block.bullet=/(?:[*+-]|\d+\.)/;block.item=/^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/;block.item=replace(block.item,"gm")(/bull/g,block.bullet)();block.list=replace(block.list)(/bull/g,block.bullet)("hr","\\n+(?=\\1?(?:[-*_] *){3,}(?:\\n+|$))")("def","\\n+(?="+block.def.source+")")();block.blockquote=replace(block.blockquote)("def",block.def)();block._tag="(?!(?:"+"a|em|strong|small|s|cite|q|dfn|abbr|data|time|code"+"|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo"+"|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|[^\\w\\s@]*@)\\b";block.html=replace(block.html)("comment",/<!--[\s\S]*?-->/)("closed",/<(tag)[\s\S]+?<\/\1>/)("closing",/<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)(/tag/g,block._tag)();block.paragraph=replace(block.paragraph)("hr",block.hr)("heading",block.heading)("lheading",block.lheading)("blockquote",block.blockquote)("tag","<"+block._tag)("def",block.def)();block.normal=merge({},block);block.gfm=merge({},block.normal,{fences:/^ *(`{3,}|~{3,}) *(\S+)? *\n([\s\S]+?)\s*\1 *(?:\n+|$)/,paragraph:/^/});block.gfm.paragraph=replace(block.paragraph)("(?!","(?!"+block.gfm.fences.source.replace("\\1","\\2")+"|"+block.list.source.replace("\\1","\\3")+"|")();block.tables=merge({},block.gfm,{nptable:/^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,table:/^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/});function Lexer(options){this.tokens=[];this.tokens.links={};this.options=options||marked.defaults;this.rules=block.normal;if(this.options.gfm){if(this.options.tables){this.rules=block.tables}else{this.rules=block.gfm}}}Lexer.rules=block;Lexer.lex=function(src,options){var lexer=new Lexer(options);return lexer.lex(src)};Lexer.prototype.lex=function(src){src=src.replace(/\r\n|\r/g,"\n").replace(/\t/g,"    ").replace(/\u00a0/g," ").replace(/\u2424/g,"\n");return this.token(src,true)};Lexer.prototype.token=function(src,top,bq){var src=src.replace(/^ +$/gm,""),next,loose,cap,bull,b,item,space,i,l;while(src){if(cap=this.rules.newline.exec(src)){src=src.substring(cap[0].length);if(cap[0].length>1){this.tokens.push({type:"space"})}}if(cap=this.rules.code.exec(src)){src=src.substring(cap[0].length);cap=cap[0].replace(/^ {4}/gm,"");this.tokens.push({type:"code",text:!this.options.pedantic?cap.replace(/\n+$/,""):cap});continue}if(cap=this.rules.fences.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"code",lang:cap[2],text:cap[3]});continue}if(cap=this.rules.heading.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"heading",depth:cap[1].length,text:cap[2]});continue}if(top&&(cap=this.rules.nptable.exec(src))){src=src.substring(cap[0].length);item={type:"table",header:cap[1].replace(/^ *| *\| *$/g,"").split(/ *\| */),align:cap[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:cap[3].replace(/\n$/,"").split("\n")};for(i=0;i<item.align.length;i++){if(/^ *-+: *$/.test(item.align[i])){item.align[i]="right"}else if(/^ *:-+: *$/.test(item.align[i])){item.align[i]="center"}else if(/^ *:-+ *$/.test(item.align[i])){item.align[i]="left"}else{item.align[i]=null}}for(i=0;i<item.cells.length;i++){item.cells[i]=item.cells[i].split(/ *\| */)}this.tokens.push(item);continue}if(cap=this.rules.lheading.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"heading",depth:cap[2]==="="?1:2,text:cap[1]});continue}if(cap=this.rules.hr.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"hr"});continue}if(cap=this.rules.blockquote.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"blockquote_start"});cap=cap[0].replace(/^ *> ?/gm,"");this.token(cap,top,true);this.tokens.push({type:"blockquote_end"});continue}if(cap=this.rules.list.exec(src)){src=src.substring(cap[0].length);bull=cap[2];this.tokens.push({type:"list_start",ordered:bull.length>1});cap=cap[0].match(this.rules.item);next=false;l=cap.length;i=0;for(;i<l;i++){item=cap[i];space=item.length;item=item.replace(/^ *([*+-]|\d+\.) +/,"");if(~item.indexOf("\n ")){space-=item.length;item=!this.options.pedantic?item.replace(new RegExp("^ {1,"+space+"}","gm"),""):item.replace(/^ {1,4}/gm,"")}if(this.options.smartLists&&i!==l-1){b=block.bullet.exec(cap[i+1])[0];if(bull!==b&&!(bull.length>1&&b.length>1)){src=cap.slice(i+1).join("\n")+src;i=l-1}}loose=next||/\n\n(?!\s*$)/.test(item);if(i!==l-1){next=item.charAt(item.length-1)==="\n";if(!loose)loose=next}this.tokens.push({type:loose?"loose_item_start":"list_item_start"});this.token(item,false,bq);this.tokens.push({type:"list_item_end"})}this.tokens.push({type:"list_end"});continue}if(cap=this.rules.html.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:this.options.sanitize?"paragraph":"html",pre:cap[1]==="pre"||cap[1]==="script"||cap[1]==="style",text:cap[0]});continue}if(!bq&&top&&(cap=this.rules.def.exec(src))){src=src.substring(cap[0].length);this.tokens.links[cap[1].toLowerCase()]={href:cap[2],title:cap[3]};continue}if(top&&(cap=this.rules.table.exec(src))){src=src.substring(cap[0].length);item={type:"table",header:cap[1].replace(/^ *| *\| *$/g,"").split(/ *\| */),align:cap[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:cap[3].replace(/(?: *\| *)?\n$/,"").split("\n")};for(i=0;i<item.align.length;i++){if(/^ *-+: *$/.test(item.align[i])){item.align[i]="right"}else if(/^ *:-+: *$/.test(item.align[i])){item.align[i]="center"}else if(/^ *:-+ *$/.test(item.align[i])){item.align[i]="left"}else{item.align[i]=null}}for(i=0;i<item.cells.length;i++){item.cells[i]=item.cells[i].replace(/^ *\| *| *\| *$/g,"").split(/ *\| */)}this.tokens.push(item);continue}if(top&&(cap=this.rules.paragraph.exec(src))){src=src.substring(cap[0].length);this.tokens.push({type:"paragraph",text:cap[1].charAt(cap[1].length-1)==="\n"?cap[1].slice(0,-1):cap[1]});continue}if(cap=this.rules.text.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"text",text:cap[0]});continue}if(src){throw new Error("Infinite loop on byte: "+src.charCodeAt(0))}}return this.tokens};var inline={escape:/^\\([\\`*{}\[\]()#+\-.!_>])/,autolink:/^<([^ >]+(@|:\/)[^ >]+)>/,url:noop,tag:/^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/,link:/^!?\[(inside)\]\(href\)/,reflink:/^!?\[(inside)\]\s*\[([^\]]*)\]/,nolink:/^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,strong:/^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,em:/^\b_((?:__|[\s\S])+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,code:/^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,br:/^ {2,}\n(?!\s*$)/,del:noop,text:/^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/};inline._inside=/(?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*/;inline._href=/\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/;inline.link=replace(inline.link)("inside",inline._inside)("href",inline._href)();inline.reflink=replace(inline.reflink)("inside",inline._inside)();inline.normal=merge({},inline);inline.pedantic=merge({},inline.normal,{strong:/^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,em:/^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/});inline.gfm=merge({},inline.normal,{escape:replace(inline.escape)("])","~|])")(),url:/^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,del:/^~~(?=\S)([\s\S]*?\S)~~/,text:replace(inline.text)("]|","~]|")("|","|https?://|")()});inline.breaks=merge({},inline.gfm,{br:replace(inline.br)("{2,}","*")(),text:replace(inline.gfm.text)("{2,}","*")()});function InlineLexer(links,options){this.options=options||marked.defaults;this.links=links;this.rules=inline.normal;this.renderer=this.options.renderer||new Renderer;this.renderer.options=this.options;if(!this.links){throw new Error("Tokens array requires a `links` property.")}if(this.options.gfm){if(this.options.breaks){this.rules=inline.breaks}else{this.rules=inline.gfm}}else if(this.options.pedantic){this.rules=inline.pedantic}}InlineLexer.rules=inline;InlineLexer.output=function(src,links,options){var inline=new InlineLexer(links,options);return inline.output(src)};InlineLexer.prototype.output=function(src){var out="",link,text,href,cap;while(src){if(cap=this.rules.escape.exec(src)){src=src.substring(cap[0].length);out+=cap[1];continue}if(cap=this.rules.autolink.exec(src)){src=src.substring(cap[0].length);if(cap[2]==="@"){text=cap[1].charAt(6)===":"?this.mangle(cap[1].substring(7)):this.mangle(cap[1]);href=this.mangle("mailto:")+text}else{text=escape(cap[1]);href=text}out+=this.renderer.link(href,null,text);continue}if(!this.inLink&&(cap=this.rules.url.exec(src))){src=src.substring(cap[0].length);text=escape(cap[1]);href=text;out+=this.renderer.link(href,null,text);continue}if(cap=this.rules.tag.exec(src)){if(!this.inLink&&/^<a /i.test(cap[0])){this.inLink=true}else if(this.inLink&&/^<\/a>/i.test(cap[0])){this.inLink=false}src=src.substring(cap[0].length);out+=this.options.sanitize?escape(cap[0]):cap[0];continue}if(cap=this.rules.link.exec(src)){src=src.substring(cap[0].length);this.inLink=true;out+=this.outputLink(cap,{href:cap[2],title:cap[3]});this.inLink=false;continue}if((cap=this.rules.reflink.exec(src))||(cap=this.rules.nolink.exec(src))){src=src.substring(cap[0].length);link=(cap[2]||cap[1]).replace(/\s+/g," ");link=this.links[link.toLowerCase()];if(!link||!link.href){out+=cap[0].charAt(0);src=cap[0].substring(1)+src;continue}this.inLink=true;out+=this.outputLink(cap,link);this.inLink=false;continue}if(cap=this.rules.strong.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.strong(this.output(cap[2]||cap[1]));continue}if(cap=this.rules.em.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.em(this.output(cap[2]||cap[1]));continue}if(cap=this.rules.code.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.codespan(escape(cap[2],true));continue}if(cap=this.rules.br.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.br();continue}if(cap=this.rules.del.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.del(this.output(cap[1]));continue}if(cap=this.rules.text.exec(src)){src=src.substring(cap[0].length);out+=escape(this.smartypants(cap[0]));continue}if(src){throw new Error("Infinite loop on byte: "+src.charCodeAt(0))}}return out};InlineLexer.prototype.outputLink=function(cap,link){var href=escape(link.href),title=link.title?escape(link.title):null;return cap[0].charAt(0)!=="!"?this.renderer.link(href,title,this.output(cap[1])):this.renderer.image(href,title,escape(cap[1]))};InlineLexer.prototype.smartypants=function(text){if(!this.options.smartypants)return text;return text.replace(/--/g,"—").replace(/(^|[-\u2014/(\[{"\s])'/g,"$1‘").replace(/'/g,"’").replace(/(^|[-\u2014/(\[{\u2018\s])"/g,"$1“").replace(/"/g,"”").replace(/\.{3}/g,"…")};InlineLexer.prototype.mangle=function(text){var out="",l=text.length,i=0,ch;for(;i<l;i++){ch=text.charCodeAt(i);if(Math.random()>.5){ch="x"+ch.toString(16)}out+="&#"+ch+";"}return out};function Renderer(options){this.options=options||{}}Renderer.prototype.code=function(code,lang,escaped){if(this.options.highlight){var out=this.options.highlight(code,lang);if(out!=null&&out!==code){escaped=true;code=out}}if(!lang){return"<pre><code>"+(escaped?code:escape(code,true))+"\n</code></pre>"}return'<pre><code class="'+this.options.langPrefix+escape(lang,true)+'">'+(escaped?code:escape(code,true))+"\n</code></pre>\n"};Renderer.prototype.blockquote=function(quote){return"<blockquote>\n"+quote+"</blockquote>\n"};Renderer.prototype.html=function(html){return html};Renderer.prototype.heading=function(text,level,raw){return"<h"+level+' id="'+this.options.headerPrefix+raw.toLowerCase().replace(/[^\w]+/g,"-")+'">'+text+"</h"+level+">\n"};Renderer.prototype.hr=function(){return this.options.xhtml?"<hr/>\n":"<hr>\n"};Renderer.prototype.list=function(body,ordered){var type=ordered?"ol":"ul";return"<"+type+">\n"+body+"</"+type+">\n"};Renderer.prototype.listitem=function(text){return"<li>"+text+"</li>\n"};Renderer.prototype.paragraph=function(text){return"<p>"+text+"</p>\n"};Renderer.prototype.table=function(header,body){return"<table>\n"+"<thead>\n"+header+"</thead>\n"+"<tbody>\n"+body+"</tbody>\n"+"</table>\n"};Renderer.prototype.tablerow=function(content){return"<tr>\n"+content+"</tr>\n"};Renderer.prototype.tablecell=function(content,flags){var type=flags.header?"th":"td";var tag=flags.align?"<"+type+' style="text-align:'+flags.align+'">':"<"+type+">";return tag+content+"</"+type+">\n"};Renderer.prototype.strong=function(text){return"<strong>"+text+"</strong>"};Renderer.prototype.em=function(text){return"<em>"+text+"</em>"};Renderer.prototype.codespan=function(text){return"<code>"+text+"</code>"};Renderer.prototype.br=function(){return this.options.xhtml?"<br/>":"<br>"};Renderer.prototype.del=function(text){return"<del>"+text+"</del>"};Renderer.prototype.link=function(href,title,text){if(this.options.sanitize){try{var prot=decodeURIComponent(unescape(href)).replace(/[^\w:]/g,"").toLowerCase()}catch(e){return""}if(prot.indexOf("javascript:")===0){return""}}var out='<a href="'+href+'"';if(title){out+=' title="'+title+'"'}out+=">"+text+"</a>";return out};Renderer.prototype.image=function(href,title,text){var out='<img src="'+href+'" alt="'+text+'"';if(title){out+=' title="'+title+'"'}out+=this.options.xhtml?"/>":">";return out};function Parser(options){this.tokens=[];this.token=null;this.options=options||marked.defaults;this.options.renderer=this.options.renderer||new Renderer;this.renderer=this.options.renderer;this.renderer.options=this.options}Parser.parse=function(src,options,renderer){var parser=new Parser(options,renderer);return parser.parse(src)};Parser.prototype.parse=function(src){this.inline=new InlineLexer(src.links,this.options,this.renderer);this.tokens=src.reverse();var out="";while(this.next()){out+=this.tok()}return out};Parser.prototype.next=function(){return this.token=this.tokens.pop()};Parser.prototype.peek=function(){return this.tokens[this.tokens.length-1]||0};Parser.prototype.parseText=function(){var body=this.token.text;while(this.peek().type==="text"){body+="\n"+this.next().text}return this.inline.output(body)};Parser.prototype.tok=function(){switch(this.token.type){case"space":{return""}case"hr":{return this.renderer.hr()}case"heading":{return this.renderer.heading(this.inline.output(this.token.text),this.token.depth,this.token.text)}case"code":{return this.renderer.code(this.token.text,this.token.lang,this.token.escaped)}case"table":{var header="",body="",i,row,cell,flags,j;cell="";for(i=0;i<this.token.header.length;i++){flags={header:true,align:this.token.align[i]};cell+=this.renderer.tablecell(this.inline.output(this.token.header[i]),{header:true,align:this.token.align[i]})}header+=this.renderer.tablerow(cell);for(i=0;i<this.token.cells.length;i++){row=this.token.cells[i];cell="";for(j=0;j<row.length;j++){cell+=this.renderer.tablecell(this.inline.output(row[j]),{header:false,align:this.token.align[j]})}body+=this.renderer.tablerow(cell)}return this.renderer.table(header,body)}case"blockquote_start":{var body="";while(this.next().type!=="blockquote_end"){body+=this.tok()}return this.renderer.blockquote(body)}case"list_start":{var body="",ordered=this.token.ordered;while(this.next().type!=="list_end"){body+=this.tok()}return this.renderer.list(body,ordered)}case"list_item_start":{var body="";while(this.next().type!=="list_item_end"){body+=this.token.type==="text"?this.parseText():this.tok()}return this.renderer.listitem(body)}case"loose_item_start":{var body="";while(this.next().type!=="list_item_end"){body+=this.tok()}return this.renderer.listitem(body)}case"html":{var html=!this.token.pre&&!this.options.pedantic?this.inline.output(this.token.text):this.token.text;return this.renderer.html(html)}case"paragraph":{return this.renderer.paragraph(this.inline.output(this.token.text))}case"text":{return this.renderer.paragraph(this.parseText())}}};function escape(html,encode){return html.replace(!encode?/&(?!#?\w+;)/g:/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function unescape(html){return html.replace(/&([#\w]+);/g,function(_,n){n=n.toLowerCase();if(n==="colon")return":";if(n.charAt(0)==="#"){return n.charAt(1)==="x"?String.fromCharCode(parseInt(n.substring(2),16)):String.fromCharCode(+n.substring(1))}return""})}function replace(regex,opt){regex=regex.source;opt=opt||"";return function self(name,val){if(!name)return new RegExp(regex,opt);val=val.source||val;val=val.replace(/(^|[^\[])\^/g,"$1");regex=regex.replace(name,val);return self}}function noop(){}noop.exec=noop;function merge(obj){var i=1,target,key;for(;i<arguments.length;i++){target=arguments[i];for(key in target){if(Object.prototype.hasOwnProperty.call(target,key)){obj[key]=target[key]}}}return obj}function marked(src,opt,callback){if(callback||typeof opt==="function"){if(!callback){callback=opt;opt=null}opt=merge({},marked.defaults,opt||{});var highlight=opt.highlight,tokens,pending,i=0;try{tokens=Lexer.lex(src,opt)}catch(e){return callback(e)}pending=tokens.length;var done=function(err){if(err){opt.highlight=highlight;return callback(err)}var out;try{out=Parser.parse(tokens,opt)}catch(e){err=e}opt.highlight=highlight;return err?callback(err):callback(null,out)};if(!highlight||highlight.length<3){return done()}delete opt.highlight;if(!pending)return done();for(;i<tokens.length;i++){(function(token){if(token.type!=="code"){return--pending||done()}return highlight(token.text,token.lang,function(err,code){if(err)return done(err);if(code==null||code===token.text){return--pending||done()}token.text=code;token.escaped=true;--pending||done()})})(tokens[i])}return}try{if(opt)opt=merge({},marked.defaults,opt);return Parser.parse(Lexer.lex(src,opt),opt)}catch(e){e.message+="\nPlease report this to https://github.com/chjj/marked.";if((opt||marked.defaults).silent){return"<p>An error occured:</p><pre>"+escape(e.message+"",true)+"</pre>"}throw e}}marked.options=marked.setOptions=function(opt){merge(marked.defaults,opt);return marked};marked.defaults={gfm:true,tables:true,breaks:false,pedantic:false,sanitize:false,smartLists:false,silent:false,highlight:null,langPrefix:"lang-",smartypants:false,headerPrefix:"",renderer:new Renderer,xhtml:false};marked.Parser=Parser;marked.parser=Parser.parse;marked.Renderer=Renderer;marked.Lexer=Lexer;marked.lexer=Lexer.lex;marked.InlineLexer=InlineLexer;marked.inlineLexer=InlineLexer.output;marked.parse=marked;if(typeof module!=="undefined"&&typeof exports==="object"){module.exports=marked}else if(typeof define==="function"&&define.amd){define(function(){return marked})}else{this.marked=marked}}).call(function(){return this||(typeof window!=="undefined"?window:global)}());

	marked.setOptions({
		highlight: function (code, lang) {
			if (typeof hljs !== 'undefined'
				&& lang
				&& hljs.listLanguages().indexOf(lang) >= 0)
			{
				return hljs.highlight(lang, code, true).value;
			}
			return code;
		}
	});

	function formatOptions(options) {
		var gfm = options.githubFlavored;
		if (gfm.ctor === 'Just')
		{
			return {
				gfm: true,
				tables: gfm.tables,
				breaks: gfm.breaks,
				sanitize: options.sanitize,
				smartypants: options.smartypants
			};
		}
		else
		{
			return {
				gfm: false,
				tables: false,
				breaks: false,
				sanitize: options.sanitize,
				smartypants: options.smartypants
			};
		}
	}

	function toHtmlWith(options, rawMarkdown)
	{
		return new MarkdownWidget(options, rawMarkdown);
	}

	function MarkdownWidget(options, rawMarkdown)
	{
		this.options = options;
		this.markdown = rawMarkdown;
	}

	MarkdownWidget.prototype.type = "Widget";

	MarkdownWidget.prototype.init = function init()
	{
		var html = marked(this.markdown, formatOptions(this.options));
		var div = document.createElement('div');
		div.innerHTML = html;
		return div;
	};

	MarkdownWidget.prototype.update = function update(previous, node)
	{
		if (this.markdown !== previous.markdown || this.options != previous.options)
		{
			var html = marked(this.markdown, formatOptions(this.options));
			node.innerHTML = html;
		}
		return node;
	};


	function toElementWith(options, rawMarkdown)
	{
		return Element.markdown(marked(rawMarkdown, formatOptions(options)));
	}

	return Elm.Native.Markdown.values = {
		toHtmlWith: F2(toHtmlWith),
		toElementWith: F2(toElementWith)
	};
};
Elm.Native.Port = {};
Elm.Native.Port.make = function(localRuntime) {

	localRuntime.Native = localRuntime.Native || {};
	localRuntime.Native.Port = localRuntime.Native.Port || {};
	if (localRuntime.Native.Port.values)
	{
		return localRuntime.Native.Port.values;
	}

	var NS;
	var Utils = Elm.Native.Utils.make(localRuntime);


	// INBOUND

	function inbound(name, type, converter)
	{
		if (!localRuntime.argsTracker[name])
		{
			throw new Error(
				"Port Error:\n" +
				"No argument was given for the port named '" + name + "' with type:\n\n" +
				"    " + type.split('\n').join('\n        ') + "\n\n" +
				"You need to provide an initial value!\n\n" +
				"Find out more about ports here <http://elm-lang.org/learn/Ports.elm>"
			);
		}
		var arg = localRuntime.argsTracker[name];
		arg.used = true;

		return jsToElm(name, type, converter, arg.value);
	}


	function inboundSignal(name, type, converter)
	{
		var initialValue = inbound(name, type, converter);

		if (!NS)
		{
			NS = Elm.Native.Signal.make(localRuntime);
		}
		var signal = NS.input('inbound-port-' + name, initialValue);

		function send(jsValue)
		{
			var elmValue = jsToElm(name, type, converter, jsValue);
			setTimeout(function() {
				localRuntime.notify(signal.id, elmValue);
			}, 0);
		}

		localRuntime.ports[name] = { send: send };

		return signal;
	}


	function jsToElm(name, type, converter, value)
	{
		try
		{
			return converter(value);
		}
		catch(e)
		{
			throw new Error(
				"Port Error:\n" +
				"Regarding the port named '" + name + "' with type:\n\n" +
				"    " + type.split('\n').join('\n        ') + "\n\n" +
				"You just sent the value:\n\n" +
				"    " + JSON.stringify(value) + "\n\n" +
				"but it cannot be converted to the necessary type.\n" +
				e.message
			);
		}
	}


	// OUTBOUND

	function outbound(name, converter, elmValue)
	{
		localRuntime.ports[name] = converter(elmValue);
	}


	function outboundSignal(name, converter, signal)
	{
		var subscribers = [];

		function subscribe(handler)
		{
			subscribers.push(handler);
		}
		function unsubscribe(handler)
		{
			subscribers.pop(subscribers.indexOf(handler));
		}

		function notify(elmValue)
		{
			var jsValue = converter(elmValue);
			var len = subscribers.length;
			for (var i = 0; i < len; ++i)
			{
				subscribers[i](jsValue);
			}
		}

		if (!NS)
		{
			NS = Elm.Native.Signal.make(localRuntime);
		}
		NS.output('outbound-port-' + name, notify, signal);

		localRuntime.ports[name] = {
			subscribe: subscribe,
			unsubscribe: unsubscribe
		};

		return signal;
	}


	return localRuntime.Native.Port.values = {
		inbound: inbound,
		outbound: outbound,
		inboundSignal: inboundSignal,
		outboundSignal: outboundSignal
	};
};


if (!Elm.fullscreen) {

	(function() {
		'use strict';

		var Display = {
			FULLSCREEN: 0,
			COMPONENT: 1,
			NONE: 2
		};

		Elm.fullscreen = function(module, args)
		{
			var container = document.createElement('div');
			document.body.appendChild(container);
			return init(Display.FULLSCREEN, container, module, args || {});
		};

		Elm.embed = function(module, container, args)
		{
			var tag = container.tagName;
			if (tag !== 'DIV')
			{
				throw new Error('Elm.node must be given a DIV, not a ' + tag + '.');
			}
			return init(Display.COMPONENT, container, module, args || {});
		};

		Elm.worker = function(module, args)
		{
			return init(Display.NONE, {}, module, args || {});
		};

		function init(display, container, module, args, moduleToReplace)
		{
			// defining state needed for an instance of the Elm RTS
			var inputs = [];

			/* OFFSET
			 * Elm's time traveling debugger lets you pause time. This means
			 * "now" may be shifted a bit into the past. By wrapping Date.now()
			 * we can manage this.
			 */
			var timer = {
				programStart: Date.now(),
				now: function()
				{
					return Date.now();
				}
			};

			var updateInProgress = false;
			function notify(id, v)
			{
				if (updateInProgress)
				{
					throw new Error(
						'The notify function has been called synchronously!\n' +
						'This can lead to frames being dropped.\n' +
						'Definitely report this to <https://github.com/elm-lang/Elm/issues>\n');
				}
				updateInProgress = true;
				var timestep = timer.now();
				for (var i = inputs.length; i--; )
				{
					inputs[i].notify(timestep, id, v);
				}
				updateInProgress = false;
			}
			function setTimeout(func, delay)
			{
				return window.setTimeout(func, delay);
			}

			var listeners = [];
			function addListener(relevantInputs, domNode, eventName, func)
			{
				domNode.addEventListener(eventName, func);
				var listener = {
					relevantInputs: relevantInputs,
					domNode: domNode,
					eventName: eventName,
					func: func
				};
				listeners.push(listener);
			}

			var argsTracker = {};
			for (var name in args)
			{
				argsTracker[name] = {
					value: args[name],
					used: false
				};
			}

			// create the actual RTS. Any impure modules will attach themselves to this
			// object. This permits many Elm programs to be embedded per document.
			var elm = {
				notify: notify,
				setTimeout: setTimeout,
				node: container,
				addListener: addListener,
				inputs: inputs,
				timer: timer,
				argsTracker: argsTracker,
				ports: {},

				isFullscreen: function() { return display === Display.FULLSCREEN; },
				isEmbed: function() { return display === Display.COMPONENT; },
				isWorker: function() { return display === Display.NONE; }
			};

			function swap(newModule)
			{
				removeListeners(listeners);
				var div = document.createElement('div');
				var newElm = init(display, div, newModule, args, elm);
				inputs = [];
				// elm.swap = newElm.swap;
				return newElm;
			}

			function dispose()
			{
				removeListeners(listeners);
				inputs = [];
			}

			var Module = {};
			try
			{
				Module = module.make(elm);
				checkInputs(elm);
			}
			catch (error)
			{
				if (typeof container.appendChild == 'undefined')
				{
					console.log(error.message);
				}
				else
				{
					container.appendChild(errorNode(error.message));
				}
				throw error;
			}

			if (display !== Display.NONE)
			{
				var graphicsNode = initGraphics(elm, Module);
			}

			var rootNode = { kids: inputs };
			trimDeadNodes(rootNode);
			inputs = rootNode.kids;
			filterListeners(inputs, listeners);

			addReceivers(elm.ports);

			if (typeof moduleToReplace !== 'undefined')
			{
				hotSwap(moduleToReplace, elm);

				// rerender scene if graphics are enabled.
				if (typeof graphicsNode !== 'undefined')
				{
					graphicsNode.notify(0, true, 0);
				}
			}

			return {
				swap: swap,
				ports: elm.ports,
				dispose: dispose
			};
		};

		function checkInputs(elm)
		{
			var argsTracker = elm.argsTracker;
			for (var name in argsTracker)
			{
				if (!argsTracker[name].used)
				{
					throw new Error(
						"Port Error:\nYou provided an argument named '" + name +
						"' but there is no corresponding port!\n\n" +
						"Maybe add a port '" + name + "' to your Elm module?\n" +
						"Maybe remove the '" + name + "' argument from your initialization code in JS?"
					);
				}
			}
		}

		function errorNode(message)
		{
			var code = document.createElement('code');

			var lines = message.split('\n');
			code.appendChild(document.createTextNode(lines[0]));
			code.appendChild(document.createElement('br'));
			code.appendChild(document.createElement('br'));
			for (var i = 1; i < lines.length; ++i)
			{
				code.appendChild(document.createTextNode('\u00A0 \u00A0 ' + lines[i].replace(/  /g, '\u00A0 ')));
				code.appendChild(document.createElement('br'));
			}
			code.appendChild(document.createElement('br'));
			code.appendChild(document.createTextNode("Open the developer console for more details."));
			return code;
		}


		//// FILTER SIGNALS ////

		// TODO: move this code into the signal module and create a function
		// Signal.initializeGraph that actually instantiates everything.

		function filterListeners(inputs, listeners)
		{
			loop:
			for (var i = listeners.length; i--; )
			{
				var listener = listeners[i];
				for (var j = inputs.length; j--; )
				{
					if (listener.relevantInputs.indexOf(inputs[j].id) >= 0)
					{
						continue loop;
					}
				}
				listener.domNode.removeEventListener(listener.eventName, listener.func);
			}
		}

		function removeListeners(listeners)
		{
			for (var i = listeners.length; i--; )
			{
				var listener = listeners[i];
				listener.domNode.removeEventListener(listener.eventName, listener.func);
			}
		}

		// add receivers for built-in ports if they are defined
		function addReceivers(ports)
		{
			if ('title' in ports)
			{
				if (typeof ports.title === 'string')
				{
					document.title = ports.title;
				}
				else
				{
					ports.title.subscribe(function(v) { document.title = v; });
				}
			}
			if ('redirect' in ports)
			{
				ports.redirect.subscribe(function(v) {
					if (v.length > 0)
					{
						window.location = v;
					}
				});
			}
		}


		// returns a boolean representing whether the node is alive or not.
		function trimDeadNodes(node)
		{
			if (node.isOutput)
			{
				return true;
			}

			var liveKids = [];
			for (var i = node.kids.length; i--; )
			{
				var kid = node.kids[i];
				if (trimDeadNodes(kid))
				{
					liveKids.push(kid);
				}
			}
			node.kids = liveKids;

			return liveKids.length > 0;
		}


		////  RENDERING  ////

		function initGraphics(elm, Module)
		{
			if (!('main' in Module))
			{
				throw new Error("'main' is missing! What do I display?!");
			}

			var signalGraph = Module.main;

			// make sure the signal graph is actually a signal & extract the visual model
			if (!('notify' in signalGraph))
			{
				signalGraph = Elm.Signal.make(elm).constant(signalGraph);
			}
			var initialScene = signalGraph.value;

			// Figure out what the render functions should be
			var render;
			var update;
			if (initialScene.props)
			{
				var Element = Elm.Native.Graphics.Element.make(elm);
				render = Element.render;
				update = Element.updateAndReplace;
			}
			else
			{
				var VirtualDom = Elm.Native.VirtualDom.make(elm);
				render = VirtualDom.render;
				update = VirtualDom.updateAndReplace;
			}

			// Add the initialScene to the DOM
			var container = elm.node;
			var node = render(initialScene);
			while (container.firstChild)
			{
				container.removeChild(container.firstChild);
			}
			container.appendChild(node);

			var _requestAnimationFrame =
				typeof requestAnimationFrame !== 'undefined'
					? requestAnimationFrame
					: function(cb) { setTimeout(cb, 1000/60); }
					;

			// domUpdate is called whenever the main Signal changes.
			//
			// domUpdate and drawCallback implement a small state machine in order
			// to schedule only 1 draw per animation frame. This enforces that
			// once draw has been called, it will not be called again until the
			// next frame.
			//
			// drawCallback is scheduled whenever
			// 1. The state transitions from PENDING_REQUEST to EXTRA_REQUEST, or
			// 2. The state transitions from NO_REQUEST to PENDING_REQUEST
			//
			// Invariants:
			// 1. In the NO_REQUEST state, there is never a scheduled drawCallback.
			// 2. In the PENDING_REQUEST and EXTRA_REQUEST states, there is always exactly 1
			//    scheduled drawCallback.
			var NO_REQUEST = 0;
			var PENDING_REQUEST = 1;
			var EXTRA_REQUEST = 2;
			var state = NO_REQUEST;
			var savedScene = initialScene;
			var scheduledScene = initialScene;

			function domUpdate(newScene)
			{
				scheduledScene = newScene;

				switch (state)
				{
					case NO_REQUEST:
						_requestAnimationFrame(drawCallback);
						state = PENDING_REQUEST;
						return;
					case PENDING_REQUEST:
						state = PENDING_REQUEST;
						return;
					case EXTRA_REQUEST:
						state = PENDING_REQUEST;
						return;
				}
			}

			function drawCallback()
			{
				switch (state)
				{
					case NO_REQUEST:
						// This state should not be possible. How can there be no
						// request, yet somehow we are actively fulfilling a
						// request?
						throw new Error(
							"Unexpected draw callback.\n" +
							"Please report this to <https://github.com/elm-lang/core/issues>."
						);

					case PENDING_REQUEST:
						// At this point, we do not *know* that another frame is
						// needed, but we make an extra request to rAF just in
						// case. It's possible to drop a frame if rAF is called
						// too late, so we just do it preemptively.
						_requestAnimationFrame(drawCallback);
						state = EXTRA_REQUEST;

						// There's also stuff we definitely need to draw.
						draw();
						return;

					case EXTRA_REQUEST:
						// Turns out the extra request was not needed, so we will
						// stop calling rAF. No reason to call it all the time if
						// no one needs it.
						state = NO_REQUEST;
						return;
				}
			}

			function draw()
			{
				update(elm.node.firstChild, savedScene, scheduledScene);
				if (elm.Native.Window)
				{
					elm.Native.Window.values.resizeIfNeeded();
				}
				savedScene = scheduledScene;
			}

			var renderer = Elm.Native.Signal.make(elm).output('main', domUpdate, signalGraph);

			// must check for resize after 'renderer' is created so
			// that changes show up.
			if (elm.Native.Window)
			{
				elm.Native.Window.values.resizeIfNeeded();
			}

			return renderer;
		}

		//// HOT SWAPPING ////

		// Returns boolean indicating if the swap was successful.
		// Requires that the two signal graphs have exactly the same
		// structure.
		function hotSwap(from, to)
		{
			function similar(nodeOld,nodeNew)
			{
				if (nodeOld.id !== nodeNew.id)
				{
					return false;
				}
				if (nodeOld.isOutput)
				{
					return nodeNew.isOutput;
				}
				return nodeOld.kids.length === nodeNew.kids.length;
			}
			function swap(nodeOld,nodeNew)
			{
				nodeNew.value = nodeOld.value;
				return true;
			}
			var canSwap = depthFirstTraversals(similar, from.inputs, to.inputs);
			if (canSwap)
			{
				depthFirstTraversals(swap, from.inputs, to.inputs);
			}
			from.node.parentNode.replaceChild(to.node, from.node);

			return canSwap;
		}

		// Returns false if the node operation f ever fails.
		function depthFirstTraversals(f, queueOld, queueNew)
		{
			if (queueOld.length !== queueNew.length)
			{
				return false;
			}
			queueOld = queueOld.slice(0);
			queueNew = queueNew.slice(0);

			var seen = [];
			while (queueOld.length > 0 && queueNew.length > 0)
			{
				var nodeOld = queueOld.pop();
				var nodeNew = queueNew.pop();
				if (seen.indexOf(nodeOld.id) < 0)
				{
					if (!f(nodeOld, nodeNew))
					{
						return false;
					}
					queueOld = queueOld.concat(nodeOld.kids || []);
					queueNew = queueNew.concat(nodeNew.kids || []);
					seen.push(nodeOld.id);
				}
			}
			return true;
		}
	}());

	function F2(fun)
	{
		function wrapper(a) { return function(b) { return fun(a,b) } }
		wrapper.arity = 2;
		wrapper.func = fun;
		return wrapper;
	}

	function F3(fun)
	{
		function wrapper(a) {
			return function(b) { return function(c) { return fun(a,b,c) }}
		}
		wrapper.arity = 3;
		wrapper.func = fun;
		return wrapper;
	}

	function F4(fun)
	{
		function wrapper(a) { return function(b) { return function(c) {
			return function(d) { return fun(a,b,c,d) }}}
		}
		wrapper.arity = 4;
		wrapper.func = fun;
		return wrapper;
	}

	function F5(fun)
	{
		function wrapper(a) { return function(b) { return function(c) {
			return function(d) { return function(e) { return fun(a,b,c,d,e) }}}}
		}
		wrapper.arity = 5;
		wrapper.func = fun;
		return wrapper;
	}

	function F6(fun)
	{
		function wrapper(a) { return function(b) { return function(c) {
			return function(d) { return function(e) { return function(f) {
			return fun(a,b,c,d,e,f) }}}}}
		}
		wrapper.arity = 6;
		wrapper.func = fun;
		return wrapper;
	}

	function F7(fun)
	{
		function wrapper(a) { return function(b) { return function(c) {
			return function(d) { return function(e) { return function(f) {
			return function(g) { return fun(a,b,c,d,e,f,g) }}}}}}
		}
		wrapper.arity = 7;
		wrapper.func = fun;
		return wrapper;
	}

	function F8(fun)
	{
		function wrapper(a) { return function(b) { return function(c) {
			return function(d) { return function(e) { return function(f) {
			return function(g) { return function(h) {
			return fun(a,b,c,d,e,f,g,h)}}}}}}}
		}
		wrapper.arity = 8;
		wrapper.func = fun;
		return wrapper;
	}

	function F9(fun)
	{
		function wrapper(a) { return function(b) { return function(c) {
			return function(d) { return function(e) { return function(f) {
			return function(g) { return function(h) { return function(i) {
			return fun(a,b,c,d,e,f,g,h,i) }}}}}}}}
		}
		wrapper.arity = 9;
		wrapper.func = fun;
		return wrapper;
	}

	function A2(fun,a,b)
	{
		return fun.arity === 2
			? fun.func(a,b)
			: fun(a)(b);
	}
	function A3(fun,a,b,c)
	{
		return fun.arity === 3
			? fun.func(a,b,c)
			: fun(a)(b)(c);
	}
	function A4(fun,a,b,c,d)
	{
		return fun.arity === 4
			? fun.func(a,b,c,d)
			: fun(a)(b)(c)(d);
	}
	function A5(fun,a,b,c,d,e)
	{
		return fun.arity === 5
			? fun.func(a,b,c,d,e)
			: fun(a)(b)(c)(d)(e);
	}
	function A6(fun,a,b,c,d,e,f)
	{
		return fun.arity === 6
			? fun.func(a,b,c,d,e,f)
			: fun(a)(b)(c)(d)(e)(f);
	}
	function A7(fun,a,b,c,d,e,f,g)
	{
		return fun.arity === 7
			? fun.func(a,b,c,d,e,f,g)
			: fun(a)(b)(c)(d)(e)(f)(g);
	}
	function A8(fun,a,b,c,d,e,f,g,h)
	{
		return fun.arity === 8
			? fun.func(a,b,c,d,e,f,g,h)
			: fun(a)(b)(c)(d)(e)(f)(g)(h);
	}
	function A9(fun,a,b,c,d,e,f,g,h,i)
	{
		return fun.arity === 9
			? fun.func(a,b,c,d,e,f,g,h,i)
			: fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
	}
}

Elm.Native.Show = {};
Elm.Native.Show.make = function(localRuntime) {
	localRuntime.Native = localRuntime.Native || {};
	localRuntime.Native.Show = localRuntime.Native.Show || {};
	if (localRuntime.Native.Show.values)
	{
		return localRuntime.Native.Show.values;
	}

	var _Array;
	var Dict;
	var List;
	var Utils = Elm.Native.Utils.make(localRuntime);

	var toString = function(v)
	{
		var type = typeof v;
		if (type === "function")
		{
			var name = v.func ? v.func.name : v.name;
			return '<function' + (name === '' ? '' : ': ') + name + '>';
		}
		else if (type === "boolean")
		{
			return v ? "True" : "False";
		}
		else if (type === "number")
		{
			return v + "";
		}
		else if ((v instanceof String) && v.isChar)
		{
			return "'" + addSlashes(v, true) + "'";
		}
		else if (type === "string")
		{
			return '"' + addSlashes(v, false) + '"';
		}
		else if (type === "object" && '_' in v && probablyPublic(v))
		{
			var output = [];
			for (var k in v._)
			{
				for (var i = v._[k].length; i--; )
				{
					output.push(k + " = " + toString(v._[k][i]));
				}
			}
			for (var k in v)
			{
				if (k === '_') continue;
				output.push(k + " = " + toString(v[k]));
			}
			if (output.length === 0)
			{
				return "{}";
			}
			return "{ " + output.join(", ") + " }";
		}
		else if (type === "object" && 'ctor' in v)
		{
			if (v.ctor.substring(0,6) === "_Tuple")
			{
				var output = [];
				for (var k in v)
				{
					if (k === 'ctor') continue;
					output.push(toString(v[k]));
				}
				return "(" + output.join(",") + ")";
			}
			else if (v.ctor === "_Array")
			{
				if (!_Array)
				{
					_Array = Elm.Array.make(localRuntime);
				}
				var list = _Array.toList(v);
				return "Array.fromList " + toString(list);
			}
			else if (v.ctor === "::")
			{
				var output = '[' + toString(v._0);
				v = v._1;
				while (v.ctor === "::")
				{
					output += "," + toString(v._0);
					v = v._1;
				}
				return output + ']';
			}
			else if (v.ctor === "[]")
			{
				return "[]";
			}
			else if (v.ctor === "RBNode" || v.ctor === "RBEmpty")
			{
				if (!Dict)
				{
					Dict = Elm.Dict.make(localRuntime);
				}
				if (!List)
				{
					List = Elm.List.make(localRuntime);
				}
				var list = Dict.toList(v);
				var name = "Dict";
				if (list.ctor === "::" && list._0._1.ctor === "_Tuple0")
				{
					name = "Set";
					list = A2(List.map, function(x){return x._0}, list);
				}
				return name + ".fromList " + toString(list);
			}
			else if (v.ctor.slice(0,5) === "Text:")
			{
				return '<text>'
			}
			else
			{
				var output = "";
				for (var i in v)
				{
					if (i === 'ctor') continue;
					var str = toString(v[i]);
					var parenless = str[0] === '{' || str[0] === '<' || str.indexOf(' ') < 0;
					output += ' ' + (parenless ? str : '(' + str + ')');
				}
				return v.ctor + output;
			}
		}
		if (type === 'object' && 'notify' in v && 'id' in v)
		{
			return '<Signal>';
		}
		return "<internal structure>";
	};

	function addSlashes(str, isChar)
	{
		var s = str.replace(/\\/g, '\\\\')
				  .replace(/\n/g, '\\n')
				  .replace(/\t/g, '\\t')
				  .replace(/\r/g, '\\r')
				  .replace(/\v/g, '\\v')
				  .replace(/\0/g, '\\0');
		if (isChar)
		{
			return s.replace(/\'/g, "\\'")
		}
		else
		{
			return s.replace(/\"/g, '\\"');
		}
	}

	function probablyPublic(v)
	{
		var keys = Object.keys(v);
		var len = keys.length;
		if (len === 3
			&& 'props' in v
			&& 'element' in v)
		{
			return false;
		}
		else if (len === 5
			&& 'horizontal' in v
			&& 'vertical' in v
			&& 'x' in v
			&& 'y' in v)
		{
			return false;
		}
		else if (len === 7
			&& 'theta' in v
			&& 'scale' in v
			&& 'x' in v
			&& 'y' in v
			&& 'alpha' in v
			&& 'form' in v)
		{
			return false;
		}
		return true;
	}

	return localRuntime.Native.Show.values = {
		toString: toString
	};
};

Elm.Native.Signal = {};
Elm.Native.Signal.make = function(localRuntime) {

	localRuntime.Native = localRuntime.Native || {};
	localRuntime.Native.Signal = localRuntime.Native.Signal || {};
	if (localRuntime.Native.Signal.values)
	{
		return localRuntime.Native.Signal.values;
	}


	var Task = Elm.Native.Task.make(localRuntime);
	var Utils = Elm.Native.Utils.make(localRuntime);


	function broadcastToKids(node, timestamp, update)
	{
		var kids = node.kids;
		for (var i = kids.length; i--; )
		{
			kids[i].notify(timestamp, update, node.id);
		}
	}


	// INPUT

	function input(name, base)
	{
		var node = {
			id: Utils.guid(),
			name: 'input-' + name,
			value: base,
			parents: [],
			kids: []
		};

		node.notify = function(timestamp, targetId, value) {
			var update = targetId === node.id;
			if (update)
			{
				node.value = value;
			}
			broadcastToKids(node, timestamp, update);
			return update;
		};

		localRuntime.inputs.push(node);

		return node;
	}

	function constant(value)
	{
		return input('constant', value);
	}


	// MAILBOX

	function mailbox(base)
	{
		var signal = input('mailbox', base);

		function send(value) {
			return Task.asyncFunction(function(callback) {
				localRuntime.setTimeout(function() {
					localRuntime.notify(signal.id, value);
				}, 0);
				callback(Task.succeed(Utils.Tuple0));
			});
		}

		return {
			_: {},
			signal: signal,
			address: {
				ctor: 'Address',
				_0: send
			}
		};
	}

	function sendMessage(message)
	{
		Task.perform(message._0);
	}


	// OUTPUT

	function output(name, handler, parent)
	{
		var node = {
			id: Utils.guid(),
			name: 'output-' + name,
			parents: [parent],
			isOutput: true
		};

		node.notify = function(timestamp, parentUpdate, parentID)
		{
			if (parentUpdate)
			{
				handler(parent.value);
			}
		};

		parent.kids.push(node);

		return node;
	}


	// MAP

	function mapMany(refreshValue, args)
	{
		var node = {
			id: Utils.guid(),
			name: 'map' + args.length,
			value: refreshValue(),
			parents: args,
			kids: []
		};

		var numberOfParents = args.length;
		var count = 0;
		var update = false;

		node.notify = function(timestamp, parentUpdate, parentID)
		{
			++count;

			update = update || parentUpdate;

			if (count === numberOfParents)
			{
				if (update)
				{
					node.value = refreshValue();
				}
				broadcastToKids(node, timestamp, update);
				update = false;
				count = 0;
			}
		};

		for (var i = numberOfParents; i--; )
		{
			args[i].kids.push(node);
		}

		return node;
	}


	function map(func, a)
	{
		function refreshValue()
		{
			return func(a.value);
		}
		return mapMany(refreshValue, [a]);
	}


	function map2(func, a, b)
	{
		function refreshValue()
		{
			return A2( func, a.value, b.value );
		}
		return mapMany(refreshValue, [a,b]);
	}


	function map3(func, a, b, c)
	{
		function refreshValue()
		{
			return A3( func, a.value, b.value, c.value );
		}
		return mapMany(refreshValue, [a,b,c]);
	}


	function map4(func, a, b, c, d)
	{
		function refreshValue()
		{
			return A4( func, a.value, b.value, c.value, d.value );
		}
		return mapMany(refreshValue, [a,b,c,d]);
	}


	function map5(func, a, b, c, d, e)
	{
		function refreshValue()
		{
			return A5( func, a.value, b.value, c.value, d.value, e.value );
		}
		return mapMany(refreshValue, [a,b,c,d,e]);
	}



	// FOLD

	function foldp(update, state, signal)
	{
		var node = {
			id: Utils.guid(),
			name: 'foldp',
			parents: [signal],
			kids: [],
			value: state
		};

		node.notify = function(timestamp, parentUpdate, parentID)
		{
			if (parentUpdate)
			{
				node.value = A2( update, signal.value, node.value );
			}
			broadcastToKids(node, timestamp, parentUpdate);
		};

		signal.kids.push(node);

		return node;
	}


	// TIME

	function timestamp(signal)
	{
		var node = {
			id: Utils.guid(),
			name: 'timestamp',
			value: Utils.Tuple2(localRuntime.timer.programStart, signal.value),
			parents: [signal],
			kids: []
		};

		node.notify = function(timestamp, parentUpdate, parentID)
		{
			if (parentUpdate)
			{
				node.value = Utils.Tuple2(timestamp, signal.value);
			}
			broadcastToKids(node, timestamp, parentUpdate);
		};

		signal.kids.push(node);

		return node;
	}


	function delay(time, signal)
	{
		var delayed = input('delay-input-' + time, signal.value);

		function handler(value)
		{
			setTimeout(function() {
				localRuntime.notify(delayed.id, value);
			}, time);
		}

		output('delay-output-' + time, handler, signal);

		return delayed;
	}


	// MERGING

	function genericMerge(tieBreaker, leftStream, rightStream)
	{
		var node = {
			id: Utils.guid(),
			name: 'merge',
			value: A2(tieBreaker, leftStream.value, rightStream.value),
			parents: [leftStream, rightStream],
			kids: []
		};

		var left = { touched: false, update: false, value: null };
		var right = { touched: false, update: false, value: null };

		node.notify = function(timestamp, parentUpdate, parentID)
		{
			if (parentID === leftStream.id)
			{
				left.touched = true;
				left.update = parentUpdate;
				left.value = leftStream.value;
			}
			if (parentID === rightStream.id)
			{
				right.touched = true;
				right.update = parentUpdate;
				right.value = rightStream.value;
			}

			if (left.touched && right.touched)
			{
				var update = false;
				if (left.update && right.update)
				{
					node.value = A2(tieBreaker, left.value, right.value);
					update = true;
				}
				else if (left.update)
				{
					node.value = left.value;
					update = true;
				}
				else if (right.update)
				{
					node.value = right.value;
					update = true;
				}
				left.touched = false;
				right.touched = false;

				broadcastToKids(node, timestamp, update);
			}
		};

		leftStream.kids.push(node);
		rightStream.kids.push(node);

		return node;
	}


	// FILTERING

	function filterMap(toMaybe, base, signal)
	{
		var maybe = toMaybe(signal.value);
		var node = {
			id: Utils.guid(),
			name: 'filterMap',
			value: maybe.ctor === 'Nothing' ? base : maybe._0,
			parents: [signal],
			kids: []
		};

		node.notify = function(timestamp, parentUpdate, parentID)
		{
			var update = false;
			if (parentUpdate)
			{
				var maybe = toMaybe(signal.value);
				if (maybe.ctor === 'Just')
				{
					update = true;
					node.value = maybe._0;
				}
			}
			broadcastToKids(node, timestamp, update);
		};

		signal.kids.push(node);

		return node;
	}


	// SAMPLING

	function sampleOn(ticker, signal)
	{
		var node = {
			id: Utils.guid(),
			name: 'sampleOn',
			value: signal.value,
			parents: [ticker, signal],
			kids: []
		};

		var signalTouch = false;
		var tickerTouch = false;
		var tickerUpdate = false;

		node.notify = function(timestamp, parentUpdate, parentID)
		{
			if (parentID === ticker.id)
			{
				tickerTouch = true;
				tickerUpdate = parentUpdate;
			}
			if (parentID === signal.id)
			{
				signalTouch = true;
			}

			if (tickerTouch && signalTouch)
			{
				if (tickerUpdate)
				{
					node.value = signal.value;
				}
				tickerTouch = false;
				signalTouch = false;

				broadcastToKids(node, timestamp, tickerUpdate);
			}
		};

		ticker.kids.push(node);
		signal.kids.push(node);

		return node;
	}


	// DROP REPEATS

	function dropRepeats(signal)
	{
		var node = {
			id: Utils.guid(),
			name: 'dropRepeats',
			value: signal.value,
			parents: [signal],
			kids: []
		};

		node.notify = function(timestamp, parentUpdate, parentID)
		{
			var update = false;
			if (parentUpdate && !Utils.eq(node.value, signal.value))
			{
				node.value = signal.value;
				update = true;
			}
			broadcastToKids(node, timestamp, update);
		};

		signal.kids.push(node);

		return node;
	}


	return localRuntime.Native.Signal.values = {
		input: input,
		constant: constant,
		mailbox: mailbox,
		sendMessage: sendMessage,
		output: output,
		map: F2(map),
		map2: F3(map2),
		map3: F4(map3),
		map4: F5(map4),
		map5: F6(map5),
		foldp: F3(foldp),
		genericMerge: F3(genericMerge),
		filterMap: F3(filterMap),
		sampleOn: F2(sampleOn),
		dropRepeats: dropRepeats,
		timestamp: timestamp,
		delay: F2(delay)
	};
};

Elm.Native.String = {};
Elm.Native.String.make = function(localRuntime) {

	localRuntime.Native = localRuntime.Native || {};
	localRuntime.Native.String = localRuntime.Native.String || {};
	if (localRuntime.Native.String.values)
	{
		return localRuntime.Native.String.values;
	}
	if ('values' in Elm.Native.String)
	{
		return localRuntime.Native.String.values = Elm.Native.String.values;
	}


	var Char = Elm.Char.make(localRuntime);
	var List = Elm.Native.List.make(localRuntime);
	var Maybe = Elm.Maybe.make(localRuntime);
	var Result = Elm.Result.make(localRuntime);
	var Utils = Elm.Native.Utils.make(localRuntime);

	function isEmpty(str)
	{
		return str.length === 0;
	}
	function cons(chr,str)
	{
		return chr + str;
	}
	function uncons(str)
	{
		var hd;
		return (hd = str[0])
			? Maybe.Just(Utils.Tuple2(Utils.chr(hd), str.slice(1)))
			: Maybe.Nothing;
	}
	function append(a,b)
	{
		return a + b;
	}
	function concat(strs)
	{
		return List.toArray(strs).join('');
	}
	function length(str)
	{
		return str.length;
	}
	function map(f,str)
	{
		var out = str.split('');
		for (var i = out.length; i--; )
		{
			out[i] = f(Utils.chr(out[i]));
		}
		return out.join('');
	}
	function filter(pred,str)
	{
		return str.split('').map(Utils.chr).filter(pred).join('');
	}
	function reverse(str)
	{
		return str.split('').reverse().join('');
	}
	function foldl(f,b,str)
	{
		var len = str.length;
		for (var i = 0; i < len; ++i)
		{
			b = A2(f, Utils.chr(str[i]), b);
		}
		return b;
	}
	function foldr(f,b,str)
	{
		for (var i = str.length; i--; )
		{
			b = A2(f, Utils.chr(str[i]), b);
		}
		return b;
	}

	function split(sep, str)
	{
		return List.fromArray(str.split(sep));
	}
	function join(sep, strs)
	{
		return List.toArray(strs).join(sep);
	}
	function repeat(n, str)
	{
		var result = '';
		while (n > 0)
		{
			if (n & 1)
			{
				result += str;
			}
			n >>= 1, str += str;
		}
		return result;
	}

	function slice(start, end, str)
	{
		return str.slice(start,end);
	}
	function left(n, str)
	{
		return n < 1 ? "" : str.slice(0,n);
	}
	function right(n, str)
	{
		return n < 1 ? "" : str.slice(-n);
	}
	function dropLeft(n, str)
	{
		return n < 1 ? str : str.slice(n);
	}
	function dropRight(n, str)
	{
		return n < 1 ? str : str.slice(0,-n);
	}

	function pad(n,chr,str)
	{
		var half = (n - str.length) / 2;
		return repeat(Math.ceil(half),chr) + str + repeat(half|0,chr);
	}
	function padRight(n,chr,str)
	{
		return str + repeat(n - str.length, chr);
	}
	function padLeft(n,chr,str)
	{
		return repeat(n - str.length, chr) + str;
	}

	function trim(str)
	{
		return str.trim();
	}
	function trimLeft(str)
	{
		return str.trimLeft();
	}
	function trimRight(str)
	{
		return str.trimRight();
	}

	function words(str)
	{
		return List.fromArray(str.trim().split(/\s+/g));
	}
	function lines(str)
	{
		return List.fromArray(str.split(/\r\n|\r|\n/g));
	}

	function toUpper(str)
	{
		return str.toUpperCase();
	}
	function toLower(str)
	{
		return str.toLowerCase();
	}

	function any(pred, str)
	{
		for (var i = str.length; i--; )
		{
			if (pred(Utils.chr(str[i])))
			{
				return true;
			}
		}
		return false;
	}
	function all(pred, str)
	{
		for (var i = str.length; i--; )
		{
			if (!pred(Utils.chr(str[i])))
			{
				return false;
			}
		}
		return true;
	}

	function contains(sub, str)
	{
		return str.indexOf(sub) > -1;
	}
	function startsWith(sub, str)
	{
		return str.indexOf(sub) === 0;
	}
	function endsWith(sub, str)
	{
		return str.length >= sub.length &&
			str.lastIndexOf(sub) === str.length - sub.length;
	}
	function indexes(sub, str)
	{
		var subLen = sub.length;
		var i = 0;
		var is = [];
		while ((i = str.indexOf(sub, i)) > -1)
		{
			is.push(i);
			i = i + subLen;
		}
		return List.fromArray(is);
	}

	function toInt(s)
	{
		var len = s.length;
		if (len === 0)
		{
			return Result.Err("could not convert string '" + s + "' to an Int" );
		}
		var start = 0;
		if (s[0] == '-')
		{
			if (len === 1)
			{
				return Result.Err("could not convert string '" + s + "' to an Int" );
			}
			start = 1;
		}
		for (var i = start; i < len; ++i)
		{
			if (!Char.isDigit(s[i]))
			{
				return Result.Err("could not convert string '" + s + "' to an Int" );
			}
		}
		return Result.Ok(parseInt(s, 10));
	}

	function toFloat(s)
	{
		var len = s.length;
		if (len === 0)
		{
			return Result.Err("could not convert string '" + s + "' to a Float" );
		}
		var start = 0;
		if (s[0] == '-')
		{
			if (len === 1)
			{
				return Result.Err("could not convert string '" + s + "' to a Float" );
			}
			start = 1;
		}
		var dotCount = 0;
		for (var i = start; i < len; ++i)
		{
			if (Char.isDigit(s[i]))
			{
				continue;
			}
			if (s[i] === '.')
			{
				dotCount += 1;
				if (dotCount <= 1)
				{
					continue;
				}
			}
			return Result.Err("could not convert string '" + s + "' to a Float" );
		}
		return Result.Ok(parseFloat(s));
	}

	function toList(str)
	{
		return List.fromArray(str.split('').map(Utils.chr));
	}
	function fromList(chars)
	{
		return List.toArray(chars).join('');
	}

	return Elm.Native.String.values = {
		isEmpty: isEmpty,
		cons: F2(cons),
		uncons: uncons,
		append: F2(append),
		concat: concat,
		length: length,
		map: F2(map),
		filter: F2(filter),
		reverse: reverse,
		foldl: F3(foldl),
		foldr: F3(foldr),

		split: F2(split),
		join: F2(join),
		repeat: F2(repeat),

		slice: F3(slice),
		left: F2(left),
		right: F2(right),
		dropLeft: F2(dropLeft),
		dropRight: F2(dropRight),

		pad: F3(pad),
		padLeft: F3(padLeft),
		padRight: F3(padRight),

		trim: trim,
		trimLeft: trimLeft,
		trimRight: trimRight,

		words: words,
		lines: lines,

		toUpper: toUpper,
		toLower: toLower,

		any: F2(any),
		all: F2(all),

		contains: F2(contains),
		startsWith: F2(startsWith),
		endsWith: F2(endsWith),
		indexes: F2(indexes),

		toInt: toInt,
		toFloat: toFloat,
		toList: toList,
		fromList: fromList
	};
};

Elm.Native.Task = {};
Elm.Native.Task.make = function(localRuntime) {

	localRuntime.Native = localRuntime.Native || {};
	localRuntime.Native.Task = localRuntime.Native.Task || {};
	if (localRuntime.Native.Task.values)
	{
		return localRuntime.Native.Task.values;
	}

	var Result = Elm.Result.make(localRuntime);
	var Signal;
	var Utils = Elm.Native.Utils.make(localRuntime);


	// CONSTRUCTORS

	function succeed(value)
	{
		return {
			tag: 'Succeed',
			value: value
		};
	}

	function fail(error)
	{
		return {
			tag: 'Fail',
			value: error
		};
	}

	function asyncFunction(func)
	{
		return {
			tag: 'Async',
			asyncFunction: func
		};
	}

	function andThen(task, callback)
	{
		return {
			tag: 'AndThen',
			task: task,
			callback: callback
		};
	}

	function catch_(task, callback)
	{
		return {
			tag: 'Catch',
			task: task,
			callback: callback
		};
	}


	// RUNNER

	function perform(task) {
		runTask({ task: task }, function() {});
	}

	function performSignal(name, signal)
	{
		var workQueue = [];

		function onComplete()
		{
			workQueue.shift();

			setTimeout(function() {
				if (workQueue.length > 0)
				{
					runTask(workQueue[0], onComplete);
				}
			}, 0);
		}

		function register(task)
		{
			var root = { task: task };
			workQueue.push(root);
			if (workQueue.length === 1)
			{
				runTask(root, onComplete);
			}
		}

		if (!Signal)
		{
			Signal = Elm.Native.Signal.make(localRuntime);
		}
		Signal.output('perform-tasks-' + name, register, signal);

		register(signal.value);

		return signal;
	}

	function mark(status, task)
	{
		return { status: status, task: task };
	}

	function runTask(root, onComplete)
	{
		var result = mark('runnable', root.task);
		while (result.status === 'runnable')
		{
			result = stepTask(onComplete, root, result.task);
		}

		if (result.status === 'done')
		{
			root.task = result.task;
			onComplete();
		}

		if (result.status === 'blocked')
		{
			root.task = result.task;
		}
	}

	function stepTask(onComplete, root, task)
	{
		var tag = task.tag;

		if (tag === 'Succeed' || tag === 'Fail')
		{
			return mark('done', task);
		}

		if (tag === 'Async')
		{
			var placeHolder = {};
			var couldBeSync = true;
			var wasSync = false;

			task.asyncFunction(function(result) {
				placeHolder.tag = result.tag;
				placeHolder.value = result.value;
				if (couldBeSync)
				{
					wasSync = true;
				}
				else
				{
					runTask(root, onComplete);
				}
			});
			couldBeSync = false;
			return mark(wasSync ? 'done' : 'blocked', placeHolder);
		}

		if (tag === 'AndThen' || tag === 'Catch')
		{
			var result = mark('runnable', task.task);
			while (result.status === 'runnable')
			{
				result = stepTask(onComplete, root, result.task);
			}

			if (result.status === 'done')
			{
				var activeTask = result.task;
				var activeTag = activeTask.tag;

				var succeedChain = activeTag === 'Succeed' && tag === 'AndThen';
				var failChain = activeTag === 'Fail' && tag === 'Catch';

				return (succeedChain || failChain)
					? mark('runnable', task.callback(activeTask.value))
					: mark('runnable', activeTask);
			}
			if (result.status === 'blocked')
			{
				return mark('blocked', {
					tag: tag,
					task: result.task,
					callback: task.callback
				});
			}
		}
	}


	// THREADS

	function sleep(time) {
		return asyncFunction(function(callback) {
			setTimeout(function() {
				callback(succeed(Utils.Tuple0));
			}, time);
		});
	}

	function spawn(task) {
		return asyncFunction(function(callback) {
			var id = setTimeout(function() {
				perform(task);
			}, 0);
			callback(succeed(id));
		});
	}


	return localRuntime.Native.Task.values = {
		succeed: succeed,
		fail: fail,
		asyncFunction: asyncFunction,
		andThen: F2(andThen),
		catch_: F2(catch_),
		perform: perform,
		performSignal: performSignal,
		spawn: spawn,
		sleep: sleep
	};
};

Elm.Native.Text = {};
Elm.Native.Text.make = function(localRuntime) {
	localRuntime.Native = localRuntime.Native || {};
	localRuntime.Native.Text = localRuntime.Native.Text || {};
	if (localRuntime.Native.Text.values)
	{
		return localRuntime.Native.Text.values;
	}

	var toCss = Elm.Native.Color.make(localRuntime).toCss;
	var List = Elm.Native.List.make(localRuntime);


	// CONSTRUCTORS

	function fromString(str)
	{
		return {
			ctor: 'Text:Text',
			_0: str
		};
	}

	function append(a, b)
	{
		return {
			ctor: 'Text:Append',
			_0: a,
			_1: b
		};
	}

	function addMeta(field, value, text)
	{
		var newProps = {};
		var newText = {
			ctor: 'Text:Meta',
			_0: newProps,
			_1: text
		};

		if (text.ctor === 'Text:Meta')
		{
			newText._1 = text._1;
			var props = text._0;
			for (var i = metaKeys.length; i--; )
			{
				var key = metaKeys[i];
				var val = props[key];
				if (val)
				{
					newProps[key] = val;
				}
			}
		}
		newProps[field] = value;
		return newText;
	}

	var metaKeys = [
		'font-size',
		'font-family',
		'font-style',
		'font-weight',
		'href',
		'text-decoration',
		'color'
	];


	// conversions from Elm values to CSS

	function toTypefaces(list)
	{
		var typefaces = List.toArray(list);
		for (var i = typefaces.length; i--; )
		{
			var typeface = typefaces[i];
			if (typeface.indexOf(' ') > -1)
			{
				typefaces[i] = "'" + typeface + "'";
			}
		}
		return typefaces.join(',');
	}

	function toLine(line)
	{
		var ctor = line.ctor;
		return ctor === 'Under'
			? 'underline'
			: ctor === 'Over'
				? 'overline'
				: 'line-through';
	}

	// setting styles of Text

	function style(style, text)
	{
		var newText = addMeta('color', toCss(style.color), text);
		var props = newText._0;

		if (style.typeface.ctor !== '[]')
		{
			props['font-family'] = toTypefaces(style.typeface);
		}
		if (style.height.ctor !== "Nothing")
		{
			props['font-size'] = style.height._0 + 'px';
		}
		if (style.bold)
		{
			props['font-weight'] = 'bold';
		}
		if (style.italic)
		{
			props['font-style'] = 'italic';
		}
		if (style.line.ctor !== 'Nothing')
		{
			props['text-decoration'] = toLine(style.line._0);
		}
		return newText;
	}

	function height(px, text)
	{
		return addMeta('font-size', px + 'px', text);
	}

	function typeface(names, text)
	{
		return addMeta('font-family', toTypefaces(names), text);
	}

	function monospace(text)
	{
		return addMeta('font-family', 'monospace', text);
	}

	function italic(text)
	{
		return addMeta('font-style', 'italic', text);
	}

	function bold(text)
	{
		return addMeta('font-weight', 'bold', text);
	}

	function link(href, text)
	{
		return addMeta('href', href, text);
	}

	function line(line, text)
	{
		return addMeta('text-decoration', toLine(line), text);
	}

	function color(color, text)
	{
		return addMeta('color', toCss(color), text);;
	}


	// RENDER

	function renderHtml(text)
	{
		var tag = text.ctor;
		if (tag === 'Text:Append')
		{
			return renderHtml(text._0) + renderHtml(text._1);
		}
		if (tag === 'Text:Text')
		{
			return properEscape(text._0);
		}
		if (tag === 'Text:Meta')
		{
			return renderMeta(text._0, renderHtml(text._1));
		}
	}

	function renderMeta(metas, string)
	{
		var href = metas['href'];
		if (href)
		{
			string = '<a href="' + href + '">' + string + '</a>';
		}
		var styles = '';
		for (var key in metas)
		{
			if (key === 'href')
			{
				continue;
			}
			styles += key + ':' + metas[key] + ';';
		}
		if (styles)
		{
			string = '<span style="' + styles + '">' + string + '</span>';
		}
		return string;
	}

	function properEscape(str)
	{
		if (str.length == 0)
		{
			return str;
		}
		str = str //.replace(/&/g,  "&#38;")
			.replace(/"/g,  '&#34;')
			.replace(/'/g,  "&#39;")
			.replace(/</g,  "&#60;")
			.replace(/>/g,  "&#62;");
		var arr = str.split('\n');
		for (var i = arr.length; i--; )
		{
			arr[i] = makeSpaces(arr[i]);
		}
		return arr.join('<br/>');
	}

	function makeSpaces(s)
	{
		if (s.length == 0)
		{
			return s;
		}
		var arr = s.split('');
		if (arr[0] == ' ')
		{
			arr[0] = "&nbsp;"
		}
		for (var i = arr.length; --i; )
		{
			if (arr[i][0] == ' ' && arr[i-1] == ' ')
			{
				arr[i-1] = arr[i-1] + arr[i];
				arr[i] = '';
			}
		}
		for (var i = arr.length; i--; )
		{
			if (arr[i].length > 1 && arr[i][0] == ' ')
			{
				var spaces = arr[i].split('');
				for (var j = spaces.length - 2; j >= 0; j -= 2)
				{
					spaces[j] = '&nbsp;';
				}
				arr[i] = spaces.join('');
			}
		}
		arr = arr.join('');
		if (arr[arr.length-1] === " ")
		{
			return arr.slice(0,-1) + '&nbsp;';
		}
		return arr;
	}


	return localRuntime.Native.Text.values = {
		fromString: fromString,
		append: F2(append),

		height: F2(height),
		italic: italic,
		bold: bold,
		line: F2(line),
		monospace: monospace,
		typeface: F2(typeface),
		color: F2(color),
		link: F2(link),
		style: F2(style),

		toTypefaces: toTypefaces,
		toLine: toLine,
		renderHtml: renderHtml
	};
};

Elm.Native.Time = {};
Elm.Native.Time.make = function(localRuntime)
{

	localRuntime.Native = localRuntime.Native || {};
	localRuntime.Native.Time = localRuntime.Native.Time || {};
	if (localRuntime.Native.Time.values)
	{
		return localRuntime.Native.Time.values;
	}

	var NS = Elm.Native.Signal.make(localRuntime);
	var Maybe = Elm.Maybe.make(localRuntime);


	// FRAMES PER SECOND

	function fpsWhen(desiredFPS, isOn)
	{
		var msPerFrame = 1000 / desiredFPS;
		var ticker = NS.input('fps-' + desiredFPS, null);

		function notifyTicker()
		{
			localRuntime.notify(ticker.id, null);
		}

		function firstArg(x, y)
		{
			return x;
		}

		// input fires either when isOn changes, or when ticker fires.
		// Its value is a tuple with the current timestamp, and the state of isOn
		var input = NS.timestamp(A3(NS.map2, F2(firstArg), NS.dropRepeats(isOn), ticker));

		var initialState = {
			isOn: false,
			time: localRuntime.timer.programStart,
			delta: 0
		};

		var timeoutId;

		function update(input,state)
		{
			var currentTime = input._0;
			var isOn = input._1;
			var wasOn = state.isOn;
			var previousTime = state.time;

			if (isOn)
			{
				timeoutId = localRuntime.setTimeout(notifyTicker, msPerFrame);
			}
			else if (wasOn)
			{
				clearTimeout(timeoutId);
			}

			return {
				isOn: isOn,
				time: currentTime,
				delta: (isOn && !wasOn) ? 0 : currentTime - previousTime
			};
		}

		return A2(
			NS.map,
			function(state) { return state.delta; },
			A3(NS.foldp, F2(update), update(input.value,initialState), input)
		);
	}


	// EVERY

	function every(t)
	{
		var ticker = NS.input('every-' + t, null);
		function tellTime()
		{
			localRuntime.notify(ticker.id, null);
		}
		var clock = A2( NS.map, fst, NS.timestamp(ticker) );
		setInterval(tellTime, t);
		return clock;
	}


	function fst(pair)
	{
		return pair._0;
	}


	function read(s)
	{
		var t = Date.parse(s);
		return isNaN(t) ? Maybe.Nothing : Maybe.Just(t);
	}

	return localRuntime.Native.Time.values = {
		fpsWhen: F2(fpsWhen),
		every: every,
		toDate: function(t) { return new window.Date(t); },
		read: read
	};

};

Elm.Native.Transform2D = {};
Elm.Native.Transform2D.make = function(localRuntime) {

	localRuntime.Native = localRuntime.Native || {};
	localRuntime.Native.Transform2D = localRuntime.Native.Transform2D || {};
	if (localRuntime.Native.Transform2D.values)
	{
		return localRuntime.Native.Transform2D.values;
	}

	var A;
	if (typeof Float32Array === 'undefined')
	{
		A = function(arr)
		{
			this.length = arr.length;
			this[0] = arr[0];
			this[1] = arr[1];
			this[2] = arr[2];
			this[3] = arr[3];
			this[4] = arr[4];
			this[5] = arr[5];
		};
	}
	else
	{
		A = Float32Array;
	}

	// layout of matrix in an array is
	//
	//   | m11 m12 dx |
	//   | m21 m22 dy |
	//   |  0   0   1 |
	//
	//  new A([ m11, m12, dx, m21, m22, dy ])

	var identity = new A([1,0,0,0,1,0]);
	function matrix(m11, m12, m21, m22, dx, dy)
	{
		return new A([m11, m12, dx, m21, m22, dy]);
	}

	function rotation(t)
	{
		var c = Math.cos(t);
		var s = Math.sin(t);
		return new A([c, -s, 0, s, c, 0]);
	}

	function rotate(t,m)
	{
		var c = Math.cos(t);
		var s = Math.sin(t);
		var m11 = m[0], m12 = m[1], m21 = m[3], m22 = m[4];
		return new A([m11*c + m12*s, -m11*s + m12*c, m[2],
					  m21*c + m22*s, -m21*s + m22*c, m[5]]);
	}
	/*
	function move(xy,m) {
		var x = xy._0;
		var y = xy._1;
		var m11 = m[0], m12 = m[1], m21 = m[3], m22 = m[4];
		return new A([m11, m12, m11*x + m12*y + m[2],
					  m21, m22, m21*x + m22*y + m[5]]);
	}
	function scale(s,m) { return new A([m[0]*s, m[1]*s, m[2], m[3]*s, m[4]*s, m[5]]); }
	function scaleX(x,m) { return new A([m[0]*x, m[1], m[2], m[3]*x, m[4], m[5]]); }
	function scaleY(y,m) { return new A([m[0], m[1]*y, m[2], m[3], m[4]*y, m[5]]); }
	function reflectX(m) { return new A([-m[0], m[1], m[2], -m[3], m[4], m[5]]); }
	function reflectY(m) { return new A([m[0], -m[1], m[2], m[3], -m[4], m[5]]); }

	function transform(m11, m21, m12, m22, mdx, mdy, n) {
		var n11 = n[0], n12 = n[1], n21 = n[3], n22 = n[4], ndx = n[2], ndy = n[5];
		return new A([m11*n11 + m12*n21,
					  m11*n12 + m12*n22,
					  m11*ndx + m12*ndy + mdx,
					  m21*n11 + m22*n21,
					  m21*n12 + m22*n22,
					  m21*ndx + m22*ndy + mdy]);
	}
	*/
	function multiply(m, n)
	{
		var m11 = m[0], m12 = m[1], m21 = m[3], m22 = m[4], mdx = m[2], mdy = m[5];
		var n11 = n[0], n12 = n[1], n21 = n[3], n22 = n[4], ndx = n[2], ndy = n[5];
		return new A([m11*n11 + m12*n21,
					  m11*n12 + m12*n22,
					  m11*ndx + m12*ndy + mdx,
					  m21*n11 + m22*n21,
					  m21*n12 + m22*n22,
					  m21*ndx + m22*ndy + mdy]);
	}

	return localRuntime.Native.Transform2D.values = {
		identity:identity,
		matrix:F6(matrix),
		rotation:rotation,
		multiply:F2(multiply)
		/*
		transform:F7(transform),
		rotate:F2(rotate),
		move:F2(move),
		scale:F2(scale),
		scaleX:F2(scaleX),
		scaleY:F2(scaleY),
		reflectX:reflectX,
		reflectY:reflectY
		*/
	};

};

Elm.Native = Elm.Native || {};
Elm.Native.Utils = {};
Elm.Native.Utils.make = function(localRuntime) {

	localRuntime.Native = localRuntime.Native || {};
	localRuntime.Native.Utils = localRuntime.Native.Utils || {};
	if (localRuntime.Native.Utils.values)
	{
		return localRuntime.Native.Utils.values;
	}

	function eq(l,r)
	{
		var stack = [{'x': l, 'y': r}]
		while (stack.length > 0)
		{
			var front = stack.pop();
			var x = front.x;
			var y = front.y;
			if (x === y)
			{
				continue;
			}
			if (typeof x === "object")
			{
				var c = 0;
				for (var i in x)
				{
					++c;
					if (i in y)
					{
						if (i !== 'ctor')
						{
							stack.push({ 'x': x[i], 'y': y[i] });
						}
					}
					else
					{
						return false;
					}
				}
				if ('ctor' in x)
				{
					stack.push({'x': x.ctor, 'y': y.ctor});
				}
				if (c !== Object.keys(y).length)
				{
					return false;
				}
			}
			else if (typeof x === 'function')
			{
				throw new Error('Equality error: general function equality is ' +
								'undecidable, and therefore, unsupported');
			}
			else
			{
				return false;
			}
		}
		return true;
	}

	// code in Generate/JavaScript.hs depends on the particular
	// integer values assigned to LT, EQ, and GT
	var LT = -1, EQ = 0, GT = 1, ord = ['LT','EQ','GT'];

	function compare(x,y)
	{
		return {
			ctor: ord[cmp(x,y)+1]
		};
	}

	function cmp(x,y) {
		var ord;
		if (typeof x !== 'object')
		{
			return x === y ? EQ : x < y ? LT : GT;
		}
		else if (x.isChar)
		{
			var a = x.toString();
			var b = y.toString();
			return a === b
				? EQ
				: a < b
					? LT
					: GT;
		}
		else if (x.ctor === "::" || x.ctor === "[]")
		{
			while (true)
			{
				if (x.ctor === "[]" && y.ctor === "[]")
				{
					return EQ;
				}
				if (x.ctor !== y.ctor)
				{
					return x.ctor === '[]' ? LT : GT;
				}
				ord = cmp(x._0, y._0);
				if (ord !== EQ)
				{
					return ord;
				}
				x = x._1;
				y = y._1;
			}
		}
		else if (x.ctor.slice(0,6) === '_Tuple')
		{
			var n = x.ctor.slice(6) - 0;
			var err = 'cannot compare tuples with more than 6 elements.';
			if (n === 0) return EQ;
			if (n >= 1) { ord = cmp(x._0, y._0); if (ord !== EQ) return ord;
			if (n >= 2) { ord = cmp(x._1, y._1); if (ord !== EQ) return ord;
			if (n >= 3) { ord = cmp(x._2, y._2); if (ord !== EQ) return ord;
			if (n >= 4) { ord = cmp(x._3, y._3); if (ord !== EQ) return ord;
			if (n >= 5) { ord = cmp(x._4, y._4); if (ord !== EQ) return ord;
			if (n >= 6) { ord = cmp(x._5, y._5); if (ord !== EQ) return ord;
			if (n >= 7) throw new Error('Comparison error: ' + err); } } } } } }
			return EQ;
		}
		else
		{
			throw new Error('Comparison error: comparison is only defined on ints, ' +
							'floats, times, chars, strings, lists of comparable values, ' +
							'and tuples of comparable values.');
		}
	}


	var Tuple0 = {
		ctor: "_Tuple0"
	};

	function Tuple2(x,y)
	{
		return {
			ctor: "_Tuple2",
			_0: x,
			_1: y
		};
	}

	function chr(c)
	{
		var x = new String(c);
		x.isChar = true;
		return x;
	}

	function txt(str)
	{
		var t = new String(str);
		t.text = true;
		return t;
	}

	var count = 0;
	function guid(_)
	{
		return count++
	}

	function copy(oldRecord)
	{
		var newRecord = {};
		for (var key in oldRecord)
		{
			var value = key === '_'
				? copy(oldRecord._)
				: oldRecord[key];
			newRecord[key] = value;
		}
		return newRecord;
	}

	function remove(key, oldRecord)
	{
		var record = copy(oldRecord);
		if (key in record._)
		{
			record[key] = record._[key][0];
			record._[key] = record._[key].slice(1);
			if (record._[key].length === 0)
			{
				delete record._[key];
			}
		}
		else
		{
			delete record[key];
		}
		return record;
	}

	function replace(keyValuePairs, oldRecord)
	{
		var record = copy(oldRecord);
		for (var i = keyValuePairs.length; i--; )
		{
			var pair = keyValuePairs[i];
			record[pair[0]] = pair[1];
		}
		return record;
	}

	function insert(key, value, oldRecord)
	{
		var newRecord = copy(oldRecord);
		if (key in newRecord)
		{
			var values = newRecord._[key];
			var copiedValues = values ? values.slice(0) : [];
			newRecord._[key] = [newRecord[key]].concat(copiedValues);
		}
		newRecord[key] = value;
		return newRecord;
	}

	function getXY(e)
	{
		var posx = 0;
		var posy = 0;
		if (e.pageX || e.pageY)
		{
			posx = e.pageX;
			posy = e.pageY;
		}
		else if (e.clientX || e.clientY)
		{
			posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
			posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
		}

		if (localRuntime.isEmbed())
		{
			var rect = localRuntime.node.getBoundingClientRect();
			var relx = rect.left + document.body.scrollLeft + document.documentElement.scrollLeft;
			var rely = rect.top + document.body.scrollTop + document.documentElement.scrollTop;
			// TODO: figure out if there is a way to avoid rounding here
			posx = posx - Math.round(relx) - localRuntime.node.clientLeft;
			posy = posy - Math.round(rely) - localRuntime.node.clientTop;
		}
		return Tuple2(posx, posy);
	}


	//// LIST STUFF ////

	var Nil = { ctor:'[]' };

	function Cons(hd,tl)
	{
		return {
			ctor: "::",
			_0: hd,
			_1: tl
		};
	}

	function append(xs,ys)
	{
		// append Strings
		if (typeof xs === "string")
		{
			return xs + ys;
		}

		// append Text
		if (xs.ctor.slice(0,5) === 'Text:')
		{
			return {
				ctor: 'Text:Append',
				_0: xs,
				_1: ys
			};
		}



		// append Lists
		if (xs.ctor === '[]')
		{
			return ys;
		}
		var root = Cons(xs._0, Nil);
		var curr = root;
		xs = xs._1;
		while (xs.ctor !== '[]')
		{
			curr._1 = Cons(xs._0, Nil);
			xs = xs._1;
			curr = curr._1;
		}
		curr._1 = ys;
		return root;
	}

	//// RUNTIME ERRORS ////

	function indent(lines)
	{
		return '\n' + lines.join('\n');
	}

	function badCase(moduleName, span)
	{
		var msg = indent([
			'Non-exhaustive pattern match in case-expression.',
			'Make sure your patterns cover every case!'
		]);
		throw new Error('Runtime error in module ' + moduleName + ' (' + span + ')' + msg);
	}

	function badIf(moduleName, span)
	{
		var msg = indent([
			'Non-exhaustive pattern match in multi-way-if expression.',
			'It is best to use \'otherwise\' as the last branch of multi-way-if.'
		]);
		throw new Error('Runtime error in module ' + moduleName + ' (' + span + ')' + msg);
	}


	function badPort(expected, received)
	{
		var msg = indent([
			'Expecting ' + expected + ' but was given ',
			JSON.stringify(received)
		]);
		throw new Error('Runtime error when sending values through a port.' + msg);
	}


	return localRuntime.Native.Utils.values = {
		eq: eq,
		cmp: cmp,
		compare: F2(compare),
		Tuple0: Tuple0,
		Tuple2: Tuple2,
		chr: chr,
		txt: txt,
		copy: copy,
		remove: remove,
		replace: replace,
		insert: insert,
		guid: guid,
		getXY: getXY,

		Nil: Nil,
		Cons: Cons,
		append: F2(append),

		badCase: badCase,
		badIf: badIf,
		badPort: badPort
	};
};

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = createHash

function createHash(elem) {
    var attributes = elem.attributes
    var hash = {}

    if (attributes === null || attributes === undefined) {
        return hash
    }

    for (var i = 0; i < attributes.length; i++) {
        var attr = attributes[i]

        if (attr.name.substr(0,5) !== "data-") {
            continue
        }

        hash[attr.name.substr(5)] = attr.value
    }

    return hash
}

},{}],2:[function(require,module,exports){
var createStore = require("weakmap-shim/create-store")
var Individual = require("individual")

var createHash = require("./create-hash.js")

var hashStore = Individual("__DATA_SET_WEAKMAP@3", createStore())

module.exports = DataSet

function DataSet(elem) {
    var store = hashStore(elem)

    if (!store.hash) {
        store.hash = createHash(elem)
    }

    return store.hash
}

},{"./create-hash.js":1,"individual":3,"weakmap-shim/create-store":4}],3:[function(require,module,exports){
(function (global){
var root = typeof window !== 'undefined' ?
    window : typeof global !== 'undefined' ?
    global : {};

module.exports = Individual

function Individual(key, value) {
    if (root[key]) {
        return root[key]
    }

    Object.defineProperty(root, key, {
        value: value
        , configurable: true
    })

    return value
}

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],4:[function(require,module,exports){
var hiddenStore = require('./hidden-store.js');

module.exports = createStore;

function createStore() {
    var key = {};

    return function (obj) {
        if (typeof obj !== 'object' || obj === null) {
            throw new Error('Weakmap-shim: Key must be object')
        }

        var store = obj.valueOf(key);
        return store && store.identity === key ?
            store : hiddenStore(obj, key);
    };
}

},{"./hidden-store.js":5}],5:[function(require,module,exports){
module.exports = hiddenStore;

function hiddenStore(obj, key) {
    var store = { identity: key };
    var valueOf = obj.valueOf;

    Object.defineProperty(obj, "valueOf", {
        value: function (value) {
            return value !== key ?
                valueOf.apply(this, arguments) : store;
        },
        writable: true
    });

    return store;
}

},{}],6:[function(require,module,exports){
var DataSet = require("data-set")

module.exports = addEvent

function addEvent(target, type, handler) {
    var ds = DataSet(target)
    var events = ds[type]

    if (!events) {
        ds[type] = handler
    } else if (Array.isArray(events)) {
        if (events.indexOf(handler) === -1) {
            events.push(handler)
        }
    } else if (events !== handler) {
        ds[type] = [events, handler]
    }
}

},{"data-set":2}],7:[function(require,module,exports){
var globalDocument = require("global/document")
var DataSet = require("data-set")
var createStore = require("weakmap-shim/create-store")

var addEvent = require("./add-event.js")
var removeEvent = require("./remove-event.js")
var ProxyEvent = require("./proxy-event.js")

var HANDLER_STORE = createStore()

module.exports = DOMDelegator

function DOMDelegator(document) {
    document = document || globalDocument

    this.target = document.documentElement
    this.events = {}
    this.rawEventListeners = {}
    this.globalListeners = {}
}

DOMDelegator.prototype.addEventListener = addEvent
DOMDelegator.prototype.removeEventListener = removeEvent

DOMDelegator.prototype.allocateHandle =
    function allocateHandle(func) {
        var handle = new Handle()

        HANDLER_STORE(handle).func = func;

        return handle
    }

DOMDelegator.prototype.transformHandle =
    function transformHandle(handle, lambda) {
        var func = HANDLER_STORE(handle).func

        return this.allocateHandle(function (ev) {
            var result = lambda(ev)
            if (result) {
                func(result)
            }
        })
    }

DOMDelegator.prototype.addGlobalEventListener =
    function addGlobalEventListener(eventName, fn) {
        var listeners = this.globalListeners[eventName] || [];
        if (listeners.indexOf(fn) === -1) {
            listeners.push(fn)
        }

        this.globalListeners[eventName] = listeners;
    }

DOMDelegator.prototype.removeGlobalEventListener =
    function removeGlobalEventListener(eventName, fn) {
        var listeners = this.globalListeners[eventName] || [];

        var index = listeners.indexOf(fn)
        if (index !== -1) {
            listeners.splice(index, 1)
        }
    }

DOMDelegator.prototype.listenTo = function listenTo(eventName) {
    if (this.events[eventName]) {
        return
    }

    this.events[eventName] = true

    var listener = this.rawEventListeners[eventName]
    if (!listener) {
        listener = this.rawEventListeners[eventName] =
            createHandler(eventName, this)
    }

    this.target.addEventListener(eventName, listener, true)
}

DOMDelegator.prototype.unlistenTo = function unlistenTo(eventName) {
    if (!this.events[eventName]) {
        return
    }

    this.events[eventName] = false
    var listener = this.rawEventListeners[eventName]

    if (!listener) {
        throw new Error("dom-delegator#unlistenTo: cannot " +
            "unlisten to " + eventName)
    }

    this.target.removeEventListener(eventName, listener, true)
}

function createHandler(eventName, delegator) {
    var globalListeners = delegator.globalListeners;
    var delegatorTarget = delegator.target;

    return handler

    function handler(ev) {
        var globalHandlers = globalListeners[eventName] || []

        if (globalHandlers.length > 0) {
            var globalEvent = new ProxyEvent(ev);
            globalEvent.currentTarget = delegatorTarget;
            callListeners(globalHandlers, globalEvent)
        }

        findAndInvokeListeners(ev.target, ev, eventName)
    }
}

function findAndInvokeListeners(elem, ev, eventName) {
    var listener = getListener(elem, eventName)

    if (listener && listener.handlers.length > 0) {
        var listenerEvent = new ProxyEvent(ev);
        listenerEvent.currentTarget = listener.currentTarget
        callListeners(listener.handlers, listenerEvent)

        if (listenerEvent._bubbles) {
            var nextTarget = listener.currentTarget.parentNode
            findAndInvokeListeners(nextTarget, ev, eventName)
        }
    }
}

function getListener(target, type) {
    // terminate recursion if parent is `null`
    if (target === null) {
        return null
    }

    var ds = DataSet(target)
    // fetch list of handler fns for this event
    var handler = ds[type]
    var allHandler = ds.event

    if (!handler && !allHandler) {
        return getListener(target.parentNode, type)
    }

    var handlers = [].concat(handler || [], allHandler || [])
    return new Listener(target, handlers)
}

function callListeners(handlers, ev) {
    handlers.forEach(function (handler) {
        if (typeof handler === "function") {
            handler(ev)
        } else if (typeof handler.handleEvent === "function") {
            handler.handleEvent(ev)
        } else if (handler.type === "dom-delegator-handle") {
            HANDLER_STORE(handler).func(ev)
        } else {
            throw new Error("dom-delegator: unknown handler " +
                "found: " + JSON.stringify(handlers));
        }
    })
}

function Listener(target, handlers) {
    this.currentTarget = target
    this.handlers = handlers
}

function Handle() {
    this.type = "dom-delegator-handle"
}

},{"./add-event.js":6,"./proxy-event.js":15,"./remove-event.js":16,"data-set":2,"global/document":10,"weakmap-shim/create-store":13}],8:[function(require,module,exports){
var Individual = require("individual")
var cuid = require("cuid")
var globalDocument = require("global/document")

var DOMDelegator = require("./dom-delegator.js")

var delegatorCache = Individual("__DOM_DELEGATOR_CACHE@9", {
    delegators: {}
})
var commonEvents = [
    "blur", "change", "click",  "contextmenu", "dblclick",
    "error","focus", "focusin", "focusout", "input", "keydown",
    "keypress", "keyup", "load", "mousedown", "mouseup",
    "resize", "scroll", "select", "submit", "touchcancel",
    "touchend", "touchstart", "unload"
]

/*  Delegator is a thin wrapper around a singleton `DOMDelegator`
        instance.

    Only one DOMDelegator should exist because we do not want
        duplicate event listeners bound to the DOM.

    `Delegator` will also `listenTo()` all events unless 
        every caller opts out of it
*/
module.exports = Delegator

function Delegator(opts) {
    opts = opts || {}
    var document = opts.document || globalDocument

    var cacheKey = document["__DOM_DELEGATOR_CACHE_TOKEN@9"]

    if (!cacheKey) {
        cacheKey =
            document["__DOM_DELEGATOR_CACHE_TOKEN@9"] = cuid()
    }

    var delegator = delegatorCache.delegators[cacheKey]

    if (!delegator) {
        delegator = delegatorCache.delegators[cacheKey] =
            new DOMDelegator(document)
    }

    if (opts.defaultEvents !== false) {
        for (var i = 0; i < commonEvents.length; i++) {
            delegator.listenTo(commonEvents[i])
        }
    }

    return delegator
}



},{"./dom-delegator.js":7,"cuid":9,"global/document":10,"individual":11}],9:[function(require,module,exports){
/**
 * cuid.js
 * Collision-resistant UID generator for browsers and node.
 * Sequential for fast db lookups and recency sorting.
 * Safe for element IDs and server-side lookups.
 *
 * Extracted from CLCTR
 * 
 * Copyright (c) Eric Elliott 2012
 * MIT License
 */

/*global window, navigator, document, require, process, module */
(function (app) {
  'use strict';
  var namespace = 'cuid',
    c = 0,
    blockSize = 4,
    base = 36,
    discreteValues = Math.pow(base, blockSize),

    pad = function pad(num, size) {
      var s = "000000000" + num;
      return s.substr(s.length-size);
    },

    randomBlock = function randomBlock() {
      return pad((Math.random() *
            discreteValues << 0)
            .toString(base), blockSize);
    },

    safeCounter = function () {
      c = (c < discreteValues) ? c : 0;
      c++; // this is not subliminal
      return c - 1;
    },

    api = function cuid() {
      // Starting with a lowercase letter makes
      // it HTML element ID friendly.
      var letter = 'c', // hard-coded allows for sequential access

        // timestamp
        // warning: this exposes the exact date and time
        // that the uid was created.
        timestamp = (new Date().getTime()).toString(base),

        // Prevent same-machine collisions.
        counter,

        // A few chars to generate distinct ids for different
        // clients (so different computers are far less
        // likely to generate the same id)
        fingerprint = api.fingerprint(),

        // Grab some more chars from Math.random()
        random = randomBlock() + randomBlock();

        counter = pad(safeCounter().toString(base), blockSize);

      return  (letter + timestamp + counter + fingerprint + random);
    };

  api.slug = function slug() {
    var date = new Date().getTime().toString(36),
      counter,
      print = api.fingerprint().slice(0,1) +
        api.fingerprint().slice(-1),
      random = randomBlock().slice(-2);

      counter = safeCounter().toString(36).slice(-4);

    return date.slice(-2) + 
      counter + print + random;
  };

  api.globalCount = function globalCount() {
    // We want to cache the results of this
    var cache = (function calc() {
        var i,
          count = 0;

        for (i in window) {
          count++;
        }

        return count;
      }());

    api.globalCount = function () { return cache; };
    return cache;
  };

  api.fingerprint = function browserPrint() {
    return pad((navigator.mimeTypes.length +
      navigator.userAgent.length).toString(36) +
      api.globalCount().toString(36), 4);
  };

  // don't change anything from here down.
  if (app.register) {
    app.register(namespace, api);
  } else if (typeof module !== 'undefined') {
    module.exports = api;
  } else {
    app[namespace] = api;
  }

}(this.applitude || this));

},{}],10:[function(require,module,exports){
(function (global){
var topLevel = typeof global !== 'undefined' ? global :
    typeof window !== 'undefined' ? window : {}
var minDoc = require('min-document');

if (typeof document !== 'undefined') {
    module.exports = document;
} else {
    var doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'];

    if (!doccy) {
        doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'] = minDoc;
    }

    module.exports = doccy;
}

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"min-document":40}],11:[function(require,module,exports){
module.exports=require(3)
},{}],12:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],13:[function(require,module,exports){
module.exports=require(4)
},{"./hidden-store.js":14}],14:[function(require,module,exports){
module.exports=require(5)
},{}],15:[function(require,module,exports){
var inherits = require("inherits")

var ALL_PROPS = [
    "altKey", "bubbles", "cancelable", "ctrlKey",
    "eventPhase", "metaKey", "relatedTarget", "shiftKey",
    "target", "timeStamp", "type", "view", "which"
]
var KEY_PROPS = ["char", "charCode", "key", "keyCode"]
var MOUSE_PROPS = [
    "button", "buttons", "clientX", "clientY", "layerX",
    "layerY", "offsetX", "offsetY", "pageX", "pageY",
    "screenX", "screenY", "toElement"
]

var rkeyEvent = /^key|input/
var rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/

module.exports = ProxyEvent

function ProxyEvent(ev) {
    if (!(this instanceof ProxyEvent)) {
        return new ProxyEvent(ev)
    }

    if (rkeyEvent.test(ev.type)) {
        return new KeyEvent(ev)
    } else if (rmouseEvent.test(ev.type)) {
        return new MouseEvent(ev)
    }

    for (var i = 0; i < ALL_PROPS.length; i++) {
        var propKey = ALL_PROPS[i]
        this[propKey] = ev[propKey]
    }

    this._rawEvent = ev
    this._bubbles = false;
}

ProxyEvent.prototype.preventDefault = function () {
    this._rawEvent.preventDefault()
}

ProxyEvent.prototype.startPropagation = function () {
    this._bubbles = true;
}

function MouseEvent(ev) {
    for (var i = 0; i < ALL_PROPS.length; i++) {
        var propKey = ALL_PROPS[i]
        this[propKey] = ev[propKey]
    }

    for (var j = 0; j < MOUSE_PROPS.length; j++) {
        var mousePropKey = MOUSE_PROPS[j]
        this[mousePropKey] = ev[mousePropKey]
    }

    this._rawEvent = ev
}

inherits(MouseEvent, ProxyEvent)

function KeyEvent(ev) {
    for (var i = 0; i < ALL_PROPS.length; i++) {
        var propKey = ALL_PROPS[i]
        this[propKey] = ev[propKey]
    }

    for (var j = 0; j < KEY_PROPS.length; j++) {
        var keyPropKey = KEY_PROPS[j]
        this[keyPropKey] = ev[keyPropKey]
    }

    this._rawEvent = ev
}

inherits(KeyEvent, ProxyEvent)

},{"inherits":12}],16:[function(require,module,exports){
var DataSet = require("data-set")

module.exports = removeEvent

function removeEvent(target, type, handler) {
    var ds = DataSet(target)
    var events = ds[type]

    if (!events) {
        return
    } else if (Array.isArray(events)) {
        var index = events.indexOf(handler)
        if (index !== -1) {
            events.splice(index, 1)
        }
    } else if (events === handler) {
        ds[type] = null
    }
}

},{"data-set":2}],17:[function(require,module,exports){
var isObject = require("is-object")
var isHook = require("vtree/is-vhook")

module.exports = applyProperties

function applyProperties(node, props, previous) {
    for (var propName in props) {
        var propValue = props[propName]

        if (propValue === undefined) {
            removeProperty(node, props, previous, propName);
        } else if (isHook(propValue)) {
            propValue.hook(node,
                propName,
                previous ? previous[propName] : undefined)
        } else {
            if (isObject(propValue)) {
                patchObject(node, props, previous, propName, propValue);
            } else if (propValue !== undefined) {
                node[propName] = propValue
            }
        }
    }
}

function removeProperty(node, props, previous, propName) {
    if (previous) {
        var previousValue = previous[propName]

        if (!isHook(previousValue)) {
            if (propName === "attributes") {
                for (var attrName in previousValue) {
                    node.removeAttribute(attrName)
                }
            } else if (propName === "style") {
                for (var i in previousValue) {
                    node.style[i] = ""
                }
            } else if (typeof previousValue === "string") {
                node[propName] = ""
            } else {
                node[propName] = null
            }
        }
    }
}

function patchObject(node, props, previous, propName, propValue) {
    var previousValue = previous ? previous[propName] : undefined

    // Set attributes
    if (propName === "attributes") {
        for (var attrName in propValue) {
            var attrValue = propValue[attrName]

            if (attrValue === undefined) {
                node.removeAttribute(attrName)
            } else {
                if (attrName.indexOf("xlink:") > -1) {
                    node.setAttributeNS("http://www.w3.org/1999/xlink", attrName, attrValue)    
                } else {
                    node.setAttribute(attrName, attrValue)
                }
            }
        }

        return
    }

    if(previousValue && isObject(previousValue) &&
        getPrototype(previousValue) !== getPrototype(propValue)) {
        node[propName] = propValue
        return
    }

    if (!isObject(node[propName])) {
        node[propName] = {}
    }

    var replacer = propName === "style" ? "" : undefined

    for (var k in propValue) {
        var value = propValue[k]
        node[propName][k] = (value === undefined) ? replacer : value
    }
}

function getPrototype(value) {
    if (Object.getPrototypeOf) {
        return Object.getPrototypeOf(value)
    } else if (value.__proto__) {
        return value.__proto__
    } else if (value.constructor) {
        return value.constructor.prototype
    }
}

},{"is-object":21,"vtree/is-vhook":29}],18:[function(require,module,exports){
var document = require("global/document")

var applyProperties = require("./apply-properties")

var isVNode = require("vtree/is-vnode")
var isVText = require("vtree/is-vtext")
var isWidget = require("vtree/is-widget")
var handleThunk = require("vtree/handle-thunk")

module.exports = createElement

function createElement(vnode, opts) {
    var doc = opts ? opts.document || document : document
    var warn = opts ? opts.warn : null

    vnode = handleThunk(vnode).a

    if (isWidget(vnode)) {
        return vnode.init()
    } else if (isVText(vnode)) {
        return doc.createTextNode(vnode.text)
    } else if (!isVNode(vnode)) {
        if (warn) {
            warn("Item is not a valid virtual dom node", vnode)
        }
        return null
    }

    var node = (vnode.namespace === null) ?
        doc.createElement(vnode.tagName) :
        doc.createElementNS(vnode.namespace, vnode.tagName)

    var props = vnode.properties
    applyProperties(node, props)

    var children = vnode.children

    for (var i = 0; i < children.length; i++) {
        var childNode = createElement(children[i], opts)
        if (childNode) {
            node.appendChild(childNode)
        }
    }

    return node
}

},{"./apply-properties":17,"global/document":20,"vtree/handle-thunk":27,"vtree/is-vnode":30,"vtree/is-vtext":31,"vtree/is-widget":32}],19:[function(require,module,exports){
// Maps a virtual DOM tree onto a real DOM tree in an efficient manner.
// We don't want to read all of the DOM nodes in the tree so we use
// the in-order tree indexing to eliminate recursion down certain branches.
// We only recurse into a DOM node if we know that it contains a child of
// interest.

var noChild = {}

module.exports = domIndex

function domIndex(rootNode, tree, indices, nodes) {
    if (!indices || indices.length === 0) {
        return {}
    } else {
        indices.sort(ascending)
        return recurse(rootNode, tree, indices, nodes, 0)
    }
}

function recurse(rootNode, tree, indices, nodes, rootIndex) {
    nodes = nodes || {}


    if (rootNode) {
        if (indexInRange(indices, rootIndex, rootIndex)) {
            nodes[rootIndex] = rootNode
        }

        var vChildren = tree.children

        if (vChildren) {

            var childNodes = rootNode.childNodes

            for (var i = 0; i < tree.children.length; i++) {
                rootIndex += 1

                var vChild = vChildren[i] || noChild
                var nextIndex = rootIndex + (vChild.count || 0)

                // skip recursion down the tree if there are no nodes down here
                if (indexInRange(indices, rootIndex, nextIndex)) {
                    recurse(childNodes[i], vChild, indices, nodes, rootIndex)
                }

                rootIndex = nextIndex
            }
        }
    }

    return nodes
}

// Binary search for an index in the interval [left, right]
function indexInRange(indices, left, right) {
    if (indices.length === 0) {
        return false
    }

    var minIndex = 0
    var maxIndex = indices.length - 1
    var currentIndex
    var currentItem

    while (minIndex <= maxIndex) {
        currentIndex = ((maxIndex + minIndex) / 2) >> 0
        currentItem = indices[currentIndex]

        if (minIndex === maxIndex) {
            return currentItem >= left && currentItem <= right
        } else if (currentItem < left) {
            minIndex = currentIndex + 1
        } else  if (currentItem > right) {
            maxIndex = currentIndex - 1
        } else {
            return true
        }
    }

    return false;
}

function ascending(a, b) {
    return a > b ? 1 : -1
}

},{}],20:[function(require,module,exports){
module.exports=require(10)
},{"min-document":40}],21:[function(require,module,exports){
module.exports = isObject

function isObject(x) {
    return typeof x === "object" && x !== null
}

},{}],22:[function(require,module,exports){
var nativeIsArray = Array.isArray
var toString = Object.prototype.toString

module.exports = nativeIsArray || isArray

function isArray(obj) {
    return toString.call(obj) === "[object Array]"
}

},{}],23:[function(require,module,exports){
var applyProperties = require("./apply-properties")

var isWidget = require("vtree/is-widget")
var VPatch = require("vtree/vpatch")

var render = require("./create-element")
var updateWidget = require("./update-widget")

module.exports = applyPatch

function applyPatch(vpatch, domNode, renderOptions) {
    var type = vpatch.type
    var vNode = vpatch.vNode
    var patch = vpatch.patch

    switch (type) {
        case VPatch.REMOVE:
            return removeNode(domNode, vNode)
        case VPatch.INSERT:
            return insertNode(domNode, patch, renderOptions)
        case VPatch.VTEXT:
            return stringPatch(domNode, vNode, patch, renderOptions)
        case VPatch.WIDGET:
            return widgetPatch(domNode, vNode, patch, renderOptions)
        case VPatch.VNODE:
            return vNodePatch(domNode, vNode, patch, renderOptions)
        case VPatch.ORDER:
            reorderChildren(domNode, patch)
            return domNode
        case VPatch.PROPS:
            applyProperties(domNode, patch, vNode.properties)
            return domNode
        case VPatch.THUNK:
            return replaceRoot(domNode,
                renderOptions.patch(domNode, patch, renderOptions))
        default:
            return domNode
    }
}

function removeNode(domNode, vNode) {
    var parentNode = domNode.parentNode

    if (parentNode) {
        parentNode.removeChild(domNode)
    }

    destroyWidget(domNode, vNode);

    return null
}

function insertNode(parentNode, vNode, renderOptions) {
    var newNode = render(vNode, renderOptions)

    if (parentNode) {
        parentNode.appendChild(newNode)
    }

    return parentNode
}

function stringPatch(domNode, leftVNode, vText, renderOptions) {
    var newNode

    if (domNode.nodeType === 3) {
        domNode.replaceData(0, domNode.length, vText.text)
        newNode = domNode
    } else {
        var parentNode = domNode.parentNode
        newNode = render(vText, renderOptions)

        if (parentNode) {
            parentNode.replaceChild(newNode, domNode)
        }
    }

    destroyWidget(domNode, leftVNode)

    return newNode
}

function widgetPatch(domNode, leftVNode, widget, renderOptions) {
    if (updateWidget(leftVNode, widget)) {
        return widget.update(leftVNode, domNode) || domNode
    }

    var parentNode = domNode.parentNode
    var newWidget = render(widget, renderOptions)

    if (parentNode) {
        parentNode.replaceChild(newWidget, domNode)
    }

    destroyWidget(domNode, leftVNode)

    return newWidget
}

function vNodePatch(domNode, leftVNode, vNode, renderOptions) {
    var parentNode = domNode.parentNode
    var newNode = render(vNode, renderOptions)

    if (parentNode) {
        parentNode.replaceChild(newNode, domNode)
    }

    destroyWidget(domNode, leftVNode)

    return newNode
}

function destroyWidget(domNode, w) {
    if (typeof w.destroy === "function" && isWidget(w)) {
        w.destroy(domNode)
    }
}

function reorderChildren(domNode, bIndex) {
    var children = []
    var childNodes = domNode.childNodes
    var len = childNodes.length
    var i
    var reverseIndex = bIndex.reverse

    for (i = 0; i < len; i++) {
        children.push(domNode.childNodes[i])
    }

    var insertOffset = 0
    var move
    var node
    var insertNode
    for (i = 0; i < len; i++) {
        move = bIndex[i]
        if (move !== undefined && move !== i) {
            // the element currently at this index will be moved later so increase the insert offset
            if (reverseIndex[i] > i) {
                insertOffset++
            }

            node = children[move]
            insertNode = childNodes[i + insertOffset] || null
            if (node !== insertNode) {
                domNode.insertBefore(node, insertNode)
            }

            // the moved element came from the front of the array so reduce the insert offset
            if (move < i) {
                insertOffset--
            }
        }

        // element at this index is scheduled to be removed so increase insert offset
        if (i in bIndex.removes) {
            insertOffset++
        }
    }
}

function replaceRoot(oldRoot, newRoot) {
    if (oldRoot && newRoot && oldRoot !== newRoot && oldRoot.parentNode) {
        console.log(oldRoot)
        oldRoot.parentNode.replaceChild(newRoot, oldRoot)
    }

    return newRoot;
}

},{"./apply-properties":17,"./create-element":18,"./update-widget":25,"vtree/is-widget":32,"vtree/vpatch":37}],24:[function(require,module,exports){
var document = require("global/document")
var isArray = require("x-is-array")

var domIndex = require("./dom-index")
var patchOp = require("./patch-op")
module.exports = patch

function patch(rootNode, patches) {
    return patchRecursive(rootNode, patches)
}

function patchRecursive(rootNode, patches, renderOptions) {
    var indices = patchIndices(patches)

    if (indices.length === 0) {
        return rootNode
    }

    var index = domIndex(rootNode, patches.a, indices)
    var ownerDocument = rootNode.ownerDocument

    if (!renderOptions) {
        renderOptions = { patch: patchRecursive }
        if (ownerDocument !== document) {
            renderOptions.document = ownerDocument
        }
    }

    for (var i = 0; i < indices.length; i++) {
        var nodeIndex = indices[i]
        rootNode = applyPatch(rootNode,
            index[nodeIndex],
            patches[nodeIndex],
            renderOptions)
    }

    return rootNode
}

function applyPatch(rootNode, domNode, patchList, renderOptions) {
    if (!domNode) {
        return rootNode
    }

    var newNode

    if (isArray(patchList)) {
        for (var i = 0; i < patchList.length; i++) {
            newNode = patchOp(patchList[i], domNode, renderOptions)

            if (domNode === rootNode) {
                rootNode = newNode
            }
        }
    } else {
        newNode = patchOp(patchList, domNode, renderOptions)

        if (domNode === rootNode) {
            rootNode = newNode
        }
    }

    return rootNode
}

function patchIndices(patches) {
    var indices = []

    for (var key in patches) {
        if (key !== "a") {
            indices.push(Number(key))
        }
    }

    return indices
}

},{"./dom-index":19,"./patch-op":23,"global/document":20,"x-is-array":22}],25:[function(require,module,exports){
var isWidget = require("vtree/is-widget")

module.exports = updateWidget

function updateWidget(a, b) {
    if (isWidget(a) && isWidget(b)) {
        if ("name" in a && "name" in b) {
            return a.id === b.id
        } else {
            return a.init === b.init
        }
    }

    return false
}

},{"vtree/is-widget":32}],26:[function(require,module,exports){
var isArray = require("x-is-array")
var isObject = require("is-object")

var VPatch = require("./vpatch")
var isVNode = require("./is-vnode")
var isVText = require("./is-vtext")
var isWidget = require("./is-widget")
var isThunk = require("./is-thunk")
var handleThunk = require("./handle-thunk")

module.exports = diff

function diff(a, b) {
    var patch = { a: a }
    walk(a, b, patch, 0)
    return patch
}

function walk(a, b, patch, index) {
    if (a === b) {
        if (isThunk(a) || isThunk(b)) {
            thunks(a, b, patch, index)
        } else {
            hooks(b, patch, index)
        }
        return
    }

    var apply = patch[index]

    if (b == null) {
        apply = appendPatch(apply, new VPatch(VPatch.REMOVE, a, b))
        destroyWidgets(a, patch, index)
    } else if (isThunk(a) || isThunk(b)) {
        thunks(a, b, patch, index)
    } else if (isVNode(b)) {
        if (isVNode(a)) {
            if (a.tagName === b.tagName &&
                a.namespace === b.namespace &&
                a.key === b.key) {
                var propsPatch = diffProps(a.properties, b.properties, b.hooks)
                if (propsPatch) {
                    apply = appendPatch(apply,
                        new VPatch(VPatch.PROPS, a, propsPatch))
                }
                apply = diffChildren(a, b, patch, apply, index)
            } else {
                apply = appendPatch(apply, new VPatch(VPatch.VNODE, a, b))
                destroyWidgets(a, patch, index)
            }
        } else {
            apply = appendPatch(apply, new VPatch(VPatch.VNODE, a, b))
            destroyWidgets(a, patch, index)
        }
    } else if (isVText(b)) {
        if (!isVText(a)) {
            apply = appendPatch(apply, new VPatch(VPatch.VTEXT, a, b))
            destroyWidgets(a, patch, index)
        } else if (a.text !== b.text) {
            apply = appendPatch(apply, new VPatch(VPatch.VTEXT, a, b))
        }
    } else if (isWidget(b)) {
        apply = appendPatch(apply, new VPatch(VPatch.WIDGET, a, b))

        if (!isWidget(a)) {
            destroyWidgets(a, patch, index)
        }
    }

    if (apply) {
        patch[index] = apply
    }
}

function diffProps(a, b, hooks) {
    var diff

    for (var aKey in a) {
        if (!(aKey in b)) {
            diff = diff || {}
            diff[aKey] = undefined
        }

        var aValue = a[aKey]
        var bValue = b[aKey]

        if (hooks && aKey in hooks) {
            diff = diff || {}
            diff[aKey] = bValue
        } else {
            if (isObject(aValue) && isObject(bValue)) {
                if (getPrototype(bValue) !== getPrototype(aValue)) {
                    diff = diff || {}
                    diff[aKey] = bValue
                } else {
                    var objectDiff = diffProps(aValue, bValue)
                    if (objectDiff) {
                        diff = diff || {}
                        diff[aKey] = objectDiff
                    }
                }
            } else if (aValue !== bValue) {
                diff = diff || {}
                diff[aKey] = bValue
            }
        }
    }

    for (var bKey in b) {
        if (!(bKey in a)) {
            diff = diff || {}
            diff[bKey] = b[bKey]
        }
    }

    return diff
}

function getPrototype(value) {
    if (Object.getPrototypeOf) {
        return Object.getPrototypeOf(value)
    } else if (value.__proto__) {
        return value.__proto__
    } else if (value.constructor) {
        return value.constructor.prototype
    }
}

function diffChildren(a, b, patch, apply, index) {
    var aChildren = a.children
    var bChildren = reorder(aChildren, b.children)

    var aLen = aChildren.length
    var bLen = bChildren.length
    var len = aLen > bLen ? aLen : bLen

    for (var i = 0; i < len; i++) {
        var leftNode = aChildren[i]
        var rightNode = bChildren[i]
        index += 1

        if (!leftNode) {
            if (rightNode) {
                // Excess nodes in b need to be added
                apply = appendPatch(apply,
                    new VPatch(VPatch.INSERT, null, rightNode))
            }
        } else if (!rightNode) {
            if (leftNode) {
                // Excess nodes in a need to be removed
                patch[index] = new VPatch(VPatch.REMOVE, leftNode, null)
                destroyWidgets(leftNode, patch, index)
            }
        } else {
            walk(leftNode, rightNode, patch, index)
        }

        if (isVNode(leftNode) && leftNode.count) {
            index += leftNode.count
        }
    }

    if (bChildren.moves) {
        // Reorder nodes last
        apply = appendPatch(apply, new VPatch(VPatch.ORDER, a, bChildren.moves))
    }

    return apply
}

// Patch records for all destroyed widgets must be added because we need
// a DOM node reference for the destroy function
function destroyWidgets(vNode, patch, index) {
    if (isWidget(vNode)) {
        if (typeof vNode.destroy === "function") {
            patch[index] = new VPatch(VPatch.REMOVE, vNode, null)
        }
    } else if (isVNode(vNode) && vNode.hasWidgets) {
        var children = vNode.children
        var len = children.length
        for (var i = 0; i < len; i++) {
            var child = children[i]
            index += 1

            destroyWidgets(child, patch, index)

            if (isVNode(child) && child.count) {
                index += child.count
            }
        }
    }
}

// Create a sub-patch for thunks
function thunks(a, b, patch, index) {
    var nodes = handleThunk(a, b);
    var thunkPatch = diff(nodes.a, nodes.b)
    if (hasPatches(thunkPatch)) {
        patch[index] = new VPatch(VPatch.THUNK, null, thunkPatch)
    }
}

function hasPatches(patch) {
    for (var index in patch) {
        if (index !== "a") {
            return true;
        }
    }

    return false;
}

// Execute hooks when two nodes are identical
function hooks(vNode, patch, index) {
    if (isVNode(vNode)) {
        if (vNode.hooks) {
            patch[index] = new VPatch(VPatch.PROPS, vNode.hooks, vNode.hooks)
        }

        if (vNode.descendantHooks) {
            var children = vNode.children
            var len = children.length
            for (var i = 0; i < len; i++) {
                var child = children[i]
                index += 1

                hooks(child, patch, index)

                if (isVNode(child) && child.count) {
                    index += child.count
                }
            }
        }
    }
}

// List diff, naive left to right reordering
function reorder(aChildren, bChildren) {

    var bKeys = keyIndex(bChildren)

    if (!bKeys) {
        return bChildren
    }

    var aKeys = keyIndex(aChildren)

    if (!aKeys) {
        return bChildren
    }

    var bMatch = {}, aMatch = {}

    for (var key in bKeys) {
        bMatch[bKeys[key]] = aKeys[key]
    }

    for (var key in aKeys) {
        aMatch[aKeys[key]] = bKeys[key]
    }

    var aLen = aChildren.length
    var bLen = bChildren.length
    var len = aLen > bLen ? aLen : bLen
    var shuffle = []
    var freeIndex = 0
    var i = 0
    var moveIndex = 0
    var moves = {}
    var removes = moves.removes = {}
    var reverse = moves.reverse = {}
    var hasMoves = false

    while (freeIndex < len) {
        var move = aMatch[i]
        if (move !== undefined) {
            shuffle[i] = bChildren[move]
            if (move !== moveIndex) {
                moves[move] = moveIndex
                reverse[moveIndex] = move
                hasMoves = true
            }
            moveIndex++
        } else if (i in aMatch) {
            shuffle[i] = undefined
            removes[i] = moveIndex++
            hasMoves = true
        } else {
            while (bMatch[freeIndex] !== undefined) {
                freeIndex++
            }

            if (freeIndex < len) {
                var freeChild = bChildren[freeIndex]
                if (freeChild) {
                    shuffle[i] = freeChild
                    if (freeIndex !== moveIndex) {
                        hasMoves = true
                        moves[freeIndex] = moveIndex
                        reverse[moveIndex] = freeIndex
                    }
                    moveIndex++
                }
                freeIndex++
            }
        }
        i++
    }

    if (hasMoves) {
        shuffle.moves = moves
    }

    return shuffle
}

function keyIndex(children) {
    var i, keys

    for (i = 0; i < children.length; i++) {
        var child = children[i]

        if (child.key !== undefined) {
            keys = keys || {}
            keys[child.key] = i
        }
    }

    return keys
}

function appendPatch(apply, patch) {
    if (apply) {
        if (isArray(apply)) {
            apply.push(patch)
        } else {
            apply = [apply, patch]
        }

        return apply
    } else {
        return patch
    }
}

},{"./handle-thunk":27,"./is-thunk":28,"./is-vnode":30,"./is-vtext":31,"./is-widget":32,"./vpatch":37,"is-object":33,"x-is-array":34}],27:[function(require,module,exports){
var isVNode = require("./is-vnode")
var isVText = require("./is-vtext")
var isWidget = require("./is-widget")
var isThunk = require("./is-thunk")

module.exports = handleThunk

function handleThunk(a, b) {
    var renderedA = a
    var renderedB = b

    if (isThunk(b)) {
        renderedB = renderThunk(b, a)
    }

    if (isThunk(a)) {
        renderedA = renderThunk(a, null)
    }

    return {
        a: renderedA,
        b: renderedB
    }
}

function renderThunk(thunk, previous) {
    var renderedThunk = thunk.vnode

    if (!renderedThunk) {
        renderedThunk = thunk.vnode = thunk.render(previous)
    }

    if (!(isVNode(renderedThunk) ||
            isVText(renderedThunk) ||
            isWidget(renderedThunk))) {
        throw new Error("thunk did not return a valid node");
    }

    return renderedThunk
}

},{"./is-thunk":28,"./is-vnode":30,"./is-vtext":31,"./is-widget":32}],28:[function(require,module,exports){
module.exports = isThunk

function isThunk(t) {
    return t && t.type === "Thunk"
}

},{}],29:[function(require,module,exports){
module.exports = isHook

function isHook(hook) {
    return hook && typeof hook.hook === "function" &&
        !hook.hasOwnProperty("hook")
}

},{}],30:[function(require,module,exports){
var version = require("./version")

module.exports = isVirtualNode

function isVirtualNode(x) {
    return x && x.type === "VirtualNode" && x.version === version
}

},{"./version":35}],31:[function(require,module,exports){
var version = require("./version")

module.exports = isVirtualText

function isVirtualText(x) {
    return x && x.type === "VirtualText" && x.version === version
}

},{"./version":35}],32:[function(require,module,exports){
module.exports = isWidget

function isWidget(w) {
    return w && w.type === "Widget"
}

},{}],33:[function(require,module,exports){
module.exports=require(21)
},{}],34:[function(require,module,exports){
module.exports=require(22)
},{}],35:[function(require,module,exports){
module.exports = "1"

},{}],36:[function(require,module,exports){
var version = require("./version")
var isVNode = require("./is-vnode")
var isWidget = require("./is-widget")
var isVHook = require("./is-vhook")

module.exports = VirtualNode

var noProperties = {}
var noChildren = []

function VirtualNode(tagName, properties, children, key, namespace) {
    this.tagName = tagName
    this.properties = properties || noProperties
    this.children = children || noChildren
    this.key = key != null ? String(key) : undefined
    this.namespace = (typeof namespace === "string") ? namespace : null

    var count = (children && children.length) || 0
    var descendants = 0
    var hasWidgets = false
    var descendantHooks = false
    var hooks

    for (var propName in properties) {
        if (properties.hasOwnProperty(propName)) {
            var property = properties[propName]
            if (isVHook(property)) {
                if (!hooks) {
                    hooks = {}
                }

                hooks[propName] = property
            }
        }
    }

    for (var i = 0; i < count; i++) {
        var child = children[i]
        if (isVNode(child)) {
            descendants += child.count || 0

            if (!hasWidgets && child.hasWidgets) {
                hasWidgets = true
            }

            if (!descendantHooks && (child.hooks || child.descendantHooks)) {
                descendantHooks = true
            }
        } else if (!hasWidgets && isWidget(child)) {
            if (typeof child.destroy === "function") {
                hasWidgets = true
            }
        }
    }

    this.count = count + descendants
    this.hasWidgets = hasWidgets
    this.hooks = hooks
    this.descendantHooks = descendantHooks
}

VirtualNode.prototype.version = version
VirtualNode.prototype.type = "VirtualNode"

},{"./is-vhook":29,"./is-vnode":30,"./is-widget":32,"./version":35}],37:[function(require,module,exports){
var version = require("./version")

VirtualPatch.NONE = 0
VirtualPatch.VTEXT = 1
VirtualPatch.VNODE = 2
VirtualPatch.WIDGET = 3
VirtualPatch.PROPS = 4
VirtualPatch.ORDER = 5
VirtualPatch.INSERT = 6
VirtualPatch.REMOVE = 7
VirtualPatch.THUNK = 8

module.exports = VirtualPatch

function VirtualPatch(type, vNode, patch) {
    this.type = Number(type)
    this.vNode = vNode
    this.patch = patch
}

VirtualPatch.prototype.version = version
VirtualPatch.prototype.type = "VirtualPatch"

},{"./version":35}],38:[function(require,module,exports){
var version = require("./version")

module.exports = VirtualText

function VirtualText(text) {
    this.text = String(text)
}

VirtualText.prototype.version = version
VirtualText.prototype.type = "VirtualText"

},{"./version":35}],39:[function(require,module,exports){

var VNode = require('vtree/vnode');
var VText = require('vtree/vtext');
var diff = require('vtree/diff');
var patch = require('vdom/patch');
var createElement = require('vdom/create-element');
var DataSet = require("data-set");
var Delegator = require("dom-delegator");
var isHook = require("vtree/is-vhook");

Elm.Native.VirtualDom = {};
Elm.Native.VirtualDom.make = function(elm)
{
	elm.Native = elm.Native || {};
	elm.Native.VirtualDom = elm.Native.VirtualDom || {};
	if (elm.Native.VirtualDom.values)
	{
		return elm.Native.VirtualDom.values;
	}

	// This manages event listeners. Somehow...
	// Save a reference for use in on(...)
	var delegator = Delegator();

	var Element = Elm.Native.Graphics.Element.make(elm);
	var Json = Elm.Native.Json.make(elm);
	var List = Elm.Native.List.make(elm);
	var Signal = Elm.Native.Signal.make(elm);
	var Utils = Elm.Native.Utils.make(elm);

	var ATTRIBUTE_KEY = 'UniqueNameThatOthersAreVeryUnlikelyToUse';

	function listToProperties(list)
	{
		var object = {};
		while (list.ctor !== '[]')
		{
			var entry = list._0;
			if (entry.key === ATTRIBUTE_KEY)
			{
				object.attributes = object.attributes || {};
				object.attributes[entry.value.attrKey] = entry.value.attrValue;
			}
			else
			{
				object[entry.key] = entry.value;
			}
			list = list._1;
		}
		return object;
	}

	function node(name, propertyList, contents)
	{
		var props = listToProperties(propertyList);

		var key, namespace;
		// support keys
		if (props.key !== undefined)
		{
			key = props.key;
			props.key = undefined;
		}

		// support namespace
		if (props.namespace !== undefined)
		{
			namespace = props.namespace;
			props.namespace = undefined;
		}

		// ensure that setting text of an input does not move the cursor
		var useSoftSet =
			name === 'input'
			&& props.value !== undefined
			&& !isHook(props.value);

		if (useSoftSet)
		{
			props.value = SoftSetHook(props.value);
		}

		return new VNode(name, props, List.toArray(contents), key, namespace);
	}

	function property(key, value)
	{
		return {
			key: key,
			value: value
		};
	}

	function attribute(key, value)
	{
		return {
			key: ATTRIBUTE_KEY,
			value: {
				attrKey: key,
				attrValue: value
			}
		};
	}

	function on(name, decoder, createMessage)
	{
		// Ensure we're listening for this type of event
		delegator.listenTo(name);
		function eventHandler(event)
		{
			var value = A2(Json.runDecoderValue, decoder, event);
			if (value.ctor === 'Ok')
			{
				Signal.sendMessage(createMessage(value._0));
			}
		}
		return property(name, DataSetHook(eventHandler));
	}

	function DataSetHook(value)
	{
		if (!(this instanceof DataSetHook))
		{
			return new DataSetHook(value);
		}

		this.value = value;
	}

	DataSetHook.prototype.hook = function (node, propertyName) {
		var ds = DataSet(node);
		ds[propertyName] = this.value;
	};


	function SoftSetHook(value)
	{
		if (!(this instanceof SoftSetHook))
		{
			return new SoftSetHook(value);
		}

		this.value = value;
	}

	SoftSetHook.prototype.hook = function (node, propertyName)
	{
		if (node[propertyName] !== this.value)
		{
			node[propertyName] = this.value;
		}
	};

	function text(string)
	{
		return new VText(string);
	}

	function fromElement(element)
	{
		return {
			type: "Widget",

			element: element,

			init: function () {
				return Element.render(element);
			},

			update: function (previous, node) {
				return Element.update(node, previous.element, element);
			}
		};
	}

	function toElement(width, height, html)
	{
		return A3(Element.newElement, width, height, {
			ctor: 'Custom',
			type: 'evancz/elm-html',
			render: render,
			update: update,
			model: html
		});
	}

	function render(model)
	{
		var element = Element.createNode('div');
		element.appendChild(createElement(model));
		return element;
	}

	function update(node, oldModel, newModel)
	{
		updateAndReplace(node.firstChild, oldModel, newModel);
		return node;
	}

	function updateAndReplace(node, oldModel, newModel)
	{
		var patches = diff(oldModel, newModel);
		var newNode = patch(node, patches);
		return newNode;
	}

	function lazyRef(fn, a)
	{
		function thunk()
		{
			return fn(a);
		}
		return new Thunk(fn, [a], thunk);
	}

	function lazyRef2(fn, a, b)
	{
		function thunk()
		{
			return A2(fn, a, b);
		}
		return new Thunk(fn, [a,b], thunk);
	}

	function lazyRef3(fn, a, b, c)
	{
		function thunk()
		{
			return A3(fn, a, b, c);
		}
		return new Thunk(fn, [a,b,c], thunk);
	}

	function Thunk(fn, args, thunk)
	{
		this.fn = fn;
		this.args = args;
		this.vnode = null;
		this.key = undefined;
		this.thunk = thunk;
	}

	Thunk.prototype.type = "Thunk";
	Thunk.prototype.update = updateThunk;
	Thunk.prototype.render = renderThunk;

	function shouldUpdate(current, previous)
	{
		if (current.fn !== previous.fn)
		{
			return true;
		}

		// if it's the same function, we know the number of args must match
		var cargs = current.args;
		var pargs = previous.args;

		for (var i = cargs.length; i--; )
		{
			if (cargs[i] !== pargs[i])
			{
				return true;
			}
		}

		return false;
	}

	function updateThunk(previous, domNode)
	{
		if (!shouldUpdate(this, previous))
		{
			this.vnode = previous.vnode;
			return;
		}

		if (!this.vnode)
		{
			this.vnode = this.thunk();
		}

		var patches = diff(previous.vnode, this.vnode);
		patch(domNode, patches);
	}

	function renderThunk()
	{
		return this.thunk();
	}

	return Elm.Native.VirtualDom.values = {
		node: F3(node),
		text: text,
		on: F3(on),

		property: F2(property),
		attribute: F2(attribute),

		lazy: F2(lazyRef),
		lazy2: F3(lazyRef2),
		lazy3: F4(lazyRef3),

		toElement: F3(toElement),
		fromElement: fromElement,

		render: createElement,
		updateAndReplace: updateAndReplace
	};
};

},{"data-set":2,"dom-delegator":8,"vdom/create-element":18,"vdom/patch":24,"vtree/diff":26,"vtree/is-vhook":29,"vtree/vnode":36,"vtree/vtext":38}],40:[function(require,module,exports){

},{}]},{},[39]);

Elm.Result = Elm.Result || {};
Elm.Result.make = function (_elm) {
   "use strict";
   _elm.Result = _elm.Result || {};
   if (_elm.Result.values)
   return _elm.Result.values;
   var _op = {},
   _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   $moduleName = "Result",
   $Maybe = Elm.Maybe.make(_elm);
   var toMaybe = function (result) {
      return function () {
         switch (result.ctor)
         {case "Err":
            return $Maybe.Nothing;
            case "Ok":
            return $Maybe.Just(result._0);}
         _U.badCase($moduleName,
         "between lines 164 and 166");
      }();
   };
   var Err = function (a) {
      return {ctor: "Err",_0: a};
   };
   var andThen = F2(function (result,
   callback) {
      return function () {
         switch (result.ctor)
         {case "Err":
            return Err(result._0);
            case "Ok":
            return callback(result._0);}
         _U.badCase($moduleName,
         "between lines 126 and 128");
      }();
   });
   var Ok = function (a) {
      return {ctor: "Ok",_0: a};
   };
   var map = F2(function (func,
   ra) {
      return function () {
         switch (ra.ctor)
         {case "Err": return Err(ra._0);
            case "Ok":
            return Ok(func(ra._0));}
         _U.badCase($moduleName,
         "between lines 41 and 43");
      }();
   });
   var map2 = F3(function (func,
   ra,
   rb) {
      return function () {
         var _v9 = {ctor: "_Tuple2"
                   ,_0: ra
                   ,_1: rb};
         switch (_v9.ctor)
         {case "_Tuple2":
            switch (_v9._0.ctor)
              {case "Err":
                 return Err(_v9._0._0);
                 case "Ok": switch (_v9._1.ctor)
                   {case "Ok": return Ok(A2(func,
                        _v9._0._0,
                        _v9._1._0));}
                   break;}
              switch (_v9._1.ctor)
              {case "Err":
                 return Err(_v9._1._0);}
              break;}
         _U.badCase($moduleName,
         "between lines 55 and 58");
      }();
   });
   var map3 = F4(function (func,
   ra,
   rb,
   rc) {
      return function () {
         var _v16 = {ctor: "_Tuple3"
                    ,_0: ra
                    ,_1: rb
                    ,_2: rc};
         switch (_v16.ctor)
         {case "_Tuple3":
            switch (_v16._0.ctor)
              {case "Err":
                 return Err(_v16._0._0);
                 case "Ok": switch (_v16._1.ctor)
                   {case "Ok":
                      switch (_v16._2.ctor)
                        {case "Ok": return Ok(A3(func,
                             _v16._0._0,
                             _v16._1._0,
                             _v16._2._0));}
                        break;}
                   break;}
              switch (_v16._1.ctor)
              {case "Err":
                 return Err(_v16._1._0);}
              switch (_v16._2.ctor)
              {case "Err":
                 return Err(_v16._2._0);}
              break;}
         _U.badCase($moduleName,
         "between lines 63 and 67");
      }();
   });
   var map4 = F5(function (func,
   ra,
   rb,
   rc,
   rd) {
      return function () {
         var _v26 = {ctor: "_Tuple4"
                    ,_0: ra
                    ,_1: rb
                    ,_2: rc
                    ,_3: rd};
         switch (_v26.ctor)
         {case "_Tuple4":
            switch (_v26._0.ctor)
              {case "Err":
                 return Err(_v26._0._0);
                 case "Ok": switch (_v26._1.ctor)
                   {case "Ok":
                      switch (_v26._2.ctor)
                        {case "Ok":
                           switch (_v26._3.ctor)
                             {case "Ok": return Ok(A4(func,
                                  _v26._0._0,
                                  _v26._1._0,
                                  _v26._2._0,
                                  _v26._3._0));}
                             break;}
                        break;}
                   break;}
              switch (_v26._1.ctor)
              {case "Err":
                 return Err(_v26._1._0);}
              switch (_v26._2.ctor)
              {case "Err":
                 return Err(_v26._2._0);}
              switch (_v26._3.ctor)
              {case "Err":
                 return Err(_v26._3._0);}
              break;}
         _U.badCase($moduleName,
         "between lines 72 and 77");
      }();
   });
   var map5 = F6(function (func,
   ra,
   rb,
   rc,
   rd,
   re) {
      return function () {
         var _v39 = {ctor: "_Tuple5"
                    ,_0: ra
                    ,_1: rb
                    ,_2: rc
                    ,_3: rd
                    ,_4: re};
         switch (_v39.ctor)
         {case "_Tuple5":
            switch (_v39._0.ctor)
              {case "Err":
                 return Err(_v39._0._0);
                 case "Ok": switch (_v39._1.ctor)
                   {case "Ok":
                      switch (_v39._2.ctor)
                        {case "Ok":
                           switch (_v39._3.ctor)
                             {case "Ok":
                                switch (_v39._4.ctor)
                                  {case "Ok": return Ok(A5(func,
                                       _v39._0._0,
                                       _v39._1._0,
                                       _v39._2._0,
                                       _v39._3._0,
                                       _v39._4._0));}
                                  break;}
                             break;}
                        break;}
                   break;}
              switch (_v39._1.ctor)
              {case "Err":
                 return Err(_v39._1._0);}
              switch (_v39._2.ctor)
              {case "Err":
                 return Err(_v39._2._0);}
              switch (_v39._3.ctor)
              {case "Err":
                 return Err(_v39._3._0);}
              switch (_v39._4.ctor)
              {case "Err":
                 return Err(_v39._4._0);}
              break;}
         _U.badCase($moduleName,
         "between lines 82 and 88");
      }();
   });
   var formatError = F2(function (f,
   result) {
      return function () {
         switch (result.ctor)
         {case "Err":
            return Err(f(result._0));
            case "Ok":
            return Ok(result._0);}
         _U.badCase($moduleName,
         "between lines 148 and 150");
      }();
   });
   var fromMaybe = F2(function (err,
   maybe) {
      return function () {
         switch (maybe.ctor)
         {case "Just":
            return Ok(maybe._0);
            case "Nothing":
            return Err(err);}
         _U.badCase($moduleName,
         "between lines 180 and 182");
      }();
   });
   _elm.Result.values = {_op: _op
                        ,map: map
                        ,map2: map2
                        ,map3: map3
                        ,map4: map4
                        ,map5: map5
                        ,andThen: andThen
                        ,toMaybe: toMaybe
                        ,fromMaybe: fromMaybe
                        ,formatError: formatError
                        ,Ok: Ok
                        ,Err: Err};
   return _elm.Result.values;
};
Elm.SelectionList = Elm.SelectionList || {};
Elm.SelectionList.make = function (_elm) {
   "use strict";
   _elm.SelectionList = _elm.SelectionList || {};
   if (_elm.SelectionList.values)
   return _elm.SelectionList.values;
   var _op = {},
   _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   $moduleName = "SelectionList",
   $Basics = Elm.Basics.make(_elm),
   $List = Elm.List.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Result = Elm.Result.make(_elm),
   $Signal = Elm.Signal.make(_elm);
   var selectedIndex = function (list) {
      return $List.length(list.previous);
   };
   var previous = function (list) {
      return function () {
         var _v0 = list.previous;
         switch (_v0.ctor)
         {case "::":
            return _U.replace([["selected"
                               ,_v0._0]
                              ,["previous",_v0._1]
                              ,["next"
                               ,A2($List._op["::"],
                               list.selected,
                               list.next)]],
              list);
            case "[]": return list;}
         _U.badCase($moduleName,
         "between lines 149 and 157");
      }();
   };
   var next = function (list) {
      return function () {
         var _v3 = list.next;
         switch (_v3.ctor)
         {case "::":
            return _U.replace([["selected"
                               ,_v3._0]
                              ,["previous"
                               ,A2($List._op["::"],
                               list.selected,
                               list.previous)]
                              ,["next",_v3._1]],
              list);
            case "[]": return list;}
         _U.badCase($moduleName,
         "between lines 133 and 141");
      }();
   };
   var $goto = F2(function (n,
   list) {
      return function () {
         var curIndex = selectedIndex(list);
         return _U.eq(curIndex,
         n) ? list : _U.cmp(curIndex,
         n) < 0 && _U.cmp($List.length(list.next),
         0) > 0 ? A2($goto,
         n,
         next(list)) : _U.cmp(curIndex,
         A2($Basics.max,
         0,
         n)) > 0 ? A2($goto,
         n,
         previous(list)) : list;
      }();
   });
   var selectedMap = F2(function (f,
   list) {
      return _U.replace([["previous"
                         ,A2($List.map,
                         f(false),
                         list.previous)]
                        ,["selected"
                         ,A2(f,true,list.selected)]
                        ,["next"
                         ,A2($List.map,
                         f(false),
                         list.next)]],
      list);
   });
   var indexedMap = F2(function (f,
   list) {
      return function () {
         var nextLength = $List.length(list.next);
         var previousLength = $List.length(list.previous);
         return _U.replace([["previous"
                            ,$List.reverse(A2($List.indexedMap,
                            f,
                            $List.reverse(list.previous)))]
                           ,["selected"
                            ,A2(f,
                            previousLength,
                            list.selected)]
                           ,["next"
                            ,A2($List.indexedMap,
                            function (index) {
                               return f(index + previousLength + 1);
                            },
                            list.next)]],
         list);
      }();
   });
   var map2 = F3(function (f,
   listA,
   listB) {
      return _U.replace([["previous"
                         ,A3($List.map2,
                         f,
                         listA.previous,
                         listB.previous)]
                        ,["selected"
                         ,A2(f,
                         listA.selected,
                         listB.selected)]
                        ,["next"
                         ,A3($List.map2,
                         f,
                         listA.next,
                         listB.next)]],
      listA);
   });
   var andMap = map2(F2(function (x,
   y) {
      return x(y);
   }));
   var updateN = F3(function (n,
   f,
   list) {
      return A2(indexedMap,
      F2(function (index,value) {
         return _U.eq(index,
         n) ? f(value) : value;
      }),
      list);
   });
   var updateSelected = F2(function (f,
   list) {
      return _U.replace([["selected"
                         ,f(list.selected)]],
      list);
   });
   var map = F2(function (f,list) {
      return _U.replace([["previous"
                         ,A2($List.map,f,list.previous)]
                        ,["selected",f(list.selected)]
                        ,["next"
                         ,A2($List.map,f,list.next)]],
      list);
   });
   var length = function (list) {
      return $List.length(list.previous) + 1 + $List.length(list.next);
   };
   var toList = function (list) {
      return A2($Basics._op["++"],
      $List.reverse(list.previous),
      A2($Basics._op["++"],
      _L.fromArray([list.selected]),
      list.next));
   };
   var SelectionList = F3(function (a,
   b,
   c) {
      return {_: {}
             ,next: c
             ,previous: a
             ,selected: b};
   });
   var fromList = F2(function (selected,
   next) {
      return A3(SelectionList,
      _L.fromArray([]),
      selected,
      next);
   });
   _elm.SelectionList.values = {_op: _op
                               ,SelectionList: SelectionList
                               ,toList: toList
                               ,fromList: fromList
                               ,length: length
                               ,map: map
                               ,updateSelected: updateSelected
                               ,updateN: updateN
                               ,map2: map2
                               ,andMap: andMap
                               ,indexedMap: indexedMap
                               ,selectedMap: selectedMap
                               ,next: next
                               ,previous: previous
                               ,selectedIndex: selectedIndex
                               ,$goto: $goto};
   return _elm.SelectionList.values;
};
Elm.Signal = Elm.Signal || {};
Elm.Signal.make = function (_elm) {
   "use strict";
   _elm.Signal = _elm.Signal || {};
   if (_elm.Signal.values)
   return _elm.Signal.values;
   var _op = {},
   _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   $moduleName = "Signal",
   $Basics = Elm.Basics.make(_elm),
   $Debug = Elm.Debug.make(_elm),
   $List = Elm.List.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Native$Signal = Elm.Native.Signal.make(_elm),
   $Task = Elm.Task.make(_elm);
   var send = F2(function (_v0,
   value) {
      return function () {
         switch (_v0.ctor)
         {case "Address":
            return A2($Task.onError,
              _v0._0(value),
              function (_v3) {
                 return function () {
                    return $Task.succeed({ctor: "_Tuple0"});
                 }();
              });}
         _U.badCase($moduleName,
         "between lines 370 and 371");
      }();
   });
   var Message = function (a) {
      return {ctor: "Message"
             ,_0: a};
   };
   var message = F2(function (_v5,
   value) {
      return function () {
         switch (_v5.ctor)
         {case "Address":
            return Message(_v5._0(value));}
         _U.badCase($moduleName,
         "on line 352, column 5 to 24");
      }();
   });
   var mailbox = $Native$Signal.mailbox;
   var Address = function (a) {
      return {ctor: "Address"
             ,_0: a};
   };
   var forwardTo = F2(function (_v8,
   f) {
      return function () {
         switch (_v8.ctor)
         {case "Address":
            return Address(function (x) {
                 return _v8._0(f(x));
              });}
         _U.badCase($moduleName,
         "on line 339, column 5 to 29");
      }();
   });
   var Mailbox = F2(function (a,
   b) {
      return {_: {}
             ,address: a
             ,signal: b};
   });
   var sampleOn = $Native$Signal.sampleOn;
   var dropRepeats = $Native$Signal.dropRepeats;
   var filterMap = $Native$Signal.filterMap;
   var filter = F3(function (isOk,
   base,
   signal) {
      return A3(filterMap,
      function (value) {
         return isOk(value) ? $Maybe.Just(value) : $Maybe.Nothing;
      },
      base,
      signal);
   });
   var merge = F2(function (left,
   right) {
      return A3($Native$Signal.genericMerge,
      $Basics.always,
      left,
      right);
   });
   var mergeMany = function (signalList) {
      return function () {
         var _v11 = $List.reverse(signalList);
         switch (_v11.ctor)
         {case "::":
            return A3($List.foldl,
              merge,
              _v11._0,
              _v11._1);
            case "[]":
            return $Debug.crash("mergeMany was given an empty list!");}
         _U.badCase($moduleName,
         "between lines 177 and 182");
      }();
   };
   var foldp = $Native$Signal.foldp;
   var map5 = $Native$Signal.map5;
   var map4 = $Native$Signal.map4;
   var map3 = $Native$Signal.map3;
   var map2 = $Native$Signal.map2;
   _op["~"] = F2(function (funcs,
   args) {
      return A3(map2,
      F2(function (f,v) {
         return f(v);
      }),
      funcs,
      args);
   });
   var map = $Native$Signal.map;
   _op["<~"] = map;
   var constant = $Native$Signal.constant;
   var Signal = {ctor: "Signal"};
   _elm.Signal.values = {_op: _op
                        ,merge: merge
                        ,mergeMany: mergeMany
                        ,map: map
                        ,map2: map2
                        ,map3: map3
                        ,map4: map4
                        ,map5: map5
                        ,constant: constant
                        ,dropRepeats: dropRepeats
                        ,filter: filter
                        ,filterMap: filterMap
                        ,sampleOn: sampleOn
                        ,foldp: foldp
                        ,mailbox: mailbox
                        ,send: send
                        ,message: message
                        ,forwardTo: forwardTo
                        ,Mailbox: Mailbox};
   return _elm.Signal.values;
};
Elm.StartApp = Elm.StartApp || {};
Elm.StartApp.make = function (_elm) {
   "use strict";
   _elm.StartApp = _elm.StartApp || {};
   if (_elm.StartApp.values)
   return _elm.StartApp.values;
   var _op = {},
   _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   $moduleName = "StartApp",
   $Basics = Elm.Basics.make(_elm),
   $Html = Elm.Html.make(_elm),
   $List = Elm.List.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Result = Elm.Result.make(_elm),
   $Signal = Elm.Signal.make(_elm);
   var start = function (app) {
      return function () {
         var actions = $Signal.mailbox($Maybe.Nothing);
         var address = A2($Signal.forwardTo,
         actions.address,
         $Maybe.Just);
         var model = A3($Signal.foldp,
         F2(function (_v0,model) {
            return function () {
               switch (_v0.ctor)
               {case "Just":
                  return A2(app.update,
                    _v0._0,
                    model);}
               _U.badCase($moduleName,
               "on line 92, column 34 to 57");
            }();
         }),
         app.model,
         actions.signal);
         return A2($Signal.map,
         app.view(address),
         model);
      }();
   };
   var App = F3(function (a,b,c) {
      return {_: {}
             ,model: a
             ,update: c
             ,view: b};
   });
   _elm.StartApp.values = {_op: _op
                          ,App: App
                          ,start: start};
   return _elm.StartApp.values;
};
Elm.String = Elm.String || {};
Elm.String.make = function (_elm) {
   "use strict";
   _elm.String = _elm.String || {};
   if (_elm.String.values)
   return _elm.String.values;
   var _op = {},
   _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   $moduleName = "String",
   $Maybe = Elm.Maybe.make(_elm),
   $Native$String = Elm.Native.String.make(_elm),
   $Result = Elm.Result.make(_elm);
   var fromList = $Native$String.fromList;
   var toList = $Native$String.toList;
   var toFloat = $Native$String.toFloat;
   var toInt = $Native$String.toInt;
   var indices = $Native$String.indexes;
   var indexes = $Native$String.indexes;
   var endsWith = $Native$String.endsWith;
   var startsWith = $Native$String.startsWith;
   var contains = $Native$String.contains;
   var all = $Native$String.all;
   var any = $Native$String.any;
   var toLower = $Native$String.toLower;
   var toUpper = $Native$String.toUpper;
   var lines = $Native$String.lines;
   var words = $Native$String.words;
   var trimRight = $Native$String.trimRight;
   var trimLeft = $Native$String.trimLeft;
   var trim = $Native$String.trim;
   var padRight = $Native$String.padRight;
   var padLeft = $Native$String.padLeft;
   var pad = $Native$String.pad;
   var dropRight = $Native$String.dropRight;
   var dropLeft = $Native$String.dropLeft;
   var right = $Native$String.right;
   var left = $Native$String.left;
   var slice = $Native$String.slice;
   var repeat = $Native$String.repeat;
   var join = $Native$String.join;
   var split = $Native$String.split;
   var foldr = $Native$String.foldr;
   var foldl = $Native$String.foldl;
   var reverse = $Native$String.reverse;
   var filter = $Native$String.filter;
   var map = $Native$String.map;
   var length = $Native$String.length;
   var concat = $Native$String.concat;
   var append = $Native$String.append;
   var uncons = $Native$String.uncons;
   var cons = $Native$String.cons;
   var fromChar = function ($char) {
      return A2(cons,$char,"");
   };
   var isEmpty = $Native$String.isEmpty;
   _elm.String.values = {_op: _op
                        ,isEmpty: isEmpty
                        ,length: length
                        ,reverse: reverse
                        ,repeat: repeat
                        ,cons: cons
                        ,uncons: uncons
                        ,fromChar: fromChar
                        ,append: append
                        ,concat: concat
                        ,split: split
                        ,join: join
                        ,words: words
                        ,lines: lines
                        ,slice: slice
                        ,left: left
                        ,right: right
                        ,dropLeft: dropLeft
                        ,dropRight: dropRight
                        ,contains: contains
                        ,startsWith: startsWith
                        ,endsWith: endsWith
                        ,indexes: indexes
                        ,indices: indices
                        ,toInt: toInt
                        ,toFloat: toFloat
                        ,toList: toList
                        ,fromList: fromList
                        ,toUpper: toUpper
                        ,toLower: toLower
                        ,pad: pad
                        ,padLeft: padLeft
                        ,padRight: padRight
                        ,trim: trim
                        ,trimLeft: trimLeft
                        ,trimRight: trimRight
                        ,map: map
                        ,filter: filter
                        ,foldl: foldl
                        ,foldr: foldr
                        ,any: any
                        ,all: all};
   return _elm.String.values;
};
Elm.Svg = Elm.Svg || {};
Elm.Svg.make = function (_elm) {
   "use strict";
   _elm.Svg = _elm.Svg || {};
   if (_elm.Svg.values)
   return _elm.Svg.values;
   var _op = {},
   _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   $moduleName = "Svg",
   $Basics = Elm.Basics.make(_elm),
   $Html = Elm.Html.make(_elm),
   $Json$Encode = Elm.Json.Encode.make(_elm),
   $List = Elm.List.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Result = Elm.Result.make(_elm),
   $Signal = Elm.Signal.make(_elm),
   $VirtualDom = Elm.VirtualDom.make(_elm);
   var svgNamespace = A2($VirtualDom.property,
   "namespace",
   $Json$Encode.string("http://www.w3.org/2000/svg"));
   var svgNode = F3(function (name,
   attributes,
   children) {
      return A3($VirtualDom.node,
      name,
      A2($List._op["::"],
      svgNamespace,
      attributes),
      children);
   });
   var svg = F2(function (attributes,
   children) {
      return A3(svgNode,
      "svg",
      attributes,
      children);
   });
   var foreignObject = F2(function (attributes,
   children) {
      return A3(svgNode,
      "foreignObject",
      attributes,
      children);
   });
   var animate = F2(function (attributes,
   children) {
      return A3(svgNode,
      "animate",
      attributes,
      children);
   });
   var animateColor = F2(function (attributes,
   children) {
      return A3(svgNode,
      "animateColor",
      attributes,
      children);
   });
   var animateMotion = F2(function (attributes,
   children) {
      return A3(svgNode,
      "animateMotion",
      attributes,
      children);
   });
   var animateTransform = F2(function (attributes,
   children) {
      return A3(svgNode,
      "animateTransform",
      attributes,
      children);
   });
   var mpath = F2(function (attributes,
   children) {
      return A3(svgNode,
      "mpath",
      attributes,
      children);
   });
   var set = F2(function (attributes,
   children) {
      return A3(svgNode,
      "set",
      attributes,
      children);
   });
   var a = F2(function (attributes,
   children) {
      return A3(svgNode,
      "a",
      attributes,
      children);
   });
   var defs = F2(function (attributes,
   children) {
      return A3(svgNode,
      "defs",
      attributes,
      children);
   });
   var g = F2(function (attributes,
   children) {
      return A3(svgNode,
      "g",
      attributes,
      children);
   });
   var marker = F2(function (attributes,
   children) {
      return A3(svgNode,
      "marker",
      attributes,
      children);
   });
   var mask = F2(function (attributes,
   children) {
      return A3(svgNode,
      "mask",
      attributes,
      children);
   });
   var missingGlyph = F2(function (attributes,
   children) {
      return A3(svgNode,
      "missingGlyph",
      attributes,
      children);
   });
   var pattern = F2(function (attributes,
   children) {
      return A3(svgNode,
      "pattern",
      attributes,
      children);
   });
   var $switch = F2(function (attributes,
   children) {
      return A3(svgNode,
      "switch",
      attributes,
      children);
   });
   var symbol = F2(function (attributes,
   children) {
      return A3(svgNode,
      "symbol",
      attributes,
      children);
   });
   var desc = F2(function (attributes,
   children) {
      return A3(svgNode,
      "desc",
      attributes,
      children);
   });
   var metadata = F2(function (attributes,
   children) {
      return A3(svgNode,
      "metadata",
      attributes,
      children);
   });
   var title = F2(function (attributes,
   children) {
      return A3(svgNode,
      "title",
      attributes,
      children);
   });
   var feBlend = F2(function (attributes,
   children) {
      return A3(svgNode,
      "feBlend",
      attributes,
      children);
   });
   var feColorMatrix = F2(function (attributes,
   children) {
      return A3(svgNode,
      "feColorMatrix",
      attributes,
      children);
   });
   var feComponentTransfer = F2(function (attributes,
   children) {
      return A3(svgNode,
      "feComponentTransfer",
      attributes,
      children);
   });
   var feComposite = F2(function (attributes,
   children) {
      return A3(svgNode,
      "feComposite",
      attributes,
      children);
   });
   var feConvolveMatrix = F2(function (attributes,
   children) {
      return A3(svgNode,
      "feConvolveMatrix",
      attributes,
      children);
   });
   var feDiffuseLighting = F2(function (attributes,
   children) {
      return A3(svgNode,
      "feDiffuseLighting",
      attributes,
      children);
   });
   var feDisplacementMap = F2(function (attributes,
   children) {
      return A3(svgNode,
      "feDisplacementMap",
      attributes,
      children);
   });
   var feFlood = F2(function (attributes,
   children) {
      return A3(svgNode,
      "feFlood",
      attributes,
      children);
   });
   var feFuncA = F2(function (attributes,
   children) {
      return A3(svgNode,
      "feFuncA",
      attributes,
      children);
   });
   var feFuncB = F2(function (attributes,
   children) {
      return A3(svgNode,
      "feFuncB",
      attributes,
      children);
   });
   var feFuncG = F2(function (attributes,
   children) {
      return A3(svgNode,
      "feFuncG",
      attributes,
      children);
   });
   var feFuncR = F2(function (attributes,
   children) {
      return A3(svgNode,
      "feFuncR",
      attributes,
      children);
   });
   var feGaussianBlur = F2(function (attributes,
   children) {
      return A3(svgNode,
      "feGaussianBlur",
      attributes,
      children);
   });
   var feImage = F2(function (attributes,
   children) {
      return A3(svgNode,
      "feImage",
      attributes,
      children);
   });
   var feMerge = F2(function (attributes,
   children) {
      return A3(svgNode,
      "feMerge",
      attributes,
      children);
   });
   var feMergeNode = F2(function (attributes,
   children) {
      return A3(svgNode,
      "feMergeNode",
      attributes,
      children);
   });
   var feMorphology = F2(function (attributes,
   children) {
      return A3(svgNode,
      "feMorphology",
      attributes,
      children);
   });
   var feOffset = F2(function (attributes,
   children) {
      return A3(svgNode,
      "feOffset",
      attributes,
      children);
   });
   var feSpecularLighting = F2(function (attributes,
   children) {
      return A3(svgNode,
      "feSpecularLighting",
      attributes,
      children);
   });
   var feTile = F2(function (attributes,
   children) {
      return A3(svgNode,
      "feTile",
      attributes,
      children);
   });
   var feTurbulence = F2(function (attributes,
   children) {
      return A3(svgNode,
      "feTurbulence",
      attributes,
      children);
   });
   var font = F2(function (attributes,
   children) {
      return A3(svgNode,
      "font",
      attributes,
      children);
   });
   var fontFace = F2(function (attributes,
   children) {
      return A3(svgNode,
      "fontFace",
      attributes,
      children);
   });
   var fontFaceFormat = F2(function (attributes,
   children) {
      return A3(svgNode,
      "fontFaceFormat",
      attributes,
      children);
   });
   var fontFaceName = F2(function (attributes,
   children) {
      return A3(svgNode,
      "fontFaceName",
      attributes,
      children);
   });
   var fontFaceSrc = F2(function (attributes,
   children) {
      return A3(svgNode,
      "fontFaceSrc",
      attributes,
      children);
   });
   var fontFaceUri = F2(function (attributes,
   children) {
      return A3(svgNode,
      "fontFaceUri",
      attributes,
      children);
   });
   var hkern = F2(function (attributes,
   children) {
      return A3(svgNode,
      "hkern",
      attributes,
      children);
   });
   var vkern = F2(function (attributes,
   children) {
      return A3(svgNode,
      "vkern",
      attributes,
      children);
   });
   var linearGradient = F2(function (attributes,
   children) {
      return A3(svgNode,
      "linearGradient",
      attributes,
      children);
   });
   var radialGradient = F2(function (attributes,
   children) {
      return A3(svgNode,
      "radialGradient",
      attributes,
      children);
   });
   var stop = F2(function (attributes,
   children) {
      return A3(svgNode,
      "stop",
      attributes,
      children);
   });
   var circle = F2(function (attributes,
   children) {
      return A3(svgNode,
      "circle",
      attributes,
      children);
   });
   var ellipse = F2(function (attributes,
   children) {
      return A3(svgNode,
      "ellipse",
      attributes,
      children);
   });
   var image = F2(function (attributes,
   children) {
      return A3(svgNode,
      "image",
      attributes,
      children);
   });
   var line = F2(function (attributes,
   children) {
      return A3(svgNode,
      "line",
      attributes,
      children);
   });
   var path = F2(function (attributes,
   children) {
      return A3(svgNode,
      "path",
      attributes,
      children);
   });
   var polygon = F2(function (attributes,
   children) {
      return A3(svgNode,
      "polygon",
      attributes,
      children);
   });
   var polyline = F2(function (attributes,
   children) {
      return A3(svgNode,
      "polyline",
      attributes,
      children);
   });
   var rect = F2(function (attributes,
   children) {
      return A3(svgNode,
      "rect",
      attributes,
      children);
   });
   var use = F2(function (attributes,
   children) {
      return A3(svgNode,
      "use",
      attributes,
      children);
   });
   var feDistantLight = F2(function (attributes,
   children) {
      return A3(svgNode,
      "feDistantLight",
      attributes,
      children);
   });
   var fePointLight = F2(function (attributes,
   children) {
      return A3(svgNode,
      "fePointLight",
      attributes,
      children);
   });
   var feSpotLight = F2(function (attributes,
   children) {
      return A3(svgNode,
      "feSpotLight",
      attributes,
      children);
   });
   var altGlyph = F2(function (attributes,
   children) {
      return A3(svgNode,
      "altGlyph",
      attributes,
      children);
   });
   var altGlyphDef = F2(function (attributes,
   children) {
      return A3(svgNode,
      "altGlyphDef",
      attributes,
      children);
   });
   var altGlyphItem = F2(function (attributes,
   children) {
      return A3(svgNode,
      "altGlyphItem",
      attributes,
      children);
   });
   var glyph = F2(function (attributes,
   children) {
      return A3(svgNode,
      "glyph",
      attributes,
      children);
   });
   var glyphRef = F2(function (attributes,
   children) {
      return A3(svgNode,
      "glyphRef",
      attributes,
      children);
   });
   var textPath = F2(function (attributes,
   children) {
      return A3(svgNode,
      "textPath",
      attributes,
      children);
   });
   var text = F2(function (attributes,
   children) {
      return A3(svgNode,
      "text",
      attributes,
      children);
   });
   var tref = F2(function (attributes,
   children) {
      return A3(svgNode,
      "tref",
      attributes,
      children);
   });
   var tspan = F2(function (attributes,
   children) {
      return A3(svgNode,
      "tspan",
      attributes,
      children);
   });
   var clipPath = F2(function (attributes,
   children) {
      return A3(svgNode,
      "clipPath",
      attributes,
      children);
   });
   var colorProfile = F2(function (attributes,
   children) {
      return A3(svgNode,
      "colorProfile",
      attributes,
      children);
   });
   var cursor = F2(function (attributes,
   children) {
      return A3(svgNode,
      "cursor",
      attributes,
      children);
   });
   var filter = F2(function (attributes,
   children) {
      return A3(svgNode,
      "filter",
      attributes,
      children);
   });
   var script = F2(function (attributes,
   children) {
      return A3(svgNode,
      "script",
      attributes,
      children);
   });
   var style = F2(function (attributes,
   children) {
      return A3(svgNode,
      "style",
      attributes,
      children);
   });
   var view = F2(function (attributes,
   children) {
      return A3(svgNode,
      "view",
      attributes,
      children);
   });
   _elm.Svg.values = {_op: _op
                     ,svgNamespace: svgNamespace
                     ,svgNode: svgNode
                     ,svg: svg
                     ,foreignObject: foreignObject
                     ,animate: animate
                     ,animateColor: animateColor
                     ,animateMotion: animateMotion
                     ,animateTransform: animateTransform
                     ,mpath: mpath
                     ,set: set
                     ,a: a
                     ,defs: defs
                     ,g: g
                     ,marker: marker
                     ,mask: mask
                     ,missingGlyph: missingGlyph
                     ,pattern: pattern
                     ,$switch: $switch
                     ,symbol: symbol
                     ,desc: desc
                     ,metadata: metadata
                     ,title: title
                     ,feBlend: feBlend
                     ,feColorMatrix: feColorMatrix
                     ,feComponentTransfer: feComponentTransfer
                     ,feComposite: feComposite
                     ,feConvolveMatrix: feConvolveMatrix
                     ,feDiffuseLighting: feDiffuseLighting
                     ,feDisplacementMap: feDisplacementMap
                     ,feFlood: feFlood
                     ,feFuncA: feFuncA
                     ,feFuncB: feFuncB
                     ,feFuncG: feFuncG
                     ,feFuncR: feFuncR
                     ,feGaussianBlur: feGaussianBlur
                     ,feImage: feImage
                     ,feMerge: feMerge
                     ,feMergeNode: feMergeNode
                     ,feMorphology: feMorphology
                     ,feOffset: feOffset
                     ,feSpecularLighting: feSpecularLighting
                     ,feTile: feTile
                     ,feTurbulence: feTurbulence
                     ,font: font
                     ,fontFace: fontFace
                     ,fontFaceFormat: fontFaceFormat
                     ,fontFaceName: fontFaceName
                     ,fontFaceSrc: fontFaceSrc
                     ,fontFaceUri: fontFaceUri
                     ,hkern: hkern
                     ,vkern: vkern
                     ,linearGradient: linearGradient
                     ,radialGradient: radialGradient
                     ,stop: stop
                     ,circle: circle
                     ,ellipse: ellipse
                     ,image: image
                     ,line: line
                     ,path: path
                     ,polygon: polygon
                     ,polyline: polyline
                     ,rect: rect
                     ,use: use
                     ,feDistantLight: feDistantLight
                     ,fePointLight: fePointLight
                     ,feSpotLight: feSpotLight
                     ,altGlyph: altGlyph
                     ,altGlyphDef: altGlyphDef
                     ,altGlyphItem: altGlyphItem
                     ,glyph: glyph
                     ,glyphRef: glyphRef
                     ,textPath: textPath
                     ,text: text
                     ,tref: tref
                     ,tspan: tspan
                     ,clipPath: clipPath
                     ,colorProfile: colorProfile
                     ,cursor: cursor
                     ,filter: filter
                     ,script: script
                     ,style: style
                     ,view: view};
   return _elm.Svg.values;
};
Elm.Svg = Elm.Svg || {};
Elm.Svg.Attributes = Elm.Svg.Attributes || {};
Elm.Svg.Attributes.make = function (_elm) {
   "use strict";
   _elm.Svg = _elm.Svg || {};
   _elm.Svg.Attributes = _elm.Svg.Attributes || {};
   if (_elm.Svg.Attributes.values)
   return _elm.Svg.Attributes.values;
   var _op = {},
   _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   $moduleName = "Svg.Attributes",
   $Basics = Elm.Basics.make(_elm),
   $List = Elm.List.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Result = Elm.Result.make(_elm),
   $Signal = Elm.Signal.make(_elm),
   $Svg = Elm.Svg.make(_elm),
   $VirtualDom = Elm.VirtualDom.make(_elm);
   var writingMode = function (value) {
      return A2($VirtualDom.attribute,
      "writing-mode",
      value);
   };
   var wordSpacing = function (value) {
      return A2($VirtualDom.attribute,
      "word-spacing",
      value);
   };
   var visibility = function (value) {
      return A2($VirtualDom.attribute,
      "visibility",
      value);
   };
   var unicodeBidi = function (value) {
      return A2($VirtualDom.attribute,
      "unicode-bidi",
      value);
   };
   var textRendering = function (value) {
      return A2($VirtualDom.attribute,
      "text-rendering",
      value);
   };
   var textDecoration = function (value) {
      return A2($VirtualDom.attribute,
      "text-decoration",
      value);
   };
   var textAnchor = function (value) {
      return A2($VirtualDom.attribute,
      "text-anchor",
      value);
   };
   var stroke = function (value) {
      return A2($VirtualDom.attribute,
      "stroke",
      value);
   };
   var strokeWidth = function (value) {
      return A2($VirtualDom.attribute,
      "stroke-width",
      value);
   };
   var strokeOpacity = function (value) {
      return A2($VirtualDom.attribute,
      "stroke-opacity",
      value);
   };
   var strokeMiterlimit = function (value) {
      return A2($VirtualDom.attribute,
      "stroke-miterlimit",
      value);
   };
   var strokeLinejoin = function (value) {
      return A2($VirtualDom.attribute,
      "stroke-linejoin",
      value);
   };
   var strokeLinecap = function (value) {
      return A2($VirtualDom.attribute,
      "stroke-linecap",
      value);
   };
   var strokeDashoffset = function (value) {
      return A2($VirtualDom.attribute,
      "stroke-dashoffset",
      value);
   };
   var strokeDasharray = function (value) {
      return A2($VirtualDom.attribute,
      "stroke-dasharray",
      value);
   };
   var stopOpacity = function (value) {
      return A2($VirtualDom.attribute,
      "stop-opacity",
      value);
   };
   var stopColor = function (value) {
      return A2($VirtualDom.attribute,
      "stop-color",
      value);
   };
   var shapeRendering = function (value) {
      return A2($VirtualDom.attribute,
      "shape-rendering",
      value);
   };
   var pointerEvents = function (value) {
      return A2($VirtualDom.attribute,
      "pointer-events",
      value);
   };
   var overflow = function (value) {
      return A2($VirtualDom.attribute,
      "overflow",
      value);
   };
   var opacity = function (value) {
      return A2($VirtualDom.attribute,
      "opacity",
      value);
   };
   var mask = function (value) {
      return A2($VirtualDom.attribute,
      "mask",
      value);
   };
   var markerStart = function (value) {
      return A2($VirtualDom.attribute,
      "marker-start",
      value);
   };
   var markerMid = function (value) {
      return A2($VirtualDom.attribute,
      "marker-mid",
      value);
   };
   var markerEnd = function (value) {
      return A2($VirtualDom.attribute,
      "marker-end",
      value);
   };
   var lightingColor = function (value) {
      return A2($VirtualDom.attribute,
      "lighting-color",
      value);
   };
   var letterSpacing = function (value) {
      return A2($VirtualDom.attribute,
      "letter-spacing",
      value);
   };
   var kerning = function (value) {
      return A2($VirtualDom.attribute,
      "kerning",
      value);
   };
   var imageRendering = function (value) {
      return A2($VirtualDom.attribute,
      "image-rendering",
      value);
   };
   var glyphOrientationVertical = function (value) {
      return A2($VirtualDom.attribute,
      "glyph-orientation-vertical",
      value);
   };
   var glyphOrientationHorizontal = function (value) {
      return A2($VirtualDom.attribute,
      "glyph-orientation-horizontal",
      value);
   };
   var fontWeight = function (value) {
      return A2($VirtualDom.attribute,
      "font-weight",
      value);
   };
   var fontVariant = function (value) {
      return A2($VirtualDom.attribute,
      "font-variant",
      value);
   };
   var fontStyle = function (value) {
      return A2($VirtualDom.attribute,
      "font-style",
      value);
   };
   var fontStretch = function (value) {
      return A2($VirtualDom.attribute,
      "font-stretch",
      value);
   };
   var fontSize = function (value) {
      return A2($VirtualDom.attribute,
      "font-size",
      value);
   };
   var fontSizeAdjust = function (value) {
      return A2($VirtualDom.attribute,
      "font-size-adjust",
      value);
   };
   var fontFamily = function (value) {
      return A2($VirtualDom.attribute,
      "font-family",
      value);
   };
   var floodOpacity = function (value) {
      return A2($VirtualDom.attribute,
      "flood-opacity",
      value);
   };
   var floodColor = function (value) {
      return A2($VirtualDom.attribute,
      "flood-color",
      value);
   };
   var filter = function (value) {
      return A2($VirtualDom.attribute,
      "filter",
      value);
   };
   var fill = function (value) {
      return A2($VirtualDom.attribute,
      "fill",
      value);
   };
   var fillRule = function (value) {
      return A2($VirtualDom.attribute,
      "fill-rule",
      value);
   };
   var fillOpacity = function (value) {
      return A2($VirtualDom.attribute,
      "fill-opacity",
      value);
   };
   var enableBackground = function (value) {
      return A2($VirtualDom.attribute,
      "enable-background",
      value);
   };
   var dominantBaseline = function (value) {
      return A2($VirtualDom.attribute,
      "dominant-baseline",
      value);
   };
   var display = function (value) {
      return A2($VirtualDom.attribute,
      "display",
      value);
   };
   var direction = function (value) {
      return A2($VirtualDom.attribute,
      "direction",
      value);
   };
   var cursor = function (value) {
      return A2($VirtualDom.attribute,
      "cursor",
      value);
   };
   var color = function (value) {
      return A2($VirtualDom.attribute,
      "color",
      value);
   };
   var colorRendering = function (value) {
      return A2($VirtualDom.attribute,
      "color-rendering",
      value);
   };
   var colorProfile = function (value) {
      return A2($VirtualDom.attribute,
      "color-profile",
      value);
   };
   var colorInterpolation = function (value) {
      return A2($VirtualDom.attribute,
      "color-interpolation",
      value);
   };
   var colorInterpolationFilters = function (value) {
      return A2($VirtualDom.attribute,
      "color-interpolation-filters",
      value);
   };
   var clip = function (value) {
      return A2($VirtualDom.attribute,
      "clip",
      value);
   };
   var clipRule = function (value) {
      return A2($VirtualDom.attribute,
      "clip-rule",
      value);
   };
   var clipPath = function (value) {
      return A2($VirtualDom.attribute,
      "clip-path",
      value);
   };
   var baselineShift = function (value) {
      return A2($VirtualDom.attribute,
      "baseline-shift",
      value);
   };
   var alignmentBaseline = function (value) {
      return A2($VirtualDom.attribute,
      "alignment-baseline",
      value);
   };
   var zoomAndPan = function (value) {
      return A2($VirtualDom.attribute,
      "zoomAndPan",
      value);
   };
   var z = function (value) {
      return A2($VirtualDom.attribute,
      "z",
      value);
   };
   var yChannelSelector = function (value) {
      return A2($VirtualDom.attribute,
      "yChannelSelector",
      value);
   };
   var y2 = function (value) {
      return A2($VirtualDom.attribute,
      "y2",
      value);
   };
   var y1 = function (value) {
      return A2($VirtualDom.attribute,
      "y1",
      value);
   };
   var y = function (value) {
      return A2($VirtualDom.attribute,
      "y",
      value);
   };
   var xmlSpace = function (value) {
      return A2($VirtualDom.attribute,
      "xml:space",
      value);
   };
   var xmlLang = function (value) {
      return A2($VirtualDom.attribute,
      "xml:lang",
      value);
   };
   var xmlBase = function (value) {
      return A2($VirtualDom.attribute,
      "xml:base",
      value);
   };
   var xlinkType = function (value) {
      return A2($VirtualDom.attribute,
      "xlink:type",
      value);
   };
   var xlinkTitle = function (value) {
      return A2($VirtualDom.attribute,
      "xlink:title",
      value);
   };
   var xlinkShow = function (value) {
      return A2($VirtualDom.attribute,
      "xlink:show",
      value);
   };
   var xlinkRole = function (value) {
      return A2($VirtualDom.attribute,
      "xlink:role",
      value);
   };
   var xlinkHref = function (value) {
      return A2($VirtualDom.attribute,
      "xlink:href",
      value);
   };
   var xlinkArcrole = function (value) {
      return A2($VirtualDom.attribute,
      "xlink:arcrole",
      value);
   };
   var xlinkActuate = function (value) {
      return A2($VirtualDom.attribute,
      "xlink:actuate",
      value);
   };
   var xChannelSelector = function (value) {
      return A2($VirtualDom.attribute,
      "xChannelSelector",
      value);
   };
   var x2 = function (value) {
      return A2($VirtualDom.attribute,
      "x2",
      value);
   };
   var x1 = function (value) {
      return A2($VirtualDom.attribute,
      "x1",
      value);
   };
   var xHeight = function (value) {
      return A2($VirtualDom.attribute,
      "x-height",
      value);
   };
   var x = function (value) {
      return A2($VirtualDom.attribute,
      "x",
      value);
   };
   var widths = function (value) {
      return A2($VirtualDom.attribute,
      "widths",
      value);
   };
   var width = function (value) {
      return A2($VirtualDom.attribute,
      "width",
      value);
   };
   var viewTarget = function (value) {
      return A2($VirtualDom.attribute,
      "viewTarget",
      value);
   };
   var viewBox = function (value) {
      return A2($VirtualDom.attribute,
      "viewBox",
      value);
   };
   var vertOriginY = function (value) {
      return A2($VirtualDom.attribute,
      "vert-origin-y",
      value);
   };
   var vertOriginX = function (value) {
      return A2($VirtualDom.attribute,
      "vert-origin-x",
      value);
   };
   var vertAdvY = function (value) {
      return A2($VirtualDom.attribute,
      "vert-adv-y",
      value);
   };
   var version = function (value) {
      return A2($VirtualDom.attribute,
      "version",
      value);
   };
   var values = function (value) {
      return A2($VirtualDom.attribute,
      "values",
      value);
   };
   var vMathematical = function (value) {
      return A2($VirtualDom.attribute,
      "v-mathematical",
      value);
   };
   var vIdeographic = function (value) {
      return A2($VirtualDom.attribute,
      "v-ideographic",
      value);
   };
   var vHanging = function (value) {
      return A2($VirtualDom.attribute,
      "v-hanging",
      value);
   };
   var vAlphabetic = function (value) {
      return A2($VirtualDom.attribute,
      "v-alphabetic",
      value);
   };
   var unitsPerEm = function (value) {
      return A2($VirtualDom.attribute,
      "units-per-em",
      value);
   };
   var unicodeRange = function (value) {
      return A2($VirtualDom.attribute,
      "unicode-range",
      value);
   };
   var unicode = function (value) {
      return A2($VirtualDom.attribute,
      "unicode",
      value);
   };
   var underlineThickness = function (value) {
      return A2($VirtualDom.attribute,
      "underline-thickness",
      value);
   };
   var underlinePosition = function (value) {
      return A2($VirtualDom.attribute,
      "underline-position",
      value);
   };
   var u2 = function (value) {
      return A2($VirtualDom.attribute,
      "u2",
      value);
   };
   var u1 = function (value) {
      return A2($VirtualDom.attribute,
      "u1",
      value);
   };
   var type$ = function (value) {
      return A2($VirtualDom.attribute,
      "type",
      value);
   };
   var transform = function (value) {
      return A2($VirtualDom.attribute,
      "transform",
      value);
   };
   var to = function (value) {
      return A2($VirtualDom.attribute,
      "to",
      value);
   };
   var title = function (value) {
      return A2($VirtualDom.attribute,
      "title",
      value);
   };
   var textLength = function (value) {
      return A2($VirtualDom.attribute,
      "textLength",
      value);
   };
   var targetY = function (value) {
      return A2($VirtualDom.attribute,
      "targetY",
      value);
   };
   var targetX = function (value) {
      return A2($VirtualDom.attribute,
      "targetX",
      value);
   };
   var target = function (value) {
      return A2($VirtualDom.attribute,
      "target",
      value);
   };
   var tableValues = function (value) {
      return A2($VirtualDom.attribute,
      "tableValues",
      value);
   };
   var systemLanguage = function (value) {
      return A2($VirtualDom.attribute,
      "systemLanguage",
      value);
   };
   var surfaceScale = function (value) {
      return A2($VirtualDom.attribute,
      "surfaceScale",
      value);
   };
   var style = function (value) {
      return A2($VirtualDom.attribute,
      "style",
      value);
   };
   var string = function (value) {
      return A2($VirtualDom.attribute,
      "string",
      value);
   };
   var strikethroughThickness = function (value) {
      return A2($VirtualDom.attribute,
      "strikethrough-thickness",
      value);
   };
   var strikethroughPosition = function (value) {
      return A2($VirtualDom.attribute,
      "strikethrough-position",
      value);
   };
   var stitchTiles = function (value) {
      return A2($VirtualDom.attribute,
      "stitchTiles",
      value);
   };
   var stemv = function (value) {
      return A2($VirtualDom.attribute,
      "stemv",
      value);
   };
   var stemh = function (value) {
      return A2($VirtualDom.attribute,
      "stemh",
      value);
   };
   var stdDeviation = function (value) {
      return A2($VirtualDom.attribute,
      "stdDeviation",
      value);
   };
   var startOffset = function (value) {
      return A2($VirtualDom.attribute,
      "startOffset",
      value);
   };
   var spreadMethod = function (value) {
      return A2($VirtualDom.attribute,
      "spreadMethod",
      value);
   };
   var speed = function (value) {
      return A2($VirtualDom.attribute,
      "speed",
      value);
   };
   var specularExponent = function (value) {
      return A2($VirtualDom.attribute,
      "specularExponent",
      value);
   };
   var specularConstant = function (value) {
      return A2($VirtualDom.attribute,
      "specularConstant",
      value);
   };
   var spacing = function (value) {
      return A2($VirtualDom.attribute,
      "spacing",
      value);
   };
   var slope = function (value) {
      return A2($VirtualDom.attribute,
      "slope",
      value);
   };
   var seed = function (value) {
      return A2($VirtualDom.attribute,
      "seed",
      value);
   };
   var scale = function (value) {
      return A2($VirtualDom.attribute,
      "scale",
      value);
   };
   var ry = function (value) {
      return A2($VirtualDom.attribute,
      "ry",
      value);
   };
   var rx = function (value) {
      return A2($VirtualDom.attribute,
      "rx",
      value);
   };
   var rotate = function (value) {
      return A2($VirtualDom.attribute,
      "rotate",
      value);
   };
   var result = function (value) {
      return A2($VirtualDom.attribute,
      "result",
      value);
   };
   var restart = function (value) {
      return A2($VirtualDom.attribute,
      "restart",
      value);
   };
   var requiredFeatures = function (value) {
      return A2($VirtualDom.attribute,
      "requiredFeatures",
      value);
   };
   var requiredExtensions = function (value) {
      return A2($VirtualDom.attribute,
      "requiredExtensions",
      value);
   };
   var repeatDur = function (value) {
      return A2($VirtualDom.attribute,
      "repeatDur",
      value);
   };
   var repeatCount = function (value) {
      return A2($VirtualDom.attribute,
      "repeatCount",
      value);
   };
   var renderingIntent = function (value) {
      return A2($VirtualDom.attribute,
      "rendering-intent",
      value);
   };
   var refY = function (value) {
      return A2($VirtualDom.attribute,
      "refY",
      value);
   };
   var refX = function (value) {
      return A2($VirtualDom.attribute,
      "refX",
      value);
   };
   var radius = function (value) {
      return A2($VirtualDom.attribute,
      "radius",
      value);
   };
   var r = function (value) {
      return A2($VirtualDom.attribute,
      "r",
      value);
   };
   var primitiveUnits = function (value) {
      return A2($VirtualDom.attribute,
      "primitiveUnits",
      value);
   };
   var preserveAspectRatio = function (value) {
      return A2($VirtualDom.attribute,
      "preserveAspectRatio",
      value);
   };
   var preserveAlpha = function (value) {
      return A2($VirtualDom.attribute,
      "preserveAlpha",
      value);
   };
   var pointsAtZ = function (value) {
      return A2($VirtualDom.attribute,
      "pointsAtZ",
      value);
   };
   var pointsAtY = function (value) {
      return A2($VirtualDom.attribute,
      "pointsAtY",
      value);
   };
   var pointsAtX = function (value) {
      return A2($VirtualDom.attribute,
      "pointsAtX",
      value);
   };
   var points = function (value) {
      return A2($VirtualDom.attribute,
      "points",
      value);
   };
   var pointOrder = function (value) {
      return A2($VirtualDom.attribute,
      "point-order",
      value);
   };
   var patternUnits = function (value) {
      return A2($VirtualDom.attribute,
      "patternUnits",
      value);
   };
   var patternTransform = function (value) {
      return A2($VirtualDom.attribute,
      "patternTransform",
      value);
   };
   var patternContentUnits = function (value) {
      return A2($VirtualDom.attribute,
      "patternContentUnits",
      value);
   };
   var pathLength = function (value) {
      return A2($VirtualDom.attribute,
      "pathLength",
      value);
   };
   var path = function (value) {
      return A2($VirtualDom.attribute,
      "path",
      value);
   };
   var panose1 = function (value) {
      return A2($VirtualDom.attribute,
      "panose-1",
      value);
   };
   var overlineThickness = function (value) {
      return A2($VirtualDom.attribute,
      "overline-thickness",
      value);
   };
   var overlinePosition = function (value) {
      return A2($VirtualDom.attribute,
      "overline-position",
      value);
   };
   var origin = function (value) {
      return A2($VirtualDom.attribute,
      "origin",
      value);
   };
   var orientation = function (value) {
      return A2($VirtualDom.attribute,
      "orientation",
      value);
   };
   var orient = function (value) {
      return A2($VirtualDom.attribute,
      "orient",
      value);
   };
   var order = function (value) {
      return A2($VirtualDom.attribute,
      "order",
      value);
   };
   var operator = function (value) {
      return A2($VirtualDom.attribute,
      "operator",
      value);
   };
   var offset = function (value) {
      return A2($VirtualDom.attribute,
      "offset",
      value);
   };
   var numOctaves = function (value) {
      return A2($VirtualDom.attribute,
      "numOctaves",
      value);
   };
   var name = function (value) {
      return A2($VirtualDom.attribute,
      "name",
      value);
   };
   var mode = function (value) {
      return A2($VirtualDom.attribute,
      "mode",
      value);
   };
   var min = function (value) {
      return A2($VirtualDom.attribute,
      "min",
      value);
   };
   var method = function (value) {
      return A2($VirtualDom.attribute,
      "method",
      value);
   };
   var media = function (value) {
      return A2($VirtualDom.attribute,
      "media",
      value);
   };
   var max = function (value) {
      return A2($VirtualDom.attribute,
      "max",
      value);
   };
   var mathematical = function (value) {
      return A2($VirtualDom.attribute,
      "mathematical",
      value);
   };
   var maskUnits = function (value) {
      return A2($VirtualDom.attribute,
      "maskUnits",
      value);
   };
   var maskContentUnits = function (value) {
      return A2($VirtualDom.attribute,
      "maskContentUnits",
      value);
   };
   var markerWidth = function (value) {
      return A2($VirtualDom.attribute,
      "markerWidth",
      value);
   };
   var markerUnits = function (value) {
      return A2($VirtualDom.attribute,
      "markerUnits",
      value);
   };
   var markerHeight = function (value) {
      return A2($VirtualDom.attribute,
      "markerHeight",
      value);
   };
   var local = function (value) {
      return A2($VirtualDom.attribute,
      "local",
      value);
   };
   var limitingConeAngle = function (value) {
      return A2($VirtualDom.attribute,
      "limitingConeAngle",
      value);
   };
   var lengthAdjust = function (value) {
      return A2($VirtualDom.attribute,
      "lengthAdjust",
      value);
   };
   var lang = function (value) {
      return A2($VirtualDom.attribute,
      "lang",
      value);
   };
   var keyTimes = function (value) {
      return A2($VirtualDom.attribute,
      "keyTimes",
      value);
   };
   var keySplines = function (value) {
      return A2($VirtualDom.attribute,
      "keySplines",
      value);
   };
   var keyPoints = function (value) {
      return A2($VirtualDom.attribute,
      "keyPoints",
      value);
   };
   var kernelUnitLength = function (value) {
      return A2($VirtualDom.attribute,
      "kernelUnitLength",
      value);
   };
   var kernelMatrix = function (value) {
      return A2($VirtualDom.attribute,
      "kernelMatrix",
      value);
   };
   var k4 = function (value) {
      return A2($VirtualDom.attribute,
      "k4",
      value);
   };
   var k3 = function (value) {
      return A2($VirtualDom.attribute,
      "k3",
      value);
   };
   var k2 = function (value) {
      return A2($VirtualDom.attribute,
      "k2",
      value);
   };
   var k1 = function (value) {
      return A2($VirtualDom.attribute,
      "k1",
      value);
   };
   var k = function (value) {
      return A2($VirtualDom.attribute,
      "k",
      value);
   };
   var intercept = function (value) {
      return A2($VirtualDom.attribute,
      "intercept",
      value);
   };
   var in2 = function (value) {
      return A2($VirtualDom.attribute,
      "in2",
      value);
   };
   var in$ = function (value) {
      return A2($VirtualDom.attribute,
      "in",
      value);
   };
   var ideographic = function (value) {
      return A2($VirtualDom.attribute,
      "ideographic",
      value);
   };
   var id = function (value) {
      return A2($VirtualDom.attribute,
      "id",
      value);
   };
   var horizOriginY = function (value) {
      return A2($VirtualDom.attribute,
      "horiz-origin-y",
      value);
   };
   var horizOriginX = function (value) {
      return A2($VirtualDom.attribute,
      "horiz-origin-x",
      value);
   };
   var horizAdvX = function (value) {
      return A2($VirtualDom.attribute,
      "horiz-adv-x",
      value);
   };
   var height = function (value) {
      return A2($VirtualDom.attribute,
      "height",
      value);
   };
   var hanging = function (value) {
      return A2($VirtualDom.attribute,
      "hanging",
      value);
   };
   var gradientUnits = function (value) {
      return A2($VirtualDom.attribute,
      "gradientUnits",
      value);
   };
   var gradientTransform = function (value) {
      return A2($VirtualDom.attribute,
      "gradientTransform",
      value);
   };
   var glyphRef = function (value) {
      return A2($VirtualDom.attribute,
      "glyphRef",
      value);
   };
   var glyphName = function (value) {
      return A2($VirtualDom.attribute,
      "glyph-name",
      value);
   };
   var g2 = function (value) {
      return A2($VirtualDom.attribute,
      "g2",
      value);
   };
   var g1 = function (value) {
      return A2($VirtualDom.attribute,
      "g1",
      value);
   };
   var fy = function (value) {
      return A2($VirtualDom.attribute,
      "fy",
      value);
   };
   var fx = function (value) {
      return A2($VirtualDom.attribute,
      "fx",
      value);
   };
   var from = function (value) {
      return A2($VirtualDom.attribute,
      "from",
      value);
   };
   var format = function (value) {
      return A2($VirtualDom.attribute,
      "format",
      value);
   };
   var filterUnits = function (value) {
      return A2($VirtualDom.attribute,
      "filterUnits",
      value);
   };
   var filterRes = function (value) {
      return A2($VirtualDom.attribute,
      "filterRes",
      value);
   };
   var externalResourcesRequired = function (value) {
      return A2($VirtualDom.attribute,
      "externalResourcesRequired",
      value);
   };
   var exponent = function (value) {
      return A2($VirtualDom.attribute,
      "exponent",
      value);
   };
   var end = function (value) {
      return A2($VirtualDom.attribute,
      "end",
      value);
   };
   var elevation = function (value) {
      return A2($VirtualDom.attribute,
      "elevation",
      value);
   };
   var edgeMode = function (value) {
      return A2($VirtualDom.attribute,
      "edgeMode",
      value);
   };
   var dy = function (value) {
      return A2($VirtualDom.attribute,
      "dy",
      value);
   };
   var dx = function (value) {
      return A2($VirtualDom.attribute,
      "dx",
      value);
   };
   var dur = function (value) {
      return A2($VirtualDom.attribute,
      "dur",
      value);
   };
   var divisor = function (value) {
      return A2($VirtualDom.attribute,
      "divisor",
      value);
   };
   var diffuseConstant = function (value) {
      return A2($VirtualDom.attribute,
      "diffuseConstant",
      value);
   };
   var descent = function (value) {
      return A2($VirtualDom.attribute,
      "descent",
      value);
   };
   var decelerate = function (value) {
      return A2($VirtualDom.attribute,
      "decelerate",
      value);
   };
   var d = function (value) {
      return A2($VirtualDom.attribute,
      "d",
      value);
   };
   var cy = function (value) {
      return A2($VirtualDom.attribute,
      "cy",
      value);
   };
   var cx = function (value) {
      return A2($VirtualDom.attribute,
      "cx",
      value);
   };
   var contentStyleType = function (value) {
      return A2($VirtualDom.attribute,
      "contentStyleType",
      value);
   };
   var contentScriptType = function (value) {
      return A2($VirtualDom.attribute,
      "contentScriptType",
      value);
   };
   var clipPathUnits = function (value) {
      return A2($VirtualDom.attribute,
      "clipPathUnits",
      value);
   };
   var $class = function (value) {
      return A2($VirtualDom.attribute,
      "class",
      value);
   };
   var capHeight = function (value) {
      return A2($VirtualDom.attribute,
      "cap-height",
      value);
   };
   var calcMode = function (value) {
      return A2($VirtualDom.attribute,
      "calcMode",
      value);
   };
   var by = function (value) {
      return A2($VirtualDom.attribute,
      "by",
      value);
   };
   var bias = function (value) {
      return A2($VirtualDom.attribute,
      "bias",
      value);
   };
   var begin = function (value) {
      return A2($VirtualDom.attribute,
      "begin",
      value);
   };
   var bbox = function (value) {
      return A2($VirtualDom.attribute,
      "bbox",
      value);
   };
   var baseProfile = function (value) {
      return A2($VirtualDom.attribute,
      "baseProfile",
      value);
   };
   var baseFrequency = function (value) {
      return A2($VirtualDom.attribute,
      "baseFrequency",
      value);
   };
   var azimuth = function (value) {
      return A2($VirtualDom.attribute,
      "azimuth",
      value);
   };
   var autoReverse = function (value) {
      return A2($VirtualDom.attribute,
      "autoReverse",
      value);
   };
   var attributeType = function (value) {
      return A2($VirtualDom.attribute,
      "attributeType",
      value);
   };
   var attributeName = function (value) {
      return A2($VirtualDom.attribute,
      "attributeName",
      value);
   };
   var ascent = function (value) {
      return A2($VirtualDom.attribute,
      "ascent",
      value);
   };
   var arabicForm = function (value) {
      return A2($VirtualDom.attribute,
      "arabic-form",
      value);
   };
   var amplitude = function (value) {
      return A2($VirtualDom.attribute,
      "amplitude",
      value);
   };
   var allowReorder = function (value) {
      return A2($VirtualDom.attribute,
      "allowReorder",
      value);
   };
   var alphabetic = function (value) {
      return A2($VirtualDom.attribute,
      "alphabetic",
      value);
   };
   var additive = function (value) {
      return A2($VirtualDom.attribute,
      "additive",
      value);
   };
   var accumulate = function (value) {
      return A2($VirtualDom.attribute,
      "accumulate",
      value);
   };
   var accelerate = function (value) {
      return A2($VirtualDom.attribute,
      "accelerate",
      value);
   };
   var accentHeight = function (value) {
      return A2($VirtualDom.attribute,
      "accent-height",
      value);
   };
   _elm.Svg.Attributes.values = {_op: _op
                                ,accentHeight: accentHeight
                                ,accelerate: accelerate
                                ,accumulate: accumulate
                                ,additive: additive
                                ,alphabetic: alphabetic
                                ,allowReorder: allowReorder
                                ,amplitude: amplitude
                                ,arabicForm: arabicForm
                                ,ascent: ascent
                                ,attributeName: attributeName
                                ,attributeType: attributeType
                                ,autoReverse: autoReverse
                                ,azimuth: azimuth
                                ,baseFrequency: baseFrequency
                                ,baseProfile: baseProfile
                                ,bbox: bbox
                                ,begin: begin
                                ,bias: bias
                                ,by: by
                                ,calcMode: calcMode
                                ,capHeight: capHeight
                                ,$class: $class
                                ,clipPathUnits: clipPathUnits
                                ,contentScriptType: contentScriptType
                                ,contentStyleType: contentStyleType
                                ,cx: cx
                                ,cy: cy
                                ,d: d
                                ,decelerate: decelerate
                                ,descent: descent
                                ,diffuseConstant: diffuseConstant
                                ,divisor: divisor
                                ,dur: dur
                                ,dx: dx
                                ,dy: dy
                                ,edgeMode: edgeMode
                                ,elevation: elevation
                                ,end: end
                                ,exponent: exponent
                                ,externalResourcesRequired: externalResourcesRequired
                                ,filterRes: filterRes
                                ,filterUnits: filterUnits
                                ,format: format
                                ,from: from
                                ,fx: fx
                                ,fy: fy
                                ,g1: g1
                                ,g2: g2
                                ,glyphName: glyphName
                                ,glyphRef: glyphRef
                                ,gradientTransform: gradientTransform
                                ,gradientUnits: gradientUnits
                                ,hanging: hanging
                                ,height: height
                                ,horizAdvX: horizAdvX
                                ,horizOriginX: horizOriginX
                                ,horizOriginY: horizOriginY
                                ,id: id
                                ,ideographic: ideographic
                                ,in$: in$
                                ,in2: in2
                                ,intercept: intercept
                                ,k: k
                                ,k1: k1
                                ,k2: k2
                                ,k3: k3
                                ,k4: k4
                                ,kernelMatrix: kernelMatrix
                                ,kernelUnitLength: kernelUnitLength
                                ,keyPoints: keyPoints
                                ,keySplines: keySplines
                                ,keyTimes: keyTimes
                                ,lang: lang
                                ,lengthAdjust: lengthAdjust
                                ,limitingConeAngle: limitingConeAngle
                                ,local: local
                                ,markerHeight: markerHeight
                                ,markerUnits: markerUnits
                                ,markerWidth: markerWidth
                                ,maskContentUnits: maskContentUnits
                                ,maskUnits: maskUnits
                                ,mathematical: mathematical
                                ,max: max
                                ,media: media
                                ,method: method
                                ,min: min
                                ,mode: mode
                                ,name: name
                                ,numOctaves: numOctaves
                                ,offset: offset
                                ,operator: operator
                                ,order: order
                                ,orient: orient
                                ,orientation: orientation
                                ,origin: origin
                                ,overlinePosition: overlinePosition
                                ,overlineThickness: overlineThickness
                                ,panose1: panose1
                                ,path: path
                                ,pathLength: pathLength
                                ,patternContentUnits: patternContentUnits
                                ,patternTransform: patternTransform
                                ,patternUnits: patternUnits
                                ,pointOrder: pointOrder
                                ,points: points
                                ,pointsAtX: pointsAtX
                                ,pointsAtY: pointsAtY
                                ,pointsAtZ: pointsAtZ
                                ,preserveAlpha: preserveAlpha
                                ,preserveAspectRatio: preserveAspectRatio
                                ,primitiveUnits: primitiveUnits
                                ,r: r
                                ,radius: radius
                                ,refX: refX
                                ,refY: refY
                                ,renderingIntent: renderingIntent
                                ,repeatCount: repeatCount
                                ,repeatDur: repeatDur
                                ,requiredExtensions: requiredExtensions
                                ,requiredFeatures: requiredFeatures
                                ,restart: restart
                                ,result: result
                                ,rotate: rotate
                                ,rx: rx
                                ,ry: ry
                                ,scale: scale
                                ,seed: seed
                                ,slope: slope
                                ,spacing: spacing
                                ,specularConstant: specularConstant
                                ,specularExponent: specularExponent
                                ,speed: speed
                                ,spreadMethod: spreadMethod
                                ,startOffset: startOffset
                                ,stdDeviation: stdDeviation
                                ,stemh: stemh
                                ,stemv: stemv
                                ,stitchTiles: stitchTiles
                                ,strikethroughPosition: strikethroughPosition
                                ,strikethroughThickness: strikethroughThickness
                                ,string: string
                                ,style: style
                                ,surfaceScale: surfaceScale
                                ,systemLanguage: systemLanguage
                                ,tableValues: tableValues
                                ,target: target
                                ,targetX: targetX
                                ,targetY: targetY
                                ,textLength: textLength
                                ,title: title
                                ,to: to
                                ,transform: transform
                                ,type$: type$
                                ,u1: u1
                                ,u2: u2
                                ,underlinePosition: underlinePosition
                                ,underlineThickness: underlineThickness
                                ,unicode: unicode
                                ,unicodeRange: unicodeRange
                                ,unitsPerEm: unitsPerEm
                                ,vAlphabetic: vAlphabetic
                                ,vHanging: vHanging
                                ,vIdeographic: vIdeographic
                                ,vMathematical: vMathematical
                                ,values: values
                                ,version: version
                                ,vertAdvY: vertAdvY
                                ,vertOriginX: vertOriginX
                                ,vertOriginY: vertOriginY
                                ,viewBox: viewBox
                                ,viewTarget: viewTarget
                                ,width: width
                                ,widths: widths
                                ,x: x
                                ,xHeight: xHeight
                                ,x1: x1
                                ,x2: x2
                                ,xChannelSelector: xChannelSelector
                                ,xlinkActuate: xlinkActuate
                                ,xlinkArcrole: xlinkArcrole
                                ,xlinkHref: xlinkHref
                                ,xlinkRole: xlinkRole
                                ,xlinkShow: xlinkShow
                                ,xlinkTitle: xlinkTitle
                                ,xlinkType: xlinkType
                                ,xmlBase: xmlBase
                                ,xmlLang: xmlLang
                                ,xmlSpace: xmlSpace
                                ,y: y
                                ,y1: y1
                                ,y2: y2
                                ,yChannelSelector: yChannelSelector
                                ,z: z
                                ,zoomAndPan: zoomAndPan
                                ,alignmentBaseline: alignmentBaseline
                                ,baselineShift: baselineShift
                                ,clipPath: clipPath
                                ,clipRule: clipRule
                                ,clip: clip
                                ,colorInterpolationFilters: colorInterpolationFilters
                                ,colorInterpolation: colorInterpolation
                                ,colorProfile: colorProfile
                                ,colorRendering: colorRendering
                                ,color: color
                                ,cursor: cursor
                                ,direction: direction
                                ,display: display
                                ,dominantBaseline: dominantBaseline
                                ,enableBackground: enableBackground
                                ,fillOpacity: fillOpacity
                                ,fillRule: fillRule
                                ,fill: fill
                                ,filter: filter
                                ,floodColor: floodColor
                                ,floodOpacity: floodOpacity
                                ,fontFamily: fontFamily
                                ,fontSizeAdjust: fontSizeAdjust
                                ,fontSize: fontSize
                                ,fontStretch: fontStretch
                                ,fontStyle: fontStyle
                                ,fontVariant: fontVariant
                                ,fontWeight: fontWeight
                                ,glyphOrientationHorizontal: glyphOrientationHorizontal
                                ,glyphOrientationVertical: glyphOrientationVertical
                                ,imageRendering: imageRendering
                                ,kerning: kerning
                                ,letterSpacing: letterSpacing
                                ,lightingColor: lightingColor
                                ,markerEnd: markerEnd
                                ,markerMid: markerMid
                                ,markerStart: markerStart
                                ,mask: mask
                                ,opacity: opacity
                                ,overflow: overflow
                                ,pointerEvents: pointerEvents
                                ,shapeRendering: shapeRendering
                                ,stopColor: stopColor
                                ,stopOpacity: stopOpacity
                                ,strokeDasharray: strokeDasharray
                                ,strokeDashoffset: strokeDashoffset
                                ,strokeLinecap: strokeLinecap
                                ,strokeLinejoin: strokeLinejoin
                                ,strokeMiterlimit: strokeMiterlimit
                                ,strokeOpacity: strokeOpacity
                                ,strokeWidth: strokeWidth
                                ,stroke: stroke
                                ,textAnchor: textAnchor
                                ,textDecoration: textDecoration
                                ,textRendering: textRendering
                                ,unicodeBidi: unicodeBidi
                                ,visibility: visibility
                                ,wordSpacing: wordSpacing
                                ,writingMode: writingMode};
   return _elm.Svg.Attributes.values;
};
Elm.Task = Elm.Task || {};
Elm.Task.make = function (_elm) {
   "use strict";
   _elm.Task = _elm.Task || {};
   if (_elm.Task.values)
   return _elm.Task.values;
   var _op = {},
   _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   $moduleName = "Task",
   $List = Elm.List.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Native$Task = Elm.Native.Task.make(_elm),
   $Result = Elm.Result.make(_elm);
   var sleep = $Native$Task.sleep;
   var spawn = $Native$Task.spawn;
   var ThreadID = function (a) {
      return {ctor: "ThreadID"
             ,_0: a};
   };
   var onError = $Native$Task.catch_;
   var andThen = $Native$Task.andThen;
   var fail = $Native$Task.fail;
   var mapError = F2(function (f,
   promise) {
      return A2(onError,
      promise,
      function (err) {
         return fail(f(err));
      });
   });
   var succeed = $Native$Task.succeed;
   var map = F2(function (func,
   promiseA) {
      return A2(andThen,
      promiseA,
      function (a) {
         return succeed(func(a));
      });
   });
   var map2 = F3(function (func,
   promiseA,
   promiseB) {
      return A2(andThen,
      promiseA,
      function (a) {
         return A2(andThen,
         promiseB,
         function (b) {
            return succeed(A2(func,a,b));
         });
      });
   });
   var map3 = F4(function (func,
   promiseA,
   promiseB,
   promiseC) {
      return A2(andThen,
      promiseA,
      function (a) {
         return A2(andThen,
         promiseB,
         function (b) {
            return A2(andThen,
            promiseC,
            function (c) {
               return succeed(A3(func,
               a,
               b,
               c));
            });
         });
      });
   });
   var map4 = F5(function (func,
   promiseA,
   promiseB,
   promiseC,
   promiseD) {
      return A2(andThen,
      promiseA,
      function (a) {
         return A2(andThen,
         promiseB,
         function (b) {
            return A2(andThen,
            promiseC,
            function (c) {
               return A2(andThen,
               promiseD,
               function (d) {
                  return succeed(A4(func,
                  a,
                  b,
                  c,
                  d));
               });
            });
         });
      });
   });
   var map5 = F6(function (func,
   promiseA,
   promiseB,
   promiseC,
   promiseD,
   promiseE) {
      return A2(andThen,
      promiseA,
      function (a) {
         return A2(andThen,
         promiseB,
         function (b) {
            return A2(andThen,
            promiseC,
            function (c) {
               return A2(andThen,
               promiseD,
               function (d) {
                  return A2(andThen,
                  promiseE,
                  function (e) {
                     return succeed(A5(func,
                     a,
                     b,
                     c,
                     d,
                     e));
                  });
               });
            });
         });
      });
   });
   var andMap = F2(function (promiseFunc,
   promiseValue) {
      return A2(andThen,
      promiseFunc,
      function (func) {
         return A2(andThen,
         promiseValue,
         function (value) {
            return succeed(func(value));
         });
      });
   });
   var sequence = function (promises) {
      return function () {
         switch (promises.ctor)
         {case "::": return A3(map2,
              F2(function (x,y) {
                 return A2($List._op["::"],
                 x,
                 y);
              }),
              promises._0,
              sequence(promises._1));
            case "[]":
            return succeed(_L.fromArray([]));}
         _U.badCase($moduleName,
         "between lines 101 and 106");
      }();
   };
   var toMaybe = function (task) {
      return A2(onError,
      A2(map,$Maybe.Just,task),
      function (_v3) {
         return function () {
            return succeed($Maybe.Nothing);
         }();
      });
   };
   var fromMaybe = F2(function ($default,
   maybe) {
      return function () {
         switch (maybe.ctor)
         {case "Just":
            return succeed(maybe._0);
            case "Nothing":
            return fail($default);}
         _U.badCase($moduleName,
         "between lines 139 and 141");
      }();
   });
   var toResult = function (task) {
      return A2(onError,
      A2(map,$Result.Ok,task),
      function (msg) {
         return succeed($Result.Err(msg));
      });
   };
   var fromResult = function (result) {
      return function () {
         switch (result.ctor)
         {case "Err":
            return fail(result._0);
            case "Ok":
            return succeed(result._0);}
         _U.badCase($moduleName,
         "between lines 151 and 153");
      }();
   };
   var Task = {ctor: "Task"};
   _elm.Task.values = {_op: _op
                      ,succeed: succeed
                      ,fail: fail
                      ,map: map
                      ,map2: map2
                      ,map3: map3
                      ,map4: map4
                      ,map5: map5
                      ,andMap: andMap
                      ,sequence: sequence
                      ,andThen: andThen
                      ,onError: onError
                      ,mapError: mapError
                      ,toMaybe: toMaybe
                      ,fromMaybe: fromMaybe
                      ,toResult: toResult
                      ,fromResult: fromResult
                      ,spawn: spawn
                      ,sleep: sleep};
   return _elm.Task.values;
};
Elm.Text = Elm.Text || {};
Elm.Text.make = function (_elm) {
   "use strict";
   _elm.Text = _elm.Text || {};
   if (_elm.Text.values)
   return _elm.Text.values;
   var _op = {},
   _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   $moduleName = "Text",
   $Color = Elm.Color.make(_elm),
   $List = Elm.List.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Native$Text = Elm.Native.Text.make(_elm);
   var line = $Native$Text.line;
   var italic = $Native$Text.italic;
   var bold = $Native$Text.bold;
   var color = $Native$Text.color;
   var height = $Native$Text.height;
   var link = $Native$Text.link;
   var monospace = $Native$Text.monospace;
   var typeface = $Native$Text.typeface;
   var style = $Native$Text.style;
   var append = $Native$Text.append;
   var fromString = $Native$Text.fromString;
   var empty = fromString("");
   var concat = function (texts) {
      return A3($List.foldr,
      append,
      empty,
      texts);
   };
   var join = F2(function (seperator,
   texts) {
      return concat(A2($List.intersperse,
      seperator,
      texts));
   });
   var defaultStyle = {_: {}
                      ,bold: false
                      ,color: $Color.black
                      ,height: $Maybe.Nothing
                      ,italic: false
                      ,line: $Maybe.Nothing
                      ,typeface: _L.fromArray([])};
   var Style = F6(function (a,
   b,
   c,
   d,
   e,
   f) {
      return {_: {}
             ,bold: d
             ,color: c
             ,height: b
             ,italic: e
             ,line: f
             ,typeface: a};
   });
   var Through = {ctor: "Through"};
   var Over = {ctor: "Over"};
   var Under = {ctor: "Under"};
   var Text = {ctor: "Text"};
   _elm.Text.values = {_op: _op
                      ,fromString: fromString
                      ,empty: empty
                      ,append: append
                      ,concat: concat
                      ,join: join
                      ,link: link
                      ,style: style
                      ,defaultStyle: defaultStyle
                      ,typeface: typeface
                      ,monospace: monospace
                      ,height: height
                      ,color: color
                      ,bold: bold
                      ,italic: italic
                      ,line: line
                      ,Style: Style
                      ,Under: Under
                      ,Over: Over
                      ,Through: Through};
   return _elm.Text.values;
};
Elm.Time = Elm.Time || {};
Elm.Time.make = function (_elm) {
   "use strict";
   _elm.Time = _elm.Time || {};
   if (_elm.Time.values)
   return _elm.Time.values;
   var _op = {},
   _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   $moduleName = "Time",
   $Basics = Elm.Basics.make(_elm),
   $Native$Signal = Elm.Native.Signal.make(_elm),
   $Native$Time = Elm.Native.Time.make(_elm),
   $Signal = Elm.Signal.make(_elm);
   var delay = $Native$Signal.delay;
   var since = F2(function (time,
   signal) {
      return function () {
         var stop = A2($Signal.map,
         $Basics.always(-1),
         A2(delay,time,signal));
         var start = A2($Signal.map,
         $Basics.always(1),
         signal);
         var delaydiff = A3($Signal.foldp,
         F2(function (x,y) {
            return x + y;
         }),
         0,
         A2($Signal.merge,start,stop));
         return A2($Signal.map,
         F2(function (x,y) {
            return !_U.eq(x,y);
         })(0),
         delaydiff);
      }();
   });
   var timestamp = $Native$Signal.timestamp;
   var every = $Native$Time.every;
   var fpsWhen = $Native$Time.fpsWhen;
   var fps = function (targetFrames) {
      return A2(fpsWhen,
      targetFrames,
      $Signal.constant(true));
   };
   var inMilliseconds = function (t) {
      return t;
   };
   var millisecond = 1;
   var second = 1000 * millisecond;
   var minute = 60 * second;
   var hour = 60 * minute;
   var inHours = function (t) {
      return t / hour;
   };
   var inMinutes = function (t) {
      return t / minute;
   };
   var inSeconds = function (t) {
      return t / second;
   };
   _elm.Time.values = {_op: _op
                      ,millisecond: millisecond
                      ,second: second
                      ,minute: minute
                      ,hour: hour
                      ,inMilliseconds: inMilliseconds
                      ,inSeconds: inSeconds
                      ,inMinutes: inMinutes
                      ,inHours: inHours
                      ,fps: fps
                      ,fpsWhen: fpsWhen
                      ,every: every
                      ,timestamp: timestamp
                      ,delay: delay
                      ,since: since};
   return _elm.Time.values;
};
Elm.Transform2D = Elm.Transform2D || {};
Elm.Transform2D.make = function (_elm) {
   "use strict";
   _elm.Transform2D = _elm.Transform2D || {};
   if (_elm.Transform2D.values)
   return _elm.Transform2D.values;
   var _op = {},
   _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   $moduleName = "Transform2D",
   $Native$Transform2D = Elm.Native.Transform2D.make(_elm);
   var multiply = $Native$Transform2D.multiply;
   var rotation = $Native$Transform2D.rotation;
   var matrix = $Native$Transform2D.matrix;
   var translation = F2(function (x,
   y) {
      return A6(matrix,
      1,
      0,
      0,
      1,
      x,
      y);
   });
   var scale = function (s) {
      return A6(matrix,
      s,
      0,
      0,
      s,
      0,
      0);
   };
   var scaleX = function (x) {
      return A6(matrix,
      x,
      0,
      0,
      1,
      0,
      0);
   };
   var scaleY = function (y) {
      return A6(matrix,
      1,
      0,
      0,
      y,
      0,
      0);
   };
   var identity = $Native$Transform2D.identity;
   var Transform2D = {ctor: "Transform2D"};
   _elm.Transform2D.values = {_op: _op
                             ,identity: identity
                             ,matrix: matrix
                             ,multiply: multiply
                             ,rotation: rotation
                             ,translation: translation
                             ,scale: scale
                             ,scaleX: scaleX
                             ,scaleY: scaleY};
   return _elm.Transform2D.values;
};
Elm.VirtualDom = Elm.VirtualDom || {};
Elm.VirtualDom.make = function (_elm) {
   "use strict";
   _elm.VirtualDom = _elm.VirtualDom || {};
   if (_elm.VirtualDom.values)
   return _elm.VirtualDom.values;
   var _op = {},
   _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   $moduleName = "VirtualDom",
   $Basics = Elm.Basics.make(_elm),
   $Graphics$Element = Elm.Graphics.Element.make(_elm),
   $Json$Decode = Elm.Json.Decode.make(_elm),
   $List = Elm.List.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Native$VirtualDom = Elm.Native.VirtualDom.make(_elm),
   $Result = Elm.Result.make(_elm),
   $Signal = Elm.Signal.make(_elm);
   var lazy3 = $Native$VirtualDom.lazy3;
   var lazy2 = $Native$VirtualDom.lazy2;
   var lazy = $Native$VirtualDom.lazy;
   var on = $Native$VirtualDom.on;
   var attribute = $Native$VirtualDom.attribute;
   var property = $Native$VirtualDom.property;
   var Property = {ctor: "Property"};
   var fromElement = $Native$VirtualDom.fromElement;
   var toElement = $Native$VirtualDom.toElement;
   var text = $Native$VirtualDom.text;
   var node = $Native$VirtualDom.node;
   var Node = {ctor: "Node"};
   _elm.VirtualDom.values = {_op: _op
                            ,Node: Node
                            ,node: node
                            ,text: text
                            ,toElement: toElement
                            ,fromElement: fromElement
                            ,Property: Property
                            ,property: property
                            ,attribute: attribute
                            ,on: on
                            ,lazy: lazy
                            ,lazy2: lazy2
                            ,lazy3: lazy3};
   return _elm.VirtualDom.values;
};
