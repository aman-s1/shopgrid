import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

Object.assign(global, { TextDecoder, TextEncoder });

// Mock import.meta.env for Vite
(global as any).import = {
    meta: {
        env: {
            VITE_API_URL: 'http://localhost:5000/api',
        },
    },
};
