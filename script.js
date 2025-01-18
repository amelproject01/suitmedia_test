let lastScrollTop = 0;
const header = document.getElementById("header");

window.addEventListener("scroll", function() {
  let currentScroll = window.pageYOffset;
  
  if (currentScroll > lastScrollTop) {
    header.classList.add("hidden"); 
  } else {
    header.classList.remove("hidden"); 
  }
  
  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; 

  let condition = true;
  let color = (condition) ? "rgba(223, 93, 36, 0.7)" : "rgba(223, 93, 36, 1)";
});

const apiUrl = "https://suitmedia-backend.suitdev.com/api/ideas";
const params = {
  'page[number]': 1,
  'page[size]': 10,
  'append[]': ['small_image', 'medium_image'],
  sort: '-published_at'
};

const formattedParams = new URLSearchParams();

Object.keys(params).forEach(key => {
  const value = params[key];
  if (Array.isArray(value)) {
    value.forEach(v => formattedParams.append(key, v));
  } else {
    formattedParams.append(key, value);
  }
});

const fetchData = async (apiUrl, params, method = 'GET') => {
  try {
    const queryString = formattedParams.toString();
    const fullUrl = method === 'GET' ? `${apiUrl}?${queryString}` : apiUrl;

    console.log('Full URL:', fullUrl);
    console.log('Parameters:', queryString);

    const fetchOptions = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
    };

    if (method === 'POST') {
      fetchOptions.body = JSON.stringify(params);
    }

    const response = await fetch(fullUrl, fetchOptions);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log(data);

    const container = document.getElementById('cards-container');

    if (container && data.data && Array.isArray(data.data)) {
      data.data.forEach(item => {
        const card = document.createElement('div');
        card.className = 'col-md-3';

        const imageUrl = item.small_image && item.small_image[0] ? item.small_image[0].url : 'banner.png';

        card.innerHTML = `
          <div class="card shadow pb-3">
          <img src="influencer1.png" class="card-img-top" alt="Image">
            <div class="card-body">
              <h5 class="card-title" style="color: grey;">${new Date(item.published_at).toLocaleDateString()}</h5>
              <p class="card-text">${item.title}</p>
            </div>
          </div>
        `;
        container.appendChild(card);
      });
    } else {
      console.error("Data structure is not as expected or no data available:", data);
    }

  } catch (error) {
    console.error("Fetch error:", error);
  }
};

fetchData(apiUrl, formattedParams, 'GET');

async function loadBanner() {
  try {
    const response = await fetch('https://suitmedia-backend.suitdev.com/api/ideas?page[number]=1&page[size]=10&append[]=small_image&append[]=medium_image&sort=-published_at', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
    const data = await response.json();
    console.log(data); 

    const bannerImage = document.getElementById('banner-image');
    if (bannerImage && data.data && Array.isArray(data.data) && data.data.length > 0) {
      const firstItem = data.data[0];
      if (firstItem.medium_image && firstItem.medium_image.length > 0) {
        console.log(firstItem.medium_image[0].url);
        bannerImage.src = firstItem.medium_image[0].url;
      } else {
        console.error("medium_image array is empty or not available:", firstItem);
      }
    } else {
      console.error("Data structure is not as expected or no data available:", data);
    }
  } catch (error) {
    console.error('Error fetching banner:', error);
  }
}

loadBanner();

window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY;
  const bannerImage = document.getElementById('banner-image');
  if (bannerImage) {
    bannerImage.style.transform = `translateY(${scrollPosition * 0.5}px)`;
  }
});

fetch('http://localhost:3000/api/ideas?page[number]=1&page[size]=10&append[]=small_image&append[]=medium_image&sort=-published_at')
  .then(response => response.json())
  .then(data => {
    console.log(data);  
  })
  .catch(error => console.error('Error:', error));
