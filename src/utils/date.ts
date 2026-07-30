export function calculateWeddingPeriod(weddingDateStr: string) {
    const today = new Date();
    const weddingDate = new Date(weddingDateStr);

    today.setHours(0, 0, 0, 0);
    weddingDate.setHours(0, 0, 0, 0);

    const diffTime = weddingDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const periodMonths = Math.max(1, Math.round(diffDays / 30));

    return {
        diffDays,
        dDayText: diffDays === 0 ? 'D-Day' : diffDays > 0 ? `D-${diffDays}` : `D+${Math.abs(diffDays)}`,
        periodMonths
    }
};

export const parseDDay = (dDayStr: string): number => {
    const num = parseInt(dDayStr.replace(/[^0-9]/g, ""), 10);

    return isNaN(num) ? 0 : num;
}