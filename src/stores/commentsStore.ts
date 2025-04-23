import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import exampleData from '@/data/example.json';

import type { CommentType } from '@/types/types';


export const useCommentsStore = defineStore('commentsStore', () => {
    const comments = ref<CommentType[]>(exampleData.data.comments);

    const addComment = (newComment: CommentType) => {
        comments.value = [...comments.value, newComment];
    };

    const sortedComments = computed(() => {
        const commentMap: Record<string, CommentType> = {};
        const sorted: CommentType[] = [];

        comments.value.forEach((comment) => {
            commentMap[comment.id] = { ...comment, children: [] };
        });

        comments.value.forEach((comment) => {
            if (comment.parent_id) {
                const parent = commentMap[comment.parent_id];
                if (parent && parent.children) {
                    parent.children = parent.children || [];
                    parent.children.push(commentMap[comment.id]);
                }
            } else {
                sorted.push(commentMap[comment.id]);
            }
        });

        return sorted;
    });

    return {
        comments,
        addComment,
        sortedComments,
    };
});
