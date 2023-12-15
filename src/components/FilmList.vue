<template>
    <div class="bg-[#6387bf] p-2 rounded-[6px]">
        <div :class="['flex', 'items-center', 'justify-between', 'text-white', 'select-none', visible ? 'mb-10' : 'mb-0']"
            @click="this.visible = !this.visible">
            <h1 class="uppercase text-[2em] w-[20%]">
                {{ title }}
            </h1>

            <div class="flex w-[50%] justify-around">
                <div v-if="Array.isArray(films)">
                    <p>{{ films.length }} films</p>
                    <p v-if="films.length >= 1">
                        {{ ((films.map(item => item.runtime.replace(' min', '')).reduce((accumulator, currentValue) => {
                            return Number(accumulator) + Number(currentValue)
                        })) / 60).toFixed(2) }} hours
                    </p>
                </div>
            </div>

            <svg width="25" height="25" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"
                :class="['transition', visible ? 'rotate-[45deg]' : 'rotate-[0deg]']">
                <path
                    d="M14.6666 7.4445H8.55549V1.33339C8.55549 1.18605 8.49695 1.04474 8.39277 0.940551C8.28858 0.836364 8.14727 0.777832 7.99993 0.777832C7.85259 0.777832 7.71128 0.836364 7.60709 0.940551C7.50291 1.04474 7.44437 1.18605 7.44437 1.33339V7.4445H1.33326C1.18592 7.4445 1.04461 7.50303 0.940426 7.60722C0.836239 7.7114 0.777708 7.85271 0.777708 8.00005C0.774966 8.07226 0.787734 8.14421 0.81515 8.21106C0.842565 8.27791 0.883992 8.33811 0.936639 8.3876C0.989286 8.43709 1.05193 8.47471 1.12035 8.49795C1.18876 8.52118 1.26137 8.52948 1.33326 8.52228H7.44437V14.6667C7.44437 14.8141 7.50291 14.9554 7.60709 15.0596C7.71128 15.1637 7.85259 15.2223 7.99993 15.2223C8.14727 15.2223 8.28858 15.1637 8.39277 15.0596C8.49695 14.9554 8.55549 14.8141 8.55549 14.6667V8.55561H14.6666C14.8139 8.55561 14.9552 8.49708 15.0594 8.39289C15.1636 8.28871 15.2222 8.1474 15.2222 8.00005C15.2222 7.85271 15.1636 7.7114 15.0594 7.60722C14.9552 7.50303 14.8139 7.4445 14.6666 7.4445Z"
                    fill="white" />
            </svg>
        </div>
        <template v-if="films.length >= 1 && visible">
            <div v-for="(item, index) in films" :key="item._id">
                <div :class="['flex', 'items-start', 'h-[300px]', index === films.length - 1 ? 'mb-0' : 'mb-10'].join(' ')">
                    <img :src="item.poster" class="h-[100%] w-[180px] mr-10 rounded-[6px]">
                    <div class="flex flex-col justify-between h-[100%]">
                        <h1 class="uppercase text-[1.4em] text-[#0060ff]">
                            {{ item.title }}
                        </h1>
                        <p class="text-justify text-[0.8em] text-[#c2d9ff]">
                            {{ item.description }}
                        </p>

                        <div class="text-[0.8em] text-[#e3edff]">
                            <p>Genre: {{ item.genre }}</p>
                            <span class="mr-5">Rating: {{ item.rate }}</span> <span> Voters Count: {{ item.votersCount }}
                            </span>
                            <p>Release Date: {{ item.releaseDate }}</p>
                            <p>Runtime: {{ item.runtime }}</p>
                        </div>

                        <div class="text-[0.8em] text-[#e3edff]">
                            <p>Writer: {{ item.writer }}</p>
                            <p>Actors: {{ item.actors }}</p>
                        </div>

                        <!-- Change on components -->
                        <div class="flex uppercase text-[0.7em]">
                            <div
                                class="flex  mr-5 bg-[#b0ffc5] p-[4px] rounded-[6px] cursor-pointer hover:bg-[white] transition cursor-pointer select-none">
                                <span :class="statusVisibleMap[item._id] ? 'mr-5' : ''"
                                    @click="statusVisibleMap[item._id] = !statusVisibleMap[item._id]">Change Status</span>
                                <div :class="statusVisibleMap[item._id] ? 'flex statuses' : 'hidden'">
                                    <button
                                        @click="changeFilmStatus(userId, item._id, statusesIds[statuses.indexOf('Favorite'.toLocaleLowerCase())])"
                                    >
                                        Favorite
                                    </button>
                                    <button
                                        @click="changeFilmStatus(userId, item._id, statusesIds[statuses.indexOf('Planned'.toLocaleLowerCase())])"
                                    >
                                        Planned
                                    </button>
                                    <button
                                        @click="changeFilmStatus(userId, item._id, statusesIds[statuses.indexOf('Delayed'.toLocaleLowerCase())])"
                                    >
                                        Delayed
                                    </button>
                                    <button
                                        @click="changeFilmStatus(userId, item._id, statusesIds[statuses.indexOf('Watching'.toLocaleLowerCase())])"
                                    >
                                        Watching
                                    </button>
                                    <button
                                        @click="changeFilmStatus(userId, item._id, statusesIds[statuses.indexOf('Watched'.toLocaleLowerCase())])"
                                    >
                                        Watched
                                    </button>
                                    <button
                                        @click="changeFilmStatus(userId, item._id, statusesIds[statuses.indexOf('Abandoned'.toLocaleLowerCase())])"
                                    >
                                        Abandoned
                                    </button>
                                </div>
                            </div>
                            <button
                                class="uppercase bg-[#ffb0b0] p-[4px] rounded-[6px] cursor-pointer hover:bg-[white] transition"
                                @click="deleteFilm(userId, item._id)"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
import {myApi} from '../api'

export default {
    name: 'film-list',
    props: {
        films: Array,
        title: String,
        userId: String,
        statuses: Array,
        statusesIds: Array
    },
    data() {
        return {
            visible: false,
            statusVisibleMap: {}
        }
    },
    methods: {
        async changeFilmStatus(userId, filmId, statusId) {
            await myApi.changeFilmStatus(userId, filmId, statusId);
            window.location.reload()
        },
        async deleteFilm(userId, filmId) {
            await myApi.deleteFilm(userId, filmId);
            window.location.reload()
        }
    }
}
</script>

<style>
.statuses>* {
    margin: 0 5px;
    transition: .3s;
}

.statuses>*:hover {
    color: red;
}
</style>