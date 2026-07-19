import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { updateUser } from "@/app/actions/user";
import { redirect, notFound } from "next/navigation";
import { SubmitButton } from "@/components/admin/SubmitButton";
import prisma from "@/lib/prisma";

const ROLES = [
  { value: "SUPER_ADMIN", label: "Super Admin" },
  { value: "CHIEF_EDITOR", label: "Pemimpin Redaksi" },
  { value: "EDITOR", label: "Editor" },
  { value: "JOURNALIST", label: "Jurnalis" },
  { value: "CONTRIBUTOR", label: "Kontributor" },
  { value: "GUEST_WRITER", label: "Penulis Tamu" },
  { value: "USER", label: "Pengguna Umum" },
];

export default async function EditUserPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  const user = await prisma.user.findUnique({
    where: { id: resolvedParams.id },
  });

  if (!user) {
    notFound();
  }

  async function action(formData: FormData) {
    "use server";
    const res = await updateUser(resolvedParams.id, formData);
    if (res.error) {
      console.error(res.error);
    } else {
      redirect("/admin/users");
    }
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto pb-12">
      <div className="flex items-center gap-4">
        <Link 
          href="/admin/users"
          className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-md transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold font-heading">Edit Pengguna</h1>
          <p className="text-muted-foreground text-sm">Ubah detail akun atau kata sandi.</p>
        </div>
      </div>

      <form action={action} className="space-y-6 bg-white dark:bg-slate-950 p-6 rounded-xl border border-border shadow-sm">
        
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">Nama Lengkap</label>
          <input 
            type="text" 
            id="name"
            name="name" 
            required
            defaultValue={user.name || ""}
            className="w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
          <input 
            type="email" 
            id="email"
            name="email" 
            required
            defaultValue={user.email || ""}
            className="w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">Kata Sandi Baru <span className="text-muted-foreground font-normal">(Opsional)</span></label>
          <input 
            type="password" 
            id="password"
            name="password" 
            placeholder="Biarkan kosong jika tidak ingin mengubah kata sandi"
            className="w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        <div>
          <label htmlFor="role" className="block text-sm font-medium mb-1">Role Akses</label>
          <select 
            id="role"
            name="role"
            required
            defaultValue={user.role}
            className="w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="">Pilih Role...</option>
            {ROLES.map((role) => (
              <option key={role.value} value={role.value}>{role.label}</option>
            ))}
          </select>
        </div>

        <div className="flex justify-end pt-4 border-t border-border">
          <SubmitButton text="Simpan Perubahan" />
        </div>
      </form>
    </div>
  );
}
