export default function capitalizeName(name) {
    let words = name.toLowerCase().split(' ');

    for (let a = 0; a < words.length; a++) {
        let w = words[a];
        words[a] = w[0].toUpperCase() + w.slice(1);
    }

    return words.join(' ');
}