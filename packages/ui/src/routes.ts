import { createBrowserRouter } from 'react-router'
import App from './app'
import Home from './home'
import Contacts, { loader as ContactsLoader } from './contacts'
import ContactsCreate, {
  action as ContactsCreateAction,
} from './contacts-create'
import Login from './login'
import ProtectedRoute from './auth/protected-route'
import ContactsUpdate, {
  loader as ContactLoader,
  action as ContactsUpdateAction,
} from './contacts-update'

export const router = createBrowserRouter([
  {
    path: 'login',
    Component: Login,
  },
  {
    path: '/',
    Component: ProtectedRoute,
    children: [
      {
        Component: App,
        path: '/',
        children: [
          { index: true, Component: Home },
          { path: 'contacts', Component: Contacts, loader: ContactsLoader },
          {
            path: 'contacts/new',
            Component: ContactsCreate,
            action: ContactsCreateAction,
          },
          {
            path: 'contacts/:id',
            Component: ContactsUpdate,
            loader: ContactLoader,
            action: ContactsUpdateAction,
          },
        ],
      },
    ],
  },
])
