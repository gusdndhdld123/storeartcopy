import Searchbar from "./Searchbar";
import DataTable from "./DataTable";
import {useEffect, useState} from "react";
import axios from "axios";

const Home = () => {
    // 요청해서 받아온 데이터의 원본
    const [data, setData] = useState(null);


    const [keyword, setKeyword] = useState('');

    const [searchDate, setSearchDate] = useState('');

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://58.121.112.137:5000/api/${keyword}`);
            setData(response.data);  // 받아온 데이터를 상태에 저장

            console.log(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();  // 컴포넌트가 마운트되거나 keyword가 변경될 때마다 데이터 요청
    }, [keyword]);


    return(
        <div>
            <Searchbar data={data} setData={setData} keyword={keyword} setKeyword={setKeyword}></Searchbar>
            <DataTable data={data} setData={setData} ></DataTable>
        </div>
    )
}
export default Home