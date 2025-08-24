import axios from 'axios';

const IMG = 'https://image.tmdb.org/t/p/w500/';
const API_KEY = 'f0c015f32fb1149b76849b85752fedb7';
const URL_API = 'https://api.themoviedb.org/3/';
const TRENDING = 'trending/movie/day';
const GENRE = 'genre/movie/list';

const api = axios.create({
	baseURL: URL_API,
	headers: {
		'Content-Type': 'application/json;charset=utf-8',
	},
	params: {
		'api_key': API_KEY,
	}
});

const getTrendingMoviesPreview = async () => {
	try {
		const { data, status } = await api.get(TRENDING);
		if (status === 200) {
			const movies = data.results;
			movies.forEach( movie => {
				const trendingPreview = document.querySelector('#trendingPreview .trendingPreview-movieList');
				
				const movieContainer = document.createElement('div');
				movieContainer.classList.add('movie-container');
				
				const movieImg = document.createElement('img');
				movieImg.classList.add('movie-img');
				movieImg.setAttribute('alt', movie.title);
				movieImg.setAttribute('src', `${IMG}${movie.poster_path}`);
				
				trendingPreview.appendChild(movieContainer);
				movieContainer.appendChild(movieImg);
			})
		}
	} catch (error) {
		console.error(error);
	}
}

const getCategoriesPreview = async () => {
	try {
		const { data, status } = await api.get(GENRE);
		if (status === 200) {
			const categories = data.genres;
			categories.forEach( category => {
				const categoryPreview = document.querySelector('#categoriesPreview .categoriesPreview-list');
				
				const categoryContainer = document.createElement('div');
				categoryContainer.classList.add('category-container');
				
				const categoryTitle = document.createElement('h3');
				categoryTitle.classList.add('category-title');
				categoryTitle.setAttribute('id', `id${category.id}`);
				
				const categoryTitleText = document.createTextNode(category.name);
				
				categoryPreview.appendChild(categoryContainer);
				categoryContainer.appendChild(categoryTitle);
				categoryTitle.appendChild(categoryTitleText);
			})
		}
	} catch (error) {
		console.error(error);
	}
}

getCategoriesPreview();
getTrendingMoviesPreview();
