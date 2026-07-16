import prisma from "@/lib/prisma";
import { Users, Shield, UserCheck, Clock } from "lucide-react";

const ROLE_LABELS: Record<string, string> = {
  SUPER_ADMIN: "Super Admin",
  CHIEF_EDITOR: "Pemimpin Redaksi",
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
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { articlesAuthored: true },
      },
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
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
          Pengguna &amp; Role
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Kelola akun pengguna dan hak akses sistem
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 flex items-center gap-4"
          >
            <div className={`p-2 rounded-lg bg-slate-100 dark:bg-slate-800 ${s.color}`}>
              <s.icon size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{s.value}</p>
              <p className="text-xs text-slate-500">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <h2 className="font-semibold text-slate-900 dark:text-white">Daftar Pengguna</h2>
          <span className="text-sm text-slate-500">{users.length} pengguna terdaftar</span>
        </div>

        {users.length === 0 ? (
          <div className="py-16 text-center text-slate-400">
            <Users size={40} className="mx-auto mb-3 opacity-30" />
            <p>Belum ada pengguna terdaftar</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-slate-500 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
                  <th className="px-6 py-3">Pengguna</th>
                  <th className="px-6 py-3">Role</th>
                  <th className="px-6 py-3">Artikel Ditulis</th>
                  <th className="px-6 py-3">Bergabung</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm shrink-0">
                          {(user.name || user.email || "?")[0].toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium text-slate-900 dark:text-white">
                            {user.name || "—"}
                          </p>
                          <p className="text-xs text-slate-400">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${ROLE_COLORS[user.role] || ""}`}
                      >
                        {ROLE_LABELS[user.role] || user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                      {user._count.articlesAuthored} artikel
                    </td>
                    <td className="px-6 py-4 text-slate-500 text-xs">
                      {new Date(user.createdAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
