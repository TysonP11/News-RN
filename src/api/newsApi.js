import axios from 'axios';
import { APIKey } from '../../config/newsApiKey';

export default axios.create({
  baseURL: 'https://newsapi.org/v2/everything',
  headers: {
    Authorization: `Bearer ${APIKey}`,
  },
});
