import { DomEventName, PointerEventName } from "../enums/Events";
import { DomContainer, IDomContainerConfig } from "./DomContainer";

export class DomButton extends DomContainer {
    constructor(scene: Phaser.Scene, public config: IDomButtonConfig) {
        super(scene, config.x, config.y, config.width, config.height);
        try {
            this.setStyle(this.config.states.normal);
            this.createComponents();
            this.setListeners();
        } catch (error) {
            console.error(error);
        }
    }

    protected createComponents(): void {}

    protected setListeners(): void {
        this.setInteractive();
        this.setChildrenInteractive(false);
        if (!!this.config.states.hover) {
            this.on(PointerEventName.POINTER_OVER, this.onOver, this);
        }
        this.on(PointerEventName.POINTER_DOWN, this.onPointerDown, this);
        this.on(DomEventName.CLICK, this.onClick, this);
    }

    protected onOver(event?: PointerEvent): void {
        event;
        this.setStyle(this.config.states.hover);
        this.once(PointerEventName.POINTER_OUT, this.onOut, this);
    }

    protected onOut(event?: PointerEvent): void {
        event;
        this.off(PointerEventName.POINTER_OUT, this.onOut, this);
        this.setStyle(this.config.states.normal);
    }

    protected onPointerDown(event?: PointerEvent): void {
        event;
        this.setStyle(this.config.states.down || this.config.states.normal);
        this.off(PointerEventName.POINTER_OUT, this.onOut, this);
        this.once(PointerEventName.POINTER_OUT, this.onOut, this);
    }

    protected onClick(event?: PointerEvent): void {
        event;
        this.emit(Phaser.Input.Events.GAMEOBJECT_POINTER_UP);
    }
}

export interface IDomButtonConfig extends IDomContainerConfig {
    states: {
        normal: any;
        hover?: any;
        down?: any;
        disabled?: any;
    };
}

export type DomButtonFactory = (x: number, y: number, key: string, frame?: string) => DomButton;

export type DomButtonCreator = (config: IDomButtonConfig, addToScene?: boolean) => DomButton;
