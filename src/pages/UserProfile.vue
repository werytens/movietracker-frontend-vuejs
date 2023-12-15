<template>
    <section v-if="id === 'notuser'" class="absolute w-[50%] top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 flex justify-center">
        User "{{ username }}" not found.
    </section>

    <section v-else>
        <div class="w-[100%] p-5 flex justify-center items-center">
            <Avatar :link="avatar" />
            <h1 class="ml-5">
                {{ username }}
            </h1>
        </div>
        <section class="p-10 bg-[#F5F5DC] m-20 rounded-[6px]">
            <div class="flex flex-col lists-div">
                <FilmList :userId="id" :statuses="statuses" :statusesIds="statusesIds" :films='favorite'
                    :title="statuses[0]" />
                <FilmList :userId="id" :statuses="statuses" :statusesIds="statusesIds" :films='planned'
                    :title="statuses[1]" />
                <FilmList :userId="id" :statuses="statuses" :statusesIds="statusesIds" :films='delayed'
                    :title="statuses[2]" />
                <FilmList :userId="id" :statuses="statuses" :statusesIds="statusesIds" :films='watching'
                    :title="statuses[3]" />
                <FilmList :userId="id" :statuses="statuses" :statusesIds="statusesIds" :films='watched'
                    :title="statuses[4]" />
                <FilmList :userId="id" :statuses="statuses" :statusesIds="statusesIds" :films='abandoned'
                    :title="statuses[5]" />
            </div>
        </section>
    </section>
</template>
  
<script>
import { myApi } from '@/api';
import FilmList from '@/components/FilmList.vue';
import Avatar from '@/components/Avatar.vue';

export default {
    name: 'user-profile',
    data() {
        return {
            username: String,
            id: String,
            avatar: String,
            favorite: [],
            planned: [],
            delayed: [],
            watching: [],
            watched: [],
            abandoned: [],
            statuses: [],
            statusesIds: [],
        }
    },
    components: {
        FilmList, Avatar
    },
    async mounted() {
        if (this.$route.params.username !== undefined) {
            this.username = this.$route.params.username;
        } else {
            this.username = this.$route.params.pathMatch[0]
        }

        console.log(this.username)
        const response = await myApi.getUserByNickname(this.username);
        this.id = response.data._id

        if (this.id === undefined) {
            this.id = 'notuser'
        }

        const statuses = (await myApi.getStatuses()).data;
        for (let status in statuses) {
            if (!isNaN(status)) {
                this.statuses.push(statuses[status].name)
                this.statusesIds.push(statuses[status]._id)
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
    // mounted() {
    //     console.log(this.$route.params); // Выведет все параметры маршрута
    // },
    methods: {
        // async getUserData() {


        //     const response = await myApi.me(localStorage.getItem('authFilmsToken'))

        //     this.username = response.data.username
        //     this.id = response.data._id
        //     this.avatar = response.data.avatarLink
        // },
        async getFilm(id) {
            return await myApi.getFilm(id)
        }
    }
}
</script>
  