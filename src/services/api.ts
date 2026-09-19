import type { ResponseCharacter, Character } from '../types/api'

export const getCharacters = async (signal?: AbortSignal
): Promise<ResponseCharacter> => {
  const baseUrl = 'https://rickandmortyapi.com/api/character'

  const response = await fetch(baseUrl, { signal })

  if (!response.ok) {
    throw new Error(`Failed to fetch characters: ${response.status}`)
  }

  const data = (await response.json()) as ResponseCharacter

  return data
}

export const getCharacterById = async (id: number,
  signal?: AbortSignal
): Promise<Character> => {
  const baseUrl = `https://rickandmortyapi.com/api/character/${id}`

  const response = await fetch(baseUrl, { signal })

  if (!response.ok) {
    throw new Error(`Failed to fetch character: ${response.status}`)
  }

  const data = (await response.json()) as Character

  return data
}

export const getCharactersByName = async (
  name: string,
  signal?: AbortSignal
): Promise<ResponseCharacter | null> => {
  const search = encodeURIComponent(name.trim())
  const baseUrl = `https://rickandmortyapi.com/api/character?name=${search}`

  const response = await fetch(baseUrl, { signal })

  if (response.status === 404) {
    return null
  }

  if (!response.ok) {
    throw new Error(`Failed to search characters: ${response.status}`)
  }

  const data = (await response.json()) as ResponseCharacter

  return data
}