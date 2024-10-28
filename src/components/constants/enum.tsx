export enum enDays{
   Sunday,
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday
   
    }

    export function getEnumKeyByValue(enumObj: any, value: number): string | undefined {
      const keys = Object.keys(enumObj) as Array<keyof typeof enumObj>;
      const foundKey = keys.find(key => enumObj[key] === value);
      return foundKey as string; // Will be undefined if not found
    }