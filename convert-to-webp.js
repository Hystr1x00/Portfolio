const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const srcDir = path.join(__dirname, 'src');

function getFiles(dir) { 
    return fs.existsSync(dir) 
        ? fs.readdirSync(dir, {withFileTypes: true}).flatMap(d => d.isDirectory() ? getFiles(path.join(dir, d.name)) : path.join(dir, d.name)) 
        : []; 
}

// 1. Convert all images in public/ to .webp
const files = getFiles(publicDir).filter(f => /\.(png|jpg|jpeg)$/i.test(f)).map(f => f.replace(/\\/g, '/'));

(async () => {
    let convertedCount = 0;
    let oldSizeTotal = 0;
    let newSizeTotal = 0;
    
    for (const file of files) {
        try {
            const ext = path.extname(file);
            const webpFile = file.substring(0, file.length - ext.length) + '.webp';
            
            const oldSize = fs.statSync(file).size;
            oldSizeTotal += oldSize;
            
            await sharp(file)
                .webp({ quality: 80, effort: 6 })
                .toFile(webpFile);
                
            const newSize = fs.statSync(webpFile).size;
            newSizeTotal += newSize;
            
            fs.unlinkSync(file); // Delete original
            console.log(`Converted: ${path.basename(file)} -> ${path.basename(webpFile)} | ${(oldSize/1024).toFixed(1)}k -> ${(newSize/1024).toFixed(1)}k`);
            convertedCount++;
        } catch (e) {
            console.error(`Error converting ${file}:`, e.message);
        }
    }
    
    console.log(`\nConverted ${convertedCount} images to WebP.`);
    console.log(`Total size: ${(oldSizeTotal/1024/1024).toFixed(2)} MB -> ${(newSizeTotal/1024/1024).toFixed(2)} MB`);
    
    // 2. Update references in src/
    const srcFiles = getFiles(srcDir).filter(f => /\.(tsx|ts|json)$/i.test(f)).map(f => f.replace(/\\/g, '/'));
    let updatedFiles = 0;
    
    for (const file of srcFiles) {
        let content = fs.readFileSync(file, 'utf8');
        const originalContent = content;
        
        // Replace paths
        content = content.replace(/\.(png|jpg|jpeg)(['"`\}])/gi, '.webp$2');
        
        if (content !== originalContent) {
            fs.writeFileSync(file, content, 'utf8');
            console.log(`Updated paths in: ${path.basename(file)}`);
            updatedFiles++;
        }
    }
    
    console.log(`Updated paths in ${updatedFiles} files.`);
})();
