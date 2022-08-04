const prefix = [
    "Awesome",
    "Curious",
    "Sleepy",
    "Playful",
    "Happy",
    "Annoyed",
    "Amused",
    "Bored",
    "Calm",
    "Cute",
    "Fancy",
    "Gentle",
    "Lazy"
]

const name = [
    "Otter",
    "Bat",
    "Lizard",
    "Researcher",
    "Cat",
    "Cow",
    "Dog",
    "Duck",
    "Donkey",
    "Goose",
    "Sheep",
    "Goat",
    "Hacker",
    "Farmer",
    "Swimmer",
    "Mushroom",
    "Beaver",
    "Teacher",
    "Worker"
]

function random(list: string[]): string {
    return list[Math.floor(Math.random() * list.length)];
}

function identifier(): string {
    let id = ""

    for (let i = 0; i < 4; i++) {
        id += ((Math.random() * 10) + "").substring(0, 1);
    }

    return id
}

export function generate(): string {
    return random(prefix) + random(name) + "#" + identifier();
}