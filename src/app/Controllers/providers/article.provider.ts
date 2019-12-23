import { InjectionToken } from '@angular/core';


export const articleStatsToken = new InjectionToken('articleStatsToken');

export interface Stats {
  value: boolean;
  viewValue: string;
}
export const stats: Stats[] = [
  { value: false, viewValue: '---' },
  { value: true, viewValue: 'منتشر شده' },
  { value: false, viewValue: 'منتشر نشده' }
];
