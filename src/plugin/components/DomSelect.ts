import { DomEventName, PointerEventName } from "../enums/Events";
import { DomContainer } from "./DomContainer";
import { IDomBaseGameObjectConfig } from "./DomGameObject";
import { DomImage } from "./DomImage";

export class DomSelect extends DomContainer {
    protected mainContainer: DomContainer;
    protected optionsContainer: DomContainer;
    protected arrow: DomImage;

    public currentItem: DomContainer = null;

    constructor(scene: Phaser.Scene, public config: IDomSelectConfig) {
        super(scene, config.x, config.y, config.width, config.height);
        try {
            this.createComponents();
            this.setOrigin(0.5, 0);
            this.setStyle({
                height: "100%"
            });
            this.setListeners();
            this.close();
        } catch (error) {
            console.error(error);
        }
    }

    public selectOption(option: DomContainer): void {
        if (option === this.currentItem) {
            return this.close();
        }
        if (!!this.currentItem) {
            this.addOption(this.currentItem);
            this.currentItem.setStyle(this.config.item.normal);
            this.currentItem.setInteractive();
        }
        this.currentItem = option;
        this.currentItem.setStyle(this.config.item.selected || this.config.item.normal);
        this.currentItem.setStyle(this);
        this.removeOption(this.currentItem);
        this.mainContainer.add(this.currentItem);
        this;
        this.currentItem.setX(this.mainContainer.width * 0.5);
        this.currentItem.setY(this.mainContainer.height * 0.5);
        this.close();
        this.currentItem.disableInteractive();
    }

    public setName(name: string): this {
        this.mainContainer.setName(`select-main-${name}`);
        this.optionsContainer.setName(`select-options-${name}`);
        return super.setName(`select-${name}`);
    }

    public open(event?: PointerEvent): void {
        !!this.arrow && this.arrow.setScale(1, -1);
        this.optionsContainer.setStyle({
            display: "block"
        });
        this.optionsContainer.setVisible(true);
        !!event && event.stopImmediatePropagation();
        this.once(PointerEventName.POINTER_LEAVE, this.close, this);
    }

    public close(): void {
        !!this.arrow && this.arrow.setScale(1, 1);
        this.optionsContainer.setStyle({
            display: "none"
        });
        this.optionsContainer.setVisible(false);
        this.setSize(this.config.width, this.config.height);
    }

    public addOption(option: DomContainer): void {
        this.optionsContainer.add(option);
        option.setStyle(this.config.item.normal);
        option.setChildrenInteractive(false);
        this.setOptionListeners(option);
        this.repositionOptions();
    }

    public removeOption(option: DomContainer): void {
        this.optionsContainer.remove(option);
        this.repositionOptions();
    }

    protected updateObjectHeight(): void {
        this.optionsContainer.visible
            ? this.setStyle({ height: "100%" })
            : this.setStyle({
                  height: `${this.height}px`
              });
    }

    protected onMainClick(): void {
        this.optionsContainer.visible ? this.close() : this.open();
    }

    protected repositionOptions(): void {
        for (let i: number = 0; i < this.options.length; i++) {
            this.repositionOption(this.options[i], i);
        }
        this.updateDomSizes();
    }

    protected repositionOption(option: DomContainer, index: number): void {
        option.setX(this.optionsContainer.width * 0.5);
        option.setY(index * (option.height + option.borderWidth) + option.height * 0.5);
    }

    protected updateDomSizes(): void {
        const firstOption = this.options.getFirst();
        const height: number = firstOption ? this.options.length * (firstOption.height + 2 * firstOption.borderWidth) : 0;
        this.optionsContainer.setStyle({
            height: `${height}px`
        });
    }

    protected createComponents(): void {
        this.createMainContainer();
        !!this.config.arrowKey && this.createArrow();
        this.createOptionsContainer();
    }

    protected createArrow(): void {
        this.arrow = new DomImage(this.scene, this.width * 0.4, this.height * 0.5, this.config.arrowKey);
        this.mainContainer.add(this.arrow);
    }

    protected createMainContainer(): void {
        this.mainContainer = new DomContainer(this.scene, this.width * 0.5, this.height * 0.5, 0, 0);
        this.add(this.mainContainer);
        this.mainContainer.setStyle(this.config.backgrounds.main);
        this.mainContainer.setSize(this.mainContainer.domWidth, this.mainContainer.domHeight);
        this.mainContainer.setOrigin(0.5);
    }

    protected createOptionsContainer(): void {
        this.optionsContainer = new DomContainer(this.scene, this.width * 0.5, 0, this.width, this.height);
        this.add(this.optionsContainer);
        this.optionsContainer.setStyle(this.config.backgrounds.list);
        this.optionsContainer.setY(this.height + this.config.backgrounds.gap || 0);
        this.optionsContainer.setOrigin(0.5, 0);
    }

    protected setListeners(): void {
        this.setInteractive();
        this.setChildrenInteractive(false);
        this.mainContainer.setInteractive();
        this.mainContainer.on(DomEventName.CLICK, this.onMainClick, this);
    }

    protected setOptionListeners(option: DomContainer): void {
        option.setInteractive();
        option.setChildrenInteractive(false);
        option.on(PointerEventName.POINTER_OVER, this.onOptionOver.bind(this, option));
        option.on(PointerEventName.POINTER_LEAVE, this.onOptionOut.bind(this, option));
        option.on(DomEventName.CLICK, this.onOptionSelect.bind(this, option));
    }

    protected onOptionOver(...args: any[]): void {
        args;
    }
    protected onOptionOut(...args: any[]): void {
        args;
    }
    protected onOptionSelect(option: DomContainer): void {
        this.selectOption(option);
    }

    get options(): DomContainer[] {
        return this.optionsContainer.list as DomContainer[];
    }
}

export interface IDomSelectConfig extends IDomBaseGameObjectConfig {
    width: number;
    height: number;
    arrowKey?: string;
    backgrounds: {
        main: any;
        list: any;
        gap?: number;
    };
    item: {
        first?: any;
        last?: any;
        selected?: any;
        over: any;
        normal: any;
    };
}

export type DomSelectFactory = (x: number, y: number, width: number, height: number) => DomSelect;
export type DomSelectCreator = (config: IDomSelectConfig, addToScene?: boolean) => DomSelect;
