<template>
    <form class="input-container" @submit.prevent="addComment()">
        <input v-model="newComment" @blur="handleBlur" type="text" placeholder="...type something" required
            ref="input" />
        <button type="submit">Send</button>
    </form>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue';

import { useReplyStore } from '@/stores/replyStore';
import { useCommentsStore } from '@/stores/commentsStore';

const replyStore = useReplyStore();
const commentsStore = useCommentsStore();

const newComment = ref('');

const input = ref<HTMLInputElement | null>(null);

const commentIDToReplyTo = computed(() => replyStore.replyToMessageId);

const addComment = () => {
    if (!newComment.value.trim()) return

    const comment = {
        id: Math.random().toString(36).substring(2, 9),
        parent_id: commentIDToReplyTo.value,
        author: {
            name: 'Some Logged In User',
            picture: 'img/users_picture.png'
        },
        text: newComment.value,
        timestamp: Date.now()
    }

    commentsStore.addComment(comment);
    newComment.value = '';
    replyStore.setReplyToMessageId(null);
};

const handleBlur = () => {
    if (!newComment.value.trim()) {
        replyStore.setReplyToMessageId(null);
    }
};

watch(commentIDToReplyTo, (newValue) => {
    if (newValue !== null && input.value) {
        input.value.focus();
    }
});
</script>

<style scoped>
.input-container {
    display: flex;
    align-items: center;
    background-color: white;
    border-radius: 5px;
    padding: 8px 14px;
    box-shadow: 0px 4px 4px 0px #00000040;
    margin: 0 auto;
    position: sticky;
    bottom: 0;
    height: 48px;
    box-sizing: border-box;
}

.input-container input {
    flex: 1;
    border: none;
    outline: none;
    font-size: 10px;
    font-weight: 700;
    padding: 10px;
    background-color: transparent;
    color: #82878D;
}

.input-container input::placeholder {
    color: #6b7280;
}

.input-container button {
    background-color: #D9D9D9;
    border: none;
    width: 79px;
    height: 34px;
    border-radius: 5px;
    font-weight: 700;
    font-size: 10px;
    color: #1E1E1E;
    cursor: pointer;
}

.input-container button:hover {
    background-color: #d1d5db;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}
</style>
