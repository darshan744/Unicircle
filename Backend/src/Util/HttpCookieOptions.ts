import { CookieOptions } from "express";

/**
 * @param seconds gets the seconds for maxAge and sets them correctly
 * @returns cookie options 
 */
export function cookieOptions(seconds: number): CookieOptions {
    const maxAge = seconds * 1000;
    const cookieOptions: CookieOptions = {
        httpOnly: true, maxAge, secure: true
    }
    return cookieOptions
}