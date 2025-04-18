<template>
    <div class="comments">
        <h2>Comments</h2>
        <CommentsList :comments="comments" />
        <input v-model="newComment" placeholder="Add a comment" />
        <button @click="addComment">Add Comment</button>
    </div>
</template>

<script setup>
import { ref } from 'vue';

import CommentsList from './CommentsList.vue';

import { data } from '@/data/example.json';
//const data = require('@/data/example.json');

const comments = ref(data.comments || []);
const newComment = ref('');

const addComment = () => {
    if (newComment.value.trim()) {
        comments.value.push(newComment.value.trim());
        newComment.value = '';
    }
};
</script>

<style scoped>
/* .comments {
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    max-width: 400px;
    margin: 0 auto;
}

input {
    margin-right: 0.5rem;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 3px;
}

button {
    padding: 0.5rem 1rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 3px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
} */
</style>
