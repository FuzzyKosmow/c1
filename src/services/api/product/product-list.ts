import { API_URLS } from "@/config/api-urls";
import { currentEnv } from "@/config/environment";
import axios from "axios";

const DEFAULT_PRODUCT_LIST_API_OPTIONS: ProductListAPIOptions = {
  category: undefined,
  keyword: undefined,
  price_min: 0,
  price_max: undefined,
  color: undefined,
  storage: undefined,
  sort: undefined,
  page: undefined,
  limit: 20,
};

export async function getProductListAPI(
  options: ProductListAPIOptions = DEFAULT_PRODUCT_LIST_API_OPTIONS
): Promise<ProductListAPIResponse> {
  if (currentEnv === "mock") return getProductListAPIMock();

  const response = await axios.get(`${API_URLS.product.getProductList}`, {
    params: options,
  });

  return response.data;
}

export async function getBestDealsAPI(): Promise<ProductListAPIResponse> {
  if (currentEnv === "mock") return getProductListAPIMock();

  const response = await axios.get(`${API_URLS.product.getTodayBestDeal}`);

  return { products: response.data };
}

export async function getBestSellerAPI(): Promise<ProductListAPIResponse> {
  if (currentEnv === "mock") return getProductListAPIMock();

  const response = await axios.get(`${API_URLS.product.getBestSeller}`);

  return { products: response.data };
}

export async function getNewArrivalsAPI(): Promise<ProductListAPIResponse> {
  if (currentEnv === "mock") return getProductListAPIMock();

  const response = await axios.get(`${API_URLS.product.getNewArrivals}`);

  return { products: response.data };
}

export async function getCategoriesAPI(): Promise<CategoryAPIResponse> {
  if (currentEnv === "mock") return getCategoriesAPIMock();

  const response = await axios.get(`${API_URLS.product.getCategories}`);

  return response.data;
}
function getCategoriesAPIMock(): CategoryAPIResponse {
  return {
    categories: Array(Math.floor(Math.random() * 10 + 5))
      .fill("")
      .map((_, index) => ({
        id: index,
        name: `Category ${index + 1}`,
      })),
  };
}
function getProductListAPIMock(): ProductListAPIResponse {
  return {
    products: Array(Math.floor(Math.random() * 10 + 5))
      .fill("")
      .map((_, index) => ({
        id: index,
        name: `Product ${index + 1}`,
        image:
          "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxASEhUSEhMVFRUVFxgXFRcXFRUXFhUVFRUXFhcXFxgYHSggGBolHhYXITEhJSkrLi4uFx8zODMtNygtLisBCgoKDQ0OFw8PFS0dFR0tLS0rKy0tLTYtLS0rKy0rLS0tLS0tKy0tKy0tLS0rLTctLS0tLS0tKystKys3Ky0tK//AABEIAOEA4QMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAAAgMEBQYHAQj/xABOEAABAwECCQcHCQcDAQkAAAABAAIDEQQhBQYSMVFhcXLwBxMiQYGywTI1kaGxs9EjMzRSU3OSk/EUJCVigqLhQlXStBUWQ0VUY4Ojwv/EABcBAQEBAQAAAAAAAAAAAAAAAAABAgP/xAAcEQEBAQEBAAMBAAAAAAAAAAAAARECMRIhQWH/2gAMAwEAAhEDEQA/AO4oQhAKvt1uybgaUznXoHx4Eu0yZLHO0AntAVDFI3pSPvbGK7xObtJWeqsKkie4ZTqAaZHfEqBJHHWvORVzZq+tYTlC5QDZ380wNknpU5VTHADmaGjynfrtwdn5QLeHZTjG4dbebDbtAcyjh6T2qfHV13Qhn2kX4Sk0b9pF+ErLYu4zMtMYeLjmINKtcKVaaXHOCDdUHMKEK+hmBUw0/IaCodEfUo8dvbWhDQdgVy3B2U0GvVfdcOxZe2wh1aXEEjtCYauw8fVb6AkvcPqt/CFUYIthILXZ23FSrbKQ0kZ6XbepZVmsb8cY7KRGyMSSu8lrQK7akXAaaHRTOW4eTDWE3nK52OHUyJjiP631d/dRO4Lj/aJrRaTfWR0cZPUyOl421v110lS4Im5dTmBpTXUm+q14SaLNFhZ4qbdI2/6jansUxmDsKH/zGT8pvxU6O0AD2Z1J/auq7w/RNrfxirODMJdeE5Bn/wDCZm0+Uqx1tlr58H4Y/wDnerjGFj5rNLFGQHuaQKEAG8Etqc1QCO1csdgS1g0Nnm/Kf8FZ9s9ST8b39rf/AL7/AGs/5r0Wx/8Avv8Aaz/mufnA1r/9PN+U/wCC9jwNagb7NMf/AIn/AAVz+s7/AB06KwW94Dm4Ve5pFQ4RRkHZR6cGCsI/7nL2QsJ9AdfnUXEiwTQWYtlqC5znhhvLGkAUOgmlaa7860leNSxbXScyzxTjA2EDf/2pLd18yy6v9eoJ9llw1F0osI5ZzhskLWAjQXNq4dmpWovu11HX4cUKkNkqaiuu+vAzKfKr8IfxM5SZTOLFhKMRTXZLq9FwP+prsxbces0obzfk9SXB8frDlWXn2gCWzESsddXyhlDZS+mborruJmEf2ixQS58pg20p0a68mh7V05uuXXOVdoQhaZCEIQCEIQQcNvpBIdA8Qs3bJaQPp9p7BXwWkw58xJs8QsxN82fvfBY69aj51xlyzbLQX1yuekz6Mohv9uSouQ2gI7anOdX+V0rHfFESv56Mhj6UNQS14FwyskEtcBdlUNQBWlKrHsxZmrR7o2t6yHtcTsDMp3qW51MZxOxFkc3nT1ZUdNGV8pm7Mr0LptikLgKVJWLwTYQ0NYwENGnO5xzuN5poAqaX3kkk+Y+Yxvs7W2SBxY5zA+Z4udR3ksaerX1+GfarohwzOwc20sB00q8dgOfsUGMgNuNdek9a4HKxzS1zmkF1HNcT0jXM7PXXUreYk4xyPrDK4uLRVriauc0UBa49ZFQQc9ARoSyw1vbPdO7W1p7SFMtzrhvN7wVTg+fLmcdAA9FR4K2tR8nfZ3gsNOeYjwVsIdpfIc1akOoq5tpvN/Xx7VouTWz5eDQP5pPTlLHWxxa9wOcEq/tPxcNtmvin+FIZa9d/HHoWZbaSn47Uri60jbUTfxenm2tZ1lpUllo4zKYavm2o5qp0WjTwFRstCkMm0cX+xTF1ciXXn4+F6ejlB+Hw1qmjm19SlRzaVF1btkHHb67lJD6cUrxxqqYpv85tSlRS8cG9RrXuMr62K0Dq5iXuE12Lbckzq4Mg3Ge6jXP8Ypf3S0D/ANmTuFdC5KPNln+7j9zGt8OfbXoQhdHMIQhAIQhBBw58xJs8QstN5B+9/wDytRh35iTZ4hZO0P6B+8r/AGrHXrUVGHLdBAznLRI2NpzVvc46GtF7ljf+9ODnuplubXMXxOa3tIJI7QFj8ecLvtFrlcTcxzoox1NawlpptIJ9GhUvNOBpUOuF4zXgH1VptBWpzqa7ZZI2ZxTqPUbjeCCLiNYuXOuUayOFp5w+TKxoB6spgyXN9h2OVhiFhJ+Q6MmojcC3U1+VlN2BwBG85a/CNhjnjLXtDmnODXOMxBF7Xax/hTyjjtlya/KGoHVea6ld4pWV3OGWlGgEDWXgsp63H+h2hXcmJsLTWktNGW2np5vN2K2sFgDSGgAUvDR1VurfeTdSp0UFAKK3rSRY4uH5R+094rQ2o+Tvs7wVRguDJlcNVfTerO2OoWb7fW4LFaZ/klH8Pbvyd5UHKDgR0MplaOhJfscepaHkl83s35O9qWnwvYWTxujeLj6jpWbc6azY4I5yW2RWuMOAJbM41BLCbnAXduhUhXSfbCbHMpDJlVh6dZImC4jn4qpLZ9fBVLHMpEcyi6u2TKTHKqWOZTIZllV1HIP8qXHJmVPFIp0TuPVxtUXS8PSfulo+6k7pXTeSjzZZ/u4/cxrleHHfus/3Tx/aV1Pkn82Wf7uP3Ma3wz02CEIW2AhCEAhCEEDDvzEmzxCw2E35JIOYn0dS3OHfmJNniFjbdCHZQOkrHXrUcWx3wG+KZ8wbWKR2USLwx7r3B2gE1IPWDTOCqWzzPDebaCansrmquu2+yyszDKHVnBpoqOrUahUf7M5pJbCGE5yxsbHfiYwO9as6MVuLmDTC2h8txBcPqgA5IOgnKJpqbpoNnHlBhLRV2SckaTS4elV2DoGjO0t2X+AVwyeMfW/CoY4h+3WjnedD38/XPfll9fJp133ZObqou6WKylxaCKHO7Q2g6R2C9RWw2TnOdETec+vzTcvR5dK16lPM73tyGN5tp8o/6naq6ONaWmGbI0GR7xmrQbAn7WBVlfrs7wT8EIaKBR7Wekzfb3gsqoeSfzez7yTvfqtjK7/OziqxXJW79wZ95J3lrZZFnr1vnxGttnZI0te0OBrnvXOsY8TnMJfB0m58nORpouhTSJkycdqS2LZK4lJG5poQQRpzpIeuqYbxegtAJpkupc4dufUsJhjFm0QVNC9n1mjVW8dWddJ1K53nFUHp5kihpbXrWMrGORS4ZVVRvUqN6yq6hmVjBIDcs/DIrGzyrNip+GXk2Wf7p/dK61yT+bLPuR+5jXG8KS/u033b+6V2Tkn82Wfcj9zGtcJWwQhC2yEIQgEIQgrMZJMmzvOnJH4ntHisvKOkdq0mNX0Z+9H71izUx6R2lY69ahDmApt1mboTtUVWVMizt0L3mG6E5VFUCBA3QvckJVV4SgQ9V1tN7N9nfCsHlQLUekzfb3ggy3JpJSwt35O8tK+fjN2rJcnbv3Fu+/vK+nep1PtZTz50y6fjjj0qFJNx1pgz8bApi6sxP2aO34r0TA3e0av1VSbRo/VAn09aYuo+F8WIJquZ8m7SBcdo/RYnCmCJrOaPbdW5wvafguhR2r08daddM1wyXAOBBuObj4rU6sSyVyxpUmKRaTDWK7TV9n/ATn3fgsoQWmhuIzrcsrFmLKJ6lxPVVFKpsUiiJuEJfkJdx3dK7dyRyVwdCPqsiH/0RHxXBre/5GTcd7Cu7cj/AJvj3Yv+mhVhW3QhC0gQhCAQhCCoxr+jP3o/eNWYmPSO0rVYyxZVmeK0pku/C9rqdtKLJSm87VjpqCqKpNUVWVKqiqTVFUCqrwleVXhKBLyq+1npM3294Ka5ygWsVLN9neCoyfJ2P3Fu/J3lczjsVbybsrg9h/nk76uLZGl9IqJiokj1KtLVXyoPHSrwT+1R5HJl0iYJwm0e3OlMtOvjqVaZUc7x1KYurllq9fHG1QsNYMZO0uaAHjMQPK1KPHMb+OLlKZaNe3inWnisYWlpobqJ+GZXWMFhDhzjRePK1jXrHis9GVvdYsTrXJ8k/cd7F3/kf83x7sX/AE0K+eJz8m/dPsK+ieSKOmDojXymxmmikEQ8EiNqhCFpAhCEAhCEFfh/6PJs8QsVIbztW1xg+jybPELDyG87VnpqFVRVIqvKrKnKoqkVRVAp0gGc0TFokq3oka7wKBQ7Q+rj6E0iJ0TmgZIIKYtBvZvs7wTMDKm/qvS5z0mb7O8FRTcmEf8ADmH+eTvK6tbFWclTa4NZvyd9XtsalIzVrYqi0BX1tCpLSiq6VR3lSJlDkKI8LknLvTbimyUVJD0/DMOvwUBrkpj0wWzJQRTs2gn9FnrZBkvI7RsKso5eKjVcmLeASKZqU9BSFV9pHyb90+xfRvJN5sg3I/cxr50tTfk37p9hX0XyTebINyP3MasZrYoQhaQIQhAIQhBXYwfR5N3xCw0hvO1brGD6PJs8QsE83lZqx7VFUmqKqKUiqTVFUESZtCU0QpksdU0LPpKCO19DVKmPSZvs7wTghoak1TMx6TN9neCCPyTN/hjPvJe8rq3Kl5Jj/DGfeSd9XFvdnVpGftpVHaSrq3FUNqKghSlQ3lPzOUORyoQ9yZc5D3plzkDrXr0v4oo+WvcpBMjkv4uTsl9KafBQo3cePGlTw24dfH6qKg2wfJv3Xewr6H5JfNkG5H7mNfPmEfm5N13sX0HyS+bINyP3MasZrYoQhaQIQhAIQhBX4wfR5N3xCwDzedq3+MH0eTd8QufPN5Wase1RVJqiqilVRVJqiqBVV4SvKrwlAl5USbymb7O8FJeVElPSZvs7wQQ+SuSmDWfeSd5WtvlzhZ7k0lpg9m/J3lY220K1EC2vVJanKbap1UWmVQRp3KDI5OzSKJI5UJe5Much7ky5yoXlL1qZqlMKiptnFVcQxdEXcdihYKs5eRq8Fd2qOgzZrvgoqiwkPk37rvYvoDkl82QbjPcxrgWE2/JybjvYV37kl82QbkfuY1YzWxQhC0gQhCAQhCCuxg+jybviFz15vK6HjB9Hk2eIXOnm8rNWCq9qkVRVRS6oqkVXtUCqrwlJqglAlxUWXymb7O8E+8qNIekzfZ3ggzeIM9LC3ff3lKts6pMTZqWNo/mf3k/ap1b6hm1TqrnmXtpmUCSRAqSRR3vXjnJtxVHjimnFKcUhAVUqxxFzgBevcHWCSZwYxpJK6DgbF5lnaHPo551VDbte1S1ZEbBmDhFHU+UQOvi9RbU6/jT16Va4Rnv+PXeddTtVJaJKqKrMJ/NSbjvYV3zkl82QbjPcxrgOFJPkpN0+wrv3JL5sg3Ge5jWozWxQhCqBCEIBCEIK7GD6PJu+IXOHm8ro+MP0aTd8QuavN5WasKqiqRVFVFLqiqRVFUC6rwlJqvCUHjiozz02b7O8E84qM89Nm+zvBBz7FmalmbvO9qdtM6rcCS0gG13tRPKqhM0iiuch7kgqgJSSU7DC55DWgknMAKla/AfJ5aZaOm+RZr8o7B8U0YtjCTQCpWtwDiLPLR83ybNflHP1LomCcW7JZAC1oLhne681A6j1bEq3W/X8TtrxnWdXEKyYOgsrcmNoBAvd1nOdXA7VW26114r+q8tlur16q9tVRWu1Iry1TV4Kq7ROi02hV8sqqEW+XoP3T7F9E8knmyDcZ7mNfNlrf0HbD7F9J8knmyDcZ7mNWI2SEIVQIQhAIQhBXYw/Rpd3xC5k83ldNxi+jS7viFzB5vKzVj2qKpNUVRSqoqk1RVAqq8JXlV4UHjiozj02b7O8E84qO49Nm+zvBQcqwW+kQ2n2oe9MWA/Jjafap+C8Gy2iRsUTS5zj6NZ0BaRFa0nMtpizyeWi0UfNWGM6aZbhqaTd2rb4tYlWayND5KSzdZI6LdwH2lXlqwgKdm2lPaFm9LIi4JwBY7I0CKMZWYvNS43567eqlEu04QAr1bM12i7jtVba8JEi+6vo9O1U9pt9e2mntu6+pRpPtmENebxJ9FNKorZayanjq47U1arTWhVZaJtY+KqC22lVVpnS7RJrVfK/SqhM0iiyPRK5R3uVQm0O6Lth9i+m+STzZBuM9zGvl+XyTsK+n+SPzZBus9zGiNmhCFQIQhAIQhBW4xfRpd3xC5e83ldPxl+izbhXL35ys1YKoqvEIr1FV4hB7VeEoXhQIcmD5bN9neCfco8g6TL6dNl/9QQcmwc2sY2ldixDwc2yQc44DnJOkT1hv+lt22v9Q1Ll2LNmDwwG4ZZB9N9+xdNteEw0BuagFL6EZhdo6lOiLe24Q6vXd8eK9ipbXbzQ338ZvVwVWzW+t1T66+pQpbT1V9fGxTFT57ZUmvt1+y9V9otefiuZRJrTn4G1Q5Jiqmpc1oOnUoUsui9Mul42JiSXivh2KhUsmnWocrl7LJrUV7lUJkcmivXda8aEHkjei7YV9OckfmyDdZ7qNfNEreg7YdfVcvpfkiH8Mg3We6jQbNCEKoEIQgEIQgiYWs5khkjGdzHNG0tNPXRckabhn7c/auzLDY04syB7poG5TXGr2AdJrjnc0Dygc5AvrpB6Mqxk0JwQuvuJpnpfQ6Ecy/6rvQVlTaE5zL/qu9BRzD/qu9BQNoKc5l/1Xego5l/1XegoGXKLaqgVGcXjaL1OMD/qu9BTUlnef9LvQUGDxdhDJpohnZIXN+7few+z0hSsKWsteRpOvT/j2qZhrAU2W2aElkrQQCWktc052PAF40GhpXRQtpMKSTvaDJZJmvFKujHOxnY5poNlSqFut1RnSH2pU2XID81L+WUc5J9lL+W5MTVnLOmZJQojZn/ZS/lkpBc/7KX8sqh98ibc/inFU1R/2Uv5bl5R/wBlL+W5AouJ4+KbISsl/wBlL+W5eZMn2Uv5bkDdEprUssf9lL+W5OxWO0PuZZ5jtYWtG1xuHagatFcktaKucQ1o6yXXUovqPk9sJhwfZ2HPkA7Rmae1oae1cr5OOS60SSstNuGSxt7Waf8AP82bQSfJ7s0UFBckR6hCFQIQhAIQhAIQhBjsd/KbsWNchC531qAL0IQopJQvEIBySUIQRLVmVNZPpHYhCo0DvnBuH2tTyEKIAhCEAhCFQIQhQAWkxP8AnmoQrPSugL1CF0ZCEIQCEIQf/9k=",
        price: Math.floor(Math.random() * 100000) * 1000,
        discount_price: Math.floor(Math.random() * 100000) * 1000,
        rating: Math.random() * 2 + 3,
        availability: true,
        storage: ["<string>", "<string>"],
        colors: ["<string>", "<string>"],
        release_date: new Date().getTime(),
        categories: [
          {
            id: 1,
            name: "Phone",
          },
        ],
        is_bestseller: true,
        is_featured: true,
        is_new_arrival: true,
      })),
  };
}
