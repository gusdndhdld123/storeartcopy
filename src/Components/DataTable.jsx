import {useEffect, useState} from "react";

const DataTable = ({ data }) => {


    const [forDate, setForDate] = useState('');  // 상태를 컴포넌트 내에서 정의
    const [searchType, setSearchType] = useState('A');
    // 각각 다르게 sort해서 넣을 state
    // 랭킹순
    const [best, setBest] = useState(null);
    // 클릭순
    const [click, setClick] = useState(null);
    // 판매순
    const [sell, setSell] = useState(null);
    // 금액순
    const [price, setPrice] = useState(null);



    // Update sorting states when data changes
    useEffect(() => {
        if (data != null) {

            const bestData = [...data.result.products].sort((a, b) => a.best - b.best);
            const clickData = [...data.result.products].sort((a, b) => b.hitStarScore - a.hitStarScore);
            const sellData = [...data.result.products].sort((a, b) => b.saleStarScore - a.saleStarScore);
            const priceData = [...data.result.products].sort((a, b) => b.lowPrice - a.lowPrice);

            setBest(bestData);
            console.log(bestData)
            setClick(clickData);
            console.log(clickData);
            setSell(sellData);
            console.log(sellData);
            setPrice(priceData);
            console.log(priceData);
        }
    }, [data]);  // This will run when `data` changes

    useEffect(() => {
        if (data != null && data.result) {
            const dateString = data.result.searchTime;  // searchTime을 가져옴
            const date = new Date(dateString);
            const formattedDate = date.toLocaleString('ko-KR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            }).replace(',', '');  // 쉼표 제거

            setForDate(formattedDate);  // 상태 업데이트
        }
    }, [data]);


    // searchType 변경 처리 함수
    const handleSearchTypeChange = (e) => {
        setSearchType(e.target.value);
    };


    return (

        <div>

                {
                    data ?
                        <div className="flex justify-center py-4">
                            <div className="flex justify-center">
                                <p className="text-left p-2">※ 데이터 기준 시간 : {forDate}</p>

                            </div>
                            <div className="flex content-end">
                                <select onChange={handleSearchTypeChange}
                                        className="text-lg rounded-md border border-gray-600 p-2 ml-[400px] text-center content-end">
                                    <option value="A">랭킹순</option>
                                    <option value="B">클릭순</option>
                                    <option value="C">판매순</option>
                                    <option value="D">가격순</option>
                                </select>
                            </div>
                        </div>


                        : null
                }



            {
                data ?
                    <div className="flex justify-center relative  items-center w-[95%] mx-auto">
                        <table
                            className="w-full text-sm  rtl:text-right text-gray-500 dark:text-gray-400 text-center border-gray-300 border table-fixed">
                            <thead
                                className="font-bold text-yellow-600 text-[15px]  uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
                            <tr className="p-2">
                                <td scope="col" class="w-[40px] py-3 border-gray-300 border">순위</td>
                                <td scope="col" class="w-[480px] py-3 border-gray-300 border">상품명</td>
                                <td scope="col" class="w-[108px] py-3 border-gray-300 border">스토어명</td>
                                <td scope="col" class="w-[74px] py-3 border-gray-300 border">판매가</td>
                                <td scope="col" class="w-[66px] py-3 border-gray-300 border">찜수</td>
                                <td scope="col" class="w-[66px] py-3 border-gray-300 border">리뷰수</td>
                                <td scope="col" class="w-[61px] py-3 border-gray-300 border">클릭점수</td>
                                <td scope="col" class="w-[60px] py-3 border-gray-300 border">판매점수</td>
                                <td scope="col" class="w-[61px] py-3 border-gray-300 border">리뷰점수</td>
                                <td scope="col" class="w-[61px] py-3 border-gray-300 border">품질점수</td>
                                <td scope="col" class="w-[50px] py-3 border-gray-300 border">연관성</td>
                                <td scope="col" class="w-[50px] py-3 border-gray-300 border">유사성</td>
                                <td scope="col" class="w-[50px] py-3 border-gray-300 border">최신성</td>
                                <td scope="col" class="w-[61px] py-3 border-gray-300 border">하락위험</td>
                                <td scope="col" class="w-[50px] py-3 border-gray-300 border">신뢰도</td>
                            </tr>
                            </thead>
                                {
                                    searchType === 'A' ?
                                        <tbody className="border-gray-300 border font-bold text-lg">
                                        {
                                            data.result.products.map((product, i) => (
                                                <tr key={i} className="border-gray-300 border">
                                                    <td className="border-gray-300 border">{product.rank}</td>
                                                    <td className="border-gray-300 border">
                                                        <div className="flex">
                                                            <div>
                                                                <img
                                                                    className="w-[60px] h-[60px] object-contain"
                                                                    src={product.imageUrl}
                                                                    alt="Product Image"
                                                                />

                                                            </div>
                                                            <div>
                                                                {
                                                                    product.link === '' ?
                                                                        <a href={product.link}>
                                                                            <p className="text-lg font-bold pt-3">{product.productTitle}</p>
                                                                        </a>
                                                                        :
                                                                        <p className="text-lg font-bold pt-3">{product.productTitle}</p>
                                                                }


                                                                <div
                                                                    className="flex mt-3 w-full text-[12px]">
                                                                    {
                                                                        product.largeCategoryName ?
                                                                            <span>{product.largeCategoryName}</span>
                                                                            : null
                                                                    }
                                                                    {
                                                                        product.middleCategoryName ?
                                                                            <span> > {product.middleCategoryName}</span>
                                                                            : null
                                                                    }
                                                                    {
                                                                        product.smallCategoryName ?
                                                                            <span> > {product.smallCategoryName}</span>
                                                                            : null
                                                                    }
                                                                    {
                                                                        product.detailCategoryName ?
                                                                            <span> > {product.detailCategoryName}</span>
                                                                            : null
                                                                    }


                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="border-gray-300 borde ">
                                                        {
                                                            product.mallCount === 0
                                                                ? product.mallName
                                                                : `판매처: ${product.mallCount} 곳`
                                                        }


                                                    </td>
                                                    <td className="border-gray-300 border">{product.lowPrice}</td>
                                                    <td className="border-gray-300 border">{product.keepCnt}</td>
                                                    <td className="border-gray-300 border">{product.reviewCount}</td>
                                                    <td className="border-gray-300 border">{product.hitStarScore}</td>
                                                    <td className="border-gray-300 border">{product.saleStarScore}</td>
                                                    <td className="border-gray-300 border">{product.reviewCountStarScore}</td>
                                                    <td className="border-gray-300 border">{product.qualityStarScore}</td>
                                                    <td className="border-gray-300 border">{product.relevanceStarScore}</td>
                                                    <td className="border-gray-300 border">{product.similarityStarScore}</td>
                                                    <td className="border-gray-300 border">{product.recentStarScore}</td>
                                                    <td className="border-gray-300 border">{product.rankDownScoreType}</td>
                                                    <td className="border-gray-300 border">{product.reliabilityType}</td>
                                                </tr>

                                            ))
                                        }
                                        </tbody>
                                        :null
                                }
                            {
                                searchType === 'B' ?
                                    <tbody className="border-gray-300 border font-bold text-lg">
                                    {
                                        click.map((product, j) => (
                                            <tr key={j} className="border-gray-300 border">
                                                <td className="border-gray-300 border">{product.rank}</td>
                                                <td className="border-gray-300 border">
                                                    <div className="flex">
                                                        <div>
                                                            <img
                                                                className="w-[60px] h-[60px] object-contain"
                                                                src={product.imageUrl}
                                                                alt="Product Image"
                                                            />

                                                        </div>
                                                        <div>
                                                            {
                                                                product.link === '' ?
                                                                    <a href={product.link}>
                                                                        <p className="text-lg font-bold pt-3">{product.productTitle}</p>
                                                                    </a>
                                                                    :
                                                                    <p className="text-lg font-bold pt-3">{product.productTitle}</p>
                                                            }


                                                            <div
                                                                className="flex mt-3 w-full text-[12px]">
                                                                {
                                                                    product.largeCategoryName ?
                                                                        <span>{product.largeCategoryName}</span>
                                                                        : null
                                                                }
                                                                {
                                                                    product.middleCategoryName ?
                                                                        <span> > {product.middleCategoryName}</span>
                                                                        : null
                                                                }
                                                                {
                                                                    product.smallCategoryName ?
                                                                        <span> > {product.smallCategoryName}</span>
                                                                        : null
                                                                }
                                                                {
                                                                    product.detailCategoryName ?
                                                                        <span> > {product.detailCategoryName}</span>
                                                                        : null
                                                                }


                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="border-gray-300 borde ">
                                                    {
                                                        product.mallCount === 0
                                                            ? product.mallName
                                                            : `판매처: ${product.mallCount} 곳`
                                                    }


                                                </td>
                                                <td className="border-gray-300 border">{product.lowPrice}</td>
                                                <td className="border-gray-300 border">{product.keepCnt}</td>
                                                <td className="border-gray-300 border">{product.reviewCount}</td>
                                                <td className="border-gray-300 border">{product.hitStarScore}</td>
                                                <td className="border-gray-300 border">{product.saleStarScore}</td>
                                                <td className="border-gray-300 border">{product.reviewCountStarScore}</td>
                                                <td className="border-gray-300 border">{product.qualityStarScore}</td>
                                                <td className="border-gray-300 border">{product.relevanceStarScore}</td>
                                                <td className="border-gray-300 border">{product.similarityStarScore}</td>
                                                <td className="border-gray-300 border">{product.recentStarScore}</td>
                                                <td className="border-gray-300 border">{product.rankDownScoreType}</td>
                                                <td className="border-gray-300 border">{product.reliabilityType}</td>
                                            </tr>

                                        ))
                                    }
                                    </tbody>
                                    :null
                            }
                            {
                                searchType === 'C' ?
                                    <tbody className="border-gray-300 border font-bold text-lg">
                                    {
                                        sell.map((product, k) => (
                                            <tr key={k} className="border-gray-300 border">
                                                <td className="border-gray-300 border">{product.rank}</td>
                                                <td className="border-gray-300 border">
                                                    <div className="flex">
                                                        <div>
                                                            <img
                                                                className="w-[60px] h-[60px] object-contain"
                                                                src={product.imageUrl}
                                                                alt="Product Image"
                                                            />

                                                        </div>
                                                        <div>
                                                            {
                                                                product.link === '' ?
                                                                    <a href={product.link}>
                                                                        <p className="text-lg font-bold pt-3">{product.productTitle}</p>
                                                                    </a>
                                                                    :
                                                                    <p className="text-lg font-bold pt-3">{product.productTitle}</p>
                                                            }


                                                            <div
                                                                className="flex mt-3 w-full text-[12px]">
                                                                {
                                                                    product.largeCategoryName ?
                                                                        <span>{product.largeCategoryName}</span>
                                                                        : null
                                                                }
                                                                {
                                                                    product.middleCategoryName ?
                                                                        <span> > {product.middleCategoryName}</span>
                                                                        : null
                                                                }
                                                                {
                                                                    product.smallCategoryName ?
                                                                        <span> > {product.smallCategoryName}</span>
                                                                        : null
                                                                }
                                                                {
                                                                    product.detailCategoryName ?
                                                                        <span> > {product.detailCategoryName}</span>
                                                                        : null
                                                                }


                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="border-gray-300 borde ">
                                                    {
                                                        product.mallCount === 0
                                                            ? product.mallName
                                                            : `판매처: ${product.mallCount} 곳`
                                                    }


                                                </td>
                                                <td className="border-gray-300 border">{product.lowPrice}</td>
                                                <td className="border-gray-300 border">{product.keepCnt}</td>
                                                <td className="border-gray-300 border">{product.reviewCount}</td>
                                                <td className="border-gray-300 border">{product.hitStarScore}</td>
                                                <td className="border-gray-300 border">{product.saleStarScore}</td>
                                                <td className="border-gray-300 border">{product.reviewCountStarScore}</td>
                                                <td className="border-gray-300 border">{product.qualityStarScore}</td>
                                                <td className="border-gray-300 border">{product.relevanceStarScore}</td>
                                                <td className="border-gray-300 border">{product.similarityStarScore}</td>
                                                <td className="border-gray-300 border">{product.recentStarScore}</td>
                                                <td className="border-gray-300 border">{product.rankDownScoreType}</td>
                                                <td className="border-gray-300 border">{product.reliabilityType}</td>
                                            </tr>

                                        ))
                                    }
                                    </tbody>
                                    :null
                            }
                            {
                                searchType === 'D' ?
                                    <tbody className="border-gray-300 border font-bold text-lg">
                                    {
                                        price.map((product, l) => (
                                            <tr key={l} className="border-gray-300 border">
                                                <td className="border-gray-300 border">{product.rank}</td>
                                                <td className="border-gray-300 border">
                                                    <div className="flex">
                                                        <div>
                                                            <img
                                                                className="w-[60px] h-[60px] object-contain"
                                                                src={product.imageUrl}
                                                                alt="Product Image"
                                                            />

                                                        </div>
                                                        <div>
                                                            {
                                                                product.link === '' ?
                                                                    <a href={product.link}>
                                                                        <p className="text-lg font-bold pt-3">{product.productTitle}</p>
                                                                    </a>
                                                                    :
                                                                    <p className="text-lg font-bold pt-3">{product.productTitle}</p>
                                                            }


                                                            <div
                                                                className="flex mt-3 w-full text-[12px]">
                                                                {
                                                                    product.largeCategoryName ?
                                                                        <span>{product.largeCategoryName}</span>
                                                                        : null
                                                                }
                                                                {
                                                                    product.middleCategoryName ?
                                                                        <span> > {product.middleCategoryName}</span>
                                                                        : null
                                                                }
                                                                {
                                                                    product.smallCategoryName ?
                                                                        <span> > {product.smallCategoryName}</span>
                                                                        : null
                                                                }
                                                                {
                                                                    product.detailCategoryName ?
                                                                        <span> > {product.detailCategoryName}</span>
                                                                        : null
                                                                }


                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="border-gray-300 borde ">
                                                    {
                                                        product.mallCount === 0
                                                            ? product.mallName
                                                            : `판매처: ${product.mallCount} 곳`
                                                    }


                                                </td>
                                                <td className="border-gray-300 border">{product.lowPrice}</td>
                                                <td className="border-gray-300 border">{product.keepCnt}</td>
                                                <td className="border-gray-300 border">{product.reviewCount}</td>
                                                <td className="border-gray-300 border">{product.hitStarScore}</td>
                                                <td className="border-gray-300 border">{product.saleStarScore}</td>
                                                <td className="border-gray-300 border">{product.reviewCountStarScore}</td>
                                                <td className="border-gray-300 border">{product.qualityStarScore}</td>
                                                <td className="border-gray-300 border">{product.relevanceStarScore}</td>
                                                <td className="border-gray-300 border">{product.similarityStarScore}</td>
                                                <td className="border-gray-300 border">{product.recentStarScore}</td>
                                                <td className="border-gray-300 border">{product.rankDownScoreType}</td>
                                                <td className="border-gray-300 border">{product.reliabilityType}</td>
                                            </tr>

                                        ))
                                    }
                                    </tbody>
                                    :null
                            }



                        </table>
                    </div>
                    : null
            }
            <div>

            </div>
        </div>
    );
}

export default DataTable;
