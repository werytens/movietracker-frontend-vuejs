import axios from "axios";
import config from "./config";

export class myApi {

    static API_URL = 'http://localhost:5000/api/'

    static async registerUser(username, password) {
        const response = await axios.post(this.API_URL + 'auth/registration', {
            username, password, avatarLink: 'none'
        })

        return response;
    }

    static async loginUser(username, password) {
        const response = await axios.post(this.API_URL + 'auth/login', {
            username, password
        })

        return response;
    }
    
    static async me(token) {
        const response = await axios.get(this.API_URL + 'auth/me', {
            headers: {
                Authorization: token
            }
        });

        return response
    }

    static async addFilm(userId, imdbId) {
        const response = await axios.post(this.API_URL + 'films/add', { userId, imdbId })

        return response
    }

    static async getList(userId) {
        const response = await axios.get(this.API_URL + 'films/getlist/' + userId);

        return response
    }

    static async getFilm(filmId) {
        const response = await axios.get(this.API_URL + "films/get/" + filmId);
        
        return response
    }

    static async getStatuses() {
        const response = await axios.get(this.API_URL + "films/statuses");

        return response
    }

    static async changeFilmStatus(userId, filmId, statusId) {
        const response = await axios.patch(this.API_URL + 'films/status', {
            userId, filmId, statusId
        })

        return response
    }

    static async deleteFilm(userId, filmId) {
        const response = await axios.delete(this.API_URL + 'films/delete', {
            data: {
                userId, filmId
            }
        })

        return response
    }

    static async changePassword(id, password) {
        const response = await axios.patch(this.API_URL + 'user/password', {
            id, password
        })

        return response
    }

    static async changeAvatar(id, link) {
        const response = await axios.patch(this.API_URL + 'user/avatar', {
            id, link
        })

        return response
    }

    static async addWithoutIMDB(userId, kinopoiskId) {
        const response = await axios.post(this.API_URL + 'films/addkinopoisk', { userId, kinopoiskId })
    
        return response
    }

    static async getUserByNickname(username) {
        return await axios.get(this.API_URL + 'user/' + username)
    }
}

export class kinopoiskApi {
    static async getFilms(keyword) {
        const response = await axios.get(config.API_KINOPOISK_LINK + keyword, {
            headers: {
                "X-API-KEY": config.API_KINOPOISK_KEY,
                "Content-Type": 'application/json' 
            }
        })

        return response
    }

    static async getImdbId(id) {
        const response = await axios.get(config.API_KINOPOISKID_LINK + id, {
            headers: {
                "X-API-KEY": config.API_KINOPOISK_KEY,
                "Content-Type": 'application/json' 
            }
        })

        return response.data.imdbId
    }
}