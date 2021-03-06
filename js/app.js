/*! For license information please see app.min.js.LICENSE.txt */
(() => {
  "use strict";
  var e, t;
  (e = void 0),
    (t = function () {
      function e() {
        return (e =
          Object.assign ||
          function (e) {
            for (var t = 1; t < arguments.length; t++) {
              var s = arguments[t];
              for (var i in s)
                Object.prototype.hasOwnProperty.call(s, i) && (e[i] = s[i]);
            }
            return e;
          }).apply(this, arguments);
      }
      var t = "undefined" != typeof window,
        s =
          (t && !("onscroll" in window)) ||
          ("undefined" != typeof navigator &&
            /(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent)),
        i = t && "IntersectionObserver" in window,
        a = t && "classList" in document.createElement("p"),
        n = t && window.devicePixelRatio > 1,
        r = {
          elements_selector: ".lazy",
          container: s || t ? document : null,
          threshold: 300,
          thresholds: null,
          data_src: "src",
          data_srcset: "srcset",
          data_sizes: "sizes",
          data_bg: "bg",
          data_bg_hidpi: "bg-hidpi",
          data_bg_multi: "bg-multi",
          data_bg_multi_hidpi: "bg-multi-hidpi",
          data_poster: "poster",
          class_applied: "applied",
          class_loading: "loading",
          class_loaded: "loaded",
          class_error: "error",
          class_entered: "entered",
          class_exited: "exited",
          unobserve_completed: !0,
          unobserve_entered: !1,
          cancel_on_exit: !0,
          callback_enter: null,
          callback_exit: null,
          callback_applied: null,
          callback_loading: null,
          callback_loaded: null,
          callback_error: null,
          callback_finish: null,
          callback_cancel: null,
          use_native: !1,
        },
        l = function (t) {
          return e({}, r, t);
        },
        o = function (e, t) {
          var s,
            i = "LazyLoad::Initialized",
            a = new e(t);
          try {
            s = new CustomEvent(i, { detail: { instance: a } });
          } catch (e) {
            (s = document.createEvent("CustomEvent")).initCustomEvent(
              i,
              !1,
              !1,
              { instance: a }
            );
          }
          window.dispatchEvent(s);
        },
        d = "loading",
        c = "loaded",
        u = "applied",
        p = "error",
        f = "native",
        h = function (e, t) {
          return e.getAttribute("data-" + t);
        },
        m = function (e) {
          return h(e, "ll-status");
        },
        g = function (e, t) {
          return (function (e, t, s) {
            var i = "data-ll-status";
            null !== s ? e.setAttribute(i, s) : e.removeAttribute(i);
          })(e, 0, t);
        },
        v = function (e) {
          return g(e, null);
        },
        w = function (e) {
          return null === m(e);
        },
        y = function (e) {
          return m(e) === f;
        },
        b = [d, c, u, p],
        x = function (e, t, s, i) {
          e && (void 0 === i ? (void 0 === s ? e(t) : e(t, s)) : e(t, s, i));
        },
        E = function (e, t) {
          a
            ? e.classList.add(t)
            : (e.className += (e.className ? " " : "") + t);
        },
        S = function (e, t) {
          a
            ? e.classList.remove(t)
            : (e.className = e.className
                .replace(new RegExp("(^|\\s+)" + t + "(\\s+|$)"), " ")
                .replace(/^\s+/, "")
                .replace(/\s+$/, ""));
        },
        C = function (e) {
          return e.llTempImage;
        },
        T = function (e, t) {
          if (t) {
            var s = t._observer;
            s && s.unobserve(e);
          }
        },
        $ = function (e, t) {
          e && (e.loadingCount += t);
        },
        M = function (e, t) {
          e && (e.toLoadCount = t);
        },
        _ = function (e) {
          for (var t, s = [], i = 0; (t = e.children[i]); i += 1)
            "SOURCE" === t.tagName && s.push(t);
          return s;
        },
        L = function (e, t, s) {
          s && e.setAttribute(t, s);
        },
        k = function (e, t) {
          e.removeAttribute(t);
        },
        A = function (e) {
          return !!e.llOriginalAttrs;
        },
        P = function (e) {
          if (!A(e)) {
            var t = {};
            (t.src = e.getAttribute("src")),
              (t.srcset = e.getAttribute("srcset")),
              (t.sizes = e.getAttribute("sizes")),
              (e.llOriginalAttrs = t);
          }
        },
        O = function (e) {
          if (A(e)) {
            var t = e.llOriginalAttrs;
            L(e, "src", t.src),
              L(e, "srcset", t.srcset),
              L(e, "sizes", t.sizes);
          }
        },
        z = function (e, t) {
          L(e, "sizes", h(e, t.data_sizes)),
            L(e, "srcset", h(e, t.data_srcset)),
            L(e, "src", h(e, t.data_src));
        },
        I = function (e) {
          k(e, "src"), k(e, "srcset"), k(e, "sizes");
        },
        q = function (e, t) {
          var s = e.parentNode;
          s && "PICTURE" === s.tagName && _(s).forEach(t);
        },
        D = {
          IMG: function (e, t) {
            q(e, function (e) {
              P(e), z(e, t);
            }),
              P(e),
              z(e, t);
          },
          IFRAME: function (e, t) {
            L(e, "src", h(e, t.data_src));
          },
          VIDEO: function (e, t) {
            !(function (e, s) {
              _(e).forEach(function (e) {
                L(e, "src", h(e, t.data_src));
              });
            })(e),
              L(e, "poster", h(e, t.data_poster)),
              L(e, "src", h(e, t.data_src)),
              e.load();
          },
        },
        H = function (e, t) {
          var s = D[e.tagName];
          s && s(e, t);
        },
        B = function (e, t, s) {
          $(s, 1), E(e, t.class_loading), g(e, d), x(t.callback_loading, e, s);
        },
        N = ["IMG", "IFRAME", "VIDEO"],
        G = function (e, t) {
          !t ||
            (function (e) {
              return e.loadingCount > 0;
            })(t) ||
            (function (e) {
              return e.toLoadCount > 0;
            })(t) ||
            x(e.callback_finish, t);
        },
        Y = function (e, t, s) {
          e.addEventListener(t, s), (e.llEvLisnrs[t] = s);
        },
        j = function (e, t, s) {
          e.removeEventListener(t, s);
        },
        R = function (e) {
          return !!e.llEvLisnrs;
        },
        X = function (e) {
          if (R(e)) {
            var t = e.llEvLisnrs;
            for (var s in t) {
              var i = t[s];
              j(e, s, i);
            }
            delete e.llEvLisnrs;
          }
        },
        W = function (e, t, s) {
          !(function (e) {
            delete e.llTempImage;
          })(e),
            $(s, -1),
            (function (e) {
              e && (e.toLoadCount -= 1);
            })(s),
            S(e, t.class_loading),
            t.unobserve_completed && T(e, s);
        },
        V = function (e, t, s) {
          var i = C(e) || e;
          R(i) ||
            (function (e, t, s) {
              R(e) || (e.llEvLisnrs = {});
              var i = "VIDEO" === e.tagName ? "loadeddata" : "load";
              Y(e, i, t), Y(e, "error", s);
            })(
              i,
              function (a) {
                !(function (e, t, s, i) {
                  var a = y(t);
                  W(t, s, i),
                    E(t, s.class_loaded),
                    g(t, c),
                    x(s.callback_loaded, t, i),
                    a || G(s, i);
                })(0, e, t, s),
                  X(i);
              },
              function (a) {
                !(function (e, t, s, i) {
                  var a = y(t);
                  W(t, s, i),
                    E(t, s.class_error),
                    g(t, p),
                    x(s.callback_error, t, i),
                    a || G(s, i);
                })(0, e, t, s),
                  X(i);
              }
            );
        },
        F = function (e, t, s) {
          !(function (e) {
            return N.indexOf(e.tagName) > -1;
          })(e)
            ? (function (e, t, s) {
                !(function (e) {
                  e.llTempImage = document.createElement("IMG");
                })(e),
                  V(e, t, s),
                  (function (e, t, s) {
                    var i = h(e, t.data_bg),
                      a = h(e, t.data_bg_hidpi),
                      r = n && a ? a : i;
                    r &&
                      ((e.style.backgroundImage = 'url("'.concat(r, '")')),
                      C(e).setAttribute("src", r),
                      B(e, t, s));
                  })(e, t, s),
                  (function (e, t, s) {
                    var i = h(e, t.data_bg_multi),
                      a = h(e, t.data_bg_multi_hidpi),
                      r = n && a ? a : i;
                    r &&
                      ((e.style.backgroundImage = r),
                      (function (e, t, s) {
                        E(e, t.class_applied),
                          g(e, u),
                          t.unobserve_completed && T(e, t),
                          x(t.callback_applied, e, s);
                      })(e, t, s));
                  })(e, t, s);
              })(e, t, s)
            : (function (e, t, s) {
                V(e, t, s), H(e, t), B(e, t, s);
              })(e, t, s);
        },
        U = ["IMG", "IFRAME"],
        K = function (e) {
          return e.use_native && "loading" in HTMLImageElement.prototype;
        },
        Q = function (e) {
          return Array.prototype.slice.call(e);
        },
        J = function (e) {
          return e.container.querySelectorAll(e.elements_selector);
        },
        Z = function (e) {
          return (function (e) {
            return m(e) === p;
          })(e);
        },
        ee = function (e, t) {
          return (function (e) {
            return Q(e).filter(w);
          })(e || J(t));
        },
        te = function (e, s) {
          var a = l(e);
          (this._settings = a),
            (this.loadingCount = 0),
            (function (e, t) {
              i &&
                !K(e) &&
                (t._observer = new IntersectionObserver(
                  function (s) {
                    !(function (e, t, s) {
                      e.forEach(function (e) {
                        return (function (e) {
                          return e.isIntersecting || e.intersectionRatio > 0;
                        })(e)
                          ? (function (e, t, s, i) {
                              g(e, "entered"),
                                E(e, s.class_entered),
                                S(e, s.class_exited),
                                (function (e, t, s) {
                                  t.unobserve_entered && T(e, s);
                                })(e, s, i),
                                x(s.callback_enter, e, t, i),
                                (function (e) {
                                  return b.indexOf(m(e)) >= 0;
                                })(e) || F(e, s, i);
                            })(e.target, e, t, s)
                          : (function (e, t, s, i) {
                              w(e) ||
                                (E(e, s.class_exited),
                                (function (e, t, s, i) {
                                  s.cancel_on_exit &&
                                    (function (e) {
                                      return m(e) === d;
                                    })(e) &&
                                    "IMG" === e.tagName &&
                                    (X(e),
                                    (function (e) {
                                      q(e, function (e) {
                                        I(e);
                                      }),
                                        I(e);
                                    })(e),
                                    (function (e) {
                                      q(e, function (e) {
                                        O(e);
                                      }),
                                        O(e);
                                    })(e),
                                    S(e, s.class_loading),
                                    $(i, -1),
                                    v(e),
                                    x(s.callback_cancel, e, t, i));
                                })(e, t, s, i),
                                x(s.callback_exit, e, t, i));
                            })(e.target, e, t, s);
                      });
                    })(s, e, t);
                  },
                  (function (e) {
                    return {
                      root: e.container === document ? null : e.container,
                      rootMargin: e.thresholds || e.threshold + "px",
                    };
                  })(e)
                ));
            })(a, this),
            (function (e, s) {
              t &&
                window.addEventListener("online", function () {
                  !(function (e, t) {
                    var s;
                    ((s = J(e)), Q(s).filter(Z)).forEach(function (t) {
                      S(t, e.class_error), v(t);
                    }),
                      t.update();
                  })(e, s);
                });
            })(a, this),
            this.update(s);
        };
      return (
        (te.prototype = {
          update: function (e) {
            var t,
              a,
              n = this._settings,
              r = ee(e, n);
            M(this, r.length),
              !s && i
                ? K(n)
                  ? (function (e, t, s) {
                      e.forEach(function (e) {
                        -1 !== U.indexOf(e.tagName) &&
                          (e.setAttribute("loading", "lazy"),
                          (function (e, t, s) {
                            V(e, t, s), H(e, t), g(e, f);
                          })(e, t, s));
                      }),
                        M(s, 0);
                    })(r, n, this)
                  : ((a = r),
                    (function (e) {
                      e.disconnect();
                    })((t = this._observer)),
                    (function (e, t) {
                      t.forEach(function (t) {
                        e.observe(t);
                      });
                    })(t, a))
                : this.loadAll(r);
          },
          destroy: function () {
            this._observer && this._observer.disconnect(),
              J(this._settings).forEach(function (e) {
                delete e.llOriginalAttrs;
              }),
              delete this._observer,
              delete this._settings,
              delete this.loadingCount,
              delete this.toLoadCount;
          },
          loadAll: function (e) {
            var t = this,
              s = this._settings;
            ee(e, s).forEach(function (e) {
              T(e, t), F(e, s, t);
            });
          },
        }),
        (te.load = function (e, t) {
          var s = l(t);
          F(e, s);
        }),
        (te.resetStatus = function (e) {
          v(e);
        }),
        t &&
          (function (e, t) {
            if (t)
              if (t.length) for (var s, i = 0; (s = t[i]); i += 1) o(e, s);
              else o(e, t);
          })(te, window.lazyLoadOptions),
        te
      );
    }),
    "object" == typeof exports && "undefined" != typeof module
      ? (module.exports = t())
      : "function" == typeof define && define.amd
      ? define(t)
      : ((e = e || self).LazyLoad = t()),
    window.Element &&
      !Element.prototype.closest &&
      (Element.prototype.closest = function (e) {
        var t,
          s = (this.document || this.ownerDocument).querySelectorAll(e),
          i = this;
        do {
          for (t = s.length; 0 <= --t && s.item(t) !== i; );
        } while (t < 0 && (i = i.parentElement));
        return i;
      }),
    (function () {
      function e(e, t) {
        t = t || { bubbles: !1, cancelable: !1, detail: void 0 };
        var s = document.createEvent("CustomEvent");
        return s.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), s;
      }
      "function" != typeof window.CustomEvent &&
        ((e.prototype = window.Event.prototype), (window.CustomEvent = e));
    })(),
    (function () {
      for (
        var e = 0, t = ["ms", "moz", "webkit", "o"], s = 0;
        s < t.length && !window.requestAnimationFrame;
        ++s
      )
        (window.requestAnimationFrame = window[t[s] + "RequestAnimationFrame"]),
          (window.cancelAnimationFrame =
            window[t[s] + "CancelAnimationFrame"] ||
            window[t[s] + "CancelRequestAnimationFrame"]);
      window.requestAnimationFrame ||
        (window.requestAnimationFrame = function (t, s) {
          var i = new Date().getTime(),
            a = Math.max(0, 16 - (i - e)),
            n = window.setTimeout(function () {
              t(i + a);
            }, a);
          return (e = i + a), n;
        }),
        window.cancelAnimationFrame ||
          (window.cancelAnimationFrame = function (e) {
            clearTimeout(e);
          });
    })(),
    (function (e, t) {
      "function" == typeof define && define.amd
        ? define([], function () {
            return t(e);
          })
        : "object" == typeof exports
        ? (module.exports = t(e))
        : (e.SmoothScroll = t(e));
    })(
      "undefined" != typeof global
        ? global
        : "undefined" != typeof window
        ? window
        : void 0,
      function (e) {
        var t = {
            ignore: "[data-scroll-ignore]",
            header: null,
            topOnEmptyHash: !0,
            speed: 500,
            speedAsDuration: !1,
            durationMax: null,
            durationMin: null,
            clip: !0,
            offset: 0,
            easing: "easeInOutCubic",
            customEasing: null,
            updateURL: !0,
            popstate: !0,
            emitEvents: !0,
          },
          s = function () {
            var e = {};
            return (
              Array.prototype.forEach.call(arguments, function (t) {
                for (var s in t) {
                  if (!t.hasOwnProperty(s)) return;
                  e[s] = t[s];
                }
              }),
              e
            );
          },
          i = function (e) {
            "#" === e.charAt(0) && (e = e.substr(1));
            for (
              var t,
                s = String(e),
                i = s.length,
                a = -1,
                n = "",
                r = s.charCodeAt(0);
              ++a < i;

            ) {
              if (0 === (t = s.charCodeAt(a)))
                throw new InvalidCharacterError(
                  "Invalid character: the input contains U+0000."
                );
              n +=
                (1 <= t && t <= 31) ||
                127 == t ||
                (0 === a && 48 <= t && t <= 57) ||
                (1 === a && 48 <= t && t <= 57 && 45 === r)
                  ? "\\" + t.toString(16) + " "
                  : 128 <= t ||
                    45 === t ||
                    95 === t ||
                    (48 <= t && t <= 57) ||
                    (65 <= t && t <= 90) ||
                    (97 <= t && t <= 122)
                  ? s.charAt(a)
                  : "\\" + s.charAt(a);
            }
            return "#" + n;
          },
          a = function () {
            return Math.max(
              document.body.scrollHeight,
              document.documentElement.scrollHeight,
              document.body.offsetHeight,
              document.documentElement.offsetHeight,
              document.body.clientHeight,
              document.documentElement.clientHeight
            );
          },
          n = function (t, s, i, a) {
            if (s.emitEvents && "function" == typeof e.CustomEvent) {
              var n = new CustomEvent(t, {
                bubbles: !0,
                detail: { anchor: i, toggle: a },
              });
              document.dispatchEvent(n);
            }
          };
        return function (r, l) {
          var o,
            d,
            c,
            u,
            p = {
              cancelScroll: function (e) {
                cancelAnimationFrame(u), (u = null), e || n("scrollCancel", o);
              },
            };
          p.animateScroll = function (i, r, l) {
            p.cancelScroll();
            var d = s(o || t, l || {}),
              f = "[object Number]" === Object.prototype.toString.call(i),
              h = f || !i.tagName ? null : i;
            if (f || h) {
              var m = e.pageYOffset;
              d.header && !c && (c = document.querySelector(d.header));
              var g,
                v,
                w,
                y,
                b,
                x,
                E,
                S,
                C = (function (t) {
                  return t
                    ? ((s = t),
                      parseInt(e.getComputedStyle(s).height, 10) + t.offsetTop)
                    : 0;
                  var s;
                })(c),
                T = f
                  ? i
                  : (function (t, s, i, n) {
                      var r = 0;
                      if (t.offsetParent)
                        for (; (r += t.offsetTop), (t = t.offsetParent); );
                      return (
                        (r = Math.max(r - s - i, 0)),
                        n && (r = Math.min(r, a() - e.innerHeight)),
                        r
                      );
                    })(
                      h,
                      C,
                      parseInt(
                        "function" == typeof d.offset
                          ? d.offset(i, r)
                          : d.offset,
                        10
                      ),
                      d.clip
                    ),
                $ = T - m,
                M = a(),
                _ = 0,
                L =
                  ((g = $),
                  (w = (v = d).speedAsDuration
                    ? v.speed
                    : Math.abs((g / 1e3) * v.speed)),
                  v.durationMax && w > v.durationMax
                    ? v.durationMax
                    : v.durationMin && w < v.durationMin
                    ? v.durationMin
                    : parseInt(w, 10)),
                k = function (t) {
                  var s, a, l;
                  y || (y = t),
                    (_ += t - y),
                    (x =
                      m +
                      $ *
                        ((a = b = 1 < (b = 0 === L ? 0 : _ / L) ? 1 : b),
                        "easeInQuad" === (s = d).easing && (l = a * a),
                        "easeOutQuad" === s.easing && (l = a * (2 - a)),
                        "easeInOutQuad" === s.easing &&
                          (l = a < 0.5 ? 2 * a * a : (4 - 2 * a) * a - 1),
                        "easeInCubic" === s.easing && (l = a * a * a),
                        "easeOutCubic" === s.easing && (l = --a * a * a + 1),
                        "easeInOutCubic" === s.easing &&
                          (l =
                            a < 0.5
                              ? 4 * a * a * a
                              : (a - 1) * (2 * a - 2) * (2 * a - 2) + 1),
                        "easeInQuart" === s.easing && (l = a * a * a * a),
                        "easeOutQuart" === s.easing &&
                          (l = 1 - --a * a * a * a),
                        "easeInOutQuart" === s.easing &&
                          (l =
                            a < 0.5
                              ? 8 * a * a * a * a
                              : 1 - 8 * --a * a * a * a),
                        "easeInQuint" === s.easing && (l = a * a * a * a * a),
                        "easeOutQuint" === s.easing &&
                          (l = 1 + --a * a * a * a * a),
                        "easeInOutQuint" === s.easing &&
                          (l =
                            a < 0.5
                              ? 16 * a * a * a * a * a
                              : 1 + 16 * --a * a * a * a * a),
                        s.customEasing && (l = s.customEasing(a)),
                        l || a)),
                    e.scrollTo(0, Math.floor(x)),
                    (function (t, s) {
                      var a,
                        l,
                        o,
                        c = e.pageYOffset;
                      if (t == s || c == s || (m < s && e.innerHeight + c) >= M)
                        return (
                          p.cancelScroll(!0),
                          (l = s),
                          (o = f),
                          0 === (a = i) && document.body.focus(),
                          o ||
                            (a.focus(),
                            document.activeElement !== a &&
                              (a.setAttribute("tabindex", "-1"),
                              a.focus(),
                              (a.style.outline = "none")),
                            e.scrollTo(0, l)),
                          n("scrollStop", d, i, r),
                          !(u = y = null)
                        );
                    })(x, T) || ((u = e.requestAnimationFrame(k)), (y = t));
                };
              0 === e.pageYOffset && e.scrollTo(0, 0),
                (E = i),
                (S = d),
                f ||
                  (history.pushState &&
                    S.updateURL &&
                    history.pushState(
                      { smoothScroll: JSON.stringify(S), anchor: E.id },
                      document.title,
                      E === document.documentElement ? "#top" : "#" + E.id
                    )),
                "matchMedia" in e &&
                e.matchMedia("(prefers-reduced-motion)").matches
                  ? e.scrollTo(0, Math.floor(T))
                  : (n("scrollStart", d, i, r),
                    p.cancelScroll(!0),
                    e.requestAnimationFrame(k));
            }
          };
          var f = function (t) {
              if (
                !t.defaultPrevented &&
                !(0 !== t.button || t.metaKey || t.ctrlKey || t.shiftKey) &&
                "closest" in t.target &&
                (d = t.target.closest(r)) &&
                "a" === d.tagName.toLowerCase() &&
                !t.target.closest(o.ignore) &&
                d.hostname === e.location.hostname &&
                d.pathname === e.location.pathname &&
                /#/.test(d.href)
              ) {
                var s, a;
                try {
                  s = i(decodeURIComponent(d.hash));
                } catch (t) {
                  s = i(d.hash);
                }
                if ("#" === s) {
                  if (!o.topOnEmptyHash) return;
                  a = document.documentElement;
                } else a = document.querySelector(s);
                (a = a || "#top" !== s ? a : document.documentElement) &&
                  (t.preventDefault(),
                  (function (t) {
                    if (history.replaceState && t.updateURL && !history.state) {
                      var s = e.location.hash;
                      (s = s || ""),
                        history.replaceState(
                          {
                            smoothScroll: JSON.stringify(t),
                            anchor: s || e.pageYOffset,
                          },
                          document.title,
                          s || e.location.href
                        );
                    }
                  })(o),
                  p.animateScroll(a, d));
              }
            },
            h = function (e) {
              if (
                null !== history.state &&
                history.state.smoothScroll &&
                history.state.smoothScroll === JSON.stringify(o)
              ) {
                var t = history.state.anchor;
                ("string" == typeof t &&
                  t &&
                  !(t = document.querySelector(i(history.state.anchor)))) ||
                  p.animateScroll(t, null, { updateURL: !1 });
              }
            };
          return (
            (p.destroy = function () {
              o &&
                (document.removeEventListener("click", f, !1),
                e.removeEventListener("popstate", h, !1),
                p.cancelScroll(),
                (u = c = d = o = null));
            }),
            (function () {
              if (
                !(
                  "querySelector" in document &&
                  "addEventListener" in e &&
                  "requestAnimationFrame" in e &&
                  "closest" in e.Element.prototype
                )
              )
                throw "Smooth Scroll: This browser does not support the required JavaScript methods and browser APIs.";
              p.destroy(),
                (o = s(t, l || {})),
                (c = o.header ? document.querySelector(o.header) : null),
                document.addEventListener("click", f, !1),
                o.updateURL &&
                  o.popstate &&
                  e.addEventListener("popstate", h, !1);
            })(),
            p
          );
        };
      }
    ),
    (function (e) {
      if ("object" == typeof exports && "undefined" != typeof module)
        module.exports = e();
      else if ("function" == typeof define && define.amd) define([], e);
      else {
        ("undefined" != typeof window
          ? window
          : "undefined" != typeof global
          ? global
          : "undefined" != typeof self
          ? self
          : this
        ).Lightgallery = e();
      }
    })(function () {
      return (function e(t, s, i) {
        function a(r, l) {
          if (!s[r]) {
            if (!t[r]) {
              var o = "function" == typeof require && require;
              if (!l && o) return o(r, !0);
              if (n) return n(r, !0);
              var d = new Error("Cannot find module '" + r + "'");
              throw ((d.code = "MODULE_NOT_FOUND"), d);
            }
            var c = (s[r] = { exports: {} });
            t[r][0].call(
              c.exports,
              function (e) {
                return a(t[r][1][e] || e);
              },
              c,
              c.exports,
              e,
              t,
              s,
              i
            );
          }
          return s[r].exports;
        }
        for (
          var n = "function" == typeof require && require, r = 0;
          r < i.length;
          r++
        )
          a(i[r]);
        return a;
      })(
        {
          1: [
            function (e, t, s) {
              !(function (e, t) {
                if (void 0 !== s) t(s);
                else {
                  var i = { exports: {} };
                  t(i.exports), (e.lgUtils = i.exports);
                }
              })(this, function (e) {
                Object.defineProperty(e, "__esModule", { value: !0 });
                var t = {
                  getAttribute: function (e, t) {
                    return e[t];
                  },
                  setAttribute: function (e, t, s) {
                    e[t] = s;
                  },
                  wrap: function (e, t) {
                    if (e) {
                      var s = document.createElement("div");
                      (s.className = t),
                        e.parentNode.insertBefore(s, e),
                        e.parentNode.removeChild(e),
                        s.appendChild(e);
                    }
                  },
                  addClass: function (e, t) {
                    e &&
                      (e.classList
                        ? e.classList.add(t)
                        : (e.className += " " + t));
                  },
                  removeClass: function (e, t) {
                    e &&
                      (e.classList
                        ? e.classList.remove(t)
                        : (e.className = e.className.replace(
                            new RegExp(
                              "(^|\\b)" + t.split(" ").join("|") + "(\\b|$)",
                              "gi"
                            ),
                            " "
                          )));
                  },
                  hasClass: function (e, t) {
                    return e.classList
                      ? e.classList.contains(t)
                      : new RegExp("(^| )" + t + "( |$)", "gi").test(
                          e.className
                        );
                  },
                  setVendor: function (e, t, s) {
                    e &&
                      ((e.style[t.charAt(0).toLowerCase() + t.slice(1)] = s),
                      (e.style["webkit" + t] = s),
                      (e.style["moz" + t] = s),
                      (e.style["ms" + t] = s),
                      (e.style["o" + t] = s));
                  },
                  trigger: function (e, t) {
                    var s =
                      arguments.length > 2 && void 0 !== arguments[2]
                        ? arguments[2]
                        : null;
                    if (e) {
                      var i = new CustomEvent(t, { detail: s });
                      e.dispatchEvent(i);
                    }
                  },
                  Listener: { uid: 0 },
                  on: function (e, s, i) {
                    var a = this;
                    e &&
                      s.split(" ").forEach(function (s) {
                        var n = a.getAttribute(e, "lg-event-uid") || "";
                        t.Listener.uid++,
                          (n += "&" + t.Listener.uid),
                          a.setAttribute(e, "lg-event-uid", n),
                          (t.Listener[s + t.Listener.uid] = i),
                          e.addEventListener(s.split(".")[0], i, !1);
                      });
                  },
                  off: function (e, s) {
                    if (e) {
                      var i = this.getAttribute(e, "lg-event-uid");
                      if (i) {
                        i = i.split("&");
                        for (var a = 0; a < i.length; a++)
                          if (i[a]) {
                            var n = s + i[a];
                            if ("." === n.substring(0, 1))
                              for (var r in t.Listener)
                                t.Listener.hasOwnProperty(r) &&
                                  r.split(".").indexOf(n.split(".")[1]) > -1 &&
                                  (e.removeEventListener(
                                    r.split(".")[0],
                                    t.Listener[r]
                                  ),
                                  this.setAttribute(
                                    e,
                                    "lg-event-uid",
                                    this.getAttribute(
                                      e,
                                      "lg-event-uid"
                                    ).replace("&" + i[a], "")
                                  ),
                                  delete t.Listener[r]);
                            else
                              e.removeEventListener(
                                n.split(".")[0],
                                t.Listener[n]
                              ),
                                this.setAttribute(
                                  e,
                                  "lg-event-uid",
                                  this.getAttribute(e, "lg-event-uid").replace(
                                    "&" + i[a],
                                    ""
                                  )
                                ),
                                delete t.Listener[n];
                          }
                      }
                    }
                  },
                  param: function (e) {
                    return Object.keys(e)
                      .map(function (t) {
                        return (
                          encodeURIComponent(t) + "=" + encodeURIComponent(e[t])
                        );
                      })
                      .join("&");
                  },
                };
                e.default = t;
              });
            },
            {},
          ],
          2: [
            function (e, t, s) {
              !(function (t, i) {
                if (void 0 !== s) i(e("./lg-utils"));
                else {
                  i(t.lgUtils), (t.lightgallery = {});
                }
              })(this, function (e) {
                function t(e, t) {
                  if (
                    ((this.el = e),
                    (this.s = i({}, a, t)),
                    this.s.dynamic &&
                      "undefined" !== this.s.dynamicEl &&
                      this.s.dynamicEl.constructor === Array &&
                      !this.s.dynamicEl.length)
                  )
                    throw "When using dynamic mode, you must also define dynamicEl as an Array.";
                  return (
                    (this.modules = {}),
                    (this.lGalleryOn = !1),
                    (this.lgBusy = !1),
                    (this.hideBartimeout = !1),
                    (this.isTouch = "ontouchstart" in document.documentElement),
                    this.s.slideEndAnimatoin && (this.s.hideControlOnEnd = !1),
                    (this.items = []),
                    this.s.dynamic
                      ? (this.items = this.s.dynamicEl)
                      : "this" === this.s.selector
                      ? this.items.push(this.el)
                      : "" !== this.s.selector
                      ? this.s.selectWithin
                        ? (this.items = document
                            .querySelector(this.s.selectWithin)
                            .querySelectorAll(this.s.selector))
                        : (this.items = this.el.querySelectorAll(
                            this.s.selector
                          ))
                      : (this.items = this.el.children),
                    (this.___slide = ""),
                    (this.outer = ""),
                    this.init(),
                    this
                  );
                }
                var s = (function (e) {
                    return e && e.__esModule ? e : { default: e };
                  })(e),
                  i =
                    Object.assign ||
                    function (e) {
                      for (var t = 1; t < arguments.length; t++) {
                        var s = arguments[t];
                        for (var i in s)
                          Object.prototype.hasOwnProperty.call(s, i) &&
                            (e[i] = s[i]);
                      }
                      return e;
                    };
                !(function () {
                  function e(e, t) {
                    t = t || { bubbles: !1, cancelable: !1, detail: void 0 };
                    var s = document.createEvent("CustomEvent");
                    return (
                      s.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), s
                    );
                  }
                  if ("function" == typeof window.CustomEvent) return !1;
                  (e.prototype = window.Event.prototype),
                    (window.CustomEvent = e);
                })(),
                  (window.utils = s.default),
                  (window.lgData = { uid: 0 }),
                  (window.lgModules = {});
                var a = {
                  mode: "lg-slide",
                  cssEasing: "ease",
                  easing: "linear",
                  speed: 600,
                  height: "100%",
                  width: "100%",
                  addClass: "",
                  startClass: "lg-start-zoom",
                  backdropDuration: 150,
                  hideBarsDelay: 6e3,
                  useLeft: !1,
                  closable: !0,
                  loop: !0,
                  escKey: !0,
                  keyPress: !0,
                  controls: !0,
                  slideEndAnimatoin: !0,
                  hideControlOnEnd: !1,
                  mousewheel: !1,
                  getCaptionFromTitleOrAlt: !0,
                  appendSubHtmlTo: ".lg-sub-html",
                  subHtmlSelectorRelative: !1,
                  preload: 1,
                  showAfterLoad: !0,
                  selector: "",
                  selectWithin: "",
                  nextHtml: "",
                  prevHtml: "",
                  index: !1,
                  iframeMaxWidth: "100%",
                  download: !0,
                  counter: !0,
                  appendCounterTo: ".lg-toolbar",
                  swipeThreshold: 50,
                  enableSwipe: !0,
                  enableDrag: !0,
                  dynamic: !1,
                  dynamicEl: [],
                  galleryId: 1,
                };
                (t.prototype.init = function () {
                  var e = this;
                  e.s.preload > e.items.length &&
                    (e.s.preload = e.items.length);
                  var t = window.location.hash;
                  if (
                    (t.indexOf("lg=" + this.s.galleryId) > 0 &&
                      ((e.index = parseInt(t.split("&slide=")[1], 10)),
                      s.default.addClass(document.body, "lg-from-hash"),
                      s.default.hasClass(document.body, "lg-on") ||
                        (s.default.addClass(document.body, "lg-on"),
                        setTimeout(function () {
                          e.build(e.index);
                        }))),
                    e.s.dynamic)
                  )
                    s.default.trigger(this.el, "onBeforeOpen"),
                      (e.index = e.s.index || 0),
                      s.default.hasClass(document.body, "lg-on") ||
                        (s.default.addClass(document.body, "lg-on"),
                        setTimeout(function () {
                          e.build(e.index);
                        }));
                  else
                    for (var i = 0; i < e.items.length; i++)
                      !(function (t) {
                        s.default.on(
                          e.items[t],
                          "click.lgcustom",
                          function (i) {
                            i.preventDefault(),
                              s.default.trigger(e.el, "onBeforeOpen"),
                              (e.index = e.s.index || t),
                              s.default.hasClass(document.body, "lg-on") ||
                                (e.build(e.index),
                                s.default.addClass(document.body, "lg-on"));
                          }
                        );
                      })(i);
                }),
                  (t.prototype.build = function (e) {
                    var t = this;
                    for (var i in (t.structure(), window.lgModules))
                      t.modules[i] = new window.lgModules[i](t.el);
                    t.slide(e, !1, !1),
                      t.s.keyPress && t.keyPress(),
                      t.items.length > 1 &&
                        (t.arrow(),
                        setTimeout(function () {
                          t.enableDrag(), t.enableSwipe();
                        }, 50),
                        t.s.mousewheel && t.mousewheel()),
                      t.counter(),
                      t.closeGallery(),
                      s.default.trigger(t.el, "onAfterOpen"),
                      s.default.on(
                        t.outer,
                        "mousemove.lg click.lg touchstart.lg",
                        function () {
                          s.default.removeClass(t.outer, "lg-hide-items"),
                            clearTimeout(t.hideBartimeout),
                            (t.hideBartimeout = setTimeout(function () {
                              s.default.addClass(t.outer, "lg-hide-items");
                            }, t.s.hideBarsDelay));
                        }
                      );
                  }),
                  (t.prototype.structure = function () {
                    var e,
                      t = "",
                      i = "",
                      a = 0,
                      n = "",
                      r = this;
                    for (
                      document.body.insertAdjacentHTML(
                        "beforeend",
                        '<div class="lg-backdrop"></div>'
                      ),
                        s.default.setVendor(
                          document.querySelector(".lg-backdrop"),
                          "TransitionDuration",
                          this.s.backdropDuration + "ms"
                        ),
                        a = 0;
                      a < this.items.length;
                      a++
                    )
                      t += '<div class="lg-item"></div>';
                    if (
                      (this.s.controls &&
                        this.items.length > 1 &&
                        (i =
                          '<div class="lg-actions"><div class="lg-prev lg-icon">' +
                          this.s.prevHtml +
                          '</div><div class="lg-next lg-icon">' +
                          this.s.nextHtml +
                          "</div></div>"),
                      ".lg-sub-html" === this.s.appendSubHtmlTo &&
                        (n = '<div class="lg-sub-html"></div>'),
                      (e =
                        '<div class="lg-outer ' +
                        this.s.addClass +
                        " " +
                        this.s.startClass +
                        '"><div class="lg" style="width:' +
                        this.s.width +
                        "; height:" +
                        this.s.height +
                        '"><div class="lg-inner">' +
                        t +
                        '</div><div class="lg-toolbar group"><span class="lg-close lg-icon"></span></div>' +
                        i +
                        n +
                        "</div></div>"),
                      document.body.insertAdjacentHTML("beforeend", e),
                      (this.outer = document.querySelector(".lg-outer")),
                      (this.___slide = this.outer.querySelectorAll(".lg-item")),
                      this.s.useLeft
                        ? (s.default.addClass(this.outer, "lg-use-left"),
                          (this.s.mode = "lg-slide"))
                        : s.default.addClass(this.outer, "lg-use-css3"),
                      r.setTop(),
                      s.default.on(
                        window,
                        "resize.lg orientationchange.lg",
                        function () {
                          setTimeout(function () {
                            r.setTop();
                          }, 100);
                        }
                      ),
                      s.default.addClass(
                        this.___slide[this.index],
                        "lg-current"
                      ),
                      this.doCss()
                        ? s.default.addClass(this.outer, "lg-css3")
                        : (s.default.addClass(this.outer, "lg-css"),
                          (this.s.speed = 0)),
                      s.default.addClass(this.outer, this.s.mode),
                      this.s.enableDrag &&
                        this.items.length > 1 &&
                        s.default.addClass(this.outer, "lg-grab"),
                      this.s.showAfterLoad &&
                        s.default.addClass(this.outer, "lg-show-after-load"),
                      this.doCss())
                    ) {
                      var l = this.outer.querySelector(".lg-inner");
                      s.default.setVendor(
                        l,
                        "TransitionTimingFunction",
                        this.s.cssEasing
                      ),
                        s.default.setVendor(
                          l,
                          "TransitionDuration",
                          this.s.speed + "ms"
                        );
                    }
                    setTimeout(function () {
                      s.default.addClass(
                        document.querySelector(".lg-backdrop"),
                        "in"
                      );
                    }),
                      setTimeout(function () {
                        s.default.addClass(r.outer, "lg-visible");
                      }, this.s.backdropDuration),
                      this.s.download &&
                        this.outer
                          .querySelector(".lg-toolbar")
                          .insertAdjacentHTML(
                            "beforeend",
                            '<a id="lg-download" target="_blank" download class="lg-download lg-icon"></a>'
                          ),
                      (this.prevScrollTop =
                        document.documentElement.scrollTop ||
                        document.body.scrollTop);
                  }),
                  (t.prototype.setTop = function () {
                    if ("100%" !== this.s.height) {
                      var e = window.innerHeight,
                        t = (e - parseInt(this.s.height, 10)) / 2,
                        s = this.outer.querySelector(".lg");
                      e >= parseInt(this.s.height, 10)
                        ? (s.style.top = t + "px")
                        : (s.style.top = "0px");
                    }
                  }),
                  (t.prototype.doCss = function () {
                    return !!(function () {
                      var e = [
                          "transition",
                          "MozTransition",
                          "WebkitTransition",
                          "OTransition",
                          "msTransition",
                          "KhtmlTransition",
                        ],
                        t = document.documentElement,
                        s = 0;
                      for (s = 0; s < e.length; s++)
                        if (e[s] in t.style) return !0;
                    })();
                  }),
                  (t.prototype.isVideo = function (e, t) {
                    var s;
                    if (
                      ((s = this.s.dynamic
                        ? this.s.dynamicEl[t].html
                        : this.items[t].getAttribute("data-html")),
                      !e && s)
                    )
                      return { html5: !0 };
                    var i = e.match(
                        /\/\/(?:www\.)?youtu(?:\.be|be\.com|be-nocookie\.com)\/(?:watch\?v=|embed\/)?([a-z0-9\-\_\%]+)/i
                      ),
                      a = e.match(/\/\/(?:www\.)?vimeo.com\/([0-9a-z\-_]+)/i),
                      n = e.match(/\/\/(?:www\.)?dai.ly\/([0-9a-z\-_]+)/i),
                      r = e.match(
                        /\/\/(?:www\.)?(?:vk\.com|vkontakte\.ru)\/(?:video_ext\.php\?)(.*)/i
                      );
                    return i
                      ? { youtube: i }
                      : a
                      ? { vimeo: a }
                      : n
                      ? { dailymotion: n }
                      : r
                      ? { vk: r }
                      : void 0;
                  }),
                  (t.prototype.counter = function () {
                    this.s.counter &&
                      this.outer
                        .querySelector(this.s.appendCounterTo)
                        .insertAdjacentHTML(
                          "beforeend",
                          '<div id="lg-counter"><span id="lg-counter-current">' +
                            (parseInt(this.index, 10) + 1) +
                            '</span> / <span id="lg-counter-all">' +
                            this.items.length +
                            "</span></div>"
                        );
                  }),
                  (t.prototype.addHtml = function (e) {
                    var t,
                      i = null;
                    if (
                      (this.s.dynamic
                        ? (i = this.s.dynamicEl[e].subHtml)
                        : ((i = (t = this.items[e]).getAttribute(
                            "data-sub-html"
                          )),
                          this.s.getCaptionFromTitleOrAlt &&
                            !i &&
                            (i = t.getAttribute("title")) &&
                            t.querySelector("img") &&
                            (i = t.querySelector("img").getAttribute("alt"))),
                      null != i)
                    ) {
                      var a = i.substring(0, 1);
                      ("." !== a && "#" !== a) ||
                        (i =
                          this.s.subHtmlSelectorRelative && !this.s.dynamic
                            ? t.querySelector(i).innerHTML
                            : document.querySelector(i).innerHTML);
                    } else i = "";
                    ".lg-sub-html" === this.s.appendSubHtmlTo
                      ? (this.outer.querySelector(
                          this.s.appendSubHtmlTo
                        ).innerHTML = i)
                      : this.___slide[e].insertAdjacentHTML("beforeend", i),
                      null != i &&
                        ("" === i
                          ? s.default.addClass(
                              this.outer.querySelector(this.s.appendSubHtmlTo),
                              "lg-empty-html"
                            )
                          : s.default.removeClass(
                              this.outer.querySelector(this.s.appendSubHtmlTo),
                              "lg-empty-html"
                            )),
                      s.default.trigger(this.el, "onAfterAppendSubHtml", {
                        index: e,
                      });
                  }),
                  (t.prototype.preload = function (e) {
                    var t = 1,
                      s = 1;
                    for (
                      t = 1;
                      t <= this.s.preload && !(t >= this.items.length - e);
                      t++
                    )
                      this.loadContent(e + t, !1, 0);
                    for (s = 1; s <= this.s.preload && !(e - s < 0); s++)
                      this.loadContent(e - s, !1, 0);
                  }),
                  (t.prototype.loadContent = function (e, t, i) {
                    var a,
                      n,
                      r,
                      l,
                      o,
                      d,
                      c = this,
                      u = !1,
                      p = function (e) {
                        for (var t = [], s = [], i = 0; i < e.length; i++) {
                          var a = e[i].split(" ");
                          "" === a[0] && a.splice(0, 1),
                            s.push(a[0]),
                            t.push(a[1]);
                        }
                        for (
                          var r = window.innerWidth, l = 0;
                          l < t.length;
                          l++
                        )
                          if (parseInt(t[l], 10) > r) {
                            n = s[l];
                            break;
                          }
                      };
                    c.s.dynamic
                      ? (c.s.dynamicEl[e].poster &&
                          ((u = !0), (r = c.s.dynamicEl[e].poster)),
                        (d = c.s.dynamicEl[e].html),
                        (n = c.s.dynamicEl[e].src),
                        c.s.dynamicEl[e].responsive &&
                          p(c.s.dynamicEl[e].responsive.split(",")),
                        (l = c.s.dynamicEl[e].srcset),
                        (o = c.s.dynamicEl[e].sizes))
                      : (c.items[e].getAttribute("data-poster") &&
                          ((u = !0),
                          (r = c.items[e].getAttribute("data-poster"))),
                        (d = c.items[e].getAttribute("data-html")),
                        (n =
                          c.items[e].getAttribute("href") ||
                          c.items[e].getAttribute("data-src")),
                        c.items[e].getAttribute("data-responsive") &&
                          p(
                            c.items[e]
                              .getAttribute("data-responsive")
                              .split(",")
                          ),
                        (l = c.items[e].getAttribute("data-srcset")),
                        (o = c.items[e].getAttribute("data-sizes")));
                    var f = !1;
                    c.s.dynamic
                      ? c.s.dynamicEl[e].iframe && (f = !0)
                      : "true" === c.items[e].getAttribute("data-iframe") &&
                        (f = !0);
                    var h = c.isVideo(n, e);
                    if (!s.default.hasClass(c.___slide[e], "lg-loaded")) {
                      if (f)
                        c.___slide[e].insertAdjacentHTML(
                          "afterbegin",
                          '<div class="lg-video-cont" style="max-width:' +
                            c.s.iframeMaxWidth +
                            '"><div class="lg-video"><iframe class="lg-object" frameborder="0" src="' +
                            n +
                            '"  allowfullscreen="true"></iframe></div></div>'
                        );
                      else if (u) {
                        var m;
                        (m =
                          h && h.youtube
                            ? "lg-has-youtube"
                            : h && h.vimeo
                            ? "lg-has-vimeo"
                            : "lg-has-html5"),
                          c.___slide[e].insertAdjacentHTML(
                            "beforeend",
                            '<div class="lg-video-cont ' +
                              m +
                              ' "><div class="lg-video"><span class="lg-video-play"></span><img class="lg-object lg-has-poster" src="' +
                              r +
                              '" /></div></div>'
                          );
                      } else
                        h
                          ? (c.___slide[e].insertAdjacentHTML(
                              "beforeend",
                              '<div class="lg-video-cont "><div class="lg-video"></div></div>'
                            ),
                            s.default.trigger(c.el, "hasVideo", {
                              index: e,
                              src: n,
                              html: d,
                            }))
                          : c.___slide[e].insertAdjacentHTML(
                              "beforeend",
                              '<div class="lg-img-wrap"><img class="lg-object lg-image" src="' +
                                n +
                                '" /></div>'
                            );
                      if (
                        (s.default.trigger(c.el, "onAferAppendSlide", {
                          index: e,
                        }),
                        (a = c.___slide[e].querySelector(".lg-object")),
                        o && a.setAttribute("sizes", o),
                        l)
                      ) {
                        a.setAttribute("srcset", l);
                        try {
                          picturefill({ elements: [a[0]] });
                        } catch (e) {
                          console.error(
                            "Make sure you have included Picturefill version 2"
                          );
                        }
                      }
                      ".lg-sub-html" !== this.s.appendSubHtmlTo && c.addHtml(e),
                        s.default.addClass(c.___slide[e], "lg-loaded");
                    }
                    s.default.on(
                      c.___slide[e].querySelector(".lg-object"),
                      "load.lg error.lg",
                      function () {
                        var t = 0;
                        i &&
                          !s.default.hasClass(document.body, "lg-from-hash") &&
                          (t = i),
                          setTimeout(function () {
                            s.default.addClass(c.___slide[e], "lg-complete"),
                              s.default.trigger(c.el, "onSlideItemLoad", {
                                index: e,
                                delay: i || 0,
                              });
                          }, t);
                      }
                    ),
                      h &&
                        h.html5 &&
                        !u &&
                        s.default.addClass(c.___slide[e], "lg-complete"),
                      !0 === t &&
                        (s.default.hasClass(c.___slide[e], "lg-complete")
                          ? c.preload(e)
                          : s.default.on(
                              c.___slide[e].querySelector(".lg-object"),
                              "load.lg error.lg",
                              function () {
                                c.preload(e);
                              }
                            ));
                  }),
                  (t.prototype.slide = function (e, t, i) {
                    for (var a = 0, n = 0; n < this.___slide.length; n++)
                      if (s.default.hasClass(this.___slide[n], "lg-current")) {
                        a = n;
                        break;
                      }
                    var r = this;
                    if (!r.lGalleryOn || a !== e) {
                      var l = this.___slide.length,
                        o = r.lGalleryOn ? this.s.speed : 0,
                        d = !1,
                        c = !1;
                      if (!r.lgBusy) {
                        var u;
                        if (this.s.download)
                          (u = r.s.dynamic
                            ? !1 !== r.s.dynamicEl[e].downloadUrl &&
                              (r.s.dynamicEl[e].downloadUrl ||
                                r.s.dynamicEl[e].src)
                            : "false" !==
                                r.items[e].getAttribute("data-download-url") &&
                              (r.items[e].getAttribute("data-download-url") ||
                                r.items[e].getAttribute("href") ||
                                r.items[e].getAttribute("data-src")))
                            ? (document
                                .getElementById("lg-download")
                                .setAttribute("href", u),
                              s.default.removeClass(
                                r.outer,
                                "lg-hide-download"
                              ))
                            : s.default.addClass(r.outer, "lg-hide-download");
                        if (
                          (s.default.trigger(r.el, "onBeforeSlide", {
                            prevIndex: a,
                            index: e,
                            fromTouch: t,
                            fromThumb: i,
                          }),
                          (r.lgBusy = !0),
                          clearTimeout(r.hideBartimeout),
                          ".lg-sub-html" === this.s.appendSubHtmlTo &&
                            setTimeout(function () {
                              r.addHtml(e);
                            }, o),
                          this.arrowDisable(e),
                          t)
                        ) {
                          var p = e - 1,
                            f = e + 1;
                          ((0 === e && a === l - 1) ||
                            (e === l - 1 && 0 === a)) &&
                            ((f = 0), (p = l - 1)),
                            s.default.removeClass(
                              r.outer.querySelector(".lg-prev-slide"),
                              "lg-prev-slide"
                            ),
                            s.default.removeClass(
                              r.outer.querySelector(".lg-current"),
                              "lg-current"
                            ),
                            s.default.removeClass(
                              r.outer.querySelector(".lg-next-slide"),
                              "lg-next-slide"
                            ),
                            s.default.addClass(r.___slide[p], "lg-prev-slide"),
                            s.default.addClass(r.___slide[f], "lg-next-slide"),
                            s.default.addClass(r.___slide[e], "lg-current");
                        } else {
                          s.default.addClass(r.outer, "lg-no-trans");
                          for (var h = 0; h < this.___slide.length; h++)
                            s.default.removeClass(
                              this.___slide[h],
                              "lg-prev-slide"
                            ),
                              s.default.removeClass(
                                this.___slide[h],
                                "lg-next-slide"
                              );
                          e < a
                            ? ((c = !0),
                              0 !== e ||
                                a !== l - 1 ||
                                i ||
                                ((c = !1), (d = !0)))
                            : e > a &&
                              ((d = !0),
                              e !== l - 1 ||
                                0 !== a ||
                                i ||
                                ((c = !0), (d = !1))),
                            c
                              ? (s.default.addClass(
                                  this.___slide[e],
                                  "lg-prev-slide"
                                ),
                                s.default.addClass(
                                  this.___slide[a],
                                  "lg-next-slide"
                                ))
                              : d &&
                                (s.default.addClass(
                                  this.___slide[e],
                                  "lg-next-slide"
                                ),
                                s.default.addClass(
                                  this.___slide[a],
                                  "lg-prev-slide"
                                )),
                            setTimeout(function () {
                              s.default.removeClass(
                                r.outer.querySelector(".lg-current"),
                                "lg-current"
                              ),
                                s.default.addClass(r.___slide[e], "lg-current"),
                                s.default.removeClass(r.outer, "lg-no-trans");
                            }, 50);
                        }
                        r.lGalleryOn
                          ? (setTimeout(function () {
                              r.loadContent(e, !0, 0);
                            }, this.s.speed + 50),
                            setTimeout(function () {
                              (r.lgBusy = !1),
                                s.default.trigger(r.el, "onAfterSlide", {
                                  prevIndex: a,
                                  index: e,
                                  fromTouch: t,
                                  fromThumb: i,
                                });
                            }, this.s.speed))
                          : (r.loadContent(e, !0, r.s.backdropDuration),
                            (r.lgBusy = !1),
                            s.default.trigger(r.el, "onAfterSlide", {
                              prevIndex: a,
                              index: e,
                              fromTouch: t,
                              fromThumb: i,
                            })),
                          (r.lGalleryOn = !0),
                          this.s.counter &&
                            document.getElementById("lg-counter-current") &&
                            (document.getElementById(
                              "lg-counter-current"
                            ).innerHTML = e + 1);
                      }
                    }
                  }),
                  (t.prototype.goToNextSlide = function (e) {
                    var t = this;
                    t.lgBusy ||
                      (t.index + 1 < t.___slide.length
                        ? (t.index++,
                          s.default.trigger(t.el, "onBeforeNextSlide", {
                            index: t.index,
                          }),
                          t.slide(t.index, e, !1))
                        : t.s.loop
                        ? ((t.index = 0),
                          s.default.trigger(t.el, "onBeforeNextSlide", {
                            index: t.index,
                          }),
                          t.slide(t.index, e, !1))
                        : t.s.slideEndAnimatoin &&
                          (s.default.addClass(t.outer, "lg-right-end"),
                          setTimeout(function () {
                            s.default.removeClass(t.outer, "lg-right-end");
                          }, 400)));
                  }),
                  (t.prototype.goToPrevSlide = function (e) {
                    var t = this;
                    t.lgBusy ||
                      (t.index > 0
                        ? (t.index--,
                          s.default.trigger(t.el, "onBeforePrevSlide", {
                            index: t.index,
                            fromTouch: e,
                          }),
                          t.slide(t.index, e, !1))
                        : t.s.loop
                        ? ((t.index = t.items.length - 1),
                          s.default.trigger(t.el, "onBeforePrevSlide", {
                            index: t.index,
                            fromTouch: e,
                          }),
                          t.slide(t.index, e, !1))
                        : t.s.slideEndAnimatoin &&
                          (s.default.addClass(t.outer, "lg-left-end"),
                          setTimeout(function () {
                            s.default.removeClass(t.outer, "lg-left-end");
                          }, 400)));
                  }),
                  (t.prototype.keyPress = function () {
                    var e = this;
                    this.items.length > 1 &&
                      s.default.on(window, "keyup.lg", function (t) {
                        e.items.length > 1 &&
                          (37 === t.keyCode &&
                            (t.preventDefault(), e.goToPrevSlide()),
                          39 === t.keyCode &&
                            (t.preventDefault(), e.goToNextSlide()));
                      }),
                      s.default.on(window, "keydown.lg", function (t) {
                        !0 === e.s.escKey &&
                          27 === t.keyCode &&
                          (t.preventDefault(),
                          s.default.hasClass(e.outer, "lg-thumb-open")
                            ? s.default.removeClass(e.outer, "lg-thumb-open")
                            : e.destroy());
                      });
                  }),
                  (t.prototype.arrow = function () {
                    var e = this;
                    s.default.on(
                      this.outer.querySelector(".lg-prev"),
                      "click.lg",
                      function () {
                        e.goToPrevSlide();
                      }
                    ),
                      s.default.on(
                        this.outer.querySelector(".lg-next"),
                        "click.lg",
                        function () {
                          e.goToNextSlide();
                        }
                      );
                  }),
                  (t.prototype.arrowDisable = function (e) {
                    if (!this.s.loop && this.s.hideControlOnEnd) {
                      var t = this.outer.querySelector(".lg-next"),
                        i = this.outer.querySelector(".lg-prev");
                      e + 1 < this.___slide.length
                        ? (t.removeAttribute("disabled"),
                          s.default.removeClass(t, "disabled"))
                        : (t.setAttribute("disabled", "disabled"),
                          s.default.addClass(t, "disabled")),
                        e > 0
                          ? (i.removeAttribute("disabled"),
                            s.default.removeClass(i, "disabled"))
                          : (i.setAttribute("disabled", "disabled"),
                            s.default.addClass(i, "disabled"));
                    }
                  }),
                  (t.prototype.setTranslate = function (e, t, i) {
                    this.s.useLeft
                      ? (e.style.left = t)
                      : s.default.setVendor(
                          e,
                          "Transform",
                          "translate3d(" + t + "px, " + i + "px, 0px)"
                        );
                  }),
                  (t.prototype.touchMove = function (e, t) {
                    var i = t - e;
                    Math.abs(i) > 15 &&
                      (s.default.addClass(this.outer, "lg-dragging"),
                      this.setTranslate(this.___slide[this.index], i, 0),
                      this.setTranslate(
                        document.querySelector(".lg-prev-slide"),
                        -this.___slide[this.index].clientWidth + i,
                        0
                      ),
                      this.setTranslate(
                        document.querySelector(".lg-next-slide"),
                        this.___slide[this.index].clientWidth + i,
                        0
                      ));
                  }),
                  (t.prototype.touchEnd = function (e) {
                    var t = this;
                    "lg-slide" !== t.s.mode &&
                      s.default.addClass(t.outer, "lg-slide");
                    for (var i = 0; i < this.___slide.length; i++)
                      s.default.hasClass(this.___slide[i], "lg-current") ||
                        s.default.hasClass(this.___slide[i], "lg-prev-slide") ||
                        s.default.hasClass(this.___slide[i], "lg-next-slide") ||
                        (this.___slide[i].style.opacity = "0");
                    setTimeout(function () {
                      s.default.removeClass(t.outer, "lg-dragging"),
                        e < 0 && Math.abs(e) > t.s.swipeThreshold
                          ? t.goToNextSlide(!0)
                          : e > 0 && Math.abs(e) > t.s.swipeThreshold
                          ? t.goToPrevSlide(!0)
                          : Math.abs(e) < 5 &&
                            s.default.trigger(t.el, "onSlideClick");
                      for (var i = 0; i < t.___slide.length; i++)
                        t.___slide[i].removeAttribute("style");
                    }),
                      setTimeout(function () {
                        s.default.hasClass(t.outer, "lg-dragging") ||
                          "lg-slide" === t.s.mode ||
                          s.default.removeClass(t.outer, "lg-slide");
                      }, t.s.speed + 100);
                  }),
                  (t.prototype.enableSwipe = function () {
                    var e = this,
                      t = 0,
                      i = 0,
                      a = !1;
                    if (e.s.enableSwipe && e.isTouch && e.doCss()) {
                      for (var n = 0; n < e.___slide.length; n++)
                        s.default.on(
                          e.___slide[n],
                          "touchstart.lg",
                          function (i) {
                            s.default.hasClass(e.outer, "lg-zoomed") ||
                              e.lgBusy ||
                              (i.preventDefault(),
                              e.manageSwipeClass(),
                              (t = i.targetTouches[0].pageX));
                          }
                        );
                      for (var r = 0; r < e.___slide.length; r++)
                        s.default.on(
                          e.___slide[r],
                          "touchmove.lg",
                          function (n) {
                            s.default.hasClass(e.outer, "lg-zoomed") ||
                              (n.preventDefault(),
                              (i = n.targetTouches[0].pageX),
                              e.touchMove(t, i),
                              (a = !0));
                          }
                        );
                      for (var l = 0; l < e.___slide.length; l++)
                        s.default.on(e.___slide[l], "touchend.lg", function () {
                          s.default.hasClass(e.outer, "lg-zoomed") ||
                            (a
                              ? ((a = !1), e.touchEnd(i - t))
                              : s.default.trigger(e.el, "onSlideClick"));
                        });
                    }
                  }),
                  (t.prototype.enableDrag = function () {
                    var e = this,
                      t = 0,
                      i = 0,
                      a = !1,
                      n = !1;
                    if (e.s.enableDrag && !e.isTouch && e.doCss()) {
                      for (var r = 0; r < e.___slide.length; r++)
                        s.default.on(
                          e.___slide[r],
                          "mousedown.lg",
                          function (i) {
                            s.default.hasClass(e.outer, "lg-zoomed") ||
                              ((s.default.hasClass(i.target, "lg-object") ||
                                s.default.hasClass(
                                  i.target,
                                  "lg-video-play"
                                )) &&
                                (i.preventDefault(),
                                e.lgBusy ||
                                  (e.manageSwipeClass(),
                                  (t = i.pageX),
                                  (a = !0),
                                  (e.outer.scrollLeft += 1),
                                  (e.outer.scrollLeft -= 1),
                                  s.default.removeClass(e.outer, "lg-grab"),
                                  s.default.addClass(e.outer, "lg-grabbing"),
                                  s.default.trigger(e.el, "onDragstart"))));
                          }
                        );
                      s.default.on(window, "mousemove.lg", function (r) {
                        a &&
                          ((n = !0),
                          (i = r.pageX),
                          e.touchMove(t, i),
                          s.default.trigger(e.el, "onDragmove"));
                      }),
                        s.default.on(window, "mouseup.lg", function (r) {
                          n
                            ? ((n = !1),
                              e.touchEnd(i - t),
                              s.default.trigger(e.el, "onDragend"))
                            : (s.default.hasClass(r.target, "lg-object") ||
                                s.default.hasClass(
                                  r.target,
                                  "lg-video-play"
                                )) &&
                              s.default.trigger(e.el, "onSlideClick"),
                            a &&
                              ((a = !1),
                              s.default.removeClass(e.outer, "lg-grabbing"),
                              s.default.addClass(e.outer, "lg-grab"));
                        });
                    }
                  }),
                  (t.prototype.manageSwipeClass = function () {
                    var e = this.index + 1,
                      t = this.index - 1,
                      i = this.___slide.length;
                    this.s.loop &&
                      (0 === this.index
                        ? (t = i - 1)
                        : this.index === i - 1 && (e = 0));
                    for (var a = 0; a < this.___slide.length; a++)
                      s.default.removeClass(this.___slide[a], "lg-next-slide"),
                        s.default.removeClass(
                          this.___slide[a],
                          "lg-prev-slide"
                        );
                    t > -1 &&
                      s.default.addClass(this.___slide[t], "lg-prev-slide"),
                      s.default.addClass(this.___slide[e], "lg-next-slide");
                  }),
                  (t.prototype.mousewheel = function () {
                    var e = this;
                    s.default.on(e.outer, "mousewheel.lg", function (t) {
                      t.deltaY &&
                        (t.deltaY > 0 ? e.goToPrevSlide() : e.goToNextSlide(),
                        t.preventDefault());
                    });
                  }),
                  (t.prototype.closeGallery = function () {
                    var e = this,
                      t = !1;
                    s.default.on(
                      this.outer.querySelector(".lg-close"),
                      "click.lg",
                      function () {
                        e.destroy();
                      }
                    ),
                      e.s.closable &&
                        (s.default.on(e.outer, "mousedown.lg", function (e) {
                          t = !!(
                            s.default.hasClass(e.target, "lg-outer") ||
                            s.default.hasClass(e.target, "lg-item") ||
                            s.default.hasClass(e.target, "lg-img-wrap")
                          );
                        }),
                        s.default.on(e.outer, "mouseup.lg", function (i) {
                          (s.default.hasClass(i.target, "lg-outer") ||
                            s.default.hasClass(i.target, "lg-item") ||
                            (s.default.hasClass(i.target, "lg-img-wrap") &&
                              t)) &&
                            (s.default.hasClass(e.outer, "lg-dragging") ||
                              e.destroy());
                        }));
                  }),
                  (t.prototype.destroy = function (e) {
                    var t = this;
                    if (
                      (e || s.default.trigger(t.el, "onBeforeClose"),
                      (document.body.scrollTop = t.prevScrollTop),
                      (document.documentElement.scrollTop = t.prevScrollTop),
                      e)
                    ) {
                      if (!t.s.dynamic)
                        for (var i = 0; i < this.items.length; i++)
                          s.default.off(this.items[i], ".lg"),
                            s.default.off(this.items[i], ".lgcustom");
                      var a = t.el.getAttribute("lg-uid");
                      delete window.lgData[a], t.el.removeAttribute("lg-uid");
                    }
                    for (var n in (s.default.off(this.el, ".lgtm"),
                    window.lgModules))
                      t.modules[n] && t.modules[n].destroy(e);
                    (this.lGalleryOn = !1),
                      clearTimeout(t.hideBartimeout),
                      (this.hideBartimeout = !1),
                      s.default.off(window, ".lg"),
                      s.default.removeClass(document.body, "lg-on"),
                      s.default.removeClass(document.body, "lg-from-hash"),
                      t.outer && s.default.removeClass(t.outer, "lg-visible"),
                      s.default.removeClass(
                        document.querySelector(".lg-backdrop"),
                        "in"
                      ),
                      setTimeout(function () {
                        try {
                          t.outer && t.outer.parentNode.removeChild(t.outer),
                            document.querySelector(".lg-backdrop") &&
                              document
                                .querySelector(".lg-backdrop")
                                .parentNode.removeChild(
                                  document.querySelector(".lg-backdrop")
                                ),
                            e || s.default.trigger(t.el, "onCloseAfter");
                        } catch (e) {}
                      }, t.s.backdropDuration + 50);
                  }),
                  (window.lightGallery = function (e, s) {
                    if (e)
                      try {
                        if (e.getAttribute("lg-uid"))
                          try {
                            window.lgData[e.getAttribute("lg-uid")].init();
                          } catch (e) {
                            console.error(
                              "lightGallery has not initiated properly"
                            );
                          }
                        else {
                          var i = "lg" + window.lgData.uid++;
                          (window.lgData[i] = new t(e, s)),
                            e.setAttribute("lg-uid", i);
                        }
                      } catch (e) {
                        console.error(
                          "lightGallery has not initiated properly"
                        );
                      }
                  });
              });
            },
            { "./lg-utils": 1 },
          ],
        },
        {},
        [2]
      )(2);
    }),
    (function (e, t) {
      "object" == typeof exports && "undefined" != typeof module
        ? (module.exports = t())
        : "function" == typeof define && define.amd
        ? define(t)
        : ((e =
            "undefined" != typeof globalThis ? globalThis : e || self).Swiper =
            t());
    })(void 0, function () {
      function e(e) {
        return (
          null !== e &&
          "object" == typeof e &&
          "constructor" in e &&
          e.constructor === Object
        );
      }
      function t(s, i) {
        void 0 === s && (s = {}),
          void 0 === i && (i = {}),
          Object.keys(i).forEach((a) => {
            void 0 === s[a]
              ? (s[a] = i[a])
              : e(i[a]) &&
                e(s[a]) &&
                Object.keys(i[a]).length > 0 &&
                t(s[a], i[a]);
          });
      }
      const s = {
        body: {},
        addEventListener() {},
        removeEventListener() {},
        activeElement: { blur() {}, nodeName: "" },
        querySelector: () => null,
        querySelectorAll: () => [],
        getElementById: () => null,
        createEvent: () => ({ initEvent() {} }),
        createElement: () => ({
          children: [],
          childNodes: [],
          style: {},
          setAttribute() {},
          getElementsByTagName: () => [],
        }),
        createElementNS: () => ({}),
        importNode: () => null,
        location: {
          hash: "",
          host: "",
          hostname: "",
          href: "",
          origin: "",
          pathname: "",
          protocol: "",
          search: "",
        },
      };
      function i() {
        const e = "undefined" != typeof document ? document : {};
        return t(e, s), e;
      }
      const a = {
        document: s,
        navigator: { userAgent: "" },
        location: {
          hash: "",
          host: "",
          hostname: "",
          href: "",
          origin: "",
          pathname: "",
          protocol: "",
          search: "",
        },
        history: { replaceState() {}, pushState() {}, go() {}, back() {} },
        CustomEvent: function () {
          return this;
        },
        addEventListener() {},
        removeEventListener() {},
        getComputedStyle: () => ({ getPropertyValue: () => "" }),
        Image() {},
        Date() {},
        screen: {},
        setTimeout() {},
        clearTimeout() {},
        matchMedia: () => ({}),
        requestAnimationFrame: (e) =>
          "undefined" == typeof setTimeout ? (e(), null) : setTimeout(e, 0),
        cancelAnimationFrame(e) {
          "undefined" != typeof setTimeout && clearTimeout(e);
        },
      };
      function n() {
        const e = "undefined" != typeof window ? window : {};
        return t(e, a), e;
      }
      class r extends Array {
        constructor(e) {
          "number" == typeof e
            ? super(e)
            : (super(...(e || [])),
              (function (e) {
                const t = e.__proto__;
                Object.defineProperty(e, "__proto__", {
                  get: () => t,
                  set(e) {
                    t.__proto__ = e;
                  },
                });
              })(this));
        }
      }
      function l(e) {
        void 0 === e && (e = []);
        const t = [];
        return (
          e.forEach((e) => {
            Array.isArray(e) ? t.push(...l(e)) : t.push(e);
          }),
          t
        );
      }
      function o(e, t) {
        return Array.prototype.filter.call(e, t);
      }
      function d(e, t) {
        const s = n(),
          a = i();
        let l = [];
        if (!t && e instanceof r) return e;
        if (!e) return new r(l);
        if ("string" == typeof e) {
          const s = e.trim();
          if (s.indexOf("<") >= 0 && s.indexOf(">") >= 0) {
            let e = "div";
            0 === s.indexOf("<li") && (e = "ul"),
              0 === s.indexOf("<tr") && (e = "tbody"),
              (0 !== s.indexOf("<td") && 0 !== s.indexOf("<th")) || (e = "tr"),
              0 === s.indexOf("<tbody") && (e = "table"),
              0 === s.indexOf("<option") && (e = "select");
            const t = a.createElement(e);
            t.innerHTML = s;
            for (let e = 0; e < t.childNodes.length; e += 1)
              l.push(t.childNodes[e]);
          } else
            l = (function (e, t) {
              if ("string" != typeof e) return [e];
              const s = [],
                i = t.querySelectorAll(e);
              for (let e = 0; e < i.length; e += 1) s.push(i[e]);
              return s;
            })(e.trim(), t || a);
        } else if (e.nodeType || e === s || e === a) l.push(e);
        else if (Array.isArray(e)) {
          if (e instanceof r) return e;
          l = e;
        }
        return new r(
          (function (e) {
            const t = [];
            for (let s = 0; s < e.length; s += 1)
              -1 === t.indexOf(e[s]) && t.push(e[s]);
            return t;
          })(l)
        );
      }
      d.fn = r.prototype;
      const c = {
        addClass: function () {
          for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++)
            t[s] = arguments[s];
          const i = l(t.map((e) => e.split(" ")));
          return (
            this.forEach((e) => {
              e.classList.add(...i);
            }),
            this
          );
        },
        removeClass: function () {
          for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++)
            t[s] = arguments[s];
          const i = l(t.map((e) => e.split(" ")));
          return (
            this.forEach((e) => {
              e.classList.remove(...i);
            }),
            this
          );
        },
        hasClass: function () {
          for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++)
            t[s] = arguments[s];
          const i = l(t.map((e) => e.split(" ")));
          return (
            o(this, (e) => i.filter((t) => e.classList.contains(t)).length > 0)
              .length > 0
          );
        },
        toggleClass: function () {
          for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++)
            t[s] = arguments[s];
          const i = l(t.map((e) => e.split(" ")));
          this.forEach((e) => {
            i.forEach((t) => {
              e.classList.toggle(t);
            });
          });
        },
        attr: function (e, t) {
          if (1 === arguments.length && "string" == typeof e)
            return this[0] ? this[0].getAttribute(e) : void 0;
          for (let s = 0; s < this.length; s += 1)
            if (2 === arguments.length) this[s].setAttribute(e, t);
            else
              for (const t in e)
                (this[s][t] = e[t]), this[s].setAttribute(t, e[t]);
          return this;
        },
        removeAttr: function (e) {
          for (let t = 0; t < this.length; t += 1) this[t].removeAttribute(e);
          return this;
        },
        transform: function (e) {
          for (let t = 0; t < this.length; t += 1) this[t].style.transform = e;
          return this;
        },
        transition: function (e) {
          for (let t = 0; t < this.length; t += 1)
            this[t].style.transitionDuration =
              "string" != typeof e ? `${e}ms` : e;
          return this;
        },
        on: function () {
          for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++)
            t[s] = arguments[s];
          let [i, a, n, r] = t;
          function l(e) {
            const t = e.target;
            if (!t) return;
            const s = e.target.dom7EventData || [];
            if ((s.indexOf(e) < 0 && s.unshift(e), d(t).is(a))) n.apply(t, s);
            else {
              const e = d(t).parents();
              for (let t = 0; t < e.length; t += 1)
                d(e[t]).is(a) && n.apply(e[t], s);
            }
          }
          function o(e) {
            const t = (e && e.target && e.target.dom7EventData) || [];
            t.indexOf(e) < 0 && t.unshift(e), n.apply(this, t);
          }
          "function" == typeof t[1] && (([i, n, r] = t), (a = void 0)),
            r || (r = !1);
          const c = i.split(" ");
          let u;
          for (let e = 0; e < this.length; e += 1) {
            const t = this[e];
            if (a)
              for (u = 0; u < c.length; u += 1) {
                const e = c[u];
                t.dom7LiveListeners || (t.dom7LiveListeners = {}),
                  t.dom7LiveListeners[e] || (t.dom7LiveListeners[e] = []),
                  t.dom7LiveListeners[e].push({
                    listener: n,
                    proxyListener: l,
                  }),
                  t.addEventListener(e, l, r);
              }
            else
              for (u = 0; u < c.length; u += 1) {
                const e = c[u];
                t.dom7Listeners || (t.dom7Listeners = {}),
                  t.dom7Listeners[e] || (t.dom7Listeners[e] = []),
                  t.dom7Listeners[e].push({ listener: n, proxyListener: o }),
                  t.addEventListener(e, o, r);
              }
          }
          return this;
        },
        off: function () {
          for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++)
            t[s] = arguments[s];
          let [i, a, n, r] = t;
          "function" == typeof t[1] && (([i, n, r] = t), (a = void 0)),
            r || (r = !1);
          const l = i.split(" ");
          for (let e = 0; e < l.length; e += 1) {
            const t = l[e];
            for (let e = 0; e < this.length; e += 1) {
              const s = this[e];
              let i;
              if (
                (!a && s.dom7Listeners
                  ? (i = s.dom7Listeners[t])
                  : a && s.dom7LiveListeners && (i = s.dom7LiveListeners[t]),
                i && i.length)
              )
                for (let e = i.length - 1; e >= 0; e -= 1) {
                  const a = i[e];
                  (n && a.listener === n) ||
                  (n &&
                    a.listener &&
                    a.listener.dom7proxy &&
                    a.listener.dom7proxy === n)
                    ? (s.removeEventListener(t, a.proxyListener, r),
                      i.splice(e, 1))
                    : n ||
                      (s.removeEventListener(t, a.proxyListener, r),
                      i.splice(e, 1));
                }
            }
          }
          return this;
        },
        trigger: function () {
          const e = n();
          for (var t = arguments.length, s = new Array(t), i = 0; i < t; i++)
            s[i] = arguments[i];
          const a = s[0].split(" "),
            r = s[1];
          for (let t = 0; t < a.length; t += 1) {
            const i = a[t];
            for (let t = 0; t < this.length; t += 1) {
              const a = this[t];
              if (e.CustomEvent) {
                const t = new e.CustomEvent(i, {
                  detail: r,
                  bubbles: !0,
                  cancelable: !0,
                });
                (a.dom7EventData = s.filter((e, t) => t > 0)),
                  a.dispatchEvent(t),
                  (a.dom7EventData = []),
                  delete a.dom7EventData;
              }
            }
          }
          return this;
        },
        transitionEnd: function (e) {
          const t = this;
          return (
            e &&
              t.on("transitionend", function s(i) {
                i.target === this &&
                  (e.call(this, i), t.off("transitionend", s));
              }),
            this
          );
        },
        outerWidth: function (e) {
          if (this.length > 0) {
            if (e) {
              const e = this.styles();
              return (
                this[0].offsetWidth +
                parseFloat(e.getPropertyValue("margin-right")) +
                parseFloat(e.getPropertyValue("margin-left"))
              );
            }
            return this[0].offsetWidth;
          }
          return null;
        },
        outerHeight: function (e) {
          if (this.length > 0) {
            if (e) {
              const e = this.styles();
              return (
                this[0].offsetHeight +
                parseFloat(e.getPropertyValue("margin-top")) +
                parseFloat(e.getPropertyValue("margin-bottom"))
              );
            }
            return this[0].offsetHeight;
          }
          return null;
        },
        styles: function () {
          const e = n();
          return this[0] ? e.getComputedStyle(this[0], null) : {};
        },
        offset: function () {
          if (this.length > 0) {
            const e = n(),
              t = i(),
              s = this[0],
              a = s.getBoundingClientRect(),
              r = t.body,
              l = s.clientTop || r.clientTop || 0,
              o = s.clientLeft || r.clientLeft || 0,
              d = s === e ? e.scrollY : s.scrollTop,
              c = s === e ? e.scrollX : s.scrollLeft;
            return { top: a.top + d - l, left: a.left + c - o };
          }
          return null;
        },
        css: function (e, t) {
          const s = n();
          let i;
          if (1 === arguments.length) {
            if ("string" != typeof e) {
              for (i = 0; i < this.length; i += 1)
                for (const t in e) this[i].style[t] = e[t];
              return this;
            }
            if (this[0])
              return s.getComputedStyle(this[0], null).getPropertyValue(e);
          }
          if (2 === arguments.length && "string" == typeof e) {
            for (i = 0; i < this.length; i += 1) this[i].style[e] = t;
            return this;
          }
          return this;
        },
        each: function (e) {
          return e
            ? (this.forEach((t, s) => {
                e.apply(t, [t, s]);
              }),
              this)
            : this;
        },
        html: function (e) {
          if (void 0 === e) return this[0] ? this[0].innerHTML : null;
          for (let t = 0; t < this.length; t += 1) this[t].innerHTML = e;
          return this;
        },
        text: function (e) {
          if (void 0 === e) return this[0] ? this[0].textContent.trim() : null;
          for (let t = 0; t < this.length; t += 1) this[t].textContent = e;
          return this;
        },
        is: function (e) {
          const t = n(),
            s = i(),
            a = this[0];
          let l, o;
          if (!a || void 0 === e) return !1;
          if ("string" == typeof e) {
            if (a.matches) return a.matches(e);
            if (a.webkitMatchesSelector) return a.webkitMatchesSelector(e);
            if (a.msMatchesSelector) return a.msMatchesSelector(e);
            for (l = d(e), o = 0; o < l.length; o += 1)
              if (l[o] === a) return !0;
            return !1;
          }
          if (e === s) return a === s;
          if (e === t) return a === t;
          if (e.nodeType || e instanceof r) {
            for (l = e.nodeType ? [e] : e, o = 0; o < l.length; o += 1)
              if (l[o] === a) return !0;
            return !1;
          }
          return !1;
        },
        index: function () {
          let e,
            t = this[0];
          if (t) {
            for (e = 0; null !== (t = t.previousSibling); )
              1 === t.nodeType && (e += 1);
            return e;
          }
        },
        eq: function (e) {
          if (void 0 === e) return this;
          const t = this.length;
          if (e > t - 1) return d([]);
          if (e < 0) {
            const s = t + e;
            return d(s < 0 ? [] : [this[s]]);
          }
          return d([this[e]]);
        },
        append: function () {
          let e;
          const t = i();
          for (let s = 0; s < arguments.length; s += 1) {
            e = s < 0 || arguments.length <= s ? void 0 : arguments[s];
            for (let s = 0; s < this.length; s += 1)
              if ("string" == typeof e) {
                const i = t.createElement("div");
                for (i.innerHTML = e; i.firstChild; )
                  this[s].appendChild(i.firstChild);
              } else if (e instanceof r)
                for (let t = 0; t < e.length; t += 1) this[s].appendChild(e[t]);
              else this[s].appendChild(e);
          }
          return this;
        },
        prepend: function (e) {
          const t = i();
          let s, a;
          for (s = 0; s < this.length; s += 1)
            if ("string" == typeof e) {
              const i = t.createElement("div");
              for (i.innerHTML = e, a = i.childNodes.length - 1; a >= 0; a -= 1)
                this[s].insertBefore(i.childNodes[a], this[s].childNodes[0]);
            } else if (e instanceof r)
              for (a = 0; a < e.length; a += 1)
                this[s].insertBefore(e[a], this[s].childNodes[0]);
            else this[s].insertBefore(e, this[s].childNodes[0]);
          return this;
        },
        next: function (e) {
          return this.length > 0
            ? e
              ? this[0].nextElementSibling &&
                d(this[0].nextElementSibling).is(e)
                ? d([this[0].nextElementSibling])
                : d([])
              : this[0].nextElementSibling
              ? d([this[0].nextElementSibling])
              : d([])
            : d([]);
        },
        nextAll: function (e) {
          const t = [];
          let s = this[0];
          if (!s) return d([]);
          for (; s.nextElementSibling; ) {
            const i = s.nextElementSibling;
            e ? d(i).is(e) && t.push(i) : t.push(i), (s = i);
          }
          return d(t);
        },
        prev: function (e) {
          if (this.length > 0) {
            const t = this[0];
            return e
              ? t.previousElementSibling && d(t.previousElementSibling).is(e)
                ? d([t.previousElementSibling])
                : d([])
              : t.previousElementSibling
              ? d([t.previousElementSibling])
              : d([]);
          }
          return d([]);
        },
        prevAll: function (e) {
          const t = [];
          let s = this[0];
          if (!s) return d([]);
          for (; s.previousElementSibling; ) {
            const i = s.previousElementSibling;
            e ? d(i).is(e) && t.push(i) : t.push(i), (s = i);
          }
          return d(t);
        },
        parent: function (e) {
          const t = [];
          for (let s = 0; s < this.length; s += 1)
            null !== this[s].parentNode &&
              (e
                ? d(this[s].parentNode).is(e) && t.push(this[s].parentNode)
                : t.push(this[s].parentNode));
          return d(t);
        },
        parents: function (e) {
          const t = [];
          for (let s = 0; s < this.length; s += 1) {
            let i = this[s].parentNode;
            for (; i; )
              e ? d(i).is(e) && t.push(i) : t.push(i), (i = i.parentNode);
          }
          return d(t);
        },
        closest: function (e) {
          let t = this;
          return void 0 === e
            ? d([])
            : (t.is(e) || (t = t.parents(e).eq(0)), t);
        },
        find: function (e) {
          const t = [];
          for (let s = 0; s < this.length; s += 1) {
            const i = this[s].querySelectorAll(e);
            for (let e = 0; e < i.length; e += 1) t.push(i[e]);
          }
          return d(t);
        },
        children: function (e) {
          const t = [];
          for (let s = 0; s < this.length; s += 1) {
            const i = this[s].children;
            for (let s = 0; s < i.length; s += 1)
              (e && !d(i[s]).is(e)) || t.push(i[s]);
          }
          return d(t);
        },
        filter: function (e) {
          return d(o(this, e));
        },
        remove: function () {
          for (let e = 0; e < this.length; e += 1)
            this[e].parentNode && this[e].parentNode.removeChild(this[e]);
          return this;
        },
      };
      function u(e, t) {
        return void 0 === t && (t = 0), setTimeout(e, t);
      }
      function p() {
        return Date.now();
      }
      function f(e, t) {
        void 0 === t && (t = "x");
        const s = n();
        let i, a, r;
        const l = (function (e) {
          const t = n();
          let s;
          return (
            t.getComputedStyle && (s = t.getComputedStyle(e, null)),
            !s && e.currentStyle && (s = e.currentStyle),
            s || (s = e.style),
            s
          );
        })(e);
        return (
          s.WebKitCSSMatrix
            ? ((a = l.transform || l.webkitTransform),
              a.split(",").length > 6 &&
                (a = a
                  .split(", ")
                  .map((e) => e.replace(",", "."))
                  .join(", ")),
              (r = new s.WebKitCSSMatrix("none" === a ? "" : a)))
            : ((r =
                l.MozTransform ||
                l.OTransform ||
                l.MsTransform ||
                l.msTransform ||
                l.transform ||
                l
                  .getPropertyValue("transform")
                  .replace("translate(", "matrix(1, 0, 0, 1,")),
              (i = r.toString().split(","))),
          "x" === t &&
            (a = s.WebKitCSSMatrix
              ? r.m41
              : 16 === i.length
              ? parseFloat(i[12])
              : parseFloat(i[4])),
          "y" === t &&
            (a = s.WebKitCSSMatrix
              ? r.m42
              : 16 === i.length
              ? parseFloat(i[13])
              : parseFloat(i[5])),
          a || 0
        );
      }
      function h(e) {
        return (
          "object" == typeof e &&
          null !== e &&
          e.constructor &&
          "Object" === Object.prototype.toString.call(e).slice(8, -1)
        );
      }
      function m(e) {
        return "undefined" != typeof window && void 0 !== window.HTMLElement
          ? e instanceof HTMLElement
          : e && (1 === e.nodeType || 11 === e.nodeType);
      }
      function g() {
        const e = Object(arguments.length <= 0 ? void 0 : arguments[0]),
          t = ["__proto__", "constructor", "prototype"];
        for (let s = 1; s < arguments.length; s += 1) {
          const i = s < 0 || arguments.length <= s ? void 0 : arguments[s];
          if (null != i && !m(i)) {
            const s = Object.keys(Object(i)).filter((e) => t.indexOf(e) < 0);
            for (let t = 0, a = s.length; t < a; t += 1) {
              const a = s[t],
                n = Object.getOwnPropertyDescriptor(i, a);
              void 0 !== n &&
                n.enumerable &&
                (h(e[a]) && h(i[a])
                  ? i[a].__swiper__
                    ? (e[a] = i[a])
                    : g(e[a], i[a])
                  : !h(e[a]) && h(i[a])
                  ? ((e[a] = {}),
                    i[a].__swiper__ ? (e[a] = i[a]) : g(e[a], i[a]))
                  : (e[a] = i[a]));
            }
          }
        }
        return e;
      }
      function v(e, t, s) {
        e.style.setProperty(t, s);
      }
      function w(e) {
        let { swiper: t, targetPosition: s, side: i } = e;
        const a = n(),
          r = -t.translate;
        let l,
          o = null;
        const d = t.params.speed;
        (t.wrapperEl.style.scrollSnapType = "none"),
          a.cancelAnimationFrame(t.cssModeFrameID);
        const c = s > r ? "next" : "prev",
          u = (e, t) => ("next" === c && e >= t) || ("prev" === c && e <= t),
          p = () => {
            (l = new Date().getTime()), null === o && (o = l);
            const e = Math.max(Math.min((l - o) / d, 1), 0),
              n = 0.5 - Math.cos(e * Math.PI) / 2;
            let c = r + n * (s - r);
            if ((u(c, s) && (c = s), t.wrapperEl.scrollTo({ [i]: c }), u(c, s)))
              return (
                (t.wrapperEl.style.overflow = "hidden"),
                (t.wrapperEl.style.scrollSnapType = ""),
                setTimeout(() => {
                  (t.wrapperEl.style.overflow = ""),
                    t.wrapperEl.scrollTo({ [i]: c });
                }),
                void a.cancelAnimationFrame(t.cssModeFrameID)
              );
            t.cssModeFrameID = a.requestAnimationFrame(p);
          };
        p();
      }
      let y, b, x;
      function E() {
        return (
          y ||
            (y = (function () {
              const e = n(),
                t = i();
              return {
                smoothScroll:
                  t.documentElement &&
                  "scrollBehavior" in t.documentElement.style,
                touch: !!(
                  "ontouchstart" in e ||
                  (e.DocumentTouch && t instanceof e.DocumentTouch)
                ),
                passiveListener: (function () {
                  let t = !1;
                  try {
                    const s = Object.defineProperty({}, "passive", {
                      get() {
                        t = !0;
                      },
                    });
                    e.addEventListener("testPassiveListener", null, s);
                  } catch (e) {}
                  return t;
                })(),
                gestures: "ongesturestart" in e,
              };
            })()),
          y
        );
      }
      function S(e) {
        return (
          void 0 === e && (e = {}),
          b ||
            (b = (function (e) {
              let { userAgent: t } = void 0 === e ? {} : e;
              const s = E(),
                i = n(),
                a = i.navigator.platform,
                r = t || i.navigator.userAgent,
                l = { ios: !1, android: !1 },
                o = i.screen.width,
                d = i.screen.height,
                c = r.match(/(Android);?[\s\/]+([\d.]+)?/);
              let u = r.match(/(iPad).*OS\s([\d_]+)/);
              const p = r.match(/(iPod)(.*OS\s([\d_]+))?/),
                f = !u && r.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
                h = "Win32" === a;
              let m = "MacIntel" === a;
              return (
                !u &&
                  m &&
                  s.touch &&
                  [
                    "1024x1366",
                    "1366x1024",
                    "834x1194",
                    "1194x834",
                    "834x1112",
                    "1112x834",
                    "768x1024",
                    "1024x768",
                    "820x1180",
                    "1180x820",
                    "810x1080",
                    "1080x810",
                  ].indexOf(`${o}x${d}`) >= 0 &&
                  ((u = r.match(/(Version)\/([\d.]+)/)),
                  u || (u = [0, 1, "13_0_0"]),
                  (m = !1)),
                c && !h && ((l.os = "android"), (l.android = !0)),
                (u || f || p) && ((l.os = "ios"), (l.ios = !0)),
                l
              );
            })(e)),
          b
        );
      }
      function C() {
        return (
          x ||
            (x = (function () {
              const e = n();
              return {
                isSafari: (function () {
                  const t = e.navigator.userAgent.toLowerCase();
                  return (
                    t.indexOf("safari") >= 0 &&
                    t.indexOf("chrome") < 0 &&
                    t.indexOf("android") < 0
                  );
                })(),
                isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
                  e.navigator.userAgent
                ),
              };
            })()),
          x
        );
      }
      Object.keys(c).forEach((e) => {
        Object.defineProperty(d.fn, e, { value: c[e], writable: !0 });
      });
      var T = {
          on(e, t, s) {
            const i = this;
            if ("function" != typeof t) return i;
            const a = s ? "unshift" : "push";
            return (
              e.split(" ").forEach((e) => {
                i.eventsListeners[e] || (i.eventsListeners[e] = []),
                  i.eventsListeners[e][a](t);
              }),
              i
            );
          },
          once(e, t, s) {
            const i = this;
            if ("function" != typeof t) return i;
            function a() {
              i.off(e, a), a.__emitterProxy && delete a.__emitterProxy;
              for (
                var s = arguments.length, n = new Array(s), r = 0;
                r < s;
                r++
              )
                n[r] = arguments[r];
              t.apply(i, n);
            }
            return (a.__emitterProxy = t), i.on(e, a, s);
          },
          onAny(e, t) {
            const s = this;
            if ("function" != typeof e) return s;
            const i = t ? "unshift" : "push";
            return (
              s.eventsAnyListeners.indexOf(e) < 0 && s.eventsAnyListeners[i](e),
              s
            );
          },
          offAny(e) {
            const t = this;
            if (!t.eventsAnyListeners) return t;
            const s = t.eventsAnyListeners.indexOf(e);
            return s >= 0 && t.eventsAnyListeners.splice(s, 1), t;
          },
          off(e, t) {
            const s = this;
            return s.eventsListeners
              ? (e.split(" ").forEach((e) => {
                  void 0 === t
                    ? (s.eventsListeners[e] = [])
                    : s.eventsListeners[e] &&
                      s.eventsListeners[e].forEach((i, a) => {
                        (i === t ||
                          (i.__emitterProxy && i.__emitterProxy === t)) &&
                          s.eventsListeners[e].splice(a, 1);
                      });
                }),
                s)
              : s;
          },
          emit() {
            const e = this;
            if (!e.eventsListeners) return e;
            let t, s, i;
            for (var a = arguments.length, n = new Array(a), r = 0; r < a; r++)
              n[r] = arguments[r];
            return (
              "string" == typeof n[0] || Array.isArray(n[0])
                ? ((t = n[0]), (s = n.slice(1, n.length)), (i = e))
                : ((t = n[0].events), (s = n[0].data), (i = n[0].context || e)),
              s.unshift(i),
              (Array.isArray(t) ? t : t.split(" ")).forEach((t) => {
                e.eventsAnyListeners &&
                  e.eventsAnyListeners.length &&
                  e.eventsAnyListeners.forEach((e) => {
                    e.apply(i, [t, ...s]);
                  }),
                  e.eventsListeners &&
                    e.eventsListeners[t] &&
                    e.eventsListeners[t].forEach((e) => {
                      e.apply(i, s);
                    });
              }),
              e
            );
          },
        },
        $ = {
          updateSize: function () {
            const e = this;
            let t, s;
            const i = e.$el;
            (t =
              void 0 !== e.params.width && null !== e.params.width
                ? e.params.width
                : i[0].clientWidth),
              (s =
                void 0 !== e.params.height && null !== e.params.height
                  ? e.params.height
                  : i[0].clientHeight),
              (0 === t && e.isHorizontal()) ||
                (0 === s && e.isVertical()) ||
                ((t =
                  t -
                  parseInt(i.css("padding-left") || 0, 10) -
                  parseInt(i.css("padding-right") || 0, 10)),
                (s =
                  s -
                  parseInt(i.css("padding-top") || 0, 10) -
                  parseInt(i.css("padding-bottom") || 0, 10)),
                Number.isNaN(t) && (t = 0),
                Number.isNaN(s) && (s = 0),
                Object.assign(e, {
                  width: t,
                  height: s,
                  size: e.isHorizontal() ? t : s,
                }));
          },
          updateSlides: function () {
            const e = this;
            function t(t) {
              return e.isHorizontal()
                ? t
                : {
                    width: "height",
                    "margin-top": "margin-left",
                    "margin-bottom ": "margin-right",
                    "margin-left": "margin-top",
                    "margin-right": "margin-bottom",
                    "padding-left": "padding-top",
                    "padding-right": "padding-bottom",
                    marginRight: "marginBottom",
                  }[t];
            }
            function s(e, s) {
              return parseFloat(e.getPropertyValue(t(s)) || 0);
            }
            const i = e.params,
              { $wrapperEl: a, size: n, rtlTranslate: r, wrongRTL: l } = e,
              o = e.virtual && i.virtual.enabled,
              d = o ? e.virtual.slides.length : e.slides.length,
              c = a.children(`.${e.params.slideClass}`),
              u = o ? e.virtual.slides.length : c.length;
            let p = [];
            const f = [],
              h = [];
            let m = i.slidesOffsetBefore;
            "function" == typeof m && (m = i.slidesOffsetBefore.call(e));
            let g = i.slidesOffsetAfter;
            "function" == typeof g && (g = i.slidesOffsetAfter.call(e));
            const w = e.snapGrid.length,
              y = e.slidesGrid.length;
            let b = i.spaceBetween,
              x = -m,
              E = 0,
              S = 0;
            if (void 0 === n) return;
            "string" == typeof b &&
              b.indexOf("%") >= 0 &&
              (b = (parseFloat(b.replace("%", "")) / 100) * n),
              (e.virtualSize = -b),
              r
                ? c.css({ marginLeft: "", marginBottom: "", marginTop: "" })
                : c.css({ marginRight: "", marginBottom: "", marginTop: "" }),
              i.centeredSlides &&
                i.cssMode &&
                (v(e.wrapperEl, "--swiper-centered-offset-before", ""),
                v(e.wrapperEl, "--swiper-centered-offset-after", ""));
            const C = i.grid && i.grid.rows > 1 && e.grid;
            let T;
            C && e.grid.initSlides(u);
            const $ =
              "auto" === i.slidesPerView &&
              i.breakpoints &&
              Object.keys(i.breakpoints).filter(
                (e) => void 0 !== i.breakpoints[e].slidesPerView
              ).length > 0;
            for (let a = 0; a < u; a += 1) {
              T = 0;
              const r = c.eq(a);
              if (
                (C && e.grid.updateSlide(a, r, u, t),
                "none" !== r.css("display"))
              ) {
                if ("auto" === i.slidesPerView) {
                  $ && (c[a].style[t("width")] = "");
                  const n = getComputedStyle(r[0]),
                    l = r[0].style.transform,
                    o = r[0].style.webkitTransform;
                  if (
                    (l && (r[0].style.transform = "none"),
                    o && (r[0].style.webkitTransform = "none"),
                    i.roundLengths)
                  )
                    T = e.isHorizontal() ? r.outerWidth(!0) : r.outerHeight(!0);
                  else {
                    const e = s(n, "width"),
                      t = s(n, "padding-left"),
                      i = s(n, "padding-right"),
                      a = s(n, "margin-left"),
                      l = s(n, "margin-right"),
                      o = n.getPropertyValue("box-sizing");
                    if (o && "border-box" === o) T = e + a + l;
                    else {
                      const { clientWidth: s, offsetWidth: n } = r[0];
                      T = e + t + i + a + l + (n - s);
                    }
                  }
                  l && (r[0].style.transform = l),
                    o && (r[0].style.webkitTransform = o),
                    i.roundLengths && (T = Math.floor(T));
                } else
                  (T = (n - (i.slidesPerView - 1) * b) / i.slidesPerView),
                    i.roundLengths && (T = Math.floor(T)),
                    c[a] && (c[a].style[t("width")] = `${T}px`);
                c[a] && (c[a].swiperSlideSize = T),
                  h.push(T),
                  i.centeredSlides
                    ? ((x = x + T / 2 + E / 2 + b),
                      0 === E && 0 !== a && (x = x - n / 2 - b),
                      0 === a && (x = x - n / 2 - b),
                      Math.abs(x) < 0.001 && (x = 0),
                      i.roundLengths && (x = Math.floor(x)),
                      S % i.slidesPerGroup == 0 && p.push(x),
                      f.push(x))
                    : (i.roundLengths && (x = Math.floor(x)),
                      (S - Math.min(e.params.slidesPerGroupSkip, S)) %
                        e.params.slidesPerGroup ==
                        0 && p.push(x),
                      f.push(x),
                      (x = x + T + b)),
                  (e.virtualSize += T + b),
                  (E = T),
                  (S += 1);
              }
            }
            if (
              ((e.virtualSize = Math.max(e.virtualSize, n) + g),
              r &&
                l &&
                ("slide" === i.effect || "coverflow" === i.effect) &&
                a.css({ width: `${e.virtualSize + i.spaceBetween}px` }),
              i.setWrapperSize &&
                a.css({ [t("width")]: `${e.virtualSize + i.spaceBetween}px` }),
              C && e.grid.updateWrapperSize(T, p, t),
              !i.centeredSlides)
            ) {
              const t = [];
              for (let s = 0; s < p.length; s += 1) {
                let a = p[s];
                i.roundLengths && (a = Math.floor(a)),
                  p[s] <= e.virtualSize - n && t.push(a);
              }
              (p = t),
                Math.floor(e.virtualSize - n) - Math.floor(p[p.length - 1]) >
                  1 && p.push(e.virtualSize - n);
            }
            if ((0 === p.length && (p = [0]), 0 !== i.spaceBetween)) {
              const s = e.isHorizontal() && r ? "marginLeft" : t("marginRight");
              c.filter((e, t) => !i.cssMode || t !== c.length - 1).css({
                [s]: `${b}px`,
              });
            }
            if (i.centeredSlides && i.centeredSlidesBounds) {
              let e = 0;
              h.forEach((t) => {
                e += t + (i.spaceBetween ? i.spaceBetween : 0);
              }),
                (e -= i.spaceBetween);
              const t = e - n;
              p = p.map((e) => (e < 0 ? -m : e > t ? t + g : e));
            }
            if (i.centerInsufficientSlides) {
              let e = 0;
              if (
                (h.forEach((t) => {
                  e += t + (i.spaceBetween ? i.spaceBetween : 0);
                }),
                (e -= i.spaceBetween),
                e < n)
              ) {
                const t = (n - e) / 2;
                p.forEach((e, s) => {
                  p[s] = e - t;
                }),
                  f.forEach((e, s) => {
                    f[s] = e + t;
                  });
              }
            }
            if (
              (Object.assign(e, {
                slides: c,
                snapGrid: p,
                slidesGrid: f,
                slidesSizesGrid: h,
              }),
              i.centeredSlides && i.cssMode && !i.centeredSlidesBounds)
            ) {
              v(e.wrapperEl, "--swiper-centered-offset-before", -p[0] + "px"),
                v(
                  e.wrapperEl,
                  "--swiper-centered-offset-after",
                  e.size / 2 - h[h.length - 1] / 2 + "px"
                );
              const t = -e.snapGrid[0],
                s = -e.slidesGrid[0];
              (e.snapGrid = e.snapGrid.map((e) => e + t)),
                (e.slidesGrid = e.slidesGrid.map((e) => e + s));
            }
            if (
              (u !== d && e.emit("slidesLengthChange"),
              p.length !== w &&
                (e.params.watchOverflow && e.checkOverflow(),
                e.emit("snapGridLengthChange")),
              f.length !== y && e.emit("slidesGridLengthChange"),
              i.watchSlidesProgress && e.updateSlidesOffset(),
              !(
                o ||
                i.cssMode ||
                ("slide" !== i.effect && "fade" !== i.effect)
              ))
            ) {
              const t = `${i.containerModifierClass}backface-hidden`,
                s = e.$el.hasClass(t);
              u <= i.maxBackfaceHiddenSlides
                ? s || e.$el.addClass(t)
                : s && e.$el.removeClass(t);
            }
          },
          updateAutoHeight: function (e) {
            const t = this,
              s = [],
              i = t.virtual && t.params.virtual.enabled;
            let a,
              n = 0;
            "number" == typeof e
              ? t.setTransition(e)
              : !0 === e && t.setTransition(t.params.speed);
            const r = (e) =>
              i
                ? t.slides.filter(
                    (t) =>
                      parseInt(
                        t.getAttribute("data-swiper-slide-index"),
                        10
                      ) === e
                  )[0]
                : t.slides.eq(e)[0];
            if ("auto" !== t.params.slidesPerView && t.params.slidesPerView > 1)
              if (t.params.centeredSlides)
                t.visibleSlides.each((e) => {
                  s.push(e);
                });
              else
                for (a = 0; a < Math.ceil(t.params.slidesPerView); a += 1) {
                  const e = t.activeIndex + a;
                  if (e > t.slides.length && !i) break;
                  s.push(r(e));
                }
            else s.push(r(t.activeIndex));
            for (a = 0; a < s.length; a += 1)
              if (void 0 !== s[a]) {
                const e = s[a].offsetHeight;
                n = e > n ? e : n;
              }
            (n || 0 === n) && t.$wrapperEl.css("height", `${n}px`);
          },
          updateSlidesOffset: function () {
            const e = this,
              t = e.slides;
            for (let s = 0; s < t.length; s += 1)
              t[s].swiperSlideOffset = e.isHorizontal()
                ? t[s].offsetLeft
                : t[s].offsetTop;
          },
          updateSlidesProgress: function (e) {
            void 0 === e && (e = (this && this.translate) || 0);
            const t = this,
              s = t.params,
              { slides: i, rtlTranslate: a, snapGrid: n } = t;
            if (0 === i.length) return;
            void 0 === i[0].swiperSlideOffset && t.updateSlidesOffset();
            let r = -e;
            a && (r = e),
              i.removeClass(s.slideVisibleClass),
              (t.visibleSlidesIndexes = []),
              (t.visibleSlides = []);
            for (let e = 0; e < i.length; e += 1) {
              const l = i[e];
              let o = l.swiperSlideOffset;
              s.cssMode && s.centeredSlides && (o -= i[0].swiperSlideOffset);
              const d =
                  (r + (s.centeredSlides ? t.minTranslate() : 0) - o) /
                  (l.swiperSlideSize + s.spaceBetween),
                c =
                  (r - n[0] + (s.centeredSlides ? t.minTranslate() : 0) - o) /
                  (l.swiperSlideSize + s.spaceBetween),
                u = -(r - o),
                p = u + t.slidesSizesGrid[e];
              ((u >= 0 && u < t.size - 1) ||
                (p > 1 && p <= t.size) ||
                (u <= 0 && p >= t.size)) &&
                (t.visibleSlides.push(l),
                t.visibleSlidesIndexes.push(e),
                i.eq(e).addClass(s.slideVisibleClass)),
                (l.progress = a ? -d : d),
                (l.originalProgress = a ? -c : c);
            }
            t.visibleSlides = d(t.visibleSlides);
          },
          updateProgress: function (e) {
            const t = this;
            if (void 0 === e) {
              const s = t.rtlTranslate ? -1 : 1;
              e = (t && t.translate && t.translate * s) || 0;
            }
            const s = t.params,
              i = t.maxTranslate() - t.minTranslate();
            let { progress: a, isBeginning: n, isEnd: r } = t;
            const l = n,
              o = r;
            0 === i
              ? ((a = 0), (n = !0), (r = !0))
              : ((a = (e - t.minTranslate()) / i), (n = a <= 0), (r = a >= 1)),
              Object.assign(t, { progress: a, isBeginning: n, isEnd: r }),
              (s.watchSlidesProgress || (s.centeredSlides && s.autoHeight)) &&
                t.updateSlidesProgress(e),
              n && !l && t.emit("reachBeginning toEdge"),
              r && !o && t.emit("reachEnd toEdge"),
              ((l && !n) || (o && !r)) && t.emit("fromEdge"),
              t.emit("progress", a);
          },
          updateSlidesClasses: function () {
            const e = this,
              {
                slides: t,
                params: s,
                $wrapperEl: i,
                activeIndex: a,
                realIndex: n,
              } = e,
              r = e.virtual && s.virtual.enabled;
            let l;
            t.removeClass(
              `${s.slideActiveClass} ${s.slideNextClass} ${s.slidePrevClass} ${s.slideDuplicateActiveClass} ${s.slideDuplicateNextClass} ${s.slideDuplicatePrevClass}`
            ),
              (l = r
                ? e.$wrapperEl.find(
                    `.${s.slideClass}[data-swiper-slide-index="${a}"]`
                  )
                : t.eq(a)),
              l.addClass(s.slideActiveClass),
              s.loop &&
                (l.hasClass(s.slideDuplicateClass)
                  ? i
                      .children(
                        `.${s.slideClass}:not(.${s.slideDuplicateClass})[data-swiper-slide-index="${n}"]`
                      )
                      .addClass(s.slideDuplicateActiveClass)
                  : i
                      .children(
                        `.${s.slideClass}.${s.slideDuplicateClass}[data-swiper-slide-index="${n}"]`
                      )
                      .addClass(s.slideDuplicateActiveClass));
            let o = l
              .nextAll(`.${s.slideClass}`)
              .eq(0)
              .addClass(s.slideNextClass);
            s.loop &&
              0 === o.length &&
              ((o = t.eq(0)), o.addClass(s.slideNextClass));
            let d = l
              .prevAll(`.${s.slideClass}`)
              .eq(0)
              .addClass(s.slidePrevClass);
            s.loop &&
              0 === d.length &&
              ((d = t.eq(-1)), d.addClass(s.slidePrevClass)),
              s.loop &&
                (o.hasClass(s.slideDuplicateClass)
                  ? i
                      .children(
                        `.${s.slideClass}:not(.${
                          s.slideDuplicateClass
                        })[data-swiper-slide-index="${o.attr(
                          "data-swiper-slide-index"
                        )}"]`
                      )
                      .addClass(s.slideDuplicateNextClass)
                  : i
                      .children(
                        `.${s.slideClass}.${
                          s.slideDuplicateClass
                        }[data-swiper-slide-index="${o.attr(
                          "data-swiper-slide-index"
                        )}"]`
                      )
                      .addClass(s.slideDuplicateNextClass),
                d.hasClass(s.slideDuplicateClass)
                  ? i
                      .children(
                        `.${s.slideClass}:not(.${
                          s.slideDuplicateClass
                        })[data-swiper-slide-index="${d.attr(
                          "data-swiper-slide-index"
                        )}"]`
                      )
                      .addClass(s.slideDuplicatePrevClass)
                  : i
                      .children(
                        `.${s.slideClass}.${
                          s.slideDuplicateClass
                        }[data-swiper-slide-index="${d.attr(
                          "data-swiper-slide-index"
                        )}"]`
                      )
                      .addClass(s.slideDuplicatePrevClass)),
              e.emitSlidesClasses();
          },
          updateActiveIndex: function (e) {
            const t = this,
              s = t.rtlTranslate ? t.translate : -t.translate,
              {
                slidesGrid: i,
                snapGrid: a,
                params: n,
                activeIndex: r,
                realIndex: l,
                snapIndex: o,
              } = t;
            let d,
              c = e;
            if (void 0 === c) {
              for (let e = 0; e < i.length; e += 1)
                void 0 !== i[e + 1]
                  ? s >= i[e] && s < i[e + 1] - (i[e + 1] - i[e]) / 2
                    ? (c = e)
                    : s >= i[e] && s < i[e + 1] && (c = e + 1)
                  : s >= i[e] && (c = e);
              n.normalizeSlideIndex && (c < 0 || void 0 === c) && (c = 0);
            }
            if (a.indexOf(s) >= 0) d = a.indexOf(s);
            else {
              const e = Math.min(n.slidesPerGroupSkip, c);
              d = e + Math.floor((c - e) / n.slidesPerGroup);
            }
            if ((d >= a.length && (d = a.length - 1), c === r))
              return void (
                d !== o && ((t.snapIndex = d), t.emit("snapIndexChange"))
              );
            const u = parseInt(
              t.slides.eq(c).attr("data-swiper-slide-index") || c,
              10
            );
            Object.assign(t, {
              snapIndex: d,
              realIndex: u,
              previousIndex: r,
              activeIndex: c,
            }),
              t.emit("activeIndexChange"),
              t.emit("snapIndexChange"),
              l !== u && t.emit("realIndexChange"),
              (t.initialized || t.params.runCallbacksOnInit) &&
                t.emit("slideChange");
          },
          updateClickedSlide: function (e) {
            const t = this,
              s = t.params,
              i = d(e).closest(`.${s.slideClass}`)[0];
            let a,
              n = !1;
            if (i)
              for (let e = 0; e < t.slides.length; e += 1)
                if (t.slides[e] === i) {
                  (n = !0), (a = e);
                  break;
                }
            if (!i || !n)
              return (t.clickedSlide = void 0), void (t.clickedIndex = void 0);
            (t.clickedSlide = i),
              t.virtual && t.params.virtual.enabled
                ? (t.clickedIndex = parseInt(
                    d(i).attr("data-swiper-slide-index"),
                    10
                  ))
                : (t.clickedIndex = a),
              s.slideToClickedSlide &&
                void 0 !== t.clickedIndex &&
                t.clickedIndex !== t.activeIndex &&
                t.slideToClickedSlide();
          },
        },
        M = {
          getTranslate: function (e) {
            void 0 === e && (e = this.isHorizontal() ? "x" : "y");
            const {
              params: t,
              rtlTranslate: s,
              translate: i,
              $wrapperEl: a,
            } = this;
            if (t.virtualTranslate) return s ? -i : i;
            if (t.cssMode) return i;
            let n = f(a[0], e);
            return s && (n = -n), n || 0;
          },
          setTranslate: function (e, t) {
            const s = this,
              {
                rtlTranslate: i,
                params: a,
                $wrapperEl: n,
                wrapperEl: r,
                progress: l,
              } = s;
            let o,
              d = 0,
              c = 0;
            s.isHorizontal() ? (d = i ? -e : e) : (c = e),
              a.roundLengths && ((d = Math.floor(d)), (c = Math.floor(c))),
              a.cssMode
                ? (r[s.isHorizontal() ? "scrollLeft" : "scrollTop"] =
                    s.isHorizontal() ? -d : -c)
                : a.virtualTranslate ||
                  n.transform(`translate3d(${d}px, ${c}px, 0px)`),
              (s.previousTranslate = s.translate),
              (s.translate = s.isHorizontal() ? d : c);
            const u = s.maxTranslate() - s.minTranslate();
            (o = 0 === u ? 0 : (e - s.minTranslate()) / u),
              o !== l && s.updateProgress(e),
              s.emit("setTranslate", s.translate, t);
          },
          minTranslate: function () {
            return -this.snapGrid[0];
          },
          maxTranslate: function () {
            return -this.snapGrid[this.snapGrid.length - 1];
          },
          translateTo: function (e, t, s, i, a) {
            void 0 === e && (e = 0),
              void 0 === t && (t = this.params.speed),
              void 0 === s && (s = !0),
              void 0 === i && (i = !0);
            const n = this,
              { params: r, wrapperEl: l } = n;
            if (n.animating && r.preventInteractionOnTransition) return !1;
            const o = n.minTranslate(),
              d = n.maxTranslate();
            let c;
            if (
              ((c = i && e > o ? o : i && e < d ? d : e),
              n.updateProgress(c),
              r.cssMode)
            ) {
              const e = n.isHorizontal();
              if (0 === t) l[e ? "scrollLeft" : "scrollTop"] = -c;
              else {
                if (!n.support.smoothScroll)
                  return (
                    w({
                      swiper: n,
                      targetPosition: -c,
                      side: e ? "left" : "top",
                    }),
                    !0
                  );
                l.scrollTo({ [e ? "left" : "top"]: -c, behavior: "smooth" });
              }
              return !0;
            }
            return (
              0 === t
                ? (n.setTransition(0),
                  n.setTranslate(c),
                  s &&
                    (n.emit("beforeTransitionStart", t, a),
                    n.emit("transitionEnd")))
                : (n.setTransition(t),
                  n.setTranslate(c),
                  s &&
                    (n.emit("beforeTransitionStart", t, a),
                    n.emit("transitionStart")),
                  n.animating ||
                    ((n.animating = !0),
                    n.onTranslateToWrapperTransitionEnd ||
                      (n.onTranslateToWrapperTransitionEnd = function (e) {
                        n &&
                          !n.destroyed &&
                          e.target === this &&
                          (n.$wrapperEl[0].removeEventListener(
                            "transitionend",
                            n.onTranslateToWrapperTransitionEnd
                          ),
                          n.$wrapperEl[0].removeEventListener(
                            "webkitTransitionEnd",
                            n.onTranslateToWrapperTransitionEnd
                          ),
                          (n.onTranslateToWrapperTransitionEnd = null),
                          delete n.onTranslateToWrapperTransitionEnd,
                          s && n.emit("transitionEnd"));
                      }),
                    n.$wrapperEl[0].addEventListener(
                      "transitionend",
                      n.onTranslateToWrapperTransitionEnd
                    ),
                    n.$wrapperEl[0].addEventListener(
                      "webkitTransitionEnd",
                      n.onTranslateToWrapperTransitionEnd
                    ))),
              !0
            );
          },
        };
      function _(e) {
        let { swiper: t, runCallbacks: s, direction: i, step: a } = e;
        const { activeIndex: n, previousIndex: r } = t;
        let l = i;
        if (
          (l || (l = n > r ? "next" : n < r ? "prev" : "reset"),
          t.emit(`transition${a}`),
          s && n !== r)
        ) {
          if ("reset" === l) return void t.emit(`slideResetTransition${a}`);
          t.emit(`slideChangeTransition${a}`),
            "next" === l
              ? t.emit(`slideNextTransition${a}`)
              : t.emit(`slidePrevTransition${a}`);
        }
      }
      var L = {
          slideTo: function (e, t, s, i, a) {
            if (
              (void 0 === e && (e = 0),
              void 0 === t && (t = this.params.speed),
              void 0 === s && (s = !0),
              "number" != typeof e && "string" != typeof e)
            )
              throw new Error(
                `The 'index' argument cannot have type other than 'number' or 'string'. [${typeof e}] given.`
              );
            if ("string" == typeof e) {
              const t = parseInt(e, 10);
              if (!isFinite(t))
                throw new Error(
                  `The passed-in 'index' (string) couldn't be converted to 'number'. [${e}] given.`
                );
              e = t;
            }
            const n = this;
            let r = e;
            r < 0 && (r = 0);
            const {
              params: l,
              snapGrid: o,
              slidesGrid: d,
              previousIndex: c,
              activeIndex: u,
              rtlTranslate: p,
              wrapperEl: f,
              enabled: h,
            } = n;
            if (
              (n.animating && l.preventInteractionOnTransition) ||
              (!h && !i && !a)
            )
              return !1;
            const m = Math.min(n.params.slidesPerGroupSkip, r);
            let g = m + Math.floor((r - m) / n.params.slidesPerGroup);
            g >= o.length && (g = o.length - 1),
              (u || l.initialSlide || 0) === (c || 0) &&
                s &&
                n.emit("beforeSlideChangeStart");
            const v = -o[g];
            if ((n.updateProgress(v), l.normalizeSlideIndex))
              for (let e = 0; e < d.length; e += 1) {
                const t = -Math.floor(100 * v),
                  s = Math.floor(100 * d[e]),
                  i = Math.floor(100 * d[e + 1]);
                void 0 !== d[e + 1]
                  ? t >= s && t < i - (i - s) / 2
                    ? (r = e)
                    : t >= s && t < i && (r = e + 1)
                  : t >= s && (r = e);
              }
            if (n.initialized && r !== u) {
              if (!n.allowSlideNext && v < n.translate && v < n.minTranslate())
                return !1;
              if (
                !n.allowSlidePrev &&
                v > n.translate &&
                v > n.maxTranslate() &&
                (u || 0) !== r
              )
                return !1;
            }
            let y;
            if (
              ((y = r > u ? "next" : r < u ? "prev" : "reset"),
              (p && -v === n.translate) || (!p && v === n.translate))
            )
              return (
                n.updateActiveIndex(r),
                l.autoHeight && n.updateAutoHeight(),
                n.updateSlidesClasses(),
                "slide" !== l.effect && n.setTranslate(v),
                "reset" !== y &&
                  (n.transitionStart(s, y), n.transitionEnd(s, y)),
                !1
              );
            if (l.cssMode) {
              const e = n.isHorizontal(),
                s = p ? v : -v;
              if (0 === t) {
                const t = n.virtual && n.params.virtual.enabled;
                t &&
                  ((n.wrapperEl.style.scrollSnapType = "none"),
                  (n._immediateVirtual = !0)),
                  (f[e ? "scrollLeft" : "scrollTop"] = s),
                  t &&
                    requestAnimationFrame(() => {
                      (n.wrapperEl.style.scrollSnapType = ""),
                        (n._swiperImmediateVirtual = !1);
                    });
              } else {
                if (!n.support.smoothScroll)
                  return (
                    w({
                      swiper: n,
                      targetPosition: s,
                      side: e ? "left" : "top",
                    }),
                    !0
                  );
                f.scrollTo({ [e ? "left" : "top"]: s, behavior: "smooth" });
              }
              return !0;
            }
            return (
              n.setTransition(t),
              n.setTranslate(v),
              n.updateActiveIndex(r),
              n.updateSlidesClasses(),
              n.emit("beforeTransitionStart", t, i),
              n.transitionStart(s, y),
              0 === t
                ? n.transitionEnd(s, y)
                : n.animating ||
                  ((n.animating = !0),
                  n.onSlideToWrapperTransitionEnd ||
                    (n.onSlideToWrapperTransitionEnd = function (e) {
                      n &&
                        !n.destroyed &&
                        e.target === this &&
                        (n.$wrapperEl[0].removeEventListener(
                          "transitionend",
                          n.onSlideToWrapperTransitionEnd
                        ),
                        n.$wrapperEl[0].removeEventListener(
                          "webkitTransitionEnd",
                          n.onSlideToWrapperTransitionEnd
                        ),
                        (n.onSlideToWrapperTransitionEnd = null),
                        delete n.onSlideToWrapperTransitionEnd,
                        n.transitionEnd(s, y));
                    }),
                  n.$wrapperEl[0].addEventListener(
                    "transitionend",
                    n.onSlideToWrapperTransitionEnd
                  ),
                  n.$wrapperEl[0].addEventListener(
                    "webkitTransitionEnd",
                    n.onSlideToWrapperTransitionEnd
                  )),
              !0
            );
          },
          slideToLoop: function (e, t, s, i) {
            void 0 === e && (e = 0),
              void 0 === t && (t = this.params.speed),
              void 0 === s && (s = !0);
            const a = this;
            let n = e;
            return (
              a.params.loop && (n += a.loopedSlides), a.slideTo(n, t, s, i)
            );
          },
          slideNext: function (e, t, s) {
            void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
            const i = this,
              { animating: a, enabled: n, params: r } = i;
            if (!n) return i;
            let l = r.slidesPerGroup;
            "auto" === r.slidesPerView &&
              1 === r.slidesPerGroup &&
              r.slidesPerGroupAuto &&
              (l = Math.max(i.slidesPerViewDynamic("current", !0), 1));
            const o = i.activeIndex < r.slidesPerGroupSkip ? 1 : l;
            if (r.loop) {
              if (a && r.loopPreventsSlide) return !1;
              i.loopFix(), (i._clientLeft = i.$wrapperEl[0].clientLeft);
            }
            return r.rewind && i.isEnd
              ? i.slideTo(0, e, t, s)
              : i.slideTo(i.activeIndex + o, e, t, s);
          },
          slidePrev: function (e, t, s) {
            void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
            const i = this,
              {
                params: a,
                animating: n,
                snapGrid: r,
                slidesGrid: l,
                rtlTranslate: o,
                enabled: d,
              } = i;
            if (!d) return i;
            if (a.loop) {
              if (n && a.loopPreventsSlide) return !1;
              i.loopFix(), (i._clientLeft = i.$wrapperEl[0].clientLeft);
            }
            function c(e) {
              return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e);
            }
            const u = c(o ? i.translate : -i.translate),
              p = r.map((e) => c(e));
            let f = r[p.indexOf(u) - 1];
            if (void 0 === f && a.cssMode) {
              let e;
              r.forEach((t, s) => {
                u >= t && (e = s);
              }),
                void 0 !== e && (f = r[e > 0 ? e - 1 : e]);
            }
            let h = 0;
            if (
              (void 0 !== f &&
                ((h = l.indexOf(f)),
                h < 0 && (h = i.activeIndex - 1),
                "auto" === a.slidesPerView &&
                  1 === a.slidesPerGroup &&
                  a.slidesPerGroupAuto &&
                  ((h = h - i.slidesPerViewDynamic("previous", !0) + 1),
                  (h = Math.max(h, 0)))),
              a.rewind && i.isBeginning)
            ) {
              const a =
                i.params.virtual && i.params.virtual.enabled && i.virtual
                  ? i.virtual.slides.length - 1
                  : i.slides.length - 1;
              return i.slideTo(a, e, t, s);
            }
            return i.slideTo(h, e, t, s);
          },
          slideReset: function (e, t, s) {
            return (
              void 0 === e && (e = this.params.speed),
              void 0 === t && (t = !0),
              this.slideTo(this.activeIndex, e, t, s)
            );
          },
          slideToClosest: function (e, t, s, i) {
            void 0 === e && (e = this.params.speed),
              void 0 === t && (t = !0),
              void 0 === i && (i = 0.5);
            const a = this;
            let n = a.activeIndex;
            const r = Math.min(a.params.slidesPerGroupSkip, n),
              l = r + Math.floor((n - r) / a.params.slidesPerGroup),
              o = a.rtlTranslate ? a.translate : -a.translate;
            if (o >= a.snapGrid[l]) {
              const e = a.snapGrid[l];
              o - e > (a.snapGrid[l + 1] - e) * i &&
                (n += a.params.slidesPerGroup);
            } else {
              const e = a.snapGrid[l - 1];
              o - e <= (a.snapGrid[l] - e) * i &&
                (n -= a.params.slidesPerGroup);
            }
            return (
              (n = Math.max(n, 0)),
              (n = Math.min(n, a.slidesGrid.length - 1)),
              a.slideTo(n, e, t, s)
            );
          },
          slideToClickedSlide: function () {
            const e = this,
              { params: t, $wrapperEl: s } = e,
              i =
                "auto" === t.slidesPerView
                  ? e.slidesPerViewDynamic()
                  : t.slidesPerView;
            let a,
              n = e.clickedIndex;
            if (t.loop) {
              if (e.animating) return;
              (a = parseInt(
                d(e.clickedSlide).attr("data-swiper-slide-index"),
                10
              )),
                t.centeredSlides
                  ? n < e.loopedSlides - i / 2 ||
                    n > e.slides.length - e.loopedSlides + i / 2
                    ? (e.loopFix(),
                      (n = s
                        .children(
                          `.${t.slideClass}[data-swiper-slide-index="${a}"]:not(.${t.slideDuplicateClass})`
                        )
                        .eq(0)
                        .index()),
                      u(() => {
                        e.slideTo(n);
                      }))
                    : e.slideTo(n)
                  : n > e.slides.length - i
                  ? (e.loopFix(),
                    (n = s
                      .children(
                        `.${t.slideClass}[data-swiper-slide-index="${a}"]:not(.${t.slideDuplicateClass})`
                      )
                      .eq(0)
                      .index()),
                    u(() => {
                      e.slideTo(n);
                    }))
                  : e.slideTo(n);
            } else e.slideTo(n);
          },
        },
        k = {
          loopCreate: function () {
            const e = this,
              t = i(),
              { params: s, $wrapperEl: a } = e,
              n = a.children().length > 0 ? d(a.children()[0].parentNode) : a;
            n.children(`.${s.slideClass}.${s.slideDuplicateClass}`).remove();
            let r = n.children(`.${s.slideClass}`);
            if (s.loopFillGroupWithBlank) {
              const e = s.slidesPerGroup - (r.length % s.slidesPerGroup);
              if (e !== s.slidesPerGroup) {
                for (let i = 0; i < e; i += 1) {
                  const e = d(t.createElement("div")).addClass(
                    `${s.slideClass} ${s.slideBlankClass}`
                  );
                  n.append(e);
                }
                r = n.children(`.${s.slideClass}`);
              }
            }
            "auto" !== s.slidesPerView ||
              s.loopedSlides ||
              (s.loopedSlides = r.length),
              (e.loopedSlides = Math.ceil(
                parseFloat(s.loopedSlides || s.slidesPerView, 10)
              )),
              (e.loopedSlides += s.loopAdditionalSlides),
              e.loopedSlides > r.length && (e.loopedSlides = r.length);
            const l = [],
              o = [];
            r.each((t, s) => {
              const i = d(t);
              s < e.loopedSlides && o.push(t),
                s < r.length && s >= r.length - e.loopedSlides && l.push(t),
                i.attr("data-swiper-slide-index", s);
            });
            for (let e = 0; e < o.length; e += 1)
              n.append(d(o[e].cloneNode(!0)).addClass(s.slideDuplicateClass));
            for (let e = l.length - 1; e >= 0; e -= 1)
              n.prepend(d(l[e].cloneNode(!0)).addClass(s.slideDuplicateClass));
          },
          loopFix: function () {
            const e = this;
            e.emit("beforeLoopFix");
            const {
              activeIndex: t,
              slides: s,
              loopedSlides: i,
              allowSlidePrev: a,
              allowSlideNext: n,
              snapGrid: r,
              rtlTranslate: l,
            } = e;
            let o;
            (e.allowSlidePrev = !0), (e.allowSlideNext = !0);
            const d = -r[t] - e.getTranslate();
            t < i
              ? ((o = s.length - 3 * i + t),
                (o += i),
                e.slideTo(o, 0, !1, !0) &&
                  0 !== d &&
                  e.setTranslate((l ? -e.translate : e.translate) - d))
              : t >= s.length - i &&
                ((o = -s.length + t + i),
                (o += i),
                e.slideTo(o, 0, !1, !0) &&
                  0 !== d &&
                  e.setTranslate((l ? -e.translate : e.translate) - d)),
              (e.allowSlidePrev = a),
              (e.allowSlideNext = n),
              e.emit("loopFix");
          },
          loopDestroy: function () {
            const { $wrapperEl: e, params: t, slides: s } = this;
            e
              .children(
                `.${t.slideClass}.${t.slideDuplicateClass},.${t.slideClass}.${t.slideBlankClass}`
              )
              .remove(),
              s.removeAttr("data-swiper-slide-index");
          },
        };
      function A(e) {
        const t = this,
          s = i(),
          a = n(),
          r = t.touchEventsData,
          { params: l, touches: o, enabled: c } = t;
        if (!c) return;
        if (t.animating && l.preventInteractionOnTransition) return;
        !t.animating && l.cssMode && l.loop && t.loopFix();
        let u = e;
        u.originalEvent && (u = u.originalEvent);
        let f = d(u.target);
        if ("wrapper" === l.touchEventsTarget && !f.closest(t.wrapperEl).length)
          return;
        if (
          ((r.isTouchEvent = "touchstart" === u.type),
          !r.isTouchEvent && "which" in u && 3 === u.which)
        )
          return;
        if (!r.isTouchEvent && "button" in u && u.button > 0) return;
        if (r.isTouched && r.isMoved) return;
        l.noSwipingClass &&
          "" !== l.noSwipingClass &&
          u.target &&
          u.target.shadowRoot &&
          e.path &&
          e.path[0] &&
          (f = d(e.path[0]));
        const h = l.noSwipingSelector
            ? l.noSwipingSelector
            : `.${l.noSwipingClass}`,
          m = !(!u.target || !u.target.shadowRoot);
        if (
          l.noSwiping &&
          (m
            ? (function (e, t) {
                return (
                  void 0 === t && (t = this),
                  (function t(s) {
                    return s && s !== i() && s !== n()
                      ? (s.assignedSlot && (s = s.assignedSlot),
                        s.closest(e) || t(s.getRootNode().host))
                      : null;
                  })(t)
                );
              })(h, u.target)
            : f.closest(h)[0])
        )
          return void (t.allowClick = !0);
        if (l.swipeHandler && !f.closest(l.swipeHandler)[0]) return;
        (o.currentX =
          "touchstart" === u.type ? u.targetTouches[0].pageX : u.pageX),
          (o.currentY =
            "touchstart" === u.type ? u.targetTouches[0].pageY : u.pageY);
        const g = o.currentX,
          v = o.currentY,
          w = l.edgeSwipeDetection || l.iOSEdgeSwipeDetection,
          y = l.edgeSwipeThreshold || l.iOSEdgeSwipeThreshold;
        if (w && (g <= y || g >= a.innerWidth - y)) {
          if ("prevent" !== w) return;
          e.preventDefault();
        }
        if (
          (Object.assign(r, {
            isTouched: !0,
            isMoved: !1,
            allowTouchCallbacks: !0,
            isScrolling: void 0,
            startMoving: void 0,
          }),
          (o.startX = g),
          (o.startY = v),
          (r.touchStartTime = p()),
          (t.allowClick = !0),
          t.updateSize(),
          (t.swipeDirection = void 0),
          l.threshold > 0 && (r.allowThresholdMove = !1),
          "touchstart" !== u.type)
        ) {
          let e = !0;
          f.is(r.focusableElements) &&
            ((e = !1), "SELECT" === f[0].nodeName && (r.isTouched = !1)),
            s.activeElement &&
              d(s.activeElement).is(r.focusableElements) &&
              s.activeElement !== f[0] &&
              s.activeElement.blur();
          const i = e && t.allowTouchMove && l.touchStartPreventDefault;
          (!l.touchStartForcePreventDefault && !i) ||
            f[0].isContentEditable ||
            u.preventDefault();
        }
        t.params.freeMode &&
          t.params.freeMode.enabled &&
          t.freeMode &&
          t.animating &&
          !l.cssMode &&
          t.freeMode.onTouchStart(),
          t.emit("touchStart", u);
      }
      function P(e) {
        const t = i(),
          s = this,
          a = s.touchEventsData,
          { params: n, touches: r, rtlTranslate: l, enabled: o } = s;
        if (!o) return;
        let c = e;
        if ((c.originalEvent && (c = c.originalEvent), !a.isTouched))
          return void (
            a.startMoving &&
            a.isScrolling &&
            s.emit("touchMoveOpposite", c)
          );
        if (a.isTouchEvent && "touchmove" !== c.type) return;
        const u =
            "touchmove" === c.type &&
            c.targetTouches &&
            (c.targetTouches[0] || c.changedTouches[0]),
          f = "touchmove" === c.type ? u.pageX : c.pageX,
          h = "touchmove" === c.type ? u.pageY : c.pageY;
        if (c.preventedByNestedSwiper)
          return (r.startX = f), void (r.startY = h);
        if (!s.allowTouchMove)
          return (
            d(c.target).is(a.focusableElements) || (s.allowClick = !1),
            void (
              a.isTouched &&
              (Object.assign(r, {
                startX: f,
                startY: h,
                currentX: f,
                currentY: h,
              }),
              (a.touchStartTime = p()))
            )
          );
        if (a.isTouchEvent && n.touchReleaseOnEdges && !n.loop)
          if (s.isVertical()) {
            if (
              (h < r.startY && s.translate <= s.maxTranslate()) ||
              (h > r.startY && s.translate >= s.minTranslate())
            )
              return (a.isTouched = !1), void (a.isMoved = !1);
          } else if (
            (f < r.startX && s.translate <= s.maxTranslate()) ||
            (f > r.startX && s.translate >= s.minTranslate())
          )
            return;
        if (
          a.isTouchEvent &&
          t.activeElement &&
          c.target === t.activeElement &&
          d(c.target).is(a.focusableElements)
        )
          return (a.isMoved = !0), void (s.allowClick = !1);
        if (
          (a.allowTouchCallbacks && s.emit("touchMove", c),
          c.targetTouches && c.targetTouches.length > 1)
        )
          return;
        (r.currentX = f), (r.currentY = h);
        const m = r.currentX - r.startX,
          g = r.currentY - r.startY;
        if (
          s.params.threshold &&
          Math.sqrt(m ** 2 + g ** 2) < s.params.threshold
        )
          return;
        if (void 0 === a.isScrolling) {
          let e;
          (s.isHorizontal() && r.currentY === r.startY) ||
          (s.isVertical() && r.currentX === r.startX)
            ? (a.isScrolling = !1)
            : m * m + g * g >= 25 &&
              ((e = (180 * Math.atan2(Math.abs(g), Math.abs(m))) / Math.PI),
              (a.isScrolling = s.isHorizontal()
                ? e > n.touchAngle
                : 90 - e > n.touchAngle));
        }
        if (
          (a.isScrolling && s.emit("touchMoveOpposite", c),
          void 0 === a.startMoving &&
            ((r.currentX === r.startX && r.currentY === r.startY) ||
              (a.startMoving = !0)),
          a.isScrolling)
        )
          return void (a.isTouched = !1);
        if (!a.startMoving) return;
        (s.allowClick = !1),
          !n.cssMode && c.cancelable && c.preventDefault(),
          n.touchMoveStopPropagation && !n.nested && c.stopPropagation(),
          a.isMoved ||
            (n.loop && !n.cssMode && s.loopFix(),
            (a.startTranslate = s.getTranslate()),
            s.setTransition(0),
            s.animating &&
              s.$wrapperEl.trigger("webkitTransitionEnd transitionend"),
            (a.allowMomentumBounce = !1),
            !n.grabCursor ||
              (!0 !== s.allowSlideNext && !0 !== s.allowSlidePrev) ||
              s.setGrabCursor(!0),
            s.emit("sliderFirstMove", c)),
          s.emit("sliderMove", c),
          (a.isMoved = !0);
        let v = s.isHorizontal() ? m : g;
        (r.diff = v),
          (v *= n.touchRatio),
          l && (v = -v),
          (s.swipeDirection = v > 0 ? "prev" : "next"),
          (a.currentTranslate = v + a.startTranslate);
        let w = !0,
          y = n.resistanceRatio;
        if (
          (n.touchReleaseOnEdges && (y = 0),
          v > 0 && a.currentTranslate > s.minTranslate()
            ? ((w = !1),
              n.resistance &&
                (a.currentTranslate =
                  s.minTranslate() -
                  1 +
                  (-s.minTranslate() + a.startTranslate + v) ** y))
            : v < 0 &&
              a.currentTranslate < s.maxTranslate() &&
              ((w = !1),
              n.resistance &&
                (a.currentTranslate =
                  s.maxTranslate() +
                  1 -
                  (s.maxTranslate() - a.startTranslate - v) ** y)),
          w && (c.preventedByNestedSwiper = !0),
          !s.allowSlideNext &&
            "next" === s.swipeDirection &&
            a.currentTranslate < a.startTranslate &&
            (a.currentTranslate = a.startTranslate),
          !s.allowSlidePrev &&
            "prev" === s.swipeDirection &&
            a.currentTranslate > a.startTranslate &&
            (a.currentTranslate = a.startTranslate),
          s.allowSlidePrev ||
            s.allowSlideNext ||
            (a.currentTranslate = a.startTranslate),
          n.threshold > 0)
        ) {
          if (!(Math.abs(v) > n.threshold || a.allowThresholdMove))
            return void (a.currentTranslate = a.startTranslate);
          if (!a.allowThresholdMove)
            return (
              (a.allowThresholdMove = !0),
              (r.startX = r.currentX),
              (r.startY = r.currentY),
              (a.currentTranslate = a.startTranslate),
              void (r.diff = s.isHorizontal()
                ? r.currentX - r.startX
                : r.currentY - r.startY)
            );
        }
        n.followFinger &&
          !n.cssMode &&
          (((n.freeMode && n.freeMode.enabled && s.freeMode) ||
            n.watchSlidesProgress) &&
            (s.updateActiveIndex(), s.updateSlidesClasses()),
          s.params.freeMode &&
            n.freeMode.enabled &&
            s.freeMode &&
            s.freeMode.onTouchMove(),
          s.updateProgress(a.currentTranslate),
          s.setTranslate(a.currentTranslate));
      }
      function O(e) {
        const t = this,
          s = t.touchEventsData,
          {
            params: i,
            touches: a,
            rtlTranslate: n,
            slidesGrid: r,
            enabled: l,
          } = t;
        if (!l) return;
        let o = e;
        if (
          (o.originalEvent && (o = o.originalEvent),
          s.allowTouchCallbacks && t.emit("touchEnd", o),
          (s.allowTouchCallbacks = !1),
          !s.isTouched)
        )
          return (
            s.isMoved && i.grabCursor && t.setGrabCursor(!1),
            (s.isMoved = !1),
            void (s.startMoving = !1)
          );
        i.grabCursor &&
          s.isMoved &&
          s.isTouched &&
          (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) &&
          t.setGrabCursor(!1);
        const d = p(),
          c = d - s.touchStartTime;
        if (t.allowClick) {
          const e = o.path || (o.composedPath && o.composedPath());
          t.updateClickedSlide((e && e[0]) || o.target),
            t.emit("tap click", o),
            c < 300 &&
              d - s.lastClickTime < 300 &&
              t.emit("doubleTap doubleClick", o);
        }
        if (
          ((s.lastClickTime = p()),
          u(() => {
            t.destroyed || (t.allowClick = !0);
          }),
          !s.isTouched ||
            !s.isMoved ||
            !t.swipeDirection ||
            0 === a.diff ||
            s.currentTranslate === s.startTranslate)
        )
          return (
            (s.isTouched = !1), (s.isMoved = !1), void (s.startMoving = !1)
          );
        let f;
        if (
          ((s.isTouched = !1),
          (s.isMoved = !1),
          (s.startMoving = !1),
          (f = i.followFinger
            ? n
              ? t.translate
              : -t.translate
            : -s.currentTranslate),
          i.cssMode)
        )
          return;
        if (t.params.freeMode && i.freeMode.enabled)
          return void t.freeMode.onTouchEnd({ currentPos: f });
        let h = 0,
          m = t.slidesSizesGrid[0];
        for (
          let e = 0;
          e < r.length;
          e += e < i.slidesPerGroupSkip ? 1 : i.slidesPerGroup
        ) {
          const t = e < i.slidesPerGroupSkip - 1 ? 1 : i.slidesPerGroup;
          void 0 !== r[e + t]
            ? f >= r[e] && f < r[e + t] && ((h = e), (m = r[e + t] - r[e]))
            : f >= r[e] && ((h = e), (m = r[r.length - 1] - r[r.length - 2]));
        }
        let g = null,
          v = null;
        i.rewind &&
          (t.isBeginning
            ? (v =
                t.params.virtual && t.params.virtual.enabled && t.virtual
                  ? t.virtual.slides.length - 1
                  : t.slides.length - 1)
            : t.isEnd && (g = 0));
        const w = (f - r[h]) / m,
          y = h < i.slidesPerGroupSkip - 1 ? 1 : i.slidesPerGroup;
        if (c > i.longSwipesMs) {
          if (!i.longSwipes) return void t.slideTo(t.activeIndex);
          "next" === t.swipeDirection &&
            (w >= i.longSwipesRatio
              ? t.slideTo(i.rewind && t.isEnd ? g : h + y)
              : t.slideTo(h)),
            "prev" === t.swipeDirection &&
              (w > 1 - i.longSwipesRatio
                ? t.slideTo(h + y)
                : null !== v && w < 0 && Math.abs(w) > i.longSwipesRatio
                ? t.slideTo(v)
                : t.slideTo(h));
        } else {
          if (!i.shortSwipes) return void t.slideTo(t.activeIndex);
          !t.navigation ||
          (o.target !== t.navigation.nextEl && o.target !== t.navigation.prevEl)
            ? ("next" === t.swipeDirection && t.slideTo(null !== g ? g : h + y),
              "prev" === t.swipeDirection && t.slideTo(null !== v ? v : h))
            : o.target === t.navigation.nextEl
            ? t.slideTo(h + y)
            : t.slideTo(h);
        }
      }
      function z() {
        const e = this,
          { params: t, el: s } = e;
        if (s && 0 === s.offsetWidth) return;
        t.breakpoints && e.setBreakpoint();
        const { allowSlideNext: i, allowSlidePrev: a, snapGrid: n } = e;
        (e.allowSlideNext = !0),
          (e.allowSlidePrev = !0),
          e.updateSize(),
          e.updateSlides(),
          e.updateSlidesClasses(),
          ("auto" === t.slidesPerView || t.slidesPerView > 1) &&
          e.isEnd &&
          !e.isBeginning &&
          !e.params.centeredSlides
            ? e.slideTo(e.slides.length - 1, 0, !1, !0)
            : e.slideTo(e.activeIndex, 0, !1, !0),
          e.autoplay &&
            e.autoplay.running &&
            e.autoplay.paused &&
            e.autoplay.run(),
          (e.allowSlidePrev = a),
          (e.allowSlideNext = i),
          e.params.watchOverflow && n !== e.snapGrid && e.checkOverflow();
      }
      function I(e) {
        const t = this;
        t.enabled &&
          (t.allowClick ||
            (t.params.preventClicks && e.preventDefault(),
            t.params.preventClicksPropagation &&
              t.animating &&
              (e.stopPropagation(), e.stopImmediatePropagation())));
      }
      function q() {
        const e = this,
          { wrapperEl: t, rtlTranslate: s, enabled: i } = e;
        if (!i) return;
        let a;
        (e.previousTranslate = e.translate),
          e.isHorizontal()
            ? (e.translate = -t.scrollLeft)
            : (e.translate = -t.scrollTop),
          -0 === e.translate && (e.translate = 0),
          e.updateActiveIndex(),
          e.updateSlidesClasses();
        const n = e.maxTranslate() - e.minTranslate();
        (a = 0 === n ? 0 : (e.translate - e.minTranslate()) / n),
          a !== e.progress && e.updateProgress(s ? -e.translate : e.translate),
          e.emit("setTranslate", e.translate, !1);
      }
      let D = !1;
      function H() {}
      const B = (e, t) => {
        const s = i(),
          {
            params: a,
            touchEvents: n,
            el: r,
            wrapperEl: l,
            device: o,
            support: d,
          } = e,
          c = !!a.nested,
          u = "on" === t ? "addEventListener" : "removeEventListener",
          p = t;
        if (d.touch) {
          const t = !(
            "touchstart" !== n.start ||
            !d.passiveListener ||
            !a.passiveListeners
          ) && { passive: !0, capture: !1 };
          r[u](n.start, e.onTouchStart, t),
            r[u](
              n.move,
              e.onTouchMove,
              d.passiveListener ? { passive: !1, capture: c } : c
            ),
            r[u](n.end, e.onTouchEnd, t),
            n.cancel && r[u](n.cancel, e.onTouchEnd, t);
        } else
          r[u](n.start, e.onTouchStart, !1),
            s[u](n.move, e.onTouchMove, c),
            s[u](n.end, e.onTouchEnd, !1);
        (a.preventClicks || a.preventClicksPropagation) &&
          r[u]("click", e.onClick, !0),
          a.cssMode && l[u]("scroll", e.onScroll),
          a.updateOnWindowResize
            ? e[p](
                o.ios || o.android
                  ? "resize orientationchange observerUpdate"
                  : "resize observerUpdate",
                z,
                !0
              )
            : e[p]("observerUpdate", z, !0);
      };
      var N = {
        attachEvents: function () {
          const e = this,
            t = i(),
            { params: s, support: a } = e;
          (e.onTouchStart = A.bind(e)),
            (e.onTouchMove = P.bind(e)),
            (e.onTouchEnd = O.bind(e)),
            s.cssMode && (e.onScroll = q.bind(e)),
            (e.onClick = I.bind(e)),
            a.touch && !D && (t.addEventListener("touchstart", H), (D = !0)),
            B(e, "on");
        },
        detachEvents: function () {
          B(this, "off");
        },
      };
      const G = (e, t) => e.grid && t.grid && t.grid.rows > 1;
      var Y = {
          addClasses: function () {
            const e = this,
              {
                classNames: t,
                params: s,
                rtl: i,
                $el: a,
                device: n,
                support: r,
              } = e,
              l = (function (e, t) {
                const s = [];
                return (
                  e.forEach((e) => {
                    "object" == typeof e
                      ? Object.keys(e).forEach((i) => {
                          e[i] && s.push(t + i);
                        })
                      : "string" == typeof e && s.push(t + e);
                  }),
                  s
                );
              })(
                [
                  "initialized",
                  s.direction,
                  { "pointer-events": !r.touch },
                  { "free-mode": e.params.freeMode && s.freeMode.enabled },
                  { autoheight: s.autoHeight },
                  { rtl: i },
                  { grid: s.grid && s.grid.rows > 1 },
                  {
                    "grid-column":
                      s.grid && s.grid.rows > 1 && "column" === s.grid.fill,
                  },
                  { android: n.android },
                  { ios: n.ios },
                  { "css-mode": s.cssMode },
                  { centered: s.cssMode && s.centeredSlides },
                ],
                s.containerModifierClass
              );
            t.push(...l),
              a.addClass([...t].join(" ")),
              e.emitContainerClasses();
          },
          removeClasses: function () {
            const { $el: e, classNames: t } = this;
            e.removeClass(t.join(" ")), this.emitContainerClasses();
          },
        },
        j = {
          init: !0,
          direction: "horizontal",
          touchEventsTarget: "wrapper",
          initialSlide: 0,
          speed: 300,
          cssMode: !1,
          updateOnWindowResize: !0,
          resizeObserver: !0,
          nested: !1,
          createElements: !1,
          enabled: !0,
          focusableElements:
            "input, select, option, textarea, button, video, label",
          width: null,
          height: null,
          preventInteractionOnTransition: !1,
          userAgent: null,
          url: null,
          edgeSwipeDetection: !1,
          edgeSwipeThreshold: 20,
          autoHeight: !1,
          setWrapperSize: !1,
          virtualTranslate: !1,
          effect: "slide",
          breakpoints: void 0,
          breakpointsBase: "window",
          spaceBetween: 0,
          slidesPerView: 1,
          slidesPerGroup: 1,
          slidesPerGroupSkip: 0,
          slidesPerGroupAuto: !1,
          centeredSlides: !1,
          centeredSlidesBounds: !1,
          slidesOffsetBefore: 0,
          slidesOffsetAfter: 0,
          normalizeSlideIndex: !0,
          centerInsufficientSlides: !1,
          watchOverflow: !0,
          roundLengths: !1,
          touchRatio: 1,
          touchAngle: 45,
          simulateTouch: !0,
          shortSwipes: !0,
          longSwipes: !0,
          longSwipesRatio: 0.5,
          longSwipesMs: 300,
          followFinger: !0,
          allowTouchMove: !0,
          threshold: 0,
          touchMoveStopPropagation: !1,
          touchStartPreventDefault: !0,
          touchStartForcePreventDefault: !1,
          touchReleaseOnEdges: !1,
          uniqueNavElements: !0,
          resistance: !0,
          resistanceRatio: 0.85,
          watchSlidesProgress: !1,
          grabCursor: !1,
          preventClicks: !0,
          preventClicksPropagation: !0,
          slideToClickedSlide: !1,
          preloadImages: !0,
          updateOnImagesReady: !0,
          loop: !1,
          loopAdditionalSlides: 0,
          loopedSlides: null,
          loopFillGroupWithBlank: !1,
          loopPreventsSlide: !0,
          rewind: !1,
          allowSlidePrev: !0,
          allowSlideNext: !0,
          swipeHandler: null,
          noSwiping: !0,
          noSwipingClass: "swiper-no-swiping",
          noSwipingSelector: null,
          passiveListeners: !0,
          maxBackfaceHiddenSlides: 10,
          containerModifierClass: "swiper-",
          slideClass: "swiper-slide",
          slideBlankClass: "swiper-slide-invisible-blank",
          slideActiveClass: "swiper-slide-active",
          slideDuplicateActiveClass: "swiper-slide-duplicate-active",
          slideVisibleClass: "swiper-slide-visible",
          slideDuplicateClass: "swiper-slide-duplicate",
          slideNextClass: "swiper-slide-next",
          slideDuplicateNextClass: "swiper-slide-duplicate-next",
          slidePrevClass: "swiper-slide-prev",
          slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
          wrapperClass: "swiper-wrapper",
          runCallbacksOnInit: !0,
          _emitClasses: !1,
        };
      function R(e, t) {
        return function (s) {
          void 0 === s && (s = {});
          const i = Object.keys(s)[0],
            a = s[i];
          "object" == typeof a && null !== a
            ? (["navigation", "pagination", "scrollbar"].indexOf(i) >= 0 &&
                !0 === e[i] &&
                (e[i] = { auto: !0 }),
              i in e && "enabled" in a
                ? (!0 === e[i] && (e[i] = { enabled: !0 }),
                  "object" != typeof e[i] ||
                    "enabled" in e[i] ||
                    (e[i].enabled = !0),
                  e[i] || (e[i] = { enabled: !1 }),
                  g(t, s))
                : g(t, s))
            : g(t, s);
        };
      }
      const X = {
          eventsEmitter: T,
          update: $,
          translate: M,
          transition: {
            setTransition: function (e, t) {
              const s = this;
              s.params.cssMode || s.$wrapperEl.transition(e),
                s.emit("setTransition", e, t);
            },
            transitionStart: function (e, t) {
              void 0 === e && (e = !0);
              const s = this,
                { params: i } = s;
              i.cssMode ||
                (i.autoHeight && s.updateAutoHeight(),
                _({ swiper: s, runCallbacks: e, direction: t, step: "Start" }));
            },
            transitionEnd: function (e, t) {
              void 0 === e && (e = !0);
              const s = this,
                { params: i } = s;
              (s.animating = !1),
                i.cssMode ||
                  (s.setTransition(0),
                  _({ swiper: s, runCallbacks: e, direction: t, step: "End" }));
            },
          },
          slide: L,
          loop: k,
          grabCursor: {
            setGrabCursor: function (e) {
              const t = this;
              if (
                t.support.touch ||
                !t.params.simulateTouch ||
                (t.params.watchOverflow && t.isLocked) ||
                t.params.cssMode
              )
                return;
              const s =
                "container" === t.params.touchEventsTarget ? t.el : t.wrapperEl;
              (s.style.cursor = "move"),
                (s.style.cursor = e ? "-webkit-grabbing" : "-webkit-grab"),
                (s.style.cursor = e ? "-moz-grabbin" : "-moz-grab"),
                (s.style.cursor = e ? "grabbing" : "grab");
            },
            unsetGrabCursor: function () {
              const e = this;
              e.support.touch ||
                (e.params.watchOverflow && e.isLocked) ||
                e.params.cssMode ||
                (e[
                  "container" === e.params.touchEventsTarget
                    ? "el"
                    : "wrapperEl"
                ].style.cursor = "");
            },
          },
          events: N,
          breakpoints: {
            setBreakpoint: function () {
              const e = this,
                {
                  activeIndex: t,
                  initialized: s,
                  loopedSlides: i = 0,
                  params: a,
                  $el: n,
                } = e,
                r = a.breakpoints;
              if (!r || (r && 0 === Object.keys(r).length)) return;
              const l = e.getBreakpoint(r, e.params.breakpointsBase, e.el);
              if (!l || e.currentBreakpoint === l) return;
              const o = (l in r ? r[l] : void 0) || e.originalParams,
                d = G(e, a),
                c = G(e, o),
                u = a.enabled;
              d && !c
                ? (n.removeClass(
                    `${a.containerModifierClass}grid ${a.containerModifierClass}grid-column`
                  ),
                  e.emitContainerClasses())
                : !d &&
                  c &&
                  (n.addClass(`${a.containerModifierClass}grid`),
                  ((o.grid.fill && "column" === o.grid.fill) ||
                    (!o.grid.fill && "column" === a.grid.fill)) &&
                    n.addClass(`${a.containerModifierClass}grid-column`),
                  e.emitContainerClasses());
              const p = o.direction && o.direction !== a.direction,
                f = a.loop && (o.slidesPerView !== a.slidesPerView || p);
              p && s && e.changeDirection(), g(e.params, o);
              const h = e.params.enabled;
              Object.assign(e, {
                allowTouchMove: e.params.allowTouchMove,
                allowSlideNext: e.params.allowSlideNext,
                allowSlidePrev: e.params.allowSlidePrev,
              }),
                u && !h ? e.disable() : !u && h && e.enable(),
                (e.currentBreakpoint = l),
                e.emit("_beforeBreakpoint", o),
                f &&
                  s &&
                  (e.loopDestroy(),
                  e.loopCreate(),
                  e.updateSlides(),
                  e.slideTo(t - i + e.loopedSlides, 0, !1)),
                e.emit("breakpoint", o);
            },
            getBreakpoint: function (e, t, s) {
              if (
                (void 0 === t && (t = "window"),
                !e || ("container" === t && !s))
              )
                return;
              let i = !1;
              const a = n(),
                r = "window" === t ? a.innerHeight : s.clientHeight,
                l = Object.keys(e).map((e) => {
                  if ("string" == typeof e && 0 === e.indexOf("@")) {
                    const t = parseFloat(e.substr(1));
                    return { value: r * t, point: e };
                  }
                  return { value: e, point: e };
                });
              l.sort((e, t) => parseInt(e.value, 10) - parseInt(t.value, 10));
              for (let e = 0; e < l.length; e += 1) {
                const { point: n, value: r } = l[e];
                "window" === t
                  ? a.matchMedia(`(min-width: ${r}px)`).matches && (i = n)
                  : r <= s.clientWidth && (i = n);
              }
              return i || "max";
            },
          },
          checkOverflow: {
            checkOverflow: function () {
              const e = this,
                { isLocked: t, params: s } = e,
                { slidesOffsetBefore: i } = s;
              if (i) {
                const t = e.slides.length - 1,
                  s = e.slidesGrid[t] + e.slidesSizesGrid[t] + 2 * i;
                e.isLocked = e.size > s;
              } else e.isLocked = 1 === e.snapGrid.length;
              !0 === s.allowSlideNext && (e.allowSlideNext = !e.isLocked),
                !0 === s.allowSlidePrev && (e.allowSlidePrev = !e.isLocked),
                t && t !== e.isLocked && (e.isEnd = !1),
                t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock");
            },
          },
          classes: Y,
          images: {
            loadImage: function (e, t, s, i, a, r) {
              const l = n();
              let o;
              function c() {
                r && r();
              }
              d(e).parent("picture")[0] || (e.complete && a)
                ? c()
                : t
                ? ((o = new l.Image()),
                  (o.onload = c),
                  (o.onerror = c),
                  i && (o.sizes = i),
                  s && (o.srcset = s),
                  t && (o.src = t))
                : c();
            },
            preloadImages: function () {
              const e = this;
              function t() {
                null != e &&
                  e &&
                  !e.destroyed &&
                  (void 0 !== e.imagesLoaded && (e.imagesLoaded += 1),
                  e.imagesLoaded === e.imagesToLoad.length &&
                    (e.params.updateOnImagesReady && e.update(),
                    e.emit("imagesReady")));
              }
              e.imagesToLoad = e.$el.find("img");
              for (let s = 0; s < e.imagesToLoad.length; s += 1) {
                const i = e.imagesToLoad[s];
                e.loadImage(
                  i,
                  i.currentSrc || i.getAttribute("src"),
                  i.srcset || i.getAttribute("srcset"),
                  i.sizes || i.getAttribute("sizes"),
                  !0,
                  t
                );
              }
            },
          },
        },
        W = {};
      class V {
        constructor() {
          let e, t;
          for (var s = arguments.length, i = new Array(s), a = 0; a < s; a++)
            i[a] = arguments[a];
          if (
            (1 === i.length &&
            i[0].constructor &&
            "Object" === Object.prototype.toString.call(i[0]).slice(8, -1)
              ? (t = i[0])
              : ([e, t] = i),
            t || (t = {}),
            (t = g({}, t)),
            e && !t.el && (t.el = e),
            t.el && d(t.el).length > 1)
          ) {
            const e = [];
            return (
              d(t.el).each((s) => {
                const i = g({}, t, { el: s });
                e.push(new V(i));
              }),
              e
            );
          }
          const n = this;
          (n.__swiper__ = !0),
            (n.support = E()),
            (n.device = S({ userAgent: t.userAgent })),
            (n.browser = C()),
            (n.eventsListeners = {}),
            (n.eventsAnyListeners = []),
            (n.modules = [...n.__modules__]),
            t.modules &&
              Array.isArray(t.modules) &&
              n.modules.push(...t.modules);
          const r = {};
          n.modules.forEach((e) => {
            e({
              swiper: n,
              extendParams: R(t, r),
              on: n.on.bind(n),
              once: n.once.bind(n),
              off: n.off.bind(n),
              emit: n.emit.bind(n),
            });
          });
          const l = g({}, j, r);
          return (
            (n.params = g({}, l, W, t)),
            (n.originalParams = g({}, n.params)),
            (n.passedParams = g({}, t)),
            n.params &&
              n.params.on &&
              Object.keys(n.params.on).forEach((e) => {
                n.on(e, n.params.on[e]);
              }),
            n.params && n.params.onAny && n.onAny(n.params.onAny),
            (n.$ = d),
            Object.assign(n, {
              enabled: n.params.enabled,
              el: e,
              classNames: [],
              slides: d(),
              slidesGrid: [],
              snapGrid: [],
              slidesSizesGrid: [],
              isHorizontal: () => "horizontal" === n.params.direction,
              isVertical: () => "vertical" === n.params.direction,
              activeIndex: 0,
              realIndex: 0,
              isBeginning: !0,
              isEnd: !1,
              translate: 0,
              previousTranslate: 0,
              progress: 0,
              velocity: 0,
              animating: !1,
              allowSlideNext: n.params.allowSlideNext,
              allowSlidePrev: n.params.allowSlidePrev,
              touchEvents: (function () {
                const e = [
                    "touchstart",
                    "touchmove",
                    "touchend",
                    "touchcancel",
                  ],
                  t = ["pointerdown", "pointermove", "pointerup"];
                return (
                  (n.touchEventsTouch = {
                    start: e[0],
                    move: e[1],
                    end: e[2],
                    cancel: e[3],
                  }),
                  (n.touchEventsDesktop = {
                    start: t[0],
                    move: t[1],
                    end: t[2],
                  }),
                  n.support.touch || !n.params.simulateTouch
                    ? n.touchEventsTouch
                    : n.touchEventsDesktop
                );
              })(),
              touchEventsData: {
                isTouched: void 0,
                isMoved: void 0,
                allowTouchCallbacks: void 0,
                touchStartTime: void 0,
                isScrolling: void 0,
                currentTranslate: void 0,
                startTranslate: void 0,
                allowThresholdMove: void 0,
                focusableElements: n.params.focusableElements,
                lastClickTime: p(),
                clickTimeout: void 0,
                velocities: [],
                allowMomentumBounce: void 0,
                isTouchEvent: void 0,
                startMoving: void 0,
              },
              allowClick: !0,
              allowTouchMove: n.params.allowTouchMove,
              touches: {
                startX: 0,
                startY: 0,
                currentX: 0,
                currentY: 0,
                diff: 0,
              },
              imagesToLoad: [],
              imagesLoaded: 0,
            }),
            n.emit("_swiper"),
            n.params.init && n.init(),
            n
          );
        }
        enable() {
          const e = this;
          e.enabled ||
            ((e.enabled = !0),
            e.params.grabCursor && e.setGrabCursor(),
            e.emit("enable"));
        }
        disable() {
          const e = this;
          e.enabled &&
            ((e.enabled = !1),
            e.params.grabCursor && e.unsetGrabCursor(),
            e.emit("disable"));
        }
        setProgress(e, t) {
          const s = this;
          e = Math.min(Math.max(e, 0), 1);
          const i = s.minTranslate(),
            a = (s.maxTranslate() - i) * e + i;
          s.translateTo(a, void 0 === t ? 0 : t),
            s.updateActiveIndex(),
            s.updateSlidesClasses();
        }
        emitContainerClasses() {
          const e = this;
          if (!e.params._emitClasses || !e.el) return;
          const t = e.el.className
            .split(" ")
            .filter(
              (t) =>
                0 === t.indexOf("swiper") ||
                0 === t.indexOf(e.params.containerModifierClass)
            );
          e.emit("_containerClasses", t.join(" "));
        }
        getSlideClasses(e) {
          const t = this;
          return e.className
            .split(" ")
            .filter(
              (e) =>
                0 === e.indexOf("swiper-slide") ||
                0 === e.indexOf(t.params.slideClass)
            )
            .join(" ");
        }
        emitSlidesClasses() {
          const e = this;
          if (!e.params._emitClasses || !e.el) return;
          const t = [];
          e.slides.each((s) => {
            const i = e.getSlideClasses(s);
            t.push({ slideEl: s, classNames: i }), e.emit("_slideClass", s, i);
          }),
            e.emit("_slideClasses", t);
        }
        slidesPerViewDynamic(e, t) {
          void 0 === e && (e = "current"), void 0 === t && (t = !1);
          const {
            params: s,
            slides: i,
            slidesGrid: a,
            slidesSizesGrid: n,
            size: r,
            activeIndex: l,
          } = this;
          let o = 1;
          if (s.centeredSlides) {
            let e,
              t = i[l].swiperSlideSize;
            for (let s = l + 1; s < i.length; s += 1)
              i[s] &&
                !e &&
                ((t += i[s].swiperSlideSize), (o += 1), t > r && (e = !0));
            for (let s = l - 1; s >= 0; s -= 1)
              i[s] &&
                !e &&
                ((t += i[s].swiperSlideSize), (o += 1), t > r && (e = !0));
          } else if ("current" === e)
            for (let e = l + 1; e < i.length; e += 1)
              (t ? a[e] + n[e] - a[l] < r : a[e] - a[l] < r) && (o += 1);
          else for (let e = l - 1; e >= 0; e -= 1) a[l] - a[e] < r && (o += 1);
          return o;
        }
        update() {
          const e = this;
          if (!e || e.destroyed) return;
          const { snapGrid: t, params: s } = e;
          function i() {
            const t = e.rtlTranslate ? -1 * e.translate : e.translate,
              s = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
            e.setTranslate(s), e.updateActiveIndex(), e.updateSlidesClasses();
          }
          let a;
          s.breakpoints && e.setBreakpoint(),
            e.updateSize(),
            e.updateSlides(),
            e.updateProgress(),
            e.updateSlidesClasses(),
            e.params.freeMode && e.params.freeMode.enabled
              ? (i(), e.params.autoHeight && e.updateAutoHeight())
              : ((a =
                  ("auto" === e.params.slidesPerView ||
                    e.params.slidesPerView > 1) &&
                  e.isEnd &&
                  !e.params.centeredSlides
                    ? e.slideTo(e.slides.length - 1, 0, !1, !0)
                    : e.slideTo(e.activeIndex, 0, !1, !0)),
                a || i()),
            s.watchOverflow && t !== e.snapGrid && e.checkOverflow(),
            e.emit("update");
        }
        changeDirection(e, t) {
          void 0 === t && (t = !0);
          const s = this,
            i = s.params.direction;
          return (
            e || (e = "horizontal" === i ? "vertical" : "horizontal"),
            e === i ||
              ("horizontal" !== e && "vertical" !== e) ||
              (s.$el
                .removeClass(`${s.params.containerModifierClass}${i}`)
                .addClass(`${s.params.containerModifierClass}${e}`),
              s.emitContainerClasses(),
              (s.params.direction = e),
              s.slides.each((t) => {
                "vertical" === e ? (t.style.width = "") : (t.style.height = "");
              }),
              s.emit("changeDirection"),
              t && s.update()),
            s
          );
        }
        mount(e) {
          const t = this;
          if (t.mounted) return !0;
          const s = d(e || t.params.el);
          if (!(e = s[0])) return !1;
          e.swiper = t;
          const a = () =>
            `.${(t.params.wrapperClass || "").trim().split(" ").join(".")}`;
          let n = (() => {
            if (e && e.shadowRoot && e.shadowRoot.querySelector) {
              const t = d(e.shadowRoot.querySelector(a()));
              return (t.children = (e) => s.children(e)), t;
            }
            return s.children(a());
          })();
          if (0 === n.length && t.params.createElements) {
            const e = i().createElement("div");
            (n = d(e)),
              (e.className = t.params.wrapperClass),
              s.append(e),
              s.children(`.${t.params.slideClass}`).each((e) => {
                n.append(e);
              });
          }
          return (
            Object.assign(t, {
              $el: s,
              el: e,
              $wrapperEl: n,
              wrapperEl: n[0],
              mounted: !0,
              rtl:
                "rtl" === e.dir.toLowerCase() || "rtl" === s.css("direction"),
              rtlTranslate:
                "horizontal" === t.params.direction &&
                ("rtl" === e.dir.toLowerCase() || "rtl" === s.css("direction")),
              wrongRTL: "-webkit-box" === n.css("display"),
            }),
            !0
          );
        }
        init(e) {
          const t = this;
          return (
            t.initialized ||
              !1 === t.mount(e) ||
              (t.emit("beforeInit"),
              t.params.breakpoints && t.setBreakpoint(),
              t.addClasses(),
              t.params.loop && t.loopCreate(),
              t.updateSize(),
              t.updateSlides(),
              t.params.watchOverflow && t.checkOverflow(),
              t.params.grabCursor && t.enabled && t.setGrabCursor(),
              t.params.preloadImages && t.preloadImages(),
              t.params.loop
                ? t.slideTo(
                    t.params.initialSlide + t.loopedSlides,
                    0,
                    t.params.runCallbacksOnInit,
                    !1,
                    !0
                  )
                : t.slideTo(
                    t.params.initialSlide,
                    0,
                    t.params.runCallbacksOnInit,
                    !1,
                    !0
                  ),
              t.attachEvents(),
              (t.initialized = !0),
              t.emit("init"),
              t.emit("afterInit")),
            t
          );
        }
        destroy(e, t) {
          void 0 === e && (e = !0), void 0 === t && (t = !0);
          const s = this,
            { params: i, $el: a, $wrapperEl: n, slides: r } = s;
          return (
            void 0 === s.params ||
              s.destroyed ||
              (s.emit("beforeDestroy"),
              (s.initialized = !1),
              s.detachEvents(),
              i.loop && s.loopDestroy(),
              t &&
                (s.removeClasses(),
                a.removeAttr("style"),
                n.removeAttr("style"),
                r &&
                  r.length &&
                  r
                    .removeClass(
                      [
                        i.slideVisibleClass,
                        i.slideActiveClass,
                        i.slideNextClass,
                        i.slidePrevClass,
                      ].join(" ")
                    )
                    .removeAttr("style")
                    .removeAttr("data-swiper-slide-index")),
              s.emit("destroy"),
              Object.keys(s.eventsListeners).forEach((e) => {
                s.off(e);
              }),
              !1 !== e &&
                ((s.$el[0].swiper = null),
                (function (e) {
                  const t = e;
                  Object.keys(t).forEach((e) => {
                    try {
                      t[e] = null;
                    } catch (e) {}
                    try {
                      delete t[e];
                    } catch (e) {}
                  });
                })(s)),
              (s.destroyed = !0)),
            null
          );
        }
        static extendDefaults(e) {
          g(W, e);
        }
        static get extendedDefaults() {
          return W;
        }
        static get defaults() {
          return j;
        }
        static installModule(e) {
          V.prototype.__modules__ || (V.prototype.__modules__ = []);
          const t = V.prototype.__modules__;
          "function" == typeof e && t.indexOf(e) < 0 && t.push(e);
        }
        static use(e) {
          return Array.isArray(e)
            ? (e.forEach((e) => V.installModule(e)), V)
            : (V.installModule(e), V);
        }
      }
      function F(e, t, s, a) {
        const n = i();
        return (
          e.params.createElements &&
            Object.keys(a).forEach((i) => {
              if (!s[i] && !0 === s.auto) {
                let r = e.$el.children(`.${a[i]}`)[0];
                r ||
                  ((r = n.createElement("div")),
                  (r.className = a[i]),
                  e.$el.append(r)),
                  (s[i] = r),
                  (t[i] = r);
              }
            }),
          s
        );
      }
      function U(e) {
        return (
          void 0 === e && (e = ""),
          `.${e
            .trim()
            .replace(/([\.:!\/])/g, "\\$1")
            .replace(/ /g, ".")}`
        );
      }
      function K(e) {
        const t = this,
          { $wrapperEl: s, params: i } = t;
        if ((i.loop && t.loopDestroy(), "object" == typeof e && "length" in e))
          for (let t = 0; t < e.length; t += 1) e[t] && s.append(e[t]);
        else s.append(e);
        i.loop && t.loopCreate(), i.observer || t.update();
      }
      function Q(e) {
        const t = this,
          { params: s, $wrapperEl: i, activeIndex: a } = t;
        s.loop && t.loopDestroy();
        let n = a + 1;
        if ("object" == typeof e && "length" in e) {
          for (let t = 0; t < e.length; t += 1) e[t] && i.prepend(e[t]);
          n = a + e.length;
        } else i.prepend(e);
        s.loop && t.loopCreate(), s.observer || t.update(), t.slideTo(n, 0, !1);
      }
      function J(e, t) {
        const s = this,
          { $wrapperEl: i, params: a, activeIndex: n } = s;
        let r = n;
        a.loop &&
          ((r -= s.loopedSlides),
          s.loopDestroy(),
          (s.slides = i.children(`.${a.slideClass}`)));
        const l = s.slides.length;
        if (e <= 0) return void s.prependSlide(t);
        if (e >= l) return void s.appendSlide(t);
        let o = r > e ? r + 1 : r;
        const d = [];
        for (let t = l - 1; t >= e; t -= 1) {
          const e = s.slides.eq(t);
          e.remove(), d.unshift(e);
        }
        if ("object" == typeof t && "length" in t) {
          for (let e = 0; e < t.length; e += 1) t[e] && i.append(t[e]);
          o = r > e ? r + t.length : r;
        } else i.append(t);
        for (let e = 0; e < d.length; e += 1) i.append(d[e]);
        a.loop && s.loopCreate(),
          a.observer || s.update(),
          a.loop ? s.slideTo(o + s.loopedSlides, 0, !1) : s.slideTo(o, 0, !1);
      }
      function Z(e) {
        const t = this,
          { params: s, $wrapperEl: i, activeIndex: a } = t;
        let n = a;
        s.loop &&
          ((n -= t.loopedSlides),
          t.loopDestroy(),
          (t.slides = i.children(`.${s.slideClass}`)));
        let r,
          l = n;
        if ("object" == typeof e && "length" in e) {
          for (let s = 0; s < e.length; s += 1)
            (r = e[s]),
              t.slides[r] && t.slides.eq(r).remove(),
              r < l && (l -= 1);
          l = Math.max(l, 0);
        } else (r = e), t.slides[r] && t.slides.eq(r).remove(), r < l && (l -= 1), (l = Math.max(l, 0));
        s.loop && t.loopCreate(),
          s.observer || t.update(),
          s.loop ? t.slideTo(l + t.loopedSlides, 0, !1) : t.slideTo(l, 0, !1);
      }
      function ee() {
        const e = this,
          t = [];
        for (let s = 0; s < e.slides.length; s += 1) t.push(s);
        e.removeSlide(t);
      }
      function te(e) {
        const {
          effect: t,
          swiper: s,
          on: i,
          setTranslate: a,
          setTransition: n,
          overwriteParams: r,
          perspective: l,
        } = e;
        i("beforeInit", () => {
          if (s.params.effect !== t) return;
          s.classNames.push(`${s.params.containerModifierClass}${t}`),
            l &&
              l() &&
              s.classNames.push(`${s.params.containerModifierClass}3d`);
          const e = r ? r() : {};
          Object.assign(s.params, e), Object.assign(s.originalParams, e);
        }),
          i("setTranslate", () => {
            s.params.effect === t && a();
          }),
          i("setTransition", (e, i) => {
            s.params.effect === t && n(i);
          });
      }
      function se(e, t) {
        return e.transformEl
          ? t
              .find(e.transformEl)
              .css({
                "backface-visibility": "hidden",
                "-webkit-backface-visibility": "hidden",
              })
          : t;
      }
      function ie(e) {
        let { swiper: t, duration: s, transformEl: i, allSlides: a } = e;
        const { slides: n, activeIndex: r, $wrapperEl: l } = t;
        if (t.params.virtualTranslate && 0 !== s) {
          let e,
            s = !1;
          (e = a ? (i ? n.find(i) : n) : i ? n.eq(r).find(i) : n.eq(r)),
            e.transitionEnd(() => {
              if (s) return;
              if (!t || t.destroyed) return;
              (s = !0), (t.animating = !1);
              const e = ["webkitTransitionEnd", "transitionend"];
              for (let t = 0; t < e.length; t += 1) l.trigger(e[t]);
            });
        }
      }
      function ae(e, t, s) {
        const i = "swiper-slide-shadow" + (s ? `-${s}` : ""),
          a = e.transformEl ? t.find(e.transformEl) : t;
        let n = a.children(`.${i}`);
        return (
          n.length ||
            ((n = d(
              `<div class="swiper-slide-shadow${s ? `-${s}` : ""}"></div>`
            )),
            a.append(n)),
          n
        );
      }
      Object.keys(X).forEach((e) => {
        Object.keys(X[e]).forEach((t) => {
          V.prototype[t] = X[e][t];
        });
      }),
        V.use([
          function (e) {
            let { swiper: t, on: s, emit: i } = e;
            const a = n();
            let r = null,
              l = null;
            const o = () => {
                t &&
                  !t.destroyed &&
                  t.initialized &&
                  (i("beforeResize"), i("resize"));
              },
              d = () => {
                t && !t.destroyed && t.initialized && i("orientationchange");
              };
            s("init", () => {
              t.params.resizeObserver && void 0 !== a.ResizeObserver
                ? t &&
                  !t.destroyed &&
                  t.initialized &&
                  ((r = new ResizeObserver((e) => {
                    l = a.requestAnimationFrame(() => {
                      const { width: s, height: i } = t;
                      let a = s,
                        n = i;
                      e.forEach((e) => {
                        let {
                          contentBoxSize: s,
                          contentRect: i,
                          target: r,
                        } = e;
                        (r && r !== t.el) ||
                          ((a = i ? i.width : (s[0] || s).inlineSize),
                          (n = i ? i.height : (s[0] || s).blockSize));
                      }),
                        (a === s && n === i) || o();
                    });
                  })),
                  r.observe(t.el))
                : (a.addEventListener("resize", o),
                  a.addEventListener("orientationchange", d));
            }),
              s("destroy", () => {
                l && a.cancelAnimationFrame(l),
                  r && r.unobserve && t.el && (r.unobserve(t.el), (r = null)),
                  a.removeEventListener("resize", o),
                  a.removeEventListener("orientationchange", d);
              });
          },
          function (e) {
            let { swiper: t, extendParams: s, on: i, emit: a } = e;
            const r = [],
              l = n(),
              o = function (e, t) {
                void 0 === t && (t = {});
                const s = new (l.MutationObserver || l.WebkitMutationObserver)(
                  (e) => {
                    if (1 === e.length) return void a("observerUpdate", e[0]);
                    const t = function () {
                      a("observerUpdate", e[0]);
                    };
                    l.requestAnimationFrame
                      ? l.requestAnimationFrame(t)
                      : l.setTimeout(t, 0);
                  }
                );
                s.observe(e, {
                  attributes: void 0 === t.attributes || t.attributes,
                  childList: void 0 === t.childList || t.childList,
                  characterData: void 0 === t.characterData || t.characterData,
                }),
                  r.push(s);
              };
            s({ observer: !1, observeParents: !1, observeSlideChildren: !1 }),
              i("init", () => {
                if (t.params.observer) {
                  if (t.params.observeParents) {
                    const e = t.$el.parents();
                    for (let t = 0; t < e.length; t += 1) o(e[t]);
                  }
                  o(t.$el[0], { childList: t.params.observeSlideChildren }),
                    o(t.$wrapperEl[0], { attributes: !1 });
                }
              }),
              i("destroy", () => {
                r.forEach((e) => {
                  e.disconnect();
                }),
                  r.splice(0, r.length);
              });
          },
        ]);
      const ne = [
        function (e) {
          let t,
            { swiper: s, extendParams: i, on: a } = e;
          function n(e, t) {
            const i = s.params.virtual;
            if (i.cache && s.virtual.cache[t]) return s.virtual.cache[t];
            const a = i.renderSlide
              ? d(i.renderSlide.call(s, e, t))
              : d(
                  `<div class="${s.params.slideClass}" data-swiper-slide-index="${t}">${e}</div>`
                );
            return (
              a.attr("data-swiper-slide-index") ||
                a.attr("data-swiper-slide-index", t),
              i.cache && (s.virtual.cache[t] = a),
              a
            );
          }
          function r(e) {
            const {
                slidesPerView: t,
                slidesPerGroup: i,
                centeredSlides: a,
              } = s.params,
              { addSlidesBefore: r, addSlidesAfter: l } = s.params.virtual,
              {
                from: o,
                to: d,
                slides: c,
                slidesGrid: u,
                offset: p,
              } = s.virtual;
            s.params.cssMode || s.updateActiveIndex();
            const f = s.activeIndex || 0;
            let h, m, g;
            (h = s.rtlTranslate ? "right" : s.isHorizontal() ? "left" : "top"),
              a
                ? ((m = Math.floor(t / 2) + i + l),
                  (g = Math.floor(t / 2) + i + r))
                : ((m = t + (i - 1) + l), (g = i + r));
            const v = Math.max((f || 0) - g, 0),
              w = Math.min((f || 0) + m, c.length - 1),
              y = (s.slidesGrid[v] || 0) - (s.slidesGrid[0] || 0);
            function b() {
              s.updateSlides(),
                s.updateProgress(),
                s.updateSlidesClasses(),
                s.lazy && s.params.lazy.enabled && s.lazy.load();
            }
            if (
              (Object.assign(s.virtual, {
                from: v,
                to: w,
                offset: y,
                slidesGrid: s.slidesGrid,
              }),
              o === v && d === w && !e)
            )
              return (
                s.slidesGrid !== u && y !== p && s.slides.css(h, `${y}px`),
                void s.updateProgress()
              );
            if (s.params.virtual.renderExternal)
              return (
                s.params.virtual.renderExternal.call(s, {
                  offset: y,
                  from: v,
                  to: w,
                  slides: (function () {
                    const e = [];
                    for (let t = v; t <= w; t += 1) e.push(c[t]);
                    return e;
                  })(),
                }),
                void (s.params.virtual.renderExternalUpdate && b())
              );
            const x = [],
              E = [];
            if (e) s.$wrapperEl.find(`.${s.params.slideClass}`).remove();
            else
              for (let e = o; e <= d; e += 1)
                (e < v || e > w) &&
                  s.$wrapperEl
                    .find(
                      `.${s.params.slideClass}[data-swiper-slide-index="${e}"]`
                    )
                    .remove();
            for (let t = 0; t < c.length; t += 1)
              t >= v &&
                t <= w &&
                (void 0 === d || e
                  ? E.push(t)
                  : (t > d && E.push(t), t < o && x.push(t)));
            E.forEach((e) => {
              s.$wrapperEl.append(n(c[e], e));
            }),
              x
                .sort((e, t) => t - e)
                .forEach((e) => {
                  s.$wrapperEl.prepend(n(c[e], e));
                }),
              s.$wrapperEl.children(".swiper-slide").css(h, `${y}px`),
              b();
          }
          i({
            virtual: {
              enabled: !1,
              slides: [],
              cache: !0,
              renderSlide: null,
              renderExternal: null,
              renderExternalUpdate: !0,
              addSlidesBefore: 0,
              addSlidesAfter: 0,
            },
          }),
            (s.virtual = {
              cache: {},
              from: void 0,
              to: void 0,
              slides: [],
              offset: 0,
              slidesGrid: [],
            }),
            a("beforeInit", () => {
              s.params.virtual.enabled &&
                ((s.virtual.slides = s.params.virtual.slides),
                s.classNames.push(`${s.params.containerModifierClass}virtual`),
                (s.params.watchSlidesProgress = !0),
                (s.originalParams.watchSlidesProgress = !0),
                s.params.initialSlide || r());
            }),
            a("setTranslate", () => {
              s.params.virtual.enabled &&
                (s.params.cssMode && !s._immediateVirtual
                  ? (clearTimeout(t),
                    (t = setTimeout(() => {
                      r();
                    }, 100)))
                  : r());
            }),
            a("init update resize", () => {
              s.params.virtual.enabled &&
                s.params.cssMode &&
                v(s.wrapperEl, "--swiper-virtual-size", `${s.virtualSize}px`);
            }),
            Object.assign(s.virtual, {
              appendSlide: function (e) {
                if ("object" == typeof e && "length" in e)
                  for (let t = 0; t < e.length; t += 1)
                    e[t] && s.virtual.slides.push(e[t]);
                else s.virtual.slides.push(e);
                r(!0);
              },
              prependSlide: function (e) {
                const t = s.activeIndex;
                let i = t + 1,
                  a = 1;
                if (Array.isArray(e)) {
                  for (let t = 0; t < e.length; t += 1)
                    e[t] && s.virtual.slides.unshift(e[t]);
                  (i = t + e.length), (a = e.length);
                } else s.virtual.slides.unshift(e);
                if (s.params.virtual.cache) {
                  const e = s.virtual.cache,
                    t = {};
                  Object.keys(e).forEach((s) => {
                    const i = e[s],
                      n = i.attr("data-swiper-slide-index");
                    n && i.attr("data-swiper-slide-index", parseInt(n, 10) + a),
                      (t[parseInt(s, 10) + a] = i);
                  }),
                    (s.virtual.cache = t);
                }
                r(!0), s.slideTo(i, 0);
              },
              removeSlide: function (e) {
                if (null == e) return;
                let t = s.activeIndex;
                if (Array.isArray(e))
                  for (let i = e.length - 1; i >= 0; i -= 1)
                    s.virtual.slides.splice(e[i], 1),
                      s.params.virtual.cache && delete s.virtual.cache[e[i]],
                      e[i] < t && (t -= 1),
                      (t = Math.max(t, 0));
                else
                  s.virtual.slides.splice(e, 1),
                    s.params.virtual.cache && delete s.virtual.cache[e],
                    e < t && (t -= 1),
                    (t = Math.max(t, 0));
                r(!0), s.slideTo(t, 0);
              },
              removeAllSlides: function () {
                (s.virtual.slides = []),
                  s.params.virtual.cache && (s.virtual.cache = {}),
                  r(!0),
                  s.slideTo(0, 0);
              },
              update: r,
            });
        },
        function (e) {
          let { swiper: t, extendParams: s, on: a, emit: r } = e;
          const l = i(),
            o = n();
          function c(e) {
            if (!t.enabled) return;
            const { rtlTranslate: s } = t;
            let i = e;
            i.originalEvent && (i = i.originalEvent);
            const a = i.keyCode || i.charCode,
              n = t.params.keyboard.pageUpDown,
              d = n && 33 === a,
              c = n && 34 === a,
              u = 37 === a,
              p = 39 === a,
              f = 38 === a,
              h = 40 === a;
            if (
              !t.allowSlideNext &&
              ((t.isHorizontal() && p) || (t.isVertical() && h) || c)
            )
              return !1;
            if (
              !t.allowSlidePrev &&
              ((t.isHorizontal() && u) || (t.isVertical() && f) || d)
            )
              return !1;
            if (
              !(
                i.shiftKey ||
                i.altKey ||
                i.ctrlKey ||
                i.metaKey ||
                (l.activeElement &&
                  l.activeElement.nodeName &&
                  ("input" === l.activeElement.nodeName.toLowerCase() ||
                    "textarea" === l.activeElement.nodeName.toLowerCase()))
              )
            ) {
              if (
                t.params.keyboard.onlyInViewport &&
                (d || c || u || p || f || h)
              ) {
                let e = !1;
                if (
                  t.$el.parents(`.${t.params.slideClass}`).length > 0 &&
                  0 === t.$el.parents(`.${t.params.slideActiveClass}`).length
                )
                  return;
                const i = t.$el,
                  a = i[0].clientWidth,
                  n = i[0].clientHeight,
                  r = o.innerWidth,
                  l = o.innerHeight,
                  d = t.$el.offset();
                s && (d.left -= t.$el[0].scrollLeft);
                const c = [
                  [d.left, d.top],
                  [d.left + a, d.top],
                  [d.left, d.top + n],
                  [d.left + a, d.top + n],
                ];
                for (let t = 0; t < c.length; t += 1) {
                  const s = c[t];
                  if (s[0] >= 0 && s[0] <= r && s[1] >= 0 && s[1] <= l) {
                    if (0 === s[0] && 0 === s[1]) continue;
                    e = !0;
                  }
                }
                if (!e) return;
              }
              t.isHorizontal()
                ? ((d || c || u || p) &&
                    (i.preventDefault
                      ? i.preventDefault()
                      : (i.returnValue = !1)),
                  (((c || p) && !s) || ((d || u) && s)) && t.slideNext(),
                  (((d || u) && !s) || ((c || p) && s)) && t.slidePrev())
                : ((d || c || f || h) &&
                    (i.preventDefault
                      ? i.preventDefault()
                      : (i.returnValue = !1)),
                  (c || h) && t.slideNext(),
                  (d || f) && t.slidePrev()),
                r("keyPress", a);
            }
          }
          function u() {
            t.keyboard.enabled ||
              (d(l).on("keydown", c), (t.keyboard.enabled = !0));
          }
          function p() {
            t.keyboard.enabled &&
              (d(l).off("keydown", c), (t.keyboard.enabled = !1));
          }
          (t.keyboard = { enabled: !1 }),
            s({
              keyboard: { enabled: !1, onlyInViewport: !0, pageUpDown: !0 },
            }),
            a("init", () => {
              t.params.keyboard.enabled && u();
            }),
            a("destroy", () => {
              t.keyboard.enabled && p();
            }),
            Object.assign(t.keyboard, { enable: u, disable: p });
        },
        function (e) {
          let { swiper: t, extendParams: s, on: i, emit: a } = e;
          const r = n();
          let l;
          s({
            mousewheel: {
              enabled: !1,
              releaseOnEdges: !1,
              invert: !1,
              forceToAxis: !1,
              sensitivity: 1,
              eventsTarget: "container",
              thresholdDelta: null,
              thresholdTime: null,
            },
          }),
            (t.mousewheel = { enabled: !1 });
          let o,
            c = p();
          const f = [];
          function h() {
            t.enabled && (t.mouseEntered = !0);
          }
          function m() {
            t.enabled && (t.mouseEntered = !1);
          }
          function g(e) {
            return !(
              (t.params.mousewheel.thresholdDelta &&
                e.delta < t.params.mousewheel.thresholdDelta) ||
              (t.params.mousewheel.thresholdTime &&
                p() - c < t.params.mousewheel.thresholdTime) ||
              (!(e.delta >= 6 && p() - c < 60) &&
                (e.direction < 0
                  ? (t.isEnd && !t.params.loop) ||
                    t.animating ||
                    (t.slideNext(), a("scroll", e.raw))
                  : (t.isBeginning && !t.params.loop) ||
                    t.animating ||
                    (t.slidePrev(), a("scroll", e.raw)),
                (c = new r.Date().getTime()),
                1))
            );
          }
          function v(e) {
            let s = e,
              i = !0;
            if (!t.enabled) return;
            const n = t.params.mousewheel;
            t.params.cssMode && s.preventDefault();
            let r = t.$el;
            if (
              ("container" !== t.params.mousewheel.eventsTarget &&
                (r = d(t.params.mousewheel.eventsTarget)),
              !t.mouseEntered && !r[0].contains(s.target) && !n.releaseOnEdges)
            )
              return !0;
            s.originalEvent && (s = s.originalEvent);
            let c = 0;
            const h = t.rtlTranslate ? -1 : 1,
              m = (function (e) {
                let t = 0,
                  s = 0,
                  i = 0,
                  a = 0;
                return (
                  "detail" in e && (s = e.detail),
                  "wheelDelta" in e && (s = -e.wheelDelta / 120),
                  "wheelDeltaY" in e && (s = -e.wheelDeltaY / 120),
                  "wheelDeltaX" in e && (t = -e.wheelDeltaX / 120),
                  "axis" in e &&
                    e.axis === e.HORIZONTAL_AXIS &&
                    ((t = s), (s = 0)),
                  (i = 10 * t),
                  (a = 10 * s),
                  "deltaY" in e && (a = e.deltaY),
                  "deltaX" in e && (i = e.deltaX),
                  e.shiftKey && !i && ((i = a), (a = 0)),
                  (i || a) &&
                    e.deltaMode &&
                    (1 === e.deltaMode
                      ? ((i *= 40), (a *= 40))
                      : ((i *= 800), (a *= 800))),
                  i && !t && (t = i < 1 ? -1 : 1),
                  a && !s && (s = a < 1 ? -1 : 1),
                  { spinX: t, spinY: s, pixelX: i, pixelY: a }
                );
              })(s);
            if (n.forceToAxis)
              if (t.isHorizontal()) {
                if (!(Math.abs(m.pixelX) > Math.abs(m.pixelY))) return !0;
                c = -m.pixelX * h;
              } else {
                if (!(Math.abs(m.pixelY) > Math.abs(m.pixelX))) return !0;
                c = -m.pixelY;
              }
            else
              c =
                Math.abs(m.pixelX) > Math.abs(m.pixelY)
                  ? -m.pixelX * h
                  : -m.pixelY;
            if (0 === c) return !0;
            n.invert && (c = -c);
            let v = t.getTranslate() + c * n.sensitivity;
            if (
              (v >= t.minTranslate() && (v = t.minTranslate()),
              v <= t.maxTranslate() && (v = t.maxTranslate()),
              (i =
                !!t.params.loop ||
                !(v === t.minTranslate() || v === t.maxTranslate())),
              i && t.params.nested && s.stopPropagation(),
              t.params.freeMode && t.params.freeMode.enabled)
            ) {
              const e = {
                  time: p(),
                  delta: Math.abs(c),
                  direction: Math.sign(c),
                },
                i =
                  o &&
                  e.time < o.time + 500 &&
                  e.delta <= o.delta &&
                  e.direction === o.direction;
              if (!i) {
                (o = void 0), t.params.loop && t.loopFix();
                let r = t.getTranslate() + c * n.sensitivity;
                const d = t.isBeginning,
                  p = t.isEnd;
                if (
                  (r >= t.minTranslate() && (r = t.minTranslate()),
                  r <= t.maxTranslate() && (r = t.maxTranslate()),
                  t.setTransition(0),
                  t.setTranslate(r),
                  t.updateProgress(),
                  t.updateActiveIndex(),
                  t.updateSlidesClasses(),
                  ((!d && t.isBeginning) || (!p && t.isEnd)) &&
                    t.updateSlidesClasses(),
                  t.params.freeMode.sticky)
                ) {
                  clearTimeout(l), (l = void 0), f.length >= 15 && f.shift();
                  const s = f.length ? f[f.length - 1] : void 0,
                    i = f[0];
                  if (
                    (f.push(e),
                    s && (e.delta > s.delta || e.direction !== s.direction))
                  )
                    f.splice(0);
                  else if (
                    f.length >= 15 &&
                    e.time - i.time < 500 &&
                    i.delta - e.delta >= 1 &&
                    e.delta <= 6
                  ) {
                    const s = c > 0 ? 0.8 : 0.2;
                    (o = e),
                      f.splice(0),
                      (l = u(() => {
                        t.slideToClosest(t.params.speed, !0, void 0, s);
                      }, 0));
                  }
                  l ||
                    (l = u(() => {
                      (o = e),
                        f.splice(0),
                        t.slideToClosest(t.params.speed, !0, void 0, 0.5);
                    }, 500));
                }
                if (
                  (i || a("scroll", s),
                  t.params.autoplay &&
                    t.params.autoplayDisableOnInteraction &&
                    t.autoplay.stop(),
                  r === t.minTranslate() || r === t.maxTranslate())
                )
                  return !0;
              }
            } else {
              const s = {
                time: p(),
                delta: Math.abs(c),
                direction: Math.sign(c),
                raw: e,
              };
              f.length >= 2 && f.shift();
              const i = f.length ? f[f.length - 1] : void 0;
              if (
                (f.push(s),
                i
                  ? (s.direction !== i.direction ||
                      s.delta > i.delta ||
                      s.time > i.time + 150) &&
                    g(s)
                  : g(s),
                (function (e) {
                  const s = t.params.mousewheel;
                  if (e.direction < 0) {
                    if (t.isEnd && !t.params.loop && s.releaseOnEdges)
                      return !0;
                  } else if (
                    t.isBeginning &&
                    !t.params.loop &&
                    s.releaseOnEdges
                  )
                    return !0;
                  return !1;
                })(s))
              )
                return !0;
            }
            return (
              s.preventDefault ? s.preventDefault() : (s.returnValue = !1), !1
            );
          }
          function w(e) {
            let s = t.$el;
            "container" !== t.params.mousewheel.eventsTarget &&
              (s = d(t.params.mousewheel.eventsTarget)),
              s[e]("mouseenter", h),
              s[e]("mouseleave", m),
              s[e]("wheel", v);
          }
          function y() {
            return t.params.cssMode
              ? (t.wrapperEl.removeEventListener("wheel", v), !0)
              : !t.mousewheel.enabled &&
                  (w("on"), (t.mousewheel.enabled = !0), !0);
          }
          function b() {
            return t.params.cssMode
              ? (t.wrapperEl.addEventListener(event, v), !0)
              : !!t.mousewheel.enabled &&
                  (w("off"), (t.mousewheel.enabled = !1), !0);
          }
          i("init", () => {
            !t.params.mousewheel.enabled && t.params.cssMode && b(),
              t.params.mousewheel.enabled && y();
          }),
            i("destroy", () => {
              t.params.cssMode && y(), t.mousewheel.enabled && b();
            }),
            Object.assign(t.mousewheel, { enable: y, disable: b });
        },
        function (e) {
          let { swiper: t, extendParams: s, on: i, emit: a } = e;
          function n(e) {
            let s;
            return (
              e &&
                ((s = d(e)),
                t.params.uniqueNavElements &&
                  "string" == typeof e &&
                  s.length > 1 &&
                  1 === t.$el.find(e).length &&
                  (s = t.$el.find(e))),
              s
            );
          }
          function r(e, s) {
            const i = t.params.navigation;
            e &&
              e.length > 0 &&
              (e[s ? "addClass" : "removeClass"](i.disabledClass),
              e[0] && "BUTTON" === e[0].tagName && (e[0].disabled = s),
              t.params.watchOverflow &&
                t.enabled &&
                e[t.isLocked ? "addClass" : "removeClass"](i.lockClass));
          }
          function l() {
            if (t.params.loop) return;
            const { $nextEl: e, $prevEl: s } = t.navigation;
            r(s, t.isBeginning && !t.params.rewind),
              r(e, t.isEnd && !t.params.rewind);
          }
          function o(e) {
            e.preventDefault(),
              (!t.isBeginning || t.params.loop || t.params.rewind) &&
                t.slidePrev();
          }
          function c(e) {
            e.preventDefault(),
              (!t.isEnd || t.params.loop || t.params.rewind) && t.slideNext();
          }
          function u() {
            const e = t.params.navigation;
            if (
              ((t.params.navigation = F(
                t,
                t.originalParams.navigation,
                t.params.navigation,
                { nextEl: "swiper-button-next", prevEl: "swiper-button-prev" }
              )),
              !e.nextEl && !e.prevEl)
            )
              return;
            const s = n(e.nextEl),
              i = n(e.prevEl);
            s && s.length > 0 && s.on("click", c),
              i && i.length > 0 && i.on("click", o),
              Object.assign(t.navigation, {
                $nextEl: s,
                nextEl: s && s[0],
                $prevEl: i,
                prevEl: i && i[0],
              }),
              t.enabled ||
                (s && s.addClass(e.lockClass), i && i.addClass(e.lockClass));
          }
          function p() {
            const { $nextEl: e, $prevEl: s } = t.navigation;
            e &&
              e.length &&
              (e.off("click", c),
              e.removeClass(t.params.navigation.disabledClass)),
              s &&
                s.length &&
                (s.off("click", o),
                s.removeClass(t.params.navigation.disabledClass));
          }
          s({
            navigation: {
              nextEl: null,
              prevEl: null,
              hideOnClick: !1,
              disabledClass: "swiper-button-disabled",
              hiddenClass: "swiper-button-hidden",
              lockClass: "swiper-button-lock",
            },
          }),
            (t.navigation = {
              nextEl: null,
              $nextEl: null,
              prevEl: null,
              $prevEl: null,
            }),
            i("init", () => {
              u(), l();
            }),
            i("toEdge fromEdge lock unlock", () => {
              l();
            }),
            i("destroy", () => {
              p();
            }),
            i("enable disable", () => {
              const { $nextEl: e, $prevEl: s } = t.navigation;
              e &&
                e[t.enabled ? "removeClass" : "addClass"](
                  t.params.navigation.lockClass
                ),
                s &&
                  s[t.enabled ? "removeClass" : "addClass"](
                    t.params.navigation.lockClass
                  );
            }),
            i("click", (e, s) => {
              const { $nextEl: i, $prevEl: n } = t.navigation,
                r = s.target;
              if (
                t.params.navigation.hideOnClick &&
                !d(r).is(n) &&
                !d(r).is(i)
              ) {
                if (
                  t.pagination &&
                  t.params.pagination &&
                  t.params.pagination.clickable &&
                  (t.pagination.el === r || t.pagination.el.contains(r))
                )
                  return;
                let e;
                i
                  ? (e = i.hasClass(t.params.navigation.hiddenClass))
                  : n && (e = n.hasClass(t.params.navigation.hiddenClass)),
                  a(!0 === e ? "navigationShow" : "navigationHide"),
                  i && i.toggleClass(t.params.navigation.hiddenClass),
                  n && n.toggleClass(t.params.navigation.hiddenClass);
              }
            }),
            Object.assign(t.navigation, { update: l, init: u, destroy: p });
        },
        function (e) {
          let { swiper: t, extendParams: s, on: i, emit: a } = e;
          const n = "swiper-pagination";
          let r;
          s({
            pagination: {
              el: null,
              bulletElement: "span",
              clickable: !1,
              hideOnClick: !1,
              renderBullet: null,
              renderProgressbar: null,
              renderFraction: null,
              renderCustom: null,
              progressbarOpposite: !1,
              type: "bullets",
              dynamicBullets: !1,
              dynamicMainBullets: 1,
              formatFractionCurrent: (e) => e,
              formatFractionTotal: (e) => e,
              bulletClass: `${n}-bullet`,
              bulletActiveClass: `${n}-bullet-active`,
              modifierClass: `${n}-`,
              currentClass: `${n}-current`,
              totalClass: `${n}-total`,
              hiddenClass: `${n}-hidden`,
              progressbarFillClass: `${n}-progressbar-fill`,
              progressbarOppositeClass: `${n}-progressbar-opposite`,
              clickableClass: `${n}-clickable`,
              lockClass: `${n}-lock`,
              horizontalClass: `${n}-horizontal`,
              verticalClass: `${n}-vertical`,
            },
          }),
            (t.pagination = { el: null, $el: null, bullets: [] });
          let l = 0;
          function o() {
            return (
              !t.params.pagination.el ||
              !t.pagination.el ||
              !t.pagination.$el ||
              0 === t.pagination.$el.length
            );
          }
          function c(e, s) {
            const { bulletActiveClass: i } = t.params.pagination;
            e[s]().addClass(`${i}-${s}`)[s]().addClass(`${i}-${s}-${s}`);
          }
          function u() {
            const e = t.rtl,
              s = t.params.pagination;
            if (o()) return;
            const i =
                t.virtual && t.params.virtual.enabled
                  ? t.virtual.slides.length
                  : t.slides.length,
              n = t.pagination.$el;
            let u;
            const p = t.params.loop
              ? Math.ceil((i - 2 * t.loopedSlides) / t.params.slidesPerGroup)
              : t.snapGrid.length;
            if (
              (t.params.loop
                ? ((u = Math.ceil(
                    (t.activeIndex - t.loopedSlides) / t.params.slidesPerGroup
                  )),
                  u > i - 1 - 2 * t.loopedSlides &&
                    (u -= i - 2 * t.loopedSlides),
                  u > p - 1 && (u -= p),
                  u < 0 && "bullets" !== t.params.paginationType && (u = p + u))
                : (u =
                    void 0 !== t.snapIndex ? t.snapIndex : t.activeIndex || 0),
              "bullets" === s.type &&
                t.pagination.bullets &&
                t.pagination.bullets.length > 0)
            ) {
              const i = t.pagination.bullets;
              let a, o, p;
              if (
                (s.dynamicBullets &&
                  ((r = i
                    .eq(0)
                    [t.isHorizontal() ? "outerWidth" : "outerHeight"](!0)),
                  n.css(
                    t.isHorizontal() ? "width" : "height",
                    r * (s.dynamicMainBullets + 4) + "px"
                  ),
                  s.dynamicMainBullets > 1 &&
                    void 0 !== t.previousIndex &&
                    ((l += u - (t.previousIndex - t.loopedSlides || 0)),
                    l > s.dynamicMainBullets - 1
                      ? (l = s.dynamicMainBullets - 1)
                      : l < 0 && (l = 0)),
                  (a = Math.max(u - l, 0)),
                  (o = a + (Math.min(i.length, s.dynamicMainBullets) - 1)),
                  (p = (o + a) / 2)),
                i.removeClass(
                  ["", "-next", "-next-next", "-prev", "-prev-prev", "-main"]
                    .map((e) => `${s.bulletActiveClass}${e}`)
                    .join(" ")
                ),
                n.length > 1)
              )
                i.each((e) => {
                  const t = d(e),
                    i = t.index();
                  i === u && t.addClass(s.bulletActiveClass),
                    s.dynamicBullets &&
                      (i >= a &&
                        i <= o &&
                        t.addClass(`${s.bulletActiveClass}-main`),
                      i === a && c(t, "prev"),
                      i === o && c(t, "next"));
                });
              else {
                const e = i.eq(u),
                  n = e.index();
                if ((e.addClass(s.bulletActiveClass), s.dynamicBullets)) {
                  const e = i.eq(a),
                    r = i.eq(o);
                  for (let e = a; e <= o; e += 1)
                    i.eq(e).addClass(`${s.bulletActiveClass}-main`);
                  if (t.params.loop)
                    if (n >= i.length) {
                      for (let e = s.dynamicMainBullets; e >= 0; e -= 1)
                        i.eq(i.length - e).addClass(
                          `${s.bulletActiveClass}-main`
                        );
                      i.eq(i.length - s.dynamicMainBullets - 1).addClass(
                        `${s.bulletActiveClass}-prev`
                      );
                    } else c(e, "prev"), c(r, "next");
                  else c(e, "prev"), c(r, "next");
                }
              }
              if (s.dynamicBullets) {
                const a = Math.min(i.length, s.dynamicMainBullets + 4),
                  n = (r * a - r) / 2 - p * r,
                  l = e ? "right" : "left";
                i.css(t.isHorizontal() ? l : "top", `${n}px`);
              }
            }
            if (
              ("fraction" === s.type &&
                (n.find(U(s.currentClass)).text(s.formatFractionCurrent(u + 1)),
                n.find(U(s.totalClass)).text(s.formatFractionTotal(p))),
              "progressbar" === s.type)
            ) {
              let e;
              e = s.progressbarOpposite
                ? t.isHorizontal()
                  ? "vertical"
                  : "horizontal"
                : t.isHorizontal()
                ? "horizontal"
                : "vertical";
              const i = (u + 1) / p;
              let a = 1,
                r = 1;
              "horizontal" === e ? (a = i) : (r = i),
                n
                  .find(U(s.progressbarFillClass))
                  .transform(`translate3d(0,0,0) scaleX(${a}) scaleY(${r})`)
                  .transition(t.params.speed);
            }
            "custom" === s.type && s.renderCustom
              ? (n.html(s.renderCustom(t, u + 1, p)),
                a("paginationRender", n[0]))
              : a("paginationUpdate", n[0]),
              t.params.watchOverflow &&
                t.enabled &&
                n[t.isLocked ? "addClass" : "removeClass"](s.lockClass);
          }
          function p() {
            const e = t.params.pagination;
            if (o()) return;
            const s =
                t.virtual && t.params.virtual.enabled
                  ? t.virtual.slides.length
                  : t.slides.length,
              i = t.pagination.$el;
            let n = "";
            if ("bullets" === e.type) {
              let a = t.params.loop
                ? Math.ceil((s - 2 * t.loopedSlides) / t.params.slidesPerGroup)
                : t.snapGrid.length;
              t.params.freeMode &&
                t.params.freeMode.enabled &&
                !t.params.loop &&
                a > s &&
                (a = s);
              for (let s = 0; s < a; s += 1)
                e.renderBullet
                  ? (n += e.renderBullet.call(t, s, e.bulletClass))
                  : (n += `<${e.bulletElement} class="${e.bulletClass}"></${e.bulletElement}>`);
              i.html(n), (t.pagination.bullets = i.find(U(e.bulletClass)));
            }
            "fraction" === e.type &&
              ((n = e.renderFraction
                ? e.renderFraction.call(t, e.currentClass, e.totalClass)
                : `<span class="${e.currentClass}"></span> / <span class="${e.totalClass}"></span>`),
              i.html(n)),
              "progressbar" === e.type &&
                ((n = e.renderProgressbar
                  ? e.renderProgressbar.call(t, e.progressbarFillClass)
                  : `<span class="${e.progressbarFillClass}"></span>`),
                i.html(n)),
              "custom" !== e.type && a("paginationRender", t.pagination.$el[0]);
          }
          function f() {
            t.params.pagination = F(
              t,
              t.originalParams.pagination,
              t.params.pagination,
              { el: "swiper-pagination" }
            );
            const e = t.params.pagination;
            if (!e.el) return;
            let s = d(e.el);
            0 !== s.length &&
              (t.params.uniqueNavElements &&
                "string" == typeof e.el &&
                s.length > 1 &&
                ((s = t.$el.find(e.el)),
                s.length > 1 &&
                  (s = s.filter((e) => d(e).parents(".swiper")[0] === t.el))),
              "bullets" === e.type &&
                e.clickable &&
                s.addClass(e.clickableClass),
              s.addClass(e.modifierClass + e.type),
              s.addClass(e.modifierClass + t.params.direction),
              "bullets" === e.type &&
                e.dynamicBullets &&
                (s.addClass(`${e.modifierClass}${e.type}-dynamic`),
                (l = 0),
                e.dynamicMainBullets < 1 && (e.dynamicMainBullets = 1)),
              "progressbar" === e.type &&
                e.progressbarOpposite &&
                s.addClass(e.progressbarOppositeClass),
              e.clickable &&
                s.on("click", U(e.bulletClass), function (e) {
                  e.preventDefault();
                  let s = d(this).index() * t.params.slidesPerGroup;
                  t.params.loop && (s += t.loopedSlides), t.slideTo(s);
                }),
              Object.assign(t.pagination, { $el: s, el: s[0] }),
              t.enabled || s.addClass(e.lockClass));
          }
          function h() {
            const e = t.params.pagination;
            if (o()) return;
            const s = t.pagination.$el;
            s.removeClass(e.hiddenClass),
              s.removeClass(e.modifierClass + e.type),
              s.removeClass(e.modifierClass + t.params.direction),
              t.pagination.bullets &&
                t.pagination.bullets.removeClass &&
                t.pagination.bullets.removeClass(e.bulletActiveClass),
              e.clickable && s.off("click", U(e.bulletClass));
          }
          i("init", () => {
            f(), p(), u();
          }),
            i("activeIndexChange", () => {
              (t.params.loop || void 0 === t.snapIndex) && u();
            }),
            i("snapIndexChange", () => {
              t.params.loop || u();
            }),
            i("slidesLengthChange", () => {
              t.params.loop && (p(), u());
            }),
            i("snapGridLengthChange", () => {
              t.params.loop || (p(), u());
            }),
            i("destroy", () => {
              h();
            }),
            i("enable disable", () => {
              const { $el: e } = t.pagination;
              e &&
                e[t.enabled ? "removeClass" : "addClass"](
                  t.params.pagination.lockClass
                );
            }),
            i("lock unlock", () => {
              u();
            }),
            i("click", (e, s) => {
              const i = s.target,
                { $el: n } = t.pagination;
              if (
                t.params.pagination.el &&
                t.params.pagination.hideOnClick &&
                n.length > 0 &&
                !d(i).hasClass(t.params.pagination.bulletClass)
              ) {
                if (
                  t.navigation &&
                  ((t.navigation.nextEl && i === t.navigation.nextEl) ||
                    (t.navigation.prevEl && i === t.navigation.prevEl))
                )
                  return;
                const e = n.hasClass(t.params.pagination.hiddenClass);
                a(!0 === e ? "paginationShow" : "paginationHide"),
                  n.toggleClass(t.params.pagination.hiddenClass);
              }
            }),
            Object.assign(t.pagination, {
              render: p,
              update: u,
              init: f,
              destroy: h,
            });
        },
        function (e) {
          let { swiper: t, extendParams: s, on: a, emit: n } = e;
          const r = i();
          let l,
            o,
            c,
            p,
            f = !1,
            h = null,
            m = null;
          function g() {
            if (!t.params.scrollbar.el || !t.scrollbar.el) return;
            const { scrollbar: e, rtlTranslate: s, progress: i } = t,
              { $dragEl: a, $el: n } = e,
              r = t.params.scrollbar;
            let l = o,
              d = (c - o) * i;
            s
              ? ((d = -d),
                d > 0 ? ((l = o - d), (d = 0)) : -d + o > c && (l = c + d))
              : d < 0
              ? ((l = o + d), (d = 0))
              : d + o > c && (l = c - d),
              t.isHorizontal()
                ? (a.transform(`translate3d(${d}px, 0, 0)`),
                  (a[0].style.width = `${l}px`))
                : (a.transform(`translate3d(0px, ${d}px, 0)`),
                  (a[0].style.height = `${l}px`)),
              r.hide &&
                (clearTimeout(h),
                (n[0].style.opacity = 1),
                (h = setTimeout(() => {
                  (n[0].style.opacity = 0), n.transition(400);
                }, 1e3)));
          }
          function v() {
            if (!t.params.scrollbar.el || !t.scrollbar.el) return;
            const { scrollbar: e } = t,
              { $dragEl: s, $el: i } = e;
            (s[0].style.width = ""),
              (s[0].style.height = ""),
              (c = t.isHorizontal() ? i[0].offsetWidth : i[0].offsetHeight),
              (p =
                t.size /
                (t.virtualSize +
                  t.params.slidesOffsetBefore -
                  (t.params.centeredSlides ? t.snapGrid[0] : 0))),
              (o =
                "auto" === t.params.scrollbar.dragSize
                  ? c * p
                  : parseInt(t.params.scrollbar.dragSize, 10)),
              t.isHorizontal()
                ? (s[0].style.width = `${o}px`)
                : (s[0].style.height = `${o}px`),
              (i[0].style.display = p >= 1 ? "none" : ""),
              t.params.scrollbar.hide && (i[0].style.opacity = 0),
              t.params.watchOverflow &&
                t.enabled &&
                e.$el[t.isLocked ? "addClass" : "removeClass"](
                  t.params.scrollbar.lockClass
                );
          }
          function w(e) {
            return t.isHorizontal()
              ? "touchstart" === e.type || "touchmove" === e.type
                ? e.targetTouches[0].clientX
                : e.clientX
              : "touchstart" === e.type || "touchmove" === e.type
              ? e.targetTouches[0].clientY
              : e.clientY;
          }
          function y(e) {
            const { scrollbar: s, rtlTranslate: i } = t,
              { $el: a } = s;
            let n;
            (n =
              (w(e) -
                a.offset()[t.isHorizontal() ? "left" : "top"] -
                (null !== l ? l : o / 2)) /
              (c - o)),
              (n = Math.max(Math.min(n, 1), 0)),
              i && (n = 1 - n);
            const r =
              t.minTranslate() + (t.maxTranslate() - t.minTranslate()) * n;
            t.updateProgress(r),
              t.setTranslate(r),
              t.updateActiveIndex(),
              t.updateSlidesClasses();
          }
          function b(e) {
            const s = t.params.scrollbar,
              { scrollbar: i, $wrapperEl: a } = t,
              { $el: r, $dragEl: o } = i;
            (f = !0),
              (l =
                e.target === o[0] || e.target === o
                  ? w(e) -
                    e.target.getBoundingClientRect()[
                      t.isHorizontal() ? "left" : "top"
                    ]
                  : null),
              e.preventDefault(),
              e.stopPropagation(),
              a.transition(100),
              o.transition(100),
              y(e),
              clearTimeout(m),
              r.transition(0),
              s.hide && r.css("opacity", 1),
              t.params.cssMode && t.$wrapperEl.css("scroll-snap-type", "none"),
              n("scrollbarDragStart", e);
          }
          function x(e) {
            const { scrollbar: s, $wrapperEl: i } = t,
              { $el: a, $dragEl: r } = s;
            f &&
              (e.preventDefault ? e.preventDefault() : (e.returnValue = !1),
              y(e),
              i.transition(0),
              a.transition(0),
              r.transition(0),
              n("scrollbarDragMove", e));
          }
          function E(e) {
            const s = t.params.scrollbar,
              { scrollbar: i, $wrapperEl: a } = t,
              { $el: r } = i;
            f &&
              ((f = !1),
              t.params.cssMode &&
                (t.$wrapperEl.css("scroll-snap-type", ""), a.transition("")),
              s.hide &&
                (clearTimeout(m),
                (m = u(() => {
                  r.css("opacity", 0), r.transition(400);
                }, 1e3))),
              n("scrollbarDragEnd", e),
              s.snapOnRelease && t.slideToClosest());
          }
          function S(e) {
            const {
                scrollbar: s,
                touchEventsTouch: i,
                touchEventsDesktop: a,
                params: n,
                support: l,
              } = t,
              o = s.$el[0],
              d = !(!l.passiveListener || !n.passiveListeners) && {
                passive: !1,
                capture: !1,
              },
              c = !(!l.passiveListener || !n.passiveListeners) && {
                passive: !0,
                capture: !1,
              };
            if (!o) return;
            const u = "on" === e ? "addEventListener" : "removeEventListener";
            l.touch
              ? (o[u](i.start, b, d), o[u](i.move, x, d), o[u](i.end, E, c))
              : (o[u](a.start, b, d), r[u](a.move, x, d), r[u](a.end, E, c));
          }
          function C() {
            const { scrollbar: e, $el: s } = t;
            t.params.scrollbar = F(
              t,
              t.originalParams.scrollbar,
              t.params.scrollbar,
              { el: "swiper-scrollbar" }
            );
            const i = t.params.scrollbar;
            if (!i.el) return;
            let a = d(i.el);
            t.params.uniqueNavElements &&
              "string" == typeof i.el &&
              a.length > 1 &&
              1 === s.find(i.el).length &&
              (a = s.find(i.el));
            let n = a.find(`.${t.params.scrollbar.dragClass}`);
            0 === n.length &&
              ((n = d(`<div class="${t.params.scrollbar.dragClass}"></div>`)),
              a.append(n)),
              Object.assign(e, { $el: a, el: a[0], $dragEl: n, dragEl: n[0] }),
              i.draggable && t.params.scrollbar.el && S("on"),
              a &&
                a[t.enabled ? "removeClass" : "addClass"](
                  t.params.scrollbar.lockClass
                );
          }
          function T() {
            t.params.scrollbar.el && S("off");
          }
          s({
            scrollbar: {
              el: null,
              dragSize: "auto",
              hide: !1,
              draggable: !1,
              snapOnRelease: !0,
              lockClass: "swiper-scrollbar-lock",
              dragClass: "swiper-scrollbar-drag",
            },
          }),
            (t.scrollbar = {
              el: null,
              dragEl: null,
              $el: null,
              $dragEl: null,
            }),
            a("init", () => {
              C(), v(), g();
            }),
            a("update resize observerUpdate lock unlock", () => {
              v();
            }),
            a("setTranslate", () => {
              g();
            }),
            a("setTransition", (e, s) => {
              !(function (e) {
                t.params.scrollbar.el &&
                  t.scrollbar.el &&
                  t.scrollbar.$dragEl.transition(e);
              })(s);
            }),
            a("enable disable", () => {
              const { $el: e } = t.scrollbar;
              e &&
                e[t.enabled ? "removeClass" : "addClass"](
                  t.params.scrollbar.lockClass
                );
            }),
            a("destroy", () => {
              T();
            }),
            Object.assign(t.scrollbar, {
              updateSize: v,
              setTranslate: g,
              init: C,
              destroy: T,
            });
        },
        function (e) {
          let { swiper: t, extendParams: s, on: i } = e;
          s({ parallax: { enabled: !1 } });
          const a = (e, s) => {
              const { rtl: i } = t,
                a = d(e),
                n = i ? -1 : 1,
                r = a.attr("data-swiper-parallax") || "0";
              let l = a.attr("data-swiper-parallax-x"),
                o = a.attr("data-swiper-parallax-y");
              const c = a.attr("data-swiper-parallax-scale"),
                u = a.attr("data-swiper-parallax-opacity");
              if (
                (l || o
                  ? ((l = l || "0"), (o = o || "0"))
                  : t.isHorizontal()
                  ? ((l = r), (o = "0"))
                  : ((o = r), (l = "0")),
                (l =
                  l.indexOf("%") >= 0
                    ? parseInt(l, 10) * s * n + "%"
                    : l * s * n + "px"),
                (o =
                  o.indexOf("%") >= 0
                    ? parseInt(o, 10) * s + "%"
                    : o * s + "px"),
                null != u)
              ) {
                const e = u - (u - 1) * (1 - Math.abs(s));
                a[0].style.opacity = e;
              }
              if (null == c) a.transform(`translate3d(${l}, ${o}, 0px)`);
              else {
                const e = c - (c - 1) * (1 - Math.abs(s));
                a.transform(`translate3d(${l}, ${o}, 0px) scale(${e})`);
              }
            },
            n = () => {
              const { $el: e, slides: s, progress: i, snapGrid: n } = t;
              e
                .children(
                  "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]"
                )
                .each((e) => {
                  a(e, i);
                }),
                s.each((e, s) => {
                  let r = e.progress;
                  t.params.slidesPerGroup > 1 &&
                    "auto" !== t.params.slidesPerView &&
                    (r += Math.ceil(s / 2) - i * (n.length - 1)),
                    (r = Math.min(Math.max(r, -1), 1)),
                    d(e)
                      .find(
                        "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]"
                      )
                      .each((e) => {
                        a(e, r);
                      });
                });
            };
          i("beforeInit", () => {
            t.params.parallax.enabled &&
              ((t.params.watchSlidesProgress = !0),
              (t.originalParams.watchSlidesProgress = !0));
          }),
            i("init", () => {
              t.params.parallax.enabled && n();
            }),
            i("setTranslate", () => {
              t.params.parallax.enabled && n();
            }),
            i("setTransition", (e, s) => {
              t.params.parallax.enabled &&
                (function (e) {
                  void 0 === e && (e = t.params.speed);
                  const { $el: s } = t;
                  s.find(
                    "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]"
                  ).each((t) => {
                    const s = d(t);
                    let i =
                      parseInt(s.attr("data-swiper-parallax-duration"), 10) ||
                      e;
                    0 === e && (i = 0), s.transition(i);
                  });
                })(s);
            });
        },
        function (e) {
          let { swiper: t, extendParams: s, on: i, emit: a } = e;
          const r = n();
          s({
            zoom: {
              enabled: !1,
              maxRatio: 3,
              minRatio: 1,
              toggle: !0,
              containerClass: "swiper-zoom-container",
              zoomedSlideClass: "swiper-slide-zoomed",
            },
          }),
            (t.zoom = { enabled: !1 });
          let l,
            o,
            c,
            u = 1,
            p = !1;
          const h = {
              $slideEl: void 0,
              slideWidth: void 0,
              slideHeight: void 0,
              $imageEl: void 0,
              $imageWrapEl: void 0,
              maxRatio: 3,
            },
            m = {
              isTouched: void 0,
              isMoved: void 0,
              currentX: void 0,
              currentY: void 0,
              minX: void 0,
              minY: void 0,
              maxX: void 0,
              maxY: void 0,
              width: void 0,
              height: void 0,
              startX: void 0,
              startY: void 0,
              touchesStart: {},
              touchesCurrent: {},
            },
            g = {
              x: void 0,
              y: void 0,
              prevPositionX: void 0,
              prevPositionY: void 0,
              prevTime: void 0,
            };
          let v = 1;
          function w(e) {
            if (e.targetTouches.length < 2) return 1;
            const t = e.targetTouches[0].pageX,
              s = e.targetTouches[0].pageY,
              i = e.targetTouches[1].pageX,
              a = e.targetTouches[1].pageY;
            return Math.sqrt((i - t) ** 2 + (a - s) ** 2);
          }
          function y(e) {
            const s = t.support,
              i = t.params.zoom;
            if (((o = !1), (c = !1), !s.gestures)) {
              if (
                "touchstart" !== e.type ||
                ("touchstart" === e.type && e.targetTouches.length < 2)
              )
                return;
              (o = !0), (h.scaleStart = w(e));
            }
            (h.$slideEl && h.$slideEl.length) ||
            ((h.$slideEl = d(e.target).closest(`.${t.params.slideClass}`)),
            0 === h.$slideEl.length &&
              (h.$slideEl = t.slides.eq(t.activeIndex)),
            (h.$imageEl = h.$slideEl
              .find(`.${i.containerClass}`)
              .eq(0)
              .find("picture, img, svg, canvas, .swiper-zoom-target")
              .eq(0)),
            (h.$imageWrapEl = h.$imageEl.parent(`.${i.containerClass}`)),
            (h.maxRatio =
              h.$imageWrapEl.attr("data-swiper-zoom") || i.maxRatio),
            0 !== h.$imageWrapEl.length)
              ? (h.$imageEl && h.$imageEl.transition(0), (p = !0))
              : (h.$imageEl = void 0);
          }
          function b(e) {
            const s = t.support,
              i = t.params.zoom,
              a = t.zoom;
            if (!s.gestures) {
              if (
                "touchmove" !== e.type ||
                ("touchmove" === e.type && e.targetTouches.length < 2)
              )
                return;
              (c = !0), (h.scaleMove = w(e));
            }
            h.$imageEl && 0 !== h.$imageEl.length
              ? (s.gestures
                  ? (a.scale = e.scale * u)
                  : (a.scale = (h.scaleMove / h.scaleStart) * u),
                a.scale > h.maxRatio &&
                  (a.scale =
                    h.maxRatio - 1 + (a.scale - h.maxRatio + 1) ** 0.5),
                a.scale < i.minRatio &&
                  (a.scale =
                    i.minRatio + 1 - (i.minRatio - a.scale + 1) ** 0.5),
                h.$imageEl.transform(`translate3d(0,0,0) scale(${a.scale})`))
              : "gesturechange" === e.type && y(e);
          }
          function x(e) {
            const s = t.device,
              i = t.support,
              a = t.params.zoom,
              n = t.zoom;
            if (!i.gestures) {
              if (!o || !c) return;
              if (
                "touchend" !== e.type ||
                ("touchend" === e.type &&
                  e.changedTouches.length < 2 &&
                  !s.android)
              )
                return;
              (o = !1), (c = !1);
            }
            h.$imageEl &&
              0 !== h.$imageEl.length &&
              ((n.scale = Math.max(Math.min(n.scale, h.maxRatio), a.minRatio)),
              h.$imageEl
                .transition(t.params.speed)
                .transform(`translate3d(0,0,0) scale(${n.scale})`),
              (u = n.scale),
              (p = !1),
              1 === n.scale && (h.$slideEl = void 0));
          }
          function E(e) {
            const s = t.zoom;
            if (!h.$imageEl || 0 === h.$imageEl.length) return;
            if (((t.allowClick = !1), !m.isTouched || !h.$slideEl)) return;
            m.isMoved ||
              ((m.width = h.$imageEl[0].offsetWidth),
              (m.height = h.$imageEl[0].offsetHeight),
              (m.startX = f(h.$imageWrapEl[0], "x") || 0),
              (m.startY = f(h.$imageWrapEl[0], "y") || 0),
              (h.slideWidth = h.$slideEl[0].offsetWidth),
              (h.slideHeight = h.$slideEl[0].offsetHeight),
              h.$imageWrapEl.transition(0));
            const i = m.width * s.scale,
              a = m.height * s.scale;
            if (!(i < h.slideWidth && a < h.slideHeight)) {
              if (
                ((m.minX = Math.min(h.slideWidth / 2 - i / 2, 0)),
                (m.maxX = -m.minX),
                (m.minY = Math.min(h.slideHeight / 2 - a / 2, 0)),
                (m.maxY = -m.minY),
                (m.touchesCurrent.x =
                  "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX),
                (m.touchesCurrent.y =
                  "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY),
                !m.isMoved && !p)
              ) {
                if (
                  t.isHorizontal() &&
                  ((Math.floor(m.minX) === Math.floor(m.startX) &&
                    m.touchesCurrent.x < m.touchesStart.x) ||
                    (Math.floor(m.maxX) === Math.floor(m.startX) &&
                      m.touchesCurrent.x > m.touchesStart.x))
                )
                  return void (m.isTouched = !1);
                if (
                  !t.isHorizontal() &&
                  ((Math.floor(m.minY) === Math.floor(m.startY) &&
                    m.touchesCurrent.y < m.touchesStart.y) ||
                    (Math.floor(m.maxY) === Math.floor(m.startY) &&
                      m.touchesCurrent.y > m.touchesStart.y))
                )
                  return void (m.isTouched = !1);
              }
              e.cancelable && e.preventDefault(),
                e.stopPropagation(),
                (m.isMoved = !0),
                (m.currentX = m.touchesCurrent.x - m.touchesStart.x + m.startX),
                (m.currentY = m.touchesCurrent.y - m.touchesStart.y + m.startY),
                m.currentX < m.minX &&
                  (m.currentX = m.minX + 1 - (m.minX - m.currentX + 1) ** 0.8),
                m.currentX > m.maxX &&
                  (m.currentX = m.maxX - 1 + (m.currentX - m.maxX + 1) ** 0.8),
                m.currentY < m.minY &&
                  (m.currentY = m.minY + 1 - (m.minY - m.currentY + 1) ** 0.8),
                m.currentY > m.maxY &&
                  (m.currentY = m.maxY - 1 + (m.currentY - m.maxY + 1) ** 0.8),
                g.prevPositionX || (g.prevPositionX = m.touchesCurrent.x),
                g.prevPositionY || (g.prevPositionY = m.touchesCurrent.y),
                g.prevTime || (g.prevTime = Date.now()),
                (g.x =
                  (m.touchesCurrent.x - g.prevPositionX) /
                  (Date.now() - g.prevTime) /
                  2),
                (g.y =
                  (m.touchesCurrent.y - g.prevPositionY) /
                  (Date.now() - g.prevTime) /
                  2),
                Math.abs(m.touchesCurrent.x - g.prevPositionX) < 2 && (g.x = 0),
                Math.abs(m.touchesCurrent.y - g.prevPositionY) < 2 && (g.y = 0),
                (g.prevPositionX = m.touchesCurrent.x),
                (g.prevPositionY = m.touchesCurrent.y),
                (g.prevTime = Date.now()),
                h.$imageWrapEl.transform(
                  `translate3d(${m.currentX}px, ${m.currentY}px,0)`
                );
            }
          }
          function S() {
            const e = t.zoom;
            h.$slideEl &&
              t.previousIndex !== t.activeIndex &&
              (h.$imageEl &&
                h.$imageEl.transform("translate3d(0,0,0) scale(1)"),
              h.$imageWrapEl && h.$imageWrapEl.transform("translate3d(0,0,0)"),
              (e.scale = 1),
              (u = 1),
              (h.$slideEl = void 0),
              (h.$imageEl = void 0),
              (h.$imageWrapEl = void 0));
          }
          function C(e) {
            const s = t.zoom,
              i = t.params.zoom;
            if (
              (h.$slideEl ||
                (e &&
                  e.target &&
                  (h.$slideEl = d(e.target).closest(`.${t.params.slideClass}`)),
                h.$slideEl ||
                  (t.params.virtual && t.params.virtual.enabled && t.virtual
                    ? (h.$slideEl = t.$wrapperEl.children(
                        `.${t.params.slideActiveClass}`
                      ))
                    : (h.$slideEl = t.slides.eq(t.activeIndex))),
                (h.$imageEl = h.$slideEl
                  .find(`.${i.containerClass}`)
                  .eq(0)
                  .find("picture, img, svg, canvas, .swiper-zoom-target")
                  .eq(0)),
                (h.$imageWrapEl = h.$imageEl.parent(`.${i.containerClass}`))),
              !h.$imageEl ||
                0 === h.$imageEl.length ||
                !h.$imageWrapEl ||
                0 === h.$imageWrapEl.length)
            )
              return;
            let a, n, l, o, c, p, f, g, v, w, y, b, x, E, S, C, T, $;
            t.params.cssMode &&
              ((t.wrapperEl.style.overflow = "hidden"),
              (t.wrapperEl.style.touchAction = "none")),
              h.$slideEl.addClass(`${i.zoomedSlideClass}`),
              void 0 === m.touchesStart.x && e
                ? ((a =
                    "touchend" === e.type
                      ? e.changedTouches[0].pageX
                      : e.pageX),
                  (n =
                    "touchend" === e.type
                      ? e.changedTouches[0].pageY
                      : e.pageY))
                : ((a = m.touchesStart.x), (n = m.touchesStart.y)),
              (s.scale = h.$imageWrapEl.attr("data-swiper-zoom") || i.maxRatio),
              (u = h.$imageWrapEl.attr("data-swiper-zoom") || i.maxRatio),
              e
                ? ((T = h.$slideEl[0].offsetWidth),
                  ($ = h.$slideEl[0].offsetHeight),
                  (l = h.$slideEl.offset().left + r.scrollX),
                  (o = h.$slideEl.offset().top + r.scrollY),
                  (c = l + T / 2 - a),
                  (p = o + $ / 2 - n),
                  (v = h.$imageEl[0].offsetWidth),
                  (w = h.$imageEl[0].offsetHeight),
                  (y = v * s.scale),
                  (b = w * s.scale),
                  (x = Math.min(T / 2 - y / 2, 0)),
                  (E = Math.min($ / 2 - b / 2, 0)),
                  (S = -x),
                  (C = -E),
                  (f = c * s.scale),
                  (g = p * s.scale),
                  f < x && (f = x),
                  f > S && (f = S),
                  g < E && (g = E),
                  g > C && (g = C))
                : ((f = 0), (g = 0)),
              h.$imageWrapEl
                .transition(300)
                .transform(`translate3d(${f}px, ${g}px,0)`),
              h.$imageEl
                .transition(300)
                .transform(`translate3d(0,0,0) scale(${s.scale})`);
          }
          function T() {
            const e = t.zoom,
              s = t.params.zoom;
            h.$slideEl ||
              (t.params.virtual && t.params.virtual.enabled && t.virtual
                ? (h.$slideEl = t.$wrapperEl.children(
                    `.${t.params.slideActiveClass}`
                  ))
                : (h.$slideEl = t.slides.eq(t.activeIndex)),
              (h.$imageEl = h.$slideEl
                .find(`.${s.containerClass}`)
                .eq(0)
                .find("picture, img, svg, canvas, .swiper-zoom-target")
                .eq(0)),
              (h.$imageWrapEl = h.$imageEl.parent(`.${s.containerClass}`))),
              h.$imageEl &&
                0 !== h.$imageEl.length &&
                h.$imageWrapEl &&
                0 !== h.$imageWrapEl.length &&
                (t.params.cssMode &&
                  ((t.wrapperEl.style.overflow = ""),
                  (t.wrapperEl.style.touchAction = "")),
                (e.scale = 1),
                (u = 1),
                h.$imageWrapEl.transition(300).transform("translate3d(0,0,0)"),
                h.$imageEl
                  .transition(300)
                  .transform("translate3d(0,0,0) scale(1)"),
                h.$slideEl.removeClass(`${s.zoomedSlideClass}`),
                (h.$slideEl = void 0));
          }
          function $(e) {
            const s = t.zoom;
            s.scale && 1 !== s.scale ? T() : C(e);
          }
          function M() {
            const e = t.support;
            return {
              passiveListener: !(
                "touchstart" !== t.touchEvents.start ||
                !e.passiveListener ||
                !t.params.passiveListeners
              ) && { passive: !0, capture: !1 },
              activeListenerWithCapture: !e.passiveListener || {
                passive: !1,
                capture: !0,
              },
            };
          }
          function _() {
            return `.${t.params.slideClass}`;
          }
          function L(e) {
            const { passiveListener: s } = M(),
              i = _();
            t.$wrapperEl[e]("gesturestart", i, y, s),
              t.$wrapperEl[e]("gesturechange", i, b, s),
              t.$wrapperEl[e]("gestureend", i, x, s);
          }
          function k() {
            l || ((l = !0), L("on"));
          }
          function A() {
            l && ((l = !1), L("off"));
          }
          function P() {
            const e = t.zoom;
            if (e.enabled) return;
            e.enabled = !0;
            const s = t.support,
              { passiveListener: i, activeListenerWithCapture: a } = M(),
              n = _();
            s.gestures
              ? (t.$wrapperEl.on(t.touchEvents.start, k, i),
                t.$wrapperEl.on(t.touchEvents.end, A, i))
              : "touchstart" === t.touchEvents.start &&
                (t.$wrapperEl.on(t.touchEvents.start, n, y, i),
                t.$wrapperEl.on(t.touchEvents.move, n, b, a),
                t.$wrapperEl.on(t.touchEvents.end, n, x, i),
                t.touchEvents.cancel &&
                  t.$wrapperEl.on(t.touchEvents.cancel, n, x, i)),
              t.$wrapperEl.on(
                t.touchEvents.move,
                `.${t.params.zoom.containerClass}`,
                E,
                a
              );
          }
          function O() {
            const e = t.zoom;
            if (!e.enabled) return;
            const s = t.support;
            e.enabled = !1;
            const { passiveListener: i, activeListenerWithCapture: a } = M(),
              n = _();
            s.gestures
              ? (t.$wrapperEl.off(t.touchEvents.start, k, i),
                t.$wrapperEl.off(t.touchEvents.end, A, i))
              : "touchstart" === t.touchEvents.start &&
                (t.$wrapperEl.off(t.touchEvents.start, n, y, i),
                t.$wrapperEl.off(t.touchEvents.move, n, b, a),
                t.$wrapperEl.off(t.touchEvents.end, n, x, i),
                t.touchEvents.cancel &&
                  t.$wrapperEl.off(t.touchEvents.cancel, n, x, i)),
              t.$wrapperEl.off(
                t.touchEvents.move,
                `.${t.params.zoom.containerClass}`,
                E,
                a
              );
          }
          Object.defineProperty(t.zoom, "scale", {
            get: () => v,
            set(e) {
              if (v !== e) {
                const t = h.$imageEl ? h.$imageEl[0] : void 0,
                  s = h.$slideEl ? h.$slideEl[0] : void 0;
                a("zoomChange", e, t, s);
              }
              v = e;
            },
          }),
            i("init", () => {
              t.params.zoom.enabled && P();
            }),
            i("destroy", () => {
              O();
            }),
            i("touchStart", (e, s) => {
              t.zoom.enabled &&
                (function (e) {
                  const s = t.device;
                  h.$imageEl &&
                    0 !== h.$imageEl.length &&
                    (m.isTouched ||
                      (s.android && e.cancelable && e.preventDefault(),
                      (m.isTouched = !0),
                      (m.touchesStart.x =
                        "touchstart" === e.type
                          ? e.targetTouches[0].pageX
                          : e.pageX),
                      (m.touchesStart.y =
                        "touchstart" === e.type
                          ? e.targetTouches[0].pageY
                          : e.pageY)));
                })(s);
            }),
            i("touchEnd", (e, s) => {
              t.zoom.enabled &&
                (function () {
                  const e = t.zoom;
                  if (!h.$imageEl || 0 === h.$imageEl.length) return;
                  if (!m.isTouched || !m.isMoved)
                    return (m.isTouched = !1), void (m.isMoved = !1);
                  (m.isTouched = !1), (m.isMoved = !1);
                  let s = 300,
                    i = 300;
                  const a = g.x * s,
                    n = m.currentX + a,
                    r = g.y * i,
                    l = m.currentY + r;
                  0 !== g.x && (s = Math.abs((n - m.currentX) / g.x)),
                    0 !== g.y && (i = Math.abs((l - m.currentY) / g.y));
                  const o = Math.max(s, i);
                  (m.currentX = n), (m.currentY = l);
                  const d = m.width * e.scale,
                    c = m.height * e.scale;
                  (m.minX = Math.min(h.slideWidth / 2 - d / 2, 0)),
                    (m.maxX = -m.minX),
                    (m.minY = Math.min(h.slideHeight / 2 - c / 2, 0)),
                    (m.maxY = -m.minY),
                    (m.currentX = Math.max(
                      Math.min(m.currentX, m.maxX),
                      m.minX
                    )),
                    (m.currentY = Math.max(
                      Math.min(m.currentY, m.maxY),
                      m.minY
                    )),
                    h.$imageWrapEl
                      .transition(o)
                      .transform(
                        `translate3d(${m.currentX}px, ${m.currentY}px,0)`
                      );
                })();
            }),
            i("doubleTap", (e, s) => {
              !t.animating &&
                t.params.zoom.enabled &&
                t.zoom.enabled &&
                t.params.zoom.toggle &&
                $(s);
            }),
            i("transitionEnd", () => {
              t.zoom.enabled && t.params.zoom.enabled && S();
            }),
            i("slideChange", () => {
              t.zoom.enabled &&
                t.params.zoom.enabled &&
                t.params.cssMode &&
                S();
            }),
            Object.assign(t.zoom, {
              enable: P,
              disable: O,
              in: C,
              out: T,
              toggle: $,
            });
        },
        function (e) {
          let { swiper: t, extendParams: s, on: i, emit: a } = e;
          s({
            lazy: {
              checkInView: !1,
              enabled: !1,
              loadPrevNext: !1,
              loadPrevNextAmount: 1,
              loadOnTransitionStart: !1,
              scrollingElement: "",
              elementClass: "swiper-lazy",
              loadingClass: "swiper-lazy-loading",
              loadedClass: "swiper-lazy-loaded",
              preloaderClass: "swiper-lazy-preloader",
            },
          }),
            (t.lazy = {});
          let r = !1,
            l = !1;
          function o(e, s) {
            void 0 === s && (s = !0);
            const i = t.params.lazy;
            if (void 0 === e) return;
            if (0 === t.slides.length) return;
            const n =
                t.virtual && t.params.virtual.enabled
                  ? t.$wrapperEl.children(
                      `.${t.params.slideClass}[data-swiper-slide-index="${e}"]`
                    )
                  : t.slides.eq(e),
              r = n.find(
                `.${i.elementClass}:not(.${i.loadedClass}):not(.${i.loadingClass})`
              );
            !n.hasClass(i.elementClass) ||
              n.hasClass(i.loadedClass) ||
              n.hasClass(i.loadingClass) ||
              r.push(n[0]),
              0 !== r.length &&
                r.each((e) => {
                  const r = d(e);
                  r.addClass(i.loadingClass);
                  const l = r.attr("data-background"),
                    c = r.attr("data-src"),
                    u = r.attr("data-srcset"),
                    p = r.attr("data-sizes"),
                    f = r.parent("picture");
                  t.loadImage(r[0], c || l, u, p, !1, () => {
                    if (null != t && t && (!t || t.params) && !t.destroyed) {
                      if (
                        (l
                          ? (r.css("background-image", `url("${l}")`),
                            r.removeAttr("data-background"))
                          : (u &&
                              (r.attr("srcset", u),
                              r.removeAttr("data-srcset")),
                            p &&
                              (r.attr("sizes", p), r.removeAttr("data-sizes")),
                            f.length &&
                              f.children("source").each((e) => {
                                const t = d(e);
                                t.attr("data-srcset") &&
                                  (t.attr("srcset", t.attr("data-srcset")),
                                  t.removeAttr("data-srcset"));
                              }),
                            c && (r.attr("src", c), r.removeAttr("data-src"))),
                        r.addClass(i.loadedClass).removeClass(i.loadingClass),
                        n.find(`.${i.preloaderClass}`).remove(),
                        t.params.loop && s)
                      ) {
                        const e = n.attr("data-swiper-slide-index");
                        n.hasClass(t.params.slideDuplicateClass)
                          ? o(
                              t.$wrapperEl
                                .children(
                                  `[data-swiper-slide-index="${e}"]:not(.${t.params.slideDuplicateClass})`
                                )
                                .index(),
                              !1
                            )
                          : o(
                              t.$wrapperEl
                                .children(
                                  `.${t.params.slideDuplicateClass}[data-swiper-slide-index="${e}"]`
                                )
                                .index(),
                              !1
                            );
                      }
                      a("lazyImageReady", n[0], r[0]),
                        t.params.autoHeight && t.updateAutoHeight();
                    }
                  }),
                    a("lazyImageLoad", n[0], r[0]);
                });
          }
          function c() {
            const { $wrapperEl: e, params: s, slides: i, activeIndex: a } = t,
              n = t.virtual && s.virtual.enabled,
              r = s.lazy;
            let c = s.slidesPerView;
            function u(t) {
              if (n) {
                if (
                  e.children(`.${s.slideClass}[data-swiper-slide-index="${t}"]`)
                    .length
                )
                  return !0;
              } else if (i[t]) return !0;
              return !1;
            }
            function p(e) {
              return n ? d(e).attr("data-swiper-slide-index") : d(e).index();
            }
            if (
              ("auto" === c && (c = 0),
              l || (l = !0),
              t.params.watchSlidesProgress)
            )
              e.children(`.${s.slideVisibleClass}`).each((e) => {
                o(n ? d(e).attr("data-swiper-slide-index") : d(e).index());
              });
            else if (c > 1) for (let e = a; e < a + c; e += 1) u(e) && o(e);
            else o(a);
            if (r.loadPrevNext)
              if (c > 1 || (r.loadPrevNextAmount && r.loadPrevNextAmount > 1)) {
                const e = r.loadPrevNextAmount,
                  t = c,
                  s = Math.min(a + t + Math.max(e, t), i.length),
                  n = Math.max(a - Math.max(t, e), 0);
                for (let e = a + c; e < s; e += 1) u(e) && o(e);
                for (let e = n; e < a; e += 1) u(e) && o(e);
              } else {
                const t = e.children(`.${s.slideNextClass}`);
                t.length > 0 && o(p(t));
                const i = e.children(`.${s.slidePrevClass}`);
                i.length > 0 && o(p(i));
              }
          }
          function u() {
            const e = n();
            if (!t || t.destroyed) return;
            const s = t.params.lazy.scrollingElement
                ? d(t.params.lazy.scrollingElement)
                : d(e),
              i = s[0] === e,
              a = i ? e.innerWidth : s[0].offsetWidth,
              l = i ? e.innerHeight : s[0].offsetHeight,
              o = t.$el.offset(),
              { rtlTranslate: p } = t;
            let f = !1;
            p && (o.left -= t.$el[0].scrollLeft);
            const h = [
              [o.left, o.top],
              [o.left + t.width, o.top],
              [o.left, o.top + t.height],
              [o.left + t.width, o.top + t.height],
            ];
            for (let e = 0; e < h.length; e += 1) {
              const t = h[e];
              if (t[0] >= 0 && t[0] <= a && t[1] >= 0 && t[1] <= l) {
                if (0 === t[0] && 0 === t[1]) continue;
                f = !0;
              }
            }
            const m = !(
              "touchstart" !== t.touchEvents.start ||
              !t.support.passiveListener ||
              !t.params.passiveListeners
            ) && { passive: !0, capture: !1 };
            f
              ? (c(), s.off("scroll", u, m))
              : r || ((r = !0), s.on("scroll", u, m));
          }
          i("beforeInit", () => {
            t.params.lazy.enabled &&
              t.params.preloadImages &&
              (t.params.preloadImages = !1);
          }),
            i("init", () => {
              t.params.lazy.enabled && (t.params.lazy.checkInView ? u() : c());
            }),
            i("scroll", () => {
              t.params.freeMode &&
                t.params.freeMode.enabled &&
                !t.params.freeMode.sticky &&
                c();
            }),
            i("scrollbarDragMove resize _freeModeNoMomentumRelease", () => {
              t.params.lazy.enabled && (t.params.lazy.checkInView ? u() : c());
            }),
            i("transitionStart", () => {
              t.params.lazy.enabled &&
                (t.params.lazy.loadOnTransitionStart ||
                  (!t.params.lazy.loadOnTransitionStart && !l)) &&
                (t.params.lazy.checkInView ? u() : c());
            }),
            i("transitionEnd", () => {
              t.params.lazy.enabled &&
                !t.params.lazy.loadOnTransitionStart &&
                (t.params.lazy.checkInView ? u() : c());
            }),
            i("slideChange", () => {
              const {
                lazy: e,
                cssMode: s,
                watchSlidesProgress: i,
                touchReleaseOnEdges: a,
                resistanceRatio: n,
              } = t.params;
              e.enabled && (s || (i && (a || 0 === n))) && c();
            }),
            Object.assign(t.lazy, { load: c, loadInSlide: o });
        },
        function (e) {
          let { swiper: t, extendParams: s, on: i } = e;
          function a(e, t) {
            const s = (function () {
              let e, t, s;
              return (i, a) => {
                for (t = -1, e = i.length; e - t > 1; )
                  (s = (e + t) >> 1), i[s] <= a ? (t = s) : (e = s);
                return e;
              };
            })();
            let i, a;
            return (
              (this.x = e),
              (this.y = t),
              (this.lastIndex = e.length - 1),
              (this.interpolate = function (e) {
                return e
                  ? ((a = s(this.x, e)),
                    (i = a - 1),
                    ((e - this.x[i]) * (this.y[a] - this.y[i])) /
                      (this.x[a] - this.x[i]) +
                      this.y[i])
                  : 0;
              }),
              this
            );
          }
          function n() {
            t.controller.control &&
              t.controller.spline &&
              ((t.controller.spline = void 0), delete t.controller.spline);
          }
          s({ controller: { control: void 0, inverse: !1, by: "slide" } }),
            (t.controller = { control: void 0 }),
            i("beforeInit", () => {
              t.controller.control = t.params.controller.control;
            }),
            i("update", () => {
              n();
            }),
            i("resize", () => {
              n();
            }),
            i("observerUpdate", () => {
              n();
            }),
            i("setTranslate", (e, s, i) => {
              t.controller.control && t.controller.setTranslate(s, i);
            }),
            i("setTransition", (e, s, i) => {
              t.controller.control && t.controller.setTransition(s, i);
            }),
            Object.assign(t.controller, {
              setTranslate: function (e, s) {
                const i = t.controller.control;
                let n, r;
                const l = t.constructor;
                function o(e) {
                  const s = t.rtlTranslate ? -t.translate : t.translate;
                  "slide" === t.params.controller.by &&
                    ((function (e) {
                      t.controller.spline ||
                        (t.controller.spline = t.params.loop
                          ? new a(t.slidesGrid, e.slidesGrid)
                          : new a(t.snapGrid, e.snapGrid));
                    })(e),
                    (r = -t.controller.spline.interpolate(-s))),
                    (r && "container" !== t.params.controller.by) ||
                      ((n =
                        (e.maxTranslate() - e.minTranslate()) /
                        (t.maxTranslate() - t.minTranslate())),
                      (r = (s - t.minTranslate()) * n + e.minTranslate())),
                    t.params.controller.inverse && (r = e.maxTranslate() - r),
                    e.updateProgress(r),
                    e.setTranslate(r, t),
                    e.updateActiveIndex(),
                    e.updateSlidesClasses();
                }
                if (Array.isArray(i))
                  for (let e = 0; e < i.length; e += 1)
                    i[e] !== s && i[e] instanceof l && o(i[e]);
                else i instanceof l && s !== i && o(i);
              },
              setTransition: function (e, s) {
                const i = t.constructor,
                  a = t.controller.control;
                let n;
                function r(s) {
                  s.setTransition(e, t),
                    0 !== e &&
                      (s.transitionStart(),
                      s.params.autoHeight &&
                        u(() => {
                          s.updateAutoHeight();
                        }),
                      s.$wrapperEl.transitionEnd(() => {
                        a &&
                          (s.params.loop &&
                            "slide" === t.params.controller.by &&
                            s.loopFix(),
                          s.transitionEnd());
                      }));
                }
                if (Array.isArray(a))
                  for (n = 0; n < a.length; n += 1)
                    a[n] !== s && a[n] instanceof i && r(a[n]);
                else a instanceof i && s !== a && r(a);
              },
            });
        },
        function (e) {
          let { swiper: t, extendParams: s, on: i } = e;
          s({
            a11y: {
              enabled: !0,
              notificationClass: "swiper-notification",
              prevSlideMessage: "Previous slide",
              nextSlideMessage: "Next slide",
              firstSlideMessage: "This is the first slide",
              lastSlideMessage: "This is the last slide",
              paginationBulletMessage: "Go to slide {{index}}",
              slideLabelMessage: "{{index}} / {{slidesLength}}",
              containerMessage: null,
              containerRoleDescriptionMessage: null,
              itemRoleDescriptionMessage: null,
              slideRole: "group",
            },
          });
          let a = null;
          function n(e) {
            const t = a;
            0 !== t.length && (t.html(""), t.html(e));
          }
          function r(e) {
            e.attr("tabIndex", "0");
          }
          function l(e) {
            e.attr("tabIndex", "-1");
          }
          function o(e, t) {
            e.attr("role", t);
          }
          function c(e, t) {
            e.attr("aria-roledescription", t);
          }
          function u(e, t) {
            e.attr("aria-label", t);
          }
          function p(e) {
            e.attr("aria-disabled", !0);
          }
          function f(e) {
            e.attr("aria-disabled", !1);
          }
          function h(e) {
            if (13 !== e.keyCode && 32 !== e.keyCode) return;
            const s = t.params.a11y,
              i = d(e.target);
            t.navigation &&
              t.navigation.$nextEl &&
              i.is(t.navigation.$nextEl) &&
              ((t.isEnd && !t.params.loop) || t.slideNext(),
              t.isEnd ? n(s.lastSlideMessage) : n(s.nextSlideMessage)),
              t.navigation &&
                t.navigation.$prevEl &&
                i.is(t.navigation.$prevEl) &&
                ((t.isBeginning && !t.params.loop) || t.slidePrev(),
                t.isBeginning ? n(s.firstSlideMessage) : n(s.prevSlideMessage)),
              t.pagination &&
                i.is(U(t.params.pagination.bulletClass)) &&
                i[0].click();
          }
          function m() {
            return (
              t.pagination &&
              t.pagination.bullets &&
              t.pagination.bullets.length
            );
          }
          function g() {
            return m() && t.params.pagination.clickable;
          }
          const v = (e, t, s) => {
              r(e),
                "BUTTON" !== e[0].tagName &&
                  (o(e, "button"), e.on("keydown", h)),
                u(e, s),
                (function (e, t) {
                  e.attr("aria-controls", t);
                })(e, t);
            },
            w = (e) => {
              const s = e.target.closest(`.${t.params.slideClass}`);
              if (!s || !t.slides.includes(s)) return;
              const i = t.slides.indexOf(s) === t.activeIndex,
                a =
                  t.params.watchSlidesProgress &&
                  t.visibleSlides &&
                  t.visibleSlides.includes(s);
              i || a || t.slideTo(t.slides.indexOf(s), 0);
            };
          i("beforeInit", () => {
            a = d(
              `<span class="${t.params.a11y.notificationClass}" aria-live="assertive" aria-atomic="true"></span>`
            );
          }),
            i("afterInit", () => {
              t.params.a11y.enabled &&
                (function () {
                  const e = t.params.a11y;
                  t.$el.append(a);
                  const s = t.$el;
                  e.containerRoleDescriptionMessage &&
                    c(s, e.containerRoleDescriptionMessage),
                    e.containerMessage && u(s, e.containerMessage);
                  const i = t.$wrapperEl,
                    n =
                      i.attr("id") ||
                      `swiper-wrapper-${
                        ((r = 16),
                        void 0 === r && (r = 16),
                        "x"
                          .repeat(r)
                          .replace(/x/g, () =>
                            Math.round(16 * Math.random()).toString(16)
                          ))
                      }`;
                  var r;
                  const l =
                    t.params.autoplay && t.params.autoplay.enabled
                      ? "off"
                      : "polite";
                  var p;
                  (p = n),
                    i.attr("id", p),
                    (function (e, t) {
                      e.attr("aria-live", t);
                    })(i, l),
                    e.itemRoleDescriptionMessage &&
                      c(d(t.slides), e.itemRoleDescriptionMessage),
                    o(d(t.slides), e.slideRole);
                  const f = t.params.loop
                    ? t.slides.filter(
                        (e) =>
                          !e.classList.contains(t.params.slideDuplicateClass)
                      ).length
                    : t.slides.length;
                  let m, y;
                  t.slides.each((s, i) => {
                    const a = d(s),
                      n = t.params.loop
                        ? parseInt(a.attr("data-swiper-slide-index"), 10)
                        : i;
                    u(
                      a,
                      e.slideLabelMessage
                        .replace(/\{\{index\}\}/, n + 1)
                        .replace(/\{\{slidesLength\}\}/, f)
                    );
                  }),
                    t.navigation &&
                      t.navigation.$nextEl &&
                      (m = t.navigation.$nextEl),
                    t.navigation &&
                      t.navigation.$prevEl &&
                      (y = t.navigation.$prevEl),
                    m && m.length && v(m, n, e.nextSlideMessage),
                    y && y.length && v(y, n, e.prevSlideMessage),
                    g() &&
                      t.pagination.$el.on(
                        "keydown",
                        U(t.params.pagination.bulletClass),
                        h
                      ),
                    t.$el.on("focus", w, !0);
                })();
            }),
            i("fromEdge toEdge afterInit lock unlock", () => {
              t.params.a11y.enabled &&
                (function () {
                  if (t.params.loop || t.params.rewind || !t.navigation) return;
                  const { $nextEl: e, $prevEl: s } = t.navigation;
                  s &&
                    s.length > 0 &&
                    (t.isBeginning ? (p(s), l(s)) : (f(s), r(s))),
                    e &&
                      e.length > 0 &&
                      (t.isEnd ? (p(e), l(e)) : (f(e), r(e)));
                })();
            }),
            i("paginationUpdate", () => {
              t.params.a11y.enabled &&
                (function () {
                  const e = t.params.a11y;
                  m() &&
                    t.pagination.bullets.each((s) => {
                      const i = d(s);
                      t.params.pagination.clickable &&
                        (r(i),
                        t.params.pagination.renderBullet ||
                          (o(i, "button"),
                          u(
                            i,
                            e.paginationBulletMessage.replace(
                              /\{\{index\}\}/,
                              i.index() + 1
                            )
                          ))),
                        i.is(`.${t.params.pagination.bulletActiveClass}`)
                          ? i.attr("aria-current", "true")
                          : i.removeAttr("aria-current");
                    });
                })();
            }),
            i("destroy", () => {
              t.params.a11y.enabled &&
                (function () {
                  let e, s;
                  a && a.length > 0 && a.remove(),
                    t.navigation &&
                      t.navigation.$nextEl &&
                      (e = t.navigation.$nextEl),
                    t.navigation &&
                      t.navigation.$prevEl &&
                      (s = t.navigation.$prevEl),
                    e && e.off("keydown", h),
                    s && s.off("keydown", h),
                    g() &&
                      t.pagination.$el.off(
                        "keydown",
                        U(t.params.pagination.bulletClass),
                        h
                      ),
                    t.$el.off("focus", w, !0);
                })();
            });
        },
        function (e) {
          let { swiper: t, extendParams: s, on: i } = e;
          s({
            history: { enabled: !1, root: "", replaceState: !1, key: "slides" },
          });
          let a = !1,
            r = {};
          const l = (e) =>
              e
                .toString()
                .replace(/\s+/g, "-")
                .replace(/[^\w-]+/g, "")
                .replace(/--+/g, "-")
                .replace(/^-+/, "")
                .replace(/-+$/, ""),
            o = (e) => {
              const t = n();
              let s;
              s = e ? new URL(e) : t.location;
              const i = s.pathname
                  .slice(1)
                  .split("/")
                  .filter((e) => "" !== e),
                a = i.length;
              return { key: i[a - 2], value: i[a - 1] };
            },
            d = (e, s) => {
              const i = n();
              if (!a || !t.params.history.enabled) return;
              let r;
              r = t.params.url ? new URL(t.params.url) : i.location;
              const o = t.slides.eq(s);
              let d = l(o.attr("data-history"));
              if (t.params.history.root.length > 0) {
                let s = t.params.history.root;
                "/" === s[s.length - 1] && (s = s.slice(0, s.length - 1)),
                  (d = `${s}/${e}/${d}`);
              } else r.pathname.includes(e) || (d = `${e}/${d}`);
              const c = i.history.state;
              (c && c.value === d) ||
                (t.params.history.replaceState
                  ? i.history.replaceState({ value: d }, null, d)
                  : i.history.pushState({ value: d }, null, d));
            },
            c = (e, s, i) => {
              if (s)
                for (let a = 0, n = t.slides.length; a < n; a += 1) {
                  const n = t.slides.eq(a);
                  if (
                    l(n.attr("data-history")) === s &&
                    !n.hasClass(t.params.slideDuplicateClass)
                  ) {
                    const s = n.index();
                    t.slideTo(s, e, i);
                  }
                }
              else t.slideTo(0, e, i);
            },
            u = () => {
              (r = o(t.params.url)), c(t.params.speed, t.paths.value, !1);
            };
          i("init", () => {
            t.params.history.enabled &&
              (() => {
                const e = n();
                if (t.params.history) {
                  if (!e.history || !e.history.pushState)
                    return (
                      (t.params.history.enabled = !1),
                      void (t.params.hashNavigation.enabled = !0)
                    );
                  (a = !0),
                    (r = o(t.params.url)),
                    (r.key || r.value) &&
                      (c(0, r.value, t.params.runCallbacksOnInit),
                      t.params.history.replaceState ||
                        e.addEventListener("popstate", u));
                }
              })();
          }),
            i("destroy", () => {
              t.params.history.enabled &&
                (() => {
                  const e = n();
                  t.params.history.replaceState ||
                    e.removeEventListener("popstate", u);
                })();
            }),
            i("transitionEnd _freeModeNoMomentumRelease", () => {
              a && d(t.params.history.key, t.activeIndex);
            }),
            i("slideChange", () => {
              a && t.params.cssMode && d(t.params.history.key, t.activeIndex);
            });
        },
        function (e) {
          let { swiper: t, extendParams: s, emit: a, on: r } = e,
            l = !1;
          const o = i(),
            c = n();
          s({
            hashNavigation: { enabled: !1, replaceState: !1, watchState: !1 },
          });
          const u = () => {
              a("hashChange");
              const e = o.location.hash.replace("#", "");
              if (e !== t.slides.eq(t.activeIndex).attr("data-hash")) {
                const s = t.$wrapperEl
                  .children(`.${t.params.slideClass}[data-hash="${e}"]`)
                  .index();
                if (void 0 === s) return;
                t.slideTo(s);
              }
            },
            p = () => {
              if (l && t.params.hashNavigation.enabled)
                if (
                  t.params.hashNavigation.replaceState &&
                  c.history &&
                  c.history.replaceState
                )
                  c.history.replaceState(
                    null,
                    null,
                    `#${t.slides.eq(t.activeIndex).attr("data-hash")}` || ""
                  ),
                    a("hashSet");
                else {
                  const e = t.slides.eq(t.activeIndex),
                    s = e.attr("data-hash") || e.attr("data-history");
                  (o.location.hash = s || ""), a("hashSet");
                }
            };
          r("init", () => {
            t.params.hashNavigation.enabled &&
              (() => {
                if (
                  !t.params.hashNavigation.enabled ||
                  (t.params.history && t.params.history.enabled)
                )
                  return;
                l = !0;
                const e = o.location.hash.replace("#", "");
                if (e) {
                  const s = 0;
                  for (let i = 0, a = t.slides.length; i < a; i += 1) {
                    const a = t.slides.eq(i);
                    if (
                      (a.attr("data-hash") || a.attr("data-history")) === e &&
                      !a.hasClass(t.params.slideDuplicateClass)
                    ) {
                      const e = a.index();
                      t.slideTo(e, s, t.params.runCallbacksOnInit, !0);
                    }
                  }
                }
                t.params.hashNavigation.watchState && d(c).on("hashchange", u);
              })();
          }),
            r("destroy", () => {
              t.params.hashNavigation.enabled &&
                t.params.hashNavigation.watchState &&
                d(c).off("hashchange", u);
            }),
            r("transitionEnd _freeModeNoMomentumRelease", () => {
              l && p();
            }),
            r("slideChange", () => {
              l && t.params.cssMode && p();
            });
        },
        function (e) {
          let t,
            { swiper: s, extendParams: a, on: n, emit: r } = e;
          function l() {
            const e = s.slides.eq(s.activeIndex);
            let i = s.params.autoplay.delay;
            e.attr("data-swiper-autoplay") &&
              (i = e.attr("data-swiper-autoplay") || s.params.autoplay.delay),
              clearTimeout(t),
              (t = u(() => {
                let e;
                s.params.autoplay.reverseDirection
                  ? s.params.loop
                    ? (s.loopFix(),
                      (e = s.slidePrev(s.params.speed, !0, !0)),
                      r("autoplay"))
                    : s.isBeginning
                    ? s.params.autoplay.stopOnLastSlide
                      ? d()
                      : ((e = s.slideTo(
                          s.slides.length - 1,
                          s.params.speed,
                          !0,
                          !0
                        )),
                        r("autoplay"))
                    : ((e = s.slidePrev(s.params.speed, !0, !0)), r("autoplay"))
                  : s.params.loop
                  ? (s.loopFix(),
                    (e = s.slideNext(s.params.speed, !0, !0)),
                    r("autoplay"))
                  : s.isEnd
                  ? s.params.autoplay.stopOnLastSlide
                    ? d()
                    : ((e = s.slideTo(0, s.params.speed, !0, !0)),
                      r("autoplay"))
                  : ((e = s.slideNext(s.params.speed, !0, !0)), r("autoplay")),
                  ((s.params.cssMode && s.autoplay.running) || !1 === e) && l();
              }, i));
          }
          function o() {
            return (
              void 0 === t &&
              !s.autoplay.running &&
              ((s.autoplay.running = !0), r("autoplayStart"), l(), !0)
            );
          }
          function d() {
            return (
              !!s.autoplay.running &&
              void 0 !== t &&
              (t && (clearTimeout(t), (t = void 0)),
              (s.autoplay.running = !1),
              r("autoplayStop"),
              !0)
            );
          }
          function c(e) {
            s.autoplay.running &&
              (s.autoplay.paused ||
                (t && clearTimeout(t),
                (s.autoplay.paused = !0),
                0 !== e && s.params.autoplay.waitForTransition
                  ? ["transitionend", "webkitTransitionEnd"].forEach((e) => {
                      s.$wrapperEl[0].addEventListener(e, f);
                    })
                  : ((s.autoplay.paused = !1), l())));
          }
          function p() {
            const e = i();
            "hidden" === e.visibilityState && s.autoplay.running && c(),
              "visible" === e.visibilityState &&
                s.autoplay.paused &&
                (l(), (s.autoplay.paused = !1));
          }
          function f(e) {
            s &&
              !s.destroyed &&
              s.$wrapperEl &&
              e.target === s.$wrapperEl[0] &&
              (["transitionend", "webkitTransitionEnd"].forEach((e) => {
                s.$wrapperEl[0].removeEventListener(e, f);
              }),
              (s.autoplay.paused = !1),
              s.autoplay.running ? l() : d());
          }
          function h() {
            s.params.autoplay.disableOnInteraction
              ? d()
              : (r("autoplayPause"), c()),
              ["transitionend", "webkitTransitionEnd"].forEach((e) => {
                s.$wrapperEl[0].removeEventListener(e, f);
              });
          }
          function m() {
            s.params.autoplay.disableOnInteraction ||
              ((s.autoplay.paused = !1), r("autoplayResume"), l());
          }
          (s.autoplay = { running: !1, paused: !1 }),
            a({
              autoplay: {
                enabled: !1,
                delay: 3e3,
                waitForTransition: !0,
                disableOnInteraction: !0,
                stopOnLastSlide: !1,
                reverseDirection: !1,
                pauseOnMouseEnter: !1,
              },
            }),
            n("init", () => {
              s.params.autoplay.enabled &&
                (o(),
                i().addEventListener("visibilitychange", p),
                s.params.autoplay.pauseOnMouseEnter &&
                  (s.$el.on("mouseenter", h), s.$el.on("mouseleave", m)));
            }),
            n("beforeTransitionStart", (e, t, i) => {
              s.autoplay.running &&
                (i || !s.params.autoplay.disableOnInteraction
                  ? s.autoplay.pause(t)
                  : d());
            }),
            n("sliderFirstMove", () => {
              s.autoplay.running &&
                (s.params.autoplay.disableOnInteraction ? d() : c());
            }),
            n("touchEnd", () => {
              s.params.cssMode &&
                s.autoplay.paused &&
                !s.params.autoplay.disableOnInteraction &&
                l();
            }),
            n("destroy", () => {
              s.$el.off("mouseenter", h),
                s.$el.off("mouseleave", m),
                s.autoplay.running && d(),
                i().removeEventListener("visibilitychange", p);
            }),
            Object.assign(s.autoplay, { pause: c, run: l, start: o, stop: d });
        },
        function (e) {
          let { swiper: t, extendParams: s, on: i } = e;
          s({
            thumbs: {
              swiper: null,
              multipleActiveThumbs: !0,
              autoScrollOffset: 0,
              slideThumbActiveClass: "swiper-slide-thumb-active",
              thumbsContainerClass: "swiper-thumbs",
            },
          });
          let a = !1,
            n = !1;
          function r() {
            const e = t.thumbs.swiper;
            if (!e) return;
            const s = e.clickedIndex,
              i = e.clickedSlide;
            if (i && d(i).hasClass(t.params.thumbs.slideThumbActiveClass))
              return;
            if (null == s) return;
            let a;
            if (
              ((a = e.params.loop
                ? parseInt(
                    d(e.clickedSlide).attr("data-swiper-slide-index"),
                    10
                  )
                : s),
              t.params.loop)
            ) {
              let e = t.activeIndex;
              t.slides.eq(e).hasClass(t.params.slideDuplicateClass) &&
                (t.loopFix(),
                (t._clientLeft = t.$wrapperEl[0].clientLeft),
                (e = t.activeIndex));
              const s = t.slides
                  .eq(e)
                  .prevAll(`[data-swiper-slide-index="${a}"]`)
                  .eq(0)
                  .index(),
                i = t.slides
                  .eq(e)
                  .nextAll(`[data-swiper-slide-index="${a}"]`)
                  .eq(0)
                  .index();
              a = void 0 === s ? i : void 0 === i ? s : i - e < e - s ? i : s;
            }
            t.slideTo(a);
          }
          function l() {
            const { thumbs: e } = t.params;
            if (a) return !1;
            a = !0;
            const s = t.constructor;
            if (e.swiper instanceof s)
              (t.thumbs.swiper = e.swiper),
                Object.assign(t.thumbs.swiper.originalParams, {
                  watchSlidesProgress: !0,
                  slideToClickedSlide: !1,
                }),
                Object.assign(t.thumbs.swiper.params, {
                  watchSlidesProgress: !0,
                  slideToClickedSlide: !1,
                });
            else if (h(e.swiper)) {
              const i = Object.assign({}, e.swiper);
              Object.assign(i, {
                watchSlidesProgress: !0,
                slideToClickedSlide: !1,
              }),
                (t.thumbs.swiper = new s(i)),
                (n = !0);
            }
            return (
              t.thumbs.swiper.$el.addClass(
                t.params.thumbs.thumbsContainerClass
              ),
              t.thumbs.swiper.on("tap", r),
              !0
            );
          }
          function o(e) {
            const s = t.thumbs.swiper;
            if (!s) return;
            const i =
                "auto" === s.params.slidesPerView
                  ? s.slidesPerViewDynamic()
                  : s.params.slidesPerView,
              a = t.params.thumbs.autoScrollOffset,
              n = a && !s.params.loop;
            if (t.realIndex !== s.realIndex || n) {
              let r,
                l,
                o = s.activeIndex;
              if (s.params.loop) {
                s.slides.eq(o).hasClass(s.params.slideDuplicateClass) &&
                  (s.loopFix(),
                  (s._clientLeft = s.$wrapperEl[0].clientLeft),
                  (o = s.activeIndex));
                const e = s.slides
                    .eq(o)
                    .prevAll(`[data-swiper-slide-index="${t.realIndex}"]`)
                    .eq(0)
                    .index(),
                  i = s.slides
                    .eq(o)
                    .nextAll(`[data-swiper-slide-index="${t.realIndex}"]`)
                    .eq(0)
                    .index();
                (r =
                  void 0 === e
                    ? i
                    : void 0 === i
                    ? e
                    : i - o == o - e
                    ? s.params.slidesPerGroup > 1
                      ? i
                      : o
                    : i - o < o - e
                    ? i
                    : e),
                  (l = t.activeIndex > t.previousIndex ? "next" : "prev");
              } else
                (r = t.realIndex), (l = r > t.previousIndex ? "next" : "prev");
              n && (r += "next" === l ? a : -1 * a),
                s.visibleSlidesIndexes &&
                  s.visibleSlidesIndexes.indexOf(r) < 0 &&
                  (s.params.centeredSlides
                    ? (r =
                        r > o
                          ? r - Math.floor(i / 2) + 1
                          : r + Math.floor(i / 2) - 1)
                    : r > o && s.params.slidesPerGroup,
                  s.slideTo(r, e ? 0 : void 0));
            }
            let r = 1;
            const l = t.params.thumbs.slideThumbActiveClass;
            if (
              (t.params.slidesPerView > 1 &&
                !t.params.centeredSlides &&
                (r = t.params.slidesPerView),
              t.params.thumbs.multipleActiveThumbs || (r = 1),
              (r = Math.floor(r)),
              s.slides.removeClass(l),
              s.params.loop || (s.params.virtual && s.params.virtual.enabled))
            )
              for (let e = 0; e < r; e += 1)
                s.$wrapperEl
                  .children(`[data-swiper-slide-index="${t.realIndex + e}"]`)
                  .addClass(l);
            else
              for (let e = 0; e < r; e += 1)
                s.slides.eq(t.realIndex + e).addClass(l);
          }
          (t.thumbs = { swiper: null }),
            i("beforeInit", () => {
              const { thumbs: e } = t.params;
              e && e.swiper && (l(), o(!0));
            }),
            i("slideChange update resize observerUpdate", () => {
              t.thumbs.swiper && o();
            }),
            i("setTransition", (e, s) => {
              const i = t.thumbs.swiper;
              i && i.setTransition(s);
            }),
            i("beforeDestroy", () => {
              const e = t.thumbs.swiper;
              e && n && e && e.destroy();
            }),
            Object.assign(t.thumbs, { init: l, update: o });
        },
        function (e) {
          let { swiper: t, extendParams: s, emit: i, once: a } = e;
          s({
            freeMode: {
              enabled: !1,
              momentum: !0,
              momentumRatio: 1,
              momentumBounce: !0,
              momentumBounceRatio: 1,
              momentumVelocityRatio: 1,
              sticky: !1,
              minimumVelocity: 0.02,
            },
          }),
            Object.assign(t, {
              freeMode: {
                onTouchStart: function () {
                  const e = t.getTranslate();
                  t.setTranslate(e),
                    t.setTransition(0),
                    (t.touchEventsData.velocities.length = 0),
                    t.freeMode.onTouchEnd({
                      currentPos: t.rtl ? t.translate : -t.translate,
                    });
                },
                onTouchMove: function () {
                  const { touchEventsData: e, touches: s } = t;
                  0 === e.velocities.length &&
                    e.velocities.push({
                      position: s[t.isHorizontal() ? "startX" : "startY"],
                      time: e.touchStartTime,
                    }),
                    e.velocities.push({
                      position: s[t.isHorizontal() ? "currentX" : "currentY"],
                      time: p(),
                    });
                },
                onTouchEnd: function (e) {
                  let { currentPos: s } = e;
                  const {
                      params: n,
                      $wrapperEl: r,
                      rtlTranslate: l,
                      snapGrid: o,
                      touchEventsData: d,
                    } = t,
                    c = p() - d.touchStartTime;
                  if (s < -t.minTranslate()) t.slideTo(t.activeIndex);
                  else if (s > -t.maxTranslate())
                    t.slides.length < o.length
                      ? t.slideTo(o.length - 1)
                      : t.slideTo(t.slides.length - 1);
                  else {
                    if (n.freeMode.momentum) {
                      if (d.velocities.length > 1) {
                        const e = d.velocities.pop(),
                          s = d.velocities.pop(),
                          i = e.position - s.position,
                          a = e.time - s.time;
                        (t.velocity = i / a),
                          (t.velocity /= 2),
                          Math.abs(t.velocity) < n.freeMode.minimumVelocity &&
                            (t.velocity = 0),
                          (a > 150 || p() - e.time > 300) && (t.velocity = 0);
                      } else t.velocity = 0;
                      (t.velocity *= n.freeMode.momentumVelocityRatio),
                        (d.velocities.length = 0);
                      let e = 1e3 * n.freeMode.momentumRatio;
                      const s = t.velocity * e;
                      let c = t.translate + s;
                      l && (c = -c);
                      let u,
                        f = !1;
                      const h =
                        20 *
                        Math.abs(t.velocity) *
                        n.freeMode.momentumBounceRatio;
                      let m;
                      if (c < t.maxTranslate())
                        n.freeMode.momentumBounce
                          ? (c + t.maxTranslate() < -h &&
                              (c = t.maxTranslate() - h),
                            (u = t.maxTranslate()),
                            (f = !0),
                            (d.allowMomentumBounce = !0))
                          : (c = t.maxTranslate()),
                          n.loop && n.centeredSlides && (m = !0);
                      else if (c > t.minTranslate())
                        n.freeMode.momentumBounce
                          ? (c - t.minTranslate() > h &&
                              (c = t.minTranslate() + h),
                            (u = t.minTranslate()),
                            (f = !0),
                            (d.allowMomentumBounce = !0))
                          : (c = t.minTranslate()),
                          n.loop && n.centeredSlides && (m = !0);
                      else if (n.freeMode.sticky) {
                        let e;
                        for (let t = 0; t < o.length; t += 1)
                          if (o[t] > -c) {
                            e = t;
                            break;
                          }
                        (c =
                          Math.abs(o[e] - c) < Math.abs(o[e - 1] - c) ||
                          "next" === t.swipeDirection
                            ? o[e]
                            : o[e - 1]),
                          (c = -c);
                      }
                      if (
                        (m &&
                          a("transitionEnd", () => {
                            t.loopFix();
                          }),
                        0 !== t.velocity)
                      ) {
                        if (
                          ((e = l
                            ? Math.abs((-c - t.translate) / t.velocity)
                            : Math.abs((c - t.translate) / t.velocity)),
                          n.freeMode.sticky)
                        ) {
                          const s = Math.abs((l ? -c : c) - t.translate),
                            i = t.slidesSizesGrid[t.activeIndex];
                          e =
                            s < i
                              ? n.speed
                              : s < 2 * i
                              ? 1.5 * n.speed
                              : 2.5 * n.speed;
                        }
                      } else if (n.freeMode.sticky)
                        return void t.slideToClosest();
                      n.freeMode.momentumBounce && f
                        ? (t.updateProgress(u),
                          t.setTransition(e),
                          t.setTranslate(c),
                          t.transitionStart(!0, t.swipeDirection),
                          (t.animating = !0),
                          r.transitionEnd(() => {
                            t &&
                              !t.destroyed &&
                              d.allowMomentumBounce &&
                              (i("momentumBounce"),
                              t.setTransition(n.speed),
                              setTimeout(() => {
                                t.setTranslate(u),
                                  r.transitionEnd(() => {
                                    t && !t.destroyed && t.transitionEnd();
                                  });
                              }, 0));
                          }))
                        : t.velocity
                        ? (i("_freeModeNoMomentumRelease"),
                          t.updateProgress(c),
                          t.setTransition(e),
                          t.setTranslate(c),
                          t.transitionStart(!0, t.swipeDirection),
                          t.animating ||
                            ((t.animating = !0),
                            r.transitionEnd(() => {
                              t && !t.destroyed && t.transitionEnd();
                            })))
                        : t.updateProgress(c),
                        t.updateActiveIndex(),
                        t.updateSlidesClasses();
                    } else {
                      if (n.freeMode.sticky) return void t.slideToClosest();
                      n.freeMode && i("_freeModeNoMomentumRelease");
                    }
                    (!n.freeMode.momentum || c >= n.longSwipesMs) &&
                      (t.updateProgress(),
                      t.updateActiveIndex(),
                      t.updateSlidesClasses());
                  }
                },
              },
            });
        },
        function (e) {
          let t,
            s,
            i,
            { swiper: a, extendParams: n } = e;
          n({ grid: { rows: 1, fill: "column" } }),
            (a.grid = {
              initSlides: (e) => {
                const { slidesPerView: n } = a.params,
                  { rows: r, fill: l } = a.params.grid;
                (s = t / r),
                  (i = Math.floor(e / r)),
                  (t = Math.floor(e / r) === e / r ? e : Math.ceil(e / r) * r),
                  "auto" !== n && "row" === l && (t = Math.max(t, n * r));
              },
              updateSlide: (e, n, r, l) => {
                const { slidesPerGroup: o, spaceBetween: d } = a.params,
                  { rows: c, fill: u } = a.params.grid;
                let p, f, h;
                if ("row" === u && o > 1) {
                  const s = Math.floor(e / (o * c)),
                    i = e - c * o * s,
                    a =
                      0 === s ? o : Math.min(Math.ceil((r - s * c * o) / c), o);
                  (h = Math.floor(i / a)),
                    (f = i - h * a + s * o),
                    (p = f + (h * t) / c),
                    n.css({ "-webkit-order": p, order: p });
                } else
                  "column" === u
                    ? ((f = Math.floor(e / c)),
                      (h = e - f * c),
                      (f > i || (f === i && h === c - 1)) &&
                        ((h += 1), h >= c && ((h = 0), (f += 1))))
                    : ((h = Math.floor(e / s)), (f = e - h * s));
                n.css(l("margin-top"), 0 !== h ? d && `${d}px` : "");
              },
              updateWrapperSize: (e, s, i) => {
                const {
                    spaceBetween: n,
                    centeredSlides: r,
                    roundLengths: l,
                  } = a.params,
                  { rows: o } = a.params.grid;
                if (
                  ((a.virtualSize = (e + n) * t),
                  (a.virtualSize = Math.ceil(a.virtualSize / o) - n),
                  a.$wrapperEl.css({ [i("width")]: `${a.virtualSize + n}px` }),
                  r)
                ) {
                  s.splice(0, s.length);
                  const e = [];
                  for (let t = 0; t < s.length; t += 1) {
                    let i = s[t];
                    l && (i = Math.floor(i)),
                      s[t] < a.virtualSize + s[0] && e.push(i);
                  }
                  s.push(...e);
                }
              },
            });
        },
        function (e) {
          let { swiper: t } = e;
          Object.assign(t, {
            appendSlide: K.bind(t),
            prependSlide: Q.bind(t),
            addSlide: J.bind(t),
            removeSlide: Z.bind(t),
            removeAllSlides: ee.bind(t),
          });
        },
        function (e) {
          let { swiper: t, extendParams: s, on: i } = e;
          s({ fadeEffect: { crossFade: !1, transformEl: null } }),
            te({
              effect: "fade",
              swiper: t,
              on: i,
              setTranslate: () => {
                const { slides: e } = t,
                  s = t.params.fadeEffect;
                for (let i = 0; i < e.length; i += 1) {
                  const e = t.slides.eq(i);
                  let a = -e[0].swiperSlideOffset;
                  t.params.virtualTranslate || (a -= t.translate);
                  let n = 0;
                  t.isHorizontal() || ((n = a), (a = 0));
                  const r = t.params.fadeEffect.crossFade
                    ? Math.max(1 - Math.abs(e[0].progress), 0)
                    : 1 + Math.min(Math.max(e[0].progress, -1), 0);
                  se(s, e)
                    .css({ opacity: r })
                    .transform(`translate3d(${a}px, ${n}px, 0px)`);
                }
              },
              setTransition: (e) => {
                const { transformEl: s } = t.params.fadeEffect;
                (s ? t.slides.find(s) : t.slides).transition(e),
                  ie({ swiper: t, duration: e, transformEl: s, allSlides: !0 });
              },
              overwriteParams: () => ({
                slidesPerView: 1,
                slidesPerGroup: 1,
                watchSlidesProgress: !0,
                spaceBetween: 0,
                virtualTranslate: !t.params.cssMode,
              }),
            });
        },
        function (e) {
          let { swiper: t, extendParams: s, on: i } = e;
          s({
            cubeEffect: {
              slideShadows: !0,
              shadow: !0,
              shadowOffset: 20,
              shadowScale: 0.94,
            },
          }),
            te({
              effect: "cube",
              swiper: t,
              on: i,
              setTranslate: () => {
                const {
                    $el: e,
                    $wrapperEl: s,
                    slides: i,
                    width: a,
                    height: n,
                    rtlTranslate: r,
                    size: l,
                    browser: o,
                  } = t,
                  c = t.params.cubeEffect,
                  u = t.isHorizontal(),
                  p = t.virtual && t.params.virtual.enabled;
                let f,
                  h = 0;
                c.shadow &&
                  (u
                    ? ((f = s.find(".swiper-cube-shadow")),
                      0 === f.length &&
                        ((f = d('<div class="swiper-cube-shadow"></div>')),
                        s.append(f)),
                      f.css({ height: `${a}px` }))
                    : ((f = e.find(".swiper-cube-shadow")),
                      0 === f.length &&
                        ((f = d('<div class="swiper-cube-shadow"></div>')),
                        e.append(f))));
                for (let e = 0; e < i.length; e += 1) {
                  const t = i.eq(e);
                  let s = e;
                  p && (s = parseInt(t.attr("data-swiper-slide-index"), 10));
                  let a = 90 * s,
                    n = Math.floor(a / 360);
                  r && ((a = -a), (n = Math.floor(-a / 360)));
                  const o = Math.max(Math.min(t[0].progress, 1), -1);
                  let f = 0,
                    m = 0,
                    g = 0;
                  s % 4 == 0
                    ? ((f = 4 * -n * l), (g = 0))
                    : (s - 1) % 4 == 0
                    ? ((f = 0), (g = 4 * -n * l))
                    : (s - 2) % 4 == 0
                    ? ((f = l + 4 * n * l), (g = l))
                    : (s - 3) % 4 == 0 && ((f = -l), (g = 3 * l + 4 * l * n)),
                    r && (f = -f),
                    u || ((m = f), (f = 0));
                  const v = `rotateX(${u ? 0 : -a}deg) rotateY(${
                    u ? a : 0
                  }deg) translate3d(${f}px, ${m}px, ${g}px)`;
                  if (
                    (o <= 1 &&
                      o > -1 &&
                      ((h = 90 * s + 90 * o), r && (h = 90 * -s - 90 * o)),
                    t.transform(v),
                    c.slideShadows)
                  ) {
                    let e = u
                        ? t.find(".swiper-slide-shadow-left")
                        : t.find(".swiper-slide-shadow-top"),
                      s = u
                        ? t.find(".swiper-slide-shadow-right")
                        : t.find(".swiper-slide-shadow-bottom");
                    0 === e.length &&
                      ((e = d(
                        `<div class="swiper-slide-shadow-${
                          u ? "left" : "top"
                        }"></div>`
                      )),
                      t.append(e)),
                      0 === s.length &&
                        ((s = d(
                          `<div class="swiper-slide-shadow-${
                            u ? "right" : "bottom"
                          }"></div>`
                        )),
                        t.append(s)),
                      e.length && (e[0].style.opacity = Math.max(-o, 0)),
                      s.length && (s[0].style.opacity = Math.max(o, 0));
                  }
                }
                if (
                  (s.css({
                    "-webkit-transform-origin": `50% 50% -${l / 2}px`,
                    "transform-origin": `50% 50% -${l / 2}px`,
                  }),
                  c.shadow)
                )
                  if (u)
                    f.transform(
                      `translate3d(0px, ${a / 2 + c.shadowOffset}px, ${
                        -a / 2
                      }px) rotateX(90deg) rotateZ(0deg) scale(${c.shadowScale})`
                    );
                  else {
                    const e = Math.abs(h) - 90 * Math.floor(Math.abs(h) / 90),
                      t =
                        1.5 -
                        (Math.sin((2 * e * Math.PI) / 360) / 2 +
                          Math.cos((2 * e * Math.PI) / 360) / 2),
                      s = c.shadowScale,
                      i = c.shadowScale / t,
                      a = c.shadowOffset;
                    f.transform(
                      `scale3d(${s}, 1, ${i}) translate3d(0px, ${
                        n / 2 + a
                      }px, ${-n / 2 / i}px) rotateX(-90deg)`
                    );
                  }
                const m = o.isSafari || o.isWebView ? -l / 2 : 0;
                s.transform(
                  `translate3d(0px,0,${m}px) rotateX(${
                    t.isHorizontal() ? 0 : h
                  }deg) rotateY(${t.isHorizontal() ? -h : 0}deg)`
                );
              },
              setTransition: (e) => {
                const { $el: s, slides: i } = t;
                i
                  .transition(e)
                  .find(
                    ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
                  )
                  .transition(e),
                  t.params.cubeEffect.shadow &&
                    !t.isHorizontal() &&
                    s.find(".swiper-cube-shadow").transition(e);
              },
              perspective: () => !0,
              overwriteParams: () => ({
                slidesPerView: 1,
                slidesPerGroup: 1,
                watchSlidesProgress: !0,
                resistanceRatio: 0,
                spaceBetween: 0,
                centeredSlides: !1,
                virtualTranslate: !0,
              }),
            });
        },
        function (e) {
          let { swiper: t, extendParams: s, on: i } = e;
          s({
            flipEffect: {
              slideShadows: !0,
              limitRotation: !0,
              transformEl: null,
            },
          }),
            te({
              effect: "flip",
              swiper: t,
              on: i,
              setTranslate: () => {
                const { slides: e, rtlTranslate: s } = t,
                  i = t.params.flipEffect;
                for (let a = 0; a < e.length; a += 1) {
                  const n = e.eq(a);
                  let r = n[0].progress;
                  t.params.flipEffect.limitRotation &&
                    (r = Math.max(Math.min(n[0].progress, 1), -1));
                  const l = n[0].swiperSlideOffset;
                  let o = -180 * r,
                    d = 0,
                    c = t.params.cssMode ? -l - t.translate : -l,
                    u = 0;
                  if (
                    (t.isHorizontal()
                      ? s && (o = -o)
                      : ((u = c), (c = 0), (d = -o), (o = 0)),
                    (n[0].style.zIndex = -Math.abs(Math.round(r)) + e.length),
                    i.slideShadows)
                  ) {
                    let e = t.isHorizontal()
                        ? n.find(".swiper-slide-shadow-left")
                        : n.find(".swiper-slide-shadow-top"),
                      s = t.isHorizontal()
                        ? n.find(".swiper-slide-shadow-right")
                        : n.find(".swiper-slide-shadow-bottom");
                    0 === e.length &&
                      (e = ae(i, n, t.isHorizontal() ? "left" : "top")),
                      0 === s.length &&
                        (s = ae(i, n, t.isHorizontal() ? "right" : "bottom")),
                      e.length && (e[0].style.opacity = Math.max(-r, 0)),
                      s.length && (s[0].style.opacity = Math.max(r, 0));
                  }
                  const p = `translate3d(${c}px, ${u}px, 0px) rotateX(${d}deg) rotateY(${o}deg)`;
                  se(i, n).transform(p);
                }
              },
              setTransition: (e) => {
                const { transformEl: s } = t.params.flipEffect;
                (s ? t.slides.find(s) : t.slides)
                  .transition(e)
                  .find(
                    ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
                  )
                  .transition(e),
                  ie({ swiper: t, duration: e, transformEl: s });
              },
              perspective: () => !0,
              overwriteParams: () => ({
                slidesPerView: 1,
                slidesPerGroup: 1,
                watchSlidesProgress: !0,
                spaceBetween: 0,
                virtualTranslate: !t.params.cssMode,
              }),
            });
        },
        function (e) {
          let { swiper: t, extendParams: s, on: i } = e;
          s({
            coverflowEffect: {
              rotate: 50,
              stretch: 0,
              depth: 100,
              scale: 1,
              modifier: 1,
              slideShadows: !0,
              transformEl: null,
            },
          }),
            te({
              effect: "coverflow",
              swiper: t,
              on: i,
              setTranslate: () => {
                const {
                    width: e,
                    height: s,
                    slides: i,
                    slidesSizesGrid: a,
                  } = t,
                  n = t.params.coverflowEffect,
                  r = t.isHorizontal(),
                  l = t.translate,
                  o = r ? e / 2 - l : s / 2 - l,
                  d = r ? n.rotate : -n.rotate,
                  c = n.depth;
                for (let e = 0, t = i.length; e < t; e += 1) {
                  const t = i.eq(e),
                    s = a[e],
                    l = ((o - t[0].swiperSlideOffset - s / 2) / s) * n.modifier;
                  let u = r ? d * l : 0,
                    p = r ? 0 : d * l,
                    f = -c * Math.abs(l),
                    h = n.stretch;
                  "string" == typeof h &&
                    -1 !== h.indexOf("%") &&
                    (h = (parseFloat(n.stretch) / 100) * s);
                  let m = r ? 0 : h * l,
                    g = r ? h * l : 0,
                    v = 1 - (1 - n.scale) * Math.abs(l);
                  Math.abs(g) < 0.001 && (g = 0),
                    Math.abs(m) < 0.001 && (m = 0),
                    Math.abs(f) < 0.001 && (f = 0),
                    Math.abs(u) < 0.001 && (u = 0),
                    Math.abs(p) < 0.001 && (p = 0),
                    Math.abs(v) < 0.001 && (v = 0);
                  const w = `translate3d(${g}px,${m}px,${f}px)  rotateX(${p}deg) rotateY(${u}deg) scale(${v})`;
                  if (
                    (se(n, t).transform(w),
                    (t[0].style.zIndex = 1 - Math.abs(Math.round(l))),
                    n.slideShadows)
                  ) {
                    let e = r
                        ? t.find(".swiper-slide-shadow-left")
                        : t.find(".swiper-slide-shadow-top"),
                      s = r
                        ? t.find(".swiper-slide-shadow-right")
                        : t.find(".swiper-slide-shadow-bottom");
                    0 === e.length && (e = ae(n, t, r ? "left" : "top")),
                      0 === s.length && (s = ae(n, t, r ? "right" : "bottom")),
                      e.length && (e[0].style.opacity = l > 0 ? l : 0),
                      s.length && (s[0].style.opacity = -l > 0 ? -l : 0);
                  }
                }
              },
              setTransition: (e) => {
                const { transformEl: s } = t.params.coverflowEffect;
                (s ? t.slides.find(s) : t.slides)
                  .transition(e)
                  .find(
                    ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
                  )
                  .transition(e);
              },
              perspective: () => !0,
              overwriteParams: () => ({ watchSlidesProgress: !0 }),
            });
        },
        function (e) {
          let { swiper: t, extendParams: s, on: i } = e;
          s({
            creativeEffect: {
              transformEl: null,
              limitProgress: 1,
              shadowPerProgress: !1,
              progressMultiplier: 1,
              perspective: !0,
              prev: {
                translate: [0, 0, 0],
                rotate: [0, 0, 0],
                opacity: 1,
                scale: 1,
              },
              next: {
                translate: [0, 0, 0],
                rotate: [0, 0, 0],
                opacity: 1,
                scale: 1,
              },
            },
          });
          const a = (e) => ("string" == typeof e ? e : `${e}px`);
          te({
            effect: "creative",
            swiper: t,
            on: i,
            setTranslate: () => {
              const { slides: e, $wrapperEl: s, slidesSizesGrid: i } = t,
                n = t.params.creativeEffect,
                { progressMultiplier: r } = n,
                l = t.params.centeredSlides;
              if (l) {
                const e = i[0] / 2 - t.params.slidesOffsetBefore || 0;
                s.transform(`translateX(calc(50% - ${e}px))`);
              }
              for (let s = 0; s < e.length; s += 1) {
                const i = e.eq(s),
                  o = i[0].progress,
                  d = Math.min(
                    Math.max(i[0].progress, -n.limitProgress),
                    n.limitProgress
                  );
                let c = d;
                l ||
                  (c = Math.min(
                    Math.max(i[0].originalProgress, -n.limitProgress),
                    n.limitProgress
                  ));
                const u = i[0].swiperSlideOffset,
                  p = [t.params.cssMode ? -u - t.translate : -u, 0, 0],
                  f = [0, 0, 0];
                let h = !1;
                t.isHorizontal() || ((p[1] = p[0]), (p[0] = 0));
                let m = {
                  translate: [0, 0, 0],
                  rotate: [0, 0, 0],
                  scale: 1,
                  opacity: 1,
                };
                d < 0
                  ? ((m = n.next), (h = !0))
                  : d > 0 && ((m = n.prev), (h = !0)),
                  p.forEach((e, t) => {
                    p[t] = `calc(${e}px + (${a(m.translate[t])} * ${Math.abs(
                      d * r
                    )}))`;
                  }),
                  f.forEach((e, t) => {
                    f[t] = m.rotate[t] * Math.abs(d * r);
                  }),
                  (i[0].style.zIndex = -Math.abs(Math.round(o)) + e.length);
                const g = p.join(", "),
                  v = `rotateX(${f[0]}deg) rotateY(${f[1]}deg) rotateZ(${f[2]}deg)`,
                  w =
                    c < 0
                      ? `scale(${1 + (1 - m.scale) * c * r})`
                      : `scale(${1 - (1 - m.scale) * c * r})`,
                  y =
                    c < 0
                      ? 1 + (1 - m.opacity) * c * r
                      : 1 - (1 - m.opacity) * c * r,
                  b = `translate3d(${g}) ${v} ${w}`;
                if ((h && m.shadow) || !h) {
                  let e = i.children(".swiper-slide-shadow");
                  if (
                    (0 === e.length && m.shadow && (e = ae(n, i)), e.length)
                  ) {
                    const t = n.shadowPerProgress
                      ? d * (1 / n.limitProgress)
                      : d;
                    e[0].style.opacity = Math.min(Math.max(Math.abs(t), 0), 1);
                  }
                }
                const x = se(n, i);
                x.transform(b).css({ opacity: y }),
                  m.origin && x.css("transform-origin", m.origin);
              }
            },
            setTransition: (e) => {
              const { transformEl: s } = t.params.creativeEffect;
              (s ? t.slides.find(s) : t.slides)
                .transition(e)
                .find(".swiper-slide-shadow")
                .transition(e),
                ie({ swiper: t, duration: e, transformEl: s, allSlides: !0 });
            },
            perspective: () => t.params.creativeEffect.perspective,
            overwriteParams: () => ({
              watchSlidesProgress: !0,
              virtualTranslate: !t.params.cssMode,
            }),
          });
        },
        function (e) {
          let { swiper: t, extendParams: s, on: i } = e;
          s({ cardsEffect: { slideShadows: !0, transformEl: null } }),
            te({
              effect: "cards",
              swiper: t,
              on: i,
              setTranslate: () => {
                const { slides: e, activeIndex: s } = t,
                  i = t.params.cardsEffect,
                  { startTranslate: a, isTouched: n } = t.touchEventsData,
                  r = t.translate;
                for (let l = 0; l < e.length; l += 1) {
                  const o = e.eq(l),
                    d = o[0].progress,
                    c = Math.min(Math.max(d, -4), 4);
                  let u = o[0].swiperSlideOffset;
                  t.params.centeredSlides &&
                    !t.params.cssMode &&
                    t.$wrapperEl.transform(`translateX(${t.minTranslate()}px)`),
                    t.params.centeredSlides &&
                      t.params.cssMode &&
                      (u -= e[0].swiperSlideOffset);
                  let p = t.params.cssMode ? -u - t.translate : -u,
                    f = 0;
                  const h = -100 * Math.abs(c);
                  let m = 1,
                    g = -2 * c,
                    v = 8 - 0.75 * Math.abs(c);
                  const w =
                      (l === s || l === s - 1) &&
                      c > 0 &&
                      c < 1 &&
                      (n || t.params.cssMode) &&
                      r < a,
                    y =
                      (l === s || l === s + 1) &&
                      c < 0 &&
                      c > -1 &&
                      (n || t.params.cssMode) &&
                      r > a;
                  if (w || y) {
                    const e = (1 - Math.abs((Math.abs(c) - 0.5) / 0.5)) ** 0.5;
                    (g += -28 * c * e),
                      (m += -0.5 * e),
                      (v += 96 * e),
                      (f = -25 * e * Math.abs(c) + "%");
                  }
                  if (
                    ((p =
                      c < 0
                        ? `calc(${p}px + (${v * Math.abs(c)}%))`
                        : c > 0
                        ? `calc(${p}px + (-${v * Math.abs(c)}%))`
                        : `${p}px`),
                    !t.isHorizontal())
                  ) {
                    const e = f;
                    (f = p), (p = e);
                  }
                  const b = `\n        translate3d(${p}, ${f}, ${h}px)\n        rotateZ(${g}deg)\n        scale(${
                    c < 0 ? "" + (1 + (1 - m) * c) : "" + (1 - (1 - m) * c)
                  })\n      `;
                  if (i.slideShadows) {
                    let e = o.find(".swiper-slide-shadow");
                    0 === e.length && (e = ae(i, o)),
                      e.length &&
                        (e[0].style.opacity = Math.min(
                          Math.max((Math.abs(c) - 0.5) / 0.5, 0),
                          1
                        ));
                  }
                  (o[0].style.zIndex = -Math.abs(Math.round(d)) + e.length),
                    se(i, o).transform(b);
                }
              },
              setTransition: (e) => {
                const { transformEl: s } = t.params.cardsEffect;
                (s ? t.slides.find(s) : t.slides)
                  .transition(e)
                  .find(".swiper-slide-shadow")
                  .transition(e),
                  ie({ swiper: t, duration: e, transformEl: s });
              },
              perspective: () => !0,
              overwriteParams: () => ({
                watchSlidesProgress: !0,
                virtualTranslate: !t.params.cssMode,
              }),
            });
        },
      ];
      return V.use(ne), V;
    });
  var s = window.navigator.userAgent,
    i =
      (s.indexOf("MSIE "),
      {
        Android: function () {
          return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
          return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
          return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
          return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
          return navigator.userAgent.match(/IEMobile/i);
        },
        any: function () {
          return (
            i.Android() || i.BlackBerry() || i.iOS() || i.Opera() || i.Windows()
          );
        },
      });
  function a() {
    return (
      (s = navigator.userAgent).indexOf("MSIE ") > -1 ||
      s.indexOf("Trident/") > -1
    );
  }
  a() && document.querySelector("html").classList.add("ie"),
    i.any() && document.querySelector("html").classList.add("_touch");
  new LazyLoad({
    elements_selector: "[data-src]",
    class_loaded: "_lazy-loaded",
    use_native: !0,
  });
  var n, r;
  function l() {
    if (a()) {
      let t = document.querySelectorAll("._ibg");
      for (var e = 0; e < t.length; e++)
        t[e].querySelector("img") &&
          null != t[e].querySelector("img").getAttribute("src") &&
          (t[e].style.backgroundImage =
            "url(" + t[e].querySelector("img").getAttribute("src") + ")");
    }
  }
  (n = function (e) {
    !0 === e
      ? document.querySelector("html").classList.add("_webp")
      : document.querySelector("html").classList.add("_no-webp");
  }),
    ((r = new Image()).onload = r.onerror =
      function () {
        n(2 == r.height);
      }),
    (r.src =
      "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA"),
    l(),
    window.addEventListener("load", function () {
      document.querySelector(".wrapper") &&
        setTimeout(function () {
          document.querySelector(".wrapper").classList.add("_loaded");
        }, 0);
    });
  let o = !0;
  if (location.hash) {
    const e = location.hash.replace("#", "");
    document.querySelector(".popup_" + e)
      ? y(e)
      : document.querySelector("div." + e) &&
        B(document.querySelector("." + e), 500, "");
  }
  let d = document.querySelector(".icon-menu");
  if (null != d) {
    let e = 500,
      t = document.querySelector(".menu__body");
    d.addEventListener("click", function (s) {
      o &&
        (!(function (e) {
          document.querySelector("body").classList.contains("_lock")
            ? u(e)
            : p(e);
        })(e),
        d.classList.toggle("_active"),
        t.classList.toggle("_active"));
    });
  }
  function c() {
    let e = document.querySelector(".icon-menu"),
      t = document.querySelector(".menu__body");
    e.classList.remove("_active"), t.classList.remove("_active");
  }
  function u(e) {
    let t = document.querySelector("body");
    if (o) {
      let s = document.querySelectorAll("._lp");
      setTimeout(() => {
        for (let e = 0; e < s.length; e++) {
          s[e].style.paddingRight = "0px";
        }
        (t.style.paddingRight = "0px"), t.classList.remove("_lock");
      }, e),
        (o = !1),
        setTimeout(function () {
          o = !0;
        }, e);
    }
  }
  function p(e) {
    let t = document.querySelector("body");
    if (o) {
      let s = document.querySelectorAll("._lp");
      for (let e = 0; e < s.length; e++) {
        s[e].style.paddingRight =
          window.innerWidth -
          document.querySelector(".wrapper").offsetWidth +
          "px";
      }
      (t.style.paddingRight =
        window.innerWidth -
        document.querySelector(".wrapper").offsetWidth +
        "px"),
        t.classList.add("_lock"),
        (o = !1),
        setTimeout(function () {
          o = !0;
        }, e);
    }
  }
  let f = document.querySelectorAll("._letter-animation");
  if (f)
    for (let e = 0; e < f.length; e++) {
      let t = f[e],
        s = t.innerHTML.replace("  ", " ").split(" "),
        i = "";
      for (let e = 0; e < s.length; e++) {
        let a = s[e],
          n = a.length;
        i += "<p>";
        for (let e = 0; e < n; e++) {
          let t = a.substr(e, 1);
          " " == t && (t = "&nbsp;"), (i = i + "<span>" + t + "</span>");
        }
        (t.innerHTML = i), (i += "&nbsp;</p>");
      }
    }
  let h = document.querySelectorAll("._tabs");
  for (let e = 0; e < h.length; e++) {
    let t = h[e],
      s = t.querySelectorAll("._tabs-item"),
      i = t.querySelectorAll("._tabs-block");
    for (let e = 0; e < s.length; e++) {
      let t = s[e];
      t.addEventListener("click", function (a) {
        for (let e = 0; e < s.length; e++) {
          s[e].classList.remove("_active"), i[e].classList.remove("_active");
        }
        t.classList.add("_active"),
          i[e].classList.add("_active"),
          a.preventDefault();
      });
    }
  }
  const m = document.querySelectorAll("[data-spollers]");
  if (m.length > 0) {
    const e = Array.from(m).filter(function (e, t, s) {
      return !e.dataset.spollers.split(",")[0];
    });
    e.length > 0 && s(e);
    const t = Array.from(m).filter(function (e, t, s) {
      return e.dataset.spollers.split(",")[0];
    });
    if (t.length > 0) {
      const e = [];
      t.forEach((t) => {
        const s = {},
          i = t.dataset.spollers.split(",");
        (s.value = i[0]),
          (s.type = i[1] ? i[1].trim() : "max"),
          (s.item = t),
          e.push(s);
      });
      let i = e.map(function (e) {
        return (
          "(" + e.type + "-width: " + e.value + "px)," + e.value + "," + e.type
        );
      });
      (i = i.filter(function (e, t, s) {
        return s.indexOf(e) === t;
      })),
        i.forEach((t) => {
          const i = t.split(","),
            a = i[1],
            n = i[2],
            r = window.matchMedia(i[0]),
            l = e.filter(function (e) {
              if (e.value === a && e.type === n) return !0;
            });
          r.addListener(function () {
            s(l, r);
          }),
            s(l, r);
        });
    }
    function s(e, t = !1) {
      e.forEach((e) => {
        (e = t ? e.item : e),
          t.matches || !t
            ? (e.classList.add("_init"), i(e), e.addEventListener("click", a))
            : (e.classList.remove("_init"),
              i(e, !1),
              e.removeEventListener("click", a));
      });
    }
    function i(e, t = !0) {
      const s = e.querySelectorAll("[data-spoller]");
      s.length > 0 &&
        s.forEach((e) => {
          t
            ? (e.removeAttribute("tabindex"),
              e.classList.contains("_active") ||
                (e.nextElementSibling.hidden = !0))
            : (e.setAttribute("tabindex", "-1"),
              (e.nextElementSibling.hidden = !1));
        });
    }
    function a(e) {
      const t = e.target;
      if (t.hasAttribute("data-spoller") || t.closest("[data-spoller]")) {
        const s = t.hasAttribute("data-spoller")
            ? t
            : t.closest("[data-spoller]"),
          i = s.closest("[data-spollers]"),
          a = !!i.hasAttribute("data-one-spoller");
        i.querySelectorAll("._slide").length ||
          (a && !s.classList.contains("_active") && n(i),
          s.classList.toggle("_active"),
          S(s.nextElementSibling, 500)),
          e.preventDefault();
      }
    }
    function n(e) {
      const t = e.querySelector("[data-spoller]._active");
      t && (t.classList.remove("_active"), E(t.nextElementSibling, 500));
    }
  }
  let g = document.querySelectorAll("._gallery");
  g &&
    (function () {
      for (let e = 0; e < g.length; e++) {
        const t = g[e];
        lightGallery(t, { counter: !1, selector: "a", download: !1 });
      }
    })();
  let v = document.querySelectorAll("._popup-link"),
    w = document.querySelectorAll(".popup");
  for (let e = 0; e < v.length; e++) {
    const t = v[e];
    t.addEventListener("click", function (e) {
      if (o) {
        y(
          t.getAttribute("href").replace("#", ""),
          t.getAttribute("data-video")
        );
      }
      e.preventDefault();
    });
  }
  for (let e = 0; e < w.length; e++) {
    w[e].addEventListener("click", function (e) {
      e.target.closest(".popup__body") || b(e.target.closest(".popup"));
    });
  }
  function y(e, t = "") {
    document.querySelectorAll(".popup._active").length > 0 && b("", !1);
    let s = document.querySelector(".popup_" + e);
    if (s && o) {
      if ("" != t && null != t) {
        document
          .querySelector(".popup_video")
          .querySelector(".popup__video").innerHTML =
          '<iframe src="https://www.youtube.com/embed/' +
          t +
          '?autoplay=1"  allow="autoplay; encrypted-media" allowfullscreen></iframe>';
      }
      document.querySelector(".menu__body._active") || p(500),
        s.classList.add("_active"),
        history.pushState("", "", "#" + e);
    }
  }
  function b(e, t = !0) {
    if (o) {
      if (e) {
        let t = e.querySelector(".popup__video");
        t && (t.innerHTML = ""), e.classList.remove("_active");
      } else
        for (let e = 0; e < w.length; e++) {
          const t = w[e];
          let s = t.querySelector(".popup__video");
          s && (s.innerHTML = ""), t.classList.remove("_active");
        }
      !document.querySelector(".menu__body._active") && t && u(500),
        history.pushState("", "", window.location.href.split("#")[0]);
    }
  }
  let x = document.querySelectorAll(".popup__close,._popup-close");
  if (x)
    for (let e = 0; e < x.length; e++) {
      const t = x[e];
      t.addEventListener("click", function () {
        b(t.closest(".popup"));
      });
    }
  document.addEventListener("keydown", function (e) {
    "Escape" === e.code && b();
  });
  let E = (e, t = 500) => {
      e.classList.contains("_slide") ||
        (e.classList.add("_slide"),
        (e.style.transitionProperty = "height, margin, padding"),
        (e.style.transitionDuration = t + "ms"),
        (e.style.height = e.offsetHeight + "px"),
        e.offsetHeight,
        (e.style.overflow = "hidden"),
        (e.style.height = 0),
        (e.style.paddingTop = 0),
        (e.style.paddingBottom = 0),
        (e.style.marginTop = 0),
        (e.style.marginBottom = 0),
        window.setTimeout(() => {
          (e.hidden = !0),
            e.style.removeProperty("height"),
            e.style.removeProperty("padding-top"),
            e.style.removeProperty("padding-bottom"),
            e.style.removeProperty("margin-top"),
            e.style.removeProperty("margin-bottom"),
            e.style.removeProperty("overflow"),
            e.style.removeProperty("transition-duration"),
            e.style.removeProperty("transition-property"),
            e.classList.remove("_slide");
        }, t));
    },
    S = (e, t = 500) =>
      e.hidden
        ? ((e, t = 500) => {
            if (!e.classList.contains("_slide")) {
              e.classList.add("_slide"), e.hidden && (e.hidden = !1);
              let s = e.offsetHeight;
              (e.style.overflow = "hidden"),
                (e.style.height = 0),
                (e.style.paddingTop = 0),
                (e.style.paddingBottom = 0),
                (e.style.marginTop = 0),
                (e.style.marginBottom = 0),
                e.offsetHeight,
                (e.style.transitionProperty = "height, margin, padding"),
                (e.style.transitionDuration = t + "ms"),
                (e.style.height = s + "px"),
                e.style.removeProperty("padding-top"),
                e.style.removeProperty("padding-bottom"),
                e.style.removeProperty("margin-top"),
                e.style.removeProperty("margin-bottom"),
                window.setTimeout(() => {
                  e.style.removeProperty("height"),
                    e.style.removeProperty("overflow"),
                    e.style.removeProperty("transition-duration"),
                    e.style.removeProperty("transition-property"),
                    e.classList.remove("_slide");
                }, t);
            }
          })(e, t)
        : E(e, t);
  let C = document.querySelectorAll("._more-block");
  if (C.length > 0) {
    let e = document.querySelector(".wrapper");
    for (let t = 0; t < C.length; t++) {
      const s = C[t];
      let i = s.querySelectorAll("._more-item");
      if (i.length > 0) {
        let t,
          a = s.querySelector("._more-link"),
          n = s.querySelector("._more-content"),
          r = n.getAttribute("data-view");
        function l(s) {
          let a,
            l = 0,
            o = 0;
          for (let e = 0; e < i.length; e++)
            e < r && (l += i[e].offsetHeight), (o += i[e].offsetHeight);
          (a = "start" === s ? o : l),
            (t = window.innerWidth - e.offsetWidth),
            (n.style.height = `${a}px`);
        }
        function o() {
          let s = window.innerWidth - e.offsetWidth;
          ((0 === t && s > 0) || (t > 0 && 0 === s)) &&
            (a.classList.contains("_active") ? l("start") : l());
        }
        "0s" === getComputedStyle(n).getPropertyValue("transition-duration") &&
          (n.style.cssText = "transition-duration: 1ms"),
          a.addEventListener("click", function (e) {
            a.classList.contains("_active") ? l() : l("start"),
              a.classList.toggle("_active"),
              e.preventDefault();
          }),
          n.addEventListener("transitionend", o, !1),
          window.addEventListener("resize", function (e) {
            a.classList.contains("_active") ? l("start") : l();
          }),
          l();
      }
    }
  }
  const T = document.querySelectorAll(".rating");
  T.length > 0 &&
    (function () {
      let e, t;
      for (let e = 0; e < T.length; e++) {
        s(T[e]);
      }
      function s(e) {
        i(e), a(), e.classList.contains("rating_set") && n(e);
      }
      function i(s) {
        (e = s.querySelector(".rating__active")),
          (t = s.querySelector(".rating__value"));
      }
      function a(s = t.innerHTML) {
        const i = s / 0.05;
        e.style.width = `${i}%`;
      }
      function n(e) {
        const s = e.querySelectorAll(".rating__item");
        for (let n = 0; n < s.length; n++) {
          const l = s[n];
          l.addEventListener("mouseenter", function (t) {
            i(e), a(l.value);
          }),
            l.addEventListener("mouseleave", function (e) {
              a();
            }),
            l.addEventListener("click", function (s) {
              i(e),
                e.dataset.ajax ? r(l.value, e) : ((t.innerHTML = n + 1), a());
            });
        }
      }
      async function r(e, s) {
        if (!s.classList.contains("rating_sending")) {
          s.classList.add("rating_sending");
          let e = await fetch("rating.json", { method: "GET" });
          if (e.ok) {
            const i = (await e.json()).newRating;
            (t.innerHTML = i), a(), s.classList.remove("rating_sending");
          } else alert("????????????"), s.classList.remove("rating_sending");
        }
      }
    })(),
    Element.prototype.closest ||
      (Element.prototype.closest = function (e) {
        for (var t = this; t; ) {
          if (t.matches(e)) return t;
          t = t.parentElement;
        }
        return null;
      }),
    Element.prototype.matches ||
      (Element.prototype.matches =
        Element.prototype.matchesSelector ||
        Element.prototype.webkitMatchesSelector ||
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector);
  document.querySelector("body");
  let $,
    M = document.querySelectorAll("._scr-sector"),
    _ = document.querySelectorAll("._scr-item"),
    L = document.querySelectorAll("._side-wrapper"),
    k = !0,
    A = 0;
  function P() {
    let e = ($ = pageYOffset),
      t = document.querySelector("header.header");
    if (
      (null !== t &&
        (e > 10 ? t.classList.add("_scroll") : t.classList.remove("_scroll")),
      M.length > 0)
    )
      for (let e = 0; e < M.length; e++) {
        let t = M[e],
          s = N(t).top,
          i = t.offsetHeight;
        pageYOffset > s - window.innerHeight / 1.5 &&
        pageYOffset < s + i - window.innerHeight / 5
          ? t.classList.add("_scr-sector_active")
          : t.classList.contains("_scr-sector_active") &&
            t.classList.remove("_scr-sector_active"),
          pageYOffset > s - window.innerHeight / 2 &&
          pageYOffset < s + i - window.innerHeight / 5
            ? t.classList.contains("_scr-sector_current") ||
              t.classList.add("_scr-sector_current")
            : t.classList.contains("_scr-sector_current") &&
              t.classList.remove("_scr-sector_current");
      }
    if (_.length > 0)
      for (let t = 0; t < _.length; t++) {
        let s = _[t],
          i = N(s).top,
          a = s.offsetHeight,
          n = window.innerHeight - (window.innerHeight - a / 3);
        window.innerHeight > a && (n = window.innerHeight - a / 3),
          e > i - n && e < i + a
            ? (s.classList.add("_active"), O(s))
            : s.classList.remove("_active"),
          e > i - window.innerHeight && s.querySelectorAll("._lazy").length;
      }
    L.length > 0 &&
      (function (e, t) {
        let s = parseInt(window.innerWidth),
          i = parseInt(window.innerHeight),
          a = parseInt(document.querySelector("header").offsetHeight) + 15;
        for (let r = 0; r < e.length; r++) {
          const l = e[r];
          let o = l.getAttribute("data-width");
          const d = l.querySelector("._side-block");
          o || (o = 0),
            s > o &&
              (d.offsetHeight < i - (a + 30)
                ? (t > N(l).top - (a + 15)
                    ? (d.style.cssText =
                        "position:fixed;bottom:auto;top:" +
                        a +
                        "px;width:" +
                        l.offsetWidth +
                        "px;left:" +
                        N(l).left +
                        "px;")
                    : n(d),
                  t > l.offsetHeight + N(l).top - (d.offsetHeight + (a + 15)) &&
                    ((l.style.cssText = "position:relative;"),
                    (d.style.cssText =
                      "position:absolute;bottom:0;top:auto;left:0px;width:100%")))
                : n(d));
        }
        function n(e) {
          e.style.cssText = "position:relative;bottom:auto;top:0px;left:0px;";
        }
      })(L, e);
    let s = document.querySelector("._custom-scroll__line");
    if (s) {
      let e = window.innerHeight,
        t = document.querySelector(".wrapper").offsetHeight,
        i = (pageYOffset / (t - e)) * 100,
        a = s.offsetHeight;
      s.style.transform = "translateY(" + ((e - a) / 100) * i + "px)";
    }
    A = e <= 0 ? 0 : e;
  }
  function O(e) {
    if (
      e.classList.contains("_load-map") &&
      !e.classList.contains("_loaded-map")
    ) {
      document.getElementById("map") && (e.classList.add("_loaded-map"), map());
    }
  }
  if (
    (window.addEventListener("scroll", P),
    setTimeout(function () {
      P();
    }, 100),
    M.length > 0 && !i.any())
  ) {
    G(), window.addEventListener("wheel", I);
    let e = document.querySelectorAll("._swiper_scroll");
    if (e.length > 0)
      for (let t = 0; t < e.length; t++) {
        const s = e[t];
        s.addEventListener("mouseenter", function (e) {
          window.removeEventListener("wheel", I);
        }),
          s.addEventListener("mouseleave", function (e) {
            window.addEventListener("wheel", I);
          });
      }
  }
  function z(e) {
    let t = window.innerHeight,
      s = e.offsetHeight,
      i = N(e).top;
    return s >= t && (i += s - t), i;
  }
  function I(e) {
    let t = window.innerHeight;
    if (t >= 750)
      if (k) {
        let s = document.querySelector("._scr-sector._scr-sector_current"),
          i = N(s).top,
          a = s.offsetHeight,
          n = s.nextElementSibling,
          r = s.previousElementSibling;
        if (40 == e.keyCode || 34 == e.keyCode || e.deltaX > 0 || e.deltaY < 0)
          a <= t ? r && q(z(r)) : (Y(), $ <= i && r && q(z(r)));
        else if (
          38 == e.keyCode ||
          33 == e.keyCode ||
          e.deltaX < 0 ||
          e.deltaY > 0
        )
          if (a <= t) {
            if (n) {
              q(N(n).top);
            }
          } else if ((Y(), n)) {
            let e = N(n).top;
            $ >= e - t && q(e);
          }
      } else G();
    else Y();
  }
  function q(e) {
    G(), (k = !1), B(e, 800);
    let t = 500;
    -1 != navigator.appVersion.indexOf("Mac") && (t = 1e3),
      setTimeout(function () {
        k = !0;
      }, t);
  }
  let D = document.querySelectorAll("._goto-block");
  if (D) {
    let e = [];
    for (let t = 0; t < D.length; t++) {
      let s = D[t],
        i = s.getAttribute("href").replace("#", "");
      "" == i || ~e.indexOf(i) || e.push(i),
        s.addEventListener("click", function (e) {
          document.querySelector(".menu__body._active") && (c(), u(500));
          let t = s.getAttribute("href").replace("#", "");
          B(document.querySelector("." + t), 300), e.preventDefault();
        });
    }
    window.addEventListener("scroll", function (t) {
      let s = document.querySelectorAll("._goto-block._active");
      if (s)
        for (let e = 0; e < s.length; e++) {
          s[e].classList.remove("_active");
        }
      for (let t = 0; t < e.length; t++) {
        let s = e[t],
          i = document.querySelector("." + s);
        if (i) {
          let e = N(i).top,
            t = i.offsetHeight;
          if (
            pageYOffset > e - window.innerHeight / 3 &&
            pageYOffset < e + t - window.innerHeight / 3
          ) {
            let e = document.querySelectorAll(
              '._goto-block[href="#' + s + '"]'
            );
            for (let t = 0; t < e.length; t++) {
              e[t].classList.add("_active");
            }
          }
        }
      }
    });
  }
  let H = document.querySelectorAll("._goto");
  if (H)
    for (let e = 0; e < H.length; e++) {
      let t = H[e];
      t.addEventListener("click", function (e) {
        let s = t.getAttribute("href").replace("#", "");
        B(document.querySelector("." + s), 500), e.preventDefault();
      });
    }
  function B(e, t, s = 0) {
    let i = {
      speedAsDuration: !0,
      speed: t,
      header: "",
      offset: s,
      easing: "easeOutQuad",
    };
    new SmoothScroll().animateScroll(e, "", i);
  }
  function N(e) {
    var t = e.getBoundingClientRect(),
      s = window.pageXOffset || document.documentElement.scrollLeft,
      i = window.pageYOffset || document.documentElement.scrollTop;
    return { top: t.top + i, left: t.left + s };
  }
  function G() {
    window.addEventListener && window.addEventListener("DOMMouseScroll", j, !1),
      document.addEventListener("wheel", j, { passive: !1 }),
      (window.onwheel = j),
      (window.onmousewheel = document.onmousewheel = j),
      (window.ontouchmove = j),
      (document.onkeydown = R);
  }
  function Y() {
    window.removeEventListener &&
      window.removeEventListener("DOMMouseScroll", j, !1),
      document.removeEventListener("wheel", j, { passive: !1 }),
      (window.onmousewheel = document.onmousewheel = null),
      (window.onwheel = null),
      (window.ontouchmove = null),
      (document.onkeydown = null);
  }
  function j(e) {
    (e = e || window.event).preventDefault && e.preventDefault(),
      (e.returnValue = !1);
  }
  function R(e) {}
  i.any();
  pageYOffset;
  window.onload = function () {
    if (
      (document
        .querySelectorAll("._hidden")
        .forEach((e) => e.classList.remove("_hidden")),
      document.querySelector(".block__slider"))
    ) {
      new Swiper(".block__slider", {
        observer: !0,
        observeParents: !0,
        slidesPerView: 1,
        spaceBetween: 20,
        autoHeight: !0,
        speed: 800,
        loop: !0,
        lazy: !0,
        autoHeight: !1,
        pagination: { el: ".swiper-pagination", type: "fraction" },
        navigation: {
          nextEl: ".block__slider .swiper-button-next",
          prevEl: ".block__slider .swiper-button-prev",
        },
        on: {
          lazyImageReady: function () {
            l();
          },
        },
      });
    }
  };
})();
