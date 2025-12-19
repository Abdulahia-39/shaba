"use server";

import Comment from "@/models/comment-modal";

import { connectDB } from "@/lib/mongo-connection";

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

export async function submitComment(formData) {
  try {
    await connectDB();

    const name = formData.get("name");
    const email = formData.get("email");
    const comment = formData.get("comment");
    const post = formData.get("postId"); // <--- This matches your hidden input 'name = postId'

    await Comment.create({
      name,
      email,
      comment,
      post,
    });

    return { success: true };
  } catch (err) {
    throw new Error("Failed to post comment: " + err);
  }
}

export async function deleteComment(id) {
  if (!id) {
    throw new Error("Id is required");
  }

  try {
    await connectDB();

    await Comment.findByIdAndDelete(id);
    return { success: true };
  } catch (err) {
    throw new Error(err);
  }
}

export async function getComments() {
  try {
    await connectDB();

    const comments = await Comment.find().lean();
    return JSON.parse(JSON.stringify(comments));
  } catch (err) {
    throw new Error(err.message || "Failed to fetch comments");
  }
}
