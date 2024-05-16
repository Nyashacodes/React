import React from 'react'


const NewsItem=(props)=>{
  
    let {newsTitle, newsDescription, imageUrl, newsUrl, date, author, source} = props
    return (
      <div>
        <div className="card my-3" >
            <div className="card">
            <span className="position-absolute top-0 translate-middle badge rounded-pill bg-primary" style={{left: "95%", zIndex: 1}}>
                {source}
                <span className="visually-hidden">unread messages</span>
            </span>
            <img src={!imageUrl?"https://images.cnbctv18.com/uploads/2023/01/stock-market-trading.jpg?im=FitAndFill,width=500,height=300":imageUrl} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{newsTitle}...</h5>
                
                 <p className="card-text">{newsDescription}...</p>
                 <p className="card-text"><small className="text-body-secondary">By {author?author:"unknown"} on {new Date(date).toGMTString()}</small></p>
                 <a rel='noreferrer' href={newsUrl} className="btn btn-sm btn-primary">Read More</a>
            </div>
            </div>
        </div>
      </div>
    )
  
}

export default NewsItem
