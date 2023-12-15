<template>
    <router-view />
    <!-- <router-link to="/login">About</router-link> |
    <router-link to="/non-existent-path">Broken Link</router-link>
    <router-view /> -->
</template>

<script>
export default {
    name: 'App'
}
</script>

<style>
* {
    margin: 0;
    padding: 0;

    font-family: 'Rubik', sans-serif;
}

body {
    background: #333333;
    color: white;
}
</style>
