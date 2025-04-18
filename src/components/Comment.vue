<template>
    <div class="comment">
        <p>{{ comment.text }}</p>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import type { CommentType } from '@/types/types';

const props = defineProps({
    comment: {
        type: Object as () => CommentType,
        required: true
    }
})

const comment = ref(props.comment);

</script>

<style scoped></style>
