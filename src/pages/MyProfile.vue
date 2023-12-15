<template class="mb-20">
    <ChangeModal :modal="passwordModal" :newData="newPassword" :changeData="changePassword" />    
    <ChangeModal :modal="avatarModal" :newData="newAvatar" :changeData="changeAvatar"/>
  
    <div class="absolute bg-[#F5F5DC] text-black left-[50%] transform -translate-x-1/2 rounded w-[80%] p-5 mt-20 mb-[20px]">
        <div class="flex items-center mb-10 bg-[#6387bf] p-2 rounded-[6px] mb-5">
            <Avatar :link="avatar" />
            <span class="ml-5 uppercase">{{ nickname }}</span>
        </div>

        <div class="flex justify-around items-center mb-10 bg-[#6387bf] p-2 rounded-[6px] w-[100%] mb-5">
            <button 
                class="uppercase bg-[#3a5f99] p-[5px] rounded-[6px] hover:bg-[#6387bf] transition"
                @click="() => { avatarModal = !avatarModal }"
            >Change Avatar</button>

            <button 
                class="uppercase bg-[#3a5f99] p-[5px] rounded-[6px] hover:bg-[#6387bf] transition"
                @click="() => { passwordModal = !passwordModal }"
            >Change Password</button>
        </div>

        <div class="flex flex-col justify-center items-center mb-10 bg-[#6387bf] p-2 rounded-[6px] w-[100%] mb-20">
            <input type="text" class="w-[80%] rounded-[6px] bg-[inherit] border-[black] border-[2px] outline-none p-1"
                v-model="keyword" @change="getFilmsByKeyword">

            <template v-if="searchedFilms.length > 1">
                <div class="flex flex-col w-[100%] h-[300px] overflow-y-scroll">
                    <div v-for="item in searchedFilms" :key="item.message"
                        class="flex justify-between items-center mt-5 rounded-[6px] p-2 bg-[#F5F5DC] cursor-pointer hover:bg-[#6387bf] transition"
                        @click="selectFilm(item.filmId)"
                    >
                        <div class="h-[100px] w-[8%]">
                            <img :src="item.posterUrl" class="h-[100px] rounded-[2px]">
                        </div>
                        <div class="w-[90%]">
                            <h1>
                                {{ item.nameRu ? item.nameRu : item.nameEn }}
                            </h1>
                            <p class="text-light text-[0.8em]">
                                {{ item.description }}
                            </p>
                        </div>
                    </div>
                </div>
            </template>
        </div>


        <div class="flex flex-col lists-div">
            <FilmList :userId="id" :statuses="statuses" :statusesIds="statusesIds" :films='favorite' :title="statuses[0]" />
            <FilmList :userId="id" :statuses="statuses" :statusesIds="statusesIds" :films='planned' :title="statuses[1]" />
            <FilmList :userId="id" :statuses="statuses" :statusesIds="statusesIds" :films='delayed' :title="statuses[2]" />
            <FilmList :userId="id" :statuses="statuses" :statusesIds="statusesIds" :films='watching' :title="statuses[3]" />
            <FilmList :userId="id" :statuses="statuses" :statusesIds="statusesIds" :films='watched' :title="statuses[4]" />
            <FilmList :userId="id" :statuses="statuses" :statusesIds="statusesIds" :films='abandoned'
                :title="statuses[5]" />
        </div>

    </div>
</template>
  
<script>
import { myApi, kinopoiskApi } from '@/api';
import Avatar from '@/components/Avatar.vue';
import FilmList from '@/components/FilmList.vue';
import ChangeModal from '@/components/ChangeModal.vue'

export default {
    name: 'my-profile',
    data() {
        return {
            id: '',
            nickname: '',
            avatar: '',
            keyword: '',
            searchedFilms: [],
            favorite: [],
            planned: [],
            delayed: [],
            watching: [],
            watched: [],
            abandoned: [],
            statuses: [],
            statusesIds: [],
            passwordModal: false,
            avatarModal: false,
            newPassword: '',
            newAvatar: ''
        }
    },
    components: {
        Avatar, FilmList, ChangeModal
    },
    async created() {
        await this.getUserData();

        const statuses = (await myApi.getStatuses()).data;
        for (let status in statuses) {
            if (!isNaN(status)) {
                this.statuses = [...this.statuses, statuses[status].name];
                this.statusesIds = [...this.statusesIds, statuses[status]._id];
            }
        }

        const data = (await myApi.getList(this.id)).data;
        for (let item in data) {
            if (!isNaN(item)) {
                switch (data[item].statusId) {
                    case statuses[0]._id:
                        this.favorite.push((await this.getFilm(data[item].filmId)).data);
                        break;
                    case statuses[1]._id:
                        this.planned.push((await this.getFilm(data[item].filmId)).data);
                        break;
                    case statuses[2]._id:
                        this.delayed.push((await this.getFilm(data[item].filmId)).data);
                        break;
                    case statuses[3]._id:
                        this.watching.push((await this.getFilm(data[item].filmId)).data);
                        break;
                    case statuses[4]._id:
                        this.watched.push((await this.getFilm(data[item].filmId)).data);
                        break;
                    case statuses[5]._id:
                        this.abandoned.push((await this.getFilm(data[item].filmId)).data);
                        break;
                }
            }
        }
    },
    methods: {
        async getUserData() {
            const response = await myApi.me(localStorage.getItem('authFilmsToken'))

            this.nickname = response.data.username
            this.id = response.data._id
            this.avatar = response.data.avatarLink
        },

        async getFilmsByKeyword() {
            const response = await kinopoiskApi.getFilms(this.keyword);
            this.searchedFilms = response.data.films
        },

        async selectFilm(id) {
            this.searchedFilms = []

            const imdbId = await kinopoiskApi.getImdbId(id);
            let response = await myApi.addFilm(this.id, imdbId);

            if (response?.data?.message === 'Incorrect IMDb ID.') {
                response = await myApi.addWithoutIMDB(this.id, id);
            }
        
            window.location.reload();
        },

        async getFilm(id) {
            return await myApi.getFilm(id)
        },

        openModal(type) {
            type === 'password' ? this.passwordModal = true : this.avatarModal = true;
        },

        async changePassword(localModal, newLocalData) {
            await myApi.changePassword(this.id, newLocalData);
            localStorage.clear();
            window.location.reload();
        },

        async changeAvatar(localModal, newLocalData) {
            await myApi.changeAvatar(this.id, newLocalData);
            window.location.reload();
        }
    }
}
</script>
  

<style scoped>
.lists-div>* {
    margin: 5px 0;
}
</style>