import {useState} from "react";

const Searchbar = ({setKeyword,setData, data, keyword}) => {
    const [inputValue, setInputValue] = useState("");    // 인풋에 입력되는 값

    const handleSearch = () => {
        setKeyword(inputValue);  // 버튼 클릭 시 최종 검색 키워드 업데이트

    };
    const activeEnter = (e) => {
        if(e.key === "Enter") {
            handleSearch();
        }
    }
    return(

        <div>
            <div className="flex justify-center pt-[30px]">
                <div>
                    <p className="text-[48px] py-3 font-bold">키워드 지수분석</p>
                    <span className="text-[20px] text-gray-500">검색 키워드로 현재 판매중인 </span><span className="text-[20px] text-yellow-400">상품지수</span><span className="text-[20px] text-gray-600">가 궁금하다면 지금 분석 해보세요</span>
                    <p className="text-gray-400 text-[15px]">※ 네이버 쇼핑 기준 100위까지 분석 가능하며 100위 초과 상품은 분석 불가합니다.</p>
                </div>
            </div>
            <div className="flex justify-center space-x-0 pt-12">
                <input className=" pl-12 border-l border-t border-b border-gray-400 rounded-l-lg w-[675px] h-[65px]  text-lg"
                       value={inputValue}
                       onChange={(e) => setInputValue(e.target.value)}
                       placeholder="검색어를 입력하세요"
                       onKeyDown={(e) => activeEnter(e)}/>
                <button className="bg-blue-500 rounded-r-md  text-white p-2 w-[120px] h-[65px]" onClick={handleSearch}>검색</button>
            </div>
        </div>
    )
}
export default Searchbar