<template>
    <div
        class="absolute bg-[#F5F5DC] text-black top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 rounded w-[20%]">
        <div class="p-3 w-[100%]">
            <form class="flex justify-center items-center flex-col">
                <h1 class="uppercase text-[1.4em]">
                    Авторизация
                </h1>

                <div>
                    <input
                        class="w-[100%] bg-[inherit] mb-2 border-solid border-black border-[2px] rounded p-1 outline-none"
                        type="text" placeholder="nickname" v-model="username"
                    >
                    
                    <input
                        class="w-[100%] bg-[inherit] mb-2 border-solid border-black border-[2px] rounded p-1 outline-none"
                        type="password" placeholder="password" v-model="password"
                    >
                </div>

                <button 
                    class="bg-black text-[#F5F5DC] p-1 rounded hover:text-white transition"
                    @click = "login"
                >Login</button>
            </form>
        </div>
    </div>
</template>
  
<script>
import {  myApi  } from '../api'

export default {
    name: 'login-page',
    data() {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        async login(e) {
            e.preventDefault()
            const response = await myApi.loginUser(this.username, this.password);
            localStorage.setItem('authFilmsToken', response.data.token)
        }
    }
}
</script>
  