<template>
    <div class="commentsList">
        <Comment v-for="(comment, index) in commentsList" :key="index" :comment="comment" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import Comment from './Comment.vue';

import type { CommentType } from '@/types/types';

const props = defineProps({
    comments: {
        type: Array as () => CommentType[],
        required: true
    }
})

const commentsList = ref(props.comments);
console.log(commentsList.value);

</script>

<style scoped>
.commentList {
    display: flex;
    flex-direction: column;
}
</style>
