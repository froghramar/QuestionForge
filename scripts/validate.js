const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const BASE_CONTENT_DIR = path.join(__dirname, '../content');
const COLLECTIONS = {
    categories: { dir: 'categories', required: ['id', 'title', 'slug'] },
    technologies: { dir: 'technologies', required: ['id', 'name', 'slug', 'category'] },
    topics: { dir: 'topics', required: ['id', 'title', 'slug', 'category'] },
    concepts: { dir: 'concepts', required: ['id', 'title', 'slug', 'topic'] },
    companies: { dir: 'companies', required: ['id', 'name', 'slug'] },
    questions: { dir: 'questions', required: ['id', 'title', 'slug', 'difficulty', 'topic', 'companies'] },
    variants: { dir: 'variants', required: ['id', 'question', 'technology'] }
};

function walk(dir) {
    let results = [];
    if (!fs.existsSync(dir)) return results;
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const filePath = path.resolve(dir, file);
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(filePath));
        } else if (filePath.endsWith('.md')) {
            results.push(filePath);
        }
    });
    return results;
}

function validate() {
    const registry = {
        ids: new Set(),
        slugs: new Map(), // collection -> Set of slugs
        data: {} // collection -> [items]
    };

    let errors = [];

    // 1. Load and check internal consistency
    for (const [key, config] of Object.entries(COLLECTIONS)) {
        const dirPath = path.join(BASE_CONTENT_DIR, config.dir);
        const files = walk(dirPath);
        registry.slugs.set(key, new Set());
        registry.data[key] = [];

        files.forEach(file => {
            const content = fs.readFileSync(file, 'utf8');
            const { data } = matter(content);
            const relativePath = path.relative(BASE_CONTENT_DIR, file);

            // Check required fields
            const missing = config.required.filter(f => !data[f]);
            if (missing.length > 0) {
                errors.push(`${relativePath}: Missing fields: ${missing.join(', ')}`);
            }

            // Check Unique ID
            if (data.id) {
                if (registry.ids.has(data.id)) {
                    errors.push(`${relativePath}: Duplicate ID: ${data.id}`);
                }
                registry.ids.add(data.id);
            }

            // Check Unique Slug within collection (if applicable)
            if (data.slug) {
                if (registry.slugs.get(key).has(data.slug)) {
                    errors.push(`${relativePath}: Duplicate slug in ${key}: ${data.slug}`);
                }
                registry.slugs.get(key).add(data.slug);
            }

            registry.data[key].push({ id: data.id, data, file: relativePath });
        });
    }

    // 2. Check Referential Integrity
    // Tech -> Category
    registry.data.technologies.forEach(item => {
        if (item.data.category && !registry.ids.has(item.data.category)) {
            errors.push(`${item.file}: Invalid category reference: ${item.data.category}`);
        }
    });

    // Topic -> Category
    registry.data.topics.forEach(item => {
        if (item.data.category && !registry.ids.has(item.data.category)) {
            errors.push(`${item.file}: Invalid category reference: ${item.data.category}`);
        }
    });

    // Concept -> Topic
    registry.data.concepts.forEach(item => {
        if (item.data.topic && !registry.ids.has(item.data.topic)) {
            errors.push(`${item.file}: Invalid topic reference: ${item.data.topic}`);
        }
    });

    // Question -> Topic, Companies, Concepts
    registry.data.questions.forEach(item => {
        if (item.data.topic && !registry.ids.has(item.data.topic)) {
            errors.push(`${item.file}: Invalid topic reference: ${item.data.topic}`);
        }
        if (Array.isArray(item.data.companies)) {
            item.data.companies.forEach(companyId => {
                if (!registry.ids.has(companyId)) {
                    errors.push(`${item.file}: Invalid company reference: ${companyId}`);
                }
            });
        }
        if (Array.isArray(item.data.concepts)) {
            item.data.concepts.forEach(conceptId => {
                if (!registry.ids.has(conceptId)) {
                    errors.push(`${item.file}: Invalid concept reference: ${conceptId}`);
                }
            });
        }
    });

    // Variant -> Question, Tech
    registry.data.variants.forEach(item => {
        if (item.data.question && !registry.ids.has(item.data.question)) {
            errors.push(`${item.file}: Invalid question reference: ${item.data.question}`);
        }
        if (item.data.technology && !registry.ids.has(item.data.technology)) {
            errors.push(`${item.file}: Invalid technology reference: ${item.data.technology}`);
        }
    });

    if (errors.length > 0) {
        console.error('\nValidation failed:');
        errors.forEach(err => console.error(` - ${err}`));
        process.exit(1);
    } else {
        console.log('All content validated successfully (Full Referential Integrity OK).');
    }
}

validate();
