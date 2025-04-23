import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useReplyStore = defineStore('replyStore', () => {
  const replyToMessageId = ref<string | null>(null);

  const setReplyToMessageId = (messageId: string | null) => {
    replyToMessageId.value = messageId;
  };

  return {
    replyToMessageId,
    setReplyToMessageId,
  };
});
