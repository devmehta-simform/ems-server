import { z } from 'zod';

const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
  // console.log(issue);
  if (issue.code === z.ZodIssueCode.invalid_type) {
    return {
      message: `Error: In ${issue.path.join(', ')} Expected ${issue.expected}, received ${issue.received === 'undefined' || issue.received === 'null' ? 'nothing' : issue.received}`,
    };
  }
  if (issue.code === z.ZodIssueCode.custom) {
    return { message: `less-than-${(issue.params || {}).minimum}` };
  }
  if (issue.code === z.ZodIssueCode.invalid_union) {
    return {
      message: `Error: In ${issue.path.join(', ')} None of the union types matched`,
    };
  }
  return { message: ctx.defaultError };
};

z.setErrorMap(customErrorMap);
