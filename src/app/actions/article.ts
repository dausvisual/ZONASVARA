"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import path from "path";

export async function getOrCreateDummyUser() {
  let user = await prisma.user.findFirst();
  if (!user) {
    user = await prisma.user.create({
      data: {
        name: "Admin Zonasvara",
        email: "admin@zonasvara.com",
        role: "SUPER_ADMIN",
      },
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
  
  if (imageFile && imageFile.size > 0) {
    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadsDir, { recursive: true });
    
    const ext = imageFile.name.split('.').pop() || 'jpg';
    const fileName = `${Date.now()}-${Math.floor(Math.random() * 1000)}.${ext}`;
    const filePath = path.join(uploadsDir, fileName);
    
    await fs.writeFile(filePath, buffer);
    imageUrl = `/uploads/${fileName}`;
  }
  
  if (!title || !content || !categoryName) {
    return { error: "Semua kolom (Judul, Konten, Kategori) wajib diisi." };
  }
  
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Math.floor(Math.random() * 1000);
  
  try {
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
    await prisma.article.delete({ where: { id } });
    revalidatePath("/admin/articles");
    revalidatePath("/");
    return { success: true };
  } catch (err: any) {
    return { error: err.message };
  }
}
