export default function formatName(name) {

    name = name.trim().split(" ");

    const formattedName = [];

    for (const word of name) {

        if (word === "") {
            continue;
        } else {
            formattedName.push(word)
        }
    }
    return formattedName.join(' ');
}