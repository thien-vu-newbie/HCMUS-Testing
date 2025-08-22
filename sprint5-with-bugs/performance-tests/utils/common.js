// Common utilities for performance tests
import http from 'k6/http';
import { check } from 'k6';
import { config } from '../config.js';

// Common login function
export function login(email, password) {
  const loginResponse = http.post(`${config.API_BASE}/users/login`, 
    JSON.stringify({ email, password }), 
    { headers: { 'Content-Type': 'application/json' } }
  );

  const isSuccess = check(loginResponse, {
    'login successful': (r) => r.status === 200,
  });

  if (isSuccess && loginResponse.status === 200) {
    try {
      const body = JSON.parse(loginResponse.body);
      return body.access_token;
    } catch (e) {
      console.error('Failed to parse login response:', e);
      return null;
    }
  }
  
  console.error('Login failed:', loginResponse.status, loginResponse.body);
  return null;
}

// Common contact form submission
export function submitContactForm(authToken, subject, message) {
  const contactResponse = http.post(`${config.API_BASE}/messages`,
    JSON.stringify({ subject, message }),
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
    }
  );

  const isSuccess = check(contactResponse, {
    'contact form submitted': (r) => r.status === 201 || r.status === 200,
  });

  if (isSuccess && (contactResponse.status === 201 || contactResponse.status === 200)) {
    try {
      const body = JSON.parse(contactResponse.body);
      return body.id;
    } catch (e) {
      console.error('Failed to parse contact response:', e);
      return null;
    }
  }

  console.error('Contact submission failed:', contactResponse.status, contactResponse.body);
  return null;
}

// Get message details
export function getMessageDetails(authToken, messageId) {
  const messageResponse = http.get(`${config.API_BASE}/messages/${messageId}`, {
    headers: { 'Authorization': `Bearer ${authToken}` }
  });

  check(messageResponse, {
    'message detail retrieved': (r) => r.status === 200
  });

  return messageResponse;
}
