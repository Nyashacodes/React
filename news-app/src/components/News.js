import React, {useEffect, useState} from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'
import Spinner from './Spinner'

const News=(props)=> {

    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)

// document.title = `${this.capitalizeFiestLetter(props.category)} -NewsMonkey`;

 
    const capitalizeFiestLetter=(string)=>{
        return string.charAt(0).toUpperCase()+string.slice(1);
    } 
    // constructor=(props)=>{
    //    console.log("hello i am constructor from news component")
    // }

    const updateNews = async ()=>{
        props.setProgress(10)
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=742ff82ad70242bdae7ff50f046edfd6&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true)
        let data = await fetch(url)
        let parsedData = await data.json()

        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)

        console.log(parsedData) 
        props.setProgress(100)
    }

    useEffect(()=>{
        updateNews();
    
    },[])  

    

    const handlePrevClick = async()=>{
        setPage(page-1)
        updateNews();
    }

    const handleNextClick = async()=>{
        setPage(page+1)
        updateNews();
    } 

    
    const fetchMoreData = async() => {
        
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=742ff82ad70242bdae7ff50f046edfd6&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page+1)
        let data = await fetch(url)
        let parsedData = await data.json()
        
        setArticles(articles.concat(parsedData.articles)) 
        setTotalResults(parsedData.totalResults)  
    };


 
    
    return (
      <>
        <h2 className="text-center" style={{margin: "35px 0px", marginTop:"90px"}} >NewsMonkey-Top {capitalizeFiestLetter(props.category)} HeadLines! </h2>
        {loading&& <Spinner/>}       
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
            <div className="container">
                <div className="row"> 
                {articles.map((element)=>{
                            return(                           
                                <div className="col-md-4" key={element.url}>
                                    <NewsItem newsTitle={element.title?element.title.slice(0,45):""} newsDescription={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                                </div>         
                                    )
                            }
                                )
                        }
                </div>
            </div>    
        </InfiniteScroll>
        <div className="container d-flex justify-content-between">
            {/* <button disabled={page<=1} type="button" className="btn btn-primary" onClick={this.handlePrevClick}> &larr; Previous</button> */}
            {/* <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/props.pageSize)} type="button" className="btn btn-primary" onClick={this.handleNextClick}>Next &rarr;</button> */}
        </div>
      </>
    )
  
}



//in function based component, default props and proptypeshould be written at the end
News.defaultProps={
    country:'in',
    pageSize:8,
    category:'general'
}
News.propTypes={ 
    country: PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string
} 
export default News
