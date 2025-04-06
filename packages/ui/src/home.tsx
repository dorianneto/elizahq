import {
  BreadcrumbGroup,
  Container,
  Header,
  SideNavigation,
} from '@cloudscape-design/components'
import { CustomAppLayout } from './details/components/app-layout'

export default function Home() {
  return (
    <CustomAppLayout
      stickyNotifications
      toolsHide
      navigation={
        <SideNavigation
          activeHref={'#'}
          items={[
            {
              type: 'link',
              text: 'Dashboard',
              href: '/',
            },
            {
              type: 'link',
              text: 'Contacts',
              href: '/contacts',
            },
            {
              type: 'link',
              text: 'Journal',
              href: '/journal',
            },
            {
              type: 'link',
              text: 'Birthdays',
              href: '/birthdays',
            },
            {
              type: 'link',
              text: 'Locations',
              href: '/locations',
            },
          ]}
        />
      }
      breadcrumbs={<BreadcrumbGroup items={[{ text: 'Dashboard', href: '#' }]} />}
      content={
        <Container
          header={
            <Header variant="h2" description="Container description">
              Container header
            </Header>
          }
        >
          <div className="contentPlaceholder" />
        </Container>
      }
    />
  )
}
