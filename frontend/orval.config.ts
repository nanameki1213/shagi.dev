import { defineConfig } from 'orval';

export default defineConfig({
  orvalPoc: {
    input: '../strapi-cms/specification.json',
    output: {
      mode: 'tags-split',
      target: './src/gen/backend.ts',
      schemas: './src/gen/schema',
      client: 'react-query',
      override: {
        mutator: {
          path: './src/lib/axios.ts',
          name: 'customInstance',
        }
      }
    },
  },
});
