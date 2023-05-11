export enum UserType {
  business = 'business',

  panelist = 'panelist',

  user = 'user',

  // system
  system = 'system',
}

export enum UserStatus {
  pending = 'pending',

  active = 'active',

  banned = 'banned',
}

export enum PaymentStatus {
  pending = 'pending',

  active = 'active',

  denied = 'denied',
}

export enum UserRank {
  bronze = 'bronze',
  silver = 'silver',
}

export enum BusinessRank {
  bronze = 'bronze',
}

export enum SaleTypes {
  price = 'price',
  voucher = 'voucher',
  certificate = 'certificate',
}
