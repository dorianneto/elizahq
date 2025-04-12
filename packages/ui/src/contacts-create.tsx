import { useEffect, useRef, useState } from 'react'
import { CustomAppLayout } from './details/components/app-layout'
import {
  AppLayoutProps,
  BreadcrumbGroup,
  Button,
  Container,
  DatePicker,
  Flashbar,
  FlashbarProps,
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
import { createContact } from './api/contacts'

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()

  try {
    return await createContact({
      first_name: formData.get('first_name') as string,
      last_name: formData.get('last_name') as string,
      nickname: formData.get('nickname') as string,
      birthdate: formData.get('birthdate') as string,
    })
  } catch (error) {
    console.error('Error creating contact:', error)
    return error
  }
}

export default function ContactsCreate() {
  const [items, setItems] = useState<FlashbarProps.MessageDefinition[]>([])
  const [loading, setLoading] = useState(false)
  const [birthdate, setBirthdate] = useState<string>('')
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [nickname, setNickname] = useState<string>('')

  const appLayout = useRef<AppLayoutProps.Ref>(null)

  const data = useActionData()

  useEffect(() => {
    if (data?.isAxiosError) setLoading(false)
    if (data?._id) {
      setItems([
        ...items,
        {
          type: 'success',
          content: 'Contact created successfuly!',
          action: <Button href={`/contacts/${data._id}`}>View contact</Button>,
          dismissible: true,
          onDismiss: () =>
            setItems((items) => items.filter((item) => item.id !== data._id)),
          id: data._id,
        },
      ])
      setLoading(false)
    }
  }, [data])

  return (
    <CustomAppLayout
      ref={appLayout}
      notifications={<Flashbar stackItems items={items} />}
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
            errorText={data?.response?.data?.message
              .map((m: { message: string }) => m.message)
              .join(', ')}
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
                    onChange={(e) => {
                      setBirthdate(e.detail.value)
                    }}
                    value={birthdate}
                    placeholder="YYYY/MM/DD"
                    name="birthdate"
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
