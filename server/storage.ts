import { 
  type InstagramUser, type InsertInstagramUser, type InstagramPost, type InsertInstagramPost,
  type InstagramComment, type InsertInstagramComment, type InstagramFollow, type InsertInstagramFollow,
  type InstagramStory, type InsertInstagramStory,
  type TinderUser, type InsertTinderUser, type TinderMatch, type InsertTinderMatch,
  type WallapopUser, type InsertWallapopUser, type WallapopProduct, type InsertWallapopProduct,
  type WallapopChat, type InsertWallapopChat, type WallapopMessage, type InsertWallapopMessage,
  type WhatsappUser, type InsertWhatsappUser, type WhatsappChat, type InsertWhatsappChat,
  type WhatsappMessage, type InsertWhatsappMessage,
  type DarkwebUser, type InsertDarkwebUser, type DarkwebChannel, type InsertDarkwebChannel,
  type DarkwebMessage, type InsertDarkwebMessage,
  type AdminUser, type InsertAdminUser, type RegistrationCode, type InsertRegistrationCode
} from "@shared/schema";
import { randomUUID } from "crypto";
import { CryptoService } from "./crypto";

export interface IStorage {
  // Instagram
  getInstagramUser(id: string): Promise<InstagramUser | undefined>;
  getInstagramUserByUsername(username: string): Promise<InstagramUser | undefined>;
  getInstagramUserByEmail(email: string): Promise<InstagramUser | undefined>;
  createInstagramUser(user: InsertInstagramUser): Promise<InstagramUser>;
  verifyInstagramPassword(email: string, password: string): Promise<InstagramUser | null>;
  getInstagramPosts(): Promise<InstagramPost[]>;
  getInstagramPostsByUser(userId: string): Promise<InstagramPost[]>;
  createInstagramPost(post: InsertInstagramPost): Promise<InstagramPost>;
  likeInstagramPost(postId: string): Promise<void>;
  createInstagramComment(comment: InsertInstagramComment): Promise<InstagramComment>;
  getInstagramComments(postId: string): Promise<InstagramComment[]>;
  followUser(followerId: string, followingId: string): Promise<InstagramFollow>;
  unfollowUser(followerId: string, followingId: string): Promise<void>;
  isFollowing(followerId: string, followingId: string): Promise<boolean>;
  getFollowers(userId: string): Promise<InstagramUser[]>;
  getFollowing(userId: string): Promise<InstagramUser[]>;
  createInstagramStory(story: InsertInstagramStory): Promise<InstagramStory>;
  getInstagramStories(): Promise<InstagramStory[]>;
  getInstagramStoriesByUser(userId: string): Promise<InstagramStory[]>;

  // Tinder
  getTinderUser(id: string): Promise<TinderUser | undefined>;
  getTinderUserByName(name: string): Promise<TinderUser | undefined>;
  createTinderUser(user: InsertTinderUser): Promise<TinderUser>;
  getTinderUsers(): Promise<TinderUser[]>;
  getPotentialMatches(userId: string): Promise<TinderUser[]>;
  createTinderMatch(match: InsertTinderMatch): Promise<TinderMatch>;
  getTinderMatches(userId: string): Promise<TinderMatch[]>;

  // Wallapop
  getWallapopUser(id: string): Promise<WallapopUser | undefined>;
  getWallapopUserByEmail(email: string): Promise<WallapopUser | undefined>;
  createWallapopUser(user: InsertWallapopUser): Promise<WallapopUser>;
  getWallapopProducts(): Promise<WallapopProduct[]>;
  getWallapopProduct(id: string): Promise<WallapopProduct | undefined>;
  createWallapopProduct(product: InsertWallapopProduct): Promise<WallapopProduct>;
  incrementProductViews(productId: string): Promise<void>;
  createWallapopChat(chat: InsertWallapopChat): Promise<WallapopChat>;
  getWallapopChats(userId: string): Promise<WallapopChat[]>;
  createWallapopMessage(message: InsertWallapopMessage): Promise<WallapopMessage>;
  getWallapopMessages(chatId: string): Promise<WallapopMessage[]>;
  getOrCreateWallapopChat(productId: string, buyerId: string, sellerId: string): Promise<WallapopChat>;

  // WhatsApp
  getWhatsappUser(id: string): Promise<WhatsappUser | undefined>;
  getWhatsappUserByPhone(phone: string): Promise<WhatsappUser | undefined>;
  createWhatsappUser(user: InsertWhatsappUser): Promise<WhatsappUser>;
  getWhatsappUsers(): Promise<WhatsappUser[]>;
  createWhatsappChat(chat: InsertWhatsappChat): Promise<WhatsappChat>;
  getWhatsappChatsByPhone(phone: string): Promise<WhatsappChat[]>;
  getOrCreateWhatsappChat(participants: string[]): Promise<WhatsappChat>;
  createWhatsappMessage(message: InsertWhatsappMessage): Promise<WhatsappMessage>;
  getWhatsappMessages(chatId: string): Promise<WhatsappMessage[]>;

  // Dark Web
  getDarkwebUser(id: string): Promise<DarkwebUser | undefined>;
  getDarkwebUserByHandle(handle: string): Promise<DarkwebUser | undefined>;
  createDarkwebUser(user: InsertDarkwebUser): Promise<DarkwebUser>;
  verifyDarkwebPassword(handle: string, password: string): Promise<DarkwebUser | null>;
  getDarkwebChannels(): Promise<DarkwebChannel[]>;
  createDarkwebChannel(channel: InsertDarkwebChannel): Promise<DarkwebChannel>;
  getDarkwebChannel(id: string): Promise<DarkwebChannel | undefined>;
  createDarkwebMessage(message: InsertDarkwebMessage): Promise<DarkwebMessage>;
  getDarkwebMessages(channelId: string): Promise<DarkwebMessage[]>;
  updateUserOnlineStatus(userId: string, isOnline: boolean): Promise<void>;

  // Admin System
  getAdminUser(id: string): Promise<AdminUser | undefined>;
  getAdminUserByUsername(username: string): Promise<AdminUser | undefined>;
  createAdminUser(user: InsertAdminUser): Promise<AdminUser>;
  verifyAdminPassword(username: string, password: string): Promise<AdminUser | null>;
  markAdminUserAsUsed(id: string): Promise<void>;
  createRegistrationCode(code: InsertRegistrationCode): Promise<RegistrationCode>;
  getRegistrationCode(code: string): Promise<RegistrationCode | undefined>;
  getRegistrationCodesByAdmin(adminId: string): Promise<RegistrationCode[]>;
  markRegistrationCodeAsUsed(code: string, usedBy: string): Promise<void>;
  getUnusedRegistrationCodes(appType?: string): Promise<RegistrationCode[]>;
}

export class MemStorage implements IStorage {
  private instagramUsers: Map<string, InstagramUser> = new Map();
  private instagramPosts: Map<string, InstagramPost> = new Map();
  private instagramComments: Map<string, InstagramComment> = new Map();
  private instagramFollows: Map<string, InstagramFollow> = new Map();
  private instagramStories: Map<string, InstagramStory> = new Map();
  private tinderUsers: Map<string, TinderUser> = new Map();
  private tinderMatches: Map<string, TinderMatch> = new Map();
  private wallapopUsers: Map<string, WallapopUser> = new Map();
  private wallapopProducts: Map<string, WallapopProduct> = new Map();
  private wallapopChats: Map<string, WallapopChat> = new Map();
  private wallapopMessages: Map<string, WallapopMessage> = new Map();
  private whatsappUsers: Map<string, WhatsappUser> = new Map();
  private whatsappChats: Map<string, WhatsappChat> = new Map();
  private whatsappMessages: Map<string, WhatsappMessage> = new Map();
  private darkwebUsers: Map<string, DarkwebUser> = new Map();
  private darkwebChannels: Map<string, DarkwebChannel> = new Map();
  private darkwebMessages: Map<string, DarkwebMessage> = new Map();
  private adminUsers: Map<string, AdminUser> = new Map();
  private registrationCodes: Map<string, RegistrationCode> = new Map();

  constructor() {
    this.initializeSampleData();
  }

  private async initializeSampleData() {
    // Add sample Instagram user and post
    const hashedAdminPassword = await CryptoService.hashPassword("admin123");
    const sampleInstagramUser: InstagramUser = {
      id: "ig-sample-1",
      username: "zona_cero_admin",
      email: "admin@zonacerop.com",
      password: hashedAdminPassword,
      fullName: "Zona Cero RP",
      bio: "Servidor oficial de roleplay 🎮",
      profileImage: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400",
      verified: true,
      createdAt: new Date()
    };
    this.instagramUsers.set(sampleInstagramUser.id, sampleInstagramUser);

    const samplePost: InstagramPost = {
      id: "post-sample-1",
      userId: sampleInstagramUser.id,
      mediaUrls: ["https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400"],
      mediaType: "image",
      caption: "¡Bienvenidos al servidor Zona Cero RP! 🎮",
      likes: 42,
      commentsCount: 3,
      location: "Los Santos",
      createdAt: new Date()
    };
    this.instagramPosts.set(samplePost.id, samplePost);

    // No sample Tinder users - users must register

    // Add sample Wallapop user and product
    const sampleWallapopUser: WallapopUser = {
      id: "wallapop-sample-1",
      name: "Carlos_ZCR",
      email: "carlos@zonacerop.com",
      location: "Los Santos",
      rating: 5,
      createdAt: new Date()
    };
    this.wallapopUsers.set(sampleWallapopUser.id, sampleWallapopUser);

    const sampleProduct: WallapopProduct = {
      id: "product-sample-1",
      sellerId: sampleWallapopUser.id,
      title: "Coche deportivo (RP)",
      description: "Vendo mi coche deportivo en perfecto estado para roleplay",
      price: 5000000, // 50000 euros in cents
      category: "Vehículos",
      condition: "Excelente",
      images: ["https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400"],
      location: "Los Santos",
      views: 0,
      sold: false,
      createdAt: new Date()
    };
    this.wallapopProducts.set(sampleProduct.id, sampleProduct);

    // Add sample Dark Web data
    const hashedDarkwebPassword = await CryptoService.hashPassword("darkpassword123");
    const sampleDarkwebUser: DarkwebUser = {
      id: "darkweb-sample-1",
      handle: "Shadow_Admin",
      passwordHash: hashedDarkwebPassword,
      reputation: 100,
      isOnline: true,
      lastSeen: new Date(),
      createdAt: new Date()
    };
    this.darkwebUsers.set(sampleDarkwebUser.id, sampleDarkwebUser);

    const sampleDarkwebChannel: DarkwebChannel = {
      id: "channel-sample-1",
      name: "general",
      description: "Canal general para discusiones anónimas",
      isPrivate: false,
      accessCode: null,
      createdBy: sampleDarkwebUser.id,
      createdAt: new Date()
    };
    this.darkwebChannels.set(sampleDarkwebChannel.id, sampleDarkwebChannel);

    const privateDarkwebChannel: DarkwebChannel = {
      id: "channel-sample-2",
      name: "zona-cero-secrets",
      description: "Canal privado para información clasificada del servidor",
      isPrivate: true,
      accessCode: "ZCRRP2025",
      createdBy: sampleDarkwebUser.id,
      createdAt: new Date()
    };
    this.darkwebChannels.set(privateDarkwebChannel.id, privateDarkwebChannel);

    const sampleDarkwebMessage: DarkwebMessage = {
      id: "darkmsg-sample-1",
      channelId: sampleDarkwebChannel.id,
      senderId: sampleDarkwebUser.id,
      content: "Bienvenidos a la red anónima de Zona Cero RP. Aquí pueden compartir información de forma segura.",
      messageType: "text",
      isEncrypted: false,
      replyToId: null,
      sentAt: new Date()
    };
    this.darkwebMessages.set(sampleDarkwebMessage.id, sampleDarkwebMessage);

    // Add initial admin user (one-time use)
    const hashedInitialAdminPassword = await CryptoService.hashPassword("admin2025!");
    const initialAdminUser: AdminUser = {
      id: "admin-initial-1",
      username: "admin_inicial",
      password: hashedInitialAdminPassword,
      isOneTimeUse: true,
      isUsed: false,
      createdAt: new Date(),
      usedAt: null
    };
    this.adminUsers.set(initialAdminUser.id, initialAdminUser);
  }

  // Instagram methods
  async getInstagramUser(id: string): Promise<InstagramUser | undefined> {
    return this.instagramUsers.get(id);
  }

  async getInstagramUserByUsername(username: string): Promise<InstagramUser | undefined> {
    return Array.from(this.instagramUsers.values()).find(user => user.username === username);
  }

  async getInstagramUserByEmail(email: string): Promise<InstagramUser | undefined> {
    return Array.from(this.instagramUsers.values()).find(user => user.email === email);
  }

  async createInstagramUser(insertUser: InsertInstagramUser): Promise<InstagramUser> {
    const id = randomUUID();
    const hashedPassword = await CryptoService.hashPassword(insertUser.password);
    const user: InstagramUser = {
      ...insertUser,
      id,
      password: hashedPassword,
      verified: false,
      createdAt: new Date()
    };
    this.instagramUsers.set(id, user);
    return user;
  }

  async verifyInstagramPassword(email: string, password: string): Promise<InstagramUser | null> {
    const user = await this.getInstagramUserByEmail(email);
    if (!user) return null;
    
    const isValid = await CryptoService.verifyPassword(password, user.password);
    return isValid ? user : null;
  }

  async getInstagramPosts(): Promise<InstagramPost[]> {
    return Array.from(this.instagramPosts.values()).sort((a, b) => 
      new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
    );
  }

  async getInstagramPostsByUser(userId: string): Promise<InstagramPost[]> {
    return Array.from(this.instagramPosts.values())
      .filter(post => post.userId === userId)
      .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  }

  async createInstagramPost(insertPost: InsertInstagramPost): Promise<InstagramPost> {
    const id = randomUUID();
    const post: InstagramPost = {
      ...insertPost,
      id,
      likes: 0,
      commentsCount: 0,
      createdAt: new Date()
    };
    this.instagramPosts.set(id, post);
    return post;
  }

  async likeInstagramPost(postId: string): Promise<void> {
    const post = this.instagramPosts.get(postId);
    if (post) {
      post.likes = (post.likes || 0) + 1;
      this.instagramPosts.set(postId, post);
    }
  }

  async createInstagramComment(insertComment: InsertInstagramComment): Promise<InstagramComment> {
    const id = randomUUID();
    const comment: InstagramComment = {
      ...insertComment,
      id,
      createdAt: new Date()
    };
    this.instagramComments.set(id, comment);
    
    // Increment comment count on post
    const post = this.instagramPosts.get(insertComment.postId);
    if (post) {
      post.commentsCount = (post.commentsCount || 0) + 1;
      this.instagramPosts.set(insertComment.postId, post);
    }
    
    return comment;
  }

  async getInstagramComments(postId: string): Promise<InstagramComment[]> {
    return Array.from(this.instagramComments.values())
      .filter(comment => comment.postId === postId)
      .sort((a, b) => new Date(a.createdAt!).getTime() - new Date(b.createdAt!).getTime());
  }

  async followUser(followerId: string, followingId: string): Promise<InstagramFollow> {
    const id = randomUUID();
    const follow: InstagramFollow = {
      id,
      followerId,
      followingId,
      createdAt: new Date()
    };
    this.instagramFollows.set(id, follow);
    return follow;
  }

  async unfollowUser(followerId: string, followingId: string): Promise<void> {
    const follow = Array.from(this.instagramFollows.values())
      .find(f => f.followerId === followerId && f.followingId === followingId);
    if (follow) {
      this.instagramFollows.delete(follow.id);
    }
  }

  async isFollowing(followerId: string, followingId: string): Promise<boolean> {
    return Array.from(this.instagramFollows.values())
      .some(f => f.followerId === followerId && f.followingId === followingId);
  }

  async getFollowers(userId: string): Promise<InstagramUser[]> {
    const followerIds = Array.from(this.instagramFollows.values())
      .filter(f => f.followingId === userId)
      .map(f => f.followerId);
    
    return followerIds.map(id => this.instagramUsers.get(id)).filter(Boolean) as InstagramUser[];
  }

  async getFollowing(userId: string): Promise<InstagramUser[]> {
    const followingIds = Array.from(this.instagramFollows.values())
      .filter(f => f.followerId === userId)
      .map(f => f.followingId);
    
    return followingIds.map(id => this.instagramUsers.get(id)).filter(Boolean) as InstagramUser[];
  }

  async createInstagramStory(insertStory: InsertInstagramStory): Promise<InstagramStory> {
    const id = randomUUID();
    const story: InstagramStory = {
      ...insertStory,
      id,
      createdAt: new Date()
    };
    this.instagramStories.set(id, story);
    return story;
  }

  async getInstagramStories(): Promise<InstagramStory[]> {
    const now = new Date();
    // Filter out expired stories
    const activeStories = Array.from(this.instagramStories.values())
      .filter(story => new Date(story.expiresAt) > now);
    
    // Clean up expired stories
    Array.from(this.instagramStories.values())
      .filter(story => new Date(story.expiresAt) <= now)
      .forEach(story => this.instagramStories.delete(story.id));
    
    return activeStories.sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  }

  async getInstagramStoriesByUser(userId: string): Promise<InstagramStory[]> {
    const now = new Date();
    return Array.from(this.instagramStories.values())
      .filter(story => story.userId === userId && new Date(story.expiresAt) > now)
      .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  }

  // Tinder methods
  async getTinderUser(id: string): Promise<TinderUser | undefined> {
    return this.tinderUsers.get(id);
  }

  async getTinderUserByName(name: string): Promise<TinderUser | undefined> {
    return Array.from(this.tinderUsers.values()).find(user => user.name === name);
  }

  async createTinderUser(insertUser: InsertTinderUser): Promise<TinderUser> {
    const id = randomUUID();
    const user: TinderUser = {
      ...insertUser,
      id,
      photos: insertUser.photos || [],
      interests: insertUser.interests || [],
      createdAt: new Date()
    };
    this.tinderUsers.set(id, user);
    return user;
  }

  async getTinderUsers(): Promise<TinderUser[]> {
    return Array.from(this.tinderUsers.values());
  }

  async getPotentialMatches(userId: string): Promise<TinderUser[]> {
    const userMatches = Array.from(this.tinderMatches.values())
      .filter(match => match.user1Id === userId || match.user2Id === userId);
    
    const matchedUserIds = userMatches.map(match => 
      match.user1Id === userId ? match.user2Id : match.user1Id
    );

    return Array.from(this.tinderUsers.values())
      .filter(user => user.id !== userId && !matchedUserIds.includes(user.id));
  }

  async createTinderMatch(insertMatch: InsertTinderMatch): Promise<TinderMatch> {
    const id = randomUUID();
    const match: TinderMatch = {
      ...insertMatch,
      id,
      isMatch: false,
      swipedAt: new Date()
    };
    this.tinderMatches.set(id, match);
    return match;
  }

  async getTinderMatches(userId: string): Promise<TinderMatch[]> {
    return Array.from(this.tinderMatches.values())
      .filter(match => (match.user1Id === userId || match.user2Id === userId) && match.isMatch);
  }

  // Wallapop methods
  async getWallapopUser(id: string): Promise<WallapopUser | undefined> {
    return this.wallapopUsers.get(id);
  }

  async getWallapopUserByEmail(email: string): Promise<WallapopUser | undefined> {
    return Array.from(this.wallapopUsers.values()).find(user => user.email === email);
  }

  async createWallapopUser(insertUser: InsertWallapopUser): Promise<WallapopUser> {
    const id = randomUUID();
    const user: WallapopUser = {
      ...insertUser,
      id,
      rating: 5,
      createdAt: new Date()
    };
    this.wallapopUsers.set(id, user);
    return user;
  }

  async getWallapopProducts(): Promise<WallapopProduct[]> {
    return Array.from(this.wallapopProducts.values())
      .filter(product => !product.sold)
      .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  }

  async getWallapopProduct(id: string): Promise<WallapopProduct | undefined> {
    return this.wallapopProducts.get(id);
  }

  async createWallapopProduct(insertProduct: InsertWallapopProduct): Promise<WallapopProduct> {
    const id = randomUUID();
    const product: WallapopProduct = {
      ...insertProduct,
      id,
      images: insertProduct.images || [],
      views: 0,
      sold: false,
      createdAt: new Date()
    };
    this.wallapopProducts.set(id, product);
    return product;
  }

  async incrementProductViews(productId: string): Promise<void> {
    const product = this.wallapopProducts.get(productId);
    if (product) {
      product.views = (product.views || 0) + 1;
      this.wallapopProducts.set(productId, product);
    }
  }

  async createWallapopChat(insertChat: InsertWallapopChat): Promise<WallapopChat> {
    const id = randomUUID();
    const chat: WallapopChat = {
      ...insertChat,
      id,
      lastMessage: null,
      lastMessageAt: new Date(),
      createdAt: new Date()
    };
    this.wallapopChats.set(id, chat);
    return chat;
  }

  async getWallapopChats(userId: string): Promise<WallapopChat[]> {
    return Array.from(this.wallapopChats.values())
      .filter(chat => chat.buyerId === userId || chat.sellerId === userId)
      .sort((a, b) => new Date(b.lastMessageAt!).getTime() - new Date(a.lastMessageAt!).getTime());
  }

  async createWallapopMessage(insertMessage: InsertWallapopMessage): Promise<WallapopMessage> {
    const id = randomUUID();
    const message: WallapopMessage = {
      ...insertMessage,
      id,
      isRead: false,
      createdAt: new Date()
    };
    this.wallapopMessages.set(id, message);
    
    // Update last message in chat
    const chat = this.wallapopChats.get(insertMessage.chatId);
    if (chat) {
      chat.lastMessage = insertMessage.content;
      chat.lastMessageAt = new Date();
      this.wallapopChats.set(insertMessage.chatId, chat);
    }
    
    return message;
  }

  async getWallapopMessages(chatId: string): Promise<WallapopMessage[]> {
    return Array.from(this.wallapopMessages.values())
      .filter(message => message.chatId === chatId)
      .sort((a, b) => new Date(a.createdAt!).getTime() - new Date(b.createdAt!).getTime());
  }

  async getOrCreateWallapopChat(productId: string, buyerId: string, sellerId: string): Promise<WallapopChat> {
    // Check if chat already exists for this product and buyer
    const existingChat = Array.from(this.wallapopChats.values())
      .find(chat => chat.productId === productId && chat.buyerId === buyerId);
    
    if (existingChat) {
      return existingChat;
    }
    
    // Create new chat
    return this.createWallapopChat({
      productId,
      buyerId,
      sellerId
    });
  }

  // WhatsApp methods
  async getWhatsappUser(id: string): Promise<WhatsappUser | undefined> {
    return this.whatsappUsers.get(id);
  }

  async getWhatsappUserByPhone(phone: string): Promise<WhatsappUser | undefined> {
    return Array.from(this.whatsappUsers.values()).find(user => user.phone === phone);
  }

  async createWhatsappUser(insertUser: InsertWhatsappUser): Promise<WhatsappUser> {
    const id = randomUUID();
    const user: WhatsappUser = {
      ...insertUser,
      id,
      status: insertUser.status || "Hey there! I am using WhatsApp.",
      lastSeen: new Date(),
      createdAt: new Date()
    };
    this.whatsappUsers.set(id, user);
    return user;
  }

  async getWhatsappUsers(): Promise<WhatsappUser[]> {
    return Array.from(this.whatsappUsers.values());
  }

  async createWhatsappChat(insertChat: InsertWhatsappChat): Promise<WhatsappChat> {
    const id = randomUUID();
    const chat: WhatsappChat = {
      ...insertChat,
      id,
      createdAt: new Date()
    };
    this.whatsappChats.set(id, chat);
    return chat;
  }

  async getWhatsappChatsByPhone(phone: string): Promise<WhatsappChat[]> {
    return Array.from(this.whatsappChats.values())
      .filter(chat => chat.participants.includes(phone));
  }

  async getOrCreateWhatsappChat(participants: string[]): Promise<WhatsappChat> {
    // Sort participants to ensure consistent chat lookup
    const sortedParticipants = participants.sort();
    
    // Find existing chat with same participants
    const existingChat = Array.from(this.whatsappChats.values())
      .find(chat => {
        const sortedChatParticipants = [...chat.participants].sort();
        return JSON.stringify(sortedChatParticipants) === JSON.stringify(sortedParticipants);
      });
    
    if (existingChat) {
      return existingChat;
    }
    
    // Create new chat
    return this.createWhatsappChat({ participants });
  }

  async createWhatsappMessage(insertMessage: InsertWhatsappMessage): Promise<WhatsappMessage> {
    const id = randomUUID();
    const message: WhatsappMessage = {
      ...insertMessage,
      id,
      messageType: insertMessage.messageType || "text",
      sentAt: new Date()
    };
    this.whatsappMessages.set(id, message);
    return message;
  }

  async getWhatsappMessages(chatId: string): Promise<WhatsappMessage[]> {
    return Array.from(this.whatsappMessages.values())
      .filter(message => message.chatId === chatId)
      .sort((a, b) => new Date(a.sentAt!).getTime() - new Date(b.sentAt!).getTime());
  }

  // Dark Web methods
  async getDarkwebUser(id: string): Promise<DarkwebUser | undefined> {
    return this.darkwebUsers.get(id);
  }

  async getDarkwebUserByHandle(handle: string): Promise<DarkwebUser | undefined> {
    return Array.from(this.darkwebUsers.values()).find(user => user.handle === handle);
  }

  async createDarkwebUser(insertUser: InsertDarkwebUser): Promise<DarkwebUser> {
    const id = randomUUID();
    const hashedPassword = await CryptoService.hashPassword(insertUser.passwordHash);
    const user: DarkwebUser = {
      ...insertUser,
      id,
      passwordHash: hashedPassword,
      reputation: 0,
      isOnline: true,
      lastSeen: new Date(),
      createdAt: new Date()
    };
    this.darkwebUsers.set(id, user);
    return user;
  }

  async verifyDarkwebPassword(handle: string, password: string): Promise<DarkwebUser | null> {
    const user = await this.getDarkwebUserByHandle(handle);
    if (!user) return null;
    
    const isValid = await CryptoService.verifyPassword(password, user.passwordHash);
    if (isValid) {
      // Update last seen and online status
      user.lastSeen = new Date();
      user.isOnline = true;
      this.darkwebUsers.set(user.id, user);
      return user;
    }
    return null;
  }

  async getDarkwebChannels(): Promise<DarkwebChannel[]> {
    return Array.from(this.darkwebChannels.values())
      .filter(channel => !channel.isPrivate || !channel.accessCode)
      .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  }

  async createDarkwebChannel(insertChannel: InsertDarkwebChannel): Promise<DarkwebChannel> {
    const id = randomUUID();
    const channel: DarkwebChannel = {
      ...insertChannel,
      id,
      createdAt: new Date()
    };
    this.darkwebChannels.set(id, channel);
    return channel;
  }

  async getDarkwebChannel(id: string): Promise<DarkwebChannel | undefined> {
    return this.darkwebChannels.get(id);
  }

  async createDarkwebMessage(insertMessage: InsertDarkwebMessage): Promise<DarkwebMessage> {
    const id = randomUUID();
    const message: DarkwebMessage = {
      ...insertMessage,
      id,
      sentAt: new Date()
    };
    this.darkwebMessages.set(id, message);
    return message;
  }

  async getDarkwebMessages(channelId: string): Promise<DarkwebMessage[]> {
    return Array.from(this.darkwebMessages.values())
      .filter(message => message.channelId === channelId)
      .sort((a, b) => new Date(a.sentAt!).getTime() - new Date(b.sentAt!).getTime());
  }

  async updateUserOnlineStatus(userId: string, isOnline: boolean): Promise<void> {
    const user = this.darkwebUsers.get(userId);
    if (user) {
      user.isOnline = isOnline;
      user.lastSeen = new Date();
      this.darkwebUsers.set(userId, user);
    }
  }

  // Admin System Implementation
  async getAdminUser(id: string): Promise<AdminUser | undefined> {
    return this.adminUsers.get(id);
  }

  async getAdminUserByUsername(username: string): Promise<AdminUser | undefined> {
    return Array.from(this.adminUsers.values()).find(user => user.username === username);
  }

  async createAdminUser(insertUser: InsertAdminUser): Promise<AdminUser> {
    const id = randomUUID();
    const hashedPassword = await CryptoService.hashPassword(insertUser.password);
    const user: AdminUser = {
      ...insertUser,
      id,
      password: hashedPassword,
      createdAt: new Date(),
      usedAt: null
    };
    this.adminUsers.set(id, user);
    return user;
  }

  async verifyAdminPassword(username: string, password: string): Promise<AdminUser | null> {
    const user = await this.getAdminUserByUsername(username);
    if (!user) return null;
    
    // Check if it's a one-time use admin that's already been used
    if (user.isOneTimeUse && user.isUsed) {
      return null;
    }

    const isValid = await CryptoService.verifyPassword(password, user.password);
    if (isValid) {
      return user;
    }
    return null;
  }

  async markAdminUserAsUsed(id: string): Promise<void> {
    const user = this.adminUsers.get(id);
    if (user && user.isOneTimeUse) {
      user.isUsed = true;
      user.usedAt = new Date();
      this.adminUsers.set(id, user);
    }
  }

  async createRegistrationCode(insertCode: InsertRegistrationCode): Promise<RegistrationCode> {
    const id = randomUUID();
    const code: RegistrationCode = {
      ...insertCode,
      id,
      createdAt: new Date(),
      usedAt: null
    };
    this.registrationCodes.set(insertCode.code, code);
    return code;
  }

  async getRegistrationCode(code: string): Promise<RegistrationCode | undefined> {
    return this.registrationCodes.get(code);
  }

  async getRegistrationCodesByAdmin(adminId: string): Promise<RegistrationCode[]> {
    return Array.from(this.registrationCodes.values())
      .filter(code => code.createdBy === adminId)
      .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  }

  async markRegistrationCodeAsUsed(code: string, usedBy: string): Promise<void> {
    const regCode = this.registrationCodes.get(code);
    if (regCode && !regCode.isUsed) {
      regCode.isUsed = true;
      regCode.usedBy = usedBy;
      regCode.usedAt = new Date();
      this.registrationCodes.set(code, regCode);
    }
  }

  async getUnusedRegistrationCodes(appType?: string): Promise<RegistrationCode[]> {
    return Array.from(this.registrationCodes.values())
      .filter(code => !code.isUsed && (!appType || code.appType === appType))
      .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  }
}

export const storage = new MemStorage();
