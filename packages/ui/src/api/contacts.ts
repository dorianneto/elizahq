import { client } from './axios-instance'

export const createContact = async (contact: {
  first_name: string
  last_name: string
  nickname: string
  birthdate: string
}) => {
  const response = await client.post('contacts', JSON.stringify(contact))

  if (response.status !== 201) {
    throw new Error('Failed to create contact')
  }

  return response.data
}

export const loadContacts = async ({ page }: { page: number }) => {
  const response = await client.get('contacts', { params: { page } })

  if (response.status !== 200) {
    throw new Error('Failed to load contacts')
  }

  return response.data
}
