import { IMiddleware } from '../../../../src';

export const midd1: IMiddleware<any> = ({ getState }: any) => {
  return (next: any) => (action: any) => {
    console.log('pre', getState());
    const value = next(action);
    console.log('next', value);
    return value;
  };
};
