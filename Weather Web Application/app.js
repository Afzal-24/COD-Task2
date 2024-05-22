window.addEventListener("load", () => {
  let long;
  let lat;

  // Define DOM elements
  const weatherTimezone = document.querySelector(".timezone");
  const degreeSection = document.querySelector(
    ".degree-and-description-section"
  );
  const degree = document.querySelector(".degree");
  const degreeSectionSpan = document.querySelector(".degreeSectionSpan");
  const weatherDescription = document.querySelector(".description");
  const weatherWindSpeed = document.querySelector(".wind");
  const weatherHumidity = document.querySelector(".humidity");
  const weatherPressure = document.querySelector(".pressure");
  const clouds = document.querySelector(".clouds");
  const sunrise = document.querySelector(".sunrise");
  const sunset = document.querySelector(".sunset");
  const searchImg = document.getElementsByClassName("search-img");
  const input = document.querySelector(".input");
  const temp = document.querySelector(".forecast-container");
  const slider = document.querySelector(".slider");

  const url = "https://api.openweathermap.org/data/2.5/weather";
  const key = "1e1a6e9edf991f276af54beefd6fd1e6";

  Array.from(searchImg).forEach((img) => {
    img.addEventListener("click", async (e) => {
      e.preventDefault();
      const city = input.value;
      if (city) {
        const userUrl = `${url}?q=${city}&appid=${key}`;
        try {
          const response = await fetch(userUrl);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          console.log(data);
          // Handle the fetched data (update DOM elements with weather info)
          temp.textContent = data.main.temp;
          degree.textContent = `${Math.round(data.main.temp - 273.15)}°c`;
          weatherWindSpeed.textContent = `${data.wind.speed} m/s`;
          weatherHumidity.textContent = `${data.main.humidity}%`;
          weatherPressure.textContent = `${data.main.pressure} hPa`;
          clouds.textContent = `${data.clouds.all}%`;
          sunrise.textContent = `${new Date(
            data.sys.sunrise * 1000
          ).toLocaleTimeString()}`;
          sunset.textContent = `${new Date(
            data.sys.sunset * 1000
          ).toLocaleTimeString()}`;
        } catch (error) {
          console.error("Error fetching weather data:", error);
        }
      }
    });
  });

  // Initialize Swiper
  const swiper = new Swiper(".swiper-container", {
    slidesPerView: 4,
    spaceBetween: 40,
    freeMode: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  // Dark mode switch
  const checkbox = document.querySelector("input[name=checkbox]");
  checkbox.addEventListener("change", function () {
    if (!this.checked) {
      document.body.style.setProperty("--text-color", "#e2f3f5");
      document.body.style.setProperty("--text-Darkblue", "#3d5af1");
      document.body.style.setProperty("--text-blue", "#22d1ee");
      document.body.style.setProperty("--white", "#fafafafa");
      document.body.style.setProperty("--text-inverse", "#0e153a");
      updateSwiperDarkMode(false);
    } else {
      document.body.style.setProperty("--text-inverse", "#e2f3f5");
      document.body.style.setProperty("--text-blue", "#3d5af1");
      document.body.style.setProperty("--white", "#3d5af1");
      document.body.style.setProperty("--text-color-Darkblue", "#22d1ee");
      document.body.style.setProperty("--text-color", "#0e153a");
      updateSwiperDarkMode(true);
    }
  });

  function updateSwiperDarkMode(isDark) {
    const swiperElements = document.querySelectorAll(
      ".swiper-container, .swiper-pagination-bullet"
    );
    swiperElements.forEach((element) => {
      if (isDark) {
        element.classList.add("dark-mode");
      } else {
        element.classList.remove("dark-mode");
      }
    });
  }

  // Fetch and display weather data
  async function getWeatherData(url) {
    const data = await fetch(url);
    const response = await data.json();
    console.log(response);
    updateDOM(response);
  }

  function updateDOM(info) {
    console.log(`${info.main.humidity}%`);
  }
});
