import type { Metadata } from 'next';
import Timeline from '@/components/Timeline'

export const metadata: Metadata = {
    title: "doori | 타임라인",
    description: "예식 준비 일정을 한눈에 파악하고 정리해 보세요."
};

export default function TimelinePage() {
    return (
        <Timeline />
    )
}
