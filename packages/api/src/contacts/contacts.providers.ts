import { Connection } from 'mongoose';
import { ContactSchema } from './entities/contact.entity';

export const contactsProviders = [
  {
    provide: 'CONTACTS_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Contacts', ContactSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
