import { DomGameObject, IDomBaseGameObjectConfig } from "./DomGameObject";

export class DomText extends DomGameObject {
    public node: HTMLParagraphElement;

    constructor(scene: Phaser.Scene, x: number = 0, y: number = 0, public text: string = "", public style?: IDomTextStyle) {
        super(scene, x, y, "span");
        !!style && this.setTextStyle(style);
        this.setText(text);
    }

    public setTextStyle(style: IDomTextStyle): this {
        const convertedStyle: IDomTextStyle = {
            "background-color": style["background-color"],
            color: style.color,
            "text-transform": style["text-transform"],
            "text-align": style["text-align"],
            "text-align-last": style["text-align-last"],
            "vertical-align": style["vertical-align"],
            "text-indent": style["text-indent"],
            "text-justify": style["text-justify"],
            "letter-spacing": style["letter-spacing"],
            "word-spacing": style["word-spacing"],
            "line-height": style["line-height"],
            "white-space": style["white-space"],
            "text-overflow": style["text-overflow"],
            "text-shadow": style["text-shadow"]
        };
        if (!!style.font && typeof style.font === "object") {
            const font: IDomTextFontStyle = style.font as IDomTextFontStyle;
            const values: any[] = [
                font["family"],
                font["feature-settings"],
                font.kerning,
                font["size"],
                font["size-adjust"],
                font["stretch"],
                font["style"],
                font["variant"],
                font["variant-caps"],
                font["weight"]
            ];
            convertedStyle.font = valuesToLine(values);
        } else {
            convertedStyle["font-family"] = style["font-family"];
            convertedStyle["font-feature-settings"] = style["font-feature-settings"];
            convertedStyle["font-kerning"] = style["font-kerning"];
            convertedStyle["font-size"] = style["font-size"];
            convertedStyle["font-size-adjust"] = style["font-size-adjust"];
            convertedStyle["font-stretch"] = style["font-stretch"];
            convertedStyle["font-style"] = style["font-style"];
            convertedStyle["font-variant"] = style["font-variant"];
            convertedStyle["font-variant-caps"] = style["font-variant-caps"];
            convertedStyle["font-weight"] = style["font-weight"];
        }
        if (!!style["text-decoration"] && typeof style["text-decoration"] === "object") {
            const textDecoration: IDomTextDecorationStyle = style["text-decoration"] as IDomTextDecorationStyle;
            const values: any[] = [textDecoration.line, textDecoration.style, textDecoration.color];
            convertedStyle["text-decoration"] = valuesToLine(values);
        } else {
            convertedStyle["text-decoration-color"] = style["text-decoration-color"];
            convertedStyle["text-decoration-line"] = style["text-decoration-line"];
            convertedStyle["text-decoration-style"] = style["text-decoration-style"];
        }
        // removing properties with undefined values to avoid passing it into dom style
        const clearConvertedStyle: IDomTextStyle = JSON.parse(JSON.stringify(convertedStyle));
        this.setStyle(clearConvertedStyle);
        return this;
    }

    public setStyle(style: any): this {
        super.setStyle(style);
        return this;
    }
}

export interface IDomTextConfig extends IDomBaseGameObjectConfig {
    text?: string;
    style?: IDomTextStyle;
}

export type DomTextFactory = (x?: number, y?: number, text?: string, style?: IDomTextStyle) => DomText;

export type DomTextCreator = (config: IDomTextConfig, addToScene?: boolean) => DomText;

function valuesToLine(values: any[]): string {
    let line: string = "";
    for (const value of values) {
        line += value || "";
    }
    return line;
}

export interface IDomTextStyle {
    font?: IDomTextFontStyle | string;
    "font-family"?: string;
    "font-feature-settings"?: CssTextFontFeatureType;
    "font-kerning"?: CssTextFontKerningType;
    "font-size"?: string;
    "font-size-adjust"?: string | CssTextFontSizeAdjustType; // number
    "font-stretch"?: CssTextFontStretchType;
    "font-style"?: CssTextFontStyleType;
    "font-variant"?: CssTextFontVariantType;
    "font-variant-caps"?: CssTextFontVariantCapsType;
    "font-weight"?: string | CssTextFontWeightType; // number
    "text-decoration"?: IDomTextDecorationStyle | string;
    "text-decoration-color"?: string;
    "text-decoration-line"?: string;
    "text-decoration-style"?: string;
    "background-color"?: string;
    color?: string;
    "text-transform"?: CssTextTransformType;
    "text-align"?: CssTextAlignType;
    "text-align-last"?: CssTextAlignLastType;
    "vertical-align"?: CssTextVerticalAlignType;
    "text-indent"?: string; // number + px
    "text-justify"?: CssTextJustifyType;
    "letter-spacing"?: string; // number + px
    "word-spacing"?: string; // number + px
    "line-height"?: string;
    "white-space"?: CssTextWhiteSpace;
    "text-shadow"?: string | IDomTextShadowStyle | CssTextShadowType;
    "text-overflow"?: CssTextOverflowType;
}

export interface IDomTextFontStyle {
    family?: string;
    "feature-settings"?: CssTextFontFeatureType;
    kerning?: CssTextFontKerningType;
    size?: string;
    "size-adjust"?: number | CssTextFontSizeAdjustType;
    stretch?: CssTextFontStretchType;
    style?: CssTextFontStyleType;
    variant?: CssTextFontVariantType;
    "variant-caps"?: CssTextFontVariantCapsType;
    weight?: number | CssTextFontWeightType;
}

export interface IDomTextShadowStyle {
    x?: string;
    y?: string;
    "blur-radius"?: string;
    color?: string;
}

export interface IDomTextDecorationStyle {
    color: string;
    line: CssTextDecorationLineType;
    style: CssTextDecorationStyleType;
}

export type CssTextDecorationLineType = "none" | "underline" | "overline" | "line-through" | "initial" | "inherit";
export type CssTextDecorationStyleType = "solid" | "double" | "dotted" | "dashed" | "wavy" | "initial" | "inherit";
export type CssTextTransformType = "none" | "capitalize" | "uppercase" | "lowercase" | "initial" | "inherit";
export type CssTextAlignType = "center" | "left" | "right";
export type CssTextJustifyType = "auto" | "inter-word" | "inter-character" | "none" | "initial" | "inherit";
export type CssTextAlignLastType = "center" | "left" | "right" | "auto" | "justify" | "start" | "end" | "initial" | "inherit";
export type CssTextVerticalAlignType = "baseline" | "text-top" | "text-bottom" | "sub" | "super";
export type CssTextWhiteSpace = "none" | "nowrap";
export type CssTextOverflowType = "clip" | "ellipsis" | "string" | "initial" | "inherit";
export type CssTextShadowType = "none" | "initial" | "inherit";
export type CssTextFontFeatureType = "1" | "0" | "on" | "off";
export type CssTextFontKerningType = "auto" | "normal" | "none";
export type CssTextFontSizeAdjustType = "none" | "initial" | "inherit";
export type CssTextFontStyleType = "normal" | "italic" | "oblique" | "initial" | "inherit";
export type CssTextFontStretchType =
    | "ultra-condensed"
    | "extra-condensed"
    | "condensed"
    | "semi-condensed"
    | "normal"
    | "semi-expended"
    | "expended"
    | "extra-expended"
    | "ultra-expended"
    | "initial"
    | "inherit";
export type CssTextFontVariantType = "normal" | "small-caps" | "initial" | "inherit";
export type CssTextFontVariantCapsType =
    | "normal"
    | "small-caps"
    | "all-small-caps"
    | "petite-caps"
    | "all-petite-caps"
    | "unicase"
    | "titling-caps"
    | "initial"
    | "inherit"
    | "unset";
export type CssTextFontWeightType = "normal" | "bold" | "bolder" | "lighter" | "initial" | "inherit";
