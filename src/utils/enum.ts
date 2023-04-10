export enum UserType {

  business = 'business',

  shop = 'shop',

  carrier = 'carrier',
  // system
  system = 'system'
}

export enum UserStatus {
 
  pending = "pending",
 
  active = 'active',

  banned = 'banned'
}

export enum OrderType {
  // voice call
  onlineEmergency='onlineEmergency',
  // video call
  online='online',
  // ordered meet 
  fulfilled = 'fulfilled',
  // emergency meet 
  fulfilledEmergency = 'fulfilledEmergency'
}

export enum OrderStatus {

  pending = 'pending',

  active = 'active',

  delivering = 'delivering',

  finished = 'finished'

  cancelled = 'cancelled'
}