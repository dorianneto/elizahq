import { createBrowserRouter } from "react-router";
import App from "./app";
import Home from "./home";
import Contacts from "./contacts";
import ContactsView from "./contacts-view";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: Home },
      { path: 'contacts', Component: Contacts },
      { path: 'contacts/:id', Component: ContactsView },
      // { path: "about", Component: About },
    //   {
    //     path: "auth",
    //     Component: AuthLayout,
    //     children: [
    //       { path: "login", Component: Login },
    //       { path: "register", Component: Register },
    //     ],
    //   },
    //   {
    //     path: "concerts",
    //     children: [
    //       { index: true, Component: ConcertsHome },
    //       { path: ":city", Component: ConcertsCity },
    //       { path: "trending", Component: ConcertsTrending },
    //     ],
    //   },
    ],
  },
]);
