import axios from 'axios';

export default axios.create({
  baseURL: 'https://frog-team-desafio-final-t06.herokuapp.com',
  timeout: 10000,
  headers: { 'Content-type': 'application/json' },
});