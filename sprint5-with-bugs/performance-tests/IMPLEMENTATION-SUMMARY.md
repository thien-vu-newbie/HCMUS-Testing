# 🎯 Performance Testing Suite - Complete Implementation

## 📋 Overview
This directory contains a comprehensive performance testing suite for the Practice Software Testing application, implementing **data-driven testing** with multiple user accounts for realistic load simulation.

## 🏗️ Architecture

### Data-Driven Testing Implementation
- **10 User Accounts**: `customer@practicesoftwaretesting.com` through `customer10@practicesoftwaretesting.com`
- **Consistent User Assignment**: Each Virtual User (VU) gets assigned a specific user account using `getUserByIndex(__VU - 1)`
- **Parallel Testing**: Multiple users can run tests simultaneously without authentication conflicts

### Test Flow Pattern
All tests follow the unified **Contact Flow Pattern**:
1. **Login** with assigned user credentials
2. **Submit Contact Form** with test message
3. **Retrieve Message Details** to verify submission
4. **Validation** at each step with proper error handling

## 📁 File Structure

```
performance-tests/
├── config.js                    # Base configuration (API endpoints, settings)
├── data/
│   └── test-data.js             # User accounts and helper functions
├── utils/
│   └── common.js                # Shared functions (login, submit form, etc.)
├── load-test.js                 # Load testing scenario
├── stress-test.js               # Stress testing scenario  
├── spike-test.js                # Spike testing scenario
├── quick-test.js                # Quick validation test
├── run-tests-builtin-reports.bat   # Run all tests with built-in reports
├── run-single-test-html.bat        # Run individual test with HTML report
├── results/
│   ├── report-viewer.html       # Interactive HTML report viewer
│   └── [test-results].json     # Generated test results
└── *.md                         # Documentation files
```

## 🚀 Quick Start

### 1. Prerequisites
- k6 installed (`k6 --version` should show v1.1.0 or higher)
- API and UI services running on ports 8091 and 4200

### 2. Run All Tests
```bash
# Run all tests with comprehensive reporting
.\run-tests-builtin-reports.bat
```

### 3. Run Individual Tests  
```bash
# Run specific test
k6 run load-test.js

# Run with detailed JSON output
k6 run --out json=results/my-test.json load-test.js

# Run with summary export
k6 run --summary-export=results/my-summary.json load-test.js
```

### 4. View Results
Open `results/report-viewer.html` in your browser and load the generated JSON summary files.

## 📊 Test Scenarios

### Load Test (`load-test.js`)
- **Purpose**: Simulate normal expected load
- **Pattern**: Gradual ramp-up to 10 users over 40 minutes
- **Stages**: 
  - 5min → 5 users
  - 30min → 10 users  
  - 5min → 0 users
- **Thresholds**: 95% success rate, <2s response time, <5% errors

### Stress Test (`stress-test.js`)
- **Purpose**: Find system breaking point
- **Pattern**: Aggressive ramp-up to 50 users over 30 minutes
- **Stages**:
  - 5min → 10 users
  - 10min → 25 users
  - 10min → 50 users
  - 5min → 0 users
- **Thresholds**: 90% success rate, <3s response time, <10% errors

### Spike Test (`spike-test.js`) 
- **Purpose**: Test sudden traffic surges
- **Pattern**: Rapid spike to 200 users
- **Stages**:
  - 30s → 10 users
  - 1min → 200 users (spike!)
  - 6min → 200 users (sustained)
  - 30s → 0 users
- **Thresholds**: 90% success rate, <3s response time, <10% errors

### Quick Test (`quick-test.js`)
- **Purpose**: Fast validation and debugging
- **Pattern**: 2 users for 40 seconds
- **Use Case**: Verify functionality before running longer tests

## 🔧 Data-Driven Features

### User Account Management
```javascript
// Automatic user assignment
const user = getUserByIndex(__VU - 1);
console.log(`VU ${__VU} using ${user.email}`);

// Available functions
getRandomUser()        // Get random user for each iteration
getUserByIndex(index)  // Get specific user (for consistent assignment)
testUsers             // SharedArray of all 10 users
```

### User Distribution Example
```
VU 1  → customer@practicesoftwaretesting.com
VU 2  → customer2@practicesoftwaretesting.com  
VU 3  → customer3@practicesoftwaretesting.com
...
VU 10 → customer10@practicesoftwaretesting.com
VU 11 → customer@practicesoftwaretesting.com (wraps around)
```

## 📈 Reporting Options

### Built-in k6 Reports
```bash
# JSON output for detailed analysis
k6 run --out json=results/test.json script.js

# Summary export for key metrics
k6 run --summary-export=results/summary.json script.js

# Combined approach
k6 run --out json=results/test.json --summary-export=results/summary.json script.js
```

### Interactive HTML Viewer
1. Run tests with `--summary-export` option
2. Open `results/report-viewer.html` 
3. Load the generated summary JSON files
4. View interactive metrics and charts

## 🎯 Key Metrics Tracked

### Performance Metrics
- **Response Time**: Average, 95th percentile, max
- **Throughput**: Requests per second
- **Error Rate**: Failed requests percentage
- **Virtual Users**: Concurrent user simulation

### Business Metrics  
- **Login Success Rate**: Authentication reliability
- **Contact Form Submission**: Core functionality performance
- **Message Retrieval**: Data consistency verification
- **End-to-End Flow**: Complete user journey success

## ⚡ Best Practices Implemented

### 1. Realistic Load Simulation
- Multiple user accounts prevent authentication bottlenecks
- Consistent user assignment ensures reproducible results
- Gradual ramp-up patterns mimic real-world traffic

### 2. Comprehensive Error Handling
- Graceful degradation when authentication fails
- Skip remaining steps if prerequisites fail
- Detailed error logging with context

### 3. Scalable Architecture
- Modular design for easy test expansion
- Shared utilities across all test scenarios
- Configurable endpoints and settings

### 4. Professional Reporting
- Multiple output formats (JSON, Summary, Console)
- Interactive HTML viewer for stakeholder presentations
- Automated timestamped result storage

## 🔍 Troubleshooting

### Common Issues

**Authentication Failures**
- Verify API service is running on port 8091
- Check user credentials in `data/test-data.js`
- Ensure database has test user accounts

**High Error Rates**
- Reduce concurrent users to find stable baseline
- Check system resources (CPU, memory, database)
- Review application logs for backend errors

**Inconsistent Results**
- Use `getUserByIndex()` for consistent user assignment
- Ensure sufficient think time between requests
- Verify test environment stability

### Performance Tuning
1. Start with `quick-test.js` to verify functionality
2. Run `load-test.js` to establish baseline performance  
3. Gradually increase load with `stress-test.js`
4. Use `spike-test.js` to test resilience

## 📚 Advanced Usage

### Custom Test Creation
```javascript
import { testUsers, getUserByIndex } from './data/test-data.js';
import { login, submitContactForm, getMessageDetails } from './utils/common.js';

export default function () {
    const user = getUserByIndex(__VU - 1);
    
    // Your custom test logic here
    const token = login(user.email, user.password);
    // ... rest of test
}
```

### Environment-Specific Configuration
Modify `config.js` for different environments:
```javascript
export const config = {
    API_BASE: process.env.API_URL || 'http://localhost:8091/api',
    UI_BASE: process.env.UI_URL || 'http://localhost:4200',
    // ... other settings
};
```

## 🏆 Success Metrics

✅ **Data-driven testing implemented** with 10 user accounts  
✅ **Unified contact flow pattern** across all test scenarios  
✅ **Professional reporting infrastructure** with multiple output formats  
✅ **Scalable architecture** for easy maintenance and expansion  
✅ **Comprehensive documentation** for team knowledge sharing  

---

**Note**: This implementation provides a solid foundation for performance testing that can be extended based on specific application requirements and testing scenarios.
