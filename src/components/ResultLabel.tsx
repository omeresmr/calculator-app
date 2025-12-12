import type ChildrenInterface from '../interfaces/ChildrenInterface';

export default function ResultLabel({ children }: ChildrenInterface) {
  return <p className="text-white text-3xl">{children}</p>;
}
