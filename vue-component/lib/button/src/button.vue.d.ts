import { PropType } from 'vue';
declare type IButtonType = 'primary' | 'warning' | 'danger' | 'default' | 'success';
declare const _default: import("vue").DefineComponent<{
    type: {
        type: PropType<IButtonType>;
        default: string;
        vaildator: (val: string) => boolean;
    };
    icon: {
        type: StringConstructor;
        default: string;
    };
    disabled: BooleanConstructor;
    loading: BooleanConstructor;
    round: BooleanConstructor;
}, {
    classs: import("vue").ComputedRef<(string | {
        'is-disabled': boolean;
        'is-loading': boolean;
        'is-round': boolean;
    })[]>;
    hanleClick: (e: MouseEvent) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "click"[], "click", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    type: {
        type: PropType<IButtonType>;
        default: string;
        vaildator: (val: string) => boolean;
    };
    icon: {
        type: StringConstructor;
        default: string;
    };
    disabled: BooleanConstructor;
    loading: BooleanConstructor;
    round: BooleanConstructor;
}>> & {
    onClick?: (...args: any[]) => any;
}, {
    type: IButtonType;
    icon: string;
    disabled: boolean;
    loading: boolean;
    round: boolean;
}>;
export default _default;
