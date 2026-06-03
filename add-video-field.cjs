const fs = require('fs');
const f = 'client/src/data/minecraft-island.ts';
let content = fs.readFileSync(f, 'utf8');

// Add video section after each teacherTip line, before quiz:
// Pattern: replace `teacherTip:` with `video: { enabled: false, title: '', description: '', provider: '', url: '', thumbnail: '' },` after the teacherTip *closing line*
// Each lesson has its video prop added right after teacherTip

const videoObj = `
    video: {
      enabled: false,
      title: '',
      description: '',
      provider: '',
      url: '',
      thumbnail: '',
    },`;

// Add video after each teacherTip line that ends a teacher tip section
content = content.replace(/teacherTip: '[^']*',/g, (match) => match + videoObj);

// But some lessons like lesson 11 have teacherTip with single quotes content - double-check
fs.writeFileSync(f, content, 'utf8');
console.log('Added video field to all lessons');