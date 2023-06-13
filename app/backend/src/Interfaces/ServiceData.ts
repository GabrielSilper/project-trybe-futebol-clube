export type TypeError = 'NOT_FOUND';

export type Message = { message: string };

export type ServiceOK<T> = {
  type: null;
  status: number;
  data: T;
};

export type ServiceError = {
  type: TypeError;
  status: number;
  data: Message;
};

type ServiceData<T> = ServiceOK<T> | ServiceError;

export default ServiceData;
