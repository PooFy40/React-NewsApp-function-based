import React, { useEffect , useState } from "react";
import NewsItem from "./NewsItem";
import Wait from "./wait";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";



const News =(props)=> {

    const [articles,setAarticles]=useState([])
    const [loading,setLoading]=useState(true)
    const [page,setPage]=useState(1)
    const [totalResult,setTotalResult]=useState(0)



    const updateNews=async()=> {
        props.setProgress(20)
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`
        setLoading(true)
        props.setProgress(50)
        let data = await fetch(url)
        let parseddata = await data.json()
        props.setProgress(75)
        setAarticles(parseddata.articles)
        setTotalResult(parseddata.totalResult)
        setLoading(false)
        props.setProgress(100)

    }

    useEffect(()=>{
        updateNews()

    },[])
    
   
    const fetchMoreData = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page+1}&pageSize=${props.pageSize}`
        setPage(page+1)
        setLoading(true)
        let data = await fetch(url)
        let parseddata = await data.json()
        setAarticles(articles.concat(parseddata.articles))
        setTotalResult(parseddata.totalResult)
        setLoading(false)

    };

        return <>
        


            <h1 style={{ color: 'white' , textAlign:'center', marginTop:'100px' }} >News Monkey - Top News</h1>
            {loading&&<Wait />}           
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResult}
                loader={<Wait />}
            >
                <div className="container">

                    <div className="row my-5">
                        {articles.map((element) => {


                            return <div className="col-md-4" key={element.url} >

                                <NewsItem title={element.title ? element.title : ""} discription={element.description ? element.description : ""} imageUrl={element.urlToImage ? element.urlToImage : ""} newsUrl={element.url ? element.url : ""} author={element.author} date={element.publishedAt} />

                            </div>
                        })}

                    </div>
                </div>
            </InfiniteScroll>




        </>
    
}

News.propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
}

News.defaultPropes = {
    country: 'in',
    pageSize: 5,
    category: 'sports'

}

export default News;
