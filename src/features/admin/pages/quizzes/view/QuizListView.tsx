import {useState} from 'react';
import {Plus, Pencil, Trash2} from 'lucide-react';
import {PageHeader} from '@/components/common/PageHeader';
import {ConfirmDialog} from '@/components/common/ConfirmDialog';
import {Button} from '@/components/ui/button';
import {toast} from 'sonner';
import {AdminLayout} from "@/features/admin/components/layout/AdminLayout.tsx";
import {DataTable} from "@/features/admin/components/common/DataTable.tsx";
import {useQuizzesAdmin, useQuizMutation} from "@/features/admin/pages/quizzes";
import {ToastHelper} from "@/features/api/errorHandler.ts";
import {AxiosError} from "axios";

const columns = (onModify, setDeleteId) => [
    {
        key: 'title',
        header: 'Nomi',
        render: (item) => <span className="font-medium">{item.title}</span>,
    },
    {
        key: 'categoryId',
        header: 'Kategoriya',
        render: (item) => <span className="text-muted-foreground">{item.categoryId?.title || 'N/A'}</span>,
    },
    {
        key: 'quizCount',
        header: 'Savollar soni',
        render: (item) => <span>{item.quizCount}</span>,
    },
    {
        key: 'isActive',
        header: 'Holat',
        render: (item) => (
            <span className={`text-sm ${item.isActive ? 'text-green-600' : 'text-red-600'}`}>
                {item.isActive ? 'Faol' : 'Faol emas'}
            </span>
        ),
    },
    {
        key: 'createdAt',
        header: 'Yaratilgan',
        render: (item) => (
            <span className="text-sm text-muted-foreground">
                {new Date(item.createdAt).toLocaleDateString('uz-UZ', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                })}
            </span>
        ),
    },
    {
        key: 'actions',
        header: 'Amallar',
        className: 'w-32',
        render: (item) => (
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" asChild className="h-8 w-8" onClick={() => onModify(item._id)}>
                    <span>
                        <Pencil className="h-4 w-4"/>
                    </span>
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
                    onClick={() => setDeleteId(item._id)}
                >
                    <Trash2 className="h-4 w-4"/>
                </Button>
            </div>
        ),
    },
];

export default function QuizListView({onRegister, onModify}) {
    const [deleteId, setDeleteId] = useState<string | null>(null);

    const {quizzes, quizzesAreLoading, refetchQuizzes} = useQuizzesAdmin();
    const {mutation: {deleteQuiz}} = useQuizMutation();

    const handleDelete = async () => {
        await deleteQuiz.mutateAsync(deleteId, {
            onSuccess: () => {
                toast.success('Test muvaffaqiyatli o\'chirildi');
                refetchQuizzes();
                setDeleteId(null);
            },
            onError: (error: AxiosError) => ToastHelper(error)
        });
    };

    return (
        <AdminLayout>
            <PageHeader
                title="Testlar"
                description="Testlarni boshqarish"
                breadcrumbs={[{label: 'Testlar'}]}
                actions={
                    <Button className='cursor-pointer' onClick={onRegister} asChild>
                        <span>
                            <Plus className="mr-2 h-4 w-4"/>
                            Test qo'shish
                        </span>
                    </Button>
                }
            />

            {quizzes?.length && <DataTable
                data={quizzes}
                columns={columns(onModify, setDeleteId)}
                keyField="_id"
                emptyMessage="Testlar topilmadi. Birinchi testingizni yarating!"
            />}

            <ConfirmDialog
                open={!!deleteId}
                onOpenChange={() => setDeleteId(null)}
                title="Testni o'chirish"
                description="Ushbu testni o'chirishni xohlaysizmi? Bu amalni qaytarib bo'lmaydi."
                confirmLabel="O'chirish"
                onConfirm={handleDelete}
                variant="destructive"
            />
        </AdminLayout>
    );
}
