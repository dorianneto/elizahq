import { useRef } from "react";
import { CustomAppLayout } from "./details/components/app-layout";
import {
  AppLayoutProps,
  BreadcrumbGroup,
  Button,
  Container,
  Form,
  FormField,
  Header,
  Input,
  Link,
  SideNavigation,
  SpaceBetween,
} from "@cloudscape-design/components";

export default function FeatureManagementCreate() {
  const appLayout = useRef<AppLayoutProps.Ref>(null);

  return (
    <CustomAppLayout
      ref={appLayout}
      navigation={
        <SideNavigation
          activeHref={"#"}
          items={[
            {
              type: "link",
              text: "Feature Management",
              href: "/fm",
            },
          ]}
        />
      }
      breadcrumbs={<BreadcrumbGroup items={[{ text: "Home", href: "#" }]} />}
      content={
        <Form
          actions={
            <SpaceBetween direction="horizontal" size="xs">
              <Button formAction="none" variant="link">
                Cancel
              </Button>
              <Button variant="primary">Submit</Button>
            </SpaceBetween>
          }
          header={
            <Header
              variant="h1"
              description="Some description"
              info={<Link variant="info">Info</Link>}
            >
              Form header
            </Header>
          }
        >
          <Container
            header={<Header variant="h2">Form container header</Header>}
          >
            <SpaceBetween direction="vertical" size="l">
              <FormField label="First field" info={<Link variant="info">Info</Link>} description="Some description" constraintText="Some constraint text">
                <Input value="" />
              </FormField>
              <FormField label="Second field">
                <Input value="" />
              </FormField>
              <FormField label="Third field">
                <Input value="" />
              </FormField>
            </SpaceBetween>
          </Container>
        </Form>
      }
      contentType="form"
    />
  );
}
