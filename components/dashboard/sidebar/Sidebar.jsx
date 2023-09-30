'use client';

import { usePathname } from 'next/navigation'

import { menuItems } from '@/mocks/sidebar'

import MenuItem from './MenuItem'

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="w-full">
      {menuItems.map((item, i) => (
        <MenuItem
          key={item.label + i}
          {...item}
          selected={item.url === pathname}
        />
      ))}
    </div>
  );
};

export default Sidebar;
