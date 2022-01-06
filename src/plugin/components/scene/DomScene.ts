import PhaserDoms from "../../..";
import { IDomsCreator, IDomsFactory } from "../../DomsPlugin";
import { DomGameObjectEventName } from "../gameObjects/DomGameObject";

export default class DomScene extends Phaser.Scene {
    public layout: PhaserDoms.GameObjects.Container;

    public add: Phaser.GameObjects.GameObjectFactory & IDomsFactory;
    public make: Phaser.GameObjects.GameObjectCreator & IDomsCreator;

    public create(): void {
        this.createDomsLayout();
        this.events.once(Phaser.Scenes.Events.SHUTDOWN, this.removeDomsLayout, this);
    }

    public update(time: number, delta: number): void {
        super.update(time, delta);
        this.updateLayoutSize();
    }

    public init(): void {}

    private createDomsLayout(): void {
        this.layout = new PhaserDoms.GameObjects.Container(this);
        this.layout.setOrigin(0);
        this.add.existing(this.layout);
        this.game.canvas.parentNode.appendChild(this.layout.node);
        this.layout.emit(DomGameObjectEventName.ADDED, this.layout);
        this.layout.setDisplaySize(this.width, this.height);
        this.layout.node.id = this.constructor.name;
        this.layout.setName(this.constructor.name);
        this.updateLayoutSize();
    }

    private removeDomsLayout(): void {
        this.layout.destroy();
        this.layout = null;
    }

    private updateLayoutSize(): void {
        if (!this.layout) {
            return;
        }
        this.layout.setScale(this.currentWidth / this.layout.width);
        this.layout.setOrigin(0);
    }

    private get parentNode(): HTMLDivElement {
        return this.game.canvas.parentNode as HTMLDivElement;
    }

    public get width(): number {
        return this.game.canvas.width;
    }

    public get height(): number {
        return this.game.canvas.height;
    }

    public get currentWidth(): number {
        return this.parentNode.offsetWidth;
    }

    public get currentHeight(): number {
        return this.parentNode.offsetHeight;
    }
}
