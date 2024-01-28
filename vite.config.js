import { defineConfig } from 'vite';

export default defineConfig({
base: './',
  resolve: {
    alias: {
      'mapbox-gl': 'mapbox-gl/dist/mapbox-gl.js',
    },
  },
});
