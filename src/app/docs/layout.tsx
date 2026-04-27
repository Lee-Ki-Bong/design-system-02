'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Sidebar, type SidebarSection } from '@/components/organisms/Sidebar';

const sections: SidebarSection[] = [
  {
    title: 'Components',
    items: [
      { label: 'Design Tokens', href: '/docs/tokens' },
      {
        label: 'Atoms',
        href: '/docs/atoms',
        children: [
          { label: 'Button', href: '/docs/atoms/button' },
          { label: 'Input', href: '/docs/atoms/input' },
          { label: 'Select', href: '/docs/atoms/select' },
          { label: 'Textarea', href: '/docs/atoms/textarea' },
          { label: 'Checkbox', href: '/docs/atoms/checkbox' },
          { label: 'Radio', href: '/docs/atoms/radio' },
          { label: 'Switch', href: '/docs/atoms/switch' },
          { label: 'Badge', href: '/docs/atoms/badge' },
          { label: 'Avatar', href: '/docs/atoms/avatar' },
          { label: 'Icon', href: '/docs/atoms/icon' },
          { label: 'Tooltip', href: '/docs/atoms/tooltip' },
          { label: 'Spinner', href: '/docs/atoms/spinner' },
          { label: 'Skeleton', href: '/docs/atoms/skeleton' },
          { label: 'Progress', href: '/docs/atoms/progress' },
          { label: 'Divider', href: '/docs/atoms/divider' },
        ],
      },
      {
        label: 'Molecules',
        href: '/docs/molecules',
        children: [
          { label: 'Tag', href: '/docs/molecules/tag' },
          { label: 'AvatarGroup', href: '/docs/molecules/avatar-group' },
          { label: 'Stat', href: '/docs/molecules/stat' },
          { label: 'Card', href: '/docs/molecules/card' },
          { label: 'EmptyState', href: '/docs/molecules/empty-state' },
          { label: 'Breadcrumb', href: '/docs/molecules/breadcrumb' },
          { label: 'Pagination', href: '/docs/molecules/pagination' },
          { label: 'Tabs', href: '/docs/molecules/tabs' },
          { label: 'NavItem', href: '/docs/molecules/nav-item' },
          { label: 'Popover', href: '/docs/molecules/popover' },
          { label: 'DropdownMenu', href: '/docs/molecules/dropdown-menu' },
          { label: 'Modal', href: '/docs/molecules/modal' },
          { label: 'Drawer', href: '/docs/molecules/drawer' },
          { label: 'Alert', href: '/docs/molecules/alert' },
          { label: 'Toast', href: '/docs/molecules/toast' },
          { label: 'Accordion', href: '/docs/molecules/accordion' },
          { label: 'SearchInput', href: '/docs/molecules/search-input' },
          { label: 'FileUpload', href: '/docs/molecules/file-upload' },
          { label: 'ListItem', href: '/docs/molecules/list-item' },
          { label: 'DatePicker', href: '/docs/molecules/date-picker' },
        ],
      },
      {
        label: 'Organisms',
        href: '/docs/organisms',
        children: [
          { label: 'DataTable', href: '/docs/organisms/data-table' },
          { label: 'FilterBar', href: '/docs/organisms/filter-bar' },
          { label: 'FormLayout', href: '/docs/organisms/form-layout' },
          { label: 'ImageUpload', href: '/docs/organisms/image-upload' },
          { label: 'Sidebar', href: '/docs/organisms/sidebar' },
          { label: 'Header', href: '/docs/organisms/header' },
          { label: 'Footer', href: '/docs/organisms/footer' },
        ],
      },
      {
        label: 'Templates',
        href: '/docs/templates',
        children: [
          { label: 'Dashboard', href: '/docs/templates/dashboard' },
          { label: 'ListPage', href: '/docs/templates/list' },
          { label: 'FormPage', href: '/docs/templates/form' },
          { label: 'Auth', href: '/docs/templates/auth' },
        ],
      },
    ],
  },
];

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex min-h-screen">
      <Sidebar
        brand={{ logo: 'B', name: 'Whitebong UI', href: '/docs' }}
        sections={sections}
        activePath={pathname}
        onNavigate={(href) => router.push(href)}
        style={{ position: 'fixed', top: 0, left: 0, height: '100vh' }}
      />
      <main style={{ marginLeft: '240px', flex: 1, padding: 'var(--pad-2xl)' }}>{children}</main>
    </div>
  );
}
