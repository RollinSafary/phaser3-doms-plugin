/**
 * DomPlugin
 */

import { DomButton, IDomButtonConfig } from "./plugin/components/DomButton";
import { DomContainer, IDomContainerConfig } from "./plugin/components/DomContainer";
import { DomExtendedText, IDomExtendedTextConfig } from "./plugin/components/DomExtendedText";
import { DomGameObject, IDomBaseGameObjectConfig, IDomGameObjectConfig } from "./plugin/components/DomGameObject";
import { DomImage, IDomImageConfig } from "./plugin/components/DomImage";
import { DomSelect, IDomSelectConfig } from "./plugin/components/DomSelect";
import { DomSprite, IDomSpriteConfig } from "./plugin/components/DomSprite";
import {
    CssTextAlignLastType,
    CssTextAlignType,
    CssTextDecorationLineType,
    CssTextDecorationStyleType,
    CssTextFontFeatureType,
    CssTextFontKerningType,
    CssTextFontSizeAdjustType,
    CssTextFontStretchType,
    CssTextFontStyleType,
    CssTextFontVariantCapsType,
    CssTextFontVariantType,
    CssTextFontWeightType,
    CssTextJustifyType,
    CssTextOverflowType,
    CssTextShadowType,
    CssTextTransformType,
    CssTextVerticalAlignType,
    CssTextWhiteSpace,
    DomText,
    IDomTextConfig,
    IDomTextFontStyle,
    IDomTextStyle
} from "./plugin/components/DomText";
import { DomsPlugin, IDomsCreator, IDomsFactory } from "./plugin/DomsPlugin";
import { DomEventName, MouseEventName, PointerEventName } from "./plugin/enums/Events";

namespace PhaserDoms {
    export namespace Scene {
        export interface Factory extends IDomsFactory {}
        export interface Creator extends IDomsCreator {}
    }

    export namespace GameObjects {
        export class GameObject extends DomGameObject {}
        export class Container extends DomContainer {}
        export class Sprite extends DomSprite {}
        export class Image extends DomImage {}
        export class Text extends DomText {}
        export class ExtendedText extends DomExtendedText {}
        export class Select extends DomSelect {}
        export class Button extends DomButton {}
    }

    export namespace Plugin {
        export const Name: string = "DomsPlugin";
        export class Doms extends DomsPlugin {}
    }

    export namespace Input {
        export const Events = {
            ...PointerEventName,
            ...MouseEventName,
            ...DomEventName
        };
    }

    export namespace Types {
        export namespace GameObjects {
            export namespace Base {
                export interface Config extends IDomBaseGameObjectConfig {}
            }
            export namespace GameObject {
                export interface Config extends IDomGameObjectConfig {}
            }
            export namespace Container {
                export interface Config extends IDomContainerConfig {}
            }
            export namespace Sprite {
                export interface Config extends IDomSpriteConfig {}
            }
            export namespace Image {
                export interface Config extends IDomImageConfig {}
            }
            export namespace Text {
                export interface Config extends IDomTextConfig {}
                export interface Style extends IDomTextStyle {}
                export interface FontStyle extends IDomTextFontStyle {}
                export namespace CSS {
                    export type DecorationLine = CssTextDecorationLineType;
                    export type DecorationStyle = CssTextDecorationStyleType;
                    export type Transform = CssTextTransformType;
                    export type Align = CssTextAlignType;
                    export type Justify = CssTextJustifyType;
                    export type AlignLast = CssTextAlignLastType;
                    export type VerticalAlign = CssTextVerticalAlignType;
                    export type WhiteS = CssTextWhiteSpace;
                    export type Overflow = CssTextOverflowType;
                    export type Shadow = CssTextShadowType;
                    export type FontFeature = CssTextFontFeatureType;
                    export type FontKerning = CssTextFontKerningType;
                    export type FontSizeAdjust = CssTextFontSizeAdjustType;
                    export type FontStyle = CssTextFontStyleType;
                    export type FontStretch = CssTextFontStretchType;
                    export type FontVariant = CssTextFontVariantType;
                    export type FontVariantCaps = CssTextFontVariantCapsType;
                    export type FontWeight = CssTextFontWeightType;
                }
            }
            export namespace ExtendedText {
                export interface Config extends IDomExtendedTextConfig {}
            }
            export namespace Select {
                export interface Config extends IDomSelectConfig {}
            }
            export namespace Button {
                export interface Config extends IDomButtonConfig {}
            }
        }
    }
}

export default PhaserDoms;
