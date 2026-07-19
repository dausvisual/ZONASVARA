"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { auth } from "@/auth";
import { Role } from "@prisma/client";

async function checkSuperAdmin() {
  const session = await auth();
  if (!session?.user || (session.user as any).role !== "SUPER_ADMIN") {
    throw new Error("Akses ditolak. Hanya Super Admin yang diizinkan.");
  }
}

export async function createUser(formData: FormData) {
  try {
    await checkSuperAdmin();

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const role = formData.get("role") as Role;

    if (!name || !email || !password || !role) {
      return { error: "Semua kolom wajib diisi." };
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return { error: "Email tersebut sudah digunakan." };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    });

    revalidatePath("/admin/users");
    return { success: true };
  } catch (err: any) {
    return { error: err.message };
  }
}

export async function updateUser(id: string, formData: FormData) {
  try {
    await checkSuperAdmin();

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const role = formData.get("role") as Role;

    if (!name || !email || !role) {
      return { error: "Nama, email, dan role wajib diisi." };
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser && existingUser.id !== id) {
      return { error: "Email tersebut sudah digunakan oleh pengguna lain." };
    }

    const updateData: any = {
      name,
      email,
      role,
    };

    if (password && password.length > 0) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    await prisma.user.update({
      where: { id },
      data: updateData,
    });

    revalidatePath("/admin/users");
    return { success: true };
  } catch (err: any) {
    return { error: err.message };
  }
}

export async function deleteUser(id: string) {
  try {
    await checkSuperAdmin();
    
    // Check if trying to delete oneself
    const session = await auth();
    if (session?.user?.id === id) {
      return { error: "Anda tidak dapat menghapus akun Anda sendiri." };
    }

    await prisma.user.delete({ where: { id } });
    revalidatePath("/admin/users");
    return { success: true };
  } catch (err: any) {
    return { error: err.message };
  }
}
