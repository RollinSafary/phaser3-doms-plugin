import { DomGameObject, IDomBaseGameObjectConfig } from "./DomGameObject";

export class DomImage extends DomGameObject {
    public node: HTMLImageElement;

    constructor(scene: Phaser.Scene, x: number = 0, y: number = 0, public key: string, public frame?: string) {
        super(scene, x, y, "img");
        try {
            this.setTexture();
        } catch (error) {
            console.error(error);
        }
    }

    public setTexture(key: string = this.key, frameName: string = this.frame): void {
        this.key = key;
        this.frame = frameName;
        let name = this.key;
        if (!!this.frame) {
            name += `-${this.frame}`;
        }
        this.setName(name);
        const frame = this.scene.textures.getFrame(this.key, this.frame);
        this.node.src = this.scene.textures.getBase64(this.key, this.frame);
        this.setSize(frame.width, frame.height);
        this.setDisplaySize(frame.width, frame.height);
    }
}

export interface IDomImageConfig extends IDomBaseGameObjectConfig {
    key: string;
    frame?: string;
}

export type DomImageFactory = (x: number, y: number, key: string, frame?: string) => DomImage;

export type DomImageCreator = (config: IDomImageConfig, addToScene?: boolean) => DomImage;
