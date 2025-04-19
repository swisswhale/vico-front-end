import * as tokenService from './tokenService'

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/collections`

async function createCollection(collectionData) {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(collectionData)
    })
    
    if (!res.ok) {
      const errorData = await res.json()
      throw new Error(errorData.message || 'Failed to create collection')
    }
    
    return await res.json()
  } catch (error) {
    console.error('Error creating collection:', error)
    throw error
  }
}

async function getCollections() {
  try {
    const res = await fetch(BASE_URL, {
      headers: { 'Authorization': `Bearer ${tokenService.getToken()}` }
    })

    if (!res.ok) {
      const errorData = await res.json()
      throw new Error(errorData.message || 'Failed to fetch collections')
    }

    return await res.json()
  } catch (error) {
    console.error('Error fetching collections:', error)
    throw error
  }
}

async function getCollection(id) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      headers: { 'Authorization': `Bearer ${tokenService.getToken()}` }
    })

    if (!res.ok) {
      const errorData = await res.json()
      throw new Error(errorData.message || 'Failed to fetch collection')
    }

    return await res.json()
  } catch (error) {
    console.error('Error fetching collection:', error)
    throw error
  }
}

async function updateCollection(id, collectionData) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(collectionData)
    })

    if (!res.ok) {
      const errorData = await res.json()
      throw new Error(errorData.message || 'Failed to update collection')
    }

    return await res.json()
  } catch (error) {
    console.error('Error updating collection:', error)
    throw error
  }
}

async function deleteCollection(id) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${tokenService.getToken()}` }
    })

    if (!res.ok) {
      const errorData = await res.json()
      throw new Error(errorData.message || 'Failed to delete collection')
    }

    return await res.json()
  } catch (error) {
    console.error('Error deleting collection:', error)
    throw error
  }
}

export { createCollection, getCollections, getCollection, updateCollection, deleteCollection }