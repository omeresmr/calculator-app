import type ChildrenInterface from '../interfaces/ChildrenInterface';

export default function ButtonContainer({ children }: ChildrenInterface) {
  return <div className="btn-container">{children}</div>;
}
