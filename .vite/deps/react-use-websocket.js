import {
  require_react
} from "./chunk-QY3QVPNU.js";
import {
  __commonJS
} from "./chunk-LQ2VYIYD.js";

// node_modules/react-use-websocket/dist/lib/constants.js
var require_constants = __commonJS({
  "node_modules/react-use-websocket/dist/lib/constants.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isEventSourceSupported = exports.isReactNative = exports.ReadyState = exports.UNPARSABLE_JSON_OBJECT = exports.DEFAULT_RECONNECT_INTERVAL_MS = exports.DEFAULT_RECONNECT_LIMIT = exports.SOCKET_IO_PING_CODE = exports.SOCKET_IO_PATH = exports.SOCKET_IO_PING_INTERVAL = exports.DEFAULT_EVENT_SOURCE_OPTIONS = exports.EMPTY_EVENT_HANDLERS = exports.DEFAULT_OPTIONS = void 0;
    var MILLISECONDS = 1;
    var SECONDS = 1e3 * MILLISECONDS;
    exports.DEFAULT_OPTIONS = {};
    exports.EMPTY_EVENT_HANDLERS = {};
    exports.DEFAULT_EVENT_SOURCE_OPTIONS = {
      withCredentials: false,
      events: exports.EMPTY_EVENT_HANDLERS
    };
    exports.SOCKET_IO_PING_INTERVAL = 25 * SECONDS;
    exports.SOCKET_IO_PATH = "/socket.io/?EIO=3&transport=websocket";
    exports.SOCKET_IO_PING_CODE = "2";
    exports.DEFAULT_RECONNECT_LIMIT = 20;
    exports.DEFAULT_RECONNECT_INTERVAL_MS = 5e3;
    exports.UNPARSABLE_JSON_OBJECT = {};
    var ReadyState;
    (function(ReadyState2) {
      ReadyState2[ReadyState2["UNINSTANTIATED"] = -1] = "UNINSTANTIATED";
      ReadyState2[ReadyState2["CONNECTING"] = 0] = "CONNECTING";
      ReadyState2[ReadyState2["OPEN"] = 1] = "OPEN";
      ReadyState2[ReadyState2["CLOSING"] = 2] = "CLOSING";
      ReadyState2[ReadyState2["CLOSED"] = 3] = "CLOSED";
    })(ReadyState = exports.ReadyState || (exports.ReadyState = {}));
    var eventSourceSupported = function() {
      try {
        return "EventSource" in globalThis;
      } catch (e) {
        return false;
      }
    };
    exports.isReactNative = typeof navigator !== "undefined" && navigator.product === "ReactNative";
    exports.isEventSourceSupported = !exports.isReactNative && eventSourceSupported();
  }
});

// node_modules/react-use-websocket/dist/lib/globals.js
var require_globals = __commonJS({
  "node_modules/react-use-websocket/dist/lib/globals.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.resetWebSockets = exports.sharedWebSockets = void 0;
    exports.sharedWebSockets = {};
    exports.resetWebSockets = function(url) {
      if (url && exports.sharedWebSockets.hasOwnProperty(url)) {
        delete exports.sharedWebSockets[url];
      } else {
        for (var url_1 in exports.sharedWebSockets) {
          if (exports.sharedWebSockets.hasOwnProperty(url_1)) {
            delete exports.sharedWebSockets[url_1];
          }
        }
      }
    };
  }
});

// node_modules/react-use-websocket/dist/lib/socket-io.js
var require_socket_io = __commonJS({
  "node_modules/react-use-websocket/dist/lib/socket-io.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.setUpSocketIOPing = exports.appendQueryParams = exports.parseSocketIOUrl = void 0;
    var constants_1 = require_constants();
    exports.parseSocketIOUrl = function(url) {
      if (url) {
        var isSecure = /^https|wss/.test(url);
        var strippedProtocol = url.replace(/^(https?|wss?)(:\/\/)?/, "");
        var removedFinalBackSlack = strippedProtocol.replace(/\/$/, "");
        var protocol = isSecure ? "wss" : "ws";
        return protocol + "://" + removedFinalBackSlack + constants_1.SOCKET_IO_PATH;
      } else if (url === "") {
        var isSecure = /^https/.test(window.location.protocol);
        var protocol = isSecure ? "wss" : "ws";
        var port = window.location.port ? ":" + window.location.port : "";
        return protocol + "://" + window.location.hostname + port + constants_1.SOCKET_IO_PATH;
      }
      return url;
    };
    exports.appendQueryParams = function(url, params) {
      if (params === void 0) {
        params = {};
      }
      var hasParamsRegex = /\?([\w]+=[\w]+)/;
      var alreadyHasParams = hasParamsRegex.test(url);
      var stringified = "" + Object.entries(params).reduce(function(next, _a) {
        var key = _a[0], value = _a[1];
        return next + (key + "=" + value + "&");
      }, "").slice(0, -1);
      return "" + url + (alreadyHasParams ? "&" : "?") + stringified;
    };
    exports.setUpSocketIOPing = function(sendMessage, interval) {
      if (interval === void 0) {
        interval = constants_1.SOCKET_IO_PING_INTERVAL;
      }
      var ping = function() {
        return sendMessage(constants_1.SOCKET_IO_PING_CODE);
      };
      return setInterval(ping, interval);
    };
  }
});

// node_modules/react-use-websocket/dist/lib/manage-subscribers.js
var require_manage_subscribers = __commonJS({
  "node_modules/react-use-websocket/dist/lib/manage-subscribers.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.resetSubscribers = exports.removeSubscriber = exports.addSubscriber = exports.hasSubscribers = exports.getSubscribers = void 0;
    var subscribers = {};
    var EMPTY_LIST = [];
    exports.getSubscribers = function(url) {
      if (exports.hasSubscribers(url)) {
        return Array.from(subscribers[url]);
      }
      return EMPTY_LIST;
    };
    exports.hasSubscribers = function(url) {
      var _a;
      return ((_a = subscribers[url]) === null || _a === void 0 ? void 0 : _a.size) > 0;
    };
    exports.addSubscriber = function(url, subscriber) {
      subscribers[url] = subscribers[url] || /* @__PURE__ */ new Set();
      subscribers[url].add(subscriber);
    };
    exports.removeSubscriber = function(url, subscriber) {
      subscribers[url].delete(subscriber);
    };
    exports.resetSubscribers = function(url) {
      if (url && subscribers.hasOwnProperty(url)) {
        delete subscribers[url];
      } else {
        for (var url_1 in subscribers) {
          if (subscribers.hasOwnProperty(url_1)) {
            delete subscribers[url_1];
          }
        }
      }
    };
  }
});

// node_modules/react-use-websocket/dist/lib/util.js
var require_util = __commonJS({
  "node_modules/react-use-websocket/dist/lib/util.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.resetGlobalState = exports.assertIsWebSocket = void 0;
    var globals_1 = require_globals();
    var manage_subscribers_1 = require_manage_subscribers();
    function assertIsWebSocket(webSocketInstance) {
      if (webSocketInstance instanceof WebSocket === false)
        throw new Error("");
    }
    exports.assertIsWebSocket = assertIsWebSocket;
    function resetGlobalState(url) {
      manage_subscribers_1.resetSubscribers(url);
      globals_1.resetWebSockets(url);
    }
    exports.resetGlobalState = resetGlobalState;
  }
});

// node_modules/react-use-websocket/dist/lib/attach-listener.js
var require_attach_listener = __commonJS({
  "node_modules/react-use-websocket/dist/lib/attach-listener.js"(exports) {
    "use strict";
    var __assign = exports && exports.__assign || function() {
      __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.attachListeners = void 0;
    var socket_io_1 = require_socket_io();
    var constants_1 = require_constants();
    var util_1 = require_util();
    var bindMessageHandler = function(webSocketInstance, optionsRef, setLastMessage) {
      webSocketInstance.onmessage = function(message) {
        optionsRef.current.onMessage && optionsRef.current.onMessage(message);
        if (typeof optionsRef.current.filter === "function" && optionsRef.current.filter(message) !== true) {
          return;
        }
        setLastMessage(message);
      };
    };
    var bindOpenHandler = function(webSocketInstance, optionsRef, setReadyState, reconnectCount) {
      webSocketInstance.onopen = function(event) {
        optionsRef.current.onOpen && optionsRef.current.onOpen(event);
        reconnectCount.current = 0;
        setReadyState(constants_1.ReadyState.OPEN);
      };
    };
    var bindCloseHandler = function(webSocketInstance, optionsRef, setReadyState, reconnect, reconnectCount) {
      if (constants_1.isEventSourceSupported && webSocketInstance instanceof EventSource) {
        return function() {
        };
      }
      util_1.assertIsWebSocket(webSocketInstance);
      var reconnectTimeout;
      webSocketInstance.onclose = function(event) {
        var _a, _b;
        optionsRef.current.onClose && optionsRef.current.onClose(event);
        setReadyState(constants_1.ReadyState.CLOSED);
        if (optionsRef.current.shouldReconnect && optionsRef.current.shouldReconnect(event)) {
          var reconnectAttempts = (_a = optionsRef.current.reconnectAttempts) !== null && _a !== void 0 ? _a : constants_1.DEFAULT_RECONNECT_LIMIT;
          if (reconnectCount.current < reconnectAttempts) {
            reconnectTimeout = window.setTimeout(function() {
              reconnectCount.current++;
              reconnect();
            }, (_b = optionsRef.current.reconnectInterval) !== null && _b !== void 0 ? _b : constants_1.DEFAULT_RECONNECT_INTERVAL_MS);
          } else {
            optionsRef.current.onReconnectStop && optionsRef.current.onReconnectStop(reconnectAttempts);
            console.warn("Max reconnect attempts of " + reconnectAttempts + " exceeded");
          }
        }
      };
      return function() {
        return reconnectTimeout && window.clearTimeout(reconnectTimeout);
      };
    };
    var bindErrorHandler = function(webSocketInstance, optionsRef, setReadyState, reconnect, reconnectCount) {
      var reconnectTimeout;
      webSocketInstance.onerror = function(error) {
        var _a, _b;
        optionsRef.current.onError && optionsRef.current.onError(error);
        if (constants_1.isEventSourceSupported && webSocketInstance instanceof EventSource) {
          optionsRef.current.onClose && optionsRef.current.onClose(__assign(__assign({}, error), { code: 1006, reason: "An error occurred with the EventSource: " + error, wasClean: false }));
          setReadyState(constants_1.ReadyState.CLOSED);
          webSocketInstance.close();
        }
        if (optionsRef.current.retryOnError) {
          if (reconnectCount.current < ((_a = optionsRef.current.reconnectAttempts) !== null && _a !== void 0 ? _a : constants_1.DEFAULT_RECONNECT_LIMIT)) {
            reconnectTimeout = window.setTimeout(function() {
              reconnectCount.current++;
              reconnect();
            }, (_b = optionsRef.current.reconnectInterval) !== null && _b !== void 0 ? _b : constants_1.DEFAULT_RECONNECT_INTERVAL_MS);
          } else {
            optionsRef.current.onReconnectStop && optionsRef.current.onReconnectStop(optionsRef.current.reconnectAttempts);
            console.warn("Max reconnect attempts of " + optionsRef.current.reconnectAttempts + " exceeded");
          }
        }
      };
      return function() {
        return reconnectTimeout && window.clearTimeout(reconnectTimeout);
      };
    };
    exports.attachListeners = function(webSocketInstance, setters, optionsRef, reconnect, reconnectCount, sendMessage) {
      var setLastMessage = setters.setLastMessage, setReadyState = setters.setReadyState;
      var interval;
      var cancelReconnectOnClose;
      var cancelReconnectOnError;
      if (optionsRef.current.fromSocketIO) {
        interval = socket_io_1.setUpSocketIOPing(sendMessage);
      }
      bindMessageHandler(webSocketInstance, optionsRef, setLastMessage);
      bindOpenHandler(webSocketInstance, optionsRef, setReadyState, reconnectCount);
      cancelReconnectOnClose = bindCloseHandler(webSocketInstance, optionsRef, setReadyState, reconnect, reconnectCount);
      cancelReconnectOnError = bindErrorHandler(webSocketInstance, optionsRef, setReadyState, reconnect, reconnectCount);
      return function() {
        setReadyState(constants_1.ReadyState.CLOSING);
        cancelReconnectOnClose();
        cancelReconnectOnError();
        webSocketInstance.close();
        if (interval)
          clearInterval(interval);
      };
    };
  }
});

// node_modules/react-use-websocket/dist/lib/attach-shared-listeners.js
var require_attach_shared_listeners = __commonJS({
  "node_modules/react-use-websocket/dist/lib/attach-shared-listeners.js"(exports) {
    "use strict";
    var __assign = exports && exports.__assign || function() {
      __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.attachSharedListeners = void 0;
    var globals_1 = require_globals();
    var constants_1 = require_constants();
    var manage_subscribers_1 = require_manage_subscribers();
    var socket_io_1 = require_socket_io();
    var bindMessageHandler = function(webSocketInstance, url) {
      webSocketInstance.onmessage = function(message) {
        manage_subscribers_1.getSubscribers(url).forEach(function(subscriber) {
          if (subscriber.optionsRef.current.onMessage) {
            subscriber.optionsRef.current.onMessage(message);
          }
          if (typeof subscriber.optionsRef.current.filter === "function" && subscriber.optionsRef.current.filter(message) !== true) {
            return;
          }
          subscriber.setLastMessage(message);
        });
      };
    };
    var bindOpenHandler = function(webSocketInstance, url) {
      webSocketInstance.onopen = function(event) {
        manage_subscribers_1.getSubscribers(url).forEach(function(subscriber) {
          subscriber.reconnectCount.current = 0;
          if (subscriber.optionsRef.current.onOpen) {
            subscriber.optionsRef.current.onOpen(event);
          }
          subscriber.setReadyState(constants_1.ReadyState.OPEN);
        });
      };
    };
    var bindCloseHandler = function(webSocketInstance, url) {
      if (webSocketInstance instanceof WebSocket) {
        webSocketInstance.onclose = function(event) {
          manage_subscribers_1.getSubscribers(url).forEach(function(subscriber) {
            if (subscriber.optionsRef.current.onClose) {
              subscriber.optionsRef.current.onClose(event);
            }
            subscriber.setReadyState(constants_1.ReadyState.CLOSED);
          });
          delete globals_1.sharedWebSockets[url];
          manage_subscribers_1.getSubscribers(url).forEach(function(subscriber) {
            var _a, _b;
            if (subscriber.optionsRef.current.shouldReconnect && subscriber.optionsRef.current.shouldReconnect(event)) {
              var reconnectAttempts = (_a = subscriber.optionsRef.current.reconnectAttempts) !== null && _a !== void 0 ? _a : constants_1.DEFAULT_RECONNECT_LIMIT;
              if (subscriber.reconnectCount.current < reconnectAttempts) {
                setTimeout(function() {
                  subscriber.reconnectCount.current++;
                  subscriber.reconnect.current();
                }, (_b = subscriber.optionsRef.current.reconnectInterval) !== null && _b !== void 0 ? _b : constants_1.DEFAULT_RECONNECT_INTERVAL_MS);
              } else {
                subscriber.optionsRef.current.onReconnectStop && subscriber.optionsRef.current.onReconnectStop(subscriber.optionsRef.current.reconnectAttempts);
                console.warn("Max reconnect attempts of " + reconnectAttempts + " exceeded");
              }
            }
          });
        };
      }
    };
    var bindErrorHandler = function(webSocketInstance, url) {
      webSocketInstance.onerror = function(error) {
        manage_subscribers_1.getSubscribers(url).forEach(function(subscriber) {
          if (subscriber.optionsRef.current.onError) {
            subscriber.optionsRef.current.onError(error);
          }
          if (constants_1.isEventSourceSupported && webSocketInstance instanceof EventSource) {
            subscriber.optionsRef.current.onClose && subscriber.optionsRef.current.onClose(__assign(__assign({}, error), { code: 1006, reason: "An error occurred with the EventSource: " + error, wasClean: false }));
            subscriber.setReadyState(constants_1.ReadyState.CLOSED);
          }
        });
        if (constants_1.isEventSourceSupported && webSocketInstance instanceof EventSource) {
          webSocketInstance.close();
        }
      };
    };
    exports.attachSharedListeners = function(webSocketInstance, url, optionsRef, sendMessage) {
      var interval;
      if (optionsRef.current.fromSocketIO) {
        interval = socket_io_1.setUpSocketIOPing(sendMessage);
      }
      bindMessageHandler(webSocketInstance, url);
      bindCloseHandler(webSocketInstance, url);
      bindOpenHandler(webSocketInstance, url);
      bindErrorHandler(webSocketInstance, url);
      return function() {
        if (interval)
          clearInterval(interval);
      };
    };
  }
});

// node_modules/react-use-websocket/dist/lib/create-or-join.js
var require_create_or_join = __commonJS({
  "node_modules/react-use-websocket/dist/lib/create-or-join.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createOrJoinSocket = void 0;
    var globals_1 = require_globals();
    var constants_1 = require_constants();
    var attach_listener_1 = require_attach_listener();
    var attach_shared_listeners_1 = require_attach_shared_listeners();
    var manage_subscribers_1 = require_manage_subscribers();
    var cleanSubscribers = function(url, subscriber, optionsRef, setReadyState, clearSocketIoPingInterval) {
      return function() {
        manage_subscribers_1.removeSubscriber(url, subscriber);
        if (!manage_subscribers_1.hasSubscribers(url)) {
          try {
            var socketLike = globals_1.sharedWebSockets[url];
            if (socketLike instanceof WebSocket) {
              socketLike.onclose = function(event) {
                if (optionsRef.current.onClose) {
                  optionsRef.current.onClose(event);
                }
                setReadyState(constants_1.ReadyState.CLOSED);
              };
            }
            socketLike.close();
          } catch (e) {
          }
          if (clearSocketIoPingInterval)
            clearSocketIoPingInterval();
          delete globals_1.sharedWebSockets[url];
        }
      };
    };
    exports.createOrJoinSocket = function(webSocketRef, url, setReadyState, optionsRef, setLastMessage, startRef, reconnectCount, sendMessage) {
      if (!constants_1.isEventSourceSupported && optionsRef.current.eventSourceOptions) {
        if (constants_1.isReactNative) {
          throw new Error("EventSource is not supported in ReactNative");
        } else {
          throw new Error("EventSource is not supported");
        }
      }
      if (optionsRef.current.share) {
        var clearSocketIoPingInterval = null;
        if (globals_1.sharedWebSockets[url] === void 0) {
          globals_1.sharedWebSockets[url] = optionsRef.current.eventSourceOptions ? new EventSource(url, optionsRef.current.eventSourceOptions) : new WebSocket(url, optionsRef.current.protocols);
          webSocketRef.current = globals_1.sharedWebSockets[url];
          setReadyState(constants_1.ReadyState.CONNECTING);
          clearSocketIoPingInterval = attach_shared_listeners_1.attachSharedListeners(globals_1.sharedWebSockets[url], url, optionsRef, sendMessage);
        } else {
          webSocketRef.current = globals_1.sharedWebSockets[url];
          setReadyState(globals_1.sharedWebSockets[url].readyState);
        }
        var subscriber = {
          setLastMessage,
          setReadyState,
          optionsRef,
          reconnectCount,
          reconnect: startRef
        };
        manage_subscribers_1.addSubscriber(url, subscriber);
        return cleanSubscribers(url, subscriber, optionsRef, setReadyState, clearSocketIoPingInterval);
      } else {
        webSocketRef.current = optionsRef.current.eventSourceOptions ? new EventSource(url, optionsRef.current.eventSourceOptions) : new WebSocket(url, optionsRef.current.protocols);
        setReadyState(constants_1.ReadyState.CONNECTING);
        if (!webSocketRef.current) {
          throw new Error("WebSocket failed to be created");
        }
        return attach_listener_1.attachListeners(webSocketRef.current, {
          setLastMessage,
          setReadyState
        }, optionsRef, startRef.current, reconnectCount, sendMessage);
      }
    };
  }
});

// node_modules/react-use-websocket/dist/lib/get-url.js
var require_get_url = __commonJS({
  "node_modules/react-use-websocket/dist/lib/get-url.js"(exports) {
    "use strict";
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = exports && exports.__generator || function(thisArg, body) {
      var _ = { label: 0, sent: function() {
        if (t[0] & 1)
          throw t[1];
        return t[1];
      }, trys: [], ops: [] }, f, y, t, g;
      return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([n, v]);
        };
      }
      function step(op) {
        if (f)
          throw new TypeError("Generator is already executing.");
        while (_)
          try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
              return t;
            if (y = 0, t)
              op = [op[0] & 2, t.value];
            switch (op[0]) {
              case 0:
              case 1:
                t = op;
                break;
              case 4:
                _.label++;
                return { value: op[1], done: false };
              case 5:
                _.label++;
                y = op[1];
                op = [0];
                continue;
              case 7:
                op = _.ops.pop();
                _.trys.pop();
                continue;
              default:
                if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                  _ = 0;
                  continue;
                }
                if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                  _.label = op[1];
                  break;
                }
                if (op[0] === 6 && _.label < t[1]) {
                  _.label = t[1];
                  t = op;
                  break;
                }
                if (t && _.label < t[2]) {
                  _.label = t[2];
                  _.ops.push(op);
                  break;
                }
                if (t[2])
                  _.ops.pop();
                _.trys.pop();
                continue;
            }
            op = body.call(thisArg, _);
          } catch (e) {
            op = [6, e];
            y = 0;
          } finally {
            f = t = 0;
          }
        if (op[0] & 5)
          throw op[1];
        return { value: op[0] ? op[1] : void 0, done: true };
      }
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getUrl = void 0;
    var socket_io_1 = require_socket_io();
    exports.getUrl = function(url, optionsRef) {
      return __awaiter(void 0, void 0, void 0, function() {
        var convertedUrl, parsedUrl, parsedWithQueryParams;
        return __generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              if (!(typeof url === "function"))
                return [3, 2];
              return [4, url()];
            case 1:
              convertedUrl = _a.sent();
              return [3, 3];
            case 2:
              convertedUrl = url;
              _a.label = 3;
            case 3:
              parsedUrl = optionsRef.current.fromSocketIO ? socket_io_1.parseSocketIOUrl(convertedUrl) : convertedUrl;
              parsedWithQueryParams = optionsRef.current.queryParams ? socket_io_1.appendQueryParams(parsedUrl, optionsRef.current.queryParams) : parsedUrl;
              return [2, parsedWithQueryParams];
          }
        });
      });
    };
  }
});

// node_modules/react-use-websocket/dist/lib/proxy.js
var require_proxy = __commonJS({
  "node_modules/react-use-websocket/dist/lib/proxy.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.websocketWrapper = void 0;
    exports.websocketWrapper = function(webSocket, start) {
      return new Proxy(webSocket, {
        get: function(obj, key) {
          var val = obj[key];
          if (key === "reconnect")
            return start;
          if (typeof val === "function") {
            console.error("Calling methods directly on the websocket is not supported at this moment. You must use the methods returned by useWebSocket.");
            return function() {
            };
          } else {
            return val;
          }
        },
        set: function(obj, key, val) {
          if (/^on/.test(key)) {
            console.warn("The websocket's event handlers should be defined through the options object passed into useWebSocket.");
            return false;
          } else {
            obj[key] = val;
            return true;
          }
        }
      });
    };
    exports.default = exports.websocketWrapper;
  }
});

// node_modules/react-use-websocket/dist/lib/use-websocket.js
var require_use_websocket = __commonJS({
  "node_modules/react-use-websocket/dist/lib/use-websocket.js"(exports) {
    "use strict";
    var __assign = exports && exports.__assign || function() {
      __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = exports && exports.__generator || function(thisArg, body) {
      var _ = { label: 0, sent: function() {
        if (t[0] & 1)
          throw t[1];
        return t[1];
      }, trys: [], ops: [] }, f, y, t, g;
      return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([n, v]);
        };
      }
      function step(op) {
        if (f)
          throw new TypeError("Generator is already executing.");
        while (_)
          try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
              return t;
            if (y = 0, t)
              op = [op[0] & 2, t.value];
            switch (op[0]) {
              case 0:
              case 1:
                t = op;
                break;
              case 4:
                _.label++;
                return { value: op[1], done: false };
              case 5:
                _.label++;
                y = op[1];
                op = [0];
                continue;
              case 7:
                op = _.ops.pop();
                _.trys.pop();
                continue;
              default:
                if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                  _ = 0;
                  continue;
                }
                if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                  _.label = op[1];
                  break;
                }
                if (op[0] === 6 && _.label < t[1]) {
                  _.label = t[1];
                  t = op;
                  break;
                }
                if (t && _.label < t[2]) {
                  _.label = t[2];
                  _.ops.push(op);
                  break;
                }
                if (t[2])
                  _.ops.pop();
                _.trys.pop();
                continue;
            }
            op = body.call(thisArg, _);
          } catch (e) {
            op = [6, e];
            y = 0;
          } finally {
            f = t = 0;
          }
        if (op[0] & 5)
          throw op[1];
        return { value: op[0] ? op[1] : void 0, done: true };
      }
    };
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useWebSocket = void 0;
    var react_1 = require_react();
    var constants_1 = require_constants();
    var create_or_join_1 = require_create_or_join();
    var get_url_1 = require_get_url();
    var proxy_1 = __importDefault(require_proxy());
    var util_1 = require_util();
    exports.useWebSocket = function(url, options, connect) {
      if (options === void 0) {
        options = constants_1.DEFAULT_OPTIONS;
      }
      if (connect === void 0) {
        connect = true;
      }
      var _a = react_1.useState(null), lastMessage = _a[0], setLastMessage = _a[1];
      var _b = react_1.useState({}), readyState = _b[0], setReadyState = _b[1];
      var lastJsonMessage = react_1.useMemo(function() {
        if (lastMessage) {
          try {
            return JSON.parse(lastMessage.data);
          } catch (e) {
            return constants_1.UNPARSABLE_JSON_OBJECT;
          }
        }
        return null;
      }, [lastMessage]);
      var convertedUrl = react_1.useRef(null);
      var webSocketRef = react_1.useRef(null);
      var startRef = react_1.useRef(function() {
        return void 0;
      });
      var reconnectCount = react_1.useRef(0);
      var messageQueue = react_1.useRef([]);
      var webSocketProxy = react_1.useRef(null);
      var optionsCache = react_1.useRef(options);
      optionsCache.current = options;
      var readyStateFromUrl = convertedUrl.current && readyState[convertedUrl.current] !== void 0 ? readyState[convertedUrl.current] : url !== null && connect === true ? constants_1.ReadyState.CONNECTING : constants_1.ReadyState.UNINSTANTIATED;
      var stringifiedQueryParams = options.queryParams ? JSON.stringify(options.queryParams) : null;
      var sendMessage = react_1.useCallback(function(message, keep) {
        var _a2;
        if (keep === void 0) {
          keep = true;
        }
        if (constants_1.isEventSourceSupported && webSocketRef.current instanceof EventSource) {
          console.warn("Unable to send a message from an eventSource");
          return;
        }
        if (((_a2 = webSocketRef.current) === null || _a2 === void 0 ? void 0 : _a2.readyState) === constants_1.ReadyState.OPEN) {
          util_1.assertIsWebSocket(webSocketRef.current);
          webSocketRef.current.send(message);
        } else if (keep) {
          messageQueue.current.push(message);
        }
      }, []);
      var sendJsonMessage = react_1.useCallback(function(message, keep) {
        if (keep === void 0) {
          keep = true;
        }
        sendMessage(JSON.stringify(message), keep);
      }, [sendMessage]);
      var getWebSocket = react_1.useCallback(function() {
        if (optionsCache.current.share !== true || constants_1.isEventSourceSupported && webSocketRef.current instanceof EventSource) {
          return webSocketRef.current;
        }
        if (webSocketProxy.current === null && webSocketRef.current) {
          util_1.assertIsWebSocket(webSocketRef.current);
          webSocketProxy.current = proxy_1.default(webSocketRef.current, startRef);
        }
        return webSocketProxy.current;
      }, []);
      react_1.useEffect(function() {
        if (url !== null && connect === true) {
          var removeListeners_1;
          var expectClose_1 = false;
          var start_1 = function() {
            return __awaiter(void 0, void 0, void 0, function() {
              var _a2, protectedSetLastMessage, protectedSetReadyState;
              return __generator(this, function(_b2) {
                switch (_b2.label) {
                  case 0:
                    _a2 = convertedUrl;
                    return [4, get_url_1.getUrl(url, optionsCache)];
                  case 1:
                    _a2.current = _b2.sent();
                    protectedSetLastMessage = function(message) {
                      if (!expectClose_1) {
                        setLastMessage(message);
                      }
                    };
                    protectedSetReadyState = function(state) {
                      if (!expectClose_1) {
                        setReadyState(function(prev) {
                          var _a3;
                          return __assign(__assign({}, prev), convertedUrl.current && (_a3 = {}, _a3[convertedUrl.current] = state, _a3));
                        });
                      }
                    };
                    removeListeners_1 = create_or_join_1.createOrJoinSocket(webSocketRef, convertedUrl.current, protectedSetReadyState, optionsCache, protectedSetLastMessage, startRef, reconnectCount, sendMessage);
                    return [
                      2
                      /*return*/
                    ];
                }
              });
            });
          };
          startRef.current = function() {
            if (!expectClose_1) {
              if (webSocketProxy.current)
                webSocketProxy.current = null;
              removeListeners_1 === null || removeListeners_1 === void 0 ? void 0 : removeListeners_1();
              start_1();
            }
          };
          start_1();
          return function() {
            expectClose_1 = true;
            if (webSocketProxy.current)
              webSocketProxy.current = null;
            removeListeners_1 === null || removeListeners_1 === void 0 ? void 0 : removeListeners_1();
            setLastMessage(null);
          };
        } else if (url === null || connect === false) {
          reconnectCount.current = 0;
          setReadyState(function(prev) {
            var _a2;
            return __assign(__assign({}, prev), convertedUrl.current && (_a2 = {}, _a2[convertedUrl.current] = constants_1.ReadyState.CLOSED, _a2));
          });
        }
      }, [url, connect, stringifiedQueryParams, sendMessage]);
      react_1.useEffect(function() {
        if (readyStateFromUrl === constants_1.ReadyState.OPEN) {
          messageQueue.current.splice(0).forEach(function(message) {
            sendMessage(message);
          });
        }
      }, [readyStateFromUrl]);
      return {
        sendMessage,
        sendJsonMessage,
        lastMessage,
        lastJsonMessage,
        readyState: readyStateFromUrl,
        getWebSocket
      };
    };
  }
});

// node_modules/react-use-websocket/dist/lib/use-socket-io.js
var require_use_socket_io = __commonJS({
  "node_modules/react-use-websocket/dist/lib/use-socket-io.js"(exports) {
    "use strict";
    var __assign = exports && exports.__assign || function() {
      __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useSocketIO = void 0;
    var react_1 = require_react();
    var use_websocket_1 = require_use_websocket();
    var constants_1 = require_constants();
    var emptyEvent = {
      type: "empty",
      payload: null
    };
    var getSocketData = function(event) {
      if (!event || !event.data) {
        return emptyEvent;
      }
      var match = event.data.match(/\[.*]/);
      if (!match) {
        return emptyEvent;
      }
      var data = JSON.parse(match);
      if (!Array.isArray(data) || !data[1]) {
        return emptyEvent;
      }
      return {
        type: data[0],
        payload: data[1]
      };
    };
    exports.useSocketIO = function(url, options, connect) {
      if (options === void 0) {
        options = constants_1.DEFAULT_OPTIONS;
      }
      if (connect === void 0) {
        connect = true;
      }
      var optionsWithSocketIO = react_1.useMemo(function() {
        return __assign(__assign({}, options), { fromSocketIO: true });
      }, []);
      var _a = use_websocket_1.useWebSocket(url, optionsWithSocketIO, connect), sendMessage = _a.sendMessage, sendJsonMessage = _a.sendJsonMessage, lastMessage = _a.lastMessage, readyState = _a.readyState, getWebSocket = _a.getWebSocket;
      var socketIOLastMessage = react_1.useMemo(function() {
        return getSocketData(lastMessage);
      }, [lastMessage]);
      return {
        sendMessage,
        sendJsonMessage,
        lastMessage: socketIOLastMessage,
        lastJsonMessage: socketIOLastMessage,
        readyState,
        getWebSocket
      };
    };
  }
});

// node_modules/react-use-websocket/dist/lib/use-event-source.js
var require_use_event_source = __commonJS({
  "node_modules/react-use-websocket/dist/lib/use-event-source.js"(exports) {
    "use strict";
    var __assign = exports && exports.__assign || function() {
      __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    var __rest = exports && exports.__rest || function(s, e) {
      var t = {};
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
          t[p] = s[p];
      if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
          if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
            t[p[i]] = s[p[i]];
        }
      return t;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useEventSource = void 0;
    var react_1 = require_react();
    var use_websocket_1 = require_use_websocket();
    var constants_1 = require_constants();
    exports.useEventSource = function(url, _a, connect) {
      if (_a === void 0) {
        _a = constants_1.DEFAULT_EVENT_SOURCE_OPTIONS;
      }
      if (connect === void 0) {
        connect = true;
      }
      var withCredentials = _a.withCredentials, events = _a.events, options = __rest(_a, ["withCredentials", "events"]);
      var optionsWithEventSource = __assign(__assign({}, options), { eventSourceOptions: {
        withCredentials
      } });
      var eventsRef = react_1.useRef(constants_1.EMPTY_EVENT_HANDLERS);
      if (events) {
        eventsRef.current = events;
      }
      var _b = use_websocket_1.useWebSocket(url, optionsWithEventSource, connect), lastMessage = _b.lastMessage, readyState = _b.readyState, getWebSocket = _b.getWebSocket;
      react_1.useEffect(function() {
        if (lastMessage === null || lastMessage === void 0 ? void 0 : lastMessage.type) {
          Object.entries(eventsRef.current).forEach(function(_a2) {
            var type = _a2[0], handler = _a2[1];
            if (type === lastMessage.type) {
              handler(lastMessage);
            }
          });
        }
      }, [lastMessage]);
      return {
        lastEvent: lastMessage,
        readyState,
        getEventSource: getWebSocket
      };
    };
  }
});

// node_modules/react-use-websocket/dist/index.js
var require_dist = __commonJS({
  "node_modules/react-use-websocket/dist/index.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var use_websocket_1 = require_use_websocket();
    Object.defineProperty(exports, "default", { enumerable: true, get: function() {
      return use_websocket_1.useWebSocket;
    } });
    var use_socket_io_1 = require_use_socket_io();
    Object.defineProperty(exports, "useSocketIO", { enumerable: true, get: function() {
      return use_socket_io_1.useSocketIO;
    } });
    var constants_1 = require_constants();
    Object.defineProperty(exports, "ReadyState", { enumerable: true, get: function() {
      return constants_1.ReadyState;
    } });
    var use_event_source_1 = require_use_event_source();
    Object.defineProperty(exports, "useEventSource", { enumerable: true, get: function() {
      return use_event_source_1.useEventSource;
    } });
    var util_1 = require_util();
    Object.defineProperty(exports, "resetGlobalState", { enumerable: true, get: function() {
      return util_1.resetGlobalState;
    } });
  }
});
export default require_dist();
//# sourceMappingURL=react-use-websocket.js.map
