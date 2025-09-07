"use strict";
var __assign = (this && this.__assign) || function () {
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import * as crypto_1 from "crypto";
import { CryptoService } from "./crypto.js";
var MemStorage = /** @class */ (function () {
    function MemStorage() {
        this.instagramUsers = new Map();
        this.instagramPosts = new Map();
        this.instagramComments = new Map();
        this.instagramFollows = new Map();
        this.instagramStories = new Map();
        this.tinderUsers = new Map();
        this.tinderMatches = new Map();
        this.wallapopUsers = new Map();
        this.wallapopProducts = new Map();
        this.wallapopChats = new Map();
        this.wallapopMessages = new Map();
        this.whatsappUsers = new Map();
        this.whatsappChats = new Map();
        this.whatsappMessages = new Map();
        this.darkwebUsers = new Map();
        this.darkwebChannels = new Map();
        this.darkwebMessages = new Map();
        this.adminUsers = new Map();
        this.registrationCodes = new Map();
        this.initializeSampleData();
    }
    MemStorage.prototype.initializeSampleData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var adminUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        adminUser = {
                            username: "admin",
                            password: "SecureAdminPass123!",
                            isOneTimeUse: false
                        };
                        return [4 /*yield*/, this.createAdminUser(adminUser)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MemStorage.prototype.getInstagramUser = function (id) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.instagramUsers.get(id)];
            });
        });
    };
    MemStorage.prototype.getInstagramUserByUsername = function (username) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Array.from(this.instagramUsers.values()).find(function (user) { return user.username === username; })];
            });
        });
    };
    MemStorage.prototype.getInstagramUserByEmail = function (email) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Array.from(this.instagramUsers.values()).find(function (user) { return user.email === email; })];
            });
        });
    };
    MemStorage.prototype.createInstagramUser = function (insertUser) {
        return __awaiter(this, void 0, Promise, function () {
            var id, hashedPassword, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = (0, crypto_1.randomUUID)();
                        return [4 /*yield*/, CryptoService.hashPassword(insertUser.password)];
                    case 1:
                        hashedPassword = _a.sent();
                        user = __assign(__assign({}, insertUser), { id: id, password: hashedPassword, verified: false, createdAt: new Date() });
                        this.instagramUsers.set(id, user);
                        return [2 /*return*/, user];
                }
            });
        });
    };
    MemStorage.prototype.verifyInstagramPassword = function (email, password) {
        return __awaiter(this, void 0, Promise, function () {
            var user, isValid;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getInstagramUserByEmail(email)];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            return [2 /*return*/, null];
                        return [4 /*yield*/, CryptoService.verifyPassword(password, user.password)];
                    case 2:
                        isValid = _a.sent();
                        return [2 /*return*/, isValid ? user : null];
                }
            });
        });
    };
    MemStorage.prototype.getInstagramPosts = function () {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Array.from(this.instagramPosts.values()).sort(function (a, b) {
                        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                    })];
            });
        });
    };
    MemStorage.prototype.getInstagramPostsByUser = function (userId) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Array.from(this.instagramPosts.values())
                        .filter(function (post) { return post.userId === userId; })
                        .sort(function (a, b) { return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(); })];
            });
        });
    };
    MemStorage.prototype.createInstagramPost = function (insertPost) {
        return __awaiter(this, void 0, Promise, function () {
            var id, post;
            return __generator(this, function (_a) {
                id = (0, crypto_1.randomUUID)();
                post = __assign(__assign({}, insertPost), { id: id, likes: 0, commentsCount: 0, createdAt: new Date() });
                this.instagramPosts.set(id, post);
                return [2 /*return*/, post];
            });
        });
    };
    MemStorage.prototype.likeInstagramPost = function (postId) {
        return __awaiter(this, void 0, Promise, function () {
            var post;
            return __generator(this, function (_a) {
                post = this.instagramPosts.get(postId);
                if (post) {
                    post.likes = (post.likes || 0) + 1;
                    this.instagramPosts.set(postId, post);
                }
                return [2 /*return*/];
            });
        });
    };
    MemStorage.prototype.createInstagramComment = function (insertComment) {
        return __awaiter(this, void 0, Promise, function () {
            var id, comment, post;
            return __generator(this, function (_a) {
                id = (0, crypto_1.randomUUID)();
                comment = __assign(__assign({}, insertComment), { id: id, createdAt: new Date() });
                this.instagramComments.set(id, comment);
                post = this.instagramPosts.get(insertComment.postId);
                if (post) {
                    post.commentsCount = (post.commentsCount || 0) + 1;
                    this.instagramPosts.set(insertComment.postId, post);
                }
                return [2 /*return*/, comment];
            });
        });
    };
    MemStorage.prototype.getInstagramComments = function (postId) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Array.from(this.instagramComments.values())
                        .filter(function (comment) { return comment.postId === postId; })
                        .sort(function (a, b) { return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(); })];
            });
        });
    };
    MemStorage.prototype.followUser = function (followerId, followingId) {
        return __awaiter(this, void 0, Promise, function () {
            var id, follow;
            return __generator(this, function (_a) {
                id = (0, crypto_1.randomUUID)();
                follow = {
                    id: id,
                    followerId: followerId,
                    followingId: followingId,
                    createdAt: new Date()
                };
                this.instagramFollows.set(id, follow);
                return [2 /*return*/, follow];
            });
        });
    };
    MemStorage.prototype.unfollowUser = function (followerId, followingId) {
        return __awaiter(this, void 0, Promise, function () {
            var follow;
            return __generator(this, function (_a) {
                follow = Array.from(this.instagramFollows.values())
                    .find(function (f) { return f.followerId === followerId && f.followingId === followingId; });
                if (follow) {
                    this.instagramFollows.delete(follow.id);
                }
                return [2 /*return*/];
            });
        });
    };
    MemStorage.prototype.isFollowing = function (followerId, followingId) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Array.from(this.instagramFollows.values())
                        .some(function (f) { return f.followerId === followerId && f.followingId === followingId; })];
            });
        });
    };
    MemStorage.prototype.getFollowers = function (userId) {
        return __awaiter(this, void 0, Promise, function () {
            var followerIds;
            var _this = this;
            return __generator(this, function (_a) {
                followerIds = Array.from(this.instagramFollows.values())
                    .filter(function (f) { return f.followingId === userId; })
                    .map(function (f) { return f.followerId; });
                return [2 /*return*/, followerIds.map(function (id) { return _this.instagramUsers.get(id); }).filter(Boolean)];
            });
        });
    };
    MemStorage.prototype.getFollowing = function (userId) {
        return __awaiter(this, void 0, Promise, function () {
            var followingIds;
            var _this = this;
            return __generator(this, function (_a) {
                followingIds = Array.from(this.instagramFollows.values())
                    .filter(function (f) { return f.followerId === userId; })
                    .map(function (f) { return f.followingId; });
                return [2 /*return*/, followingIds.map(function (id) { return _this.instagramUsers.get(id); }).filter(Boolean)];
            });
        });
    };
    MemStorage.prototype.createInstagramStory = function (insertStory) {
        return __awaiter(this, void 0, Promise, function () {
            var id, story;
            return __generator(this, function (_a) {
                id = (0, crypto_1.randomUUID)();
                story = __assign(__assign({}, insertStory), { id: id, createdAt: new Date() });
                this.instagramStories.set(id, story);
                return [2 /*return*/, story];
            });
        });
    };
    MemStorage.prototype.getInstagramStories = function () {
        return __awaiter(this, void 0, Promise, function () {
            var now, activeStories;
            var _this = this;
            return __generator(this, function (_a) {
                now = new Date();
                activeStories = Array.from(this.instagramStories.values())
                    .filter(function (story) { return new Date(story.expiresAt) > now; });
                // Clean up expired stories
                Array.from(this.instagramStories.values())
                    .filter(function (story) { return new Date(story.expiresAt) <= now; })
                    .forEach(function (story) { return _this.instagramStories.delete(story.id); });
                return [2 /*return*/, activeStories.sort(function (a, b) { return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(); })];
            });
        });
    };
    MemStorage.prototype.getInstagramStoriesByUser = function (userId) {
        return __awaiter(this, void 0, Promise, function () {
            var now;
            return __generator(this, function (_a) {
                now = new Date();
                return [2 /*return*/, Array.from(this.instagramStories.values())
                        .filter(function (story) { return story.userId === userId && new Date(story.expiresAt) > now; })
                        .sort(function (a, b) { return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(); })];
            });
        });
    };
    // Tinder methods
    MemStorage.prototype.getTinderUser = function (id) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tinderUsers.get(id)];
            });
        });
    };
    MemStorage.prototype.getTinderUserByName = function (name) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Array.from(this.tinderUsers.values()).find(function (user) { return user.name === name; })];
            });
        });
    };
    MemStorage.prototype.createTinderUser = function (insertUser) {
        return __awaiter(this, void 0, Promise, function () {
            var id, user;
            return __generator(this, function (_a) {
                id = (0, crypto_1.randomUUID)();
                user = __assign(__assign({}, insertUser), { id: id, photos: insertUser.photos || [], interests: insertUser.interests || [], createdAt: new Date() });
                this.tinderUsers.set(id, user);
                return [2 /*return*/, user];
            });
        });
    };
    MemStorage.prototype.getTinderUsers = function () {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Array.from(this.tinderUsers.values())];
            });
        });
    };
    MemStorage.prototype.getPotentialMatches = function (userId) {
        return __awaiter(this, void 0, Promise, function () {
            var userMatches, matchedUserIds;
            return __generator(this, function (_a) {
                userMatches = Array.from(this.tinderMatches.values())
                    .filter(function (match) { return match.user1Id === userId || match.user2Id === userId; });
                matchedUserIds = userMatches.map(function (match) {
                    return match.user1Id === userId ? match.user2Id : match.user1Id;
                });
                return [2 /*return*/, Array.from(this.tinderUsers.values())
                        .filter(function (user) { return user.id !== userId && !matchedUserIds.includes(user.id); })];
            });
        });
    };
    MemStorage.prototype.createTinderMatch = function (insertMatch) {
        return __awaiter(this, void 0, Promise, function () {
            var id, match;
            return __generator(this, function (_a) {
                id = (0, crypto_1.randomUUID)();
                match = __assign(__assign({}, insertMatch), { id: id, isMatch: false, swipedAt: new Date() });
                this.tinderMatches.set(id, match);
                return [2 /*return*/, match];
            });
        });
    };
    MemStorage.prototype.getTinderMatches = function (userId) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Array.from(this.tinderMatches.values())
                        .filter(function (match) { return (match.user1Id === userId || match.user2Id === userId) && match.isMatch; })];
            });
        });
    };
    // Wallapop methods
    MemStorage.prototype.getWallapopUser = function (id) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.wallapopUsers.get(id)];
            });
        });
    };
    MemStorage.prototype.getWallapopUserByEmail = function (email) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Array.from(this.wallapopUsers.values()).find(function (user) { return user.email === email; })];
            });
        });
    };
    MemStorage.prototype.createWallapopUser = function (insertUser) {
        return __awaiter(this, void 0, Promise, function () {
            var id, user;
            return __generator(this, function (_a) {
                id = (0, crypto_1.randomUUID)();
                user = __assign(__assign({}, insertUser), { id: id, rating: 5, createdAt: new Date() });
                this.wallapopUsers.set(id, user);
                return [2 /*return*/, user];
            });
        });
    };
    MemStorage.prototype.getWallapopProducts = function () {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Array.from(this.wallapopProducts.values())
                        .filter(function (product) { return !product.sold; })
                        .sort(function (a, b) { return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(); })];
            });
        });
    };
    MemStorage.prototype.getWallapopProduct = function (id) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.wallapopProducts.get(id)];
            });
        });
    };
    MemStorage.prototype.createWallapopProduct = function (insertProduct) {
        return __awaiter(this, void 0, Promise, function () {
            var id, product;
            return __generator(this, function (_a) {
                id = (0, crypto_1.randomUUID)();
                product = __assign(__assign({}, insertProduct), { id: id, images: insertProduct.images || [], views: 0, sold: false, createdAt: new Date() });
                this.wallapopProducts.set(id, product);
                return [2 /*return*/, product];
            });
        });
    };
    MemStorage.prototype.incrementProductViews = function (productId) {
        return __awaiter(this, void 0, Promise, function () {
            var product;
            return __generator(this, function (_a) {
                product = this.wallapopProducts.get(productId);
                if (product) {
                    product.views = (product.views || 0) + 1;
                    this.wallapopProducts.set(productId, product);
                }
                return [2 /*return*/];
            });
        });
    };
    MemStorage.prototype.createWallapopChat = function (insertChat) {
        return __awaiter(this, void 0, Promise, function () {
            var id, chat;
            return __generator(this, function (_a) {
                id = (0, crypto_1.randomUUID)();
                chat = __assign(__assign({}, insertChat), { id: id, lastMessage: null, lastMessageAt: new Date(), createdAt: new Date() });
                this.wallapopChats.set(id, chat);
                return [2 /*return*/, chat];
            });
        });
    };
    MemStorage.prototype.getWallapopChats = function (userId) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Array.from(this.wallapopChats.values())
                        .filter(function (chat) { return chat.buyerId === userId || chat.sellerId === userId; })
                        .sort(function (a, b) { return new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime(); })];
            });
        });
    };
    MemStorage.prototype.createWallapopMessage = function (insertMessage) {
        return __awaiter(this, void 0, Promise, function () {
            var id, message, chat;
            return __generator(this, function (_a) {
                id = (0, crypto_1.randomUUID)();
                message = __assign(__assign({}, insertMessage), { id: id, isRead: false, createdAt: new Date() });
                this.wallapopMessages.set(id, message);
                chat = this.wallapopChats.get(insertMessage.chatId);
                if (chat) {
                    chat.lastMessage = insertMessage.content;
                    chat.lastMessageAt = new Date();
                    this.wallapopChats.set(insertMessage.chatId, chat);
                }
                return [2 /*return*/, message];
            });
        });
    };
    MemStorage.prototype.getWallapopMessages = function (chatId) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Array.from(this.wallapopMessages.values())
                        .filter(function (message) { return message.chatId === chatId; })
                        .sort(function (a, b) { return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(); })];
            });
        });
    };
    MemStorage.prototype.getOrCreateWallapopChat = function (productId, buyerId, sellerId) {
        return __awaiter(this, void 0, Promise, function () {
            var existingChat;
            return __generator(this, function (_a) {
                existingChat = Array.from(this.wallapopChats.values())
                    .find(function (chat) { return chat.productId === productId && chat.buyerId === buyerId; });
                if (existingChat) {
                    return [2 /*return*/, existingChat];
                }
                // Create new chat
                return [2 /*return*/, this.createWallapopChat({
                        productId: productId,
                        buyerId: buyerId,
                        sellerId: sellerId
                    })];
            });
        });
    };
    // WhatsApp methods
    MemStorage.prototype.getWhatsappUser = function (id) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.whatsappUsers.get(id)];
            });
        });
    };
    MemStorage.prototype.getWhatsappUserByPhone = function (phone) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Array.from(this.whatsappUsers.values()).find(function (user) { return user.phone === phone; })];
            });
        });
    };
    MemStorage.prototype.createWhatsappUser = function (insertUser) {
        return __awaiter(this, void 0, Promise, function () {
            var id, user;
            return __generator(this, function (_a) {
                id = (0, crypto_1.randomUUID)();
                user = __assign(__assign({}, insertUser), { id: id, status: insertUser.status || "Hey there! I am using WhatsApp.", lastSeen: new Date(), createdAt: new Date() });
                this.whatsappUsers.set(id, user);
                return [2 /*return*/, user];
            });
        });
    };
    MemStorage.prototype.getWhatsappUsers = function () {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Array.from(this.whatsappUsers.values())];
            });
        });
    };
    MemStorage.prototype.createWhatsappChat = function (insertChat) {
        return __awaiter(this, void 0, Promise, function () {
            var id, chat;
            return __generator(this, function (_a) {
                id = (0, crypto_1.randomUUID)();
                chat = __assign(__assign({}, insertChat), { id: id, createdAt: new Date() });
                this.whatsappChats.set(id, chat);
                return [2 /*return*/, chat];
            });
        });
    };
    MemStorage.prototype.getWhatsappChatsByPhone = function (phone) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Array.from(this.whatsappChats.values())
                        .filter(function (chat) { return chat.participants.includes(phone); })];
            });
        });
    };
    MemStorage.prototype.getOrCreateWhatsappChat = function (participants) {
        return __awaiter(this, void 0, Promise, function () {
            var sortedParticipants, existingChat;
            return __generator(this, function (_a) {
                sortedParticipants = participants.sort();
                existingChat = Array.from(this.whatsappChats.values())
                    .find(function (chat) {
                    var sortedChatParticipants = __spreadArray([], chat.participants, true).sort();
                    return JSON.stringify(sortedChatParticipants) === JSON.stringify(sortedParticipants);
                });
                if (existingChat) {
                    return [2 /*return*/, existingChat];
                }
                // Create new chat
                return [2 /*return*/, this.createWhatsappChat({ participants: participants })];
            });
        });
    };
    MemStorage.prototype.createWhatsappMessage = function (insertMessage) {
        return __awaiter(this, void 0, Promise, function () {
            var id, message;
            return __generator(this, function (_a) {
                id = (0, crypto_1.randomUUID)();
                message = __assign(__assign({}, insertMessage), { id: id, messageType: insertMessage.messageType || "text", sentAt: new Date() });
                this.whatsappMessages.set(id, message);
                return [2 /*return*/, message];
            });
        });
    };
    MemStorage.prototype.getWhatsappMessages = function (chatId) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Array.from(this.whatsappMessages.values())
                        .filter(function (message) { return message.chatId === chatId; })
                        .sort(function (a, b) { return new Date(a.sentAt).getTime() - new Date(b.sentAt).getTime(); })];
            });
        });
    };
    // Dark Web methods
    MemStorage.prototype.getDarkwebUser = function (id) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.darkwebUsers.get(id)];
            });
        });
    };
    MemStorage.prototype.getDarkwebUserByHandle = function (handle) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Array.from(this.darkwebUsers.values()).find(function (user) { return user.handle === handle; })];
            });
        });
    };
    MemStorage.prototype.createDarkwebUser = function (insertUser) {
        return __awaiter(this, void 0, Promise, function () {
            var id, hashedPassword, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = (0, crypto_1.randomUUID)();
                        return [4 /*yield*/, CryptoService.hashPassword(insertUser.passwordHash)];
                    case 1:
                        hashedPassword = _a.sent();
                        user = __assign(__assign({}, insertUser), { id: id, passwordHash: hashedPassword, reputation: 0, isOnline: true, lastSeen: new Date(), createdAt: new Date() });
                        this.darkwebUsers.set(id, user);
                        return [2 /*return*/, user];
                }
            });
        });
    };
    MemStorage.prototype.verifyDarkwebPassword = function (handle, password) {
        return __awaiter(this, void 0, Promise, function () {
            var user, isValid;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getDarkwebUserByHandle(handle)];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            return [2 /*return*/, null];
                        return [4 /*yield*/, CryptoService.verifyPassword(password, user.passwordHash)];
                    case 2:
                        isValid = _a.sent();
                        if (isValid) {
                            // Update last seen and online status
                            user.lastSeen = new Date();
                            user.isOnline = true;
                            this.darkwebUsers.set(user.id, user);
                            return [2 /*return*/, user];
                        }
                        return [2 /*return*/, null];
                }
            });
        });
    };
    MemStorage.prototype.getDarkwebChannels = function () {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Array.from(this.darkwebChannels.values())
                        .filter(function (channel) { return !channel.isPrivate || !channel.accessCode; })
                        .sort(function (a, b) { return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(); })];
            });
        });
    };
    MemStorage.prototype.createDarkwebChannel = function (insertChannel) {
        return __awaiter(this, void 0, Promise, function () {
            var id, channel;
            return __generator(this, function (_a) {
                id = (0, crypto_1.randomUUID)();
                channel = __assign(__assign({}, insertChannel), { id: id, createdAt: new Date() });
                this.darkwebChannels.set(id, channel);
                return [2 /*return*/, channel];
            });
        });
    };
    MemStorage.prototype.getDarkwebChannel = function (id) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.darkwebChannels.get(id)];
            });
        });
    };
    MemStorage.prototype.createDarkwebMessage = function (insertMessage) {
        return __awaiter(this, void 0, Promise, function () {
            var id, message;
            return __generator(this, function (_a) {
                id = (0, crypto_1.randomUUID)();
                message = __assign(__assign({}, insertMessage), { id: id, sentAt: new Date() });
                this.darkwebMessages.set(id, message);
                return [2 /*return*/, message];
            });
        });
    };
    MemStorage.prototype.getDarkwebMessages = function (channelId) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Array.from(this.darkwebMessages.values())
                        .filter(function (message) { return message.channelId === channelId; })
                        .sort(function (a, b) { return new Date(a.sentAt).getTime() - new Date(b.sentAt).getTime(); })];
            });
        });
    };
    MemStorage.prototype.updateUserOnlineStatus = function (userId, isOnline) {
        return __awaiter(this, void 0, Promise, function () {
            var user;
            return __generator(this, function (_a) {
                user = this.darkwebUsers.get(userId);
                if (user) {
                    user.isOnline = isOnline;
                    user.lastSeen = new Date();
                    this.darkwebUsers.set(userId, user);
                }
                return [2 /*return*/];
            });
        });
    };
    // Admin System Implementation
    MemStorage.prototype.getAdminUser = function (id) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.adminUsers.get(id)];
            });
        });
    };
    MemStorage.prototype.getAdminUserByUsername = function (username) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Array.from(this.adminUsers.values()).find(function (user) { return user.username === username; })];
            });
        });
    };
    MemStorage.prototype.createAdminUser = function (insertUser) {
        return __awaiter(this, void 0, Promise, function () {
            var id, hashedPassword, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = (0, crypto_1.randomUUID)();
                        return [4 /*yield*/, CryptoService.hashPassword(insertUser.password)];
                    case 1:
                        hashedPassword = _a.sent();
                        user = __assign(__assign({}, insertUser), { id: id, password: hashedPassword, createdAt: new Date(), usedAt: null });
                        this.adminUsers.set(id, user);
                        return [2 /*return*/, user];
                }
            });
        });
    };
    MemStorage.prototype.verifyAdminPassword = function (username, password) {
        return __awaiter(this, void 0, Promise, function () {
            var user, isValid;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getAdminUserByUsername(username)];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            return [2 /*return*/, null];
                        // Check if it's a one-time use admin that's already been used
                        if (user.isOneTimeUse && user.isUsed) {
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, CryptoService.verifyPassword(password, user.password)];
                    case 2:
                        isValid = _a.sent();
                        if (isValid) {
                            return [2 /*return*/, user];
                        }
                        return [2 /*return*/, null];
                }
            });
        });
    };
    MemStorage.prototype.markAdminUserAsUsed = function (id) {
        return __awaiter(this, void 0, Promise, function () {
            var user;
            return __generator(this, function (_a) {
                user = this.adminUsers.get(id);
                if (user && user.isOneTimeUse) {
                    user.isUsed = true;
                    user.usedAt = new Date();
                    this.adminUsers.set(id, user);
                }
                return [2 /*return*/];
            });
        });
    };
    MemStorage.prototype.createRegistrationCode = function (insertCode) {
        return __awaiter(this, void 0, Promise, function () {
            var id, code;
            return __generator(this, function (_a) {
                id = (0, crypto_1.randomUUID)();
                code = __assign(__assign({}, insertCode), { id: id, createdAt: new Date(), usedAt: null });
                this.registrationCodes.set(insertCode.code, code);
                return [2 /*return*/, code];
            });
        });
    };
    MemStorage.prototype.getRegistrationCode = function (code) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.registrationCodes.get(code)];
            });
        });
    };
    MemStorage.prototype.getRegistrationCodesByAdmin = function (adminId) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Array.from(this.registrationCodes.values())
                        .filter(function (code) { return code.createdBy === adminId; })
                        .sort(function (a, b) { return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(); })];
            });
        });
    };
    MemStorage.prototype.markRegistrationCodeAsUsed = function (code, usedBy) {
        return __awaiter(this, void 0, Promise, function () {
            var regCode;
            return __generator(this, function (_a) {
                regCode = this.registrationCodes.get(code);
                if (regCode && !regCode.isUsed) {
                    regCode.isUsed = true;
                    regCode.usedBy = usedBy;
                    regCode.usedAt = new Date();
                    this.registrationCodes.set(code, regCode);
                }
                return [2 /*return*/];
            });
        });
    };
    MemStorage.prototype.getUnusedRegistrationCodes = function (appType) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Array.from(this.registrationCodes.values())
                        .filter(function (code) { return !code.isUsed && (!appType || code.appType === appType); })
                        .sort(function (a, b) { return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(); })];
            });
        });
    };
    return MemStorage;
}());
export { MemStorage };

export const storage = new MemStorage();
