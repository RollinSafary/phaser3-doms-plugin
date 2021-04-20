export class DomGameObject extends Phaser.GameObjects.DOMElement implements Phaser.GameObjects.Components.ComputedSize {
    public currentStyle: any = {};
    public node: HTMLElement;
    public width: number;
    public height: number;
    public displayWidth: number;
    public displayHeight: number;
    public isInteractive: boolean = false;
    public parentDom: Phaser.GameObjects.DOMElement;
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
                "transform-origin": "left top",
                "-webkit-transform": "translateZ(0)",
                transform: "translateZ(0)"
            };
            this.setStyle(defaultStyleProperties);
            this.disableInteractive();
        } catch (error) {
            console.error(error);
        }
    }

    public on(eventName: string | HTMLElementEventMap | symbol, callback: Function, context?: any): this {
        if (!!this.node && isNativeEvent(eventName as string)) {
            try {
                this.node.addEventListener(eventName as string, callback.bind(context), { passive: false });
                return this;
            } catch (error) {
                console.warn(this);
                console.error(error);
            }
        }

        return super.on(eventName as string | symbol, callback, context);
    }

    public off(eventName: string | HTMLElementEventMap | symbol, callback: Function, context?: any): this {
        if (!!this.node && isNativeEvent(eventName as string)) {
            try {
                this.node.removeEventListener(eventName as string, callback.bind(context), false);
                return this;
            } catch (error) {
                console.error(error);
            }
        }
        return super.off(eventName as string | symbol, callback, context);
    }

    public once(eventName: string | HTMLElementEventMap | symbol, callback: Function, context?: any): this {
        if (!!this.node && isNativeEvent(eventName as string)) {
            try {
                this.node.addEventListener(eventName as string, callback.bind(context), { passive: false, once: true });
                return this;
            } catch (error) {
                console.error(error);
            }
        }
        return super.once(eventName as string | symbol, callback, context);
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
        this.displayWidth = width;
        this.displayHeight = height;
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

    public get domWidth(): number {
        return this.node.offsetWidth;
    }

    public get domHeight(): number {
        return this.node.offsetHeight;
    }

    public getBounds(): Phaser.Geom.Rectangle {
        return new Phaser.Geom.Rectangle(this.x, this.y, this.domWidth, this.domHeight);
    }
}

function isNativeEvent(eventName: string): boolean {
    return typeof (document.body as any)[`on${eventName}`] !== "undefined";
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
