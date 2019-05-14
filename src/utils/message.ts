interface Imessage {
    generateMessage(from: string, text: string): { from: string; text: string; createdAt: number };
}

class MessageUtils implements Imessage {
    generateMessage(from: string, text: string) {
        return { from, text, createdAt: new Date().getTime() };
    }
}
const messageUtils = new MessageUtils();
export default messageUtils;
