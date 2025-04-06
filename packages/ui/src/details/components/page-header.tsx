import React from 'react'

import Button from '@cloudscape-design/components/button'
import ButtonDropdown, {
  ButtonDropdownProps,
} from '@cloudscape-design/components/button-dropdown'
import Header from '@cloudscape-design/components/header'
import SpaceBetween from '@cloudscape-design/components/space-between'

export const PageHeader = ({
  title,
  buttons,
}: {
  title: string
  buttons: ButtonDropdownProps.ItemOrGroup[]
}) => {
  return (
    <Header
      variant="h1"
      actions={
        <SpaceBetween direction="horizontal" size="xs">
          {buttons.map((button, key) =>
            button.itemType === 'action' ? (
              <Button
                href={button.href || ''}
                disabled={button.disabled || false}
                key={key}
              >
                {button.text}
              </Button>
            ) : (
              <ButtonDropdown
                items={(button as ButtonDropdownProps.ItemGroup).items}
                key={key}
              >
                {button.text}
              </ButtonDropdown>
            )
          )}
        </SpaceBetween>
      }
    >
      {title}
    </Header>
  )
}
