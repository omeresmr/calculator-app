import type ChildrenInterface from '../interfaces/ChildrenInterface';

export default function LastOperationLabel({ children }: ChildrenInterface) {
  return <p className="text-gray-400 text-2xl mb-2">{children}</p>;
}
