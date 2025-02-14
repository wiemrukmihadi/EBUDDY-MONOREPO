import { User } from "@ebuddy/shared";

export function calculateRanking(user: User): number {
  return (user.totalAverageWeightRatings * 100) + (user.numberOfRents * 5) + (user.recentlyActive / 1e9);
}
