<template>
    <div class="comment">
        <div v-if="isReply" class="thread-line"></div>
        <div class="avatar"><img :src="comment.author.picture" alt="User"></div> <!-- Picture saved on some server -->
        <div class="comment-body">
            <div class="comment-card">
                <p class="author">{{ comment.author.name }}</p>
                <p class="text" v-html="formattedText"></p>
            </div>
            <div class="comment-footer">
                <span class="time">{{ commentTimestamp }}</span>
                <button class="reply" @click="handleReplyClick()">Reply {{ numberOfChildren }}</button>
            </div>
        </div>
    </div>
    <div v-if="comment.children && comment.children.length > 0" class="children">
        <Comment v-for="child in comment.children" :key="child.id" :comment="child" is-reply />
    </div>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue';
import { useReplyStore } from '@/stores/replyStore';

import type { CommentType } from '@/types/types';

const Comment = defineAsyncComponent(() => import('./Comment.vue'));

const replyStore = useReplyStore();

const props = defineProps({
    comment: {
        type: Object as () => CommentType,
        required: true
    },
    isReply: {
        type: Boolean,
        default: false
    }
})

const formattedText = computed(() => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return props.comment.text.replace(
        urlRegex,
        url => `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`
    );
});

const numberOfChildren = computed(() => {
    if (props.comment.children && props.comment.children.length > 0) {
        return `(${props.comment.children.length})`;
    }
    return '';
});

const commentTimestamp = new Date(props.comment.timestamp).toLocaleString('en-GB', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
});

const handleReplyClick = () => {
    replyStore.setReplyToMessageId(props.comment.id);
}

</script>

<style scoped>
.comment {
    width: 492px;
    display: flex;
    align-items: flex-start;
    padding-top: 30px;
    border-radius: 8px;
    position: relative;
}

.thread-line {
    position: absolute;
    left: -30px;
    top: 0;
    width: 16px;
    height: 100%;
}

.thread-line::before,
.thread-line::after {
    content: '';
    position: absolute;
    background-color: #d1d5db;
}

.thread-line::before {
    width: 1px;
    height: 50px;
    left: 0;
    top: 0;
}

.thread-line::after {
    height: 1px;
    width: 16px;
    top: 50px;
    left: 0;
}

.avatar {
    width: 40px;
    height: 40px;
    background-color: #b91c1c;
    border-radius: 50%;
    margin-right: 12px;
    flex-shrink: 0;
}

.comment-body {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.comment-card {
    background-color: white;
    padding: 16px 24px;
    border-radius: 12px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    width: 100%;
    min-height: 77px;
    box-sizing: border-box;
}

.author {
    font-weight: 600;
    font-size: 12px;
    margin: 0 0 8px;
    color: #111827;
}

.text {
    margin: 0;
    color: #82878D;
    font-size: 12px;
    font-weight: 400;
}

.comment-footer {
    margin-top: 6px;
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 12px;
    color: #6b7280;
}

.time {
    font-weight: 400;
    font-size: 10px;
    color: #82878D;
}

.reply {
    border: none;
    color: #023168;
    cursor: pointer;
    font-weight: 600;
    font-size: 10px;
}

.reply:hover {
    text-decoration: underline;
}

.children {
    margin-left: 50px;
}
</style>
