"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getCategories() {
  return await prisma.category.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { articles: true }
      }
    }
  });
}

export async function createCategory(formData: FormData) {
  const name = formData.get("name") as string;
  if (!name) return { error: "Nama kategori wajib diisi." };

  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  
  try {
    await prisma.category.create({
      data: { name, slug }
    });
    revalidatePath("/admin/categories");
    return { success: true };
  } catch (err: any) {
    if (err.code === 'P2002') return { error: "Kategori dengan nama/slug ini sudah ada." };
    return { error: err.message };
  }
}

export async function deleteCategory(id: string) {
  try {
    await prisma.category.delete({ where: { id } });
    revalidatePath("/admin/categories");
    return { success: true };
  } catch (err: any) {
    return { error: err.message };
  }
}
