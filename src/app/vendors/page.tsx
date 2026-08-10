import VendorSearch from '@/components/VendorSearch';
import type { Metadata } from 'next';
export const metadata: Metadata = {
    title: "doori | 업체",
    description: "내 위치 주변의 다양한 웨딩 업체를 지도에서 바로 찾아보세요."
};

export default function VendorsPage() {
    return (
        <VendorSearch />
    )
}
