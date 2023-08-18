import { ValidationError } from 'class-validator';

export function getAllErrorConstraints(errors: ValidationError[]): string[] {
  let constraints: string[] = [];

  for (const error of errors) {
    if (error.constraints) {
      constraints = constraints!.concat(Object.values(error.constraints));
    }

    if (error.children && error.children.length > 0) {
      constraints = constraints.concat(getAllErrorConstraints(error.children));
    }
  }

  return constraints;
}

export function fields<T>() {
  return new Proxy(
    {},
    {
      get: function (_target: any, prop: any) {
        return prop;
      },
    },
  ) as {
    [P in keyof T]: P;
  };
}

export function fieldJoin(...args: string[]) {
  return args.join('.');
}
