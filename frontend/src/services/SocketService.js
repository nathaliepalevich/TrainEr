
// import io from 'socket.io-client';
const BASE_URL = process.env.NODE_ENV === 'production'
    ? ''
    : '//localhost:3000' 
// const socket = io(BASE_URL);

export default {
     BASE_URL
 }
 
