<template>
    <div class="commentsList">
        <Comment v-for="comment in sortedComments" :key="comment.id" :comment="comment" />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import Comment from './Comment.vue';


import { useCommentsStore } from '@/stores/commentsStore';

const commentsStore = useCommentsStore();

const sortedComments = computed(() => commentsStore.sortedComments);

console.log('Sorted Comments:', sortedComments.value);

</script>

<style scoped>
.commentsList {
    margin-bottom: 1rem;
}
</style>
