import ServiceData from './ServiceData';

export default interface IService<T> {
  findAll(): Promise<ServiceData<T[]>>;
}
