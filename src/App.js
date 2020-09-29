import React, { useEffect, useState} from 'react'
import "./App.css"
import Tmdb from './Tmdb'
import MovieRow from './components/MovieRow'
import FeaturedMovie from './components/FeaturedMovie'
import Header from './components/Header'
export default () => {
    const [movieList, setMovieList] = useState([])
    const [FeaturedData, setFeaturedData] = useState([null])

    useEffect(()=>{
        const loadAll = async () => {
            let showList = await Tmdb.getHomeList()
            setMovieList(showList)

            let originals = showList.filter(i=>i.slug === 'originals')
            let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length -1))
            let chosen = originals[0].items.results[randomChosen]
            let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv')

            setFeaturedData(chosenInfo)
        }
        loadAll()
    }, [])

    return (
        <div className="page">

            <Header />

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

