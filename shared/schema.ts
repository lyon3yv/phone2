import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Instagram Users
export const instagramUsers = pgTable("instagram_users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  fullName: text("full_name"),
  bio: text("bio"),
  profileImage: text("profile_image"),
  verified: boolean("verified").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const instagramPosts = pgTable("instagram_posts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => instagramUsers.id).notNull(),
  mediaUrls: jsonb("media_urls").$type<string[]>().notNull(),
  mediaType: text("media_type").default("image"), // 'image' or 'video'
  caption: text("caption"),
  likes: integer("likes").default(0),
  commentsCount: integer("comments_count").default(0),
  location: text("location"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const instagramComments = pgTable("instagram_comments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  postId: varchar("post_id").references(() => instagramPosts.id).notNull(),
  userId: varchar("user_id").references(() => instagramUsers.id).notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const instagramFollows = pgTable("instagram_follows", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  followerId: varchar("follower_id").references(() => instagramUsers.id).notNull(),
  followingId: varchar("following_id").references(() => instagramUsers.id).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const instagramStories = pgTable("instagram_stories", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => instagramUsers.id).notNull(),
  mediaUrl: text("media_url").notNull(),
  mediaType: text("media_type").default("image"),
  caption: text("caption"),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Tinder Users
export const tinderUsers = pgTable("tinder_users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  age: integer("age").notNull(),
  bio: text("bio"),
  photos: jsonb("photos").$type<string[]>().default([]),
  interests: jsonb("interests").$type<string[]>().default([]),
  location: text("location"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const tinderMatches = pgTable("tinder_matches", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  user1Id: varchar("user1_id").references(() => tinderUsers.id).notNull(),
  user2Id: varchar("user2_id").references(() => tinderUsers.id).notNull(),
  isMatch: boolean("is_match").default(false),
  swipedAt: timestamp("swiped_at").defaultNow(),
});

// Wallapop Users  
export const wallapopUsers = pgTable("wallapop_users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  location: text("location").notNull(),
  rating: integer("rating").default(5),
  createdAt: timestamp("created_at").defaultNow(),
});

export const wallapopProducts = pgTable("wallapop_products", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sellerId: varchar("seller_id").references(() => wallapopUsers.id).notNull(),
  title: text("title").notNull(),
  description: text("description"),
  price: integer("price").notNull(), // in cents
  category: text("category"),
  condition: text("condition"),
  images: jsonb("images").$type<string[]>().default([]),
  location: text("location"),
  views: integer("views").default(0),
  sold: boolean("sold").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const wallapopChats = pgTable("wallapop_chats", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  productId: varchar("product_id").references(() => wallapopProducts.id).notNull(),
  buyerId: varchar("buyer_id").references(() => wallapopUsers.id).notNull(),
  sellerId: varchar("seller_id").references(() => wallapopUsers.id).notNull(),
  lastMessage: text("last_message"),
  lastMessageAt: timestamp("last_message_at").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const wallapopMessages = pgTable("wallapop_messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  chatId: varchar("chat_id").references(() => wallapopChats.id).notNull(),
  senderId: varchar("sender_id").references(() => wallapopUsers.id).notNull(),
  content: text("content").notNull(),
  isRead: boolean("is_read").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// WhatsApp Users
export const whatsappUsers = pgTable("whatsapp_users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  phone: text("phone").notNull().unique(),
  name: text("name").notNull(),
  profileImage: text("profile_image"),
  status: text("status").default("Hey there! I am using WhatsApp."),
  lastSeen: timestamp("last_seen").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const whatsappChats = pgTable("whatsapp_chats", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  participants: jsonb("participants").$type<string[]>().notNull(), // phone numbers
  createdAt: timestamp("created_at").defaultNow(),
});

export const whatsappMessages = pgTable("whatsapp_messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  chatId: varchar("chat_id").references(() => whatsappChats.id).notNull(),
  senderPhone: text("sender_phone").notNull(),
  content: text("content").notNull(),
  messageType: text("message_type").default("text"), // text, image, etc
  sentAt: timestamp("sent_at").defaultNow(),
});

// Dark Web Anonymous Messaging
export const darkwebUsers = pgTable("darkweb_users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  handle: text("handle").notNull().unique(), // Anonymous handle like "AnonymousUser123"
  passwordHash: text("password_hash").notNull(),
  reputation: integer("reputation").default(0),
  isOnline: boolean("is_online").default(false),
  lastSeen: timestamp("last_seen").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const darkwebChannels = pgTable("darkweb_channels", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description"),
  isPrivate: boolean("is_private").default(false),
  accessCode: text("access_code"), // For private channels
  createdBy: varchar("created_by").references(() => darkwebUsers.id).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const darkwebMessages = pgTable("darkweb_messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  channelId: varchar("channel_id").references(() => darkwebChannels.id).notNull(),
  senderId: varchar("sender_id").references(() => darkwebUsers.id).notNull(),
  content: text("content").notNull(),
  messageType: text("message_type").default("text"), // text, encrypted, image
  isEncrypted: boolean("is_encrypted").default(false),
  replyToId: varchar("reply_to_id").references(() => darkwebMessages.id),
  sentAt: timestamp("sent_at").defaultNow(),
});

// Admin System
export const adminUsers = pgTable("admin_users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  isOneTimeUse: boolean("is_one_time_use").default(true),
  isUsed: boolean("is_used").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  usedAt: timestamp("used_at"),
});

export const registrationCodes = pgTable("registration_codes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  code: text("code").notNull().unique(),
  isUsed: boolean("is_used").default(false),
  usedBy: text("used_by"),
  appType: text("app_type").notNull(), // 'instagram', 'tinder', 'wallapop', 'whatsapp', 'darkweb'
  createdBy: varchar("created_by").references(() => adminUsers.id).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  usedAt: timestamp("used_at"),
  expiresAt: timestamp("expires_at"),
});

// Insert schemas
export const insertInstagramUserSchema = createInsertSchema(instagramUsers).omit({ id: true, createdAt: true });
export const insertInstagramPostSchema = createInsertSchema(instagramPosts).omit({ id: true, likes: true, commentsCount: true, createdAt: true });
export const insertInstagramCommentSchema = createInsertSchema(instagramComments).omit({ id: true, createdAt: true });
export const insertInstagramFollowSchema = createInsertSchema(instagramFollows).omit({ id: true, createdAt: true });
export const insertInstagramStorySchema = createInsertSchema(instagramStories).omit({ id: true, createdAt: true });
export const insertTinderUserSchema = createInsertSchema(tinderUsers).omit({ id: true, createdAt: true });
export const insertTinderMatchSchema = createInsertSchema(tinderMatches).omit({ id: true, swipedAt: true });
export const insertWallapopUserSchema = createInsertSchema(wallapopUsers).omit({ id: true, rating: true, createdAt: true });
export const insertWallapopProductSchema = createInsertSchema(wallapopProducts).omit({ id: true, views: true, sold: true, createdAt: true });
export const insertWallapopChatSchema = createInsertSchema(wallapopChats).omit({ id: true, lastMessage: true, lastMessageAt: true, createdAt: true });
export const insertWallapopMessageSchema = createInsertSchema(wallapopMessages).omit({ id: true, isRead: true, createdAt: true });
export const insertWhatsappUserSchema = createInsertSchema(whatsappUsers).omit({ id: true, lastSeen: true, createdAt: true });
export const insertWhatsappChatSchema = createInsertSchema(whatsappChats).omit({ id: true, createdAt: true });
export const insertWhatsappMessageSchema = createInsertSchema(whatsappMessages).omit({ id: true, sentAt: true });
export const insertDarkwebUserSchema = createInsertSchema(darkwebUsers).omit({ id: true, reputation: true, isOnline: true, lastSeen: true, createdAt: true });
export const insertDarkwebChannelSchema = createInsertSchema(darkwebChannels).omit({ id: true, createdAt: true });
export const insertDarkwebMessageSchema = createInsertSchema(darkwebMessages).omit({ id: true, sentAt: true });
export const insertAdminUserSchema = createInsertSchema(adminUsers).omit({ id: true, createdAt: true, usedAt: true });
export const insertRegistrationCodeSchema = createInsertSchema(registrationCodes).omit({ id: true, createdAt: true, usedAt: true });

// Types
export type InstagramUser = typeof instagramUsers.$inferSelect;
export type InsertInstagramUser = z.infer<typeof insertInstagramUserSchema>;
export type InstagramPost = typeof instagramPosts.$inferSelect;
export type InsertInstagramPost = z.infer<typeof insertInstagramPostSchema>;
export type InstagramComment = typeof instagramComments.$inferSelect;
export type InsertInstagramComment = z.infer<typeof insertInstagramCommentSchema>;
export type InstagramFollow = typeof instagramFollows.$inferSelect;
export type InsertInstagramFollow = z.infer<typeof insertInstagramFollowSchema>;
export type InstagramStory = typeof instagramStories.$inferSelect;
export type InsertInstagramStory = z.infer<typeof insertInstagramStorySchema>;

export type TinderUser = typeof tinderUsers.$inferSelect;
export type InsertTinderUser = z.infer<typeof insertTinderUserSchema>;
export type TinderMatch = typeof tinderMatches.$inferSelect;
export type InsertTinderMatch = z.infer<typeof insertTinderMatchSchema>;

export type WallapopUser = typeof wallapopUsers.$inferSelect;
export type InsertWallapopUser = z.infer<typeof insertWallapopUserSchema>;
export type WallapopProduct = typeof wallapopProducts.$inferSelect;
export type InsertWallapopProduct = z.infer<typeof insertWallapopProductSchema>;
export type WallapopChat = typeof wallapopChats.$inferSelect;
export type InsertWallapopChat = z.infer<typeof insertWallapopChatSchema>;
export type WallapopMessage = typeof wallapopMessages.$inferSelect;
export type InsertWallapopMessage = z.infer<typeof insertWallapopMessageSchema>;

export type WhatsappUser = typeof whatsappUsers.$inferSelect;
export type InsertWhatsappUser = z.infer<typeof insertWhatsappUserSchema>;
export type WhatsappChat = typeof whatsappChats.$inferSelect;
export type InsertWhatsappChat = z.infer<typeof insertWhatsappChatSchema>;
export type WhatsappMessage = typeof whatsappMessages.$inferSelect;
export type InsertWhatsappMessage = z.infer<typeof insertWhatsappMessageSchema>;

export type DarkwebUser = typeof darkwebUsers.$inferSelect;
export type InsertDarkwebUser = z.infer<typeof insertDarkwebUserSchema>;
export type DarkwebChannel = typeof darkwebChannels.$inferSelect;
export type InsertDarkwebChannel = z.infer<typeof insertDarkwebChannelSchema>;
export type DarkwebMessage = typeof darkwebMessages.$inferSelect;
export type InsertDarkwebMessage = z.infer<typeof insertDarkwebMessageSchema>;

export type AdminUser = typeof adminUsers.$inferSelect;
export type InsertAdminUser = z.infer<typeof insertAdminUserSchema>;
export type RegistrationCode = typeof registrationCodes.$inferSelect;
export type InsertRegistrationCode = z.infer<typeof insertRegistrationCodeSchema>;
