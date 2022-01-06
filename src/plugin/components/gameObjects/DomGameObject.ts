import DomScene from "../scene/DomScene";

export enum DomGameObjectEventName {
    ADDED = "added",
    REMOVED = "removed"
}

export class DomGameObject extends Phaser.GameObjects.DOMElement implements Phaser.GameObjects.Components.ComputedSize {
    public scene: DomScene;
    public currentStyle: any = {};
    public node: HTMLElement;
    public width: number;
    public height: number;
    public displayWidth: number;
    public displayHeight: number;
    public isInteractive: boolean = false;
    public parentDom: DomGameObject;
    public borderWidth: number = 0;

    constructor(scene: Phaser.Scene, x: number = 0, y: number = 0, tagName: string = "div") {
        super(scene, x, y, tagName);
        try {
            const defaultStyleProperties: any = {
                display: "block",
                padding: 0,
                margin: 0,
                position: "absolute",
                overflow: "hidden",
                "transform-origin": "left top"
            };
            this.setStyle(defaultStyleProperties);
            this.disableInteractive();
        } catch (error) {
            console.error(error);
        }
    }

    public setDepth(value: number): this {
        this.node.style.setProperty("z-index", `${value}`);
        return super.setDepth(value);
    }

    public on(eventName: string, callback: Function, context?: any): this {
        this.addListener(eventName);
        return super.on(eventName, callback, context);
    }

    public off(eventName: string, callback: Function, context?: any): this {
        this.removeListener(eventName);
        return super.off(eventName, callback, context);
    }

    public once(eventName: string, callback: Function, context?: any): this {
        this.addListener(eventName);
        return super.once(eventName, callback, context);
    }

    public setName(name: string): this {
        this.node.setAttribute("name", name);
        return super.setName(name);
    }

    public setSize(width: number, height: number): this {
        this.width = width;
        this.height = height;
        return this;
    }

    public setDisplaySize(width: number, height: number): this {
        this.setStyle({
            width: `${width}px`,
            height: `${height}px`
        });
        this.displayWidth = width * this.scaleX || 1;
        this.displayHeight = height * this.scaleY || this.scaleX || 1;
        this.setSize(width, height);
        return this;
    }

    public setScale(x: number, y?: number): this {
        this.displayWidth = this.width * x;
        this.displayHeight = this.height * (y || x);
        return super.setScale(x, y);
    }

    public setStyle(style: any): this {
        const styleProperties: string[] = [];
        const styleKeys = Object.keys(JSON.parse(JSON.stringify(style)));
        for (const key of styleKeys) {
            this.currentStyle[key] = style[key];
        }
        const currentStyleKeys = Object.keys(this.currentStyle);
        for (const key of currentStyleKeys) {
            const styleProperty: string = `${key} : ${this.currentStyle[key]};`;
            styleProperties.push(styleProperty);
        }
        this.node.style.cssText = styleProperties.join(" ");
        this.borderWidth = +this.node.style.getPropertyValue("border-width").replace("px", "") || 0;
        return this;
    }

    public removeStyle(properties: string[]): this {
        const currentProperties: string[] = Object.keys(this.currentStyle);
        for (const property of properties) {
            currentProperties.includes(property) && this.node.remove;
        }
        return this;
    }

    public setInteractive(): this {
        super.setInteractive();
        this.node.style.setProperty("pointer-events", "auto");
        this.isInteractive = true;
        return this;
    }

    public disableInteractive(force: boolean = false): this {
        this.node.style.setProperty("pointer-events", "none");
        if (!force) {
            this.isInteractive = false;
        }
        return this;
    }

    public updateDomSize(): void {
        this.setSize(this.domWidth, this.domHeight);
    }

    public get domWidth(): number {
        return this.node.offsetWidth;
    }

    public get domHeight(): number {
        return this.node.offsetHeight;
    }

    public get TX(): number {
        return this.parentTX + this.x * this.parentScaleTX;
    }
    public get TY(): number {
        return this.parentTY + this.y * this.parentScaleTY;
    }

    public get scaleTX(): number {
        return this.scaleX * this.parentScaleTX;
    }
    public get scaleTY(): number {
        return this.scaleY * this.parentScaleTY;
    }

    public get parentTX(): number {
        return this.parentDom?.TX || 0;
    }

    public get parentTY(): number {
        return this.parentDom?.TY || 0;
    }

    public get parentScaleTX(): number {
        return this.parentDom && this.parentDom !== this.scene.layout ? this.parentDom.scaleTX : 1;
    }

    public get parentScaleTY(): number {
        return this.parentDom && this.parentDom !== this.scene.layout ? this.parentDom.scaleTY : 1;
    }

    public get centerX(): number {
        return this.TX + this.width * this.scaleTX * (0.5 - this.originX);
    }

    public get centerY(): number {
        return this.TY + this.height * this.scaleTY * (0.5 - this.originY);
    }

    public get innerCenterX(): number {
        return this.width * (0.5 - this.originX) * this.scaleX;
    }
    public get innerCenterY(): number {
        return this.height * (0.5 - this.originY) * this.scaleY;
    }

    public getBounds(): Phaser.Geom.Rectangle {
        return new Phaser.Geom.Rectangle(this.x, this.y, this.domWidth, this.domHeight);
    }
}

export interface IDomGameObjectConfig extends IDomBaseGameObjectConfig {
    x?: number;
    y?: number;
    tagName?: string;
    add?: boolean;
}

export interface IDomBaseGameObjectConfig {
    x?: number;
    y?: number;
    add?: boolean;
}

export type DomGameObjectFactory = (x?: number, y?: number, tagName?: string) => DomGameObject;
export type DomGameObjectCreator = (config: IDomGameObjectConfig, addToScene?: boolean) => DomGameObject;
