import React, { useEffect, useState} from 'react'
import "./App.css"
import Tmdb from './Tmdb'
import MovieRow from './components/MovieRow/MovieRow'
import FeaturedMovie from './components//FeaturedMovie/FeaturedMovie'
import Header from './components/Header/Header'

export default () => {
    const [movieList, setMovieList] = useState([])
    const [FeaturedData, setFeaturedData] = useState([null])
    const [blackHeader, setBlackHeader] = useState(false)

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

    useEffect(()=>{
        const scrollListener = () => {
            if(window.scrollY > 10){
                setBlackHeader(true)
            }else{
                setBlackHeader(false)
            }
        }    
            window.addEventListener('scroll', scrollListener)

            return () =>{
                window.removeEventListener('scroll', scrollListener)
            }
    }, [])

    return (
        <div className="page">

            <Header black={blackHeader}/>

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

