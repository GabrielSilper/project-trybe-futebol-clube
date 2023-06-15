// import { NewEntity } from '.';
import ServiceData from './ServiceData';

export interface ICRUDServiceReader<T> {
  findAll(): Promise<ServiceData<T[]>>;
  findById(id: number): Promise<ServiceData<T>>;
}

export interface ICRUDServiceDeleter {
  delete(id: number): Promise<ServiceData<number>>;
}

export interface ICRUDService<T> extends ICRUDServiceReader<T>, ICRUDServiceDeleter {}
