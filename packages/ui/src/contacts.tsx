import { useCallback, useEffect, useRef, useState } from 'react'
import { CustomAppLayout } from './details/components/app-layout'
import {
  AppLayoutProps,
  Box,
  BreadcrumbGroup,
  Button,
  Cards,
  CollectionPreferences,
  Header,
  Link,
  Pagination,
  SideNavigation,
  SpaceBetween,
  TextFilter,
} from '@cloudscape-design/components'
import { useLoaderData, useNavigate, useRevalidator } from 'react-router'
import { loadContacts, removeContact } from './api/contacts'

export async function loader({ request }: { request: Request }) {
  const url = new URL(request.url)
  const page = url.searchParams.get('p') ?? 1
  return await loadContacts({ page: Number(page) })
}

export default function Contacts() {
  const loaderData = useLoaderData<typeof loader>()

  const [contacts, setContacts] = useState(loaderData)
  const [selectedItems, setSelectedItems] = useState([])
  const [page, setPage] = useState(1)
  const [filteringText, setFilteringText] = useState('')

  const revalidator = useRevalidator()
  const navigate = useNavigate()

  const appLayout = useRef<AppLayoutProps.Ref>(null)

  const handleDelete = useCallback(async () => {
    if (selectedItems.length === 0) return

    const ids = selectedItems.map((item: any) => item._id)
    await Promise.all(
      ids.map(async (id: string) => {
        await removeContact({ id })
      }),
    )
    setSelectedItems([])
    await revalidator.revalidate()
  }, [selectedItems, revalidator])

  useEffect(() => {
    const filtered = loaderData.data.filter(
      (i: any) =>
        i.first_name.toLowerCase().indexOf(filteringText.toLowerCase()) > -1,
    )

    setContacts({
      ...contacts,
      data: filtered,
    })
  }, [filteringText])

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
        <Cards
          variant="full-page"
          onSelectionChange={({ detail }) =>
            setSelectedItems(detail?.selectedItems ?? [])
          }
          selectedItems={selectedItems}
          ariaLabels={{
            itemSelectionLabel: (e, i) => `select ${i.first_name}`,
            selectionGroupLabel: 'Item selection',
          }}
          cardDefinition={{
            header: (item) => (
              <Link href={`/contacts/${item._id}`} fontSize="heading-m">
                {item.first_name} {item.last_name}
              </Link>
            ),
            sections: [
              {
                id: 'nickname',
                header: 'Nickname',
                content: (item) => item.nickname,
              },
              {
                id: 'birthdate',
                header: 'Birthdate',
                content: (item) => item.birthdate,
              },
            ],
          }}
          cardsPerRow={[{ cards: 1 }, { minWidth: 500, cards: 5 }]}
          items={contacts.data}
          loadingText="Loading contacts"
          selectionType="multi"
          trackBy="_id"
          empty={
            <Box margin={{ vertical: 'xs' }} textAlign="center" color="inherit">
              <SpaceBetween size="m">
                <b>No contacts</b>
                <Button>Create a contact</Button>
              </SpaceBetween>
            </Box>
          }
          filter={
            <TextFilter
              filteringPlaceholder="Find contacts"
              filteringText={filteringText}
              onChange={({ detail }) => setFilteringText(detail.filteringText)}
              countText={`${contacts.data.length} matches`}
            />
          }
          header={
            <Header
              variant="h1"
              actions={
                <SpaceBetween direction="horizontal" size="xs">
                  <Button
                    disabled={!selectedItems?.length}
                    onClick={handleDelete}
                  >
                    Delete
                  </Button>
                  <Button href="/contacts/new">New</Button>
                </SpaceBetween>
              }
              counter={
                selectedItems?.length
                  ? '(' + selectedItems.length + '/10)'
                  : '(10)'
              }
            >
              Your Contacts
            </Header>
          }
          pagination={
            <Pagination
              disabled={!contacts?.pagination[0]?.count}
              currentPageIndex={page}
              onChange={({ detail }) => {
                setPage(detail.currentPageIndex)
                navigate(`/contacts?p=${detail.currentPageIndex}`, {
                  replace: true,
                })
              }}
              pagesCount={Math.round(contacts?.pagination[0]?.count / 10)}
            />
          }
        />
      }
      contentType="cards"
    />
  )
}
