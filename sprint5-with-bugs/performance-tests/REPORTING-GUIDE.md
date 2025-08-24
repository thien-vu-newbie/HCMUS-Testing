# K6 Performance Testing Reports

## Available Reporting Options

### 1. Built-in JSON Output
K6 có thể export detailed metrics sang JSON format:
```bash
k6 run --out json=results/test-results.json your-test.js
```

### 2. Summary Export
Export summary metrics cho easy analysis:
```bash
k6 run --summary-export=results/summary.json your-test.js
```

### 3. Multiple Output Formats
Combine multiple outputs trong một command:
```bash
k6 run \
  --out json=results/detailed.json \
  --summary-export=results/summary.json \
  --console-output=results/console.txt \
  your-test.js
```

## Available Scripts

### run-tests-with-reports.bat
Runs tất cả performance tests và tạo reports:
```bash
run-tests-with-reports.bat
```

### run-single-test.bat  
Run một test cụ thể với detailed reporting:
```bash
run-single-test.bat load-test
run-single-test.bat stress-test
run-single-test.bat spike-test
```

## Report Files Generated

### JSON Output (`*-results.json`)
- Chi tiết metrics cho mỗi request
- Response times, error rates
- Custom metrics và checks
- Timestamp data cho analysis

### Summary (`*-summary.json`)
- Aggregated statistics
- Pass/fail thresholds
- Overall performance metrics
- Easy to parse for CI/CD

### Console Output (`*-console.txt`)
- Real-time test progress
- Threshold violations
- Error messages và warnings

## Online Report Viewers

### 1. K6 Cloud (Free Tier Available)
```bash
k6 login cloud
k6 run --out cloud your-test.js
```

### 2. External Tools
- **Grafana**: Import JSON data for visualization
- **Excel/Google Sheets**: Import CSV converted from JSON
- **Custom Scripts**: Parse JSON for specific analysis

## HTML Report Generation

Để tạo HTML reports, sử dụng external tools:

### Option 1: k6-html-reporter (npm package)
```bash
npm install -g k6-html-reporter
k6 run --out json=results.json your-test.js
k6-html-reporter --json-file results.json --output report.html
```

### Option 2: Custom Python Script
Create HTML reports từ JSON output using Python/JavaScript.

## CI/CD Integration

### GitHub Actions Example
```yaml
- name: Run Performance Tests
  run: |
    k6 run --summary-export=summary.json \
           --out json=results.json \
           load-test.js
    
- name: Upload Results
  uses: actions/upload-artifact@v3
  with:
    name: performance-results
    path: |
      summary.json
      results.json
```

## Best Practices

1. **Timestamp Results**: Always include timestamp trong filename
2. **Multiple Formats**: Use both JSON và summary exports
3. **Archive Results**: Keep historical data for trending
4. **Automate Analysis**: Script threshold checking từ summary data
5. **Share Reports**: Use accessible formats for stakeholders
