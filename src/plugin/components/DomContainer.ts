import { DomGameObject, IDomBaseGameObjectConfig } from "./DomGameObject";

export class DomContainer extends DomGameObject {
    public list: DomGameObject[] = [];
    protected childrenInteractive: boolean = true;

    constructor(scene: Phaser.Scene, x: number = 0, y: number = 0, width: number = 0, height: number = 0, tag: string = "div") {
        super(scene, x, y, tag);
        this.setSize(width, height);
        this.setDisplaySize(width, height);
    }

    public setChildrenInteractive(enabled: boolean = this.childrenInteractive): this {
        for (const child of this.list) {
            enabled ? child.setInteractive() : child.disableInteractive();
        }
        this.childrenInteractive = enabled;
        return this;
    }

    public add(gameObject: DomGameObject): this {
        this.node.appendChild(gameObject.node);
        this.list.push(gameObject);
        gameObject.setDepth(this.list.length - 1);
        this.scene.sys.displayList.add(gameObject);
        if (this.childrenInteractive !== gameObject.isInteractive) {
            this.setChildrenInteractive();
        }
        gameObject.parentDom = this;
        this.updateChildrenDepth();
        return this;
    }

    public remove(gameObject: DomGameObject, destroy: boolean = false): this {
        gameObject.parentDom = null;
        this.list.remove(gameObject);
        this.scene.sys.displayList.remove(gameObject);
        destroy && gameObject.destroy();
        if (this.childrenInteractive !== gameObject.isInteractive) {
            gameObject.isInteractive ? gameObject.setInteractive() : gameObject.disableInteractive();
        }
        this.updateChildrenDepth();
        return this;
    }

    protected updateChildrenDepth(): void {
        for (let i: number = 0; i < this.list.length; i++) {
            this.list[i].setDepth(i);
        }
    }

    public bringToTop(gameObject: DomGameObject): this {
        this.list.remove(gameObject);
        this.list.push(gameObject);
        this.updateChildrenDepth();
        return this;
    }

    public sendToBack(gameObject: DomGameObject): this {
        this.list.remove(gameObject);
        this.list.unshift(gameObject);
        this.updateChildrenDepth();
        return this;
    }
}

export interface IDomContainerConfig extends IDomBaseGameObjectConfig {
    width?: number;
    height?: number;
}

export type DomContainerFactory = (x?: number, y?: number, width?: number, height?: number) => DomContainer;

export type DomContainerCreator = (config: IDomContainerConfig, addToScene?: boolean) => DomContainer;
