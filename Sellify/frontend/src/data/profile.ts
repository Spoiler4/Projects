export type ProfileTier = "Bronze" | "Silver" | "Gold" | "Platinum";

export type ProfileStats = {
  orders: number;
  saved: number;
  reviews: number;
  points: number;
};

export type ProfileMembership = {
  tier: ProfileTier;
  nextTier: ProfileTier;
  progress: number;
};

export type Profile = {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  bio: string;
  location: string;
  joined: string;
  stats: ProfileStats;
  membership: ProfileMembership;
};

export const mockProfile: Profile = {
  id: "usr_001",
  name: "Kamau Ngoroge",
  email: "Kamau.njoroge@email.com",
  phone: "+254 (0) 123-234-567",
  avatar:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
  bio: "Fashion enthusiast & sneaker collector based in Nairobi.",
  location: "Nairobi, KE",
  joined: "November 2026",
  stats: {
    orders: 24,
    saved: 12,
    reviews: 8,
    points: 1250,
  },
  membership: {
    tier: "Gold",
    nextTier: "Platinum",
    progress: 65,
  },
};

export type MenuItem = {
  icon: string;
  label: string;
  route: string;
  destructive?: boolean;
};

export const menuItems: MenuItem[] = [
  { icon: "Package", label: "My Orders", route: "/orders" },
  { icon: "Heart", label: "Wishlist", route: "/wishlist" },
  { icon: "CreditCard", label: "Payment Methods", route: "/payment" },
  { icon: "MapPin", label: "Addresses", route: "/addresses" },
  { icon: "Settings", label: "Settings", route: "/settings" },
  { icon: "Shield", label: "Help & Support", route: "/help" },
  { icon: "LogOut", label: "Logout", route: "/logout", destructive: true },
];
