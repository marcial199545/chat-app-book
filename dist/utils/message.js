"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MessageUtils {
    generateMessage(from, text) {
        return { from, text, createdAt: new Date().getTime() };
    }
}
const messageUtils = new MessageUtils();
exports.default = messageUtils;
