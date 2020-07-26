export default class Emoji {
    protected emoji:string; 
    protected name:string; 
    protected code:string;

    getEmoji() {
        return this.emoji;
    }

    getName() {
        return this.name;
    }

    getCode() {
        return this.code;
    }

    set(emoji:string, name:string, code:string){
        this.emoji = emoji;
        this.name = name;
        this.code = code;
    }

    import(line:string) {
        let data:Array<string> = line.split(" ");
        this.code = data[0];
        this.emoji = data[1];
        this.name = data.slice(2).join(" ").trim();
    }

    export():string {
        return `${this.code} ${this.emoji} ${name}`;
    }

    constructor(line:string = undefined) {
        if(typeof line !== undefined){
            this.import(line);
        }
    }
}