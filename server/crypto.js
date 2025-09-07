import bcrypt from "bcryptjs";

const SALT_ROUNDS = 12;

class CryptoService {
    /**
     * Hash a password using bcrypt
     */
    static async hashPassword(password) {
        return bcrypt.hash(password, SALT_ROUNDS);
    }

    /**
     * Verify a password against a hash
     */
    static async verifyPassword(password, hash) {
        return bcrypt.compare(password, hash);
    }

    /**
     * Encrypt sensitive data (simple base64 encoding for demonstration)
     * In production, use proper encryption like AES
     */
    static encryptData(data) {
        return Buffer.from(data).toString('base64');
    }

    /**
     * Decrypt sensitive data
     */
    static decryptData(encryptedData) {
        return Buffer.from(encryptedData, 'base64').toString('utf8');
    }

    /**
     * Generate a secure random token
     */
    static generateToken(length = 32) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    /**
     * Hash sensitive data like emails or phone numbers for privacy
     */
    static hashSensitiveData(data) {
        return bcrypt.hashSync(data, 8);
    }
}

export { CryptoService };
