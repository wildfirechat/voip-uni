import Config from "@/config";
import AppServerError from "./appServerError";
import axios from "axios";

class ConferenceApi {
    authToken;

    constructor() {
    }

    /**
     *
     * @return {Promise<string>}
     */
    getMyPrivateConferenceId() {
        return this._post('/conference/get_my_id');
    }

    /**
     *
     * @param conferenceInfo
     * @return {Promise<string>}
     */
    createConference(conferenceInfo) {
        return this._post('/conference/create', conferenceInfo);
    }

    /**
     *
     * @param conferenceId
     * @param password
     * @return {Promise<Object>}
     */
    queryConferenceInfo(conferenceId, password) {
        let obj;
        if (password) {
            obj = {conferenceId, password}
        } else {
            obj = {conferenceId}
        }
        return this._post('/conference/info', obj);
    }

    destroyConference(conferenceId) {
        return this._post('/conference/destroy/' + conferenceId);
    }

    favConference(conferenceId) {
        return this._post('/conference/fav/' + conferenceId);
    }

    unfavConference(conferenceId) {
        return this._post('/conference/unfav/' + conferenceId);
    }

    isFavConference(conferenceId) {
        return this._post('/conference/is_fav/' + conferenceId);
    }

    getFavConferences() {
        return this._post('/conference/fav_conferences');
    }

    updateConference(conferenceInfo) {
        return this._post('/conference/put_info', conferenceInfo);
    }

    recordConference(conferenceId, record) {
        return this._post('/conference/recording/' + conferenceId, {recording: record});
    }

    setConferenceFocusUserId(conferenceId, userId) {
        return this._post('/conference/focus/' + conferenceId, {userId: userId ? userId : ''});
    }

    /**
     *
     * @param path
     * @param data
     * @param rawResponse
     * @param rawResponseData
     * @return {Promise<string | AxiosResponse<any>|*|T>}
     * @private
     */
    async _post(path, data = {}, rawResponse = false, rawResponseData = false) {
        let response;
        path = Config.APP_SERVER + path;
        response = await axios.post(path, data, {
            transformResponse: rawResponseData ? [data => data] : axios.defaults.transformResponse,
            headers: {
                'authToken': this.authToken,
            },
            withCredentials: true,
        })
        if (rawResponse) {
            return response;
        }
        if (response.data) {
            if (rawResponseData) {
                return response.data;
            }
            if (response.data.code === 0) {
                return response.data.result
            } else {
                throw new AppServerError(response.data.code, response.data.message)
            }
        } else {
            throw new Error('request error, status code: ' + response.status)
        }
    }
}

const conferenceApi = new ConferenceApi();
export default conferenceApi;
