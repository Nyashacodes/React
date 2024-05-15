## App.js
```
import './App.css';
import NavBar from './components/NavBar.js';

import React, { Component } from 'react'
import News from './components/News.js';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

export default class App extends Component {
  // c="this is variable"
  pageSize = 15;
  render() {
    return (
      <div>
        <Router>
          <NavBar />
          <Routes>
            <Route exact path="/" element={<News key= "sports" pageSize={this.pageSize} country="in" category="sports" />} />
            <Route exact path="/business" element={<News key = "business" pageSize={this.pageSize} country="in" category="business" />} />
            <Route exact path="/entertainment" element={<News key = "entertainment" pageSize={this.pageSize} country="in" category="entertainment" />} />
            <Route exact path="/general" element={<News key = "general" pageSize={this.pageSize} country="in" category="general" />} />
            <Route exact path="/health" element={<News key = "health" pageSize={this.pageSize} country="in" category="health" />} />
            <Route exact path="/science" element={<News key = "science" pageSize={this.pageSize} country="in" category="science" />} />
            <Route exact path="/sports" element={<News key = "sports" pageSize={this.pageSize} country="in" category="sports" />} />
            <Route exact path="/technology" element={<News key = "technology" pageSize={this.pageSize} country="in" category="technology" />} />
          </Routes>
        </Router>
      </div>
    );
  }
}

```
## NewsItem.js
```
import React, { Component } from 'react'


export class NewsItem extends Component {
    


  render() {
    let {newsTitle, newsDescription, imageUrl, newsUrl, date, author, source} = this.props
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
}

export default NewsItem

```

## News.js
```
import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {

    static defaultProps={
        country:'in',
        pageSize:8,
        category:'general'
    }
    static propTypes={ 
        country: PropTypes.string,
        pageSize:PropTypes.number,
        category:PropTypes.string
    }
    capitalizeFiestLetter=(string)=>{
        return string.charAt(0).toUpperCase()+string.slice(1);
    } 
    constructor(props){
        super(props);
        console.log("hello i am constructor from news component")
        this.state={
            articles: [],
            loading: false,
            page:1
        }
        document.title = `${this.capitalizeFiestLetter(this.props.category)} -NewsMonkey`;
    }

    async updateNews(){
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=742ff82ad70242bdae7ff50f046edfd6&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data = await fetch(url)
        let parsedData = await data.json()
        console.log(parsedData)
        this.setState({articles: parsedData.articles, 
            totalResults:parsedData.totalResults,
            loading:false
        })
    }

    async componentDidMount(){
        // console.log("cdm")
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=742ff82ad70242bdae7ff50f046edfd6&page=1&pageSize=${this.props.pageSize}`;
        // this.setState({loading:true});
        // let data = await fetch(url)
        // let parsedData = await data.json()
        // console.log(parsedData)
        // this.setState({articles: parsedData.articles, 
        //     totalResults:parsedData.totalResults,
        //     loading:false
        // })
        this.updateNews();
    }

    handlePrevClick = async()=>{
        // console.log("Previous")
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=742ff82ad70242bdae7ff50f046edfd6&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
        // this.setState({loading:true});
        // let data = await fetch(url)
        // let parsedData = await data.json()
        // console.log(parsedData)
       
        // this.setState({
        //     page: this.state.page - 1,
        //     articles: parsedData.articles,
        //     loading:false
        // })
        this.setState({page: this.state.page - 1})
        this.updateNews();
    }

    handleNextClick = async()=>{
        // console.log("Next")
    //     if(!(this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
       
    //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=742ff82ad70242bdae7ff50f046edfd6&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    //     this.setState({loading:true});
    //     let data = await fetch(url)
    //     let parsedData = await data.json()
    //     // console.log(parsedData)
        
    //     this.setState({
    //         page: this.state.page + 1,
    //         articles: parsedData.articles,
    //         loading:false
    //     })
    // }
    this.setState({page: this.state.page + 1})
    this.updateNews();
    } 

  render() {
    console.log("render")
    
    return (
      <div className='container my-3'>
        <h2 className="text-center">NewsMonkey-Top {this.capitalizeFiestLetter(this.props.category)} HeadLines!</h2>
          {this.state.loading&& <Spinner/>}  
       
        <div className="row"> 
        {!this.state.loading && this.state.articles.map((element)=>{
             return(                           
                <div className="col-md-4" key={element.url}>
                    <NewsItem newsTitle={element.title?element.title.slice(0,45):""} newsDescription={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                </div>         
                    )
               }
                 )
        }
        </div>
        <div className="container d-flex justify-content-between">
            <button disabled={this.state.page<=1} type="button" className="btn btn-primary" onClick={this.handlePrevClick}> &larr; Previous</button>
            <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-primary" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News
```


