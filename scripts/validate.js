const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const CONTENT_DIR = path.join(__dirname, '../content/questions');
const REQUIRED_FIELDS = ['title', 'slug', 'difficulty', 'category', 'tags', 'companies', 'estimated_time', 'updated'];

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.resolve(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else if (file.endsWith('.md')) {
            results.push(file);
        }
    });
    return results;
}

function validate() {
    if (!fs.existsSync(CONTENT_DIR)) {
        console.log('Content directory not found.');
        return;
    }

    const files = walk(CONTENT_DIR);
    let errorCount = 0;

    files.forEach(file => {
        const content = fs.readFileSync(file, 'utf8');
        const { data } = matter(content);

        const missing = REQUIRED_FIELDS.filter(field => !data[field]);
        if (missing.length > 0) {
            console.error(`Error in ${path.relative(process.cwd(), file)}: Missing fields: ${missing.join(', ')}`);
            errorCount++;
        }
    });

    if (errorCount > 0) {
        console.log(`
Validation failed with ${errorCount} errors.`);
        process.exit(1);
    } else {
        console.log('All files validated successfully.');
    }
}

// Check if gray-matter is installed, if not, we might need to install it in the root or apps/website
try {
    require.resolve('gray-matter');
    validate();
} catch (e) {
    console.log('gray-matter not found. Installing...');
    const { execSync } = require('child_process');
    execSync('npm install gray-matter', { stdio: 'inherit' });
    validate();
}
