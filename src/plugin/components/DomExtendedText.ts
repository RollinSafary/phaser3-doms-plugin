import { DomText, IDomTextConfig, IDomTextStyle } from "./DomText";

export class DomExtendedText extends DomText {
    public i18n: any;
    constructor(
        public scene: Phaser.Scene,
        x: number = 0,
        y: number = 0,
        text: string = "",
        style: IDomTextStyle,
        public i18nOptions: any = {}
    ) {
        super(scene, x, y, text, style);
        const i18nPlugin = (this.scene as any).i18n;
        if (!i18nPlugin) {
            this.destroy();
            throw new Error(`${scene.constructor.name} is not i18n supporting scene`);
        }
        this.i18n = i18nPlugin;
        this.setText(text, i18nOptions);
        this.i18n.on("languageChanged", this.setText, this);
        this.scene.events.once(Phaser.Scenes.Events.SHUTDOWN, this.onSceneShutDown, this);
    }

    public destroy(...args: any): void {
        args;
        !!this.i18n && this.i18n.off("languageChanged", this.setText, this);
        return super.destroy();
    }

    public setText(text: string = this.text, i18nOptions: any = this.i18nOptions || {}): this {
        this.i18nOptions = i18nOptions;
        return super.setText(this.i18n ? this.i18n.translate(text, i18nOptions) : text);
    }

    protected onSceneShutDown(): void {
        this.i18n.off("languageChanged", this.setText, this);
    }
}

export interface IDomExtendedTextConfig extends IDomTextConfig {
    i18nOptions?: any;
}
export type DomExtTextFactory = (x?: number, y?: number, text?: string, style?: IDomTextStyle, i18nOptions?: any) => DomExtendedText;
export type DomExtTextCreator = (config: IDomExtendedTextConfig, addToScene?: boolean) => DomExtendedText;
