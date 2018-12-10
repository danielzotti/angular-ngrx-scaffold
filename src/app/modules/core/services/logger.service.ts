import { Injectable } from '@angular/core';

@Injectable()
export class LoggerService {
  private static YELLOW = '#FF0';
  private static RED = '#F00';
  private static GREEN = '#0F0';
  private static BLUE = '#00F';
  private static WHITE = '#FFF';
  private static BLACK = '#000';

  constructor() {}

  public static ok = (content: string, object?: any) => {
    console.log(
      '%c ' + content,
      'background: ' + LoggerService.GREEN + '; color: ' + LoggerService.BLACK,
      object
    );
  };
  public static warning = (content: string, object?: any) => {
    console.log(
      '%c ' + content,
      'background: ' + LoggerService.YELLOW + '; color: ' + LoggerService.BLACK,
      object
    );
  };
  public static error = (content: string, object?: any) => {
    console.log(
      '%c ' + content,
      'background: ' + LoggerService.RED + '; color: ' + LoggerService.WHITE,
      object
    );
  };
  public static debug = (content: string, object?: any) => {
    console.log(
      '%c ' + content,
      'background: ' + LoggerService.BLUE + '; color: ' + LoggerService.WHITE,
      object
    );
  };
}
