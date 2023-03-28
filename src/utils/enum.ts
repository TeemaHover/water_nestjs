export enum UserType {
  user = 'user',
  admin = 'admin',
  lawyer = 'lawyer'
}

export enum UserStatus {
  pending = "pending",
  active = 'active',
  banned = 'banned'
}

export enum ServiceType {
  onlineEmergency='onlineEmergency',
  online='online',
  fulfilled = 'fulfilled',
  fulfilledEmergency = 'fulfilledEmergency'
}

export enum ServiceStatus {
  pending = 'pending',
  active = 'active',
  cancelled = 'cancelled',
  finished = 'finished'
}