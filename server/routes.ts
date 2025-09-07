import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertInstagramUserSchema, insertInstagramPostSchema, insertInstagramCommentSchema, 
  insertInstagramFollowSchema, insertInstagramStorySchema,
  insertTinderUserSchema, insertTinderMatchSchema,
  insertWallapopUserSchema, insertWallapopProductSchema, insertWallapopChatSchema, insertWallapopMessageSchema,
  insertWhatsappUserSchema, insertWhatsappChatSchema, insertWhatsappMessageSchema,
  insertDarkwebUserSchema, insertDarkwebChannelSchema, insertDarkwebMessageSchema
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Instagram routes
  app.post("/api/instagram/register", async (req, res) => {
    try {
      const userData = insertInstagramUserSchema.parse(req.body);
      
      // Check if username or email already exists
      const existingUsername = await storage.getInstagramUserByUsername(userData.username);
      const existingEmail = await storage.getInstagramUserByEmail(userData.email);
      
      if (existingUsername) {
        return res.status(400).json({ message: "Username already exists" });
      }
      
      if (existingEmail) {
        return res.status(400).json({ message: "Email already exists" });
      }

      const user = await storage.createInstagramUser(userData);
      res.json({ user: { ...user, password: undefined } });
    } catch (error) {
      res.status(400).json({ message: "Invalid user data" });
    }
  });

  app.post("/api/instagram/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      const user = await storage.getInstagramUserByUsername(username) || 
                   await storage.getInstagramUserByEmail(username);
      
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      const isValidPassword = await storage.verifyInstagramPassword(user.email, password);
      if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      res.json({ user: { ...user, password: undefined } });
    } catch (error) {
      res.status(500).json({ message: "Login failed" });
    }
  });

  app.get("/api/instagram/posts", async (req, res) => {
    try {
      const posts = await storage.getInstagramPosts();
      const postsWithUsernames = await Promise.all(
        posts.map(async (post) => {
          const user = await storage.getInstagramUser(post.userId);
          return {
            ...post,
            username: user?.username || "unknown"
          };
        })
      );
      res.json(postsWithUsernames);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch posts" });
    }
  });

  app.post("/api/instagram/posts", async (req, res) => {
    try {
      const postData = insertInstagramPostSchema.parse(req.body);
      const post = await storage.createInstagramPost(postData);
      res.json(post);
    } catch (error) {
      res.status(400).json({ message: "Invalid post data" });
    }
  });

  app.post("/api/instagram/posts/:id/like", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.likeInstagramPost(id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Failed to like post" });
    }
  });

  // Instagram Comments
  app.get("/api/instagram/posts/:id/comments", async (req, res) => {
    try {
      const { id } = req.params;
      const comments = await storage.getInstagramComments(id);
      const commentsWithUsernames = await Promise.all(
        comments.map(async (comment) => {
          const user = await storage.getInstagramUser(comment.userId);
          return {
            ...comment,
            username: user?.username || "unknown"
          };
        })
      );
      res.json(commentsWithUsernames);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch comments" });
    }
  });

  app.post("/api/instagram/posts/:id/comments", async (req, res) => {
    try {
      const { id } = req.params;
      const commentData = insertInstagramCommentSchema.parse({
        ...req.body,
        postId: id
      });
      const comment = await storage.createInstagramComment(commentData);
      res.json(comment);
    } catch (error) {
      res.status(400).json({ message: "Invalid comment data" });
    }
  });

  // Instagram Follow System
  app.post("/api/instagram/follow", async (req, res) => {
    try {
      const followData = insertInstagramFollowSchema.parse(req.body);
      const follow = await storage.followUser(followData.followerId, followData.followingId);
      res.json(follow);
    } catch (error) {
      res.status(400).json({ message: "Invalid follow data" });
    }
  });

  app.delete("/api/instagram/follow", async (req, res) => {
    try {
      const { followerId, followingId } = req.body;
      await storage.unfollowUser(followerId, followingId);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Failed to unfollow user" });
    }
  });

  app.get("/api/instagram/users/:id/following-status/:targetId", async (req, res) => {
    try {
      const { id, targetId } = req.params;
      const isFollowing = await storage.isFollowing(id, targetId);
      res.json({ isFollowing });
    } catch (error) {
      res.status(500).json({ message: "Failed to check following status" });
    }
  });

  app.get("/api/instagram/users/:id/followers", async (req, res) => {
    try {
      const { id } = req.params;
      const followers = await storage.getFollowers(id);
      res.json(followers);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch followers" });
    }
  });

  app.get("/api/instagram/users/:id/following", async (req, res) => {
    try {
      const { id } = req.params;
      const following = await storage.getFollowing(id);
      res.json(following);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch following" });
    }
  });

  // Instagram Stories
  app.get("/api/instagram/stories", async (req, res) => {
    try {
      const stories = await storage.getInstagramStories();
      const storiesWithUsernames = await Promise.all(
        stories.map(async (story) => {
          const user = await storage.getInstagramUser(story.userId);
          return {
            ...story,
            username: user?.username || "unknown"
          };
        })
      );
      res.json(storiesWithUsernames);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch stories" });
    }
  });

  app.post("/api/instagram/stories", async (req, res) => {
    try {
      const storyData = insertInstagramStorySchema.parse({
        ...req.body,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours from now
      });
      const story = await storage.createInstagramStory(storyData);
      res.json(story);
    } catch (error) {
      res.status(400).json({ message: "Invalid story data" });
    }
  });

  app.get("/api/instagram/users/:id/posts", async (req, res) => {
    try {
      const { id } = req.params;
      const posts = await storage.getInstagramPostsByUser(id);
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user posts" });
    }
  });

  // Tinder routes
  app.post("/api/tinder/register", async (req, res) => {
    try {
      const userData = insertTinderUserSchema.parse(req.body);
      
      const existingUser = await storage.getTinderUserByName(userData.name);
      if (existingUser) {
        return res.status(400).json({ message: "Name already exists" });
      }

      const user = await storage.createTinderUser(userData);
      res.json({ user });
    } catch (error) {
      res.status(400).json({ message: "Invalid user data" });
    }
  });

  app.post("/api/tinder/login", async (req, res) => {
    try {
      const { name } = req.body;
      const user = await storage.getTinderUserByName(name);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({ user });
    } catch (error) {
      res.status(500).json({ message: "Login failed" });
    }
  });

  app.get("/api/tinder/potential-matches/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const matches = await storage.getPotentialMatches(userId);
      res.json(matches);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch potential matches" });
    }
  });

  app.post("/api/tinder/swipe", async (req, res) => {
    try {
      const matchData = insertTinderMatchSchema.parse(req.body);
      const match = await storage.createTinderMatch(matchData);
      res.json(match);
    } catch (error) {
      res.status(400).json({ message: "Invalid match data" });
    }
  });

  app.get("/api/tinder/matches/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const matches = await storage.getTinderMatches(userId);
      res.json(matches);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch matches" });
    }
  });

  // Wallapop routes
  app.post("/api/wallapop/register", async (req, res) => {
    try {
      const userData = insertWallapopUserSchema.parse(req.body);
      
      const existingUser = await storage.getWallapopUserByEmail(userData.email);
      if (existingUser) {
        return res.status(400).json({ message: "Email already exists" });
      }

      const user = await storage.createWallapopUser(userData);
      res.json({ user });
    } catch (error) {
      res.status(400).json({ message: "Invalid user data" });
    }
  });

  app.post("/api/wallapop/login", async (req, res) => {
    try {
      const { email } = req.body;
      const user = await storage.getWallapopUserByEmail(email);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({ user });
    } catch (error) {
      res.status(500).json({ message: "Login failed" });
    }
  });

  app.get("/api/wallapop/products", async (req, res) => {
    try {
      const products = await storage.getWallapopProducts();
      const productsWithSellers = await Promise.all(
        products.map(async (product) => {
          const seller = await storage.getWallapopUser(product.sellerId);
          return {
            ...product,
            sellerName: seller?.name || "unknown",
            sellerLocation: seller?.location || "unknown"
          };
        })
      );
      res.json(productsWithSellers);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  app.get("/api/wallapop/products/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const product = await storage.getWallapopProduct(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      
      // Increment views
      await storage.incrementProductViews(id);
      
      // Get seller info
      const seller = await storage.getWallapopUser(product.sellerId);
      res.json({ ...product, sellerName: seller?.name || "Unknown" });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });

  app.post("/api/wallapop/products", async (req, res) => {
    try {
      const productData = insertWallapopProductSchema.parse(req.body);
      const product = await storage.createWallapopProduct(productData);
      res.json(product);
    } catch (error) {
      res.status(400).json({ message: "Invalid product data" });
    }
  });

  // Wallapop Chat
  app.get("/api/wallapop/chats/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const chats = await storage.getWallapopChats(userId);
      
      const chatsWithDetails = await Promise.all(
        chats.map(async (chat) => {
          const product = await storage.getWallapopProduct(chat.productId);
          const otherUser = chat.buyerId === userId 
            ? await storage.getWallapopUser(chat.sellerId)
            : await storage.getWallapopUser(chat.buyerId);
          
          return {
            ...chat,
            productTitle: product?.title || "Unknown",
            productImage: product?.images?.[0] || null,
            otherUserName: otherUser?.name || "Unknown"
          };
        })
      );
      
      res.json(chatsWithDetails);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch chats" });
    }
  });

  app.post("/api/wallapop/chats", async (req, res) => {
    try {
      const { productId, buyerId, sellerId } = req.body;
      const chat = await storage.getOrCreateWallapopChat(productId, buyerId, sellerId);
      res.json(chat);
    } catch (error) {
      res.status(400).json({ message: "Invalid chat data" });
    }
  });

  app.get("/api/wallapop/chats/:chatId/messages", async (req, res) => {
    try {
      const { chatId } = req.params;
      const messages = await storage.getWallapopMessages(chatId);
      
      const messagesWithSenders = await Promise.all(
        messages.map(async (message) => {
          const sender = await storage.getWallapopUser(message.senderId);
          return {
            ...message,
            senderName: sender?.name || "Unknown"
          };
        })
      );
      
      res.json(messagesWithSenders);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch messages" });
    }
  });

  app.post("/api/wallapop/chats/:chatId/messages", async (req, res) => {
    try {
      const { chatId } = req.params;
      const messageData = insertWallapopMessageSchema.parse({
        ...req.body,
        chatId
      });
      const message = await storage.createWallapopMessage(messageData);
      res.json(message);
    } catch (error) {
      res.status(400).json({ message: "Invalid message data" });
    }
  });

  // WhatsApp routes
  app.post("/api/whatsapp/register", async (req, res) => {
    try {
      const userData = insertWhatsappUserSchema.parse(req.body);
      
      const existingUser = await storage.getWhatsappUserByPhone(userData.phone);
      if (existingUser) {
        return res.status(400).json({ message: "Phone number already registered" });
      }

      const user = await storage.createWhatsappUser(userData);
      res.json({ user });
    } catch (error) {
      res.status(400).json({ message: "Invalid user data" });
    }
  });

  app.post("/api/whatsapp/login", async (req, res) => {
    try {
      const { phone } = req.body;
      const user = await storage.getWhatsappUserByPhone(phone);
      
      if (!user) {
        return res.status(404).json({ message: "Phone number not found" });
      }

      res.json({ user });
    } catch (error) {
      res.status(500).json({ message: "Login failed" });
    }
  });

  app.get("/api/whatsapp/users", async (req, res) => {
    try {
      const users = await storage.getWhatsappUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch users" });
    }
  });

  app.post("/api/whatsapp/chats", async (req, res) => {
    try {
      const chatData = insertWhatsappChatSchema.parse(req.body);
      const chat = await storage.createWhatsappChat(chatData);
      res.json(chat);
    } catch (error) {
      res.status(400).json({ message: "Invalid chat data" });
    }
  });

  app.post("/api/whatsapp/chats/get-or-create", async (req, res) => {
    try {
      const { participants } = req.body;
      if (!participants || !Array.isArray(participants) || participants.length !== 2) {
        return res.status(400).json({ message: "Must provide exactly 2 participants" });
      }
      const chat = await storage.getOrCreateWhatsappChat(participants);
      res.json(chat);
    } catch (error) {
      res.status(500).json({ message: "Failed to get or create chat" });
    }
  });

  app.get("/api/whatsapp/chats/:phone", async (req, res) => {
    try {
      const { phone } = req.params;
      const chats = await storage.getWhatsappChatsByPhone(phone);
      
      // Enrich chats with participant details and latest message
      const enrichedChats = await Promise.all(
        chats.map(async (chat) => {
          // Get other participant (not the current user)
          const otherParticipantPhone = chat.participants.find(p => p !== phone);
          const otherParticipant = otherParticipantPhone ? 
            await storage.getWhatsappUserByPhone(otherParticipantPhone) : null;
          
          // Get latest message
          const messages = await storage.getWhatsappMessages(chat.id);
          const latestMessage = messages[messages.length - 1] || null;
          
          return {
            ...chat,
            otherParticipant,
            latestMessage,
            messageCount: messages.length
          };
        })
      );
      
      res.json(enrichedChats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch chats" });
    }
  });

  app.post("/api/whatsapp/messages", async (req, res) => {
    try {
      const messageData = insertWhatsappMessageSchema.parse(req.body);
      const message = await storage.createWhatsappMessage(messageData);
      res.json(message);
    } catch (error) {
      res.status(400).json({ message: "Invalid message data" });
    }
  });

  app.get("/api/whatsapp/messages/:chatId", async (req, res) => {
    try {
      const { chatId } = req.params;
      const messages = await storage.getWhatsappMessages(chatId);
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch messages" });
    }
  });

  // Dark Web Routes
  app.post("/api/darkweb/register", async (req, res) => {
    try {
      const userData = insertDarkwebUserSchema.parse(req.body);
      const existingUser = await storage.getDarkwebUserByHandle(userData.handle);
      if (existingUser) {
        return res.status(400).json({ message: "Handle already exists" });
      }
      const user = await storage.createDarkwebUser(userData);
      res.json({ user: { ...user, passwordHash: undefined } });
    } catch (error) {
      res.status(400).json({ message: "Invalid user data" });
    }
  });

  app.post("/api/darkweb/login", async (req, res) => {
    try {
      const { handle, password } = req.body;
      const user = await storage.verifyDarkwebPassword(handle, password);
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      res.json({ user: { ...user, passwordHash: undefined } });
    } catch (error) {
      res.status(500).json({ message: "Login failed" });
    }
  });

  app.get("/api/darkweb/channels", async (req, res) => {
    try {
      const channels = await storage.getDarkwebChannels();
      res.json(channels);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch channels" });
    }
  });

  app.post("/api/darkweb/channels", async (req, res) => {
    try {
      const channelData = insertDarkwebChannelSchema.parse(req.body);
      const channel = await storage.createDarkwebChannel(channelData);
      res.json(channel);
    } catch (error) {
      res.status(400).json({ message: "Invalid channel data" });
    }
  });

  app.get("/api/darkweb/channels/:id/messages", async (req, res) => {
    try {
      const { id } = req.params;
      const messages = await storage.getDarkwebMessages(id);
      
      const messagesWithHandles = await Promise.all(
        messages.map(async (message) => {
          const sender = await storage.getDarkwebUser(message.senderId);
          return {
            ...message,
            senderHandle: sender?.handle || "Unknown"
          };
        })
      );
      
      res.json(messagesWithHandles);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch messages" });
    }
  });

  app.post("/api/darkweb/channels/:id/messages", async (req, res) => {
    try {
      const { id } = req.params;
      const messageData = insertDarkwebMessageSchema.parse({
        ...req.body,
        channelId: id
      });
      const message = await storage.createDarkwebMessage(messageData);
      res.json(message);
    } catch (error) {
      res.status(400).json({ message: "Invalid message data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
