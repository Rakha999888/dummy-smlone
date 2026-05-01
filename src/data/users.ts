export interface User {
  id: string
  name: string
  password: string
  trainingLink: string
  initials: string
  gender: 'male' | 'female'
}

export const USERS: User[] = [
  {
    id: 'SML001',
    name: 'Cedric Yago',
    password: '123456',
    trainingLink: 'https://smlone.xyz/cedricyagoss',
    initials: 'CY',
    gender: 'male',
  },
  {
    id: 'SML002',
    name: 'Claryce Yu',
    password: '123456',
    trainingLink: 'https://smlone.xyz/claryceannabelleyuss',
    initials: 'CY',
    gender: 'female',
  },
  {
    id: 'SML003',
    name: 'Alvaro',
    password: '123456',
    trainingLink: 'https://smlone.xyz/alvarorichietheusss',
    initials: 'AL',
    gender: 'male',
  },
  {
    id: 'SML004',
    name: 'Luiz Alvaro',
    password: '123456',
    trainingLink: 'https://smlone.xyz/luizalvarodiegoss',
    initials: 'LA',
    gender: 'male',
  },
  {
    id: 'SML005',
    name: 'Kelsya',
    password: '123456',
    trainingLink: 'https://smlone.xyz/KelsyaShanarevaLegistaBrSitepu',
    initials: 'KL',
    gender: 'female',
  },
]
