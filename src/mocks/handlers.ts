import { http, HttpResponse } from 'msw';

export const handlers = [
  http.post('/login', () => {
    // Persist user's authentication in the session
    sessionStorage.setItem('is-authenticated', 'true');

    // Respond with a 200 status code
    return new HttpResponse('TOKEN');
  }),

  http.post('/logout', () => {
    // Check if the user is authenticated in this session
    const isAuthenticated = sessionStorage.getItem('is-authenticated');

    if (!isAuthenticated) {
      // If not authenticated, respond with a 403 error
      return new HttpResponse('Not authorized', { status: 403 });
    }

    sessionStorage.setItem('is-authenticated', 'false');

    return HttpResponse.json({ username: 'admin' });
  }),

  http.get('/user', () => {
    // Check if the user is authenticated in this session
    const isAuthenticated = sessionStorage.getItem('is-authenticated');

    if (!isAuthenticated) {
      // If not authenticated, respond with a 403 error
      return new HttpResponse('Not authorized', { status: 403 });
    }

    // If authenticated, return a mocked user details
    return HttpResponse.json({ username: 'admin' });
  }),
];
