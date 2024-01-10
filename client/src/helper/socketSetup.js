// socket.js

import io from 'socket.io-client';
import { SERVER_BASE_URL } from '../config/config.local';

const socket = io(SERVER_BASE_URL); // Replace with your server URL

export default socket;
