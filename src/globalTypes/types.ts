export type SFCWithInstall<R, T> = T & { install(app: R): void };

export type Tooltip = {
   width?: number | string;
   position?: string;
   value?: string;
   visible?: boolean;
   type?: string;
   onClick?: boolean;
};
export type Icon = {
   width?: number | string;
   height?: number | string;
};

export type Link = {
   value: string;
   key?: string;
   href?: string;
};
