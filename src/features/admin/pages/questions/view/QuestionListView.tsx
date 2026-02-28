import {useState} from 'react';
import {Plus, Pencil, Trash2} from 'lucide-react';
import {PageHeader} from '@/components/common/PageHeader';
import {ConfirmDialog} from '@/components/common/ConfirmDialog';
import {Button} from '@/components/ui/button';
import {toast} from 'sonner';
import {AdminLayout} from "@/features/admin/components/layout/AdminLayout.tsx";
import {DataTable} from "@/features/admin/components/common/DataTable.tsx";
import {useQuestionsAdmin, useQuestionMutation} from "@/features/admin/pages/questions";
import {ToastHelper} from "@/features/api/errorHandler.ts";
import {AxiosError} from "axios";

const columns = (onModify, setDeleteId) => [
    {
        key: 'question',
        header: 'Savol',
        render: (item) => <span className="font-medium">{item.question}</span>,
    },
    {
        key: 'categoryId',
        header: 'Kategoriya',
        render: (item) => <span className="text-muted-foreground">{item.categoryId?.title || 'N/A'}</span>,
    },
    {
        key: 'choices',
        header: 'Javoblar soni',
        render: (item) => <span>{item.choices?.length || 0}</span>,
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

export default function QuestionListView({onRegister, onModify, categoryId}) {
    //
    const [deleteId, setDeleteId] = useState<string | null>(null);

    console.log(categoryId)

    const {questions, questionsAreLoading, refetchQuestions} = useQuestionsAdmin(categoryId);
    const {mutation: {deleteQuestion}} = useQuestionMutation();

    const handleDelete = async () => {
        await deleteQuestion.mutateAsync(deleteId, {
            onSuccess: () => {
                toast.success('Savol muvaffaqiyatli o\'chirildi');
                refetchQuestions();
                setDeleteId(null);
            },
            onError: (error: AxiosError) => ToastHelper(error)
        });
    };

    return (
        <AdminLayout>
            <PageHeader
                title="Savollar"
                description="Savollarni boshqarish"
                breadcrumbs={[{label: 'Savollar'}]}
                actions={
                    <Button className='cursor-pointer' onClick={onRegister} asChild>
                        <span>
                            <Plus className="mr-2 h-4 w-4"/>
                            Savol qo'shish
                        </span>
                    </Button>
                }
            />

            {questions?.length && <DataTable
                data={questions}
                columns={columns(onModify, setDeleteId)}
                keyField="_id"
                emptyMessage="Savollar topilmadi. Birinchi savolingizni yarating!"
            />}

            <ConfirmDialog
                open={!!deleteId}
                onOpenChange={() => setDeleteId(null)}
                title="Savolni o'chirish"
                description="Ushbu savolni o'chirishni xohlaysizmi? Bu amalni qaytarib bo'lmaydi."
                confirmLabel="O'chirish"
                onConfirm={handleDelete}
                variant="destructive"
            />
        </AdminLayout>
    );
}
