"use client";  // Indica que este componente es del lado del cliente
import { useEffect, useState } from 'react';
import styles from '../styles/globals.css';

const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10); // Mostrar 10 posts por página

  // Obtener los posts de la API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Manejar la paginación
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Mostrar loading o error
  if (loading) {
    return <p>Loading posts...</p>;
  }

  if (error) {
    return <p>Error loading posts: {error}</p>;
  }

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {currentPosts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>

      {/* Paginación */}
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

// Componente de Paginación
const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  const pageNumbers = [];

  // Calcular número de páginas
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul style={{ display: 'flex', listStyle: 'none' }}>
        {pageNumbers.map(number => (
          <li key={number} style={{ margin: '0 5px' }}>
            <button
              onClick={() => paginate(number)}
              style={{
                padding: '10px',
                backgroundColor: currentPage === number ? '#0070f3' : '#eaeaea',
                color: currentPage === number ? '#fff' : '#000',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default PostsPage;
