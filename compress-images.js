const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');

function getFiles(dir) { 
    return fs.existsSync(dir) 
        ? fs.readdirSync(dir, {withFileTypes: true}).flatMap(d => d.isDirectory() ? getFiles(path.join(dir, d.name)) : path.join(dir, d.name)) 
        : []; 
}

const files = getFiles(publicDir).filter(f => /\.(png|jpg|jpeg)$/i.test(f));

(async () => {
    let totalSaved = 0;
    
    for (const file of files) {
        try {
            const stats = fs.statSync(file);
            const sizeBefore = stats.size;
            
            // Only process if larger than 500 KB
            if (sizeBefore > 500 * 1024) { 
                console.log(`Processing: ${path.basename(file)} (${(sizeBefore / 1024 / 1024).toFixed(2)} MB)`);
                const ext = path.extname(file).toLowerCase();
                const tmpFile = file + '.tmp' + ext;
                
                const image = sharp(file);
                let pipeline = image.resize({ width: 1920, withoutEnlargement: true });

                if (ext === '.png') {
                    pipeline = pipeline.png({ quality: 80, compressionLevel: 9, adaptiveFiltering: true });
                } else if (ext === '.jpg' || ext === '.jpeg') {
                    pipeline = pipeline.jpeg({ quality: 80, progressive: true });
                }

                await pipeline.toFile(tmpFile);
                
                const sizeAfter = fs.statSync(tmpFile).size;
                const saved = sizeBefore - sizeAfter;
                
                // Only replace if it actually got smaller
                if (saved > 0) {
                    fs.renameSync(tmpFile, file);
                    totalSaved += saved;
                    console.log(`✅ Compressed! Saved ${(saved / 1024 / 1024).toFixed(2)} MB`);
                } else {
                    fs.unlinkSync(tmpFile);
                    console.log(`⚠️ Skipped (Compression resulted in larger file)`);
                }
            }
        } catch (e) {
            console.error(`❌ Error processing ${path.basename(file)}:`, e.message);
        }
    }
    console.log(`\n🎉 All done! Total space saved: ${(totalSaved / 1024 / 1024).toFixed(2)} MB`);
})();
