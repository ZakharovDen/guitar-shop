import { Link } from 'react-router-dom'; // Используйте react-router-dom для навигации

export type BreadcrumbsItem = {
  label: string;
  path: string;
}

type BreadcrumbsProps = {
  breadcrumbs: BreadcrumbsItem[],
  contentClass?: boolean,
}

function Breadcrumbs({ breadcrumbs, contentClass = false }: BreadcrumbsProps): JSX.Element {
  return (
    <ul className={`breadcrumbs ${contentClass ? 'page-content__breadcrumbs' : ''}`}>
      {breadcrumbs.map((item, index) => (
        <li key={index} className="breadcrumbs__item">
          <Link className="link" to={item.path}>
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Breadcrumbs;