<template>
    <div class="comments">
        <CommentsList />
        <CustomInput />
    </div>
</template>

<script setup>
import CommentsList from './CommentsList.vue';
import CustomInput from './CustomInput.vue';

</script>

<style>
.comments {
    width: 798px;
    height: 485px;
    border-radius: 10px;
    overflow: auto;
    background-color: #ECEEF1;
    font-family: 'Inter', sans-serif;
    box-sizing: border-box;
    padding: 1rem 3rem;
    margin: 4rem auto 0 auto;
}
</style>
