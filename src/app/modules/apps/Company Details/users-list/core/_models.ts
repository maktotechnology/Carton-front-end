import {ID, Response} from '../../../../../../_metronic/helpers'

export type User = {
  id?: ID
  firstname?: string   // This can be used for the first name
  avatar?: string
  email?: string
  position?: string
  role?: string
  company_name?: string
  status: string;
  address1?:string
  phone_number?: string   // This represents the phone number
  last_login?: string
  two_steps?: boolean  // This can represent the Active/Inactive status
  active_inactive?: string
  joined_day?: string  // This can represent the join date (created time)
  online?: boolean
  initials?: {
    label: string
    state: string
  }
}

export type UsersQueryResponse = Response<Array<User>>

export const initialUser: User = {
  avatar: 'avatars/300-6.jpg',
  position: 'Art Director',
  phone_number: '55555',
  firstname: '',
  email: '',
}
