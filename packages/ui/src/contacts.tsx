import { useRef, useState } from "react";
import { CustomAppLayout } from "./details/components/app-layout";
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
} from "@cloudscape-design/components";
import { PageHeader } from "./details/components/page-header";

export default function Contacts() {
  const appLayout = useRef<AppLayoutProps.Ref>(null);
  const [selectedItems, setSelectedItems] = useState([{ name: "Item 2" }]);

  return (
    <CustomAppLayout
      ref={appLayout}
      navigation={
        <SideNavigation
          activeHref={"#"}
          items={[
            {
              type: "link",
              text: "Dashboard",
              href: "/",
            },
            {
              type: "link",
              text: "Contacts",
              href: "/contacts",
            },
            {
              type: "link",
              text: "Journal",
              href: "/journal",
            },
            {
              type: "link",
              text: "Birthdays",
              href: "/birthdays",
            },
            {
              type: "link",
              text: "Locations",
              href: "/locations",
            },
          ]}
        />
      }
      breadcrumbs={<BreadcrumbGroup items={[{ text: "Home", href: "#" }]} />}
      content={
        <Cards
          variant="full-page"
          onSelectionChange={({ detail }) =>
            setSelectedItems(detail?.selectedItems ?? [])
          }
          selectedItems={selectedItems}
          ariaLabels={{
            itemSelectionLabel: (e, i) => `select ${i.name}`,
            selectionGroupLabel: "Item selection",
          }}
          cardDefinition={{
            header: (item) => (
              <Link href={`/contacts/${item.id}`} fontSize="heading-m">
                {item.name}
              </Link>
            ),
            sections: [
              {
                id: "description",
                header: "Description",
                content: (item) => item.description,
              },
              {
                id: "type",
                header: "Type",
                content: (item) => item.type,
              },
              {
                id: "size",
                header: "Size",
                content: (item) => item.size,
              },
            ],
          }}
          cardsPerRow={[{ cards: 1 }, { minWidth: 500, cards: 4 }]}
          items={[
            {
              id: "1",
              name: "Item 1",
              alt: "First",
              description: "This is the first item",
              type: "1A",
              size: "Small",
            },
            {
              id: "2",
              name: "Item 2",
              alt: "Second",
              description: "This is the second item",
              type: "1B",
              size: "Large",
            },
            {
              id: "3",
              name: "Item 3",
              alt: "Third",
              description: "This is the third item",
              type: "1A",
              size: "Large",
            },
            {
              id: "4",
              name: "Item 4",
              alt: "Fourth",
              description: "This is the fourth item",
              type: "2A",
              size: "Small",
            },
            {
              id: "5",
              name: "Item 5",
              alt: "Fifth",
              description: "This is the fifth item",
              type: "2A",
              size: "Large",
            },
            {
              id: "6",
              name: "Item 6",
              alt: "Sixth",
              description: "This is the sixth item",
              type: "1A",
              size: "Small",
            },
          ]}
          loadingText="Loading resources"
          selectionType="multi"
          trackBy="name"
          visibleSections={["description", "type", "size"]}
          empty={
            <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
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
              actions={<Button href="/contacts/new">New</Button>}
              counter={
                selectedItems?.length
                  ? "(" + selectedItems.length + "/10)"
                  : "(10)"
              }
            >
              Your Contacts
            </Header>
          }
          pagination={<Pagination currentPageIndex={1} pagesCount={2} />}
          preferences={
            <CollectionPreferences
              title="Preferences"
              confirmLabel="Confirm"
              cancelLabel="Cancel"
              preferences={{
                pageSize: 6,
                visibleContent: ["description", "type", "size"],
              }}
              pageSizePreference={{
                title: "Page size",
                options: [
                  { value: 6, label: "6 resources" },
                  { value: 12, label: "12 resources" },
                ],
              }}
              visibleContentPreference={{
                title: "Select visible content",
                options: [
                  {
                    label: "Main distribution properties",
                    options: [
                      {
                        id: "description",
                        label: "Description",
                      },
                      { id: "type", label: "Type" },
                      { id: "size", label: "Size" },
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
  );
}
