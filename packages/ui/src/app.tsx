import { Input, TopNavigation } from '@cloudscape-design/components'
import '@cloudscape-design/global-styles/index.css'
import React from 'react'

// import { applyMode, Mode } from '@cloudscape-design/global-styles'
import { Outlet } from 'react-router'
import { useAuth } from './auth/auth-context'

// apply a color mode
// applyMode(Mode.Dark)

export default function App() {
  const [searchValue, setSearchValue] = React.useState('')

  const { signOut } = useAuth()

  const profileActions = [
    { id: 'profile', text: 'Profile' },
    { id: 'preferences', text: 'Preferences' },
    { id: 'security', text: 'Security' },
    {
      id: 'support-group',
      text: 'Support',
      items: [
        {
          id: 'documentation',
          text: 'Documentation',
          href: '#',
          external: true,
          externalIconAriaLabel: ' (opens in new tab)',
        },
        {
          id: 'feedback',
          text: 'Feedback',
          href: '#',
          external: true,
          externalIconAriaLabel: ' (opens in new tab)',
        },
        { id: 'support', text: 'Customer support' },
      ],
    },
    { id: 'sign-out', text: 'Sign Out' },
  ]

  return (
    <>
      <TopNavigation
        // i18nStrings={i18nStrings}
        identity={{
          href: '/',
          title: 'Eliza',
          // logo: { src: logo, alt: 'Service name logo' },
        }}
        search={
          <Input
            ariaLabel="Input field"
            clearAriaLabel="Clear"
            value={searchValue}
            type="search"
            placeholder="Search"
            onChange={({ detail }) => setSearchValue(detail.value)}
          />
        }
        utilities={[
          {
            type: 'button',
            iconName: 'notification',
            ariaLabel: 'Notifications',
            badge: true,
            disableUtilityCollapse: true,
          },
          {
            type: 'button',
            iconName: 'settings',
            title: 'Settings',
            ariaLabel: 'Settings',
          },
          {
            type: 'menu-dropdown',
            text: 'Customer name',
            description: 'customer@example.com',
            iconName: 'user-profile',
            items: profileActions,
            onItemClick: async (event) => {
              if (event.detail.id === 'sign-out') {
                await signOut()
              }
            },
          },
        ]}
      />
      <Outlet />
    </>
  )
}
