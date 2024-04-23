import type {
  ListKnightsResponse,
  CreateKnightsResponse,
  Knight
} from 'interfaces/knights.interface'
import api from './api'

export const KnightsService = {
  createKnights: async (knight: Knight) => {
    const responseKnights = await api.post<CreateKnightsResponse>('/knights', knight)
    return responseKnights.data
  },
  listAllKnights: async () => {
    const responseKnights = await api.get<ListKnightsResponse[]>('/knights')
    return responseKnights.data
  },
  listHallOfHero: async () => {
    const responseKnights = await api.get<ListKnightsResponse[]>('/knights?filter=heroes')
    return responseKnights.data
  },
  deleteKnights: async ({ knight_id }: { knight_id: string }) => {
    const responseKnights = await api.delete(`/knights/${knight_id}`)
    return responseKnights.data
  },
  updateKnights: async ({ knight_id, nickname }: { knight_id: string; nickname: string }) => {
    const responseKnights = await api.patch(`/knights/${knight_id}`, { nickname })
    return responseKnights.data
  }
}
