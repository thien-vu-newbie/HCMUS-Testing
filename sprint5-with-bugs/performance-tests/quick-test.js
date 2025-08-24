import http from 'k6/http';
import { check, sleep } from 'k6';
import { testUsers, getUserByIndex } from './data/test-data.js';
import { login, submitContactForm, getMessageDetails } from './utils/common.js';

export let options = {
    stages: [
        { duration: '10s', target: 2 },  // Quick ramp-up to 2 users
        { duration: '20s', target: 2 },  // Stay at 2 users for 20 seconds
        { duration: '10s', target: 0 },  // Ramp-down
    ],
    thresholds: {
        checks: ['rate>0.90'],
        http_req_duration: ['p(95)<3000'],
        http_req_failed: ['rate<0.10'],
    },
};

export default function () {
    // Use data-driven approach - assign user based on VU index
    const user = getUserByIndex(__VU - 1);
    
    console.log(`=== Quick Test (VU ${__VU} using ${user.email}) ===`);
    
    // Step 1: Login
    const authToken = login(user.email, user.password);
    if (!authToken) {
        return; // Skip remaining steps if login fails
    }
    
    // Step 2: Submit Contact Form
    const messageId = submitContactForm(authToken, 'Test Subject', 'Test message content');
    if (!messageId) {
        return; // Skip remaining steps if form submission fails
    }
    
    // Step 3: Get Message Details
    getMessageDetails(authToken, messageId);
    
    sleep(1);
}
