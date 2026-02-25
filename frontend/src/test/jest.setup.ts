import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

Object.assign(global, { TextDecoder, TextEncoder });

Object.assign(global, {
  import: {
    meta: {
      env: {
        VITE_API_URL: 'http://localhost:5000/api',
      },
    },
  },
});
