import axios from "axios";

export async function scrapeLinkedInProfile(url) {
  try {
    const response = await axios.post("/api/scrape-linkedin", { url });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch LinkedIn data: " + error.message);
  }
}
