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

export const updateContact = async (
  id: string,
  contact: {
    first_name: string
    last_name: string
    nickname: string
    birthdate: string
  },
) => {
  const response = await client.patch(`contacts/${id}`, JSON.stringify(contact))

  if (response.status !== 200) {
    throw new Error('Failed to update contact')
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

export const loadContact = async ({ id }: { id: string }) => {
  const response = await client.get(`contacts/${id}`)

  if (response.status !== 200) {
    throw new Error('Failed to load contact')
  }

  return response.data
}

export const removeContact = async ({ id }: { id: string }) => {
  const response = await client.delete(`contacts/${id}`)

  if (response.status !== 200) {
    throw new Error('Failed to delete contact')
  }

  return response
}
