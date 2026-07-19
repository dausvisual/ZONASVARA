"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import bcrypt from "bcryptjs";

cloudinary.config({
  cloud_name: 'ispjadjc',
  api_key: '124741436514314',
  api_secret: '-i1JaQvwV-x6fqxuoOJq0ZUFMss'
});

export async function getOrCreateDummyUser() {
  let user = await prisma.user.findFirst();
  if (!user) {
    const hashedPassword = await bcrypt.hash("zonasvara1712", 10);
    user = await prisma.user.create({
      data: {
        name: "Admin Zonasvara",
        email: "admin@zonasvaraspace",
        password: hashedPassword,
        role: "SUPER_ADMIN",
      },
    });
  } else if (!user.password) {
    const hashedPassword = await bcrypt.hash("zonasvara1712", 10);
    user = await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });
  }
  return user;
}

export async function getOrCreateCategory(name: string) {
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  let category = await prisma.category.findUnique({ where: { slug } });
  if (!category) {
    category = await prisma.category.create({
      data: {
        name,
        slug,
      },
    });
  }
  return category;
}

export async function getArticles() {
  return await prisma.article.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      category: true,
      author: true,
    },
  });
}

export async function createArticle(formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const categoryName = formData.get("category") as string;
  let imageUrl = formData.get("image") as string;
  
  const imageFile = formData.get("imageFile") as File | null;
  
  if (!title || !content || !categoryName) {
    return { error: "Semua kolom (Judul, Konten, Kategori) wajib diisi." };
  }
  
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Math.floor(Math.random() * 1000);
  
  try {
    if (imageFile && imageFile.size > 0) {
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      
      imageUrl = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { 
            folder: 'zonasvara',
            format: 'webp',
            quality: 'auto'
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result?.secure_url as string);
          }
        ).end(buffer);
      });
    }

    const user = await getOrCreateDummyUser();
    const category = await getOrCreateCategory(categoryName);
    
    await prisma.article.create({
      data: {
        title,
        slug,
        content,
        summary: content.replace(/<[^>]+>/g, "").substring(0, 150) + "...",
        thumbnail: imageUrl || null,
        categoryId: category.id,
        authorId: user.id,
        status: "PUBLISHED",
      }
    });
    
    revalidatePath("/");
    revalidatePath("/admin/articles");
    return { success: true };
  } catch (err: any) {
    return { error: err.message };
  }
}

export async function deleteArticle(id: string) {
  try {
    const article = await prisma.article.findUnique({ where: { id } });
    
    if (article?.thumbnail && article.thumbnail.includes('res.cloudinary.com')) {
      const urlParts = article.thumbnail.split('/');
      const filenameWithExt = urlParts.pop();
      const folderName = urlParts.pop();
      if (filenameWithExt && folderName) {
        const publicId = `${folderName}/${filenameWithExt.split('.')[0]}`;
        // Hapus dari cloudinary
        await cloudinary.uploader.destroy(publicId);
      }
    }

    await prisma.article.delete({ where: { id } });
    revalidatePath("/admin/articles");
    revalidatePath("/");
    return { success: true };
  } catch (err: any) {
    return { error: err.message };
  }
}
