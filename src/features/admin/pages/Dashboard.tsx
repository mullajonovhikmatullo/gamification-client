import { PageHeader } from '@/components/common/PageHeader';
import { StatCard } from '@/components/common/StatCard';
import {
  FolderTree,
  FileQuestion,
  Users,
  GraduationCap,
  UsersRound,
  TrendingUp,
  Award,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {AdminLayout} from "@/features/admin/components/layout/AdminLayout.tsx";
import {useCategoriesAdmin} from "@/features/admin/pages/categories";
import {useTeachersAdmin} from "@/features/admin/pages/teachers";
import {useUsersAdmin} from "@/features/admin/pages/students";
import {useQuizzesAdmin} from "@/features/admin/pages/quizzes";
import {useGroupsAdmin} from "@/features/admin/pages/groups";

export default function Dashboard() {

  //
    const { categories } = useCategoriesAdmin();
    const { teachers } = useTeachersAdmin();
    const { users } = useUsersAdmin();
    const { quizzes } = useQuizzesAdmin();
    const { groups } = useGroupsAdmin();

  const stats = [
    { title: 'Kategoriyalar', value: categories?.length, icon: FolderTree },
    { title: 'Testlar', value: quizzes?.length, icon: FileQuestion },
    { title: "O'quvchilar", value: users?.length, icon: Users },
    { title: "Ustozlar", value: teachers?.length, icon: GraduationCap },
    { title: 'Guruhlar', value: groups?.length, icon: UsersRound },
  ];

  return (
    <AdminLayout>
      <PageHeader
        title="Boshqaruv paneli"
        description="Xush kelibsiz! Webstar o'yin ilovasining umumiy ko'rinishi."
      />

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Content Grid */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* Recent Quizzes */}
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-semibold">So'nggi testlar</CardTitle>
            <FileQuestion className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {quizzes?.map((quiz) => {
                const category = categories.find(c => c._id === quiz.categoryId);
                return (
                  <div
                    key={quiz._id}
                    className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50"
                  >
                    <div>
                      <p className="font-medium text-foreground">{quiz.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {category?.title} • {quiz.quizCount} savol
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-accent" />
                      <span className="text-sm font-medium">{quiz.maxStars} ★</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-semibold">Platformaga umumiy ko'rinish</CardTitle>
            <TrendingUp className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-success/10 flex items-center justify-center">
                    <Users className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Faol o'quvchilar</p>
                    <p className="text-xl font-bold">{users?.length}</p>
                  </div>
                </div>
                <span className="text-sm text-success font-medium">
                  {Math.round(users?.length)}% faol
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
                    <UsersRound className="h-5 w-5 text-secondary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">O'quv guruhlari</p>
                    <p className="text-xl font-bold">{groups?.length}</p>
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">
                  O'rtacha {groups?.length} o'quvchi/guruh
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
