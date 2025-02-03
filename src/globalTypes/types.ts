export type SFCWithInstall<R, T> = T & { install(app: R): void };

export type Icon = {
   width?: number | string;
   height?: number | string;
};
