import knex from 'knex'
import knexfile from '../../knexfile.mjs'
import { NODE_ENV } from '../lib/constants.js'

export const db = knex(knexfile[NODE_ENV])
