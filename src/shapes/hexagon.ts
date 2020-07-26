import * as chainmarkHexagonFile from "hexagon.svg";
import Shapes from "./shapes";
import Emoji from '../emoji';

export default class Hexagon extends Shapes{
    protected size:number = 8;
    protected edges:number = 6;
    protected shapeName:string = "hexagon";
    protected rootSVG:SVGElement = chainmarkHexagonFile.default;

    constructor(uid:string, mainEmoji:Emoji, colors:Array<string>, colornum:Array<number>, emojis:Array<Emoji>) {
        super(uid, mainEmoji, colors, colornum, emojis);
        this.makeShape();
    }
}