import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function testApi() {
  const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
  console.log("Key:", RAPIDAPI_KEY ? "Found" : "Missing");

  const url = "https://boxing-data-api.p.rapidapi.com/v2/fights/schedule?days=14&date_sort=ASC&page_size=6&page_num=1";
  const res = await fetch(url, {
    headers: {
      "x-rapidapi-key": RAPIDAPI_KEY || "",
      "x-rapidapi-host": "boxing-data-api.p.rapidapi.com",
    }
  });

  console.log("Status:", res.status);
  const data = await res.json();
  console.log("Data:", JSON.stringify(data, null, 2));
}

testApi();
