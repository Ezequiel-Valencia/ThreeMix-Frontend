// https://svelte.dev/docs/kit/hooks#Server-hooks
// https://snippets.khromov.se/configure-cors-in-sveltekit-to-access-your-api-routes-from-a-different-host/

import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ resolve, event }) => {

  // Apply CORS header for all routes
  if (event.url.pathname.startsWith('/')) {
    // Required for CORS to work
    if(event.request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*',
        }
      });
    }
  }

  const response = await resolve(event);
  response.headers.append('Access-Control-Allow-Origin', `*`);
  response.headers.append('Access-Control-Allow-Headers', '*');
  response.headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE') 
  return response;
};
