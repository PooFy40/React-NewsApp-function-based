import React, { Component } from 'react'

export class NewsItem extends Component {
render() {
let { title, discription, imageUrl, newsUrl,author,date } = this.props
        return (
            <div>
                <div className="card text-white bg-dark mb-3 " >
                <img src={!imageUrl ? "https://images.hindustantimes.com/img/2022/03/07/550x309/Breaking-News-Live-Blog-pic_1627257432413_1646612403279.jpg" : imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text" >{discription}...</p>
                        <p className="card-text"><small className="text-muted">By <b style={{color:'white'}}>{author}</b> on {new Date(date).toGMTString()}</small></p>
                        <a href={newsUrl} target='_blank' className="btn btn-dark">Read More</a>
                    </div>
                </div>

            </div>
        )
    }
}

export default NewsItem
