var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// server/crypto.js
var crypto_exports = {};
__export(crypto_exports, {
  CryptoService: () => CryptoService
});
var __awaiter, __generator, bcryptjs_1, SALT_ROUNDS, CryptoService;
var init_crypto = __esm({
  "server/crypto.js"() {
    "use strict";
    __awaiter = function(thisArg, _arguments, P, generator) {
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
    __generator = function(thisArg, body) {
      var _ = { label: 0, sent: function() {
        if (t[0] & 1) throw t[1];
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
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          if (y = 0, t) op = [op[0] & 2, t.value];
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
              if (t[2]) _.ops.pop();
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
        if (op[0] & 5) throw op[1];
        return { value: op[0] ? op[1] : void 0, done: true };
      }
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CryptoService = void 0;
    bcryptjs_1 = __require("bcryptjs");
    SALT_ROUNDS = 12;
    CryptoService = /** @class */
    (function() {
      function CryptoService2() {
      }
      CryptoService2.hashPassword = function(password) {
        return __awaiter(this, void 0, Promise, function() {
          return __generator(this, function(_a) {
            return [2, bcryptjs_1.default.hash(password, SALT_ROUNDS)];
          });
        });
      };
      CryptoService2.verifyPassword = function(password, hash) {
        return __awaiter(this, void 0, Promise, function() {
          return __generator(this, function(_a) {
            return [2, bcryptjs_1.default.compare(password, hash)];
          });
        });
      };
      CryptoService2.encryptData = function(data) {
        return Buffer.from(data).toString("base64");
      };
      CryptoService2.decryptData = function(encryptedData) {
        return Buffer.from(encryptedData, "base64").toString("utf8");
      };
      CryptoService2.generateToken = function(length) {
        if (length === void 0) {
          length = 32;
        }
        var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var result = "";
        for (var i = 0; i < length; i++) {
          result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
      };
      CryptoService2.hashSensitiveData = function(data) {
        return bcryptjs_1.default.hashSync(data, 8);
      };
      return CryptoService2;
    })();
  }
});

// server/storage.js
var storage_exports = {};
__export(storage_exports, {
  MemStorage: () => MemStorage,
  storage: () => storage
});
var __assign, __awaiter2, __generator2, __spreadArray, crypto_1, crypto_2, MemStorage, storage;
var init_storage = __esm({
  "server/storage.js"() {
    "use strict";
    __assign = function() {
      __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    __awaiter2 = function(thisArg, _arguments, P, generator) {
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
    __generator2 = function(thisArg, body) {
      var _ = { label: 0, sent: function() {
        if (t[0] & 1) throw t[1];
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
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          if (y = 0, t) op = [op[0] & 2, t.value];
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
              if (t[2]) _.ops.pop();
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
        if (op[0] & 5) throw op[1];
        return { value: op[0] ? op[1] : void 0, done: true };
      }
    };
    __spreadArray = function(to, from, pack) {
      if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }
      }
      return to.concat(ar || Array.prototype.slice.call(from));
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.storage = exports.MemStorage = void 0;
    crypto_1 = __require("crypto");
    crypto_2 = (init_crypto(), __toCommonJS(crypto_exports));
    MemStorage = /** @class */
    (function() {
      function MemStorage2() {
        this.instagramUsers = /* @__PURE__ */ new Map();
        this.instagramPosts = /* @__PURE__ */ new Map();
        this.instagramComments = /* @__PURE__ */ new Map();
        this.instagramFollows = /* @__PURE__ */ new Map();
        this.instagramStories = /* @__PURE__ */ new Map();
        this.tinderUsers = /* @__PURE__ */ new Map();
        this.tinderMatches = /* @__PURE__ */ new Map();
        this.wallapopUsers = /* @__PURE__ */ new Map();
        this.wallapopProducts = /* @__PURE__ */ new Map();
        this.wallapopChats = /* @__PURE__ */ new Map();
        this.wallapopMessages = /* @__PURE__ */ new Map();
        this.whatsappUsers = /* @__PURE__ */ new Map();
        this.whatsappChats = /* @__PURE__ */ new Map();
        this.whatsappMessages = /* @__PURE__ */ new Map();
        this.darkwebUsers = /* @__PURE__ */ new Map();
        this.darkwebChannels = /* @__PURE__ */ new Map();
        this.darkwebMessages = /* @__PURE__ */ new Map();
        this.adminUsers = /* @__PURE__ */ new Map();
        this.registrationCodes = /* @__PURE__ */ new Map();
        this.initializeSampleData();
      }
      MemStorage2.prototype.initializeSampleData = function() {
        return __awaiter2(this, void 0, void 0, function() {
          var hashedAdminPassword, sampleInstagramUser, samplePost, sampleWallapopUser, sampleProduct, hashedDarkwebPassword, sampleDarkwebUser, sampleDarkwebChannel, privateDarkwebChannel, sampleDarkwebMessage, hashedInitialAdminPassword, initialAdminUser;
          return __generator2(this, function(_a) {
            switch (_a.label) {
              case 0:
                return [4, crypto_2.CryptoService.hashPassword("admin123")];
              case 1:
                hashedAdminPassword = _a.sent();
                sampleInstagramUser = {
                  id: "ig-sample-1",
                  username: "zona_cero_admin",
                  email: "admin@zonacerop.com",
                  password: hashedAdminPassword,
                  fullName: "Zona Cero RP",
                  bio: "Servidor oficial de roleplay \u{1F3AE}",
                  profileImage: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400",
                  verified: true,
                  createdAt: /* @__PURE__ */ new Date()
                };
                this.instagramUsers.set(sampleInstagramUser.id, sampleInstagramUser);
                samplePost = {
                  id: "post-sample-1",
                  userId: sampleInstagramUser.id,
                  mediaUrls: ["https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400"],
                  mediaType: "image",
                  caption: "\xA1Bienvenidos al servidor Zona Cero RP! \u{1F3AE}",
                  likes: 42,
                  commentsCount: 3,
                  location: "Los Santos",
                  createdAt: /* @__PURE__ */ new Date()
                };
                this.instagramPosts.set(samplePost.id, samplePost);
                sampleWallapopUser = {
                  id: "wallapop-sample-1",
                  name: "Carlos_ZCR",
                  email: "carlos@zonacerop.com",
                  location: "Los Santos",
                  rating: 5,
                  createdAt: /* @__PURE__ */ new Date()
                };
                this.wallapopUsers.set(sampleWallapopUser.id, sampleWallapopUser);
                sampleProduct = {
                  id: "product-sample-1",
                  sellerId: sampleWallapopUser.id,
                  title: "Coche deportivo (RP)",
                  description: "Vendo mi coche deportivo en perfecto estado para roleplay",
                  price: 5e6,
                  category: "Veh\xEDculos",
                  condition: "Excelente",
                  images: ["https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400"],
                  location: "Los Santos",
                  views: 0,
                  sold: false,
                  createdAt: /* @__PURE__ */ new Date()
                };
                this.wallapopProducts.set(sampleProduct.id, sampleProduct);
                return [4, crypto_2.CryptoService.hashPassword("darkpassword123")];
              case 2:
                hashedDarkwebPassword = _a.sent();
                sampleDarkwebUser = {
                  id: "darkweb-sample-1",
                  handle: "Shadow_Admin",
                  passwordHash: hashedDarkwebPassword,
                  reputation: 100,
                  isOnline: true,
                  lastSeen: /* @__PURE__ */ new Date(),
                  createdAt: /* @__PURE__ */ new Date()
                };
                this.darkwebUsers.set(sampleDarkwebUser.id, sampleDarkwebUser);
                sampleDarkwebChannel = {
                  id: "channel-sample-1",
                  name: "general",
                  description: "Canal general para discusiones an\xF3nimas",
                  isPrivate: false,
                  accessCode: null,
                  createdBy: sampleDarkwebUser.id,
                  createdAt: /* @__PURE__ */ new Date()
                };
                this.darkwebChannels.set(sampleDarkwebChannel.id, sampleDarkwebChannel);
                privateDarkwebChannel = {
                  id: "channel-sample-2",
                  name: "zona-cero-secrets",
                  description: "Canal privado para informaci\xF3n clasificada del servidor",
                  isPrivate: true,
                  accessCode: "ZCRRP2025",
                  createdBy: sampleDarkwebUser.id,
                  createdAt: /* @__PURE__ */ new Date()
                };
                this.darkwebChannels.set(privateDarkwebChannel.id, privateDarkwebChannel);
                sampleDarkwebMessage = {
                  id: "darkmsg-sample-1",
                  channelId: sampleDarkwebChannel.id,
                  senderId: sampleDarkwebUser.id,
                  content: "Bienvenidos a la red an\xF3nima de Zona Cero RP. Aqu\xED pueden compartir informaci\xF3n de forma segura.",
                  messageType: "text",
                  isEncrypted: false,
                  replyToId: null,
                  sentAt: /* @__PURE__ */ new Date()
                };
                this.darkwebMessages.set(sampleDarkwebMessage.id, sampleDarkwebMessage);
                return [4, crypto_2.CryptoService.hashPassword("admin2025!")];
              case 3:
                hashedInitialAdminPassword = _a.sent();
                initialAdminUser = {
                  id: "admin-initial-1",
                  username: "admin_inicial",
                  password: hashedInitialAdminPassword,
                  isOneTimeUse: true,
                  isUsed: false,
                  createdAt: /* @__PURE__ */ new Date(),
                  usedAt: null
                };
                this.adminUsers.set(initialAdminUser.id, initialAdminUser);
                return [
                  2
                  /*return*/
                ];
            }
          });
        });
      };
      MemStorage2.prototype.getInstagramUser = function(id) {
        return __awaiter2(this, void 0, Promise, function() {
          return __generator2(this, function(_a) {
            return [2, this.instagramUsers.get(id)];
          });
        });
      };
      MemStorage2.prototype.getInstagramUserByUsername = function(username) {
        return __awaiter2(this, void 0, Promise, function() {
          return __generator2(this, function(_a) {
            return [2, Array.from(this.instagramUsers.values()).find(function(user) {
              return user.username === username;
            })];
          });
        });
      };
      MemStorage2.prototype.getInstagramUserByEmail = function(email) {
        return __awaiter2(this, void 0, Promise, function() {
          return __generator2(this, function(_a) {
            return [2, Array.from(this.instagramUsers.values()).find(function(user) {
              return user.email === email;
            })];
          });
        });
      };
      MemStorage2.prototype.createInstagramUser = function(insertUser) {
        return __awaiter2(this, void 0, Promise, function() {
          var id, hashedPassword, user;
          return __generator2(this, function(_a) {
            switch (_a.label) {
              case 0:
                id = (0, crypto_1.randomUUID)();
                return [4, crypto_2.CryptoService.hashPassword(insertUser.password)];
              case 1:
                hashedPassword = _a.sent();
                user = __assign(__assign({}, insertUser), { id, password: hashedPassword, verified: false, createdAt: /* @__PURE__ */ new Date() });
                this.instagramUsers.set(id, user);
                return [2, user];
            }
          });
        });
      };
      MemStorage2.prototype.verifyInstagramPassword = function(email, password) {
        return __awaiter2(this, void 0, Promise, function() {
          var user, isValid;
          return __generator2(this, function(_a) {
            switch (_a.label) {
              case 0:
                return [4, this.getInstagramUserByEmail(email)];
              case 1:
                user = _a.sent();
                if (!user)
                  return [2, null];
                return [4, crypto_2.CryptoService.verifyPassword(password, user.password)];
              case 2:
                isValid = _a.sent();
                return [2, isValid ? user : null];
            }
          });
        });
      };
      MemStorage2.prototype.getInstagramPosts = function() {
        return __awaiter2(this, void 0, Promise, function() {
          return __generator2(this, function(_a) {
            return [2, Array.from(this.instagramPosts.values()).sort(function(a, b) {
              return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            })];
          });
        });
      };
      MemStorage2.prototype.getInstagramPostsByUser = function(userId) {
        return __awaiter2(this, void 0, Promise, function() {
          return __generator2(this, function(_a) {
            return [2, Array.from(this.instagramPosts.values()).filter(function(post) {
              return post.userId === userId;
            }).sort(function(a, b) {
              return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            })];
          });
        });
      };
      MemStorage2.prototype.createInstagramPost = function(insertPost) {
        return __awaiter2(this, void 0, Promise, function() {
          var id, post;
          return __generator2(this, function(_a) {
            id = (0, crypto_1.randomUUID)();
            post = __assign(__assign({}, insertPost), { id, likes: 0, commentsCount: 0, createdAt: /* @__PURE__ */ new Date() });
            this.instagramPosts.set(id, post);
            return [2, post];
          });
        });
      };
      MemStorage2.prototype.likeInstagramPost = function(postId) {
        return __awaiter2(this, void 0, Promise, function() {
          var post;
          return __generator2(this, function(_a) {
            post = this.instagramPosts.get(postId);
            if (post) {
              post.likes = (post.likes || 0) + 1;
              this.instagramPosts.set(postId, post);
            }
            return [
              2
              /*return*/
            ];
          });
        });
      };
      MemStorage2.prototype.createInstagramComment = function(insertComment) {
        return __awaiter2(this, void 0, Promise, function() {
          var id, comment, post;
          return __generator2(this, function(_a) {
            id = (0, crypto_1.randomUUID)();
            comment = __assign(__assign({}, insertComment), { id, createdAt: /* @__PURE__ */ new Date() });
            this.instagramComments.set(id, comment);
            post = this.instagramPosts.get(insertComment.postId);
            if (post) {
              post.commentsCount = (post.commentsCount || 0) + 1;
              this.instagramPosts.set(insertComment.postId, post);
            }
            return [2, comment];
          });
        });
      };
      MemStorage2.prototype.getInstagramComments = function(postId) {
        return __awaiter2(this, void 0, Promise, function() {
          return __generator2(this, function(_a) {
            return [2, Array.from(this.instagramComments.values()).filter(function(comment) {
              return comment.postId === postId;
            }).sort(function(a, b) {
              return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            })];
          });
        });
      };
      MemStorage2.prototype.followUser = function(followerId, followingId) {
        return __awaiter2(this, void 0, Promise, function() {
          var id, follow;
          return __generator2(this, function(_a) {
            id = (0, crypto_1.randomUUID)();
            follow = {
              id,
              followerId,
              followingId,
              createdAt: /* @__PURE__ */ new Date()
            };
            this.instagramFollows.set(id, follow);
            return [2, follow];
          });
        });
      };
      MemStorage2.prototype.unfollowUser = function(followerId, followingId) {
        return __awaiter2(this, void 0, Promise, function() {
          var follow;
          return __generator2(this, function(_a) {
            follow = Array.from(this.instagramFollows.values()).find(function(f) {
              return f.followerId === followerId && f.followingId === followingId;
            });
            if (follow) {
              this.instagramFollows.delete(follow.id);
            }
            return [
              2
              /*return*/
            ];
          });
        });
      };
      MemStorage2.prototype.isFollowing = function(followerId, followingId) {
        return __awaiter2(this, void 0, Promise, function() {
          return __generator2(this, function(_a) {
            return [2, Array.from(this.instagramFollows.values()).some(function(f) {
              return f.followerId === followerId && f.followingId === followingId;
            })];
          });
        });
      };
      MemStorage2.prototype.getFollowers = function(userId) {
        return __awaiter2(this, void 0, Promise, function() {
          var followerIds;
          var _this = this;
          return __generator2(this, function(_a) {
            followerIds = Array.from(this.instagramFollows.values()).filter(function(f) {
              return f.followingId === userId;
            }).map(function(f) {
              return f.followerId;
            });
            return [2, followerIds.map(function(id) {
              return _this.instagramUsers.get(id);
            }).filter(Boolean)];
          });
        });
      };
      MemStorage2.prototype.getFollowing = function(userId) {
        return __awaiter2(this, void 0, Promise, function() {
          var followingIds;
          var _this = this;
          return __generator2(this, function(_a) {
            followingIds = Array.from(this.instagramFollows.values()).filter(function(f) {
              return f.followerId === userId;
            }).map(function(f) {
              return f.followingId;
            });
            return [2, followingIds.map(function(id) {
              return _this.instagramUsers.get(id);
            }).filter(Boolean)];
          });
        });
      };
      MemStorage2.prototype.createInstagramStory = function(insertStory) {
        return __awaiter2(this, void 0, Promise, function() {
          var id, story;
          return __generator2(this, function(_a) {
            id = (0, crypto_1.randomUUID)();
            story = __assign(__assign({}, insertStory), { id, createdAt: /* @__PURE__ */ new Date() });
            this.instagramStories.set(id, story);
            return [2, story];
          });
        });
      };
      MemStorage2.prototype.getInstagramStories = function() {
        return __awaiter2(this, void 0, Promise, function() {
          var now, activeStories;
          var _this = this;
          return __generator2(this, function(_a) {
            now = /* @__PURE__ */ new Date();
            activeStories = Array.from(this.instagramStories.values()).filter(function(story) {
              return new Date(story.expiresAt) > now;
            });
            Array.from(this.instagramStories.values()).filter(function(story) {
              return new Date(story.expiresAt) <= now;
            }).forEach(function(story) {
              return _this.instagramStories.delete(story.id);
            });
            return [2, activeStories.sort(function(a, b) {
              return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            })];
          });
        });
      };
      MemStorage2.prototype.getInstagramStoriesByUser = function(userId) {
        return __awaiter2(this, void 0, Promise, function() {
          var now;
          return __generator2(this, function(_a) {
            now = /* @__PURE__ */ new Date();
            return [2, Array.from(this.instagramStories.values()).filter(function(story) {
              return story.userId === userId && new Date(story.expiresAt) > now;
            }).sort(function(a, b) {
              return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            })];
          });
        });
      };
      MemStorage2.prototype.getTinderUser = function(id) {
        return __awaiter2(this, void 0, Promise, function() {
          return __generator2(this, function(_a) {
            return [2, this.tinderUsers.get(id)];
          });
        });
      };
      MemStorage2.prototype.getTinderUserByName = function(name) {
        return __awaiter2(this, void 0, Promise, function() {
          return __generator2(this, function(_a) {
            return [2, Array.from(this.tinderUsers.values()).find(function(user) {
              return user.name === name;
            })];
          });
        });
      };
      MemStorage2.prototype.createTinderUser = function(insertUser) {
        return __awaiter2(this, void 0, Promise, function() {
          var id, user;
          return __generator2(this, function(_a) {
            id = (0, crypto_1.randomUUID)();
            user = __assign(__assign({}, insertUser), { id, photos: insertUser.photos || [], interests: insertUser.interests || [], createdAt: /* @__PURE__ */ new Date() });
            this.tinderUsers.set(id, user);
            return [2, user];
          });
        });
      };
      MemStorage2.prototype.getTinderUsers = function() {
        return __awaiter2(this, void 0, Promise, function() {
          return __generator2(this, function(_a) {
            return [2, Array.from(this.tinderUsers.values())];
          });
        });
      };
      MemStorage2.prototype.getPotentialMatches = function(userId) {
        return __awaiter2(this, void 0, Promise, function() {
          var userMatches, matchedUserIds;
          return __generator2(this, function(_a) {
            userMatches = Array.from(this.tinderMatches.values()).filter(function(match) {
              return match.user1Id === userId || match.user2Id === userId;
            });
            matchedUserIds = userMatches.map(function(match) {
              return match.user1Id === userId ? match.user2Id : match.user1Id;
            });
            return [2, Array.from(this.tinderUsers.values()).filter(function(user) {
              return user.id !== userId && !matchedUserIds.includes(user.id);
            })];
          });
        });
      };
      MemStorage2.prototype.createTinderMatch = function(insertMatch) {
        return __awaiter2(this, void 0, Promise, function() {
          var id, match;
          return __generator2(this, function(_a) {
            id = (0, crypto_1.randomUUID)();
            match = __assign(__assign({}, insertMatch), { id, isMatch: false, swipedAt: /* @__PURE__ */ new Date() });
            this.tinderMatches.set(id, match);
            return [2, match];
          });
        });
      };
      MemStorage2.prototype.getTinderMatches = function(userId) {
        return __awaiter2(this, void 0, Promise, function() {
          return __generator2(this, function(_a) {
            return [2, Array.from(this.tinderMatches.values()).filter(function(match) {
              return (match.user1Id === userId || match.user2Id === userId) && match.isMatch;
            })];
          });
        });
      };
      MemStorage2.prototype.getWallapopUser = function(id) {
        return __awaiter2(this, void 0, Promise, function() {
          return __generator2(this, function(_a) {
            return [2, this.wallapopUsers.get(id)];
          });
        });
      };
      MemStorage2.prototype.getWallapopUserByEmail = function(email) {
        return __awaiter2(this, void 0, Promise, function() {
          return __generator2(this, function(_a) {
            return [2, Array.from(this.wallapopUsers.values()).find(function(user) {
              return user.email === email;
            })];
          });
        });
      };
      MemStorage2.prototype.createWallapopUser = function(insertUser) {
        return __awaiter2(this, void 0, Promise, function() {
          var id, user;
          return __generator2(this, function(_a) {
            id = (0, crypto_1.randomUUID)();
            user = __assign(__assign({}, insertUser), { id, rating: 5, createdAt: /* @__PURE__ */ new Date() });
            this.wallapopUsers.set(id, user);
            return [2, user];
          });
        });
      };
      MemStorage2.prototype.getWallapopProducts = function() {
        return __awaiter2(this, void 0, Promise, function() {
          return __generator2(this, function(_a) {
            return [2, Array.from(this.wallapopProducts.values()).filter(function(product) {
              return !product.sold;
            }).sort(function(a, b) {
              return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            })];
          });
        });
      };
      MemStorage2.prototype.getWallapopProduct = function(id) {
        return __awaiter2(this, void 0, Promise, function() {
          return __generator2(this, function(_a) {
            return [2, this.wallapopProducts.get(id)];
          });
        });
      };
      MemStorage2.prototype.createWallapopProduct = function(insertProduct) {
        return __awaiter2(this, void 0, Promise, function() {
          var id, product;
          return __generator2(this, function(_a) {
            id = (0, crypto_1.randomUUID)();
            product = __assign(__assign({}, insertProduct), { id, images: insertProduct.images || [], views: 0, sold: false, createdAt: /* @__PURE__ */ new Date() });
            this.wallapopProducts.set(id, product);
            return [2, product];
          });
        });
      };
      MemStorage2.prototype.incrementProductViews = function(productId) {
        return __awaiter2(this, void 0, Promise, function() {
          var product;
          return __generator2(this, function(_a) {
            product = this.wallapopProducts.get(productId);
            if (product) {
              product.views = (product.views || 0) + 1;
              this.wallapopProducts.set(productId, product);
            }
            return [
              2
              /*return*/
            ];
          });
        });
      };
      MemStorage2.prototype.createWallapopChat = function(insertChat) {
        return __awaiter2(this, void 0, Promise, function() {
          var id, chat;
          return __generator2(this, function(_a) {
            id = (0, crypto_1.randomUUID)();
            chat = __assign(__assign({}, insertChat), { id, lastMessage: null, lastMessageAt: /* @__PURE__ */ new Date(), createdAt: /* @__PURE__ */ new Date() });
            this.wallapopChats.set(id, chat);
            return [2, chat];
          });
        });
      };
      MemStorage2.prototype.getWallapopChats = function(userId) {
        return __awaiter2(this, void 0, Promise, function() {
          return __generator2(this, function(_a) {
            return [2, Array.from(this.wallapopChats.values()).filter(function(chat) {
              return chat.buyerId === userId || chat.sellerId === userId;
            }).sort(function(a, b) {
              return new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime();
            })];
          });
        });
      };
      MemStorage2.prototype.createWallapopMessage = function(insertMessage) {
        return __awaiter2(this, void 0, Promise, function() {
          var id, message, chat;
          return __generator2(this, function(_a) {
            id = (0, crypto_1.randomUUID)();
            message = __assign(__assign({}, insertMessage), { id, isRead: false, createdAt: /* @__PURE__ */ new Date() });
            this.wallapopMessages.set(id, message);
            chat = this.wallapopChats.get(insertMessage.chatId);
            if (chat) {
              chat.lastMessage = insertMessage.content;
              chat.lastMessageAt = /* @__PURE__ */ new Date();
              this.wallapopChats.set(insertMessage.chatId, chat);
            }
            return [2, message];
          });
        });
      };
      MemStorage2.prototype.getWallapopMessages = function(chatId) {
        return __awaiter2(this, void 0, Promise, function() {
          return __generator2(this, function(_a) {
            return [2, Array.from(this.wallapopMessages.values()).filter(function(message) {
              return message.chatId === chatId;
            }).sort(function(a, b) {
              return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            })];
          });
        });
      };
      MemStorage2.prototype.getOrCreateWallapopChat = function(productId, buyerId, sellerId) {
        return __awaiter2(this, void 0, Promise, function() {
          var existingChat;
          return __generator2(this, function(_a) {
            existingChat = Array.from(this.wallapopChats.values()).find(function(chat) {
              return chat.productId === productId && chat.buyerId === buyerId;
            });
            if (existingChat) {
              return [2, existingChat];
            }
            return [2, this.createWallapopChat({
              productId,
              buyerId,
              sellerId
            })];
          });
        });
      };
      MemStorage2.prototype.getWhatsappUser = function(id) {
        return __awaiter2(this, void 0, Promise, function() {
          return __generator2(this, function(_a) {
            return [2, this.whatsappUsers.get(id)];
          });
        });
      };
      MemStorage2.prototype.getWhatsappUserByPhone = function(phone) {
        return __awaiter2(this, void 0, Promise, function() {
          return __generator2(this, function(_a) {
            return [2, Array.from(this.whatsappUsers.values()).find(function(user) {
              return user.phone === phone;
            })];
          });
        });
      };
      MemStorage2.prototype.createWhatsappUser = function(insertUser) {
        return __awaiter2(this, void 0, Promise, function() {
          var id, user;
          return __generator2(this, function(_a) {
            id = (0, crypto_1.randomUUID)();
            user = __assign(__assign({}, insertUser), { id, status: insertUser.status || "Hey there! I am using WhatsApp.", lastSeen: /* @__PURE__ */ new Date(), createdAt: /* @__PURE__ */ new Date() });
            this.whatsappUsers.set(id, user);
            return [2, user];
          });
        });
      };
      MemStorage2.prototype.getWhatsappUsers = function() {
        return __awaiter2(this, void 0, Promise, function() {
          return __generator2(this, function(_a) {
            return [2, Array.from(this.whatsappUsers.values())];
          });
        });
      };
      MemStorage2.prototype.createWhatsappChat = function(insertChat) {
        return __awaiter2(this, void 0, Promise, function() {
          var id, chat;
          return __generator2(this, function(_a) {
            id = (0, crypto_1.randomUUID)();
            chat = __assign(__assign({}, insertChat), { id, createdAt: /* @__PURE__ */ new Date() });
            this.whatsappChats.set(id, chat);
            return [2, chat];
          });
        });
      };
      MemStorage2.prototype.getWhatsappChatsByPhone = function(phone) {
        return __awaiter2(this, void 0, Promise, function() {
          return __generator2(this, function(_a) {
            return [2, Array.from(this.whatsappChats.values()).filter(function(chat) {
              return chat.participants.includes(phone);
            })];
          });
        });
      };
      MemStorage2.prototype.getOrCreateWhatsappChat = function(participants) {
        return __awaiter2(this, void 0, Promise, function() {
          var sortedParticipants, existingChat;
          return __generator2(this, function(_a) {
            sortedParticipants = participants.sort();
            existingChat = Array.from(this.whatsappChats.values()).find(function(chat) {
              var sortedChatParticipants = __spreadArray([], chat.participants, true).sort();
              return JSON.stringify(sortedChatParticipants) === JSON.stringify(sortedParticipants);
            });
            if (existingChat) {
              return [2, existingChat];
            }
            return [2, this.createWhatsappChat({ participants })];
          });
        });
      };
      MemStorage2.prototype.createWhatsappMessage = function(insertMessage) {
        return __awaiter2(this, void 0, Promise, function() {
          var id, message;
          return __generator2(this, function(_a) {
            id = (0, crypto_1.randomUUID)();
            message = __assign(__assign({}, insertMessage), { id, messageType: insertMessage.messageType || "text", sentAt: /* @__PURE__ */ new Date() });
            this.whatsappMessages.set(id, message);
            return [2, message];
          });
        });
      };
      MemStorage2.prototype.getWhatsappMessages = function(chatId) {
        return __awaiter2(this, void 0, Promise, function() {
          return __generator2(this, function(_a) {
            return [2, Array.from(this.whatsappMessages.values()).filter(function(message) {
              return message.chatId === chatId;
            }).sort(function(a, b) {
              return new Date(a.sentAt).getTime() - new Date(b.sentAt).getTime();
            })];
          });
        });
      };
      MemStorage2.prototype.getDarkwebUser = function(id) {
        return __awaiter2(this, void 0, Promise, function() {
          return __generator2(this, function(_a) {
            return [2, this.darkwebUsers.get(id)];
          });
        });
      };
      MemStorage2.prototype.getDarkwebUserByHandle = function(handle) {
        return __awaiter2(this, void 0, Promise, function() {
          return __generator2(this, function(_a) {
            return [2, Array.from(this.darkwebUsers.values()).find(function(user) {
              return user.handle === handle;
            })];
          });
        });
      };
      MemStorage2.prototype.createDarkwebUser = function(insertUser) {
        return __awaiter2(this, void 0, Promise, function() {
          var id, hashedPassword, user;
          return __generator2(this, function(_a) {
            switch (_a.label) {
              case 0:
                id = (0, crypto_1.randomUUID)();
                return [4, crypto_2.CryptoService.hashPassword(insertUser.passwordHash)];
              case 1:
                hashedPassword = _a.sent();
                user = __assign(__assign({}, insertUser), { id, passwordHash: hashedPassword, reputation: 0, isOnline: true, lastSeen: /* @__PURE__ */ new Date(), createdAt: /* @__PURE__ */ new Date() });
                this.darkwebUsers.set(id, user);
                return [2, user];
            }
          });
        });
      };
      MemStorage2.prototype.verifyDarkwebPassword = function(handle, password) {
        return __awaiter2(this, void 0, Promise, function() {
          var user, isValid;
          return __generator2(this, function(_a) {
            switch (_a.label) {
              case 0:
                return [4, this.getDarkwebUserByHandle(handle)];
              case 1:
                user = _a.sent();
                if (!user)
                  return [2, null];
                return [4, crypto_2.CryptoService.verifyPassword(password, user.passwordHash)];
              case 2:
                isValid = _a.sent();
                if (isValid) {
                  user.lastSeen = /* @__PURE__ */ new Date();
                  user.isOnline = true;
                  this.darkwebUsers.set(user.id, user);
                  return [2, user];
                }
                return [2, null];
            }
          });
        });
      };
      MemStorage2.prototype.getDarkwebChannels = function() {
        return __awaiter2(this, void 0, Promise, function() {
          return __generator2(this, function(_a) {
            return [2, Array.from(this.darkwebChannels.values()).filter(function(channel) {
              return !channel.isPrivate || !channel.accessCode;
            }).sort(function(a, b) {
              return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            })];
          });
        });
      };
      MemStorage2.prototype.createDarkwebChannel = function(insertChannel) {
        return __awaiter2(this, void 0, Promise, function() {
          var id, channel;
          return __generator2(this, function(_a) {
            id = (0, crypto_1.randomUUID)();
            channel = __assign(__assign({}, insertChannel), { id, createdAt: /* @__PURE__ */ new Date() });
            this.darkwebChannels.set(id, channel);
            return [2, channel];
          });
        });
      };
      MemStorage2.prototype.getDarkwebChannel = function(id) {
        return __awaiter2(this, void 0, Promise, function() {
          return __generator2(this, function(_a) {
            return [2, this.darkwebChannels.get(id)];
          });
        });
      };
      MemStorage2.prototype.createDarkwebMessage = function(insertMessage) {
        return __awaiter2(this, void 0, Promise, function() {
          var id, message;
          return __generator2(this, function(_a) {
            id = (0, crypto_1.randomUUID)();
            message = __assign(__assign({}, insertMessage), { id, sentAt: /* @__PURE__ */ new Date() });
            this.darkwebMessages.set(id, message);
            return [2, message];
          });
        });
      };
      MemStorage2.prototype.getDarkwebMessages = function(channelId) {
        return __awaiter2(this, void 0, Promise, function() {
          return __generator2(this, function(_a) {
            return [2, Array.from(this.darkwebMessages.values()).filter(function(message) {
              return message.channelId === channelId;
            }).sort(function(a, b) {
              return new Date(a.sentAt).getTime() - new Date(b.sentAt).getTime();
            })];
          });
        });
      };
      MemStorage2.prototype.updateUserOnlineStatus = function(userId, isOnline) {
        return __awaiter2(this, void 0, Promise, function() {
          var user;
          return __generator2(this, function(_a) {
            user = this.darkwebUsers.get(userId);
            if (user) {
              user.isOnline = isOnline;
              user.lastSeen = /* @__PURE__ */ new Date();
              this.darkwebUsers.set(userId, user);
            }
            return [
              2
              /*return*/
            ];
          });
        });
      };
      MemStorage2.prototype.getAdminUser = function(id) {
        return __awaiter2(this, void 0, Promise, function() {
          return __generator2(this, function(_a) {
            return [2, this.adminUsers.get(id)];
          });
        });
      };
      MemStorage2.prototype.getAdminUserByUsername = function(username) {
        return __awaiter2(this, void 0, Promise, function() {
          return __generator2(this, function(_a) {
            return [2, Array.from(this.adminUsers.values()).find(function(user) {
              return user.username === username;
            })];
          });
        });
      };
      MemStorage2.prototype.createAdminUser = function(insertUser) {
        return __awaiter2(this, void 0, Promise, function() {
          var id, hashedPassword, user;
          return __generator2(this, function(_a) {
            switch (_a.label) {
              case 0:
                id = (0, crypto_1.randomUUID)();
                return [4, crypto_2.CryptoService.hashPassword(insertUser.password)];
              case 1:
                hashedPassword = _a.sent();
                user = __assign(__assign({}, insertUser), { id, password: hashedPassword, createdAt: /* @__PURE__ */ new Date(), usedAt: null });
                this.adminUsers.set(id, user);
                return [2, user];
            }
          });
        });
      };
      MemStorage2.prototype.verifyAdminPassword = function(username, password) {
        return __awaiter2(this, void 0, Promise, function() {
          var user, isValid;
          return __generator2(this, function(_a) {
            switch (_a.label) {
              case 0:
                return [4, this.getAdminUserByUsername(username)];
              case 1:
                user = _a.sent();
                if (!user)
                  return [2, null];
                if (user.isOneTimeUse && user.isUsed) {
                  return [2, null];
                }
                return [4, crypto_2.CryptoService.verifyPassword(password, user.password)];
              case 2:
                isValid = _a.sent();
                if (isValid) {
                  return [2, user];
                }
                return [2, null];
            }
          });
        });
      };
      MemStorage2.prototype.markAdminUserAsUsed = function(id) {
        return __awaiter2(this, void 0, Promise, function() {
          var user;
          return __generator2(this, function(_a) {
            user = this.adminUsers.get(id);
            if (user && user.isOneTimeUse) {
              user.isUsed = true;
              user.usedAt = /* @__PURE__ */ new Date();
              this.adminUsers.set(id, user);
            }
            return [
              2
              /*return*/
            ];
          });
        });
      };
      MemStorage2.prototype.createRegistrationCode = function(insertCode) {
        return __awaiter2(this, void 0, Promise, function() {
          var id, code;
          return __generator2(this, function(_a) {
            id = (0, crypto_1.randomUUID)();
            code = __assign(__assign({}, insertCode), { id, createdAt: /* @__PURE__ */ new Date(), usedAt: null });
            this.registrationCodes.set(insertCode.code, code);
            return [2, code];
          });
        });
      };
      MemStorage2.prototype.getRegistrationCode = function(code) {
        return __awaiter2(this, void 0, Promise, function() {
          return __generator2(this, function(_a) {
            return [2, this.registrationCodes.get(code)];
          });
        });
      };
      MemStorage2.prototype.getRegistrationCodesByAdmin = function(adminId) {
        return __awaiter2(this, void 0, Promise, function() {
          return __generator2(this, function(_a) {
            return [2, Array.from(this.registrationCodes.values()).filter(function(code) {
              return code.createdBy === adminId;
            }).sort(function(a, b) {
              return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            })];
          });
        });
      };
      MemStorage2.prototype.markRegistrationCodeAsUsed = function(code, usedBy) {
        return __awaiter2(this, void 0, Promise, function() {
          var regCode;
          return __generator2(this, function(_a) {
            regCode = this.registrationCodes.get(code);
            if (regCode && !regCode.isUsed) {
              regCode.isUsed = true;
              regCode.usedBy = usedBy;
              regCode.usedAt = /* @__PURE__ */ new Date();
              this.registrationCodes.set(code, regCode);
            }
            return [
              2
              /*return*/
            ];
          });
        });
      };
      MemStorage2.prototype.getUnusedRegistrationCodes = function(appType) {
        return __awaiter2(this, void 0, Promise, function() {
          return __generator2(this, function(_a) {
            return [2, Array.from(this.registrationCodes.values()).filter(function(code) {
              return !code.isUsed && (!appType || code.appType === appType);
            }).sort(function(a, b) {
              return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            })];
          });
        });
      };
      return MemStorage2;
    })();
    storage = new MemStorage();
  }
});

// server/index.js
import express2 from "express";

// server/routes.js
var __assign2 = function() {
  __assign2 = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
        t[p] = s[p];
    }
    return t;
  };
  return __assign2.apply(this, arguments);
};
var __awaiter3 = function(thisArg, _arguments, P, generator) {
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
var __generator3 = function(thisArg, body) {
  var _ = { label: 0, sent: function() {
    if (t[0] & 1) throw t[1];
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
    if (f) throw new TypeError("Generator is already executing.");
    while (_) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];
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
          if (t[2]) _.ops.pop();
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
    if (op[0] & 5) throw op[1];
    return { value: op[0] ? op[1] : void 0, done: true };
  }
};
var __rest = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
    t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRoutes = void 0;
var http_1 = __require("http");
var storage_1 = (init_storage(), __toCommonJS(storage_exports));
var schema_1 = __require("@shared/schema");
var crypto_12 = (init_crypto(), __toCommonJS(crypto_exports));
function registerRoutes(app2) {
  return __awaiter3(this, void 0, Promise, function() {
    var httpServer;
    var _this = this;
    return __generator3(this, function(_a) {
      app2.post("/api/instagram/register", function(req, res) {
        return __awaiter3(_this, void 0, void 0, function() {
          var _a2, registrationCode, userData, codeVerification, validatedUserData, existingUsername, existingEmail, user, error_1;
          return __generator3(this, function(_b) {
            switch (_b.label) {
              case 0:
                _b.trys.push([0, 6, , 7]);
                _a2 = req.body, registrationCode = _a2.registrationCode, userData = __rest(_a2, ["registrationCode"]);
                if (!registrationCode) {
                  return [2, res.status(400).json({ message: "Registration code is required" })];
                }
                return [4, storage_1.storage.getRegistrationCode(registrationCode)];
              case 1:
                codeVerification = _b.sent();
                if (!codeVerification) {
                  return [2, res.status(400).json({ message: "Invalid registration code" })];
                }
                if (codeVerification.isUsed) {
                  return [2, res.status(400).json({ message: "Registration code already used" })];
                }
                if (codeVerification.appType !== "instagram") {
                  return [2, res.status(400).json({ message: "Registration code not valid for Instagram" })];
                }
                if (codeVerification.expiresAt && /* @__PURE__ */ new Date() > codeVerification.expiresAt) {
                  return [2, res.status(400).json({ message: "Registration code expired" })];
                }
                validatedUserData = schema_1.insertInstagramUserSchema.parse(userData);
                return [4, storage_1.storage.getInstagramUserByUsername(validatedUserData.username)];
              case 2:
                existingUsername = _b.sent();
                return [4, storage_1.storage.getInstagramUserByEmail(validatedUserData.email)];
              case 3:
                existingEmail = _b.sent();
                if (existingUsername) {
                  return [2, res.status(400).json({ message: "Username already exists" })];
                }
                if (existingEmail) {
                  return [2, res.status(400).json({ message: "Email already exists" })];
                }
                return [4, storage_1.storage.createInstagramUser(validatedUserData)];
              case 4:
                user = _b.sent();
                return [4, storage_1.storage.markRegistrationCodeAsUsed(registrationCode, userData.username)];
              case 5:
                _b.sent();
                res.json({ user: __assign2(__assign2({}, user), { password: void 0 }) });
                return [3, 7];
              case 6:
                error_1 = _b.sent();
                res.status(400).json({ message: "Invalid user data" });
                return [3, 7];
              case 7:
                return [
                  2
                  /*return*/
                ];
            }
          });
        });
      });
      app2.post("/api/instagram/login", function(req, res) {
        return __awaiter3(_this, void 0, void 0, function() {
          var _a2, username, password, user, _b, isValidPassword, error_2;
          return __generator3(this, function(_c) {
            switch (_c.label) {
              case 0:
                _c.trys.push([0, 5, , 6]);
                _a2 = req.body, username = _a2.username, password = _a2.password;
                return [4, storage_1.storage.getInstagramUserByUsername(username)];
              case 1:
                _b = _c.sent();
                if (_b) return [3, 3];
                return [4, storage_1.storage.getInstagramUserByEmail(username)];
              case 2:
                _b = _c.sent();
                _c.label = 3;
              case 3:
                user = _b;
                if (!user) {
                  return [2, res.status(401).json({ message: "Invalid credentials" })];
                }
                return [4, storage_1.storage.verifyInstagramPassword(user.email, password)];
              case 4:
                isValidPassword = _c.sent();
                if (!isValidPassword) {
                  return [2, res.status(401).json({ message: "Invalid credentials" })];
                }
                res.json({ user: __assign2(__assign2({}, user), { password: void 0 }) });
                return [3, 6];
              case 5:
                error_2 = _c.sent();
                res.status(500).json({ message: "Login failed" });
                return [3, 6];
              case 6:
                return [
                  2
                  /*return*/
                ];
            }
          });
        });
      });
      app2.get("/api/instagram/posts", function(req, res) {
        return __awaiter3(_this, void 0, void 0, function() {
          var posts, postsWithUsernames, error_3;
          var _this2 = this;
          return __generator3(this, function(_a2) {
            switch (_a2.label) {
              case 0:
                _a2.trys.push([0, 3, , 4]);
                return [4, storage_1.storage.getInstagramPosts()];
              case 1:
                posts = _a2.sent();
                return [4, Promise.all(posts.map(function(post) {
                  return __awaiter3(_this2, void 0, void 0, function() {
                    var user;
                    return __generator3(this, function(_a3) {
                      switch (_a3.label) {
                        case 0:
                          return [4, storage_1.storage.getInstagramUser(post.userId)];
                        case 1:
                          user = _a3.sent();
                          return [2, __assign2(__assign2({}, post), { username: (user === null || user === void 0 ? void 0 : user.username) || "unknown" })];
                      }
                    });
                  });
                }))];
              case 2:
                postsWithUsernames = _a2.sent();
                res.json(postsWithUsernames);
                return [3, 4];
              case 3:
                error_3 = _a2.sent();
                res.status(500).json({ message: "Failed to fetch posts" });
                return [3, 4];
              case 4:
                return [
                  2
                  /*return*/
                ];
            }
          });
        });
      });
      app2.post("/api/instagram/posts", function(req, res) {
        return __awaiter3(_this, void 0, void 0, function() {
          var postData, post, error_4;
          return __generator3(this, function(_a2) {
            switch (_a2.label) {
              case 0:
                _a2.trys.push([0, 2, , 3]);
                postData = schema_1.insertInstagramPostSchema.parse(req.body);
                return [4, storage_1.storage.createInstagramPost(postData)];
              case 1:
                post = _a2.sent();
                res.json(post);
                return [3, 3];
              case 2:
                error_4 = _a2.sent();
                res.status(400).json({ message: "Invalid post data" });
                return [3, 3];
              case 3:
                return [
                  2
                  /*return*/
                ];
            }
          });
        });
      });
      app2.post("/api/instagram/posts/:id/like", function(req, res) {
        return __awaiter3(_this, void 0, void 0, function() {
          var id, error_5;
          return __generator3(this, function(_a2) {
            switch (_a2.label) {
              case 0:
                _a2.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4, storage_1.storage.likeInstagramPost(id)];
              case 1:
                _a2.sent();
                res.json({ success: true });
                return [3, 3];
              case 2:
                error_5 = _a2.sent();
                res.status(500).json({ message: "Failed to like post" });
                return [3, 3];
              case 3:
                return [
                  2
                  /*return*/
                ];
            }
          });
        });
      });
      app2.get("/api/instagram/posts/:id/comments", function(req, res) {
        return __awaiter3(_this, void 0, void 0, function() {
          var id, comments, commentsWithUsernames, error_6;
          var _this2 = this;
          return __generator3(this, function(_a2) {
            switch (_a2.label) {
              case 0:
                _a2.trys.push([0, 3, , 4]);
                id = req.params.id;
                return [4, storage_1.storage.getInstagramComments(id)];
              case 1:
                comments = _a2.sent();
                return [4, Promise.all(comments.map(function(comment) {
                  return __awaiter3(_this2, void 0, void 0, function() {
                    var user;
                    return __generator3(this, function(_a3) {
                      switch (_a3.label) {
                        case 0:
                          return [4, storage_1.storage.getInstagramUser(comment.userId)];
                        case 1:
                          user = _a3.sent();
                          return [2, __assign2(__assign2({}, comment), { username: (user === null || user === void 0 ? void 0 : user.username) || "unknown" })];
                      }
                    });
                  });
                }))];
              case 2:
                commentsWithUsernames = _a2.sent();
                res.json(commentsWithUsernames);
                return [3, 4];
              case 3:
                error_6 = _a2.sent();
                res.status(500).json({ message: "Failed to fetch comments" });
                return [3, 4];
              case 4:
                return [
                  2
                  /*return*/
                ];
            }
          });
        });
      });
      app2.post("/api/instagram/posts/:id/comments", function(req, res) {
        return __awaiter3(_this, void 0, void 0, function() {
          var id, commentData, comment, error_7;
          return __generator3(this, function(_a2) {
            switch (_a2.label) {
              case 0:
                _a2.trys.push([0, 2, , 3]);
                id = req.params.id;
                commentData = schema_1.insertInstagramCommentSchema.parse(__assign2(__assign2({}, req.body), { postId: id }));
                return [4, storage_1.storage.createInstagramComment(commentData)];
              case 1:
                comment = _a2.sent();
                res.json(comment);
                return [3, 3];
              case 2:
                error_7 = _a2.sent();
                res.status(400).json({ message: "Invalid comment data" });
                return [3, 3];
              case 3:
                return [
                  2
                  /*return*/
                ];
            }
          });
        });
      });
      app2.post("/api/instagram/follow", function(req, res) {
        return __awaiter3(_this, void 0, void 0, function() {
          var followData, follow, error_8;
          return __generator3(this, function(_a2) {
            switch (_a2.label) {
              case 0:
                _a2.trys.push([0, 2, , 3]);
                followData = schema_1.insertInstagramFollowSchema.parse(req.body);
                return [4, storage_1.storage.followUser(followData.followerId, followData.followingId)];
              case 1:
                follow = _a2.sent();
                res.json(follow);
                return [3, 3];
              case 2:
                error_8 = _a2.sent();
                res.status(400).json({ message: "Invalid follow data" });
                return [3, 3];
              case 3:
                return [
                  2
                  /*return*/
                ];
            }
          });
        });
      });
      app2.delete("/api/instagram/follow", function(req, res) {
        return __awaiter3(_this, void 0, void 0, function() {
          var _a2, followerId, followingId, error_9;
          return __generator3(this, function(_b) {
            switch (_b.label) {
              case 0:
                _b.trys.push([0, 2, , 3]);
                _a2 = req.body, followerId = _a2.followerId, followingId = _a2.followingId;
                return [4, storage_1.storage.unfollowUser(followerId, followingId)];
              case 1:
                _b.sent();
                res.json({ success: true });
                return [3, 3];
              case 2:
                error_9 = _b.sent();
                res.status(500).json({ message: "Failed to unfollow user" });
                return [3, 3];
              case 3:
                return [
                  2
                  /*return*/
                ];
            }
          });
        });
      });
      app2.get("/api/instagram/users/:id/following-status/:targetId", function(req, res) {
        return __awaiter3(_this, void 0, void 0, function() {
          var _a2, id, targetId, isFollowing, error_10;
          return __generator3(this, function(_b) {
            switch (_b.label) {
              case 0:
                _b.trys.push([0, 2, , 3]);
                _a2 = req.params, id = _a2.id, targetId = _a2.targetId;
                return [4, storage_1.storage.isFollowing(id, targetId)];
              case 1:
                isFollowing = _b.sent();
                res.json({ isFollowing });
                return [3, 3];
              case 2:
                error_10 = _b.sent();
                res.status(500).json({ message: "Failed to check following status" });
                return [3, 3];
              case 3:
                return [
                  2
                  /*return*/
                ];
            }
          });
        });
      });
      app2.get("/api/instagram/users/:id/followers", function(req, res) {
        return __awaiter3(_this, void 0, void 0, function() {
          var id, followers, error_11;
          return __generator3(this, function(_a2) {
            switch (_a2.label) {
              case 0:
                _a2.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4, storage_1.storage.getFollowers(id)];
              case 1:
                followers = _a2.sent();
                res.json(followers);
                return [3, 3];
              case 2:
                error_11 = _a2.sent();
                res.status(500).json({ message: "Failed to fetch followers" });
                return [3, 3];
              case 3:
                return [
                  2
                  /*return*/
                ];
            }
          });
        });
      });
      app2.get("/api/instagram/users/:id/following", function(req, res) {
        return __awaiter3(_this, void 0, void 0, function() {
          var id, following, error_12;
          return __generator3(this, function(_a2) {
            switch (_a2.label) {
              case 0:
                _a2.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4, storage_1.storage.getFollowing(id)];
              case 1:
                following = _a2.sent();
                res.json(following);
                return [3, 3];
              case 2:
                error_12 = _a2.sent();
                res.status(500).json({ message: "Failed to fetch following" });
                return [3, 3];
              case 3:
                return [
                  2
                  /*return*/
                ];
            }
          });
        });
      });
      app2.get("/api/instagram/stories", function(req, res) {
        return __awaiter3(_this, void 0, void 0, function() {
          var stories, storiesWithUsernames, error_13;
          var _this2 = this;
          return __generator3(this, function(_a2) {
            switch (_a2.label) {
              case 0:
                _a2.trys.push([0, 3, , 4]);
                return [4, storage_1.storage.getInstagramStories()];
              case 1:
                stories = _a2.sent();
                return [4, Promise.all(stories.map(function(story) {
                  return __awaiter3(_this2, void 0, void 0, function() {
                    var user;
                    return __generator3(this, function(_a3) {
                      switch (_a3.label) {
                        case 0:
                          return [4, storage_1.storage.getInstagramUser(story.userId)];
                        case 1:
                          user = _a3.sent();
                          return [2, __assign2(__assign2({}, story), { username: (user === null || user === void 0 ? void 0 : user.username) || "unknown" })];
                      }
                    });
                  });
                }))];
              case 2:
                storiesWithUsernames = _a2.sent();
                res.json(storiesWithUsernames);
                return [3, 4];
              case 3:
                error_13 = _a2.sent();
                res.status(500).json({ message: "Failed to fetch stories" });
                return [3, 4];
              case 4:
                return [
                  2
                  /*return*/
                ];
            }
          });
        });
      });
      app2.post("/api/instagram/stories", function(req, res) {
        return __awaiter3(_this, void 0, void 0, function() {
          var storyData, story, error_14;
          return __generator3(this, function(_a2) {
            switch (_a2.label) {
              case 0:
                _a2.trys.push([0, 2, , 3]);
                storyData = schema_1.insertInstagramStorySchema.parse(__assign2(__assign2({}, req.body), {
                  expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1e3)
                  // 24 hours from now
                }));
                return [4, storage_1.storage.createInstagramStory(storyData)];
              case 1:
                story = _a2.sent();
                res.json(story);
                return [3, 3];
              case 2:
                error_14 = _a2.sent();
                res.status(400).json({ message: "Invalid story data" });
                return [3, 3];
              case 3:
                return [
                  2
                  /*return*/
                ];
            }
          });
        });
      });
      app2.get("/api/instagram/users/:id/posts", function(req, res) {
        return __awaiter3(_this, void 0, void 0, function() {
          var id, posts, error_15;
          return __generator3(this, function(_a2) {
            switch (_a2.label) {
              case 0:
                _a2.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4, storage_1.storage.getInstagramPostsByUser(id)];
              case 1:
                posts = _a2.sent();
                res.json(posts);
                return [3, 3];
              case 2:
                error_15 = _a2.sent();
                res.status(500).json({ message: "Failed to fetch user posts" });
                return [3, 3];
              case 3:
                return [
                  2
                  /*return*/
                ];
            }
          });
        });
      });
      app2.post("/api/tinder/register", function(req, res) {
        return __awaiter3(_this, void 0, void 0, function() {
          var _a2, registrationCode, userData, codeVerification, validatedUserData, existingUser, user, error_16;
          return __generator3(this, function(_b) {
            switch (_b.label) {
              case 0:
                _b.trys.push([0, 5, , 6]);
                _a2 = req.body, registrationCode = _a2.registrationCode, userData = __rest(_a2, ["registrationCode"]);
                if (!registrationCode) {
                  return [2, res.status(400).json({ message: "Registration code is required" })];
                }
                return [4, storage_1.storage.getRegistrationCode(registrationCode)];
              case 1:
                codeVerification = _b.sent();
                if (!codeVerification) {
                  return [2, res.status(400).json({ message: "Invalid registration code" })];
                }
                if (codeVerification.isUsed) {
                  return [2, res.status(400).json({ message: "Registration code already used" })];
                }
                if (codeVerification.appType !== "tinder") {
                  return [2, res.status(400).json({ message: "Registration code not valid for Tinder" })];
                }
                if (codeVerification.expiresAt && /* @__PURE__ */ new Date() > codeVerification.expiresAt) {
                  return [2, res.status(400).json({ message: "Registration code expired" })];
                }
                validatedUserData = schema_1.insertTinderUserSchema.parse(userData);
                return [4, storage_1.storage.getTinderUserByName(validatedUserData.name)];
              case 2:
                existingUser = _b.sent();
                if (existingUser) {
                  return [2, res.status(400).json({ message: "Name already exists" })];
                }
                return [4, storage_1.storage.createTinderUser(validatedUserData)];
              case 3:
                user = _b.sent();
                return [4, storage_1.storage.markRegistrationCodeAsUsed(registrationCode, userData.name)];
              case 4:
                _b.sent();
                res.json({ user });
                return [3, 6];
              case 5:
                error_16 = _b.sent();
                res.status(400).json({ message: "Invalid user data" });
                return [3, 6];
              case 6:
                return [
                  2
                  /*return*/
                ];
            }
          });
        });
      });
      app2.post("/api/tinder/login", function(req, res) {
        return __awaiter3(_this, void 0, void 0, function() {
          var name, user, error_17;
          return __generator3(this, function(_a2) {
            switch (_a2.label) {
              case 0:
                _a2.trys.push([0, 2, , 3]);
                name = req.body.name;
                return [4, storage_1.storage.getTinderUserByName(name)];
              case 1:
                user = _a2.sent();
                if (!user) {
                  return [2, res.status(404).json({ message: "User not found" })];
                }
                res.json({ user });
                return [3, 3];
              case 2:
                error_17 = _a2.sent();
                res.status(500).json({ message: "Login failed" });
                return [3, 3];
              case 3:
                return [
                  2
                  /*return*/
                ];
            }
          });
        });
      });
      app2.get("/api/tinder/potential-matches/:userId", function(req, res) {
        return __awaiter3(_this, void 0, void 0, function() {
          var userId, matches, error_18;
          return __generator3(this, function(_a2) {
            switch (_a2.label) {
              case 0:
                _a2.trys.push([0, 2, , 3]);
                userId = req.params.userId;
                return [4, storage_1.storage.getPotentialMatches(userId)];
              case 1:
                matches = _a2.sent();
                res.json(matches);
                return [3, 3];
              case 2:
                error_18 = _a2.sent();
                res.status(500).json({ message: "Failed to fetch potential matches" });
                return [3, 3];
              case 3:
                return [
                  2
                  /*return*/
                ];
            }
          });
        });
      });
      app2.post("/api/tinder/swipe", function(req, res) {
        return __awaiter3(_this, void 0, void 0, function() {
          var matchData, match, error_19;
          return __generator3(this, function(_a2) {
            switch (_a2.label) {
              case 0:
                _a2.trys.push([0, 2, , 3]);
                matchData = schema_1.insertTinderMatchSchema.parse(req.body);
                return [4, storage_1.storage.createTinderMatch(matchData)];
              case 1:
                match = _a2.sent();
                res.json(match);
                return [3, 3];
              case 2:
                error_19 = _a2.sent();
                res.status(400).json({ message: "Invalid match data" });
                return [3, 3];
              case 3:
                return [
                  2
                  /*return*/
                ];
            }
          });
        });
      });
      app2.get("/api/tinder/matches/:userId", function(req, res) {
        return __awaiter3(_this, void 0, void 0, function() {
          var userId, matches, error_20;
          return __generator3(this, function(_a2) {
            switch (_a2.label) {
              case 0:
                _a2.trys.push([0, 2, , 3]);
                userId = req.params.userId;
                return [4, storage_1.storage.getTinderMatches(userId)];
              case 1:
                matches = _a2.sent();
                res.json(matches);
                return [3, 3];
              case 2:
                error_20 = _a2.sent();
                res.status(500).json({ message: "Failed to fetch matches" });
                return [3, 3];
              case 3:
                return [
                  2
                  /*return*/
                ];
            }
          });
        });
      });
      app2.post("/api/wallapop/register", function(req, res) {
        return __awaiter3(_this, void 0, void 0, function() {
          var _a2, registrationCode, userData, codeVerification, validatedUserData, existingUser, user, error_21;
          return __generator3(this, function(_b) {
            switch (_b.label) {
              case 0:
                _b.trys.push([0, 5, , 6]);
                _a2 = req.body, registrationCode = _a2.registrationCode, userData = __rest(_a2, ["registrationCode"]);
                if (!registrationCode) {
                  return [2, res.status(400).json({ message: "Registration code is required" })];
                }
                return [4, storage_1.storage.getRegistrationCode(registrationCode)];
              case 1:
                codeVerification = _b.sent();
                if (!codeVerification) {
                  return [2, res.status(400).json({ message: "Invalid registration code" })];
                }
                if (codeVerification.isUsed) {
                  return [2, res.status(400).json({ message: "Registration code already used" })];
                }
                if (codeVerification.appType !== "wallapop") {
                  return [2, res.status(400).json({ message: "Registration code not valid for Wallapop" })];
                }
                if (codeVerification.expiresAt && /* @__PURE__ */ new Date() > codeVerification.expiresAt) {
                  return [2, res.status(400).json({ message: "Registration code expired" })];
                }
                validatedUserData = schema_1.insertWallapopUserSchema.parse(userData);
                return [4, storage_1.storage.getWallapopUserByEmail(validatedUserData.email)];
              case 2:
                existingUser = _b.sent();
                if (existingUser) {
                  return [2, res.status(400).json({ message: "Email already exists" })];
                }
                return [4, storage_1.storage.createWallapopUser(validatedUserData)];
              case 3:
                user = _b.sent();
                return [4, storage_1.storage.markRegistrationCodeAsUsed(registrationCode, userData.email)];
              case 4:
                _b.sent();
                res.json({ user });
                return [3, 6];
              case 5:
                error_21 = _b.sent();
                res.status(400).json({ message: "Invalid user data" });
                return [3, 6];
              case 6:
                return [
                  2
                  /*return*/
                ];
            }
          });
        });
      });
      app2.post("/api/wallapop/login", function(req, res) {
        return __awaiter3(_this, void 0, void 0, function() {
          var email, user, error_22;
          return __generator3(this, function(_a2) {
            switch (_a2.label) {
              case 0:
                _a2.trys.push([0, 2, , 3]);
                email = req.body.email;
                return [4, storage_1.storage.getWallapopUserByEmail(email)];
              case 1:
                user = _a2.sent();
                if (!user) {
                  return [2, res.status(404).json({ message: "User not found" })];
                }
                res.json({ user });
                return [3, 3];
              case 2:
                error_22 = _a2.sent();
                res.status(500).json({ message: "Login failed" });
                return [3, 3];
              case 3:
                return [
                  2
                  /*return*/
                ];
            }
          });
        });
      });
      app2.get("/api/wallapop/products", function(req, res) {
        return __awaiter3(_this, void 0, void 0, function() {
          var products, productsWithSellers, error_23;
          var _this2 = this;
          return __generator3(this, function(_a2) {
            switch (_a2.label) {
              case 0:
                _a2.trys.push([0, 3, , 4]);
                return [4, storage_1.storage.getWallapopProducts()];
              case 1:
                products = _a2.sent();
                return [4, Promise.all(products.map(function(product) {
                  return __awaiter3(_this2, void 0, void 0, function() {
                    var seller;
                    return __generator3(this, function(_a3) {
                      switch (_a3.label) {
                        case 0:
                          return [4, storage_1.storage.getWallapopUser(product.sellerId)];
                        case 1:
                          seller = _a3.sent();
                          return [2, __assign2(__assign2({}, product), { sellerName: (seller === null || seller === void 0 ? void 0 : seller.name) || "unknown", sellerLocation: (seller === null || seller === void 0 ? void 0 : seller.location) || "unknown" })];
                      }
                    });
                  });
                }))];
              case 2:
                productsWithSellers = _a2.sent();
                res.json(productsWithSellers);
                return [3, 4];
              case 3:
                error_23 = _a2.sent();
                res.status(500).json({ message: "Failed to fetch products" });
                return [3, 4];
              case 4:
                return [
                  2
                  /*return*/
                ];
            }
          });
        });
      });
      app2.get("/api/wallapop/products/:id", function(req, res) {
        return __awaiter3(_this, void 0, void 0, function() {
          var id, product, seller, error_24;
          return __generator3(this, function(_a2) {
            switch (_a2.label) {
              case 0:
                _a2.trys.push([0, 4, , 5]);
                id = req.params.id;
                return [4, storage_1.storage.getWallapopProduct(id)];
              case 1:
                product = _a2.sent();
                if (!product) {
                  return [2, res.status(404).json({ message: "Product not found" })];
                }
                return [4, storage_1.storage.incrementProductViews(id)];
              case 2:
                _a2.sent();
                return [4, storage_1.storage.getWallapopUser(product.sellerId)];
              case 3:
                seller = _a2.sent();
                res.json(__assign2(__assign2({}, product), { sellerName: (seller === null || seller === void 0 ? void 0 : seller.name) || "Unknown" }));
                return [3, 5];
              case 4:
                error_24 = _a2.sent();
                res.status(500).json({ message: "Failed to fetch product" });
                return [3, 5];
              case 5:
                return [
                  2
                  /*return*/
                ];
            }
          });
        });
      });
      app2.post("/api/wallapop/products", function(req, res) {
        return __awaiter3(_this, void 0, void 0, function() {
          var productData, product, error_25;
          return __generator3(this, function(_a2) {
            switch (_a2.label) {
              case 0:
                _a2.trys.push([0, 2, , 3]);
                productData = schema_1.insertWallapopProductSchema.parse(req.body);
                return [4, storage_1.storage.createWallapopProduct(productData)];
              case 1:
                product = _a2.sent();
                res.json(product);
                return [3, 3];
              case 2:
                error_25 = _a2.sent();
                res.status(400).json({ message: "Invalid product data" });
                return [3, 3];
              case 3:
                return [
                  2
                  /*return*/
                ];
            }
          });
        });
      });
      app2.get("/api/wallapop/chats/:userId", function(req, res) {
        return __awaiter3(_this, void 0, void 0, function() {
          var userId_1, chats, chatsWithDetails, error_26;
          var _this2 = this;
          return __generator3(this, function(_a2) {
            switch (_a2.label) {
              case 0:
                _a2.trys.push([0, 3, , 4]);
                userId_1 = req.params.userId;
                return [4, storage_1.storage.getWallapopChats(userId_1)];
              case 1:
                chats = _a2.sent();
                return [4, Promise.all(chats.map(function(chat) {
                  return __awaiter3(_this2, void 0, void 0, function() {
                    var product, otherUser, _a3;
                    var _b;
                    return __generator3(this, function(_c) {
                      switch (_c.label) {
                        case 0:
                          return [4, storage_1.storage.getWallapopProduct(chat.productId)];
                        case 1:
                          product = _c.sent();
                          if (!(chat.buyerId === userId_1)) return [3, 3];
                          return [4, storage_1.storage.getWallapopUser(chat.sellerId)];
                        case 2:
                          _a3 = _c.sent();
                          return [3, 5];
                        case 3:
                          return [4, storage_1.storage.getWallapopUser(chat.buyerId)];
                        case 4:
                          _a3 = _c.sent();
                          _c.label = 5;
                        case 5:
                          otherUser = _a3;
                          return [2, __assign2(__assign2({}, chat), { productTitle: (product === null || product === void 0 ? void 0 : product.title) || "Unknown", productImage: ((_b = product === null || product === void 0 ? void 0 : product.images) === null || _b === void 0 ? void 0 : _b[0]) || null, otherUserName: (otherUser === null || otherUser === void 0 ? void 0 : otherUser.name) || "Unknown" })];
                      }
                    });
                  });
                }))];
              case 2:
                chatsWithDetails = _a2.sent();
                res.json(chatsWithDetails);
                return [3, 4];
              case 3:
                error_26 = _a2.sent();
                res.status(500).json({ message: "Failed to fetch chats" });
                return [3, 4];
              case 4:
                return [
                  2
                  /*return*/
                ];
            }
          });
        });
      });
      app2.post("/api/wallapop/chats", function(req, res) {
        return __awaiter3(_this, void 0, void 0, function() {
          var _a2, productId, buyerId, sellerId, chat, error_27;
          return __generator3(this, function(_b) {
            switch (_b.label) {
              case 0:
                _b.trys.push([0, 2, , 3]);
                _a2 = req.body, productId = _a2.productId, buyerId = _a2.buyerId, sellerId = _a2.sellerId;
                return [4, storage_1.storage.getOrCreateWallapopChat(productId, buyerId, sellerId)];
              case 1:
                chat = _b.sent();
                res.json(chat);
                return [3, 3];
              case 2:
                error_27 = _b.sent();
                res.status(400).json({ message: "Invalid chat data" });
                return [3, 3];
              case 3:
                return [
                  2
                  /*return*/
                ];
            }
          });
        });
      });
      app2.get("/api/wallapop/chats/:chatId/messages", function(req, res) {
        return __awaiter3(_this, void 0, void 0, function() {
          var chatId, messages, messagesWithSenders, error_28;
          var _this2 = this;
          return __generator3(this, function(_a2) {
            switch (_a2.label) {
              case 0:
                _a2.trys.push([0, 3, , 4]);
                chatId = req.params.chatId;
                return [4, storage_1.storage.getWallapopMessages(chatId)];
              case 1:
                messages = _a2.sent();
                return [4, Promise.all(messages.map(function(message) {
                  return __awaiter3(_this2, void 0, void 0, function() {
                    var sender;
                    return __generator3(this, function(_a3) {
                      switch (_a3.label) {
                        case 0:
                          return [4, storage_1.storage.getWallapopUser(message.senderId)];
                        case 1:
                          sender = _a3.sent();
                          return [2, __assign2(__assign2({}, message), { senderName: (sender === null || sender === void 0 ? void 0 : sender.name) || "Unknown" })];
                      }
                    });
                  });
                }))];
              case 2:
                messagesWithSenders = _a2.sent();
                res.json(messagesWithSenders);
                return [3, 4];
              case 3:
                error_28 = _a2.sent();
                res.status(500).json({ message: "Failed to fetch messages" });
                return [3, 4];
              case 4:
                return [
                  2
                  /*return*/
                ];
            }
          });
        });
      });
      app2.post("/api/wallapop/chats/:chatId/messages", function(req, res) {
        return __awaiter3(_this, void 0, void 0, function() {
          var chatId, messageData, message, error_29;
          return __generator3(this, function(_a2) {
            switch (_a2.label) {
              case 0:
                _a2.trys.push([0, 2, , 3]);
                chatId = req.params.chatId;
                messageData = schema_1.insertWallapopMessageSchema.parse(__assign2(__assign2({}, req.body), { chatId }));
                return [4, storage_1.storage.createWallapopMessage(messageData)];
              case 1:
                message = _a2.sent();
                res.json(message);
                return [3, 3];
              case 2:
                error_29 = _a2.sent();
                res.status(400).json({ message: "Invalid message data" });
                return [3, 3];
              case 3:
                return [
                  2
                  /*return*/
                ];
            }
          });
        });
      });
      app2.post("/api/whatsapp/register", function(req, res) {
        return __awaiter3(_this, void 0, void 0, function() {
          var _a2, registrationCode, userData, codeVerification, validatedUserData, existingUser, user, error_30;
          return __generator3(this, function(_b) {
            switch (_b.label) {
              case 0:
                _b.trys.push([0, 5, , 6]);
                _a2 = req.body, registrationCode = _a2.registrationCode, userData = __rest(_a2, ["registrationCode"]);
                if (!registrationCode) {
                  return [2, res.status(400).json({ message: "Registration code is required" })];
                }
                return [4, storage_1.storage.getRegistrationCode(registrationCode)];
              case 1:
                codeVerification = _b.sent();
                if (!codeVerification) {
                  return [2, res.status(400).json({ message: "Invalid registration code" })];
                }
                if (codeVerification.isUsed) {
                  return [2, res.status(400).json({ message: "Registration code already used" })];
                }
                if (codeVerification.appType !== "whatsapp") {
                  return [2, res.status(400).json({ message: "Registration code not valid for WhatsApp" })];
                }
                if (codeVerification.expiresAt && /* @__PURE__ */ new Date() > codeVerification.expiresAt) {
                  return [2, res.status(400).json({ message: "Registration code expired" })];
                }
                validatedUserData = schema_1.insertWhatsappUserSchema.parse(userData);
                return [4, storage_1.storage.getWhatsappUserByPhone(validatedUserData.phone)];
              case 2:
                existingUser = _b.sent();
                if (existingUser) {
                  return [2, res.status(400).json({ message: "Phone number already registered" })];
                }
                return [4, storage_1.storage.createWhatsappUser(validatedUserData)];
              case 3:
                user = _b.sent();
                return [4, storage_1.storage.markRegistrationCodeAsUsed(registrationCode, userData.phone)];
              case 4:
                _b.sent();
                res.json({ user });
                return [3, 6];
              case 5:
                error_30 = _b.sent();
                res.status(400).json({ message: "Invalid user data" });
                return [3, 6];
              case 6:
                return [
                  2
                  /*return*/
                ];
            }
          });
        });
      });
      app2.post("/api/whatsapp/login", function(req, res) {
        return __awaiter3(_this, void 0, void 0, function() {
          var phone, user, error_31;
          return __generator3(this, function(_a2) {
            switch (_a2.label) {
              case 0:
                _a2.trys.push([0, 2, , 3]);
                phone = req.body.phone;
                return [4, storage_1.storage.getWhatsappUserByPhone(phone)];
              case 1:
                user = _a2.sent();
                if (!user) {
                  return [2, res.status(404).json({ message: "Phone number not found" })];
                }
                res.json({ user });
                return [3, 3];
              case 2:
                error_31 = _a2.sent();
                res.status(500).json({ message: "Login failed" });
                return [3, 3];
              case 3:
                return [
                  2
                  /*return*/
                ];
            }
          });
        });
      });
      app2.get("/api/whatsapp/users", function(req, res) {
        return __awaiter3(_this, void 0, void 0, function() {
          var users, error_32;
          return __generator3(this, function(_a2) {
            switch (_a2.label) {
              case 0:
                _a2.trys.push([0, 2, , 3]);
                return [4, storage_1.storage.getWhatsappUsers()];
              case 1:
                users = _a2.sent();
                res.json(users);
                return [3, 3];
              case 2:
                error_32 = _a2.sent();
                res.status(500).json({ message: "Failed to fetch users" });
                return [3, 3];
              case 3:
                return [
                  2
                  /*return*/
                ];
            }
          });
        });
      });
      app2.post("/api/whatsapp/chats", function(req, res) {
        return __awaiter3(_this, void 0, void 0, function() {
          var chatData, chat, error_33;
          return __generator3(this, function(_a2) {
            switch (_a2.label) {
              case 0:
                _a2.trys.push([0, 2, , 3]);
                chatData = schema_1.insertWhatsappChatSchema.parse(req.body);
                return [4, storage_1.storage.createWhatsappChat(chatData)];
              case 1:
                chat = _a2.sent();
                res.json(chat);
                return [3, 3];
              case 2:
                error_33 = _a2.sent();
                res.status(400).json({ message: "Invalid chat data" });
                return [3, 3];
              case 3:
                return [
                  2
                  /*return*/
                ];
            }
          });
        });
      });
      app2.post("/api/whatsapp/chats/get-or-create", function(req, res) {
        return __awaiter3(_this, void 0, void 0, function() {
          var participants, chat, error_34;
          return __generator3(this, function(_a2) {
            switch (_a2.label) {
              case 0:
                _a2.trys.push([0, 2, , 3]);
                participants = req.body.participants;
                if (!participants || !Array.isArray(participants) || participants.length !== 2) {
                  return [2, res.status(400).json({ message: "Must provide exactly 2 participants" })];
                }
                return [4, storage_1.storage.getOrCreateWhatsappChat(participants)];
              case 1:
                chat = _a2.sent();
                res.json(chat);
                return [3, 3];
              case 2:
                error_34 = _a2.sent();
                res.status(500).json({ message: "Failed to get or create chat" });
                return [3, 3];
              case 3:
                return [
                  2
                  /*return*/
                ];
            }
          });
        });
      });
      app2.get("/api/whatsapp/chats/:phone", function(req, res) {
        return __awaiter3(_this, void 0, void 0, function() {
          var phone_1, chats, enrichedChats, error_35;
          var _this2 = this;
          return __generator3(this, function(_a2) {
            switch (_a2.label) {
              case 0:
                _a2.trys.push([0, 3, , 4]);
                phone_1 = req.params.phone;
                return [4, storage_1.storage.getWhatsappChatsByPhone(phone_1)];
              case 1:
                chats = _a2.sent();
                return [4, Promise.all(chats.map(function(chat) {
                  return __awaiter3(_this2, void 0, void 0, function() {
                    var otherParticipantPhone, otherParticipant, _a3, messages, latestMessage;
                    return __generator3(this, function(_b) {
                      switch (_b.label) {
                        case 0:
                          otherParticipantPhone = chat.participants.find(function(p) {
                            return p !== phone_1;
                          });
                          if (!otherParticipantPhone) return [3, 2];
                          return [4, storage_1.storage.getWhatsappUserByPhone(otherParticipantPhone)];
                        case 1:
                          _a3 = _b.sent();
                          return [3, 3];
                        case 2:
                          _a3 = null;
                          _b.label = 3;
                        case 3:
                          otherParticipant = _a3;
                          return [4, storage_1.storage.getWhatsappMessages(chat.id)];
                        case 4:
                          messages = _b.sent();
                          latestMessage = messages[messages.length - 1] || null;
                          return [2, __assign2(__assign2({}, chat), { otherParticipant, latestMessage, messageCount: messages.length })];
                      }
                    });
                  });
                }))];
              case 2:
                enrichedChats = _a2.sent();
                res.json(enrichedChats);
                return [3, 4];
              case 3:
                error_35 = _a2.sent();
                res.status(500).json({ message: "Failed to fetch chats" });
                return [3, 4];
              case 4:
                return [
                  2
                  /*return*/
                ];
            }
          });
        });
      });
      app2.post("/api/whatsapp/messages", function(req, res) {
        return __awaiter3(_this, void 0, void 0, function() {
          var messageData, message, error_36;
          return __generator3(this, function(_a2) {
            switch (_a2.label) {
              case 0:
                _a2.trys.push([0, 2, , 3]);
                messageData = schema_1.insertWhatsappMessageSchema.parse(req.body);
                return [4, storage_1.storage.createWhatsappMessage(messageData)];
              case 1:
                message = _a2.sent();
                res.json(message);
                return [3, 3];
              case 2:
                error_36 = _a2.sent();
                res.status(400).json({ message: "Invalid message data" });
                return [3, 3];
              case 3:
                return [
                  2
                  /*return*/
                ];
            }
          });
        });
      });
      app2.get("/api/whatsapp/messages/:chatId", function(req, res) {
        return __awaiter3(_this, void 0, void 0, function() {
          var chatId, messages, error_37;
          return __generator3(this, function(_a2) {
            switch (_a2.label) {
              case 0:
                _a2.trys.push([0, 2, , 3]);
                chatId = req.params.chatId;
                return [4, storage_1.storage.getWhatsappMessages(chatId)];
              case 1:
                messages = _a2.sent();
                res.json(messages);
                return [3, 3];
              case 2:
                error_37 = _a2.sent();
                res.status(500).json({ message: "Failed to fetch messages" });
                return [3, 3];
              case 3:
                return [
                  2
                  /*return*/
                ];
            }
          });
        });
      });
      app2.post("/api/darkweb/register", function(req, res) {
        return __awaiter3(_this, void 0, void 0, function() {
          var _a2, registrationCode, userData, codeVerification, validatedUserData, existingUser, user, error_38;
          return __generator3(this, function(_b) {
            switch (_b.label) {
              case 0:
                _b.trys.push([0, 5, , 6]);
                _a2 = req.body, registrationCode = _a2.registrationCode, userData = __rest(_a2, ["registrationCode"]);
                if (!registrationCode) {
                  return [2, res.status(400).json({ message: "Registration code is required" })];
                }
                return [4, storage_1.storage.getRegistrationCode(registrationCode)];
              case 1:
                codeVerification = _b.sent();
                if (!codeVerification) {
                  return [2, res.status(400).json({ message: "Invalid registration code" })];
                }
                if (codeVerification.isUsed) {
                  return [2, res.status(400).json({ message: "Registration code already used" })];
                }
                if (codeVerification.appType !== "darkweb") {
                  return [2, res.status(400).json({ message: "Registration code not valid for Dark Web" })];
                }
                if (codeVerification.expiresAt && /* @__PURE__ */ new Date() > codeVerification.expiresAt) {
                  return [2, res.status(400).json({ message: "Registration code expired" })];
                }
                validatedUserData = schema_1.insertDarkwebUserSchema.parse(userData);
                return [4, storage_1.storage.getDarkwebUserByHandle(validatedUserData.handle)];
              case 2:
                existingUser = _b.sent();
                if (existingUser) {
                  return [2, res.status(400).json({ message: "Handle already exists" })];
                }
                return [4, storage_1.storage.createDarkwebUser(validatedUserData)];
              case 3:
                user = _b.sent();
                return [4, storage_1.storage.markRegistrationCodeAsUsed(registrationCode, userData.handle)];
              case 4:
                _b.sent();
                res.json({ user: __assign2(__assign2({}, user), { passwordHash: void 0 }) });
                return [3, 6];
              case 5:
                error_38 = _b.sent();
                res.status(400).json({ message: "Invalid user data" });
                return [3, 6];
              case 6:
                return [
                  2
                  /*return*/
                ];
            }
          });
        });
      });
      app2.post("/api/darkweb/login", function(req, res) {
        return __awaiter3(_this, void 0, void 0, function() {
          var _a2, handle, password, user, error_39;
          return __generator3(this, function(_b) {
            switch (_b.label) {
              case 0:
                _b.trys.push([0, 2, , 3]);
                _a2 = req.body, handle = _a2.handle, password = _a2.password;
                return [4, storage_1.storage.verifyDarkwebPassword(handle, password)];
              case 1:
                user = _b.sent();
                if (!user) {
                  return [2, res.status(401).json({ message: "Invalid credentials" })];
                }
                res.json({ user: __assign2(__assign2({}, user), { passwordHash: void 0 }) });
                return [3, 3];
              case 2:
                error_39 = _b.sent();
                res.status(500).json({ message: "Login failed" });
                return [3, 3];
              case 3:
                return [
                  2
                  /*return*/
                ];
            }
          });
        });
      });
      app2.get("/api/darkweb/channels", function(req, res) {
        return __awaiter3(_this, void 0, void 0, function() {
          var channels, error_40;
          return __generator3(this, function(_a2) {
            switch (_a2.label) {
              case 0:
                _a2.trys.push([0, 2, , 3]);
                return [4, storage_1.storage.getDarkwebChannels()];
              case 1:
                channels = _a2.sent();
                res.json(channels);
                return [3, 3];
              case 2:
                error_40 = _a2.sent();
                res.status(500).json({ message: "Failed to fetch channels" });
                return [3, 3];
              case 3:
                return [
                  2
                  /*return*/
                ];
            }
          });
        });
      });
      app2.post("/api/darkweb/channels", function(req, res) {
        return __awaiter3(_this, void 0, void 0, function() {
          var channelData, channel, error_41;
          return __generator3(this, function(_a2) {
            switch (_a2.label) {
              case 0:
                _a2.trys.push([0, 2, , 3]);
                channelData = schema_1.insertDarkwebChannelSchema.parse(req.body);
                return [4, storage_1.storage.createDarkwebChannel(channelData)];
              case 1:
                channel = _a2.sent();
                res.json(channel);
                return [3, 3];
              case 2:
                error_41 = _a2.sent();
                res.status(400).json({ message: "Invalid channel data" });
                return [3, 3];
              case 3:
                return [
                  2
                  /*return*/
                ];
            }
          });
        });
      });
      app2.get("/api/darkweb/channels/:id/messages", function(req, res) {
        return __awaiter3(_this, void 0, void 0, function() {
          var id, messages, messagesWithHandles, error_42;
          var _this2 = this;
          return __generator3(this, function(_a2) {
            switch (_a2.label) {
              case 0:
                _a2.trys.push([0, 3, , 4]);
                id = req.params.id;
                return [4, storage_1.storage.getDarkwebMessages(id)];
              case 1:
                messages = _a2.sent();
                return [4, Promise.all(messages.map(function(message) {
                  return __awaiter3(_this2, void 0, void 0, function() {
                    var sender;
                    return __generator3(this, function(_a3) {
                      switch (_a3.label) {
                        case 0:
                          return [4, storage_1.storage.getDarkwebUser(message.senderId)];
                        case 1:
                          sender = _a3.sent();
                          return [2, __assign2(__assign2({}, message), { senderHandle: (sender === null || sender === void 0 ? void 0 : sender.handle) || "Unknown" })];
                      }
                    });
                  });
                }))];
              case 2:
                messagesWithHandles = _a2.sent();
                res.json(messagesWithHandles);
                return [3, 4];
              case 3:
                error_42 = _a2.sent();
                res.status(500).json({ message: "Failed to fetch messages" });
                return [3, 4];
              case 4:
                return [
                  2
                  /*return*/
                ];
            }
          });
        });
      });
      app2.post("/api/darkweb/channels/:id/messages", function(req, res) {
        return __awaiter3(_this, void 0, void 0, function() {
          var id, messageData, message, error_43;
          return __generator3(this, function(_a2) {
            switch (_a2.label) {
              case 0:
                _a2.trys.push([0, 2, , 3]);
                id = req.params.id;
                messageData = schema_1.insertDarkwebMessageSchema.parse(__assign2(__assign2({}, req.body), { channelId: id }));
                return [4, storage_1.storage.createDarkwebMessage(messageData)];
              case 1:
                message = _a2.sent();
                res.json(message);
                return [3, 3];
              case 2:
                error_43 = _a2.sent();
                res.status(400).json({ message: "Invalid message data" });
                return [3, 3];
              case 3:
                return [
                  2
                  /*return*/
                ];
            }
          });
        });
      });
      app2.post("/api/admin/login", function(req, res) {
        return __awaiter3(_this, void 0, void 0, function() {
          var _a2, username, password, admin, error_44;
          return __generator3(this, function(_b) {
            switch (_b.label) {
              case 0:
                _b.trys.push([0, 4, , 5]);
                _a2 = req.body, username = _a2.username, password = _a2.password;
                return [4, storage_1.storage.verifyAdminPassword(username, password)];
              case 1:
                admin = _b.sent();
                if (!admin) {
                  return [2, res.status(401).json({ message: "Invalid credentials or admin already used" })];
                }
                if (!admin.isOneTimeUse) return [3, 3];
                return [4, storage_1.storage.markAdminUserAsUsed(admin.id)];
              case 2:
                _b.sent();
                _b.label = 3;
              case 3:
                res.json({ admin: __assign2(__assign2({}, admin), { password: void 0 }) });
                return [3, 5];
              case 4:
                error_44 = _b.sent();
                res.status(500).json({ message: "Login failed" });
                return [3, 5];
              case 5:
                return [
                  2
                  /*return*/
                ];
            }
          });
        });
      });
      app2.post("/api/admin/codes/generate", function(req, res) {
        return __awaiter3(_this, void 0, void 0, function() {
          var _a2, appType, adminId, _b, count, expiresAt, codes, i, code, codeData, createdCode, error_45;
          return __generator3(this, function(_c) {
            switch (_c.label) {
              case 0:
                _c.trys.push([0, 5, , 6]);
                _a2 = req.body, appType = _a2.appType, adminId = _a2.adminId, _b = _a2.count, count = _b === void 0 ? 1 : _b, expiresAt = _a2.expiresAt;
                if (!appType || !adminId) {
                  return [2, res.status(400).json({ message: "App type and admin ID are required" })];
                }
                codes = [];
                i = 0;
                _c.label = 1;
              case 1:
                if (!(i < count)) return [3, 4];
                code = crypto_12.CryptoService.generateToken(8).toUpperCase();
                codeData = schema_1.insertRegistrationCodeSchema.parse({
                  code,
                  appType,
                  createdBy: adminId,
                  expiresAt: expiresAt ? new Date(expiresAt) : null
                });
                return [4, storage_1.storage.createRegistrationCode(codeData)];
              case 2:
                createdCode = _c.sent();
                codes.push(createdCode);
                _c.label = 3;
              case 3:
                i++;
                return [3, 1];
              case 4:
                res.json({ codes });
                return [3, 6];
              case 5:
                error_45 = _c.sent();
                res.status(400).json({ message: "Failed to generate codes" });
                return [3, 6];
              case 6:
                return [
                  2
                  /*return*/
                ];
            }
          });
        });
      });
      app2.get("/api/admin/codes", function(req, res) {
        return __awaiter3(_this, void 0, void 0, function() {
          var _a2, adminId, appType, codes, error_46;
          return __generator3(this, function(_b) {
            switch (_b.label) {
              case 0:
                _b.trys.push([0, 5, , 6]);
                _a2 = req.query, adminId = _a2.adminId, appType = _a2.appType;
                codes = void 0;
                if (!adminId) return [3, 2];
                return [4, storage_1.storage.getRegistrationCodesByAdmin(adminId)];
              case 1:
                codes = _b.sent();
                return [3, 4];
              case 2:
                return [4, storage_1.storage.getUnusedRegistrationCodes(appType)];
              case 3:
                codes = _b.sent();
                _b.label = 4;
              case 4:
                res.json({ codes });
                return [3, 6];
              case 5:
                error_46 = _b.sent();
                res.status(500).json({ message: "Failed to fetch codes" });
                return [3, 6];
              case 6:
                return [
                  2
                  /*return*/
                ];
            }
          });
        });
      });
      app2.post("/api/admin/verify-code", function(req, res) {
        return __awaiter3(_this, void 0, void 0, function() {
          var _a2, code, appType, registrationCode, error_47;
          return __generator3(this, function(_b) {
            switch (_b.label) {
              case 0:
                _b.trys.push([0, 2, , 3]);
                _a2 = req.body, code = _a2.code, appType = _a2.appType;
                return [4, storage_1.storage.getRegistrationCode(code)];
              case 1:
                registrationCode = _b.sent();
                if (!registrationCode) {
                  return [2, res.status(404).json({ message: "Invalid code" })];
                }
                if (registrationCode.isUsed) {
                  return [2, res.status(400).json({ message: "Code already used" })];
                }
                if (registrationCode.appType !== appType) {
                  return [2, res.status(400).json({ message: "Code not valid for this app" })];
                }
                if (registrationCode.expiresAt && /* @__PURE__ */ new Date() > registrationCode.expiresAt) {
                  return [2, res.status(400).json({ message: "Code expired" })];
                }
                res.json({ valid: true });
                return [3, 3];
              case 2:
                error_47 = _b.sent();
                res.status(500).json({ message: "Code verification failed" });
                return [3, 3];
              case 3:
                return [
                  2
                  /*return*/
                ];
            }
          });
        });
      });
      app2.post("/api/admin/use-code", function(req, res) {
        return __awaiter3(_this, void 0, void 0, function() {
          var _a2, code, usedBy, error_48;
          return __generator3(this, function(_b) {
            switch (_b.label) {
              case 0:
                _b.trys.push([0, 2, , 3]);
                _a2 = req.body, code = _a2.code, usedBy = _a2.usedBy;
                return [4, storage_1.storage.markRegistrationCodeAsUsed(code, usedBy)];
              case 1:
                _b.sent();
                res.json({ success: true });
                return [3, 3];
              case 2:
                error_48 = _b.sent();
                res.status(500).json({ message: "Failed to mark code as used" });
                return [3, 3];
              case 3:
                return [
                  2
                  /*return*/
                ];
            }
          });
        });
      });
      httpServer = (0, http_1.createServer)(app2);
      return [2, httpServer];
    });
  });
}

// server/vite.js
import express from "express";
import fs from "fs";
import path from "path";
import { createServer as createViteServer, createLogger } from "vite";
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path.resolve(
        __dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path.resolve(__dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}

// server/index.js
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path2 = req.path;
  let capturedJsonResponse;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path2.startsWith("/api")) {
      let logLine = `${req.method} ${path2} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
