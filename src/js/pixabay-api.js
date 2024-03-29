import axios from 'axios';
export async function fetchUsers(value, currentPage) {
  const searchParams = new URLSearchParams({
    key: '43027284-ae8275f6d108abc1bc2578323',
    q: value,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: '15',
    page: currentPage,
  });
  const url = `https://pixabay.com/api/?${searchParams}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch {
    console.log(error);
  }
}
