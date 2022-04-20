import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Wait from "./wait";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";



export class News extends Component {

    static propTypes = {
        country: PropTypes.string,
        category: PropTypes.string,
    }

    static defaultPropes = {
        country: 'in',
        pageSize: 5,
        category: 'sports'

    }


    articles = []

    constructor() {
        super()
        this.state = {
            articles: this.articles,
            loading: false,
            page: 1,
            totalRetults: 0
        }
    }

    async updateNews() {
        this.props.setProgress(20)
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
        this.setState({ loading: true })
        this.props.setProgress(50)
        let data = await fetch(url)
        let parseddata = await data.json()
        this.props.setProgress(75)
        this.setState({
            articles: parseddata.articles,
            totalRetults: parseddata.totalRetults,
            loading: false
        })
        this.props.setProgress(100)

    }

    async componentDidMount() {
        this.updateNews()
    }
   
    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 })
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
        this.setState({ loading: true })
        let data = await fetch(url)
        let parseddata = await data.json()
        this.setState({
            articles: this.state.articles.concat(parseddata.articles),
            totalRetults: parseddata.totalRetults,
            loading: false
        })

    };

    render() {
        return <>
        


            <h1 style={{ color: 'white' , textAlign:'center' }} >News Monkey - Top News</h1>
            {this.state.loading&&<Wait />}           
            <InfiniteScroll
                dataLength={this.state.articles.length}
                next={this.fetchMoreData}
                hasMore={this.state.articles.length !== this.state.totalRetults}
                loader={<Wait />}
            >
                <div className="container">

                    <div className="row my-5">
                        {this.state.articles.map((element) => {


                            return <div className="col-md-4" key={element.url} >

                                <NewsItem title={element.title ? element.title : ""} discription={element.description ? element.description : ""} imageUrl={element.urlToImage ? element.urlToImage : ""} newsUrl={element.url ? element.url : ""} author={element.author} date={element.publishedAt} />

                            </div>
                        })}

                    </div>
                </div>
            </InfiniteScroll>




        </>
    }
}

export default News;
