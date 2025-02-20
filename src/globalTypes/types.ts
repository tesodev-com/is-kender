export type SFCWithInstall<R, T> = T & { install(app: R): void };

export interface Icon {
  width?: number | string;
  height?: number | string;
}
