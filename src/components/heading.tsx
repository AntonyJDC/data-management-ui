import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '../components/ui/breadcrumb';
import { LinkItem, linksMenu } from '../data/LinksMenu';
import { FaChevronLeft } from 'react-icons/fa';

const findRoute = (route: LinkItem, path: string): LinkItem[] | null => {
  if (route.to === path) return [route];
  if (route.submenu) {
    for (const child of route.submenu) {
      const result = findRoute(child, path);
      if (result) return [route, ...result];
    }
  }
  return null;
};

export const generateBreadcrumbs = (
  path: string,
  routes: LinkItem[]
): LinkItem[] => {
  for (const route of routes) {
    const breadcrumbs = findRoute(route, path);
    if (breadcrumbs) return breadcrumbs;
  }
  return [];
};
const Heading = ({ title, description, buttons, icon }: any) => {
  const location = useLocation();
  const navigate = useNavigate();

  const breadcrumbs: LinkItem[] = generateBreadcrumbs(
    location.pathname,
    linksMenu
  );

  const handleGoToParent = () => {
    // Divide la ruta actual en segmentos
    const pathSegments = location.pathname.split('/');

    // Elimina el último segmento para obtener la ruta padre
    pathSegments.pop();

    // Une los segmentos restantes para formar la ruta padre
    const parentPath = pathSegments.join('/');

    // Navega a la ruta padre
    navigate(parentPath);
  };

  return (
    <div className='flex flex-col h-full md:flex-row items-center'>
      <div className='w-full pb-0 md:w-2/3'>
        <div className='flex flex-row items-center'>  
          {icon && (
            <div className='shadow-lg w-7 rounded-full mx-3'>{icon}</div>
          )}
          <p className='text-2xl md:text-3xl font-bold brightness-125'>{title}</p>
        </div>
        <p className='pt-3 pb-1'>{description}</p>
        <Breadcrumb className='py-3'>
          <BreadcrumbList>
            {breadcrumbs.map((item: any, index: number) => {
              return (
                <div className='contents' key={item.key}>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild key={item.key}>
                      
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  {index !== breadcrumbs.length - 1 && <BreadcrumbSeparator />}
                </div>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className='w-full flex md:w-1/3 flex-wrap justify-end  space-y-2 pb-4 md:pb-0 md:space-y-0 md:space-x-2 gap-y-2'>
        {buttons}
      </div>
    </div>
  );
};

Heading.displayName = 'Heading';

export { Heading };
