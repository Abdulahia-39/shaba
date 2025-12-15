"use server";

export async function fetchBlogData() {
  const url =
    "https://useful-birthday-d8d2f80a21.strapiapp.com/api/blog-posts?populate[postimg]=*&populate[categories]=*";

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching blog data:", error);
    return null;
  }
}

export async function fetchArticle(postid) {
  const url = `https://useful-birthday-d8d2f80a21.strapiapp.com/api/blog-posts/${postid}?populate[postimg]=*&populate[categories]=*`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching blog data:", error);
    return null;
  }
}
