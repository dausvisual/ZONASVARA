import prisma from "@/lib/prisma";
import { Users, Shield, UserCheck, Clock, Plus, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { auth } from "@/auth";
import { deleteUser } from "@/app/actions/user";

const ROLE_LABELS: Record<string, string> = {
  SUPER_ADMIN: "Super Admin",
  CHIEF_EDITOR: "Pimred",
  EDITOR: "Editor",
  JOURNALIST: "Jurnalis",
  CONTRIBUTOR: "Kontributor",
  GUEST_WRITER: "Penulis Tamu",
  USER: "Pengguna",
};

const ROLE_COLORS: Record<string, string> = {
  SUPER_ADMIN: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  CHIEF_EDITOR: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  EDITOR: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  JOURNALIST: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  CONTRIBUTOR: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  GUEST_WRITER: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  USER: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
};

export default async function AdminUsersPage() {
  const session = await auth();
  const isSuperAdmin = (session?.user as any)?.role === "SUPER_ADMIN";

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: { select: { articlesAuthored: true } },
    },
  });

  const roleCounts = users.reduce((acc, u) => {
    acc[u.role] = (acc[u.role] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const stats = [
    { label: "Total Pengguna", value: users.length, icon: Users, color: "text-blue-500" },
    { label: "Admin & Editor", value: (roleCounts["SUPER_ADMIN"] || 0) + (roleCounts["CHIEF_EDITOR"] || 0) + (roleCounts["EDITOR"] || 0), icon: Shield, color: "text-purple-500" },
    { label: "Jurnalis & Kontributor", value: (roleCounts["JOURNALIST"] || 0) + (roleCounts["CONTRIBUTOR"] || 0) + (roleCounts["GUEST_WRITER"] || 0), icon: UserCheck, color: "text-green-500" },
    { label: "Pengguna Biasa", value: roleCounts["USER"] || 0, icon: Clock, color: "text-slate-400" },
  ];

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-bold font-heading">Pengguna &amp; Role</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">Kelola akun pengguna dan hak akses sistem</p>
        </div>
        {isSuperAdmin && (
          <Link href="/admin/users/create" className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md font-medium flex items-center gap-2 transition-colors text-sm shrink-0">
            <Plus size={16} /> Tambah Pengguna
          </Link>
        )}
      </div>

      {/* Stats - 2 col on mobile */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-3 md:p-5 flex items-center gap-3">
            <div className={`p-2 rounded-lg bg-slate-100 dark:bg-slate-800 ${s.color} shrink-0`}>
              <s.icon size={18} />
            </div>
            <div className="min-w-0">
              <p className="text-lg md:text-2xl font-bold text-slate-900 dark:text-white leading-tight">{s.value}</p>
              <p className="text-[10px] md:text-xs text-slate-500 leading-snug">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Users — Card list on mobile, Table on desktop */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="px-4 md:px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <h2 className="font-semibold text-slate-900 dark:text-white">Daftar Pengguna</h2>
          <span className="text-xs text-slate-500">{users.length} terdaftar</span>
        </div>

        {users.length === 0 ? (
          <div className="py-16 text-center text-slate-400">
            <Users size={40} className="mx-auto mb-3 opacity-30" />
            <p className="text-sm">Belum ada pengguna terdaftar</p>
          </div>
        ) : (
          <>
            {/* Mobile Cards */}
            <div className="lg:hidden divide-y divide-slate-100 dark:divide-slate-800">
              {users.map((user) => (
                <div key={user.id} className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm shrink-0">
                    {(user.name || user.email || "?")[0].toUpperCase()}
                  </div>
                  <div className="flex-grow min-w-0">
                    <p className="font-medium text-sm text-slate-900 dark:text-white truncate">{user.name || "—"}</p>
                    <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${ROLE_COLORS[user.role] || ""}`}>
                        {ROLE_LABELS[user.role] || user.role}
                      </span>
                      <span className="text-[10px] text-slate-400">{user._count.articlesAuthored} artikel</span>
                    </div>
                  </div>
                  {isSuperAdmin && (
                    <div className="flex items-center gap-1 shrink-0">
                      <Link href={`/admin/users/${user.id}/edit`} className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-md transition-colors" title="Edit">
                        <Edit size={15} />
                      </Link>
                      {session?.user?.id !== user.id && (
                        <form action={async () => { "use server"; await deleteUser(user.id); }}>
                          <button type="submit" className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors" title="Hapus">
                            <Trash2 size={15} />
                          </button>
                        </form>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-slate-500 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
                    <th className="px-6 py-3">Pengguna</th>
                    <th className="px-6 py-3">Role</th>
                    <th className="px-6 py-3">Artikel</th>
                    <th className="px-6 py-3">Bergabung</th>
                    {isSuperAdmin && <th className="px-6 py-3 text-right">Aksi</th>}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm shrink-0">
                            {(user.name || user.email || "?")[0].toUpperCase()}
                          </div>
                          <div>
                            <p className="font-medium text-slate-900 dark:text-white">{user.name || "—"}</p>
                            <p className="text-xs text-slate-400">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${ROLE_COLORS[user.role] || ""}`}>
                          {ROLE_LABELS[user.role] || user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{user._count.articlesAuthored}</td>
                      <td className="px-6 py-4 text-slate-500 text-xs">
                        {new Date(user.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                      </td>
                      {isSuperAdmin && (
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <Link href={`/admin/users/${user.id}/edit`} className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-md transition-colors" title="Edit">
                              <Edit size={16} />
                            </Link>
                            {session?.user?.id !== user.id && (
                              <form action={async () => { "use server"; await deleteUser(user.id); }}>
                                <button type="submit" className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors" title="Hapus">
                                  <Trash2 size={16} />
                                </button>
                              </form>
                            )}
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
