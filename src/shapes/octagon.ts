import * as chainmarkOctagonFile from "octagon.svg";
import Shapes from './shapes';
import Emoji from '../emoji';


export default class Octagon extends Shapes{
    protected size:number = 12;
    protected edges:number = 6;    
    protected shapeName = "octagon";
    protected rootSVG:SVGElement = chainmarkOctagonFile.default;
    protected svg:SVGElement;

    constructor(uid:string, mainEmoji:Emoji, colors:Array<string>, colornum:Array<number>, emojis:Array<Emoji>) {
        super(uid, mainEmoji, colors, colornum, emojis);
        this.makeShape();
    }
}