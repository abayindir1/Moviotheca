import React,{useState, useEffect} from 'react'
import axios from "axios"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import TrendMovieItem from "../TrendingMovies/TrendMovieItem"

export default function NowPlaying() {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        getNowPlaying()
    }, [])

    const getNowPlaying =()=>{
        axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`).then(response =>{
            console.log(response.data.results)
            setMovies(response.data.results)
        })
    }
    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
        initialSlide: 0,
        rtl: true,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      };
    return (
        <div  className="movie-list" id="now-playing">
      <h1 id="now-playing-title" className="title">Now Playing</h1>
    <div className="movies" id="trending">
    <Slider {...settings}>
      {movies.length > 0 ? (
        movies.map((movie) => <TrendMovieItem key={movie.id} movie={movie} />)
        ) : (
          <h1>No Movie Found</h1>
          )}
          </Slider>
    </div>
    </div>
    )
}
