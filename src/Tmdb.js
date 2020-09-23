const API_KEY = '41e54cc58193ab7f241e1056f2dcac12'
const API_BASE = 'https://api.themoviedb.org/3'


const basicFetch = async (endpoint) =>{
    const req = await fetch(`${API_BASE}${endpoint}`)
    const json = await req.json()
    return json
}

export default {
    getHomeList: async () => {
        return [
            {
                slug: 'originals',
                title: 'Originals do Netflix',
                items: await basicFetch(`discover/tv?with_network=213&language=pt-BR&key=${API_KEY}`)
            },
            {
                slug: 'trending',
                title: 'Recomendados para você',
                items: await basicFetch(`/trending/all/week?language=pt-BR&key=${API_KEY}`)
            },
            {
                slug: 'toprated',
                title: 'Em alta',
                items: await basicFetch(`movie/top_rated?language=pt-BR&key=${API_KEY}`)
            },
            {
                slug: 'action',
                title: 'Ação',
                items: await basicFetch(`/discover/movie?with_genres=28&language=pt-BR&key=${API_KEY}`)
            },
            {
                slug: 'comedy',
                title: 'Comédia',
                items: await basicFetch(`/discover/movie?with_genres=35&language=pt-BR&key=${API_KEY}`)
            },
            {
                slug: 'horror', 
                title: 'Terror',
                items: await basicFetch(`/discover/movie?with_genres=27&language=pt-BR&key=${API_KEY}`)
            },
            {
                slug: 'romance',
                title: 'Em Romance',
                items: await basicFetch(`/discover/movie?with_genres=10749&language=pt-BR&key=${API_KEY}`)
            },
            {
                slug: 'documentary',
                title: 'Documentários',
                items: await basicFetch(`/discover/movie?with_genres=99&language=pt-BR&key=${API_KEY}`)
            }
        ]
    }
}