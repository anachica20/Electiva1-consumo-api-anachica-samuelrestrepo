import type { ResponseCharacter } from '../types/api'

export const getCharacters = async (): Promise<ResponseCharacter> => {
  const baseUrl = 'https://rickandmortyapi.com/api/character'

  const response = await fetch(baseUrl)

  if (!response.ok) {
    throw new Error(`Failed to fetch characters: ${response.status}`)
  }

  const data = (await response.json()) as ResponseCharacter

  return data
}