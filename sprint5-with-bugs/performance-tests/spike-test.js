import http from 'k6/http';
import { check, sleep } from 'k6';
import { config } from './config.js';
import { testUsers, getRandomUser, getUserByIndex, getRandomMessage } from './data/test-data.js';
import { login, submitContactForm, getMessageDetails } from './utils/common.js';

export let options = {
  scenarios: {
    spike_test: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '10s', target: 100 },   // Mức nền
        { duration: '5s', target: 1000 },  // Đột biến cực nhanh
        { duration: '10s', target: 1000 },  // Duy trì ngắn
        { duration: '5s', target: 100 },   // Giảm nhanh
        { duration: '10s', target: 100 },   // Quan sát phục hồi
        { duration: '5s', target: 0 },     // Kết thúc
      ],
      tags: { test_type: 'spike' },
    },
  },
  thresholds: {
    http_req_duration: ['p(95)<3000'], // 95% request < 3s
    http_req_failed: ['rate<0.10'],    // < 10% lỗi
    checks: ['rate>0.90'],             // > 90% pass
  },
};

export default function () {
  // Use data-driven testing: get different user for each VU
  const currentUser = getUserByIndex(__VU - 1); // __VU is 1-indexed
  
  // Step 1: Login with assigned user
  console.log(`=== Step 1: Login (VU ${__VU} using ${currentUser.email}) ===`);
  const authToken = login(currentUser.email, currentUser.password);

  if (!authToken) {
    console.error(`Login failed for ${currentUser.email}`);
    return;
  }

  sleep(1);

  // Step 2: Access Contact page (qua Angular UI)
  console.log('=== Step 2: Access Contact Page ===');

  let contactPageResponse = http.get(`${config.BASE_URL}/#/contact`, {
    headers: { 'Authorization': `Bearer ${authToken}` },
  });

  check(contactPageResponse, {
    'contact page loaded': (r) => r.status === 200,
  });

  sleep(2);

  // Step 3: Submit contact form
  console.log('=== Step 3: Submit Contact Form ===');

  const messageData = getRandomMessage();
  const contactId = submitContactForm(authToken, messageData.subject, messageData.message);

  if (!contactId) {
    console.error('Contact form submission failed');
    return;
  }

  sleep(1);

  // Step 4: Get specific message details
  console.log('=== Step 4: Get Message Details ===');
  getMessageDetails(authToken, contactId);

  sleep(2);
}