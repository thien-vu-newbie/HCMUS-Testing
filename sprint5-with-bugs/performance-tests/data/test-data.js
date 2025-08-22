// Test data for performance tests
import { SharedArray } from 'k6/data';

// Multiple test users for authentication (data-driven testing)
export const testUsers = new SharedArray('testUsers', function () {
  return [
    {
      email: 'customer@practicesoftwaretesting.com',
      password: 'welcome01'
    },
    {
      email: 'customer2@practicesoftwaretesting.com',
      password: 'welcome01'
    },
    {
      email: 'customer3@practicesoftwaretesting.com',
      password: 'welcome01'
    },
    {
      email: 'customer4@practicesoftwaretesting.com',
      password: 'welcome01'
    },
    {
      email: 'customer5@practicesoftwaretesting.com',
      password: 'welcome01'
    },
    {
      email: 'customer6@practicesoftwaretesting.com',
      password: 'welcome01'
    },
  ];
});


// Test messages for contact form
export const testMessages = new SharedArray('testMessages', function () {
  return [
    {
      subject: 'customer-service',
      message: 'I am experiencing issues with my recent order and would like assistance. The product quality did not meet my expectations based on the description provided.'
    },
    {
      subject: 'webmaster',
      message: 'Your website has been very helpful but I noticed some broken links on the product pages. Could you please check and fix these issues?'
    },
    {
      subject: 'return',
      message: 'I would like to initiate a return for my recent purchase. The item arrived damaged and I have photos to support my claim.'
    },
    {
      subject: 'complaint',
      message: 'The delivery took much longer than promised and the customer service response was inadequate. I expect better service for future orders.'
    },
    {
      subject: 'other',
      message: 'Thank you for the excellent service and product quality. I wanted to share positive feedback about my shopping experience with your team.'
    }
  ];
});

// Helper function to get random message
export const getRandomMessage = () => {
  return testMessages[Math.floor(Math.random() * testMessages.length)];
};

// Helper function to get random user for data-driven testing
export const getRandomUser = () => {
  return testUsers[Math.floor(Math.random() * testUsers.length)];
};

// Helper function to get user by index (for consistent user assignment)
export const getUserByIndex = (index) => {
  return testUsers[index % testUsers.length];
};
