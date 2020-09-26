import React, { useEffect, useState} from 'react'
import "./App.css"
import Tmdb from './Tmdb'
import MovieRow from './components/MovieRow'
import FeaturedMovie from './components/FeaturedMovie'

export default () => {
    const [movieList, setMovieList] = useState([])
    const [FeaturedData, setFeaturedData] = useState([])

    useEffect(()=>{
        const loadAll = async () => {
            let showList = await Tmdb.getHomeList()
            setMovieList(showList)


            
        }
        loadAll()
    }, [])

    return (
        <div className="page">

            {FeaturedData &&
                <FeaturedMovie item={FeaturedData}></FeaturedMovie>
            }

            <section className="lists">
                {movieList.map((item, key)=>(
                    <MovieRow key={key} title={item.title} items={item.items}/>
                ))}
            </section>
        </div>
    )
}

