import { Scalar, CustomScalar } from '@nestjs/graphql';
import { Kind, ValueNode, GraphQLError } from 'graphql';

@Scalar('DateTime', (type) => Date)
export class DateTimeScalar implements CustomScalar<string, Date> {
  description = 'DateTime custom scalar type';

  // value from the client
  parseValue(value: string): Date {
    const serverTimezoneOffset = new Date().getTimezoneOffset();
    if (/^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}(:\d{2}(.\d+)?)?)?Z$/.test(value)) {
      return new Date(value);
    } else if (/^\d{4}-\d{2}-\d{2}([T\s]\d{2}:\d{2}(:\d{2}(.\d+)?)?)?$/.test(value)) {
      return new Date(new Date(value).getTime() + 1000 * 60 * serverTimezoneOffset);
    } else if (/^20\d{2}-\d{2}-\d{2}[T\s]\d{2}:\d{2}(:\d{2}(.\d+)?)?[+-]\d{2}:\d{2}$/.test(value)) {
      return new Date(value);
    } else if (isNaN(new Date(value).getTime())) {
      return new Date(value);
    }
    throw new GraphQLError('Invalid Date format');
  }

  serialize(value: Date): string | null {
    // value sent to the client
    if (isNaN(new Date(value).getTime())) {
      return null;
    }

    const serverTimezoneOffset = new Date().getTimezoneOffset();
    if (/^\d{4}-\d{2}-\d{2}([T\s]\d{2}:\d{2}(:\d{2}(.\d+)?)?)?$/.test(value.toString())) {
      value = new Date(new Date(value).getTime() + 1000 * 60 * serverTimezoneOffset);
    }
    return new Date(value).toISOString();
  }

  parseLiteral(ast: ValueNode): Date | null {
    if (ast.kind === Kind.INT) {
      return new Date(ast.value);
    }
    return null;
  }
}
