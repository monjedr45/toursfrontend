import { rest } from 'msw'
import { mockAllToursData } from '../mockData/mockAllToursData'

export const handlers = [
  rest.get('http://127.1.0.1:3000/api/v1/tours', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        stats: 'successful',
        results: mockAllToursData.length,
        data: {
          mockAllToursData
        }
    })
    )
  }),
]
