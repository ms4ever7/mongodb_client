import axios from '../utils/axios';

export default {
  fetch(sqlQuery) {
    const appropriateQuery = sqlQuery.replace(/\s*,\s*/g, ",");

    return axios.get(`/cars?sqlQuery=${appropriateQuery}`)
  }
}