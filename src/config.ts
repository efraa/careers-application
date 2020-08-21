import dotenv from 'dotenv'
dotenv.config()

export const config = {
  SERVER: {
    PORT: parseInt(process.env.PORT as string),
    PREFIX_ROUTES: process.env.PREFIX_ROUTES as string,
  },
  PAGINATION: {
    PAGE: parseInt(process.env.PAGINATION_PAGE as string),
    PER_PAGE: parseInt(process.env.PAGINATION_PER_PAGE as string),
  },
  AGENT_CLIENT: process.env.AGENT_CLIENT,
}
