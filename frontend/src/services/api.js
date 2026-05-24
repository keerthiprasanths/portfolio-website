import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Fetch projects, optionally filtered by category or featured.
 * GET /api/projects?category=&featured=true
 */
export const getProjects = async (category = null, featured = null) => {
  const params = {};
  if (category && category !== 'All') params.category = category;
  if (featured) params.featured = featured;
  const { data } = await API.get('/projects', { params });
  return data;
};

/**
 * Fetch a single project by ID.
 * GET /api/projects/:id
 */
export const getProject = async (id) => {
  const { data } = await API.get(`/projects/${id}`);
  return data;
};

/**
 * Fetch about / bio info.
 * GET /api/about
 */
export const getAbout = async () => {
  const { data } = await API.get('/about');
  return data;
};

/**
 * Fetch social media links.
 * GET /api/social
 */
export const getSocialLinks = async () => {
  const { data } = await API.get('/social');
  return data;
};

/**
 * Fetch skills list.
 * GET /api/skills
 */
export const getSkills = async () => {
  const { data } = await API.get('/skills');
  return data;
};

/**
 * Fetch timeline entries.
 * GET /api/timeline
 */
export const getTimeline = async () => {
  const { data } = await API.get('/timeline');
  return data;
};

/**
 * Send a contact message.
 * POST /api/messages
 */
export const sendMessage = async (messageData) => {
  const { data } = await API.post('/messages', messageData);
  return data;
};

export default API;
