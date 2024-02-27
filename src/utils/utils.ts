import type { PurchaseItem } from "@/types/item.types";

export const calculateDaysLeft = (item: PurchaseItem): number => {
    const currentTime = new Date().getTime();
    const createdAtTime = new Date(item.createdAt).getTime();
    const elapsedTime = currentTime - createdAtTime;
    let remainingTime = item.duration * 24 * 60 * 60 * 1000 - elapsedTime;
    remainingTime = Math.max(remainingTime, 0); // Ensure remainingTime is not negative
    return Math.ceil(remainingTime / (24 * 60 * 60 * 1000));
  };
  