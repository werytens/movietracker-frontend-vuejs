<template>
    <img 
        :src="link !== 'none' ? link : 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png'" alt=""
        class="w-[30px] h-[30px] rounded-[100%]"
    >
</template>

<script>
export default {
    name: 'user-avatar',
    props: {
        link: String
    }
}
</script>