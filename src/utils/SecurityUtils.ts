import { createHash } from 'crypto';

export class SecurityUtils {
  private static hashAlgorithm: string = 'sha256';

  public static hashPassword(plainTextPassword: string): string {
    return createHash(this.hashAlgorithm)
      .update(plainTextPassword)
      .digest()
      .toString('base64');
  }
}