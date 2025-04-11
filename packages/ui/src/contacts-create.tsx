import { useEffect, useRef, useState } from 'react'
import { CustomAppLayout } from './details/components/app-layout'
import {
  AppLayoutProps,
  BreadcrumbGroup,
  Button,
  Container,
  DatePicker,
  Form,
  FormField,
  Header,
  Input,
  SideNavigation,
  SpaceBetween,
  Spinner,
} from '@cloudscape-design/components'
import {
  ActionFunctionArgs,
  Form as FormWrapper,
  useActionData,
} from 'react-router'

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  await new Promise((resolve) => setTimeout(resolve, 3000))
  return formData
}

export default function ContactsCreate() {
  const [loading, setLoading] = useState(false)
  const [birthdate, setBirthdate] = useState<string>('')
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [nickname, setNickname] = useState<string>('')

  const appLayout = useRef<AppLayoutProps.Ref>(null)

  const data = useActionData()

  useEffect(() => {
    if (data) setLoading(false)
  }, [data])

  return (
    <CustomAppLayout
      ref={appLayout}
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
      breadcrumbs={<BreadcrumbGroup items={[{ text: 'Home', href: '#' }]} />}
      content={
        <FormWrapper method="post" onSubmit={() => setLoading(true)}>
          <Form
            actions={
              <SpaceBetween direction="horizontal" size="xs">
                <Button variant="link" href="/contacts">
                  Cancel
                </Button>
                <Button variant="primary" formAction="submit">
                  {loading && <Spinner />} Submit
                </Button>
              </SpaceBetween>
            }
            header={<Header variant="h1">Your Contacts</Header>}
          >
            <Container>
              <SpaceBetween direction="vertical" size="l">
                <FormField label="First name">
                  <Input
                    name="first_name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.detail.value)}
                  />
                </FormField>
                <FormField label="Last name">
                  <Input
                    name="last_name"
                    value={lastName}
                    onChange={(e) => setLastName(e.detail.value)}
                  />
                </FormField>
                <FormField label="Nickname">
                  <Input
                    name="nickname"
                    value={nickname}
                    onChange={(e) => setNickname(e.detail.value)}
                  />
                </FormField>
                <FormField
                  label="Birthdate"
                  constraintText="Use YYYY/MM/DD format."
                >
                  <DatePicker
                    onChange={({ detail }) => setBirthdate(detail.value)}
                    value={birthdate}
                    placeholder="YYYY/MM/DD"
                  />
                </FormField>
              </SpaceBetween>
            </Container>
          </Form>
        </FormWrapper>
      }
      contentType="form"
    />
  )
}
