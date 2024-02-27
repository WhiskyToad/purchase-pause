export type PurchaseItem = {
    id: number;
    itemName: string;
    description?: string;
    cost: number;
    duration: number;
    createdAt: string;
    completedAt?: string | null;
    status?: 'purchased' | 'not_purchased' | null;
}

export type PurchaseItemWithCountdown = PurchaseItem & {
    daysLeft: number;
};
