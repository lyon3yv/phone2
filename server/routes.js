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
var __rest = (this && this.__rest) || function (s, e) {
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
import { createServer } from "http";
import { storage } from "./storage.js";
import * as schema from "../shared/schema.js";
import { CryptoService } from "./crypto.js";
function registerRoutes(app) {
    return __awaiter(this, void 0, Promise, function () {
        var httpServer;
        var _this = this;
        return __generator(this, function (_a) {
            // Instagram routes
            app.post("/api/instagram/register", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var _a, registrationCode, userData, codeVerification, validatedUserData, existingUsername, existingEmail, user, error_1;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 6, , 7]);
                            _a = req.body, registrationCode = _a.registrationCode, userData = __rest(_a, ["registrationCode"]);
                            // Verify registration code
                            if (!registrationCode) {
                                return [2 /*return*/, res.status(400).json({ message: "Registration code is required" })];
                            }
                            return [4 /*yield*/, storage_1.storage.getRegistrationCode(registrationCode)];
                        case 1:
                            codeVerification = _b.sent();
                            if (!codeVerification) {
                                return [2 /*return*/, res.status(400).json({ message: "Invalid registration code" })];
                            }
                            if (codeVerification.isUsed) {
                                return [2 /*return*/, res.status(400).json({ message: "Registration code already used" })];
                            }
                            if (codeVerification.appType !== "instagram") {
                                return [2 /*return*/, res.status(400).json({ message: "Registration code not valid for Instagram" })];
                            }
                            if (codeVerification.expiresAt && new Date() > codeVerification.expiresAt) {
                                return [2 /*return*/, res.status(400).json({ message: "Registration code expired" })];
                            }
                            validatedUserData = schema_1.insertInstagramUserSchema.parse(userData);
                            return [4 /*yield*/, storage_1.storage.getInstagramUserByUsername(validatedUserData.username)];
                        case 2:
                            existingUsername = _b.sent();
                            return [4 /*yield*/, storage_1.storage.getInstagramUserByEmail(validatedUserData.email)];
                        case 3:
                            existingEmail = _b.sent();
                            if (existingUsername) {
                                return [2 /*return*/, res.status(400).json({ message: "Username already exists" })];
                            }
                            if (existingEmail) {
                                return [2 /*return*/, res.status(400).json({ message: "Email already exists" })];
                            }
                            return [4 /*yield*/, storage_1.storage.createInstagramUser(validatedUserData)];
                        case 4:
                            user = _b.sent();
                            // Mark registration code as used
                            return [4 /*yield*/, storage_1.storage.markRegistrationCodeAsUsed(registrationCode, userData.username)];
                        case 5:
                            // Mark registration code as used
                            _b.sent();
                            res.json({ user: __assign(__assign({}, user), { password: undefined }) });
                            return [3 /*break*/, 7];
                        case 6:
                            error_1 = _b.sent();
                            res.status(400).json({ message: "Invalid user data" });
                            return [3 /*break*/, 7];
                        case 7: return [2 /*return*/];
                    }
                });
            }); });
            app.post("/api/instagram/login", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var _a, username, password, user, _b, isValidPassword, error_2;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _c.trys.push([0, 5, , 6]);
                            _a = req.body, username = _a.username, password = _a.password;
                            return [4 /*yield*/, storage_1.storage.getInstagramUserByUsername(username)];
                        case 1:
                            _b = (_c.sent());
                            if (_b) return [3 /*break*/, 3];
                            return [4 /*yield*/, storage_1.storage.getInstagramUserByEmail(username)];
                        case 2:
                            _b = (_c.sent());
                            _c.label = 3;
                        case 3:
                            user = _b;
                            if (!user) {
                                return [2 /*return*/, res.status(401).json({ message: "Invalid credentials" })];
                            }
                            return [4 /*yield*/, storage_1.storage.verifyInstagramPassword(user.email, password)];
                        case 4:
                            isValidPassword = _c.sent();
                            if (!isValidPassword) {
                                return [2 /*return*/, res.status(401).json({ message: "Invalid credentials" })];
                            }
                            res.json({ user: __assign(__assign({}, user), { password: undefined }) });
                            return [3 /*break*/, 6];
                        case 5:
                            error_2 = _c.sent();
                            res.status(500).json({ message: "Login failed" });
                            return [3 /*break*/, 6];
                        case 6: return [2 /*return*/];
                    }
                });
            }); });
            app.get("/api/instagram/posts", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var posts, postsWithUsernames, error_3;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            return [4 /*yield*/, storage_1.storage.getInstagramPosts()];
                        case 1:
                            posts = _a.sent();
                            return [4 /*yield*/, Promise.all(posts.map(function (post) { return __awaiter(_this, void 0, void 0, function () {
                                    var user;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, storage_1.storage.getInstagramUser(post.userId)];
                                            case 1:
                                                user = _a.sent();
                                                return [2 /*return*/, __assign(__assign({}, post), { username: (user === null || user === void 0 ? void 0 : user.username) || "unknown" })];
                                        }
                                    });
                                }); }))];
                        case 2:
                            postsWithUsernames = _a.sent();
                            res.json(postsWithUsernames);
                            return [3 /*break*/, 4];
                        case 3:
                            error_3 = _a.sent();
                            res.status(500).json({ message: "Failed to fetch posts" });
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            }); });
            app.post("/api/instagram/posts", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var postData, post, error_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            postData = schema_1.insertInstagramPostSchema.parse(req.body);
                            return [4 /*yield*/, storage_1.storage.createInstagramPost(postData)];
                        case 1:
                            post = _a.sent();
                            res.json(post);
                            return [3 /*break*/, 3];
                        case 2:
                            error_4 = _a.sent();
                            res.status(400).json({ message: "Invalid post data" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            app.post("/api/instagram/posts/:id/like", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var id, error_5;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            id = req.params.id;
                            return [4 /*yield*/, storage_1.storage.likeInstagramPost(id)];
                        case 1:
                            _a.sent();
                            res.json({ success: true });
                            return [3 /*break*/, 3];
                        case 2:
                            error_5 = _a.sent();
                            res.status(500).json({ message: "Failed to like post" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            // Instagram Comments
            app.get("/api/instagram/posts/:id/comments", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var id, comments, commentsWithUsernames, error_6;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            id = req.params.id;
                            return [4 /*yield*/, storage_1.storage.getInstagramComments(id)];
                        case 1:
                            comments = _a.sent();
                            return [4 /*yield*/, Promise.all(comments.map(function (comment) { return __awaiter(_this, void 0, void 0, function () {
                                    var user;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, storage_1.storage.getInstagramUser(comment.userId)];
                                            case 1:
                                                user = _a.sent();
                                                return [2 /*return*/, __assign(__assign({}, comment), { username: (user === null || user === void 0 ? void 0 : user.username) || "unknown" })];
                                        }
                                    });
                                }); }))];
                        case 2:
                            commentsWithUsernames = _a.sent();
                            res.json(commentsWithUsernames);
                            return [3 /*break*/, 4];
                        case 3:
                            error_6 = _a.sent();
                            res.status(500).json({ message: "Failed to fetch comments" });
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            }); });
            app.post("/api/instagram/posts/:id/comments", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var id, commentData, comment, error_7;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            id = req.params.id;
                            commentData = schema_1.insertInstagramCommentSchema.parse(__assign(__assign({}, req.body), { postId: id }));
                            return [4 /*yield*/, storage_1.storage.createInstagramComment(commentData)];
                        case 1:
                            comment = _a.sent();
                            res.json(comment);
                            return [3 /*break*/, 3];
                        case 2:
                            error_7 = _a.sent();
                            res.status(400).json({ message: "Invalid comment data" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            // Instagram Follow System
            app.post("/api/instagram/follow", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var followData, follow, error_8;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            followData = schema_1.insertInstagramFollowSchema.parse(req.body);
                            return [4 /*yield*/, storage_1.storage.followUser(followData.followerId, followData.followingId)];
                        case 1:
                            follow = _a.sent();
                            res.json(follow);
                            return [3 /*break*/, 3];
                        case 2:
                            error_8 = _a.sent();
                            res.status(400).json({ message: "Invalid follow data" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            app.delete("/api/instagram/follow", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var _a, followerId, followingId, error_9;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            _a = req.body, followerId = _a.followerId, followingId = _a.followingId;
                            return [4 /*yield*/, storage_1.storage.unfollowUser(followerId, followingId)];
                        case 1:
                            _b.sent();
                            res.json({ success: true });
                            return [3 /*break*/, 3];
                        case 2:
                            error_9 = _b.sent();
                            res.status(500).json({ message: "Failed to unfollow user" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            app.get("/api/instagram/users/:id/following-status/:targetId", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var _a, id, targetId, isFollowing, error_10;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            _a = req.params, id = _a.id, targetId = _a.targetId;
                            return [4 /*yield*/, storage_1.storage.isFollowing(id, targetId)];
                        case 1:
                            isFollowing = _b.sent();
                            res.json({ isFollowing: isFollowing });
                            return [3 /*break*/, 3];
                        case 2:
                            error_10 = _b.sent();
                            res.status(500).json({ message: "Failed to check following status" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            app.get("/api/instagram/users/:id/followers", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var id, followers, error_11;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            id = req.params.id;
                            return [4 /*yield*/, storage_1.storage.getFollowers(id)];
                        case 1:
                            followers = _a.sent();
                            res.json(followers);
                            return [3 /*break*/, 3];
                        case 2:
                            error_11 = _a.sent();
                            res.status(500).json({ message: "Failed to fetch followers" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            app.get("/api/instagram/users/:id/following", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var id, following, error_12;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            id = req.params.id;
                            return [4 /*yield*/, storage_1.storage.getFollowing(id)];
                        case 1:
                            following = _a.sent();
                            res.json(following);
                            return [3 /*break*/, 3];
                        case 2:
                            error_12 = _a.sent();
                            res.status(500).json({ message: "Failed to fetch following" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            // Instagram Stories
            app.get("/api/instagram/stories", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var stories, storiesWithUsernames, error_13;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            return [4 /*yield*/, storage_1.storage.getInstagramStories()];
                        case 1:
                            stories = _a.sent();
                            return [4 /*yield*/, Promise.all(stories.map(function (story) { return __awaiter(_this, void 0, void 0, function () {
                                    var user;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, storage_1.storage.getInstagramUser(story.userId)];
                                            case 1:
                                                user = _a.sent();
                                                return [2 /*return*/, __assign(__assign({}, story), { username: (user === null || user === void 0 ? void 0 : user.username) || "unknown" })];
                                        }
                                    });
                                }); }))];
                        case 2:
                            storiesWithUsernames = _a.sent();
                            res.json(storiesWithUsernames);
                            return [3 /*break*/, 4];
                        case 3:
                            error_13 = _a.sent();
                            res.status(500).json({ message: "Failed to fetch stories" });
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            }); });
            app.post("/api/instagram/stories", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var storyData, story, error_14;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            storyData = schema_1.insertInstagramStorySchema.parse(__assign(__assign({}, req.body), { expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours from now
                             }));
                            return [4 /*yield*/, storage_1.storage.createInstagramStory(storyData)];
                        case 1:
                            story = _a.sent();
                            res.json(story);
                            return [3 /*break*/, 3];
                        case 2:
                            error_14 = _a.sent();
                            res.status(400).json({ message: "Invalid story data" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            app.get("/api/instagram/users/:id/posts", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var id, posts, error_15;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            id = req.params.id;
                            return [4 /*yield*/, storage_1.storage.getInstagramPostsByUser(id)];
                        case 1:
                            posts = _a.sent();
                            res.json(posts);
                            return [3 /*break*/, 3];
                        case 2:
                            error_15 = _a.sent();
                            res.status(500).json({ message: "Failed to fetch user posts" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            // Tinder routes
            app.post("/api/tinder/register", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var _a, registrationCode, userData, codeVerification, validatedUserData, existingUser, user, error_16;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 5, , 6]);
                            _a = req.body, registrationCode = _a.registrationCode, userData = __rest(_a, ["registrationCode"]);
                            // Verify registration code
                            if (!registrationCode) {
                                return [2 /*return*/, res.status(400).json({ message: "Registration code is required" })];
                            }
                            return [4 /*yield*/, storage_1.storage.getRegistrationCode(registrationCode)];
                        case 1:
                            codeVerification = _b.sent();
                            if (!codeVerification) {
                                return [2 /*return*/, res.status(400).json({ message: "Invalid registration code" })];
                            }
                            if (codeVerification.isUsed) {
                                return [2 /*return*/, res.status(400).json({ message: "Registration code already used" })];
                            }
                            if (codeVerification.appType !== "tinder") {
                                return [2 /*return*/, res.status(400).json({ message: "Registration code not valid for Tinder" })];
                            }
                            if (codeVerification.expiresAt && new Date() > codeVerification.expiresAt) {
                                return [2 /*return*/, res.status(400).json({ message: "Registration code expired" })];
                            }
                            validatedUserData = schema_1.insertTinderUserSchema.parse(userData);
                            return [4 /*yield*/, storage_1.storage.getTinderUserByName(validatedUserData.name)];
                        case 2:
                            existingUser = _b.sent();
                            if (existingUser) {
                                return [2 /*return*/, res.status(400).json({ message: "Name already exists" })];
                            }
                            return [4 /*yield*/, storage_1.storage.createTinderUser(validatedUserData)];
                        case 3:
                            user = _b.sent();
                            // Mark registration code as used
                            return [4 /*yield*/, storage_1.storage.markRegistrationCodeAsUsed(registrationCode, userData.name)];
                        case 4:
                            // Mark registration code as used
                            _b.sent();
                            res.json({ user: user });
                            return [3 /*break*/, 6];
                        case 5:
                            error_16 = _b.sent();
                            res.status(400).json({ message: "Invalid user data" });
                            return [3 /*break*/, 6];
                        case 6: return [2 /*return*/];
                    }
                });
            }); });
            app.post("/api/tinder/login", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var name, user, error_17;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            name = req.body.name;
                            return [4 /*yield*/, storage_1.storage.getTinderUserByName(name)];
                        case 1:
                            user = _a.sent();
                            if (!user) {
                                return [2 /*return*/, res.status(404).json({ message: "User not found" })];
                            }
                            res.json({ user: user });
                            return [3 /*break*/, 3];
                        case 2:
                            error_17 = _a.sent();
                            res.status(500).json({ message: "Login failed" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            app.get("/api/tinder/potential-matches/:userId", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var userId, matches, error_18;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            userId = req.params.userId;
                            return [4 /*yield*/, storage_1.storage.getPotentialMatches(userId)];
                        case 1:
                            matches = _a.sent();
                            res.json(matches);
                            return [3 /*break*/, 3];
                        case 2:
                            error_18 = _a.sent();
                            res.status(500).json({ message: "Failed to fetch potential matches" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            app.post("/api/tinder/swipe", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var matchData, match, error_19;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            matchData = schema_1.insertTinderMatchSchema.parse(req.body);
                            return [4 /*yield*/, storage_1.storage.createTinderMatch(matchData)];
                        case 1:
                            match = _a.sent();
                            res.json(match);
                            return [3 /*break*/, 3];
                        case 2:
                            error_19 = _a.sent();
                            res.status(400).json({ message: "Invalid match data" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            app.get("/api/tinder/matches/:userId", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var userId, matches, error_20;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            userId = req.params.userId;
                            return [4 /*yield*/, storage_1.storage.getTinderMatches(userId)];
                        case 1:
                            matches = _a.sent();
                            res.json(matches);
                            return [3 /*break*/, 3];
                        case 2:
                            error_20 = _a.sent();
                            res.status(500).json({ message: "Failed to fetch matches" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            // Wallapop routes
            app.post("/api/wallapop/register", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var _a, registrationCode, userData, codeVerification, validatedUserData, existingUser, user, error_21;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 5, , 6]);
                            _a = req.body, registrationCode = _a.registrationCode, userData = __rest(_a, ["registrationCode"]);
                            // Verify registration code
                            if (!registrationCode) {
                                return [2 /*return*/, res.status(400).json({ message: "Registration code is required" })];
                            }
                            return [4 /*yield*/, storage_1.storage.getRegistrationCode(registrationCode)];
                        case 1:
                            codeVerification = _b.sent();
                            if (!codeVerification) {
                                return [2 /*return*/, res.status(400).json({ message: "Invalid registration code" })];
                            }
                            if (codeVerification.isUsed) {
                                return [2 /*return*/, res.status(400).json({ message: "Registration code already used" })];
                            }
                            if (codeVerification.appType !== "wallapop") {
                                return [2 /*return*/, res.status(400).json({ message: "Registration code not valid for Wallapop" })];
                            }
                            if (codeVerification.expiresAt && new Date() > codeVerification.expiresAt) {
                                return [2 /*return*/, res.status(400).json({ message: "Registration code expired" })];
                            }
                            validatedUserData = schema_1.insertWallapopUserSchema.parse(userData);
                            return [4 /*yield*/, storage_1.storage.getWallapopUserByEmail(validatedUserData.email)];
                        case 2:
                            existingUser = _b.sent();
                            if (existingUser) {
                                return [2 /*return*/, res.status(400).json({ message: "Email already exists" })];
                            }
                            return [4 /*yield*/, storage_1.storage.createWallapopUser(validatedUserData)];
                        case 3:
                            user = _b.sent();
                            // Mark registration code as used
                            return [4 /*yield*/, storage_1.storage.markRegistrationCodeAsUsed(registrationCode, userData.email)];
                        case 4:
                            // Mark registration code as used
                            _b.sent();
                            res.json({ user: user });
                            return [3 /*break*/, 6];
                        case 5:
                            error_21 = _b.sent();
                            res.status(400).json({ message: "Invalid user data" });
                            return [3 /*break*/, 6];
                        case 6: return [2 /*return*/];
                    }
                });
            }); });
            app.post("/api/wallapop/login", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var email, user, error_22;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            email = req.body.email;
                            return [4 /*yield*/, storage_1.storage.getWallapopUserByEmail(email)];
                        case 1:
                            user = _a.sent();
                            if (!user) {
                                return [2 /*return*/, res.status(404).json({ message: "User not found" })];
                            }
                            res.json({ user: user });
                            return [3 /*break*/, 3];
                        case 2:
                            error_22 = _a.sent();
                            res.status(500).json({ message: "Login failed" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            app.get("/api/wallapop/products", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var products, productsWithSellers, error_23;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            return [4 /*yield*/, storage_1.storage.getWallapopProducts()];
                        case 1:
                            products = _a.sent();
                            return [4 /*yield*/, Promise.all(products.map(function (product) { return __awaiter(_this, void 0, void 0, function () {
                                    var seller;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, storage_1.storage.getWallapopUser(product.sellerId)];
                                            case 1:
                                                seller = _a.sent();
                                                return [2 /*return*/, __assign(__assign({}, product), { sellerName: (seller === null || seller === void 0 ? void 0 : seller.name) || "unknown", sellerLocation: (seller === null || seller === void 0 ? void 0 : seller.location) || "unknown" })];
                                        }
                                    });
                                }); }))];
                        case 2:
                            productsWithSellers = _a.sent();
                            res.json(productsWithSellers);
                            return [3 /*break*/, 4];
                        case 3:
                            error_23 = _a.sent();
                            res.status(500).json({ message: "Failed to fetch products" });
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            }); });
            app.get("/api/wallapop/products/:id", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var id, product, seller, error_24;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 4, , 5]);
                            id = req.params.id;
                            return [4 /*yield*/, storage_1.storage.getWallapopProduct(id)];
                        case 1:
                            product = _a.sent();
                            if (!product) {
                                return [2 /*return*/, res.status(404).json({ message: "Product not found" })];
                            }
                            // Increment views
                            return [4 /*yield*/, storage_1.storage.incrementProductViews(id)];
                        case 2:
                            // Increment views
                            _a.sent();
                            return [4 /*yield*/, storage_1.storage.getWallapopUser(product.sellerId)];
                        case 3:
                            seller = _a.sent();
                            res.json(__assign(__assign({}, product), { sellerName: (seller === null || seller === void 0 ? void 0 : seller.name) || "Unknown" }));
                            return [3 /*break*/, 5];
                        case 4:
                            error_24 = _a.sent();
                            res.status(500).json({ message: "Failed to fetch product" });
                            return [3 /*break*/, 5];
                        case 5: return [2 /*return*/];
                    }
                });
            }); });
            app.post("/api/wallapop/products", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var productData, product, error_25;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            productData = schema_1.insertWallapopProductSchema.parse(req.body);
                            return [4 /*yield*/, storage_1.storage.createWallapopProduct(productData)];
                        case 1:
                            product = _a.sent();
                            res.json(product);
                            return [3 /*break*/, 3];
                        case 2:
                            error_25 = _a.sent();
                            res.status(400).json({ message: "Invalid product data" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            // Wallapop Chat
            app.get("/api/wallapop/chats/:userId", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var userId_1, chats, chatsWithDetails, error_26;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            userId_1 = req.params.userId;
                            return [4 /*yield*/, storage_1.storage.getWallapopChats(userId_1)];
                        case 1:
                            chats = _a.sent();
                            return [4 /*yield*/, Promise.all(chats.map(function (chat) { return __awaiter(_this, void 0, void 0, function () {
                                    var product, otherUser, _a;
                                    var _b;
                                    return __generator(this, function (_c) {
                                        switch (_c.label) {
                                            case 0: return [4 /*yield*/, storage_1.storage.getWallapopProduct(chat.productId)];
                                            case 1:
                                                product = _c.sent();
                                                if (!(chat.buyerId === userId_1)) return [3 /*break*/, 3];
                                                return [4 /*yield*/, storage_1.storage.getWallapopUser(chat.sellerId)];
                                            case 2:
                                                _a = _c.sent();
                                                return [3 /*break*/, 5];
                                            case 3: return [4 /*yield*/, storage_1.storage.getWallapopUser(chat.buyerId)];
                                            case 4:
                                                _a = _c.sent();
                                                _c.label = 5;
                                            case 5:
                                                otherUser = _a;
                                                return [2 /*return*/, __assign(__assign({}, chat), { productTitle: (product === null || product === void 0 ? void 0 : product.title) || "Unknown", productImage: ((_b = product === null || product === void 0 ? void 0 : product.images) === null || _b === void 0 ? void 0 : _b[0]) || null, otherUserName: (otherUser === null || otherUser === void 0 ? void 0 : otherUser.name) || "Unknown" })];
                                        }
                                    });
                                }); }))];
                        case 2:
                            chatsWithDetails = _a.sent();
                            res.json(chatsWithDetails);
                            return [3 /*break*/, 4];
                        case 3:
                            error_26 = _a.sent();
                            res.status(500).json({ message: "Failed to fetch chats" });
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            }); });
            app.post("/api/wallapop/chats", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var _a, productId, buyerId, sellerId, chat, error_27;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            _a = req.body, productId = _a.productId, buyerId = _a.buyerId, sellerId = _a.sellerId;
                            return [4 /*yield*/, storage_1.storage.getOrCreateWallapopChat(productId, buyerId, sellerId)];
                        case 1:
                            chat = _b.sent();
                            res.json(chat);
                            return [3 /*break*/, 3];
                        case 2:
                            error_27 = _b.sent();
                            res.status(400).json({ message: "Invalid chat data" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            app.get("/api/wallapop/chats/:chatId/messages", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var chatId, messages, messagesWithSenders, error_28;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            chatId = req.params.chatId;
                            return [4 /*yield*/, storage_1.storage.getWallapopMessages(chatId)];
                        case 1:
                            messages = _a.sent();
                            return [4 /*yield*/, Promise.all(messages.map(function (message) { return __awaiter(_this, void 0, void 0, function () {
                                    var sender;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, storage_1.storage.getWallapopUser(message.senderId)];
                                            case 1:
                                                sender = _a.sent();
                                                return [2 /*return*/, __assign(__assign({}, message), { senderName: (sender === null || sender === void 0 ? void 0 : sender.name) || "Unknown" })];
                                        }
                                    });
                                }); }))];
                        case 2:
                            messagesWithSenders = _a.sent();
                            res.json(messagesWithSenders);
                            return [3 /*break*/, 4];
                        case 3:
                            error_28 = _a.sent();
                            res.status(500).json({ message: "Failed to fetch messages" });
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            }); });
            app.post("/api/wallapop/chats/:chatId/messages", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var chatId, messageData, message, error_29;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            chatId = req.params.chatId;
                            messageData = schema_1.insertWallapopMessageSchema.parse(__assign(__assign({}, req.body), { chatId: chatId }));
                            return [4 /*yield*/, storage_1.storage.createWallapopMessage(messageData)];
                        case 1:
                            message = _a.sent();
                            res.json(message);
                            return [3 /*break*/, 3];
                        case 2:
                            error_29 = _a.sent();
                            res.status(400).json({ message: "Invalid message data" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            // WhatsApp routes
            app.post("/api/whatsapp/register", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var _a, registrationCode, userData, codeVerification, validatedUserData, existingUser, user, error_30;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 5, , 6]);
                            _a = req.body, registrationCode = _a.registrationCode, userData = __rest(_a, ["registrationCode"]);
                            // Verify registration code
                            if (!registrationCode) {
                                return [2 /*return*/, res.status(400).json({ message: "Registration code is required" })];
                            }
                            return [4 /*yield*/, storage_1.storage.getRegistrationCode(registrationCode)];
                        case 1:
                            codeVerification = _b.sent();
                            if (!codeVerification) {
                                return [2 /*return*/, res.status(400).json({ message: "Invalid registration code" })];
                            }
                            if (codeVerification.isUsed) {
                                return [2 /*return*/, res.status(400).json({ message: "Registration code already used" })];
                            }
                            if (codeVerification.appType !== "whatsapp") {
                                return [2 /*return*/, res.status(400).json({ message: "Registration code not valid for WhatsApp" })];
                            }
                            if (codeVerification.expiresAt && new Date() > codeVerification.expiresAt) {
                                return [2 /*return*/, res.status(400).json({ message: "Registration code expired" })];
                            }
                            validatedUserData = schema_1.insertWhatsappUserSchema.parse(userData);
                            return [4 /*yield*/, storage_1.storage.getWhatsappUserByPhone(validatedUserData.phone)];
                        case 2:
                            existingUser = _b.sent();
                            if (existingUser) {
                                return [2 /*return*/, res.status(400).json({ message: "Phone number already registered" })];
                            }
                            return [4 /*yield*/, storage_1.storage.createWhatsappUser(validatedUserData)];
                        case 3:
                            user = _b.sent();
                            // Mark registration code as used
                            return [4 /*yield*/, storage_1.storage.markRegistrationCodeAsUsed(registrationCode, userData.phone)];
                        case 4:
                            // Mark registration code as used
                            _b.sent();
                            res.json({ user: user });
                            return [3 /*break*/, 6];
                        case 5:
                            error_30 = _b.sent();
                            res.status(400).json({ message: "Invalid user data" });
                            return [3 /*break*/, 6];
                        case 6: return [2 /*return*/];
                    }
                });
            }); });
            app.post("/api/whatsapp/login", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var phone, user, error_31;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            phone = req.body.phone;
                            return [4 /*yield*/, storage_1.storage.getWhatsappUserByPhone(phone)];
                        case 1:
                            user = _a.sent();
                            if (!user) {
                                return [2 /*return*/, res.status(404).json({ message: "Phone number not found" })];
                            }
                            res.json({ user: user });
                            return [3 /*break*/, 3];
                        case 2:
                            error_31 = _a.sent();
                            res.status(500).json({ message: "Login failed" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            app.get("/api/whatsapp/users", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var users, error_32;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, storage_1.storage.getWhatsappUsers()];
                        case 1:
                            users = _a.sent();
                            res.json(users);
                            return [3 /*break*/, 3];
                        case 2:
                            error_32 = _a.sent();
                            res.status(500).json({ message: "Failed to fetch users" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            app.post("/api/whatsapp/chats", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var chatData, chat, error_33;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            chatData = schema_1.insertWhatsappChatSchema.parse(req.body);
                            return [4 /*yield*/, storage_1.storage.createWhatsappChat(chatData)];
                        case 1:
                            chat = _a.sent();
                            res.json(chat);
                            return [3 /*break*/, 3];
                        case 2:
                            error_33 = _a.sent();
                            res.status(400).json({ message: "Invalid chat data" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            app.post("/api/whatsapp/chats/get-or-create", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var participants, chat, error_34;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            participants = req.body.participants;
                            if (!participants || !Array.isArray(participants) || participants.length !== 2) {
                                return [2 /*return*/, res.status(400).json({ message: "Must provide exactly 2 participants" })];
                            }
                            return [4 /*yield*/, storage_1.storage.getOrCreateWhatsappChat(participants)];
                        case 1:
                            chat = _a.sent();
                            res.json(chat);
                            return [3 /*break*/, 3];
                        case 2:
                            error_34 = _a.sent();
                            res.status(500).json({ message: "Failed to get or create chat" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            app.get("/api/whatsapp/chats/:phone", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var phone_1, chats, enrichedChats, error_35;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            phone_1 = req.params.phone;
                            return [4 /*yield*/, storage_1.storage.getWhatsappChatsByPhone(phone_1)];
                        case 1:
                            chats = _a.sent();
                            return [4 /*yield*/, Promise.all(chats.map(function (chat) { return __awaiter(_this, void 0, void 0, function () {
                                    var otherParticipantPhone, otherParticipant, _a, messages, latestMessage;
                                    return __generator(this, function (_b) {
                                        switch (_b.label) {
                                            case 0:
                                                otherParticipantPhone = chat.participants.find(function (p) { return p !== phone_1; });
                                                if (!otherParticipantPhone) return [3 /*break*/, 2];
                                                return [4 /*yield*/, storage_1.storage.getWhatsappUserByPhone(otherParticipantPhone)];
                                            case 1:
                                                _a = _b.sent();
                                                return [3 /*break*/, 3];
                                            case 2:
                                                _a = null;
                                                _b.label = 3;
                                            case 3:
                                                otherParticipant = _a;
                                                return [4 /*yield*/, storage_1.storage.getWhatsappMessages(chat.id)];
                                            case 4:
                                                messages = _b.sent();
                                                latestMessage = messages[messages.length - 1] || null;
                                                return [2 /*return*/, __assign(__assign({}, chat), { otherParticipant: otherParticipant, latestMessage: latestMessage, messageCount: messages.length })];
                                        }
                                    });
                                }); }))];
                        case 2:
                            enrichedChats = _a.sent();
                            res.json(enrichedChats);
                            return [3 /*break*/, 4];
                        case 3:
                            error_35 = _a.sent();
                            res.status(500).json({ message: "Failed to fetch chats" });
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            }); });
            app.post("/api/whatsapp/messages", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var messageData, message, error_36;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            messageData = schema_1.insertWhatsappMessageSchema.parse(req.body);
                            return [4 /*yield*/, storage_1.storage.createWhatsappMessage(messageData)];
                        case 1:
                            message = _a.sent();
                            res.json(message);
                            return [3 /*break*/, 3];
                        case 2:
                            error_36 = _a.sent();
                            res.status(400).json({ message: "Invalid message data" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            app.get("/api/whatsapp/messages/:chatId", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var chatId, messages, error_37;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            chatId = req.params.chatId;
                            return [4 /*yield*/, storage_1.storage.getWhatsappMessages(chatId)];
                        case 1:
                            messages = _a.sent();
                            res.json(messages);
                            return [3 /*break*/, 3];
                        case 2:
                            error_37 = _a.sent();
                            res.status(500).json({ message: "Failed to fetch messages" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            // Dark Web Routes
            app.post("/api/darkweb/register", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var _a, registrationCode, userData, codeVerification, validatedUserData, existingUser, user, error_38;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 5, , 6]);
                            _a = req.body, registrationCode = _a.registrationCode, userData = __rest(_a, ["registrationCode"]);
                            // Verify registration code
                            if (!registrationCode) {
                                return [2 /*return*/, res.status(400).json({ message: "Registration code is required" })];
                            }
                            return [4 /*yield*/, storage_1.storage.getRegistrationCode(registrationCode)];
                        case 1:
                            codeVerification = _b.sent();
                            if (!codeVerification) {
                                return [2 /*return*/, res.status(400).json({ message: "Invalid registration code" })];
                            }
                            if (codeVerification.isUsed) {
                                return [2 /*return*/, res.status(400).json({ message: "Registration code already used" })];
                            }
                            if (codeVerification.appType !== "darkweb") {
                                return [2 /*return*/, res.status(400).json({ message: "Registration code not valid for Dark Web" })];
                            }
                            if (codeVerification.expiresAt && new Date() > codeVerification.expiresAt) {
                                return [2 /*return*/, res.status(400).json({ message: "Registration code expired" })];
                            }
                            validatedUserData = schema_1.insertDarkwebUserSchema.parse(userData);
                            return [4 /*yield*/, storage_1.storage.getDarkwebUserByHandle(validatedUserData.handle)];
                        case 2:
                            existingUser = _b.sent();
                            if (existingUser) {
                                return [2 /*return*/, res.status(400).json({ message: "Handle already exists" })];
                            }
                            return [4 /*yield*/, storage_1.storage.createDarkwebUser(validatedUserData)];
                        case 3:
                            user = _b.sent();
                            // Mark registration code as used
                            return [4 /*yield*/, storage_1.storage.markRegistrationCodeAsUsed(registrationCode, userData.handle)];
                        case 4:
                            // Mark registration code as used
                            _b.sent();
                            res.json({ user: __assign(__assign({}, user), { passwordHash: undefined }) });
                            return [3 /*break*/, 6];
                        case 5:
                            error_38 = _b.sent();
                            res.status(400).json({ message: "Invalid user data" });
                            return [3 /*break*/, 6];
                        case 6: return [2 /*return*/];
                    }
                });
            }); });
            app.post("/api/darkweb/login", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var _a, handle, password, user, error_39;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            _a = req.body, handle = _a.handle, password = _a.password;
                            return [4 /*yield*/, storage_1.storage.verifyDarkwebPassword(handle, password)];
                        case 1:
                            user = _b.sent();
                            if (!user) {
                                return [2 /*return*/, res.status(401).json({ message: "Invalid credentials" })];
                            }
                            res.json({ user: __assign(__assign({}, user), { passwordHash: undefined }) });
                            return [3 /*break*/, 3];
                        case 2:
                            error_39 = _b.sent();
                            res.status(500).json({ message: "Login failed" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            app.get("/api/darkweb/channels", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var channels, error_40;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, storage_1.storage.getDarkwebChannels()];
                        case 1:
                            channels = _a.sent();
                            res.json(channels);
                            return [3 /*break*/, 3];
                        case 2:
                            error_40 = _a.sent();
                            res.status(500).json({ message: "Failed to fetch channels" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            app.post("/api/darkweb/channels", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var channelData, channel, error_41;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            channelData = schema_1.insertDarkwebChannelSchema.parse(req.body);
                            return [4 /*yield*/, storage_1.storage.createDarkwebChannel(channelData)];
                        case 1:
                            channel = _a.sent();
                            res.json(channel);
                            return [3 /*break*/, 3];
                        case 2:
                            error_41 = _a.sent();
                            res.status(400).json({ message: "Invalid channel data" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            app.get("/api/darkweb/channels/:id/messages", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var id, messages, messagesWithHandles, error_42;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            id = req.params.id;
                            return [4 /*yield*/, storage_1.storage.getDarkwebMessages(id)];
                        case 1:
                            messages = _a.sent();
                            return [4 /*yield*/, Promise.all(messages.map(function (message) { return __awaiter(_this, void 0, void 0, function () {
                                    var sender;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, storage_1.storage.getDarkwebUser(message.senderId)];
                                            case 1:
                                                sender = _a.sent();
                                                return [2 /*return*/, __assign(__assign({}, message), { senderHandle: (sender === null || sender === void 0 ? void 0 : sender.handle) || "Unknown" })];
                                        }
                                    });
                                }); }))];
                        case 2:
                            messagesWithHandles = _a.sent();
                            res.json(messagesWithHandles);
                            return [3 /*break*/, 4];
                        case 3:
                            error_42 = _a.sent();
                            res.status(500).json({ message: "Failed to fetch messages" });
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            }); });
            app.post("/api/darkweb/channels/:id/messages", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var id, messageData, message, error_43;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            id = req.params.id;
                            messageData = schema_1.insertDarkwebMessageSchema.parse(__assign(__assign({}, req.body), { channelId: id }));
                            return [4 /*yield*/, storage_1.storage.createDarkwebMessage(messageData)];
                        case 1:
                            message = _a.sent();
                            res.json(message);
                            return [3 /*break*/, 3];
                        case 2:
                            error_43 = _a.sent();
                            res.status(400).json({ message: "Invalid message data" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            // Admin routes
            app.post("/api/admin/login", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var _a, username, password, admin, error_44;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 4, , 5]);
                            _a = req.body, username = _a.username, password = _a.password;
                            return [4 /*yield*/, storage_1.storage.verifyAdminPassword(username, password)];
                        case 1:
                            admin = _b.sent();
                            if (!admin) {
                                return [2 /*return*/, res.status(401).json({ message: "Invalid credentials or admin already used" })];
                            }
                            if (!admin.isOneTimeUse) return [3 /*break*/, 3];
                            return [4 /*yield*/, storage_1.storage.markAdminUserAsUsed(admin.id)];
                        case 2:
                            _b.sent();
                            _b.label = 3;
                        case 3:
                            res.json({ admin: __assign(__assign({}, admin), { password: undefined }) });
                            return [3 /*break*/, 5];
                        case 4:
                            error_44 = _b.sent();
                            res.status(500).json({ message: "Login failed" });
                            return [3 /*break*/, 5];
                        case 5: return [2 /*return*/];
                    }
                });
            }); });
            app.post("/api/admin/codes/generate", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var _a, appType, adminId, _b, count, expiresAt, codes, i, code, codeData, createdCode, error_45;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _c.trys.push([0, 5, , 6]);
                            _a = req.body, appType = _a.appType, adminId = _a.adminId, _b = _a.count, count = _b === void 0 ? 1 : _b, expiresAt = _a.expiresAt;
                            if (!appType || !adminId) {
                                return [2 /*return*/, res.status(400).json({ message: "App type and admin ID are required" })];
                            }
                            codes = [];
                            i = 0;
                            _c.label = 1;
                        case 1:
                            if (!(i < count)) return [3 /*break*/, 4];
                            code = crypto_1.CryptoService.generateToken(8).toUpperCase();
                            codeData = schema_1.insertRegistrationCodeSchema.parse({
                                code: code,
                                appType: appType,
                                createdBy: adminId,
                                expiresAt: expiresAt ? new Date(expiresAt) : null
                            });
                            return [4 /*yield*/, storage_1.storage.createRegistrationCode(codeData)];
                        case 2:
                            createdCode = _c.sent();
                            codes.push(createdCode);
                            _c.label = 3;
                        case 3:
                            i++;
                            return [3 /*break*/, 1];
                        case 4:
                            res.json({ codes: codes });
                            return [3 /*break*/, 6];
                        case 5:
                            error_45 = _c.sent();
                            res.status(400).json({ message: "Failed to generate codes" });
                            return [3 /*break*/, 6];
                        case 6: return [2 /*return*/];
                    }
                });
            }); });
            app.get("/api/admin/codes", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var _a, adminId, appType, codes, error_46;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 5, , 6]);
                            _a = req.query, adminId = _a.adminId, appType = _a.appType;
                            codes = void 0;
                            if (!adminId) return [3 /*break*/, 2];
                            return [4 /*yield*/, storage_1.storage.getRegistrationCodesByAdmin(adminId)];
                        case 1:
                            codes = _b.sent();
                            return [3 /*break*/, 4];
                        case 2: return [4 /*yield*/, storage_1.storage.getUnusedRegistrationCodes(appType)];
                        case 3:
                            codes = _b.sent();
                            _b.label = 4;
                        case 4:
                            res.json({ codes: codes });
                            return [3 /*break*/, 6];
                        case 5:
                            error_46 = _b.sent();
                            res.status(500).json({ message: "Failed to fetch codes" });
                            return [3 /*break*/, 6];
                        case 6: return [2 /*return*/];
                    }
                });
            }); });
            app.post("/api/admin/verify-code", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var _a, code, appType, registrationCode, error_47;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            _a = req.body, code = _a.code, appType = _a.appType;
                            return [4 /*yield*/, storage_1.storage.getRegistrationCode(code)];
                        case 1:
                            registrationCode = _b.sent();
                            if (!registrationCode) {
                                return [2 /*return*/, res.status(404).json({ message: "Invalid code" })];
                            }
                            if (registrationCode.isUsed) {
                                return [2 /*return*/, res.status(400).json({ message: "Code already used" })];
                            }
                            if (registrationCode.appType !== appType) {
                                return [2 /*return*/, res.status(400).json({ message: "Code not valid for this app" })];
                            }
                            if (registrationCode.expiresAt && new Date() > registrationCode.expiresAt) {
                                return [2 /*return*/, res.status(400).json({ message: "Code expired" })];
                            }
                            res.json({ valid: true });
                            return [3 /*break*/, 3];
                        case 2:
                            error_47 = _b.sent();
                            res.status(500).json({ message: "Code verification failed" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            app.post("/api/admin/use-code", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var _a, code, usedBy, error_48;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            _a = req.body, code = _a.code, usedBy = _a.usedBy;
                            return [4 /*yield*/, storage_1.storage.markRegistrationCodeAsUsed(code, usedBy)];
                        case 1:
                            _b.sent();
                            res.json({ success: true });
                            return [3 /*break*/, 3];
                        case 2:
                            error_48 = _b.sent();
                            res.status(500).json({ message: "Failed to mark code as used" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            httpServer = createServer(app);
            return [2 /*return*/, httpServer];
        });
    });
}
export { registerRoutes };
