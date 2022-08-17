// Helpers for Either Type

export default class Result {
  public static getValue<T, U>(result: Either<T, U>): U {
    if (Result.isFail(result)) {
      throw new Error(`Cant retrieve the value from a failed result.`);
    }

    return result.right;
  }

  public static getError<T, U>(result: Either<T, U>): T {
    if (Result.isOk(result)) {
      throw new Error(`No failure to return.`);
    }

    return result.left;
  }

  public static isFail<T, U>(e: Either<T, U>): e is Left<T> {
    return e.left !== undefined;
  }

  public static isOk<T, U>(e: Either<T, U>): e is Right<U> {
    return e.right !== undefined;
  }

  public static ok<U>(value: U): Right<U> {
    return { right: value };
  }

  public static fail<T>(value: T): Left<T> {
    return { left: value };
  }
}
