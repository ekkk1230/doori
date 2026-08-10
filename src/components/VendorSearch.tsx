'use client';

import { useDooriStore } from "@/store/useDooriStore";
import React, { useState, useEffect } from "react";

declare global {
    interface Window {
        kakao: any;
    }
}

interface Place {
    id: string;
    place_name: string;
    category_name: string;
    phone: string;
    address_name: string;
    road_address_name: string;
    place_url: string;
    x: string;
    y: string;
}

const CATEGORIES = ["웨딩홀", "스드메", "스튜디오", "드레스", "메이크업", "예물", "한복", "신혼여행"];

const CATEGORY_MAP: Record<string, string[]> = {
    "웨딩홀": ["예식장", "웨딩", "컨벤션"],
    "스드메": ["스튜디오", "드레스", "메이크업", "사진", "웨딩"],
    "스튜디오": ["스튜디오", "사진"],
    "드레스": ["드레스", "의류", "패션"],
    "메이크업": ["메이크업", "미용", "헤어"],
    "예물": ["귀금속", "보석", "시계", "주얼리", "예물"],
    "한복": ["한복", "맞춤한복"],
    "신혼여행": ["여행사", "관광"]
};

export default function VendorSearch() {
    const { location } = useDooriStore();
    const [searchLocation, setSearchLocation] = useState<string>(location || "");
    const [inputLocation, setInputLocation] = useState<string>(location || "");
    const [selectedCategory, setSelectedCategory] = useState<string>("웨딩홀");
    const [places, setPlaces] = useState<Place[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const [paginationObj, setPaginationObj] = useState<any>(null);
    const [hasNextPage, setHasNextPage] = useState<boolean>(false);

    useEffect(() => {
        if (location) {
            setSearchLocation(location);
            setInputLocation(location);
        }
    }, [location]);

    useEffect(() => {
        if (!searchLocation) {
            setError("지역 선택 정보가 없습니다.");
            return;
        }

        if (!window.kakao || !window.kakao.maps) {
            setError("카카오 지도 SDK가 로드되지 않았습니다.");
            return;
        }

        window.kakao.maps.load(() => {
            if (!window.kakao.maps.services) {
                setError("카카오 장소 검색(services) 라이브러리가 로드되지 않았습니다.");
                return;
            }

            fetchPlaces(1);
        });
    }, [searchLocation, selectedCategory]);
    
    const fetchPlaces = (page: number = 1) => {
        setLoading(true);
        setError(null);
    
        const ps = new window.kakao.maps.services.Places();
    
        // 검색어 정리: "서울 신림 웨딩홀" -> "신림 웨딩홀", "서울 종로 예물" -> "종로 예물"
        const locationParts = searchLocation.trim().split(" ");
        const keywordLocation = locationParts.length > 1 ? locationParts.slice(1).join(" ") : locationParts[0];
    
        let searchQuery = `${keywordLocation} ${selectedCategory}`;
        if (selectedCategory === "스튜디오") {
            searchQuery = `${keywordLocation} 웨딩스튜디오`;
        } else if (selectedCategory === "드레스") {
            searchQuery = `${keywordLocation} 드레스`;
        } else if (selectedCategory === "메이크업") {
            searchQuery = `${keywordLocation} 메이크업`;
        } else if (selectedCategory === "예물") {
            searchQuery = `${keywordLocation} 예물`;
        }
    
        const mainSubLocation = locationParts[locationParts.length - 1].replace(/(구|시|군|동)$/, "");
    
        ps.keywordSearch(
            searchQuery,
            (data: Place[], status: any, pagination: any) => {
                if (status === window.kakao.maps.services.Status.OK) {
                    const targetKeywords = CATEGORY_MAP[selectedCategory] || [];
    
                    const filteredData = data.filter((item) => {
                        const address = item.road_address_name || item.address_name;
                        const name = item.place_name;
                        const category = item.category_name || "";
    
                        const isCorrectLocation = 
                            address.includes(mainSubLocation) || 
                            address.includes(locationParts[0]) ||
                            keywordLocation.split(" ").some(part => address.includes(part));
    
                        const isCorrectCategory = 
                            targetKeywords.some((keyword) => category.includes(keyword)) ||
                            targetKeywords.some((keyword) => name.includes(keyword)) ||
                            category.includes("귀금속") || 
                            category.includes("주얼리");
    
                        const excludedList = [
                            "인생네컷", "포토이즘", "하루필름", "포토그레이", "포토시그니처", 
                            "셀픽스", "모노맨션", "비원포토", "무인", "증명", "여권"
                        ];
                        const isExcluded = excludedList.some((kw) => name.includes(kw));
    
                        const isExcludedByCategory =
                            name.includes("터미널") ||
                            name.includes("지하철역") ||
                            category.includes("오락,여가") ||
                            category.includes("교통,수송");
    
                        return isCorrectLocation && isCorrectCategory && !isExcluded && !isExcludedByCategory;
                    });
    
                    if (page === 1) {
                        setPlaces(filteredData);
                    } else {
                        setPlaces((prev) => [...prev, ...filteredData]);
                    }
                    setPaginationObj(pagination);
                    setHasNextPage(pagination.hasNextPage);
    
                    if (filteredData.length === 0 && page === 1) {
                        setError(`'${searchLocation}' 근처에 조건에 맞는 ${selectedCategory} 업체를 찾지 못했습니다.`);
                    }
                } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
                    if (page === 1) setPlaces([]);
                    setError(`'${searchQuery}' 검색 결과가 없습니다.`);
                } else {
                    setError("업체 정보를 불러오는 중 오류가 발생했습니다.");
                }
                setLoading(false);
            },
            { page, size: 15 }
        );
    };

    console.log(searchLocation)

    const handleLocationSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputLocation.trim()) return;
        setSearchLocation(inputLocation.trim());
    };

    const handleResetLocation = () => {
        if (location) {
            setInputLocation(location);
            setSearchLocation(location);
        }
    }

    const handleLoadMore = () => {
        if (paginationObj && hasNextPage) {
            paginationObj.nextPage();
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-4 space-y-6">
            {/* 1. 상단 라벨 및 카테고리 버튼 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <div className="flex items-center gap-[1rem]">
                    <span className="bg-rose-100 text-rose-600 px-3 py-1 rounded-full text-[1.2rem] font-bold shrink-0">
                        📍 검색 지역
                    </span>
                    <h2 className="text-[1.8rem] font-bold text-slate-800">
                        {searchLocation || "지역 선택 필요"}
                    </h2>

                    <span className="text-[#777]">선택한 지역 주변의 웨딩 관련 업체를 찾아 볼 수 있습니다.</span>
                </div>

                <form onSubmit={handleLocationSubmit} className="flex gap-2 mt-[1rem] block w-full">
                    <input
                        type="text"
                        value={inputLocation}
                        onChange={(e) => setInputLocation(e.target.value)}
                        placeholder="예: 서울 강남, 서울 종로"
                        className="px-4 py-2 block w-full border border-slate-200 rounded-xl text-[1.2rem] focus:outline-none focus:border-rose-400 w-48 md:w-56"
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 whitespace-nowrap bg-slate-800 text-white text-[1.2rem] font-semibold rounded-xl hover:bg-slate-700 transition"
                    >
                        지역 변경
                    </button>
                    {searchLocation !== location && (
                        <button
                            type="button"
                            onClick={handleResetLocation}
                            className="px-3 py-2 whitespace-nowrap bg-slate-100 text-slate-600 text-[1.1rem] font-medium rounded-xl hover:bg-slate-200 transition shrink-0"
                        >
                            원래대로
                        </button>
                    )}
                </form>
            </div>

            <div className="flex gap-2 flex-wrap pt-2 border-t border-slate-100">
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-4 py-2 rounded-xl text-[1.3rem] font-medium transition-all ${
                            selectedCategory === cat
                                ? "bg-rose-500 text-white shadow-md shadow-rose-200"
                                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* 2. 업체 검색 결과 리스트 */}
            <div className="space-y-4">
                <h3 className="text-[1.4rem] font-semibold text-slate-700">
                    '{searchLocation} {selectedCategory}' 검색 결과 ({places.length}건)
                </h3>

                {loading && places.length === 0 && (
                    <div className="text-center py-12 text-slate-400 text-[1.4rem]">
                        업체 목록을 불러오는 중입니다...
                    </div>
                )}

                {error && places.length === 0 && (
                    <div className="bg-white border border-slate-200 p-8 rounded-xl text-center text-slate-500 text-[1.4rem]">
                        {error}
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {places.map((place) => { 
                        // console.log(place)

                        return (
                            <div
                                key={place.id}
                                className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:border-rose-300 transition-all flex flex-col justify-between"
                            >
                            <div>
                                <div className="flex justify-between items-start mb-2">
                                <h4 className="text-[1.5rem] font-bold text-slate-900 leading-snug">
                                    {place.place_name}
                                </h4>
                                <span className="text-[1.1rem] text-slate-400 shrink-0 ml-2">
                                    {place.category_name.split(' > ').pop()}
                                </span>
                                </div>

                                <p className="text-[1.2rem] text-slate-600 mb-1">
                                📍 {place.road_address_name || place.address_name}
                                </p>

                                {place.phone && (
                                <p className="text-[1.2rem] text-slate-500">
                                    📞 {place.phone}
                                </p>
                                )}
                            </div>

                            <div className="mt-4 pt-3 border-t border-slate-50 flex justify-end">
                                <a
                                    href={place.place_url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="px-4 py-2 bg-slate-100 text-slate-700 text-[1.2rem] font-semibold rounded-lg hover:bg-slate-200 transition"
                                >
                                    카카오 지도로 열기
                                </a>
                            </div>
                        </div>
                    )})}
                </div>

                {/* 더보기 버튼 */}
                {hasNextPage && (
                    <div className="text-center pt-4">
                        <button
                        onClick={handleLoadMore}
                        disabled={loading}
                        className="px-6 py-3 bg-white border border-rose-300 text-rose-500 rounded-xl font-bold hover:bg-rose-50 transition shadow-sm text-[1.3rem]"
                        >
                        {loading ? "불러오는 중..." : "업체 더보기 ⬇️"}
                        </button>
                    </div>
                )}
            </div>
            </div>
    )
}