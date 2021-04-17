import {createTableHeader, createTableBodyForEdit} from './page.js';

const s = 500;
const bar = document.getElementById('loading-bar');
for (let ms = 0; ms <= s; ms++) {
    setTimeout(() => {
        const p = ms * 100 / s;
        bar.style.width = p + '%';
    }, ms);
}
setTimeout(() => {
    createTableHeader();
    createTableBodyForEdit();

    const hund2 = 500;
    for (let ms = 0; ms <= hund2; ms++) {
        setTimeout(() => {
            const p = 100 - ms * 100 / hund2;
            bar.style.opacity = p + '%';
        }, ms);
    }
}, s+1);