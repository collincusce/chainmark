import * as emojiFile from "./emoji-list.txt";
import { Base58 } from './base58';
import { Buffer } from 'buffer/';
import Octagon from './shapes/octagon';
import Hexagon from './shapes/hexagon';
import Shapes from './shapes/shapes';
import Emoji from './emoji';

const emojiList:Array<Emoji> = emojiFile.default
        .trim().split("\n")
        .map((line:string):Emoji => {
            return new Emoji(line);
        });

//let blockchainID:string = "4ktRjsAKxgMr2aEzv9SWmrU7Xk5FniHUrVCX4P1TZSfTLZWFM"; //with checksum
//let blockchainIDHex:string = "0887ac3054b78fc778790df1224e3bc5b4dc16916fdac23bb13b9af17b4c06a93e9107c4ee";

//octogon + 2 emoji

//let address:string = "HTgZX3TwGb5JouR1tkdUBBMm3RDQrvLt6";
//let addressHex:string = "b48dd9e2e66c9061499652c4bcb02c2dfb9dc0b031e021f7";

//hexagon + 2 emoji

class ChainMark {
    protected readonly hexRegEx = /[0-9A-Fa-f]{6}/g;
    protected hexstr:string;
    protected base58:Base58 = new Base58();
    protected colors:Array<string> = [];
    protected colornum:Array<number> = [];
    protected coloravg:number;
    protected emojis:Array<Emoji> = [];
    protected mainEmoji:Emoji;
    protected shape:Shapes;

    getSVG():SVGElement {
        return this.shape.getSVG();
    }

    getEmoji():Emoji {
        return this.mainEmoji;
    }

    setData(data:string|Buffer, force:"octagon"|"hexagon"|undefined = undefined) {
        if(data instanceof Buffer) {
            this.hexstr = data.toString("hex");
        } else if(this.hexRegEx.test(data)) { 
            this.hexstr = data.replace("0x", "");
        } else {
            this.hexstr = this.base58.decode(data).toString("hex");
        }

        if(this.hexstr.length < 48) {
            throw new Error("Error - ChainMark: Data must be at least 24 bytes. Try adding a checksum.");
        }

        this.colors = this.hexstr.match(/.{6}/g);

        this.colornum = this.colors.map((color) => {
            return parseInt(color, 16);
        });

        this.coloravg =  Math.floor(this.colornum.reduce((total, value, index, array) => {
            total += value;
            if( index === array.length-1) { 
              return total/array.length;
            } else { 
              return total;
            }
        }));

        for(let i = 0; i < this.colornum.length; i++) {
            this.emojis.push(emojiList[this.colornum[i] % emojiList.length]);
        }

        this.mainEmoji = emojiList[this.coloravg % emojiList.length];

        if(force === "octagon" || (typeof force === undefined && this.colornum.length >= 12)) {
            this.shape = new Octagon(this.hexstr, this.mainEmoji, this.colors, this.colornum, this.emojis);
        } else if(force === "hexagon" || (this.colornum.length >= 8)) {
            console.log(Hexagon);
            this.shape = new Hexagon(this.hexstr, this.mainEmoji, this.colors, this.colornum, this.emojis);
        }
    }

    getData(encoding:"hex"|"base58"|"buffer" = "hex"):string|Buffer {
        if(encoding === "base58") {
            this.base58.encode(Buffer.from(this.hexstr, "hex"));
        } else if(encoding === "buffer") {
            return Buffer.from(this.hexstr, "hex");
        }
        return this.hexstr;
    }

    constructor(data:string|Buffer){
        this.setData(data);
    }
}

export default ChainMark;
