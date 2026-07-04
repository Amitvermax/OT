const fs = require('fs');
const path = require('path');

function replaceInDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceInDir(fullPath);
    } else {
      if (fullPath.endsWith('.tsx') || fullPath.endsWith('.css')) {
        let content = fs.readFileSync(fullPath, 'utf8');
        let newContent = content.replace(/'Inter'/g, "'Arial'");
        newContent = newContent.replace(/"Inter"/g, '"Arial"');
        if (content !== newContent) {
          fs.writeFileSync(fullPath, newContent);
          console.log('Updated: ' + fullPath);
        }
      }
    }
  }
}
replaceInDir('c:/Users/OT_TESTBED/opensearch-dashboard/plugins/soc_dashboard/public');
