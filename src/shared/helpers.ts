import { hash, compare } from 'bcrypt';
import { BCRYPT_SALT_ROUNDS } from './constants';

export class Helpers {
  public static async tryCatch<IData>(promise: Promise<IData>) {
    return promise.then(data => [null, data]).catch(error => [error]);
  }

  public static validatePassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return compare(password, hashedPassword);
  }

  public static hashPassword(password: string): Promise<string> {
    return hash(password, BCRYPT_SALT_ROUNDS);
  }
}
