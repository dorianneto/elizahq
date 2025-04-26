import { useCallback, useRef, useState } from 'react'
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
  const [selectedItems, setSelectedItems] = useState([])
  const [page, setPage] = useState(1)

  const data = useLoaderData<typeof loader>()
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
          items={data.data}
          loadingText="Loading resources"
          selectionType="multi"
          trackBy="_id"
          empty={
            <Box margin={{ vertical: 'xs' }} textAlign="center" color="inherit">
              <SpaceBetween size="m">
                <b>No resources</b>
                <Button>Create resource</Button>
              </SpaceBetween>
            </Box>
          }
          filter={<TextFilter filteringPlaceholder="Find resources" />}
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
              disabled={!data?.pagination[0]?.count}
              currentPageIndex={page}
              onChange={({ detail }) => {
                setPage(detail.currentPageIndex)
                navigate(`/contacts?p=${detail.currentPageIndex}`, {
                  replace: true,
                })
              }}
              pagesCount={Math.round(data?.pagination[0]?.count / 10)}
            />
          }
          preferences={
            <CollectionPreferences
              title="Preferences"
              confirmLabel="Confirm"
              cancelLabel="Cancel"
              preferences={{
                pageSize: 6,
                visibleContent: ['description', 'type', 'size'],
              }}
              pageSizePreference={{
                title: 'Page size',
                options: [
                  { value: 6, label: '6 resources' },
                  { value: 12, label: '12 resources' },
                ],
              }}
              visibleContentPreference={{
                title: 'Select visible content',
                options: [
                  {
                    label: 'Main distribution properties',
                    options: [
                      {
                        id: 'description',
                        label: 'Description',
                      },
                      { id: 'type', label: 'Type' },
                      { id: 'size', label: 'Size' },
                    ],
                  },
                ],
              }}
            />
          }
        />
      }
      contentType="cards"
    />
  )
}
