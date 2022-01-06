import { DomGameObject, DomGameObjectEventName, IDomBaseGameObjectConfig } from "./DomGameObject";

export class DomSprite extends DomGameObject {
    public node: HTMLObjectElement;
    public currentSVG: XMLDocument;
    public key: string;

    constructor(scene: Phaser.Scene, x: number = 0, y: number = 0, key: string) {
        super(scene, x, y, "object");
        try {
            this.node.setAttribute("roll", "presentation");
            this.setTexture(key);
        } catch (error) {
            console.error(error);
        }
    }

    public setTexture(key: string): void {
        if (key === this.key) {
            return;
        }
        this.node.innerHTML = "";
        this.key = key;
        this.setName(this.key);
        const sourceXML = this.scene.game.cache.xml.get(this.key);
        this.currentSVG = copySVG(sourceXML);
        const svg = this.currentSVG.documentElement;
        const width: number = +svg.getAttribute("width");
        const height: number = +svg.getAttribute("height");
        this.node.appendChild(svg);
        this.emit(DomGameObjectEventName.ADDED, this);
        this.setSize(width, height);
        this.setDisplaySize(width, height);
    }
}

function copySVG(sourceXML: XMLDocument): XMLDocument {
    const sourceSVG = sourceXML.documentElement;
    const width: number = +sourceSVG.getAttribute("width");
    const height: number = +sourceSVG.getAttribute("height");
    const sourceSvgContent = sourceSVG.innerHTML;
    const xmlString = `<svg xmlns="${sourceSVG.getAttribute(
        "xmlns"
    )}" width="${width}" height="${height}" viewBox="${sourceSVG.getAttribute("viewBox")}" fill="${sourceSVG.getAttribute(
        "fill"
    )}">${sourceSvgContent}</svg>`;
    const xml = Phaser.DOM.ParseXML(xmlString);
    return xml;
}

export interface IDomSpriteConfig extends IDomBaseGameObjectConfig {
    key: string;
}

export type DomSpriteFactory = (x: number, y: number, key: string) => DomSprite;

export type DomSpriteCreator = (config: IDomSpriteConfig, addToScene?: boolean) => DomSprite;
