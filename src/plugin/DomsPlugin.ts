import { DomButtonCreator, DomButtonFactory } from "./components/DomButton";
import { DomContainer, DomContainerCreator, DomContainerFactory, IDomContainerConfig } from "./components/DomContainer";
import { DomExtendedText, DomExtTextCreator, DomExtTextFactory, IDomExtendedTextConfig } from "./components/DomExtendedText";
import { DomGameObject, DomGameObjectCreator, DomGameObjectFactory, IDomGameObjectConfig } from "./components/DomGameObject";
import { DomImage, DomImageCreator, DomImageFactory, IDomImageConfig } from "./components/DomImage";
import { DomSelect, DomSelectCreator, DomSelectFactory, IDomSelectConfig } from "./components/DomSelect";
import { DomSprite, DomSpriteCreator, DomSpriteFactory, IDomSpriteConfig } from "./components/DomSprite";
import { DomText, DomTextCreator, DomTextFactory, IDomTextConfig, IDomTextStyle } from "./components/DomText";

export class DomsPlugin extends Phaser.Plugins.BasePlugin {
    public scene: Phaser.Scene;
    constructor(pluginManager: Phaser.Plugins.PluginManager) {
        super(pluginManager);
        //  Register our new Game Object types
        pluginManager.registerGameObject("domGameObject", this.domGameObjectFactory, this.domGameObjectCreator);
        pluginManager.registerGameObject("domContainer", this.domContainerFactory, this.domContainerCreator);
        pluginManager.registerGameObject("domText", this.domTextFactory, this.domTextCreator);
        pluginManager.registerGameObject("domExtText", this.domExtTextFactory, this.domExtTextCreator);
        pluginManager.registerGameObject("domSprite", this.domSpriteFactory, this.domSpriteCreator);
        pluginManager.registerGameObject("domImage", this.domImageFactory, this.domImageCreator);
        pluginManager.registerGameObject("domSelect", this.domSelectFactory, this.domSelectCreator);
    }

    // DomGameObject

    private domGameObjectFactory(x?: number, y?: number, tagName?: string): DomGameObject {
        return this.scene.add.existing(new DomGameObject(this.scene, x, y, tagName));
    }

    private domGameObjectCreator(config: IDomGameObjectConfig, addToScene?: boolean): DomGameObject {
        if (config === undefined) {
            config = {};
        }
        const x: number = Phaser.Utils.Objects.GetAdvancedValue(config, "x", 0);
        const y: any = Phaser.Utils.Objects.GetAdvancedValue(config, "y", 0);
        const tagName: string = Phaser.Utils.Objects.GetAdvancedValue(config, "tagName", "div");

        const object = new DomGameObject(this.scene, x, y, tagName);
        if (addToScene !== undefined) {
            config.add = addToScene;
        }

        Phaser.GameObjects.BuildGameObject(this.scene, object, config);
        return object;
    }

    // DomGameObject
    private domContainerFactory(x?: number, y?: number, width?: number, height?: number): DomContainer {
        return this.scene.add.existing(new DomContainer(this.scene, x, y, width, height));
    }

    private domContainerCreator(config: IDomContainerConfig, addToScene?: boolean): DomContainer {
        if (config === undefined) {
            config = {};
        }
        const x: number = Phaser.Utils.Objects.GetAdvancedValue(config, "x", 0);
        const y: any = Phaser.Utils.Objects.GetAdvancedValue(config, "y", 0);
        const width: number = Phaser.Utils.Objects.GetAdvancedValue(config, "width", 0);
        const height: number = Phaser.Utils.Objects.GetAdvancedValue(config, "height", 0);

        const object = new DomContainer(this.scene, x, y, width, height);
        if (addToScene !== undefined) {
            config.add = addToScene;
        }

        Phaser.GameObjects.BuildGameObject(this.scene, object, config);
        return object;
    }

    // DomText
    private domTextFactory(x?: number, y?: number, text?: string, style?: IDomTextStyle): DomText {
        return this.scene.add.existing(new DomText(this.scene, x, y, text, style));
    }

    private domTextCreator(config: IDomTextConfig, addToScene?: boolean): DomText {
        if (config === undefined) {
            config = {};
        }
        const x: number = Phaser.Utils.Objects.GetAdvancedValue(config, "x", 0);
        const y: any = Phaser.Utils.Objects.GetAdvancedValue(config, "y", 0);
        const text: string = Phaser.Utils.Objects.GetAdvancedValue(config, "text", "");
        const style: IDomTextStyle = Phaser.Utils.Objects.GetAdvancedValue(config, "style", {});

        const object = new DomText(this.scene, x, y, text, style);
        if (addToScene !== undefined) {
            config.add = addToScene;
        }

        Phaser.GameObjects.BuildGameObject(this.scene, object, config);
        return object;
    }

    // DomExtText
    private domExtTextFactory(x?: number, y?: number, text?: string, style?: IDomTextStyle): DomExtendedText {
        if (!(this.scene as any).i18n) {
            throw new Error(`Extended text is only supported with '@rollinsafary/phaser3-i18n-plugin' installed`);
        }
        return this.scene.add.existing(new DomExtendedText(this.scene, x, y, text, style));
    }

    private domExtTextCreator(config: IDomExtendedTextConfig, addToScene?: boolean): DomExtendedText {
        if (!(this.scene as any).i18n) {
            throw new Error(`Extended text is only supported with installed '@rollinsafary/phaser3-i18n-plugin'`);
        }
        if (config === undefined) {
            config = {};
        }
        const x: number = Phaser.Utils.Objects.GetAdvancedValue(config, "x", 0);
        const y: any = Phaser.Utils.Objects.GetAdvancedValue(config, "y", 0);
        const text: string = Phaser.Utils.Objects.GetAdvancedValue(config, "text", "");
        const style: IDomTextStyle = Phaser.Utils.Objects.GetAdvancedValue(config, "style", {});
        const i18nOptions: any = Phaser.Utils.Objects.GetAdvancedValue(config, "i18nOptions", {});

        const object = new DomExtendedText(this.scene, x, y, text, style, i18nOptions);
        if (addToScene !== undefined) {
            config.add = addToScene;
        }

        Phaser.GameObjects.BuildGameObject(this.scene, object, config);
        return object;
    }

    // DomSprite
    private domSpriteFactory(x: number = 0, y: number = 0, key: string): DomSprite {
        return this.scene.add.existing(new DomSprite(this.scene, x, y, key));
    }

    private domSpriteCreator(config: IDomSpriteConfig, addToScene?: boolean): DomSprite {
        const x: number = Phaser.Utils.Objects.GetAdvancedValue(config, "x", 0);
        const y: any = Phaser.Utils.Objects.GetAdvancedValue(config, "y", 0);
        const key: string = Phaser.Utils.Objects.GetAdvancedValue(config, "key", "");

        const object = new DomSprite(this.scene, x, y, key);
        if (addToScene !== undefined) {
            config.add = addToScene;
        }

        Phaser.GameObjects.BuildGameObject(this.scene, object, config);
        return object;
    }
    // DomImage
    private domImageFactory(x: number = 0, y: number = 0, key: string): DomImage {
        return this.scene.add.existing(new DomImage(this.scene, x, y, key));
    }

    private domImageCreator(config: IDomImageConfig, addToScene?: boolean): DomImage {
        const x: number = Phaser.Utils.Objects.GetAdvancedValue(config, "x", 0);
        const y: any = Phaser.Utils.Objects.GetAdvancedValue(config, "y", 0);
        const key: string = Phaser.Utils.Objects.GetAdvancedValue(config, "key", "");

        const object = new DomImage(this.scene, x, y, key);
        if (addToScene !== undefined) {
            config.add = addToScene;
        }

        Phaser.GameObjects.BuildGameObject(this.scene, object, config);
        return object;
    }
    // DomSelect
    private domSelectFactory(config: IDomSelectConfig): DomSelect {
        return this.scene.add.existing(new DomSelect(this.scene, config));
    }

    private domSelectCreator(config: IDomSelectConfig, addToScene?: boolean): DomSelect {
        const object = new DomSelect(this.scene, config);
        if (addToScene !== undefined) {
            config.add = addToScene;
        }

        Phaser.GameObjects.BuildGameObject(this.scene, object, config);
        return object;
    }
}

export interface IDomsFactory {
    domGameObject: DomGameObjectFactory;
    domContainer: DomContainerFactory;
    domSprite: DomSpriteFactory;
    domImage: DomImageFactory;
    domText: DomTextFactory;
    domExtText?: DomExtTextFactory;
    domSelect: DomSelectFactory;
    domButton: DomButtonFactory;
}

export interface IDomsCreator {
    domGameObject: DomGameObjectCreator;
    domContainer: DomContainerCreator;
    domSprite: DomSpriteCreator;
    domImage: DomImageCreator;
    domText: DomTextCreator;
    domExtText?: DomExtTextCreator;
    domSelect: DomSelectCreator;
    domButton: DomButtonCreator;
}

export interface IDomsScene {
    add: IDomsFactory;
    make: IDomsCreator;
}
