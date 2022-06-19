import axios from "axios";
const base_url = 'http://localhost:5000/'

function getData(steps) {
    return Promise.resolve(axios.get( base_url + `get_forecast?steps=${steps}`, {
    }).then(response => {
        return Promise.resolve(response.data);
    }))
}

function trainModels(file) {
    const formData = new FormData();
    formData.append("file", file);
    return Promise.resolve(axios.post(base_url + "train_model", formData).then(response => {
        return Promise.resolve(response.data);
    }))
}

function getStatistics(){
    return Promise.resolve(axios.get( base_url + `get_statistics`, {
    }).then(response => {
        return Promise.resolve(response.data);
    }))
}

export default {getData, trainModels, getStatistics}