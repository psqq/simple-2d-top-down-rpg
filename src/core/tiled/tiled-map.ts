import { loadJsonFile, loadImage } from "../utils";
import { Victor, path } from "../libs";
import Tile from "../tile";

export interface ITilelayer {
    type: "tilelayer";
    data: number[];
    visible: boolean;
    id: number;
    name: string;
    x: number;
    y: number;
    width: number;
    height: number;
    opacity: number;
}

export interface IObject {
    x: number;
    y: number;
    width: number;
    height: number;
    visible: boolean;
    type: "tilelayer";
    name: string;
    id: number;
    rotation: number;
}

export interface IProperty {
    name: string;
    type: string;
    value: string;
}

export interface IObjectLayer {
    objects: IObject[];
    type: "objectgroup";
    x: number;
    y: number;
    visible: boolean;
    opacity: number;
    id: number;
    name: string;
    color: string;
    draworder: string;
    properties?: IProperty[];
}

export interface ITilesetSource {
    firstgid: number;
    source: string;
}

export interface ITileset {
    firstgid: number;
    source: string;
    columns: number;
    image: string;
    img: HTMLImageElement;
    imageheight: number,
    imagewidth: number,
    margin: number;
    name: string;
    spacing: number;
    tilecount: number;
    tileheight: number;
    tilewidth: number;
}

export interface ITiledMap {
    height: number;
    infinity: boolean;
    layers: (ITilelayer | IObjectLayer)[];
    nextlayerid: number;
    nextobjectid: number;
    orientation: string;
    renderorder: string;
    tiledversion: string;
    tileheight: number;
    tilesets: (ITilesetSource | ITileset)[];
    tilewidth: number;
    type: "map";
    version: number;
    width: number;
}

export default class TiledMap {
    filename: string;
    dirname: string;
    map: ITiledMap;
    size: Victor = new Victor(0, 0);
    tilesets: ITileset[] = [];
    tiles: Tile[] = [];
    constructor(filename: string) {
        this.filename = filename;
        this.dirname = path.dirname(this.filename);
    }
    isTileset(t: ITilesetSource | ITileset): t is ITileset {
        return t.source == null;
    }
    isTilelayer(layer: ITilelayer | IObjectLayer): layer is ITilelayer {
        return layer.type == "tilelayer";
    }
    isObjectlayer(layer: ITilelayer | IObjectLayer): layer is IObjectLayer {
        return layer.type == "objectgroup";
    }
    async loadAndParseTileset(t: ITileset) {
        t.image = path.join(this.dirname, t.image);
        t.img = await loadImage(t.image);
        return t;
    }
    async loadAndParse() {
        this.map = await loadJsonFile(this.filename) as ITiledMap;
        this.size.x = this.map.width * this.map.tilewidth;
        this.size.y = this.map.height * this.map.tileheight;
        var tilesetPromises: Promise<ITileset>[] = [];
        for (var i = 0; i < this.map.tilesets.length; i++) {
            var t = this.map.tilesets[i];
            if (this.isTileset(t)) {
                tilesetPromises.push(this.loadAndParseTileset(t));
            } else {
                t.source = path.join(this.dirname, t.source);
                tilesetPromises.push(
                    loadJsonFile(t.source)
                        .then(res => {
                            return this.loadAndParseTileset(res as ITileset);
                        })
                );
            }
        }
        this.tilesets = await Promise.all(tilesetPromises);
    }
    getTileById(id: number): Tile {
        if (this.tiles[id] != null) {
            return this.tiles[id];
        }
        for (var i = this.tilesets.length - 1; i >= 0; i--) {
            var t = this.tilesets[i];
            if (id >= t.firstgid) {
                var idInTileset = id - t.firstgid;
                var y = Math.floor(idInTileset / t.columns);
                var x = idInTileset % t.columns;
                var tile = Tile.fromImageAndArray(
                    t.img,
                    [
                        t.tilewidth,
                        t.tileheight,
                        x, y
                    ]
                );
                this.tiles[id] = tile;
                return tile;
            }
        }
        return;
    }
}
