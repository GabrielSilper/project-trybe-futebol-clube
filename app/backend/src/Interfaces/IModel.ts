export default interface IModel<T> {
  findAll(): Promise<T[]>;
  findById(): Promise<T>;
}
