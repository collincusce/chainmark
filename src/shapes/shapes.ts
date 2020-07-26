import Emoji from '../emoji';
export default class Shapes {
    protected uid:string = "the data";
    protected mainEmoji:Emoji = new Emoji("1F346 🍆 AUBERGINE");
    protected colors:Array<string> = [];
    protected colornum:Array<number> = [];
    protected emojis:Array<Emoji> = [];
    protected size:number = 0;
    protected edges:number = 1;
    protected rootSVG:SVGElement;
    protected rootClass:string;
    protected svg:SVGElement;

    protected prefix = "avax-chainmark";
    protected shapeName = "nullangle";

    makeShape() {
        this.svg = this.rootSVG.cloneNode(true) as SVGElement;
        this.rootClass = `${this.prefix}-${this.uid}`;
        for(let i = 0; i < this.edges; i++){
            let polyclass:string = `${this.prefix}-${this.shapeName}-triangle-${i}`;
            let poly:SVGPolygonElement = this.svg.querySelector(`.${polyclass}`);
            poly.style.fill = this.colors[i];
        }
        let emo:SVGTextElement = this.svg.querySelector(`${this.rootClass}-main-emoji`);
        emo.textContent = this.mainEmoji.getEmoji();
        let emoName:SVGTextElement = this.svg.querySelector(`${this.rootClass}-main-emoji-name`);
        emoName.textContent = this.mainEmoji.getName();
    }

    getSVG():SVGElement {
        return this.svg.cloneNode(true) as SVGElement;
    }

    constructor(uid:string, mainEmoji:Emoji, colors:Array<string>, colornum:Array<number>, emojis:Array<Emoji>) {
        this.uid = uid;
        this.mainEmoji = mainEmoji;
        this.colors = colors.slice(0, this.size);
        this.colornum = colornum.slice(0, this.size);
        this.emojis = emojis.slice(0, this.size);
    }
}