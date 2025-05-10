/**
   * @param str the tag string to be checked with for empty or not
   * @description A Util function for checking if the tag is Empty
   * @returns true if not empty false if empty
   */
export function strIsEmpty(str: string): boolean {
  for (let i = 0; i < str.length; i++) {
    if (str[i] !== ' ') {
      return true;
    }
  }
  return false;
}
